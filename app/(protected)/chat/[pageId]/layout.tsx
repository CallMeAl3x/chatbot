import { db } from "@/lib/db/db";
import { Metadata } from "next";

interface ChatLayoutProps {
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

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
