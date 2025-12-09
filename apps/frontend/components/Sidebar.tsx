// apps/frontend/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Settings, BarChart2 } from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/posts", label: "Posts", icon: FileText },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const path = usePathname() || "/dashboard";

  return (
    <aside className="w-72 bg-white border-r h-screen sticky top-0">
      <div className="px-6 py-5 border-b">
        <Link href="/dashboard" className="text-lg font-semibold">
          LinkedIn Agentic AI
        </Link>
      </div>

      <nav className="p-4 space-y-1">
        {nav.map((item) => {
          const active = path === item.href || path?.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                active ? "bg-slate-100 font-medium" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-4 border-t">
        <div className="text-sm text-slate-500">Org: Example Co.</div>
      </div>
    </aside>
  );
}
