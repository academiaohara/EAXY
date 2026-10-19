"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, RightMark, Seg, TickMark, angleOf, footOn, type Pt } from "@/components/lesson/anim/geometry";
import { InteriorWedge, centroid, midpoint, orthocenter, type Tri } from "@/components/lesson/anim/scenes/triangulos";
import { regularPoints } from "@/components/lesson/anim/scenes/poligono-regular";
import { decEs } from "@/components/lesson/anim/fraction";
import { Readout, Svg, cm } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const num = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Number.isFinite(v) ? (v as number) : fallback, lo, hi);

const tidy = (v: number) => Math.round(v * 10) / 10;

function Presets({ items, onPick }: { items: { label: string; apply: () => void }[]; onPick?: () => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <button
          key={it.label}
          type="button"
          className={TOOL_BTN}
          onClick={() => {
            it.apply();
            onPick?.();
          }}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

const poly = (p: readonly Pt[]) => p.map((q) => q.join(",")).join(" ");

/* ───────────── Triángulo: clasificación por ángulos y lados ───────────── */

function triAngles([a, b, c]: Tri): [number, number, number] {
  const ang = (v: Pt, p: Pt, q: Pt) => {
    const d = Math.abs(angleOf(v, p) - angleOf(v, q));
    return d > 180 ? 360 - d : d;
  };
  return [ang(a, b, c), ang(b, a, c), ang(c, a, b)];
}

export function TrianguloClasificador({ block }: { block: ToolBlock }) {
  const init = { x: Math.round(num(block.params?.a, 3, -2, 8) * 2) / 2, y: tidy(num(block.params?.b, 4, 1, 6)) };
  const [v, setV] = useState(init);
  const S = 36;
  const A: Pt = [150, 270];
  const B: Pt = [A[0] + 6 * S, 270];
  const C: Pt = [A[0] + v.x * S, 270 - v.y * S];
  const tri: Tri = [A, B, C];
  const lenA = Math.hypot(v.x - 6, v.y); // lado BC (opuesto a A)
  const lenB = Math.hypot(v.x, v.y); // lado AC
  const lenC = 6;
  const [angA, angB, angC] = triAngles(tri);
  const maxAng = Math.max(angA, angB, angC);
  const same = (p: number, q: number) => Math.abs(p - q) < 0.06;
  const equal = [same(lenA, lenB), same(lenB, lenC), same(lenA, lenC)].filter(Boolean).length;
  const bySides = equal >= 3 ? "equilátero" : equal >= 1 ? "isósceles" : "escaleno";
  const byAngles = Math.abs(maxAng - 90) < 0.6 ? "rectángulo" : maxAng > 90 ? "obtusángulo" : "acutángulo";
  const rightAt = [angA, angB, angC].findIndex((x) => Math.abs(x - 90) < 0.6);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve el vértice C y mira cuándo cambia el nombre del triángulo según sus lados y según sus ángulos."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Posición horizontal de C" value={v.x} min={-2} max={8} step={0.5} format={decEs} unit=" cm" color={MANIM.blue} onChange={(x) => setV((s) => ({ ...s, x }))} />
          <Slider label="Altura de C" value={v.y} min={1} max={6} step={0.1} format={decEs} unit=" cm" color={MANIM.green} onChange={(y) => setV((s) => ({ ...s, y: tidy(y) }))} />
          <div className="sm:col-span-2">
            <Presets
              items={[
                { label: "Equilátero", apply: () => setV({ x: 3, y: 5.2 }) },
                { label: "Isósceles", apply: () => setV({ x: 3, y: 4 }) },
                { label: "Rectángulo", apply: () => setV({ x: 0, y: 4 }) },
                { label: "Obtusángulo", apply: () => setV({ x: 1, y: 1.5 }) },
              ]}
            />
          </div>
        </>
      }
    >
      <Readout>
        <span className="text-xl font-bold" style={{ color: MANIM.green }}>
          Por sus lados: {bySides}
        </span>
        <span className="text-xl font-bold" style={{ color: MANIM.orange }}>
          Por sus ángulos: {byAngles}
        </span>
      </Readout>
      <Svg h={300} testId="tool-triangulo-clasificador">
        <polygon points={poly(tri)} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
        {tri.map((p, i) => {
          const prev = tri[(i + 2) % 3]!;
          const next = tri[(i + 1) % 3]!;
          return i === rightAt ? (
            <RightMark key={i} v={p} a={angleOf(p, prev)} b={angleOf(p, next)} size={20} color={MANIM.yellow} />
          ) : (
            <InteriorWedge key={i} v={p} p={prev} q={next} r={26} color={[angA, angB, angC][i]! > 90 ? MANIM.orange : MANIM.muted} opacity={[angA, angB, angC][i]! > 90 ? 0.6 : 0.25} />
          );
        })}
        <text x={(B[0] + C[0]) / 2 + 12} y={(B[1] + C[1]) / 2} fill={MANIM.muted} fontSize={17} fontWeight={600}>
          {cm(lenA)} cm
        </text>
        <text x={(A[0] + C[0]) / 2 - 12} y={(A[1] + C[1]) / 2} fill={MANIM.muted} fontSize={17} fontWeight={600} textAnchor="end">
          {cm(lenB)} cm
        </text>
        <text x={(A[0] + B[0]) / 2} y={A[1] + 26} fill={MANIM.muted} fontSize={17} fontWeight={600} textAnchor="middle">
          6 cm
        </text>
        <text x={A[0] - 10} y={A[1] + 22} fill={MANIM.ink} fontSize={18} fontWeight={700} textAnchor="end">A</text>
        <text x={B[0] + 10} y={B[1] + 22} fill={MANIM.ink} fontSize={18} fontWeight={700}>B</text>
        <text x={C[0]} y={C[1] - 14} fill={MANIM.ink} fontSize={18} fontWeight={700} textAnchor="middle">C</text>
        <Dot p={C} color={MANIM.yellow} r={7} />
      </Svg>
      <p className="text-base text-[color:var(--stage-ink,#fff)]">
        Ángulos: {Math.round(angA)}° + {Math.round(angB)}° + {Math.round(angC)}° = {Math.round(angA) + Math.round(angB) + Math.round(angC)}°.
      </p>
    </Frame>
  );
}

