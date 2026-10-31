"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const f3 = (v: number) => fmtEs(v, 3);
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");
const rad = (g: number): number => (g * Math.PI) / 180;
/** Notación científica en español: 5,97·10²⁴ */
const sup = (n: number): string => String(n).replace(/-/g, "⁻").replace(/\d/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]!);
export function cient(v: number, dec = 2): string {
  if (!Number.isFinite(v)) return "—";
  if (v === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(v)));
  if (e >= -2 && e <= 4) return fmtEs(v, e >= 3 ? 0 : dec);
  return `${fmtEs(v / 10 ** e, dec)}·10${sup(e)}`;
}

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const G = 6.674e-11;
export const UA = 1.496e11;
export const MSOL = 1.989e30;

export interface Cuerpo { nombre: string; M: number; R: number }
export const CUERPOS: Cuerpo[] = [
  { nombre: "Tierra", M: 5.972e24, R: 6.371e6 },
  { nombre: "Luna", M: 7.342e22, R: 1.737e6 },
  { nombre: "Marte", M: 6.417e23, R: 3.39e6 },
  { nombre: "Júpiter", M: 1.898e27, R: 6.9911e7 },
  { nombre: "Sol", M: MSOL, R: 6.957e8 },
];

export const fuerzaGrav = (m1: number, m2: number, r: number): number => (r > 0 ? (G * m1 * m2) / (r * r) : NaN);
export const campoG = (M: number, r: number): number => (r > 0 ? (G * M) / (r * r) : NaN);
export const vOrbital = (M: number, r: number): number => (r > 0 ? Math.sqrt((G * M) / r) : NaN);
export const periodoOrbital = (M: number, r: number): number => (r > 0 && M > 0 ? 2 * Math.PI * Math.sqrt((r * r * r) / (G * M)) : NaN);
export const vEscape = (M: number, r: number): number => (r > 0 ? Math.sqrt((2 * G * M) / r) : NaN);
export const epGrav = (M: number, m: number, r: number): number => (r > 0 ? (-G * M * m) / r : NaN);
export const energiaOrbital = (M: number, m: number, r: number): number => (r > 0 ? (-G * M * m) / (2 * r) : NaN);
/** Radio de la órbita cuyo periodo es T (3.ª ley de Kepler). */
export const radioParaPeriodo = (M: number, T: number): number => Math.cbrt((G * M * T * T) / (4 * Math.PI * Math.PI));
/** Velocidad en una elipse de semieje a a distancia r del foco (ecuación vis-viva). */
export const visViva = (M: number, r: number, a: number): number => {
  const v2 = G * M * (2 / r - 1 / a);
  return r > 0 && a > 0 && v2 >= 0 ? Math.sqrt(v2) : NaN;
};
/** 3.ª ley de Kepler para el Sol: T (años) con a en UA. */
export const periodoAnios = (aUA: number): number => (aUA > 0 ? Math.pow(aUA, 1.5) : NaN);
export function elipse(aUA: number, e: number) {
  return { perihelio: aUA * (1 - e), afelio: aUA * (1 + e), b: aUA * Math.sqrt(1 - e * e) };
}
/** Distancia al foco para una anomalía verdadera th (grados). */
export const radioElipse = (a: number, e: number, th: number): number => (a * (1 - e * e)) / (1 + e * Math.cos(rad(th)));

/** Energía que hay que comunicar a un satélite para pasar de una órbita circular r1 a otra r2. */
export function cambioOrbita(M: number, m: number, r1: number, r2: number) {
  const dE = energiaOrbital(M, m, r2) - energiaOrbital(M, m, r1);
  return { dE, v1: vOrbital(M, r1), v2: vOrbital(M, r2), T1: periodoOrbital(M, r1), T2: periodoOrbital(M, r2) };
}

/* ───────────── 1. Leyes de Kepler ───────────── */

