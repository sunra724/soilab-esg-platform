import Link from "next/link";

import { adminTables } from "@/lib/data";

export default function AdminHomePage() {
  return (
    <div className="grid gap-6">
      <div>
        <span className="text-sm font-bold text-water-600">Back Office</span>
        <h1 className="mt-2 text-3xl font-black text-ink-950">관리자 운영 현황</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
          지표, 뉴스, 뉴스레터, 사례, 문의, 사용자 역할을 비개발자가 관리할 수 있는 백오피스입니다.
        </p>
      </div>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminTables.map((item) => {
          const Icon = item.icon;
          return (
            <Link className="surface rounded-md p-5 hover:border-earth-600/30" href={item.href} key={item.href}>
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-md bg-earth-100 text-earth-700">
                  <Icon size={20} aria-hidden />
                </span>
                <span className="rounded-md bg-cloud-100 px-2.5 py-1 text-xs font-semibold text-ink-600">{item.rows}</span>
              </div>
              <h2 className="mt-5 text-xl font-bold text-ink-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">{item.description}</p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
