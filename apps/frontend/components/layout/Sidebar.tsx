"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Settings, BarChart2, PanelLeftClose, PanelLeftOpen } from "lucide-react";

const nav = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/posts", icon: FileText, label: "Posts" },
  { href: "/dashboard/analytics", icon: BarChart2, label: "Analytics" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-4 top-4 bottom-4 w-64 
              rounded-2xl border border-[var(--border)]
              bg-[var(--bg-elevated)] backdrop-blur-xl
              shadow-[0_4px_20px_rgba(0,0,0,0.06)]
              transition-all duration-300`}
    >

      <div className="flex items-center justify-between px-4 py-5">
        {!collapsed && (
          <div className="text-lg font-semibold tracking-tight">
            LinkedIn Agentic AI
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          {collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {nav.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px]
              hover:bg-[var(--brand-soft)]
              transition-colors
              ${active ? "bg-[var(--brand-soft)] text-[var(--brand)] font-medium" : "text-[var(--text-2)]"}`}
            >
              <Icon size={18} strokeWidth={1.75} />
              {!collapsed && label}
            </Link>

          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 text-sm text-neutral-500 dark:text-neutral-400">
        {!collapsed && "Org: Example Co."}
      </div>
    </aside>
  );
}
