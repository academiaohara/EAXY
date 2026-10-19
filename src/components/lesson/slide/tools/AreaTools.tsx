"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, RightMark, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { decEs } from "@/components/lesson/anim/fraction";
import { regularPoints } from "@/components/lesson/anim/scenes/poligono-regular";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const PI = 3.14;
const poly = (p: readonly Pt[]) => p.map((q) => q.join(",")).join(" ");
const num = (v: number | undefined, fallback: number, lo: number, hi: number) => clamp(Number.isFinite(v) ? (v as number) : fallback, lo, hi);
const r2 = (v: number) => decEs(Math.round(v * 100) / 100, 2);
const r1 = (v: number) => decEs(Math.round(v * 10) / 10, 1);

function Value({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="text-xl font-bold tabular-nums" style={{ color }}>
      {children}
    </span>
  );
}

/* ───────────── Rectángulo: área y perímetro ───────────── */

export function RectanguloExplorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 6, 1, 11)), b: Math.round(num(block.params?.b, 4, 1, 11)), fixed: block.params?.c === 1 };
  const [s, setS] = useState({ a: init.a, b: init.fixed ? 12 - init.a : Math.min(init.b, 8), fixed: init.fixed });
  const { a, b, fixed } = s;
  const U = Math.min(34, Math.floor(430 / Math.max(a, 1)), Math.floor(240 / Math.max(b, 1)));
  const o: Pt = [260 - (a * U) / 2, 150 - (b * U) / 2];
  const setA = (v: number) => setS((p) => ({ ...p, a: v, b: p.fixed ? 12 - v : p.b }));

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la base y la altura. Activa «Perímetro fijo» y comprueba cuándo el área es mayor."}
      onReset={() => setS({ a: init.a, b: init.fixed ? 12 - init.a : Math.min(init.b, 8), fixed: init.fixed })}
      controls={
        <>
          <Slider label="Base a" value={a} min={1} max={11} unit=" cm" color={MANIM.blue} onChange={setA} />
          <Slider label="Altura b" value={b} min={1} max={fixed ? 11 : 8} unit=" cm" color={MANIM.green} disabled={fixed} onChange={(v) => setS((p) => ({ ...p, b: v }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button
              type="button"
              className={TOOL_BTN}
              aria-pressed={fixed}
              onClick={() => setS((p) => (p.fixed ? { ...p, fixed: false } : { a: p.a, b: 12 - p.a, fixed: true }))}
            >
              Perímetro fijo (24 cm)
            </button>
            <button type="button" className={TOOL_BTN} onClick={() => setS((p) => ({ ...p, a: p.fixed ? 6 : p.a, b: p.fixed ? 6 : p.a }))}>
              Cuadrado
            </button>
          </div>
        </>
      }
    >
      <Readout>
        <Value color={MANIM.yellow}>A = {a} · {b} = {a * b} cm²</Value>
        <Value color={MANIM.green}>P = 2·{a} + 2·{b} = {2 * a + 2 * b} cm</Value>
      </Readout>
      <Svg h={300} testId="tool-rectangulo">
        {Array.from({ length: a * b }, (_, k) => (
          <rect key={k} x={o[0] + (k % a) * U + 1} y={o[1] + Math.floor(k / a) * U + 1} width={U - 2} height={U - 2} rx={3} fill={MANIM.blue} fillOpacity={0.45} />
        ))}
        <rect x={o[0]} y={o[1]} width={a * U} height={b * U} fill="none" stroke={MANIM.ink} strokeWidth={4} />
      </Svg>
      {fixed ? (
        <p className="text-base text-[color:var(--stage-ink,#fff)]">
          Con el mismo perímetro, el área mayor es la del cuadrado ({a === 6 ? "¡la tienes!" : "6 × 6 = 36 cm²"}).
        </p>
      ) : null}
    </Frame>
  );
}

/* ───────────── Paralelogramo: el área no depende de la inclinación ───────────── */

export function ParalelogramoArea({ block }: { block: ToolBlock }) {
  const init = { b: Math.round(num(block.params?.a, 6, 2, 8)), h: Math.round(num(block.params?.b, 4, 1, 6)), s: Math.round(num(block.params?.c, 2, -4, 4)) };
  const [v, setV] = useState(init);
  const U = 36;
  const o: Pt = [150 - Math.min(0, v.s) * U, 250];
  const A: Pt = [o[0], o[1]];
  const B: Pt = [o[0] + v.b * U, o[1]];
  const C: Pt = [B[0] + v.s * U, o[1] - v.h * U];
  const D: Pt = [A[0] + v.s * U, o[1] - v.h * U];
  const side = Math.hypot(v.s, v.h);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Inclina el paralelogramo con el desplazamiento: ¿qué cambia, el área o el lado inclinado?"}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Base b" value={v.b} min={2} max={8} unit=" cm" color={MANIM.blue} onChange={(b) => setV((p) => ({ ...p, b }))} />
          <Slider label="Altura a" value={v.h} min={1} max={6} unit=" cm" color={MANIM.green} onChange={(h) => setV((p) => ({ ...p, h }))} />
          <Slider label="Desplazamiento (inclinación)" value={v.s} min={-4} max={4} unit=" cm" color={MANIM.orange} onChange={(s) => setV((p) => ({ ...p, s }))} />
        </>
      }
    >
      <Readout>
        <Value color={MANIM.yellow}>A = {v.b} · {v.h} = {v.b * v.h} cm²</Value>
        <Value color={MANIM.orange}>P = 2·{v.b} + 2·{r2(side)} = {r2(2 * v.b + 2 * side)} cm</Value>
      </Readout>
      <Svg h={290} testId="tool-paralelogramo-area">
        <polygon points={poly([A, B, C, D])} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={4} strokeLinejoin="round" />
        <Seg a={D} b={[D[0], A[1]]} color={MANIM.yellow} width={3} dashed />
        <RightMark v={[D[0], A[1]]} a={v.s >= 0 ? 180 : 0} b={90} size={13} color={MANIM.yellow} />
        <text x={D[0] + 10} y={(D[1] + A[1]) / 2} fill={MANIM.yellow} fontSize={18} fontWeight={700}>a</text>
        <text x={(A[0] + B[0]) / 2} y={A[1] + 26} fill={MANIM.blue} fontSize={18} fontWeight={700} textAnchor="middle">b</text>
      </Svg>
      <p className="text-base text-[color:var(--stage-ink,#fff)]">El área solo depende de la base y de la altura; el perímetro cambia con la inclinación.</p>
    </Frame>
  );
}

