"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { fracTex, fracValue, relTex, shareEquation, solveLinear, solveLinearInequality, solveQuadratic, TANTEOS, type Rel } from "@/components/lesson/anim/eq";
import { evaluate, mul, polyTex } from "@/components/lesson/anim/poly";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const seg = (label: string, on: boolean, onClick: () => void, key?: string) => (
  <button key={key ?? label} type="button" className={`${TOOL_BTN} ${on ? "border-white bg-white/20" : ""}`} aria-pressed={on} onClick={onClick}>
    {label}
  </button>
);
const f = (x: number) => String(x).replace("-", "−");
const num = (x: number, d = 3) => fmtEs(x, d).replace(",", "{,}").replace(/ /g, "\\ ").replace("−", "-");

/* ───────────── Tanteo ───────────── */

export function TanteoExplorador({ block }: { block: ToolBlock }) {
  const idx0 = int(block.params?.a, 0, 0, TANTEOS.length - 1);
  const [idx, setIdx] = useState(idx0);
  const [x10, setX10] = useState(int(block.params?.b, 20, 0, 100));
  const t = TANTEOS[idx]!;
  const x = x10 / 10;
  const val = t.f(x);
  const diff = val - t.target;
  const hit = Math.abs(diff) < 1e-9 * Math.max(1, t.target);
  const W = 420;
  const H = 150;
  const pts = Array.from({ length: 101 }, (_, i) => i / 10).map((xx) => [xx, t.f(xx)] as const);
  const ymax = t.target * 2;
  const px = (xx: number) => 20 + (xx / 10) * (W - 40);
  const py = (y: number) => H - 14 - (clamp(y, 0, ymax) / ymax) * (H - 28);
  const path = pts.map(([xx, y], i) => `${i === 0 ? "M" : "L"} ${px(xx).toFixed(1)} ${py(y).toFixed(1)}`).join(" ");

  return (
    <Frame
      hint={block.hint ?? "Acerca el valor de x hasta que los dos miembros coincidan. Con décimas, acota la solución entre dos valores consecutivos."}
      onReset={() => {
        setIdx(idx0);
        setX10(int(block.params?.b, 20, 0, 100));
      }}
      controls={
        <>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Ecuación">
            {TANTEOS.map((e, i) => (
              <button key={e.id} type="button" className={`${TOOL_BTN} ${i === idx ? "border-white bg-white/20" : ""}`} aria-pressed={i === idx} aria-label={`Ecuación ${i + 1}`} onClick={() => setIdx(i)}>
                <MathRenderer text={`$${e.tex}$`} />
              </button>
            ))}
          </div>
          <Slider label="Valor de x" value={x10} min={0} max={100} color={MANIM.yellow} onChange={setX10} format={(v) => fmtEs(v / 10, 1)} />
        </>
      }
    >
      <div className="text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${t.tex}$`} className="text-2xl" />
        <MathRenderer text={`Para $x = ${num(x, 1)}$: miembro izquierdo $= ${num(val, 3)}$`} className="text-lg" />
        <p className="mt-1 text-lg font-semibold" style={{ color: hit ? MANIM.green : diff < 0 ? MANIM.blue : MANIM.orange }} data-testid="tool-tanteo-estado">
          {hit ? "¡Es solución exacta!" : diff < 0 ? "Se queda corto: prueba un valor mayor" : "Se pasa: prueba un valor menor"}
        </p>
      </div>
      <Svg w={W} h={H} testId="tool-tanteo">
        <line x1={20} y1={H - 14} x2={W - 20} y2={H - 14} stroke={MANIM.grid} strokeWidth={2} />
        <path d={path} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <line x1={20} y1={py(t.target)} x2={W - 20} y2={py(t.target)} stroke={MANIM.orange} strokeWidth={2} strokeDasharray="6 5" />
        <circle cx={px(x)} cy={py(val)} r={6} fill={hit ? MANIM.green : MANIM.yellow} className="anim-t" />
      </Svg>
    </Frame>
  );
}

/* ───────────── Ecuación lineal ax + b = cx + d ───────────── */

