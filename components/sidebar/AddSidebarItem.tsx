import { IconPicker } from "@/components/sidebar/IconPicker";
import { ArrowRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AddSidebarItemProps {
  onAdd: () => void;
}

export default function AddSidebarItem({ onAdd }: AddSidebarItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("MessageCircle");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!title || loading) return;
    setLoading(true);
    try {
      const response = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, icon })
      });

      if (response.ok) {
        const page = await response.json();
        setTitle("");
        setIcon("MessageCircle");
        setIsExpanded(false);
        onAdd();
        router.push(`/chat/${page.id}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 border-t border-gray-200 pt-2">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Plus size={18} className="mr-2" />
          <span>Ajouter une conversation</span>
        </button>
      ) : (
        <div className="px-1 py-2 space-y-2">
          <div className="flex items-center gap-2">
            <IconPicker selectedIcon={icon} onSelectIcon={setIcon} />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nom de l'élément"
              className="w-[90%] text-sm px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={loading}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <button
              onClick={handleAdd}
              className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loading}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
