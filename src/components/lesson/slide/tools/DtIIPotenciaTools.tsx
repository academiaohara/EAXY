"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f2 = (v: number) => fmtEs(v, 2);

const RAD = Math.PI / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Potencia de un punto a distancia d del centro respecto de una circunferencia de radio r: d² − r². */
export const potencia = (d: number, r: number) => d * d - r * r;

/** Longitud de la tangente desde un punto exterior (√potencia); NaN si el punto es interior. */
export const longitudTangente = (d: number, r: number) => {
  const p = potencia(d, r);
  return p >= 0 ? Math.sqrt(p) : NaN;
};

/** Secante desde P = (d, 0) con dirección (−cos θ, sin θ): distancias t1 ≤ t2 a los cortes y su producto (= potencia). Null si no corta. */
export function secante(d: number, r: number, thetaDeg: number) {
  const c = d * Math.cos(thetaDeg * RAD);
  const disc = c * c - potencia(d, r);
  if (disc < 0) return null;
  const q = Math.sqrt(disc);
  const t1 = c - q;
  const t2 = c + q;
  return { t1, t2, producto: t1 * t2 };
}

/** Eje radical de dos circunferencias de centros (0, 0) y (D, 0): la recta vertical x = (D² + r1² − r2²) / (2D). */
export function ejeRadical(r1: number, r2: number, D: number) {
  if (D <= 0) return null;
  const x = (D * D + r1 * r1 - r2 * r2) / (2 * D);
  const h2 = r1 * r1 - x * x;
  const relacion = D > r1 + r2 ? "exteriores" : D === r1 + r2 ? "tangentes exteriores" : D < Math.abs(r1 - r2) ? "interiores" : D === Math.abs(r1 - r2) ? "tangentes interiores" : "secantes";
  return { x, h: h2 >= 0 ? Math.sqrt(h2) : null, relacion };
}

/** Circunferencias que pasan por A y B (ambos por encima del eje y = 0) y son tangentes a ese eje. */
export function circulosPorDosPuntosTangentes(A: Pt, B: Pt) {
  if (A[1] <= 0 || B[1] <= 0) return [];
  const radioEn = (T: number) => ((A[0] - T) ** 2 + A[1] ** 2) / (2 * A[1]);
  if (Math.abs(A[1] - B[1]) < 1e-9) {
    const T = (A[0] + B[0]) / 2;
    return [{ T, r: radioEn(T) }];
  }
  const Px = A[0] - (A[1] * (B[0] - A[0])) / (B[1] - A[1]);
  const pa = Math.hypot(Px - A[0], A[1]);
  const pb = Math.hypot(Px - B[0], B[1]);
  const t = Math.sqrt(pa * pb);
  return [Px - t, Px + t].map((T) => ({ T, r: radioEn(T), Px, pa, pb }));
}

/** Circunferencias tangentes a la recta y = 0 en T = (t, 0) y a la circunferencia de centro (cx, cy), radio R (cy > R): radios con signo ρ = potencia/(2(cy ± R)). */
export function tangenteRectaYCirculo(t: number, cx: number, cy: number, R: number) {
  if (cy <= R) return null;
  const pot = (t - cx) ** 2 + cy * cy - R * R;
  return { potencia: pot, exterior: pot / (2 * (cy + R)), interior: pot / (2 * (cy - R)) };
}

/* ───────────── Utilidades de dibujo ───────────── */

export function ajuste(xmin: number, xmax: number, ymin: number, ymax: number, w = 520, h = 300) {
  const U = Math.min((w - 40) / (xmax - xmin), (h - 30) / (ymax - ymin));
  const ox = w / 2 - (U * (xmin + xmax)) / 2;
  const oy = h - 15 + ymin * U;
  return { U, sc: (p: Pt): Pt => [ox + p[0] * U, oy - p[1] * U] };
}

/* ───────────── 1. Potencia de un punto ───────────── */