export function EcuacionLinealExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 3, -9, 9), b: int(ini[1], 15, -20, 20), c: int(ini[2], 1, -9, 9), d: int(ini[3], 1, -20, 20) };
  const [v, setV] = useState(init);
  const sol = solveLinear(v.a, v.b, v.c, v.d);
  const lin = (k: number, c0: number) => polyTex([c0, k]);
  const A = v.a - v.c;
  const B = v.d - v.b;

  return (
    <Frame
      hint={block.hint ?? "Haz que los coeficientes de x sean iguales a los dos lados: según los términos independientes, la ecuación no tendrá solución o será una identidad."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="a (x a la izquierda)" value={v.a} min={-9} max={9} color={MANIM.blue} onChange={(a) => setV((p) => ({ ...p, a }))} format={f} />
          <Slider label="b (número a la izquierda)" value={v.b} min={-20} max={20} color={MANIM.blue} onChange={(b) => setV((p) => ({ ...p, b }))} format={f} />
          <Slider label="c (x a la derecha)" value={v.c} min={-9} max={9} color={MANIM.orange} onChange={(c) => setV((p) => ({ ...p, c }))} format={f} />
          <Slider label="d (número a la derecha)" value={v.d} min={-20} max={20} color={MANIM.orange} onChange={(d) => setV((p) => ({ ...p, d }))} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${lin(v.a, v.b)} = ${lin(v.c, v.d)}$`} className="text-3xl" />
        <MathRenderer text={`$${v.a === v.c ? "0" : polyTex([0, A])} = ${B}$ (x a un lado, números al otro)`} className="text-lg" />
        <p className="text-xl font-bold" style={{ color: sol.kind === "unica" ? MANIM.green : MANIM.red }} data-testid="tool-lineal-tipo">
          {sol.kind === "unica" ? <MathRenderer text={`$x = ${fracTex(sol.x)}$`} className="inline" /> : sol.kind === "sin" ? "Sin solución: es imposible" : "Identidad: todos los valores de x son solución"}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── Ecuación de segundo grado ───────────── */

export function CuadraticaExplorador({ block }: { block: ToolBlock }) {
  const init = { a: int(block.params?.a, 1, -5, 5), b: int(block.params?.b, 1, -10, 10), c: int(block.params?.c, -2, -10, 10) };
  const [v, setV] = useState(init);
  const a = v.a === 0 ? 1 : v.a;
  const s = solveQuadratic(a, v.b, v.c);
  const W = 420;
  const H = 160;
  const lo = -6;
  const hi = 6;
  const px = (x: number) => 20 + ((x - lo) / (hi - lo)) * (W - 40);
  const ys = Array.from({ length: 121 }, (_, i) => lo + (i * (hi - lo)) / 120).map((x) => [x, a * x * x + v.b * x + v.c] as const);
  const ymax = 12;
  const py = (y: number) => H / 2 - (clamp(y, -ymax, ymax) / ymax) * (H / 2 - 8);
  const path = ys.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${px(x).toFixed(1)} ${py(y).toFixed(1)}`).join(" ");
  const caso = s.kind === "dos" ? "dos soluciones (b² − 4ac > 0)" : s.kind === "una" ? "una solución (b² − 4ac = 0)" : "ninguna solución real (b² − 4ac < 0)";

  return (
    <Frame
      hint={block.hint ?? "Mueve c y mira cómo sube y baja la parábola: el discriminante decide si corta al eje, lo toca o no lo alcanza."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="a" value={v.a} min={-5} max={5} color={MANIM.blue} onChange={(a) => setV((p) => ({ ...p, a }))} format={f} />
          <Slider label="b" value={v.b} min={-10} max={10} color={MANIM.green} onChange={(b) => setV((p) => ({ ...p, b }))} format={f} />
          <Slider label="c" value={v.c} min={-10} max={10} color={MANIM.orange} onChange={(c) => setV((p) => ({ ...p, c }))} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${polyTex([v.c, v.b, a])} = 0$`} className="text-2xl" />
        <MathRenderer text={`$b^2 - 4ac = ${s.disc}$`} className="text-lg" />
        <p className="text-lg font-semibold" style={{ color: s.kind === "ninguna" ? MANIM.red : MANIM.green }} data-testid="tool-cuad-caso">{caso}{v.a === 0 ? " · a = 0 no vale: se usa a = 1" : ""}</p>
        {s.roots.length > 0 ? (
          <MathRenderer text={s.roots.map((r, i) => `$x_${i + 1} = ${r.tex}$`).join("  ·  ")} className="text-lg" />
        ) : null}
      </div>
      <Svg w={W} h={H} testId="tool-cuadratica">
        <line x1={20} y1={H / 2} x2={W - 20} y2={H / 2} stroke={MANIM.grid} strokeWidth={2} />
        <line x1={px(0)} y1={6} x2={px(0)} y2={H - 6} stroke={MANIM.grid} strokeWidth={2} />
        <path d={path} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        {s.roots.map((r, i) => (r.value >= lo && r.value <= hi ? <circle key={i} cx={px(r.value)} cy={H / 2} r={7} fill={MANIM.yellow} /> : null))}
      </Svg>
    </Frame>
  );
}

/* ───────────── Producto cero: raíces y factores ───────────── */

export function RaicesFactoresExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { r1: int(ini[0], 1, -5, 5), r2: int(ini[1], 2, -5, 5), r3: int(ini[2], 3, -5, 5), three: ini[3] !== 0 };
  const [v, setV] = useState(init);
  const factors = v.three ? [v.r1, v.r2, v.r3] : [v.r1, v.r2];
  const P = factors.map((r) => [-r, 1]).reduce((acc, p) => mul(acc, p), [1]);
  const W = 420;
  const H = 150;
  const px = (x: number) => 20 + ((x + 6) / 12) * (W - 40);
  const xs = Array.from({ length: 121 }, (_, i) => -6 + i / 10);
  const ymax = 30;
  const py = (y: number) => H / 2 - (clamp(y, -ymax, ymax) / ymax) * (H / 2 - 8);
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${px(x).toFixed(1)} ${py(evaluate(P, x)).toFixed(1)}`).join(" ");
  const ftex = (r: number) => (r === 0 ? "x" : r > 0 ? `(x - ${r})` : `(x + ${-r})`);
  const sols = [...new Set(factors)].sort((p, q) => p - q);

  return (
    <Frame
      hint={block.hint ?? "Un producto vale 0 si algún factor vale 0: cada raíz que eliges es un punto donde la curva corta al eje."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Raíz 1" value={v.r1} min={-5} max={5} color={MANIM.blue} onChange={(r1) => setV((p) => ({ ...p, r1 }))} format={f} />
          <Slider label="Raíz 2" value={v.r2} min={-5} max={5} color={MANIM.green} onChange={(r2) => setV((p) => ({ ...p, r2 }))} format={f} />
          {v.three ? <Slider label="Raíz 3" value={v.r3} min={-5} max={5} color={MANIM.orange} onChange={(r3) => setV((p) => ({ ...p, r3 }))} format={f} /> : null}
          <div className="flex gap-2">
            {seg("2 factores", !v.three, () => setV((p) => ({ ...p, three: false })), "2")}
            {seg("3 factores", v.three, () => setV((p) => ({ ...p, three: true })), "3")}
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${factors.map(ftex).join("")} = 0$`} className="text-2xl" />
        <MathRenderer text={`$${polyTex(P)} = 0$`} className="text-xl" />
        <p className="text-lg" data-testid="tool-raices">Soluciones: {sols.map(f).join(", ")}</p>
      </div>
      <Svg w={W} h={H} testId="tool-raices-grafica">
        <line x1={20} y1={H / 2} x2={W - 20} y2={H / 2} stroke={MANIM.grid} strokeWidth={2} />
        <path d={path} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        {sols.map((r) => (
          <circle key={r} cx={px(r)} cy={H / 2} r={7} fill={MANIM.yellow} />
        ))}
      </Svg>
    </Frame>
  );
}

/* ───────────── Reparto con renuncias ───────────── */

export function RepartoEcuacionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { total: int(ini[0], 2000, 100, 5000), q: int(ini[1], 4, 1, 10), delta: int(ini[2], 25, 1, 50) };
  const [v, setV] = useState(init);
  const r = shareEquation(v.total, v.q, v.delta);
  const n = Math.round(r.n * 1000) / 1000;
  const whole = Number.isInteger(n);

  return (
    <Frame
      hint={block.hint ?? "Cambia el total, cuántos fallan y cuánto más paga cada uno. Solo tiene sentido una solución positiva y entera."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Gasto total (€)" value={v.total} min={100} max={5000} step={50} color={MANIM.yellow} onChange={(total) => setV((p) => ({ ...p, total }))} format={(x) => fmtEs(x, 0)} />
          <Slider label="Personas que fallan" value={v.q} min={1} max={10} color={MANIM.orange} onChange={(q) => setV((p) => ({ ...p, q }))} />
          <Slider label="Lo que paga cada uno de más (€)" value={v.delta} min={1} max={50} color={MANIM.green} onChange={(delta) => setV((p) => ({ ...p, delta }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\dfrac{${v.total}}{x - ${v.q}} = \\dfrac{${v.total}}{x} + ${v.delta}$`} className="text-2xl" />
        <MathRenderer text={`$x^2 - ${v.q}x - ${num((v.total * v.q) / v.delta)} = 0$`} className="text-lg" />
        <MathRenderer text={`$x_1 = ${num(r.n)}$ y $x_2 = ${num(r.other)}$`} className="text-xl" />
        <p className="text-lg font-semibold" style={{ color: whole ? MANIM.green : MANIM.orange }} data-testid="tool-reparto-ec">
          {whole ? `Había ${n} personas (la solución negativa no vale)` : "La solución no es un número entero de personas: ese caso no es posible"}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── Inecuación de primer grado ───────────── */

const RELS: { rel: Rel; label: string }[] = [
  { rel: "<", label: "<" },
  { rel: "<=", label: "≤" },
  { rel: ">", label: ">" },
  { rel: ">=", label: "≥" },
];

export function InecuacionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], -2, -5, 5), b: int(ini[1], 1, -9, 9), c: int(ini[2], 7, -9, 9), rel: (RELS[int(ini[3], 2, 0, 3)]!.rel) as Rel };
  const [v, setV] = useState(init);
  const a = v.a === 0 ? 1 : v.a;
  const sol = solveLinearInequality(a, v.b, v.rel, v.c);
  const bound = fracValue(sol.bound);
  const W = 420;
  const px = (x: number) => 20 + ((x + 8) / 16) * (W - 40);
  const bx = px(clamp(bound, -8, 8));
  const closed = sol.rel === "<=" || sol.rel === ">=";
  const right = sol.rel === ">" || sol.rel === ">=";

  return (
    <Frame
      hint={block.hint ?? "Pon un coeficiente negativo en x: al despejar, el sentido de la desigualdad se invierte."}
      onReset={() => setV(init)}
      controls={
        <>
          <div className="flex gap-2">{RELS.map((r) => seg(r.label, v.rel === r.rel, () => setV((p) => ({ ...p, rel: r.rel })), r.rel))}</div>
          <Slider label="a (coeficiente de x)" value={v.a} min={-5} max={5} color={MANIM.blue} onChange={(a2) => setV((p) => ({ ...p, a: a2 }))} format={f} />
          <Slider label="b" value={v.b} min={-9} max={9} color={MANIM.green} onChange={(b) => setV((p) => ({ ...p, b }))} format={f} />
          <Slider label="c" value={v.c} min={-9} max={9} color={MANIM.orange} onChange={(c) => setV((p) => ({ ...p, c }))} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${polyTex([v.b, a])} ${relTex(v.rel)} ${v.c}$`} className="text-2xl" />
        <MathRenderer text={`$x ${relTex(sol.rel)} ${fracTex(sol.bound)}$`} className="text-3xl" />
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-ineq-nota">
          {sol.flipped ? "Se dividió entre un número negativo: la desigualdad se invirtió." : "Se dividió entre un número positivo: la desigualdad no cambia."}
        </p>
      </div>
      <Svg w={W} h={70} testId="tool-inecuacion">
        <line x1={20} y1={34} x2={W - 20} y2={34} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
        <line x1={right ? bx : 12} y1={34} x2={right ? W - 12 : bx} y2={34} stroke={MANIM.green} strokeWidth={8} strokeLinecap="round" />
        <circle cx={bx} cy={34} r={9} fill={closed ? MANIM.green : MANIM.panel} stroke={MANIM.green} strokeWidth={3} />
        {[-8, -4, 0, 4, 8].map((t) => (
          <text key={t} x={px(t)} y={62} fontSize={13} textAnchor="middle" fill={MANIM.muted}>{f(t)}</text>
        ))}
      </Svg>
    </Frame>
  );
}