export function KeplerFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { a: num(block.params?.a, 1, 0.3, 40), e: num(block.params?.b, 0.5, 0, 0.9), th: Math.round(num(block.params?.c, 0, 0, 360)) };
  const [s, setS] = useState(init);
  const el = elipse(s.a, s.e);
  const r = radioElipse(s.a, s.e, s.th);
  const v = visViva(MSOL, r * UA, s.a * UA);
  const T = periodoAnios(s.a);
  const cx = 260;
  const cy = 95;
  const ax = 190;
  const bx = ax * Math.sqrt(1 - s.e * s.e);
  const sun: [number, number] = [cx + ax * s.e, cy];
  const rp = (ax * (1 - s.e * s.e)) / (1 + s.e * Math.cos(rad(s.th)));
  const P: [number, number] = [sun[0] + rp * Math.cos(rad(s.th)), sun[1] - rp * Math.sin(rad(s.th))];
  const vP = visViva(MSOL, el.perihelio * UA, s.a * UA);
  const vA = visViva(MSOL, el.afelio * UA, s.a * UA);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El planeta recorre una elipse con el Sol en un foco; va más rápido cerca (perihelio) y más lento lejos (afelio)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Semieje mayor a" value={s.a} min={0.3} max={40} step={0.1} unit=" UA" color={MANIM.blue} format={f1} onChange={(a) => setS((o) => ({ ...o, a }))} />
          <Slider label="Excentricidad e" value={s.e} min={0} max={0.9} step={0.05} color={MANIM.orange} format={f2} onChange={(e) => setS((o) => ({ ...o, e }))} />
          <Slider label="Posición en la órbita (ángulo desde el perihelio)" value={s.th} min={0} max={360} step={5} unit="°" color={MANIM.green} onChange={(th) => setS((o) => ({ ...o, th }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="kepler" maxH={220}>
        <ellipse cx={cx} cy={cy} rx={ax} ry={bx} fill="none" stroke={MANIM.muted} strokeWidth={2} />
        <Seg a={sun} b={P} color={MANIM.yellow} width={2} dashed />
        <Dot p={sun} r={9} color={MANIM.yellow} />
        <Dot p={P} r={6} color={MANIM.blue} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Periodo T = a^(3/2) (3.ª ley, T en años y a en UA)">{`${fin(T, f2)} años`}</Stat>
        <Stat color={MANIM.green} label="Perihelio · afelio">{`${f2(el.perihelio)} UA · ${f2(el.afelio)} UA`}</Stat>
        <Stat color={MANIM.yellow} label="Distancia actual al Sol · velocidad">{`${f2(r)} UA · ${fin(v / 1000, f1)} km/s`}</Stat>
        <Stat color={MANIM.orange} label="Velocidad en perihelio · en afelio">{`${fin(vP / 1000, f1)} km/s · ${fin(vA / 1000, f1)} km/s (cociente ${fin(vP / vA, f2)} = (1+e)/(1−e))`}</Stat>
        <Stat color={MANIM.purple} label="T²/a³ (constante para todo el sistema solar)">{`${fin(T * T / (s.a ** 3), f2)} años²/UA³`}</Stat>
      </Readout>
      <Note>Las <b>leyes de Kepler</b> describen el movimiento planetario. <b>1.ª</b>: las órbitas son <b>elipses</b> con el Sol en uno de los focos. <b>2.ª (ley de las áreas)</b>: el radio vector barre <b>áreas iguales en tiempos iguales</b>, de modo que la velocidad es mayor en el <b>perihelio</b> (mínima distancia) que en el <b>afelio</b>; equivale a la conservación del <b>momento angular</b> (<b>r·v·sen φ = constante</b>, fuerza central). <b>3.ª</b>: <b>T² = k·a³</b> con k la misma para todos los planetas del Sol (k = 4π²/GM). Si e = 0 la órbita es una circunferencia y la velocidad es constante. La velocidad en cualquier punto sale de la ecuación <b>vis-viva</b>, que no es más que la conservación de la energía.</Note>
    </Frame>
  );
}

/* ───────────── 2. Ley de gravitación y campo ───────────── */

export function CampoGravitatorioFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.min(CUERPOS.length - 1, Math.max(0, Math.round(num(block.params?.a, 0, 0, 4)))), h: num(block.params?.b, 0, 0, 400), m: Math.round(num(block.params?.c, 70, 1, 1000)) };
  const [s, setS] = useState(init);
  const cu = CUERPOS[s.c]!;
  const r = cu.R + s.h * 1e6;
  const g = campoG(cu.M, r);
  const g0 = campoG(cu.M, cu.R);
  const F = s.m * g;
  const rel = Math.min(1, Math.max(0, g / g0));
  const frac = Math.min(1, cu.R / r);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La intensidad del campo gravitatorio disminuye con el cuadrado de la distancia al centro del astro."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Astro" items={CUERPOS.map((c, k) => ({ value: String(k), label: c.nombre }))} value={String(s.c)} onChange={(k) => setS((o) => ({ ...o, c: Number(k) }))} />
          <Slider label="Altura sobre la superficie (miles de km)" value={s.h} min={0} max={400} step={1} unit=" ×10³ km" color={MANIM.blue} onChange={(h) => setS((o) => ({ ...o, h }))} />
          <Slider label="Masa del cuerpo de prueba" value={s.m} min={1} max={1000} step={1} unit=" kg" color={MANIM.orange} onChange={(m) => setS((o) => ({ ...o, m }))} />
        </>
      }
    >
      <Svg w={420} h={110} testId="campo-g" maxH={140}>
        <circle cx={60} cy={55} r={28} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={2} />
        <Dot p={[60 + 28 + Math.min(300, 20 + (1 / Math.max(frac, 0.01) - 1) * 60), 55]} r={6} color={MANIM.orange} />
        <rect x={110} y={92} width={Math.max(2, rel * 280)} height={10} fill={MANIM.green} fillOpacity={0.8} />
        <text x={400} y={101} textAnchor="end" fill={MANIM.muted} fontSize={11}>g / g₀ = {f3(rel)}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Distancia al centro r = R + h">{`${cient(r)} m`}</Stat>
        <Stat color={MANIM.green} label="Intensidad de campo g = G·M/r²">{`${fin(g, f2)} m/s² (${fin(g / 9.8, f3)} g terrestres)`}</Stat>
        <Stat color={MANIM.orange} label="Fuerza (peso) sobre el cuerpo F = m·g">{`${fin(F, f1)} N`}</Stat>
        <Stat color={MANIM.purple} label="g en la superficie del astro">{`${fin(g0, f2)} m/s²`}</Stat>
      </Readout>
      <Note>La <b>ley de gravitación universal</b> (Newton): dos masas se atraen con una fuerza <b>F = G·M·m/r²</b> (G = 6,674·10⁻¹¹ N·m²/kg²), <b>central</b>, atractiva y proporcional a las masas. La masa M crea un <b>campo gravitatorio</b>: la <b>intensidad</b> en un punto es <b>g = G·M/r²</b> (N/kg = m/s²), vector que apunta al centro. El <b>peso</b> es P = m·g. En la superficie terrestre g₀ ≈ 9,8 m/s²; a una altura h, g = g₀·R²/(R + h)². Aunque el peso <b>cambia</b> de un astro a otro, la <b>masa</b> es la misma. A una altura de un radio terrestre, g baja a 1/4; en la órbita de la Luna (60 R) es 1/3600.</Note>
    </Frame>
  );
}