export function PotenciaPuntoDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { r: Math.round(num(block.params?.a, 3, 1, 5)), d: num(block.params?.b, 6, 0, 10), th: Math.round(num(block.params?.c, 25, 0, 80)) };
  const [s, setS] = useState(init);
  const { r, d, th } = s;
  const p = potencia(d, r);
  const tg = longitudTangente(d, r);
  const sec = secante(d, r, th);
  const { U, sc } = ajuste(-r - 0.5, Math.max(d, r) + 1, -Math.max(r, 3) - 0.5, Math.max(r, 3) + 0.5);
  const O: Pt = [0, 0];
  const P: Pt = [d, 0];
  const u: Pt = [-Math.cos(th * RAD), Math.sin(th * RAD)];
  const at = (t: number): Pt => [P[0] + t * u[0], P[1] + t * u[1]];
  // punto de tangencia (el superior)
  const T: Pt | null = p > 0 && d > 0 ? [(r * r) / d, (r * Math.sqrt(p)) / d] : null;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Desde un punto exterior, PA·PB es siempre igual a PT² (la potencia), gires como gires la secante."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Radio r" value={s.r} min={1} max={5} step={1} unit=" cm" color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, r: v }))} />
          <Slider label="Distancia d del punto P al centro" value={s.d} min={0} max={10} step={0.5} unit=" cm" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, d: v }))} />
          <Slider label="Giro de la secante" value={s.th} min={0} max={80} step={5} unit="°" color={MANIM.green} onChange={(v) => setS((o) => ({ ...o, th: v }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="potencia-punto" maxH={300}>
        <circle cx={sc(O)[0]} cy={sc(O)[1]} r={r * U} fill={MANIM.blue} fillOpacity={0.08} stroke={MANIM.blue} strokeWidth={2.5} />
        <Dot p={sc(O)} color={MANIM.blue} r={3} />
        {sec ? (
          <>
            <Seg a={sc(at(-0.5))} b={sc(at(sec.t2 + 0.8))} color={MANIM.green} width={2} />
            <Seg a={sc(P)} b={sc(at(sec.t1))} color={MANIM.yellow} width={4} />
            <Dot p={sc(at(sec.t1))} color={MANIM.green} r={4} />
            <Dot p={sc(at(sec.t2))} color={MANIM.green} r={4} />
          </>
        ) : null}
        {T ? (
          <>
            <Seg a={sc(P)} b={sc(T)} color={MANIM.orange} width={3} />
            <Seg a={sc(O)} b={sc(T)} color={MANIM.muted} width={1.2} dashed />
            <Dot p={sc(T)} color={MANIM.orange} r={4} />
          </>
        ) : null}
        <Dot p={sc(P)} color={MANIM.red} r={5} />
        <text x={sc(P)[0] + 8} y={sc(P)[1] + 18} fill={MANIM.red} fontSize={13} fontWeight={700}>P</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Potencia p = d² − r²">{f2(p)} cm²</Stat>
        <Stat color={MANIM.orange} label="Tangente PT² (si P es exterior)">{Number.isNaN(tg) ? "no hay tangentes" : `${f2(tg * tg)} cm²`}</Stat>
        <Stat color={MANIM.green} label="Secante PA · PB">{sec ? `${f2(sec.producto)} cm²` : "no corta"}</Stat>
        <Stat color={MANIM.muted} label="Posición de P">{p > 1e-9 ? "exterior (p > 0)" : p < -1e-9 ? "interior (p < 0)" : "sobre la circunferencia (p = 0)"}</Stat>
      </Readout>
      <Note>La <b>potencia</b> de un punto P respecto de una circunferencia es <b>p = d² − r²</b>, con d la distancia al centro. Es <b>positiva</b> fuera, <b>cero</b> en la circunferencia y <b>negativa</b> dentro. Si P es exterior, <b>PA·PB = PT² = p</b> para cualquier secante PAB y para la tangente PT. Cambia el giro: los puntos A y B se mueven, pero su producto no.</Note>
    </Frame>
  );
}

/* ───────────── 2. Eje radical ───────────── */

export function EjeRadicalDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { r1: Math.round(num(block.params?.a, 3, 1, 5)), r2: Math.round(num(block.params?.b, 2, 1, 5)), D: Math.round(num(block.params?.c, 4, 1, 10)), q: 3 };
  const [s, setS] = useState(init);
  const e = ejeRadical(s.r1, s.r2, s.D)!;
  const O2: Pt = [s.D, 0];
  const yq = s.q;
  const Q: Pt = [e.x, yq];
  const p1 = potencia(Math.hypot(Q[0], Q[1]), s.r1);
  const p2 = potencia(Math.hypot(Q[0] - s.D, Q[1]), s.r2);
  const ymax = Math.max(s.r1, s.r2, 6) + 0.5;
  const { U, sc } = ajuste(-s.r1 - 0.5, Math.max(s.D + s.r2, e.x) + 0.5, -ymax, ymax);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Todos los puntos del eje radical tienen la misma potencia respecto de las dos circunferencias."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Radio r₁" value={s.r1} min={1} max={5} step={1} unit=" cm" color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, r1: v }))} />
          <Slider label="Radio r₂" value={s.r2} min={1} max={5} step={1} unit=" cm" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, r2: v }))} />
          <Slider label="Distancia entre centros" value={s.D} min={1} max={10} step={1} unit=" cm" color={MANIM.green} onChange={(v) => setS((o) => ({ ...o, D: v }))} />
          <Slider label="Altura del punto Q sobre el eje" value={s.q} min={-6} max={6} step={0.5} unit=" cm" color={MANIM.purple} onChange={(v) => setS((o) => ({ ...o, q: v }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="eje-radical" maxH={300}>
        <circle cx={sc([0, 0])[0]} cy={sc([0, 0])[1]} r={s.r1 * U} fill={MANIM.blue} fillOpacity={0.08} stroke={MANIM.blue} strokeWidth={2.5} />
        <circle cx={sc(O2)[0]} cy={sc(O2)[1]} r={s.r2 * U} fill={MANIM.orange} fillOpacity={0.08} stroke={MANIM.orange} strokeWidth={2.5} />
        <Seg a={sc([0, 0])} b={sc(O2)} color={MANIM.muted} width={1.2} dashed />
        <Dot p={sc([0, 0])} color={MANIM.blue} r={3} />
        <Dot p={sc(O2)} color={MANIM.orange} r={3} />
        <Seg a={sc([e.x, -ymax + 0.2])} b={sc([e.x, ymax - 0.2])} color={MANIM.ink} width={2.5} />
        <text x={sc([e.x, ymax - 0.2])[0] + 6} y={sc([e.x, ymax - 0.2])[1] + 12} fill={MANIM.ink} fontSize={13} fontWeight={700}>eje radical</text>
        {e.h !== null && e.h > 1e-9 ? (
          <>
            <Dot p={sc([e.x, e.h])} color={MANIM.yellow} r={4} />
            <Dot p={sc([e.x, -e.h])} color={MANIM.yellow} r={4} />
          </>
        ) : null}
        <Dot p={sc(Q)} color={MANIM.red} r={5} />
        <text x={sc(Q)[0] + 9} y={sc(Q)[1] + 4} fill={MANIM.red} fontSize={13} fontWeight={700}>Q</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.ink} label="Eje radical a distancia de O₁">{f2(e.x)} cm</Stat>
        <Stat color={MANIM.muted} label="Posición relativa">{e.relacion}</Stat>
        <Stat color={MANIM.blue} label="Potencia de Q respecto de C₁">{f2(p1)}</Stat>
        <Stat color={MANIM.orange} label="Potencia de Q respecto de C₂">{f2(p2)}</Stat>
      </Readout>
      <Note>El <b>eje radical</b> es el lugar geométrico de los puntos con <b>igual potencia</b> respecto de dos circunferencias: una recta <b>perpendicular a la línea de centros</b>, a la distancia x = (D² + r₁² − r₂²) / 2D de O₁. Si las circunferencias son <b>secantes</b>, pasa por sus dos puntos de corte (amarillo); si son <b>tangentes</b>, es la tangente común en el punto de contacto. Mueve Q a lo largo del eje: las dos potencias coinciden siempre.</Note>
    </Frame>
  );
}

