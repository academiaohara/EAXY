"use client";

import { useState } from "react";
import { dist, enCirculo, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, poseCompas } from "./instruments";
import { AMBAR, AZUL, BenchShell, INK, SANS, SVG_CLASS, VERDE, type BenchBlock } from "./scenes";
import { ArcoAnim, MSHEET, MV, Practica, ReglaTrazando, SNAP, animParaleloEscuadra, animPuntoMedio, lerp, lerpP, tramo, useProgreso, type Def, type Est } from "./scenes-compas";
import { ArcoPlano, Punto } from "./scenes-trazados";

export const etiqueta = { stroke: "#fffefa", strokeWidth: 3.5, paintOrder: "stroke" as const, strokeLinejoin: "round" as const };
export const Seg = ({ a, b, color = INK, w = 1.4, dash }: { a: Pt; b: Pt; color?: string; w?: number; dash?: string }) => (
  <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" />
);
export const Txt = ({ p, children, color = INK, size = 13 }: { p: Pt; children: string; color?: string; size?: number }) => (
  <text x={p[0]} y={p[1]} fontSize={size} fontWeight="700" fill={color} fontFamily={SANS} {...etiqueta}>
    {children}
  </text>
);
const suma = (p: Pt, d: Pt, k: number): Pt => [p[0] + d[0] * k, p[1] + d[1] * k];

/* ───────────── Thales: dividir un segmento en partes iguales ───────────── */

const TA: Pt = [110, 300];
const TB: Pt = [470, 300];
const TH = 35;
const TD: Pt = [Math.cos((TH * Math.PI) / 180), -Math.sin((TH * Math.PI) / 180)];
const R0 = 70;
const marca = (k: number, r = R0): Pt => suma(TA, TD, k * r);
const TP: Pt = [TA[0] + (TB[0] - TA[0]) / 3, 300];
const TQ: Pt = [TA[0] + (2 * (TB[0] - TA[0])) / 3, 300];

function PapelThales({ marcas = 0, r = R0, rayo = 1, union = 0, paralelas = 0, partes = 0 }: { marcas?: number; r?: number; rayo?: number; union?: number; paralelas?: number; partes?: number }) {
  const fin = suma(TA, TD, 3.6 * R0 * rayo);
  return (
    <g>
      <Seg a={TA} b={TB} w={1.6} />
      <Punto p={TA} nombre="A" dx={-16} dy={18} />
      <Punto p={TB} nombre="B" dx={8} dy={18} />
      {rayo > 0 ? <Seg a={TA} b={fin} /> : null}
      {Array.from({ length: marcas }, (_, i) => (
        <g key={i}>
          <circle cx={marca(i + 1, r)[0]} cy={marca(i + 1, r)[1]} r="3" fill={INK} />
          <Txt p={[marca(i + 1, r)[0] - 16, marca(i + 1, r)[1] - 6]}>{String(i + 1)}</Txt>
        </g>
      ))}
      {union > 0 ? <Seg a={marca(3, r)} b={lerpP(marca(3, r), TB, union)} color={VERDE} w={1.8} /> : null}
      {paralelas > 0 ? (
        <g data-testid="bench-paralelas-thales">
          <Seg a={marca(2, r)} b={lerpP(marca(2, r), TQ, tramo(paralelas, 0, 0.5))} color={AZUL} w={1.6} dash="7 5" />
          <Seg a={marca(1, r)} b={lerpP(marca(1, r), TP, tramo(paralelas, 0.5, 1))} color={AZUL} w={1.6} dash="7 5" />
          <g opacity={tramo(paralelas, 0.9, 1)}>
            <Punto p={TP} nombre="P" dx={-4} dy={20} color={AZUL} />
            <Punto p={TQ} nombre="Q" dx={-4} dy={20} color={AZUL} />
          </g>
        </g>
      ) : null}
      {partes > 0 ? (
        <g data-testid="bench-tercios" opacity={partes}>
          <Seg a={[TA[0], 322]} b={[TP[0], 322]} color={AMBAR} w={4} />
          <Seg a={[TP[0], 322]} b={[TQ[0], 322]} color={VERDE} w={4} />
          <Seg a={[TQ[0], 322]} b={[TB[0], 322]} color={AZUL} w={4} />
          <Txt p={[(TA[0] + TP[0]) / 2 - 16, 346]} color={AMBAR}>AP</Txt>
          <Txt p={[(TP[0] + TQ[0]) / 2 - 16, 346]} color={VERDE}>PQ</Txt>
          <Txt p={[(TQ[0] + TB[0]) / 2 - 16, 346]} color={AZUL}>QB</Txt>
        </g>
      ) : null}
    </g>
  );
}

