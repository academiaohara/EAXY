"use client";

import { useEffect } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import { Button } from "@/components/ui/button";
import { BasketballBall } from "@/components/lesson/tools/naturales-numeracion/BasketballBall";
import { cn } from "@/lib/utils";

const TARGET = 10;
const EXTRA_UNITS = 3;

function createDefaultContarDiezState() {
  return { count: 0, bundled: false, extras: 0 };
}

type ContarDiezSceneProps = {
  stepId: string;
  onReadyChange: (ready: boolean) => void;
};

export function ContarDiezScene({ stepId, onReadyChange }: ContarDiezSceneProps) {
  const [state, setState] = usePersistedLessonToolState(stepId, createDefaultContarDiezState);
  const bundled = state.bundled ?? false;
  const extras = state.extras ?? 0;
  const total = bundled ? TARGET + extras : state.count;
  const ready = bundled && extras === EXTRA_UNITS;

  useEffect(() => {
    onReadyChange(ready);
  }, [onReadyChange, ready]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 py-1">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-cobalt">Agrupar para contar mejor</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-muted">
          Cuenta diez unidades, cámbialas por una decena y añade tres unidades más.
        </p>
      </div>

      <div className="rounded-2xl border border-cobalt/20 bg-cobalt-tint/40 px-4 py-3 text-center">
        <span className="block text-xs font-semibold uppercase tracking-wide text-cobalt">
          {bundled ? "Cantidad representada" : "Unidades contadas"}
        </span>
        <span className="text-4xl font-black tabular-nums text-cobalt" aria-live="polite">{total}</span>
        <span className="ml-2 text-sm text-ink-muted">{bundled ? "unidades en total" : "de 10"}</span>
      </div>

      <div className="grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <section className="rounded-2xl border border-orange-200 bg-orange-50/60 p-4 text-center">
          <h3 className="text-xs font-bold uppercase tracking-wide text-orange-900">
            {bundled ? "Antes: diez unidades" : "Unidades"}
          </h3>
          <div className="mx-auto mt-3 grid max-w-[15rem] grid-cols-5 gap-2">
            {Array.from({ length: TARGET }, (_, index) => {
              const visible = bundled || index < state.count;
              return (
                <BasketballBall
                  key={index}
                  faded={!visible}
                  className={cn("mx-auto w-full max-w-10", visible && !bundled && "animate-in zoom-in-50 duration-200")}
                />
              );
            })}
          </div>
        </section>

        <span className="hidden text-2xl font-black text-slate-400 sm:block" aria-hidden="true">→</span>

        <section className={cn("flex min-h-40 flex-col items-center justify-center rounded-2xl border p-4 text-center", bundled ? "border-emerald-200 bg-emerald-50/70" : "border-dashed border-slate-300 bg-slate-50")}>
          <h3 className="text-xs font-bold uppercase tracking-wide text-ink-muted">Después: valor posicional</h3>
          {bundled ? (
            <>
              <div className="mt-3 flex items-center justify-center gap-4" aria-live="polite">
                <div className="flex flex-col items-center gap-1">
                  <div role="img" aria-label="Una decena, formada por diez unidades" className="grid w-20 grid-cols-5 gap-1 rounded-lg border-2 border-emerald-600 bg-emerald-100 p-1.5">
                    {Array.from({ length: TARGET }, (_, index) => (
                      <span key={index} className="aspect-square rounded-sm bg-emerald-600" />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-emerald-900">1 decena</span>
                </div>
                {extras > 0 ? (
                  <div className="flex flex-col items-center gap-1">
                    <div role="img" className="flex h-12 items-center gap-1" aria-label={`${extras} unidades sueltas`}>
                      {Array.from({ length: extras }, (_, index) => (
                        <span key={index} className="size-3 rounded-full bg-orange-500 ring-2 ring-orange-200" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-orange-900">{extras} {extras === 1 ? "unidad" : "unidades"}</span>
                  </div>
                ) : null}
              </div>
              <p className="mt-2 font-bold tabular-nums text-ink">10 + {extras} = {total}</p>
            </>
          ) : (
            <p className="mt-5 max-w-[15rem] text-sm text-ink-muted">Al llegar a diez, podrás cambiar las diez pelotas por una barra de una decena.</p>
          )}
        </section>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {!bundled ? (
          <>
            <Button
              type="button"
              size="lg"
              className="rounded-full px-6"
              onClick={() => setState((previous) => ({ ...previous, count: Math.min(TARGET, previous.count + 1) }))}
              disabled={state.count >= TARGET}
            >
              {state.count === 0 ? "Contar una unidad" : "Añadir una unidad"}
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              className="rounded-full px-6"
              onClick={() => setState((previous) => ({ ...previous, bundled: true, extras: previous.extras ?? 0 }))}
              disabled={state.count < TARGET}
            >
              Agrupar las diez
            </Button>
          </>
        ) : (
          <Button
            type="button"
            size="lg"
            className="rounded-full px-6"
            onClick={() => setState((previous) => ({ ...previous, extras: Math.min(EXTRA_UNITS, (previous.extras ?? 0) + 1) }))}
            disabled={extras >= EXTRA_UNITS}
          >
            Añadir una unidad
          </Button>
        )}
        {(state.count > 0 || bundled) ? (
          <Button type="button" variant="ghost" className="rounded-full" onClick={() => setState(createDefaultContarDiezState())}>
            Empezar de nuevo
          </Button>
        ) : null}
      </div>

      {ready ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-900">
          Diez unidades forman una decena. Con tres unidades más tenemos 1 decena y 3 unidades: 13.
        </p>
      ) : null}
    </div>
  );
}
