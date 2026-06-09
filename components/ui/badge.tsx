import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "earth" | "water" | "sun" | "coral" | "ink";
};

const tones = {
  earth: "border-earth-600/20 bg-earth-100 text-earth-700",
  water: "border-water-600/20 bg-blue-50 text-water-600",
  sun: "border-sun-400/25 bg-amber-50 text-amber-700",
  coral: "border-coral-500/20 bg-red-50 text-coral-500",
  ink: "border-ink-900/10 bg-ink-900/5 text-ink-700"
};

export function Badge({ className, tone = "earth", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-md border px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
