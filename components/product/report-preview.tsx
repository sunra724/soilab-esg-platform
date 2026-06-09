import { assessmentSnapshot } from "@/lib/data";

export function ReportPreview() {
  return (
    <div className="surface rounded-md bg-white p-5">
      <div className="border-b border-ink-900/10 pb-4">
        <span className="text-xs font-bold text-water-600">DIAGNOSIS REPORT</span>
        <h3 className="mt-2 text-2xl font-bold text-ink-950">{assessmentSnapshot.company}</h3>
        <p className="mt-1 text-sm text-ink-500">ESG 진단 결과 요약 · 지속가능경영보고서 초안</p>
      </div>
      <div className="grid gap-4 py-5 md:grid-cols-3">
        <div className="rounded-md bg-earth-100 p-4">
          <span className="text-xs font-bold text-earth-700">종합 등급</span>
          <strong className="mt-2 block text-4xl text-earth-700">{assessmentSnapshot.grade}</strong>
        </div>
        {assessmentSnapshot.scores.map((item) => (
          <div className="rounded-md bg-cloud-100 p-4" key={item.domain}>
            <span className="text-xs font-bold text-ink-500">{item.domain}</span>
            <strong className="mt-2 block text-3xl text-ink-950">{item.score}</strong>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {assessmentSnapshot.tasks.map((task) => (
          <div className="flex items-center justify-between gap-3 rounded-md border border-ink-900/10 px-3 py-3" key={task.title}>
            <div>
              <span className="text-xs font-bold text-ink-500">{task.domain} · Priority {task.priority}</span>
              <p className="mt-1 text-sm font-semibold text-ink-900">{task.title}</p>
            </div>
            <span className="shrink-0 rounded-md bg-ink-900/5 px-2.5 py-1 text-xs font-semibold text-ink-600">{task.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
