import type { ExprStep } from "@/lib/lesson/types";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { cn } from "@/lib/utils";

type Group = { from: number; to: number; kind: "active" | "fresh" | "plain" };

/** Parte la expresión en tramos: la zona activa/nueva es UN solo bloque, no un recuadro por símbolo. */
function groupTokens(step: ExprStep, dim: boolean): Group[] {
  const marks: Group[] = [];
  if (!dim && step.active) {
    marks.push({ from: step.active[0], to: step.active[1], kind: "active" });
  }
  const overlapsActive =
    step.active && step.fresh && step.fresh[0] >= step.active[0] && step.fresh[1] <= step.active[1];
  if (!dim && step.fresh && !overlapsActive) {
    marks.push({ from: step.fresh[0], to: step.fresh[1], kind: "fresh" });
  }
  marks.sort((x, y) => x.from - y.from);
  const groups: Group[] = [];
  let i = 0;
  while (i < step.tokens.length) {
    const mark = marks.find((m) => m.from === i);
    if (mark) {
      groups.push(mark);
      i = mark.to + 1;
    } else {
      groups.push({ from: i, to: i, kind: "plain" });
      i += 1;
    }
  }
  return groups;
}

function ExprLine({ step, dim, compact }: { step: ExprStep; dim: boolean; compact: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline font-semibold tabular-nums leading-tight transition-opacity duration-500 motion-reduce:transition-none",
        compact ? "gap-x-1.5 text-[1.55rem]" : "gap-x-2.5 text-[2rem]",
        dim ? "opacity-40" : "opacity-100",
      )}
    >
      {groupTokens(step, dim).map((group) => (
        <span
          key={group.from}
          className={cn(
            "inline-flex items-baseline rounded-lg px-2 transition-colors duration-500 motion-reduce:transition-none",
            compact ? "gap-x-1.5" : "gap-x-2.5",
            group.kind === "active" && "bg-[#ffd866]/25 text-[#ffd866] ring-2 ring-[#ffd866]/60",
            group.kind === "fresh" && "bg-[#83c167]/25 text-[#83c167] ring-2 ring-[#83c167]/60",
            group.kind === "plain" && "px-1",
          )}
          data-group={group.kind}
        >
          {step.tokens.slice(group.from, group.to + 1).map((token, k) => {
            // Resultado recién calculado dentro de la parte activa: solo cambia el color del texto.
            const fresh =
              group.kind === "active" &&
              !dim &&
              step.fresh !== undefined &&
              group.from + k >= step.fresh[0] &&
              group.from + k <= step.fresh[1];
            return (
              <span key={k} className={fresh ? "text-[#83c167]" : undefined}>
                {token}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}

function Derivation({ steps, beat, title, compact }: { steps: ExprStep[]; beat: number; title?: string; compact: boolean }) {
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
            <ExprLine step={step} dim={!isCurrent} compact={compact} />
            {i < steps.length - 1 && i <= last && step.note ? (
              <p
                className={cn(
                  "mt-0.5 text-sm text-[#b8c2d0] transition-opacity duration-500",
                  isCurrent ? "opacity-100" : "opacity-0",
                )}
              >
                ↓ <MathRenderer text={step.note} />
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
  // En dos columnas, las expresiones largas se reducen para no partirse en varias líneas.
  const longest = Math.max(0, ...[...left, ...(right ?? [])].map((step) => step.tokens.join(" ").length));
  const compact = Boolean(right) && longest > 14;
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
        className={cn("grid px-8 py-6", right ? "grid-cols-2" : "grid-cols-1", compact ? "gap-6" : "gap-8")}
        style={{ minHeight: 300 }}
      >
        <Derivation steps={left} beat={beat} title={params.titles?.[0]} compact={compact} />
        {right ? <Derivation steps={right} beat={beat} title={params.titles?.[1]} compact={compact} /> : null}
      </div>
    ),
  };
}
