import { formatFileSize } from "@/lib/chat/format-files-utils";
import { Message } from "@prisma/client";
import { FileText, Loader2, MessageSquare, User } from "lucide-react";
import { MarkdownRenderer } from "./MessageMarkdown";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <ul className="space-y-4 overflow-auto">
      {messages.length > 0 &&
        messages.map((message, index) => {
          const isUser = message.sender === "user";
          const isPending = message.status === "pending";

          return (
            <li
              key={index}
              className={`p-4 rounded-lg ${isUser ? (isPending ? "bg-gray-100" : "bg-blue-200") : "bg-gray-200"}`}
            >
              <div className={`flex items-start ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`flex-shrink-0 ${isUser ? "ml-3" : "mr-3"}`}>
                  {isUser ? (
                    <User className="w-6 h-6 text-blue-600" />
                  ) : (
                    <MessageSquare className="w-6 h-6 text-gray-600" />
                  )}
                </div>
                <div className={`flex-grow ${isUser ? "text-right" : "text-left"}`}>
                  <strong className={`font-semibold ${isUser ? "text-blue-600" : "text-gray-600"}`}>
                    {isUser ? "Vous" : "Assistant"}
                  </strong>
                  <div className="text-sm flex flex-col mt-3">
                    {isUser ? <p>{message.content}</p> : <MarkdownRenderer content={message.content} />}
                  </div>
                  {message.fileName && (
                    <div className="mt-2 flex items-center justify-end text-xs text-gray-500">
                      <FileText className="w-4 h-4 mr-1" />
                      <span>{message.fileName}</span>
                      {message.fileSize && <span className="ml-2">({formatFileSize(message.fileSize)})</span>}
                    </div>
                  )}
                  {isPending && (
                    <div className="mt-2 flex items-center justify-end text-xs text-gray-600">
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      <span>Envoi en cours...</span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
}