/* ───────────── Triángulo: baricentro y ortocentro ───────────── */

export function TrianguloCentros({ block }: { block: ToolBlock }) {
  const init = { x: Math.round(num(block.params?.a, 2, 0, 6) * 2) / 2, y: tidy(num(block.params?.b, 4, 1.5, 6)), mode: block.params?.c === 1 ? ("alturas" as const) : ("medianas" as const) };
  const [s, setS] = useState(init);
  const S = 40;
  const A: Pt = [140, 270];
  const B: Pt = [A[0] + 6 * S, 270];
  const C: Pt = [A[0] + s.x * S, 270 - s.y * S];
  const tri: Tri = [A, B, C];
  const G = centroid(tri);
  const H = orthocenter(tri);
  const [angA, angB, angC] = triAngles(tri);
  const maxAng = Math.max(angA, angB, angC);
  const kind = Math.abs(maxAng - 90) < 0.6 ? "rectángulo" : maxAng > 90 ? "obtusángulo" : "acutángulo";
  const colors = [MANIM.blue, MANIM.green, MANIM.orange];
  const medians: [Pt, Pt][] = [[A, midpoint(B, C)], [B, midpoint(A, C)], [C, midpoint(A, B)]];
  const sideOf = (i: number): [Pt, Pt] => [tri[(i + 1) % 3]!, tri[(i + 2) % 3]!];

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve C y elige medianas o alturas. ¿Dónde queda el punto de corte cuando el triángulo es obtusángulo?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición horizontal de C" value={s.x} min={0} max={6} step={0.5} format={decEs} unit=" cm" color={MANIM.blue} onChange={(x) => setS((p) => ({ ...p, x }))} />
          <Slider label="Altura de C" value={s.y} min={1.5} max={6} step={0.1} format={decEs} unit=" cm" color={MANIM.green} onChange={(y) => setS((p) => ({ ...p, y: tidy(y) }))} />
          <div className="sm:col-span-2">
            <Presets
              items={[
                { label: "Medianas y baricentro", apply: () => setS((p) => ({ ...p, mode: "medianas" })) },
                { label: "Alturas y ortocentro", apply: () => setS((p) => ({ ...p, mode: "alturas" })) },
              ]}
            />
          </div>
        </>
      }
    >
      <Readout>
        {s.mode === "medianas" ? (
          <>
            <span className="text-xl font-bold" style={{ color: MANIM.yellow }}>
              Baricentro G: corte de las tres medianas
            </span>
            <span className="text-base text-[color:var(--stage-ink,#fff)]">Siempre queda dentro del triángulo.</span>
          </>
        ) : (
          <>
            <span className="text-xl font-bold" style={{ color: MANIM.yellow }}>
              Ortocentro H: corte de las tres alturas
            </span>
            <span className="text-base text-[color:var(--stage-ink,#fff)]">
              Triángulo {kind}: {kind === "acutángulo" ? "H queda dentro." : kind === "rectángulo" ? "H coincide con el vértice del ángulo recto." : "H queda fuera."}
            </span>
          </>
        )}
      </Readout>
      <Svg h={300} testId="tool-triangulo-centros">
        <polygon points={poly(tri)} fill={MANIM.blue} fillOpacity={0.1} stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
        {s.mode === "medianas"
          ? medians.map(([v, m], i) => (
              <g key={i}>
                <Seg a={v} b={m} color={colors[i]!} width={3.5} />
                <Dot p={m} color={colors[i]!} r={4.5} />
              </g>
            ))
          : tri.map((v, i) => {
              const [p, q] = sideOf(i);
              const f = footOn(v, p, q);
              const t = ((f[0] - p[0]) * (q[0] - p[0]) + (f[1] - p[1]) * (q[1] - p[1])) / ((q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2);
              const outside = t < -0.001 || t > 1.001;
              const near = t < 0 ? p : q;
              const beyond = (H[0] - v[0]) * (f[0] - v[0]) + (H[1] - v[1]) * (f[1] - v[1]) > (f[0] - v[0]) ** 2 + (f[1] - v[1]) ** 2 + 1;
              return (
                <g key={i}>
                  <Seg a={v} b={f} color={colors[i]!} width={3.5} />
                  {outside ? <Seg a={near} b={f} color={colors[i]!} width={2.5} dashed /> : null}
                  {beyond ? <Seg a={f} b={H} color={colors[i]!} width={2.5} dashed /> : null}
                  {Math.hypot(f[0] - v[0], f[1] - v[1]) > 6 ? <RightMark v={f} a={angleOf(f, v)} b={angleOf(f, outside ? near : p)} size={12} color={colors[i]!} /> : null}
                </g>
              );
            })}
        <Dot p={s.mode === "medianas" ? G : H} color={MANIM.yellow} r={8} />
        <text x={(s.mode === "medianas" ? G : H)[0] + 14} y={(s.mode === "medianas" ? G : H)[1] - 10} fill={MANIM.yellow} fontSize={22} fontWeight={700}>
          {s.mode === "medianas" ? "G" : "H"}
        </text>
        <text x={A[0] - 10} y={A[1] + 22} fill={MANIM.ink} fontSize={18} fontWeight={700} textAnchor="end">A</text>
        <text x={B[0] + 10} y={B[1] + 22} fill={MANIM.ink} fontSize={18} fontWeight={700}>B</text>
        <text x={C[0]} y={C[1] - 14} fill={MANIM.ink} fontSize={18} fontWeight={700} textAnchor="middle">C</text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Paralelogramos ───────────── */

export function ParalelogramoExplorador({ block }: { block: ToolBlock }) {
  const init = {
    a: Math.round(num(block.params?.a, 5, 2, 6)),
    b: Math.round(num(block.params?.b, 3, 2, 6)),
    ang: Math.round(num(block.params?.c, 70, 30, 150)),
  };
  const [p, setP] = useState(init);
  const S = 34;
  const rad = (p.ang * Math.PI) / 180;
  const dx = p.b * S * Math.cos(rad);
  const dy = -p.b * S * Math.sin(rad);
  const minX = Math.min(0, dx);
  const maxX = Math.max(p.a * S, p.a * S + dx);
  const ox = 260 - (minX + maxX) / 2;
  const oy = 150 + (p.b * S * Math.sin(rad)) / 2;
  const A: Pt = [ox, oy];
  const B: Pt = [ox + p.a * S, oy];
  const D: Pt = [ox + dx, oy + dy];
  const C: Pt = [B[0] + dx, B[1] + dy];
  const q = [A, B, C, D] as const;
  const rhombus = p.a === p.b;
  const rightAngles = p.ang === 90;
  const name = rhombus && rightAngles ? "cuadrado" : rhombus ? "rombo" : rightAngles ? "rectángulo" : "romboide";
  const color = name === "cuadrado" ? MANIM.yellow : name === "rombo" ? MANIM.green : name === "rectángulo" ? MANIM.orange : MANIM.blue;
  const diag1 = Math.hypot(C[0] - A[0], C[1] - A[1]) / S;
  const diag2 = Math.hypot(D[0] - B[0], D[1] - B[1]) / S;
  const set = (patch: Partial<typeof p>) => setP((s) => ({ ...s, ...patch }));

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia los lados y el ángulo: ¿cuándo el romboide se convierte en rombo, en rectángulo o en cuadrado?"}
      onReset={() => setP(init)}
      controls={
        <>
          <Slider label="Lado a" value={p.a} min={2} max={6} unit=" cm" color={MANIM.blue} onChange={(a) => set({ a })} />
          <Slider label="Lado b" value={p.b} min={2} max={6} unit=" cm" color={MANIM.green} onChange={(b) => set({ b })} />
          <Slider label="Ángulo en A" value={p.ang} min={30} max={150} unit="°" color={MANIM.orange} onChange={(ang) => set({ ang })} />
          <div className="sm:col-span-2">
            <Presets
              items={[
                { label: "Cuadrado", apply: () => set({ a: 4, b: 4, ang: 90 }) },
                { label: "Rectángulo", apply: () => set({ a: 5, b: 3, ang: 90 }) },
                { label: "Rombo", apply: () => set({ a: 4, b: 4, ang: 60 }) },
                { label: "Romboide", apply: () => set({ a: 5, b: 3, ang: 70 }) },
              ]}
            />
          </div>
        </>
      }
    >
      <Readout>
        <span className="inline-block text-2xl font-bold first-letter:uppercase" style={{ color }}>
          {name}
        </span>
        <span className="text-base text-[color:var(--stage-ink,#fff)]">
          Ángulos: {p.ang}° y {180 - p.ang}° · Diagonales: {cm(diag1)} cm y {cm(diag2)} cm
        </span>
      </Readout>
      <Svg h={300} testId="tool-paralelogramo">
        <polygon points={poly(q)} fill={color} fillOpacity={0.16} stroke={color} strokeWidth={4} strokeLinejoin="round" />
        <Seg a={A} b={C} color={MANIM.muted} width={2} dashed />
        <Seg a={B} b={D} color={MANIM.muted} width={2} dashed />
        {rhombus ? q.map((v, i) => <TickMark key={i} a={v} b={q[(i + 1) % 4]!} color={color} />) : null}
        {rightAngles ? q.map((v, i) => <RightMark key={i} v={v} a={angleOf(v, q[(i + 3) % 4]!)} b={angleOf(v, q[(i + 1) % 4]!)} size={16} color={color} />) : null}
      </Svg>
    </Frame>
  );
}

