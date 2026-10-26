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

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Potencia pico (W) de un campo fotovoltaico: área × 1 000 W/m² × rendimiento. */
export const potenciaPico = (areaM2: number, rendPct: number) => areaM2 * 1000 * (rendPct / 100);

/** Energía diaria (kWh) = potencia pico (kW) × horas de sol pico × rendimiento de la instalación (por defecto 0,8). */
export const energiaDiariaFv = (wp: number, hsp: number, perf = 0.8) => (wp / 1000) * hsp * perf;

/** Años que tarda una inversión en recuperarse con un ahorro anual. */
export const amortizacion = (inversion: number, ahorroAnual: number) => (ahorroAnual > 0 ? inversion / ahorroAnual : Infinity);

/** Potencia (W) que extrae un aerogenerador: ½·ρ·A·v³·Cp. */
export function potenciaEolica(radioM: number, vMs: number, cp = 0.4, rho = 1.225) {
  const area = Math.PI * radioM * radioM;
  return 0.5 * rho * area * vMs ** 3 * cp;
}

/** Cada material aislante: conductividad térmica λ (W/m·K). */
export const AISLANTES = [
  { n: "Sin aislante", lambda: 0 },
  { n: "Lana de roca", lambda: 0.04 },
  { n: "Poliestireno", lambda: 0.035 },
  { n: "Corcho", lambda: 0.045 },
];

/** Transmitancia U (W/m²·K) de un muro de ladrillo (R = 0,3 m²K/W) con aislante de espesor e (cm). */
export function transmitancia(lambda: number, espesorCm: number, rBase = 0.3) {
  const r = rBase + (lambda > 0 ? espesorCm / 100 / lambda : 0);
  return 1 / r;
}

/** Potencia perdida por un cerramiento (W): U · A · ΔT. */
export const perdidaEnvolvente = (u: number, areaM2: number, dT: number) => u * areaM2 * dT;

export const TRANSPORTES = [
  { n: "Avión", g: 250 },
  { n: "Coche (1 persona)", g: 170 },
  { n: "Coche (4 personas)", g: 43 },
  { n: "Autobús", g: 70 },
  { n: "Tren", g: 30 },
  { n: "Bicicleta o a pie", g: 0 },
];

/** Emisiones (kg de CO₂) de un trayecto de ida y vuelta, por persona. */
export const emisionesTrayecto = (gPorKm: number, km: number, viajes: number) => (gPorKm * km * 2 * viajes) / 1000;

/** Árboles que absorben, aprox., esas emisiones en un año (cada árbol ≈ 22 kg CO₂/año). */
export const arbolesEquivalentes = (kgCO2: number) => kgCO2 / 22;

/* ───────────── 1. Solar fotovoltaica ───────────── */

