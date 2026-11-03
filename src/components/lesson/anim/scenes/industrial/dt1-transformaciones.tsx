import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Dot, Seg, TickMark, arcPath, angleOf, arrowHead, dist, polar, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Transformaciones geométricas: traslación, giro y homotecia ───────────── */

const RAD = Math.PI / 180;
const poly = (p: Pt[]) => p.map((q) => q.join(",")).join(" ");
const trasl = (p: Pt, d: Pt): Pt => [p[0] + d[0], p[1] + d[1]];
/** Giro visual antihorario (y hacia abajo) de `deg` grados en torno a `c`. */
const gira = (p: Pt, c: Pt, deg: number): Pt => {
  const dx = p[0] - c[0];
  const dy = p[1] - c[1];
  const co = Math.cos(deg * RAD);
  const si = Math.sin(deg * RAD);
  return [c[0] + dx * co + dy * si, c[1] - dx * si + dy * co];
};
const homo = (p: Pt, c: Pt, k: number): Pt => [c[0] + k * (p[0] - c[0]), c[1] + k * (p[1] - c[1])];
const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

function Flecha({ a, b, color, width = 3.5 }: { a: Pt; b: Pt; color: string; width?: number }) {
  const fin = polar(b, 10, angleOf(a, b) + 180);
  return (
    <g>
      <line x1={a[0]} y1={a[1]} x2={fin[0]} y2={fin[1]} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={arrowHead(a, b, 16)} fill={color} />
    </g>
  );
}

function Figura({ p, color, relleno = 0.18, grosor = 3.2, nombres, offset = 18 }: { p: Pt[]; color: string; relleno?: number; grosor?: number; nombres?: string[]; offset?: number }) {
  const c: Pt = [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];
  return (
    <g>
      <polygon points={poly(p)} fill={color} fillOpacity={relleno} stroke={color} strokeWidth={grosor} strokeLinejoin="round" />
      {p.map((q, i) => (
        <g key={i}>
          <Dot p={q} color={color} r={5.5} />
          {nombres ? <Txt x={q[0] + ((q[0] - c[0]) / (dist(q, c) || 1)) * offset} y={q[1] + ((q[1] - c[1]) / (dist(q, c) || 1)) * offset + 7} size={21} color={color}>{nombres[i]}</Txt> : null}
        </g>
      ))}
    </g>
  );
}

/* ── 1. Las tres transformaciones sencillas del plano ── */

export function buildTransformacionesTipos(): AnimBuild {
  const base: Pt[] = [[40, 215], [150, 215], [95, 110]];
  const panel = (i: number): Pt => [i * 262 + 10, 0];
  const tri = (i: number) => base.map((q) => trasl(q, panel(i)));
  const tr = tri(0).map((q) => trasl(q, [95, 90]));
  const c1: Pt = [panel(1)[0] + 15, 330];
  const gi = tri(1).map((q) => gira(q, c1, -75));
  const c2: Pt = [panel(2)[0] + 5, 330];
  const ho = tri(2).map((q) => homo(q, c2, 1.7));
  return {
    label: "Las tres transformaciones sencillas del plano: traslación, giro y homotecia",
    beatMs: 5200,
    captions: [
      "Una **transformación** hace corresponder a cada punto de una figura otro punto del plano. Partimos del mismo triángulo en las tres.",
      "**Traslación**: todos los puntos se desplazan lo mismo, con la misma **dirección, magnitud y sentido** (un vector). La figura no cambia ni de forma ni de tamaño.",
      "**Giro**: todos los puntos giran el mismo ángulo alrededor de un **centro**. La figura tampoco se deforma, pero queda **girada**.",
      "**Homotecia**: los puntos se alejan o acercan de un **centro** según una **razón**. Cambia el tamaño pero se conserva la forma: la figura es **semejante**.",
    ],
    render: (beat) => (
      <Canvas>
        {[0, 1, 2].map((i) => <Figura key={i} p={tri(i)} color={MANIM.blue} />)}
        {[0, 1, 2].map((i) => <Txt key={i} x={panel(i)[0] + 130} y={400} size={22} color={MANIM.muted}>{["Traslación", "Giro", "Homotecia"][i]}</Txt>)}
        <Fade show={beat >= 1}>
          <Flecha a={tri(0)[2]} b={tr[2]} color={MANIM.green} />
          <Figura p={tr} color={MANIM.orange} />
        </Fade>
        <Fade show={beat >= 2}>
          <Dot p={c1} color={MANIM.green} r={7} />
          <Txt x={c1[0] - 6} y={c1[1] + 28} size={21} color={MANIM.green}>O</Txt>
          <path d={arcPath(c1, 120, angleOf(c1, tri(1)[2]), angleOf(c1, gi[2]!))} fill="none" stroke={MANIM.green} strokeWidth={2.5} />
          <Figura p={gi} color={MANIM.orange} />
        </Fade>
        <Fade show={beat >= 3}>
          <Dot p={c2} color={MANIM.green} r={7} />
          <Txt x={c2[0] - 6} y={c2[1] + 28} size={21} color={MANIM.green}>C</Txt>
          {tri(2).map((q, i) => <Seg key={i} a={c2} b={ho[i]!} color={MANIM.green} width={1.6} dashed />)}
          <Figura p={ho} color={MANIM.orange} />
        </Fade>
      </Canvas>
    ),
  };
}

