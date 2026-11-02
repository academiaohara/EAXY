"use client";

import { type ReactNode } from "react";
import { angDe, dist, enCirculo, interseccionCirculos, puntoMedio, type Pt } from "./geometry";
import { AMBAR, AZUL, INK, VERDE, usePaso, type BenchBlock } from "./scenes";
import { Seg } from "./scenes-proporcion";
import { AUX, Dot, Hoja, Poli, Recto, T, Tick } from "./scenes-teoria";
import { ArcoPlano, Punto } from "./scenes-trazados";

/**
 * Tema 4 (libro, págs. 38–41): líneas notables y construcción de triángulos a partir de sus datos.
 * Son diagramas por pasos: cada paso añade un trazo y el texto va a la derecha. Los ángulos están en grados
 * con el convenio de `geometry.ts` (antihorario, eje Y hacia arriba).
 */
const VERDE_RELLENO = "rgba(31,157,85,0.14)";

/** Punto de corte de dos rectas dadas por un punto y un ángulo. */
function cortan(p: Pt, a1: number, q: Pt, a2: number): Pt {
  const d1: Pt = [Math.cos((a1 * Math.PI) / 180), -Math.sin((a1 * Math.PI) / 180)];
  const d2: Pt = [Math.cos((a2 * Math.PI) / 180), -Math.sin((a2 * Math.PI) / 180)];
  const det = d1[0] * -d2[1] + d2[0] * d1[1];
  const t = ((q[0] - p[0]) * -d2[1] + d2[0] * (q[1] - p[1])) / det;
  return [p[0] + d1[0] * t, p[1] + d1[1] * t];
}

/** Segmento dato (con topes en los extremos y su nombre). */
function Dato({ a, b, nombre, color = AZUL }: { a: Pt; b: Pt; nombre: string; color?: string }) {
  return (
    <g>
      <Seg a={a} b={b} color={color} w={3} />
      <Seg a={[a[0], a[1] - 6]} b={[a[0], a[1] + 6]} color={INK} w={1.4} />
      <Seg a={[b[0], b[1] - 6]} b={[b[0], b[1] + 6]} color={INK} w={1.4} />
      {T(puntoMedio(a, b), nombre, color, 14, -4, -12)}
    </g>
  );
}

/** Ángulo dato dibujado aparte: dos rayos desde `v` y su arco. */
function AnguloDato({ v, ang, nombre, color = AMBAR, len = 56 }: { v: Pt; ang: number; nombre: string; color?: string; len?: number }) {
  return (
    <g>
      <Seg a={v} b={enCirculo(v, len, 0)} color={color} w={2.4} />
      <Seg a={v} b={enCirculo(v, len, ang)} color={color} w={2.4} />
      <ArcoPlano c={v} r={len * 0.45} a1={0} a2={ang} color={color} grosor={1.8} />
      {T(enCirculo(v, len * 0.75, ang / 2), nombre, color, 13, 4, 4)}
    </g>
  );
}

/** Arco de compás (auxiliar) con un número de orden en uno de sus extremos. */
const ArcoAux = ({ c, r, a1, a2, color = AUX }: { c: Pt; r: number; a1: number; a2: number; color?: string }) => <ArcoPlano c={c} r={r} a1={a1} a2={a2} color={color} grosor={1.3} />;

const Nombre = ({ p, n, dx, dy }: { p: Pt; n: string; dx?: number; dy?: number }) => <Punto p={p} nombre={n} dx={dx} dy={dy} />;

type Props = { block: BenchBlock };

/* ───────────── Líneas notables de un triángulo (Fig. 9–12) ───────────── */

