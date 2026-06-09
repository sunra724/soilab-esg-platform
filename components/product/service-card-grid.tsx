import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/lib/data";

export function ServiceCardGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <Link
            className="surface group flex min-h-[260px] flex-col justify-between rounded-md p-5 transition hover:-translate-y-0.5 hover:border-earth-600/30"
            href={`/services/${service.slug}`}
            key={service.slug}
          >
            <div className="space-y-4">
              <span className="flex size-10 items-center justify-center rounded-md bg-earth-100 text-earth-700">
                <Icon size={20} aria-hidden />
              </span>
              <div>
                <span className="text-xs font-bold text-water-600">{service.eyebrow}</span>
                <h3 className="mt-2 text-lg font-bold leading-snug text-ink-950">{service.title}</h3>
              </div>
              <p className="text-sm leading-6 text-ink-600">{service.summary}</p>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-earth-700">
              자세히 보기
              <ArrowUpRight size={16} aria-hidden />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
