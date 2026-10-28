"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { ajuste } from "@/components/lesson/slide/tools/DtIIPotenciaTools";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f2 = (v: number) => fmtEs(v, 2);

const RAD = Math.PI / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Cono de semiángulo α cortado por un plano que forma β con el eje: el tipo de cónica según β frente a α. */
export function tipoConica(betaDeg: number, alphaDeg: number, tol = 0.25) {
  if (Math.abs(betaDeg - 90) < tol) return "circunferencia";
  if (Math.abs(betaDeg - alphaDeg) < tol) return "parábola";
  return betaDeg > alphaDeg ? "elipse" : "hipérbola";
}
/** Excentricidad de la sección: e = cos β / cos α. */
export const excentricidadCorte = (betaDeg: number, alphaDeg: number) => Math.cos(betaDeg * RAD) / Math.cos(alphaDeg * RAD);

/** Puntos de la cónica de foco en el origen, excentricidad e y semilatus rectum l: r = l / (1 + e·cos θ). Devuelve las ramas (tramos continuos) con |r| ≤ rMax. */
export function ramasConica(e: number, l: number, rMax = 12, n = 720): Pt[][] {
  const ramas: Pt[][] = [];
  let actual: Pt[] = [];
  const corta = () => {
    if (actual.length > 1) ramas.push(actual);
    actual = [];
  };
  for (let i = 0; i <= n; i++) {
    const th = (i / n) * 2 * Math.PI;
    const den = 1 + e * Math.cos(th);
    const r = Math.abs(den) < 1e-6 ? Infinity : l / den;
    if (!Number.isFinite(r) || Math.abs(r) > rMax) {
      corta();
      continue;
    }
    // la rama con r < 0 es la otra rama de la hipérbola
    if (actual.length && Math.sign(r) !== Math.sign(l / (1 + e * Math.cos(((i - 1) / n) * 2 * Math.PI)))) corta();
    actual.push([r * Math.cos(th), r * Math.sin(th)]);
  }
  corta();
  // la rama que cruza θ = 0 queda partida en el primer y el último tramo: se unen
  if (ramas.length > 1) {
    const primera = ramas[0]!;
    const ultima = ramas[ramas.length - 1]!;
    const f = primera[0]!;
    const z = ultima[ultima.length - 1]!;
    if (Math.hypot(f[0] - z[0], f[1] - z[1]) < 1e-9) {
      ramas.splice(0, 1);
      ultima.push(...primera);
    }
  }
  return ramas;
}

/** Elipse x²/a² + y²/b² = 1 (a ≥ b), con un punto de parámetro t (grados). */
export function elipseDatos(a: number, b: number, tDeg: number) {
  const c = Math.sqrt(Math.max(0, a * a - b * b));
  const P: Pt = [a * Math.cos(tDeg * RAD), b * Math.sin(tDeg * RAD)];
  const d1 = Math.hypot(P[0] + c, P[1]);
  const d2 = Math.hypot(P[0] - c, P[1]);
  return { c, e: a > 0 ? c / a : NaN, P, d1, d2, suma: d1 + d2 };
}

/** Hipérbola x²/a² − y²/b² = 1, con un punto de parámetro u (x = a·cosh u, y = b·sinh u). */
export function hiperbolaDatos(a: number, b: number, u: number) {
  const c = Math.sqrt(a * a + b * b);
  const P: Pt = [a * Math.cosh(u), b * Math.sinh(u)];
  const d1 = Math.hypot(P[0] + c, P[1]);
  const d2 = Math.hypot(P[0] - c, P[1]);
  return { c, e: a > 0 ? c / a : NaN, P, d1, d2, diferencia: Math.abs(d1 - d2), asintota: (Math.atan2(b, a) * 180) / Math.PI };
}

