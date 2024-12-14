import { auth } from "@/auth";
import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { pageId: string } }) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Vérifie que la page appartient à l'utilisateur
  const page = await db.page.findUnique({
    where: {
      id: params.pageId,
      userId: session.user.id
    }
  });

  if (!page) {
    return NextResponse.json({ error: "Page non trouvée" }, { status: 404 });
  }

  const messages = await db.message.findMany({
    where: {
      pageId: params.pageId,
      userId: session.user.id
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  return NextResponse.json(messages);
}
