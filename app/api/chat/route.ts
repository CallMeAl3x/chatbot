import { auth } from "@/auth";
import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { prompt, pageId } = await request.json();

    // Vérifie que la page appartient à l'utilisateur
    const page = await db.page.findUnique({
      where: {
        id: pageId,
        userId: session.user.id
      }
    });

    if (!page) {
      return NextResponse.json({ error: "Page non trouvée" }, { status: 404 });
    }

    // Sauvegarde le message utilisateur
    await db.message.create({
      data: {
        content: prompt,
        sender: "user",
        userId: session.user.id,
        pageId: pageId
      }
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [{ role: "user", content: prompt }]
    });

    const reply = completion.choices[0].message.content;

    if (!reply) {
      return NextResponse.json({ error: "Réponse vide de l'assistant" }, { status: 500 });
    }

    // Sauvegarde la réponse du bot
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
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
