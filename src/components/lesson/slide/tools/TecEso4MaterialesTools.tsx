"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const f3 = (v: number) => fmtEs(v, 3);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Material para la ley de Hooke: módulo de Young E (GPa) y límite elástico (MPa); valores orientativos. */
export const MATERIALES_HOOKE = [
  { n: "Acero", E: 210, sy: 250 },
  { n: "Aluminio", E: 70, sy: 170 },
  { n: "Cobre", E: 120, sy: 70 },
  { n: "Nailon", E: 3, sy: 50 },
];

export const tensionNormal = (fN: number, areaMm2: number) => (areaMm2 > 0 ? fN / areaMm2 : Infinity);
export const deformacionUnitaria = (sigmaMPa: number, eGPa: number) => (eGPa > 0 ? sigmaMPa / (eGPa * 1000) : Infinity);
export const alargamiento = (sigmaMPa: number, eGPa: number, longMm: number) => deformacionUnitaria(sigmaMPa, eGPa) * longMm;
export const coefSeguridad = (limiteMPa: number, sigmaMPa: number) => (sigmaMPa > 0 ? limiteMPa / sigmaMPa : Infinity);
export const areaCircular = (dMm: number) => (Math.PI * dMm * dMm) / 4;

/** Dureza Brinell: HB = 2F / (π·D·(D − √(D² − d²))), con F en kgf y D, d en mm. */
export function brinell(fKgf: number, dBolaMm: number, dHuellaMm: number) {
  if (dHuellaMm >= dBolaMm || dBolaMm <= 0) return Infinity;
  return (2 * fKgf) / (Math.PI * dBolaMm * (dBolaMm - Math.sqrt(dBolaMm * dBolaMm - dHuellaMm * dHuellaMm)));
}

/** Péndulo de Charpy: energía absorbida K = m·g·(h₀ − h₁). */
export const energiaCharpy = (masaKg: number, h0: number, h1: number, g = 9.81) => Math.max(0, masaKg * g * (h0 - h1));

export type ClaseAcero = { nombre: string; rango: string };
export function clasificaAcero(cPct: number): ClaseAcero {
  if (cPct < 0.008) return { nombre: "Hierro prácticamente puro", rango: "< 0,008 % C" };
  if (cPct <= 0.25) return { nombre: "Acero de bajo carbono (dulce)", rango: "hasta 0,25 % C" };
  if (cPct <= 0.6) return { nombre: "Acero de medio carbono", rango: "0,25–0,6 % C" };
  if (cPct <= 2.1) return { nombre: "Acero de alto carbono", rango: "0,6–2,1 % C" };
  return { nombre: "Fundición de hierro", rango: "2,1–6,67 % C" };
}
/** Dureza orientativa recocida (HB) y templada (HRC) en función del carbono. */
export const durezaRecocida = (cPct: number) => 90 + 130 * Math.min(cPct, 2);
export const durezaTemplada = (cPct: number) => Math.min(66, 20 + 50 * Math.sqrt(Math.max(0, cPct)));

/** Holgura máxima y mínima (µm) de un ajuste eje-agujero con desviaciones en µm. */
export function ajuste(ES: number, EI: number, es: number, ei: number) {
  const max = ES - ei;
  const min = EI - es;
  const tipo = min >= 0 ? "Con juego" : max <= 0 ? "Con apriete" : "Indeterminado";
  return { max, min, tipo };
}

/** Distribución normal estándar acumulada (aproximación de Abramowitz-Stegun). */
export function normalCdf(z: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}
/** Fracción de piezas fuera de tolerancia para una media, una desviación y los límites. */
export function fraccionFuera(mu: number, s: number, lsl: number, usl: number) {
  if (s <= 0) return mu < lsl || mu > usl ? 1 : 0;
  return normalCdf((lsl - mu) / s) + 1 - normalCdf((usl - mu) / s);
}
export const capacidadCp = (lsl: number, usl: number, s: number) => (s > 0 ? (usl - lsl) / (6 * s) : Infinity);
export const capacidadCpk = (mu: number, lsl: number, usl: number, s: number) => (s > 0 ? Math.min(usl - mu, mu - lsl) / (3 * s) : Infinity);

/* ───────────── 1. Ley de Hooke ───────────── */

