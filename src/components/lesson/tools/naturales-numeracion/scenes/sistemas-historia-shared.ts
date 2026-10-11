import type { SistemasHistoriaTabId } from "@/components/lesson/tools/naturales-numeracion/scenes/sistemas-historia-state";

/** Clave única de progreso entre la galería y el juego (compatible con el paso antiguo `sistemas-historia`). */
export const SISTEMAS_HISTORIA_STATE_KEY = "sistemas-historia";

export const SISTEMAS_HISTORIA_TABS: {
  id: SistemasHistoriaTabId;
  label: string;
  subtitle: string;
}[] = [
  { id: "tally", label: "El hombre primitivo", subtitle: "Marcas en un hueso" },
  { id: "egypt", label: "Los egipcios", subtitle: "Símbolos que se suman" },
  { id: "roman", label: "Los romanos", subtitle: "Letras con reglas de resta" },
];

export const SISTEMAS_HISTORIA_TARGETS: Record<SistemasHistoriaTabId, number> = {
  tally: 9,
  egypt: 47,
  roman: 14,
};

export const STAGE_PANEL =
  "rounded-xl border border-[color:var(--stage-border,#334155)] bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]";

export const STAGE_SYMBOL_BUTTON =
  "flex flex-col items-center rounded-xl border-2 border-[color:var(--stage-accent)]/35 bg-[color:var(--stage-accent)]/12 py-3 transition hover:border-[color:var(--stage-accent)]/55 hover:bg-[color:var(--stage-accent)]/18";

export const STAGE_SYMBOL_BUTTON_EGYPT =
  "flex flex-col items-center gap-2 rounded-xl border-2 border-amber-400/35 bg-amber-500/10 py-4 text-center transition hover:border-amber-400/55 hover:bg-amber-500/16";
