import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
};

export function BrandLogo({ href = "/", className }: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-lg font-display text-lg font-bold tracking-tight text-ink outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40",
        className,
      )}
      aria-label="Eaxy, ir al inicio"
    >
      <span
        className="flex size-8 items-center justify-center rounded-[0.6rem] bg-gradient-to-br from-cobalt to-violet-500 font-mono text-[15px] font-medium text-white shadow-sm shadow-cobalt/30 transition-transform group-hover:-rotate-6"
        aria-hidden
      >
        ∑
      </span>
      Eaxy
    </Link>
  );
}
