import { auth } from "@/auth";
import { AuthLayout } from "@/components/layout/AppLayout";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | IDK Chatbot",
  description: "Chat with our AI assistant"
};
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
