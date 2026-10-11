"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import type { TiendaCiclistaItem } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

const PRODUCT_IMAGES: Record<string, string> = {
  bici: "/lesson/tienda-ciclista/bici.png",
  casco: "/lesson/tienda-ciclista/casco.png",
  maillot: "/lesson/tienda-ciclista/mallot.png",
  culotte: "/lesson/tienda-ciclista/culotte.png",
};

const DEFAULT_ITEMS: TiendaCiclistaItem[] = [
  { id: "bici", label: "Bici", price: 583 },
  { id: "casco", label: "Casco", price: 162 },
  { id: "maillot", label: "Maillot", price: 45 },
  { id: "culotte", label: "Culotte", price: 38 },
];

type TiendaMode =
  | "sumar-cesta"
  | "restar-cartera"
  | "calcular-faltante"
  | "calcular-sobra"
  | "explorar-compra";

export type TiendaCiclistaModuleProps = {
  stepId: string;
  mode: TiendaMode;
  items?: TiendaCiclistaItem[];
  wallet?: number;
  spendAmount?: number;
  savedAmount?: number;
  autoPlay?: boolean;
  selectedIds?: string[];
  onSelectedIdsChange?: (ids: string[]) => void;
  onReadyChange?: (ready: boolean) => void;
  onAnimationComplete?: () => void;
};

function ItemIcon({ id, large }: { id: string; large?: boolean }) {
  const src = PRODUCT_IMAGES[id];
  if (!src) {
    return null;
  }
  return (
    <Image
      src={src}
      alt=""
      width={120}
      height={90}
      className={cn(
        "w-auto object-contain",
        large ? "h-[4.5rem] max-w-[7rem]" : "h-8 max-w-[3.5rem]",
      )}
      aria-hidden
    />
  );
}

