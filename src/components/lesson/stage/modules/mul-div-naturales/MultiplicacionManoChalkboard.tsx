"use client";

import { useMemo } from "react";
import { useReducedMotion } from "@/lib/lesson/stage/use-reduced-motion";
import { cn } from "@/lib/utils";
import {
  ChalkboardCaption,
  ChalkboardFrame,
} from "@/components/lesson/stage/modules/mul-div-naturales/chalkboard-shared";
import {
  chalkboardFor,
  isVisibleAtSub,
  type ChalkboardLesson,
} from "@/components/lesson/stage/modules/mul-div-naturales/multiplicacion-mano-chalkboard-data";

const COLORS = {
  ink: "#e8edf5",
  yellow: "#fde047",
  cyan: "#67e8f9",
  pink: "#f9a8d4",
  green: "#86efac",
  ring: {
    yellow: "#fde047",
    cyan: "#22d3ee",
    pink: "#f472b6",
  },
} as const;

function quadPath([x1, y1, cx, cy, x2, y2]: [number, number, number, number, number, number]) {
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

function arrowHead([x1, y1, cx, cy, x2, y2]: [number, number, number, number, number, number]) {
  const tx = x2 - cx;
  const ty = y2 - cy;
  const len = Math.hypot(tx, ty) || 1;
  const ux = tx / len;
  const uy = ty / len;
  const px = -uy;
  const py = ux;
  const size = 10;
  const baseX = x2 - ux * size * 1.4;
  const baseY = y2 - uy * size * 1.4;
  return `${x2},${y2} ${baseX + px * size * 0.55},${baseY + py * size * 0.55} ${baseX - px * size * 0.55},${baseY - py * size * 0.55}`;
}

function DrawnArrow({
  coords,
  visible,
  reduced,
  delayMs,
}: {
  coords: [number, number, number, number, number, number];
  visible: boolean;
  reduced: boolean;
  delayMs: number;
}) {
  const d = quadPath(coords);
  const head = arrowHead(coords);
  return (
    <g
      className={cn(!visible && "opacity-0")}
      style={{
        transition: reduced ? undefined : "opacity 0.35s ease",
        transitionDelay: reduced ? undefined : `${delayMs}ms`,
      }}
      aria-hidden={!visible}
    >
      <path
        d={d}
        fill="none"
        stroke={COLORS.ink}
        strokeWidth={2}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={reduced || visible ? 0 : 1}
        style={{
          transition: reduced ? undefined : `stroke-dashoffset 0.55s ease ${delayMs}ms`,
        }}
      />
      <polygon
        points={head}
        fill={COLORS.ink}
        className={cn(reduced || visible ? "opacity-100" : "opacity-0")}
        style={{
          transition: reduced ? undefined : `opacity 0.25s ease ${delayMs + 400}ms`,
        }}
      />
    </g>
  );
}

function HandRing({
  cx,
  cy,
  color,
  visible,
  reduced,
  delayMs,
}: {
  cx: number;
  cy: number;
  color: keyof typeof COLORS.ring;
  visible: boolean;
  reduced: boolean;
  delayMs: number;
}) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={26}
      ry={30}
      fill="none"
      stroke={COLORS.ring[color]}
      strokeWidth={2.5}
      strokeLinecap="round"
      className={cn(!visible && "opacity-0")}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={reduced || visible ? 0 : 1}
      style={{
        transition: reduced ? undefined : `stroke-dashoffset 0.5s ease ${delayMs}ms, opacity 0.2s`,
        transform: "rotate(-8deg)",
        transformOrigin: `${cx}px ${cy}px`,
      }}
      aria-hidden={!visible}
    />
  );
}

export function MultiplicacionManoChalkboard({
  multiplicand,
  multiplier,
  subStep,
  lesson,
  onBoardClick,
  className,
}: {
  multiplicand: number;
  multiplier: number;
  subStep: number;
  lesson?: ChalkboardLesson | null;
  onBoardClick?: () => void;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const board = lesson ?? chalkboardFor(multiplicand, multiplier);

  const liveText = board?.liveBySub[subStep] ?? "";

  const arrowNotes = useMemo(
    () => board?.notes.filter((n) => isVisibleAtSub(subStep, n.show) && n.arrow) ?? [],
    [board, subStep],
  );

  if (!board) {
    return (
      <p className="text-sm text-rose-200">
        Pizarra no disponible para {multiplicand} × {multiplier}.
      </p>
    );
  }

  return (
    <div
      className={cn("flex w-full flex-col gap-2", className)}
      data-testid="multiplicacion-mano-chalkboard"
    >
      <ChalkboardFrame
        onBoardClick={onBoardClick}
        ariaLabel="Pizarra de multiplicación. Pulsa para avanzar."
      >
        <svg
          viewBox="0 0 800 520"
          className="h-full w-full"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
        >
          {board.lines.map((line) => {
            const visible = isVisibleAtSub(subStep, line.show);
            return (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.accent ? COLORS.green : COLORS.ink}
                strokeWidth={line.accent ? 3 : 2}
                strokeOpacity={visible ? (line.accent ? 0.9 : 0.45) : 0}
                style={{ transition: reduced ? undefined : "stroke-opacity 0.4s ease" }}
              />
            );
          })}

          {board.digits.map((digit) => {
            const visible = isVisibleAtSub(subStep, digit.show);
            const color = COLORS[digit.color ?? "ink"];
            const ringVisible = digit.ring ? isVisibleAtSub(subStep, digit.ring.show) : false;
            return (
              <g key={digit.id}>
                {digit.ring ? (
                  <HandRing
                    cx={digit.x}
                    cy={digit.y - 8}
                    color={digit.ring.color}
                    visible={ringVisible}
                    reduced={reduced}
                    delayMs={0}
                  />
                ) : null}
                <text
                  x={digit.x}
                  y={digit.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={52}
                  fontWeight={700}
                  fill={color}
                  fillOpacity={visible ? 1 : 0}
                  style={{ transition: reduced ? undefined : "fill-opacity 0.35s ease" }}
                >
                  {digit.char}
                </text>
              </g>
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

      <div className="flex justify-center gap-2" aria-hidden>
        {[1, 2, 3, 4].map((dot) => (
          <span
            key={dot}
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              dot === subStep ? "bg-cobalt" : dot < subStep ? "bg-cobalt/45" : "bg-slate-300",
            )}
          />
        ))}
      </div>

      <ChalkboardCaption text={liveText} />
    </div>
  );
}