export function SolarFvExplorador({ block }: { block: ToolBlock }) {
  const init = { a: num(block.params?.a, 10, 1, 40), r: 20, h: 5, pr: 0.15, inv: 6000 };
  const [s, setS] = useState(init);
  const wp = potenciaPico(s.a, s.r);
  const kwhDia = energiaDiariaFv(wp, s.h);
  const kwhAnio = kwhDia * 365;
  const ahorro = kwhAnio * s.pr;
  const anios = amortizacion(s.inv, ahorro);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige la superficie de paneles y las horas de sol de tu zona. Mira la energía que produce y en cuántos años se recupera la inversión."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Superficie de paneles" value={s.a} min={1} max={40} step={1} unit=" m²" color={MANIM.blue} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Slider label="Rendimiento del panel" value={s.r} min={10} max={25} step={1} unit=" %" color={MANIM.orange} onChange={(r) => setS((x) => ({ ...x, r }))} />
          <Slider label="Horas de sol pico al día" value={s.h} min={2} max={7} step={0.5} unit=" h" color={MANIM.yellow} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Slider label="Electricidad" value={s.pr} min={0.05} max={0.4} step={0.01} unit=" €/kWh" color={MANIM.purple} onChange={(pr) => setS((x) => ({ ...x, pr }))} />
          <Slider label="Coste de la instalación" value={s.inv} min={1000} max={15000} step={500} unit=" €" color={MANIM.green} onChange={(inv) => setS((x) => ({ ...x, inv }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Potencia pico">{f1(wp / 1000)} kW</Stat>
        <Stat color={MANIM.yellow} label="Energía al día">{f1(kwhDia)} kWh</Stat>
        <Stat color={MANIM.orange} label="Energía al año">{f0(kwhAnio)} kWh</Stat>
        <Stat color={MANIM.green} label="Ahorro anual">{f0(ahorro)} €</Stat>
        <Stat color={MANIM.purple} label="Amortización">{Number.isFinite(anios) ? `${f1(anios)} años` : "—"}</Stat>
      </Readout>
      <Note>Un panel recibe unos 1 000 W/m² con pleno sol y transforma una parte (su rendimiento). Las <b>horas de sol pico</b> resumen cuánto sol hay en un día medio. Se aplica además un 80 % por pérdidas del inversor y los cables. En Asturias hay unas 3 horas de sol pico de media y en el sur de España unas 5. Valores orientativos.</Note>
    </Frame>
  );
}

/* ───────────── 2. Eólica ───────────── */

export function EolicaExplorador({ block }: { block: ToolBlock }) {
  const init = { v: num(block.params?.a, 8, 2, 25), r: 40 };
  const [s, setS] = useState(init);
  const p = potenciaEolica(s.r, s.v);
  const mwh = (p * 8760 * 0.3) / 1e6;
  const hogares = (mwh * 1000) / 3500;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la velocidad del viento y el tamaño de las palas. La potencia depende del cubo de la velocidad."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad del viento" value={s.v} min={2} max={25} step={0.5} unit=" m/s" color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Longitud de las palas" value={s.r} min={5} max={80} step={1} unit=" m" color={MANIM.orange} onChange={(r) => setS((x) => ({ ...x, r }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="eolica" maxH={160}>
        <line x1={260} y1={140} x2={260} y2={70} stroke={MANIM.muted} strokeWidth={6} />
        {[0, 120, 240].map((a) => (
          <line key={a} x1={260} y1={70} x2={260 + Math.sin(((a + s.v * 12) * Math.PI) / 180) * (15 + s.r * 0.7)} y2={70 - Math.cos(((a + s.v * 12) * Math.PI) / 180) * (15 + s.r * 0.7)} stroke={MANIM.blue} strokeWidth={5} strokeLinecap="round" />
        ))}
        <circle cx={260} cy={70} r={6} fill={MANIM.ink} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Potencia en este momento">{f2(p / 1e6)} MW</Stat>
        <Stat color={MANIM.orange} label="Energía anual (factor de carga ≈ 30 %)">{f0(mwh)} MWh</Stat>
        <Stat color={MANIM.green} label="Hogares abastecidos (3 500 kWh/año cada uno)">{f0(hogares)}</Stat>
      </Readout>
      <Note>P = ½·ρ·A·v³·Cp. La potencia crece con el <b>cubo</b> de la velocidad: duplicar el viento multiplica por 8, y por eso los aerogeneradores se sitúan en lugares ventosos. Ten en cuenta que el viento no es constante: por eso se usa el factor de carga.</Note>
    </Frame>
  );
}

/* ───────────── 3. Aislamiento: arquitectura bioclimática ───────────── */

export function AislamientoExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 1, 0, 3)), e: Math.round(num(block.params?.a, 8, 0, 20)), dT: 15, A: 60 };
  const [s, setS] = useState(init);
  const L = AISLANTES[s.m]!;
  const u0 = transmitancia(0, 0);
  const u = transmitancia(L.lambda, s.e);
  const w0 = perdidaEnvolvente(u0, s.A, s.dT);
  const w = perdidaEnvolvente(u, s.A, s.dT);
  const ahorro = w0 > 0 ? (1 - w / w0) * 100 : 0;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un aislante y su espesor. Compara las pérdidas de calor del muro con y sin aislamiento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Aislante" items={AISLANTES.map((x, value) => ({ value, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Espesor" value={s.e} min={0} max={20} step={1} unit=" cm" color={MANIM.blue} onChange={(e) => setS((x) => ({ ...x, e }))} />
          <Slider label="Superficie de muro" value={s.A} min={10} max={150} step={5} unit=" m²" color={MANIM.orange} onChange={(A) => setS((x) => ({ ...x, A }))} />
          <Slider label="Diferencia de temperatura dentro-fuera" value={s.dT} min={0} max={30} step={1} unit=" °C" color={MANIM.red} onChange={(dT) => setS((x) => ({ ...x, dT }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.muted} label="Pérdida sin aislar">{f0(w0)} W</Stat>
        <Stat color={MANIM.orange} label="Pérdida con tu aislante">{f0(w)} W</Stat>
        <Stat color={MANIM.green} label="Reducción">{f0(ahorro)} %</Stat>
        <Stat color={MANIM.blue} label="Transmitancia U">{f2(u)} W/m²·K</Stat>
      </Readout>
      <Note>Las pérdidas valen U·A·ΔT. Un aislante añade una resistencia térmica e/λ al muro: cuanto más <b>grueso</b> y de menor <b>conductividad</b>, menos calor se escapa. Las primeras capas son las más rentables. Valores orientativos de un muro de ladrillo de 0,3 m²K/W.</Note>
    </Frame>
  );
}

