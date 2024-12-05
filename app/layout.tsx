import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SidebarProvider } from "./components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SidebarProvider>
          <ToastContainer position="top-left" />
          <main className="w-screen">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
