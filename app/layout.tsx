import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { AuthLayout } from "./components/AppLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SessionProvider session={session}>
          <AuthLayout>{children}</AuthLayout>
        </SessionProvider>
      </body>
    </html>
  );
}
