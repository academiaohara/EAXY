"use client";

import { type ReactNode } from "react";
import { angDe, dist, enCirculo, interseccionCirculos, puntoMedio, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, Escuadra, Transportador, poseCompas } from "./instruments";
import { AMBAR, AZUL, BenchShell, INK, SVG_CLASS, VERDE, usePaso, type BenchBlock, type BenchSceneName } from "./scenes";
import { ArcoAnim, MSHEET, MV, ReglaTrazando, animPuntoMedio, lerp, tramo, useProgreso } from "./scenes-compas";
import { Seg, Txt } from "./scenes-proporcion";
import { AUX, Dot, Poli, Recto, Tick } from "./scenes-teoria";
import { ArcoPlano, Punto } from "./scenes-trazados";

/**
 * Construcciones de triángulos del tema 4 (libro, págs. 39–41), paso a paso y con el detalle del gesto:
 * cómo se toma una medida con el compás, cómo se lleva sobre la recta, cómo se marca un ángulo con el
 * transportador y cómo se traza con la regla. Las mismas construcciones se pueden practicar después
 * (`practicas-triangulos.tsx`). Ángulos en grados, antihorarios, con el eje Y hacia arriba (`geometry.ts`).
 */
export const VERDE_RELLENO = "rgba(31,157,85,0.14)";
const R_TRANSP = 126;

/** Punto de corte de dos rectas dadas por un punto y un ángulo. */
export function cortan(p: Pt, a1: number, q: Pt, a2: number): Pt {
  const rad = (a: number) => (a * Math.PI) / 180;
  const d1: Pt = [Math.cos(rad(a1)), -Math.sin(rad(a1))];
  const d2: Pt = [Math.cos(rad(a2)), -Math.sin(rad(a2))];
  const det = d1[0] * -d2[1] + d2[0] * d1[1];
  const t = ((q[0] - p[0]) * -d2[1] + d2[0] * (q[1] - p[1])) / det;
  return [p[0] + d1[0] * t, p[1] + d1[1] * t];
}

/** Segmento dato: con topes en los extremos y su nombre. */
export function Dato({ a, b, nombre, color = AZUL }: { a: Pt; b: Pt; nombre: string; color?: string }) {
  const m = puntoMedio(a, b);
  return (
    <g>
      <Seg a={a} b={b} color={color} w={3} />
      <Seg a={[a[0], a[1] - 6]} b={[a[0], a[1] + 6]} color={INK} w={1.4} />
      <Seg a={[b[0], b[1] - 6]} b={[b[0], b[1] + 6]} color={INK} w={1.4} />
      <Txt p={[m[0] - 4, m[1] - 12]} color={color} size={14}>{nombre}</Txt>
    </g>
  );
}

/** Ángulo dato dibujado aparte, con su valor. */
export function AnguloDato({ v, ang, nombre, color = AMBAR, len = 56 }: { v: Pt; ang: number; nombre: string; color?: string; len?: number }) {
  return (
    <g>
      <Seg a={v} b={enCirculo(v, len, 0)} color={color} w={2.4} />
      <Seg a={v} b={enCirculo(v, len, ang)} color={color} w={2.4} />
      <ArcoPlano c={v} r={len * 0.45} a1={0} a2={ang} color={color} grosor={1.8} />
      <Txt p={[v[0] + len * 0.55, v[1] - len * 0.18]} color={color} size={13}>{`${nombre} = ${ang}°`}</Txt>
    </g>
  );
}

export const Nombre = ({ p, n, dx, dy }: { p: Pt; n: string; dx?: number; dy?: number }) => <Punto p={p} nombre={n} dx={dx} dy={dy} />;
export const Marca = ({ p, color = AMBAR }: { p: Pt; color?: string }) => <Dot p={p} color={color} r={4.4} />;

/** Compás con la punta seca en `n` y la mina en `m` (la abertura que ha tomado). */
export function CompasEn({ n, m, opacidad = 1 }: { n: Pt; m: Pt; opacidad?: number }) {
  const c = poseCompas(n, m);
  return (
    <g data-testid="bench-compas" pointerEvents="none" opacity={opacidad}>
      <Compas pose={c.pose} open={c.open} />
    </g>
  );
}

/** Arco que se traza con el compás: la mina recorre de `a1` a `a2` según `t` (0–1) y deja el trazo. */
export function ArcoCompas({ c, r, a1, a2, t, color = AUX, mostrarCompas = true }: { c: Pt; r: number; a1: number; a2: number; t: number; color?: string; mostrarCompas?: boolean }) {
  return (
    <g>
      <ArcoAnim c={c} r={r} a1={a1} a2={a2} t={t} />
      {color !== AUX && t > 0 ? <ArcoPlano c={c} r={r} a1={a1} a2={a1 + (a2 - a1) * t} color={color} grosor={1.5} /> : null}
      {mostrarCompas && t > 0 && t < 1 ? <CompasEn n={c} m={enCirculo(c, r, lerp(a1, a2, t))} /> : null}
    </g>
  );
}

/** Transportador (a escala 1,8) sobre el vértice `v` con su base en la dirección `base`; marca el ángulo pedido. */
export function TransportadorMarca({ v, base, objetivo, signo = 1, t = 1 }: { v: Pt; base: number; objetivo: number; signo?: 1 | -1; t?: number }) {
  const m = enCirculo(v, R_TRANSP, base + signo * objetivo);
  return (
    <g data-testid="bench-transportador" pointerEvents="none" opacity={tramo(t, 0, 0.35)}>
      <g transform={`translate(${v[0]} ${v[1]}) scale(1.8)`}>
        <Transportador pose={{ x: 0, y: 0, rot: -(base + (signo === 1 ? 0 : 180)) }} r={70} />
      </g>
      <g opacity={tramo(t, 0.5, 0.8)}>
        <Seg a={enCirculo(v, 52, base + signo * objetivo)} b={m} color={AMBAR} w={1.2} dash="3 3" />
        <circle cx={m[0]} cy={m[1]} r="5" fill={AMBAR} stroke="#fff" strokeWidth="1.6" />
        <Txt p={[m[0] + 9, m[1] - 8]} color={AMBAR} size={14}>{`${objetivo}°`}</Txt>
      </g>
    </g>
  );
}

