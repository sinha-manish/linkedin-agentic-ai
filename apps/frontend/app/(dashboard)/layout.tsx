// apps/frontend/app/(dashboard)/layout.tsx
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { LayoutProps } from "@/types/appTypes";


export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 md:p-8 lg:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
