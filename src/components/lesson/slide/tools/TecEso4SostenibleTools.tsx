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

/** Factores de emisión orientativos (kg CO₂ por unidad). */
export const FACTORES = { electricidad: 0.2, gas: 0.2, coche: 0.17, avion: 0.25 } as const;

/** Huella anual de un hogar en toneladas de CO₂. */
export function huellaAnual(elecKwh: number, gasKwh: number, cocheKm: number, avionKm: number) {
  const kg = elecKwh * FACTORES.electricidad + gasKwh * FACTORES.gas + cocheKm * FACTORES.coche + avionKm * FACTORES.avion;
  return kg / 1000;
}
export const arbolesNecesarios = (tCO2: number) => (tCO2 * 1000) / 22;

const DEMANDA_H = [0.3, 0.25, 0.25, 0.25, 0.3, 0.5, 0.9, 1.0, 0.7, 0.5, 0.5, 0.6, 0.8, 0.7, 0.5, 0.5, 0.6, 0.9, 1.3, 1.6, 1.5, 1.2, 0.8, 0.5];
const SOL_H = Array.from({ length: 24 }, (_, h) => Math.max(0, Math.sin((Math.PI * (h - 6)) / 12)));

/** Simula un día de una vivienda con paneles y batería; devuelve el aprovechamiento de la energía solar. */
export function simulaDia(potPicoKw: number, consumoDiaKwh: number, bateriaKwh: number, horasSolPico = 5) {
  const sumaSol = SOL_H.reduce((a, b) => a + b, 0);
  const sumaDem = DEMANDA_H.reduce((a, b) => a + b, 0);
  const gen = SOL_H.map((s) => (s / sumaSol) * potPicoKw * horasSolPico * 0.8);
  const dem = DEMANDA_H.map((d) => (d / sumaDem) * consumoDiaKwh);
  let carga = 0;
  let directo = 0;
  let desdeBateria = 0;
  let red = 0;
  let vertido = 0;
  const bat: number[] = [];
  for (let h = 0; h < 24; h++) {
    const d = Math.min(gen[h]!, dem[h]!);
    directo += d;
    let exceso = gen[h]! - d;
    let falta = dem[h]! - d;
    const cargar = Math.min(exceso, bateriaKwh - carga);
    carga += cargar;
    exceso -= cargar;
    vertido += exceso;
    const descargar = Math.min(falta, carga);
    carga -= descargar;
    desdeBateria += descargar;
    falta -= descargar;
    red += falta;
    bat.push(carga);
  }
  const totGen = gen.reduce((a, b) => a + b, 0);
  const totDem = dem.reduce((a, b) => a + b, 0);
  return {
    gen, dem, bat, red, vertido,
    autoconsumo: totGen > 0 ? ((directo + desdeBateria) / totGen) * 100 : 0,
    cobertura: totDem > 0 ? ((directo + desdeBateria) / totDem) * 100 : 0,
    totGen, totDem,
  };
}

/** Letra de eficiencia energética (escala orientativa) según kWh por m² y año. */
export function letraEnergetica(kwhM2: number) {
  const limites: [string, number][] = [["A", 40], ["B", 65], ["C", 100], ["D", 150], ["E", 220], ["F", 300]];
  for (const [l, m] of limites) if (kwhM2 <= m) return l;
  return "G";
}
export const GENERADORES = [
  { n: "Caldera de gas antigua", rend: 0.75 },
  { n: "Caldera de condensación", rend: 1.05 },
  { n: "Bomba de calor (COP 3,5)", rend: 3.5 },
];
/** Consumo final (kWh/m²·año) tras reducir la demanda con aislamiento y usar un generador de cierto rendimiento. */
export const consumoFinal = (demandaKwhM2: number, reduccionPct: number, rend: number) => (rend > 0 ? (demandaKwhM2 * (1 - reduccionPct / 100)) / rend : Infinity);

