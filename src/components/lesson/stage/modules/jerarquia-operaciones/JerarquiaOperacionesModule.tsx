"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";
import {
  Chip,
  DotGrid,
  OpBadge,
  ParenthesisCrate,
  SharePlates,
  TierStep,
} from "@/components/lesson/stage/modules/jerarquia-operaciones/svg-primitives";

export type JerarquiaOperacionesModuleProps = {
  scene: string;
  /** En pasos predict: false = pausa antes del resultado; true = animar resolución. */
  revealPlayed?: boolean;
  autoPlay?: boolean;
  onReadyChange?: (ready: boolean) => void;
  /** Explore: secuencia objetivo de ids de operación. */
  targetSequence?: string[];
  tapSequence?: string[];
  onTapSequenceChange?: (sequence: string[]) => void;
};

function useStageTimer(reduced: boolean, steps: (() => void)[], onDone: () => void, enabled: boolean) {
  const timers = useRef<number[]>([]);
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const clear = () => {
      for (const id of timers.current) {
        window.clearTimeout(id);
      }
      timers.current = [];
    };
    if (reduced) {
      steps.forEach((fn) => fn());
      onDone();
      return clear;
    }
    let i = 0;
    const tick = () => {
      if (i >= steps.length) {
        onDone();
        return;
      }
      steps[i]?.();
      i += 1;
      timers.current.push(window.setTimeout(tick, 850));
    };
    timers.current.push(window.setTimeout(tick, 400));
    return clear;
  }, [enabled, onDone, reduced, steps]);
}

function EscaleraReglas({ onReadyChange }: { onReadyChange?: (ready: boolean) => void }) {
  const reduced = useReducedMotion();
  const [tier, setTier] = useState(reduced ? 3 : 0);

  useStageTimer(
    reduced,
    [() => setTier(1), () => setTier(2), () => setTier(3)],
    () => onReadyChange?.(true),
    true,
  );

  return (
    <div className="space-y-3" data-testid="jerarquia-escalera" aria-label="Orden de las operaciones">
      <TierStep step={1} title="Paréntesis" active={tier >= 1}>
        <ParenthesisCrate active={tier === 1}>
          <Chip color="violet" />
          <OpBadge op="−" label="Resta" />
          <Chip color="violet" />
        </ParenthesisCrate>
      </TierStep>
      <TierStep step={2} title="Multiplicaciones y divisiones" active={tier >= 2}>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <DotGrid rows={2} cols={3} />
          <OpBadge op="×" label="Multiplicación" />
          <SharePlates total={6} plates={3} highlight={tier === 2 ? "share" : null} />
        </div>
      </TierStep>
      <TierStep step={3} title="Sumas y restas" active={tier >= 3}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Chip color="cobalt" />
          <Chip color="cobalt" />
          <OpBadge op="+" label="Suma" />
          <Chip color="emerald" />
          <OpBadge op="−" label="Resta" />
          <Chip color="rose" />
        </div>
      </TierStep>
    </div>
  );
}

