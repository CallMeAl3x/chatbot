"use client";
import { LogoutButton } from "@/components/auth/logout-button";
import AddSidebarItem from "@/components/sidebar/AddSidebarItem";
import RemoveSideBarItem from "@/components/sidebar/RemoveSideBarItem";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { pageService } from "@/lib/services/page-service";
import { Page } from "@prisma/client";
import { icons, Loader, Settings } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const AppSidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  const getIcon = (iconName: string) => {
    const LucideIcon = icons[iconName as keyof typeof icons];
    return LucideIcon ? <LucideIcon size={24} /> : null;
  };

  useEffect(() => {
    loadPages();
  }, [pathname]);

  const loadPages = async () => {
    try {
      const userPages = await pageService.getPages();
      setPages(userPages);
    } catch (error) {
      console.error("Erreur lors du chargement des pages:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex justify-between w-full items-center mt-1.5 z-[999]">
            <SidebarGroupLabel className="w-full lg:w-auto">
              <Link href="/profile" className="text-lg text-black">
                {session?.user?.name ?? "Loading..."}
              </Link>
              <Link href="/settings">
                <Settings height={16} width={16} className="ml-4" />
              </Link>
              <SidebarTrigger className="lg:hidden ml-auto" />
            </SidebarGroupLabel>
          </div>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {loading ? (
                <div className="flex justify-start items-center p-4">
                  <Loader className="h-4 w-4 animate-spin text-gray-500" />
                </div>
              ) : (
                pages.map((page) => (
                  <SidebarMenuItem key={page.id}>
                    <SidebarMenuButton asChild className={`${pathname === `/chat/${page.id}` ? "bg-gray-200" : ""}`}>
                      <Link href={`/chat/${page.id}`} className="group/item flex items-center relative">
                        {getIcon(page.icon)}
                        <span className="ml-2">{page.title}</span>
                        <RemoveSideBarItem pageId={page.id} onRemove={loadPages} />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
          <AddSidebarItem onAdd={loadPages} />
        </SidebarGroup>
      </SidebarContent>
      <LogoutButton />
    </Sidebar>
  );
};
