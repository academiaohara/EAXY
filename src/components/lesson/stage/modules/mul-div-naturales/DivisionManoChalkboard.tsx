"use client";

import { useMemo } from "react";
import {
  CHALK_ACCENT,
  CHALK_INK,
  CHALK_MUTED,
  ChalkboardCaption,
  ChalkboardFrame,
  DrawnArrow,
  isVisibleAtSub,
  SubProgressDots,
  useChalkboardMotion,
} from "@/components/lesson/stage/modules/mul-div-naturales/chalkboard-shared";
import {
  DIVISION_CYCLE,
  divisionManoLesson,
  type DivisionManoLesson,
} from "@/components/lesson/stage/modules/mul-div-naturales/division-mano-chalkboard-data";
import { cn } from "@/lib/utils";

export function DivisionManoChalkboard({
  dividend,
  divisor,
  subStep,
  subTotal = 5,
  lesson,
  onBoardClick,
  showProgress = true,
}: {
  dividend: number;
  divisor: number;
  subStep: number;
  subTotal?: number;
  lesson?: DivisionManoLesson | null;
  onBoardClick?: () => void;
  showProgress?: boolean;
}) {
  const reduced = useChalkboardMotion();
  const board = lesson ?? divisionManoLesson(dividend, divisor);
  const activeCycle = board?.cycleBySub[subStep];
  const liveText = board?.liveBySub[subStep] ?? "";

  const arrowNotes = useMemo(
    () => board?.notes.filter((n) => isVisibleAtSub(subStep, n.show) && n.arrow) ?? [],
    [board, subStep],
  );

  if (!board) {
    return (
      <p className="text-sm text-rose-200">
        Pizarra no disponible para {dividend} : {divisor}.
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2" data-testid="division-mano-chalkboard">
      <ChalkboardFrame
        testId="division-mano-chalkboard-surface"
        onBoardClick={onBoardClick}
        ariaLabel={onBoardClick ? "Pizarra de división. Pulsa para avanzar." : undefined}
      >
        <div className="absolute left-4 top-4 flex flex-col gap-2 sm:left-6 sm:top-6">
          {DIVISION_CYCLE.map((chip) => {
            const active = chip.id === activeCycle;
            return (
              <span
                key={chip.id}
                className={cn(
                  "rounded-lg border px-2 py-1 text-center text-lg font-semibold transition sm:px-3 sm:text-xl",
                  active
                    ? "border-[#6ee7b7]/70 bg-[#6ee7b7]/15 text-[#6ee7b7]"
                    : "border-[color:var(--stage-border,#334155)] bg-black/20 text-[color:var(--stage-muted,#94a3b8)]",
                )}
              >
                {chip.label}
              </span>
            );
          })}
        </div>

        <svg viewBox="0 0 800 520" className="mx-auto h-full max-w-[640px] w-full" aria-hidden preserveAspectRatio="xMidYMid meet">
          {board.lines.map((line) => {
            const visible = isVisibleAtSub(subStep, line.show);
            return (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={CHALK_INK}
                strokeWidth={2.5}
                strokeOpacity={visible ? 0.55 : 0}
                style={{ transition: reduced ? undefined : "stroke-opacity 0.35s ease" }}
              />
            );
          })}

          {board.digits.map((digit) => {
            const visible = isVisibleAtSub(subStep, digit.show);
            const isCurrent = visible && digit.show.from === subStep;
            const fill =
              isCurrent && digit.accent ? CHALK_ACCENT : visible ? CHALK_INK : CHALK_MUTED;
            return (
              <text
                key={digit.id}
                x={digit.x}
                y={digit.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={48}
                fontWeight={700}
                fill={fill}
                fillOpacity={visible ? 1 : 0}
                style={{ transition: reduced ? undefined : "fill-opacity 0.35s ease, fill 0.35s ease" }}
              >
                {digit.char}
              </text>
            );
          })}

          {arrowNotes.map((note) => (
            <DrawnArrow
              key={note.id}
              coords={note.arrow!}
              visible
              reduced={reduced}
              delayMs={300}
            />
          ))}
        </svg>
      </ChalkboardFrame>

      {showProgress ? <SubProgressDots sub={subStep} total={subTotal} /> : null}
      <ChalkboardCaption text={liveText} />
    </div>
  );
}
