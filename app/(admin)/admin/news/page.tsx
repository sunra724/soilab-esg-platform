import { Badge } from "@/components/ui/badge";
import { newsItems } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function AdminNewsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">News Queue</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">뉴스 큐레이션</h1>
      </div>
      <div className="grid gap-3">
        {newsItems.map((item) => (
          <div className="surface grid gap-4 rounded-md p-5 md:grid-cols-[1fr_auto] md:items-center" key={item.slug}>
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="water">{item.category}</Badge>
                <Badge tone="ink">pending</Badge>
              </div>
              <h2 className="mt-4 text-xl font-bold text-ink-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">{item.summary}</p>
              <p className="mt-2 text-xs font-semibold text-ink-500">{formatDate(item.publishedAt)}</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border border-ink-900/10 bg-white px-3 py-2 text-sm font-semibold text-ink-700">보류</button>
              <button className="rounded-md bg-earth-600 px-3 py-2 text-sm font-semibold text-white">승인</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
