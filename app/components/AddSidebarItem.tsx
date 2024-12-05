"use client";

import { useState } from "react";
import { IconPicker } from "./IconPicker";
import { Plus } from "lucide-react";

export default function AddSidebarItem() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("MessageCircle");

  const handleAddItem = async () => {
    if (!newItemTitle) return;
    try {
      const response = await fetch("/api/sidebar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: newItemTitle,
          icon: selectedIcon
        })
      });

      if (response.ok) {
        setNewItemTitle("");
        setSelectedIcon("MessageCircle");
        setIsExpanded(false);
        window.location.reload();
        window.location.href = newItemTitle.toLowerCase();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
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
            <IconPicker selectedIcon={selectedIcon} onSelectIcon={setSelectedIcon} />
            <input
              type="text"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              placeholder="Nom de l'élément"
              className="w-[90%] text-sm px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button onClick={handleAddItem} className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              <Plus size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
