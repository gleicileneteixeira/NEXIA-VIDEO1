"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "./globals.css";

const PUBLIC_PATHS = ["/login", "/register"];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicPage = PUBLIC_PATHS.includes(pathname);

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col pl-[72px] selection:bg-purple-500/30 selection:text-purple-200">
        {isPublicPage ? (
          <>{children}</>
        ) : (
          <div className="flex h-full">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
              <Header />
              <div className="flex-1 p-6 overflow-y-auto">{children}</div>
            </main>
          </div>
        )}
      </body>
    </html>
  );
}
