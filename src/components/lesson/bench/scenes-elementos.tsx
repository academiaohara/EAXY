"use client";

import { type ReactNode } from "react";
import { angDe, dist, enCirculo, puntoMedio, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, poseCompas } from "./instruments";
import { AMBAR, AZUL, Arco, BenchShell, usePaso, INK, SVG_CLASS, VERDE, type BenchBlock, type BenchSceneName } from "./scenes";
import { ArcoAnim, MSHEET, MV, ReglaTrazando, lerp, lerpP, tramo, useProgreso } from "./scenes-compas";
import { Seg, Txt } from "./scenes-proporcion";
import { ArcoPlano } from "./scenes-trazados";

const AUX = "#6b7480";

/** Hoja de la mesa de dibujo con los pasos en la columna de información. */
function Hoja({ scene, block, step, setStep, label, testId, children }: { scene: BenchSceneName; block: BenchBlock; step: number; setStep: (n: number) => void; label: string; testId: string; children: ReactNode }) {
  return (
    <BenchShell scene={scene} notes={block.notes} step={step} setStep={setStep} label={label}>
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label={label} data-testid={testId}>
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        {children}
      </svg>
    </BenchShell>
  );
}

const Marca = ({ p, color = INK, r = 3 }: { p: Pt; color?: string; r?: number }) => <circle cx={p[0]} cy={p[1]} r={r} fill={color} />;

/* ───────────── 1. Concepto y designación de los elementos ───────────── */

const ELEMENTOS = ["Punto", "Línea recta", "Línea curva", "Segmento", "Semirrecta", "Ángulo", "Plano"];
const CENTROS: Pt[] = [[110, 88], [310, 88], [510, 88], [110, 200], [310, 200], [510, 200], [310, 305]];

function DibujoElemento({ i }: { i: number }) {
  const [x, y] = CENTROS[i];
  switch (i) {
    case 0:
      return (
        <g>
          <Seg a={[x - 50, y - 28]} b={[x + 50, y + 28]} />
          <Seg a={[x - 50, y + 28]} b={[x + 50, y - 28]} />
          <Marca p={[x, y]} />
          <Txt p={[x + 6, y - 8]}>P</Txt>
        </g>
      );
    case 1:
      return (
        <g>
          <Seg a={[x - 90, y]} b={[x + 90, y]} />
          <Txt p={[x + 70, y - 8]}>r</Txt>
        </g>
      );
    case 2:
      return (
        <g>
          <path d={`M${x - 80} ${y + 10} C ${x - 40} ${y - 50}, ${x + 10} ${y + 50}, ${x + 80} ${y - 10}`} fill="none" stroke={INK} strokeWidth="1.5" />
          <Txt p={[x - 4, y - 28]}>c</Txt>
        </g>
      );
    case 3:
      return (
        <g>
          <Seg a={[x - 80, y]} b={[x + 80, y]} />
          <Marca p={[x - 80, y]} />
          <Marca p={[x + 80, y]} />
          <Txt p={[x - 90, y + 20]}>A</Txt>
          <Txt p={[x + 78, y + 20]}>B</Txt>
        </g>
      );
    case 4:
      return (
        <g>
          <Seg a={[x - 80, y]} b={[x + 95, y]} />
          <Marca p={[x - 80, y]} />
          <path d={`M${x + 95} ${y} l-9 -4 l0 8 z`} fill={INK} />
          <Txt p={[x - 92, y + 20]}>O</Txt>
          <Txt p={[x + 20, y - 8]}>r</Txt>
        </g>
      );
    case 5:
      return (
        <g>
          <Seg a={[x - 70, y + 22]} b={[x + 80, y + 22]} />
          <Seg a={[x - 70, y + 22]} b={[x + 40, y - 45]} />
          <Marca p={[x - 70, y + 22]} />
          <Txt p={[x - 84, y + 42]}>A</Txt>
          <Arco v={[x - 70, y + 22]} a1={0} a2={-31.5} r={28} color={AMBAR} text="β" textSize={13} dr={12} />
        </g>
      );
    default:
      return (
        <g>
          <path d={`M${x - 70} ${y + 28} L${x - 30} ${y - 28} L${x + 90} ${y - 28} L${x + 50} ${y + 28} Z`} fill="rgba(31,120,180,0.12)" stroke={INK} strokeWidth="1.5" />
          <Txt p={[x - 12, y + 6]}>α</Txt>
        </g>
      );
  }
}

