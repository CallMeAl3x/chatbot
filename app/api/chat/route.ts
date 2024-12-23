import { auth } from "@/auth";
import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Simple token counting function
function countTokens(text: string): number {
  return text.split(/\s+/).length;
}

const MESSAGE_LIMIT = 20;

const MAX_TOKENS = 3000; // Adjust based on your model's limit

async function buildContext(pageId: string, userId: string, maxTokens: number) {
  const messages = await db.message.findMany({
    where: { pageId, userId },
    orderBy: { createdAt: "desc" },
    take: 4 // Limit to last 10 messages for efficiency
  });

  let context: { role: string; content: string }[] = [];
  let tokenCount = 0;

  for (const message of messages.reverse()) {
    const messageContent = message.content + (message.fileContent ? `\n\nFile Content:\n${message.fileContent}` : "");
    const messageTokens = countTokens(messageContent);

    if (tokenCount + messageTokens > maxTokens) break;

    context.push({
      role: message.sender === "user" ? "user" : "assistant",
      content: messageContent
    });

    tokenCount += messageTokens;
  }

  return context;
}

async function getAIResponse(context: { role: string; content: string }[], model: "claude" | "gpt" = "claude") {
  console.log("model:", model);
  if (model === "claude") {
    const messages = context.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content
    }));

    try {
      const response = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        max_tokens: MAX_TOKENS,
        messages: messages
      });

      const content = response.content[0];

      if (content.type === "text") {
        return content.text;
      } else if (content.type === "tool_use") {
        throw new Error("Tool use response not supported");
      }

      throw new Error("Unexpected content type");
    } catch (error) {
      console.error("Erreur API Claude:", error);
      throw error;
    }
  } else {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: context as OpenAI.ChatCompletionMessageParam[]
    });

    return completion.choices[0].message.content;
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { content, fileContent, pageId, fileMetadata, model } = await request.json();

    const page = await db.page.findUnique({
      where: {
        id: pageId,
        userId: session.user.id
      }
    });

    if (!page) {
      return NextResponse.json({ error: "Page non trouvée" }, { status: 404 });
    }

    // Check message count for the current page
    const messageCount = await db.message.count({
      where: { userId: session.user.id }
    });

    if (messageCount >= MESSAGE_LIMIT) {
      return NextResponse.json(
        {
          error: "message_limit_exceeded",
          message: "Vous avez atteint la limite de messages pour cette page. Veuillez en supprimer pour continuer."
        },
        { status: 400 }
      );
    }

    // Construire le contexte des messages précédents
    const context = await buildContext(pageId, session.user.id, MAX_TOKENS);
    // Ajouter le nouveau message utilisateur au contexte
    const newMessage = `${content}${fileContent ? `\n\nFile Content:\n${fileContent}` : ""}`;
    context.push({ role: "user", content: newMessage });

    try {
      const reply = await getAIResponse(context, model);

      if (!reply) {
        return NextResponse.json({ error: "Réponse vide de l'assistant" }, { status: 500 });
      }
      // Enregistrer le message utilisateur dans la base de données (après succès API)
      await db.message.create({
        data: {
          content,
          fileContent,
          sender: "user",
          userId: session.user.id,
          pageId: pageId,
          fileName: fileMetadata?.name,
          fileSize: fileMetadata?.size,
          fileType: fileMetadata?.type
        }
      });

      // Enregistrer la réponse du bot dans la base de données
      await db.message.create({
        data: {
          content: reply,
          sender: "bot",
          userId: session.user.id,
          pageId: pageId
        }
      });

      return NextResponse.json({ reply });
    } catch (error) {
      if (error instanceof Anthropic.APIError && error.status === 413) {
        return NextResponse.json(
          {
            error: "context_length_exceeded",
            message: "La limite de contexte a été dépassée. Veuillez raccourcir votre message ou réduire la taille des fichiers."
          },
          { status: 400 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
