"use client";

import { type ReactNode } from "react";
import { angDe, dist, enCirculo, puntoMedio, type Pt } from "./geometry";
import { BenchDefs, Desk } from "./instruments";
import { AMBAR, AZUL, BenchShell, INK, SVG_CLASS, VERDE, usePaso, type BenchBlock, type BenchSceneName } from "./scenes";
import { MSHEET, MV } from "./scenes-compas";
import { Seg, Txt } from "./scenes-proporcion";
import { ArcoPlano } from "./scenes-trazados";

/**
 * Escenas de la «mesa de dibujo» para las ideas de teoría de los temas 2, 4, 5, 8 y 9: figuras que se destacan paso a paso
 * (el texto va a la derecha). Son diagramas estáticos: cada paso resalta una idea.
 */
const AUX = "#6b7480";
const ROJO = "#c0392b";
const MORADO = "#7c5cbf";

function Hoja({ scene, block, step, setStep, label, testId, titulo, sub, children }: { scene: BenchSceneName; block: BenchBlock; step: number; setStep: (n: number) => void; label: string; testId: string; titulo: string; sub?: string; children: ReactNode }) {
  return (
    <BenchShell scene={scene} notes={block.notes} step={step} setStep={setStep} label={label}>
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label={label} data-testid={testId}>
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        {children}
        <Txt p={[24, 34]} color={VERDE} size={15}>{titulo}</Txt>
        {sub ? <Txt p={[24, 56]} color={INK} size={13}>{sub}</Txt> : null}
      </svg>
    </BenchShell>
  );
}

const Dot = ({ p, color = INK, r = 3.4 }: { p: Pt; color?: string; r?: number }) => <circle cx={p[0]} cy={p[1]} r={r} fill={color} />;
const Circ = ({ c, r, color = INK, w = 1.8, dash, fill = "none" }: { c: Pt; r: number; color?: string; w?: number; dash?: string; fill?: string }) => <circle cx={c[0]} cy={c[1]} r={r} fill={fill} stroke={color} strokeWidth={w} strokeDasharray={dash} />;
const poly = (c: Pt, R: number, n: number, rot = 90): Pt[] => Array.from({ length: n }, (_, i) => enCirculo(c, R, rot + (360 * i) / n));
const Poli = ({ pts, color = INK, w = 1.8, fill = "none" }: { pts: Pt[]; color?: string; w?: number; fill?: string }) => <polygon points={pts.map((p) => p.join(",")).join(" ")} fill={fill} stroke={color} strokeWidth={w} strokeLinejoin="round" />;
/** Marca de igualdad (rayita) en el punto medio de un segmento. */
const Tick = ({ a, b, k = 1, color = INK }: { a: Pt; b: Pt; k?: number; color?: string }) => {
  const m = puntoMedio(a, b);
  const d = dist(a, b) || 1;
  const u: Pt = [(b[0] - a[0]) / d, (b[1] - a[1]) / d];
  const n: Pt = [-u[1], u[0]];
  return (
    <g>
      {Array.from({ length: k }, (_, i) => {
        const o = (i - (k - 1) / 2) * 5;
        const c: Pt = [m[0] + u[0] * o, m[1] + u[1] * o];
        return <line key={i} x1={c[0] - n[0] * 5} y1={c[1] - n[1] * 5} x2={c[0] + n[0] * 5} y2={c[1] + n[1] * 5} stroke={color} strokeWidth="1.6" />;
      })}
    </g>
  );
};
const Recto = ({ v, a, b, s = 12 }: { v: Pt; a: Pt; b: Pt; s?: number }) => {
  const da = dist(v, a) || 1;
  const db = dist(v, b) || 1;
  const ua: Pt = [(a[0] - v[0]) / da, (a[1] - v[1]) / da];
  const ub: Pt = [(b[0] - v[0]) / db, (b[1] - v[1]) / db];
  const p1: Pt = [v[0] + ua[0] * s, v[1] + ua[1] * s];
  const p2: Pt = [v[0] + (ua[0] + ub[0]) * s, v[1] + (ua[1] + ub[1]) * s];
  const p3: Pt = [v[0] + ub[0] * s, v[1] + ub[1] * s];
  return <path d={`M${p1.join(" ")} L${p2.join(" ")} L${p3.join(" ")}`} fill="none" stroke={AMBAR} strokeWidth="1.6" />;
};
const T = (p: Pt, txt: string, color = INK, size = 14, dx = 6, dy = -6) => <Txt p={[p[0] + dx, p[1] + dy]} color={color} size={size}>{txt}</Txt>;

/* ───────────── Tema 2: cómo estudiar las construcciones ───────────── */

