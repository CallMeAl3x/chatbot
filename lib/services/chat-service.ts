import { Message } from "@prisma/client";
import { toast } from "sonner";
type ChatResponse = {
  reply: string;
  error: string;
  message: string;
};

export class ChatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatError";
  }
}

export const chatService = {
  sendMessage: async (
    content: string,
    fileContent: string,
    pageId: string,
    fileMetadata?: { name: string; size: number; type: string }
  ) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content, fileContent, pageId, fileMetadata })
      });

      const result: ChatResponse = await response.json();

      if (!response.ok) {
        if (result.error === "context_length_exceeded") {
          toast.error(result.message);
        } else {
          toast.error("Une erreur s'est produite.");
        }
        return;
      }

      return result.reply;
    } catch (error) {
      console.error("Erreur de chat:", error);
      throw new ChatError("Une erreur inattendue s'est produite");
    }
  },

  async getMessages(pageId: string): Promise<Message[]> {
    const response = await fetch(`/api/messages/${pageId}`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des messages");
    }
    return response.json();
  }
};
