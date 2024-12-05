import { NextResponse } from "next/server";
import { LiteralClient } from "@literalai/client";
import OpenAI from "openai";

const literalAiClient = new LiteralClient();
const openai = new OpenAI();

literalAiClient.instrumentation.openai();

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Le prompt est vide." }, { status: 400 });
    }

    const response = await literalAiClient.run({ name: "My Assistant" }).wrap(async () => {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }]
      });

      return completion.choices[0].message;
    });

    return NextResponse.json({ reply: response.content });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