export function ComoEstudiar({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const c: Pt = [310, 200];
  const nodos: ReactNode[] = [];
  if (step === 0) {
    [0, 1, 2].forEach((i) => nodos.push(<rect key={`b${i}`} x={c[0] - 90 + i * 15} y={c[1] + 60 - (i + 1) * 46} width={180 - i * 30} height={40} rx="4" fill={`rgba(31,120,180,${0.2 + i * 0.12})`} stroke={AZUL} strokeWidth="2" />));
    nodos.push(T([c[0], c[1] + 120], "sencillas, para construir otras más difíciles", AZUL, 14, -140, 14));
  } else if (step === 1) {
    nodos.push(<Circ key="s" c={[210, 200]} r={60} color={AZUL} w={3} />, <Seg key="h" a={[210, 200]} b={[240, 160]} color={AZUL} w={3} />, <Seg key="t" a={[210, 130]} b={[210, 142]} color={AZUL} w={3} />, <rect key="b" x={200} y={116} width={20} height={10} fill={AZUL} />);
    [60, 40, 20].forEach((r) => nodos.push(<Circ key={`g${r}`} c={[420, 200]} r={r} color={AMBAR} w={2.4} />));
    nodos.push(<Dot key="d" p={[420, 200]} color={AMBAR} r={6} />, T([180, 290], "rapidez", AZUL, 16, 0, 0), T([395, 290], "precisión", AMBAR, 16, 0, 0));
  } else if (step === 2) {
    nodos.push(<Circ key="b" c={c} r={52} color={AMBAR} w={3} fill="rgba(224,168,0,0.15)" />, <rect key="p" x={c[0] - 18} y={c[1] + 52} width={36} height={22} rx="3" fill="none" stroke={AMBAR} strokeWidth="3" />);
    for (let a = -60; a <= 240; a += 30) if (a < 20 || a > 160) nodos.push(<Seg key={`r${a}`} a={enCirculo(c, 66, a)} b={enCirculo(c, 84, a)} color={AMBAR} w={2.4} />);
    nodos.push(T(c, "¿por qué?", AMBAR, 18, -36, 6), T([c[0], c[1] + 130], "se razona cada operación", INK, 14, -88, 0));
  } else {
    [0, 1, 2, 3].forEach((i) => nodos.push(<rect key={`e${i}`} x={150 + i * 70} y={250 - i * 40} width={70} height={40 + i * 40} fill={i === 0 ? "rgba(31,157,85,0.25)" : "rgba(0,0,0,0.04)"} stroke={i === 0 ? VERDE : AUX} strokeWidth="2" />));
    nodos.push(T([185, 236], "1", VERDE, 18, -4, 0), T([150, 330], "primer paso seguro: el lenguaje del dibujo", VERDE, 14, 0, 0));
  }
  return (
    <Hoja scene="dt-como-estudiar" block={block} step={step} setStep={setStep} label="Hoja con ideas para estudiar las construcciones" testId="bench-como-estudiar" titulo={["Construcciones elementales", "Rapidez y precisión", "No se aprenden de memoria", "El primer paso"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Tema 2: lugares geométricos ───────────── */

export function LugaresInterseccion({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const O: Pt = [310, 205];
  const nodos: ReactNode[] = [];
  if (step === 0) {
    nodos.push(<Circ key="c" c={O} r={120} color={AUX} w={1} dash="3 5" />);
    [10, 70, 130, 200, 250, 320].forEach((a, i) => nodos.push(<Seg key={`r${i}`} a={O} b={enCirculo(O, 120, a)} color={AMBAR} w={1.4} dash="5 4" />, <Dot key={`p${i}`} p={enCirculo(O, 120, a)} color={AMBAR} r={5} />, <Tick key={`t${i}`} a={O} b={enCirculo(O, 120, a)} />));
    nodos.push(<Dot key="o" p={O} />, T(O, "O", INK, 15, 6, 18), T([40, 336], "todos los puntos cumplen la misma propiedad (distan R de O)", VERDE, 14, 0, 0));
  } else {
    const C1: Pt = [250, 205];
    const R1 = 120;
    nodos.push(<Circ key="l1" c={C1} r={R1} color={AZUL} w={2.2} />, <Seg key="l2" a={[360, 70]} b={[360, 320]} color={VERDE} w={2.2} />);
    const dx = 360 - C1[0];
    const h = Math.sqrt(R1 * R1 - dx * dx);
    nodos.push(<Dot key="p1" p={[360, 205 - h]} color={AMBAR} r={6} />, <Dot key="p2" p={[360, 205 + h]} color={AMBAR} r={6} />, T([360, 205 - h], "P", AMBAR, 16, 10, -4), T([360, 205 + h], "Q", AMBAR, 16, 10, 16));
    nodos.push(T([140, 120], "lugar 1", AZUL, 14, 0, 0), T([372, 80], "lugar 2", VERDE, 14, 0, 0), T([40, 336], "el punto buscado está en la intersección de dos lugares geométricos", VERDE, 14, 0, 0));
  }
  return (
    <Hoja scene="lugares-interseccion" block={block} step={step} setStep={setStep} label="Hoja con un lugar geométrico y la intersección de dos lugares" testId="bench-lugares-interseccion" titulo={["Un lugar geométrico", "Intersección de dos lugares geométricos"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Tema 2: la mediatriz y sus aplicaciones ───────────── */

export function MediatrizAplicaciones({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const A: Pt = [150, 210];
  const B: Pt = [470, 210];
  const M = puntoMedio(A, B);
  const nodos: ReactNode[] = [];
  if (step <= 1) {
    nodos.push(<Seg key="ab" a={A} b={B} w={2.4} />, <Dot key="a" p={A} />, <Dot key="b" p={B} />, <Dot key="m" p={M} color={AMBAR} />, T(A, "A", INK, 15, -4, 22), T(B, "B", INK, 15, -4, 22));
    nodos.push(<Seg key="med" a={[M[0], 80]} b={[M[0], 310]} color={VERDE} w={2.4} />, <Recto key="r" v={M} a={B} b={[M[0], 80]} />);
  }
  if (step === 0) {
    const Q: Pt = [M[0], 130];
    nodos.push(<Seg key="qa" a={Q} b={A} color={AMBAR} w={1.6} dash="5 4" />, <Seg key="qb" a={Q} b={B} color={AMBAR} w={1.6} dash="5 4" />, <Dot key="q" p={Q} color={AMBAR} r={5} />, <Tick key="ta" a={Q} b={A} color={AMBAR} />, <Tick key="tb" a={Q} b={B} color={AMBAR} />, T(Q, "Q", AMBAR, 15, 8, -4));
    nodos.push(T([40, 336], "todos sus puntos equidistan de A y de B", VERDE, 14, 0, 0));
  } else if (step === 1) {
    const r = 175;
    nodos.push(<ArcoPlano key="a1" c={A} r={r} a1={-36} a2={36} color={AUX} />, <ArcoPlano key="a2" c={B} r={r} a1={144} a2={216} color={AUX} />);
    const h = Math.sqrt(r * r - 160 * 160);
    nodos.push(<Dot key="p" p={[M[0], 210 - h]} color={AMBAR} r={5} />, <Dot key="q" p={[M[0], 210 + h]} color={AMBAR} r={5} />, T([M[0], 210 - h], "P", AMBAR, 15, 8, -4), T([M[0], 210 + h], "Q", AMBAR, 15, 8, 14), T([210, 150], "1", AUX, 14, 0, 0), T([400, 150], "2", AUX, 14, 0, 0));
    nodos.push(T([40, 336], "radio mayor que la mitad de AB: la recta PQ es la mediatriz", VERDE, 14, 0, 0));
  } else {
    const fig = (x: number, y: number, titulo: string, contenido: ReactNode) => (
      <g key={titulo}>
        <rect x={x} y={y} width={250} height={130} rx="8" fill="rgba(255,252,240,0.7)" stroke={AUX} strokeWidth="1" />
        <Txt p={[x + 10, y + 20]} color={VERDE} size={13}>{titulo}</Txt>
        {contenido}
      </g>
    );
    nodos.push(
      fig(40, 76, "Perpendiculares", <g><Seg a={[60, 190]} b={[270, 190]} /><Seg a={[165, 110]} b={[165, 200]} color={VERDE} w={2} /><Recto v={[165, 190]} a={[270, 190]} b={[165, 110]} s={10} /></g>),
      fig(320, 76, "Dividir un segmento", <g><Seg a={[345, 170]} b={[545, 170]} w={2} />{[0, 1, 2, 3, 4].map((i) => <Seg key={i} a={[345 + i * 50, 150]} b={[345 + i * 50, 190]} color={VERDE} w={1.6} />)}</g>),
      fig(40, 224, "Dividir un arco", <g><ArcoPlano c={[165, 360]} r={110} a1={55} a2={125} grosor={2} /><Seg a={[165, 360]} b={[165, 250]} color={VERDE} w={1.6} dash="4 3" /></g>),
      fig(320, 224, "Arco por tres puntos", <g><ArcoPlano c={[445, 380]} r={110} a1={50} a2={130} grosor={2} />{[130, 90, 50].map((a) => <Dot key={a} p={enCirculo([445, 380], 110, a)} color={AMBAR} />)}</g>),
    );
  }
  return (
    <Hoja scene="mediatriz-aplicaciones" block={block} step={step} setStep={setStep} label="Hoja con la mediatriz y sus aplicaciones" testId="bench-mediatriz-aplicaciones" titulo={["La mediatriz de un segmento", "Cómo se traza", "Aplicaciones de la mediatriz"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Tema 2: rectas paralelas ───────────── */

export function RectasParalelas({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const nodos: ReactNode[] = [];
  nodos.push(<Seg key="t" a={[40, 280]} b={[580, 280]} w={2.2} />, T([560, 270], "t", INK, 15, 0, 0));
  if (step === 0) {
    nodos.push(<Seg key="p" a={[40, 150]} b={[580, 150]} color={VERDE} w={2.2} />, T([560, 140], "p", VERDE, 15, 0, 0));
    nodos.push(<path key="f1" d="M560 280 l14 0" stroke={INK} strokeWidth="2" />, T([300, 215], "∥", AMBAR, 28, 0, 0), T([40, 336], "no tienen ningún punto común: se cortan en el infinito", VERDE, 14, 0, 0));
  } else {
    const P: Pt = [300, 150];
    const r = 170;
    const dx = Math.sqrt(r * r - 130 * 130);
    const N: Pt = [P[0] + dx, 280];
    const M: Pt = [N[0] - r, 280];
    const R: Pt = [P[0] + r, 150];
    nodos.push(<Poli key="pg" pts={[M, N, R, P]} color={VERDE} w={2} fill="rgba(31,157,85,0.10)" />, <Seg key="par" a={[40, 150]} b={[580, 150]} color={VERDE} w={1} dash="4 4" />);
    nodos.push(<Tick key="t1" a={P} b={M} k={1} />, <Tick key="t2" a={N} b={R} k={1} />, <Tick key="t3" a={M} b={N} k={2} />, <Tick key="t4" a={P} b={R} k={2} />);
    [P, N, M, R].forEach((q, i) => nodos.push(<Dot key={`d${i}`} p={q} color={AMBAR} r={4.5} />, T(q, ["P", "N", "M", "R"][i], AMBAR, 15, i === 2 ? -18 : 8, i === 0 || i === 3 ? -8 : 20)));
    nodos.push(T([40, 336], "PR y MN son paralelas: lados opuestos iguales (paralelogramo)", VERDE, 14, 0, 0));
  }
  return (
    <Hoja scene="rectas-paralelas" block={block} step={step} setStep={setStep} label="Hoja con dos rectas paralelas y el paralelogramo de la construcción con compás" testId="bench-rectas-paralelas" titulo={["Rectas paralelas", "Paralelas con compás y regla"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Tema 4: triángulos y datos para construirlos ───────────── */

export function TriangulosClasificacion({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const nodos: ReactNode[] = [];
  const tri = (x: number, pts: Pt[], color: string, key: string) => <Poli key={key} pts={pts.map((p) => [p[0] + x, p[1]] as Pt)} color={color} w={2.2} fill="rgba(31,120,180,0.08)" />;
  if (step === 0) {
    const eq: Pt[] = [[60, 250], [160, 250], [110, 163]];
    const is: Pt[] = [[60, 250], [170, 250], [115, 140]];
    const es: Pt[] = [[60, 250], [170, 250], [90, 150]];
    nodos.push(tri(30, eq, AZUL, "a"), tri(220, is, VERDE, "b"), tri(400, es, AMBAR, "c"));
    eq.forEach((p, i) => nodos.push(<Tick key={`e${i}`} a={[p[0] + 30, p[1]]} b={[eq[(i + 1) % 3][0] + 30, eq[(i + 1) % 3][1]]} />));
    nodos.push(<Tick key="i1" a={[280, 250]} b={[335, 140]} />, <Tick key="i2" a={[390, 250]} b={[335, 140]} />, <Tick key="i3" a={[280, 250]} b={[390, 250]} k={0} />);
    nodos.push(T([60, 285], "equilátero", AZUL, 14, 0, 0), T([245, 285], "isósceles", VERDE, 14, 0, 0), T([430, 285], "escaleno", AMBAR, 14, 0, 0), T([40, 336], "por sus lados: 3 iguales, 2 iguales o ninguno", INK, 14, 0, 0));
  } else if (step === 1) {
    nodos.push(tri(30, [[60, 250], [190, 250], [130, 160]], AZUL, "a"), tri(220, [[60, 250], [190, 250], [60, 150]], VERDE, "b"), tri(400, [[60, 250], [190, 250], [20, 160]], AMBAR, "c"));
    nodos.push(<Recto key="r" v={[280, 250]} a={[410, 250]} b={[280, 150]} />);
    nodos.push(T([55, 285], "acutángulo", AZUL, 14, 0, 0), T([240, 285], "rectángulo", VERDE, 14, 0, 0), T([425, 285], "obtusángulo", AMBAR, 14, 0, 0), T([40, 336], "por sus ángulos: los tres agudos, uno recto o uno obtuso", INK, 14, 0, 0));
  } else if (step === 2) {
    const A: Pt = [150, 260];
    const B: Pt = [470, 260];
    const C: Pt = [250, 110];
    nodos.push(<Poli key="t" pts={[A, B, C]} color={AZUL} w={2.4} fill="rgba(31,120,180,0.08)" />);
    nodos.push(T(A, "α", AMBAR, 16, 22, -8), T(B, "β", AMBAR, 16, -30, -8), T(C, "γ", AMBAR, 16, -6, 30), T([40, 320], "α + β + γ = 180°", AMBAR, 16, 0, 0), T([300, 320], "cada lado < suma de los otros dos", INK, 14, 0, 0));
    nodos.push(T(A, "A", INK, 14, -16, 18), T(B, "B", INK, 14, 8, 18), T(C, "C", INK, 14, -4, -10), T([300, 280], "a", INK, 13, 0, 0));
  } else {
    const caja = (x: number, titulo: string, contenido: ReactNode) => (
      <g key={titulo}>
        <rect x={x} y={90} width={176} height={220} rx="8" fill="rgba(255,252,240,0.7)" stroke={AUX} strokeWidth="1" />
        <Txt p={[x + 12, 112]} color={VERDE} size={14}>{titulo}</Txt>
        {contenido}
      </g>
    );
    nodos.push(
      caja(30, "LLL", <g><Seg a={[55, 260]} b={[185, 260]} color={AMBAR} w={3} /><ArcoPlano c={[55, 260]} r={90} a1={20} a2={80} color={AUX} /><ArcoPlano c={[185, 260]} r={70} a1={100} a2={160} color={AUX} /><Poli pts={[[55, 260], [185, 260], [95, 180]]} color={AZUL} w={1.8} /></g>),
      caja(222, "LAL", <g><Seg a={[247, 260]} b={[377, 260]} color={AMBAR} w={3} /><Seg a={[247, 260]} b={[310, 175]} color={AMBAR} w={3} /><Seg a={[310, 175]} b={[377, 260]} color={AZUL} w={1.6} dash="5 4" /><ArcoPlano c={[247, 260]} r={26} a1={0} a2={54} color={AMBAR} grosor={2} /></g>),
      caja(414, "ALA", <g><Seg a={[439, 260]} b={[569, 260]} color={AMBAR} w={3} /><Seg a={[439, 260]} b={[505, 180]} color={AZUL} w={1.6} dash="5 4" /><Seg a={[569, 260]} b={[505, 180]} color={AZUL} w={1.6} dash="5 4" /><ArcoPlano c={[439, 260]} r={24} a1={0} a2={50} color={AMBAR} grosor={2} /><ArcoPlano c={[569, 260]} r={24} a1={130} a2={180} color={AMBAR} grosor={2} /></g>),
    );
  }
  return (
    <Hoja scene="triangulos-clasificacion" block={block} step={step} setStep={setStep} label="Hoja con la clasificación de triángulos, sus propiedades y los datos para construirlos" testId="bench-triangulos-clasificacion" titulo={["Triángulos según sus lados", "Triángulos según sus ángulos", "Propiedades de los triángulos", "Datos para construirlos"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Tema 5: cuadriláteros ───────────── */

export function CuadrilaterosFamilias({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const nodos: ReactNode[] = [];
  const f = (x: number, y: number, pts: Pt[], nombre: string, color: string, key: string, sub?: ReactNode) => (
    <g key={key}>
      <Poli pts={pts.map((p) => [p[0] + x, p[1] + y] as Pt)} color={color} w={2.2} fill={`${color}18`} />
      <Txt p={[x, y + 82]} color={color} size={13}>{nombre}</Txt>
      {sub}
    </g>
  );
  if (step === 0) {
    nodos.push(f(40, 100, [[0, 60], [60, 60], [60, 0], [0, 0]], "cuadrado", AZUL, "c"), f(180, 100, [[0, 60], [90, 60], [90, 0], [0, 0]].map(([a, b]) => [a, b * 0.75] as Pt), "rectángulo", AZUL, "r"), f(330, 100, [[30, 0], [60, 30], [30, 60], [0, 30]], "rombo", AZUL, "ro"), f(470, 100, [[0, 60], [80, 60], [105, 0], [25, 0]], "romboide", AZUL, "rm"));
    nodos.push(T([40, 250], "dos pares de lados paralelos: los paralelogramos", AZUL, 14, 0, 0));
  } else if (step === 1) {
    nodos.push(f(60, 100, [[0, 60], [100, 60], [100, 0], [0, 0]].map(([a, b], i) => (i === 3 ? [30, 0] : [a, b]) as Pt), "trapecio rectángulo", VERDE, "a"), f(230, 100, [[0, 60], [100, 60], [80, 0], [20, 0]], "trapecio isósceles", VERDE, "b"), f(400, 100, [[0, 60], [110, 60], [85, 0], [15, 0]].map(([a, b], i) => (i === 3 ? [45, 5] : [a, b]) as Pt), "trapecio escaleno", VERDE, "c"));
    nodos.push(T([40, 250], "un solo par de lados paralelos: los trapecios", VERDE, 14, 0, 0));
  } else if (step === 2) {
    const dl: Pt[] = [[60, 90], [110, 20], [160, 90], [110, 150]];
    nodos.push(<Poli key="d" pts={dl.map((p) => [p[0] + 40, p[1] + 80] as Pt)} color={AMBAR} w={2.2} fill="rgba(224,168,0,0.12)" />, <Poli key="z" pts={[[360, 230], [420, 130], [540, 170], [500, 260]]} color={AMBAR} w={2.2} fill="rgba(224,168,0,0.12)" />);
    nodos.push(<Tick key="t1" a={[100, 170]} b={[150, 100]} />, <Tick key="t2" a={[150, 100]} b={[200, 170]} />, <Tick key="t3" a={[100, 170]} b={[150, 230]} k={2} />, <Tick key="t4" a={[200, 170]} b={[150, 230]} k={2} />);
    nodos.push(T([70, 290], "deltoide", AMBAR, 14, 0, 0), T([400, 290], "trapezoide", AMBAR, 14, 0, 0), T([40, 336], "ningún par paralelo; el deltoide tiene dos pares de lados consecutivos iguales", INK, 13, 0, 0));
  } else {
    const q: Pt[] = [[200, 270], [440, 250], [400, 110], [250, 140]];
    nodos.push(<Poli key="q" pts={q} color={AZUL} w={2.4} fill="rgba(31,120,180,0.08)" />);
    q.forEach((p, i) => nodos.push(<Dot key={i} p={p} color={AMBAR} />));
    nodos.push(T([300, 215], "360°", AMBAR, 20, 0, 0), T([40, 336], "α + β + γ + δ = 360°", AMBAR, 16, 0, 0));
  }
  return (
    <Hoja scene="cuadrilateros-familias" block={block} step={step} setStep={setStep} label="Hoja con las familias de cuadriláteros" testId="bench-cuadrilateros-familias" titulo={["Paralelogramos", "Trapecios", "Trapezoides", "Suma de ángulos"][step]}>
      {nodos}
    </Hoja>
  );
}

export function CuadrilaterosPropiedades({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const nodos: ReactNode[] = [];
  const diag = (p: Pt[], color = AMBAR) => [<Seg key="d1" a={p[0]} b={p[2]} color={color} w={1.8} dash="6 4" />, <Seg key="d2" a={p[1]} b={p[3]} color={color} w={1.8} dash="6 4" />];
  if (step === 0) {
    const p: Pt[] = [[130, 270], [400, 270], [490, 120], [220, 120]];
    const m: Pt = [310, 195];
    nodos.push(<Poli key="p" pts={p} color={AZUL} w={2.4} fill="rgba(31,120,180,0.08)" />, ...diag(p), <Dot key="m" p={m} color={AMBAR} r={5} />, <Tick key="a" a={p[0]} b={m} />, <Tick key="b" a={m} b={p[2]} />, <Tick key="c" a={p[1]} b={m} k={2} />, <Tick key="d" a={m} b={p[3]} k={2} />);
    nodos.push(T([40, 336], "lados y ángulos opuestos iguales; las diagonales se cortan en su punto medio", INK, 13, 0, 0));
  } else if (step === 1) {
    const r: Pt[] = [[100, 260], [270, 260], [270, 130], [100, 130]];
    const ro: Pt[] = [[340, 195], [430, 270], [520, 195], [430, 120]];
    nodos.push(<Poli key="r" pts={r} color={AZUL} w={2.4} fill="rgba(31,120,180,0.08)" />, ...diag(r), <Poli key="ro" pts={ro} color={VERDE} w={2.4} fill="rgba(31,157,85,0.08)" />, <Seg key="e1" a={ro[0]} b={ro[2]} color={AMBAR} w={1.8} dash="6 4" />, <Seg key="e2" a={ro[1]} b={ro[3]} color={AMBAR} w={1.8} dash="6 4" />, <Recto key="rc" v={[430, 195]} a={ro[2]} b={ro[3]} s={11} />);
    nodos.push(T([110, 290], "diagonales iguales", AZUL, 14, 0, 0), T([350, 290], "diagonales perpendiculares", VERDE, 14, 0, 0), T([40, 336], "rectángulo y rombo", INK, 13, 0, 0));
  } else if (step === 2) {
    const c: Pt[] = [[235, 270], [385, 270], [385, 120], [235, 120]];
    nodos.push(<Poli key="c" pts={c} color={AZUL} w={2.4} fill="rgba(31,120,180,0.08)" />, ...diag(c), <Recto key="rc" v={[290, 195]} a={c[2]} b={c[3]} s={11} />);
    nodos.push(T([262, 240], "d", AMBAR, 16, 0, 0), T([305, 292], "l", AZUL, 16, 0, 0), T([40, 336], "l = d / √2: reúne las propiedades del rectángulo y del rombo", INK, 13, 0, 0));
  } else if (step === 3) {
    const O: Pt = [310, 190];
    const p: Pt[] = [enCirculo(O, 130, 200), enCirculo(O, 130, 340), enCirculo(O, 130, 50), enCirculo(O, 130, 130)];
    nodos.push(<Circ key="c" c={O} r={130} color={AUX} w={1.2} dash="4 4" />, <Poli key="t" pts={[p[0], p[1], p[2], p[3]]} color={AZUL} w={2.4} fill="rgba(31,120,180,0.08)" />, ...diag(p));
    p.forEach((q, i) => nodos.push(<Dot key={i} p={q} color={AMBAR} />));
    nodos.push(T([40, 336], "isósceles: lados no paralelos y diagonales iguales; inscriptible", INK, 13, 0, 0));
  } else {
    const A: Pt = [160, 260];
    const B: Pt = [330, 260];
    const D: Pt = [230, 140];
    const C: Pt = [B[0] + (D[0] - A[0]), D[1]];
    nodos.push(<Poli key="p" pts={[A, B, C, D]} color={VERDE} w={2.4} fill="rgba(31,157,85,0.08)" />, <ArcoPlano key="g" c={A} r={34} a1={0} a2={angDe(A, D)} color={AMBAR} grosor={2} />);
    nodos.push(<Seg key="ab" a={A} b={B} color={AMBAR} w={4} />, <Seg key="ad" a={A} b={D} color={AMBAR} w={4} />, T([330, 190], "dos lados y el ángulo", INK, 14, 120, 0), T([330, 215], "que forman", INK, 14, 120, 0));
    nodos.push(T([40, 336], "o un lado y las dos diagonales: bastan para construir un paralelogramo", INK, 13, 0, 0));
  }
  return (
    <Hoja scene="cuadrilateros-propiedades" block={block} step={step} setStep={setStep} label="Hoja con las propiedades de las diagonales de los cuadriláteros" testId="bench-cuadrilateros-propiedades" titulo={["Paralelogramo", "Rectángulo y rombo", "Cuadrado", "Trapecio isósceles", "Para construir un paralelogramo"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Tema 5: polígonos regulares ───────────── */

export function PoligonosLadoRadio({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const O: Pt = [310, 195];
  const R = 120;
  const nodos: ReactNode[] = [];
  const poligono = (n: number, rot: number, color: string) => {
    const p = poly(O, R, n, rot);
    nodos.push(<Circ key="c" c={O} r={R} color={AUX} w={1.2} dash="4 4" />, <Poli key="p" pts={p} color={color} w={2.4} fill={`${color}14`} />, <Seg key="r" a={O} b={p[0]} color={AMBAR} w={2} />, <Seg key="l" a={p[0]} b={p[1]} color={color} w={4.4} />, <Dot key="o" p={O} />);
    nodos.push(T(puntoMedio(O, p[0]), "R", AMBAR, 15, 8, 0), T(puntoMedio(p[0], p[1]), "l", color, 16, 8, -4));
  };
  const formulas = ["l = R √3", "l = R √2", "l = R", "l = 1,176 R", "l = 0,618 R"];
  if (step === 0) poligono(3, 90, AZUL);
  else if (step === 1) poligono(4, 45, AZUL);
  else if (step === 2) {
    poligono(6, 0, VERDE);
    const q = poly(O, R, 6, 0);
    q.forEach((p) => nodos.push(<Seg key={`s${p[0]}`} a={O} b={p} color={VERDE} w={1} />));
    nodos.push(T([440, 200], "3 hexágonos", VERDE, 13, 0, 0), T([440, 218], "suman 360°", VERDE, 13, 0, 0));
  } else if (step === 3) poligono(5, 90, MORADO);
  else poligono(10, 90, MORADO);
  nodos.push(T([40, 336], formulas[step], AMBAR, 20, 0, 0));
  return (
    <Hoja scene="poligonos-lado-radio" block={block} step={step} setStep={setStep} label="Hoja con polígonos regulares inscritos y su lado en función del radio" testId="bench-poligonos-lado-radio" titulo={["Triángulo equilátero", "Cuadrado", "Hexágono", "Pentágono", "Decágono"][step]}>
      {nodos}
    </Hoja>
  );
}

export function ConstruccionesExactas({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const nodos: ReactNode[] = [];
  const O: Pt = [310, 200];
  const R = 100;
  if (step === 0 || step === 4) {
    const ns = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    ns.forEach((n, i) => {
      const x = 70 + (i % 5) * 110;
      const y = 120 + Math.floor(i / 5) * 120;
      const exacto = ![7, 9, 11].includes(n);
      const color = step === 0 ? (exacto ? VERDE : ROJO) : [7, 9, 11].includes(n) ? ROJO : AUX;
      nodos.push(<Poli key={n} pts={poly([x, y], 34, n, 90)} color={color} w={2} fill={`${color}18`} />, T([x, y + 52], String(n), color, 14, -4, 0));
    });
    if (step === 0) nodos.push(T([40, 336], "exactas (verde): 3, 4, 5, 6, 8, 10, 12 y sus dobles; general: aproximado", INK, 13, 0, 0));
    else nodos.push(T([40, 336], "7, 9 y 11 lados: imposibles con regla y compás de forma exacta", ROJO, 13, 0, 0));
  } else if (step === 1) {
    const h = poly(O, R, 6, 0);
    nodos.push(<Circ key="c" c={O} r={R} color={AUX} w={1.2} />, <Poli key="h" pts={h} color={AUX} w={1} />, <Poli key="t" pts={[h[0], h[2], h[4]]} color={AZUL} w={2.6} fill="rgba(31,120,180,0.10)" />);
    const d = poly(O, R, 12, 0);
    d.forEach((p, i) => nodos.push(<Dot key={i} p={p} color={i % 2 ? AMBAR : AZUL} r={3.6} />));
    nodos.push(T([40, 336], "triángulo: vértices alternos del hexágono; dodecágono: se bisecan sus arcos", INK, 13, 0, 0));
  } else if (step === 2) {
    const c4 = poly(O, R, 4, 90);
    nodos.push(<Circ key="c" c={O} r={R} color={AUX} w={1.2} />, <Seg key="d1" a={c4[0]} b={c4[2]} color={AUX} w={1} />, <Seg key="d2" a={c4[1]} b={c4[3]} color={AUX} w={1} />, <Poli key="q" pts={c4} color={AZUL} w={2.6} fill="rgba(31,120,180,0.10)" />);
    poly(O, R, 8, 45 + 0).forEach((p, i) => nodos.push(<Dot key={i} p={p} color={AMBAR} r={3.6} />));
    nodos.push(T([40, 336], "cuadrado: dos diámetros perpendiculares; octógono: se bisecan sus arcos", INK, 13, 0, 0));
  } else {
    const p5 = poly(O, R, 5, 90);
    nodos.push(<Circ key="c" c={O} r={R} color={AUX} w={1.2} />, <Poli key="p" pts={p5} color={MORADO} w={2.6} fill="rgba(124,92,191,0.10)" />, <Seg key="l" a={p5[0]} b={p5[1]} color={AMBAR} w={4.4} />, T(puntoMedio(p5[0], p5[1]), "lado áureo", AMBAR, 13, -64, -12));
    nodos.push(T([40, 336], "pentágono y decágono: con el lado áureo (el del decágono es R/φ)", INK, 13, 0, 0));
  }
  return (
    <Hoja scene="construcciones-exactas" block={block} step={step} setStep={setStep} label="Hoja con las construcciones exactas de polígonos regulares" testId="bench-construcciones-exactas" titulo={["Exactas y método general", "Triángulo y dodecágono", "Cuadrado y octógono", "Pentágono y decágono", "Imposibles: 7, 9 y 11"][step]}>
      {nodos}
    </Hoja>
  );
}

export function PoligonoDadoLado({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const nodos: ReactNode[] = [];
  const O: Pt = [190, 210];
  if (step === 0) {
    const p = poly(O, 60, 5, 90);
    const q = poly(O, 120, 5, 90);
    nodos.push(<Poli key="g" pts={q} color={VERDE} w={2.4} fill="rgba(31,157,85,0.08)" />, <Poli key="p" pts={p} color={AZUL} w={2.4} fill="rgba(31,120,180,0.10)" />, <Seg key="l1" a={p[0]} b={p[1]} color={AZUL} w={4.4} />, <Seg key="l2" a={q[0]} b={q[1]} color={AMBAR} w={4.4} />);
    nodos.push(<Seg key="h1" a={O} b={q[0]} color={AUX} w={1} dash="4 3" />, <Seg key="h2" a={O} b={q[1]} color={AUX} w={1} dash="4 3" />, T(puntoMedio(q[0], q[1]), "l (dato)", AMBAR, 14, 8, -8));
    nodos.push(T([40, 336], "se construye en una circunferencia auxiliar y se amplía hasta que el lado valga l", INK, 13, 0, 0));
  } else if (step === 1) {
    const p = poly(O, 120, 5, 90);
    nodos.push(<Circ key="c" c={O} r={120} color={AUX} w={1.2} dash="4 4" />, <Poli key="p" pts={p} color={VERDE} w={2.4} fill="rgba(31,157,85,0.08)" />, <Seg key="r" a={O} b={p[0]} color={AMBAR} w={2} />, <Seg key="l" a={p[0]} b={p[1]} color={AMBAR} w={4.4} />);
    nodos.push(T([330, 140], "R = l / (2 sen(180°/n))", AMBAR, 18, 0, 0), T([330, 170], "se calcula el radio", INK, 14, 0, 0), T([330, 192], "y se inscribe el polígono", INK, 14, 0, 0));
  } else if (step === 2) {
    const h = poly([170, 210], 90, 6, 0);
    nodos.push(<Poli key="h" pts={h} color={AZUL} w={2.4} fill="rgba(31,120,180,0.08)" />, <Seg key="r" a={[170, 210]} b={h[0]} color={AMBAR} w={2} />, <Seg key="l" a={h[0]} b={h[1]} color={AMBAR} w={4.4} />);
    nodos.push(<Poli key="c" pts={[[400, 290], [540, 290], [540, 150], [400, 150]]} color={VERDE} w={2.4} fill="rgba(31,157,85,0.08)" />, <Seg key="d" a={[400, 290]} b={[540, 150]} color={AMBAR} w={1.6} dash="5 4" />);
    nodos.push(T([110, 336], "hexágono: l = R", AZUL, 14, 0, 0), T([400, 336], "cuadrado: con la diagonal", VERDE, 14, 0, 0));
  } else {
    const A: Pt = [160, 290];
    const B: Pt = [280, 290];
    const C = enCirculo(B, 120, 72);
    const D = enCirculo(A, 120, 108);
    const E = enCirculo(C, 120, 144);
    nodos.push(<Poli key="p" pts={[A, B, C, E, D]} color={MORADO} w={2.4} fill="rgba(124,92,191,0.08)" />, <ArcoPlano key="a1" c={A} r={30} a1={0} a2={108} color={AMBAR} grosor={2} />, <ArcoPlano key="a2" c={B} r={30} a1={72} a2={180} color={AMBAR} grosor={2} />, <Seg key="ab" a={A} b={B} color={AMBAR} w={4.4} />);
    nodos.push(<Seg key="m1" a={puntoMedio(D, A)} b={enCirculo(puntoMedio(D, A), 40, 18)} color={AUX} w={1} dash="3 3" />);
    nodos.push(T([400, 140], "se traza el lado y, en", INK, 14, 0, 0), T([400, 160], "cada extremo, el ángulo", INK, 14, 0, 0), T([400, 180], "interior; se cierra con", INK, 14, 0, 0), T([400, 200], "las mediatrices", INK, 14, 0, 0));
  }
  return (
    <Hoja scene="poligono-dado-lado" block={block} step={step} setStep={setStep} label="Hoja con las formas de construir un polígono regular conocido su lado" testId="bench-poligono-dado-lado" titulo={["Construir y ampliar", "Calcular el radio", "Casos directos", "Método de los ángulos"][step]}>
      {nodos}
    </Hoja>
  );
}

export function PoligonosUsos({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const nodos: ReactNode[] = [];
  const c: Pt = [310, 190];
  if (step === 0) {
    nodos.push(<Poli key="t" pts={poly(c, 80, 6, 0)} color={AUX} w={3} fill="rgba(0,0,0,0.12)" />, <Circ key="h" c={c} r={32} color={AUX} w={2.4} fill="#fffefa" />);
    nodos.push(<Poli key="s" pts={poly([480, 130], 46, 8, 22.5)} color={ROJO} w={3} fill="rgba(192,57,43,0.18)" />, T([456, 136], "STOP", ROJO, 14, 0, 0));
    [[100, 300], [150, 300], [125, 257]].forEach((p, i) => i < 0 || nodos.push(<Poli key={`b${i}`} pts={poly(p as Pt, 30, [3, 4, 6][i], 90)} color={AZUL} w={2} fill="rgba(31,120,180,0.12)" />));
  } else if (step === 1) {
    nodos.push(<Circ key="r" c={c} r={110} color={AMBAR} w={2} />);
    for (let i = 0; i < 8; i += 1) nodos.push(<Circ key={`p${i}`} c={enCirculo(c, 64, i * 45)} r={44} color={AMBAR} w={1.6} />);
    nodos.push(<Poli key="o" pts={poly(c, 110, 8, 22.5)} color={INK} w={1.4} />);
  } else if (step === 2) {
    const p = poly(c, 110, 5, 90);
    [[0, 2], [2, 4], [4, 1], [1, 3], [3, 0]].forEach(([a, b]) => nodos.push(<Seg key={`${a}${b}`} a={p[a]} b={p[b]} color={AMBAR} w={2.6} />));
    nodos.push(<Circ key="c" c={c} r={110} color={AUX} w={1.2} />);
  } else {
    nodos.push(<rect key="u" x={150} y={120} width={320} height={130} rx="8" fill="rgba(31,120,180,0.08)" stroke={AZUL} strokeWidth="2" />, T([170, 150], "Polígono regular", AZUL, 16, 0, 0), T([170, 182], "lados: n = 6", INK, 15, 0, 0), T([170, 208], "radio: R = 40 mm  (o lado l)", INK, 15, 0, 0));
    nodos.push(<Poli key="h" pts={poly([420, 190], 30, 6, 0)} color={AMBAR} w={2.4} />);
  }
  return (
    <Hoja scene="poligonos-usos" block={block} step={step} setStep={setStep} label="Hoja con aplicaciones de los polígonos regulares" testId="bench-poligonos-usos" titulo={["Tuercas, señales y teselados", "Arquitectura", "Pentagrama y estrellas", "En CAD"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Tema 8: tangencias ───────────── */

export function TangentePropiedades({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const O: Pt = [250, 195];
  const R = 100;
  const nodos: ReactNode[] = [];
  nodos.push(<Circ key="c" c={O} r={R} color={INK} w={2} />, <Dot key="o" p={O} />, T(O, "O", INK, 15, 6, 18));
  if (step <= 1) {
    const Tt: Pt = enCirculo(O, R, 40);
    const d: Pt = [-Math.sin((40 * Math.PI) / 180), -Math.cos((40 * Math.PI) / 180)];
    nodos.push(<Seg key="t" a={[Tt[0] - d[0] * 140, Tt[1] - d[1] * 140]} b={[Tt[0] + d[0] * 140, Tt[1] + d[1] * 140]} color={VERDE} w={2.2} />, <Dot key="T" p={Tt} color={AMBAR} r={5} />, T(Tt, "T", AMBAR, 16, 8, -8));
    if (step === 1) nodos.push(<Seg key="rad" a={O} b={Tt} color={AMBAR} w={2} />, <Recto key="r" v={Tt} a={O} b={[Tt[0] + d[0] * 30, Tt[1] + d[1] * 30]} s={12} />);
  } else {
    const P: Pt = [520, 195];
    const dd = dist(O, P);
    const th = (Math.acos(R / dd) * 180) / Math.PI;
    const T1 = enCirculo(O, R, th);
    const T2 = enCirculo(O, R, -th);
    nodos.push(<Dot key="p" p={P} />, T(P, "P", INK, 15, 8, 4), <Seg key="a" a={P} b={T1} color={VERDE} w={2.2} />, <Seg key="b" a={P} b={T2} color={VERDE} w={2.2} />, <Dot key="t1" p={T1} color={AMBAR} r={5} />, <Dot key="t2" p={T2} color={AMBAR} r={5} />);
    nodos.push(T(T1, "T₁", AMBAR, 14, -4, -10), T(T2, "T₂", AMBAR, 14, -4, 20), <Tick key="k1" a={P} b={T1} />, <Tick key="k2" a={P} b={T2} />);
    if (step === 3) nodos.push(<Seg key="o1" a={O} b={T1} color={AMBAR} w={1.6} dash="5 4" />, <Seg key="op" a={O} b={P} color={AMBAR} w={1.6} dash="5 4" />, <Recto key="r" v={T1} a={O} b={P} s={10} />, T([380, 330], "PT = √(OP² − R²)", AMBAR, 16, 0, 0));
  }
  return (
    <Hoja scene="tangente-propiedades" block={block} step={step} setStep={setStep} label="Hoja con las propiedades de la recta tangente a una circunferencia" testId="bench-tangente-propiedades" titulo={["Un solo punto en común", "Perpendicular al radio", "Desde un punto exterior", "Longitud de la tangente"][step]}>
      {nodos}
    </Hoja>
  );
}

export function TangentesSencillas({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const O: Pt = [310, 195];
  const R = 95;
  const nodos: ReactNode[] = [];
  nodos.push(<Circ key="c" c={O} r={R} color={INK} w={2} />, <Dot key="o" p={O} />);
  if (step === 0) {
    const Tt = enCirculo(O, R, 50);
    nodos.push(<Seg key="r" a={O} b={Tt} color={AMBAR} w={2} />, <Seg key="t" a={enCirculo(Tt, 130, 140)} b={enCirculo(Tt, 130, -40)} color={VERDE} w={2.2} />, <Dot key="T" p={Tt} color={AMBAR} r={5} />, T(Tt, "T", AMBAR, 16, 8, -8));
  } else if (step === 1) {
    const dir = 32; // dirección de la recta dada
    nodos.push(<Seg key="r" a={enCirculo([100, 330], 20, dir)} b={enCirculo([100, 330], 480, dir)} color={AUX} w={1.8} />, T([470, 150], "r", AUX, 15, 0, 0));
    const A = enCirculo(O, R, dir + 90);
    const B = enCirculo(O, R, dir - 90);
    nodos.push(<Seg key="di" a={A} b={B} color={AMBAR} w={1.8} dash="5 4" />, <Dot key="a" p={A} color={AMBAR} r={5} />, <Dot key="b" p={B} color={AMBAR} r={5} />);
    [A, B].forEach((p, i) => nodos.push(<Seg key={`t${i}`} a={enCirculo(p, 150, dir)} b={enCirculo(p, 150, dir + 180)} color={VERDE} w={2.2} />));
  } else {
    const ang = 35;
    nodos.push(<Seg key="r" a={[100, 330]} b={[540, 330]} color={AUX} w={1.8} />, T([510, 320], "r", AUX, 15, 0, 0));
    const Q = enCirculo(O, R, ang + 90);
    nodos.push(<Seg key="rad" a={O} b={Q} color={AMBAR} w={2} />, <Dot key="t" p={Q} color={AMBAR} r={5} />, <Seg key="tg" a={enCirculo(Q, 140, ang)} b={enCirculo(Q, 140, ang + 180)} color={VERDE} w={2.2} />);
    nodos.push(<ArcoPlano key="g" c={[400, 330]} r={36} a1={0} a2={ang} color={AMBAR} grosor={2} />, T([440, 300], "ángulo dado", AMBAR, 13, 0, 0));
  }
  return (
    <Hoja scene="tangentes-sencillas" block={block} step={step} setStep={setStep} label="Hoja con tangentes sencillas: en un punto, paralela a una recta y con ángulo dado" testId="bench-tangentes-sencillas" titulo={["Tangente en un punto", "Tangente paralela a una recta", "Tangente con un ángulo dado"][step]}>
      {nodos}
    </Hoja>
  );
}

export function TangentesComunes({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const C1: Pt = [170, 200];
  const C2: Pt = [440, 200];
  const R1 = 95;
  const R2 = 50;
  const d = dist(C1, C2);
  const nodos: ReactNode[] = [];
  nodos.push(<Circ key="a" c={C1} r={R1} color={INK} w={2} />, <Circ key="b" c={C2} r={R2} color={INK} w={2} />, <Dot key="o1" p={C1} />, <Dot key="o2" p={C2} />, <Seg key="ce" a={C1} b={C2} color={AUX} w={1} dash="4 4" />);
  if (step === 0) {
    nodos.push(T([40, 336], "dos circunferencias de radios R y r, con d entre sus centros", INK, 13, 0, 0));
  } else if (step <= 2) {
    const al = Math.asin((R1 - R2) / d);
    [1, -1].forEach((sg, i) => {
      const u: Pt = [Math.sin(al), -sg * Math.cos(al)];
      const a: Pt = [C1[0] + R1 * u[0], C1[1] + R1 * u[1]];
      const b: Pt = [C2[0] + R2 * u[0], C2[1] + R2 * u[1]];
      nodos.push(<Seg key={`e${i}`} a={a} b={b} color={VERDE} w={2.2} />, <Dot key={`ea${i}`} p={a} color={AMBAR} r={4} />, <Dot key={`eb${i}`} p={b} color={AMBAR} r={4} />);
    });
    if (step === 2) nodos.push(<Circ key="aux" c={C1} r={R1 - R2} color={MORADO} w={1.8} dash="5 4" />, T([40, 336], "circunferencia auxiliar de radio R − r", MORADO, 14, 0, 0));
    else nodos.push(T([40, 336], "exteriores: longitud √(d² − (R − r)²)", VERDE, 14, 0, 0));
  } else {
    const al = Math.asin((R1 + R2) / d);
    [1, -1].forEach((sg, i) => {
      const u: Pt = [Math.sin(al), -sg * Math.cos(al)];
      const a: Pt = [C1[0] + R1 * u[0], C1[1] + R1 * u[1]];
      const b: Pt = [C2[0] - R2 * u[0], C2[1] - R2 * u[1]];
      nodos.push(<Seg key={`i${i}`} a={a} b={b} color={AMBAR} w={2.2} />, <Dot key={`ia${i}`} p={a} color={VERDE} r={4} />, <Dot key={`ib${i}`} p={b} color={VERDE} r={4} />);
    });
    nodos.push(<Circ key="aux" c={C1} r={R1 + R2} color={MORADO} w={1.8} dash="5 4" />, T([210, 358], "interiores: circunferencia auxiliar R + r; longitud √(d² − (R + r)²)", MORADO, 13, 0, 0));
  }
  return (
    <Hoja scene="tangentes-comunes" block={block} step={step} setStep={setStep} label="Hoja con las tangentes comunes a dos circunferencias" testId="bench-tangentes-comunes" titulo={["Dos circunferencias", "Tangentes exteriores", "Con la circunferencia auxiliar", "Tangentes interiores"][step]}>
      {nodos}
    </Hoja>
  );
}

/** Dos rectas que forman 62° con vértice V y un enlace de radio rr tangente a ambas. */
const EN = (() => {
  const V: Pt = [140, 310];
  const ang = 62;
  const rr = 62;
  const d = rr / Math.sin((ang / 2) * (Math.PI / 180));
  const O = enCirculo(V, d, ang / 2);
  const Ta: Pt = [O[0], V[1]];
  const Tb = enCirculo(V, d * Math.cos((ang / 2) * (Math.PI / 180)), ang);
  return { V, ang, rr, O, Ta, Tb };
})();

function EnlaceBase({ extra }: { extra?: ReactNode }) {
  const { V, ang } = EN;
  return (
    <g>
      <Seg a={V} b={[580, V[1]]} w={2.2} />
      <Seg a={V} b={enCirculo(V, 280, ang)} w={2.2} />
      {extra}
    </g>
  );
}

export function EnlaceLugares({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const { V, ang, rr, O, Ta, Tb } = EN;
  const nodos: ReactNode[] = [];
  if (step === 0) {
    nodos.push(<ArcoPlano key="arc" c={O} r={rr} a1={ang + 90} a2={270} color={VERDE} grosor={3.4} />, <Dot key="a" p={Ta} color={AMBAR} />, <Dot key="b" p={Tb} color={AMBAR} />, T(Ta, "T₁", AMBAR, 13, -6, 18), T(Tb, "T₂", AMBAR, 13, -26, -6));
    nodos.push(T([40, 336], "el enlace es un arco tangente a las dos líneas, sin cambio brusco de dirección", INK, 13, 0, 0));
  } else if (step === 1) {
    const o2 = enCirculo(V, rr, ang - 90);
    nodos.push(<Seg key="p1" a={[140, V[1] - rr]} b={[580, V[1] - rr]} color={AMBAR} w={1.8} dash="6 4" />, <Seg key="p2" a={enCirculo(o2, 50, ang)} b={enCirculo(o2, 280, ang)} color={AMBAR} w={1.8} dash="6 4" />, <Dot key="o" p={O} color={AMBAR} r={5} />, T(O, "O", AMBAR, 15, 8, -6));
    nodos.push(T([40, 336], "a distancia r de una recta: en una de sus paralelas; el centro es su intersección", AMBAR, 13, 0, 0));
  } else if (step === 2) {
    const C: Pt = [330, 190];
    nodos.push(<Circ key="c0" c={C} r={70} color={INK} w={2} />, <Dot key="oo" p={C} />, <Circ key="c2" c={C} r={110} color={AMBAR} w={1.8} dash="5 4" />, <Circ key="c1" c={C} r={40} color={AMBAR} w={1.8} dash="5 4" />, T([C[0] + 76, C[1] - 6], "R", INK, 14, 0, 0), T([C[0] + 112, C[1] + 16], "R + r", AMBAR, 13, 0, 0), T([C[0] + 42, C[1] + 16], "R − r", AMBAR, 13, 0, 0));
    nodos.push(T([40, 336], "a distancia R ± r de otro centro: en una circunferencia concéntrica", AMBAR, 13, 0, 0));
  } else {
    nodos.push(<Seg key="bi" a={V} b={enCirculo(V, 330, ang / 2)} color={MORADO} w={2.2} dash="6 4" />, <Dot key="o" p={O} color={MORADO} r={5} />, T(O, "O", MORADO, 15, 8, -6), <Circ key="c" c={O} r={rr} color={VERDE} w={1.6} dash="3 4" />);
    nodos.push(T([40, 336], "equidistante de dos rectas: en su bisectriz", MORADO, 13, 0, 0));
  }
  return (
    <Hoja scene="enlace-lugares" block={block} step={step} setStep={setStep} label="Hoja con el centro de un enlace como intersección de lugares geométricos" testId="bench-enlace-lugares" titulo={["Redondear una esquina", "Paralelas a una recta", "Circunferencia concéntrica", "Bisectriz de dos rectas"][step]}>
      <EnlaceBase />
      {nodos}
    </Hoja>
  );
}

export function EnlaceCasos({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const nodos: ReactNode[] = [];
  if (step === 0) {
    nodos.push(<EnlaceBase key="eb" />, <Circ key="c" c={EN.O} r={EN.rr} color={VERDE} w={2.4} />, <Dot key="o" p={EN.O} color={AMBAR} />, <Dot key="a" p={EN.Ta} color={AMBAR} />, <Dot key="b" p={EN.Tb} color={AMBAR} />);
    nodos.push(T([40, 336], "tangente a dos rectas: centro en la intersección de dos paralelas (o la bisectriz)", INK, 13, 0, 0));
  } else if (step === 1) {
    const Cc: Pt = [250, 170];
    const Rc = 70;
    const r = 35;
    const y = 300;
    const cy = y - r;
    const cx = Cc[0] + Math.sqrt((Rc + r) ** 2 - (cy - Cc[1]) ** 2);
    nodos.push(<Seg key="l" a={[60, y]} b={[580, y]} w={2.2} />, <Circ key="b" c={Cc} r={Rc} color={INK} w={2} />, <Dot key="ob" p={Cc} />, <Circ key="c" c={[cx, cy]} r={r} color={VERDE} w={2.4} />, <Dot key="o" p={[cx, cy]} color={AMBAR} />);
    nodos.push(<Seg key="p" a={[60, cy]} b={[580, cy]} color={AMBAR} w={1.4} dash="5 4" />, <Circ key="cc" c={Cc} r={Rc + r} color={AMBAR} w={1.4} dash="5 4" />);
    nodos.push(T([40, 336], "tangente a una recta y a una circunferencia: paralela y concéntrica de radio R ± r", INK, 13, 0, 0));
  } else if (step === 2) {
    const P: Pt = [310, 300];
    const r = 70;
    nodos.push(<Seg key="l" a={[60, 300]} b={[580, 300]} w={2.2} />, <Dot key="p" p={P} color={AMBAR} />, T(P, "P", AMBAR, 15, 8, 18), <Seg key="pe" a={P} b={[310, 80]} color={AMBAR} w={1.4} dash="5 4" />, <Circ key="c" c={[310, 300 - r]} r={r} color={VERDE} w={2.4} />, <Dot key="o" p={[310, 300 - r]} color={AMBAR} />);
    nodos.push(T([40, 336], "tangente a una recta por un punto de ella: el centro está en la perpendicular", INK, 13, 0, 0));
  } else {
    const C1: Pt = [170, 250];
    const C2: Pt = [450, 250];
    const R1 = 55;
    const R2 = 55;
    const r = 100;
    const h = Math.sqrt((R1 + r) ** 2 - 140 ** 2);
    const O: Pt = [310, 250 - h];
    const T1: Pt = [C1[0] + (R1 * (O[0] - C1[0])) / (R1 + r), C1[1] + (R1 * (O[1] - C1[1])) / (R1 + r)];
    const T2: Pt = [C2[0] + (R2 * (O[0] - C2[0])) / (R2 + r), C2[1] + (R2 * (O[1] - C2[1])) / (R2 + r)];
    nodos.push(<Circ key="a" c={C1} r={R1} color={INK} w={2} />, <Circ key="b" c={C2} r={R2} color={INK} w={2} />, <ArcoPlano key="x1" c={C1} r={R1 + r} a1={angDe(C1, O) - 28} a2={angDe(C1, O) + 28} color={AMBAR} grosor={1.4} />, <ArcoPlano key="x2" c={C2} r={R2 + r} a1={angDe(C2, O) - 28} a2={angDe(C2, O) + 28} color={AMBAR} grosor={1.4} />);
    const a1 = angDe(O, T1);
    const a2 = angDe(O, T2);
    nodos.push(<ArcoPlano key="arc" c={O} r={r} a1={Math.min(a1, a2)} a2={Math.max(a1, a2)} color={VERDE} grosor={3.2} />, <Dot key="o" p={O} color={AMBAR} />, <Dot key="t1" p={T1} color={AMBAR} />, <Dot key="t2" p={T2} color={AMBAR} />);
    nodos.push(T([40, 336], "enlace de dos circunferencias con un arco de radio r: concéntricas de radios R₁ ± r y R₂ ± r", INK, 13, 0, 0));
  }
  return (
    <Hoja scene="enlace-casos" block={block} step={step} setStep={setStep} label="Hoja con los casos típicos de enlaces y circunferencias tangentes" testId="bench-enlace-casos" titulo={["Tangente a dos rectas", "Tangente a una recta y a una circunferencia", "Tangente a una recta por un punto", "Enlace de dos circunferencias"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Tema 9: curvas técnicas ───────────── */

const OV = (() => {
  const A: Pt = [250, 195];
  const B: Pt = [370, 195];
  const r = 60;
  const Rg = 140;
  const h = Math.sqrt((Rg - r) ** 2 - 60 ** 2);
  const Ct: Pt = [310, 195 + h]; // centro del arco superior (por debajo del eje)
  const Cb: Pt = [310, 195 - h]; // centro del arco inferior
  const th = angDe(Ct, A);
  return { A, B, r, Rg, Ct, Cb, th };
})();

function Ovalo() {
  const { A, B, r, Rg, Ct, Cb, th } = OV;
  return (
    <g>
      <ArcoPlano c={A} r={r} a1={th} a2={360 - th} color={AZUL} grosor={3} />
      <ArcoPlano c={B} r={r} a1={-(180 - th)} a2={180 - th} color={AZUL} grosor={3} />
      <ArcoPlano c={Ct} r={Rg} a1={180 - th} a2={th} color={VERDE} grosor={3} />
      <ArcoPlano c={Cb} r={Rg} a1={-th} a2={-(180 - th)} color={VERDE} grosor={3} />
    </g>
  );
}

export function OvaloCurvas({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const { A, B, Ct, Cb } = OV;
  const nodos: ReactNode[] = [];
  if (step === 0) {
    nodos.push(<Ovalo key="o" />, T([40, 336], "se trazan con arcos de circunferencia tangentes entre sí: fáciles de construir con compás", INK, 13, 0, 0));
  } else if (step === 1) {
    nodos.push(<Ovalo key="o" />, <Seg key="e1" a={[150, 195]} b={[470, 195]} color={AUX} w={1} dash="8 3 2 3" />, <Seg key="e2" a={[310, 70]} b={[310, 320]} color={AUX} w={1} dash="8 3 2 3" />);
    [A, B, Ct, Cb].forEach((p, i) => nodos.push(<Dot key={`c${i}`} p={p} color={AMBAR} r={4} />));
    nodos.push(T([40, 336], "óvalo: 4 arcos y dos ejes de simetría (mayor y menor)", AZUL, 14, 0, 0));
  } else if (step === 2) {
    const r = 60;
    const Ccent: Pt = [310, 260];
    const Ea: Pt = [250, 260];
    const Eb: Pt = [370, 260];
    const rho = 30;
    const y = 260 - Math.sqrt((2 * r - rho) ** 2 - 60 ** 2);
    const E: Pt = [310, y];
    const a = angDe(Eb, E);
    nodos.push(<ArcoPlano key="s" c={Ccent} r={r} a1={180} a2={360} color={AZUL} grosor={3} />, <ArcoPlano key="l1" c={Eb} r={2 * r} a1={a} a2={180} color={VERDE} grosor={3} />, <ArcoPlano key="l2" c={Ea} r={2 * r} a1={0} a2={180 - a} color={VERDE} grosor={3} />, <ArcoPlano key="t" c={E} r={rho} a1={180 - a} a2={a} color={AMBAR} grosor={3} />);
    nodos.push(<Seg key="ax" a={[310, 70]} b={[310, 330]} color={AUX} w={1} dash="8 3 2 3" />, T([40, 336], "ovoide: 4 arcos y un solo eje de simetría (forma de huevo)", VERDE, 14, 0, 0));
  } else if (step === 3) {
    nodos.push(<Ovalo key="o" />, <Seg key="l1" a={Ct} b={A} color={AMBAR} w={1.4} dash="5 4" />, <Seg key="l2" a={Ct} b={B} color={AMBAR} w={1.4} dash="5 4" />, <Seg key="l3" a={Cb} b={A} color={AMBAR} w={1.4} dash="5 4" />, <Seg key="l4" a={Cb} b={B} color={AMBAR} w={1.4} dash="5 4" />);
    const Ta = enCirculo(A, OV.r, OV.th);
    [Ta, enCirculo(A, OV.r, 360 - OV.th), enCirculo(B, OV.r, 180 - OV.th), enCirculo(B, OV.r, -(180 - OV.th))].forEach((p, i) => nodos.push(<Dot key={`t${i}`} p={p} color={ROJO} r={5} />));
    nodos.push(T([40, 336], "los puntos de enlace están en las rectas que unen los centros de arcos consecutivos", INK, 13, 0, 0));
  } else {
    nodos.push(<Ovalo key="o" />, <ellipse key="el" cx={310} cy={195} rx={OV.B[0] - OV.A[0] + 60 + 0} ry={100} fill="none" stroke={ROJO} strokeWidth="2" strokeDasharray="6 4" />);
    nodos.push(T([40, 336], "no es una elipse: la elipse es una cónica de curvatura continua", ROJO, 13, 0, 0));
  }
  return (
    <Hoja scene="curvas-ovalo-ovoide" block={block} step={step} setStep={setStep} label="Hoja con óvalos y ovoides hechos con arcos" testId="bench-curvas-ovalo" titulo={["Curvas hechas con arcos", "El óvalo", "El ovoide", "Puntos de enlace", "No son elipses"][step]}>
      {nodos}
    </Hoja>
  );
}

export function OvoideDescripcion({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const r = 60;
  const Cc: Pt = [310, 270];
  const Ea: Pt = [250, 270];
  const Eb: Pt = [370, 270];
  const rho = 30;
  const y = 270 - Math.sqrt((2 * r - rho) ** 2 - 60 ** 2);
  const E: Pt = [310, y];
  const a = angDe(Eb, E);
  const top: Pt = [310, 270 - Math.sqrt((2 * r) ** 2 - 60 ** 2)];
  const nodos: ReactNode[] = [];
  nodos.push(<ArcoPlano key="s" c={Cc} r={r} a1={180} a2={360} color={AZUL} grosor={3} />, <ArcoPlano key="l1" c={Eb} r={2 * r} a1={a} a2={180} color={VERDE} grosor={step === 0 ? 3 : 1.4} />, <ArcoPlano key="l2" c={Ea} r={2 * r} a1={0} a2={180 - a} color={VERDE} grosor={step === 0 ? 3 : 1.4} />, <ArcoPlano key="t" c={E} r={rho} a1={180 - a} a2={a} color={AMBAR} grosor={3} />);
  if (step === 0) {
    nodos.push(<Seg key="d" a={Ea} b={Eb} color={AUX} w={1} />, <Dot key="a" p={Ea} color={AMBAR} />, <Dot key="b" p={Eb} color={AMBAR} />, T(Cc, "r", AZUL, 14, -4, 24), T([430, 190], "2r", VERDE, 14, 0, 0), T([335, 140], "arco superior", AMBAR, 13, 0, 0));
  } else if (step === 1) {
    nodos.push(<Poli key="tr" pts={[Ea, Eb, top]} color={MORADO} w={2} fill="rgba(124,92,191,0.12)" />, <Dot key="d" p={top} color={MORADO} r={4} />);
    nodos.push(<ArcoPlano key="g1" c={Ea} r={26} a1={0} a2={60} color={MORADO} grosor={2} />, T([268, 252], "60°", MORADO, 12, 0, 0), T([40, 336], "triángulo equilátero de lado 2r: fija los centros", MORADO, 13, 0, 0));
  } else {
    nodos.push(<Seg key="ax" a={[310, 90]} b={[310, 330]} color={AUX} w={1} dash="8 3 2 3" />, T([325, 108], "eje de simetría", AUX, 13, 0, 0), T([40, 336], "perfiles de levas y huevos de diseño", INK, 13, 0, 0));
  }
  return (
    <Hoja scene="ovoide-descripcion" block={block} step={step} setStep={setStep} label="Hoja con la construcción de un ovoide" testId="bench-ovoide" titulo={["El ovoide", "Triángulos equiláteros de 60°", "Un solo eje de simetría"][step]}>
      {nodos}
    </Hoja>
  );
}

/** Espiral de arcos de 120° cuyos centros giran por los vértices de un triángulo equilátero de lado `d`. */
function espiral(c0: Pt, d: number, arcos: number) {
  const out: { c: Pt; r: number; a1: number; a2: number }[] = [];
  let c = c0;
  for (let k = 0; k < arcos; k += 1) {
    const a1 = 120 * k;
    out.push({ c, r: (k + 1) * d, a1, a2: a1 + 120 });
    const dir = enCirculo([0, 0], d, a1 + 120);
    c = [c[0] - dir[0], c[1] - dir[1]];
  }
  return out;
}

export function EspiralesDescripcion({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const d = 12;
  const c0: Pt = [320, 185];
  const arcos = espiral(c0, d, 10);
  const nodos: ReactNode[] = [];
  arcos.forEach((a, i) => nodos.push(<ArcoPlano key={`a${i}`} c={a.c} r={a.r} a1={a.a1} a2={a.a2} color={step === 1 ? [AZUL, VERDE, AMBAR][i % 3] : INK} grosor={step === 1 ? 3 : 2} />));
  if (step === 1) {
    const cs = arcos.slice(0, 3).map((a) => a.c);
    nodos.push(<Poli key="t" pts={cs} color={MORADO} w={1.6} />);
    cs.forEach((p, i) => nodos.push(<Dot key={`c${i}`} p={p} color={MORADO} r={3.6} />));
    nodos.push(T([40, 336], "arcos de 120° con centros en los vértices de un triángulo; radios d, 2d, 3d…", MORADO, 13, 0, 0));
  } else if (step === 0) {
    nodos.push(T([40, 336], "curva abierta que se aleja de un punto con radio creciente", INK, 13, 0, 0));
  } else if (step === 2) {
    nodos.push(<rect key="cap" x={190} y={50} width={260} height={20} rx="3" fill="rgba(0,0,0,0.05)" stroke={AUX} strokeWidth="1.4" />, T([460, 66], "capitel jónico", AUX, 12, 0, 0), T([120, 336], "la voluta: espiral decorativa de los capiteles jónicos", INK, 13, -80, 0));
  } else {
    nodos.push(T([40, 336], "levas, muelles planos, volutas de bombas centrífugas y caracoles de turbinas", INK, 13, 0, 0));
  }
  return (
    <Hoja scene="espirales-descripcion" block={block} step={step} setStep={setStep} label="Hoja con una espiral hecha con arcos de circunferencia" testId="bench-espirales" titulo={["Una espiral técnica", "Espiral de tres centros", "La voluta", "Aplicaciones"][step]}>
      {nodos}
    </Hoja>
  );
}
