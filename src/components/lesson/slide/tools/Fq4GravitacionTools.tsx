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
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");

/* ───────────── Datos y cálculos (se comprueban en los tests) ───────────── */

export const G_UNIV = 6.674e-11;
export const M_TIERRA = 5.97e24;
export const R_TIERRA = 6.371e6;
export const M_LUNA = 7.35e22;
export const D_TIERRA_LUNA = 3.844e8;

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const supers = (n: number): string => `${n < 0 ? "⁻" : ""}${String(Math.abs(n)).split("").map((c) => SUP[Number(c)]).join("")}`;
/** Notación científica con coma decimal: 1,98·10²⁰ */
export function cientifica(v: number, dec = 2): string {
  if (!Number.isFinite(v)) return "—";
  if (v === 0) return "0";
  let e = Math.floor(Math.log10(Math.abs(v)));
  let m = v / 10 ** e;
  if (Math.abs(Number(m.toFixed(dec))) >= 10) {
    m /= 10;
    e += 1;
  }
  return e === 0 ? fmtEs(m, dec) : `${fmtEs(m, dec)}·10${supers(e)}`;
}

/** Ley de gravitación universal: F = G·m₁·m₂/d² (N). */
export const fuerzaGravitatoria = (m1: number, m2: number, d: number): number => (d > 0 && m1 >= 0 && m2 >= 0 ? (G_UNIV * m1 * m2) / (d * d) : NaN);
/** Gravedad en un punto a distancia r del centro de un astro de masa M (m/s²). */
export const gravedad = (M: number, r: number): number => (r > 0 ? (G_UNIV * M) / (r * r) : NaN);
/** Velocidad de escape desde la superficie (m/s). */
export const velocidadEscape = (M: number, R: number): number => (R > 0 ? Math.sqrt((2 * G_UNIV * M) / R) : NaN);

export const ASTROS = [
  { id: "luna", nombre: "Luna", M: 7.35e22, R: 1.737e6 },
  { id: "mercurio", nombre: "Mercurio", M: 3.3e23, R: 2.44e6 },
  { id: "venus", nombre: "Venus", M: 4.87e24, R: 6.052e6 },
  { id: "tierra", nombre: "Tierra", M: M_TIERRA, R: R_TIERRA },
  { id: "marte", nombre: "Marte", M: 6.42e23, R: 3.39e6 },
  { id: "jupiter", nombre: "Júpiter", M: 1.9e27, R: 6.99e7 },
] as const;

/** Órbita circular alrededor de un astro: velocidad (m/s) y periodo (s) a distancia r del centro. */
export function orbita(M: number, r: number) {
  if (!(r > 0) || !(M > 0)) return { v: NaN, T: NaN };
  const v = Math.sqrt((G_UNIV * M) / r);
  return { v, T: (2 * Math.PI * r) / v };
}
/** Radio de la órbita geoestacionaria (T = 86164 s). */
export const radioGeoestacionario = (): number => Math.cbrt((G_UNIV * M_TIERRA * 86164 ** 2) / (4 * Math.PI ** 2));

export const SATELITES = [
  { nombre: "ISS (estación espacial)", altKm: 408 },
  { nombre: "Satélites de observación", altKm: 800 },
  { nombre: "GPS", altKm: 20200 },
  { nombre: "Geoestacionario", altKm: 35786 },
] as const;

/** Fases de la Luna según su ángulo respecto al Sol visto desde la Tierra (0° = nueva, 180° = llena). */
export function faseLunar(angulo: number): { nombre: string; iluminacion: number; marea: string; eclipse: string } {
  const a = ((angulo % 360) + 360) % 360;
  const iluminacion = (1 - Math.cos((a * Math.PI) / 180)) / 2;
  const cerca = (c: number, tol: number): boolean => Math.min(Math.abs(a - c), 360 - Math.abs(a - c)) <= tol;
  let nombre = "Luna creciente";
  if (cerca(0, 15)) nombre = "Luna nueva";
  else if (cerca(90, 15)) nombre = "Cuarto creciente";
  else if (cerca(180, 15)) nombre = "Luna llena";
  else if (cerca(270, 15)) nombre = "Cuarto menguante";
  else if (a > 180) nombre = "Luna menguante";
  else if (a > 90) nombre = "Gibosa creciente";
  if (a > 180 && a < 270 && nombre === "Luna menguante") nombre = "Gibosa menguante";
  const marea = cerca(0, 25) || cerca(180, 25) ? "mareas vivas (más amplias)" : cerca(90, 25) || cerca(270, 25) ? "mareas muertas (menos amplias)" : "mareas intermedias";
  const eclipse = cerca(0, 3) ? "posible eclipse de Sol (si coincide con el nodo)" : cerca(180, 3) ? "posible eclipse de Luna (si coincide con el nodo)" : "sin eclipses";
  return { nombre, iluminacion, marea, eclipse };
}

