"use client";

import { chatService } from "@/lib/services/chat-service";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  params: {
    pageId: string;
  };
}

export default function DynamicChatPage({ params }: Props) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadMessages() {
      if (session?.user) {
        try {
          const existingMessages = await chatService.getMessages(params.pageId);
          setMessages(existingMessages);
        } catch (error) {
          console.error("Error loading messages:", error);
        }
      }
    }

    loadMessages();
  }, [session, params.pageId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const reply = await chatService.sendMessage(input, params.pageId);
      const updatedMessages = await chatService.getMessages(params.pageId);
      setMessages(updatedMessages);
    } catch (error) {
      console.error(error);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="p-3 h-[96.7%] mx-4 flex flex-col">
      <ul className="space-y-4 mb-6 flex-1 overflow-auto">
        {messages.length > 0 &&
          messages.map((message, index) => (
            <li
              key={index}
              className={`p-4 rounded-lg ${
                message.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
              }`}
            >
              <strong className={`font-semibold ${message.sender === "user" ? "text-blue-600" : "text-gray-600"}`}>
                {message.sender === "user" ? "Vous" : "Assistant"}:
              </strong>
              <p className="mt-1 text-sm">{message.content}</p>
            </li>
          ))}
      </ul>

      <form onSubmit={handleSubmit} className="flex items-center gap-4 mt-auto">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Tapez votre message..."
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-sm disabled:bg-blue-400"
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
}
