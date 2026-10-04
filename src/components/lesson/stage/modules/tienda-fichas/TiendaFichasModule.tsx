"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  EmbeddedPredictionInScene,
  checkEmbeddedPrediction,
} from "@/components/lesson/stage/EmbeddedPredictionInScene";
import {
  CajaRegistradora,
  Cartera,
  CiclistaArticulo,
  FichaPilesRow,
} from "@/components/lesson/stage/objects";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import {
  decomposeNatural,
  fichasTotal,
  normalizeFichaCounts,
  subtractFichaCounts,
  sumPricesAsFichas,
  type FichaCounts,
} from "@/lib/lesson/stage/fichas-math";
import { isOptimalPurchase } from "@/lib/lesson/stage/maximize-under-budget";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import type { EmbeddedPrediction, TiendaCiclistaItem } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

export type TiendaFichasMode = "sumar-estanteria" | "restar-cobro" | "explorar-toggle";

type TiendaPersist = {
  placedIds: string[];
  phase: string;
  predictSolved: boolean;
  predictNumeric: string;
  predictChoice: string;
  predictWrongAttempts: number;
  exchangeDone: boolean;
  paidIds: string[];
  restPhase: number;
  selectedIds: string[];
  exploreFailCount: number;
  exploreMessage: string | null;
};

export type TiendaFichasModuleProps = {
  stepId: string;
  mode: TiendaFichasMode;
  items: TiendaCiclistaItem[];
  wallet?: number;
  embeddedPrediction?: EmbeddedPrediction;
  onReadyChange?: (ready: boolean) => void;
  onPredictPhaseChange?: (active: boolean, canSubmit: boolean) => void;
  onExploreCheck?: (result: { correct: boolean; message: string }) => void;
  exploreBudget?: number;
  onRegisterPredict?: (submit: () => boolean) => void;
  onRegisterExplore?: (check: () => void) => void;
};

const DEFAULT_ITEMS: TiendaCiclistaItem[] = [
  { id: "bici", label: "Bici", price: 583 },
  { id: "casco", label: "Casco", price: 162 },
  { id: "maillot", label: "Maillot", price: 45 },
  { id: "culotte", label: "Culotte", price: 38 },
];

function LiveFichaTotal({ counts }: { counts: FichaCounts }) {
  const total = fichasTotal(counts);
  return (
    <p className="sr-only" aria-live="polite" aria-atomic="true">
      Total en fichas: {total} euros
    </p>
  );
}

