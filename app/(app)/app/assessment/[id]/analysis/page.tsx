import { Badge } from "@/components/ui/badge";
import { assessmentSnapshot } from "@/lib/data";

export default function AssessmentAnalysisPage() {
  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">AI Analysis</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">취약점과 개선 로드맵</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
          실제 연동 시 Claude API가 구조화 JSON을 반환하고, 서버에서 검증 후 improvement_tasks에 저장합니다.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        {assessmentSnapshot.tasks.map((task) => (
          <div className="surface rounded-md p-5" key={task.title}>
            <div className="flex items-center justify-between">
              <Badge tone={task.domain === "E" ? "earth" : task.domain === "S" ? "water" : "sun"}>{task.domain}</Badge>
              <span className="text-xs font-bold text-ink-500">Priority {task.priority}</span>
            </div>
            <h2 className="mt-5 text-xl font-bold leading-snug text-ink-950">{task.title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink-600">
              {task.horizon === "short" ? "3개월 이내 실행 과제" : "6~12개월 중장기 과제"}로 설정되어 있으며 담당자와 증빙 기준을 지정할 수 있습니다.
            </p>
            <span className="mt-5 inline-flex rounded-md bg-cloud-100 px-3 py-2 text-xs font-semibold text-ink-700">{task.status}</span>
          </div>
        ))}
      </section>

      <section className="surface rounded-md p-5">
        <h2 className="text-xl font-bold text-ink-950">중대성 평가 매트릭스</h2>
        <div className="relative mt-5 aspect-[16/8] min-h-[260px] rounded-md border border-ink-900/10 bg-white">
          <div className="absolute inset-x-8 top-1/2 border-t border-dashed border-ink-900/15" />
          <div className="absolute inset-y-8 left-1/2 border-l border-dashed border-ink-900/15" />
          {[
            ["온실가스 인벤토리", "72%", "24%"],
            ["공급망 실사", "62%", "42%"],
            ["안전보건", "38%", "32%"],
            ["공시 투명성", "54%", "62%"]
          ].map(([label, left, top]) => (
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md bg-ink-950 px-3 py-2 text-xs font-bold text-white"
              key={label}
              style={{ left, top }}
            >
              {label}
            </span>
          ))}
          <span className="absolute bottom-3 left-4 text-xs font-bold text-ink-500">중요도</span>
          <span className="absolute right-4 top-3 text-xs font-bold text-ink-500">영향도</span>
        </div>
      </section>
    </div>
  );
}