/* ── 2. Traslación ── */

export function buildTraslacion(): AnimBuild {
  const F: Pt[] = [[110, 280], [250, 300], [200, 175]];
  const d: Pt = [330, -85];
  const Fp = F.map((q) => trasl(q, d));
  const nombres = ["A", "B", "C"];
  const V: Pt = [90, 90];
  const Vp = trasl(V, d);
  const r0: Pt = [60, 350];
  const r1: Pt = [330, 350 - 0];
  return {
    label: "Traslación: figura, vector traslación, vectores equipolentes y paralelogramo AA′B′B",
    beatMs: 5600,
    captions: [
      "La traslación queda definida por un **vector** $\\overrightarrow{VV'}$: tiene **dirección**, **magnitud** (módulo) y **sentido**.",
      "Cada punto $A$ de la figura $F$ se lleva a un punto $A'$ con $\\overrightarrow{AA'}$ **equipolente** a $\\overrightarrow{VV'}$: mismo módulo, dirección y sentido.",
      "Los puntos trasladados forman la figura $F'$, **igual** a $F$: rectas paralelas, ángulos iguales y mismos lados.",
      "$AA'B'B$ es un **paralelogramo**: por eso $AB = A'B'$ y los lados homólogos son **paralelos**.",
      "Una recta **paralela al vector** se transforma en sí misma: es una **recta doble** de la traslación.",
    ],
    render: (beat) => (
      <Canvas>
        <Flecha a={V} b={Vp} color={MANIM.green} width={4} />
        <Txt x={V[0] - 12} y={V[1] - 10} size={22} color={MANIM.green}>V</Txt>
        <Txt x={Vp[0] + 22} y={Vp[1] - 8} size={22} color={MANIM.green}>V′</Txt>
        <Figura p={F} color={MANIM.blue} nombres={nombres} />
        <Fade show={beat >= 1}>
          {F.map((q, i) => <Flecha key={i} a={q} b={Fp[i]!} color={MANIM.green} width={2.4} />)}
        </Fade>
        <Fade show={beat >= 2}>
          <Figura p={Fp} color={MANIM.orange} nombres={nombres.map((n) => `${n}′`)} />
        </Fade>
        <Fade show={beat === 3}>
          <polygon points={poly([F[0]!, Fp[0]!, Fp[1]!, F[1]!])} fill={MANIM.yellow} fillOpacity={0.22} stroke={MANIM.yellow} strokeWidth={2.4} />
          <TickMark a={F[0]!} b={F[1]!} color={MANIM.yellow} />
          <TickMark a={Fp[0]!} b={Fp[1]!} color={MANIM.yellow} />
        </Fade>
        <Fade show={beat >= 4}>
          <Seg a={[r0[0] - 30, 380]} b={[r1[0] + 360, 380 - 0.2575 * 690]} color={MANIM.purple} width={3} />
          <Txt x={r0[0] + 150} y={375} size={20} color={MANIM.purple} anchor="start">recta paralela al vector: r′ = r</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ── 3. Giro ── */

export function buildGiro(): AnimBuild {
  const O: Pt = [300, 235];
  const A: Pt = polar(O, 175, 38);
  const alfa = 62;
  const Ap = gira(A, O, alfa);
  const B: Pt = polar(O, 115, 6);
  const Bp = gira(B, O, alfa);
  const aA = angleOf(O, A);
  const aAp = angleOf(O, Ap);
  const aB = angleOf(O, B);
  const aBp = angleOf(O, Bp);
  return {
    label: "Giro: centro, amplitud, igualdad de radios y triángulos directamente iguales",
    beatMs: 5600,
    captions: [
      "Un **giro** de centro $O$ lleva $A$ a $A'$ con $OA = OA'$: ambos puntos están en la **misma circunferencia** de centro $O$.",
      "El ángulo $\\widehat{AOA'}$ es la **amplitud del giro**. Hay que conocer el **ángulo** y el **sentido**.",
      "Todo punto $B$ gira el **mismo ángulo** y en el mismo sentido: $OB = OB'$ y $\\widehat{BOB'} = \\widehat{AOA'}$.",
      "Los triángulos $AOB$ y $A'OB'$ son **directamente iguales**: la figura girada es **igual** a la original.",
      "El centro $O$ es el **único punto doble**: no se mueve.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={O[0]} cy={O[1]} r={dist(O, A)} fill="none" stroke={MANIM.grid} strokeWidth={2} strokeDasharray="6 6" />
        <Fade show={beat >= 2}>
          <circle cx={O[0]} cy={O[1]} r={dist(O, B)} fill="none" stroke={MANIM.grid} strokeWidth={2} strokeDasharray="6 6" />
        </Fade>
        <Fade show={beat >= 3}>
          <polygon points={poly([O, A, B])} fill={MANIM.blue} fillOpacity={0.22} stroke={MANIM.blue} strokeWidth={2.4} />
          <polygon points={poly([O, Ap, Bp])} fill={MANIM.orange} fillOpacity={0.22} stroke={MANIM.orange} strokeWidth={2.4} />
        </Fade>
        <Seg a={O} b={A} color={MANIM.blue} width={3} />
        <Seg a={O} b={Ap} color={MANIM.orange} width={3} />
        <path d={arcPath(O, 80, aA, aAp)} fill="none" stroke={MANIM.green} strokeWidth={3} />
        <Txt x={polar(O, 104, (aA + aAp) / 2)[0]} y={polar(O, 104, (aA + aAp) / 2)[1] + 8} size={26} color={MANIM.green}>α</Txt>
        <Fade show={beat === 0}>
          <TickMark a={O} b={A} n={2} color={MANIM.yellow} />
          <TickMark a={O} b={Ap} n={2} color={MANIM.yellow} />
        </Fade>
        <Fade show={beat >= 2}>
          <Seg a={O} b={B} color={MANIM.blue} width={3} />
          <Seg a={O} b={Bp} color={MANIM.orange} width={3} />
          <path d={arcPath(O, 50, aB, aBp)} fill="none" stroke={MANIM.green} strokeWidth={3} />
        </Fade>
        <Fade show={beat >= 4}>
          <circle cx={O[0]} cy={O[1]} r={16} fill="none" stroke={MANIM.green} strokeWidth={3} />
          <Txt x={O[0] + 34} y={O[1] + 50} size={21} color={MANIM.green} anchor="start">punto doble</Txt>
        </Fade>
        <Dot p={O} color={MANIM.green} r={8} />
        <Txt x={O[0] - 22} y={O[1] + 8} size={24} color={MANIM.green}>O</Txt>
        <Dot p={A} color={MANIM.blue} /><Dot p={Ap} color={MANIM.orange} />
        <Txt x={A[0] + 18} y={A[1] - 6} size={23} color={MANIM.blue}>A</Txt>
        <Txt x={Ap[0] - 4} y={Ap[1] - 16} size={23} color={MANIM.orange}>A′</Txt>
        <Fade show={beat >= 2}>
          <Dot p={B} color={MANIM.blue} /><Dot p={Bp} color={MANIM.orange} />
          <Txt x={B[0] + 16} y={B[1] + 26} size={23} color={MANIM.blue}>B</Txt>
          <Txt x={Bp[0] + 22} y={Bp[1] - 4} size={23} color={MANIM.orange}>B′</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ── 4. Homotecia: directa, inversa, identidad y simetría central ── */

export function buildHomotecia(): AnimBuild {
  const C: Pt = [290, 220];
  const F: Pt[] = [[440, 125], [460, 255], [545, 190]];
  const nombres = ["A", "B", "D"];
  const Kd = 1.5;
  const Ki = -0.8;
  const razon = (beat: number) => (beat === 3 ? -1 : beat === 2 ? Ki : Kd);
  const Fh = (k: number) => F.map((q) => homo(q, C, k));
  const rotulo = ["", "K = 1,5 · directa", "K = −0,8 · inversa", "K = −1 · simetría central", "Figuras semejantes"];
  return {
    label: "Homotecia: centro, razón, directa e inversa, simetría central",
    beatMs: 5600,
    captions: [
      "Dos figuras son **homotéticas** si sus puntos homólogos están **alineados con un punto fijo** $C$, el **centro de homotecia**.",
      "La razón es $\\dfrac{\\overline{CA}}{\\overline{CA'}} = \\pm K$. Con $K > 0$ la homotecia es **directa**: $A'$ queda al mismo lado de $C$ que $A$.",
      "Con $K < 0$ la homotecia es **inversa**: $A'$ queda al lado contrario de $C$. Las rectas homólogas siguen siendo **paralelas**.",
      "Si $K = -1$ la homotecia es una **simetría central**: $A$ y $A'$ son simétricos respecto de $C$ y la figura es **igual**.",
      "Las figuras homotéticas tienen los **ángulos iguales**: son **semejantes**. Las rectas que pasan por $C$ son **dobles**.",
    ],
    render: (beat) => {
      const k = razon(beat);
      const Fp = Fh(k);
      return (
        <Canvas>
          <Figura p={F} color={MANIM.blue} nombres={nombres} />
          <Fade show={beat >= 1}>
            {F.map((q, i) => <Seg key={i} a={Fp[i]!} b={q} color={MANIM.muted} width={1.6} dashed />)}
            <Figura p={Fp} color={MANIM.orange} nombres={nombres.map((n) => `${n}′`)} />
          </Fade>
          <Fade show={beat >= 4}>
            <Seg a={[C[0] - 260, C[1] + 50]} b={[C[0] + 440, C[1] - 70]} color={MANIM.purple} width={2.6} />
            <Txt x={C[0] + 330} y={C[1] - 70} size={20} color={MANIM.purple}>recta doble</Txt>
          </Fade>
          <Dot p={C} color={MANIM.green} r={8} />
          <Txt x={C[0] - 10} y={C[1] + 30} size={24} color={MANIM.green}>C</Txt>
          <Fade show={beat >= 1}>
            <Txt x={780} y={400} size={23} color={MANIM.yellow} anchor="end">{rotulo[beat] ?? ""}</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ── 5. Dos circunferencias: centros de homotecia directa e inversa ── */

export function buildHomoteciaCentros(): AnimBuild {
  const O1: Pt = [170, 215];
  const R1 = 90;
  const O2: Pt = [440, 215];
  const R2 = 40;
  const C1: Pt = [(R1 * O2[0] - R2 * O1[0]) / (R1 - R2), 215];
  const C2: Pt = [(R1 * O2[0] + R2 * O1[0]) / (R1 + R2), 215];
  /** Recta que pasa por `C` (a la derecha de O) y es tangente a la circunferencia de centro O1: extremos hacia O1 y hacia el otro lado. */
  const tangente = (C: Pt, lado: 1 | -1, izq: number, der: number): [Pt, Pt] => {
    const a = Math.asin(R1 / Math.abs(C[0] - O1[0])) / RAD;
    return [polar(C, izq, 180 + lado * a), polar(C, der, lado * a)];
  };
  const ext = [1, -1].map((l) => tangente(C1, l as 1 | -1, C1[0] - O1[0] + 60, 0));
  const int = [1, -1].map((l) => tangente(C2, l as 1 | -1, C2[0] - O1[0] + 60, O2[0] - C2[0] + 60));
  return {
    label: "Dos circunferencias: centros de homotecia directa (tangentes exteriores) e inversa (tangentes interiores)",
    beatMs: 5600,
    captions: [
      "Dos **circunferencias** son siempre **homotéticas**: sus centros $O$ y $O'$ son puntos homólogos y la razón es el cociente de los radios.",
      "Las **tangentes comunes exteriores** se cortan en $C_1$: es el centro de la homotecia **directa** ($K > 0$).",
      "Las **tangentes comunes interiores** se cortan en $C_2$, entre las dos circunferencias: es el centro de la homotecia **inversa** ($K < 0$).",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={O1[0]} cy={O1[1]} r={R1} fill={MANIM.blue} fillOpacity={0.14} stroke={MANIM.blue} strokeWidth={3} />
        <circle cx={O2[0]} cy={O2[1]} r={R2} fill={MANIM.orange} fillOpacity={0.14} stroke={MANIM.orange} strokeWidth={3} />
        <Seg a={[40, 215]} b={[780, 215]} color={MANIM.grid} width={1.6} dashed />
        <Dot p={O1} color={MANIM.blue} /><Dot p={O2} color={MANIM.orange} />
        <Txt x={O1[0]} y={O1[1] + 28} size={22} color={MANIM.blue}>O</Txt>
        <Txt x={O2[0]} y={O2[1] + 26} size={22} color={MANIM.orange}>O′</Txt>
        <Fade show={beat === 1}>
          {ext.map(([a, b], i) => <Seg key={i} a={a} b={b} color={MANIM.green} width={2.4} />)}
          <Dot p={C1} color={MANIM.green} r={7} />
          <Txt x={C1[0] + 6} y={C1[1] + 30} size={22} color={MANIM.green}>C₁</Txt>
        </Fade>
        <Fade show={beat === 2}>
          {int.map(([a, b], i) => <Seg key={i} a={a} b={b} color={MANIM.yellow} width={2.4} />)}
          <Dot p={C2} color={MANIM.yellow} r={7} />
          <Txt x={C2[0]} y={C2[1] + 30} size={22} color={MANIM.yellow}>C₂</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

