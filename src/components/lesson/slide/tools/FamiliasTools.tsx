"use client";

import { useState, type ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { fracTex, fracValue } from "@/components/lesson/anim/eq";
import { polyTex } from "@/components/lesson/anim/poly";
import { compound, parabolaCuts, periodsTo, radicalDomain, radicalRange, radicalValue, vertex, type RadicalDef } from "@/components/lesson/anim/fam";
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
const dec = (x: number) => fmtEs(Math.round(x * 100) / 100, 2);
const tex = (x: number) => dec(x).replace(",", "{,}");

function Plane({ children, id }: { children: ReactNode; id: string }) {
  const ticks = Array.from({ length: 2 * R + 1 }, (_, i) => i - R);
  return (
    <Svg w={W} h={H} testId={id}>
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect x={10} y={10} width={W - 20} height={H - 20} />
        </clipPath>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={10} x2={px(t)} y2={H - 10} stroke={MANIM.grid} strokeWidth={t === 0 ? 2.5 : 0.8} opacity={t === 0 ? 1 : 0.5} />
          <line x1={10} y1={py(t)} x2={W - 10} y2={py(t)} stroke={MANIM.grid} strokeWidth={t === 0 ? 2.5 : 0.8} opacity={t === 0 ? 1 : 0.5} />
        </g>
      ))}
      <g clipPath={`url(#${id}-clip)`}>{children}</g>
    </Svg>
  );
}

/** Traza una curva muestreada, cortándola donde sale del recuadro o no existe. */
function Curve({ pts, color }: { pts: ([number, number] | null)[]; color: string }) {
  const segs: string[][] = [[]];
  for (const p of pts) {
    if (p && Math.abs(p[1]) <= 40) segs[segs.length - 1]!.push(`${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}`);
    else if (segs[segs.length - 1]!.length) segs.push([]);
  }
  return (
    <>
      {segs.filter((s) => s.length > 1).map((s, i) => (
        <polyline key={i} points={s.join(" ")} fill="none" stroke={color} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      ))}
    </>
  );
}
const xsFine = (from = -R, to = R, n = 400) => Array.from({ length: n + 1 }, (_, i) => from + (i * (to - from)) / n);

/* ───────────── Parábola ───────────── */

