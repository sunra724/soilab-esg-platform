import { ClipboardList, Inbox, LayoutDashboard, Newspaper, Settings, Users } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const nav = [
  { href: "/admin", label: "운영 현황", icon: LayoutDashboard },
  { href: "/admin/indicators", label: "지표", icon: Settings },
  { href: "/admin/projects", label: "과업", icon: ClipboardList },
  { href: "/admin/news", label: "뉴스", icon: Newspaper },
  { href: "/admin/inquiries", label: "문의", icon: Inbox },
  { href: "/admin/users", label: "사용자", icon: Users }
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f6f4]">
      <header className="border-b border-ink-900/10 bg-ink-950 text-white">
        <div className="flex min-h-16 items-center justify-between gap-4 px-4 md:px-7">
          <Link className="focus-ring rounded-md text-sm font-bold" href="/admin">
            SOILAB Admin
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="관리자 메뉴">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-white/72 hover:bg-white/10 hover:text-white" href={item.href} key={item.href}>
                  <Icon size={16} aria-hidden />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-ink-950" href="/app">
            플랫폼
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-7 md:py-8">{children}</main>
    </div>
  );
}
