import { BarChart3, Building2, ClipboardCheck, FileText, Home, Route } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const nav = [
  { href: "/app", label: "대시보드", icon: Home },
  { href: "/app/assessment/new", label: "새 진단", icon: ClipboardCheck },
  { href: "/app/assessment/demo/result", label: "결과", icon: BarChart3 },
  { href: "/app/assessment/demo/analysis", label: "로드맵", icon: Route },
  { href: "/app/reports", label: "보고서", icon: FileText },
  { href: "/app/companies", label: "기업", icon: Building2 }
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cloud-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-ink-900/10 bg-white lg:block">
        <div className="flex h-16 items-center gap-3 border-b border-ink-900/10 px-5">
          <span className="flex size-9 items-center justify-center rounded-md bg-ink-950 text-sm font-black text-white">S</span>
          <div>
            <strong className="block text-sm text-ink-950">SOILAB ESG</strong>
            <span className="block text-xs text-ink-500">Platform Console</span>
          </div>
        </div>
        <nav className="grid gap-1 p-3" aria-label="플랫폼 메뉴">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                className="focus-ring flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-ink-700 hover:bg-earth-50 hover:text-earth-700"
                href={item.href}
                key={item.href}
              >
                <Icon size={18} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-ink-900/10 bg-cloud-50/92 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 md:px-7">
            <Link className="focus-ring rounded-md text-sm font-bold text-ink-950 lg:hidden" href="/">
              SOILAB ESG
            </Link>
            <div className="hidden text-sm text-ink-500 lg:block">기업 ESG 진단 운영 콘솔</div>
            <div className="flex items-center gap-2">
              <span className="hidden rounded-md border border-earth-600/20 bg-earth-100 px-2.5 py-1 text-xs font-semibold text-earth-700 sm:inline-flex">
                Demo
              </span>
              <Link className="rounded-md px-3 py-2 text-sm font-semibold text-ink-600 hover:bg-ink-900/5" href="/">
                포털
              </Link>
              <Link className="rounded-md bg-ink-950 px-3 py-2 text-sm font-semibold text-white" href="/admin">
                관리자
              </Link>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 md:px-7 md:py-8">{children}</main>
      </div>
    </div>
  );
}
