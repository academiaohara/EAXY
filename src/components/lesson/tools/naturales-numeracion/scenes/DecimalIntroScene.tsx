"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Place = "hundreds" | "tens" | "units";
type DecimalIntroState = Record<Place, number> & { touched: boolean };

const PLACES: { id: Place; label: string; value: number; singular: string; plural: string; name: string }[] = [
  { id: "hundreds", label: "Centenas", value: 100, singular: "centena", plural: "centenas", name: "centenas" },
  { id: "tens", label: "Decenas", value: 10, singular: "decena", plural: "decenas", name: "decenas" },
  { id: "units", label: "Unidades", value: 1, singular: "unidad", plural: "unidades", name: "unidades" },
];

function createDefaultDecimalIntroState(): DecimalIntroState {
  return { hundreds: 3, tens: 0, units: 5, touched: false };
}

type DecimalIntroSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function DecimalIntroScene({ stepId, onReadyChange }: DecimalIntroSceneProps) {
  const [state, setState] = usePersistedLessonToolState(stepId, createDefaultDecimalIntroState);
  const value = state.hundreds * 100 + state.tens * 10 + state.units;

  useEffect(() => {
    onReadyChange(state.touched);
  }, [onReadyChange, state.touched]);

  function changeDigit(place: Place, amount: number) {
    setState((previous) => ({
      ...previous,
      [place]: Math.min(9, Math.max(0, previous[place] + amount)),
      touched: true,
    }));
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-cobalt">Sistema decimal · base 10</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          En nuestro sistema, cada cifra ocupa una posición. Cambia una cifra y observa cómo cambia el valor del número.
        </p>
      </div>

      <div className="rounded-2xl border border-cobalt/20 bg-gradient-to-br from-cobalt-tint/60 to-white p-4 text-center sm:p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-cobalt">Número formado</span>
        <p className="mt-1 text-5xl font-black tabular-nums tracking-wide text-cobalt sm:text-6xl" aria-live="polite">
          {value.toLocaleString("es-ES", { useGrouping: false })}
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          {state.hundreds} × 100 + {state.tens} × 10 + {state.units} × 1 = <strong className="text-ink">{value}</strong>
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {PLACES.map((place) => {
          const digit = state[place.id];
          const placeValue = digit * place.value;
          const isEmptyPlace = place.id === "tens" && digit === 0;

          return (
            <section
              key={place.id}
              className={cn(
                "rounded-xl border p-3 text-center",
                isEmptyPlace ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white",
              )}
              aria-label={`${place.label}: cifra ${digit}, valor ${placeValue}`}
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">{place.label}</h4>
              <div className="my-2 flex items-center justify-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="size-9 rounded-full p-0 text-lg"
                  aria-label={`Disminuir cifra de ${place.name}`}
                  onClick={() => changeDigit(place.id, -1)}
                  disabled={digit === 0}
                >
                  −
                </Button>
                <span className={cn("min-w-10 text-3xl font-black tabular-nums", isEmptyPlace ? "text-amber-800" : "text-ink")}>
                  {digit}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="size-9 rounded-full p-0 text-lg"
                  aria-label={`Aumentar cifra de ${place.name}`}
                  onClick={() => changeDigit(place.id, 1)}
                  disabled={digit === 9}
                >
                  +
                </Button>
              </div>
              <p className="text-sm font-semibold tabular-nums text-ink">
                {digit} {digit === 1 ? place.singular : place.plural} = {placeValue.toLocaleString("es-ES")}
              </p>
              {isEmptyPlace ? (
                <p className="mt-1 text-xs leading-snug text-amber-900">
                  El cero guarda el lugar de las decenas: sin él, 305 se leería como 35.
                </p>
              ) : null}
            </section>
          );
        })}
      </div>

      <p className="text-center text-sm text-ink-muted">
        A la izquierda, cada posición vale diez veces más. El cero también cuenta: conserva el hueco de un orden vacío.
      </p>
      {!state.touched ? (
        <p className="text-center text-xs font-medium text-cobalt">Pulsa + o − en cualquier posición para probarlo.</p>
      ) : null}
    </div>
  );
}
