"use client";

import { useState } from "react";

// Fonction pour envoyer la requête à l'API backend (via `/api/chat`)
const sendMessage = async (message: string) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: message })
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'appel à l'API");
    }

    const data = await response.json();
    return data.reply; // Retourne la réponse du serveur
  } catch (error) {
    console.error("Erreur de message:", error);
    return "Désolé, une erreur s'est produite.";
  }
};

export default function ChatPage() {
  const [messages, setMessages] = useState<{ content: string; sender: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Si le champ est vide, ne rien faire
    if (!input.trim()) return;

    // Ajout du message de l'utilisateur dans l'état
    const userMessage = { content: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Réinitialisation de l'entrée utilisateur
    setInput("");
    setLoading(true); // Début du chargement

    try {
      // Envoi de la requête à l'API et récupération de la réponse
      const reply = await sendMessage(input);

      // Ajout de la réponse de l'assistant dans l'état
      const botMessage = { content: reply, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      // Gestion des erreurs d'appel API
      setMessages((prevMessages) => [...prevMessages, { content: "Une erreur s'est produite.", sender: "bot" }]);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  return (
    <div className="mx-auto p-3 bg-white rounded-lg shadow-lg h-[97%] flex flex-col">
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
