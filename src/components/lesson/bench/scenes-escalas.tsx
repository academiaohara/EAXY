"use client";

import { type ReactNode } from "react";
import { type Pt } from "./geometry";
import { BenchDefs, Desk } from "./instruments";
import { AMBAR, AZUL, BenchShell, INK, SVG_CLASS, VERDE, usePaso, type BenchBlock, type BenchSceneName } from "./scenes";
import { MSHEET, MV, lerpP, tramo, useProgreso } from "./scenes-compas";
import { Seg, Txt } from "./scenes-proporcion";

const AUX = "#6b7480";

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

const Titulo = ({ children, sub }: { children: string; sub?: string }) => (
  <>
    <Txt p={[24, 34]} color={VERDE} size={15}>{children}</Txt>
    {sub ? <Txt p={[24, 56]} color={INK} size={13}>{sub}</Txt> : null}
  </>
);

/** Segmento que se va trazando de `a` a `b` según `t` (0–1). */
const Trazo = ({ a, b, t, color = INK, w = 1.5, dash }: { a: Pt; b: Pt; t: number; color?: string; w?: number; dash?: string }) =>
  t > 0 ? <Seg a={a} b={lerpP(a, b, t)} color={color} w={w} dash={dash} /> : null;

/* ───────────── 1. Proporcionalidad y concepto de escala ───────────── */

