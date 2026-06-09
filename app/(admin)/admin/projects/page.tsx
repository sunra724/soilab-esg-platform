import { Badge } from "@/components/ui/badge";
import { educationProgramTemplates, rfpReadinessItems } from "@/lib/data";

export default function AdminProjectsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">RFP Operations</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">입찰 과업 대응 체크리스트</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-600">
          나라장터 과업지시서에서 반복되는 요구사항을 플랫폼 기능과 산출물 관점으로 관리합니다.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["진단평가", "300개사", "모집·접수·방문"],
          ["성과분석", "960개사", "5개년 비교"],
          ["교육운영", "1,000명+", "출결·만족도"],
          ["뉴스레터", "8편", "기고·기사·통계"]
        ].map(([label, value, caption]) => (
          <div className="surface rounded-md p-5" key={label}>
            <span className="text-xs font-bold text-ink-500">{label}</span>
            <strong className="mt-2 block text-3xl text-ink-950">{value}</strong>
            <span className="mt-1 block text-xs font-semibold text-earth-700">{caption}</span>
          </div>
        ))}
      </section>

      <section className="grid gap-3">
        {rfpReadinessItems.map((item) => (
          <article className="surface grid gap-4 rounded-md p-5 xl:grid-cols-[220px_1fr_260px]" key={item.area}>
            <div>
              <Badge tone={item.status === "기반 반영" ? "earth" : item.status === "스키마 반영" ? "water" : "sun"}>{item.status}</Badge>
              <h2 className="mt-4 text-lg font-bold leading-snug text-ink-950">{item.area}</h2>
              <p className="mt-2 text-xs font-semibold leading-5 text-ink-500">{item.source}</p>
            </div>
            <div className="grid gap-2 text-sm leading-6 text-ink-700">
              <p>{item.requirement}</p>
              <p className="font-semibold text-ink-950">{item.platform}</p>
            </div>
            <div className="rounded-md bg-cloud-100 p-4">
              <span className="text-xs font-bold text-ink-500">다음 구현</span>
              <p className="mt-2 text-sm font-semibold leading-6 text-ink-800">{item.next}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="surface rounded-md p-5">
        <h2 className="text-xl font-bold text-ink-950">교육 프로그램 템플릿</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {educationProgramTemplates.map((program) => (
            <div className="rounded-md border border-ink-900/10 bg-white p-4" key={program.title}>
              <Badge tone="water">{program.mode}</Badge>
              <h3 className="mt-4 text-lg font-bold text-ink-950">{program.title}</h3>
              <p className="mt-1 text-sm font-semibold text-ink-500">{program.duration}</p>
              <div className="mt-4 grid gap-2">
                {program.topics.map((topic) => (
                  <span className="rounded-md bg-cloud-100 px-3 py-2 text-sm font-semibold text-ink-700" key={topic}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
