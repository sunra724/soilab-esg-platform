import { Badge } from "@/components/ui/badge";
import { sampleIndicators } from "@/lib/data";

export default function AdminIndicatorsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-sm font-bold text-water-600">Indicators</span>
          <h1 className="mt-2 text-3xl font-black text-ink-950">지표 관리</h1>
        </div>
        <button className="rounded-md bg-ink-950 px-4 py-2 text-sm font-semibold text-white">지표 추가</button>
      </div>
      <div className="surface overflow-x-auto rounded-md">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead className="bg-cloud-100 text-xs uppercase text-ink-500">
            <tr>
              <th className="px-4 py-3">코드</th>
              <th className="px-4 py-3">영역</th>
              <th className="px-4 py-3">질문</th>
              <th className="px-4 py-3">배점</th>
              <th className="px-4 py-3">GRI</th>
              <th className="px-4 py-3">상태</th>
            </tr>
          </thead>
          <tbody>
            {sampleIndicators.map((indicator) => (
              <tr className="border-t border-ink-900/10" key={indicator.code}>
                <td className="px-4 py-4 font-bold text-ink-950">{indicator.code}</td>
                <td className="px-4 py-4 text-ink-600">{indicator.domain}</td>
                <td className="px-4 py-4 text-ink-800">{indicator.question}</td>
                <td className="px-4 py-4 text-ink-600">{indicator.weight}</td>
                <td className="px-4 py-4 text-ink-600">{indicator.gri}</td>
                <td className="px-4 py-4">
                  <Badge tone="earth">active</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
