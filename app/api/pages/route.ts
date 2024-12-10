import { auth } from "@/auth";
import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { title } = await request.json();

    const page = await db.page.create({
      data: {
        title: title,
        icon: "MessageCircle",
        userId: session.user.id
      }
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error("Page error:", error);
    return NextResponse.json({ error: "Erreur lors de la création de la page" }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const pages = await db.page.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des pages" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { id } = await request.json();

    // Vérifier que la page appartient à l'utilisateur
    const page = await db.page.findUnique({
      where: {
        id: id,
        userId: session.user.id
      }
    });

    if (!page) {
      return NextResponse.json({ error: "Page non trouvée" }, { status: 404 });
    }

    // Supprimer la page et ses messages associés
    await db.page.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete page error:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