export function ElementosGeometricos({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  return (
    <Hoja scene="elementos-geometricos" block={block} step={step} setStep={setStep} label="Hoja con los elementos geométricos: punto, recta, curva, segmento, semirrecta, ángulo y plano" testId="bench-elementos-geom">
      {ELEMENTOS.map((nombre, i) => (
        <g key={nombre} opacity={i === step ? 1 : 0.22} data-testid={i === step ? "bench-elemento-activo" : undefined}>
          {i === step ? <rect x={CENTROS[i][0] - 100} y={CENTROS[i][1] - 50} width="200" height="100" rx="10" fill="rgba(255,196,60,0.10)" stroke="#e0a800" strokeWidth="1.2" strokeDasharray="5 4" /> : null}
          <DibujoElemento i={i} />
          <Txt p={[CENTROS[i][0] - 38, CENTROS[i][1] + 42]} color={i === step ? AMBAR : INK} size={14}>{nombre}</Txt>
        </g>
      ))}
    </Hoja>
  );
}

/* ───────────── 2. Operaciones con la regla y el compás ───────────── */

export function OperacionesReglaCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const p = useProgreso(step, step === 0 ? 3000 : step === 2 ? 4200 : step === 5 ? 7200 : step === 6 ? 10000 : 1);
  const A: Pt = [180, 200];
  const B: Pt = [440, 200];
  const O: Pt = [310, 190];
  const R = 100;
  let comp: ReturnType<typeof poseCompas> | null = null;
  const nodos: ReactNode[] = [];

  if (step === 0) {
    nodos.push(<Marca key="a" p={A} />, <Marca key="b" p={B} />, <Txt key="ta" p={[A[0] - 8, A[1] + 22]}>A</Txt>, <Txt key="tb" p={[B[0] - 4, B[1] + 22]}>B</Txt>);
    nodos.push(<ReglaTrazando key="r" a={A} b={B} p={p} ext={70} />);
    nodos.push(<Txt key="n" p={[250, 120]} color={AZUL} size={14}>recta r por dos puntos A y B</Txt>);
  } else if (step === 1) {
    const P: Pt = [310, 195];
    nodos.push(<Seg key="r" a={[120, 130]} b={[500, 260]} />, <Seg key="s" a={[120, 260]} b={[500, 130]} />, <Marca key="p" p={P} color={AMBAR} r={4} />);
    nodos.push(<Txt key="tr" p={[96, 124]}>r</Txt>, <Txt key="ts" p={[96, 276]}>s</Txt>, <Txt key="tp" p={[318, 182]} color={AMBAR} size={15}>P</Txt>);
    nodos.push(<Txt key="n" p={[200, 330]} color={AZUL} size={14}>P es la intersección de r y s</Txt>);
  } else if (step === 2) {
    nodos.push(<ArcoAnim key="c" c={O} r={R} a1={0} a2={360} t={p} />, <Marca key="o" p={O} />, <Txt key="to" p={[O[0] + 6, O[1] + 16]}>O</Txt>);
    nodos.push(<Seg key="rad" a={O} b={enCirculo(O, R, 225)} color={AMBAR} w={2} />, <Txt key="tr" p={[O[0] - 62, O[1] + 40]} color={AMBAR}>R</Txt>);
    comp = poseCompas(O, enCirculo(O, R, 360 * p));
    nodos.push(<Txt key="n" p={[190, 332]} color={AZUL} size={14}>circunferencia de centro O y radio R</Txt>);
  } else if (step === 3) {
    const [P1, P2]: [Pt, Pt] = [enCirculo(O, R, 152), enCirculo(O, R, 18)];
    const dd = dist(P1, P2);
    const u: Pt = [(P2[0] - P1[0]) / dd, (P2[1] - P1[1]) / dd];
    nodos.push(<circle key="c" cx={O[0]} cy={O[1]} r={R} fill="none" stroke={INK} strokeWidth="1.5" />, <Marca key="o" p={O} />, <Txt key="to" p={[O[0] + 6, O[1] + 16]}>O</Txt>);
    nodos.push(<Seg key="l" a={[P1[0] - u[0] * 110, P1[1] - u[1] * 110]} b={[P2[0] + u[0] * 110, P2[1] + u[1] * 110]} />);
    nodos.push(<Marca key="a" p={P1} color={AMBAR} r={4} />, <Marca key="b" p={P2} color={AMBAR} r={4} />, <Txt key="ta" p={[P1[0] - 18, P1[1] - 8]} color={AMBAR} size={15}>A</Txt>, <Txt key="tb" p={[P2[0] + 8, P2[1] - 8]} color={AMBAR} size={15}>B</Txt>);
    nodos.push(<Txt key="n" p={[170, 332]} color={AZUL} size={14}>A y B: intersección de la recta y la circunferencia</Txt>);
  } else if (step === 4) {
    const c1: Pt = [250, 190];
    const c2: Pt = [370, 190];
    const rr = 95;
    const dy = Math.sqrt(rr * rr - 60 * 60);
    const A1: Pt = [310, 190 - dy];
    const B1: Pt = [310, 190 + dy];
    nodos.push(<circle key="c1" cx={c1[0]} cy={c1[1]} r={rr} fill="none" stroke={INK} strokeWidth="1.5" />, <circle key="c2" cx={c2[0]} cy={c2[1]} r={rr} fill="none" stroke={INK} strokeWidth="1.5" />);
    nodos.push(<Marca key="a" p={A1} color={AMBAR} r={4} />, <Marca key="b" p={B1} color={AMBAR} r={4} />, <Txt key="ta" p={[A1[0] + 8, A1[1] - 4]} color={AMBAR} size={15}>A</Txt>, <Txt key="tb" p={[B1[0] + 8, B1[1] + 14]} color={AMBAR} size={15}>B</Txt>);
    nodos.push(<Txt key="n" p={[170, 332]} color={AZUL} size={14}>A y B: intersección de dos circunferencias</Txt>);
  } else if (step === 5) {
    // transporte de un segmento: se toma AB con el compás y se lleva sobre la recta desde C
    const a: Pt = [90, 90];
    const b: Pt = [250, 90];
    const C: Pt = [250, 250];
    const D: Pt = [410, 250];
    const t1 = tramo(p, 0, 0.3);
    const t2 = tramo(p, 0.4, 0.9);
    nodos.push(<Seg key="ab" a={a} b={b} w={2} />, <Marca key="a" p={a} />, <Marca key="b" p={b} />, <Txt key="ta" p={[a[0] - 6, a[1] - 10]}>A</Txt>, <Txt key="tb" p={[b[0] - 4, b[1] - 10]}>B</Txt>);
    nodos.push(<Seg key="r" a={[150, 250]} b={[540, 250]} />, <Marca key="c" p={C} />, <Txt key="tc" p={[C[0] - 6, C[1] + 22]}>C</Txt>);
    nodos.push(<ArcoAnim key="arc" c={C} r={160} a1={-22} a2={22} t={t2} />);
    if (t2 >= 1) nodos.push(<Marca key="d" p={D} color={AMBAR} r={4} />, <Txt key="td" p={[D[0] - 6, D[1] + 22]} color={AMBAR} size={15}>D</Txt>, <Seg key="cd" a={C} b={D} color={AMBAR} w={3} />);
    comp = p < 0.4 ? poseCompas(a, b) : p < 0.95 ? poseCompas(C, enCirculo(C, 160, lerp(-22, 22, t2))) : null;
    void t1;
  } else {
    // transporte de un ángulo: se toma la cuerda entre los dos cortes y se lleva sobre el arco trazado desde B
    const A: Pt = [120, 130];
    const B: Pt = [120, 290];
    const r = 90;
    const ang = 38;
    const P1 = enCirculo(A, r, 0);
    const P2 = enCirculo(A, r, ang);
    const cuerda = dist(P1, P2);
    const Q1 = enCirculo(B, r, 0);
    const Q2 = enCirculo(B, r, ang);
    const tB = tramo(p, 0.22, 0.42);
    const tQ = tramo(p, 0.45, 0.75);
    const tR = tramo(p, 0.78, 1);
    nodos.push(<Seg key="a1" a={A} b={[330, A[1]]} />, <Seg key="a2" a={A} b={enCirculo(A, 230, ang)} />, <Marca key="a" p={A} />, <Txt key="ta" p={[A[0] - 16, A[1] + 18]}>A</Txt>);
    nodos.push(<ArcoPlano key="arc1" c={A} r={r} a1={-4} a2={ang + 8} />, <Marca key="p1" p={P1} color={AMBAR} r={3.6} />, <Marca key="p2" p={P2} color={AMBAR} r={3.6} />, <Seg key="ch" a={P1} b={P2} color={AMBAR} w={2.4} />);
    nodos.push(<Txt key="tc" p={[P1[0] + 20, P1[1] - 40]} color={AMBAR} size={13}>cuerda</Txt>);
    nodos.push(<Seg key="b1" a={B} b={[330, B[1]]} />, <Marca key="b" p={B} />, <Txt key="tb" p={[B[0] - 16, B[1] + 18]}>B</Txt>);
    if (tB > 0) nodos.push(<ArcoAnim key="arc2" c={B} r={r} a1={-4} a2={ang + 8} t={tB} />);
    if (tB >= 1) nodos.push(<Marca key="q1" p={Q1} color={AMBAR} r={3.6} />);
    if (tQ > 0) nodos.push(<ArcoAnim key="arc3" c={Q1} r={cuerda} a1={angDe(Q1, Q2) - 16} a2={angDe(Q1, Q2) + 16} t={tQ} />);
    if (tQ >= 1) nodos.push(<Marca key="q2" p={Q2} color={AMBAR} r={4} />);
    if (tR > 0) nodos.push(<ReglaTrazando key="r2" a={B} b={Q2} p={tR} ext={110} color={AMBAR} />);
    nodos.push(<Txt key="n" p={[370, 330]} color={AZUL} size={13}>el ángulo en B es igual al de A</Txt>);
    comp = p < 0.2 ? poseCompas(P1, P2) : tB > 0 && tB < 1 ? poseCompas(B, enCirculo(B, r, lerp(-4, ang + 8, tB))) : tQ > 0 && tQ < 1 ? poseCompas(Q1, enCirculo(Q1, cuerda, lerp(angDe(Q1, Q2) - 16, angDe(Q1, Q2) + 16, tQ))) : null;
  }
  return (
    <Hoja scene="operaciones-regla-compas" block={block} step={step} setStep={setStep} label="Hoja con las operaciones básicas con la regla y el compás" testId="bench-operaciones">
      {nodos}
      {comp ? (
        <g data-testid="bench-compas" pointerEvents="none">
          <Compas pose={comp.pose} open={comp.open} />
        </g>
      ) : null}
    </Hoja>
  );
}

