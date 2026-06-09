import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { newsItems } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ESG 뉴스 클리핑",
  description: "ESG, CBAM, RE100, 공급망 실사 뉴스 요약과 원문 링크를 제공합니다."
};

export default function NewsPage() {
  const categories = Array.from(new Set(newsItems.map((item) => item.category)));

  return (
    <section className="page-shell py-16 md:py-20">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="News"
          title="ESG 뉴스 클리핑"
          description="공개 페이지에는 자체 요약과 원문 링크 중심으로 노출합니다. 전문 저장·복제는 하지 않습니다."
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge tone="ink" key={category}>
              {category}
            </Badge>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {newsItems.map((item) => (
          <Link className="surface flex min-h-[260px] flex-col justify-between rounded-md p-5 hover:border-earth-600/30" href={`/news/${item.slug}`} key={item.slug}>
            <div>
              <Badge tone="water">{item.category}</Badge>
              <h2 className="mt-5 text-xl font-bold leading-snug text-ink-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink-600">{item.summary}</p>
            </div>
            <div className="mt-6 text-xs font-semibold text-ink-500">
              {item.source} · {formatDate(item.publishedAt)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
