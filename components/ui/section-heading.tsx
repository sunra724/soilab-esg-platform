import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, align = "left", inverted = false, children }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex gap-5",
        align === "center" ? "mx-auto max-w-3xl flex-col items-center text-center" : "max-w-3xl flex-col"
      )}
    >
      {eyebrow ? <Badge tone="water">{eyebrow}</Badge> : null}
      <div className="space-y-3">
        <h2 className={cn("text-balance text-3xl font-bold leading-tight md:text-4xl", inverted ? "text-white" : "text-ink-950")}>{title}</h2>
        {description ? (
          <p className={cn("text-pretty text-base leading-7 md:text-lg", inverted ? "text-white/68" : "text-ink-600")}>{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
