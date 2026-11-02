"use client";

import { type ReactNode } from "react";
import { angDe, dist, enCirculo, puntoMedio, type Pt } from "./geometry";
import { AMBAR, AZUL, INK, VERDE, usePaso, type BenchBlock } from "./scenes";
import { Seg } from "./scenes-proporcion";
import { Dot, Hoja, Poli, Recto, T, Tick } from "./scenes-teoria";
import { ArcoPlano, Punto } from "./scenes-trazados";

/**
 * Tema 4 (libro, págs. 38–41): líneas notables y construcción de triángulos a partir de sus datos.
 * Son diagramas por pasos: cada paso añade un trazo y el texto va a la derecha. Los ángulos están en grados
 * con el convenio de `geometry.ts` (antihorario, eje Y hacia arriba).
 */

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