/* ───────────── 4. Transporte ───────────── */

export function TransporteCo2Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 1, 0, 5)), km: num(block.params?.a, 15, 1, 100), v: 5 };
  const [s, setS] = useState(init);
  const T = TRANSPORTES[s.m]!;
  const kg = emisionesTrayecto(T.g, s.km, s.v * 4 * 11);
  const arboles = arbolesEquivalentes(kg);
  const max = Math.max(...TRANSPORTES.map((t) => t.g), 1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige cómo te desplazas, la distancia y los viajes por semana. Compara las emisiones de CO₂ al año."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Medio de transporte" items={TRANSPORTES.map((x, value) => ({ value, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Distancia de ida" value={s.km} min={1} max={100} step={1} unit=" km" color={MANIM.blue} onChange={(km) => setS((x) => ({ ...x, km }))} />
          <Slider label="Viajes de ida y vuelta por semana" value={s.v} min={1} max={10} step={1} color={MANIM.orange} onChange={(v) => setS((x) => ({ ...x, v }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="transporte" maxH={170}>
        {TRANSPORTES.map((t, i) => (
          <g key={t.n}>
            <rect x={150} y={8 + i * 23} width={Math.max(2, (t.g / max) * 330)} height={17} rx={3} fill={i === s.m ? MANIM.orange : MANIM.blue} fillOpacity={i === s.m ? 0.9 : 0.35} />
            <text x={145} y={21 + i * 23} fill={i === s.m ? MANIM.ink : MANIM.muted} fontSize={11} textAnchor="end">
              {t.n}
            </text>
            <text x={155 + (t.g / max) * 330} y={21 + i * 23} fill={MANIM.muted} fontSize={11}>
              {t.g} g/km
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Emisiones al año (44 semanas)">{f0(kg)} kg CO₂</Stat>
        <Stat color={MANIM.green} label="Árboles que lo absorben en un año">{f1(arboles)}</Stat>
      </Readout>
      <Note>Las emisiones son por persona y kilómetro (valores medios orientativos). Compartir coche, usar transporte público o ir a pie o en bici reduce mucho el impacto. Un coche con cuatro personas emite por persona la cuarta parte que con una sola.</Note>
    </Frame>
  );
}

/* ───────────── 5. Central hidráulica ───────────── */

/** Potencia (W) de una central: ρ·g·Q·H·η con Q en m³/s y H en m. */
export const potenciaHidraulica = (caudal: number, salto: number, rend = 0.85) => 1000 * 9.81 * caudal * salto * rend;

export function HidraulicaExplorador({ block }: { block: ToolBlock }) {
  const init = { q: num(block.params?.a, 10, 1, 100), h: num(block.params?.b, 50, 5, 300) };
  const [s, setS] = useState(init);
  const p = potenciaHidraulica(s.q, s.h);
  const mwh = (p * 8760 * 0.4) / 1e6;
  const alto = 20 + (s.h / 300) * 90;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el caudal de agua y la altura del salto. La potencia es proporcional a los dos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Caudal turbinado" value={s.q} min={1} max={100} step={1} unit=" m³/s" color={MANIM.blue} onChange={(q) => setS((x) => ({ ...x, q }))} />
          <Slider label="Altura del salto" value={s.h} min={5} max={300} step={5} unit=" m" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="hidraulica" maxH={160}>
        <rect x={60} y={140 - alto} width={150} height={alto} fill={MANIM.blue} fillOpacity={0.45} stroke={MANIM.blue} strokeWidth={2} />
        <line x1={210} y1={140 - alto} x2={330} y2={135} stroke={MANIM.blue} strokeWidth={4 + s.q / 10} />
        <circle cx={350} cy={130} r={14} fill={MANIM.yellow} />
        <text x={350} y={134} textAnchor="middle" fontSize={11} fill="#000">
          T
        </text>
        <text x={135} y={133} fill={MANIM.ink} fontSize={12} textAnchor="middle">
          embalse
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Potencia">{f1(p / 1e6)} MW</Stat>
        <Stat color={MANIM.green} label="Energía al año (funcionando el 40 % del tiempo)">{f0(mwh)} MWh</Stat>
      </Readout>
      <Note>P = ρ·g·Q·H·η: el agua (1 000 kg/m³) que cae desde una altura H con un caudal Q cede energía a la turbina. El rendimiento de una central moderna ronda el 85 %. A igual caudal, un salto doble da el doble de potencia.</Note>
    </Frame>
  );
}
