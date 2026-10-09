"use client";

import { useCallback, useMemo, useState } from "react";
import { DivisionManoChalkboard } from "@/components/lesson/stage/modules/mul-div-naturales/DivisionManoChalkboard";
import {
  DIVISION_CYCLE,
  type CyclePhase,
} from "@/components/lesson/stage/modules/mul-div-naturales/division-mano-chalkboard-data";
import { cn } from "@/lib/utils";

type PracticePhase = 0 | 1 | 2;

const PHASE_CYCLE: CyclePhase[] = ["cuantas", "multiplica", "resta"];

type Choice = { id: string; label: string };

const PHASES: { question: string; choices: Choice[]; correctId: string; feedback?: string }[] = [
  {
    question: "¿Cuántas veces cabe $6$ en $32$?",
    choices: [
      { id: "4", label: "$4$" },
      { id: "5", label: "$5$" },
      { id: "6", label: "$6$" },
    ],
    correctId: "5",
    feedback: "Piensa: $5 \\cdot 6 = 30$ y $6 \\cdot 6 = 36$, demasiado.",
  },
  {
    question: "¿Cuánto es $5 \\cdot 6$?",
    choices: [
      { id: "28", label: "$28$" },
      { id: "30", label: "$30$" },
      { id: "32", label: "$32$" },
    ],
    correctId: "30",
  },
  {
    question: "¿Cuánto es $32 - 30$?",
    choices: [
      { id: "0", label: "$0$" },
      { id: "2", label: "$2$" },
      { id: "3", label: "$3$" },
    ],
    correctId: "2",
  },
];

export function DivisionManoPractice({
  onReadyChange,
}: {
  onReadyChange?: (ready: boolean) => void;
}) {
  const [phase, setPhase] = useState<PracticePhase>(0);
  const [choiceId, setChoiceId] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const current = PHASES[phase]!;
  const activeCycle = PHASE_CYCLE[phase];

  const boardSub = phase === 0 ? 5 : phase === 1 ? 5 : 5;

  const handleCheck = useCallback(() => {
    if (checked || !choiceId) {
      return;
    }
    const correct = choiceId === current.correctId;
    setIsCorrect(correct);
    setChecked(true);
    if (correct && phase === 2) {
      onReadyChange?.(true);
    }
  }, [checked, choiceId, current.correctId, onReadyChange, phase]);

  const handleNextPhase = useCallback(() => {
    if (!checked || !isCorrect) {
      return;
    }
    if (phase < 2) {
      setPhase((p) => (p + 1) as PracticePhase);
      setChoiceId("");
      setChecked(false);
      setIsCorrect(false);
      onReadyChange?.(false);
    }
  }, [checked, isCorrect, onReadyChange, phase]);

  const cycleChips = useMemo(
    () =>
      DIVISION_CYCLE.map((chip) => (
        <span
          key={chip.id}
          className={cn(
            "rounded-lg border px-2 py-1 text-center text-lg font-semibold sm:px-3 sm:text-xl",
            chip.id === activeCycle
              ? "border-[#6ee7b7]/70 bg-[#6ee7b7]/15 text-[#6ee7b7]"
              : "border-[color:var(--stage-border,#334155)] bg-black/20 text-[color:var(--stage-muted,#94a3b8)]",
          )}
        >
          {chip.label}
        </span>
      )),
    [activeCycle],
  );

  return (
    <div className="space-y-4" data-testid="division-mano-practice" aria-label="Práctica de división a mano">
      <DivisionManoChalkboard dividend={156} divisor={6} subStep={boardSub} showProgress={false} />

      <div className="flex flex-wrap justify-center gap-2">{cycleChips}</div>

      <p className="text-center text-base font-semibold text-ink">{current.question}</p>

      <div className="mx-auto grid max-w-md grid-cols-3 gap-3">
        {current.choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            disabled={checked}
            onClick={() => setChoiceId(choice.id)}
            className={cn(
              "min-h-[3.5rem] rounded-xl border-2 bg-white text-lg font-bold transition",
              choiceId === choice.id ? "border-cobalt bg-cobalt-tint" : "border-slate-200",
              checked && choiceId !== choice.id && "opacity-50",
            )}
          >
            {choice.label}
          </button>
        ))}
      </div>

      {checked && !isCorrect && current.feedback ? (
        <p className="text-center text-sm text-amber-800">{current.feedback}</p>
      ) : null}

      <div className="flex justify-center gap-3">
        {!checked ? (
          <button
            type="button"
            className="rounded-full bg-cobalt px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
            disabled={!choiceId}
            onClick={handleCheck}
            data-testid="division-practice-check"
          >
            Comprobar
          </button>
        ) : isCorrect && phase < 2 ? (
          <button
            type="button"
            className="rounded-full bg-cobalt px-6 py-2.5 text-sm font-semibold text-white"
            onClick={handleNextPhase}
            data-testid="division-practice-next"
          >
            Siguiente
          </button>
        ) : null}
      </div>
    </div>
  );
}
