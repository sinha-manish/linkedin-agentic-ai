// apps/frontend/app/layout.tsx
import QueryProvider from "@/lib/QueryProvider";
import "@/styles/globals.css";
import { LayoutProps } from "@/types/appTypes";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-slate-900`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
