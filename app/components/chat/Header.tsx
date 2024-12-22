import { SidebarTrigger } from "../ui/sidebar";
import { Search, User } from "lucide-react";

export const Header = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <header className=" text-black p-4 shadow-lg">
      <div className="container mx-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="h-5 w-5 cursor-pointer hover:text-indigo-200 transition-colors" />
          <h1 className="text-2xl font-bold ml-2">{pageTitle}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="h-5 w-5 cursor-pointer hover:text-indigo-200 transition-colors" />
          <User className="h-8 w-8 text-blue-600" />
        </div>
      </div>
    </header>
  );
};
