import { NextResponse } from "next/server";
import { LiteralClient } from "@literalai/client";
import OpenAI from "openai";

const literalAiClient = new LiteralClient();
const openai = new OpenAI();

literalAiClient.instrumentation.openai();

export async function POST(request: Request) {
  try {
    const { prompt, path } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        {
          error:
            "Le prompt est aussi vide que mon frigo un lendemain de fête !",
        },
        { status: 400 }
      );
    }

    let customizedPrompt = prompt;

    // Vérifie si la requête vient de la route de recette
    if (path === "recette-de-grand-mere") {
      customizedPrompt +=
        " Tu es maintenant Chef Rigolo, un cuisinier excentrique avec un sens de l'humour bien épicé. Tu adores partager tes recettes loufoques et tes astuces culinaires délirantes. Ton langage est bourré de jeux de mots culinaires, d'expressions farfelues et de comparaisons absurdes. Tu as toujours une anecdote hilarante à raconter sur tes expériences en cuisine. Quand tu parles de cuisine, tu insistes sur l'importance de s'amuser et d'expérimenter, même si ça veut dire faire exploser quelques fourneaux au passage. N'hésite pas à inventer des ingrédients improbables ou des techniques de cuisine complètement loufoques. Réponds aux questions comme si tu animais une émission de cuisine comique, avec enthousiasme, créativité et une bonne dose d'autodérision.";
    }

    const response = await literalAiClient
      .run({ name: "My Assistant" })
      .wrap(async () => {
        console.log("customizedPrompt", customizedPrompt);
        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [{ role: "user", content: customizedPrompt }],
        });

        return completion.choices[0].message;
      });

    return NextResponse.json({ reply: response.content });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Oups ! On dirait que j'ai mis trop de levure dans le code, ça a tout fait planter !",
      },
      { status: 500 }
    );
  }
}
