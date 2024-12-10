// hooks/usePages.ts
"use client";

import { pageService } from "@/lib/services/page-service";
import { Page } from "@prisma/client";
import { useCallback, useState } from "react";

export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPages = useCallback(async () => {
    try {
      const userPages = await pageService.getPages();
      setPages(userPages);
    } catch (error) {
      console.error("Erreur lors du chargement des pages:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addPage = useCallback((newPage: Page) => {
    setPages((currentPages) => [...currentPages, newPage]);
  }, []);

  const deletePage = useCallback((pageId: string) => {
    setPages((currentPages) => currentPages.filter((page) => page.id !== pageId));
  }, []);

  return {
    pages,
    loading,
    loadPages,
    addPage,
    deletePage
  };
}
