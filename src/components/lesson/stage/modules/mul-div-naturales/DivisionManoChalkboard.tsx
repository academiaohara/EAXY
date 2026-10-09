"use client";

import { useMemo } from "react";
import {
  CHALK_ACCENT,
  CHALK_INK,
  CHALK_MUTED,
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

  const notes = useMemo(
    () => board?.notes.filter((n) => isVisibleAtSub(subStep, n.show)) ?? [],
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
    <div className="mx-auto w-full max-w-4xl" data-testid="division-mano-chalkboard">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl border border-[color:var(--stage-border,#334155)] bg-[#1a2332] font-[family-name:var(--font-caveat),cursive]",
          onBoardClick && "cursor-pointer",
        )}
        style={{ aspectRatio: "800 / 520" }}
        role={onBoardClick ? "button" : undefined}
        tabIndex={onBoardClick ? 0 : undefined}
        onClick={onBoardClick}
        onKeyDown={(event) => {
          if (!onBoardClick) {
            return;
          }
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onBoardClick();
          }
        }}
        aria-label={onBoardClick ? "Pizarra de división. Pulsa para avanzar." : undefined}
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

        <svg viewBox="0 0 800 520" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid meet">
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

          {notes.map((note) => {
            const visible = isVisibleAtSub(subStep, note.show);
            return (
              <g key={note.id}>
                {note.arrow ? (
                  <DrawnArrow coords={note.arrow} visible={visible} reduced={reduced} delayMs={300} />
                ) : null}
                <text
                  x={note.x}
                  y={note.y}
                  fontSize={30}
                  fontWeight={600}
                  fill={CHALK_INK}
                  fillOpacity={visible ? 0.95 : 0}
                  style={{
                    transition: reduced ? undefined : "fill-opacity 0.4s ease 500ms",
                  }}
                >
                  {note.text}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {showProgress ? <SubProgressDots sub={subStep} total={subTotal} /> : null}

      <p className="sr-only" aria-live="polite">
        {board.liveBySub[subStep] ?? ""}
      </p>
    </div>
  );
}