/* ───────────── 3. Circunferencia por dos puntos tangente a una recta ───────────── */

export function CirculoDosPuntosTangenteDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { ay: Math.round(num(block.params?.a, 1, 1, 6)), bx: Math.round(num(block.params?.b, -1, -2, 8)) };
  const [s, setS] = useState(init);
  const A: Pt = [-3, s.ay];
  const B: Pt = [s.bx, 5];
  const sols = circulosPorDosPuntosTangentes(A, B);
  // el encuadre solo abarca las soluciones de tamaño razonable (si AB casi es paralela a la recta, una crece sin límite)
  const visibles = sols.filter((c) => c.r <= 12);
  const rmax = Math.max(0, ...visibles.map((c) => c.r));
  const xs = [A[0], B[0], ...visibles.map((c) => c.T - c.r), ...visibles.map((c) => c.T + c.r)];
  const { U, sc } = ajuste(Math.min(...xs) - 0.5, Math.max(...xs) + 0.5, -0.8, Math.max(6, 2 * rmax) + 0.5);
  const first = sols[0] as { T: number; r: number; Px?: number; pa?: number; pb?: number } | undefined;
  const Px = first?.Px;
  const lineaAB: Pt[] = Px !== undefined ? [A, B] : [];
  const colores = [MANIM.orange, MANIM.green];
  return (
    <Frame
      stacked
      hint={block.hint ?? "El punto P donde AB corta la recta dada fija la longitud PT = √(PA·PB) de las tangentes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Altura del punto A" value={s.ay} min={1} max={6} step={1} unit=" cm" color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, ay: v }))} />
          <Slider label="Posición horizontal del punto B" value={s.bx} min={-2} max={8} step={1} unit=" cm" color={MANIM.purple} onChange={(v) => setS((o) => ({ ...o, bx: v }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="circulo-dos-puntos-tangente" maxH={300}>
        <Seg a={sc([Math.min(...xs) - 0.5, 0])} b={sc([Math.max(...xs) + 0.5, 0])} color={MANIM.ink} width={2.5} />
        {sols.map((c, i) => (
          <g key={i}>
            <circle cx={sc([c.T, c.r])[0]} cy={sc([c.T, c.r])[1]} r={c.r * U} fill={colores[i]} fillOpacity={0.07} stroke={colores[i]} strokeWidth={2.5} />
            <Dot p={sc([c.T, 0])} color={colores[i]} r={4} />
          </g>
        ))}
        {Px !== undefined ? (
          <>
            <Seg a={sc([Px, 0])} b={sc(A[1] > B[1] ? A : B)} color={MANIM.muted} width={1.3} dashed />
            <Dot p={sc([Px, 0])} color={MANIM.yellow} r={4} />
            <text x={sc([Px, 0])[0] - 4} y={sc([Px, 0])[1] + 18} fill={MANIM.yellow} fontSize={13} fontWeight={700}>P</text>
          </>
        ) : lineaAB.length ? null : <Seg a={sc(A)} b={sc(B)} color={MANIM.muted} width={1.3} dashed />}
        <Dot p={sc(A)} color={MANIM.blue} r={5} />
        <Dot p={sc(B)} color={MANIM.purple} r={5} />
        <text x={sc(A)[0] - 16} y={sc(A)[1] - 8} fill={MANIM.blue} fontSize={13} fontWeight={700}>A</text>
        <text x={sc(B)[0] + 8} y={sc(B)[1] - 8} fill={MANIM.purple} fontSize={13} fontWeight={700}>B</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="PA · PB">{first?.pa !== undefined && first.pb !== undefined ? `${f2(first.pa * first.pb)} cm²` : "AB ∥ recta"}</Stat>
        <Stat color={MANIM.orange} label="Radio de la solución 1">{sols[0] ? `${f2(sols[0].r)} cm` : "—"}</Stat>
        <Stat color={MANIM.green} label="Radio de la solución 2">{sols[1] ? `${f2(sols[1].r)} cm` : "solo hay una (AB ∥ recta)"}</Stat>
      </Readout>
      <Note>Para trazar una circunferencia que pase por <b>A y B</b> y sea <b>tangente a una recta</b>: se prolonga AB hasta cortar la recta en <b>P</b>; por la potencia, <b>PT² = PA·PB</b>, así que hay <b>dos</b> puntos de tangencia T a la distancia √(PA·PB) de P (uno a cada lado). El centro de cada solución está donde la <b>perpendicular a la recta en T</b> corta a la <b>mediatriz de AB</b>. Si AB es paralela a la recta, no hay P y solo queda una solución.</Note>
    </Frame>
  );
}

/* ───────────── 4. Circunferencia tangente a una recta (en T) y a otra circunferencia ───────────── */

export function TangenteRectaCirculoDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { t: Math.round(num(block.params?.a, 2, -4, 4)), R: num(block.params?.b, 1.5, 1, 3) };
  const [s, setS] = useState(init);
  const cx = 0;
  const cy = 5;
  const sol = tangenteRectaYCirculo(s.t, cx, cy, s.R)!;
  const rs = [sol.exterior, sol.interior];
  const xmin = Math.min(cx - s.R, ...rs.map((r) => s.t - r)) - 0.5;
  const xmax = Math.max(cx + s.R, ...rs.map((r) => s.t + r)) + 0.5;
  const ymax = Math.max(cy + s.R, 2 * sol.interior) + 0.5;
  const { U, sc } = ajuste(xmin, xmax, -0.8, ymax);
  const colores = [MANIM.orange, MANIM.green];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Los centros de las soluciones están en la perpendicular a la recta por T; sus radios salen de la potencia de T."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Punto de tangencia T sobre la recta" value={s.t} min={-4} max={4} step={1} unit=" cm" color={MANIM.yellow} onChange={(v) => setS((o) => ({ ...o, t: v }))} />
          <Slider label="Radio de la circunferencia dada" value={s.R} min={1} max={3} step={0.5} unit=" cm" color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, R: v }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="tangente-recta-circulo" maxH={300}>
        <Seg a={sc([xmin, 0])} b={sc([xmax, 0])} color={MANIM.ink} width={2.5} />
        <circle cx={sc([cx, cy])[0]} cy={sc([cx, cy])[1]} r={s.R * U} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.blue} strokeWidth={2.5} />
        {rs.map((r, i) => (
          <g key={i}>
            <circle cx={sc([s.t, r])[0]} cy={sc([s.t, r])[1]} r={r * U} fill={colores[i]} fillOpacity={0.06} stroke={colores[i]} strokeWidth={2.5} />
            <Seg a={sc([s.t, 0])} b={sc([s.t, r])} color={colores[i]} width={1.2} dashed />
            <Dot p={sc([s.t, r])} color={colores[i]} r={3} />
          </g>
        ))}
        <Dot p={sc([s.t, 0])} color={MANIM.yellow} r={5} />
        <text x={sc([s.t, 0])[0] - 4} y={sc([s.t, 0])[1] + 18} fill={MANIM.yellow} fontSize={13} fontWeight={700}>T</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Potencia de T respecto de la circunferencia dada">{f2(sol.potencia)} cm²</Stat>
        <Stat color={MANIM.orange} label="Radio (tangente exterior)">{f2(sol.exterior)} cm</Stat>
        <Stat color={MANIM.green} label="Radio (tangente que la contiene)">{f2(sol.interior)} cm</Stat>
      </Readout>
      <Note>Una circunferencia tangente a la recta en <b>T</b> tiene su centro en la <b>perpendicular</b> a la recta por T, a una distancia ρ = radio. Imponer que sea tangente a la circunferencia dada (centro a altura h, radio R) da <b>ρ = p / (2(h ± R))</b>, con <b>p la potencia de T</b>. El signo + es la solución <b>exterior</b>; el signo − es la que <b>contiene</b> a la circunferencia dada. Hay siempre <b>dos soluciones</b> cuando la circunferencia no corta a la recta.</Note>
    </Frame>
  );
}