export function EscalaConcepto({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const p = useProgreso(step, step === 2 ? 4200 : 1);
  const x0 = 70;
  const yReal = 140;
  const yDib = 270;
  const LR = 480; // 1400 mm
  const LD = LR / 20; // 70 mm
  const nodos: ReactNode[] = [];
  const dim = (y: number, largo: number, texto: string, color: string, key: string) => (
    <g key={key}>
      <Seg a={[x0, y]} b={[x0 + largo, y]} color={color} w={3} />
      <Seg a={[x0, y - 9]} b={[x0, y + 9]} color={color} w={1.6} />
      <Seg a={[x0 + largo, y - 9]} b={[x0 + largo, y + 9]} color={color} w={1.6} />
      <Txt p={[x0 + largo / 2 - 30, y - 14]} color={color} size={15}>{texto}</Txt>
    </g>
  );
  nodos.push(<rect key="rr" x={x0} y={yReal + 24} width={LR} height={36} rx="3" fill="rgba(31,120,180,0.10)" stroke={AZUL} strokeWidth="1.4" />, <rect key="rd" x={x0} y={yDib + 24} width={LD} height={36 / 20 * 4} rx="1" fill="rgba(224,168,0,0.18)" stroke={AMBAR} strokeWidth="1.4" />);
  nodos.push(dim(yReal, LR, "realidad: 1 400 mm", AZUL, "dr"), dim(yDib, LD, "dibujo: 70 mm", AMBAR, "dd"));
  nodos.push(<Txt key="lr" p={[x0, yReal + 84]} color={AZUL} size={13}>cuerpo real</Txt>, <Txt key="ld" p={[x0 + LD + 12, yDib + 44]} color={AMBAR} size={13}>su dibujo en el papel</Txt>);
  if (step === 1) {
    nodos.push(<rect key="f" x={236} y={204} width={330} height={50} rx="10" fill="rgba(255,252,240,0.96)" stroke={VERDE} strokeWidth="1.6" />);
    nodos.push(<Txt key="e1" p={[248, 224]} color={INK} size={13}>escala = medidas del dibujo / medidas reales</Txt>, <Txt key="e2" p={[248, 244]} color={VERDE} size={15}>E = 70 / 1 400 = 1 / 20</Txt>);
  }
  if (step === 2) {
    const n = Math.round(20 * tramo(p, 0, 0.8));
    for (let i = 0; i < n; i += 1) nodos.push(<Seg key={`d${i}`} a={[x0 + (i * LR) / 20, yReal + 24]} b={[x0 + (i * LR) / 20, yReal + 60]} color={i === 0 ? AMBAR : AUX} w={i === 0 ? 2.4 : 1} />);
    nodos.push(<rect key="r1" x={x0} y={yReal + 24} width={LR / 20} height={36} fill="rgba(224,168,0,0.30)" />);
    if (p > 0.85) nodos.push(<Txt key="fin" p={[x0 + 40, 100]} color={VERDE} size={16}>el dibujo cabe 20 veces en la realidad: «1 es a 20»</Txt>);
  }
  return (
    <Hoja scene="escala-concepto" block={block} step={step} setStep={setStep} label="Hoja con la medida real de un cuerpo y la de su dibujo" testId="bench-escala-concepto">
      {nodos}
      <Titulo>Escala: razón entre el dibujo y la realidad</Titulo>
    </Hoja>
  );
}

/* ───────────── 2. Clases de escalas ───────────── */

const VALORES_RED = ["1:2", "1:5", "1:10", "1:20", "1:50", "1:100", "1:200", "1:500"];
const VALORES_AMP = ["2:1", "5:1", "10:1"];

export function EscalaClases({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const W = 120;
  const H = 72;
  const k = [0.5, 1, 2][step];
  const c: Pt = [310, 175];
  const w = W * k;
  const h = H * k;
  const titulos = ["Escala de reducción", "Escala natural", "Escala de ampliación"];
  const colores = [AZUL, VERDE, AMBAR];
  const nodos: ReactNode[] = [];
  nodos.push(<rect key="real" x={c[0] - W / 2} y={c[1] - H / 2} width={W} height={H} fill="none" stroke={AUX} strokeWidth="1.2" strokeDasharray="6 4" />, <Txt key="treal" p={[c[0] - W / 2, c[1] - H / 2 - 8]} color={AUX} size={12}>tamaño real</Txt>);
  nodos.push(<rect key="dib" x={c[0] - w / 2} y={c[1] - h / 2} width={w} height={h} rx="4" fill={`${colores[step]}22`} stroke={colores[step]} strokeWidth="2" />);
  nodos.push(<circle key="ag" cx={c[0] + w * 0.22} cy={c[1]} r={h * 0.22} fill="none" stroke={colores[step]} strokeWidth="1.6" />);
  nodos.push(<Txt key="e" p={[c[0] - 30, 270]} color={colores[step]} size={18}>{["E = 1 : 2", "E = 1 : 1", "E = 2 : 1"][step]}</Txt>);
  nodos.push(<Txt key="t" p={[c[0] - 120, 292]} color={INK} size={13}>{["el dibujo es menor que la pieza (E < 1)", "el dibujo es igual que la pieza (E = 1)", "el dibujo es mayor que la pieza (E > 1)"][step]}</Txt>);
  const chip = (txt: string, x: number, y: number, on: boolean, color: string, key: string) => (
    <g key={key}>
      <rect x={x} y={y} width={46} height={24} rx="6" fill={on ? color : "rgba(0,0,0,0.04)"} stroke={on ? color : AUX} strokeWidth="1" />
      <text x={x + 23} y={y + 16} fontSize="12" fontWeight="700" textAnchor="middle" fill={on ? "#fff" : INK} fontFamily="system-ui, sans-serif">{txt}</text>
    </g>
  );
  VALORES_RED.forEach((v, i) => nodos.push(chip(v, 40 + i * 54, 310, step === 0, AZUL, `r${i}`)));
  nodos.push(chip("1:1", 40, 342, step === 1, VERDE, "n"));
  VALORES_AMP.forEach((v, i) => nodos.push(chip(v, 100 + i * 54, 342, step === 2, AMBAR, `a${i}`)));
  return (
    <Hoja scene="escala-clases" block={block} step={step} setStep={setStep} label="Hoja con el mismo cuerpo dibujado a escala de reducción, natural y de ampliación" testId="bench-escala-clases">
      {nodos}
      <Titulo sub="el cuerpo real es la pieza de trazos">{titulos[step]}</Titulo>
    </Hoja>
  );
}

/* ───────────── 3. Escala gráfica y contraescala ───────────── */

type CfgGrafica = { unitPx: number; unidad: string; sub: string; papel: string; real: string; lectura: { unidades: number; subs: number; texto: string } };
const GRAF: CfgGrafica[] = [
  { unitPx: 110, unidad: "dm", sub: "cm", papel: "5 cm", real: "1 dm", lectura: { unidades: 1, subs: 3, texto: "1 dm + 3 cm = 13 cm" } },
  { unitPx: 88, unidad: "Dm", sub: "m", papel: "4 cm", real: "1 Dm", lectura: { unidades: 1, subs: 7, texto: "1 Dm + 7 m = 17 m" } },
];

/** Escala gráfica con su contraescala: `unidades` divisiones principales a la derecha del cero y la contraescala a la izquierda. */
function Grafica({ cfg, x0, y, unidades, tUni, tContra }: { cfg: CfgGrafica; x0: number; y: number; unidades: number; tUni: number; tContra: number }) {
  const u = cfg.unitPx;
  const nodos: ReactNode[] = [];
  if (tUni > 0) {
    nodos.push(<Trazo key="base" a={[x0, y]} b={[x0 + unidades * u, y]} t={tUni} w={2.4} />);
    for (let i = 0; i <= unidades; i += 1) {
      if (i / unidades > tUni + 1e-6) break;
      nodos.push(<Seg key={`u${i}`} a={[x0 + i * u, y - 12]} b={[x0 + i * u, y + 4]} w={1.8} />, <Txt key={`ut${i}`} p={[x0 + i * u - 8, y + 26]} size={13}>{i === 0 ? "0" : `${i} ${cfg.unidad}`}</Txt>);
    }
  }
  if (tContra > 0) {
    nodos.push(<Trazo key="cbase" a={[x0, y]} b={[x0 - u, y]} t={tContra} w={2.4} color={VERDE} />);
    for (let i = 0; i <= 10; i += 1) {
      if (i / 10 > tContra + 1e-6) break;
      const x = x0 - (i * u) / 10;
      nodos.push(<Seg key={`c${i}`} a={[x, y - (i % 5 === 0 ? 12 : 8)]} b={[x, y + 2]} color={VERDE} w={1.4} />);
      if (i % 2 === 0 || i === 10) nodos.push(<Txt key={`ct${i}`} p={[x - 5, y - 18]} color={VERDE} size={11}>{String(i)}</Txt>);
    }
    if (tContra > 0.95) nodos.push(<Txt key="lc" p={[x0 - u + 6, y + 40]} color={VERDE} size={13}>contraescala</Txt>);
  }
  return <g>{nodos}</g>;
}

export function EscalaGrafica({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const ej = step < 4 ? 0 : 1;
  const cfg = GRAF[ej];
  const sub = ej === 0 ? step : step - 4;
  const p = useProgreso(step, sub === 1 || sub === 2 ? 3200 : sub === 3 ? 1800 : sub === 0 ? 1500 : 1);
  const y = 210;
  const x0 = 220;
  const u = cfg.unitPx;
  const nodos: ReactNode[] = [];
  if (sub === 0) {
    nodos.push(<Seg key="b1" a={[x0, y - 60]} b={[x0 + u * tramo(p, 0, 0.7), y - 60]} w={3} color={AMBAR} />);
    nodos.push(<Seg key="e1" a={[x0, y - 70]} b={[x0, y - 50]} color={AMBAR} w={1.6} />);
    if (p > 0.7) nodos.push(<Seg key="e2" a={[x0 + u, y - 70]} b={[x0 + u, y - 50]} color={AMBAR} w={1.6} />, <Txt key="t1" p={[x0 + u / 2 - 24, y - 78]} color={AMBAR} size={14}>{`${cfg.papel} en el papel`}</Txt>);
    if (p > 0.9) nodos.push(<Txt key="t2" p={[x0 - 40, y]} color={VERDE} size={16}>{`representan ${cfg.real} en la realidad`}</Txt>);
  } else {
    nodos.push(<Grafica key="g" cfg={cfg} x0={x0} y={y} unidades={2} tUni={sub === 1 ? tramo(p, 0, 0.9) : 1} tContra={sub === 1 ? 0 : sub === 2 ? tramo(p, 0, 0.9) : 1} />);
  }
  if (sub === 3) {
    const x1 = x0 - (cfg.lectura.subs * u) / 10;
    const x2 = x0 + cfg.lectura.unidades * u;
    nodos.push(<Seg key="l1" a={[x1, y - 34]} b={[x2, y - 34]} color={AMBAR} w={3.4} />, <Seg key="l2" a={[x1, y - 40]} b={[x1, y - 28]} color={AMBAR} w={1.6} />, <Seg key="l3" a={[x2, y - 40]} b={[x2, y - 28]} color={AMBAR} w={1.6} />, <Txt key="lt" p={[(x1 + x2) / 2 - 56, y - 46]} color={AMBAR} size={16}>{cfg.lectura.texto}</Txt>);
  }
  const titulo = ej === 0 ? "Escala gráfica de E 1:2" : "Escala gráfica de E 1:250";
  const nota = sub === 0 ? (ej === 0 ? "1:2 → 1 dm real son 0,5 dm en el dibujo: 5 cm" : "1:250 → 1 Dm real son 0,004 Dm: 4 cm") : sub === 1 ? "se lleva la unidad sobre una recta y se repite" : sub === 2 ? `la contraescala, a la izquierda del cero, se divide en 10 partes: cada una vale 1 ${cfg.sub}` : "se lee con las unidades a la derecha del cero y las partes de la contraescala";
  return (
    <Hoja scene="escala-grafica" block={block} step={step} setStep={setStep} label="Hoja con la construcción de una escala gráfica y su contraescala" testId="bench-escala-grafica">
      {nodos}
      <Titulo sub={nota}>{titulo}</Titulo>
    </Hoja>
  );
}

/* ───────────── 4. Triángulo universal de escalas ───────────── */

const TU = { apex: [310, 62] as Pt, alto: 24, ancho: 30 };
const filaY = (k: number) => TU.apex[1] + k * TU.alto;
const filaX = (k: number, i: number): Pt => [TU.apex[0] + (i - 5) * (TU.ancho * k) / 10, filaY(k)];
const ETIQ = ["E 1:10", "E 2:10=1:5", "E 3:10", "E 4:10=2:5", "E 5:10=1:2", "E 6:10=3:5", "E 7:10", "E 8:10=4:5", "E 9:10", "E 1:1 natural", "E 11:10", "E 12:10=6:5"];

export function TrianguloUniversal({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const p = useProgreso(step, step === 0 ? 2200 : step === 3 ? 4200 : step === 4 ? 2200 : 1);
  const nodos: ReactNode[] = [];
  const A = TU.apex;
  const L = filaX(10, 0);
  const R = filaX(10, 10);
  // 0: el triángulo; sus lados se prolongan para las ampliaciones desde el paso 4
  nodos.push(<Trazo key="l1" a={A} b={L} t={tramo(p, 0, 0.5)} w={2} />, <Trazo key="l2" a={A} b={R} t={tramo(p, 0.3, 0.8)} w={2} />, <Trazo key="l3" a={L} b={R} t={tramo(p, 0.6, 1)} w={2.4} color={VERDE} />);
  if (step >= 1) {
    for (let i = 0; i <= 10; i += 1) nodos.push(<circle key={`b${i}`} cx={L[0] + i * TU.ancho} cy={L[1]} r={2.6} fill={VERDE} />, <Txt key={`bt${i}`} p={[L[0] + i * TU.ancho - 4, L[1] + 16]} size={11} color={VERDE}>{String(i)}</Txt>);
    for (let k = 1; k <= 9; k += 1) nodos.push(<circle key={`s${k}`} cx={filaX(k, 0)[0]} cy={filaY(k)} r={2} fill={AZUL} />, <Txt key={`st${k}`} p={[filaX(k, 0)[0] - 18, filaY(k) + 4]} size={10} color={AZUL}>{String(k)}</Txt>);
  }
  if (step >= 2) for (let i = 1; i <= 9; i += 1) nodos.push(<Seg key={`r${i}`} a={A} b={step >= 4 ? filaX(12, i) : filaX(10, i)} color={AUX} w={0.9} />);
  if (step >= 3) {
    const filas = step === 3 ? Math.floor(9 * tramo(p, 0, 0.9)) : 9;
    for (let k = 1; k <= filas; k += 1) {
      nodos.push(<Seg key={`h${k}`} a={filaX(k, 0)} b={filaX(k, 10)} color={AUX} w={0.8} />, <Txt key={`e${k}`} p={[filaX(k, 10)[0] + 12, filaY(k) + 4]} size={10} color={INK}>{ETIQ[k - 1]}</Txt>);
    }
    nodos.push(<Txt key="e10" p={[R[0] + 12, R[1] + 4]} size={10} color={VERDE}>{ETIQ[9]}</Txt>);
  }
  if (step >= 4) {
    const t = step === 4 ? tramo(p, 0, 0.9) : 1;
    nodos.push(<Trazo key="x1" a={L} b={filaX(12, 0)} t={t} w={2} />, <Trazo key="x2" a={R} b={filaX(12, 10)} t={t} w={2} />);
    [11, 12].forEach((k, j) => {
      const tt = tramo(t, j * 0.45, 0.55 + j * 0.45);
      nodos.push(<Trazo key={`h${k}`} a={filaX(k, 0)} b={filaX(k, 10)} t={tt} color={AMBAR} w={1.2} />);
      if (tt > 0.9) nodos.push(<Txt key={`e${k}`} p={[filaX(k, 10)[0] + 12, filaY(k) + 4]} size={10} color={AMBAR}>{ETIQ[k - 1]}</Txt>);
    });
  }
  if (step === 5) {
    nodos.push(<Seg key="m" a={filaX(5, 0)} b={filaX(5, 8)} color={AMBAR} w={4} />, <Seg key="m0" a={filaX(5, 0)} b={filaX(10, 0)} color={AMBAR} w={1} dash="4 3" />);
    nodos.push(<Seg key="n" a={filaX(10, 0)} b={filaX(10, 8)} color={VERDE} w={4} />);
    nodos.push(<Txt key="tn" p={[40, 336]} size={13} color={VERDE}>real: 8 cm (fila 10, 1:1)</Txt>, <Txt key="tm" p={[40, 190]} size={13} color={AMBAR}>{"dibujo: 4 cm (fila 5, 1:2)"}</Txt>);
  }
  return (
    <Hoja scene="triangulo-universal-escalas" block={block} step={step} setStep={setStep} label="Hoja con el triángulo universal de escalas" testId="bench-triangulo-universal">
      {nodos}
      <Titulo>Triángulo universal de escalas</Titulo>
    </Hoja>
  );
}

/* ───────────── 5. Escala decimal de transversales ───────────── */

const ET = { x0: 250, u: 110, yB: 310, fila: 20 };
const etX = (div: number) => ET.x0 - (div * ET.u) / 10; // división de la contraescala (0 en el cero, 10 a la izquierda)
const etY = (j: number) => ET.yB - j * ET.fila;

export function EscalaTransversales({ block }: { block: BenchBlock }) {
  const [step, setStep] = usePaso();
  const p = useProgreso(step, step === 1 ? 3000 : step === 2 ? 4200 : step === 3 || step === 4 ? 2400 : 1);
  const nodos: ReactNode[] = [];
  const { x0, u } = ET;
  // base: escala gráfica con contraescala y dos unidades a la derecha
  nodos.push(<Seg key="base" a={[x0 - u, ET.yB]} b={[x0 + 2 * u, ET.yB]} w={2.2} />);
  for (let i = 0; i <= 10; i += 1) nodos.push(<Seg key={`c${i}`} a={[etX(i), ET.yB]} b={[etX(i), ET.yB + 6]} color={VERDE} w={1.2} />, <Txt key={`ct${i}`} p={[etX(i) - 4, ET.yB + 20]} size={10} color={VERDE}>{i % 2 === 0 ? String(i) : ""}</Txt>);
  nodos.push(<Seg key="u1" a={[x0 + u, ET.yB]} b={[x0 + u, ET.yB + 6]} w={1.6} />, <Txt key="tu1" p={[x0 + u - 10, ET.yB + 22]} size={12}>1 Dm</Txt>, <Seg key="u2" a={[x0 + 2 * u, ET.yB]} b={[x0 + 2 * u, ET.yB + 6]} w={1.6} />, <Txt key="tu2" p={[x0 + 2 * u - 10, ET.yB + 22]} size={12}>2 Dm</Txt>);
  if (step >= 1) {
    const t = step === 1 ? tramo(p, 0, 0.9) : 1;
    for (let i = 0; i <= 10; i += 1) nodos.push(<Trazo key={`v${i}`} a={[etX(i), ET.yB]} b={[etX(i), etY(10)]} t={t} w={0.9} color={AUX} />);
    for (let j = 1; j <= 10; j += 1) nodos.push(<Trazo key={`f${j}`} a={[etX(10), etY(j)]} b={[x0 + 2 * u, etY(j)]} t={t} w={0.7} color={AUX} dash={j === 10 ? undefined : "3 3"} />);
    nodos.push(<Txt key="th" p={[etX(10) - 28, etY(5)]} size={13} color={AZUL}>h</Txt>);
    for (let j = 0; j <= 10; j += 2) nodos.push(<Txt key={`fj${j}`} p={[etX(10) - 16, etY(j) + 4]} size={10} color={AZUL}>{String(j)}</Txt>);
  }
  if (step >= 2) {
    const t = step === 2 ? tramo(p, 0, 0.9) : 1;
    for (let n = 0; n < 10; n += 1) nodos.push(<Trazo key={`tr${n}`} a={[etX(n), ET.yB]} b={[etX(n + 1), etY(10)]} t={tramo(t, n * 0.06, 0.4 + n * 0.06)} w={1.4} color={INK} />);
  }
  // lecturas: 1,64 Dm (división 6, fila 4) y 2,38 Dm (división 3, fila 8)
  const lectura = (n: number, j: number, unidades: number, texto: string, color: string, key: string, t: number) => {
    const x = etX(n + j / 10);
    const xr = x0 + unidades * u;
    return (
      <g key={key}>
        <Trazo a={[xr, etY(j)]} b={[x, etY(j)]} t={t} color={color} w={3.2} />
        <circle cx={x} cy={etY(j)} r={4} fill={color} opacity={t > 0.9 ? 1 : 0} />
        {t > 0.9 ? <Txt p={[xr - 112, etY(j) - 8]} color={color} size={13}>{texto}</Txt> : null}
      </g>
    );
  };
  if (step === 3) nodos.push(lectura(6, 4, 1, "1,64 Dm = 16,4 m", AMBAR, "l1", tramo(p, 0, 0.9)));
  if (step === 4) {
    nodos.push(lectura(6, 4, 1, "1,64 Dm", AUX, "l1", 1), lectura(3, 8, 2, "2,38 Dm = 23,8 m", VERDE, "l2", tramo(p, 0, 0.9)));
  }
  return (
    <Hoja scene="escala-transversales" block={block} step={step} setStep={setStep} label="Hoja con la escala decimal de transversales" testId="bench-escala-transversales">
      {nodos}
      <Titulo sub="E 1:250: 1 Dm = 4 cm, contraescala en 10 partes">Escala decimal de transversales</Titulo>
    </Hoja>
  );
}