/* ───────────── Trapecio ───────────── */

export function TrapecioArea({ block }: { block: ToolBlock }) {
  const init = { B: Math.round(num(block.params?.a, 8, 2, 10)), b: Math.round(num(block.params?.b, 4, 1, 10)), h: Math.round(num(block.params?.c, 4, 1, 6)) };
  const [v, setV] = useState({ ...init, b: Math.min(init.b, init.B) });
  const U = 32;
  const o: Pt = [260 - (v.B * U) / 2, 250];
  const off = ((v.B - v.b) * U) / 2;
  const q: Pt[] = [o, [o[0] + v.B * U, o[1]], [o[0] + off + v.b * U, o[1] - v.h * U], [o[0] + off, o[1] - v.h * U]];
  const area = ((v.B + v.b) * v.h) / 2;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia las bases y la altura. ¿Qué pasa con el área cuando la base menor se iguala a la mayor?"}
      onReset={() => setV({ ...init, b: Math.min(init.b, init.B) })}
      controls={
        <>
          <Slider label="Base mayor B" value={v.B} min={2} max={10} unit=" cm" color={MANIM.blue} onChange={(B) => setV((p) => ({ ...p, B, b: Math.min(p.b, B) }))} />
          <Slider label="Base menor b" value={v.b} min={1} max={v.B} unit=" cm" color={MANIM.orange} onChange={(b) => setV((p) => ({ ...p, b }))} />
          <Slider label="Altura a" value={v.h} min={1} max={6} unit=" cm" color={MANIM.green} onChange={(h) => setV((p) => ({ ...p, h }))} />
        </>
      }
    >
      <Readout>
        <Value color={MANIM.yellow}>
          A = ({v.B} + {v.b}) · {v.h} / 2 = {decEs(area, 1)} cm²
        </Value>
      </Readout>
      <Svg h={290} testId="tool-trapecio-area">
        <polygon points={poly(q)} fill={MANIM.blue} fillOpacity={0.28} stroke={MANIM.blue} strokeWidth={4} strokeLinejoin="round" />
        <Seg a={[q[3]![0], q[3]![1]]} b={[q[3]![0], o[1]]} color={MANIM.green} width={3} dashed />
        <text x={q[3]![0] + 10} y={(q[3]![1] + o[1]) / 2} fill={MANIM.green} fontSize={18} fontWeight={700}>a</text>
        <text x={(q[0]![0] + q[1]![0]) / 2} y={o[1] + 26} fill={MANIM.blue} fontSize={18} fontWeight={700} textAnchor="middle">B</text>
        <text x={(q[3]![0] + q[2]![0]) / 2} y={q[3]![1] - 10} fill={MANIM.orange} fontSize={18} fontWeight={700} textAnchor="middle">b</text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Triángulo: el área no cambia al mover el vértice ───────────── */

export function TrianguloArea({ block }: { block: ToolBlock }) {
  const init = { b: Math.round(num(block.params?.a, 6, 2, 9)), h: Math.round(num(block.params?.b, 4, 1, 6)), x: Math.round(num(block.params?.c, 2, -3, 12)) };
  const [v, setV] = useState({ ...init, x: Math.min(init.x, init.b + 3) });
  const U = 34;
  const o: Pt = [120, 250];
  const A: Pt = o;
  const B: Pt = [o[0] + v.b * U, o[1]];
  const C: Pt = [o[0] + v.x * U, o[1] - v.h * U];
  const area = (v.b * v.h) / 2;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve el vértice superior de izquierda a derecha: ¿cambia el área? Cambia solo la altura y mira qué pasa."}
      onReset={() => setV({ ...init, x: Math.min(init.x, init.b + 3) })}
      controls={
        <>
          <Slider label="Base b" value={v.b} min={2} max={9} unit=" cm" color={MANIM.blue} onChange={(b) => setV((p) => ({ ...p, b, x: Math.min(p.x, b + 3) }))} />
          <Slider label="Altura a" value={v.h} min={1} max={6} unit=" cm" color={MANIM.green} onChange={(h) => setV((p) => ({ ...p, h }))} />
          <Slider label="Posición del vértice" value={v.x} min={-3} max={v.b + 3} unit=" cm" color={MANIM.orange} onChange={(x) => setV((p) => ({ ...p, x }))} />
        </>
      }
    >
      <Readout>
        <Value color={MANIM.yellow}>
          A = {v.b} · {v.h} / 2 = {decEs(area, 1)} cm²
        </Value>
      </Readout>
      <Svg h={290} testId="tool-triangulo-area">
        <line x1={40} y1={C[1]} x2={500} y2={C[1]} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="8 7" />
        <polygon points={poly([A, B, C])} fill={MANIM.blue} fillOpacity={0.28} stroke={MANIM.blue} strokeWidth={4} strokeLinejoin="round" />
        <Seg a={C} b={[C[0], A[1]]} color={MANIM.yellow} width={3} dashed />
        <Dot p={C} color={MANIM.orange} r={8} />
        <text x={C[0] + 10} y={(C[1] + A[1]) / 2} fill={MANIM.yellow} fontSize={18} fontWeight={700}>a</text>
        <text x={(A[0] + B[0]) / 2} y={A[1] + 26} fill={MANIM.blue} fontSize={18} fontWeight={700} textAnchor="middle">b</text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Polígono regular: área = perímetro · apotema / 2 ───────────── */

export function apotema(n: number, l: number): number {
  return l / (2 * Math.tan(Math.PI / n));
}

export function PoligonoRegularArea({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.n, 6, 3, 12)), l: Math.round(num(block.params?.a, 4, 2, 10)) };
  const [v, setV] = useState(init);
  const a = apotema(v.n, v.l);
  const P = v.n * v.l;
  const A = (P * a) / 2;
  const c: Pt = [260, 150];
  const R = 120;
  const pts = regularPoints(c, R, v.n, 90 + 180 / v.n);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el número de lados y la longitud del lado: el polígono se parte en n triángulos iguales."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Número de lados n" value={v.n} min={3} max={12} color={MANIM.orange} onChange={(n) => setV((p) => ({ ...p, n }))} />
          <Slider label="Lado l" value={v.l} min={2} max={10} unit=" cm" color={MANIM.blue} onChange={(l) => setV((p) => ({ ...p, l }))} />
        </>
      }
    >
      <Readout>
        <Value color={MANIM.green}>P = {v.n}·{v.l} = {P} cm</Value>
        <Value color={MANIM.orange}>a ≈ {r2(a)} cm</Value>
        <Value color={MANIM.yellow}>A = {P}·{r2(a)} / 2 ≈ {r1(A)} cm²</Value>
      </Readout>
      <Svg h={300} testId="tool-poligono-area">
        {pts.map((p, i) => (
          <polygon key={i} points={poly([c, p, pts[(i + 1) % v.n]!])} fill={[MANIM.blue, MANIM.green, MANIM.orange, MANIM.purple][i % 4]} fillOpacity={0.3} stroke={MANIM.ink} strokeWidth={1.5} />
        ))}
        <polygon points={poly(pts)} fill="none" stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
        <Dot p={c} color={MANIM.yellow} r={5} />
      </Svg>
      <p className="text-base text-[color:var(--stage-ink,#fff)]">{v.n} triángulos de base {v.l} cm y altura {r2(a)} cm.</p>
    </Frame>
  );
}

