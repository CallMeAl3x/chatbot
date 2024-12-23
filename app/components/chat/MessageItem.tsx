"use client";
import { Message } from "@prisma/client";
import { MessageIcon } from "./MessageIcon";
import { MessageContent } from "./MessageContent";
import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/lib/useCopyToClipboard";

interface MessageItemProps {
  message: Message & {
    status?: "pending" | "sent" | "error";
  };
}

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.sender === "user";
  const isPending = message.status === "pending";
  const { copyToClipboard, isCopied, isDisabled } = useCopyToClipboard();

  const messageClasses = cn(
    "lg:p-4 rounded-lg flex-grow p-4",
    isUser && ["ml-auto lg:max-w-[35%]", isPending ? "bg-gray-100" : "bg-blue-200"],
    !isUser && "bg-gray-200 mr-auto"
  );

  return (
    <li className={messageClasses}>
      <div className={`flex items-start w-full relative flex-col` + (isUser ? " items-end" : "")}>
        <div className={`flex gap-1` + (isUser ? " flex-row-reverse" : "")}>
          <MessageIcon isUser={isUser} />
          <strong className={`font-semibold ${isUser ? "text-blue-600" : "text-gray-600"}`}>
            {isUser ? "Vous" : "Assistant"}
          </strong>
        </div>
        <MessageContent message={message} isUser={isUser} />
        <CopyButton
          isCopied={isCopied}
          isDisabled={isDisabled}
          onClick={() => copyToClipboard(message.content)}
          position={isUser ? "bottom-left" : "bottom-right"}
        />
      </div>
    </li>
  );
}