/** Parábola y² = 4·f·x (foco (f, 0), directriz x = −f), con el punto de parámetro s: (f·s², 2·f·s). */
export function parabolaDatos(f: number, s: number) {
  const P: Pt = [f * s * s, 2 * f * s];
  return { P, dFoco: Math.hypot(P[0] - f, P[1]), dDirectriz: P[0] + f, p: 2 * f };
}

type Tipo = "elipse" | "hiperbola" | "parabola";

/** Punto, tangente y radios focales de cada cónica; devuelve los ángulos (agudos, en grados) entre la tangente y los dos radios (el segundo, en la parábola, es la paralela al eje). */
export function tangenteConica(tipo: Tipo, q: number, t: number) {
  let P: Pt;
  let T: Pt;
  let F1: Pt;
  let F2: Pt | null;
  if (tipo === "elipse") {
    const a = 5;
    const b = q;
    const c = Math.sqrt(a * a - b * b);
    P = [a * Math.cos(t * RAD), b * Math.sin(t * RAD)];
    T = [-a * Math.sin(t * RAD), b * Math.cos(t * RAD)];
    F1 = [-c, 0];
    F2 = [c, 0];
  } else if (tipo === "hiperbola") {
    const a = 2;
    const b = q;
    const c = Math.sqrt(a * a + b * b);
    const u = t / 40;
    P = [a * Math.cosh(u), b * Math.sinh(u)];
    T = [a * Math.sinh(u), b * Math.cosh(u)];
    F1 = [-c, 0];
    F2 = [c, 0];
  } else {
    const f = q;
    const s = t / 40;
    P = [f * s * s, 2 * f * s];
    T = [2 * f * s, 2 * f];
    F1 = [f, 0];
    F2 = null;
  }
  const dir = (v: Pt): number => Math.atan2(v[1], v[0]);
  const agudo = (v1: Pt, v2: Pt) => {
    const d = Math.abs(((dir(v1) - dir(v2)) * 180) / Math.PI) % 180;
    return d > 90 ? 180 - d : d;
  };
  const r1: Pt = [F1[0] - P[0], F1[1] - P[1]];
  const r2: Pt = F2 ? [F2[0] - P[0], F2[1] - P[1]] : [1, 0];
  return { P, T, F1, F2, ang1: agudo(T, r1), ang2: agudo(T, r2) };
}

/* ───────────── 1. Cónicas como secciones del cono ───────────── */

