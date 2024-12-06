import { auth } from "@/auth";
import { AppSidebar } from "../components/ui/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../components/ui/sidebar";
import { db } from "@/lib/db";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  const userPages = await db.page.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  return (
    <SidebarProvider className="">
      <AppSidebar pages={userPages} />
      <main className="w-full h-screen max-h-screen overflow-hidden">
        <SidebarTrigger className="" />
        {children}
      </main>
    </SidebarProvider>
  );
}