/* ───────────── 1. Ley de gravitación universal ───────────── */

export function GravitacionFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { m1: num(block.params?.a, 1, 0.1, 10), m2: num(block.params?.b, 1, 0.1, 10), d: num(block.params?.c, 1, 0.2, 10) };
  const [s, setS] = useState(init);
  const m1 = s.m1 * M_TIERRA;
  const m2 = s.m2 * M_LUNA;
  const d = s.d * D_TIERRA_LUNA;
  const F = fuerzaGravitatoria(m1, m2, d);
  const base = fuerzaGravitatoria(M_TIERRA, M_LUNA, D_TIERRA_LUNA);
  const r1 = 10 + 8 * Math.cbrt(s.m1);
  const r2 = 6 + 8 * Math.cbrt(s.m2);
  const sep = 60 + Math.min(260, s.d * 40);
  const x1 = 260 - sep / 2;
  const x2 = 260 + sep / 2;
  return (
    <Frame
      stacked
      hint={block.hint ?? "F = G·m₁·m₂/d²: proporcional a las masas e inversa al cuadrado de la distancia."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa 1 (en masas terrestres)" value={s.m1} min={0.1} max={10} step={0.1} color={MANIM.blue} format={f1} onChange={(m1v) => setS((o) => ({ ...o, m1: m1v }))} />
          <Slider label="Masa 2 (en masas lunares)" value={s.m2} min={0.1} max={10} step={0.1} color={MANIM.orange} format={f1} onChange={(m2v) => setS((o) => ({ ...o, m2: m2v }))} />
          <Slider label="Distancia (en distancias Tierra-Luna)" value={s.d} min={0.2} max={10} step={0.1} color={MANIM.green} format={f1} onChange={(dv) => setS((o) => ({ ...o, d: dv }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="gravitacion" maxH={130}>
        <Seg a={[x1, 55]} b={[x2, 55]} color={MANIM.muted} width={2} dashed />
        <Dot p={[x1, 55]} r={r1} color={MANIM.blue} />
        <Dot p={[x2, 55]} r={r2} color={MANIM.orange} />
        <text x={x1} y={100} textAnchor="middle" fill={MANIM.blue} fontSize={12}>m₁</text>
        <text x={x2} y={100} textAnchor="middle" fill={MANIM.orange} fontSize={12}>m₂</text>
        <text x={260} y={20} textAnchor="middle" fill={MANIM.green} fontSize={12}>{`d = ${cientifica(d, 2)} m`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Fuerza de atracción F">{`${cientifica(F, 2)} N`}</Stat>
        <Stat color={MANIM.purple} label="Frente a la pareja Tierra-Luna">{`× ${fin(F / base, (v) => (v >= 100 || v < 0.01 ? cientifica(v, 2) : f2(v)))}`}</Stat>
        <Stat color={MANIM.blue} label="Masas">{`${cientifica(m1, 2)} kg · ${cientifica(m2, 2)} kg`}</Stat>
      </Readout>
      <Note>La <b>ley de gravitación universal</b> de Newton: dos cuerpos se atraen con una fuerza <b>F = G·m₁·m₂/d²</b>, con <b>G = 6,674·10⁻¹¹ N·m²/kg²</b>. Es <b>proporcional al producto de las masas</b> y <b>inversamente proporcional al cuadrado de la distancia</b>: al <b>duplicar d</b>, F se divide entre <b>4</b>. Las fuerzas son un <b>par acción-reacción</b>: iguales y opuestas, aunque las aceleraciones difieran por las masas. Solo es apreciable si alguna masa es muy grande (astros). Referencia: Tierra–Luna ≈ 2·10²⁰ N.</Note>
    </Frame>
  );
}

/* ───────────── 2. Gravedad en otros astros ───────────── */

export function GravedadAstrosFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 3, 0, ASTROS.length - 1)), m: Math.round(num(block.params?.a, 60, 1, 150)), h: Math.round(num(block.params?.b, 0, 0, 20000)) };
  const [s, setS] = useState(init);
  const astro = ASTROS[s.i]!;
  const g = gravedad(astro.M, astro.R + s.h * 1000);
  const g0 = gravedad(astro.M, astro.R);
  const gT = gravedad(M_TIERRA, R_TIERRA);
  return (
    <Frame
      stacked
      hint={block.hint ?? "g = G·M/R²: depende de la masa del astro y de su radio, no de la masa del cuerpo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Astro" items={ASTROS.map((a, k) => ({ value: String(k), label: a.nombre }))} value={String(s.i)} onChange={(k) => setS((o) => ({ ...o, i: Number(k) }))} />
          <Slider label="Tu masa" value={s.m} min={1} max={150} step={1} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Altura sobre la superficie" value={s.h} min={0} max={20000} step={500} unit=" km" color={MANIM.orange} onChange={(h) => setS((o) => ({ ...o, h }))} />
        </>
      }
    >
      <Svg w={520} h={120} testId="gravedad-astros" maxH={140}>
        {ASTROS.map((a, k) => {
          const r = 6 + 22 * Math.sqrt(a.R / ASTROS[5]!.R) + (a.id === "jupiter" ? 0 : 6);
          return <Dot key={a.id} p={[50 + k * 84, 60]} r={Math.min(30, r)} color={k === s.i ? MANIM.yellow : MANIM.muted} />;
        })}
        {ASTROS.map((a, k) => <text key={a.id} x={50 + k * 84} y={112} textAnchor="middle" fill={k === s.i ? MANIM.yellow : MANIM.muted} fontSize={11}>{a.nombre}</text>)}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label={`Gravedad a ${s.h} km de la superficie`}>{`${f2(g)} m/s²`}</Stat>
        <Stat color={MANIM.blue} label="Tu peso allí (m·g)">{`${f1(s.m * g)} N`}</Stat>
        <Stat color={MANIM.purple} label="Frente a la Tierra">{`${f2(g0 / gT)} veces (en la superficie)`}</Stat>
        <Stat color={MANIM.green} label="Velocidad de escape">{`${f1(velocidadEscape(astro.M, astro.R) / 1000)} km/s`}</Stat>
      </Readout>
      <Note>La <b>gravedad</b> en un punto es la fuerza por unidad de masa: <b>g = G·M/r²</b>, con r la distancia al centro del astro. En la superficie, r = R. No depende de la masa del cuerpo: <b>todos caen con la misma aceleración</b>. La <b>masa</b> (kg) es la misma en cualquier lugar, pero el <b>peso</b> (P = m·g, en N) cambia: en la Luna pesas unas <b>6 veces menos</b>, en Júpiter unas 2,5 veces más. Al subir, g disminuye con (R + h)². La <b>velocidad de escape</b> √(2·G·M/R) es la necesaria para alejarse sin volver.</Note>
    </Frame>
  );
}