export function CorteConoDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { beta: Math.round(num(block.params?.a, 60, 5, 90)), alpha: Math.round(num(block.params?.b, 35, 20, 50)) };
  const [s, setS] = useState(init);
  const tipo = tipoConica(s.beta, s.alpha);
  const e = excentricidadCorte(s.beta, s.alpha);
  const Uc = 18;
  const A0: Pt = [120, 150];
  const sc = (p: Pt): Pt => [A0[0] + p[0] * Uc, A0[1] - p[1] * Uc];
  const H = 6.5;
  const w = H * Math.tan(s.alpha * RAD);
  const hp = 3.5;
  const d: Pt = [Math.sin(s.beta * RAD), -Math.cos(s.beta * RAD)];
  const L = 6;
  const cut: [Pt, Pt] = [[-L * d[0], -hp - L * d[1]], [L * d[0], -hp + L * d[1]]];
  const ramas = ramasConica(e, 1.6, 7);
  const Uk = 20;
  const K: Pt = e < 1 ? [395, 150] : [330, 150];
  const kc = (p: Pt): Pt => [K[0] + p[0] * Uk, K[1] - p[1] * Uk];
  // para la elipse y la circunferencia, centrar la figura
  const shift = e < 1 ? (-e * 1.6) / (1 - e * e) : 0;
  const kp = (p: Pt): Pt => kc([p[0] - shift, p[1]]);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El ángulo del plano frente al de la generatriz decide si la sección es circunferencia, elipse, parábola o hipérbola."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo del plano con el eje β" value={s.beta} min={5} max={90} step={1} unit="°" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, beta: v }))} />
          <Slider label="Semiángulo del cono α" value={s.alpha} min={20} max={50} step={1} unit="°" color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, alpha: v }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="corte-cono" maxH={300}>
        <Seg a={sc([-w, -H])} b={sc([w, H])} color={MANIM.blue} width={2} />
        <Seg a={sc([w, -H])} b={sc([-w, H])} color={MANIM.blue} width={2} />
        <Seg a={sc([0, -H - 0.3])} b={sc([0, H + 0.3])} color={MANIM.muted} width={1} dashed />
        <Seg a={sc(cut[0])} b={sc(cut[1])} color={MANIM.orange} width={3.5} />
        {ramas.map((r, i) => (
          <polyline key={i} points={r.map((p) => kp(p).join(",")).join(" ")} fill={e < 1 ? MANIM.orange : "none"} fillOpacity={0.12} stroke={MANIM.orange} strokeWidth={3} />
        ))}
        <text x={A0[0] + 6} y={A0[1] - 6} fill={MANIM.blue} fontSize={12} fontWeight={700}>V</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Sección">{tipo}</Stat>
        <Stat color={MANIM.purple} label="Excentricidad e = cos β / cos α">{f2(e)}</Stat>
        <Stat color={MANIM.muted} label="Condición">{tipo === "circunferencia" ? "β = 90°" : tipo === "parábola" ? "β = α" : tipo === "elipse" ? "β > α" : "β < α"}</Stat>
      </Readout>
      <Note>Al cortar un <b>cono</b> con un plano se obtienen las <b>cónicas</b>. Si el plano es <b>perpendicular al eje</b> (β = 90°) sale una <b>circunferencia</b>; si es más inclinado que la generatriz pero no paralelo a ella, una <b>elipse</b> (β &gt; α); si es <b>paralelo a una generatriz</b> (β = α), una <b>parábola</b>; y si es aún más inclinado (β &lt; α) corta las <b>dos hojas</b> del cono y da una <b>hipérbola</b>. La excentricidad e resume la forma: 0, menor que 1, 1 y mayor que 1.</Note>
    </Frame>
  );
}

/* ───────────── 2. Elipse ───────────── */

