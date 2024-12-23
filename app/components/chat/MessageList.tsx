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
    <ul className="space-y-8 lg:overflow-auto max-w-[90%] lg:max-w-[80%] 2xl:max-w-[1100px] ml-auto mr-auto">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <li ref={lastMessageRef} />
    </ul>
  );
}
