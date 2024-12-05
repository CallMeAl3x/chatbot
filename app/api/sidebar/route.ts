import { NextResponse } from "next/server";
import { MessageCircle } from "lucide-react"; // Importer l'icône par défaut
import { initialSidebarItems } from "@/app/data/sidebarItems";
import { auth } from "@/auth";
import { db } from "@/lib/db";

let sidebarItems = [...initialSidebarItems];

export async function GET() {
  // Retourne tous les éléments actuels
  return NextResponse.json(initialSidebarItems);
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { title, url, icon } = await req.json();

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const newPage = await db.page.create({
      data: {
        title,
        url: `/${title.toLowerCase()}`,
        icon: icon || "MessageCircle",
        userId: user.id
      }
    });

    return NextResponse.json(newPage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Page ID is required" }, { status: 400 });
    }

    const deletedPage = await db.page.deleteMany({
      where: {
        id: id
      }
    });

    if (deletedPage.count === 0) {
      return NextResponse.json({ error: "Page not found or cannot be deleted" }, { status: 404 });
    }

    return NextResponse.json({ message: "Page deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
