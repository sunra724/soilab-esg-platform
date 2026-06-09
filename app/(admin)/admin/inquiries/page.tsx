import { Badge } from "@/components/ui/badge";

const inquiries = [
  ["소이랩 담당자", "대구 제조기업", "ESG 진단", "new"],
  ["교육 담당", "공공기관", "교육·아카데미", "contacted"],
  ["컨설팅 팀", "협력사 협의체", "보고서 작성", "proposal"]
];

export default function AdminInquiriesPage() {
  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">Leads</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">문의 관리</h1>
      </div>
      <div className="surface overflow-x-auto rounded-md">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-cloud-100 text-xs uppercase text-ink-500">
            <tr>
              <th className="px-4 py-3">이름</th>
              <th className="px-4 py-3">소속</th>
              <th className="px-4 py-3">서비스</th>
              <th className="px-4 py-3">상태</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(([name, org, service, status]) => (
              <tr className="border-t border-ink-900/10" key={`${name}-${org}`}>
                <td className="px-4 py-4 font-semibold text-ink-950">{name}</td>
                <td className="px-4 py-4 text-ink-600">{org}</td>
                <td className="px-4 py-4 text-ink-600">{service}</td>
                <td className="px-4 py-4">
                  <Badge tone={status === "new" ? "earth" : "ink"}>{status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