/* ───────────── Polígono regular: radio, apotema y lado ───────────── */

export function PoligonoRegularExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.n, 6, 3, 12)), r: num(block.params?.a, 6, 2, 10) };
  const [s, setS] = useState({ n: init.n, r: Math.round(init.r) });
  const { n, r } = s;
  const c: Pt = [260, 150];
  const R = 125;
  const rot = 90 + 180 / n; // un lado queda abajo, horizontal
  const v = regularPoints(c, R, n, rot);
  // lado de abajo: entre los vértices cuyo punto medio cae justo debajo del centro
  const bottom = v.reduce<[Pt, Pt]>((best, p, i) => {
    const q = v[(i + 1) % n]!;
    const m = midpoint(p, q);
    const bm = midpoint(best[0], best[1]);
    return m[1] > bm[1] ? [p, q] : best;
  }, [v[0]!, v[1]!]);
  const M = midpoint(bottom[0], bottom[1]);
  const side = 2 * r * Math.sin(Math.PI / n);
  const apo = r * Math.cos(Math.PI / n);
  const top = v.reduce((best, p) => (p[1] < best[1] ? p : best), v[0]!);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el número de lados y el radio. ¿Qué polígono tiene el lado igual al radio?"}
      onReset={() => setS({ n: init.n, r: Math.round(init.r) })}
      controls={
        <>
          <Slider label="Número de lados n" value={n} min={3} max={12} color={MANIM.orange} onChange={(x) => setS((p) => ({ ...p, n: x }))} />
          <Slider label="Radio r" value={r} min={2} max={10} unit=" cm" color={MANIM.yellow} onChange={(x) => setS((p) => ({ ...p, r: x }))} />
        </>
      }
    >
      <Readout>
        <span className="text-xl font-bold" style={{ color: MANIM.yellow }}>
          r = {r} cm
        </span>
        <span className="text-xl font-bold" style={{ color: MANIM.green }}>
          a ≈ {cm(apo)} cm
        </span>
        <span className="text-xl font-bold" style={{ color: MANIM.blue }}>
          l ≈ {cm(side)} cm
        </span>
      </Readout>
      <Svg h={300} testId="tool-poligono-regular">
        <circle cx={c[0]} cy={c[1]} r={R} fill="none" stroke={MANIM.grid} strokeWidth={2} strokeDasharray="8 7" />
        <polygon points={poly(v)} fill={MANIM.blue} fillOpacity={0.14} stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
        <Seg a={c} b={top} color={MANIM.yellow} width={3.5} />
        <Seg a={c} b={M} color={MANIM.green} width={3.5} />
        <Seg a={bottom[0]} b={bottom[1]} color={MANIM.blue} width={6} />
        <RightMark v={M} a={angleOf(M, c)} b={angleOf(M, bottom[1])} size={12} color={MANIM.green} />
        <Dot p={c} color={MANIM.yellow} r={5} />
        <text x={(c[0] + top[0]) / 2 + 10} y={(c[1] + top[1]) / 2} fill={MANIM.yellow} fontSize={20} fontWeight={700}>r</text>
        <text x={c[0] - 12} y={(c[1] + M[1]) / 2 + 8} fill={MANIM.green} fontSize={20} fontWeight={700} textAnchor="end">a</text>
        <text x={(bottom[0][0] + bottom[1][0]) / 2} y={M[1] + 26} fill={MANIM.blue} fontSize={20} fontWeight={700} textAnchor="middle">l</text>
      </Svg>
      <p className="text-base text-[color:var(--stage-ink,#fff)]">
        Comprueba: a² + (l/2)² = {decEs(tidy(apo * apo))} + {decEs(tidy((side / 2) ** 2))} ≈ {decEs(tidy(r * r))} = r².
      </p>
    </Frame>
  );
}

