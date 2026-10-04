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

type TiendaMode = "sumar-cesta" | "restar-cartera" | "explorar-compra";

export type TiendaCiclistaModuleProps = {
  stepId: string;
  mode: TiendaMode;
  items?: TiendaCiclistaItem[];
  wallet?: number;
  /** Pago fijo en modo restar (como en la diapositiva: $828 - 693$). */
  spendAmount?: number;
  /** Reproducir animación completa (p. ej. tras predict). */
  autoPlay?: boolean;
  /** Selección en explore */
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
  wallet = 1000,
  spendAmount,
  autoPlay = false,
  selectedIds,
  onSelectedIdsChange,
  onReadyChange,
  onAnimationComplete,
}: TiendaCiclistaModuleProps) {
  const reduced = useReducedMotion();
  const [basketIds, setBasketIds] = useState<string[]>([]);
  const [animIndex, setAnimIndex] = useState(0);
  const [spentPhase, setSpentPhase] = useState(0);
  const [fixedSpendShown, setFixedSpendShown] = useState(0);
  const timers = useRef<number[]>([]);

  const totalAll = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);
  const fixedSpend = spendAmount ?? totalAll;

  const selected = selectedIds ?? items.map((item) => item.id);
  const selectedTotal = useMemo(
    () => items.filter((item) => selected.includes(item.id)).reduce((s, i) => s + i.price, 0),
    [items, selected],
  );
  const remainder = wallet - selectedTotal;

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

    if (mode === "sumar-cesta") {
      if (reduced || autoPlay) {
        setBasketIds(items.map((item) => item.id));
        setAnimIndex(items.length);
        onReadyChange?.(true);
        onAnimationComplete?.();
        return;
      }
      onReadyChange?.(false);
      setBasketIds([]);
      setAnimIndex(0);
      let i = 0;
      const tick = () => {
        if (i >= items.length) {
          onReadyChange?.(true);
          onAnimationComplete?.();
          return;
        }
        const item = items[i]!;
        setBasketIds((prev) => [...prev, item.id]);
        setAnimIndex(i + 1);
        i += 1;
        timers.current.push(window.setTimeout(tick, 700));
      };
      timers.current.push(window.setTimeout(tick, 400));
      return () => clearTimers();
    }

    if (mode === "restar-cartera") {
      if (spendAmount != null) {
        if (reduced) {
          setFixedSpendShown(spendAmount);
          onReadyChange?.(true);
          onAnimationComplete?.();
          return;
        }
        onReadyChange?.(false);
        setFixedSpendShown(0);
        const steps = 6;
        let step = 0;
        const tick = () => {
          step += 1;
          const next = Math.round((spendAmount * step) / steps);
          setFixedSpendShown(next);
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

      if (reduced) {
        setSpentPhase(items.length);
        onReadyChange?.(true);
        onAnimationComplete?.();
        return;
      }
      onReadyChange?.(false);
      setSpentPhase(0);
      let i = 0;
      const tick = () => {
        if (i >= items.length) {
          onReadyChange?.(true);
          onAnimationComplete?.();
          return;
        }
        i += 1;
        setSpentPhase(i);
        timers.current.push(window.setTimeout(tick, 650));
      };
      timers.current.push(window.setTimeout(tick, 500));
      return () => clearTimers();
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

  const runningTotal = useMemo(() => {
    if (mode === "sumar-cesta") {
      return items.slice(0, animIndex).reduce((s, item) => s + item.price, 0);
    }
    if (mode === "restar-cartera") {
      if (spendAmount != null) {
        return fixedSpendShown;
      }
      return items.slice(0, spentPhase).reduce((s, item) => s + item.price, 0);
    }
    return selectedTotal;
  }, [animIndex, fixedSpendShown, items, mode, selectedTotal, spentPhase, spendAmount]);

  const walletLeft =
    mode === "restar-cartera" ? wallet - runningTotal : mode === "explorar-compra" ? remainder : null;

  const toggleItem = (id: string) => {
    if (!onSelectedIdsChange) {
      return;
    }
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
    onSelectedIdsChange(next);
  };

  return (
    <div
      className="flex flex-col gap-4"
      aria-label="Tienda del equipo ciclista"
      data-testid="tienda-ciclista-module"
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
          {items.map((item) => {
            const inBasket = basketIds.includes(item.id);
            const isSelected = selected.includes(item.id);
            const interactive = mode === "explorar-compra";
            return (
              <button
                key={item.id}
                type="button"
                disabled={!interactive}
                onClick={() => toggleItem(item.id)}
                className={cn(
                  "flex w-[7.25rem] flex-col items-center gap-1 rounded-xl border px-2 py-3 text-center transition",
                  interactive && "cursor-pointer hover:border-cobalt/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt",
                  interactive && isSelected && "border-cobalt bg-cobalt-tint/50",
                  !interactive && "border-slate-200 bg-slate-50/80",
                  mode === "sumar-cesta" && inBasket && "scale-95 opacity-40",
                )}
                aria-pressed={interactive ? isSelected : undefined}
                aria-label={`${item.label}, ${item.price} euros`}
              >
                <ItemIcon id={item.id} />
                <span className="text-xs font-semibold text-ink">{item.label}</span>
                <span className="text-sm font-bold text-cobalt">{item.price} €</span>
              </button>
            );
          })}
        </div>

        <div className="flex min-w-[10rem] flex-col gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4">
          {mode === "sumar-cesta" ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Cesta</p>
              <p className="font-mono text-2xl font-bold text-ink" aria-live="polite">
                {runningTotal} €
              </p>
              {animIndex >= items.length ? (
                <p className="text-sm text-ink-muted">
                  <MathRenderer text="$583 + 162 + 45 + 38 = 828$ €" />
                </p>
              ) : null}
            </>
          ) : null}
          {mode === "restar-cartera" || mode === "explorar-compra" ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Cartera</p>
              <p className="text-sm text-ink-muted">Inicio: {wallet} €</p>
              <p className="font-mono text-2xl font-bold text-ink" aria-live="polite">
                Quedan {walletLeft ?? wallet} €
              </p>
              {mode === "explorar-compra" ? (
                <p className="text-xs text-ink-muted">
                  Gasto: {selectedTotal} € · {wallet} − {selectedTotal} = {remainder} €
                </p>
              ) : spendAmount != null && fixedSpendShown >= spendAmount ? (
                <p className="text-sm text-ink-muted">
                  <MathRenderer text={`$${wallet} - ${spendAmount} = ${wallet - spendAmount}$ €`} />
                </p>
              ) : spentPhase >= items.length ? (
                <p className="text-sm text-ink-muted">
                  {wallet} − {fixedSpend} = {wallet - fixedSpend} €
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
