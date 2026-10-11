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

type TiendaMode = "sumar-cesta" | "restar-cartera" | "calcular-faltante" | "explorar-compra";

type PricePop = { id: string; amount: number; sign: "+" | "−"; key: number };

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

function ItemIcon({ id }: { id: string }) {
  const src = PRODUCT_IMAGES[id];
  if (!src) {
    return null;
  }
  return (
    <Image
      src={src}
      alt=""
      width={96}
      height={72}
      className="h-14 w-auto max-w-[5.5rem] object-contain"
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
  const [pops, setPops] = useState<PricePop[]>([]);
  const popKey = useRef(0);
  const timers = useRef<number[]>([]);

  const totalAll = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);

  const selected = selectedIds ?? items.map((item) => item.id);
  const selectedTotal = useMemo(
    () => items.filter((item) => selected.includes(item.id)).reduce((s, i) => s + i.price, 0),
    [items, selected],
  );
  const remainder = wallet - selectedTotal;

  const tapTotal = useMemo(
    () => items.filter((item) => tapIds.includes(item.id)).reduce((s, i) => s + i.price, 0),
    [items, tapIds],
  );

  const clearTimers = useCallback(() => {
    for (const id of timers.current) {
      window.clearTimeout(id);
    }
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const pushPop = useCallback((id: string, amount: number, sign: "+" | "−") => {
    const key = popKey.current++;
    setPops((prev) => [...prev, { id, amount, sign, key }]);
    timers.current.push(
      window.setTimeout(() => {
        setPops((prev) => prev.filter((pop) => pop.key !== key));
      }, 900),
    );
  }, []);

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
      if (reduced) {
        onReadyChange?.(true);
        onAnimationComplete?.();
        return;
      }
      onReadyChange?.(false);
      let shown = 0;
      const steps = 6;
      let step = 0;
      const tick = () => {
        step += 1;
        shown = Math.round((spendAmount * step) / steps);
        if (step >= steps) {
          onReadyChange?.(true);
          onAnimationComplete?.();
          return;
        }
        timers.current.push(window.setTimeout(tick, 450));
      };
      timers.current.push(window.setTimeout(tick, 500));
      return () => clearTimers();
    }

    if (mode === "sumar-cesta" || mode === "restar-cartera" || mode === "calcular-faltante") {
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
      : mode === "restar-cartera" && !autoPlay
        ? tapTotal
        : mode === "restar-cartera" && autoPlay && spendAmount != null
          ? spendAmount
          : selectedTotal;

  const walletLeft =
    mode === "restar-cartera" ? wallet - runningTotal : mode === "explorar-compra" ? remainder : null;

  const toggleExploreItem = (id: string) => {
    if (!onSelectedIdsChange) {
      return;
    }
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
    onSelectedIdsChange(next);
  };

  const toggleTapItem = (id: string) => {
    const item = items.find((entry) => entry.id === id);
    if (!item) {
      return;
    }
    setTapIds((prev) => {
      const has = prev.includes(id);
      if (has) {
        return prev.filter((x) => x !== id);
      }
      pushPop(id, item.price, mode === "restar-cartera" ? "−" : "+");
      return [...prev, id];
    });
  };

  const sumParts = items
    .filter((item) => tapIds.includes(item.id))
    .map((item) => String(item.price))
    .join(" + ");
  const fullEquipmentSum = items.map((item) => String(item.price)).join(" + ");
  const equipmentComplete = tapIds.length === items.length;
  const shortfall = totalAll - savedAmount;

  return (
    <div
      className="flex flex-col gap-4"
      aria-label="Tienda del equipo ciclista"
      data-testid="tienda-ciclista-module"
    >
      <div className="relative flex flex-wrap justify-center gap-3 sm:justify-start">
        {items.map((item) => {
          const inTap = tapIds.includes(item.id);
          const isSelected = selected.includes(item.id);
          const interactiveExplore = mode === "explorar-compra";
          const interactiveTap = mode === "sumar-cesta" || mode === "restar-cartera";
          const displayOnly = mode === "calcular-faltante";
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
                "relative flex w-[7.25rem] flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition",
                (interactiveExplore || interactiveTap) &&
                  "cursor-pointer hover:border-cobalt/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt",
                interactiveExplore && isSelected && "border-cobalt bg-cobalt-tint/50",
                interactiveTap && inTap && "border-cobalt bg-cobalt-tint/40 ring-2 ring-cobalt/20",
                (displayOnly || (!interactiveExplore && !interactiveTap)) &&
                  "border-[color:var(--stage-border,#334155)] bg-black/25",
              )}
              aria-pressed={interactiveExplore || interactiveTap ? inTap || isSelected : undefined}
              aria-label={`${item.label}, ${item.price} euros`}
            >
              {pops
                .filter((pop) => pop.id === item.id)
                .map((pop) => (
                  <span
                    key={pop.key}
                    className="pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 animate-[lesson-price-pop_0.85s_ease-out_forwards] font-mono text-sm font-bold text-emerald-600"
                  >
                    {pop.sign}
                    {pop.amount}
                  </span>
                ))}
              <ItemIcon id={item.id} />
              <span className="text-xs font-semibold text-ink">{item.label}</span>
              <span className="text-sm font-bold text-[color:var(--stage-accent,#58c4dd)]">{item.price} €</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-dashed border-[color:var(--stage-border,#334155)] bg-black/25 px-4 py-4 text-center">
        {mode === "sumar-cesta" ? (
          <>
            <p className="text-sm font-medium text-ink">El equipo ciclista cuesta en total:</p>
            <p className="font-mono text-3xl font-bold text-ink" aria-live="polite">
              {runningTotal} €
            </p>
            {equipmentComplete ? (
              <p className="mt-1 text-sm text-ink-muted">
                <MathRenderer text={`$${fullEquipmentSum} = ${totalAll}$ €`} />
              </p>
            ) : sumParts ? (
              <p className="mt-1 text-sm text-ink-muted">
                <MathRenderer text={`$${sumParts} = ${runningTotal}$ €`} />
              </p>
            ) : (
              <p className="mt-1 text-sm text-ink-muted">Pulsa cada artículo para sumarlo.</p>
            )}
            {equipmentComplete ? (
              <p className="mt-2 text-sm font-medium text-[color:var(--stage-accent-muted,#83c167)]">¡Equipo completo!</p>
            ) : null}
          </>
        ) : null}
        {mode === "calcular-faltante" ? (
          <>
            <p className="text-sm text-ink-muted">
              Disponemos de <span className="font-mono font-bold text-ink">{savedAmount} €</span>.
            </p>
            <p className="mt-2 text-sm font-medium text-ink">
              Para comprar el equipo completo ({totalAll} €) todavía nos faltan:
            </p>
            <p className="font-mono text-3xl font-bold text-ink" aria-live="polite">
              {shortfall} €
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              <MathRenderer text={`$${totalAll} - ${savedAmount} = ${shortfall}$ €`} />
            </p>
          </>
        ) : null}
        {mode === "restar-cartera" || mode === "explorar-compra" ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Cartera</p>
            <p className="text-sm text-ink-muted">Tenías {wallet} €</p>
            <p className="font-mono text-3xl font-bold text-ink" aria-live="polite">
              Quedan {walletLeft ?? wallet} €
            </p>
            {mode === "restar-cartera" && tapTotal > 0 ? (
              <p className="mt-1 text-sm text-ink-muted">
                <MathRenderer text={`$${wallet} - ${runningTotal} = ${wallet - runningTotal}$ €`} />
              </p>
            ) : mode === "restar-cartera" ? (
              <p className="mt-1 text-sm text-ink-muted">Pulsa un artículo para restar su precio.</p>
            ) : null}
            {mode === "explorar-compra" ? (
              <p className="text-xs text-ink-muted">
                Gasto: {selectedTotal} € · {wallet} − {selectedTotal} = {remainder} €
              </p>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
}
