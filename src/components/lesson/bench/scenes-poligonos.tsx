"use client";

import { useState } from "react";
import { angDe, clamp, dist, enCirculo, interseccionCirculos, puntoMedio, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, poseCompas } from "./instruments";
import { AMBAR, AZUL, BenchShell, INK, SVG_CLASS, VERDE, type BenchBlock } from "./scenes";
import { ArcoAnim, MSHEET, MV, Practica, ReglaTrazando, lerp, tramo, useProgreso, type Def, type Est } from "./scenes-compas";
import { Seg, Txt } from "./scenes-proporcion";
import { Punto } from "./scenes-trazados";
import { poligono } from "./scenes-transformaciones";

const vista = { ...MV, sheet: MSHEET };
const grados = (rad: number) => (rad * 180) / Math.PI;

/* ───────────── Puntos notables del triángulo (explicación) ───────────── */

export const PN_A: Pt = [130, 290];
export const PN_B: Pt = [390, 290];
export const PN_C: Pt = [270, 110];

/** Pie de la perpendicular desde `p` a la recta `a`–`b`. */
function pie(p: Pt, a: Pt, b: Pt): Pt {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  return [a[0] + t * dx, a[1] + t * dy];
}

export function circuncentro(a: Pt, b: Pt, c: Pt): Pt {
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  const ux = ((a[0] ** 2 + a[1] ** 2) * (b[1] - c[1]) + (b[0] ** 2 + b[1] ** 2) * (c[1] - a[1]) + (c[0] ** 2 + c[1] ** 2) * (a[1] - b[1])) / d;
  const uy = ((a[0] ** 2 + a[1] ** 2) * (c[0] - b[0]) + (b[0] ** 2 + b[1] ** 2) * (a[0] - c[0]) + (c[0] ** 2 + c[1] ** 2) * (b[0] - a[0])) / d;
  return [ux, uy];
}

function incentro(a: Pt, b: Pt, c: Pt): { p: Pt; r: number } {
  const la = dist(b, c);
  const lb = dist(a, c);
  const lc = dist(a, b);
  const per = la + lb + lc;
  const p: Pt = [(la * a[0] + lb * b[0] + lc * c[0]) / per, (la * a[1] + lb * b[1] + lc * c[1]) / per];
  return { p, r: dist(p, pie(p, a, b)) };
}

