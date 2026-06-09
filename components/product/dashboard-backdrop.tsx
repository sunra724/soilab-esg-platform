import { dashboardMetrics } from "@/lib/data";

const toneClass = {
  earth: "bg-earth-600",
  water: "bg-water-500",
  sun: "bg-sun-400",
  coral: "bg-coral-500"
};

export function DashboardBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="dashboard-grid absolute inset-0" />
      <div className="absolute left-[6%] top-[15%] hidden w-72 rounded-md border border-white/70 bg-white/78 p-4 shadow-soft backdrop-blur md:block">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-bold text-ink-500">K-ESG SCORE</span>
          <span className="rounded-md bg-earth-100 px-2 py-1 text-xs font-bold text-earth-700">A</span>
        </div>
        <div className="space-y-3">
          {dashboardMetrics.map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex justify-between text-xs font-semibold text-ink-600">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-2 rounded-sm bg-ink-900/8">
                <div className={`h-full rounded-sm ${toneClass[item.tone as keyof typeof toneClass]}`} style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-[12%] right-[5%] hidden w-[420px] rounded-md border border-white/70 bg-white/80 p-4 shadow-soft backdrop-blur lg:block">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-bold text-ink-500">ROADMAP</span>
          <span className="text-xs font-semibold text-water-600">3 priorities</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["Scope 1·2", "공급망", "공시"].map((item, index) => (
            <div className="rounded-md border border-ink-900/10 bg-cloud-50 p-3" key={item}>
              <span className="block text-xs font-bold text-ink-950">{item}</span>
              <span className="mt-2 block h-2 rounded-sm bg-earth-600" style={{ width: `${74 - index * 12}%` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-[14%] top-[14%] hidden size-56 rounded-md border border-white/80 bg-white/70 p-5 shadow-soft backdrop-blur xl:block">
        <div className="flex h-full flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-ink-500">FRAMEWORK</span>
            <strong className="mt-2 block text-2xl text-ink-950">CSDDD · GRI</strong>
          </div>
          <div className="grid gap-2">
            <span className="h-2 rounded-sm bg-water-500" />
            <span className="h-2 w-4/5 rounded-sm bg-earth-600" />
            <span className="h-2 w-3/5 rounded-sm bg-sun-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
