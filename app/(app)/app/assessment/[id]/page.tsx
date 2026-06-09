import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { assessmentSnapshot } from "@/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AssessmentDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="grid gap-6">
      <div className="surface rounded-md p-6">
        <Badge tone="earth">Assessment {id}</Badge>
        <h1 className="mt-5 text-3xl font-black text-ink-950">{assessmentSnapshot.company}</h1>
        <p className="mt-2 text-sm leading-6 text-ink-600">진단 상태는 {assessmentSnapshot.status}이며, 분석과 보고서 미리보기가 준비되어 있습니다.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["/app/assessment/demo/result", "결과 대시보드", "등급, 영역별 점수, 온실가스 차트"],
          ["/app/assessment/demo/analysis", "분석·로드맵", "취약 항목과 개선과제"],
          ["/app/assessment/demo/report", "보고서 발행", "PDF/HWPX 미리보기"]
        ].map(([href, title, body]) => (
          <Link className="surface rounded-md p-5 hover:border-earth-600/30" href={href} key={href}>
            <h2 className="text-xl font-bold text-ink-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-600">{body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