const baricentro = (a: Pt, b: Pt, c: Pt): Pt => [(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3];
const ortocentro = (a: Pt, b: Pt, c: Pt): Pt => {
  const o = circuncentro(a, b, c);
  return [a[0] + b[0] + c[0] - 2 * o[0], a[1] + b[1] + c[1] - 2 * o[1]];
};

/** Prolonga la recta `a`–`b` `ext` unidades por cada extremo. */
function recta(a: Pt, b: Pt, ext: number): [Pt, Pt] {
  const d = dist(a, b);
  const u: Pt = [(b[0] - a[0]) / d, (b[1] - a[1]) / d];
  return [[a[0] - u[0] * ext, a[1] - u[1] * ext], [b[0] + u[0] * ext, b[1] + u[1] * ext]];
}

export function PuntosNotables({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, 2600);
  const A = PN_A;
  const B = PN_B;
  const C = PN_C;
  const mAB = puntoMedio(A, B);
  const mBC = puntoMedio(B, C);
  const mAC = puntoMedio(A, C);
  const G = baricentro(A, B, C);
  const { p: I, r: rI } = incentro(A, B, C);
  const O = circuncentro(A, B, C);
  const H = ortocentro(A, B, C);
  const t = tramo(p, 0, 0.7);
  const aparece = (a: Pt, b: Pt): Pt => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];

  // bisectrices: del vértice al pie sobre el lado opuesto
  const pieBis = (v: Pt, a: Pt, b: Pt): Pt => {
    const la = dist(v, a);
    const lb = dist(v, b);
    return [(a[0] * lb + b[0] * la) / (la + lb), (a[1] * lb + b[1] * la) / (la + lb)];
  };
  const lineas: { a: Pt; b: Pt }[][] = [
    [{ a: A, b: mBC }, { a: B, b: mAC }, { a: C, b: mAB }],
    [{ a: A, b: pieBis(A, B, C) }, { a: B, b: pieBis(B, A, C) }, { a: C, b: pieBis(C, A, B) }],
    [{ a: mAB, b: O }, { a: mBC, b: O }, { a: mAC, b: O }],
    [{ a: A, b: pie(A, B, C) }, { a: B, b: pie(B, A, C) }, { a: C, b: pie(C, A, B) }],
  ];
  const colores = [AMBAR, AZUL, VERDE, "#d6457a"];
  const puntos: [Pt, string, [number, number]][] = [[G, "G", [8, 16]], [I, "I", [8, 16]], [O, "O", [8, -8]], [H, "H", [8, -8]]];
  const nombres = ["Medianas", "Bisectrices", "Mediatrices", "Alturas"];
  const col = step < 4 ? colores[step] : INK;

  return (
    <BenchShell scene="puntos-notables" notes={block.notes} step={step} setStep={setStep} label="Hoja con un triángulo y sus cuatro rectas notables">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con un triángulo y sus cuatro rectas notables" data-testid="bench-notables">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        {/* lo ya construido, en tenue */}
        {Array.from({ length: Math.min(step, 4) }, (_, k) =>
          lineas[k].map((l, i) => <Seg key={`${k}-${i}`} a={l.a} b={l.b} color={colores[k]} w={1} dash="5 4" />),
        )}
        <path d={poligono([A, B, C])} fill="rgba(31,120,180,0.10)" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
        {step < 4
          ? lineas[step].map((l, i) => {
              const f = aparece(l.a, l.b);
              return <Seg key={i} a={l.a} b={f} color={col} w={2} />;
            })
          : null}
        {step === 1 && t > 0.9 ? <circle cx={I[0]} cy={I[1]} r={rI} fill="none" stroke={AZUL} strokeWidth="1.6" data-testid="bench-inscrita" /> : null}
        {step === 2 && t > 0.9 ? <circle cx={O[0]} cy={O[1]} r={dist(O, A)} fill="none" stroke={VERDE} strokeWidth="1.6" data-testid="bench-circunscrita" /> : null}
        {step === 2 && t > 0.9
          ? [mAB, mBC, mAC].map((m, i) => <circle key={i} cx={m[0]} cy={m[1]} r="3.2" fill={VERDE} />)
          : null}
        {step === 3 && t > 0.9
          ? [pie(A, B, C), pie(B, A, C), pie(C, A, B)].map((q, i) => <circle key={i} cx={q[0]} cy={q[1]} r="3" fill="#d6457a" />)
          : null}
        {step === 4 ? (
          <g data-testid="bench-euler">
            <Seg a={recta(H, O, 28)[0]} b={recta(H, O, 28)[1]} color={INK} w={1.4} dash="7 5" />
            <Txt p={[430, 150]} color={INK}>recta de Euler</Txt>
            {puntos.map(([q, n, d]) => (
              <Punto key={n} p={q} nombre={n} dx={d[0]} dy={d[1]} color={colores[puntos.findIndex((x) => x[1] === n)]} />
            ))}
          </g>
        ) : null}
        <Punto p={A} nombre="A" dx={-16} dy={18} />
        <Punto p={B} nombre="B" dx={8} dy={18} />
        <Punto p={C} nombre="C" dx={8} dy={-8} />
        {step < 4 && t > 0.9 ? <Punto p={puntos[step][0]} nombre={puntos[step][1]} dx={puntos[step][2][0]} dy={puntos[step][2][1]} color={col} /> : null}
        {step < 4 ? <Txt p={[430, 70]} color={col} size={15}>{nombres[step]}</Txt> : null}
      </svg>
    </BenchShell>
  );
}

/* ───────────── Circuncentro: dos mediatrices con el compás (práctica) ───────────── */

const CC_PARES: [Pt, Pt][] = [[PN_A, PN_B], [PN_A, PN_C]];
const CC_O = circuncentro(PN_A, PN_B, PN_C);

const mitadMin = (s: number) => dist(CC_PARES[s][0], CC_PARES[s][1]) / 2;
const cortesDe = (s: number, r: number | undefined): Pt[] =>
  r !== undefined && r > mitadMin(s) + 0.5 ? (interseccionCirculos(CC_PARES[s][0], r, CC_PARES[s][1], r) as [Pt, Pt]) : [];