/** Impacto anual repartido en los años de uso. */
export const impactoAnual = (impactoFab: number, anios: number) => (anios > 0 ? impactoFab / anios : Infinity);
/** Compara reparar un aparato con comprar uno nuevo (coste y CO₂ por año de uso). */
export function reparar_vs_nuevo(costeRep: number, costeNuevo: number, aniosExtra: number, aniosNuevo: number, co2Fab: number) {
  const repAnio = aniosExtra > 0 ? costeRep / aniosExtra : Infinity;
  const nuevoAnio = aniosNuevo > 0 ? costeNuevo / aniosNuevo : Infinity;
  const co2Rep = aniosExtra > 0 ? (0.1 * co2Fab) / aniosExtra : Infinity;
  const co2Nuevo = impactoAnual(co2Fab, aniosNuevo);
  return { repAnio, nuevoAnio, co2Rep, co2Nuevo, convieneReparar: repAnio < nuevoAnio && co2Rep < co2Nuevo };
}

/** Pendiente máxima (%) de una rampa accesible según su longitud (m). */
export const pendienteMaxima = (longitudM: number) => (longitudM < 3 ? 10 : longitudM < 6 ? 8 : 6);
export const pendienteRampa = (alturaCm: number, longitudM: number) => (longitudM > 0 ? (alturaCm / (longitudM * 100)) * 100 : Infinity);
/** Luminancia relativa de un gris (0–255) y contraste WCAG entre dos grises. */
export function luminanciaGris(c: number) {
  const v = Math.max(0, Math.min(255, c)) / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}
