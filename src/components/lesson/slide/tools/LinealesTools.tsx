"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { fracTex } from "@/components/lesson/anim/eq";
import { PIECEWISE, evalPiecewise, jumps, lineTex, pointSlopeTex, pointSlopeToSlopeIntercept, slope } from "@/components/lesson/anim/lin";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const f = (x: number) => String(x).replace("-", "−");
const W = 320;
const H = 320;
const R = 8;
const px = (x: number) => 10 + ((x + R) / (2 * R)) * (W - 20);
const py = (y: number) => H - 10 - ((y + R) / (2 * R)) * (H - 20);

function Plane({ children, testId }: { children: React.ReactNode; testId: string }) {
  const ticks = Array.from({ length: 2 * R + 1 }, (_, i) => i - R);
  return (
    <Svg w={W} h={H} testId={testId}>
      <defs>
        <clipPath id={`${testId}-clip`}>
          <rect x={10} y={10} width={W - 20} height={H - 20} />
        </clipPath>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={10} x2={px(t)} y2={H - 10} stroke={MANIM.grid} strokeWidth={t === 0 ? 2.5 : 0.8} opacity={t === 0 ? 1 : 0.5} />
          <line x1={10} y1={py(t)} x2={W - 10} y2={py(t)} stroke={MANIM.grid} strokeWidth={t === 0 ? 2.5 : 0.8} opacity={t === 0 ? 1 : 0.5} />
        </g>
      ))}
      <g clipPath={`url(#${testId}-clip)`}>{children}</g>
    </Svg>
  );
}

/* ───────────── y = mx + n ───────────── */

export function RectaMnExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { m2: int(ini[0], 4, -12, 12), n: int(ini[1], 1, -6, 6) };
  const [v, setV] = useState(init);
  const m = v.m2 / 2;
  const tipo = v.m2 === 0 ? "Función constante: pendiente 0, recta horizontal" : v.n === 0 ? "Proporcionalidad: pasa por el origen" : "Función lineal afín: corta al eje Y en (0, n)";
  const tail = (m < 0 ? "baja" : "sube");

  return (
    <Frame
      hint={block.hint ?? "Cambia la pendiente m y la ordenada en el origen n: m inclina la recta, n la sube o la baja."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Pendiente m" value={m} min={-6} max={6} step={0.5} color={MANIM.blue} onChange={(x) => setV((p) => ({ ...p, m2: Math.round(x * 2) }))} format={(x) => fmtEs(x, 1).replace("-", "−")} />
          <Slider label="Ordenada en el origen n" value={v.n} min={-6} max={6} color={MANIM.orange} onChange={(n) => setV((p) => ({ ...p, n }))} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$y = ${m === 0 ? "" : `${fmtEs(m, 1).replace(",", "{,}")}x`}${m === 0 ? v.n : v.n === 0 ? "" : v.n > 0 ? `+${v.n}` : v.n}$`} className="text-2xl" />
        <p className="text-lg font-semibold" style={{ color: MANIM.green }} data-testid="tool-rm-tipo">{tipo}</p>
        <p className="text-base" data-testid="tool-rm-ritmo">
          {m === 0 ? "Si x avanza 1, y no cambia" : `Si x avanza 1, y ${tail} ${fmtEs(Math.abs(m), 1)}`}
        </p>
      </div>
      <Plane testId="tool-rm">
        <line x1={px(-R)} y1={py(m * -R + v.n)} x2={px(R)} y2={py(m * R + v.n)} stroke={MANIM.blue} strokeWidth={3.5} strokeLinecap="round" />
        <circle cx={px(0)} cy={py(v.n)} r={7} fill={MANIM.orange} />
        <line x1={px(1)} y1={py(v.n)} x2={px(2)} y2={py(v.n)} stroke={MANIM.green} strokeWidth={3} />
        <line x1={px(2)} y1={py(v.n)} x2={px(2)} y2={py(v.n + m)} stroke={MANIM.yellow} strokeWidth={3} />
      </Plane>
    </Frame>
  );
}

/* ───────────── Pendiente por dos puntos, recta punto-pendiente ───────────── */

export function PendientePuntosExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { x1: int(ini[0], -2, -7, 7), y1: int(ini[1], 1, -7, 7), x2: int(ini[2], 4, -7, 7), y2: int(ini[3], 5, -7, 7) };
  const [v, setV] = useState(init);
  const p = [v.x1, v.y1] as const;
  const q = [v.x2, v.y2] as const;
  const m = slope(p, q);
  const eq = m ? pointSlopeToSlopeIntercept(p, m) : null;
  const set = (k: keyof typeof init) => (n: number) => setV((s) => ({ ...s, [k]: n }));

  return (
    <Frame
      hint={block.hint ?? "Mueve los dos puntos: la pendiente es (y₂ − y₁) / (x₂ − x₁). Prueba a ponerlos en la misma vertical."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="x₁" value={v.x1} min={-7} max={7} color={MANIM.blue} onChange={set("x1")} format={f} />
          <Slider label="y₁" value={v.y1} min={-7} max={7} color={MANIM.blue} onChange={set("y1")} format={f} />
          <Slider label="x₂" value={v.x2} min={-7} max={7} color={MANIM.orange} onChange={set("x2")} format={f} />
          <Slider label="y₂" value={v.y2} min={-7} max={7} color={MANIM.orange} onChange={set("y2")} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$m = \\dfrac{${v.y2} - ${v.y1 < 0 ? `(${v.y1})` : v.y1}}{${v.x2} - ${v.x1 < 0 ? `(${v.x1})` : v.x1}} = \\dfrac{${v.y2 - v.y1}}{${v.x2 - v.x1}}$`} className="text-xl" />
        <p className="text-lg font-semibold" style={{ color: m ? MANIM.green : MANIM.red }} data-testid="tool-pend-valor">
          {m ? `Pendiente ${m.d === 1 ? m.n : `${m.n}/${m.d}`}`.replace("-", "−") : "Recta vertical: no tiene pendiente"}
        </p>
        {m && eq ? (
          <div data-testid="tool-pend-ecuacion">
            <div><MathRenderer text={`$${pointSlopeTex(p, m)}$`} className="text-base" /></div>
            <div><MathRenderer text={`$${lineTex(eq.m, eq.n)}$`} className="text-base" /></div>
          </div>
        ) : (
          <MathRenderer text={`$x = ${v.x1}$`} className="text-base" />
        )}
        {m ? <span className="sr-only">{fracTex(m)}</span> : null}
      </div>
      <Plane testId="tool-pend">
        {m ? (
          <line x1={px(-R)} y1={py(v.y1 + (m.n / m.d) * (-R - v.x1))} x2={px(R)} y2={py(v.y1 + (m.n / m.d) * (R - v.x1))} stroke={MANIM.blue} strokeWidth={3} />
        ) : (
          <line x1={px(v.x1)} y1={10} x2={px(v.x1)} y2={H - 10} stroke={MANIM.red} strokeWidth={3} />
        )}
        <line x1={px(v.x1)} y1={py(v.y1)} x2={px(v.x2)} y2={py(v.y1)} stroke={MANIM.green} strokeWidth={2.5} strokeDasharray="5 4" />
        <line x1={px(v.x2)} y1={py(v.y1)} x2={px(v.x2)} y2={py(v.y2)} stroke={MANIM.yellow} strokeWidth={2.5} strokeDasharray="5 4" />
        <circle cx={px(v.x1)} cy={py(v.y1)} r={7} fill={MANIM.blue} stroke={MANIM.ink} strokeWidth={2} />
        <circle cx={px(v.x2)} cy={py(v.y2)} r={7} fill={MANIM.orange} stroke={MANIM.ink} strokeWidth={2} />
      </Plane>
    </Frame>
  );
}

