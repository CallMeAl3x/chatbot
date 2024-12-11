import { db } from "@/lib/db/db";
import { Metadata } from "next";

interface ChatLayoutProps {
  children: React.ReactNode;
  params: {
    pageId: string;
  };
}

export const generateMetadata = async ({ params }: ChatLayoutProps): Promise<Metadata> => {
  if (params.pageId) {
    const page = await db.page.findUnique({
      where: {
        id: params.pageId
      }
    });

    return {
      title: `${page?.title || "Chat"} | IDK Chatbot`,
      description: "Chat with our AI assistant"
    };
  }

  return {
    title: "Chat | IDK Chatbot",
    description: "Chat with our AI assistant"
  };
};

export default async function ChatLayout({ children, params }: ChatLayoutProps) {
  const page = await db.page.findUnique({
    where: {
      id: params.pageId
    }
  });

  return (
    <>
      {/* <h1>{page?.title}</h1> // TODO add header */}
      {children}
    </>
  );
}
