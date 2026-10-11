"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SistemasHistoriaTabId } from "@/components/lesson/tools/naturales-numeracion/scenes/sistemas-historia-state";

const ILLUSTRATIONS: {
  tab: SistemasHistoriaTabId;
  src: string;
  alt: string;
  label: string;
}[] = [
  {
    tab: "tally",
    src: "/lesson/numeracion/historia/primitivo.png",
    alt: "Ilustración del hombre primitivo contando con marcas",
    label: "Hombre primitivo",
  },
  {
    tab: "egypt",
    src: "/lesson/numeracion/historia/egipcios.png",
    alt: "Símbolos del sistema de numeración egipcio",
    label: "Egipcios",
  },
  {
    tab: "roman",
    src: "/lesson/numeracion/historia/romanos.png",
    alt: "Letras del sistema de numeración romano",
    label: "Romanos",
  },
];

type HistoriaNumeracionIllustrationsProps = {
  activeTab: SistemasHistoriaTabId;
  onSelectTab: (tab: SistemasHistoriaTabId) => void;
  completed: Record<SistemasHistoriaTabId, boolean>;
};

export function HistoriaNumeracionIllustrations({
  activeTab,
  onSelectTab,
  completed,
}: HistoriaNumeracionIllustrationsProps) {
  return (
    <div
      className="grid grid-cols-3 gap-2 sm:gap-3"
      role="group"
      aria-label="Tres sistemas históricos de numeración"
    >
      {ILLUSTRATIONS.map((item) => {
        const isActive = activeTab === item.tab;
        return (
          <button
            key={item.tab}
            type="button"
            onClick={() => onSelectTab(item.tab)}
            className={cn(
              "group flex flex-col overflow-hidden rounded-xl border-2 text-left transition-colors",
              isActive
                ? "border-[color:var(--stage-accent,#58c4dd)] ring-2 ring-[color:var(--stage-accent,#58c4dd)]/40"
                : "border-[color:var(--stage-border,#475569)] hover:border-cobalt/45",
              completed[item.tab] && !isActive && "ring-2 ring-emerald-400/50",
            )}
          >
            <div className="relative aspect-[4/3] w-full bg-black/30">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain object-center p-1"
                sizes="(min-width: 768px) 220px, 30vw"
              />
            </div>
            <span
              className={cn(
                "px-2 py-1.5 text-center text-xs font-semibold sm:text-sm",
                isActive
                  ? "bg-[color:var(--stage-accent,#58c4dd)]/20 text-[color:var(--stage-ink,#e8edf5)]"
                  : "bg-black/25 text-[color:var(--stage-muted,#94a3b8)] group-hover:text-[color:var(--stage-ink,#e8edf5)]",
              )}
            >
              {item.label}
              {completed[item.tab] ? " ✓" : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
