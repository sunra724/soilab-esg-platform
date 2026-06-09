import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { educationProgramTemplates, rfpReadinessItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "입찰 과업 대응",
  description: "나라장터 ESG 진단평가, 교육 운영, 컨설팅 과업지시서 요구사항에 대응하는 소이랩 플랫폼 구성입니다."
};

export default function RfpReadinessPage() {
  return (
    <>
      <section className="border-b border-ink-900/10 bg-cloud-50">
        <div className="page-shell grid gap-10 py-16 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            eyebrow="RFP Readiness"
            title="나라장터 ESG 과업지시서 요구를 플랫폼 기능으로 대비합니다"
            description="경기도 진단평가, 경기도·광명·의왕 ESG 교육, 서울·세종 ESG 컨설팅 제안요청서에서 반복되는 운영 요구사항을 기능 단위로 정리했습니다."
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/contact" size="lg">
                제안 상담
                <ArrowRight size={18} aria-hidden />
              </LinkButton>
              <LinkButton href="/admin/projects" variant="secondary" size="lg">
                관리자 체크리스트
              </LinkButton>
            </div>
          </SectionHeading>
          <div className="surface rounded-md p-5">
            <h2 className="text-xl font-bold text-ink-950">검토한 입찰 유형</h2>
            <div className="mt-5 grid gap-3">
              {["ESG 진단평가 300개사 및 5개년 성과분석", "온·오프라인 ESG 인식확산 교육", "찾아가는 ESG 교육과 수강생 통합 관리", "중소기업 ESG 컨설팅·아카데미·뉴스레터", "일반·심화 컨설팅과 사후 이행점검"].map((item) => (
                <div className="flex gap-3 rounded-md border border-ink-900/10 bg-white p-3" key={item}>
                  <CheckCircle2 className="mt-0.5 shrink-0 text-earth-600" size={17} aria-hidden />
                  <span className="text-sm font-semibold leading-6 text-ink-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 md:py-20">
        <SectionHeading
          eyebrow="Requirement Matrix"
          title="반복 요구사항 대응 매트릭스"
          description="현재 반영된 기반과 다음 구현 과제를 함께 보여 제안서에 바로 넣을 수 있는 구조로 만들었습니다."
        />
        <div className="mt-10 grid gap-4">
          {rfpReadinessItems.map((item) => (
            <article className="surface grid gap-5 rounded-md p-5 lg:grid-cols-[240px_1fr_220px]" key={item.area}>
              <div>
                <Badge tone={item.status === "기반 반영" ? "earth" : item.status === "스키마 반영" ? "water" : "sun"}>{item.status}</Badge>
                <h2 className="mt-4 text-xl font-bold leading-snug text-ink-950">{item.area}</h2>
                <p className="mt-2 text-xs font-semibold leading-5 text-ink-500">{item.source}</p>
              </div>
              <div className="grid gap-3 text-sm leading-6">
                <p>
                  <strong className="text-ink-950">과업 요구: </strong>
                  <span className="text-ink-600">{item.requirement}</span>
                </p>
                <p>
                  <strong className="text-ink-950">플랫폼 대응: </strong>
                  <span className="text-ink-600">{item.platform}</span>
                </p>
              </div>
              <div className="rounded-md bg-cloud-100 p-4">
                <span className="text-xs font-bold text-ink-500">Next</span>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink-800">{item.next}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink-950 py-16 text-white md:py-20">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Education Ops"
            title="교육 용역은 LMS보다 운영 증빙이 먼저입니다"
            description="과업지시서는 화려한 강의 페이지보다 신청자 데이터, 출결, 서명부, 만족도, 회차별 보고서, 강사 프로필, 증빙 사진을 반복 요구합니다."
            inverted
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {educationProgramTemplates.map((program) => (
              <div className="rounded-md border border-white/12 bg-white/7 p-5" key={program.title}>
                <Badge tone="earth">{program.mode}</Badge>
                <h2 className="mt-5 text-xl font-bold">{program.title}</h2>
                <p className="mt-2 text-sm font-semibold text-white/58">{program.duration}</p>
                <ul className="mt-5 grid gap-2">
                  {program.topics.map((topic) => (
                    <li className="text-sm leading-6 text-white/72" key={topic}>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
