import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { cases } from "@/lib/data";

export const metadata: Metadata = {
  title: "ESG 수행 사례",
  description: "소이랩 ESG 진단, 컨설팅, 보고서 수행 사례입니다."
};

export default function CasesPage() {
  return (
    <section className="page-shell py-16 md:py-20">
      <SectionHeading
        eyebrow="Cases"
        title="평가에서 보고서까지 이어진 사례"
        description="초기에는 데모 콘텐츠로 구성되어 있으며, 관리자 CMS와 Supabase 연결 후 공개 사례로 운영됩니다."
      />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {cases.map((item) => (
          <Link className="surface flex min-h-[280px] flex-col justify-between rounded-md p-5 hover:border-earth-600/30" href={`/cases/${item.slug}`} key={item.slug}>
            <div>
              <Badge tone="earth">{item.sector}</Badge>
              <h2 className="mt-5 text-xl font-bold leading-snug text-ink-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink-600">{item.summary}</p>
            </div>
            <span className="mt-6 text-sm font-bold text-water-600">{item.impact}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
