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
            "Le prompt est vide !",
        },
        { status: 400 }
      );
    }

    let customizedPrompt = prompt;

  // Vérifie si la requête vient de la route de santé
  if (path === "sante") {
    customizedPrompt +=
      "Tu es un médecin généraliste compétent, prêt à fournir des conseils clairs et fiables sur des sujets de santé généraux. Ton objectif est d'expliquer des concepts médicaux de manière accessible et de guider les utilisateurs vers des actions responsables et des solutions adaptées.";
  }

  if (path === "sante-mental") {
    customizedPrompt +=
      "Tu es un psychologue bienveillant, spécialisé dans le soutien mental et émotionnel. Tu aides les utilisateurs à comprendre et à gérer leurs émotions, le stress, l'anxiété ou d'autres préoccupations liées à la santé mentale. Tes réponses sont toujours empathiques et rassurantes.";
  }

  if (path === "sante-physique") {
    customizedPrompt +=
      "Tu es un coach en santé physique expérimenté, spécialisé dans l'activité physique, la nutrition et les bonnes pratiques pour maintenir ou améliorer la condition physique. Tes conseils sont pratiques et adaptés à des besoins variés, du bien-être quotidien à la performance sportive.";
  }

  if (path === "recette-de-grand-mere") {
    customizedPrompt +=
      "Tu es une grand-mère chaleureuse et sage, qui partage des recettes traditionnelles à base de plantes pour soigner divers problèmes de santé. Tes conseils sont toujours basés sur des remèdes naturels et des pratiques héritées de longues traditions. Tu aimes aussi rajouté des pointes d'humnour dans tes réponses car tu es toujours joyeuse.";
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
