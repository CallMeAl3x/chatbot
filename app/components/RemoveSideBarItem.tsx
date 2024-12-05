"use client";

import { Trash } from "lucide-react";

export default function RemoveSideBarItem({ id }: { id: string }) {
  const handleTrash = async () => {
    const response = await fetch("/api/sidebar", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    });

    if (response.ok) {
      window.location.href = "/home";
    }
  };

  return (
    <button className="hidden group-hover/item:block ml-auto" onClick={handleTrash}>
      <Trash size={16} />
    </button>
  );
}
