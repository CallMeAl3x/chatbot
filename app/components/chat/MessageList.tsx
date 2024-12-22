"use client";

import { useEffect, useRef } from "react";
import { Message } from "@prisma/client";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const lastMessageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ul className="space-y-4 overflow-auto">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <li ref={lastMessageRef} />
    </ul>
  );
}
