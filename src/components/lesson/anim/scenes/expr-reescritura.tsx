import type { ExprStep } from "@/lib/lesson/types";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { cn } from "@/lib/utils";

function inRange(i: number, range?: [number, number]): boolean {
  return Boolean(range) && i >= range![0] && i <= range![1];
}

function ExprLine({ step, dim }: { step: ExprStep; dim: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline gap-x-2.5 text-[2rem] font-semibold tabular-nums leading-tight transition-opacity duration-500 motion-reduce:transition-none",
        dim ? "opacity-40" : "opacity-100",
      )}
    >
      {step.tokens.map((token, i) => {
        const active = !dim && inRange(i, step.active);
        const fresh = !dim && inRange(i, step.fresh);
        return (
          <span
            key={i}
            className={cn(
              "rounded-md px-1 transition-colors duration-500 motion-reduce:transition-none",
              active && "bg-[#ffd866]/25 text-[#ffd866] ring-2 ring-[#ffd866]/60",
              fresh && "bg-[#83c167]/25 text-[#83c167] ring-2 ring-[#83c167]/60",
            )}
          >
            {token}
          </span>
        );
      })}
    </div>
  );
}

function Derivation({ steps, beat, title }: { steps: ExprStep[]; beat: number; title?: string }) {
  const last = Math.min(beat, steps.length - 1);
  return (
    <div className="flex min-w-0 flex-col gap-1">
      {title ? <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#58c4dd]">{title}</p> : null}
      {steps.map((step, i) => {
        if (i > last) {
          return <div key={i} className="h-[3.4rem]" aria-hidden />;
        }
        const isCurrent = i === last;
        return (
          <div key={i} className="min-h-[3.4rem]">
            <ExprLine step={step} dim={!isCurrent} />
            {i < steps.length - 1 && i <= last && step.note ? (
              <p
                className={cn(
                  "mt-0.5 text-sm text-[#b8c2d0] transition-opacity duration-500",
                  isCurrent ? "opacity-100" : "opacity-0",
                )}
              >
                ↓ {step.note}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/** Reescritura paso a paso de una expresión: se marca lo que se calcula y cómo queda. */
export function buildExprReescritura(params: {
  expr?: ExprStep[];
  expr2?: ExprStep[];
  titles?: string[];
}): AnimBuild {
  const left = params.expr ?? [];
  const right = params.expr2;
  const total = Math.max(left.length, right?.length ?? 0, 1);
  const captions = Array.from({ length: total }, (_, i) => {
    const a = left[Math.min(i, left.length - 1)]?.note;
    const b = right ? right[Math.min(i, right.length - 1)]?.note : undefined;
    if (a && b && right) {
      return `**${params.titles?.[0] ?? "Izquierda"}:** ${a} **${params.titles?.[1] ?? "Derecha"}:** ${b}`;
    }
    return a ?? b ?? "Resultado final.";
  });

  return {
    label: "Reescritura paso a paso de una expresión con operaciones combinadas",
    captions,
    beatMs: 3200,
    render: (beat) => (
      <div
        className={cn("grid gap-8 px-8 py-6", right ? "grid-cols-2" : "grid-cols-1")}
        style={{ minHeight: 300 }}
      >
        <Derivation steps={left} beat={beat} title={params.titles?.[0]} />
        {right ? <Derivation steps={right} beat={beat} title={params.titles?.[1]} /> : null}
      </div>
    ),
  };
}
