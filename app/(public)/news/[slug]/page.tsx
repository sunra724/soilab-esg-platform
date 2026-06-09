import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { newsItems } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = newsItems.find((news) => news.slug === slug);
  return item ? { title: item.title, description: item.summary } : {};
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = newsItems.find((news) => news.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <article className="page-shell max-w-3xl py-16 md:py-20">
      <Badge tone="water">{item.category}</Badge>
      <h1 className="mt-6 text-balance text-4xl font-black leading-tight text-ink-950 md:text-5xl">{item.title}</h1>
      <p className="mt-4 text-sm font-semibold text-ink-500">
        {item.source} · {formatDate(item.publishedAt)}
      </p>
      <div className="mt-10 space-y-6 text-lg leading-9 text-ink-700">
        <p>{item.summary}</p>
        <p>
          SOILAB 뉴스 클리핑은 기관 발표와 산업 뉴스를 운영자가 검토한 뒤 자체 요약 형태로 제공합니다. 실제 의사결정에는 원문과 최신 공시 자료를 함께 확인하는 절차를 권장합니다.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-2">
        {item.keywords.map((keyword) => (
          <span className="rounded-md bg-cloud-100 px-3 py-2 text-sm font-semibold text-ink-700" key={keyword}>
            {keyword}
          </span>
        ))}
      </div>
      <div className="mt-10">
        <LinkButton href="/news" variant="secondary">
          목록으로
        </LinkButton>
      </div>
    </article>
  );
}
