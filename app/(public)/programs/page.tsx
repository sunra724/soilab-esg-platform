import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { supportPrograms } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ESG 지원사업 캘린더",
  description: "대구·경북 ESG 지원사업과 마감 일정을 확인합니다."
};

export default function ProgramsPage() {
  return (
    <section className="page-shell py-16 md:py-20">
      <SectionHeading
        eyebrow="Programs"
        title="ESG 지원사업 캘린더"
        description="관리자 등록 또는 외부 모니터링 연계 후 공개 캘린더로 노출할 수 있는 영역입니다."
      />
      <div className="mt-10 grid gap-4">
        {supportPrograms.map((program) => (
          <div className="surface grid gap-4 rounded-md p-5 md:grid-cols-[1fr_auto] md:items-center" key={program.title}>
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="earth">{program.region}</Badge>
                <Badge tone="ink">{program.field}</Badge>
              </div>
              <h2 className="mt-4 text-xl font-bold text-ink-950">{program.title}</h2>
              <p className="mt-2 text-sm text-ink-600">
                {program.agency} · {program.budget}
              </p>
            </div>
            <div className="rounded-md bg-cloud-100 px-4 py-3 text-sm font-bold text-ink-800">
              마감 {formatDate(program.deadline)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
