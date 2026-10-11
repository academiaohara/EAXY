"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import { HistoriaNumeracionIllustrations } from "@/components/lesson/tools/naturales-numeracion/scenes/HistoriaNumeracionIllustrations";
import {
  createDefaultSistemasHistoriaState,
  type SistemasHistoriaTabId,
} from "@/components/lesson/tools/naturales-numeracion/scenes/sistemas-historia-state";
import {
  SISTEMAS_HISTORIA_STATE_KEY,
  SISTEMAS_HISTORIA_TABS,
} from "@/components/lesson/tools/naturales-numeracion/scenes/sistemas-historia-shared";
import { cn } from "@/lib/utils";

type SistemasHistoriaGaleriaSceneProps = {
  onReadyChange: (ready: boolean) => void;
};

export function SistemasHistoriaGaleriaScene({ onReadyChange }: SistemasHistoriaGaleriaSceneProps) {
  const [state, setState] = usePersistedLessonToolState(
    SISTEMAS_HISTORIA_STATE_KEY,
    createDefaultSistemasHistoriaState,
  );
  const { tab } = state;
  useEffect(() => {
    onReadyChange(true);
  }, [onReadyChange]);

  const setTab = (nextTab: SistemasHistoriaTabId) => {
    setState((prev) => ({ ...prev, tab: nextTab }));
  };

  return (
    <div className="space-y-5">
      <HistoriaNumeracionIllustrations
        activeTab={tab}
        onSelectTab={setTab}
        completed={{ tally: false, egypt: false, roman: false }}
      />

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Sistemas de numeración">
        {SISTEMAS_HISTORIA_TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors sm:px-4",
              tab === item.id
                ? "border-cobalt bg-cobalt text-white shadow-sm"
                : "border-[color:var(--stage-border,#475569)] bg-black/25 text-[color:var(--stage-ink,#e8edf5)] hover:border-cobalt/45",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "tally" ? (
        <>
          <p className="text-sm font-medium text-[color:var(--stage-accent,#58c4dd)]">Marcas en un hueso</p>
          <p className="text-sm text-[color:var(--stage-muted,#94a3b8)]">
            Cada objeto deja una marca. Al quinto, se tacha en diagonal el grupo de cuatro. Llega a{" "}
            <strong className="text-[color:var(--stage-ink,#e8edf5)]">9</strong> marcas.
          </p>
        </>
      ) : null}

      {tab === "egypt" ? (
        <>
          <p className="text-sm font-medium text-[color:var(--stage-accent,#58c4dd)]">Símbolos que se suman</p>
          <p className="text-sm text-[color:var(--stage-muted,#94a3b8)]">
            Los egipcios repetían jeroglíficos: cada símbolo vale una potencia de diez y el total es la suma de
            todos.
          </p>
        </>
      ) : null}

      {tab === "roman" ? (
        <>
          <p className="text-sm font-medium text-[color:var(--stage-accent,#58c4dd)]">
            Letras con reglas de resta
          </p>
          <p className="text-sm text-[color:var(--stage-muted,#94a3b8)]">
            Las letras romanas se leen de izquierda a derecha; a veces una letra pequeña a la izquierda de otra
            mayor indica resta (como en <strong className="text-[color:var(--stage-ink,#e8edf5)]">XIV</strong>).
          </p>
        </>
      ) : null}
    </div>
  );
}
