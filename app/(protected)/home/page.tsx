"use client";

import { chatService } from "@/lib/chat-service";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ content: string; sender: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Message de bienvenue personnalisé selon la page
    const welcomeMessage = {
      content: `Bienvenue dans le chat général. Je suis votre assistant virtuel, prêt à vous aider et à répondre à vos questions. Comment puis-je vous assister aujourd'hui ?`,
      sender: "bot"
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { content: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const reply = await chatService.sendMessage(input);
      const botMessage = { content: reply, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages((prevMessages) => [...prevMessages, { content: "Une erreur s'est produite.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 bg-white rounded-lg h-[96.7%] mx-4 flex flex-col">
      <ul className="space-y-4 mb-6 flex-1 overflow-auto">
        {messages.map((message, index) => (
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
          disabled={loading} // Désactive le champ pendant le chargement
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