export function contraste(c1: number, c2: number) {
  const a = luminanciaGris(c1);
  const b = luminanciaGris(c2);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

/* ───────────── 1. Huella de carbono del hogar ───────────── */

export function HuellaHogarExplorador({ block }: { block: ToolBlock }) {
  const init = { e: num(block.params?.a, 3000, 0, 8000), g: 6000, c: 10000, v: 2000, p: 3 };
  const [s, setS] = useState(init);
  const t = huellaAnual(s.e, s.g, s.c, s.v);
  const pp = t / Math.max(1, s.p);
  const partes = [
    { n: "Electricidad", v: (s.e * FACTORES.electricidad) / 1000, c: MANIM.yellow },
    { n: "Gas", v: (s.g * FACTORES.gas) / 1000, c: MANIM.orange },
    { n: "Coche", v: (s.c * FACTORES.coche) / 1000, c: MANIM.blue },
    { n: "Avión", v: (s.v * FACTORES.avion) / 1000, c: MANIM.purple },
  ];
  const max = Math.max(...partes.map((p) => p.v), 0.1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Calcula las emisiones anuales de un hogar. La mayor parte suele venir del transporte y la calefacción."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Electricidad" value={s.e} min={0} max={8000} step={100} unit=" kWh" color={MANIM.yellow} onChange={(e) => setS((x) => ({ ...x, e }))} />
          <Slider label="Gas natural" value={s.g} min={0} max={15000} step={500} unit=" kWh" color={MANIM.orange} onChange={(g) => setS((x) => ({ ...x, g }))} />
          <Slider label="Coche" value={s.c} min={0} max={30000} step={500} unit=" km" color={MANIM.blue} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Slider label="Vuelos" value={s.v} min={0} max={20000} step={500} unit=" km" color={MANIM.purple} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Personas del hogar" value={s.p} min={1} max={6} step={1} color={MANIM.green} onChange={(p) => setS((x) => ({ ...x, p }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="huella-hogar" maxH={150}>
        {partes.map((p, i) => (
          <g key={p.n}>
            <rect x={30 + i * 120} y={105 - (p.v / max) * 85} width={90} height={(p.v / max) * 85} rx={4} fill={p.c} fillOpacity={0.7} />
            <text x={75 + i * 120} y={98 - (p.v / max) * 85} textAnchor="middle" fill={MANIM.ink} fontSize={11} fontWeight={700}>
              {f2(p.v)} t
            </text>
            <text x={75 + i * 120} y={122} textAnchor="middle" fill={MANIM.muted} fontSize={11}>
              {p.n}
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Emisiones del hogar">{f1(t)} t CO₂/año</Stat>
        <Stat color={pp <= 2 ? MANIM.green : MANIM.red} label="Por persona">{f1(pp)} t/año</Stat>
        <Stat color={MANIM.green} label="Árboles para absorberlas">{f0(arbolesNecesarios(t))}</Stat>
      </Readout>
      <Note>Factores orientativos: 0,2 kg CO₂ por kWh de electricidad o gas, 0,17 kg por km en coche y 0,25 kg por km en avión. Para frenar el cambio climático se necesita bajar a unas <b>2 t por persona y año</b>. Cambiar el coche por transporte público, aislar la vivienda o usar electricidad renovable son las medidas que más pesan.</Note>
    </Frame>
  );
}

/* ───────────── 2. Autoconsumo con batería ───────────── */

export function AutoconsumoExplorador({ block }: { block: ToolBlock }) {
  const init = { p: num(block.params?.a, 3, 0, 8), c: 10, b: 0 };
  const [s, setS] = useState(init);
  const r = simulaDia(s.p, s.c, s.b);
  const max = Math.max(...r.gen, ...r.dem, 0.1);
  const X = (h: number) => 24 + h * 19.5;
  const Y = (v: number) => 115 - (v / max) * 95;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un día en una vivienda con paneles solares. Añade una batería y observa cuánta energía solar se aprovecha."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Potencia de paneles" value={s.p} min={0} max={8} step={0.5} unit=" kWp" color={MANIM.yellow} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Slider label="Consumo diario" value={s.c} min={3} max={25} step={1} unit=" kWh" color={MANIM.blue} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Slider label="Batería" value={s.b} min={0} max={15} step={1} unit=" kWh" color={MANIM.green} onChange={(b) => setS((x) => ({ ...x, b }))} />
        </>
      }
    >
      <Svg w={520} h={140} testId="autoconsumo" maxH={160}>
        <polyline points={r.gen.map((v, h) => `${X(h)},${Y(v)}`).join(" ")} fill="none" stroke={MANIM.yellow} strokeWidth={2.5} />
        <polyline points={r.dem.map((v, h) => `${X(h)},${Y(v)}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={2.5} />
        <text x={30} y={14} fill={MANIM.yellow} fontSize={11}>
          producción solar
        </text>
        <text x={150} y={14} fill={MANIM.blue} fontSize={11}>
          consumo
        </text>
        <text x={24} y={132} fill={MANIM.muted} fontSize={10}>
          0 h
        </text>
        <text x={490} y={132} fill={MANIM.muted} fontSize={10} textAnchor="end">
          24 h
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Producción del día">{f1(r.totGen)} kWh</Stat>
        <Stat color={MANIM.green} label="Solar aprovechada en casa">{f0(r.autoconsumo)} %</Stat>
        <Stat color={MANIM.blue} label="Consumo cubierto con solar">{f0(r.cobertura)} %</Stat>
        <Stat color={MANIM.red} label="Comprado a la red">{f1(r.red)} kWh</Stat>
        <Stat color={MANIM.muted} label="Excedente vertido">{f1(r.vertido)} kWh</Stat>
      </Readout>
      <Note>El sol produce al mediodía, pero el mayor consumo es por la tarde y la noche. La <b>batería</b> guarda el excedente y lo devuelve cuando hace falta, de modo que aumenta la parte de la energía solar que se usa en casa. Más paneles sin batería aumentan el excedente, pero no tanto el autoconsumo. Simulación orientativa con un perfil de consumo típico.</Note>
    </Frame>
  );
}

/* ───────────── 3. Certificado energético ───────────── */

export function CertificadoExplorador({ block }: { block: ToolBlock }) {
  const init = { d: num(block.params?.a, 160, 40, 300), red: 0, g: 0 };
  const [s, setS] = useState(init);
  const G = GENERADORES[s.g]!;
  const c = consumoFinal(s.d, s.red, G.rend);
  const letra = letraEnergetica(c);
  const col = "AB".includes(letra) ? MANIM.green : "CD".includes(letra) ? MANIM.yellow : MANIM.red;
  const base = letraEnergetica(consumoFinal(s.d, 0, GENERADORES[0]!.rend));
  return (
    <Frame
      stacked
      hint={block.hint ?? "La etiqueta energética de una vivienda depende de lo que necesita (demanda) y de lo eficiente que es el sistema que lo cubre."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Demanda de calefacción" value={s.d} min={40} max={300} step={10} unit=" kWh/m²" color={MANIM.orange} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Reducción por aislamiento" value={s.red} min={0} max={70} step={5} unit=" %" color={MANIM.blue} onChange={(red) => setS((x) => ({ ...x, red }))} />
          <Choice label="Sistema de calefacción" items={GENERADORES.map((x, value) => ({ value, label: x.n }))} value={s.g} onChange={(g) => setS((x) => ({ ...x, g }))} />
        </>
      }
    >
      <Readout>
        <Stat color={col} label="Calificación">{letra}</Stat>
        <Stat color={MANIM.orange} label="Consumo final">{f0(c)} kWh/m²·año</Stat>
        <Stat color={MANIM.muted} label="Calificación de partida">{base}</Stat>
        <Stat color={MANIM.green} label="Ahorro de energía">{f0((1 - c / consumoFinal(s.d, 0, GENERADORES[0]!.rend)) * 100)} %</Stat>
      </Readout>
      <Note>Consumo = demanda × (1 − reducción) / rendimiento. Aislar reduce la demanda y una <b>bomba de calor</b> entrega 3 o 4 kWh de calor por cada kWh eléctrico, por eso mejora mucho la etiqueta. Primero se reduce la demanda (aislar) y después se mejora el sistema. La escala de letras usada aquí es orientativa.</Note>
    </Frame>
  );
}

/* ───────────── 4. Reparar o reemplazar ───────────── */

export function RepararExplorador({ block }: { block: ToolBlock }) {
  const init = { rep: num(block.params?.a, 60, 0, 300), nuevo: 400, ex: 4, an: 8, co2: 300 };
  const [s, setS] = useState(init);
  const r = reparar_vs_nuevo(s.rep, s.nuevo, s.ex, s.an, s.co2);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un electrodoméstico se avería. Compara el coste y el CO₂ por año de uso de repararlo o de comprar uno nuevo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Coste de la reparación" value={s.rep} min={0} max={300} step={10} unit=" €" color={MANIM.orange} onChange={(rep) => setS((x) => ({ ...x, rep }))} />
          <Slider label="Años extra que da la reparación" value={s.ex} min={1} max={10} step={1} color={MANIM.green} onChange={(ex) => setS((x) => ({ ...x, ex }))} />
          <Slider label="Precio del aparato nuevo" value={s.nuevo} min={50} max={1500} step={50} unit=" €" color={MANIM.blue} onChange={(nuevo) => setS((x) => ({ ...x, nuevo }))} />
          <Slider label="Vida del aparato nuevo" value={s.an} min={2} max={15} step={1} color={MANIM.purple} onChange={(an) => setS((x) => ({ ...x, an }))} />
          <Slider label="CO₂ de fabricar uno nuevo" value={s.co2} min={50} max={1000} step={50} unit=" kg" color={MANIM.red} onChange={(co2) => setS((x) => ({ ...x, co2 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Reparar: coste por año">{f0(r.repAnio)} €</Stat>
        <Stat color={MANIM.blue} label="Nuevo: coste por año">{f0(r.nuevoAnio)} €</Stat>
        <Stat color={MANIM.orange} label="Reparar: CO₂ por año">{f1(r.co2Rep)} kg</Stat>
        <Stat color={MANIM.blue} label="Nuevo: CO₂ por año">{f1(r.co2Nuevo)} kg</Stat>
        <Stat color={r.convieneReparar ? MANIM.green : MANIM.yellow} label="Conclusión">{r.convieneReparar ? "conviene reparar" : "conviene valorar cambiarlo"}</Stat>
      </Readout>
      <Note>Alargar la vida útil de un producto reparte su impacto de fabricación en más años. Reparar (impacto estimado del 10 % del de fabricar) suele ser más barato y más limpio, salvo que cueste casi como uno nuevo o que el aparato nuevo consuma mucha menos energía en uso. <b>Economía circular</b>: reducir, reutilizar, reparar y reciclar, por este orden.</Note>
    </Frame>
  );
}

/* ───────────── 5. Accesibilidad ───────────── */

export function AccesibilidadExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), h: 30, l: 4, t: 60, f: 245 };
  const [s, setS] = useState(init);
  const pend = pendienteRampa(s.h, s.l);
  const max = pendienteMaxima(s.l);
  const cc = contraste(s.t, s.f);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos comprobaciones de accesibilidad: la pendiente de una rampa y el contraste entre el texto y el fondo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Comprobación" items={[{ value: 0, label: "Rampa de acceso" }, { value: 1, label: "Contraste de una pantalla" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          {s.modo === 0 ? (
            <>
              <Slider label="Desnivel que salvar" value={s.h} min={5} max={100} step={5} unit=" cm" color={MANIM.blue} onChange={(h) => setS((x) => ({ ...x, h }))} />
              <Slider label="Longitud de la rampa" value={s.l} min={1} max={12} step={0.5} unit=" m" color={MANIM.orange} onChange={(l) => setS((x) => ({ ...x, l }))} />
            </>
          ) : (
            <>
              <Slider label="Gris del texto (0 negro – 255 blanco)" value={s.t} min={0} max={255} step={5} color={MANIM.purple} onChange={(t) => setS((x) => ({ ...x, t }))} />
              <Slider label="Gris del fondo" value={s.f} min={0} max={255} step={5} color={MANIM.yellow} onChange={(f) => setS((x) => ({ ...x, f }))} />
            </>
          )}
        </>
      }
    >
      {s.modo === 0 ? (
        <Readout>
          <Stat color={MANIM.blue} label="Pendiente">{Number.isFinite(pend) ? `${f1(pend)} %` : "—"}</Stat>
          <Stat color={MANIM.muted} label="Máxima admitida para esta longitud">{max} %</Stat>
          <Stat color={pend <= max ? MANIM.green : MANIM.red} label="Resultado">{pend <= max ? "accesible" : "demasiado empinada"}</Stat>
        </Readout>
      ) : (
        <>
          <div className="rounded-lg px-4 py-3 text-lg font-bold" style={{ background: `rgb(${s.f},${s.f},${s.f})`, color: `rgb(${s.t},${s.t},${s.t})` }} data-testid="muestra-contraste">
            Texto de ejemplo en la pantalla
          </div>
          <Readout>
            <Stat color={MANIM.blue} label="Contraste">{f1(cc)} : 1</Stat>
            <Stat color={cc >= 4.5 ? MANIM.green : MANIM.red} label="Nivel AA (texto normal ≥ 4,5)">{cc >= 7 ? "AAA" : cc >= 4.5 ? "AA, cumple" : "no cumple"}</Stat>
          </Readout>
        </>
      )}
      <Note>Una rampa accesible tiene una pendiente máxima del 10 % si mide menos de 3 m, 8 % hasta 6 m y 6 % si es más larga. Para textos, el contraste mínimo recomendado es de <b>4,5 : 1</b> (nivel AA de las pautas WCAG). El <b>diseño universal</b> busca productos y entornos utilizables por todas las personas, sin adaptaciones especiales.</Note>
    </Frame>
  );
}
