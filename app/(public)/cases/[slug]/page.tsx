import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { cases } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = cases.find((caseItem) => caseItem.slug === slug);
  return item ? { title: item.title, description: item.summary } : {};
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = cases.find((caseItem) => caseItem.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="page-shell max-w-4xl py-16 md:py-20">
      <Badge tone="earth">{item.sector}</Badge>
      <h1 className="mt-6 text-balance text-4xl font-black leading-tight text-ink-950 md:text-5xl">{item.title}</h1>
      <p className="mt-4 text-sm font-semibold text-ink-500">{formatDate(item.date)}</p>
      <div className="mt-10 grid gap-6 md:grid-cols-[1fr_280px]">
        <div className="space-y-6 text-lg leading-9 text-ink-700">
          <p>{item.summary}</p>
          <p>
            프로젝트는 진단 지표, 활동데이터, 개선과제, 보고서 초안을 하나의 흐름으로 관리하는 방식으로 운영했습니다. 이 구조는 유사한 기관 과업에도 반복 적용할 수 있습니다.
          </p>
        </div>
        <aside className="rounded-md bg-ink-950 p-5 text-white">
          <span className="text-xs font-bold text-white/58">Impact</span>
          <strong className="mt-3 block text-2xl leading-snug">{item.impact}</strong>
        </aside>
      </div>
      <div className="mt-10">
        <LinkButton href="/cases" variant="secondary">
          사례 목록
        </LinkButton>
      </div>
    </article>
  );
}
