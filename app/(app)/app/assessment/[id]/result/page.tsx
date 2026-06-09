import { EmissionsChart } from "@/components/charts/emissions-chart";
import { EsgRadar } from "@/components/charts/esg-radar";
import { Badge } from "@/components/ui/badge";
import { assessmentSnapshot, sampleIndicators } from "@/lib/data";

export default function AssessmentResultPage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="rounded-md bg-earth-600 p-6 text-white">
          <span className="text-xs font-bold text-white/70">종합 등급</span>
          <strong className="mt-4 block text-7xl leading-none">{assessmentSnapshot.grade}</strong>
          <p className="mt-4 text-sm leading-6 text-white/78">{assessmentSnapshot.totalScore}점 · K-ESG 데모 진단</p>
        </div>
        <div className="surface rounded-md p-5">
          <h1 className="text-2xl font-black text-ink-950">영역별 점수와 업종 평균 비교</h1>
          <EsgRadar />
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="surface rounded-md p-5">
          <h2 className="text-xl font-bold text-ink-950">온실가스 배출량</h2>
          <EmissionsChart />
        </div>
        <div className="surface rounded-md p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-ink-950">글로벌 프레임워크 대응 현황</h2>
            <Badge tone="water">K-ESG Mapping</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ink-900/10 text-xs uppercase text-ink-500">
                  <th className="py-3 pr-4">지표</th>
                  <th className="py-3 pr-4">CSDDD</th>
                  <th className="py-3 pr-4">EcoVadis</th>
                  <th className="py-3 pr-4">GRI</th>
                </tr>
              </thead>
              <tbody>
                {sampleIndicators.map((indicator) => (
                  <tr className="border-b border-ink-900/8 last:border-0" key={indicator.code}>
                    <td className="py-3 pr-4 font-semibold text-ink-900">{indicator.code}</td>
                    <td className="py-3 pr-4 text-ink-600">{indicator.csddd}</td>
                    <td className="py-3 pr-4 text-ink-600">{indicator.ecovadis}</td>
                    <td className="py-3 pr-4 text-ink-600">{indicator.gri}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