export function TiendaCiclistaModule({
  mode,
  items = DEFAULT_ITEMS,
  wallet = 828,
  spendAmount,
  savedAmount = 693,
  autoPlay = false,
  selectedIds,
  onSelectedIdsChange,
  onReadyChange,
  onAnimationComplete,
}: TiendaCiclistaModuleProps) {
  const reduced = useReducedMotion();
  const [tapIds, setTapIds] = useState<string[]>([]);
  const [flyingId, setFlyingId] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const cestaRef = useRef<HTMLDivElement>(null);

  const totalAll = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);

  const selected = selectedIds ?? items.map((item) => item.id);
  const selectedTotal = useMemo(
    () => items.filter((item) => selected.includes(item.id)).reduce((s, i) => s + i.price, 0),
    [items, selected],
  );
  const remainder = wallet - selectedTotal;

  const orderedTappedPrices = useMemo(
    () => items.filter((item) => tapIds.includes(item.id)).map((item) => item.price),
    [items, tapIds],
  );

  const tapTotal = useMemo(
    () => orderedTappedPrices.reduce((sum, price) => sum + price, 0),
    [orderedTappedPrices],
  );

  const clearTimers = useCallback(() => {
    for (const id of timers.current) {
      window.clearTimeout(id);
    }
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (mode === "explorar-compra") {
      onReadyChange?.(remainder >= 0 && remainder < 200);
      return;
    }

    if (autoPlay && mode === "sumar-cesta") {
      if (reduced) {
        setTapIds(items.map((item) => item.id));
        onReadyChange?.(true);
        onAnimationComplete?.();
        return;
      }
      onReadyChange?.(false);
      setTapIds([]);
      let i = 0;
      const tick = () => {
        if (i >= items.length) {
          onReadyChange?.(true);
          onAnimationComplete?.();
          return;
        }
        const item = items[i]!;
        setTapIds((prev) => [...prev, item.id]);
        i += 1;
        timers.current.push(window.setTimeout(tick, 700));
      };
      timers.current.push(window.setTimeout(tick, 400));
      return () => clearTimers();
    }

    if (autoPlay && mode === "restar-cartera" && spendAmount != null) {
      onReadyChange?.(true);
      onAnimationComplete?.();
      return () => clearTimers();
    }

    if (
      mode === "sumar-cesta" ||
      mode === "restar-cartera" ||
      mode === "calcular-faltante" ||
      mode === "calcular-sobra"
    ) {
      onReadyChange?.(true);
    }
  }, [
    autoPlay,
    clearTimers,
    items,
    mode,
    onAnimationComplete,
    onReadyChange,
    reduced,
    remainder,
    spendAmount,
  ]);

  const runningTotal =
    mode === "sumar-cesta"
      ? tapTotal
      : mode === "restar-cartera" && autoPlay && spendAmount != null
        ? spendAmount
        : mode === "restar-cartera"
          ? tapTotal
          : selectedTotal;

  const walletLeft =
    mode === "restar-cartera" ? wallet - runningTotal : mode === "explorar-compra" ? remainder : null;

  const equipmentComplete = tapIds.length === items.length;
  const shortfall = Math.max(0, totalAll - savedAmount);
  const surplus = Math.max(0, savedAmount - totalAll);

  const growingExpression = useMemo(() => {
    if (orderedTappedPrices.length === 0) {
      return null;
    }
    const sumPart = orderedTappedPrices.join(" + ");
    if (equipmentComplete) {
      return `$${sumPart} = ${totalAll}$ €`;
    }
    return `$${sumPart}$`;
  }, [equipmentComplete, orderedTappedPrices, totalAll]);

  const toggleExploreItem = (id: string) => {
    if (!onSelectedIdsChange) {
      return;
    }
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
    onSelectedIdsChange(next);
  };

  const addToCesta = (id: string) => {
    const item = items.find((entry) => entry.id === id);
    if (!item || tapIds.includes(id)) {
      return;
    }
    if (!reduced) {
      setFlyingId(id);
      timers.current.push(
        window.setTimeout(() => {
          setFlyingId(null);
        }, 650),
      );
    }
    setTapIds((prev) => [...prev, id]);
  };

  const toggleTapItem = (id: string) => {
    if (mode === "sumar-cesta") {
      addToCesta(id);
      return;
    }
    const item = items.find((entry) => entry.id === id);
    if (!item) {
      return;
    }
    setTapIds((prev) => {
      const has = prev.includes(id);
      if (has) {
        return prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  };

  const differenceMode = mode === "calcular-faltante" || mode === "calcular-sobra";
  const barMax = differenceMode ? Math.max(savedAmount, totalAll) : totalAll;
  const savedBarPct = (savedAmount / barMax) * 100;
  const targetBarPct = (totalAll / barMax) * 100;
  const gapBarPct = Math.max(0, targetBarPct - savedBarPct);
  const surplusBarPct = Math.max(0, savedBarPct - targetBarPct);

  return (
    <div
      className="mx-auto flex w-full max-w-4xl flex-col gap-6"
      aria-label="Tienda del equipo ciclista"
      data-testid="tienda-ciclista-module"
    >
      <div
        className={cn(
          "flex flex-wrap justify-center gap-4",
          differenceMode && "opacity-95",
        )}
      >
        {items.map((item) => {
          const inTap = tapIds.includes(item.id);
          const isSelected = selected.includes(item.id);
          const interactiveExplore = mode === "explorar-compra";
          const interactiveTap = mode === "sumar-cesta" || mode === "restar-cartera";
          const displayOnly = differenceMode;
          const awaitingTap = mode === "sumar-cesta" && !inTap && !equipmentComplete;
          const isFlying = flyingId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              disabled={displayOnly || (!interactiveExplore && !interactiveTap)}
              onClick={() => {
                if (interactiveExplore) {
                  toggleExploreItem(item.id);
                } else if (interactiveTap) {
                  toggleTapItem(item.id);
                }
              }}
              className={cn(
                "relative flex min-w-[8.5rem] max-w-[9.5rem] flex-col items-center gap-2 rounded-2xl border-2 px-3 py-4 text-center transition",
                (interactiveExplore || interactiveTap) &&
                  "cursor-pointer hover:border-cobalt/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt",
                interactiveExplore && isSelected && "border-cobalt bg-cobalt-tint/50",
                interactiveTap && inTap && "border-cobalt/70 bg-cobalt-tint/30 opacity-80",
                displayOnly && "border-[color:var(--stage-border,#334155)] bg-black/25",
                awaitingTap && !reduced && "animate-[lesson-card-attention_2s_ease-in-out_infinite]",
                isFlying && "animate-[lesson-fly-to-cesta_0.65s_ease-in_forwards] motion-reduce:animate-none",
              )}
              aria-pressed={interactiveExplore || interactiveTap ? inTap || isSelected : undefined}
              aria-label={`${item.label}, ${item.price} euros`}
            >
              <ItemIcon id={item.id} large />
              <span className="text-sm font-semibold text-ink">{item.label}</span>
              <span className="rounded-lg border border-cobalt/35 bg-cobalt-tint/40 px-3 py-1 font-mono text-xl font-bold tabular-nums text-[color:var(--stage-accent,#58c4dd)]">
                {item.price} €
              </span>
            </button>
          );
        })}
      </div>

      {mode === "sumar-cesta" ? (
        <div className="flex flex-col items-center gap-4">
          <div
            ref={cestaRef}
            className="flex min-h-[4.5rem] w-full max-w-lg flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-cobalt/35 bg-black/30 px-4 py-3"
            aria-label="Cesta"
          >
            {tapIds.length === 0 ? (
              <p className="text-base font-medium text-ink-muted">La cesta está vacía</p>
            ) : (
              items
                .filter((item) => tapIds.includes(item.id))
                .map((item) => (
                  <span key={item.id} className="rounded-lg bg-black/40 px-2 py-1">
                    <ItemIcon id={item.id} />
                  </span>
                ))
            )}
          </div>

          <div className="w-full max-w-2xl rounded-2xl border border-[color:var(--stage-border,#334155)] bg-black/35 px-6 py-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
              El equipo ciclista cuesta en total
            </p>
            {growingExpression ? (
              <p className="mt-3 font-mono text-2xl font-bold leading-snug text-ink sm:text-3xl" aria-live="polite">
                <MathRenderer text={growingExpression} />
              </p>
            ) : (
              <p className="mt-3 text-lg font-medium text-ink-muted">
                Pulsa cada artículo para ir sumando precios
              </p>
            )}
            {equipmentComplete ? (
              <p className="mt-3 text-base font-semibold text-[color:var(--stage-accent-muted,#83c167)]">
                ¡Equipo completo!
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {differenceMode ? (
        <div className="mx-auto w-full max-w-xl space-y-4 rounded-2xl border border-[color:var(--stage-border,#334155)] bg-black/35 px-6 py-5">
          <div className="flex items-center justify-between gap-4 text-sm text-ink-muted">
            <span>
              Cartera:{" "}
              <strong className="font-mono text-lg text-ink">{savedAmount} €</strong>
            </span>
            <span>
              Equipo:{" "}
              <strong className="font-mono text-lg text-ink">{totalAll} €</strong>
            </span>
          </div>
          <div className="relative h-10 overflow-hidden rounded-full bg-black/50">
            <div
              className="absolute inset-y-0 left-0 bg-cobalt/75 transition-[width] duration-500"
              style={{ width: `${Math.min(savedBarPct, targetBarPct)}%` }}
            />
            {mode === "calcular-faltante" ? (
              <>
                <div
                  className="absolute inset-y-0 bg-cobalt/40 transition-[width] duration-500"
                  style={{ width: `${savedBarPct}%` }}
                />
                <div
                  className="absolute inset-y-0 bg-amber-500/45 transition-[width] duration-500"
                  style={{ left: `${savedBarPct}%`, width: `${gapBarPct}%` }}
                />
              </>
            ) : (
              <>
                <div
                  className="absolute inset-y-0 bg-cobalt/55 transition-[width] duration-500"
                  style={{ width: `${targetBarPct}%` }}
                />
                <div
                  className="absolute inset-y-0 bg-emerald-500/45 transition-[width] duration-500"
                  style={{ left: `${targetBarPct}%`, width: `${surplusBarPct}%` }}
                />
              </>
            )}
            <div
              className="absolute inset-y-0 w-0.5 bg-white/70"
              style={{ left: `${targetBarPct}%` }}
              aria-hidden
            />
          </div>
          <p className="text-center font-mono text-3xl font-bold text-ink" aria-live="polite">
            {mode === "calcular-faltante" ? (
              <>Faltan {shortfall} €</>
            ) : (
              <>Sobran {surplus} €</>
            )}
          </p>
          <p className="text-center text-lg text-ink-muted">
            <MathRenderer
              text={
                mode === "calcular-faltante"
                  ? `$${totalAll} - ${savedAmount} = ${shortfall}$ €`
                  : `$${savedAmount} - ${totalAll} = ${surplus}$ €`
              }
            />
          </p>
        </div>
      ) : null}

      {mode === "restar-cartera" || mode === "explorar-compra" ? (
        <div className="rounded-xl border border-dashed border-[color:var(--stage-border,#334155)] bg-black/25 px-4 py-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Cartera</p>
          <p className="text-sm text-ink-muted">Tenías {wallet} €</p>
          <p className="font-mono text-3xl font-bold text-ink" aria-live="polite">
            Quedan {walletLeft ?? wallet} €
          </p>
          {mode === "explorar-compra" ? (
            <p className="text-xs text-ink-muted">
              Gasto: {selectedTotal} € · {wallet} − {selectedTotal} = {remainder} €
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
