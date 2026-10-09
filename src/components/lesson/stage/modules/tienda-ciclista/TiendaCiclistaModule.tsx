"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
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

type PricePop = { id: string; amount: number; sign: "+" | "−"; key: number };
type TiendaCiclistaState = { tapIds: string[] };

function createDefaultTiendaCiclistaState(): TiendaCiclistaState {
  return { tapIds: [] };
}

function placeValueParts(value: number) {
  const parts = [
    { label: "millares", value: Math.floor(value / 1000) * 1000 },
    { label: "centenas", value: Math.floor(value / 100) % 10 * 100 },
    { label: "decenas", value: Math.floor(value / 10) % 10 * 10 },
    { label: "unidades", value: value % 10 },
  ];

  return parts.filter((part) => part.value > 0);
}

export type TiendaCiclistaModuleProps = {
  stepId: string;
  mode: TiendaMode;
  items?: TiendaCiclistaItem[];
  wallet?: number;
  spendAmount?: number;
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
  stepId,
  mode,
  items = DEFAULT_ITEMS,
  wallet = 828,
  spendAmount,
  autoPlay = false,
  selectedIds,
  onSelectedIdsChange,
  onReadyChange,
  onAnimationComplete,
}: TiendaCiclistaModuleProps) {
  const reduced = useReducedMotion();
  const [storeState, setStoreState] = usePersistedLessonToolState(stepId, createDefaultTiendaCiclistaState);
  // Autoplay needs the latest persisted setter without restarting its timer sequence.
  const setStoreStateRef = useRef(setStoreState);
  const { tapIds } = storeState;
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

  useEffect(() => {
    setStoreStateRef.current = setStoreState;
  }, [setStoreState]);

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
        setStoreStateRef.current({ tapIds: items.map((item) => item.id) });
        onReadyChange?.(true);
        onAnimationComplete?.();
        return;
      }
      onReadyChange?.(false);
      setStoreStateRef.current({ tapIds: [] });
      let i = 0;
      const tick = () => {
        if (i >= items.length) {
          onReadyChange?.(true);
          onAnimationComplete?.();
          return;
        }
        const item = items[i]!;
        setStoreStateRef.current((prev) => ({ tapIds: [...prev.tapIds, item.id] }));
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
      const steps = 6;
      let step = 0;
      const tick = () => {
        step += 1;
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

    if (mode === "sumar-cesta" || mode === "restar-cartera") {
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
    const has = tapIds.includes(id);
    if (!has) {
      pushPop(id, item.price, mode === "restar-cartera" ? "−" : "+");
    }
    setStoreState((prev) => ({
      tapIds: prev.tapIds.includes(id)
        ? prev.tapIds.filter((selectedId) => selectedId !== id)
        : [...prev.tapIds, id],
    }));
  };

  const tappedItems = tapIds.flatMap((id) => {
    const item = items.find((entry) => entry.id === id);
    return item ? [item] : [];
  });
  const sumParts = tappedItems.map((item) => String(item.price)).join(" + ");
  const subtotalRows = tappedItems.map((item, index) => ({
    item,
    subtotal: tappedItems
      .slice(0, index + 1)
      .reduce((sum, selectedItem) => sum + selectedItem.price, 0),
  }));
  const totalParts = placeValueParts(runningTotal);

  return (
    <div
      className="flex flex-col gap-4"
      role="group"
      aria-label="Tienda del equipo ciclista"
      data-testid="tienda-ciclista-module"
    >
      <div className="relative flex flex-wrap justify-center gap-3 sm:justify-start">
        {items.map((item) => {
          const inTap = tapIds.includes(item.id);
          const isSelected = selected.includes(item.id);
          const interactiveExplore = mode === "explorar-compra";
          const interactiveTap = mode === "sumar-cesta" || mode === "restar-cartera";
          return (
            <button
              key={item.id}
              type="button"
              disabled={!interactiveExplore && !interactiveTap}
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
                !interactiveExplore && !interactiveTap && "border-slate-200 bg-slate-50/80",
              )}
              aria-pressed={interactiveExplore ? isSelected : interactiveTap ? inTap : undefined}
              aria-label={`${item.label}, ${item.price} euros`}
            >
              {pops
                .filter((pop) => pop.id === item.id)
                .map((pop) => (
                  <span
                    key={pop.key}
                    className={cn(
                      "pointer-events-none absolute -top-1 left-1/2 z-10 -translate-x-1/2 font-mono text-sm font-bold text-emerald-600",
                      !reduced && "animate-[lesson-price-pop_0.85s_ease-out_forwards]",
                    )}
                  >
                    {pop.sign}
                    {pop.amount}
                  </span>
                ))}
              <ItemIcon id={item.id} />
              <span className="text-xs font-semibold text-ink">{item.label}</span>
              <span className="text-sm font-bold text-cobalt">{item.price} €</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-4 py-4 text-center">
        {mode === "sumar-cesta" ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Total de la compra</p>
            <p className="font-mono text-3xl font-bold text-ink" aria-live="polite">
              {runningTotal} €
            </p>
            {subtotalRows.length > 0 ? (
              <div className="mx-auto mt-3 max-w-md rounded-xl border border-slate-200 bg-white p-3 text-left">
                <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-wide text-ink-muted">
                  Así crece el subtotal
                </p>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-x-3 gap-y-1.5 text-xs tabular-nums">
                  {subtotalRows.map(({ item, subtotal: rowTotal }, index) => (
                    <div key={item.id} className="col-span-3 grid grid-cols-subgrid items-center">
                      <span className="truncate text-ink-muted">{item.label}</span>
                      <span className="text-right font-mono text-ink">
                        {index === 0 ? item.price : `+ ${item.price}`}
                      </span>
                      <span className="min-w-16 text-right font-mono font-semibold text-cobalt">{rowTotal} €</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {sumParts ? (
              <div className="mt-3">
                <p className="text-sm text-ink-muted"><MathRenderer text={`$${sumParts} = ${runningTotal}$ €`} /></p>
                {totalParts.length > 0 ? (
                  <p className="mt-1 text-xs text-ink-muted" aria-label={`Descomposición por valor posicional: ${totalParts.map((part) => `${part.value} ${part.label}`).join(", ")}`}>
                    {totalParts.map((part, index) => (
                      <span key={part.label}>
                        {index > 0 ? " + " : ""}{part.value} <span className="font-medium">({part.label})</span>
                      </span>
                    ))}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="mt-1 text-sm text-ink-muted">Pulsa cada artículo para sumarlo.</p>
            )}
            {runningTotal === totalAll && tapIds.length === items.length ? (
              <p className="mt-2 text-sm font-medium text-emerald-700">¡Equipo completo!</p>
            ) : null}
          </>
        ) : null}
        {mode === "restar-cartera" || mode === "explorar-compra" ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {mode === "restar-cartera" ? "Presupuesto de la compra" : "Cartera"}
            </p>
            <p className="text-sm text-ink-muted">Disponías de <strong className="text-ink">{wallet} €</strong></p>
            <p className={cn("font-mono text-3xl font-bold", (walletLeft ?? wallet) < 0 ? "text-rose-700" : "text-ink")} aria-live="polite">
              Quedan {walletLeft ?? wallet} €
            </p>
            {mode === "restar-cartera" && runningTotal > 0 ? (
              <div className="mt-2 space-y-1 text-sm text-ink-muted">
                <p>Coste de lo elegido: <strong className="text-ink">{runningTotal} €</strong></p>
                <p><MathRenderer text={`$${wallet} - ${runningTotal} = ${wallet - runningTotal}$ €`} /></p>
                <p className="rounded-lg bg-emerald-50 px-3 py-2 text-emerald-900">
                  Comprobación: lo que queda + lo gastado = <strong>{walletLeft} + {runningTotal} = {wallet} €</strong>.
                </p>
              </div>
            ) : mode === "restar-cartera" ? (
              <p className="mt-1 text-sm text-ink-muted">Elige algo para comprar: el coste se resta del presupuesto.</p>
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