export function HookeEso4Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, 3)), F: num(block.params?.a, 5, 0.1, 100), d: 10, L: 500 };
  const [s, setS] = useState(init);
  const M = MATERIALES_HOOKE[s.m]!;
  const sig = tensionNormal(s.F * 1000, areaCircular(s.d));
  const dl = alargamiento(sig, M.E, s.L);
  const cs = coefSeguridad(M.sy, sig);
  const elastico = sig <= M.sy;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una barra se estira con una fuerza. Mientras la tensión no pase del límite elástico, el alargamiento es proporcional a la fuerza (ley de Hooke)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={MATERIALES_HOOKE.map((x, value) => ({ value, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Fuerza de tracción" value={s.F} min={0.1} max={100} step={0.1} unit=" kN" color={MANIM.red} onChange={(F) => setS((x) => ({ ...x, F }))} />
          <Slider label="Diámetro de la barra" value={s.d} min={2} max={30} step={1} unit=" mm" color={MANIM.blue} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Longitud" value={s.L} min={100} max={2000} step={50} unit=" mm" color={MANIM.purple} onChange={(L) => setS((x) => ({ ...x, L }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Tensión σ = F/A">{f1(sig)} MPa</Stat>
        <Stat color={MANIM.blue} label={`Límite elástico (${M.n})`}>{M.sy} MPa</Stat>
        <Stat color={MANIM.purple} label="Alargamiento ΔL">{dl < 10 ? f3(dl) : f1(dl)} mm</Stat>
        <Stat color={cs >= 2 ? MANIM.green : cs >= 1 ? MANIM.yellow : MANIM.red} label="Coeficiente de seguridad">{Number.isFinite(cs) ? f2(cs) : "—"}</Stat>
        <Stat color={elastico ? MANIM.green : MANIM.red} label="Comportamiento">{elastico ? "elástico (recupera la forma)" : "plástico: deformación permanente"}</Stat>
      </Readout>
      <Note>σ = F/A y, en la zona elástica, <b>σ = E·ε</b> (ley de Hooke), donde E es el módulo de Young: cuanto mayor, más rígido es el material. El <b>coeficiente de seguridad</b> es el límite elástico dividido por la tensión de trabajo y debe ser claramente mayor que 1 (en estructuras suele exigirse 2 o más). Valores orientativos.</Note>
    </Frame>
  );
}

/* ───────────── 2. Dureza Brinell ───────────── */

export function BrinellEso4Explorador({ block }: { block: ToolBlock }) {
  const init = { F: 3000, d: num(block.params?.a, 4, 1, 9) };
  const [s, setS] = useState(init);
  const hb = brinell(s.F, 10, s.d);
  const rm = hb * 3.45;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una bola de 10 mm se aprieta contra el material con una carga. Cuanto más pequeña es la huella, más duro es el material."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Carga" items={[500, 1500, 3000].map((v) => ({ value: v, label: `${v} kgf` }))} value={s.F} onChange={(F) => setS((x) => ({ ...x, F }))} />
          <Slider label="Diámetro de la huella" value={s.d} min={1} max={9} step={0.1} unit=" mm" color={MANIM.orange} onChange={(d) => setS((x) => ({ ...x, d }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="brinell" maxH={130}>
        <rect x={60} y={60} width={400} height={30} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={2} />
        <circle cx={260} cy={60} r={s.d * 4} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={2} />
        <circle cx={260} cy={40} r={20} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={2} />
        <text x={300} y={30} fill={MANIM.muted} fontSize={11}>
          bola de 10 mm
        </text>
        <text x={290} y={82} fill={MANIM.orange} fontSize={11}>
          huella d = {f1(s.d)} mm
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Dureza Brinell">{Number.isFinite(hb) ? `${f0(hb)} HB` : "—"}</Stat>
        <Stat color={MANIM.blue} label="Resistencia a tracción estimada (acero)">{Number.isFinite(rm) ? `${f0(rm)} MPa` : "—"}</Stat>
      </Readout>
      <Note>HB = 2F / (π·D·(D − √(D² − d²))). Un material más duro se deja marcar menos y deja una huella menor. En los aceros, la resistencia a tracción es, aproximadamente, 3,45 veces la dureza HB: el ensayo de dureza es una forma rápida y casi no destructiva de estimar la resistencia.</Note>
    </Frame>
  );
}

/* ───────────── 3. Péndulo de Charpy ───────────── */

export function CharpyEso4Explorador({ block }: { block: ToolBlock }) {
  const init = { h1: num(block.params?.a, 0.9, 0, 1.4), h0: 1.4 };
  const [s, setS] = useState(init);
  const K = energiaCharpy(22, s.h0, s.h1);
  const res = K / 0.8;
  const clase = K < 20 ? "frágil" : K < 60 ? "tenaz" : "muy tenaz (dúctil)";
  return (
    <Frame
      stacked
      hint={block.hint ?? "El péndulo cae, rompe la probeta y sube hasta una altura menor. La energía perdida es la que absorbió el material."}
      onReset={() => setS(init)}
      controls={<Slider label="Altura que alcanza tras romper" value={s.h1} min={0} max={1.4} step={0.05} unit=" m" color={MANIM.orange} onChange={(h1) => setS((x) => ({ ...x, h1 }))} />}
    >
      <Readout>
        <Stat color={MANIM.orange} label="Energía absorbida K">{f0(K)} J</Stat>
        <Stat color={MANIM.blue} label="Resiliencia K/A (sección 0,8 cm²)">{f0(res)} J/cm²</Stat>
        <Stat color={K < 20 ? MANIM.red : MANIM.green} label="Comportamiento">{clase}</Stat>
      </Readout>
      <Note>La <b>resiliencia</b> es la capacidad de absorber energía en un impacto. Un péndulo de 22 kg suelto desde 1,4 m tiene unos 302 J: K = m·g·(h₀ − h₁). Un material <b>frágil</b> rompe absorbiendo poca energía (el péndulo casi no pierde altura); uno <b>tenaz</b> se deforma antes de romper y absorbe mucha. El frío vuelve frágiles muchos aceros. Clasificación orientativa.</Note>
    </Frame>
  );
}

/* ───────────── 4. Acero y tratamientos ───────────── */

export function AceroExplorador({ block }: { block: ToolBlock }) {
  const init = { c: num(block.params?.a, 0.4, 0, 3) };
  const [s, setS] = useState(init);
  const cl = clasificaAcero(s.c);
  const hb = durezaRecocida(s.c);
  const hrc = durezaTemplada(s.c);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El contenido de carbono decide el tipo de acero y su dureza. Compara el material recocido con el templado."}
      onReset={() => setS(init)}
      controls={<Slider label="Carbono" value={s.c} min={0} max={3} step={0.05} unit=" %" color={MANIM.orange} onChange={(c) => setS({ c })} />}
    >
      <Readout>
        <Stat color={MANIM.blue} label="Clasificación">{cl.nombre}</Stat>
        <Stat color={MANIM.muted} label="Intervalo">{cl.rango}</Stat>
        <Stat color={MANIM.green} label="Dureza recocido (orientativa)">{f0(hb)} HB</Stat>
        <Stat color={MANIM.red} label="Dureza templado (orientativa)">{s.c >= 0.2 && s.c <= 2.1 ? `${f0(hrc)} HRC` : "no se templa bien"}</Stat>
      </Readout>
      <Note>Más carbono da más dureza y resistencia, pero menos ductilidad y soldabilidad. Los tratamientos térmicos cambian la estructura interna sin cambiar la composición: <b>temple</b> (calentar y enfriar rápido: mucha dureza y fragilidad), <b>revenido</b> (después del temple: reduce la fragilidad), <b>recocido</b> (enfriar lento: ablanda) y <b>normalizado</b> (afina el grano). El hierro dulce no se templa de forma útil y las fundiciones son frágiles. Valores orientativos.</Note>
    </Frame>
  );
}

/* ───────────── 5. Ajustes y tolerancias ───────────── */

export function AjusteExplorador({ block }: { block: ToolBlock }) {
  const init = { ES: Math.round(num(block.params?.a, 25, -50, 80)), EI: 0, es: -10, ei: -29 };
  const [s, setS] = useState(init);
  const a = ajuste(s.ES, s.EI, s.es, s.ei);
  const col = a.tipo === "Con juego" ? MANIM.green : a.tipo === "Con apriete" ? MANIM.red : MANIM.yellow;
  const ha = Math.max(s.ES, s.EI);
  const hb = Math.min(s.ES, s.EI);
  const ea = Math.max(s.es, s.ei);
  const eb = Math.min(s.es, s.ei);
  const Y = (v: number) => 70 - v * 0.7;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un eje entra en un agujero. Las desviaciones (en micras) fijan la holgura posible y el tipo de ajuste."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Agujero: desviación superior ES" value={s.ES} min={0} max={80} step={1} unit=" µm" color={MANIM.blue} onChange={(ES) => setS((x) => ({ ...x, ES }))} />
          <Slider label="Agujero: desviación inferior EI" value={s.EI} min={-50} max={30} step={1} unit=" µm" color={MANIM.purple} onChange={(EI) => setS((x) => ({ ...x, EI }))} />
          <Slider label="Eje: desviación superior es" value={s.es} min={-60} max={50} step={1} unit=" µm" color={MANIM.orange} onChange={(es) => setS((x) => ({ ...x, es }))} />
          <Slider label="Eje: desviación inferior ei" value={s.ei} min={-90} max={40} step={1} unit=" µm" color={MANIM.yellow} onChange={(ei) => setS((x) => ({ ...x, ei }))} />
        </>
      }
    >
      <Svg w={520} h={140} testId="ajuste" maxH={160}>
        <line x1={30} y1={70} x2={490} y2={70} stroke={MANIM.muted} strokeWidth={1} strokeDasharray="4 3" />
        <rect x={80} y={Y(ha)} width={150} height={Math.max(2, Y(hb) - Y(ha))} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={2} />
        <rect x={290} y={Y(ea)} width={150} height={Math.max(2, Y(eb) - Y(ea))} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={2} />
        <text x={155} y={130} textAnchor="middle" fill={MANIM.blue} fontSize={12}>
          zona de tolerancia del agujero
        </text>
        <text x={365} y={130} textAnchor="middle" fill={MANIM.orange} fontSize={12}>
          zona del eje
        </text>
        <text x={34} y={88} fill={MANIM.muted} fontSize={10}>
          medida nominal
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Holgura máxima">{a.max} µm</Stat>
        <Stat color={MANIM.purple} label="Holgura mínima">{a.min} µm</Stat>
        <Stat color={col} label="Tipo de ajuste">{a.tipo}</Stat>
      </Readout>
      <Note>Holgura máxima = ES − ei; holgura mínima = EI − es. Si la mínima es positiva el ajuste es <b>con juego</b> (el eje siempre gira libre); si la máxima es negativa, <b>con apriete</b> (hay que forzar el montaje); si no, es <b>indeterminado</b>. Se elige según la función: un cojinete lleva juego; una rueda calada en su eje, apriete.</Note>
    </Frame>
  );
}

/* ───────────── 6. Control de calidad estadístico ───────────── */

export function CalidadExplorador({ block }: { block: ToolBlock }) {
  const init = { mu: num(block.params?.a, 20.0, 19.5, 20.5), s: 0.05, lsl: 19.9, usl: 20.1 };
  const [s, setS] = useState(init);
  const fuera = fraccionFuera(s.mu, s.s, s.lsl, s.usl);
  const cp = capacidadCp(s.lsl, s.usl, s.s);
  const cpk = capacidadCpk(s.mu, s.lsl, s.usl, s.s);
  const X = (v: number) => 260 + ((v - 20) / 0.5) * 220;
  const pdf = (v: number) => Math.exp(-0.5 * ((v - s.mu) / Math.max(s.s, 0.005)) ** 2);
  const xs = Array.from({ length: 101 }, (_, i) => 19.5 + (i / 100) * 1.0);
  const pts = xs.map((v) => `${X(v)},${115 - pdf(v) * 90}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un eje de 20 mm con tolerancia ±0,1 mm. Mueve la media y la dispersión del proceso y mira qué porcentaje de piezas sale fuera."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Medida media del proceso" value={s.mu} min={19.5} max={20.5} step={0.01} unit=" mm" color={MANIM.blue} onChange={(mu) => setS((x) => ({ ...x, mu }))} />
          <Slider label="Desviación típica (dispersión)" value={s.s} min={0.01} max={0.2} step={0.01} unit=" mm" color={MANIM.orange} onChange={(sd) => setS((x) => ({ ...x, s: sd }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="calidad" maxH={150}>
        <rect x={X(s.lsl)} y={10} width={X(s.usl) - X(s.lsl)} height={105} fill={MANIM.green} fillOpacity={0.12} />
        <line x1={X(s.lsl)} y1={10} x2={X(s.lsl)} y2={115} stroke={MANIM.green} strokeWidth={2} />
        <line x1={X(s.usl)} y1={10} x2={X(s.usl)} y2={115} stroke={MANIM.green} strokeWidth={2} />
        <polyline points={pts} fill="none" stroke={MANIM.orange} strokeWidth={2.5} />
        <text x={X(s.lsl) - 4} y={126} textAnchor="end" fill={MANIM.green} fontSize={11}>
          19,9
        </text>
        <text x={X(s.usl) + 4} y={126} fill={MANIM.green} fontSize={11}>
          20,1
        </text>
      </Svg>
      <Readout>
        <Stat color={fuera < 0.01 ? MANIM.green : fuera < 0.1 ? MANIM.yellow : MANIM.red} label="Piezas fuera de tolerancia">{fuera < 0.0001 ? "< 0,01" : f2(fuera * 100)} %</Stat>
        <Stat color={MANIM.blue} label="Cp (dispersión frente a tolerancia)">{Number.isFinite(cp) ? f2(cp) : "—"}</Stat>
        <Stat color={MANIM.purple} label="Cpk (con el descentrado)">{Number.isFinite(cpk) ? f2(cpk) : "—"}</Stat>
      </Readout>
      <Note>Un proceso real nunca da piezas idénticas: las medidas se reparten alrededor de una media con una desviación típica σ. <b>Cp</b> = (tolerancia total)/(6σ) compara la dispersión con la tolerancia y <b>Cpk</b> añade el descentrado de la media. Un proceso se considera capaz si Cpk ≥ 1,33. Para mejorar: reducir σ (mejores máquinas, mantenimiento) o centrar la media.</Note>
    </Frame>
  );
}
