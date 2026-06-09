import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.title,
    description: service.summary
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <>
      <section className="border-b border-ink-900/10 bg-cloud-50">
        <div className="page-shell grid gap-10 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Badge tone="earth">{service.eyebrow}</Badge>
            <h1 className="mt-6 text-balance text-4xl font-black leading-tight text-ink-950 md:text-6xl">{service.title}</h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-ink-700">{service.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/contact" size="lg">
                상담 요청
                <ArrowRight size={18} aria-hidden />
              </LinkButton>
              <LinkButton href="/app" variant="secondary" size="lg">
                데모 화면 보기
              </LinkButton>
            </div>
          </div>
          <div className="surface rounded-md p-6">
            <Icon className="text-earth-600" size={34} aria-hidden />
            <h2 className="mt-5 text-2xl font-bold text-ink-950">핵심 키워드</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.keywords.map((keyword) => (
                <span className="rounded-md bg-earth-100 px-3 py-2 text-sm font-semibold text-earth-700" key={keyword}>
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-10 py-16 md:py-20 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Deliverables" title="산출물" description="기관 제출과 내부 실행에 바로 연결되는 항목을 우선했습니다." />
          <div className="mt-8 grid gap-3">
            {service.deliverables.map((item) => (
              <div className="flex gap-3 rounded-md border border-ink-900/10 bg-white p-4" key={item}>
                <CheckCircle2 className="mt-0.5 shrink-0 text-earth-600" size={18} aria-hidden />
                <span className="text-sm font-semibold leading-6 text-ink-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="Process" title="진행 흐름" description="플랫폼 화면과 컨설팅 산출물의 순서를 맞춰 운영 부담을 줄입니다." />
          <ol className="mt-8 grid gap-3">
            {service.process.map((item, index) => (
              <li className="flex gap-4 rounded-md bg-ink-950 p-4 text-white" key={item}>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-white text-sm font-black text-ink-950">
                  {index + 1}
                </span>
                <span className="self-center text-sm font-semibold">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
