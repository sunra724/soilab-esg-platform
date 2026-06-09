import { ArrowRight, CheckCircle2, FileText, LineChart, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { DashboardBackdrop } from "@/components/product/dashboard-backdrop";
import { ServiceCardGrid } from "@/components/product/service-card-grid";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { capabilityRail, cases, newsItems, platformStats, rfpReadinessItems } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-900/10 bg-cloud-50">
        <DashboardBackdrop />
        <div className="page-shell relative z-10 grid min-h-[calc(100svh-64px)] content-center gap-10 py-20 md:min-h-[720px] md:py-24">
          <div className="max-w-4xl">
            <Badge tone="earth">ESG 진단 · 분석 · 보고서 · 뉴스 클리핑</Badge>
            <h1 className="mt-6 text-balance text-5xl font-black leading-[1.05] text-ink-950 md:text-7xl">
              SOILAB ESG Platform
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-ink-700 md:text-xl">
              기관 과업지시서가 반복 요구하는 ESG 기능을 하나의 플랫폼으로 묶어 진단 입력부터 보고서 발행, 뉴스 배포까지 운영합니다.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/contact" size="lg">
                상담 요청
                <ArrowRight size={18} aria-hidden />
              </LinkButton>
              <LinkButton href="/app" variant="secondary" size="lg">
                플랫폼 데모
              </LinkButton>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {platformStats.map((stat) => (
              <div className="rounded-md border border-white/70 bg-white/78 p-4 shadow-sm backdrop-blur" key={stat.label}>
                <span className="text-xs font-bold text-ink-500">{stat.label}</span>
                <strong className="mt-2 block text-2xl text-ink-950">{stat.value}</strong>
                <span className="mt-1 block text-xs font-semibold text-earth-700">{stat.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink-900/10 bg-white py-5">
        <div className="page-shell flex flex-wrap gap-2">
          {capabilityRail.map((item) => (
            <span className="rounded-md border border-ink-900/10 bg-cloud-50 px-3 py-2 text-sm font-semibold text-ink-700" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="page-shell py-16 md:py-20">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Core Services"
            title="발주처 과업 용어를 그대로 실행 화면으로 연결합니다"
            description="공개 포털은 리드 전환을 담당하고, 인증 영역은 평가·분석·보고서 생성까지 이어지는 운영 도구로 설계했습니다."
          />
          <Link className="text-sm font-bold text-earth-700 hover:text-earth-600" href="/services/assessment">
            평가 흐름 보기
          </Link>
        </div>
        <ServiceCardGrid />
      </section>

      <section className="border-y border-ink-900/10 bg-white py-16 md:py-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="RFP Ready"
            title="입찰 과업지시서 반복 요구사항을 기능으로 정리했습니다"
            description="진단평가, 교육 운영, 컨설팅, 뉴스레터 과업에서 반복되는 운영 요구를 체크리스트와 데이터 구조로 반영했습니다."
          >
            <LinkButton href="/rfp-readiness" variant="secondary">
              대응 매트릭스 보기
              <ArrowRight size={17} aria-hidden />
            </LinkButton>
          </SectionHeading>
          <div className="grid gap-3">
            {rfpReadinessItems.slice(0, 5).map((item) => (
              <Link className="grid gap-3 rounded-md border border-ink-900/10 bg-cloud-50 p-4 hover:border-earth-600/30 md:grid-cols-[180px_1fr]" href="/rfp-readiness" key={item.area}>
                <div>
                  <span className="text-xs font-bold text-water-600">{item.status}</span>
                  <h3 className="mt-2 text-base font-bold text-ink-950">{item.area}</h3>
                </div>
                <p className="text-sm leading-6 text-ink-600">{item.requirement}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-950 py-16 text-white md:py-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Platform"
            title="블랙박스가 아닌 설명 가능한 채점"
            description="지표별 배점과 최대점수, 활동데이터 배출계수를 공개해 동일 입력에서 같은 점수와 배출량이 재현되도록 구성했습니다."
            inverted
          />
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { icon: LineChart, title: "점수 산식", body: "응답값 ÷ 최대점수 × 배점" },
              { icon: ShieldCheck, title: "RLS 권한", body: "기업·컨설턴트·관리자 역할 분리" },
              { icon: FileText, title: "보고서 발행", body: "진단보고서와 지속가능경영보고서 템플릿" }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div className="rounded-md border border-white/12 bg-white/7 p-5" key={item.title}>
                  <Icon className="text-earth-100" size={24} aria-hidden />
                  <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/68">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-10 py-16 md:py-20 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Cases"
            title="진단 이후의 실행 과제까지 남깁니다"
            description="사례 CMS는 초기 더미 데이터로 구성했고, Supabase 연결 후 공개 상태와 본문을 관리할 수 있습니다."
          />
          <div className="mt-8 grid gap-3">
            {cases.slice(0, 2).map((item) => (
              <Link className="surface rounded-md p-5 hover:border-earth-600/30" href={`/cases/${item.slug}`} key={item.slug}>
                <span className="text-xs font-bold text-water-600">{item.sector}</span>
                <h3 className="mt-2 text-xl font-bold text-ink-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600">{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="News"
            title="뉴스는 요약과 원문 링크만 공개합니다"
            description="저작권 리스크를 줄이기 위해 원문 전문 저장·노출을 피하고, 관리자 승인 이후 게시합니다."
          />
          <div className="mt-8 grid gap-3">
            {newsItems.slice(0, 3).map((item) => (
              <Link className="flex gap-3 rounded-md border border-ink-900/10 bg-white p-4 hover:border-earth-600/30" href={`/news/${item.slug}`} key={item.slug}>
                <CheckCircle2 className="mt-0.5 shrink-0 text-earth-600" size={18} aria-hidden />
                <div>
                  <span className="text-xs font-bold text-water-600">{item.category}</span>
                  <h3 className="mt-1 text-base font-bold text-ink-950">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ink-600">{item.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
