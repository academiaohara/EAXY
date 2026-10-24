"use client";

import { useState, type ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import {
  angleBetween, angleLines, conic, distPointLine, dot, intersect, lineFromPointDir, lineText,
  mediatriz, norm, normalizeLine, position, projScalar, type ConicKind, type Line, type V2,
} from "@/components/lesson/anim/geo";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const f = (x: number) => String(x).replace("-", "−");
const g = (x: number, d = 3) => fmtEs(x, d);
const ink = "text-[color:var(--stage-ink,#fff)]";

const PW = 520;
const PH = 340;

/** Plano cartesiano con rejilla; `children` recibe las funciones de conversión a píxeles. */
function Plane({ range, testId, children }: { range: number; testId: string; children: (px: (x: number) => number, py: (y: number) => number) => ReactNode }) {
  const u = Math.min(PW, PH) / (2 * range);
  const px = (x: number) => PW / 2 + x * u;
  const py = (y: number) => PH / 2 - y * u;
  const ticks = Array.from({ length: 2 * range + 1 }, (_, i) => i - range);
  return (
    <Svg w={PW} h={PH} testId={testId}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={0} x2={px(t)} y2={PH} stroke={MANIM.grid} strokeWidth={t === 0 ? 0 : 0.8} opacity={0.6} />
          <line x1={0} y1={py(t)} x2={PW} y2={py(t)} stroke={MANIM.grid} strokeWidth={t === 0 ? 0 : 0.8} opacity={0.6} />
        </g>
      ))}
      <line x1={0} y1={PH / 2} x2={PW} y2={PH / 2} stroke={MANIM.ink} strokeWidth={1.6} />
      <line x1={PW / 2} y1={0} x2={PW / 2} y2={PH} stroke={MANIM.ink} strokeWidth={1.6} />
      {children(px, py)}
    </Svg>
  );
}

/** Recta Ax + By + C = 0 recortada a la ventana [−R, R]. */
function LineSeg({ l, range, px, py, color, dashed = false }: { l: Line; range: number; px: (x: number) => number; py: (y: number) => number; color: string; dashed?: boolean }) {
  const R = range * 1.2;
  if (Math.abs(l.B) > 1e-9) {
    const y = (x: number) => (-l.A * x - l.C) / l.B;
    return <line x1={px(-R)} y1={py(y(-R))} x2={px(R)} y2={py(y(R))} stroke={color} strokeWidth={3} strokeDasharray={dashed ? "7 6" : undefined} />;
  }
  const x = -l.C / l.A;
  return <line x1={px(x)} y1={py(-R)} x2={px(x)} y2={py(R)} stroke={color} strokeWidth={3} strokeDasharray={dashed ? "7 6" : undefined} />;
}

const pt = (p: V2, px: (x: number) => number, py: (y: number) => number, color: string, r = 5) => <circle cx={px(p.x)} cy={py(p.y)} r={r} fill={color} />;


/* ───────────── Producto escalar ───────────── */

