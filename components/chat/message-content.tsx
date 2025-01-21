import { FileInfo } from "@/components/chat/file-info";
import { MarkdownRenderer } from "@/components/chat/message-markdown";
import { PendingIndicator } from "@/components/chat/pending-indicator";
import { Message } from "@prisma/client";

interface MessageContentProps {
  message: Message & { status?: "pending" | "sent" | "error" };
  isUser: boolean;
}

export function MessageContent({ message, isUser }: MessageContentProps) {
  return (
    <div className="flex flex-col gap-1 lg:block overflow-x-hidden w-full">
      <div
        className={`messageContent text-base lg:flex flex-col lg:mt-3 ${
          isUser ? "whitespace-pre-wrap lg:max-h-[30vh]" : "lg:max-h-[60vh]"
        }`}
      >
        {isUser ? <p>{message.content}</p> : <MarkdownRenderer content={message.content} />}
      </div>
      <FileInfo message={message} />
      {message.status === "pending" && <PendingIndicator />}
    </div>
  );
}