export function ParabolaExplorador({ block }: { block: ToolBlock }) {
  const init = { a: int(block.params?.a, 1, -5, 5), b: int(block.params?.b, -6, -10, 10), c: int(block.params?.c, 6, -10, 10) };
  const [v, setV] = useState(init);
  const a = v.a === 0 ? 1 : v.a;
  const vt = vertex(a, v.b, v.c);
  const xv = fracValue(vt.x);
  const yv = fracValue(vt.y);
  const cuts = parabolaCuts(a, v.b, v.c);
  const forma = a > 0 ? "Ramas hacia arriba: el vértice es un mínimo" : "Ramas hacia abajo: el vértice es un máximo";
  const ancho = Math.abs(a) > 1 ? "más estilizada que y = x²" : Math.abs(a) < 1 ? "más ancha que y = x²" : "igual de ancha que y = x²";

  return (
    <Frame
      hint={block.hint ?? "Cambia a, b y c: a decide la orientación y la anchura; el vértice está en x = −b / 2a."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="a" value={a} min={-5} max={5} color={MANIM.blue} onChange={(a2) => setV((p) => ({ ...p, a: a2 }))} format={f} />
          <Slider label="b" value={v.b} min={-10} max={10} color={MANIM.green} onChange={(b) => setV((p) => ({ ...p, b }))} format={f} />
          <Slider label="c" value={v.c} min={-10} max={10} color={MANIM.orange} onChange={(c) => setV((p) => ({ ...p, c }))} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$y = ${polyTex([v.c, v.b, a])}$`.replace("y = ", "y = ")} className="text-xl" />
        <p className="text-lg font-semibold" style={{ color: MANIM.yellow }} data-testid="tool-parab-vertice">
          <MathRenderer text={`Vértice $\\left(${fracTex(vt.x)},\\ ${fracTex(vt.y)}\\right)$`} className="inline" />
        </p>
        <p className="text-base" style={{ color: a > 0 ? MANIM.green : MANIM.red }} data-testid="tool-parab-forma">{forma} · {ancho}</p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-parab-cortes">
          {`Corta al eje Y en (0, ${v.c})`.replace("-", "−")}
          {cuts.xs.length === 0 ? " · No corta al eje X" : ` · Corta al eje X en ${cuts.xs.map((x) => `(${dec(x)}, 0)`).join(" y ")}`.replace(/-/g, "−")}
        </p>
      </div>
      <Plane id="tool-parab">
        <Curve pts={xsFine().map((x) => [x, a * x * x + v.b * x + v.c] as [number, number])} color={MANIM.blue} />
        <line x1={px(xv)} y1={10} x2={px(xv)} y2={H - 10} stroke={MANIM.yellow} strokeDasharray="5 5" />
        <circle cx={px(xv)} cy={py(yv)} r={7} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} />
        {cuts.xs.map((x) => (
          <circle key={x} cx={px(x)} cy={py(0)} r={5} fill={MANIM.green} />
        ))}
        <circle cx={px(0)} cy={py(v.c)} r={5} fill={MANIM.orange} />
      </Plane>
    </Frame>
  );
}

/* ───────────── Hipérbola y = k/(x − h) + v ───────────── */

export function HiperbolaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { k: int(ini[0], 3, -8, 8), h: int(ini[1], 0, -5, 5), v: int(ini[2], 0, -5, 5) };
  const [s, setS] = useState(init);
  const k = s.k === 0 ? 1 : s.k;
  const xTest = s.h + 2;
  const rows = [-4, -2, -1, 1, 2, 4].map((d) => ({ x: s.h + d, y: k / d + s.v }));

  return (
    <Frame
      hint={block.hint ?? "k cambia la forma y el cuadrante; h mueve la asíntota vertical; v, la horizontal."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="k" value={k} min={-8} max={8} color={MANIM.blue} onChange={(k2) => setS((p) => ({ ...p, k: k2 }))} format={f} />
          <Slider label="h (asíntota vertical x = h)" value={s.h} min={-5} max={5} color={MANIM.red} onChange={(h) => setS((p) => ({ ...p, h }))} format={f} />
          <Slider label="v (asíntota horizontal y = v)" value={s.v} min={-5} max={5} color={MANIM.yellow} onChange={(v2) => setS((p) => ({ ...p, v: v2 }))} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$y = \\dfrac{${k}}{x ${s.h === 0 ? "" : s.h > 0 ? `- ${s.h}` : `+ ${-s.h}`}} ${s.v === 0 ? "" : s.v > 0 ? `+ ${s.v}` : `- ${-s.v}`}$`.replace("{x }", "{x}")} className="text-xl" />
        <p className="text-lg font-semibold" data-testid="tool-hip-asintotas">
          <span style={{ color: MANIM.red }}>{`Asíntota vertical x = ${s.h}`.replace("-", "−")}</span>
          {" · "}
          <span style={{ color: MANIM.yellow }}>{`Asíntota horizontal y = ${s.v}`.replace("-", "−")}</span>
        </p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-hip-valor">
          {`No está definida en x = ${s.h}. En x = ${xTest}: y = ${fmtEs(k / 2 + s.v, 2)}`.replace(/-/g, "−")}
        </p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">
          {rows.map((r) => `(${r.x}, ${fmtEs(r.y, 2)})`).join("  ").replace(/-/g, "−")}
        </p>
      </div>
      <Plane id="tool-hip">
        <line x1={px(s.h)} y1={10} x2={px(s.h)} y2={H - 10} stroke={MANIM.red} strokeWidth={2} strokeDasharray="6 5" />
        <line x1={10} y1={py(s.v)} x2={W - 10} y2={py(s.v)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 5" />
        <Curve pts={xsFine(s.h + 0.04, R + 5).map((x) => [x, k / (x - s.h) + s.v] as [number, number])} color={MANIM.blue} />
        <Curve pts={xsFine(-R - 5, s.h - 0.04).map((x) => [x, k / (x - s.h) + s.v] as [number, number])} color={MANIM.green} />
      </Plane>
    </Frame>
  );
}

/* ───────────── Radical y = a·√(s(x − h)) + k ───────────── */

export function RadicalExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 1, -3, 3), h: int(ini[1], 0, -5, 5), k: int(ini[2], 0, -5, 5), mirror: ini[3] === 1 };
  const [s, setS] = useState(init);
  const d: RadicalDef = { a: s.a === 0 ? 1 : s.a, h: s.h, k: s.k, mirror: s.mirror };
  const dom = radicalDomain(d);
  const rec = radicalRange(d);
  const bound = (n: number) => (Number.isFinite(n) ? String(n).replace("-", "−") : n > 0 ? "+∞" : "−∞");
  const dText = s.mirror ? `(−∞, ${bound(dom.to)}]` : `[${bound(dom.from)}, +∞)`;
  const rText = d.a > 0 ? `[${bound(rec.from)}, +∞)` : `(−∞, ${bound(rec.to)}]`;
  const inner = s.mirror ? `${s.h === 0 ? "-x" : `${s.h} - x`}` : `${s.h === 0 ? "x" : s.h > 0 ? `x - ${s.h}` : `x + ${-s.h}`}`;
  const start = radicalValue(d, s.h)!;

  return (
    <Frame
      hint={block.hint ?? "El radicando debe ser ≥ 0: eso fija el dominio. a, h y k mueven y estiran la curva."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="a" value={d.a} min={-3} max={3} color={MANIM.blue} onChange={(a) => setS((p) => ({ ...p, a }))} format={f} />
          <Slider label="h (desplazamiento horizontal)" value={s.h} min={-5} max={5} color={MANIM.green} onChange={(h) => setS((p) => ({ ...p, h }))} format={f} />
          <Slider label="k (desplazamiento vertical)" value={s.k} min={-5} max={5} color={MANIM.orange} onChange={(k) => setS((p) => ({ ...p, k }))} format={f} />
          <button type="button" className={`${TOOL_BTN} ${s.mirror ? "border-white bg-white/20" : ""}`} aria-pressed={s.mirror} onClick={() => setS((p) => ({ ...p, mirror: !p.mirror }))}>
            Reflejar (√ de −x)
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$y = ${d.a === 1 ? "" : d.a === -1 ? "-" : d.a}\\sqrt{${inner}} ${s.k === 0 ? "" : s.k > 0 ? `+ ${s.k}` : `- ${-s.k}`}$`} className="text-xl" />
        <p className="text-lg font-semibold" style={{ color: MANIM.green }} data-testid="tool-rad-dominio">{`Dominio ${dText}`}</p>
        <p className="text-base" data-testid="tool-rad-recorrido">{`Recorrido ${rText} · arranca en (${s.h}, ${fmtEs(start, 2)})`.replace(/-(?=\d)/g, "−")}</p>
      </div>
      <Plane id="tool-rad">
        <Curve
          pts={xsFine(-R - 3, R + 3, 600).map((x) => {
            const y = radicalValue(d, x);
            return y === null ? null : ([x, y] as [number, number]);
          })}
          color={MANIM.blue}
        />
        <circle cx={px(s.h)} cy={py(start)} r={6} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} />
      </Plane>
    </Frame>
  );
}

/* ───────────── Exponencial y = C·aˣ ───────────── */

const BASES = [0.4, 0.5, 0.7, 0.9, 1.5, 2, 3];

export function ExponencialExplorador({ block }: { block: ToolBlock }) {
  const init = { i: BASES.indexOf(Number(block.params?.a ?? 2)) >= 0 ? BASES.indexOf(Number(block.params?.a ?? 2)) : 5, c: int(block.params?.b, 1, 1, 5) };
  const [s, setS] = useState(init);
  const a = BASES[s.i]!;
  const y = (x: number) => s.c * a ** x;
  const crece = a > 1;

  return (
    <Frame
      hint={block.hint ?? "Cambia la base: mayor que 1 crece, menor que 1 decrece; siempre pasa por (0, 1) cuando C = 1."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Base a" value={s.i} min={0} max={BASES.length - 1} color={MANIM.blue} onChange={(i) => setS((p) => ({ ...p, i }))} format={(i) => fmtEs(BASES[i]!, 2)} />
          <Slider label="Constante C" value={s.c} min={1} max={5} color={MANIM.orange} onChange={(c) => setS((p) => ({ ...p, c }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$y = ${s.c === 1 ? "" : s.c}\\cdot ${tex(a)}^{x}$`} className="text-xl" />
        <p className="text-lg font-semibold" style={{ color: crece ? MANIM.green : MANIM.red }} data-testid="tool-exp-tipo">
          {crece ? "Creciente (a > 1)" : "Decreciente (a < 1)"}
        </p>
        <p className="text-base" data-testid="tool-exp-puntos">{`Pasa por (0, ${s.c}) y (1, ${fmtEs(y(1), 3)}) · siempre positiva`}</p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">
          {[-3, -2, -1, 0, 1, 2, 3].map((x) => `x = ${x}: ${fmtEs(y(x), 3)}`).join(" · ").replace(/-(?=\d)/g, "−")}
        </p>
      </div>
      <Plane id="tool-exp">
        <line x1={10} y1={py(0)} x2={W - 10} y2={py(0)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 5" />
        <Curve pts={xsFine().map((x) => [x, y(x)] as [number, number])} color={MANIM.blue} />
        <circle cx={px(0)} cy={py(s.c)} r={6} fill={MANIM.orange} />
        <circle cx={px(1)} cy={py(y(1))} r={6} fill={MANIM.green} />
      </Plane>
    </Frame>
  );
}

