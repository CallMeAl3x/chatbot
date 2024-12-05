import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const pageTitle = searchParams.get("pageTitle");

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const messages = await db.message.findMany({
      where: {
        userId: user.id,
        page: {
          title: pageTitle || undefined
        }
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { pageTitle, messages } = await req.json();
    const user = await db.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const page = await db.page.findFirst({
      where: {
        title: pageTitle,
        userId: user.id
      }
    });

    if (!page) {
      return NextResponse.json({ error: "Page non trouvée" }, { status: 404 });
    }

    const savedMessages = await Promise.all(
      messages.map((msg: { content: string; sender: string }) =>
        db.message.create({
          data: {
            content: msg.content,
            sender: msg.sender,
            pageId: page.id,
            userId: user.id
          }
        })
      )
    );

    return NextResponse.json({ messages: savedMessages });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