/* ───────────── Función definida a trozos ───────────── */

export function TrozosExplorador({ block }: { block: ToolBlock }) {
  const idx0 = int(block.params?.a, 0, 0, PIECEWISE.length - 1);
  const [idx, setIdx] = useState(idx0);
  const [x, setX] = useState(int(block.params?.b, 0, -7, 7));
  const def = PIECEWISE[idx]!;
  const { y, piece } = evalPiecewise(def, x);
  const jp = jumps(def);
  const label = def.pieces.map((p) => p.tex);
  const colors = [MANIM.blue, MANIM.orange, MANIM.green];

  return (
    <Frame
      hint={block.hint ?? "Mueve x y mira qué tramo se usa en cada momento. Fíjate en los puntos de corte: ¿empalman o saltan?"}
      onReset={() => {
        setIdx(idx0);
        setX(int(block.params?.b, 0, -7, 7));
      }}
      controls={
        <>
          <div className="flex flex-wrap gap-2">
            {PIECEWISE.map((d, i) => (
              <button key={d.id} type="button" className={`${TOOL_BTN} ${i === idx ? "border-white bg-white/20" : ""}`} aria-pressed={i === idx} onClick={() => setIdx(i)}>
                {`Función ${i + 1}`}
              </button>
            ))}
          </div>
          <Slider label="Valor de x" value={x} min={-7} max={7} step={0.5} color={MANIM.yellow} onChange={setX} format={(v) => fmtEs(v, 1).replace("-", "−")} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${def.tex}$`} className="text-lg" />
        <p className="text-lg font-semibold" style={{ color: colors[piece] ?? MANIM.green }} data-testid="tool-trozos-valor">
          {`Tramo ${piece + 1} (y = ${label[piece]!.replace(/\{,\}/g, ",")}): f(${fmtEs(x, 1)}) = ${fmtEs(y, 2)}`.replace(/-/g, "−")}
        </p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-trozos-corte">
          {jp.map((j) => (j.gap === 0 ? `En x = ${j.x} los tramos empalman` : `En x = ${j.x} hay un salto de ${fmtEs(Math.abs(j.gap), 2)}`)).join(" · ").replace(/-/g, "−")}
        </p>
      </div>
      <Plane testId="tool-trozos">
        {def.pieces.map((p, i) => {
          const a = Math.max(p.from, -R);
          const b = Math.min(p.to, R);
          return <line key={i} x1={px(a)} y1={py(p.f(a))} x2={px(b)} y2={py(p.f(b))} stroke={colors[i] ?? MANIM.green} strokeWidth={3.5} strokeLinecap="round" />;
        })}
        {def.pieces.map((p, i) =>
          i + 1 < def.pieces.length ? (
            <g key={`c${i}`}>
              <circle cx={px(p.to)} cy={py(p.f(p.to))} r={5} fill={p.toIncl ? colors[i] : MANIM.surface} stroke={colors[i]} strokeWidth={2} />
              <circle cx={px(p.to)} cy={py(def.pieces[i + 1]!.f(p.to))} r={5} fill={def.pieces[i + 1]!.fromIncl ? colors[i + 1] : MANIM.surface} stroke={colors[i + 1]} strokeWidth={2} />
            </g>
          ) : null,
        )}
        <line x1={px(x)} y1={py(y)} x2={px(x)} y2={py(0)} stroke={MANIM.muted} strokeDasharray="4 4" />
        <circle cx={px(x)} cy={py(y)} r={8} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} />
      </Plane>
    </Frame>
  );
}
