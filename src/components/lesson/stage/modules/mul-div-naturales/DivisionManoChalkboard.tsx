"use client";

import { useMemo } from "react";
import {
  CHALK_INK,
  CHALK_MUTED,
  CHALKBOARD_VIEWBOX,
  ChalkboardCaption,
  ChalkboardFrame,
  SubProgressDots,
  useChalkboardMotion,
} from "@/components/lesson/stage/modules/mul-div-naturales/chalkboard-shared";
import {
  buildDivisionBoard,
  DIVISION_CYCLE,
  isVisible,
  type BoardItem,
  type DivisionBoard,
} from "@/components/lesson/stage/modules/mul-div-naturales/division-board";
import { cn } from "@/lib/utils";

const CHALK_AMBER = "#fbbf24";
const CHALK_NEW = "#6ee7b7";

function useGridTransform(board: DivisionBoard) {
  return useMemo(() => {
    const { minX, maxX, minY, maxY } = board.bounds;
    const gridW = maxX - minX;
    const gridH = maxY - minY;
    const padX = 48;
    const padY = 32;
    const cell = Math.min(
      (CHALKBOARD_VIEWBOX.w - padX * 2) / Math.max(gridW, 1),
      (CHALKBOARD_VIEWBOX.h - padY * 2) / Math.max(gridH, 1),
    );
    const offsetX = (CHALKBOARD_VIEWBOX.w - gridW * cell) / 2 - minX * cell;
    const offsetY = (CHALKBOARD_VIEWBOX.h - gridH * cell) / 2 - minY * cell;

    const gx = (col: number) => col * cell + offsetX;
    const gy = (row: number) => row * cell + offsetY;

    return { cell, gx, gy };
  }, [board.bounds]);
}

export function DivisionManoChalkboard({
  dividend,
  divisor,
  step,
  board: boardProp,
  onBoardClick,
  showProgress = true,
  showPhaseChips = true,
  showCaption = true,
  className,
}: {
  dividend: number;
  divisor: number;
  /** Paso actual (0-based), alineado con `board.steps`. */
  step: number;
  board?: DivisionBoard | null;
  onBoardClick?: () => void;
  showProgress?: boolean;
  showPhaseChips?: boolean;
  showCaption?: boolean;
  className?: string;
}) {
  const reduced = useChalkboardMotion();
  const board = boardProp ?? buildDivisionBoard(dividend, divisor);
  const { gx, gy, cell } = useGridTransform(board ?? { items: [], steps: [], bounds: { minX: 0, maxX: 1, minY: 0, maxY: 1 } });

  const activeStep = board?.steps[step];
  const activeCycle = activeStep?.phase ?? null;
  const focusSet = useMemo(() => new Set(activeStep?.focus ?? []), [activeStep?.focus]);
  const liveText = activeStep?.caption ?? "";

  const isNewThisStep = (item: BoardItem) => item.from === step;

  if (!board) {
    return (
      <p className="text-sm text-rose-200">
        Pizarra no disponible para {dividend} : {divisor}.
      </p>
    );
  }

  const fontSize = Math.min(56, Math.max(36, cell * 0.72));

  return (
    <div className={cn("flex w-full flex-col gap-2", className)} data-testid="division-mano-chalkboard">
      <ChalkboardFrame
        testId="division-mano-chalkboard-surface"
        onBoardClick={onBoardClick}
        ariaLabel={onBoardClick ? "Pizarra de división. Pulsa para avanzar." : undefined}
      >
        {showPhaseChips ? (
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
        ) : null}

        <svg
          viewBox={`0 0 ${CHALKBOARD_VIEWBOX.w} ${CHALKBOARD_VIEWBOX.h}`}
          className="mx-auto h-full max-w-[640px] w-full"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
        >
          {board.items.map((item) => {
            if (item.kind === "line") {
              const visible = isVisible(item, step);
              return (
                <line
                  key={item.id}
                  x1={gx(item.x1)}
                  y1={gy(item.y1)}
                  x2={gx(item.x2)}
                  y2={gy(item.y2)}
                  stroke={CHALK_INK}
                  strokeWidth={2.5}
                  strokeOpacity={visible ? 0.55 : 0}
                  style={{ transition: reduced ? undefined : "stroke-opacity 0.35s ease" }}
                />
              );
            }

            const visible = isVisible(item, step);
            const focused = visible && focusSet.has(item.id);
            const isNew = visible && isNewThisStep(item);
            const fill = isNew ? CHALK_NEW : focused ? CHALK_AMBER : visible ? CHALK_INK : CHALK_MUTED;

            return (
              <text
                key={item.id}
                x={gx(item.col)}
                y={gy(item.row)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={fontSize}
                fontWeight={700}
                fill={fill}
                fillOpacity={visible ? 1 : 0}
                style={{ transition: reduced ? undefined : "fill-opacity 0.35s ease, fill 0.35s ease" }}
              >
                {item.char}
              </text>
            );
          })}
        </svg>
      </ChalkboardFrame>

      {showProgress ? <SubProgressDots sub={step + 1} total={board.steps.length} /> : null}
      {showCaption ? <ChalkboardCaption text={liveText} /> : null}
    </div>
  );
}