export function TiendaFichasModule({
  stepId,
  mode,
  items = DEFAULT_ITEMS,
  wallet = 1000,
  embeddedPrediction,
  onReadyChange,
  onPredictPhaseChange,
  onExploreCheck,
  exploreBudget,
  onRegisterPredict,
  onRegisterExplore,
}: TiendaFichasModuleProps) {
  const reduced = useReducedMotion();
  const timers = useRef<number[]>([]);
  const [counts, setCounts] = useState<FichaCounts>({ hundreds: 0, tens: 0, ones: 0 });
  const [walletCounts, setWalletCounts] = useState<FichaCounts>(() =>
    decomposeNatural(wallet),
  );
  const [tapSource, setTapSource] = useState<string | null>(null);
  const [shakeOver, setShakeOver] = useState(false);

  const [persist, setPersist] = usePersistedLessonToolState<TiendaPersist>(stepId, () => ({
    placedIds: [],
    phase: "drop",
    predictSolved: false,
    predictNumeric: "",
    predictChoice: "",
    predictWrongAttempts: 0,
    exchangeDone: false,
    paidIds: [],
    restPhase: 0,
    selectedIds: [],
    exploreFailCount: 0,
    exploreMessage: null,
  }));

  const clearTimers = useCallback(() => {
    for (const id of timers.current) {
      window.clearTimeout(id);
    }
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const allPlaced = persist.placedIds.length === items.length;

  const pileCounts = useMemo(() => {
    if (mode !== "sumar-estanteria") {
      return counts;
    }
    const prices = persist.placedIds.map(
      (id) => items.find((item) => item.id === id)?.price ?? 0,
    );
    return sumPricesAsFichas(prices);
  }, [counts, items, mode, persist.placedIds]);

  const normalizedFinal = useMemo(
    () => normalizeFichaCounts({ hundreds: 8, tens: 2, ones: 8 }),
    [],
  );

  const displayCounts = useMemo(() => {
    if (mode === "sumar-estanteria" && persist.exchangeDone) {
      return normalizedFinal;
    }
    if (mode === "sumar-estanteria") {
      return pileCounts;
    }
    return walletCounts;
  }, [mode, persist.exchangeDone, pileCounts, normalizedFinal, walletCounts]);

  const runExchange = useCallback(() => {
    if (reduced) {
      setCounts(normalizedFinal);
      setPersist((prev) => ({ ...prev, exchangeDone: true, phase: "done" }));
      return;
    }
    setPersist((prev) => ({ ...prev, phase: "exchange-ones" }));
    timers.current.push(
      window.setTimeout(() => {
        setCounts((c) => normalizeFichaCounts({ ...c, ones: c.ones - 10 + 0, tens: c.tens + 1 }));
        setPersist((prev) => ({ ...prev, phase: "exchange-tens" }));
      }, 600),
    );
    timers.current.push(
      window.setTimeout(() => {
        setCounts(normalizedFinal);
        setPersist((prev) => ({ ...prev, exchangeDone: true, phase: "done" }));
      }, 1400),
    );
  }, [normalizedFinal, reduced, setPersist]);

  useEffect(() => {
    if (mode === "sumar-estanteria") {
      setCounts(pileCounts);
    }
  }, [mode, pileCounts]);

  useEffect(() => {
    if (mode !== "sumar-estanteria") {
      return;
    }
    const inPredict = allPlaced && !persist.predictSolved && Boolean(embeddedPrediction);
    const canSubmit =
      embeddedPrediction?.kind === "choice"
        ? Boolean(persist.predictChoice)
        : persist.predictNumeric.trim().length > 0;
    onPredictPhaseChange?.(inPredict, inPredict && canSubmit);
    if (persist.exchangeDone || persist.phase === "done") {
      onReadyChange?.(true);
      return;
    }
    if (inPredict) {
      onReadyChange?.(false);
      return;
    }
    if (allPlaced && persist.predictSolved && !persist.exchangeDone) {
      onReadyChange?.(false);
      if (persist.phase === "predict-done") {
        runExchange();
        setPersist((prev) => ({ ...prev, phase: "exchanging" }));
      }
      return;
    }
    onReadyChange?.(false);
  }, [
    allPlaced,
    embeddedPrediction,
    mode,
    onPredictPhaseChange,
    onReadyChange,
    persist.exchangeDone,
    persist.phase,
    persist.predictNumeric,
    persist.predictSolved,
    runExchange,
    setPersist,
  ]);

  useEffect(() => {
    if (mode !== "restar-cobro") {
      return;
    }
    if (reduced) {
      setWalletCounts(decomposeNatural(172));
      setPersist((prev) => ({ ...prev, paidIds: items.map((i) => i.id), phase: "done" }));
      onReadyChange?.(true);
      return;
    }
    onReadyChange?.(false);
    if (persist.paidIds.length >= items.length) {
      onReadyChange?.(true);
      return;
    }
  }, [items, mode, onReadyChange, persist.paidIds.length, reduced, setPersist]);

  const selectedIds =
    mode === "explorar-toggle"
      ? persist.selectedIds.length
        ? persist.selectedIds
        : []
      : [];

  const exploreSpend = useMemo(() => {
    return items
      .filter((item) => selectedIds.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);
  }, [items, selectedIds]);

  const exploreBudgetValue = exploreBudget ?? wallet;
  const exploreRemainder = exploreBudgetValue - exploreSpend;
  const overBudget = exploreRemainder < 0;

  useEffect(() => {
    if (mode !== "explorar-toggle") {
      return;
    }
    setWalletCounts(subtractFichaCounts(decomposeNatural(exploreBudgetValue), sumPricesAsFichas(
      items.filter((i) => selectedIds.includes(i.id)).map((i) => i.price),
    )) ?? decomposeNatural(0));
  }, [exploreBudgetValue, items, mode, selectedIds]);

  const placeItem = (id: string) => {
    if (mode !== "sumar-estanteria" || persist.placedIds.includes(id)) {
      return;
    }
    setPersist((prev) => ({ ...prev, placedIds: [...prev.placedIds, id] }));
  };

  const payItem = (id: string) => {
    if (mode !== "restar-cobro" || persist.paidIds.includes(id)) {
      return;
    }
    const price = items.find((item) => item.id === id)?.price ?? 0;
    const need = decomposeNatural(price);
    setWalletCounts((current) => {
      const next = subtractFichaCounts(current, need);
      return next ?? current;
    });
    setPersist((prev) => ({
      ...prev,
      paidIds: [...prev.paidIds, id],
      restPhase: prev.restPhase + 1,
    }));
  };

  const toggleExplore = (id: string) => {
    if (mode !== "explorar-toggle") {
      return;
    }
    setPersist((prev) => {
      const has = prev.selectedIds.includes(id);
      const nextIds = has
        ? prev.selectedIds.filter((x) => x !== id)
        : [...prev.selectedIds, id];
      const spend = items
        .filter((item) => nextIds.includes(item.id))
        .reduce((s, item) => s + item.price, 0);
      if (spend > exploreBudgetValue) {
        setShakeOver(true);
        timers.current.push(
          window.setTimeout(() => setShakeOver(false), 450),
        );
        return {
          ...prev,
          exploreMessage: `¡Te pasas ${spend - exploreBudgetValue} €!`,
        };
      }
      return { ...prev, selectedIds: nextIds, exploreMessage: null };
    });
  };

  const submitEmbeddedPredict = useCallback(() => {
    if (!embeddedPrediction || persist.predictSolved) {
      return false;
    }
    const ok = checkEmbeddedPrediction(
      embeddedPrediction,
      persist.predictNumeric,
      persist.predictChoice,
    );
    if (ok) {
      setPersist((prev) => ({
        ...prev,
        predictSolved: true,
        phase: "predict-done",
        predictWrongAttempts: prev.predictWrongAttempts,
      }));
      return true;
    }
    setPersist((prev) => ({
      ...prev,
      predictWrongAttempts: prev.predictWrongAttempts + 1,
    }));
    return false;
  }, [
    embeddedPrediction,
    persist.predictChoice,
    persist.predictNumeric,
    persist.predictSolved,
    setPersist,
  ]);

  useEffect(() => {
    onRegisterPredict?.(submitEmbeddedPredict);
  }, [onRegisterPredict, submitEmbeddedPredict]);

  const checkExplorePurchase = useCallback(() => {
    const budget = exploreBudgetValue;
    const optimal = isOptimalPurchase(
      selectedIds,
      items.map((i) => ({ id: i.id, price: i.price })),
      budget,
    );
    if (overBudget) {
      onExploreCheck?.({ correct: false, message: persist.exploreMessage ?? "Te pasas del presupuesto." });
      return;
    }
    if (optimal) {
      onExploreCheck?.({ correct: true, message: `Quedan ${exploreRemainder} € en la cartera.` });
      return;
    }
    const fail = persist.exploreFailCount + 1;
    let message = "Aún puedes aprovechar más el presupuesto.";
    if (exploreSpend === budget) {
      message = "Gastas todo, pero hay otra combinación que deja menos en la cartera.";
    }
    setPersist((prev) => ({
      ...prev,
      exploreFailCount: fail,
      exploreMessage: message,
    }));
    onExploreCheck?.({ correct: false, message });
  }, [
    exploreBudgetValue,
    exploreRemainder,
    exploreSpend,
    items,
    onExploreCheck,
    overBudget,
    persist.exploreFailCount,
    persist.exploreMessage,
    selectedIds,
    setPersist,
  ]);

  useEffect(() => {
    onRegisterExplore?.(checkExplorePurchase);
  }, [checkExplorePurchase, onRegisterExplore]);

  const handleTapItem = (id: string) => {
    if (mode === "sumar-estanteria") {
      placeItem(id);
      return;
    }
    if (mode === "restar-cobro") {
      payItem(id);
      return;
    }
    toggleExplore(id);
  };

  const shelfItems = items.filter(
    (item) => mode !== "sumar-estanteria" || !persist.placedIds.includes(item.id),
  );

  const operationLine =
    mode === "restar-cobro" && persist.paidIds.length
      ? `$${wallet} - ${persist.paidIds
          .map((id) => items.find((i) => i.id === id)?.price ?? 0)
          .reduce((a, b) => a + b, 0)} = ${wallet - persist.paidIds
          .map((id) => items.find((i) => i.id === id)?.price ?? 0)
          .reduce((a, b) => a + b, 0)}$`
      : null;

  return (
    <div
      className="flex min-h-[min(420px,58vh)] flex-col gap-4"
      data-testid={`tienda-fichas-${mode}`}
    >
      <LiveFichaTotal counts={displayCounts} />
      <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-stretch">
        <div className="flex flex-1 flex-col gap-3 rounded-xl bg-slate-50/80 p-3 sm:p-4">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {mode === "sumar-estanteria" ? "Estantería" : "Artículos"}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {shelfItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "flex min-h-11 flex-col items-center gap-1 rounded-xl border-2 bg-white p-2 transition hover:border-cobalt/40",
                  selectedIds.includes(item.id) && "border-cobalt ring-2 ring-cobalt/20",
                  tapSource === item.id && "border-cobalt",
                )}
                onClick={() => handleTapItem(item.id)}
                aria-label={`${item.label}, ${item.price} euros`}
              >
                <CiclistaArticulo id={item.id} />
                <span className="text-sm font-bold text-ink">{item.price} €</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          {mode === "explorar-toggle" ? (
            <Cartera overBudget={overBudget || shakeOver} />
          ) : (
            <CajaRegistradora />
          )}
          {mode !== "restar-cobro" ? (
            <FichaPilesRow counts={displayCounts} compact={displayCounts.ones > 12} />
          ) : (
            <FichaPilesRow counts={walletCounts} compact />
          )}
          {mode === "explorar-toggle" ? (
            <p
              className={cn(
                "text-center text-sm font-semibold tabular-nums",
                overBudget ? "text-rose-600" : "text-ink",
              )}
            >
              {overBudget
                ? `¡Te pasas ${-exploreRemainder} €!`
                : `Quedan ${exploreRemainder} €`}
            </p>
          ) : null}
        </div>
      </div>

      {mode === "sumar-estanteria" && allPlaced && embeddedPrediction && !persist.predictSolved ? (
        <EmbeddedPredictionInScene
          prediction={embeddedPrediction}
          numericValue={persist.predictNumeric}
          choiceId={persist.predictChoice}
          onNumericChange={(value) =>
            setPersist((prev) => ({ ...prev, predictNumeric: value }))
          }
          onChoiceChange={(id) => setPersist((prev) => ({ ...prev, predictChoice: id }))}
          wrongAttempts={persist.predictWrongAttempts}
          solved={persist.predictSolved}
        />
      ) : null}

      {mode === "sumar-estanteria" && persist.predictSolved && !persist.exchangeDone ? (
        <p className="text-center text-sm font-semibold text-cobalt">Cambiar fichas…</p>
      ) : null}

      {mode === "restar-cobro" && operationLine ? (
        <p className="text-center text-sm text-ink-muted">
          <MathRenderer text={operationLine} />
        </p>
      ) : null}

      {mode === "explorar-toggle" && persist.exploreMessage ? (
        <p className="text-center text-sm font-medium text-amber-800" role="status">
          {persist.exploreMessage}
        </p>
      ) : null}

    </div>
  );
}

