// lib/chat.ts
type ChatResponse = {
  reply: string;
  // Ajoutez d'autres champs de réponse si nécessaire
};

export class ChatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatError";
  }
}

export const chatService = {
  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: message })
      });

      if (!response.ok) {
        throw new ChatError(`Erreur HTTP: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      return data.reply;
    } catch (error) {
      console.error("Erreur de chat:", error);
      if (error instanceof ChatError) {
        throw error;
      }
      throw new ChatError("Une erreur inattendue s'est produite");
    }
  }
};