const defCircuncentro: Def = {
  scene: "circuncentro-practica",
  fases: ["centro", "abertura", "arco", "centro", "arco", "centro", "abertura", "arco", "centro", "arco", "regla"],
  nClics: 4,
  extRegla: 24,
  papel: (est: Est) => (
    <g>
      <path d={poligono([PN_A, PN_B, PN_C])} fill="rgba(31,120,180,0.08)" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      <Punto p={PN_A} nombre="A" dx={-16} dy={18} />
      <Punto p={PN_B} nombre="B" dx={8} dy={18} />
      <Punto p={PN_C} nombre="C" dx={8} dy={-8} />
      {est.fase >= 11 ? (
        <g data-testid="bench-circuncentro">
          <circle cx={CC_O[0]} cy={CC_O[1]} r={dist(CC_O, PN_A)} fill="none" stroke={VERDE} strokeWidth="1.6" />
          <Punto p={CC_O} nombre="O" dx={8} dy={-8} color={VERDE} />
        </g>
      ) : null}
    </g>
  ),
  candidatos: (est, idx) => {
    const s = Math.floor(idx / 2);
    const [P, Q] = CC_PARES[s];
    return idx % 2 === 0 ? [P, Q] : [dist(est.centros[idx - 1], P) < 1 ? Q : P];
  },
  radioLim: () => [40, 235],
  radioIni: () => 80,
  rhoIni: () => 35,
  arco: (est, n, radio, c) => {
    const s = Math.floor(n / 2);
    const [P, Q] = CC_PARES[s];
    const otro = dist(c, P) < 1 ? Q : P;
    const largo = dist(P, Q);
    const th = radio > largo / 2 ? grados(Math.acos(clamp(largo / (2 * radio), 0, 1))) : 0;
    const t = Math.max(th, 20) + 6;
    return { centro: c, base: angDe(c, otro), signo: 1, rhoMin: -100, rhoMax: 100, req: [-t, t] };
  },
  validarAbertura: (est, a, r) => (r <= mitadMin(a) + 4 ? "Con esa abertura los arcos no llegarían a cortarse: debe ser mayor que la mitad del lado. Ábrela más y vuelve a fijarla." : null),
  cortes: (est) => [...cortesDe(0, est.radios[0]), ...cortesDe(1, est.radios[1])],
  validarClic: (est, punto) => {
    const s0 = cortesDe(0, est.radios[0]);
    const lado = (q: Pt) => (s0.some((c) => dist(c, q) < 1) ? 0 : 1);
    if (est.clics.length % 2 === 1) return lado(est.clics[est.clics.length - 1]) === lado(punto) ? null : "La regla de una mediatriz pasa por los dos puntos del mismo lado: toca el otro punto donde se cortan esos arcos.";
    const usados = est.clics.filter((_, i) => i % 2 === 0).map(lado);
    return usados.includes(lado(punto)) ? "Esa mediatriz ya está trazada: ahora la del otro lado." : null;
  },
  evaluar: () => ({ ok: true, mensaje: "Correcto: las mediatrices se cortan en el circuncentro O, que equidista de A, B y C. Es el centro de la circunferencia circunscrita." }),
};

export function CircuncentroPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defCircuncentro} vista={vista} />;
}

/* ───────────── Triángulo dados los tres lados (LLL) ───────────── */

const LA: Pt = [110, 300];
const LB: Pt = [310, 300];
const LC_AB = 200;
const LC_B = 150; // AC
const LC_A = 130; // BC
const LC: Pt = (() => {
  const [c1, c2] = interseccionCirculos(LA, LC_B, LB, LC_A) as [Pt, Pt];
  return c1[1] < c2[1] ? c1 : c2;
})();
const SEG_B: [Pt, Pt] = [[400, 90], [400 + LC_B, 90]];
const SEG_A: [Pt, Pt] = [[400, 140], [400 + LC_A, 140]];

