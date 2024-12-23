"use client";
import { SidebarTrigger } from "@/app/components/ui/sidebar";
import { MessageSquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProtectedLandingPage() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          icon: "MessageCircle"
        })
      });

      const page = await response.json();
      if (page.id) {
        router.push(`/chat/${page.id}`);
      }
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 relative">
        <SidebarTrigger className="h-5 w-5 cursor-pointer transition-colors absolute top-5 left-4" />
        <div className="max-w-2xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Bienvenue sur votre ChatBot</h1>
            <p className="mt-3 text-lg text-gray-600">Commencez une nouvelle conversation ou créez une page personnalisée</p>
          </div>

          <form onSubmit={handleCreatePage} className="mt-8 space-y-6">
            <div className="flex gap-4 lg:flex-row flex-col items-center">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Donnez un nom à votre conversation..."
                className="flex-1 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-4 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 flex items-center gap-2"
              >
                <MessageSquarePlus size={20} />
                Créer
              </button>
            </div>
          </form>

          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Suggestions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Assistant personnel", "Aide à la rédaction", "Analyse de données", "Brainstorming"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setTitle(suggestion)}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <h3 className="font-medium text-gray-900">{suggestion}</h3>
                  <p className="text-sm text-gray-500">Commencer une conversation sur ce thème</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
