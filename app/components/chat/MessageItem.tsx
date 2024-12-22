import { Message } from "@prisma/client";
import { MessageIcon } from "./MessageIcon";
import { MessageContent } from "./MessageContent";

interface MessageItemProps {
  message: Message & { status?: "pending" | "sent" | "error" };
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.sender === "user";
  const isPending = message.status === "pending";

  return (
    <li
      className={`p-4 rounded-lg ${
        isUser ? (isPending ? "bg-gray-100" : "bg-blue-200") : "bg-gray-200"
      }`}>
      <div
        className={`flex items-start ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}>
        <MessageIcon isUser={isUser} />
        <MessageContent message={message} isUser={isUser} />
      </div>
    </li>
  );
}