/** La escuadra entra apoyada en la recta, con el ángulo recto en `a`, y el lápiz traza por su otro cateto hasta `b`. */
export function EscuadraTrazando({ a, b, p, color = AUX }: { a: Pt; b: Pt; p: number; color?: string }) {
  const ang = angDe(a, b);
  const lado = enCirculo([0, 0], 1, ang - 90);
  const entra = tramo(p, 0, 0.3);
  const traza = tramo(p, 0.3, 0.85);
  const sale = tramo(p, 0.85, 1);
  const desp = (1 - entra) * 80;
  const fin: Pt = [lerp(a[0], b[0], traza), lerp(a[1], b[1], traza)];
  return (
    <g data-testid="bench-escuadra-trazo">
      {traza > 0 ? <Seg a={a} b={fin} color={color} w={1.1} /> : null}
      {p < 1 ? (
        <g opacity={entra * (1 - sale)} pointerEvents="none">
          <Escuadra pose={{ x: a[0] + lado[0] * desp, y: a[1] + lado[1] * desp, rot: -ang }} />
        </g>
      ) : null}
    </g>
  );
}

export function usePasoAnim(ms: number[]) {
  const [step, setStep] = usePaso();
  const p = useProgreso(step, ms[step] ?? 1);
  /** Avance (0–1) del acontecimiento del paso `k`: 0 antes, `p` durante, 1 después. */
  const u = (k: number) => (step === k ? p : step > k ? 1 : 0);
  return { step, setStep, p, u };
}

export function Lamina({ scene, block, step, setStep, label, titulo, testId, children }: { scene: BenchSceneName; block: BenchBlock; step: number; setStep: (n: number) => void; label: string; titulo: string; testId: string; children: ReactNode }) {
  return (
    <BenchShell scene={scene} notes={block.notes} step={step} setStep={setStep} label={label}>
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label={label} data-testid={testId}>
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        {children}
        <Txt p={[24, 34]} color={VERDE} size={15}>{titulo}</Txt>
      </svg>
    </BenchShell>
  );
}

type Props = { block: BenchBlock };
const MS_TOMA = 1900;
const MS_LLEVA = 3400;
const MS_TRANSP = 2600;
const MS_REGLA = 2200;

/** Geometría de cada construcción, compartida con su práctica. */
export const GEO = {
  ala: (() => {
    const B: Pt = [190, 290];
    const C: Pt = [390, 290];
    const aB = 65;
    const aCext = 50;
    const aC = 180 - aCext;
    return { B, C, aB, aCext, aC, A: cortan(B, aB, C, aC), a: dist(B, C), dato: [[24, 100], [224, 100]] as [Pt, Pt] };
  })(),
  lal: (() => {
    const B: Pt = [170, 290];
    const C: Pt = [370, 290];
    const aB = 55;
    const c = 170;
    return { B, C, aB, c, A: enCirculo(B, c, aB), a: dist(B, C), datoA: [[24, 96], [224, 96]] as [Pt, Pt], datoC: [[24, 122], [24 + c, 122]] as [Pt, Pt] };
  })(),
  eqLado: (() => {
    const a = 200;
    const B: Pt = [190, 290];
    const C: Pt = [190 + a, 290];
    const A = (interseccionCirculos(B, a, C, a) as [Pt, Pt]).reduce((m, p) => (p[1] < m[1] ? p : m));
    return { a, B, C, A, dato: [[24, 100], [24 + a, 100]] as [Pt, Pt] };
  })(),
  eqAltura: (() => {
    const h = 170;
    const s = 130;
    const P1: Pt = [250, 290];
    const P2: Pt = [250 + s, 290];
    const V: Pt = [250 + s / 2, 290 - (s * Math.sqrt(3)) / 2];
    const N: Pt = [250 + s / 2, 290];
    const k = h / (N[1] - V[1]);
    const A: Pt = [N[0], 290 - h];
    const C: Pt = [N[0] + (P1[0] - N[0]) * k, 290];
    const B: Pt = [N[0] + (P2[0] - N[0]) * k, 290];
    return { h, s, P1, P2, V, N, A, C, B, dato: [[24, 100], [24 + h, 100]] as [Pt, Pt] };
  })(),
  recCatetos: (() => {
    const c = 200;
    const b = 130;
    const A: Pt = [170, 290];
    const B: Pt = [170 + c, 290];
    const C: Pt = [170, 290 - b];
    return { c, b, A, B, C, datoB: [[24, 96], [24 + b, 96]] as [Pt, Pt], datoC: [[24, 122], [24 + c, 122]] as [Pt, Pt] };
  })(),
  recCatAng: (() => {
    const b = 210;
    const aC = 35;
    const A: Pt = [170, 290];
    const C: Pt = [170 + b, 290];
    const B = cortan(C, 180 - aC, A, 90);
    return { b, aC, A, B, C, dato: [[24, 100], [24 + b, 100]] as [Pt, Pt] };
  })(),
  recHip: (() => {
    const a = 210;
    const b = 130;
    const B: Pt = [280, 215];
    const C: Pt = [280 + a, 215];
    const O = puntoMedio(B, C);
    const A = (interseccionCirculos(O, a / 2, C, b) as [Pt, Pt]).reduce((m, p) => (p[1] < m[1] ? p : m));
    return { a, b, B, C, O, A, datoA: [[24, 96], [24 + a, 96]] as [Pt, Pt], datoB: [[24, 122], [24 + b, 122]] as [Pt, Pt] };
  })(),
  isoLadoAng: (() => {
    const a = 200;
    const aB = 40;
    const B: Pt = [170, 290];
    const C: Pt = [170 + a, 290];
    return { a, aB, B, C, A: enCirculo(B, a, aB), dato: [[24, 100], [24 + a, 100]] as [Pt, Pt] };
  })(),
  isoDesigual: (() => {
    const b = 220;
    const aA = 55;
    const A: Pt = [150, 290];
    const C: Pt = [150 + b, 290];
    const B = cortan(A, aA, C, 180 - aA);
    return { b, aA, A, C, B, dato: [[24, 100], [24 + b, 100]] as [Pt, Pt] };
  })(),
  isoIgualAng: (() => {
    const a = 190;
    const aC = 62;
    const C: Pt = [440, 290];
    const B = enCirculo(C, a, 180 - aC);
    const A: Pt = [B[0] - (C[0] - B[0]), 290];
    return { a, aC, C, B, A, dato: [[24, 100], [24 + a, 100]] as [Pt, Pt] };
  })(),
};

