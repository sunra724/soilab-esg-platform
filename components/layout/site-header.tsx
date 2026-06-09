import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";

import { LinkButton } from "@/components/ui/button";

const navigation = [
  { href: "/services/assessment", label: "진단" },
  { href: "/services/consulting", label: "컨설팅" },
  { href: "/services/reporting", label: "보고서" },
  { href: "/news", label: "뉴스" },
  { href: "/cases", label: "사례" },
  { href: "/contact", label: "문의" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/10 bg-cloud-50/92 backdrop-blur">
      <div className="page-shell flex min-h-16 items-center justify-between gap-5">
        <Link className="focus-ring flex items-center gap-3 rounded-md" href="/">
          <span className="flex size-9 items-center justify-center rounded-md bg-ink-950 text-sm font-black text-white">S</span>
          <span className="leading-tight">
            <strong className="block text-sm font-bold text-ink-950">SOILAB</strong>
            <span className="block text-xs font-medium text-ink-500">ESG Platform</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="주요 메뉴">
          {navigation.map((item) => (
            <Link
              className="focus-ring rounded-md px-3 py-2 text-sm font-semibold text-ink-700 transition hover:bg-ink-900/5 hover:text-ink-950"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LinkButton href="/app" variant="secondary" size="sm">
            플랫폼 보기
          </LinkButton>
          <LinkButton href="/contact" size="sm">
            상담 요청
            <ArrowRight size={16} aria-hidden />
          </LinkButton>
        </div>

        <details className="group relative md:hidden">
          <summary className="focus-ring flex size-10 list-none items-center justify-center rounded-md border border-ink-900/10 bg-white text-ink-900 [&::-webkit-details-marker]:hidden">
            <Menu size={20} aria-hidden />
            <span className="sr-only">메뉴 열기</span>
          </summary>
          <div className="surface absolute right-0 top-12 w-[min(86vw,320px)] rounded-md p-3">
            <nav className="grid gap-1" aria-label="모바일 메뉴">
              {navigation.map((item) => (
                <Link className="rounded-md px-3 py-3 text-sm font-semibold text-ink-700 hover:bg-ink-900/5" href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link className="rounded-md px-3 py-3 text-sm font-semibold text-earth-700 hover:bg-earth-50" href="/app">
                플랫폼 보기
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
