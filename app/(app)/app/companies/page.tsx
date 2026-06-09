import Link from "next/link";

export default function CompaniesPage() {
  const companies = [
    ["demo", "소이랩 데모기업", "제조", "대구", "분석완료"],
    ["supply", "경북 협력사 A", "부품", "경북", "진단중"],
    ["agency", "공공기관 B", "공공", "전국", "보고서"]
  ];

  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">Companies</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">기업 관리</h1>
      </div>
      <div className="grid gap-3">
        {companies.map(([id, name, industry, region, status]) => (
          <Link className="surface grid gap-4 rounded-md p-5 hover:border-earth-600/30 md:grid-cols-[1fr_auto] md:items-center" href={`/app/companies/${id}`} key={id}>
            <div>
              <h2 className="text-xl font-bold text-ink-950">{name}</h2>
              <p className="mt-1 text-sm text-ink-600">
                {industry} · {region}
              </p>
            </div>
            <span className="rounded-md bg-earth-100 px-3 py-2 text-sm font-bold text-earth-700">{status}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