/* ───────────── 3. Satélites y velocidad de escape ───────────── */

export function SateliteFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.min(CUERPOS.length - 1, Math.max(0, Math.round(num(block.params?.a, 0, 0, 4)))), h: num(block.params?.b, 400, 0, 40000) };
  const [s, setS] = useState(init);
  const cu = CUERPOS[s.c]!;
  const r = cu.R + s.h * 1e3;
  const T = periodoOrbital(cu.M, r);
  const rGeo = radioParaPeriodo(cu.M, 86164);
  const esc = vEscape(cu.M, cu.R);
  const frac = Math.min(1.8, r / cu.R);
  return (
    <Frame
      stacked
      hint={block.hint ?? "En una órbita circular la fuerza gravitatoria hace de fuerza centrípeta: G·M·m/r² = m·v²/r."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Astro" items={CUERPOS.map((c, k) => ({ value: String(k), label: c.nombre }))} value={String(s.c)} onChange={(k) => setS((o) => ({ ...o, c: Number(k) }))} />
          <Slider label="Altura de la órbita sobre la superficie" value={s.h} min={0} max={40000} step={100} unit=" km" color={MANIM.blue} onChange={(h) => setS((o) => ({ ...o, h }))} />
        </>
      }
    >
      <Svg w={420} h={190} testId="satelite" maxH={220}>
        <circle cx={210} cy={95} r={36} fill={MANIM.blue} fillOpacity={0.45} stroke={MANIM.blue} strokeWidth={2} />
        <circle cx={210} cy={95} r={36 * Math.min(2.4, frac)} fill="none" stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="5 5" />
        <Dot p={[210 + 36 * Math.min(2.4, frac), 95]} r={6} color={MANIM.orange} />
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Velocidad orbital v = √(G·M/r)">{`${fin(vOrbital(cu.M, r) / 1000, f2)} km/s`}</Stat>
        <Stat color={MANIM.purple} label="Periodo T = 2π·√(r³/GM)">{`${fin(T / 3600, f2)} h (${fin(T / 60, f1)} min)`}</Stat>
        <Stat color={MANIM.orange} label="Velocidad de escape desde la superficie √(2GM/R)">{`${fin(esc / 1000, f2)} km/s`}</Stat>
        <Stat color={MANIM.yellow} label="Velocidad de escape desde esta órbita">{`${fin(vEscape(cu.M, r) / 1000, f2)} km/s (= √2 · v orbital)`}</Stat>
        <Stat color={MANIM.blue} label="Órbita geoestacionaria (T = 23 h 56 min) en este astro">{`r = ${cient(rGeo)} m · altura ${fin((rGeo - cu.R) / 1000, (v) => fmtEs(v, 0))} km`}</Stat>
      </Readout>
      <Note>En una <b>órbita circular</b> la fuerza gravitatoria es la <b>fuerza centrípeta</b>: G·M·m/r² = m·v²/r → <b>v = √(G·M/r)</b>: no depende de la masa del satélite y es <b>menor cuanto más lejos</b>. El <b>periodo</b> es T = 2π·r/v (3.ª ley de Kepler: T² = 4π²·r³/(G·M)). Un satélite <b>geoestacionario</b> tiene T = 24 h, queda fijo sobre un punto del ecuador, y su radio orbital es ≈ 42 164 km (unos 35 786 km de altura sobre la superficie). La <b>velocidad de escape</b> es la mínima para alejarse hasta el infinito (Em = 0): <b>v_e = √(2·G·M/R)</b> = √2·v_orbital rasante (≈ 11,2 km/s en la Tierra). Si a esa altura el valor sale menor que la superficie, el satélite chocaría con el astro.</Note>
    </Frame>
  );
}

