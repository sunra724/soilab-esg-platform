import type { Metadata } from "next";

import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "소이랩 소개",
  description: "소이랩 ESG 플랫폼의 구축 배경과 운영 방향입니다."
};

export default function AboutPage() {
  return (
    <section className="page-shell py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="About"
          title="ESG 용역을 반복 가능한 제품으로 전환합니다"
          description="SOILAB ESG Platform은 진단, 컨설팅, 보고서, 뉴스 운영을 모듈화해 과업마다 새로 만드는 일을 줄이는 것을 목표로 합니다."
        />
        <div className="grid gap-4">
          {[
            ["데이터 중심", "지표와 배점, 응답, 증빙, 배출량을 분리해 축적합니다."],
            ["운영 중심", "기업·컨설턴트·관리자 역할을 나눠 RLS 기반 운영을 전제로 설계했습니다."],
            ["확장 중심", "HWPX, 뉴스레터, 지원사업 캘린더, LMS 모듈을 단계적으로 추가할 수 있습니다."]
          ].map(([title, body]) => (
            <div className="surface rounded-md p-5" key={title}>
              <h2 className="text-xl font-bold text-ink-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