/* ───────────── 3. Órbitas y satélites ───────────── */

export function OrbitasFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { h: Math.round(num(block.params?.a, 408, 200, 40000)), ang: 40 };
  const [s, setS] = useState(init);
  const r = R_TIERRA + s.h * 1000;
  const o = orbita(M_TIERRA, r);
  const rpx = 40 + (r / (R_TIERRA + 40000e3)) * 55;
  const cx = 130;
  const cy = 100;
  const a = (s.ang * Math.PI) / 180;
  const geoH = (radioGeoestacionario() - R_TIERRA) / 1000;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cuanto más alta es la órbita, menor es la velocidad y mayor el periodo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Altura de la órbita" value={s.h} min={200} max={40000} step={100} unit=" km" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Slider label="Posición del satélite" value={s.ang} min={0} max={360} step={5} unit="°" color={MANIM.purple} onChange={(ang) => setS((x) => ({ ...x, ang }))} />
        </>
      }
    >
      <Svg w={520} h={200} testId="orbitas" maxH={220}>
        <circle cx={cx} cy={cy} r={rpx} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 6" />
        <circle cx={cx} cy={cy} r={34} fill={MANIM.blue} fillOpacity={0.8} />
        <Dot p={[cx + rpx * Math.cos(a), cy - rpx * Math.sin(a)]} r={7} color={MANIM.orange} />
        <Seg a={[cx, cy]} b={[cx + rpx * Math.cos(a), cy - rpx * Math.sin(a)]} color={MANIM.muted} width={1.5} />
        {SATELITES.map((sat, k) => (
          <text key={sat.nombre} x={290} y={50 + k * 28} fill={Math.abs(sat.altKm - s.h) < 1500 ? MANIM.yellow : MANIM.muted} fontSize={13}>{`${sat.nombre}: ${fmtEs(sat.altKm, 0)} km`}</text>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Radio de la órbita">{`${fmtEs(r / 1000, 0)} km`}</Stat>
        <Stat color={MANIM.orange} label="Velocidad orbital √(G·M/r)">{`${fin(o.v / 1000, f2)} km/s (${fin(o.v * 3.6, (x) => fmtEs(x, 0))} km/h)`}</Stat>
        <Stat color={MANIM.purple} label="Periodo T = 2π·r/v">{`${fin(o.T / 3600, f2)} h`}</Stat>
        <Stat color={MANIM.green} label="Para ser geoestacionario">{`altura ≈ ${fmtEs(geoH, 0)} km (T = 24 h)`}</Stat>
      </Readout>
      <Note>Un satélite en <b>órbita circular</b> está en <b>caída libre</b> continua: la fuerza gravitatoria hace de <b>fuerza centrípeta</b>. De <b>G·M·m/r² = m·v²/r</b> sale <b>v = √(G·M/r)</b>: no depende de la masa del satélite, y <b>cuanto más alta</b> es la órbita, <b>menos velocidad</b> y <b>más periodo</b>. Un satélite <b>geoestacionario</b> (≈ 35 800 km sobre el ecuador) da una vuelta cada 24 h y parece <b>fijo</b> en el cielo: telecomunicaciones y meteorología. La <b>ISS</b> da una vuelta cada ≈ 1,5 h a ≈ 7,7 km/s. Se supone Tierra esférica y sin atmósfera.</Note>
    </Frame>
  );
}

/* ───────────── 4. Fases de la Luna y mareas ───────────── */

export function FasesLunaresFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 90, 0, 360));
  const [ang, setAng] = useState(init);
  const f = faseLunar(ang);
  const a = (ang * Math.PI) / 180;
  const cx = 300;
  const cy = 100;
  const R = 62;
  const mx = cx - R * Math.cos(a);
  const my = cy + R * Math.sin(a);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La mitad de la Luna que mira al Sol siempre está iluminada; lo que cambia es cuánto vemos de ella."}
      onReset={() => setAng(init)}
      controls={<Slider label="Posición de la Luna en su órbita" value={ang} min={0} max={360} step={5} unit="°" color={MANIM.orange} onChange={setAng} />}
    >
      <Svg w={520} h={200} testId="fases-lunares" maxH={220}>
        {[0, 1, 2, 3, 4].map((k) => <Seg key={k} a={[30, 50 + k * 25]} b={[110, 50 + k * 25]} color={MANIM.yellow} width={2} />)}
        <Dot p={[24, 100]} r={16} color={MANIM.yellow} />
        <text x={24} y={140} textAnchor="middle" fill={MANIM.yellow} fontSize={12}>Sol</text>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="5 5" />
        <Dot p={[cx, cy]} r={16} color={MANIM.blue} />
        <Dot p={[mx, my]} r={9} color={MANIM.ink} />
        <circle cx={430} cy={100} r={34} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={1.5} />
        <path d={`M 430 66 A 34 34 0 0 1 430 134 A ${Math.max(0.01, Math.abs(34 * Math.cos(a)))} 34 0 0 ${Math.cos(a) < 0 ? 1 : 0} 430 66 Z`} fill={MANIM.ink} opacity={f.iluminacion < 0.02 ? 0 : 0.95} transform={ang > 180 ? "rotate(180 430 100)" : undefined} />
        <text x={430} y={152} textAnchor="middle" fill={MANIM.muted} fontSize={12}>vista desde la Tierra</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Fase">{f.nombre}</Stat>
        <Stat color={MANIM.orange} label="Parte visible iluminada">{`${fmtEs(f.iluminacion * 100, 0)} %`}</Stat>
        <Stat color={MANIM.blue} label="Mareas">{f.marea}</Stat>
        <Stat color={MANIM.purple} label="Eclipses">{f.eclipse}</Stat>
      </Readout>
      <Note>La Luna <b>no tiene luz propia</b>: refleja la del Sol, y siempre está iluminada <b>media Luna</b>. Las <b>fases</b> dependen de cuánta parte iluminada vemos desde la Tierra durante su órbita (≈ 29,5 días): <b>nueva → cuarto creciente → llena → cuarto menguante</b>. Las <b>mareas</b> se deben a la diferencia de atracción gravitatoria de la Luna (y del Sol) en distintos puntos de la Tierra: son <b>vivas</b> con luna nueva y llena (Sol y Luna alineados) y <b>muertas</b> en los cuartos. Hay <b>eclipse de Sol</b> si la Luna se interpone con luna nueva, y <b>de Luna</b> si la Tierra tapa al Sol con luna llena; no ocurren cada mes porque la órbita lunar está inclinada ≈ 5° respecto a la de la Tierra. El dibujo no está a escala.</Note>
    </Frame>
  );
}
