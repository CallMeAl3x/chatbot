import { Page } from "@prisma/client";

export const pageService = {
  async getPages(): Promise<Page[]> {
    const response = await fetch("/api/pages");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des pages");
    }
    return response.json();
  }
};