function DatosLll({ resaltar, ab = true }: { resaltar?: "a" | "b" | null; ab?: boolean }) {
  return (
    <g>
      <Seg a={SEG_B[0]} b={SEG_B[1]} color={resaltar === "b" ? VERDE : AMBAR} w={3} />
      <Seg a={[SEG_B[0][0], 84]} b={[SEG_B[0][0], 96]} color={INK} w={1.4} />
      <Seg a={[SEG_B[1][0], 84]} b={[SEG_B[1][0], 96]} color={INK} w={1.4} />
      <Txt p={[SEG_B[0][0], 76]} color={INK}>{`b = ${LC_B / 10} cm`}</Txt>
      <Seg a={SEG_A[0]} b={SEG_A[1]} color={resaltar === "a" ? VERDE : AZUL} w={3} />
      <Seg a={[SEG_A[0][0], 134]} b={[SEG_A[0][0], 146]} color={INK} w={1.4} />
      <Seg a={[SEG_A[1][0], 134]} b={[SEG_A[1][0], 146]} color={INK} w={1.4} />
      <Txt p={[SEG_A[0][0], 126]} color={INK}>{`a = ${LC_A / 10} cm`}</Txt>
      {ab ? <Txt p={[400, 190]} color={INK}>{`c = AB = ${LC_AB / 10} cm`}</Txt> : null}
    </g>
  );
}

