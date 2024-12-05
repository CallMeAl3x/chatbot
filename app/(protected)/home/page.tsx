"use client";

import { FileDropzone } from "@/app/components/ui/file-dropzone";
import { SimpleFileUpload } from "@/app/components/ui/file-upload";
import { UploadedFileItem } from "@/app/components/ui/uploaded-file-item";
import { chatService } from "@/lib/chat-service";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [messages, setMessages] = useState<{ content: string; sender: string }[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveFile = (fileToRemove: File) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const formatFileSize = (size: number) => {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let unitIndex = 0;
    let fileSize = size;

    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024;
      unitIndex++;
    }

    return `${fileSize.toFixed(2)} ${units[unitIndex]}`;
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch(`/api/messages?pageTitle=home`);
        if (response.ok) {
          const data = await response.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          } else {
            // Si aucun message n'existe, afficher le message de bienvenue
            const welcomeMessage = {
              content: `Bienvenue dans le chat général. Je suis votre assistant virtuel, prêt à vous aider et à répondre à vos questions. Comment puis-je vous assister aujourd'hui ?`,
              sender: "bot"
            };
            setMessages([welcomeMessage]);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des messages:", error);
        // En cas d'erreur, afficher quand même le message de bienvenue
        const welcomeMessage = {
          content: `Bienvenue dans le chat général. Je suis votre assistant virtuel, prêt à vous aider et à répondre à vos questions. Comment puis-je vous assister aujourd'hui ?`,
          sender: "bot"
        };
        setMessages([welcomeMessage]);
      }
    };
    loadMessages();
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

      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pageTitle: "home",
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
    <FileDropzone onDrop={handleFileUpload} className="h-full">
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

        <div className="flex w-full flex-col">
          {uploadedFiles.length > 0 && (
            <div className="mb-4">
              <ul>
                {uploadedFiles.map((file, index) => (
                  <UploadedFileItem
                    key={index}
                    file={file}
                    fileSize={formatFileSize(file.size)}
                    onRemove={handleRemoveFile} // Passer la fonction de suppression ici
                  />
                ))}
              </ul>
            </div>
          )}
          <div className="flex items-center w-full h-fit mt-auto">
            <SimpleFileUpload onChange={handleFileUpload} />
            <form onSubmit={handleSubmit} className="flex items-center gap-4 mt-auto w-full">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Tapez votre message..."
                className="flex-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>
      </div>
    </FileDropzone>
  );
}