function EjemploMulPrimero({
  revealPlayed,
  onReadyChange,
}: {
  revealPlayed?: boolean;
  onReadyChange?: (ready: boolean) => void;
}) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(revealPlayed ? (reduced ? 3 : 0) : 0);

  useEffect(() => {
    if (!revealPlayed) {
      setPhase(0);
      onReadyChange?.(true);
      return;
    }
    if (reduced) {
      setPhase(3);
      onReadyChange?.(true);
      return;
    }
    onReadyChange?.(false);
    setPhase(0);
    const ids = [
      window.setTimeout(() => setPhase(1), 400),
      window.setTimeout(() => setPhase(2), 1300),
      window.setTimeout(() => {
        setPhase(3);
        onReadyChange?.(true);
      }, 2200),
    ];
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [onReadyChange, reduced, revealPlayed]);

  return (
    <div
      className="space-y-4"
      data-testid="jerarquia-ejemplo-1"
      aria-label="Cuatro más tres menos dos por tres"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Chip key={`b-${i}`} color="cobalt" label="Ficha azul" />
        ))}
        <OpBadge op="+" label="Suma" />
        {Array.from({ length: 3 }, (_, i) => (
          <Chip key={`g-${i}`} color="emerald" label="Ficha verde" />
        ))}
        <OpBadge op="−" label="Resta" />
        <div className={cn("transition-all duration-500", phase >= 1 && "ring-4 ring-rose/40 rounded-xl")}>
          <DotGrid rows={2} cols={3} color="amber" />
        </div>
      </div>
      {phase >= 1 ? (
        <p className="text-center text-sm font-medium text-ink animate-in fade-in duration-500">
          Primero el producto: dos filas de tres fichas → seis fichas naranjas.
        </p>
      ) : (
        <p className="text-center text-sm text-ink-muted">¿Qué operación tiene prioridad aquí?</p>
      )}
      {phase >= 2 ? (
        <div className="flex flex-wrap items-center justify-center gap-2 animate-in fade-in duration-500">
          {Array.from({ length: 4 }, (_, i) => (
            <Chip key={`b2-${i}`} color="cobalt" />
          ))}
          <OpBadge op="+" label="Suma" />
          {Array.from({ length: 3 }, (_, i) => (
            <Chip key={`g2-${i}`} color="emerald" />
          ))}
          <OpBadge op="−" label="Resta" />
          <div className="flex gap-1">
            {Array.from({ length: 6 }, (_, i) => (
              <Chip key={`o-${i}`} color="amber" className={cn(phase >= 2 && "opacity-80")} />
            ))}
          </div>
        </div>
      ) : null}
      {phase >= 3 ? (
        <div className="flex flex-col items-center gap-2 animate-in zoom-in-95 duration-500">
          <div className="flex items-center gap-2">
            <Chip color="cobalt" />
            <OpBadge op="=" label="Igual" />
            <Chip color="rose" label="Resultado: una ficha" />
          </div>
          <p className="text-xs text-ink-muted">Siete menos seis deja una ficha.</p>
        </div>
      ) : null}
    </div>
  );
}