export function TrianguloLllCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 1 ? 2600 : step === 2 ? 4200 : step === 3 ? 4200 : step === 4 ? 4600 : 1);
  const aC = angDe(LA, LC);
  const aB = angDe(LB, LC);
  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step === 2) comp = poseCompas(LA, enCirculo(LA, LC_B, lerp(aC - 24, aC + 24, p)));
  else if (step === 3) comp = poseCompas(LB, enCirculo(LB, LC_A, lerp(aB + 24, aB - 24, p)));
  return (
    <BenchShell scene="triangulo-lll-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con los tres lados de un triángulo y su construcción con el compás">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con los tres lados de un triángulo y su construcción con el compás" data-testid="bench-lll">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <DatosLll resaltar={step === 2 ? "b" : step === 3 ? "a" : null} ab={step < 1} />
        {step >= 1 ? (
          <g data-testid="bench-lll-base">
            {step === 1 ? <ReglaTrazando a={LA} b={LB} p={p} ext={0} /> : <Seg a={LA} b={LB} w={1.8} />}
            <Punto p={LA} nombre="A" dx={-16} dy={18} />
            <Punto p={LB} nombre="B" dx={8} dy={18} />
            <Txt p={[puntoMedio(LA, LB)[0] - 22, 326]} color={INK}>{`c = ${LC_AB / 10} cm`}</Txt>
          </g>
        ) : null}
        {step >= 2 ? <ArcoAnim c={LA} r={LC_B} a1={aC - 24} a2={aC + 24} t={step === 2 ? p : 1} /> : null}
        {step >= 3 ? <ArcoAnim c={LB} r={LC_A} a1={aB + 24} a2={aB - 24} t={step === 3 ? p : 1} /> : null}
        {step >= 4 ? (
          <g data-testid="bench-lll-final">
            <path d={poligono([LA, LB, LC])} fill="rgba(31,157,85,0.14)" stroke={VERDE} strokeWidth="2" strokeLinejoin="round" />
            <Punto p={LC} nombre="C" dx={8} dy={-8} />
            <Txt p={[LA[0] + 14, 230]} color={AMBAR}>b</Txt>
            <Txt p={[LB[0] - 30, 230]} color={AZUL}>a</Txt>
          </g>
        ) : null}
        {step === 4 ? (
          <>
            <ReglaTrazando a={LA} b={LC} p={tramo(p, 0, 0.5)} ext={0} color={VERDE} />
            <ReglaTrazando a={LC} b={LB} p={tramo(p, 0.5, 1)} ext={0} color={VERDE} />
          </>
        ) : null}
        {comp ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

const defLll: Def = {
  scene: "triangulo-lll-practica",
  fases: ["medida", "centro", "arco", "medida", "centro", "arco", "regla"],
  nClics: 4,
  extRegla: 0,
  papel: (est: Est) => (
    <g>
      <DatosLll resaltar={null} ab={false} />
      <Seg a={LA} b={LB} w={1.8} />
      <Punto p={LA} nombre="A" dx={-16} dy={18} />
      <Punto p={LB} nombre="B" dx={8} dy={18} />
      <Txt p={[puntoMedio(LA, LB)[0] - 22, 326]} color={INK}>{`c = ${LC_AB / 10} cm`}</Txt>
      {est.fase >= 7 ? <Punto p={LC} nombre="C" dx={8} dy={-8} /> : null}
    </g>
  ),
  medibles: (est) => (est.fase === 0 ? SEG_B : SEG_A),
  candidatos: (_est, idx) => (idx === 0 ? [LA] : [LB]),
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 215],
  radioIni: () => 100,
  rhoIni: (n) => (n === 0 ? -25 : 25),
  arco: (_est, _n, _r, c) => ({ centro: c, base: angDe(c, LC), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
  cortes: () => [LA, LB, LC],
  validarClic: (est, punto) => {
    const a = (q: Pt) => (dist(q, LA) < 1 ? "A" : dist(q, LB) < 1 ? "B" : "C");
    if (est.clics.length % 2 === 0) return null;
    const prev = a(est.clics[est.clics.length - 1]);
    const act = a(punto);
    if (prev === act) return "Un lado une dos puntos distintos: toca otro vértice.";
    if ([prev, act].sort().join("") === "AB") return "El lado AB ya está dibujado: une C con A y con B.";
    for (let i = 0; i + 1 < est.clics.length; i += 2) if ([a(est.clics[i]), a(est.clics[i + 1])].sort().join("") === [prev, act].sort().join("")) return "Ese lado ya está trazado: elige el otro.";
    return null;
  },
  repetir: true,
  evaluar: () => ({ ok: true, mensaje: "Correcto: el triángulo ABC tiene los tres lados dados, porque C está a b de A y a a de B." }),
};

export function TrianguloLllPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defLll} vista={vista} />;
}

/* ───────────── Hexágono inscrito: el radio seis veces sobre la circunferencia ───────────── */

const HO: Pt = [310, 190];
const HR = 120;
const HV: Pt[] = Array.from({ length: 6 }, (_, i) => enCirculo(HO, HR, 60 * i));

function PapelHexagono({ marcados, lados = 0, relleno = false }: { marcados: number; lados?: number; relleno?: boolean }) {
  return (
    <g>
      <circle cx={HO[0]} cy={HO[1]} r={HR} fill="none" stroke={INK} strokeWidth="1.5" />
      <circle cx={HO[0]} cy={HO[1]} r="2.4" fill={INK} />
      <Txt p={[HO[0] + 6, HO[1] + 16]} color={INK}>O</Txt>
      {relleno ? <path d={poligono(HV)} fill="rgba(31,157,85,0.14)" stroke={VERDE} strokeWidth="2" strokeLinejoin="round" /> : null}
      {lados > 0 && !relleno
        ? Array.from({ length: lados }, (_, i) => <Seg key={i} a={HV[i]} b={HV[(i + 1) % 6]} color={VERDE} w={2} />)
        : null}
      {HV.slice(0, marcados).map((v, i) => (
        <Punto key={i} p={v} nombre={`V${i + 1}`} dx={v[0] > HO[0] + 1 ? 8 : -14} dy={v[1] < HO[1] - 1 ? -8 : v[1] > HO[1] + 1 ? 16 : 4} />
      ))}
    </g>
  );
}

export function HexagonoCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 1 ? 2400 : step === 2 ? 4200 : step === 3 ? 6800 : step === 4 ? 6000 : 1);
  // paso 2: arco desde V1 que corta en V2; paso 3: el resto de arcos, uno tras otro
  const k = step === 3 ? Math.min(3, Math.floor(p * 4)) : 0; // arco 3, 4, 5 y 6 (índices 2..5)
  const local = step === 3 ? clamp(p * 4 - k, 0, 1) : 1;
  const arcoDe = (i: number) => ({ c: HV[i], a: angDe(HV[i], HV[(i + 1) % 6]) });
  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step === 1) comp = poseCompas(HO, enCirculo(HO, HR, lerp(0, 0, p)));
  else if (step === 2) {
    const { c, a } = arcoDe(0);
    comp = poseCompas(c, enCirculo(c, HR, lerp(a - 24, a + 24, p)));
  } else if (step === 3) {
    const { c, a } = arcoDe(k + 1);
    comp = poseCompas(c, enCirculo(c, HR, lerp(a - 24, a + 24, local)));
  }
  const marcados = step <= 1 ? 1 : step === 2 ? 1 + (p > 0.95 ? 1 : 0) : step === 3 ? 2 + k + (local > 0.95 ? 1 : 0) : 6;
  return (
    <BenchShell scene="hexagono-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con una circunferencia y el hexágono regular inscrito">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con una circunferencia y el hexágono regular inscrito" data-testid="bench-hexagono">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelHexagono marcados={Math.min(6, marcados)} relleno={step === 4 && p > 0.9} />
        {step >= 2 ? (
          <g data-testid="bench-arcos-hex">
            {Array.from({ length: step === 2 ? 1 : step === 3 ? k + 2 : 5 }, (_, i) => {
              const { c, a } = arcoDe(i);
              const ultimo = (step === 2 && i === 0) || (step === 3 && i === k + 1);
              return <ArcoAnim key={i} c={c} r={HR} a1={a - 24} a2={a + 24} t={ultimo ? (step === 2 ? p : local) : 1} />;
            })}
          </g>
        ) : null}
        {step === 1 ? <Seg a={HO} b={HV[0]} color={AMBAR} w={2.4} /> : null}
        {step === 4
          ? HV.map((v, i) => <ReglaTrazando key={i} a={v} b={HV[(i + 1) % 6]} p={tramo(p, i / 6, (i + 1) / 6)} ext={0} color={VERDE} />)
          : null}
        {step === 4 && p > 0.9 ? <Txt p={[HO[0] - 70, 345]} color={VERDE} size={14}>lado del hexágono = radio</Txt> : null}
        {comp ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

const hexDe = (fase: number) => Math.floor((fase - 1) / 3); // vértice cuyo arco se está haciendo (0..4)

const defHexagono: Def = {
  scene: "hexagono-practica",
  fases: ["medida", ...Array.from({ length: 5 }, () => ["centro", "arco", "punto"] as const).flat(), "regla"],
  nClics: 12,
  extRegla: 0,
  repetir: true,
  papel: (est: Est) => {
    const hechos = est.fase <= 0 ? 1 : 1 + Math.min(5, Math.floor((est.fase - 1) / 3));
    return <PapelHexagono marcados={Math.min(6, hechos)} lados={Math.floor(est.clics.length / 2)} relleno={est.fase >= 17} />;
  },
  medibles: () => [HO, HV[0]],
  candidatos: (_est, idx) => [HV[idx]],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 200],
  radioIni: () => 100,
  rhoIni: () => -25,
  arco: (_est, n, _r, c) => ({ centro: c, base: angDe(c, HV[(n + 1) % 6]), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
  cortes: (est) => (est.fase >= 16 ? HV : [HV[hexDe(est.fase) + 1]]),
  progreso: (est) => (est.fase >= 16 ? `Lados trazados: ${Math.floor(est.clics.length / 2)} de 6` : null),
  validarClic: (est, punto) => {
    if (est.clics.length % 2 === 0) return null;
    const i = HV.findIndex((v) => dist(v, est.clics[est.clics.length - 1]) < 1);
    const j = HV.findIndex((v) => dist(v, punto) < 1);
    if ((i - j + 6) % 6 !== 1 && (j - i + 6) % 6 !== 1) return "Un lado del hexágono une dos vértices consecutivos: toca el vértice contiguo.";
    for (let m = 0; m + 1 < est.clics.length; m += 2) {
      const x = HV.findIndex((v) => dist(v, est.clics[m]) < 1);
      const y = HV.findIndex((v) => dist(v, est.clics[m + 1]) < 1);
      if ((x === i && y === j) || (x === j && y === i)) return "Ese lado ya está trazado: elige otro.";
    }
    return null;
  },
  evaluar: () => ({ ok: true, mensaje: "Correcto: los seis vértices están a una distancia R unos de otros, así que el lado del hexágono regular es igual al radio." }),
};

export function HexagonoPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defHexagono} vista={vista} />;
}

/** Geometría de las escenas, para los tests. */
export const POLIGONOS_GEOM = { LA, LB, LC, SEG_A, SEG_B, HO, HR, HV, CC_O, CC_PARES };
