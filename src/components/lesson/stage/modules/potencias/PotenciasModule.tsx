"use client";

import { Fragment } from "react";
import { DrawnArrow } from "@/components/lesson/stage/modules/mul-div-naturales/chalkboard-shared";
import {
  BASE_COLOR,
  BOARD,
  ENTER,
  EXP_COLOR,
  INK,
  MUTED,
  SceneShell,
  Tex,
  fmt,
  fmtTex,
  texPow,
  useAppeared,
  useCountUp,
  usePotenciasPhases,
} from "@/components/lesson/stage/modules/potencias/potencias-shared";
import type { PotenciasConfig } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

type SceneProps = {
  base: number;
  exponent: number;
  onReadyChange?: (ready: boolean) => void;
};

const SMOOTH = "cubic-bezier(.65,0,.35,1)";

/* ------------------------------------------------------------------ */
/* Piezas SVG                                                          */
/* ------------------------------------------------------------------ */

/** Flecha que se dibuja sola (DrawnArrow necesita `visible` falso en el primer frame). */
function AnimArrow({
  coords,
  stroke,
  delayMs,
  reduced,
}: {
  coords: [number, number, number, number, number, number];
  stroke: string;
  delayMs: number;
  reduced: boolean;
}) {
  const appeared = useAppeared();
  return <DrawnArrow coords={coords} visible={appeared} reduced={reduced} delayMs={delayMs} stroke={stroke} />;
}