/** u·v, módulos, ángulo y perpendicularidad con la proyección de u sobre v. */
export function ProductoEscalarExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { ux: int(ini[0], 3, -6, 6), uy: int(ini[1], 2, -6, 6), vx: int(ini[2], 4, -6, 6), vy: int(ini[3], -1, -6, 6) };
  const [v, setV] = useState(init);
  const u: V2 = { x: v.ux, y: v.uy };
  const w: V2 = { x: v.vx, y: v.vy };
  const d = dot(u, w);
  const ang = angleBetween(u, w);
  const pr = projScalar(u, w);
  const nw = norm(w);
  const foot: V2 | null = pr === null ? null : { x: (w.x / nw) * pr, y: (w.y / nw) * pr };
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  return (
    <Frame
      hint={block.hint ?? "Busca dos vectores perpendiculares: su producto escalar vale 0. Cambia el signo de uno y observa si el ángulo pasa de agudo a obtuso."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="u: componente x" value={v.ux} min={-6} max={6} color={MANIM.blue} onChange={set("ux")} format={f} />
          <Slider label="u: componente y" value={v.uy} min={-6} max={6} color={MANIM.blue} onChange={set("uy")} format={f} />
          <Slider label="v: componente x" value={v.vx} min={-6} max={6} color={MANIM.orange} onChange={set("vx")} format={f} />
          <Slider label="v: componente y" value={v.vy} min={-6} max={6} color={MANIM.orange} onChange={set("vy")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-pe-dot">{`u·v = ${f(v.ux)}·${f(v.vx)} + ${f(v.uy)}·${f(v.vy)} = ${f(d)}`}</p>
        <p className="text-lg" data-testid="tool-pe-modulos">{`|u| = ${g(norm(u))}   |v| = ${g(norm(w))}`}</p>
        <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-pe-angulo">{ang === null ? "Un vector es nulo: no hay ángulo" : `θ = ${g(ang, 1)}°`}</p>
        <p className="text-lg" style={{ color: Math.abs(d) < 1e-9 && ang !== null ? MANIM.yellow : MANIM.muted }} data-testid="tool-pe-tipo">
          {ang === null ? "" : Math.abs(d) < 1e-9 ? "Perpendiculares: u·v = 0" : d > 0 ? "Ángulo agudo (u·v > 0)" : "Ángulo obtuso (u·v < 0)"}
        </p>
      </div>
      <Plane range={7} testId="tool-pe-plano">
        {(px, py) => (
          <>
            <line x1={px(0)} y1={py(0)} x2={px(w.x)} y2={py(w.y)} stroke={MANIM.orange} strokeWidth={4} />
            <line x1={px(0)} y1={py(0)} x2={px(u.x)} y2={py(u.y)} stroke={MANIM.blue} strokeWidth={4} />
            {foot ? <line x1={px(u.x)} y1={py(u.y)} x2={px(foot.x)} y2={py(foot.y)} stroke={MANIM.green} strokeWidth={2} strokeDasharray="5 4" /> : null}
            {pt(u, px, py, MANIM.blue, 6)}
            {pt(w, px, py, MANIM.orange, 6)}
          </>
        )}
      </Plane>
    </Frame>
  );
}

/* ───────────── Formas de la ecuación de la recta ───────────── */

/** Una recta por punto y vector director en todas sus formas. */
export function RectaFormasExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { px: int(ini[0], 1, -6, 6), py: int(ini[1], 2, -6, 6), dx: int(ini[2], 2, -6, 6), dy: int(ini[3], 3, -6, 6) };
  const [v, setV] = useState(init);
  const dx = v.dx;
  const dy = v.dy;
  const nulo = dx === 0 && dy === 0;
  const l = nulo ? null : normalizeLine(lineFromPointDir({ x: v.px, y: v.py }, { x: dx, y: dy }));
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const sgn = (n: number, c: string) => (n === 0 ? "" : `${n < 0 ? " − " : " + "}${Math.abs(n)}${c}`);
  const cont = nulo ? "" : dx === 0 ? `x = ${f(v.px)}` : dy === 0 ? `y = ${f(v.py)}` : `(x ${v.px < 0 ? "+" : "−"} ${Math.abs(v.px)})/${f(dx)} = (y ${v.py < 0 ? "+" : "−"} ${Math.abs(v.py)})/${f(dy)}`;
  const m = dx === 0 ? null : dy / dx;
  const n0 = m === null ? null : v.py - m * v.px;
  return (
    <Frame
      hint={block.hint ?? "Mueve el punto y el vector director: todas las ecuaciones describen la misma recta. Con dx = 0 la recta es vertical y no tiene pendiente."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Punto: x₀" value={v.px} min={-6} max={6} color={MANIM.blue} onChange={set("px")} format={f} />
          <Slider label="Punto: y₀" value={v.py} min={-6} max={6} color={MANIM.blue} onChange={set("py")} format={f} />
          <Slider label="Vector director: dx" value={dx} min={-6} max={6} color={MANIM.orange} onChange={set("dx")} format={f} />
          <Slider label="Vector director: dy" value={dy} min={-6} max={6} color={MANIM.orange} onChange={set("dy")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 text-base ${ink}`} data-testid="tool-readout">
        {nulo ? (
          <p className="text-lg font-bold" style={{ color: MANIM.red }} data-testid="tool-rf-general">El vector director no puede ser nulo</p>
        ) : (
          <>
            <p data-testid="tool-rf-vectorial">{`Vectorial: (x, y) = (${f(v.px)}, ${f(v.py)}) + t·(${f(dx)}, ${f(dy)})`}</p>
            <p data-testid="tool-rf-parametricas">{`Paramétricas: x = ${f(v.px)}${sgn(dx, "t")},  y = ${f(v.py)}${sgn(dy, "t")}`}</p>
            <p data-testid="tool-rf-continua">{`Continua: ${cont}`}</p>
            <p className="font-bold" style={{ color: MANIM.green }} data-testid="tool-rf-general">{`General: ${lineText(l!)}`}</p>
            <p data-testid="tool-rf-explicita">{m === null ? "Explícita: no existe (recta vertical)" : `Explícita: y = ${fmtEs(m, 3)}x ${n0! < 0 ? "−" : "+"} ${fmtEs(Math.abs(n0!), 3)}`}</p>
          </>
        )}
      </div>
      <Plane range={8} testId="tool-rf-plano">
        {(px, py) => (
          <>
            {l ? <LineSeg l={l} range={8} px={px} py={py} color={MANIM.green} /> : null}
            {nulo ? null : <line x1={px(v.px)} y1={py(v.py)} x2={px(v.px + dx)} y2={py(v.py + dy)} stroke={MANIM.orange} strokeWidth={4} />}
            {pt({ x: v.px, y: v.py }, px, py, MANIM.blue, 6)}
          </>
        )}
      </Plane>
    </Frame>
  );
}

/* ───────────── Dos rectas: posición y ángulo ───────────── */

/** Dos rectas Ax + By = C: posición relativa, punto de corte y ángulo. */
export function RectasAnguloExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = {
    a1: int(ini[0], 1, -5, 5), b1: int(ini[1], 1, -5, 5), c1: int(ini[2], 4, -10, 10),
    a2: int(ini[3], 1, -5, 5), b2: int(ini[4], -1, -5, 5), c2: int(ini[5], 1, -10, 10),
  };
  const [v, setV] = useState(init);
  const valid1 = v.a1 !== 0 || v.b1 !== 0;
  const valid2 = v.a2 !== 0 || v.b2 !== 0;
  const l1: Line = { A: v.a1, B: v.b1, C: -v.c1 };
  const l2: Line = { A: v.a2, B: v.b2, C: -v.c2 };
  const ok = valid1 && valid2;
  const pos = ok ? position(l1, l2) : null;
  const cut = ok ? intersect(l1, l2) : null;
  const ang = ok ? angleLines(l1, l2) : null;
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const eq = (a: number, b: number, c: number) => lineText({ A: a, B: b, C: 0 }, (n) => String(n)).replace(" = 0", ` = ${f(c)}`);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Haz las dos rectas paralelas (mismos A y B proporcionales) y cambia C: pasan de paralelas a coincidentes. Busca A₁A₂ + B₁B₂ = 0: son perpendiculares."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="A₁" value={v.a1} min={-5} max={5} color={MANIM.blue} onChange={set("a1")} format={f} />
          <Slider label="B₁" value={v.b1} min={-5} max={5} color={MANIM.blue} onChange={set("b1")} format={f} />
          <Slider label="C₁" value={v.c1} min={-10} max={10} color={MANIM.blue} onChange={set("c1")} format={f} />
          <Slider label="A₂" value={v.a2} min={-5} max={5} color={MANIM.orange} onChange={set("a2")} format={f} />
          <Slider label="B₂" value={v.b2} min={-5} max={5} color={MANIM.orange} onChange={set("b2")} format={f} />
          <Slider label="C₂" value={v.c2} min={-10} max={10} color={MANIM.orange} onChange={set("c2")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg">{`r₁: ${valid1 ? eq(v.a1, v.b1, v.c1) : "no es una recta"}      r₂: ${valid2 ? eq(v.a2, v.b2, v.c2) : "no es una recta"}`}</p>
        <p className="text-2xl font-bold capitalize" style={{ color: MANIM.green }} data-testid="tool-rg-posicion">{pos ?? "Hace falta que A y B no sean ambos 0"}</p>
        <p className="text-lg" data-testid="tool-rg-corte">{cut ? `Punto de corte: (${g(cut.x, 2)}, ${g(cut.y, 2)})` : pos === "paralelas" ? "No se cortan" : pos === "coincidentes" ? "Infinitos puntos comunes" : ""}</p>
        <p className="text-lg" data-testid="tool-rg-angulo">{ang === null || pos !== "secantes" ? "" : `Ángulo entre ellas: ${g(ang, 1)}°${Math.abs(ang - 90) < 1e-6 ? " (perpendiculares)" : ""}`}</p>
      </div>
      <Plane range={8} testId="tool-rg-plano">
        {(px, py) => (
          <>
            {valid1 ? <LineSeg l={l1} range={8} px={px} py={py} color={MANIM.blue} /> : null}
            {valid2 ? <LineSeg l={l2} range={8} px={px} py={py} color={MANIM.orange} dashed={pos === "coincidentes"} /> : null}
            {cut ? pt(cut, px, py, MANIM.yellow, 6) : null}
          </>
        )}
      </Plane>
    </Frame>
  );
}

/* ───────────── Distancia de un punto a una recta ───────────── */

/** d(P, r) = |Ax₀ + By₀ + C| / √(A² + B²) con el pie de la perpendicular. */
export function DistanciaPuntoRectaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 3, -5, 5), b: int(ini[1], 4, -5, 5), c: int(ini[2], -5, -12, 12), px: int(ini[3], 2, -6, 6), py: int(ini[4], 3, -6, 6) };
  const [v, setV] = useState(init);
  const valid = v.a !== 0 || v.b !== 0;
  const l: Line = { A: v.a, B: v.b, C: v.c };
  const p: V2 = { x: v.px, y: v.py };
  const num = Math.abs(v.a * v.px + v.b * v.py + v.c);
  const den = Math.hypot(v.a, v.b);
  const d = valid ? distPointLine(p, l) : 0;
  const t = valid ? -(v.a * v.px + v.b * v.py + v.c) / (v.a * v.a + v.b * v.b) : 0;
  const foot: V2 = { x: v.px + v.a * t, y: v.py + v.b * t };
  const set = (k: keyof typeof init) => (n: number) => setV((q) => ({ ...q, [k]: n }));
  return (
    <Frame
      hint={block.hint ?? "Con 3x + 4y − 5 = 0 y P(2, 3) la distancia es 13/5 = 2,6. Mueve P hasta la recta: la distancia es 0."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="A" value={v.a} min={-5} max={5} color={MANIM.blue} onChange={set("a")} format={f} />
          <Slider label="B" value={v.b} min={-5} max={5} color={MANIM.blue} onChange={set("b")} format={f} />
          <Slider label="C" value={v.c} min={-12} max={12} color={MANIM.blue} onChange={set("c")} format={f} />
          <Slider label="Punto: x₀" value={v.px} min={-6} max={6} color={MANIM.orange} onChange={set("px")} format={f} />
          <Slider label="Punto: y₀" value={v.py} min={-6} max={6} color={MANIM.orange} onChange={set("py")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        {valid ? (
          <>
            <p className="text-lg" data-testid="tool-dp-formula">{`d = |${f(v.a)}·${f(v.px)} + ${f(v.b)}·${f(v.py)} + ${f(v.c)}| / √(${v.a * v.a} + ${v.b * v.b}) = ${fmtEs(num, 3)} / ${fmtEs(den, 3)}`}</p>
            <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-dp-dist">{`d = ${g(d)}`}</p>
            <p className="text-sm" data-testid="tool-dp-pie">{`Pie de la perpendicular: (${g(foot.x, 2)}, ${g(foot.y, 2)})`}</p>
          </>
        ) : (
          <p className="text-lg font-bold" style={{ color: MANIM.red }} data-testid="tool-dp-dist">A y B no pueden ser ambos 0</p>
        )}
      </div>
      <Plane range={8} testId="tool-dp-plano">
        {(px, py) => (
          <>
            {valid ? <LineSeg l={l} range={8} px={px} py={py} color={MANIM.blue} /> : null}
            {valid ? <line x1={px(p.x)} y1={py(p.y)} x2={px(foot.x)} y2={py(foot.y)} stroke={MANIM.green} strokeWidth={3} strokeDasharray="6 5" /> : null}
            {pt(p, px, py, MANIM.orange, 6)}
            {valid ? pt(foot, px, py, MANIM.green, 5) : null}
          </>
        )}
      </Plane>
    </Frame>
  );
}

/* ───────────── Mediatriz ───────────── */

/** Mediatriz de AB y distancias de un punto T a A y a B. */
export function MediatrizExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { ax: int(ini[0], 0, -6, 6), ay: int(ini[1], 0, -6, 6), bx: int(ini[2], 4, -6, 6), by: int(ini[3], 2, -6, 6), tx: int(ini[4], 2, -6, 6), ty: int(ini[5], 1, -6, 6) };
  const [v, setV] = useState(init);
  const A: V2 = { x: v.ax, y: v.ay };
  const B: V2 = { x: v.bx, y: v.by };
  const T: V2 = { x: v.tx, y: v.ty };
  const med = mediatriz(A, B);
  const norm1 = med ? normalizeLine(med) : null;
  const dA = Math.hypot(T.x - A.x, T.y - A.y);
  const dB = Math.hypot(T.x - B.x, T.y - B.y);
  const on = Math.abs(dA - dB) < 1e-9;
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Coloca T sobre la mediatriz: las distancias a A y a B coinciden. Con A(0, 0) y B(4, 2) la mediatriz es 2x + y − 5 = 0."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="A: x" value={v.ax} min={-6} max={6} color={MANIM.blue} onChange={set("ax")} format={f} />
          <Slider label="A: y" value={v.ay} min={-6} max={6} color={MANIM.blue} onChange={set("ay")} format={f} />
          <Slider label="B: x" value={v.bx} min={-6} max={6} color={MANIM.orange} onChange={set("bx")} format={f} />
          <Slider label="B: y" value={v.by} min={-6} max={6} color={MANIM.orange} onChange={set("by")} format={f} />
          <Slider label="T: x" value={v.tx} min={-6} max={6} color={MANIM.yellow} onChange={set("tx")} format={f} />
          <Slider label="T: y" value={v.ty} min={-6} max={6} color={MANIM.yellow} onChange={set("ty")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-me-medio">{med ? `Punto medio: (${g((A.x + B.x) / 2, 2)}, ${g((A.y + B.y) / 2, 2)})` : ""}</p>
        <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-me-ecuacion">{norm1 ? `Mediatriz: ${lineText(norm1)}` : "A y B coinciden: no hay mediatriz"}</p>
        <p className="text-lg" style={{ color: on ? MANIM.green : MANIM.red }} data-testid="tool-me-distancias">{`d(T, A) = ${g(dA)}   d(T, B) = ${g(dB)}   ${on ? "→ T está en la mediatriz" : "→ T no está en la mediatriz"}`}</p>
      </div>
      <Plane range={8} testId="tool-me-plano">
        {(px, py) => (
          <>
            {med ? <LineSeg l={med} range={8} px={px} py={py} color={MANIM.green} /> : null}
            <line x1={px(A.x)} y1={py(A.y)} x2={px(B.x)} y2={py(B.y)} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="4 4" />
            <line x1={px(T.x)} y1={py(T.y)} x2={px(A.x)} y2={py(A.y)} stroke={MANIM.blue} strokeWidth={1.5} opacity={0.7} />
            <line x1={px(T.x)} y1={py(T.y)} x2={px(B.x)} y2={py(B.y)} stroke={MANIM.orange} strokeWidth={1.5} opacity={0.7} />
            {pt(A, px, py, MANIM.blue, 6)}
            {pt(B, px, py, MANIM.orange, 6)}
            {pt(T, px, py, MANIM.yellow, 6)}
          </>
        )}
      </Plane>
    </Frame>
  );
}

/* ───────────── Cónicas ───────────── */

const KINDS: { value: number; label: string; kind: ConicKind }[] = [
  { value: 0, label: "Circunferencia", kind: "circunferencia" },
  { value: 1, label: "Elipse", kind: "elipse" },
  { value: 2, label: "Hipérbola", kind: "hipérbola" },
  { value: 3, label: "Parábola", kind: "parábola" },
];

const sqTxt = (v: string, c: number) => (c === 0 ? `${v}²` : `(${v} ${c < 0 ? "+" : "−"} ${Math.abs(c)})²`);

/** Circunferencia, elipse, hipérbola y parábola con centro (o vértice) en (h, k). */
export function ConicaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { t: int(ini[0], 1, 0, 3), a: int(ini[1], 5, 1, 8), b: int(ini[2], 3, 1, 8), h: int(ini[3], 0, -4, 4), k: int(ini[4], 0, -4, 4) };
  const [v, setV] = useState(init);
  const kind = KINDS[v.t]!.kind;
  const cn = conic(kind, v.a, v.b, v.h, v.k);
  const R = 12;
  const eqn =
    kind === "circunferencia"
      ? `${sqTxt("x", v.h)} + ${sqTxt("y", v.k)} = ${v.a * v.a}`
      : kind === "elipse"
        ? `${sqTxt("x", v.h)}/${v.a * v.a} + ${sqTxt("y", v.k)}/${v.b * v.b} = 1`
        : kind === "hipérbola"
          ? `${sqTxt("x", v.h)}/${v.a * v.a} − ${sqTxt("y", v.k)}/${v.b * v.b} = 1`
          : `${sqTxt("y", v.k)} = ${2 * v.a}${v.h === 0 ? "x" : `(x ${v.h < 0 ? "+" : "−"} ${Math.abs(v.h)})`}`;
  const general =
    kind === "circunferencia"
      ? `x² + y² ${-2 * v.h < 0 ? "−" : "+"} ${Math.abs(2 * v.h)}x ${-2 * v.k < 0 ? "−" : "+"} ${Math.abs(2 * v.k)}y ${v.h * v.h + v.k * v.k - v.a * v.a < 0 ? "−" : "+"} ${Math.abs(v.h * v.h + v.k * v.k - v.a * v.a)} = 0`
      : "";
  const add = (pts: [number, number][], px: (x: number) => number, py: (y: number) => number) => pts.map(([x, y]) => `${px(x)},${py(y)}`).join(" ");
  const set = (key: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [key]: n }));
  const asym = kind === "hipérbola" ? v.b / v.a : 0;
  return (
    <Frame
      hint={block.hint ?? "Cambia los semiejes y el centro: observa cómo se mueven los focos y qué ocurre con la excentricidad."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Cónica" items={KINDS.map((q) => ({ value: q.value, label: q.label }))} value={v.t} onChange={(t) => setV((p) => ({ ...p, t }))} />
          <Slider label={kind === "circunferencia" ? "Radio r" : kind === "parábola" ? "Parámetro p" : "Semieje a"} value={v.a} min={1} max={8} color={MANIM.blue} onChange={set("a")} />
          {kind === "elipse" || kind === "hipérbola" ? <Slider label="Semieje b" value={v.b} min={1} max={8} color={MANIM.orange} onChange={set("b")} /> : null}
          <Slider label="Centro (o vértice): h" value={v.h} min={-4} max={4} color={MANIM.green} onChange={set("h")} format={f} />
          <Slider label="Centro (o vértice): k" value={v.k} min={-4} max={4} color={MANIM.green} onChange={set("k")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-cn-ecuacion">{eqn}</p>
        {general ? <p className="text-lg" data-testid="tool-cn-general">{`General: ${general}`}</p> : null}
        {kind !== "circunferencia" ? (
          <p className="text-lg" data-testid="tool-cn-focos">{`${kind === "parábola" ? "Foco" : "Focos"}: ${cn.focus.map((p) => `(${g(p.x, 2)}, ${g(p.y, 2)})`).join(" y ")}`}</p>
        ) : null}
        {kind === "elipse" || kind === "hipérbola" ? (
          <p className="text-lg" data-testid="tool-cn-excentricidad">{`c = ${g(cn.c, 3)}   e = c/a = ${g(cn.e ?? 0, 3)}${kind === "elipse" ? " (< 1)" : " (> 1)"}`}</p>
        ) : null}
        {kind === "parábola" ? <p className="text-lg" data-testid="tool-cn-directriz">{`Directriz: ${cn.extra.replace(/-/g, "−")}   e = 1`}</p> : null}
        {kind === "hipérbola" ? <p className="text-lg" data-testid="tool-cn-asintotas">{v.h === 0 && v.k === 0 ? `Asíntotas: y = ±${g(asym, 3)}x` : `Asíntotas: y ${v.k < 0 ? "+" : "−"} ${Math.abs(v.k)} = ±${g(asym, 3)}·(x ${v.h < 0 ? "+" : "−"} ${Math.abs(v.h)})`}</p> : null}
      </div>
      <Plane range={R} testId="tool-cn-grafica">
        {(px, py) => {
          const N = 200;
          const polys: string[] = [];
          if (kind === "circunferencia") polys.push(add(Array.from({ length: N + 1 }, (_, i) => [v.h + v.a * Math.cos((i / N) * 2 * Math.PI), v.k + v.a * Math.sin((i / N) * 2 * Math.PI)] as [number, number]), px, py));
          if (kind === "elipse") polys.push(add(Array.from({ length: N + 1 }, (_, i) => [v.h + v.a * Math.cos((i / N) * 2 * Math.PI), v.k + v.b * Math.sin((i / N) * 2 * Math.PI)] as [number, number]), px, py));
          if (kind === "hipérbola") {
            const us = Array.from({ length: N + 1 }, (_, i) => -2.2 + (i / N) * 4.4);
            polys.push(add(us.map((u) => [v.h + v.a * Math.cosh(u), v.k + v.b * Math.sinh(u)] as [number, number]), px, py));
            polys.push(add(us.map((u) => [v.h - v.a * Math.cosh(u), v.k + v.b * Math.sinh(u)] as [number, number]), px, py));
          }
          if (kind === "parábola") polys.push(add(Array.from({ length: N + 1 }, (_, i) => { const t = -11 + (i / N) * 22; return [v.h + (t * t) / (2 * v.a), v.k + t] as [number, number]; }), px, py));
          return (
            <>
              {kind === "hipérbola" ? (
                <>
                  <line x1={px(v.h - R)} y1={py(v.k - asym * R)} x2={px(v.h + R)} y2={py(v.k + asym * R)} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="6 5" />
                  <line x1={px(v.h - R)} y1={py(v.k + asym * R)} x2={px(v.h + R)} y2={py(v.k - asym * R)} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="6 5" />
                </>
              ) : null}
              {kind === "parábola" ? <line x1={px(v.h - v.a / 2)} y1={0} x2={px(v.h - v.a / 2)} y2={PH} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="6 5" /> : null}
              {polys.map((p, i) => (
                <polyline key={i} points={p} fill="none" stroke={MANIM.blue} strokeWidth={3} />
              ))}
              {kind === "circunferencia" ? pt({ x: v.h, y: v.k }, px, py, MANIM.yellow, 5) : cn.focus.map((p, i) => <g key={i}>{pt(p, px, py, MANIM.yellow, 5)}</g>)}
            </>
          );
        }}
      </Plane>
    </Frame>
  );
}

