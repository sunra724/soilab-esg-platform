import { Badge } from "@/components/ui/badge";
import { supportPrograms } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function AdminProgramsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">Support Programs</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">지원사업 관리</h1>
      </div>
      <div className="grid gap-3">
        {supportPrograms.map((program) => (
          <div className="surface rounded-md p-5" key={program.title}>
            <div className="flex flex-wrap gap-2">
              <Badge tone="earth">{program.region}</Badge>
              <Badge tone="ink">{program.field}</Badge>
            </div>
            <h2 className="mt-4 text-xl font-bold text-ink-950">{program.title}</h2>
            <p className="mt-2 text-sm text-ink-600">
              {program.agency} · 마감 {formatDate(program.deadline)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
