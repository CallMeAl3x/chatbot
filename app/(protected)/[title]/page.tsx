"use client";

import { chatService } from "@/lib/chat-service";
import { useEffect, useState } from "react";

export default function DynamicPage({ params }: { params: { title: string } }) {
  const [messages, setMessages] = useState<{ content: string; sender: string; id?: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch(`/api/messages?pageTitle=${encodeURIComponent(params.title)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          } else {
            // Si aucun message n'existe, afficher le message de bienvenue
            const welcomeMessage = {
              content: `Bienvenue dans l'espace "${params.title}". Je suis votre assistant virtuel, prêt à vous aider et à répondre à vos questions. Comment puis-je vous assister aujourd'hui ?`,
              sender: "bot"
            };
            setMessages([welcomeMessage]);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des messages:", error);
        // En cas d'erreur, afficher quand même le message de bienvenue
        const welcomeMessage = {
          content: `Bienvenue dans l'espace "${params.title}". Je suis votre assistant virtuel, prêt à vous aider et à répondre à vos questions. Comment puis-je vous assister aujourd'hui ?`,
          sender: "bot"
        };
        setMessages([welcomeMessage]);
      }
    };
    loadMessages();
  }, [params.title]);

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

      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pageTitle: params.title,
          messages: [userMessage, botMessage]
        })
      });

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Erreur:", error);
      setMessages((prevMessages) => [...prevMessages, { content: "Une erreur s'est produite.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-3 bg-white rounded-lg shadow-lg h-[97.5%] flex flex-col">
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
