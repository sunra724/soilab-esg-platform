import { Send } from "lucide-react";

import { newsItems } from "@/lib/data";

export default function AdminNewsletterPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="surface rounded-md p-5">
        <span className="text-sm font-bold text-water-600">Newsletter</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">월간 ESG 브리프</h1>
        <div className="mt-6 grid gap-3">
          {newsItems.map((item) => (
            <label className="flex gap-3 rounded-md border border-ink-900/10 p-4" key={item.slug}>
              <input className="mt-1 size-4 accent-earth-600" defaultChecked type="checkbox" />
              <span>
                <strong className="block text-sm text-ink-950">{item.title}</strong>
                <span className="mt-1 block text-sm leading-6 text-ink-600">{item.summary}</span>
              </span>
            </label>
          ))}
        </div>
      </section>
      <aside className="surface h-fit rounded-md p-5">
        <h2 className="text-xl font-bold text-ink-950">발송 설정</h2>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-semibold text-ink-700">
            구독자 그룹
            <select className="min-h-11 rounded-md border border-ink-900/10 bg-white px-3">
              <option>전체 구독자</option>
              <option>기업 담당자</option>
              <option>컨설턴트</option>
            </select>
          </label>
          <button className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-earth-600 px-4 text-sm font-semibold text-white">
            <Send size={17} aria-hidden />
            발송 예약
          </button>
        </div>
      </aside>
    </div>
  );
}