function EjemploParentesis({
  revealPlayed,
  onReadyChange,
}: {
  revealPlayed?: boolean;
  onReadyChange?: (ready: boolean) => void;
}) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(revealPlayed ? (reduced ? 3 : 0) : 0);

  useEffect(() => {
    if (!revealPlayed) {
      setPhase(0);
      onReadyChange?.(true);
      return;
    }
    if (reduced) {
      setPhase(3);
      onReadyChange?.(true);
      return;
    }
    onReadyChange?.(false);
    setPhase(0);
    const ids = [
      window.setTimeout(() => setPhase(1), 400),
      window.setTimeout(() => setPhase(2), 1300),
      window.setTimeout(() => {
        setPhase(3);
        onReadyChange?.(true);
      }, 2200),
    ];
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [onReadyChange, reduced, revealPlayed]);

  return (
    <div className="space-y-4" data-testid="jerarquia-ejemplo-2" aria-label="Cuatro más paréntesis tres menos dos por tres">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Chip key={`t-${i}`} color="cobalt" />
        ))}
        <OpBadge op="+" label="Suma" />
        <ParenthesisCrate active={!revealPlayed || phase === 0}>
          {Array.from({ length: 3 }, (_, i) => (
            <Chip key={`in-${i}`} color="violet" />
          ))}
          <OpBadge op="−" label="Resta" />
          {Array.from({ length: 2 }, (_, i) => (
            <Chip key={`out-${i}`} color="violet" className={cn(phase >= 1 && "opacity-30")} />
          ))}
        </ParenthesisCrate>
        <OpBadge op="×" label="Multiplicación" />
        <div className="flex flex-col gap-1">
          {Array.from({ length: 3 }, (_, i) => (
            <Chip key={`col-${i}`} color="amber" />
          ))}
        </div>
      </div>
      {!revealPlayed ? (
        <p className="text-center text-sm text-ink-muted">¿Qué se calcula antes: lo de dentro del paréntesis o la columna?</p>
      ) : null}
      {phase >= 1 ? (
        <p className="text-center text-sm font-medium text-ink">Dentro del paréntesis queda una ficha violeta.</p>
      ) : null}
      {phase >= 2 ? (
        <div className="flex justify-center gap-2 animate-in fade-in">
          <Chip color="violet" />
          <OpBadge op="×" label="Multiplicación" />
          <div className="flex flex-col gap-1">
            {Array.from({ length: 3 }, (_, i) => (
              <Chip key={`a-${i}`} color="amber" />
            ))}
          </div>
          <OpBadge op="=" label="Igual" />
          <div className="flex flex-col gap-1">
            {Array.from({ length: 3 }, (_, i) => (
              <Chip key={`p-${i}`} color="rose" />
            ))}
          </div>
        </div>
      ) : null}
      {phase >= 3 ? (
        <div className="flex flex-wrap items-center justify-center gap-2 animate-in fade-in">
          {Array.from({ length: 4 }, (_, i) => (
            <Chip key={`f-${i}`} color="cobalt" />
          ))}
          <OpBadge op="+" label="Suma" />
          {Array.from({ length: 3 }, (_, i) => (
            <Chip key={`r-${i}`} color="rose" />
          ))}
          <OpBadge op="=" label="Igual" />
          <div className="flex flex-wrap gap-1 max-w-[14rem] justify-center">
            {Array.from({ length: 7 }, (_, i) => (
              <Chip key={`tot-${i}`} color="emerald" className="!h-10 !w-10" />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function EjemploIzquierdaDerecha({
  revealPlayed,
  onReadyChange,
}: {
  revealPlayed?: boolean;
  onReadyChange?: (ready: boolean) => void;
}) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(revealPlayed ? (reduced ? 3 : 0) : 0);

  useEffect(() => {
    if (!revealPlayed) {
      setPhase(0);
      onReadyChange?.(true);
      return;
    }
    if (reduced) {
      setPhase(3);
      onReadyChange?.(true);
      return;
    }
    onReadyChange?.(false);
    setPhase(0);
    const ids = [
      window.setTimeout(() => setPhase(1), 400),
      window.setTimeout(() => setPhase(2), 1400),
      window.setTimeout(() => {
        setPhase(3);
        onReadyChange?.(true);
      }, 2300),
    ];
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, [onReadyChange, reduced, revealPlayed]);

  return (
    <div className="space-y-4" data-testid="jerarquia-ejemplo-3" aria-label="Seis dividido tres por paréntesis dos más tres">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <SharePlates total={6} plates={3} highlight={phase >= 2 ? "done" : phase >= 1 ? "share" : null} />
        <OpBadge op=":" label="División" active={!revealPlayed || phase <= 2} />
        <OpBadge op="×" label="Multiplicación" />
        <ParenthesisCrate active={phase === 0 || (!revealPlayed && phase === 0)}>
          <Chip color="cobalt" />
          <OpBadge op="+" label="Suma" />
          <Chip color="cobalt" />
          {phase >= 1 ? (
            <OpBadge op="=" label="Igual" />
          ) : null}
          {phase >= 1 ? (
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Chip key={`five-${i}`} color="violet" className="!h-10 !w-10" />
              ))}
            </div>
          ) : null}
        </ParenthesisCrate>
      </div>
      {!revealPlayed ? (
        <p className="text-center text-sm text-ink-muted">
          Tras el paréntesis, ¿repartimos las seis fichas o multiplicamos primero?
        </p>
      ) : null}
      {phase >= 2 ? (
        <p className="text-center text-sm font-medium text-ink">
          De izquierda a derecha: dos fichas por plato, luego dos filas de cinco.
        </p>
      ) : null}
      {phase >= 3 ? (
        <div className="flex flex-col items-center gap-2 animate-in fade-in">
          <DotGrid rows={2} cols={5} color="emerald" />
          <p className="text-sm font-semibold text-emerald">Diez fichas en total.</p>
        </div>
      ) : null}
    </div>
  );
}

const EXPLORE_OPS: { id: string; label: string; symbol: string }[] = [
  { id: "parentesis", label: "Calcular el paréntesis", symbol: "( )" },
  { id: "div", label: "Dividir de izquierda a derecha", symbol: "÷" },
  { id: "mul", label: "Multiplicar", symbol: "×" },
];

function ExplorarSecuencia({
  targetSequence = ["parentesis", "div", "mul"],
  tapSequence = [],
  onTapSequenceChange,
  onReadyChange,
}: {
  targetSequence?: string[];
  tapSequence?: string[];
  onTapSequenceChange?: (sequence: string[]) => void;
  onReadyChange?: (ready: boolean) => void;
}) {
  const done =
    tapSequence.length === targetSequence.length &&
    tapSequence.every((id, i) => id === targetSequence[i]);

  useEffect(() => {
    onReadyChange?.(done);
  }, [done, onReadyChange]);

  const handleTap = useCallback(
    (id: string) => {
      if (done) {
        return;
      }
      const next = [...tapSequence, id];
      if (next.length > targetSequence.length) {
        return;
      }
      const validSoFar = next.every((v, i) => v === targetSequence[i]);
      if (!validSoFar) {
        onTapSequenceChange?.([]);
        return;
      }
      onTapSequenceChange?.(next);
    },
    [done, onTapSequenceChange, tapSequence, targetSequence],
  );

  return (
    <div className="space-y-4" data-testid="jerarquia-explorar" aria-label="Ordenar operaciones">
      <SharePlates total={6} plates={3} highlight={tapSequence.includes("div") ? "done" : null} />
      <ParenthesisCrate active={!tapSequence.includes("parentesis")}>
        <Chip color="cobalt" />
        <OpBadge op="+" label="Suma" />
        <Chip color="cobalt" />
      </ParenthesisCrate>
      <p className="text-center text-sm text-ink-muted">Toca las operaciones en el orden correcto.</p>
      <div className="flex flex-wrap justify-center gap-2">
        {EXPLORE_OPS.map((op) => (
          <button
            key={op.id}
            type="button"
            className={cn(
              "min-h-11 rounded-xl border-2 px-4 py-2 text-sm font-semibold transition touch-manipulation",
              tapSequence.includes(op.id)
                ? "border-emerald bg-emerald/15 text-emerald"
                : "border-cobalt/30 bg-white text-ink hover:border-cobalt",
            )}
            onClick={() => handleTap(op.id)}
            aria-label={op.label}
          >
            {op.symbol}
          </button>
        ))}
      </div>
      {tapSequence.length > 0 ? (
        <p className="text-center text-xs text-ink-muted">
          Llevas {tapSequence.length} de {targetSequence.length} pasos.
        </p>
      ) : null}
    </div>
  );
}

export function JerarquiaOperacionesModule({
  scene,
  revealPlayed = false,
  onReadyChange,
  targetSequence,
  tapSequence,
  onTapSequenceChange,
}: JerarquiaOperacionesModuleProps) {
  let body: ReactNode = null;

  switch (scene) {
    case "escalera-reglas":
      body = <EscaleraReglas onReadyChange={onReadyChange} />;
      break;
    case "ejemplo-mul-primero":
      body = <EjemploMulPrimero revealPlayed={revealPlayed} onReadyChange={onReadyChange} />;
      break;
    case "ejemplo-parentesis":
      body = <EjemploParentesis revealPlayed={revealPlayed} onReadyChange={onReadyChange} />;
      break;
    case "ejemplo-izq-derecha":
      body = <EjemploIzquierdaDerecha revealPlayed={revealPlayed} onReadyChange={onReadyChange} />;
      break;
    case "explorar-secuencia":
      body = (
        <ExplorarSecuencia
          targetSequence={targetSequence}
          tapSequence={tapSequence}
          onTapSequenceChange={onTapSequenceChange}
          onReadyChange={onReadyChange}
        />
      );
      break;
    default:
      body = <p className="text-sm text-rose-700">Escena no configurada: {scene}</p>;
  }

  return <div className="w-full max-w-full overflow-x-hidden px-1 py-2">{body}</div>;
}
