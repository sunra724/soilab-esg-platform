import { Badge } from "@/components/ui/badge";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CompanyDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="grid gap-6">
      <section className="surface rounded-md p-6">
        <Badge tone="earth">Company {id}</Badge>
        <h1 className="mt-5 text-3xl font-black text-ink-950">기업 상세</h1>
        <p className="mt-2 text-sm leading-6 text-ink-600">
          Supabase 연결 후 companies, assessments, reports, improvement_tasks를 조인해 기업별 이력으로 표시합니다.
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {["진단 2건", "보고서 1건", "개선과제 7건"].map((item) => (
          <div className="surface rounded-md p-5" key={item}>
            <span className="text-sm font-bold text-ink-950">{item}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