export function TrianguloLineasNotables({ block }: Props) {
  const [step, setStep] = usePaso();
  const A: Pt = [130, 290];
  const B: Pt = [450, 290];
  const C: Pt = [330, 110];
  const b = dist(A, C);
  const c = dist(A, B);
  const M = puntoMedio(A, B);
  const D: Pt = [(b * B[0] + c * C[0]) / (b + c), (b * B[1] + c * C[1]) / (b + c)];
  const H: Pt = [C[0], 290];
  const nodos: ReactNode[] = [<Poli key="t" pts={[A, B, C]} color={AZUL} w={2.4} fill="rgba(31,120,180,0.06)" />];
  if (step === 0) {
    nodos.push(<Seg key="m" a={[M[0], 330]} b={[M[0], 96]} color={VERDE} w={2.4} />, <Recto key="r" v={M} a={B} b={[M[0], 96]} />, <Tick key="t1" a={A} b={M} k={2} color={VERDE} />, <Tick key="t2" a={M} b={B} k={2} color={VERDE} />, <Dot key="d" p={M} color={VERDE} r={5} />);
    nodos.push(T(M, "mediatriz", VERDE, 15, 10, 44), T(M, "M", INK, 14, 6, 20));
  } else if (step === 1) {
    nodos.push(<Seg key="m" a={C} b={M} color={VERDE} w={2.4} />, <Tick key="t1" a={A} b={M} k={2} color={VERDE} />, <Tick key="t2" a={M} b={B} k={2} color={VERDE} />, <Dot key="d" p={M} color={VERDE} r={5} />);
    nodos.push(T(puntoMedio(C, M), "mediana", VERDE, 15, 8, 0), T(M, "M", INK, 14, 6, 20));
  } else if (step === 2) {
    nodos.push(<Seg key="m" a={A} b={D} color={VERDE} w={2.4} />, <ArcoPlano key="a1" c={A} r={52} a1={0} a2={angDe(A, D)} color={VERDE} grosor={2.4} />, <ArcoPlano key="a2" c={A} r={64} a1={angDe(A, D)} a2={angDe(A, C)} color={VERDE} grosor={2.4} />);
    nodos.push(T(puntoMedio(A, D), "bisectriz", VERDE, 15, -24, -14), <Dot key="d" p={D} color={VERDE} r={5} />);
  } else {
    nodos.push(<Seg key="m" a={C} b={H} color={VERDE} w={2.4} />, <Recto key="r" v={H} a={B} b={C} />, <Dot key="d" p={H} color={VERDE} r={5} />);
    nodos.push(T(puntoMedio(C, H), "altura", VERDE, 15, 8, 0), T(H, "H", INK, 14, 6, 20));
  }
  nodos.push(<Nombre key="A" p={A} n="A" dx={-16} dy={18} />, <Nombre key="B" p={B} n="B" dx={8} dy={18} />, <Nombre key="C" p={C} n="C" dx={-4} dy={-10} />);
  return (
    <Hoja scene="triangulo-lineas-notables" block={block} step={step} setStep={setStep} label="Hoja con un triángulo y sus líneas notables: mediatriz, mediana, bisectriz y altura" testId="bench-lineas-notables" titulo={["Mediatriz de un lado", "Mediana de un lado", "Bisectriz de un ángulo", "Altura de un triángulo"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Datos necesarios para construir un polígono ───────────── */

export function TrianguloDatos({ block }: Props) {
  const [step, setStep] = usePaso();
  const nodos: ReactNode[] = [];
  if (step === 0) {
    const poli = (c: Pt, n: number): Pt[] => Array.from({ length: n }, (_, i) => enCirculo(c, 60, 90 + (360 * i) / n));
    ([[110, 3, "3"], [310, 4, "5"], [510, 5, "7"]] as [number, number, string][]).forEach(([x, n, d]) => {
      nodos.push(<Poli key={`p${n}`} pts={poli([x, 180], n)} color={AZUL} w={2.2} fill="rgba(31,120,180,0.08)" />);
      nodos.push(T([x, 180], `n = ${n}`, INK, 14, -22, 90), T([x, 180], `2·${n} − 3 = ${d}`, AMBAR, 16, -40, 118));
    });
    nodos.push(T([24, 336], "un polígono de n lados necesita 2n − 3 datos", VERDE, 14, 0, 0));
  } else if (step === 1) {
    const A: Pt = [220, 270];
    const B: Pt = [400, 270];
    const C: Pt = [300, 130];
    nodos.push(<Poli key="t" pts={[A, B, C]} color={AZUL} w={2.4} fill="rgba(31,120,180,0.06)" />);
    nodos.push(T(puntoMedio(A, B), "1", AMBAR, 16, -4, 24), T(puntoMedio(A, C), "2", AMBAR, 16, -22, 0), T(puntoMedio(B, C), "3", AMBAR, 16, 10, 0));
    nodos.push(T([24, 90], "triángulo: n = 3", INK, 14, 0, 0), T([24, 336], "2·3 − 3 = 3 datos: lados y ángulos, en la combinación que permita construirlo", VERDE, 13, 0, 0));
  } else {
    const A: Pt = [90, 270];
    const B: Pt = [250, 270];
    const C: Pt = [90, 150];
    nodos.push(<Poli key="r" pts={[A, B, C]} color={AZUL} w={2.4} fill="rgba(31,120,180,0.06)" />, <Recto key="rr" v={A} a={B} b={C} />);
    nodos.push(T([90, 130], "rectángulo: 90° ya es un dato", AMBAR, 14, 0, 0), T([90, 300], "faltan otros 2 datos", INK, 14, 0, 0));
    const P: Pt = [340, 270];
    const Q: Pt = [530, 270];
    const R: Pt = [435, 130];
    nodos.push(<Poli key="i" pts={[P, Q, R]} color={VERDE} w={2.4} fill="rgba(31,157,85,0.06)" />, <Tick key="i1" a={P} b={R} />, <Tick key="i2" a={Q} b={R} />);
    nodos.push(T([340, 118], "isósceles: dos lados iguales", AMBAR, 14, 0, 0), T([340, 300], "faltan otros 2 datos", INK, 14, 0, 0));
  }
  return (
    <Hoja scene="triangulo-datos" block={block} step={step} setStep={setStep} label="Hoja con el número de datos necesarios para construir un triángulo" testId="bench-triangulo-datos" titulo={["Datos para construir un polígono", "Los datos de un triángulo", "Rectángulo e isósceles"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Un lado y los dos ángulos adyacentes (Fig. 14) ───────────── */

export function TrianguloAla({ block }: Props) {
  const [step, setStep] = usePaso();
  const B: Pt = [190, 290];
  const C: Pt = [430, 290];
  const aB = 65;
  const aC = 180 - 50;
  const A = cortan(B, aB, C, aC);
  const nodos: ReactNode[] = [];
  nodos.push(<Dato key="a" a={[24, 68]} b={[24 + 240, 68]} nombre="a" />);
  if (step === 0) nodos.push(<AnguloDato key="b" v={[24, 150]} ang={aB} nombre="B" />, <AnguloDato key="c" v={[170, 150]} ang={50} nombre="C" />);
  if (step >= 1) {
    nodos.push(<Seg key="bc" a={B} b={C} color={INK} w={1.8} />, <Nombre key="B" p={B} n="B" dx={-16} dy={18} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
    if (step === 1) nodos.push(T(puntoMedio(B, C), "BC = a", AZUL, 14, -26, 24));
  }
  if (step >= 2) {
    nodos.push(<ArcoAux key="r1" c={B} r={90} a1={0} a2={aB + 18} />, <Seg key="l1" a={B} b={enCirculo(B, step >= 4 ? dist(B, A) : 290, aB)} color={AMBAR} w={1.8} dash={step >= 4 ? undefined : "6 4"} />, <ArcoPlano key="v1" c={B} r={40} a1={0} a2={aB} color={AMBAR} grosor={2.2} />);
    nodos.push(T(enCirculo(B, 96, 4), "1", AUX, 13, 4, -4), T(enCirculo(B, 96, aB + 6), "2", AUX, 13, 6, -2));
  }
  if (step >= 3) {
    nodos.push(<ArcoAux key="r2" c={C} r={90} a1={180} a2={aC - 18} />, <Seg key="l2" a={C} b={enCirculo(C, step >= 4 ? dist(C, A) : 290, aC)} color={AMBAR} w={1.8} dash={step >= 4 ? undefined : "6 4"} />, <ArcoPlano key="v2" c={C} r={40} a1={180} a2={aC} color={AMBAR} grosor={2.2} />);
    nodos.push(T(enCirculo(C, 96, 176), "3", AUX, 13, -14, -4), T(enCirculo(C, 96, aC - 6), "4", AUX, 13, -14, -2));
  }
  if (step >= 4) {
    nodos.push(<Poli key="t" pts={[B, C, A]} color={VERDE} w={2.4} fill={VERDE_RELLENO} />, <Dot key="da" p={A} color={VERDE} r={5} />, <Nombre key="A" p={A} n="A" dx={8} dy={-8} />);
    nodos.push(T(puntoMedio(A, C), "b", AMBAR, 15, 6, 0), T(puntoMedio(A, B), "c", AMBAR, 15, -32, 14));
  }
  return (
    <Hoja scene="triangulo-ala" block={block} step={step} setStep={setStep} label="Hoja con la construcción de un triángulo dado un lado y los dos ángulos adyacentes" testId="bench-triangulo-ala" titulo={["Los datos: a, B y C", "Se traza el lado a", "Ángulo B en el vértice B", "Ángulo C en el vértice C", "El vértice A"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Dos lados y el ángulo comprendido (Fig. 15) ───────────── */

export function TrianguloLal({ block }: Props) {
  const [step, setStep] = usePaso();
  const B: Pt = [140, 290];
  const C: Pt = [440, 290];
  const aB = 55;
  const lc = 190;
  const A = enCirculo(B, lc, aB);
  const nodos: ReactNode[] = [];
  nodos.push(<Dato key="a" a={[24, 66]} b={[324, 66]} nombre="a" />, <Dato key="c" a={[24, 92]} b={[24 + lc, 92]} nombre="c" color={AMBAR} />);
  if (step === 0) nodos.push(<AnguloDato key="b" v={[380, 110]} ang={aB} nombre="B" />);
  if (step >= 1) nodos.push(<Seg key="bc" a={B} b={C} color={INK} w={1.8} />, <Nombre key="B" p={B} n="B" dx={-16} dy={18} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step >= 2) {
    nodos.push(<ArcoAux key="r" c={B} r={100} a1={0} a2={aB + 14} />, <ArcoPlano key="v" c={B} r={40} a1={0} a2={aB} color={AMBAR} grosor={2.2} />, <Seg key="l" a={B} b={enCirculo(B, step >= 3 ? lc : 260, aB)} color={AMBAR} w={1.8} dash={step >= 3 ? undefined : "6 4"} />);
    nodos.push(T(enCirculo(B, 106, 3), "1", AUX, 13, 4, -4), T(enCirculo(B, 106, aB + 8), "2", AUX, 13, 6, -2));
  }
  if (step >= 3) nodos.push(<ArcoAux key="rc" c={B} r={lc} a1={aB - 12} a2={aB + 12} color={AMBAR} />, <Dot key="da" p={A} color={AMBAR} r={5} />, <Nombre key="A" p={A} n="A" dx={-18} dy={-6} />);
  if (step >= 4) nodos.push(<Poli key="t" pts={[B, C, A]} color={VERDE} w={2.4} fill={VERDE_RELLENO} />, T(puntoMedio(A, C), "b", AMBAR, 15, 6, 0));
  return (
    <Hoja scene="triangulo-lal" block={block} step={step} setStep={setStep} label="Hoja con la construcción de un triángulo dados dos lados y el ángulo comprendido" testId="bench-triangulo-lal" titulo={["Los datos: a, c y B", "Se coloca uno de los lados", "Ángulo B en el vértice B", "Se lleva c sobre el lado", "Se une A con C"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Triángulo equilátero a partir del lado (Fig. 16) ───────────── */

export function EquilateroLado({ block }: Props) {
  const [step, setStep] = usePaso();
  const a = 260;
  const B: Pt = [180, 290];
  const C: Pt = [440, 290];
  const top = (interseccionCirculos(B, a, C, a) as [Pt, Pt]).reduce((m, p) => (p[1] < m[1] ? p : m));
  const nodos: ReactNode[] = [<Dato key="a" a={[24, 90]} b={[24 + a, 90]} nombre="a" />];
  nodos.push(<Seg key="bc" a={B} b={C} color={INK} w={1.8} />, <Nombre key="B" p={B} n="B" dx={-16} dy={18} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step >= 1) {
    nodos.push(<ArcoAux key="r1" c={B} r={a} a1={40} a2={80} color={AMBAR} />, <ArcoAux key="r2" c={C} r={a} a1={100} a2={140} color={AMBAR} />, <Dot key="da" p={top} color={AMBAR} r={5} />, <Nombre key="A" p={top} n="A" dx={8} dy={-8} />);
  }
  if (step >= 2) nodos.push(<Poli key="t" pts={[B, C, top]} color={VERDE} w={2.4} fill={VERDE_RELLENO} />, <Tick key="k1" a={B} b={C} color={VERDE} />, <Tick key="k2" a={B} b={top} color={VERDE} />, <Tick key="k3" a={C} b={top} color={VERDE} />);
  return (
    <Hoja scene="equilatero-lado" block={block} step={step} setStep={setStep} label="Hoja con la construcción de un triángulo equilátero dado su lado" testId="bench-equilatero-lado" titulo={["Se conoce el lado a", "Dos arcos de radio a", "Los tres lados son iguales"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Triángulo equilátero a partir de la altura (Fig. 17) ───────────── */

export function EquilateroAltura({ block }: Props) {
  const [step, setStep] = usePaso();
  const h = 190;
  const s = 150;
  const P1: Pt = [235, 290];
  const P2: Pt = [385, 290];
  const V: Pt = [310, 290 - (s * Math.sqrt(3)) / 2];
  const N: Pt = [310, 290];
  const k = h / (N[1] - V[1]);
  const A: Pt = [310, 290 - h];
  const C: Pt = [310 + (P1[0] - 310) * k, 290];
  const B: Pt = [310 + (P2[0] - 310) * k, 290];
  const nodos: ReactNode[] = [<Dato key="h" a={[24, 90]} b={[24 + h, 90]} nombre="h" />];
  nodos.push(<Seg key="base" a={[150, 290]} b={[480, 290]} color={INK} w={1.4} />);
  if (step >= 1) nodos.push(<Poli key="e" pts={[P1, P2, V]} color={AMBAR} w={2} fill="rgba(224,168,0,0.1)" />, <ArcoAux key="r1" c={P1} r={s} a1={30} a2={90} />, <ArcoAux key="r2" c={P2} r={s} a1={90} a2={150} />, <Nombre key="p1" p={P1} n="1" dx={-14} dy={18} />, <Nombre key="p2" p={P2} n="2" dx={6} dy={18} />, <Nombre key="v" p={V} n="3" dx={8} dy={-4} />);
  if (step >= 2) nodos.push(<Seg key="alt" a={N} b={[310, step >= 3 ? A[1] - 14 : V[1] - 30]} color={AUX} w={1.4} dash="5 4" />, <Recto key="rr" v={N} a={P2} b={V} />, <Nombre key="n" p={N} n="N" dx={6} dy={18} />);
  if (step >= 3) nodos.push(<ArcoAux key="rh" c={N} r={h} a1={75} a2={105} color={VERDE} />, <Dot key="da" p={A} color={VERDE} r={5} />, <Nombre key="A" p={A} n="A" dx={8} dy={-6} />);
  if (step >= 4) nodos.push(<Poli key="t" pts={[C, B, A]} color={VERDE} w={2.4} fill={VERDE_RELLENO} />, <Seg key="pa1" a={A} b={C} color={VERDE} w={2.4} />, <Nombre key="C" p={C} n="C" dx={-16} dy={18} />, <Nombre key="B" p={B} n="B" dx={8} dy={18} />);
  return (
    <Hoja scene="equilatero-altura" block={block} step={step} setStep={setStep} label="Hoja con la construcción de un triángulo equilátero dada su altura" testId="bench-equilatero-altura" titulo={["Se conoce la altura h", "Un equilátero cualquiera: 1-2-3", "Su altura N-3", "La altura h sobre N-3", "Paralelas hasta la base"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Rectángulo a partir de los dos catetos (Fig. 18) ───────────── */

export function RectanguloCatetos({ block }: Props) {
  const [step, setStep] = usePaso();
  const lc = 240;
  const lb = 150;
  const A: Pt = [160, 290];
  const B: Pt = [160 + lc, 290];
  const C: Pt = [160, 290 - lb];
  const nodos: ReactNode[] = [<Dato key="b" a={[24, 66]} b={[24 + lb, 66]} nombre="b" />, <Dato key="c" a={[24, 92]} b={[24 + lc, 92]} nombre="c" color={AMBAR} />];
  if (step >= 1) nodos.push(<Seg key="ab" a={A} b={B} color={INK} w={1.8} />, <Nombre key="A" p={A} n="A" dx={-16} dy={18} />, <Nombre key="B" p={B} n="B" dx={8} dy={18} />);
  if (step >= 2) nodos.push(<Seg key="per" a={A} b={[160, step >= 3 ? C[1] - 18 : 130]} color={AUX} w={1.4} dash="5 4" />, <Recto key="r" v={A} a={B} b={[160, 100]} />);
  if (step >= 3) nodos.push(<ArcoAux key="rb" c={A} r={lb} a1={75} a2={105} color={AMBAR} />, <Dot key="dc" p={C} color={AMBAR} r={5} />, <Nombre key="C" p={C} n="C" dx={-16} dy={-4} />, <Poli key="t" pts={[A, B, C]} color={VERDE} w={2.4} fill={VERDE_RELLENO} />, T(puntoMedio(B, C), "a", VERDE, 15, 8, 0));
  return (
    <Hoja scene="rectangulo-catetos" block={block} step={step} setStep={setStep} label="Hoja con la construcción de un triángulo rectángulo dados los dos catetos" testId="bench-rectangulo-catetos" titulo={["Los datos: catetos b y c", "Un cateto: c = AB", "Perpendicular por A", "Se lleva b y se une C con B"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Rectángulo a partir de un cateto y un ángulo agudo (Fig. 19) ───────────── */

export function RectanguloCatetoAngulo({ block }: Props) {
  const [step, setStep] = usePaso();
  const lb = 230;
  const aC = 35;
  const A: Pt = [150, 290];
  const C: Pt = [150 + lb, 290];
  const B = cortan(C, 180 - aC, A, 90);
  const nodos: ReactNode[] = [<Dato key="b" a={[24, 84]} b={[24 + lb, 84]} nombre="b" />];
  if (step === 0) nodos.push(<AnguloDato key="ang" v={[24, 150]} ang={aC} nombre="C" />);
  if (step >= 1) nodos.push(<Seg key="ac" a={A} b={C} color={INK} w={1.8} />, <Nombre key="A" p={A} n="A" dx={-16} dy={18} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step >= 2) nodos.push(<ArcoAux key="r" c={C} r={90} a1={180} a2={180 - aC - 16} />, <ArcoPlano key="v" c={C} r={44} a1={180} a2={180 - aC} color={AMBAR} grosor={2.2} />, <Seg key="l" a={C} b={enCirculo(C, step >= 3 ? dist(C, B) : 300, 180 - aC)} color={AMBAR} w={1.8} dash={step >= 3 ? undefined : "6 4"} />);
  if (step >= 3) nodos.push(<Seg key="per" a={A} b={B} color={AUX} w={1.6} dash="5 4" />, <Recto key="rr" v={A} a={C} b={B} />, <Dot key="db" p={B} color={VERDE} r={5} />, <Nombre key="B" p={B} n="B" dx={-18} dy={-4} />, <Poli key="t" pts={[A, C, B]} color={VERDE} w={2.4} fill={VERDE_RELLENO} />);
  return (
    <Hoja scene="rectangulo-cateto-angulo" block={block} step={step} setStep={setStep} label="Hoja con la construcción de un triángulo rectángulo dados un cateto y un ángulo agudo" testId="bench-rectangulo-cateto-angulo" titulo={["Los datos: cateto b y ángulo C", "El cateto: b = AC", "Ángulo C en el vértice C", "Perpendicular por A"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Rectángulo a partir de un cateto y la hipotenusa (Fig. 20) ───────────── */

export function RectanguloHipotenusa({ block }: Props) {
  const [step, setStep] = usePaso();
  const la = 300;
  const lb = 170;
  const B: Pt = [150, 290];
  const C: Pt = [450, 290];
  const O = puntoMedio(B, C);
  const A = (interseccionCirculos(O, la / 2, C, lb) as [Pt, Pt]).reduce((m, p) => (p[1] < m[1] ? p : m));
  const nodos: ReactNode[] = [<Dato key="a" a={[24, 84]} b={[24 + la, 84]} nombre="a" />, <Dato key="b" a={[24, 112]} b={[24 + lb, 112]} nombre="b" color={AMBAR} />];
  if (step >= 1) nodos.push(<Seg key="bc" a={B} b={C} color={INK} w={1.8} />, <Nombre key="B" p={B} n="B" dx={-16} dy={18} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step >= 2) nodos.push(<ArcoPlano key="sc" c={O} r={la / 2} a1={0} a2={180} color={AUX} grosor={1.5} />, <Dot key="o" p={O} color={AUX} />, <Nombre key="O" p={O} n="O" dx={-4} dy={18} />);
  if (step >= 3) nodos.push(<ArcoAux key="rb" c={C} r={lb} a1={angDe(C, A) - 14} a2={angDe(C, A) + 14} color={AMBAR} />, <Dot key="da" p={A} color={AMBAR} r={5} />, <Nombre key="A" p={A} n="A" dx={-6} dy={-10} />);
  if (step >= 4) nodos.push(<Poli key="t" pts={[A, B, C]} color={VERDE} w={2.4} fill={VERDE_RELLENO} />, <Recto key="r" v={A} a={B} b={C} />);
  return (
    <Hoja scene="rectangulo-hipotenusa" block={block} step={step} setStep={setStep} label="Hoja con la construcción de un triángulo rectángulo dados un cateto y la hipotenusa" testId="bench-rectangulo-hipotenusa" titulo={["Los datos: hipotenusa a y cateto b", "La hipotenusa: a = BC", "Semicircunferencia de diámetro BC", "El cateto b desde C", "El ángulo A es recto"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Isósceles: lado igual a y ángulo desigual B (Fig. 21) ───────────── */

export function IsoscelesLadoAngulo({ block }: Props) {
  const [step, setStep] = usePaso();
  const la = 230;
  const aB = 40;
  const B: Pt = [150, 290];
  const C: Pt = [150 + la, 290];
  const A = enCirculo(B, la, aB);
  const nodos: ReactNode[] = [<Dato key="a" a={[24, 84]} b={[24 + la, 84]} nombre="a" />];
  if (step === 0) nodos.push(<AnguloDato key="ang" v={[24, 150]} ang={aB} nombre="B" />);
  if (step >= 1) nodos.push(<Seg key="bc" a={B} b={C} color={INK} w={1.8} />, <Nombre key="B" p={B} n="B" dx={-16} dy={18} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step >= 2) nodos.push(<ArcoAux key="r" c={B} r={90} a1={0} a2={aB + 16} />, <ArcoPlano key="v" c={B} r={40} a1={0} a2={aB} color={AMBAR} grosor={2.2} />, <Seg key="l" a={B} b={enCirculo(B, step >= 3 ? la : 300, aB)} color={AMBAR} w={1.8} dash={step >= 3 ? undefined : "6 4"} />);
  if (step >= 3) nodos.push(<ArcoAux key="ra" c={B} r={la} a1={aB - 12} a2={aB + 12} color={AMBAR} />, <Dot key="da" p={A} color={AMBAR} r={5} />, <Nombre key="A" p={A} n="A" dx={8} dy={-6} />, <Poli key="t" pts={[B, C, A]} color={VERDE} w={2.4} fill={VERDE_RELLENO} />, <Tick key="k1" a={B} b={C} color={VERDE} />, <Tick key="k2" a={B} b={A} color={VERDE} />);
  return (
    <Hoja scene="isosceles-lado-angulo" block={block} step={step} setStep={setStep} label="Hoja con la construcción de un triángulo isósceles dado el lado igual y el ángulo desigual" testId="bench-isosceles-lado-angulo" titulo={["Los datos: lado a y ángulo B", "El lado a = BC", "Ángulo B en el extremo B", "Se lleva a sobre el lado: A"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Isósceles: lado desigual b y ángulo igual A (Fig. 22) ───────────── */

export function IsoscelesDesigual({ block }: Props) {
  const [step, setStep] = usePaso();
  const lb = 300;
  const aA = 42;
  const A: Pt = [140, 290];
  const C: Pt = [140 + lb, 290];
  const B = cortan(A, aA, C, 180 - aA);
  const nodos: ReactNode[] = [<Dato key="b" a={[24, 84]} b={[24 + lb, 84]} nombre="b" />];
  if (step === 0) nodos.push(<AnguloDato key="ang" v={[24, 150]} ang={aA} nombre="A" />);
  nodos.push(<Seg key="ac" a={A} b={C} color={INK} w={1.8} />, <Nombre key="A" p={A} n="A" dx={-16} dy={18} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step >= 1) nodos.push(<ArcoPlano key="v1" c={A} r={44} a1={0} a2={aA} color={AMBAR} grosor={2.2} />, <ArcoPlano key="v2" c={C} r={44} a1={180} a2={180 - aA} color={AMBAR} grosor={2.2} />, <Seg key="l1" a={A} b={enCirculo(A, dist(A, B) + (step >= 2 ? 0 : 40), aA)} color={AMBAR} w={1.8} dash={step >= 2 ? undefined : "6 4"} />, <Seg key="l2" a={C} b={enCirculo(C, dist(C, B) + (step >= 2 ? 0 : 40), 180 - aA)} color={AMBAR} w={1.8} dash={step >= 2 ? undefined : "6 4"} />);
  if (step >= 2) nodos.push(<Poli key="t" pts={[A, C, B]} color={VERDE} w={2.4} fill={VERDE_RELLENO} />, <Dot key="db" p={B} color={VERDE} r={5} />, <Nombre key="B" p={B} n="B" dx={8} dy={-6} />, <Tick key="k1" a={A} b={B} color={VERDE} />, <Tick key="k2" a={C} b={B} color={VERDE} />);
  return (
    <Hoja scene="isosceles-desigual" block={block} step={step} setStep={setStep} label="Hoja con la construcción de un triángulo isósceles dado el lado desigual y un ángulo igual" testId="bench-isosceles-desigual" titulo={["Los datos: lado b y ángulo A", "El mismo ángulo en cada extremo", "El vértice B"][step]}>
      {nodos}
    </Hoja>
  );
}

/* ───────────── Isósceles: lado igual a y ángulo igual C (Fig. 23) ───────────── */

export function IsoscelesIgualAngulo({ block }: Props) {
  const [step, setStep] = usePaso();
  const la = 210;
  const aC = 65;
  const C: Pt = [440, 290];
  const B = enCirculo(C, la, 180 - aC);
  const A: Pt = [B[0] - (C[0] - B[0]), 290];
  const nodos: ReactNode[] = [<Dato key="a" a={[24, 84]} b={[24 + la, 84]} nombre="a" />];
  if (step === 0) nodos.push(<AnguloDato key="ang" v={[24, 150]} ang={aC} nombre="C" />);
  nodos.push(<Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step >= 1) nodos.push(<Seg key="base" a={C} b={[A[0] - 30, 290]} color={INK} w={1.6} />, <ArcoAux key="r" c={C} r={90} a1={180} a2={180 - aC - 16} />, <ArcoPlano key="v" c={C} r={44} a1={180} a2={180 - aC} color={AMBAR} grosor={2.2} />, <Seg key="l" a={C} b={enCirculo(C, step >= 2 ? la : 300, 180 - aC)} color={AMBAR} w={1.8} dash={step >= 2 ? undefined : "6 4"} />);
  if (step >= 2) nodos.push(<Dot key="db" p={B} color={AMBAR} r={5} />, <Nombre key="B" p={B} n="B" dx={8} dy={-6} />);
  if (step >= 3) nodos.push(<ArcoAux key="rb" c={B} r={la} a1={250} a2={290} color={AMBAR} />, <Dot key="da" p={A} color={VERDE} r={5} />, <Nombre key="A" p={A} n="A" dx={-16} dy={18} />, <Poli key="t" pts={[A, C, B]} color={VERDE} w={2.4} fill={VERDE_RELLENO} />, <Tick key="k1" a={C} b={B} color={VERDE} />, <Tick key="k2" a={A} b={B} color={VERDE} />);
  return (
    <Hoja scene="isosceles-igual-angulo" block={block} step={step} setStep={setStep} label="Hoja con la construcción de un triángulo isósceles dado el lado igual y un ángulo igual" testId="bench-isosceles-igual-angulo" titulo={["Los datos: lado a y ángulo C", "Ángulo C en el vértice C", "Se lleva a sobre el lado: B", "Arco de radio a desde B: A"][step]}>
      {nodos}
    </Hoja>
  );
}
