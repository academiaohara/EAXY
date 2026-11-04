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
        "group inline-flex items-center gap-2 rounded-lg font-display text-lg font-extrabold tracking-tight text-ink outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
        className,
      )}
      aria-label="Eaxy, ir al inicio"
    >
      <span
        className="flex size-8 items-center justify-center rounded-full bg-ink font-display text-[15px] font-extrabold lowercase text-white shadow-sm transition-transform group-hover:-rotate-6"
        aria-hidden
      >
        e
      </span>
      Eaxy
    </Link>
  );
}
