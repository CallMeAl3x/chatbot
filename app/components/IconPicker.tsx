"use client";

import { useState } from "react";
import { icons } from "lucide-react";

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
}

export function IconPicker({ selectedIcon, onSelectIcon }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const IconComponent = icons[selectedIcon];

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-1 border border-gray-300 rounded-md hover:bg-gray-100">
        {IconComponent && <IconComponent size={16} />}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 p-1 bg-white border border-gray-300 rounded-md shadow-lg grid grid-cols-4 gap-1 max-h-40 overflow-y-auto w-36">
          {Object.keys(icons).map((iconName) => {
            const Icon = icons[iconName];
            return (
              <button
                key={iconName}
                onClick={() => {
                  onSelectIcon(iconName);
                  setIsOpen(false);
                }}
                className="p-1 hover:bg-gray-100 rounded-md"
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
