import { FileText } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    ["진단보고서", "diagnosis", "v1", "PDF", "2026-06-08"],
    ["지속가능경영보고서 초안", "sustainability", "v1", "HWPX", "2026-06-08"]
  ];

  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">Reports</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">보고서 목록</h1>
      </div>
      <div className="surface overflow-hidden rounded-md">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-cloud-100 text-xs uppercase text-ink-500">
            <tr>
              <th className="px-4 py-3">보고서</th>
              <th className="px-4 py-3">유형</th>
              <th className="px-4 py-3">버전</th>
              <th className="px-4 py-3">형식</th>
              <th className="px-4 py-3">생성일</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr className="border-t border-ink-900/10" key={report.join("-")}>
                <td className="px-4 py-4 font-semibold text-ink-950">
                  <span className="flex items-center gap-2">
                    <FileText size={17} aria-hidden />
                    {report[0]}
                  </span>
                </td>
                <td className="px-4 py-4 text-ink-600">{report[1]}</td>
                <td className="px-4 py-4 text-ink-600">{report[2]}</td>
                <td className="px-4 py-4 text-ink-600">{report[3]}</td>
                <td className="px-4 py-4 text-ink-600">{report[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