export function ThalesDividir({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 0 ? 1600 : step <= 3 ? 2400 : step === 4 ? 2600 : step === 5 ? 10000 : 1800);
  const S = 22;
  const a = TH;
  // paso 5: las paralelas a la recta 3B por las marcas 2 y 1 se trazan con escuadra y cartabón
  const par2 = animParaleloEscuadra(marca(3), TB, marca(2), [marca(2), TQ], step === 5 ? tramo(p, 0, 0.5) : 1);
  const par1 = animParaleloEscuadra(marca(3), TB, marca(1), [marca(1), TP], step === 5 ? tramo(p, 0.5, 1) : 1);
  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step >= 1 && step <= 3) {
    const c = marca(step - 1);
    comp = poseCompas(c, enCirculo(c, R0, lerp(a - S, a + S, p)));
  }
  return (
    <BenchShell scene="thales-dividir" notes={block.notes} step={step} setStep={setStep} label="Hoja con un segmento AB que se divide en tres partes iguales con el teorema de Thales">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con un segmento AB que se divide en tres partes iguales con el teorema de Thales" data-testid="bench-thales">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelThales rayo={step === 0 ? p : 1} marcas={step >= 4 ? 3 : step >= 1 ? step - 1 + (p > 0.9 ? 1 : 0) : 0} union={step === 4 ? p : step > 4 ? 1 : 0} paralelas={0} partes={step === 6 ? p : 0} />
        {[1, 2, 3].map((k) =>
          step >= k ? (
            <g key={k} data-testid={`bench-arco-${k}`}>
              <ArcoAnim c={marca(k - 1)} r={R0} a1={a - S} a2={a + S} t={step === k ? p : 1} />
            </g>
          ) : null,
        )}
        {step === 4 ? <ReglaTrazando a={marca(3)} b={TB} p={p} ext={0} color={VERDE} /> : null}
        {step >= 5 ? (
          <g data-testid="bench-paralelas-thales">
            {par2.nodos}
            {par1.nodos}
            {step > 5 || par1.listo ? (
              <>
                <Punto p={TP} nombre="P" dx={-4} dy={20} color={AZUL} />
                <Punto p={TQ} nombre="Q" dx={-4} dy={20} color={AZUL} />
              </>
            ) : null}
          </g>
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

/* ───────────── Thales: práctica (marcas iguales y unión con B) ───────────── */

const defThales: Def = {
  scene: "thales-practica",
  fases: ["centro", "abertura", "arco", "centro", "arco", "centro", "arco", "regla"],
  nClics: 2,
  papel: (est: Est) => {
    const r = est.radios[0] ?? R0;
    const k = est.fase >= 7 ? 3 : est.fase >= 5 ? 2 : est.fase >= 3 ? 1 : 0;
    return <PapelThales marcas={k} r={r} />;
  },
  candidatos: (est, idx) => (idx === 0 ? [TA] : [marca(idx, est.radios[0] ?? R0)]),
  radioLim: () => [40, 100],
  radioIni: () => R0,
  rhoIni: () => -22,
  arco: (_est, _n, _radio, c) => ({ centro: c, base: TH, signo: 1, rhoMin: -35, rhoMax: 35, req: [-6, 6] }),
  cortes: (est) => [marca(3, est.radios[0] ?? R0), TB],
  evaluar: (est) => {
    const r = est.radios[0] ?? R0;
    const m3 = marca(3, r);
    const [p1, p2] = est.clics;
    if (!p1 || !p2) return { ok: false, mensaje: "Faltan los dos puntos por los que pasa la regla." };
    const bien = (dist(p1, m3) <= SNAP + 2 && dist(p2, TB) <= SNAP + 2) || (dist(p1, TB) <= SNAP + 2 && dist(p2, m3) <= SNAP + 2);
    return bien
      ? { ok: true, mensaje: "Correcto: has llevado tres veces la misma abertura sobre la semirrecta y has unido la última marca con B. Esa recta es la que hay que trasladar con paralelas." }
      : { ok: false, mensaje: "La regla debe pasar por la tercera marca y por B. Pulsa «Reintentar»." };
  },
};

export function ThalesPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defThales} vista={{ ...MV, sheet: MSHEET }} />;
}

/* ───────────── Thales: las paralelas dividen AB en tres partes ───────────── */

const defThalesParalelas: Def = {
  scene: "thales-paralelas",
  fases: ["regla"],
  nClics: 2,
  sinRegla: true,
  papel: (est: Est) => (
    <g>
      <PapelThales marcas={3} union={1} paralelas={est.fase >= 1 ? 1 : 0} partes={0} />
    </g>
  ),
  candidatos: () => [],
  radioLim: () => [40, 100],
  radioIni: () => R0,
  rhoIni: () => 0,
  arco: (_e, _n, _r, c) => ({ centro: c, base: 0, signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
  cortes: () => [TP, TQ],
  evaluar: (est) => {
    const [p1, p2] = est.clics;
    if (!p1 || !p2) return { ok: false, mensaje: "Faltan los dos puntos de AB." };
    const tol = 24;
    const bien = (dist(p1, TP) <= tol && dist(p2, TQ) <= tol) || (dist(p1, TQ) <= tol && dist(p2, TP) <= tol);
    return bien
      ? { ok: true, mensaje: "Correcto: las paralelas a la recta que une la tercera marca con B conservan la razón, así que cortan a AB en P y Q y lo dividen en tres partes iguales: AP = PQ = QB." }
      : { ok: false, mensaje: "Cada paralela corta a AB en un tercio del segmento (la primera, a un tercio de A y la segunda, a dos tercios). Pulsa «Reintentar»." };
  },
};

export function ThalesParalelas({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defThalesParalelas} vista={{ ...MV, sheet: MSHEET }} />;
}


/* ───────────── Media proporcional: teorema de la altura ───────────── */

const MA: Pt = [140, 300];
const MH: Pt = [230, 300];
const MB: Pt = [390, 300];
const MO = puntoMedio2(MA, MB);
const MR = dist(MO, MB);
const MC: Pt = [MH[0], MH[1] - Math.sqrt(MR * MR - (MH[0] - MO[0]) ** 2)];

function puntoMedio2(a: Pt, b: Pt): Pt {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function PapelMedia({ centro = false, semi = 0, altura = 0, marcas = true }: { centro?: boolean; semi?: number; altura?: number; marcas?: boolean }) {
  return (
    <g>
      <Seg a={MA} b={MB} w={1.6} />
      <Punto p={MA} nombre="A" dx={-16} dy={18} />
      <Punto p={MH} nombre="H" dx={-5} dy={20} />
      <Punto p={MB} nombre="B" dx={8} dy={18} />
      {marcas ? (
        <g>
          <Seg a={[MA[0], 326]} b={[MH[0], 326]} color={AMBAR} w={4} />
          <Seg a={[MH[0], 326]} b={[MB[0], 326]} color={AZUL} w={4} />
          <Txt p={[(MA[0] + MH[0]) / 2 - 4, 346]} color={AMBAR}>a</Txt>
          <Txt p={[(MH[0] + MB[0]) / 2 - 4, 346]} color={AZUL}>b</Txt>
        </g>
      ) : null}
      {centro ? <Punto p={MO} nombre="O" dx={-5} dy={20} color={AZUL} /> : null}
      {semi > 0 ? <ArcoPlano c={MO} r={MR} a1={0} a2={180 * semi} /> : null}
      {altura > 0 ? (
        <g data-testid="bench-altura">
          <Seg a={MH} b={lerpP(MH, MC, altura)} color={VERDE} w={2.2} />
          <g opacity={tramo(altura, 0.85, 1)}>
            <Punto p={MC} nombre="C" dx={8} dy={-6} color={VERDE} />
            <Txt p={[MH[0] + 10, (MH[1] + MC[1]) / 2]} color={VERDE}>h</Txt>
            <path d={`M${MH[0] + 10} ${MH[1]} L${MH[0] + 10} ${MH[1] - 10} L${MH[0]} ${MH[1] - 10}`} fill="none" stroke={INK} strokeWidth="0.9" />
          </g>
        </g>
      ) : null}
    </g>
  );
}

export function MediaCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 1 ? 6200 : step === 2 ? 4200 : step === 3 ? 2400 : 1);
  const semi = step === 2 ? p : step > 2 ? 1 : 0;
  const pm = animPuntoMedio(MA, MB, step === 1 ? p : 1);
  const comp = step === 1 ? (pm.pose ?? (pm.listo ? poseCompas(MO, MB) : null)) : step === 2 ? poseCompas(MO, enCirculo(MO, MR, 180 * semi)) : null;
  return (
    <BenchShell scene="media-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con un segmento AB dividido por H y la construcción de la media proporcional">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con un segmento AB dividido por H y la construcción de la media proporcional" data-testid="bench-media">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelMedia centro={step >= 2 || (step === 1 && pm.listo)} semi={semi} altura={step === 3 ? p : step > 3 ? 1 : 0} />
        {step >= 1 ? pm.nodos : null}
        {step === 3 ? <ReglaTrazando a={MH} b={MC} p={p} ext={0} color={VERDE} /> : null}
        {step === 4 ? (
          <g data-testid="bench-h2">
            <Txt p={[MB[0] + 24, 215]} color={VERDE}>h² = a · b</Txt>
            <Txt p={[MB[0] + 24, 237]} color={INK} size={12}>h es la media proporcional</Txt>
            <Txt p={[MB[0] + 24, 255]} color={INK} size={12}>de a y b</Txt>
          </g>
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

const defMedia: Def = {
  scene: "media-practica",
  fases: ["medida", "centro", "arco", "regla"],
  nClics: 2,
  extRegla: 8,
  papel: () => <PapelMedia centro marcas />,
  medibles: () => [MO, MB],
  candidatos: () => [MO],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 215],
  radioIni: () => 100,
  rhoIni: () => 12,
  arco: (_e, _n, _r, c) => ({ centro: c, base: 0, signo: 1, rhoMin: 0, rhoMax: 180, req: [14, 166] }),
  cortes: () => [MH, MC],
  evaluar: (est) => {
    const [p1, p2] = est.clics;
    if (!p1 || !p2) return { ok: false, mensaje: "Faltan los dos puntos por los que pasa la regla." };
    const bien = (dist(p1, MH) <= SNAP + 2 && dist(p2, MC) <= SNAP + 2) || (dist(p1, MC) <= SNAP + 2 && dist(p2, MH) <= SNAP + 2);
    return bien
      ? { ok: true, mensaje: "Correcto: CH es perpendicular a AB y C está en la semicircunferencia de diámetro AB, así que CH² = AH · HB: CH es la media proporcional de a y b." }
      : { ok: false, mensaje: "La perpendicular debe pasar por H y cortar a la semicircunferencia: toca H y el punto del arco que está justo encima. Pulsa «Reintentar»." };
  },
};

export function MediaPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defMedia} vista={{ ...MV, sheet: MSHEET }} />;
}

/* ───────────── Sección áurea ───────────── */

const AA: Pt = [110, 300];
const AB2: Pt = [410, 300];
const AC: Pt = [410, 150];
const LCB = dist(AC, AB2);
const LAC = dist(AA, AC);
const AD: Pt = [AC[0] + ((AA[0] - AC[0]) * LCB) / LAC, AC[1] + ((AA[1] - AC[1]) * LCB) / LAC];
const LAD = dist(AA, AD);
const AE: Pt = [AA[0] + LAD, 300];

function PapelAurea({ c = true, ac = 1, d = false, e = false, resultado = 0 }: { c?: boolean; ac?: number; d?: boolean; e?: boolean; resultado?: number }) {
  return (
    <g>
      <Seg a={AA} b={AB2} w={1.6} />
      <Punto p={AA} nombre="A" dx={-16} dy={18} />
      <Punto p={AB2} nombre="B" dx={8} dy={18} />
      {c ? (
        <g>
          <Seg a={AB2} b={AC} />
          <Punto p={AC} nombre="C" dx={8} dy={-4} />
          <path d={`M${AB2[0] - 10} ${AB2[1]} L${AB2[0] - 10} ${AB2[1] - 10} L${AB2[0]} ${AB2[1] - 10}`} fill="none" stroke={INK} strokeWidth="0.9" />
        </g>
      ) : null}
      {ac > 0 ? <Seg a={AA} b={lerpP(AA, AC, ac)} /> : null}
      {d ? <Punto p={AD} nombre="D" dx={8} dy={-6} color={AZUL} /> : null}
      {e ? <Punto p={AE} nombre="E" dx={-5} dy={20} color={VERDE} /> : null}
      {resultado > 0 ? (
        <g data-testid="bench-aurea" opacity={resultado}>
          <Seg a={[AA[0], 326]} b={[AE[0], 326]} color={VERDE} w={4} />
          <Seg a={[AE[0], 326]} b={[AB2[0], 326]} color={AMBAR} w={4} />
          <Txt p={[(AA[0] + AE[0]) / 2 - 8, 348]} color={VERDE}>AE</Txt>
          <Txt p={[(AE[0] + AB2[0]) / 2 - 8, 348]} color={AMBAR}>EB</Txt>
        </g>
      ) : null}
    </g>
  );
}

export function AureaCompas({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 0 ? 1600 : step === 1 ? 1800 : step === 2 || step === 3 ? 2800 : 1800);
  const aCB = angDe2(AC, AB2);
  const aCD = angDe2(AC, AD);
  const aAD = angDe2(AA, AD);
  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step === 2) comp = poseCompas(AC, enCirculo(AC, LCB, lerp(aCB, aCD, p)));
  else if (step === 3) comp = poseCompas(AA, enCirculo(AA, LAD, lerp(aAD, 0, p)));
  return (
    <BenchShell scene="aurea-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con un segmento AB y la construcción de su sección áurea con compás">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con un segmento AB y la construcción de su sección áurea con compás" data-testid="bench-aurea-escena">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <PapelAurea c={step >= 0} ac={step === 1 ? p : step > 1 ? 1 : 0} d={step >= 3 || (step === 2 && p > 0.9)} e={step >= 4 || (step === 3 && p > 0.9)} resultado={step === 4 ? p : 0} />
        {step >= 2 ? (
          <g data-testid="bench-arco-cb">
            <ArcoAnim c={AC} r={LCB} a1={aCB} a2={aCD} t={step === 2 ? p : 1} />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-testid="bench-arco-ad">
            <ArcoAnim c={AA} r={LAD} a1={aAD} a2={0} t={step === 3 ? p : 1} />
          </g>
        ) : null}
        {step === 1 ? <ReglaTrazando a={AA} b={AC} p={p} ext={0} /> : null}
        {comp ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

function angDe2(v: Pt, p: Pt) {
  return (Math.atan2(-(p[1] - v[1]), p[0] - v[0]) * 180) / Math.PI;
}

const defAurea: Def = {
  scene: "aurea-practica",
  fases: ["medida", "centro", "arco", "medida", "centro", "arco", "regla"],
  nClics: 1,
  papel: (est: Est) => <PapelAurea d={est.fase >= 3} e={est.fase >= 7} />,
  medibles: (est) => (est.fase === 0 ? [AC, AB2] : [AA, AD]),
  candidatos: (_e, idx) => (idx === 0 ? [AC] : [AA]),
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 340],
  radioIni: () => 100,
  rhoIni: () => -25,
  arco: (_e, n, _r, c) => ({ centro: c, base: n === 0 ? angDe2(AC, AD) : 0, signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
  cortes: () => [AE],
  evaluar: (est) => {
    const [p1] = est.clics;
    if (!p1) return { ok: false, mensaje: "Falta marcar el punto E." };
    return dist(p1, AE) <= SNAP + 2
      ? { ok: true, mensaje: "Correcto: E divide AB en media y extrema razón: AB/AE = AE/EB ≈ 1,618, el número áureo." }
      : { ok: false, mensaje: "Ese punto no es E: E es donde el arco de centro A y radio AD corta al segmento AB. Pulsa «Reintentar»." };
  },
};

export function AureaPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defAurea} vista={{ ...MV, sheet: MSHEET }} />;
}
