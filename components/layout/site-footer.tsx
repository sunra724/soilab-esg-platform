import Link from "next/link";

const footerLinks = [
  { href: "/services/assessment", label: "ESG 진단" },
  { href: "/services/consulting", label: "심화 컨설팅" },
  { href: "/services/reporting", label: "보고서 발행" },
  { href: "/news", label: "뉴스 클리핑" },
  { href: "/programs", label: "지원사업" },
  { href: "/contact", label: "문의" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-900/10 bg-ink-950 text-white">
      <div className="page-shell grid gap-10 py-12 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-white text-sm font-black text-ink-950">S</span>
            <div>
              <strong className="block text-sm">SOILAB ESG Platform</strong>
              <span className="block text-xs text-white/58">esg.soilabcoop.kr</span>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/68">
            기관 과업지시서가 반복 요구하는 ESG 진단, 분석, 보고서, 뉴스 클리핑을 하나의 운영 플랫폼으로 묶습니다.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {footerLinks.map((item) => (
            <Link className="rounded-md py-1 text-sm font-medium text-white/72 hover:text-white" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="page-shell flex flex-col gap-2 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <span>© 2026 SOILAB. All rights reserved.</span>
          <span>개인정보보호 · 뉴스 저작권 준수 · Supabase RLS 기반 설계</span>
        </div>
      </div>
    </footer>
  );
}