/* ───────────── Un lado y los dos ángulos adyacentes ───────────── */

export function TrianguloAla({ block }: Props) {
  const { step, setStep, p, u } = usePasoAnim([1, MS_TOMA, MS_LLEVA, MS_TRANSP, MS_REGLA, MS_TRANSP, MS_REGLA, 1]);
  const { B, C, aB, aCext, aC, A, a, dato } = GEO.ala;
  const nodos: ReactNode[] = [<Dato key="a" a={dato[0]} b={dato[1]} nombre="a" />];
  if (step === 0) nodos.push(<AnguloDato key="b" v={[380, 150]} ang={aB} nombre="B" />, <AnguloDato key="c" v={[500, 150]} ang={aCext} nombre="C" />);
  if (step === 1) nodos.push(<CompasEn key="c1" n={dato[0]} m={dato[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step >= 2) nodos.push(<Seg key="rec" a={[130, 290]} b={[480, 290]} color={AUX} w={1.2} />, <Marca key="mb" p={B} color={INK} />, <Nombre key="B" p={B} n="B" dx={-16} dy={18} />);
  if (step === 2) nodos.push(<ArcoCompas key="ar" c={B} r={a} a1={14} a2={-6} t={u(2)} />);
  if (step >= 3) nodos.push(<ArcoPlano key="arc" c={B} r={a} a1={14} a2={-6} color={AUX} grosor={1.3} />, <Seg key="bc" a={B} b={C} color={AUX} w={1.4} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step === 3) nodos.push(<TransportadorMarca key="tb" v={B} base={0} objetivo={aB} t={u(3)} />);
  if (step >= 4) nodos.push(<ReglaTrazando key="rb" a={B} b={enCirculo(B, dist(B, A) + 30, aB)} p={u(4)} ext={0} color={AUX} w={1.1} />);
  if (step === 5) nodos.push(<TransportadorMarca key="tc" v={C} base={180} signo={-1} objetivo={aCext} t={u(5)} />);
  if (step >= 6) nodos.push(<ReglaTrazando key="rc" a={C} b={enCirculo(C, dist(C, A) + 30, aC)} p={u(6)} ext={0} color={AUX} w={1.1} />);
  if (step >= 7) nodos.push(<Poli key="t" pts={[B, C, A]} color={INK} w={3} fill={VERDE_RELLENO} />, <Marca key="da" p={A} color={VERDE} />, <Nombre key="A" p={A} n="A" dx={8} dy={-8} />);
  return (
    <Lamina scene="triangulo-ala" block={block} step={step} setStep={setStep} label="Construcción de un triángulo dados un lado y los dos ángulos adyacentes" testId="bench-triangulo-ala" titulo={["Los datos: a, B y C", "Se toma la medida a con el compás", "Se lleva a la recta: BC = a", "El ángulo B con el transportador", "Se traza el lado desde B", "El ángulo C con el transportador", "Se traza el lado desde C", "El vértice A"][step]}>
      {nodos}
    </Lamina>
  );
}

/* ───────────── Dos lados y el ángulo comprendido ───────────── */

export function TrianguloLal({ block }: Props) {
  const { step, setStep, p, u } = usePasoAnim([1, MS_TOMA, MS_LLEVA, MS_TRANSP, MS_REGLA, MS_TOMA, MS_LLEVA, MS_REGLA]);
  const { B, C, aB, c, A, a, datoA, datoC } = GEO.lal;
  const nodos: ReactNode[] = [<Dato key="a" a={datoA[0]} b={datoA[1]} nombre="a" />, <Dato key="c" a={datoC[0]} b={datoC[1]} nombre="c" color={AMBAR} />];
  if (step === 0) nodos.push(<AnguloDato key="b" v={[400, 150]} ang={aB} nombre="B" />);
  if (step === 1) nodos.push(<CompasEn key="c1" n={datoA[0]} m={datoA[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step >= 2) nodos.push(<Seg key="rec" a={[120, 290]} b={[470, 290]} color={AUX} w={1.2} />, <Marca key="mb" p={B} color={INK} />, <Nombre key="B" p={B} n="B" dx={-16} dy={18} />);
  if (step === 2) nodos.push(<ArcoCompas key="ar" c={B} r={a} a1={14} a2={-6} t={u(2)} />);
  if (step >= 3) nodos.push(<ArcoPlano key="arc" c={B} r={a} a1={14} a2={-6} color={AUX} grosor={1.3} />, <Seg key="bc" a={B} b={C} color={AUX} w={1.4} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step === 3) nodos.push(<TransportadorMarca key="tb" v={B} base={0} objetivo={aB} t={u(3)} />);
  if (step >= 4) nodos.push(<ReglaTrazando key="rb" a={B} b={enCirculo(B, c + 50, aB)} p={u(4)} ext={0} color={AUX} w={1.1} />);
  if (step === 5) nodos.push(<CompasEn key="c2" n={datoC[0]} m={datoC[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step === 6) nodos.push(<ArcoCompas key="ar2" c={B} r={c} a1={aB - 14} a2={aB + 14} t={u(6)} />);
  if (step >= 7) nodos.push(<ArcoPlano key="ar2f" c={B} r={c} a1={aB - 14} a2={aB + 14} color={AUX} grosor={1.2} />, <Marca key="da" p={A} color={VERDE} />, <Nombre key="A" p={A} n="A" dx={-18} dy={-6} />);
  if (step === 7) nodos.push(<ReglaTrazando key="rac" a={A} b={C} p={p} ext={0} color={INK} w={3} />);
  if (step === 7 && p > 0.85) nodos.push(<Poli key="t7" pts={[B, C, A]} color={INK} w={3} fill={VERDE_RELLENO} />);
  return (
    <Lamina scene="triangulo-lal" block={block} step={step} setStep={setStep} label="Construcción de un triángulo dados dos lados y el ángulo comprendido" testId="bench-triangulo-lal" titulo={["Los datos: a, c y B", "Se toma la medida a", "Se lleva a la recta: BC = a", "El ángulo B con el transportador", "Se traza el lado desde B", "Se toma la medida c", "Se lleva c sobre el lado: A", "Se une A con C"][step]}>
      {nodos}
    </Lamina>
  );
}

/* ───────────── Equilátero a partir del lado ───────────── */

export function EquilateroLado({ block }: Props) {
  const { step, setStep, p, u } = usePasoAnim([1, MS_TOMA, MS_LLEVA, MS_LLEVA, MS_LLEVA, MS_REGLA]);
  const { a, B, C, A, dato } = GEO.eqLado;
  const nodos: ReactNode[] = [<Dato key="a" a={dato[0]} b={dato[1]} nombre="a" />];
  if (step === 1) nodos.push(<CompasEn key="c1" n={dato[0]} m={dato[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step >= 2) nodos.push(<Seg key="rec" a={[140, 290]} b={[440, 290]} color={AUX} w={1.2} />, <Marca key="mb" p={B} color={INK} />, <Nombre key="B" p={B} n="B" dx={-16} dy={18} />);
  if (step === 2) nodos.push(<ArcoCompas key="ar" c={B} r={a} a1={14} a2={-6} t={u(2)} />);
  if (step >= 3) nodos.push(<ArcoPlano key="arc" c={B} r={a} a1={14} a2={-6} color={AUX} grosor={1.3} />, <Seg key="bc" a={B} b={C} color={AUX} w={1.4} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step === 3) nodos.push(<ArcoCompas key="a1" c={B} r={a} a1={40} a2={80} t={u(3)} />);
  if (step >= 4) nodos.push(<ArcoPlano key="a1f" c={B} r={a} a1={40} a2={80} color={AUX} grosor={1.2} />);
  if (step === 4) nodos.push(<ArcoCompas key="a2" c={C} r={a} a1={140} a2={100} t={u(4)} />);
  if (step >= 5) nodos.push(<ArcoPlano key="a2f" c={C} r={a} a1={140} a2={100} color={AUX} grosor={1.2} />, <Marca key="da" p={A} color={VERDE} />, <Nombre key="A" p={A} n="A" dx={8} dy={-8} />);
  if (step === 5) nodos.push(<ReglaTrazando key="ra" a={A} b={B} p={tramo(p, 0, 0.5)} ext={0} color={INK} w={3} />, <ReglaTrazando key="rc" a={A} b={C} p={tramo(p, 0.5, 1)} ext={0} color={INK} w={3} />);
  if (step === 5 && p > 0.9) nodos.push(<Poli key="t5" pts={[B, C, A]} color={INK} w={3} fill={VERDE_RELLENO} />);
  return (
    <Lamina scene="equilatero-lado" block={block} step={step} setStep={setStep} label="Construcción de un triángulo equilátero dado su lado" testId="bench-equilatero-lado" titulo={["El dato: el lado a", "Se toma la medida a", "Se lleva a la recta: BC = a", "Arco de radio a desde B", "Arco de radio a desde C", "Se une A con B y con C"][step]}>
      {nodos}
    </Lamina>
  );
}

/* ───────────── Equilátero a partir de la altura ───────────── */

export function EquilateroAltura({ block }: Props) {
  const { step, setStep, p, u } = usePasoAnim([1, MS_LLEVA, MS_LLEVA, MS_REGLA, MS_REGLA, MS_TOMA, MS_LLEVA, MS_REGLA, MS_REGLA]);
  const { h, s, P1, P2, V, N, A, C, B, dato } = GEO.eqAltura;
  const nodos: ReactNode[] = [<Dato key="h" a={dato[0]} b={dato[1]} nombre="h" />, <Seg key="base" a={[120, 290]} b={[500, 290]} color={AUX} w={1.2} />];
  if (step >= 1) nodos.push(<Marca key="p1" p={P1} color={INK} />, <Nombre key="n1" p={P1} n="1" dx={-14} dy={18} />);
  if (step === 1) nodos.push(<ArcoCompas key="r1" c={P1} r={s} a1={30} a2={80} t={u(1)} />, <Marca key="p2m" p={P2} color={INK} />);
  if (step >= 2) nodos.push(<ArcoPlano key="r1f" c={P1} r={s} a1={30} a2={80} color={AUX} grosor={1.3} />, <Marca key="p2" p={P2} color={INK} />, <Nombre key="n2" p={P2} n="2" dx={6} dy={18} />);
  if (step === 2) nodos.push(<ArcoCompas key="r2" c={P2} r={s} a1={150} a2={100} t={u(2)} />);
  if (step >= 3) nodos.push(<ArcoPlano key="r2f" c={P2} r={s} a1={150} a2={100} color={AUX} grosor={1.3} />, <Poli key="e" pts={[P1, P2, V]} color={AUX} w={1.2} />, <Nombre key="n3" p={V} n="3" dx={8} dy={-4} />);
  if (step === 3) nodos.push(<EscuadraTrazando key="alt" a={N} b={V} p={u(3)} />);
  if (step >= 4) nodos.push(<Seg key="altf" a={V} b={N} color={AUX} w={1.4} dash="5 4" />, <Recto key="rr" v={N} a={P2} b={V} />, <Nombre key="N" p={N} n="N" dx={6} dy={18} />);
  if (step >= 4) nodos.push(<ReglaTrazando key="pro" a={V} b={[N[0], A[1] - 18]} p={u(4)} ext={0} color={AUX} />);
  if (step === 5) nodos.push(<CompasEn key="c5" n={dato[0]} m={dato[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step >= 5 && step < 8) nodos.push(<Seg key="prof" a={V} b={[N[0], A[1] - 18]} color={AUX} w={1.4} dash="5 4" />);
  if (step === 6) nodos.push(<ArcoCompas key="rh" c={N} r={h} a1={72} a2={108} t={u(6)} />);
  if (step >= 7) nodos.push(<ArcoPlano key="rhf" c={N} r={h} a1={72} a2={108} color={AUX} grosor={1.2} />, <Marca key="da" p={A} color={VERDE} />, <Nombre key="A" p={A} n="A" dx={8} dy={-6} />);
  if (step === 7) nodos.push(<ReglaTrazando key="pc" a={A} b={C} p={u(7)} ext={0} color={INK} w={3} />);
  if (step >= 8) nodos.push(<ReglaTrazando key="pc2" a={A} b={C} p={1} ext={0} color={INK} w={3} />, <ReglaTrazando key="pb" a={A} b={B} p={u(8)} ext={0} color={INK} w={3} />, <Nombre key="C" p={C} n="C" dx={-16} dy={18} />, <Nombre key="B" p={B} n="B" dx={8} dy={18} />);
  if (step >= 8) nodos.push(<Poli key="t" pts={[C, B, A]} color={INK} w={3} fill={p > 0.9 || step > 8 ? VERDE_RELLENO : "none"} />);
  return (
    <Lamina scene="equilatero-altura" block={block} step={step} setStep={setStep} label="Construcción de un triángulo equilátero dada su altura" testId="bench-equilatero-altura" titulo={["El dato: la altura h", "Un equilátero cualquiera: arco desde 1", "Arco desde 2 con la misma abertura", "Su altura 3-N", "Se prolonga la recta 3-N", "Se toma la medida h", "Se lleva h desde N: vértice A", "Paralela a 1-3 por A", "Paralela a 2-3 por A"][step]}>
      {nodos}
    </Lamina>
  );
}

/* ───────────── Rectángulo: los dos catetos ───────────── */

export function RectanguloCatetos({ block }: Props) {
  const { step, setStep, p, u } = usePasoAnim([1, MS_TOMA, MS_LLEVA, MS_REGLA, MS_TOMA, MS_LLEVA, MS_REGLA]);
  const { c, b, A, B, C, datoB, datoC } = GEO.recCatetos;
  const nodos: ReactNode[] = [<Dato key="b" a={datoB[0]} b={datoB[1]} nombre="b" />, <Dato key="c" a={datoC[0]} b={datoC[1]} nombre="c" color={AMBAR} />];
  if (step === 1) nodos.push(<CompasEn key="c1" n={datoC[0]} m={datoC[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step >= 2) nodos.push(<Seg key="rec" a={[120, 290]} b={[440, 290]} color={AUX} w={1.2} />, <Marca key="ma" p={A} color={INK} />, <Nombre key="A" p={A} n="A" dx={-16} dy={18} />);
  if (step === 2) nodos.push(<ArcoCompas key="ar" c={A} r={c} a1={14} a2={-6} t={u(2)} />);
  if (step >= 3) nodos.push(<ArcoPlano key="arc" c={A} r={c} a1={14} a2={-6} color={AUX} grosor={1.3} />, <Seg key="ab" a={A} b={B} color={AUX} w={1.4} />, <Nombre key="B" p={B} n="B" dx={8} dy={18} />);
  if (step >= 3) nodos.push(<EscuadraTrazando key="per" a={A} b={[A[0], 110]} p={u(3)} />, <Recto key="rr" v={A} a={B} b={[A[0], 100]} />);
  if (step === 4) nodos.push(<CompasEn key="c4" n={datoB[0]} m={datoB[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step === 5) nodos.push(<ArcoCompas key="rb" c={A} r={b} a1={78} a2={102} t={u(5)} />);
  if (step >= 6) nodos.push(<ArcoPlano key="rbf" c={A} r={b} a1={78} a2={102} color={AUX} grosor={1.2} />, <Marca key="dc" p={C} color={VERDE} />, <Nombre key="C" p={C} n="C" dx={-16} dy={-4} />);
  if (step === 6) nodos.push(<ReglaTrazando key="rcb" a={C} b={B} p={p} ext={0} color={INK} w={3} />);
  if (step === 6 && p > 0.9) nodos.push(<Poli key="t6" pts={[A, B, C]} color={INK} w={3} fill={VERDE_RELLENO} />);
  return (
    <Lamina scene="rectangulo-catetos" block={block} step={step} setStep={setStep} label="Construcción de un triángulo rectángulo dados los dos catetos" testId="bench-rectangulo-catetos" titulo={["Los datos: catetos b y c", "Se toma la medida c", "Se lleva a la recta: AB = c", "La perpendicular por A", "Se toma la medida b", "Se lleva b sobre la perpendicular: C", "Se une C con B"][step]}>
      {nodos}
    </Lamina>
  );
}

/* ───────────── Rectángulo: un cateto y un ángulo agudo ───────────── */

export function RectanguloCatetoAngulo({ block }: Props) {
  const { step, setStep, p, u } = usePasoAnim([1, MS_TOMA, MS_LLEVA, MS_TRANSP, MS_REGLA, MS_REGLA, 1]);
  const { b, aC, A, B, C, dato } = GEO.recCatAng;
  const nodos: ReactNode[] = [<Dato key="b" a={dato[0]} b={dato[1]} nombre="b" />];
  if (step === 0) nodos.push(<AnguloDato key="ang" v={[400, 150]} ang={aC} nombre="C" />);
  if (step === 1) nodos.push(<CompasEn key="c1" n={dato[0]} m={dato[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step >= 2) nodos.push(<Seg key="rec" a={[120, 290]} b={[440, 290]} color={AUX} w={1.2} />, <Marca key="ma" p={A} color={INK} />, <Nombre key="A" p={A} n="A" dx={-16} dy={18} />);
  if (step === 2) nodos.push(<ArcoCompas key="ar" c={A} r={b} a1={14} a2={-6} t={u(2)} />);
  if (step >= 3) nodos.push(<ArcoPlano key="arc" c={A} r={b} a1={14} a2={-6} color={AUX} grosor={1.3} />, <Seg key="ac" a={A} b={C} color={AUX} w={1.4} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step === 3) nodos.push(<TransportadorMarca key="tc" v={C} base={180} signo={-1} objetivo={aC} t={u(3)} />);
  if (step >= 4) nodos.push(<ReglaTrazando key="rc" a={C} b={enCirculo(C, dist(C, B) + 30, 180 - aC)} p={u(4)} ext={0} color={AUX} w={1.1} />);
  if (step >= 5) nodos.push(<EscuadraTrazando key="per" a={A} b={[A[0], B[1] - 20]} p={u(5)} />, <Recto key="rr" v={A} a={C} b={[A[0], 100]} />);
  if (step >= 6) nodos.push(<Poli key="t" pts={[A, C, B]} color={INK} w={3} fill={VERDE_RELLENO} />, <Marca key="db" p={B} color={VERDE} />, <Nombre key="B" p={B} n="B" dx={-18} dy={-4} />);
  return (
    <Lamina scene="rectangulo-cateto-angulo" block={block} step={step} setStep={setStep} label="Construcción de un triángulo rectángulo dados un cateto y un ángulo agudo" testId="bench-rectangulo-cateto-angulo" titulo={["Los datos: cateto b y ángulo C", "Se toma la medida b", "Se lleva a la recta: AC = b", "El ángulo C con el transportador", "Se traza el lado desde C", "La perpendicular por A", "Se cortan en B"][step]}>
      {nodos}
    </Lamina>
  );
}

/* ───────────── Rectángulo: un cateto y la hipotenusa ───────────── */

export function RectanguloHipotenusa({ block }: Props) {
  const { step, setStep, p, u } = usePasoAnim([1, MS_TOMA, MS_LLEVA, 4200, MS_LLEVA, MS_TOMA, MS_LLEVA, MS_REGLA]);
  const { a, b, B, C, O, A, datoA, datoB } = GEO.recHip;
  const nodos: ReactNode[] = [<Dato key="a" a={datoA[0]} b={datoA[1]} nombre="a" />, <Dato key="b" a={datoB[0]} b={datoB[1]} nombre="b" color={AMBAR} />];
  if (step === 1) nodos.push(<CompasEn key="c1" n={datoA[0]} m={datoA[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step >= 2) nodos.push(<Seg key="rec" a={[B[0] - 60, B[1]]} b={[C[0] + 60, B[1]]} color={AUX} w={1.2} />, <Marca key="mb" p={B} color={INK} />, <Nombre key="B" p={B} n="B" dx={-16} dy={18} />);
  if (step === 2) nodos.push(<ArcoCompas key="ar" c={B} r={a} a1={14} a2={-6} t={u(2)} />);
  if (step >= 3) nodos.push(<ArcoPlano key="arc" c={B} r={a} a1={14} a2={-6} color={AUX} grosor={1.3} />, <Seg key="bc" a={B} b={C} color={AUX} w={1.4} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step === 3) {
    const pm = animPuntoMedio(B, C, p);
    nodos.push(<g key="pm">{pm.nodos}</g>);
    if (pm.pose) nodos.push(<g key="pmc" data-testid="bench-compas" pointerEvents="none"><Compas pose={pm.pose.pose} open={pm.pose.open} /></g>);
  }
  if (step >= 4 || (step === 3 && p > 0.86)) nodos.push(<Marca key="o" p={O} color={AZUL} />, <Nombre key="O" p={O} n="O" dx={-5} dy={20} />);
  if (step === 4) nodos.push(<ArcoCompas key="sc" c={O} r={a / 2} a1={180} a2={0} t={u(4)} />);
  if (step >= 5) nodos.push(<ArcoPlano key="scf" c={O} r={a / 2} a1={0} a2={180} color={AUX} grosor={1.4} />);
  if (step === 5) nodos.push(<CompasEn key="c5" n={datoB[0]} m={datoB[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step === 6) nodos.push(<ArcoCompas key="rb" c={C} r={b} a1={angDe(C, A) - 14} a2={angDe(C, A) + 14} t={u(6)} />);
  if (step >= 7) nodos.push(<ArcoPlano key="rbf" c={C} r={b} a1={angDe(C, A) - 14} a2={angDe(C, A) + 14} color={AUX} grosor={1.2} />, <Marca key="da" p={A} color={VERDE} />, <Nombre key="A" p={A} n="A" dx={-6} dy={-10} />);
  if (step === 7) nodos.push(<ReglaTrazando key="rab" a={A} b={B} p={tramo(p, 0, 0.5)} ext={0} color={INK} w={3} />, <ReglaTrazando key="rac" a={A} b={C} p={tramo(p, 0.5, 1)} ext={0} color={INK} w={3} />);
  if (step === 7 && p > 0.9) nodos.push(<Poli key="t7" pts={[A, B, C]} color={INK} w={3} fill={VERDE_RELLENO} />, <Recto key="rr" v={A} a={B} b={C} />);
  return (
    <Lamina scene="rectangulo-hipotenusa" block={block} step={step} setStep={setStep} label="Construcción de un triángulo rectángulo dados un cateto y la hipotenusa" testId="bench-rectangulo-hipotenusa" titulo={["Los datos: hipotenusa a y cateto b", "Se toma la medida a", "Se lleva a la recta: BC = a", "El punto medio O de BC", "La semicircunferencia de diámetro BC", "Se toma la medida b", "Arco de radio b desde C: A", "Se une A con B y con C"][step]}>
      {nodos}
    </Lamina>
  );
}

/* ───────────── Isósceles: lado igual y ángulo desigual ───────────── */

export function IsoscelesLadoAngulo({ block }: Props) {
  const { step, setStep, p, u } = usePasoAnim([1, MS_TOMA, MS_LLEVA, MS_TRANSP, MS_REGLA, MS_LLEVA, MS_REGLA]);
  const { a, aB, B, C, A, dato } = GEO.isoLadoAng;
  const nodos: ReactNode[] = [<Dato key="a" a={dato[0]} b={dato[1]} nombre="a" />];
  if (step === 0) nodos.push(<AnguloDato key="ang" v={[400, 150]} ang={aB} nombre="B" />);
  if (step === 1) nodos.push(<CompasEn key="c1" n={dato[0]} m={dato[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step >= 2) nodos.push(<Seg key="rec" a={[130, 290]} b={[420, 290]} color={AUX} w={1.2} />, <Marca key="mb" p={B} color={INK} />, <Nombre key="B" p={B} n="B" dx={-16} dy={18} />);
  if (step === 2) nodos.push(<ArcoCompas key="ar" c={B} r={a} a1={14} a2={-6} t={u(2)} />);
  if (step >= 3) nodos.push(<ArcoPlano key="arc" c={B} r={a} a1={14} a2={-6} color={AUX} grosor={1.3} />, <Seg key="bc" a={B} b={C} color={AUX} w={1.4} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step === 3) nodos.push(<TransportadorMarca key="tb" v={B} base={0} objetivo={aB} t={u(3)} />);
  if (step >= 4) nodos.push(<ReglaTrazando key="rb" a={B} b={enCirculo(B, a + 50, aB)} p={u(4)} ext={0} color={AUX} w={1.1} />);
  if (step === 5) nodos.push(<ArcoCompas key="ra" c={B} r={a} a1={aB - 14} a2={aB + 14} t={u(5)} />);
  if (step >= 6) nodos.push(<ArcoPlano key="raf" c={B} r={a} a1={aB - 14} a2={aB + 14} color={AUX} grosor={1.2} />, <Marca key="da" p={A} color={VERDE} />, <Nombre key="A" p={A} n="A" dx={8} dy={-6} />);
  if (step === 6) nodos.push(<ReglaTrazando key="rac" a={A} b={C} p={p} ext={0} color={INK} w={3} />);
  if (step === 6 && p > 0.9) nodos.push(<Poli key="t6" pts={[B, C, A]} color={INK} w={3} fill={VERDE_RELLENO} />, <Tick key="k1" a={B} b={C} color={VERDE} />, <Tick key="k2" a={B} b={A} color={VERDE} />);
  return (
    <Lamina scene="isosceles-lado-angulo" block={block} step={step} setStep={setStep} label="Construcción de un triángulo isósceles dado el lado igual y el ángulo desigual" testId="bench-isosceles-lado-angulo" titulo={["Los datos: lado a y ángulo B", "Se toma la medida a", "Se lleva a la recta: BC = a", "El ángulo B con el transportador", "Se traza el lado desde B", "Con la misma abertura, arco desde B", "Se une A con C"][step]}>
      {nodos}
    </Lamina>
  );
}

/* ───────────── Isósceles: lado desigual y ángulo igual ───────────── */

export function IsoscelesDesigual({ block }: Props) {
  const { step, setStep, p, u } = usePasoAnim([1, MS_TOMA, MS_LLEVA, MS_TRANSP, MS_REGLA, MS_TRANSP, MS_REGLA, 1]);
  const { b, aA, A, C, B, dato } = GEO.isoDesigual;
  const nodos: ReactNode[] = [<Dato key="b" a={dato[0]} b={dato[1]} nombre="b" />];
  if (step === 0) nodos.push(<AnguloDato key="ang" v={[400, 150]} ang={aA} nombre="A" />);
  if (step === 1) nodos.push(<CompasEn key="c1" n={dato[0]} m={dato[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step >= 2) nodos.push(<Seg key="rec" a={[110, 290]} b={[420, 290]} color={AUX} w={1.2} />, <Marca key="ma" p={A} color={INK} />, <Nombre key="A" p={A} n="A" dx={-16} dy={18} />);
  if (step === 2) nodos.push(<ArcoCompas key="ar" c={A} r={b} a1={14} a2={-6} t={u(2)} />);
  if (step >= 3) nodos.push(<ArcoPlano key="arc" c={A} r={b} a1={14} a2={-6} color={AUX} grosor={1.3} />, <Seg key="ac" a={A} b={C} color={AUX} w={1.4} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step === 3) nodos.push(<TransportadorMarca key="ta" v={A} base={0} objetivo={aA} t={u(3)} />);
  if (step >= 4) nodos.push(<ReglaTrazando key="ra" a={A} b={enCirculo(A, dist(A, B) + 30, aA)} p={u(4)} ext={0} color={AUX} w={1.1} />);
  if (step === 5) nodos.push(<TransportadorMarca key="tc" v={C} base={180} signo={-1} objetivo={aA} t={u(5)} />);
  if (step >= 6) nodos.push(<ReglaTrazando key="rc" a={C} b={enCirculo(C, dist(C, B) + 30, 180 - aA)} p={u(6)} ext={0} color={AUX} w={1.1} />);
  if (step >= 7) nodos.push(<Poli key="t" pts={[A, C, B]} color={INK} w={3} fill={VERDE_RELLENO} />, <Marca key="db" p={B} color={VERDE} />, <Nombre key="B" p={B} n="B" dx={8} dy={-6} />, <Tick key="k1" a={A} b={B} color={VERDE} />, <Tick key="k2" a={C} b={B} color={VERDE} />);
  return (
    <Lamina scene="isosceles-desigual" block={block} step={step} setStep={setStep} label="Construcción de un triángulo isósceles dado el lado desigual y un ángulo igual" testId="bench-isosceles-desigual" titulo={["Los datos: lado b y ángulo A", "Se toma la medida b", "Se lleva a la recta: AC = b", "El ángulo A con el transportador", "Se traza el lado desde A", "El mismo ángulo en C", "Se traza el lado desde C", "El vértice B"][step]}>
      {nodos}
    </Lamina>
  );
}

/* ───────────── Isósceles: lado igual y ángulo igual ───────────── */

export function IsoscelesIgualAngulo({ block }: Props) {
  const { step, setStep, p, u } = usePasoAnim([1, MS_TRANSP, MS_REGLA, MS_TOMA, MS_LLEVA, MS_LLEVA, MS_REGLA]);
  const { a, aC, C, B, A, dato } = GEO.isoIgualAng;
  const nodos: ReactNode[] = [<Dato key="a" a={dato[0]} b={dato[1]} nombre="a" />];
  if (step === 0) nodos.push(<AnguloDato key="ang" v={[400, 150]} ang={aC} nombre="C" />);
  if (step >= 1) nodos.push(<Seg key="rec" a={[130, 290]} b={[500, 290]} color={AUX} w={1.2} />, <Marca key="mc" p={C} color={INK} />, <Nombre key="C" p={C} n="C" dx={8} dy={18} />);
  if (step === 1) nodos.push(<TransportadorMarca key="tc" v={C} base={180} signo={-1} objetivo={aC} t={u(1)} />);
  if (step >= 2) nodos.push(<ReglaTrazando key="rc" a={C} b={enCirculo(C, a + 40, 180 - aC)} p={u(2)} ext={0} color={AUX} w={1.1} />);
  if (step === 3) nodos.push(<CompasEn key="c3" n={dato[0]} m={dato[1]} opacidad={tramo(p, 0, 0.3)} />);
  if (step === 4) nodos.push(<ArcoCompas key="rb" c={C} r={a} a1={180 - aC - 12} a2={180 - aC + 12} t={u(4)} />);
  if (step >= 5) nodos.push(<ArcoPlano key="rbf" c={C} r={a} a1={180 - aC - 12} a2={180 - aC + 12} color={AUX} grosor={1.2} />, <Marca key="db" p={B} color={AMBAR} />, <Nombre key="B" p={B} n="B" dx={8} dy={-6} />);
  if (step === 5) nodos.push(<ArcoCompas key="ra" c={B} r={a} a1={angDe(B, A) - 14} a2={angDe(B, A) + 14} t={u(5)} />);
  if (step >= 6) nodos.push(<ArcoPlano key="raf" c={B} r={a} a1={angDe(B, A) - 14} a2={angDe(B, A) + 14} color={AUX} grosor={1.2} />, <Marca key="da" p={A} color={VERDE} />, <Nombre key="A" p={A} n="A" dx={-16} dy={18} />);
  if (step === 6) nodos.push(<ReglaTrazando key="rba" a={B} b={A} p={p} ext={0} color={INK} w={3} />);
  if (step === 6 && p > 0.9) nodos.push(<Poli key="t6" pts={[A, C, B]} color={INK} w={3} fill={VERDE_RELLENO} />, <Tick key="k1" a={C} b={B} color={VERDE} />, <Tick key="k2" a={A} b={B} color={VERDE} />);
  return (
    <Lamina scene="isosceles-igual-angulo" block={block} step={step} setStep={setStep} label="Construcción de un triángulo isósceles dado el lado igual y un ángulo igual" testId="bench-isosceles-igual-angulo" titulo={["Los datos: lado a y ángulo C", "El ángulo C con el transportador", "Se traza el lado desde C", "Se toma la medida a", "Se lleva a sobre el lado: B", "Con la misma abertura, arco desde B: A", "Se une B con A"][step]}>
      {nodos}
    </Lamina>
  );
}