/** Cota con flechas en los dos extremos y la etiqueta en el medio. */
function DimLine({
  x1,
  y1,
  x2,
  y2,
  label,
  delay = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  delay?: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const head = (x: number, y: number, sign: 1 | -1) => {
    const bx = x - sign * ux * 8;
    const by = y - sign * uy * 8;
    const px = -uy * 3.5;
    const py = ux * 3.5;
    return `${x},${y} ${bx + px},${by + py} ${bx - px},${by - py}`;
  };
  return (
    <g className={ENTER} style={{ animationDelay: `${delay}ms` }}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={MUTED} strokeWidth={1.5} />
      <polygon points={head(x2, y2, 1)} fill={MUTED} />
      <polygon points={head(x1, y1, -1)} fill={MUTED} />
      <text
        x={(x1 + x2) / 2}
        y={(y1 + y2) / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={18}
        fontWeight={700}
        style={{ fill: INK, paintOrder: "stroke", stroke: BOARD, strokeWidth: 8 }}
      >
        {label}
      </text>
    </g>
  );
}

const pts = (points: [number, number][]) => points.map((p) => p.join(",")).join(" ");

/* ------------------------------------------------------------------ */
/* Escena 1 · Base y exponente                                         */
/* ------------------------------------------------------------------ */

function BaseExponente({ base: a, exponent: n, onReadyChange }: SceneProps) {
  const { phase, reduced } = usePotenciasPhases({ stepCount: 5, onReadyChange });
  const folded = phase >= 3;
  const rowBase = 359;
  const copyX = (i: number) => 250 + i * 76;
  const lastX = copyX(n - 1);
  const eqX = lastX + 62;
  const power = a ** n;
  const copyDelay = (i: number) => 350 + i * 300;

  const captions = [
    "Una potencia se escribe con dos números, uno grande y otro pequeño arriba.",
    "El número grande es la **base**: el factor que se repite.",
    "El pequeño, arriba, es el **exponente**: cuántas veces se repite la base.",
    `Así, $${texPow(a, n)}$ significa multiplicar el $${a}$ ${n} veces.`,
    `El resultado es $${fmtTex(power)}$.`,
  ];

  return (
    <SceneShell caption={captions[phase]!} phase={phase}>
      <svg
        viewBox="0 0 800 440"
        className="min-h-0 w-full max-w-4xl flex-1"
        role="img"
        aria-label={`Potencia ${a} elevado a ${n}: base ${a}, exponente ${n}`}
      >
        <g
          style={{
            transform: folded ? `translate(${105 - 400}px, ${rowBase - 190}px) scale(0.42)` : "none",
            transformOrigin: "400px 190px",
            transition: reduced ? undefined : `transform 0.9s ${SMOOTH}`,
          }}
        >
          <text
            x={360}
            y={235}
            textAnchor="middle"
            fontSize={150}
            fontWeight={800}
            className={cn(ENTER, "font-display duration-700")}
            style={{ fill: phase >= 1 ? BASE_COLOR : INK, transition: "fill 0.5s" }}
          >
            {a}
          </text>
          <text
            x={440}
            y={150}
            textAnchor="middle"
            fontSize={90}
            fontWeight={800}
            className={cn(ENTER, "font-display duration-700")}
            style={{ fill: phase >= 2 ? EXP_COLOR : INK, transition: "fill 0.5s", animationDelay: "150ms" }}
          >
            {n}
          </text>
        </g>

        {phase >= 1 && !folded ? (
          <g className={cn(ENTER, "duration-500")}>
            <text x={185} y={318} textAnchor="middle" fontSize={26} fontWeight={800} letterSpacing={2} style={{ fill: BASE_COLOR }}>
              BASE
            </text>
            <AnimArrow coords={[228, 296, 276, 302, 324, 250]} stroke={BASE_COLOR} delayMs={150} reduced={reduced} />
          </g>
        ) : null}

        {phase >= 2 && !folded ? (
          <g className={cn(ENTER, "duration-500")}>
            <text x={618} y={104} textAnchor="middle" fontSize={26} fontWeight={800} letterSpacing={2} style={{ fill: EXP_COLOR }}>
              EXPONENTE
            </text>
            <AnimArrow coords={[540, 110, 506, 92, 482, 120]} stroke={EXP_COLOR} delayMs={150} reduced={reduced} />
          </g>
        ) : null}

        {folded ? (
          <g>
            <text x={190} y={rowBase} textAnchor="middle" fontSize={56} fontWeight={700} className={cn(ENTER, "font-display duration-500")} style={{ fill: MUTED, animationDelay: "500ms" }}>
              =
            </text>
            {Array.from({ length: n }, (_, i) => (
              <Fragment key={i}>
                <text
                  x={copyX(i)}
                  y={rowBase}
                  textAnchor="middle"
                  fontSize={64}
                  fontWeight={800}
                  className={cn(ENTER, "zoom-in-50 font-display duration-500")}
                  style={{ fill: BASE_COLOR, animationDelay: `${copyDelay(i)}ms`, transformBox: "fill-box", transformOrigin: "center" }}
                >
                  {a}
                </text>
                {i < n - 1 ? (
                  <text
                    x={copyX(i) + 38}
                    y={rowBase}
                    textAnchor="middle"
                    fontSize={56}
                    fontWeight={700}
                    className={cn(ENTER, "duration-500")}
                    style={{ fill: MUTED, animationDelay: `${copyDelay(i) + 150}ms` }}
                  >
                    ·
                  </text>
                ) : null}
              </Fragment>
            ))}
            <g className={cn(ENTER, "duration-700")} style={{ animationDelay: `${copyDelay(n)}ms` }}>
              <path
                d={`M ${copyX(0) - 24} 385 v12 H ${lastX + 24} v-12 M ${(copyX(0) + lastX) / 2} 397 v8`}
                fill="none"
                stroke={EXP_COLOR}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x={(copyX(0) + lastX) / 2} y={430} textAnchor="middle" fontSize={24} fontWeight={800} style={{ fill: EXP_COLOR }}>
                {n} veces
              </text>
            </g>
            {phase >= 4 ? (
              <g>
                <text x={eqX} y={rowBase} textAnchor="middle" fontSize={56} fontWeight={700} className={cn(ENTER, "duration-500")} style={{ fill: MUTED }}>
                  =
                </text>
                <text
                  x={eqX + 38}
                  y={rowBase}
                  fontSize={64}
                  fontWeight={800}
                  className={cn(ENTER, "zoom-in-75 font-display duration-700")}
                  style={{ fill: INK, animationDelay: "250ms", transformBox: "fill-box", transformOrigin: "left center" }}
                >
                  {fmt(power)}
                </text>
              </g>
            ) : null}
          </g>
        ) : null}
      </svg>
    </SceneShell>
  );
}

/* ------------------------------------------------------------------ */
/* Escena 2 · Cuadrado y cubo                                          */
/* ------------------------------------------------------------------ */

function Panel({
  title,
  children,
  equation,
  count,
  unit,
}: {
  title: string;
  children: React.ReactNode;
  equation: string | null;
  count: number | null;
  unit: string;
}) {
  return (
    <div className="flex min-h-0 flex-col items-center gap-2 rounded-2xl border border-[color:var(--stage-border,#334155)] bg-black/15 px-3 py-3">
      <p className="text-sm font-semibold text-[color:var(--stage-muted,#94a3b8)]">{title}</p>
      <div className="flex min-h-0 w-full flex-1 items-center justify-center">{children}</div>
      <div className="flex min-h-[4.25rem] flex-col items-center justify-start gap-1">
        {equation ? (
          <>
            <p className={cn(ENTER, "text-xl duration-500 text-[color:var(--stage-ink,#e8edf5)]")}>
              <Tex t={equation} />
            </p>
            <p className="text-sm font-semibold tabular-nums text-[color:var(--stage-muted,#94a3b8)]">
              ({count} {unit})
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}

function SquareDrawing({ n }: { n: number }) {
  const size = 240;
  const s = size / n;
  return (
    <svg viewBox="0 0 300 310" className="max-h-full w-full max-w-[18rem]" role="img" aria-label={`Cuadrado de ${n} por ${n}`}>
      {Array.from({ length: n * n }, (_, idx) => {
        const row = Math.floor(idx / n);
        const col = idx % n;
        return (
          <rect
            key={idx}
            x={30 + col * s + 1.5}
            y={44 + row * s + 1.5}
            width={s - 3}
            height={s - 3}
            rx={4}
            className={cn(ENTER, "zoom-in-50 duration-300")}
            style={{
              fill: `${EXP_COLOR}33`,
              stroke: EXP_COLOR,
              strokeWidth: 1.5,
              animationDelay: `${idx * 14}ms`,
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          />
        );
      })}
      <DimLine x1={30} y1={22} x2={30 + size} y2={22} label={String(n)} delay={650} />
      <DimLine x1={10} y1={44} x2={10} y2={44 + size} label={String(n)} delay={650} />
    </svg>
  );
}

function CubeDrawing({ n }: { n: number }) {
  const S = 168 / n;
  const U = 72 / n;
  const x0 = 40;
  const y0 = 262;
  const P = (i: number, j: number, k: number): [number, number] => [x0 + i * S + k * U, y0 - j * S - k * U];

  const faces: { key: string; points: [number, number][]; fill: string; delay: number }[] = [];
  let order = 0;
  for (let j = 0; j < n; j += 1) {
    for (let i = 0; i < n; i += 1) {
      faces.push({
        key: `f${i}-${j}`,
        points: [P(i, j, 0), P(i + 1, j, 0), P(i + 1, j + 1, 0), P(i, j + 1, 0)],
        fill: `${BASE_COLOR}33`,
        delay: order++ * 10,
      });
    }
  }
  order += 12;
  for (let k = n - 1; k >= 0; k -= 1) {
    for (let i = 0; i < n; i += 1) {
      faces.push({
        key: `t${i}-${k}`,
        points: [P(i, n, k), P(i + 1, n, k), P(i + 1, n, k + 1), P(i, n, k + 1)],
        fill: `${BASE_COLOR}55`,
        delay: order++ * 10,
      });
    }
  }
  order += 12;
  for (let k = n - 1; k >= 0; k -= 1) {
    for (let j = 0; j < n; j += 1) {
      faces.push({
        key: `r${j}-${k}`,
        points: [P(n, j, k), P(n, j + 1, k), P(n, j + 1, k + 1), P(n, j, k + 1)],
        fill: `${BASE_COLOR}1f`,
        delay: order++ * 10,
      });
    }
  }
  const total = order * 10 + 200;
  const depthStart = P(n, 0, 0);
  const depthEnd = P(n, 0, n);

  return (
    <svg viewBox="0 0 320 300" className="max-h-full w-full max-w-[20rem]" role="img" aria-label={`Cubo de ${n} por ${n} por ${n}`}>
      {faces.map((face) => (
        <polygon
          key={face.key}
          points={pts(face.points)}
          className={cn(ENTER, "duration-300")}
          style={{ fill: face.fill, stroke: BASE_COLOR, strokeWidth: 1.2, strokeLinejoin: "round", animationDelay: `${face.delay}ms` }}
        />
      ))}
      <DimLine x1={x0} y1={y0 + 20} x2={x0 + 168} y2={y0 + 20} label={String(n)} delay={total} />
      <DimLine x1={x0 - 18} y1={y0} x2={x0 - 18} y2={y0 - 168} label={String(n)} delay={total} />
      <DimLine x1={depthStart[0] + 12} y1={depthStart[1] + 14} x2={depthEnd[0] + 12} y2={depthEnd[1] + 14} label={String(n)} delay={total} />
    </svg>
  );
}

function CuadradoCubo({ base: a, onReadyChange }: SceneProps) {
  const { phase } = usePotenciasPhases({ stepCount: 4, onReadyChange, intervalMs: 3200 });
  const squareCount = useCountUp(a ** 2, phase >= 1);
  const cubeCount = useCountUp(a ** 3, phase >= 3, 1400);

  const captions = [
    `Elevar al **cuadrado** es construir un cuadrado: $${a}$ filas de $${a}$.`,
    `El cuadrado cuenta cuadraditos: es el **área**.`,
    `Con exponente $3$ levantamos el cuadrado en altura y sale un **cubo**.`,
    `$${a}$ capas de $${a ** 2}$ cubitos: el **volumen** del cubo.`,
  ];

  return (
    <SceneShell caption={captions[phase]!} phase={phase}>
      <div className="grid h-full min-h-0 w-full max-w-5xl grid-cols-2 gap-5">
        <Panel
          title="El cuadrado: exponente 2"
          equation={phase >= 1 ? `${texPow(a, 2)} = ${a} \\cdot ${a} = ${a ** 2}` : null}
          count={squareCount}
          unit="cuadraditos"
        >
          <SquareDrawing n={a} />
        </Panel>
        <Panel
          title="El cubo: exponente 3"
          equation={phase >= 3 ? `${texPow(a, 3)} = ${a} \\cdot ${a} \\cdot ${a} = ${a ** 3}` : null}
          count={cubeCount}
          unit="cubitos"
        >
          {phase >= 2 ? <CubeDrawing n={a} /> : <div className="h-40" aria-hidden />}
        </Panel>
      </div>
    </SceneShell>
  );
}

/* ------------------------------------------------------------------ */
/* Escena 3 · Calcular paso a paso                                     */
/* ------------------------------------------------------------------ */

function CalcularPotencia({ base: a, exponent: n, onReadyChange }: SceneProps) {
  const { phase } = usePotenciasPhases({ stepCount: n, onReadyChange, intervalMs: 2300 });
  const last = n - 1;

  const rows = Array.from({ length: n }, (_, k) =>
    k === 0 ? Array.from({ length: n }, () => a) : [a ** (k + 1), ...Array.from({ length: n - k - 1 }, () => a)],
  );

  const caption =
    phase === 0
      ? `Escribimos la potencia como producto: el $${a}$ repetido $${n}$ veces.`
      : phase < last
        ? "Multiplicamos los dos primeros factores y seguimos con el resto."
        : "Salvo casos sencillos, las potencias dan números grandes: por eso solemos usar calculadora.";

  return (
    <SceneShell caption={caption} phase={phase}>
      <div className="flex w-full max-w-4xl flex-col items-center gap-3" aria-label={`Calcular ${a} elevado a ${n} paso a paso`}>
        <p className="text-base font-semibold text-[color:var(--stage-muted,#94a3b8)]">
          Ejemplo: <Tex t={texPow(a, n)} />
        </p>
        {rows.map((tokens, k) =>
          k > phase ? null : (
            <div
              key={k}
              className={cn(ENTER, "slide-in-from-top-2 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-6 duration-500", k < phase && "opacity-70")}
            >
              <span />
              <div className={cn("flex items-center gap-2 font-mono font-bold", k === last ? "text-5xl" : "text-3xl")}>
                {tokens.map((value, i) => {
                  const merging = phase > k && i < 2;
                  const fresh = k > 0 && i === 0 && phase === k;
                  return (
                    <Fragment key={i}>
                      {i > 0 ? <span className="text-[color:var(--stage-muted,#94a3b8)]">·</span> : null}
                      <span
                        className={cn(
                          "rounded-lg px-2 py-0.5 transition-colors duration-500",
                          merging && "bg-[#ffd866]/25 text-[#ffd866]",
                          fresh && "bg-[#5eead4]/20 text-[#5eead4]",
                          !merging && !fresh && "text-[color:var(--stage-ink,#e8edf5)]",
                        )}
                      >
                        {fmt(value)}
                      </span>
                    </Fragment>
                  );
                })}
              </div>
              <p className={cn(ENTER, "text-left text-base duration-500 text-[color:var(--stage-muted,#94a3b8)]")} style={{ animationDelay: "350ms" }}>
                {k > 0 ? <Tex t={`${fmtTex(a ** k)} \\cdot ${a} = ${fmtTex(a ** (k + 1))}`} /> : null}
              </p>
            </div>
          ),
        )}
      </div>
    </SceneShell>
  );
}

/* ------------------------------------------------------------------ */
/* Escena 4 · En la calculadora                                        */
/* ------------------------------------------------------------------ */

const KEYPAD = [
  ["7", "8", "9", "DEL"],
  ["4", "5", "6", "xy"],
  ["1", "2", "3", "×"],
  ["0", ".", "Ans", "="],
] as const;

function KeyLabel({ id }: { id: string }) {
  return id === "xy" ? (
    <span aria-label="tecla de potencia">
      x<sup className="text-[0.6em]">y</sup>
    </span>
  ) : (
    <>{id}</>
  );
}

function Calculadora({ base: a, exponent: n, onReadyChange }: SceneProps) {
  const { phase } = usePotenciasPhases({ stepCount: 5, onReadyChange, intervalMs: 1900 });
  const result = a ** n;
  const sequence = [String(a), "xy", String(n), "="];
  const pressed = phase >= 1 ? sequence[phase - 1] : null;
  const typed = phase === 0 ? "" : phase === 1 ? `${a}` : phase === 2 ? `${a}^` : `${a}^${n}`;

  const captions = [
    "En la calculadora científica hay una tecla especial para las potencias.",
    "Primero, la base.",
    "Después, la tecla de potencia.",
    "Ahora, el exponente.",
    `Y con «=» aparece el resultado: ${fmt(result)}.`,
  ];

  return (
    <SceneShell caption={captions[phase]!} phase={phase}>
      <div className="grid w-full max-w-4xl grid-cols-1 items-center gap-8 sm:grid-cols-[auto_1fr]" aria-label="Calcular una potencia con la calculadora">
        <div className="mx-auto w-64 rounded-3xl border-2 border-[color:var(--stage-border,#334155)] bg-slate-900/60 p-4 shadow-xl" aria-hidden>
          <div className="mb-4 flex h-20 flex-col justify-between rounded-lg bg-[#cfd8c4] px-3 py-2 font-mono text-slate-900">
            <span className="min-h-[1.25rem] text-right text-sm">{typed}</span>
            <span className="min-h-[2rem] text-right text-2xl font-bold">{phase >= 4 ? result : ""}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {KEYPAD.flat().map((id) => {
              const isPressed = id === pressed;
              return (
                <div
                  key={isPressed ? `${id}-${phase}` : id}
                  className={cn(
                    "flex h-10 items-center justify-center rounded-lg border text-sm font-bold transition-colors duration-300",
                    isPressed
                      ? "animate-in zoom-in-90 border-[#ffd866] bg-[#ffd866] text-slate-900 shadow-[0_0_18px_#ffd86688]"
                      : "border-[color:var(--stage-border,#334155)] bg-black/30 text-[color:var(--stage-muted,#94a3b8)]",
                  )}
                >
                  <KeyLabel id={id} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-3 text-3xl text-[color:var(--stage-ink,#e8edf5)]">
            <Tex t={texPow(a, n)} />
            <span className="text-[color:var(--stage-muted,#94a3b8)]">→</span>
            {sequence.map((id, i) => (
              <Fragment key={i}>
                <span
                  className={cn(
                    "flex h-12 min-w-12 items-center justify-center rounded-xl border-2 px-3 font-mono text-xl font-bold transition-all duration-300",
                    phase > i + 1 && "border-[#ffd866]/60 text-[#ffd866]",
                    phase === i + 1 && "scale-110 border-[#ffd866] bg-[#ffd866]/20 text-[#ffd866]",
                    phase < i + 1 && "border-[color:var(--stage-border,#334155)] text-[color:var(--stage-muted,#94a3b8)]",
                  )}
                >
                  <KeyLabel id={id} />
                </span>
              </Fragment>
            ))}
            {phase >= 4 ? (
              <>
                <span className="text-[color:var(--stage-muted,#94a3b8)]">→</span>
                <span className={cn(ENTER, "zoom-in-75 rounded-xl border-2 border-[#5eead4] bg-[#5eead4]/15 px-4 py-2 font-mono text-2xl font-bold text-[#5eead4] duration-500")}>
                  {result}
                </span>
              </>
            ) : null}
          </div>
          {phase >= 4 ? (
            <p className={cn(ENTER, "text-center text-base duration-700 text-[color:var(--stage-muted,#94a3b8)]")} style={{ animationDelay: "400ms" }}>
              El mismo resultado que multiplicar {n} veces el {a}:{" "}
              <Tex t={`${Array.from({ length: n }, () => a).join(" \\cdot ")} = ${fmtTex(result)}`} />
            </p>
          ) : null}
        </div>
      </div>
    </SceneShell>
  );
}

/* ------------------------------------------------------------------ */

export type PotenciasModuleProps = PotenciasConfig & {
  stepId: string;
  onReadyChange?: (ready: boolean) => void;
};

export function PotenciasModule({ scene, base = 6, exponent = 4, onReadyChange }: PotenciasModuleProps) {
  const props: SceneProps = { base, exponent, onReadyChange };
  return (
    <div data-testid={`potencias-${scene}`} className="flex h-full min-h-0 w-full max-w-full flex-1 flex-col">
      {scene === "base-exponente" ? <BaseExponente {...props} /> : null}
      {scene === "cuadrado-cubo" ? <CuadradoCubo {...props} /> : null}
      {scene === "calcular-potencia" ? <CalcularPotencia {...props} /> : null}
      {scene === "calculadora" ? <Calculadora {...props} /> : null}
    </div>
  );
}