export function ElipseFocosDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 5, 3, 8)), b: Math.round(num(block.params?.b, 3, 1, 8)), t: Math.round(num(block.params?.c, 50, 0, 360)) };
  const [s, setS] = useState(init);
  const b = Math.min(s.b, s.a);
  const e = elipseDatos(s.a, b, s.t);
  const { sc } = ajuste(-s.a - 0.5, s.a + 0.5, -s.a * 0.7 - 0.5, s.a * 0.7 + 0.5);
  const { U } = ajuste(-s.a - 0.5, s.a + 0.5, -Math.max(b, 1) - 0.5, Math.max(b, 1) + 0.5);
  const O = sc([0, 0]);
  const T = (p: Pt): Pt => [O[0] + p[0] * U, O[1] - p[1] * U];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Para cualquier punto de la elipse, la suma de las distancias a los focos es siempre 2a."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Semieje mayor a" value={s.a} min={3} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, a: v }))} />
          <Slider label="Semieje menor b" value={b} min={1} max={s.a} step={1} unit=" cm" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, b: v }))} />
          <Slider label="Posición del punto P" value={s.t} min={0} max={360} step={5} unit="°" color={MANIM.green} onChange={(v) => setS((o) => ({ ...o, t: v }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="elipse-focos" maxH={300}>
        <ellipse cx={O[0]} cy={O[1]} rx={s.a * U} ry={b * U} fill={MANIM.orange} fillOpacity={0.1} stroke={MANIM.orange} strokeWidth={3} />
        <Seg a={T([-s.a, 0])} b={T([s.a, 0])} color={MANIM.muted} width={1} dashed />
        <Seg a={T([0, -b])} b={T([0, b])} color={MANIM.muted} width={1} dashed />
        <Seg a={T([-e.c, 0])} b={T(e.P)} color={MANIM.blue} width={2.5} />
        <Seg a={T([e.c, 0])} b={T(e.P)} color={MANIM.green} width={2.5} />
        <Dot p={T([-e.c, 0])} color={MANIM.yellow} r={5} />
        <Dot p={T([e.c, 0])} color={MANIM.yellow} r={5} />
        <Dot p={T(e.P)} color={MANIM.red} r={5} />
        <text x={T([-e.c, 0])[0] - 6} y={T([-e.c, 0])[1] + 20} fill={MANIM.yellow} fontSize={13} fontWeight={700}>F</text>
        <text x={T([e.c, 0])[0] - 4} y={T([e.c, 0])[1] + 20} fill={MANIM.yellow} fontSize={13} fontWeight={700}>F′</text>
        <text x={T(e.P)[0] + 8} y={T(e.P)[1] - 8} fill={MANIM.red} fontSize={13} fontWeight={700}>P</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="PF">{f2(e.d1)} cm</Stat>
        <Stat color={MANIM.green} label="PF′">{f2(e.d2)} cm</Stat>
        <Stat color={MANIM.purple} label="PF + PF′ (= 2a)">{f2(e.suma)} cm</Stat>
        <Stat color={MANIM.yellow} label="Semidistancia focal c = √(a² − b²)">{f2(e.c)} cm</Stat>
        <Stat color={MANIM.muted} label="Excentricidad e = c/a">{f2(e.e)}</Stat>
      </Readout>
      <Note>La <b>elipse</b> es el lugar geométrico de los puntos cuya <b>suma de distancias a dos puntos fijos</b> (los <b>focos</b> F y F′) es constante e igual a la longitud del <b>eje mayor</b>, <b>2a</b>. Mueve P: PF y PF′ cambian, pero su suma no. Los semiejes y la semidistancia focal forman un triángulo rectángulo: <b>a² = b² + c²</b>. Cuanto más alejados están los focos (c mayor), más excéntrica y aplastada es la elipse; con c = 0 es una circunferencia.</Note>
    </Frame>
  );
}

/* ───────────── 3. Hipérbola ───────────── */

export function HiperbolaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 2, 1, 4)), b: Math.round(num(block.params?.b, 2, 1, 4)), u: num(block.params?.c, 0.8, -2, 2) };
  const [s, setS] = useState(init);
  const h = hiperbolaDatos(s.a, s.b, s.u);
  const X = h.c + 2;
  const Y = 6;
  const { sc } = ajuste(-X, X, -Y, Y);
  const rama = (sg: number): Pt[] => Array.from({ length: 81 }, (_, i) => {
    const u = -2.6 + (i * 5.2) / 80;
    return [sg * s.a * Math.cosh(u), s.b * Math.sinh(u)] as Pt;
  }).filter((p) => Math.abs(p[1]) <= Y && Math.abs(p[0]) <= X);
  const asi = (sg: number): [Pt, Pt] => {
    const k = Math.min(X / s.a, Y / s.b);
    return [[-k * s.a, -sg * k * s.b], [k * s.a, sg * k * s.b]];
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "En la hipérbola, la diferencia de distancias a los focos es siempre 2a."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Semieje real a" value={s.a} min={1} max={4} step={1} unit=" cm" color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, a: v }))} />
          <Slider label="Semieje imaginario b" value={s.b} min={1} max={4} step={1} unit=" cm" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, b: v }))} />
          <Slider label="Posición del punto P" value={s.u} min={-2} max={2} step={0.1} color={MANIM.green} format={f2} onChange={(v) => setS((o) => ({ ...o, u: v }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="hiperbola-focos" maxH={300}>
        {[1, -1].map((sg) => (
          <polyline key={sg} points={rama(sg).map((p) => sc(p).join(",")).join(" ")} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        ))}
        {[1, -1].map((sg) => (
          <Seg key={sg} a={sc(asi(sg)[0])} b={sc(asi(sg)[1])} color={MANIM.muted} width={1.2} dashed />
        ))}
        <Seg a={sc([-X, 0])} b={sc([X, 0])} color={MANIM.grid} width={1} />
        <Seg a={sc([-h.c, 0])} b={sc(h.P)} color={MANIM.blue} width={2.5} />
        <Seg a={sc([h.c, 0])} b={sc(h.P)} color={MANIM.green} width={2.5} />
        <Dot p={sc([-h.c, 0])} color={MANIM.yellow} r={5} />
        <Dot p={sc([h.c, 0])} color={MANIM.yellow} r={5} />
        <Dot p={sc(h.P)} color={MANIM.red} r={5} />
        <text x={sc([-h.c, 0])[0] - 6} y={sc([-h.c, 0])[1] + 20} fill={MANIM.yellow} fontSize={13} fontWeight={700}>F</text>
        <text x={sc([h.c, 0])[0] - 4} y={sc([h.c, 0])[1] + 20} fill={MANIM.yellow} fontSize={13} fontWeight={700}>F′</text>
        <text x={sc(h.P)[0] + 10} y={sc(h.P)[1] + 18} fill={MANIM.red} fontSize={13} fontWeight={700}>P</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="PF">{f2(h.d1)} cm</Stat>
        <Stat color={MANIM.green} label="PF′">{f2(h.d2)} cm</Stat>
        <Stat color={MANIM.purple} label="|PF − PF′| (= 2a)">{f2(h.diferencia)} cm</Stat>
        <Stat color={MANIM.yellow} label="c = √(a² + b²)">{f2(h.c)} cm</Stat>
        <Stat color={MANIM.muted} label="Excentricidad e = c/a">{f2(h.e)}</Stat>
      </Readout>
      <Note>La <b>hipérbola</b> es el lugar geométrico de los puntos cuya <b>diferencia de distancias</b> a dos focos es constante, <b>2a</b>. Tiene <b>dos ramas</b> y dos <b>asíntotas</b> (rectas a las que se acerca sin llegar a tocarlas), de pendiente ±b/a. Aquí la relación entre los ejes y los focos es <b>c² = a² + b²</b> (en la elipse era a² = b² + c²): los focos quedan más lejos del centro que los vértices, así que <b>e &gt; 1</b>. Si a = b, las asíntotas son perpendiculares y la hipérbola es <b>equilátera</b>.</Note>
    </Frame>
  );
}

/* ───────────── 4. Parábola ───────────── */

export function ParabolaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { f: num(block.params?.a, 1.5, 0.5, 3), s: num(block.params?.b, 1.2, -2.2, 2.2) };
  const [s, setS] = useState(init);
  const d = parabolaDatos(s.f, s.s);
  const xmax = Math.max(s.f * 2.2 * 2.2 + 0.5, 6);
  const ymax = 2 * s.f * 2.2 + 0.5;
  const { sc } = ajuste(-s.f - 1, xmax, -ymax, ymax);
  const pts: Pt[] = Array.from({ length: 61 }, (_, i) => {
    const t = -2.2 + (i * 4.4) / 60;
    return [s.f * t * t, 2 * s.f * t] as Pt;
  });
  const Q: Pt = [-s.f, d.P[1]];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada punto de la parábola está a la misma distancia del foco que de la directriz."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Distancia foco–vértice f" value={s.f} min={0.5} max={3} step={0.25} unit=" cm" color={MANIM.blue} format={f2} onChange={(v) => setS((o) => ({ ...o, f: v }))} />
          <Slider label="Posición del punto P" value={s.s} min={-2.2} max={2.2} step={0.1} color={MANIM.green} format={f2} onChange={(v) => setS((o) => ({ ...o, s: v }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="parabola-foco-directriz" maxH={300}>
        <Seg a={sc([-s.f, -ymax])} b={sc([-s.f, ymax])} color={MANIM.ink} width={2.5} />
        <Seg a={sc([-s.f - 1, 0])} b={sc([xmax, 0])} color={MANIM.grid} width={1} />
        <polyline points={pts.map((p) => sc(p).join(",")).join(" ")} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <Seg a={sc(d.P)} b={sc([s.f, 0])} color={MANIM.blue} width={2.5} />
        <Seg a={sc(d.P)} b={sc(Q)} color={MANIM.green} width={2.5} />
        <Dot p={sc([s.f, 0])} color={MANIM.yellow} r={5} />
        <Dot p={sc(Q)} color={MANIM.green} r={4} />
        <Dot p={sc(d.P)} color={MANIM.red} r={5} />
        <text x={sc([s.f, 0])[0] - 4} y={sc([s.f, 0])[1] + 20} fill={MANIM.yellow} fontSize={13} fontWeight={700}>F</text>
        <text x={sc([-s.f, ymax])[0] + 8} y={sc([-s.f, ymax])[1] + 16} fill={MANIM.ink} fontSize={13} fontWeight={700}>directriz</text>
        <text x={sc(d.P)[0] + 10} y={sc(d.P)[1] + 18} fill={MANIM.red} fontSize={13} fontWeight={700}>P</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Distancia al foco PF">{f2(d.dFoco)} cm</Stat>
        <Stat color={MANIM.green} label="Distancia a la directriz">{f2(d.dDirectriz)} cm</Stat>
        <Stat color={MANIM.purple} label="Parámetro p = 2f">{f2(d.p)} cm</Stat>
        <Stat color={MANIM.muted} label="Excentricidad">1</Stat>
      </Readout>
      <Note>La <b>parábola</b> es el lugar geométrico de los puntos que <b>equidistan de un punto fijo</b> (el <b>foco</b> F) <b>y de una recta fija</b> (la <b>directriz</b>). El <b>vértice</b> está a mitad de camino entre ambos, a la distancia f; el <b>parámetro</b> p = 2f es la distancia del foco a la directriz. Su ecuación es <b>y² = 4fx</b>. Es la única cónica con <b>excentricidad 1</b> exacta. Mueve P y comprueba que las dos distancias coinciden.</Note>
    </Frame>
  );
}

/* ───────────── 5. Tangentes y propiedad reflexiva ───────────── */

const TIPOS = [
  { value: "elipse", label: "Elipse" },
  { value: "hiperbola", label: "Hipérbola" },
  { value: "parabola", label: "Parábola" },
] as const;

export function TangentesConicasDt2Explorador({ block }: { block: ToolBlock }) {
  const kinds: Tipo[] = ["elipse", "hiperbola", "parabola"];
  const init = { tipo: kinds[Math.round(num(block.params?.n, 0, 0, 2))]!, q: num(block.params?.a, 3, 1, 4), t: Math.round(num(block.params?.b, 50, 15, 75)) };
  const [s, setS] = useState(init);
  const fm = s.tipo === "elipse" ? { min: 1, max: 4.5 } : s.tipo === "hiperbola" ? { min: 1, max: 4 } : { min: 0.5, max: 3 };
  const q = Math.min(Math.max(s.q, fm.min), fm.max);
  const tt = tangenteConica(s.tipo, q, s.t);
  const L = 9;
  const { sc } = ajuste(-9, 11, -6, 6);
  const curva = (): Pt[][] => {
    if (s.tipo === "elipse") return [Array.from({ length: 121 }, (_, i) => [5 * Math.cos((i * 3) * RAD), q * Math.sin((i * 3) * RAD)] as Pt)];
    if (s.tipo === "hiperbola") {
      const mk = (sg: number) => Array.from({ length: 81 }, (_, i) => {
        const u = -2.4 + (i * 4.8) / 80;
        return [sg * 2 * Math.cosh(u), q * Math.sinh(u)] as Pt;
      }).filter((p) => Math.abs(p[1]) <= 6 && Math.abs(p[0]) <= 10);
      return [mk(1), mk(-1)];
    }
    return [Array.from({ length: 61 }, (_, i) => {
      const u = -2.4 + (i * 4.8) / 60;
      return [q * u * u, 2 * q * u] as Pt;
    }).filter((p) => Math.abs(p[1]) <= 6 && p[0] <= 10)];
  };
  const tn = Math.hypot(tt.T[0], tt.T[1]);
  const ux: Pt = [tt.T[0] / tn, tt.T[1] / tn];
  const ext: [Pt, Pt] = [[tt.P[0] - L * ux[0], tt.P[1] - L * ux[1]], [tt.P[0] + L * ux[0], tt.P[1] + L * ux[1]]];
  return (
    <Frame
      stacked
      hint={block.hint ?? "La tangente forma ángulos iguales con los radios focales: la luz que sale de un foco se refleja hacia el otro."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Cónica" items={TIPOS} value={s.tipo} onChange={(v) => setS((o) => ({ ...o, tipo: v, q: v === "parabola" ? 1.5 : 3 }))} />
          <Slider label={s.tipo === "parabola" ? "Distancia foco–vértice f" : "Semieje menor b"} value={q} min={fm.min} max={fm.max} step={0.5} unit=" cm" color={MANIM.blue} format={f2} onChange={(v) => setS((o) => ({ ...o, q: v }))} />
          <Slider label="Posición del punto de tangencia" value={s.t} min={15} max={75} step={5} unit="°" color={MANIM.green} onChange={(v) => setS((o) => ({ ...o, t: v }))} />
        </>
      }
    >
      <Svg w={520} h={300} testId="tangentes-conicas" maxH={300}>
        {curva().map((r, i) => (
          <polyline key={i} points={r.map((p) => sc(p).join(",")).join(" ")} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        ))}
        <Seg a={sc([-9, 0])} b={sc([11, 0])} color={MANIM.grid} width={1} />
        <Seg a={sc(ext[0])} b={sc(ext[1])} color={MANIM.ink} width={2} />
        <Seg a={sc(tt.P)} b={sc(tt.F1)} color={MANIM.blue} width={2.2} />
        {tt.F2 ? <Seg a={sc(tt.P)} b={sc(tt.F2)} color={MANIM.green} width={2.2} /> : <Seg a={sc(tt.P)} b={sc([tt.P[0] + 8, tt.P[1]])} color={MANIM.green} width={2.2} />}
        <Dot p={sc(tt.F1)} color={MANIM.yellow} r={5} />
        {tt.F2 ? <Dot p={sc(tt.F2)} color={MANIM.yellow} r={5} /> : null}
        <Dot p={sc(tt.P)} color={MANIM.red} r={5} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Ángulo con el primer radio focal">{f2(tt.ang1)}°</Stat>
        <Stat color={MANIM.green} label={s.tipo === "parabola" ? "Ángulo con la paralela al eje" : "Ángulo con el segundo radio focal"}>{f2(tt.ang2)}°</Stat>
      </Readout>
      <Note>La <b>tangente</b> en un punto P de una cónica forma <b>ángulos iguales con los radios focales</b> de P. En la <b>elipse</b> y la <b>hipérbola</b> son los radios a los dos focos; en la <b>parábola</b>, el radio al foco y la <b>paralela al eje</b> (el segundo foco está en el infinito). Esta es la <b>propiedad reflexiva</b>: un rayo que sale de un foco se refleja en la curva y va al otro foco (o, en la parábola, sale paralelo al eje). Es el principio de las antenas parabólicas, los faros y las galerías de susurros.</Note>
    </Frame>
  );
}