/* ───────────── Variación porcentual compuesta ───────────── */

export function CompuestoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { c0: int(ini[0], 450, 100, 50000), rate: int(ini[1], 5, -30, 30), t: int(ini[2], 5, 0, 20) };
  const [s, setS] = useState(init);
  const val = compound(s.c0, s.rate, s.t);
  const doble = periodsTo(s.c0, s.rate, s.rate >= 0 ? s.c0 * 2 : s.c0 / 2);
  const maxT = 20;
  const vals = Array.from({ length: maxT + 1 }, (_, t) => compound(s.c0, s.rate, t));
  const top = Math.max(...vals, s.c0);
  const bx = (t: number) => 20 + (t / maxT) * 380;
  const by = (v: number) => 150 - (v / top) * 130;

  return (
    <Frame
      hint={block.hint ?? "Subir un r % es multiplicar por 1 + r/100 cada periodo; bajar un r %, por 1 − r/100."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Valor inicial" value={s.c0} min={100} max={50000} step={50} color={MANIM.blue} unit=" €" onChange={(c0) => setS((p) => ({ ...p, c0 }))} />
          <Slider label="Variación anual" value={s.rate} min={-30} max={30} color={MANIM.orange} unit=" %" onChange={(rate) => setS((p) => ({ ...p, rate }))} format={f} />
          <Slider label="Años" value={s.t} min={0} max={maxT} color={MANIM.green} onChange={(t) => setS((p) => ({ ...p, t }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$y = ${s.c0}\\cdot ${tex(1 + s.rate / 100)}^{x}$`} className="text-xl" />
        <p className="text-lg font-semibold" style={{ color: MANIM.yellow }} data-testid="tool-comp-valor">
          {`Dentro de ${s.t} años: ${fmtEs(Math.round(val * 100) / 100, 2)} €`}
        </p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-comp-mitad">
          {doble === null ? "El valor no cambia" : s.rate > 0 ? `Se duplica a los ${doble} años` : `Se reduce a la mitad a los ${doble} años`}
        </p>
      </div>
      <svg viewBox="0 0 420 170" className="w-full" aria-hidden data-testid="tool-comp">
        <line x1={20} y1={150} x2={400} y2={150} stroke={MANIM.grid} strokeWidth={2} />
        <polyline points={vals.map((v, t) => `${bx(t)},${by(v)}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        <circle cx={bx(s.t)} cy={by(val)} r={7} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} />
      </svg>
    </Frame>
  );
}
