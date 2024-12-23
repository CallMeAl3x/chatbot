import { SidebarTrigger } from "../ui/sidebar";
import { Search } from "lucide-react";

export const Header = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <header className="sticky left-0 right-0 top-0 z-10 border-b md:mb-0 bg-white/95 shadow-sm w-full">
      <div className="flex items-center justify-between h-16 w-full">
        <div className="flex items-center space-x-4 ml-4">
          <SidebarTrigger className="h-5 w-5 cursor-pointer hover:text-indigo-200 transition-colors" />
          <h1 className="text-2xl font-bold ml-2">{pageTitle}</h1>
        </div>
        <div className="flex items-center space-x-4 mr-4">
          <Search className="h-5 w-5 cursor-pointer hover:text-indigo-200 transition-colors" />
        </div>
      </div>
    </header>
  );
};

//TODO
