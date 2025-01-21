"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAIModelStore } from "@/lib/stores/aiModelStore";
import { Search } from "lucide-react";

export const Header = ({ pageTitle }: { pageTitle: string }) => {
  const { model, setModel } = useAIModelStore();
  return (
    <header className="sticky left-0 right-0 top-0 z-50 border-b md:mb-0 bg-white/95 shadow-sm w-full">
      <div className="flex items-center justify-between h-16 w-full">
        <div className="flex items-center space-x-4 ml-4">
          <SidebarTrigger className="h-5 w-5 cursor-pointer hover:text-indigo-200 transition-colors" />
          <h1 className="lg:text-2xl text-xl font-bold ml-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-[120px] md:max-w-[500px] lg:max-w-[800px]">
            {pageTitle}
          </h1>
        </div>
        <div className="flex items-center space-x-4 mr-4">
          <Search className="h-5 w-5 cursor-pointer hover:text-indigo-200 transition-colors" />
          <select
            value={model}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const value = e.target.value;
              if (value === "claude" || value === "gpt") {
                setModel(value);
              }
            }}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="claude">Claude</option>
            <option value="gpt">Chat GPT-3</option>
          </select>
        </div>
      </div>
    </header>
  );
};

//TODO