/* ───────────── Círculo: longitud y área ───────────── */

export function CirculoExplorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 4, 1, 10));
  const [r, setR] = useState(init);
  const c: Pt = [150, 140];
  const len = 2 * PI * r;
  const area = PI * r * r;
  const U = Math.min(8 * r + 8, 44);
  const sqX = 290;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el radio. Si lo duplicas, ¿cuánto se multiplica la longitud? ¿Y el área?"}
      onReset={() => setR(init)}
      controls={<Slider label="Radio r" value={r} min={1} max={10} unit=" cm" color={MANIM.blue} onChange={setR} />}
    >
      <Readout>
        <Value color={MANIM.green}>l = 2·3,14·{r} = {r2(len)} cm</Value>
        <Value color={MANIM.yellow}>A = 3,14·{r}² = {r2(area)} cm²</Value>
      </Readout>
      <Svg h={300} testId="tool-circulo">
        <circle cx={c[0]} cy={c[1]} r={13 * r} fill={MANIM.blue} fillOpacity={0.2} stroke={MANIM.blue} strokeWidth={4} />
        <text x={c[0]} y={c[1] + 5} fill={MANIM.yellow} fontSize={20} fontWeight={700} textAnchor="middle">r = {r}</text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={sqX + i * (U + 6)} y={120} width={U} height={U} rx={4} fill={MANIM.yellow} fillOpacity={0.45} stroke={MANIM.yellow} strokeWidth={2} />
        ))}
        <rect x={sqX + 3 * (U + 6)} y={120} width={0.14 * U} height={U} rx={2} fill={MANIM.orange} fillOpacity={0.7} />
        <text x={sqX} y={108} fill={MANIM.muted} fontSize={15} fontWeight={600}>área = 3,14 cuadrados de lado r</text>
      </Svg>
    </Frame>
  );
}