/* ───────────── 3. Lugar geométrico ───────────── */

const TickIgual = ({ a, b, k = 1, color = VERDE }: { a: Pt; b: Pt; k?: number; color?: string }) => {
  const m = puntoMedio(a, b);
  const d = dist(a, b);
  const n: Pt = [-(b[1] - a[1]) / d, (b[0] - a[0]) / d];
  return (
    <g stroke={color} strokeWidth="1.6">
      {Array.from({ length: k }, (_, i) => {
        const o = (i - (k - 1) / 2) * 5;
        const q: Pt = [m[0] + ((b[0] - a[0]) / d) * o, m[1] + ((b[1] - a[1]) / d) * o];
        return <line key={i} x1={q[0] - n[0] * 5} y1={q[1] - n[1] * 5} x2={q[0] + n[0] * 5} y2={q[1] + n[1] * 5} />;
      })}
    </g>
  );
};

/** Distancia en pixels → unidades de la hoja (20 px = 1), con coma decimal. */
const u1 = (px: number) => (px / 20).toFixed(1).replace(".", ",");

export function LugarGeometrico({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const nodos: ReactNode[] = [];
  const titulo = ["Circunferencia", "Mediatriz de un segmento", "Bisectriz de un ángulo", "Elipse", "Hipérbola", "Parábola"][step];
  const p = useProgreso(step, step >= 3 ? 7000 : 1);
  const propiedad = ["todos sus puntos equidistan del centro", "todos sus puntos equidistan de los extremos", "todos sus puntos equidistan de los lados", "d₁ + d₂ = 2a (constante)", "|d₁ − d₂| = 2a (constante)", "d₁ = d₂: distancia al foco = distancia a la directriz"][step];
  if (step === 0) {
    const O: Pt = [310, 190];
    const R = 120;
    nodos.push(<circle key="c" cx={O[0]} cy={O[1]} r={R} fill="none" stroke={INK} strokeWidth="1.6" />, <Marca key="o" p={O} />, <Txt key="to" p={[O[0] + 6, O[1] + 18]}>O</Txt>);
    [20, 110, 200, 300].forEach((a, i) => {
      const q = enCirculo(O, R, a);
      nodos.push(<Seg key={`r${i}`} a={O} b={q} color={AMBAR} w={1.6} dash="5 4" />, <Marca key={`p${i}`} p={q} color={AMBAR} />, <TickIgual key={`t${i}`} a={O} b={q} />);
    });
  } else if (step === 1) {
    const A: Pt = [170, 200];
    const B: Pt = [450, 200];
    nodos.push(<Seg key="ab" a={A} b={B} w={1.8} />, <Marca key="a" p={A} />, <Marca key="b" p={B} />, <Txt key="ta" p={[A[0] - 6, A[1] + 22]}>A</Txt>, <Txt key="tb" p={[B[0] - 4, B[1] + 22]}>B</Txt>);
    nodos.push(<Seg key="m" a={[310, 40]} b={[310, 350]} color={VERDE} w={2} />, <Txt key="tm" p={[318, 50]} color={VERDE}>m</Txt>);
    [90, 150, 280].forEach((y, i) => {
      const q: Pt = [310, y];
      nodos.push(<Marca key={`q${i}`} p={q} color={AMBAR} />, <Seg key={`a${i}`} a={q} b={A} color={AMBAR} w={1.4} dash="5 4" />, <Seg key={`b${i}`} a={q} b={B} color={AMBAR} w={1.4} dash="5 4" />, <TickIgual key={`ta${i}`} a={q} b={A} k={i + 1} />, <TickIgual key={`tb${i}`} a={q} b={B} k={i + 1} />);
    });
  } else if (step === 2) {
    const V: Pt = [140, 300];
    const ang = 50;
    nodos.push(<Seg key="a" a={V} b={[560, 300]} w={1.8} />, <Seg key="b" a={V} b={enCirculo(V, 440, ang)} w={1.8} />, <Seg key="bis" a={V} b={enCirculo(V, 440, ang / 2)} color={VERDE} w={2} />, <Marca key="v" p={V} />);
    const dirB: Pt = [Math.cos((ang * Math.PI) / 180), -Math.sin((ang * Math.PI) / 180)];
    const pieEn = (q: Pt, u: Pt): Pt => {
      const t = (q[0] - V[0]) * u[0] + (q[1] - V[1]) * u[1];
      return [V[0] + u[0] * t, V[1] + u[1] * t];
    };
    [150, 260, 360].forEach((d, i) => {
      const q = enCirculo(V, d, ang / 2);
      const pieA = pieEn(q, [1, 0]);
      const pieB = pieEn(q, dirB);
      nodos.push(<Marca key={`q${i}`} p={q} color={AMBAR} />, <Seg key={`pa${i}`} a={q} b={pieA} color={AMBAR} w={1.4} dash="5 4" />, <Seg key={`pb${i}`} a={q} b={pieB} color={AMBAR} w={1.4} dash="5 4" />, <TickIgual key={`ta${i}`} a={q} b={pieA} k={i + 1} />, <TickIgual key={`tb${i}`} a={q} b={pieB} k={i + 1} />);
    });
  } else if (step === 3) {
    // elipse: P recorre la curva y d₁ + d₂ se mantiene en 2a
    const c: Pt = [310, 200];
    const a = 190;
    const b = 115;
    const fc = Math.sqrt(a * a - b * b);
    const F1: Pt = [c[0] - fc, c[1]];
    const F2: Pt = [c[0] + fc, c[1]];
    const t = (20 + 340 * p) * (Math.PI / 180);
    const P: Pt = [c[0] + a * Math.cos(t), c[1] - b * Math.sin(t)];
    const d1 = dist(P, F1);
    const d2 = dist(P, F2);
    nodos.push(<Seg key="ex" a={[c[0] - a - 28, c[1]]} b={[c[0] + a + 28, c[1]]} color={AUX} w={1} />, <Seg key="ey" a={[c[0], c[1] - b - 28]} b={[c[0], c[1] + b + 28]} color={AUX} w={1} />);
    nodos.push(<ellipse key="e" cx={c[0]} cy={c[1]} rx={a} ry={b} fill="none" stroke={INK} strokeWidth="1.8" />);
    nodos.push(<Seg key="va" a={[c[0] - a, c[1] + b + 22]} b={[c[0] + a, c[1] + b + 22]} color={VERDE} w={2} />, <Txt key="v2a" p={[c[0] - 12, c[1] + b + 40]} color={VERDE}>2a</Txt>);
    nodos.push(<Marca key="f1" p={F1} color={AZUL} r={4.5} />, <Marca key="f2" p={F2} color={AZUL} r={4.5} />, <Txt key="t1" p={[F1[0] - 28, F1[1] + 20]} color={AZUL}>Foco 1</Txt>, <Txt key="t2" p={[F2[0] - 14, F2[1] + 20]} color={AZUL}>Foco 2</Txt>);
    nodos.push(<Seg key="d1" a={P} b={F1} color={AMBAR} w={1.8} />, <Seg key="d2" a={P} b={F2} color={AZUL} w={1.8} />, <Marca key="p" p={P} color={AMBAR} r={4.5} />, <Txt key="tp" p={[P[0] + 8, P[1] - 8]} color={AMBAR}>P</Txt>);
    nodos.push(<Txt key="l1" p={[(P[0] + F1[0]) / 2 - 10, (P[1] + F1[1]) / 2 - 8]} color={AMBAR}>d₁</Txt>, <Txt key="l2" p={[(P[0] + F2[0]) / 2 + 6, (P[1] + F2[1]) / 2 - 8]} color={AZUL}>d₂</Txt>);
    nodos.push(<Txt key="num" p={[24, 80]} color={INK} size={14}>{`d₁ = ${u1(d1)}; d₂ = ${u1(d2)}; d₁ + d₂ = ${u1(d1 + d2)} = 2a`}</Txt>);
  } else if (step === 4) {
    // hipérbola: P recorre la rama derecha y |d₁ − d₂| se mantiene en 2a
    const c: Pt = [310, 200];
    const a = 70;
    const fc = 140;
    const b = Math.sqrt(fc * fc - a * a);
    const F1: Pt = [c[0] - fc, c[1]];
    const F2: Pt = [c[0] + fc, c[1]];
    const rama = (sig: number) => {
      const pts: string[] = [];
      for (let t = -0.95; t <= 0.951; t += 0.05) pts.push(`${c[0] + sig * a * Math.cosh(t)},${c[1] + b * Math.sinh(t)}`);
      return pts.join(" ");
    };
    const tt = -0.9 + 1.8 * p;
    const P: Pt = [c[0] + a * Math.cosh(tt), c[1] + b * Math.sinh(tt)];
    const d1 = dist(P, F1);
    const d2 = dist(P, F2);
    nodos.push(<Seg key="ex" a={[c[0] - fc - 40, c[1]]} b={[c[0] + fc + 40, c[1]]} color={AUX} w={1} />, <Seg key="ey" a={[c[0], c[1] - 140]} b={[c[0], c[1] + 140]} color={AUX} w={1} />);
    nodos.push(<polyline key="r1" points={rama(1)} fill="none" stroke={INK} strokeWidth="1.8" />, <polyline key="r2" points={rama(-1)} fill="none" stroke={INK} strokeWidth="1.8" />);
    nodos.push(<Seg key="a1" a={[c[0] - a, c[1]]} b={c} color={AMBAR} w={3.5} />, <Seg key="a2" a={c} b={[c[0] + a, c[1]]} color={VERDE} w={3.5} />, <Txt key="ta1" p={[c[0] - a / 2 - 4, c[1] + 20]} color={AMBAR}>a</Txt>, <Txt key="ta2" p={[c[0] + a / 2 - 4, c[1] + 20]} color={VERDE}>a</Txt>);
    nodos.push(<Marca key="f1" p={F1} color={AZUL} r={4.5} />, <Marca key="f2" p={F2} color={AZUL} r={4.5} />, <Txt key="t1" p={[F1[0] - 12, F1[1] + 20]} color={AZUL}>F₁</Txt>, <Txt key="t2" p={[F2[0] + 8, F2[1] + 20]} color={AZUL}>F₂</Txt>);
    nodos.push(<Seg key="d1" a={P} b={F1} color={AMBAR} w={1.6} dash="6 4" />, <Seg key="d2" a={P} b={F2} color={AZUL} w={1.8} />, <Marca key="p" p={P} color={AMBAR} r={4.5} />, <Txt key="tp" p={[P[0] + 8, P[1] - 8]} color={AMBAR}>P</Txt>);
    nodos.push(<Txt key="l1" p={[(P[0] + F1[0]) / 2 - 4, (P[1] + F1[1]) / 2 - 10]} color={AMBAR}>d₁</Txt>, <Txt key="l2" p={[(P[0] + F2[0]) / 2 + 8, (P[1] + F2[1]) / 2 + 6]} color={AZUL}>d₂</Txt>);
    nodos.push(<Txt key="num" p={[24, 80]} color={INK} size={14}>{`d₁ = ${u1(d1)}; d₂ = ${u1(d2)}; d₁ − d₂ = ${u1(d1 - d2)} = 2a`}</Txt>);
  } else {
    // parábola: P recorre la curva y la distancia al foco es igual a la distancia a la directriz
    const V: Pt = [300, 200];
    const pf = 62; // distancia del vértice al foco (y a la directriz)
    const F: Pt = [V[0] + pf, V[1]];
    const xd = V[0] - pf;
    const s = -135 + 270 * p;
    const xp = (y: number) => V[0] + (y * y) / (4 * pf);
    const P: Pt = [xp(s), V[1] + s];
    const Q: Pt = [xd, P[1]];
    const pol: string[] = [];
    for (let y = -150; y <= 150; y += 5) pol.push(`${xp(y)},${V[1] + y}`);
    nodos.push(<Seg key="ex" a={[xd - 30, V[1]]} b={[V[0] + 220, V[1]]} color={AUX} w={1} />);
    nodos.push(<Seg key="dir" a={[xd, V[1] - 165]} b={[xd, V[1] + 165]} color={VERDE} w={2.2} />, <Txt key="td" p={[xd - 6, V[1] - 172]} color={VERDE}>directriz d</Txt>);
    nodos.push(<polyline key="par" points={pol.join(" ")} fill="none" stroke={INK} strokeWidth="1.8" />);
    nodos.push(<Marca key="v" p={V} r={3} />, <Txt key="tv" p={[V[0] + 6, V[1] + 18]}>V</Txt>, <Marca key="f" p={F} color={AZUL} r={4.5} />, <Txt key="tf" p={[F[0] + 8, F[1] + 18]} color={AZUL}>Foco F</Txt>);
    nodos.push(<Seg key="d1" a={P} b={F} color={AMBAR} w={1.8} />, <Seg key="d2" a={P} b={Q} color={AZUL} w={1.8} />, <Marca key="q" p={Q} color={AZUL} r={3.5} />, <Marca key="p" p={P} color={AMBAR} r={4.5} />, <Txt key="tp" p={[P[0] + 8, P[1] - 8]} color={AMBAR}>P</Txt>);
    nodos.push(<Txt key="l1" p={[(P[0] + F[0]) / 2 + 8, (P[1] + F[1]) / 2 + (s < 0 ? -2 : 14)]} color={AMBAR}>d₁</Txt>, <Txt key="l2" p={[(P[0] + Q[0]) / 2 - 6, P[1] - 8]} color={AZUL}>d₂</Txt>);
    nodos.push(<Txt key="num" p={[24, 80]} color={INK} size={14}>{`d₁ = ${u1(dist(P, F))}; d₂ = ${u1(dist(P, Q))}; d₁ = d₂`}</Txt>);
  }
  return (
    <Hoja scene="lugar-geometrico" block={block} step={step} setStep={setStep} label="Hoja con ejemplos de lugares geométricos" testId="bench-lugar-geometrico">
      {nodos}
      <Txt p={[24, 34]} color={VERDE} size={15}>{titulo}</Txt>
      <Txt p={[24, 56]} color={INK} size={13}>{propiedad}</Txt>
    </Hoja>
  );
}

/* ───────────── 4. Suma y diferencia de segmentos ───────────── */

const SA = 90;
const SB = 60;
const SC = 110;
const N0: Pt = [60, 290];

function Segmento({ y, x0, len, nombre, extremos, color }: { y: number; x0: number; len: number; nombre: string; extremos: [string, string]; color: string }) {
  return (
    <g>
      <Seg a={[x0, y]} b={[x0 + len, y]} color={color} w={3} />
      <Marca p={[x0, y]} />
      <Marca p={[x0 + len, y]} />
      <Txt p={[x0 - 16, y + 4]}>{extremos[0]}</Txt>
      <Txt p={[x0 + len + 6, y + 4]}>{extremos[1]}</Txt>
      <Txt p={[x0 + len / 2 - 4, y - 8]} color={color}>{nombre}</Txt>
    </g>
  );
}

const ROJO = "#e5484d";

/** Compás que toma una medida sobre el segmento (extremos `a`, `b`), se lleva al centro `c` y traza el arco hacia `dirAng`. */
function compasTransporte(a: Pt, b: Pt, c: Pt, dirAng: number, p: number) {
  const len = dist(a, b);
  const ini = enCirculo(c, len, dirAng - 22);
  const t1 = tramo(p, 0, 0.2);
  const t2 = tramo(p, 0.2, 0.45);
  const t3 = tramo(p, 0.45, 0.85);
  if (t2 <= 0) return { t3, pose: poseCompas(a, lerpP(a, b, Math.max(t1, 0.08))) };
  if (t2 < 1) return { t3, pose: poseCompas(lerpP(a, c, t2), lerpP(b, ini, t2)) };
  return { t3, pose: poseCompas(c, enCirculo(c, len, lerp(dirAng - 22, dirAng + 22, t3))) };
}

export function SumaSegmentos({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const p = useProgreso(step, step >= 1 && step <= 3 ? 5200 : step === 4 ? 2400 : 1);
  const marcas: Pt[] = [N0, [N0[0] + SA, N0[1]], [N0[0] + SA + SB, N0[1]], [N0[0] + SA + SB + SC, N0[1]]];
  const largos = [SA, SB, SC];
  const ys = [60, 105, 150];
  const nombres = ["P", "Q", "M"];
  const k = step >= 1 && step <= 3 ? step - 1 : -1; // segmento que se transporta
  let comp: ReturnType<typeof poseCompas> | null = null;
  let t3 = 1;
  if (k >= 0) {
    const r = compasTransporte([60, ys[k]], [60 + largos[k], ys[k]], marcas[k], 0, p);
    comp = r.pose;
    t3 = r.t3;
  }
  const hecho = step === 4;
  return (
    <Hoja scene="suma-segmentos-compas" block={block} step={step} setStep={setStep} label="Hoja con tres segmentos y su suma con el compás" testId="bench-suma-segmentos">
      <Segmento y={60} x0={60} len={SA} nombre="a" extremos={["A", "B"]} color={AMBAR} />
      <Segmento y={105} x0={60} len={SB} nombre="b" extremos={["C", "D"]} color={AZUL} />
      <Segmento y={150} x0={60} len={SC} nombre="c" extremos={["E", "F"]} color={VERDE} />
      <Seg a={[40, N0[1]]} b={[560, N0[1]]} w={1} dash="5 4" />
      <Marca p={N0} />
      <Txt p={[N0[0] - 14, N0[1] + 22]}>N</Txt>
      {[0, 1, 2].map((i) =>
        step >= i + 1 ? (
          <g key={i} data-testid={`bench-tramo-${i}`}>
            <ArcoAnim c={marcas[i]} r={largos[i]} a1={-22} a2={22} t={step === i + 1 ? t3 : 1} />
            {step > i + 1 || p > 0.88 ? (
              <>
                <Marca p={marcas[i + 1]} color={colores3[i]} r={3.8} />
                <Txt p={[marcas[i + 1][0] - 4, N0[1] + 22]} color={colores3[i]}>{nombres[i]}</Txt>
              </>
            ) : null}
          </g>
        ) : null,
      )}
      {hecho ? (
        <g data-testid="bench-suma-total">
          <Seg a={N0} b={[N0[0] + (marcas[3][0] - N0[0]) * p, N0[1]]} color={ROJO} w={5} />
          {p > 0.95 ? <Txt p={[(N0[0] + marcas[3][0]) / 2 - 56, N0[1] + 52]} color={ROJO} size={15}>NM = a + b + c</Txt> : null}
        </g>
      ) : null}
      {comp ? (
        <g data-testid="bench-compas" pointerEvents="none">
          <Compas pose={comp.pose} open={comp.open} />
        </g>
      ) : null}
    </Hoja>
  );
}

const colores3 = [AMBAR, AZUL, VERDE];

const DM = 190;
const DN = 100;

export function DiferenciaSegmentos({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const p = useProgreso(step, step === 2 ? 5200 : step === 3 ? 2400 : 1);
  const A: Pt = [90, 240];
  const B: Pt = [A[0] + DM, 240];
  const E: Pt = [B[0] - DN, 240];
  let comp: ReturnType<typeof poseCompas> | null = null;
  let t3 = 1;
  if (step === 2) {
    const r = compasTransporte([90, 125], [90 + DN, 125], B, 180, p);
    comp = r.pose;
    t3 = r.t3;
  }
  return (
    <Hoja scene="diferencia-segmentos-compas" block={block} step={step} setStep={setStep} label="Hoja con dos segmentos y su diferencia con el compás" testId="bench-dif-segmentos">
      <Segmento y={70} x0={90} len={DM} nombre="m" extremos={["A", "B"]} color={AMBAR} />
      <Segmento y={125} x0={90} len={DN} nombre="n" extremos={["C", "D"]} color={AZUL} />
      <Seg a={[60, 240]} b={[420, 240]} w={1} dash="5 4" />
      {step >= 1 ? (
        <g>
          <Seg a={A} b={B} color={AMBAR} w={3} />
          <Marca p={A} />
          <Marca p={B} />
          <Txt p={[A[0] - 6, A[1] + 22]}>A</Txt>
          <Txt p={[B[0] - 4, B[1] + 22]}>B</Txt>
        </g>
      ) : null}
      {step >= 2 ? <ArcoAnim c={B} r={DN} a1={158} a2={202} t={step === 2 ? t3 : 1} /> : null}
      {step >= 3 || (step === 2 && p > 0.88) ? (
        <g>
          <Marca p={E} color={AZUL} r={4} />
          <Txt p={[E[0] - 4, E[1] + 22]} color={AZUL}>E</Txt>
        </g>
      ) : null}
      {step >= 3 ? (
        <g data-testid="bench-diferencia">
          <Seg a={A} b={[A[0] + (E[0] - A[0]) * p, A[1]]} color={ROJO} w={5} />
          {p > 0.95 ? <Txt p={[(A[0] + E[0]) / 2 - 36, 212]} color={ROJO} size={15}>AE = m − n</Txt> : null}
        </g>
      ) : null}
      {comp ? (
        <g data-testid="bench-compas" pointerEvents="none">
          <Compas pose={comp.pose} open={comp.open} />
        </g>
      ) : null}
    </Hoja>
  );
}

/* ───────────── 5. Aplicaciones de la mediatriz ───────────── */

/** Dos arcos de radio `r` desde `a` y `b` (arriba y abajo) y la mediatriz por sus cortes. */
function MediatrizDibujada({ a, b, r, p = 1, ext = 20, color = INK, arcos = true }: { a: Pt; b: Pt; r: number; p?: number; ext?: number; color?: string; arcos?: boolean }) {
  const d = dist(a, b);
  const th = (Math.acos(d / (2 * r)) * 180) / Math.PI + 12;
  const ba = angDe(a, b);
  const bb = angDe(b, a);
  const cortes: [Pt, Pt] = (() => {
    const m = puntoMedio(a, b);
    const h = Math.sqrt(r * r - (d / 2) ** 2);
    const n: Pt = [-(b[1] - a[1]) / d, (b[0] - a[0]) / d];
    return [[m[0] + n[0] * h, m[1] + n[1] * h], [m[0] - n[0] * h, m[1] - n[1] * h]];
  })();
  return (
    <g>
      {arcos ? (
        <>
          <ArcoPlano c={a} r={r} a1={ba - th} a2={ba + th} color={AUX} />
          <ArcoPlano c={b} r={r} a1={bb - th} a2={bb + th} color={AUX} />
        </>
      ) : null}
      {p > 0 ? <ReglaTrazando a={cortes[0]} b={cortes[1]} p={p} ext={ext} color={color} /> : null}
    </g>
  );
}

export function PerpendicularCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const p = useProgreso(step, 4600);
  const nodos: ReactNode[] = [];
  const caso = step < 4 ? 0 : step < 8 ? 1 : 2;
  const sub = step - [0, 4, 8][caso];
  let titulo = "";
  let comp: ReturnType<typeof poseCompas> | null = null;
  /** Arco de `a1` a `a2` con centro `c`: si es el paso actual se dibuja poco a poco y el compás lo sigue. */
  const arco = (key: string, c: Pt, r: number, a1: number, a2: number, actual: boolean, color = INK) => {
    const t = actual ? tramo(p, 0.12, 0.92) : 1;
    if (t > 0) nodos.push(<ArcoPlano key={key} c={c} r={r} a1={a1} a2={a1 + (a2 - a1) * t} color={color} />);
    if (actual) comp = poseCompas(c, enCirculo(c, r, lerp(a1, a2, t)));
  };
  const punto = (key: string, q: Pt, nombre: string, visible: boolean, dx: number, dy: number) => {
    if (!visible) return;
    nodos.push(<Marca key={key} p={q} color={AMBAR} r={4} />, <Txt key={`${key}t`} p={[q[0] + dx, q[1] + dy]} color={AMBAR}>{nombre}</Txt>);
  };
  const fin = p > 0.93;
  if (caso === 0) {
    titulo = "Perpendicular a t por un punto exterior P";
    const P: Pt = [330, 62];
    const y = 215;
    const r = 190;
    const dx = Math.sqrt(r * r - (y - P[1]) ** 2);
    const A: Pt = [P[0] - dx, y];
    const B: Pt = [P[0] + dx, y];
    const r1 = 140;
    const h2 = Math.sqrt(r1 * r1 - dx * dx);
    const M: Pt = [P[0], y - h2];
    const N: Pt = [P[0], y + h2];
    const th = (Math.atan2(h2, dx) * 180) / Math.PI;
    nodos.push(<Seg key="t" a={[90, y]} b={[570, y]} w={1.8} />, <Txt key="tt" p={[548, y - 10]}>t</Txt>, <Marca key="p" p={P} />, <Txt key="tp" p={[P[0] + 10, P[1] + 4]}>P</Txt>);
    const aP = angDe(P, A);
    const bP = angDe(P, B);
    arco("c0", P, r, aP - 9, bP + 9 + 0, sub === 0);
    punto("a", A, "A", sub > 0 || (sub === 0 && fin), -14, 20);
    punto("b", B, "B", sub > 0 || (sub === 0 && fin), 6, 20);
    if (sub >= 1) arco("c1", A, r1, -th - 10, th + 10, sub === 1, AUX);
    if (sub >= 2) arco("c2", B, r1, 180 - th - 10, 180 + th + 10, sub === 2, AUX);
    punto("m", M, "M", sub > 2 || (sub === 2 && fin), 8, -4);
    punto("n", N, "N", sub > 2 || (sub === 2 && fin), 8, 16);
    if (sub >= 3) {
      nodos.push(<ReglaTrazando key="l" a={M} b={N} p={p} ext={76} color={VERDE} />);
      if (fin) nodos.push(<Txt key="np" p={[P[0] + 16, 150]} color={VERDE} size={14}>perpendicular a t por P</Txt>);
    }
  } else if (caso === 1) {
    titulo = "Perpendicular a r por un punto P de ella";
    const P: Pt = [330, 230];
    const r0 = 110;
    const A: Pt = [P[0] - r0, P[1]];
    const B: Pt = [P[0] + r0, P[1]];
    const r1 = 135;
    const h2 = Math.sqrt(r1 * r1 - r0 * r0);
    const M: Pt = [P[0], P[1] - h2];
    const N: Pt = [P[0], P[1] + h2];
    const th = (Math.atan2(h2, r0) * 180) / Math.PI;
    nodos.push(<Seg key="r" a={[90, P[1]]} b={[570, P[1]]} w={1.8} />, <Txt key="tr" p={[548, P[1] - 10]}>r</Txt>, <Marca key="p" p={P} />, <Txt key="tp" p={[P[0] + 8, P[1] + 20]}>P</Txt>);
    arco("c0", P, r0, 0, 180, sub === 0);
    punto("a", A, "A", sub > 0 || (sub === 0 && fin), -14, 20);
    punto("b", B, "B", sub > 0 || (sub === 0 && fin), 6, 20);
    if (sub >= 1) arco("c1", A, r1, -th - 10, th + 10, sub === 1, AUX);
    if (sub >= 2) arco("c2", B, r1, 180 - th - 10, 180 + th + 10, sub === 2, AUX);
    punto("m", M, "M", sub > 2 || (sub === 2 && fin), 8, -4);
    punto("n", N, "N", sub > 2 || (sub === 2 && fin), 8, 16);
    if (sub >= 3) {
      nodos.push(<ReglaTrazando key="l" a={M} b={N} p={p} ext={30} color={VERDE} />);
      if (fin) nodos.push(<Txt key="np" p={[P[0] + 16, 120]} color={VERDE} size={14}>perpendicular a r en P</Txt>);
    }
  } else {
    titulo = "Perpendicular a una semirrecta en su extremo O";
    const O: Pt = [380, 270];
    const R = 130;
    const N: Pt = [O[0] - R, O[1]];
    const M = enCirculo(O, R, 120);
    const L = enCirculo(O, R, 60);
    const r1 = 100;
    const K = puntoMedio(M, L);
    const h2 = Math.sqrt(r1 * r1 - (R / 2) ** 2);
    const arriba: Pt = [K[0], K[1] - h2];
    const abajo: Pt = [K[0], K[1] + h2];
    const th = (Math.atan2(h2, R / 2) * 180) / Math.PI;
    nodos.push(<Seg key="t" a={[70, O[1]]} b={O} w={2.2} />, <Txt key="tt" p={[96, O[1] - 10]}>t</Txt>, <Marca key="o" p={O} />, <Txt key="to" p={[O[0] + 8, O[1] + 20]}>O</Txt>);
    arco("c0", O, R, 190, 55, sub === 0);
    punto("n", N, "N", sub > 0 || (sub === 0 && fin), -8, 20);
    if (sub >= 1) arco("c1", N, R, angDe(N, M) - 28, angDe(N, M) + 28, sub === 1, AUX);
    punto("m", M, "M", sub > 1 || (sub === 1 && fin), -18, -6);
    if (sub >= 2) arco("c2", M, R, -28, 28, sub === 2, AUX);
    punto("l", L, "L", sub > 2 || (sub === 2 && fin), 8, -6);
    if (sub === 3) {
      const t1 = tramo(p, 0.05, 0.47);
      const t2 = tramo(p, 0.53, 0.95);
      if (t1 > 0) nodos.push(<ArcoPlano key="c3" c={M} r={r1} a1={-th - 10} a2={-th - 10 + (2 * th + 20) * t1} color={AUX} />);
      if (t2 > 0) nodos.push(<ArcoPlano key="c4" c={L} r={r1} a1={180 - th - 10} a2={180 - th - 10 + (2 * th + 20) * t2} color={AUX} />);
      comp = p < 0.5 ? poseCompas(M, enCirculo(M, r1, lerp(-th - 10, th + 10, t1))) : poseCompas(L, enCirculo(L, r1, lerp(180 - th - 10, 180 + th + 10, t2)));
    }
    if (sub >= 4) {
      nodos.push(<ArcoPlano key="c3" c={M} r={r1} a1={-th - 10} a2={th + 10} color={AUX} />, <ArcoPlano key="c4" c={L} r={r1} a1={180 - th - 10} a2={180 + th + 10} color={AUX} />);
      nodos.push(<ReglaTrazando key="l" a={arriba} b={abajo} p={p} ext={50} color={VERDE} />);
      if (fin) nodos.push(<Txt key="np" p={[O[0] + 16, 120]} color={VERDE} size={14}>p ⟂ semirrecta en O</Txt>);
    }
  }
  return (
    <Hoja scene="perpendicular-compas" block={block} step={step} setStep={setStep} label="Hoja con perpendiculares trazadas con compás y regla" testId="bench-perp-compas">
      {nodos}
      <Txt p={[24, 34]} color={VERDE} size={15}>{titulo}</Txt>
      {comp ? (
        <g data-testid="bench-compas" pointerEvents="none">
          <Compas pose={(comp as ReturnType<typeof poseCompas>).pose} open={(comp as ReturnType<typeof poseCompas>).open} />
        </g>
      ) : null}
    </Hoja>
  );
}

export function ArcoBisecado({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const p = useProgreso(step, step === 1 || step === 4 ? 4000 : 1);
  const nodos: ReactNode[] = [];
  if (step <= 2) {
    const O: Pt = [250, 300];
    const R = 220;
    const A = enCirculo(O, R, 105);
    const B = enCirculo(O, R, 45);
    const C = enCirculo(O, R, 75);
    nodos.push(<ArcoPlano key="arc" c={O} r={R} a1={105} a2={45} color={INK} grosor={1.8} />, <Marca key="a" p={A} />, <Marca key="b" p={B} />, <Txt key="ta" p={[A[0] - 18, A[1] + 14]}>A</Txt>, <Txt key="tb" p={[B[0] + 8, B[1] + 4]}>B</Txt>);
    if (step >= 1) {
      nodos.push(<Seg key="ch" a={A} b={B} color={AMBAR} w={2} />);
      nodos.push(<MediatrizDibujada key="m" a={A} b={B} r={0.62 * dist(A, B)} p={step === 1 ? p : 1} ext={110} color={VERDE} />);
    }
    if (step >= 2) nodos.push(<Marca key="c" p={C} color={VERDE} r={4.5} />, <Txt key="tc" p={[C[0] + 8, C[1] - 6]} color={VERDE} size={15}>C</Txt>, <Txt key="n" p={[24, 330]} color={VERDE} size={14}>C divide el arco AB en dos partes iguales</Txt>);
    nodos.push(<Txt key="tt" p={[24, 34]} color={VERDE} size={15}>División de un arco en dos partes iguales</Txt>);
  } else {
    const O: Pt = [330, 330];
    const R = 240;
    const A = enCirculo(O, R, 150);
    const B = enCirculo(O, R, 118);
    const C = enCirculo(O, R, 78);
    nodos.push(<Marca key="a" p={A} />, <Marca key="b" p={B} />, <Marca key="c" p={C} />, <Txt key="ta" p={[A[0] - 12, A[1] + 18]}>A</Txt>, <Txt key="tb" p={[B[0] - 16, B[1] - 6]}>B</Txt>, <Txt key="tc" p={[C[0] + 6, C[1] - 6]}>C</Txt>);
    nodos.push(<Seg key="ab" a={A} b={B} color={AMBAR} w={1.6} />, <Seg key="bc" a={B} b={C} color={AMBAR} w={1.6} />);
    if (step >= 4) {
      const hacia = (key: string, a: Pt, b: Pt, r: number) => {
        const m = puntoMedio(a, b);
        const d = dist(m, O);
        const u: Pt = [(O[0] - m[0]) / d, (O[1] - m[1]) / d];
        const ini: Pt = [m[0] - u[0] * 40, m[1] - u[1] * 40];
        const fin: Pt = [O[0] + u[0] * 45, O[1] + u[1] * 45];
        const t = step === 4 ? p : 1;
        nodos.push(<MediatrizDibujada key={`${key}a`} a={a} b={b} r={r} p={0} arcos />, <Seg key={`${key}l`} a={ini} b={[ini[0] + (fin[0] - ini[0]) * t, ini[1] + (fin[1] - ini[1]) * t]} color={VERDE} w={2} />);
      };
      hacia("n", A, B, 0.7 * dist(A, B));
      hacia("m", B, C, 0.62 * dist(B, C));
    }
    if (step >= 5) nodos.push(<Marca key="o" p={O} color={VERDE} r={4.5} />, <Txt key="to" p={[O[0] + 8, O[1] + 18]} color={VERDE} size={15}>O</Txt>, <ArcoPlano key="arc" c={O} r={R} a1={160} a2={68} color={INK} grosor={1.8} />);
    nodos.push(<Txt key="tt" p={[24, 34]} color={VERDE} size={15}>Arco de circunferencia que pasa por tres puntos</Txt>);
  }
  return (
    <Hoja scene="arco-bisecado-tres-puntos" block={block} step={step} setStep={setStep} label="Hoja con la división de un arco y el arco por tres puntos" testId="bench-arco-tres">
      {nodos}
    </Hoja>
  );
}

export function DivisionDos({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const A: Pt = [90, 200];
  const B: Pt = [530, 200];
  const px = (k: number, n: number): number => A[0] + ((B[0] - A[0]) * k) / n;
  const niveles = step; // 0: segmento; 1: mitades; 2: cuartos; 3: octavos
  const nodos: ReactNode[] = [];
  nodos.push(<Seg key="ab" a={A} b={B} w={2} />, <Marca key="a" p={A} />, <Marca key="b" p={B} />, <Txt key="ta" p={[A[0] - 6, A[1] + 22]}>A</Txt>, <Txt key="tb" p={[B[0] - 4, B[1] + 22]}>B</Txt>);
  for (let n = 1; n <= niveles; n += 1) {
    const total = 2 ** n;
    const color = [AMBAR, AZUL, VERDE][n - 1];
    for (let k = 1; k < total; k += 2) {
      const x = px(k, total);
      const alto = [150, 120, 90][n - 1];
      nodos.push(<Seg key={`m${n}-${k}`} a={[x, 200 - alto]} b={[x, 200 + alto]} color={color} w={1.5} dash="6 4" />, <Marca key={`p${n}-${k}`} p={[x, 200]} color={color} r={3.6} />);
    }
  }
  const etiq = ["", "N: punto medio de AB (mitades)", "L y M: cuartos (mediatrices de AN y NB)", "octavos: de nuevo la mediatriz de cada trozo"][step];
  nodos.push(<Txt key="t" p={[24, 34]} color={VERDE} size={15}>División de un segmento en 2, 4, 8… partes iguales</Txt>);
  if (etiq) nodos.push(<Txt key="e" p={[24, 58]} color={INK} size={13}>{etiq}</Txt>);
  return (
    <Hoja scene="division-2n" block={block} step={step} setStep={setStep} label="Hoja con la división de un segmento en 2, 4 y 8 partes iguales con mediatrices" testId="bench-division-2n">
      {nodos}
    </Hoja>
  );
}

/** Geometría de las escenas, para los tests. */
export const ELEMENTOS_GEOM = { DM, DN, SA, SB, SC, N0 };