/* ───────────── Recta y circunferencia ───────────── */

export function CircRectaExplorador({ block }: { block: ToolBlock }) {
  const init = { d: num(block.params?.a, 6, 0, 8), r: Math.round(num(block.params?.b, 3, 1, 5)) };
  const [s, setS] = useState({ d: Math.round(init.d * 2) / 2, r: init.r });
  const K = 24;
  const c: Pt = [260, 215];
  const y = c[1] - s.d * K;
  const kind = s.d > s.r ? "exteriores" : s.d === s.r ? "tangentes" : "secantes";
  const color = kind === "exteriores" ? MANIM.green : kind === "tangentes" ? MANIM.yellow : MANIM.orange;
  const chord = 2 * Math.sqrt(Math.max(0, s.r * s.r - s.d * s.d));
  const half = (chord / 2) * K;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Acerca la recta al centro: ¿cuánto vale d cuando solo toca en un punto?"}
      onReset={() => setS({ d: Math.round(init.d * 2) / 2, r: init.r })}
      controls={
        <>
          <Slider label="Distancia d del centro a la recta" value={s.d} min={0} max={8} step={0.5} format={decEs} unit=" cm" color={MANIM.orange} onChange={(d) => setS((p) => ({ ...p, d }))} />
          <Slider label="Radio r" value={s.r} min={1} max={5} unit=" cm" color={MANIM.blue} onChange={(r) => setS((p) => ({ ...p, r }))} />
        </>
      }
    >
      <Readout>
        <span className="inline-block text-2xl font-bold first-letter:uppercase" style={{ color }}>
          Recta y circunferencia: {kind}
        </span>
        <span className="text-base text-[color:var(--stage-ink,#fff)]">
          d = {decEs(s.d)} cm {kind === "exteriores" ? ">" : kind === "tangentes" ? "=" : "<"} r = {s.r} cm ·{" "}
          {kind === "exteriores" ? "0 puntos comunes" : kind === "tangentes" ? "1 punto común" : `2 puntos comunes (cuerda de ${cm(chord)} cm)`}
        </span>
      </Readout>
      <Svg h={340} testId="tool-circ-recta">
        <circle cx={c[0]} cy={c[1]} r={s.r * K} fill={MANIM.blue} fillOpacity={0.14} stroke={MANIM.blue} strokeWidth={4} />
        <Dot p={c} color={MANIM.yellow} r={5} />
        <line x1={40} y1={y} x2={480} y2={y} stroke={color} strokeWidth={4} strokeLinecap="round" className="anim-t" />
        {s.d > 0 ? <Seg a={c} b={[c[0], y]} color={MANIM.yellow} width={2.5} dashed /> : null}
        {kind === "tangentes" ? (
          <>
            <Dot p={[c[0], y]} color={MANIM.red} r={7} />
            <RightMark v={[c[0], y]} a={270} b={0} size={14} color={MANIM.ink} />
          </>
        ) : null}
        {kind === "secantes" ? (
          <>
            <Dot p={[c[0] - half, y]} color={MANIM.red} r={7} />
            <Dot p={[c[0] + half, y]} color={MANIM.red} r={7} />
          </>
        ) : null}
      </Svg>
    </Frame>
  );
}