/* ───────────── 4. Energía orbital y cambios de órbita ───────────── */

export function EnergiaOrbitalFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 1000, 10, 5000)), r1: num(block.params?.b, 1.1, 1.01, 10), r2: num(block.params?.c, 6.6, 1.01, 10) };
  const [s, setS] = useState(init);
  const M = CUERPOS[0]!.M;
  const R = CUERPOS[0]!.R;
  const r1 = s.r1 * R;
  const r2 = s.r2 * R;
  const c = cambioOrbita(M, s.m, r1, r2);
  const Ep1 = epGrav(M, s.m, r1);
  const Ec1 = 0.5 * s.m * c.v1 ** 2;
  const eSup = epGrav(M, s.m, R);
  const E1 = energiaOrbital(M, s.m, r1);
  const E2 = energiaOrbital(M, s.m, r2);
  const lanz = E1 - eSup;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En una órbita circular Ec = −Em, Ep = 2·Em y Em = −G·M·m/(2r): la energía total es negativa, el satélite está ligado."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa del satélite" value={s.m} min={10} max={5000} step={10} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Órbita inicial (radios terrestres)" value={s.r1} min={1.01} max={10} step={0.01} unit=" R⊕" color={MANIM.green} format={f2} onChange={(r1v) => setS((o) => ({ ...o, r1: r1v }))} />
          <Slider label="Órbita final (radios terrestres)" value={s.r2} min={1.01} max={10} step={0.01} unit=" R⊕" color={MANIM.orange} format={f2} onChange={(r2v) => setS((o) => ({ ...o, r2: r2v }))} />
        </>
      }
    >
      <Svg w={420} h={190} testId="energia-orbital" maxH={220}>
        <circle cx={210} cy={95} r={22} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={2} />
        <circle cx={210} cy={95} r={Math.min(88, 22 * s.r1)} fill="none" stroke={MANIM.green} strokeWidth={2} />
        <circle cx={210} cy={95} r={Math.min(92, 22 * s.r2)} fill="none" stroke={MANIM.orange} strokeWidth={2} strokeDasharray="5 5" />
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Órbita inicial: Ec · Ep · Em">{`${cient(Ec1)} J · ${cient(Ep1)} J · ${cient(E1)} J`}</Stat>
        <Stat color={MANIM.orange} label="Órbita final: Em = −G·M·m/(2r)">{`${cient(E2)} J`}</Stat>
        <Stat color={MANIM.yellow} label="Energía necesaria para cambiar de órbita ΔEm">{`${cient(c.dE)} J (${c.dE >= 0 ? "hay que aportarla" : "se libera"})`}</Stat>
        <Stat color={MANIM.purple} label="Velocidades orbitales (inicial → final)">{`${fin(c.v1 / 1000, f2)} → ${fin(c.v2 / 1000, f2)} km/s`}</Stat>
        <Stat color={MANIM.red} label="Energía para poner el satélite en la órbita inicial desde la superficie (en reposo)">{`${cient(lanz)} J`}</Stat>
      </Readout>
      <Note>La <b>energía potencial gravitatoria</b> general es <b>Ep = −G·M·m/r</b> (cero en el infinito, negativa a distancia finita); la que usamos, m·g·h, es su aproximación cerca de la superficie. En una <b>órbita circular</b>, <b>Ec = G·M·m/(2r)</b> y la <b>energía mecánica</b> es <b>Em = −G·M·m/(2r)</b> (negativa: el satélite está <b>ligado</b>). Subir a una órbita mayor cuesta energía (Em aumenta, aunque la velocidad <b>disminuye</b>: al subir, Ep crece más de lo que Ec baja). Si Em ≥ 0 el cuerpo escapa. La fuerza gravitatoria es <b>conservativa</b>: el trabajo entre dos puntos es −ΔEp, y el <b>momento angular</b> L = m·r·v se conserva por ser central.</Note>
    </Frame>
  );
}
