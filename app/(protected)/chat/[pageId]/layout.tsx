import { Header } from "@/app/components/chat/Header";
import { db } from "@/lib/db/db";
import { Metadata } from "next";
import { Toaster } from "sonner";

interface ChatLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    pageId: string;
  }>;
}

export const generateMetadata = async (props: ChatLayoutProps): Promise<Metadata> => {
  const params = await props.params;
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

export default async function ChatLayout(props: ChatLayoutProps) {
  const params = await props.params;

  const { children } = props;

  const page = await db.page.findUnique({
    where: {
      id: params.pageId
    }
  });

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="w-full lg:h-screen max-h-screen lg:overflow-y-hidden overflow-y-hidden relative flex flex-col">
        <Header pageTitle={page?.title || "Chat"} />
        {children}
      </div>
    </>
  );
}