/* ───────────── Dos circunferencias ───────────── */

export function CircCircExplorador({ block }: { block: ToolBlock }) {
  const init = { R: Math.round(num(block.params?.a, 4, 2, 5)), r: Math.round(num(block.params?.b, 2, 1, 5)), d: Math.round(num(block.params?.c, 5, 0, 10) * 2) / 2 };
  const [s, setS] = useState({ ...init, r: Math.min(init.r, init.R) });
  const { R, r, d } = s;
  const K = 22;
  const total = Math.max(R, d + r) + R;
  const left = 260 - (total * K) / 2 + R * K;
  const O1: Pt = [left, 150];
  const O2: Pt = [left + d * K, 150];

  let name: string;
  if (d === 0) {
    name = R === r ? "coincidentes (la misma circunferencia)" : "concéntricas";
  } else if (d > R + r) {
    name = "exteriores";
  } else if (d === R + r) {
    name = "tangentes exteriores";
  } else if (d > R - r) {
    name = "secantes";
  } else if (d === R - r) {
    name = "tangentes interiores";
  } else {
    name = "interiores";
  }
  const touches = name === "tangentes exteriores" || name === "tangentes interiores";
  const color = touches ? MANIM.yellow : name === "secantes" ? MANIM.orange : name.startsWith("exteriores") ? MANIM.green : MANIM.purple;
  let cut: Pt[] = [];
  if (name === "secantes") {
    const x = (d * d + R * R - r * r) / (2 * d);
    const h = Math.sqrt(Math.max(0, R * R - x * x));
    cut = [[O1[0] + x * K, O1[1] - h * K], [O1[0] + x * K, O1[1] + h * K]];
  } else if (touches) {
    cut = [[O1[0] + R * K, O1[1]]];
  }

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve la segunda circunferencia y compara d con R + r y con R − r."}
      onReset={() => setS({ ...init, r: Math.min(init.r, init.R) })}
      controls={
        <>
          <Slider label="Radio R" value={R} min={2} max={5} unit=" cm" color={MANIM.blue} onChange={(x) => setS((p) => ({ ...p, R: x, r: Math.min(p.r, x) }))} />
          <Slider label="Radio r" value={r} min={1} max={R} unit=" cm" color={MANIM.orange} onChange={(x) => setS((p) => ({ ...p, r: x }))} />
          <Slider label="Distancia d entre centros" value={d} min={0} max={10} step={0.5} format={decEs} unit=" cm" color={MANIM.yellow} onChange={(x) => setS((p) => ({ ...p, d: x }))} />
        </>
      }
    >
      <Readout>
        <span className="inline-block text-2xl font-bold first-letter:uppercase" style={{ color }}>
          {name}
        </span>
        <span className="text-base text-[color:var(--stage-ink,#fff)]">
          d = {decEs(d)} · R + r = {R + r} · R − r = {R - r}
        </span>
      </Readout>
      <Svg h={300} testId="tool-circ-circ">
        <circle cx={O1[0]} cy={O1[1]} r={R * K} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.blue} strokeWidth={4} />
        <circle cx={O2[0]} cy={O2[1]} r={r * K} fill={MANIM.orange} fillOpacity={0.16} stroke={MANIM.orange} strokeWidth={4} className="anim-t" />
        <Dot p={O1} color={MANIM.blue} r={5} />
        <Dot p={O2} color={MANIM.orange} r={5} />
        {d > 0 ? <Seg a={O1} b={O2} color={MANIM.yellow} width={2.5} dashed /> : null}
        {cut.map((p, i) => (
          <Dot key={i} p={p} color={MANIM.red} r={7} />
        ))}
      </Svg>
    </Frame>
  );
}
