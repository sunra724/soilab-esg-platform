import { ArrowRight, Building2, ClipboardCheck, FileText, Route } from "lucide-react";
import Link from "next/link";

import { EsgBarChart } from "@/components/charts/esg-radar";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { assessmentSnapshot } from "@/lib/data";

export default function PlatformHomePage() {
  return (
    <div className="grid gap-6">
      <section className="rounded-md bg-ink-950 p-6 text-white md:p-7">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Badge tone="earth">Demo Console</Badge>
            <h1 className="mt-5 text-3xl font-black leading-tight md:text-4xl">ESG 진단 운영 대시보드</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68">
              기업 진단 현황, 영역별 점수, 보고서 발행 상태를 한 화면에서 확인하는 인증 영역입니다.
            </p>
          </div>
          <LinkButton href="/app/assessment/new" size="lg">
            새 진단 시작
            <ArrowRight size={18} aria-hidden />
          </LinkButton>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["종합 점수", assessmentSnapshot.totalScore, "Grade A"],
          ["진단 상태", "분석완료", "보고서 발행 전"],
          ["개선과제", assessmentSnapshot.tasks.length, "우선순위 지정"],
          ["총 배출량", "211.3", "tCO2eq"]
        ].map(([label, value, caption]) => (
          <div className="surface rounded-md p-5" key={label}>
            <span className="text-xs font-bold text-ink-500">{label}</span>
            <strong className="mt-2 block text-3xl text-ink-950">{value}</strong>
            <span className="mt-1 block text-xs font-semibold text-earth-700">{caption}</span>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="surface rounded-md p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-ink-950">영역별 점수</h2>
            <Link className="text-sm font-bold text-earth-700" href="/app/assessment/demo/result">
              결과 상세
            </Link>
          </div>
          <EsgBarChart />
        </div>
        <div className="grid gap-3">
          {[
            { href: "/app/assessment/new", icon: ClipboardCheck, title: "진단 입력", body: "지표 응답과 활동데이터를 입력합니다." },
            { href: "/app/assessment/demo/analysis", icon: Route, title: "개선 로드맵", body: "AI 과제와 중대성 매트릭스를 확인합니다." },
            { href: "/app/reports", icon: FileText, title: "보고서", body: "PDF/HWPX 발행 버전을 관리합니다." },
            { href: "/app/companies", icon: Building2, title: "기업 관리", body: "컨설턴트와 관리자용 기업 목록입니다." }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link className="surface flex gap-4 rounded-md p-4 hover:border-earth-600/30" href={item.href} key={item.href}>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-earth-100 text-earth-700">
                  <Icon size={20} aria-hidden />
                </span>
                <div>
                  <h3 className="font-bold text-ink-950">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-ink-600">{item.body}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
