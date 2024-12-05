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
    console.log("DELETE request received");
    const session = await auth();
    console.log("Session:", session);

    if (!session?.user?.email) {
      console.log("No session found");
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    console.log("Request body:", body);
    const { id } = body;

    if (!id) {
      console.log("No ID provided");
      return NextResponse.json({ error: "Page ID is required" }, { status: 400 });
    }

    const deletedPage = await db.page.deleteMany({
      where: {
        id: id
      }
    });
    console.log("Delete result:", deletedPage);

    if (deletedPage.count === 0) {
      console.log("No page deleted");
      return NextResponse.json({ error: "Page not found or cannot be deleted" }, { status: 404 });
    }

    console.log("Page deleted successfully");
    return NextResponse.json({ message: "Page deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
