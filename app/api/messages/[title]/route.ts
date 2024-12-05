import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { title: string } }) {
  const session = await auth();

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const messages = await db.message.findMany({
    where: {
      page: {
        title: params.title,
        userId: session.user.id
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  return Response.json({ messages });
}
