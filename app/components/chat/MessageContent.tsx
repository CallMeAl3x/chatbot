import { Message } from "@prisma/client";
import { MarkdownRenderer } from "./MessageMarkdown";
import { FileInfo } from "./FileInfo";
import { PendingIndicator } from "./PendingIndicator";

interface MessageContentProps {
  message: Message & { status?: "pending" | "sent" | "error" };
  isUser: boolean;
}

export function MessageContent({ message, isUser }: MessageContentProps) {
  return (
    <div className={`flex-grow ${isUser ? "text-right" : "text-left"}`}>
      <strong
        className={`font-semibold ${
          isUser ? "text-blue-600" : "text-gray-600"
        }`}>
        {isUser ? "Vous" : "Assistant"}
      </strong>
      <div className="text-sm flex flex-col mt-3">
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <MarkdownRenderer content={message.content} />
        )}
      </div>
      <FileInfo message={message} />
      {message.status === "pending" && <PendingIndicator />}
    </div>
  );
}
