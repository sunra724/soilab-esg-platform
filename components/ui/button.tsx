import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-55",
  {
    variants: {
      variant: {
        primary: "bg-earth-600 text-white shadow-sm hover:bg-earth-700",
        secondary: "border border-ink-900/10 bg-white text-ink-900 hover:border-earth-600/30 hover:bg-earth-50",
        ghost: "text-ink-700 hover:bg-ink-900/5",
        dark: "bg-ink-950 text-white hover:bg-ink-800"
      },
      size: {
        sm: "min-h-9 px-3 text-xs",
        md: "min-h-10 px-4",
        lg: "min-h-12 px-5 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & {
    href: string;
    children: ReactNode;
  };

export function LinkButton({ className, variant, size, href, children, ...props }: LinkButtonProps) {
  return (
    <Link className={cn(buttonVariants({ variant, size }), className)} href={href} {...props}>
      {children}
    </Link>
  );
}
