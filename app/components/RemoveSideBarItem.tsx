import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface RemoveSideBarItemProps {
  pageId: string;
  onRemove: () => void;
}

export default function RemoveSideBarItem({ pageId, onRemove }: RemoveSideBarItemProps) {
  const router = useRouter();

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await fetch("/api/pages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: pageId })
      });

      if (response.ok) {
        onRemove();
        router.push("/");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <button className="hidden group-hover/item:block ml-auto" onClick={handleRemove} aria-label="Supprimer la page">
      <Trash size={16} />
    </button>
  );
}
