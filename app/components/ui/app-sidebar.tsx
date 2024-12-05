import { Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "./sidebar";
import Logout from "../logout";
import { auth } from "@/auth";
import AddSidebarItem from "../AddSidebarItem";
import { icons } from "lucide-react";
import RemoveSideBarItem from "../RemoveSideBarItem";
import { db } from "@/lib/db";
import Link from "next/link";

interface SidebarProps {
  pages: {
    id: string;
    title: string;
    url: string;
    icon: string;
    userId: string;
  }[];
}

// Menu items.
export async function AppSidebar({ pages }: SidebarProps) {
  const session = await auth();

  // Récupérer uniquement les pages de l'utilisateur connecté

  const user = await db.user.findUnique({
    where: {
      email: session?.user?.email ?? undefined
    }
  });

  const userPages = pages.filter((page) => page.userId === user?.id);

  // Convertir le nom de l'icône en composant
  const getIcon = (iconName: string) => {
    const LucideIcon = icons[iconName as keyof typeof icons];
    return LucideIcon ? <LucideIcon size={24} /> : null;
  };

  const username = session?.user?.name;

  return (
    <Sidebar className="">
      <SidebarContent className="">
        <SidebarGroup>
          <div className="flex justify-between w-full items-center mt-1.5 z-[999]">
            <SidebarGroupLabel>
              <p className="text-lg text-black">{username ? username : "Loading..."}</p>
              <a href="/settings">
                <Settings height={16} width={16} className="ml-4" />
              </a>
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {userPages.map((page) => (
                <SidebarMenuItem key={page.id}>
                  <SidebarMenuButton asChild>
                    <Link href={page.url} className="group/item flex items-center relative">
                      {getIcon(page.icon)}
                      <span className="ml-2">{page.title}</span>
                      <RemoveSideBarItem id={page.id} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <AddSidebarItem />
        </SidebarGroup>
      </SidebarContent>
      <Logout />
    </Sidebar>
  );
}
