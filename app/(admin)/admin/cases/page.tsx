import { Badge } from "@/components/ui/badge";
import { cases } from "@/lib/data";

export default function AdminCasesPage() {
  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">Case CMS</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">사례 CMS</h1>
      </div>
      <div className="grid gap-3">
        {cases.map((item) => (
          <div className="surface rounded-md p-5" key={item.slug}>
            <Badge tone="earth">{item.sector}</Badge>
            <h2 className="mt-4 text-xl font-bold text-ink-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-600">{item.summary}</p>
            <span className="mt-4 inline-flex rounded-md bg-cloud-100 px-3 py-2 text-xs font-semibold text-ink-600">published</span>
          </div>
        ))}
      </div>
    </div>
  );
}
