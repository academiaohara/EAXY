"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const FASES_VIDA = ["Extracción de materias primas", "Fabricación", "Transporte", "Uso", "Fin de vida"] as const;
/** Reparto orientativo (%) del impacto ambiental por fase en tres productos (datos didácticos aproximados). */
export const PRODUCTOS_VIDA = [
  { n: "Teléfono móvil", total: 60, u: "kg CO₂ eq.", fases: [20, 60, 5, 12, 3], vidaMedia: 3 },
  { n: "Botella de plástico (un uso)", total: 0.2, u: "kg CO₂ eq.", fases: [30, 40, 10, 0, 20], vidaMedia: 1 },
  { n: "Frigorífico", total: 800, u: "kg CO₂ eq.", fases: [10, 15, 2, 70, 3], vidaMedia: 15 },
] as const;

/** Impacto por año de uso al repartir el impacto total entre los años que dura el producto. */
export const impactoAnual = (total: number, anios: number) => (anios > 0 ? total / anios : Infinity);

export const kwhAnual = (watios: number, horasDia: number) => (watios * horasDia * 365) / 1000;
export const costeAnual = (kwh: number, euroKwh: number) => kwh * euroKwh;
export const CO2_KWH = 0.2; // kg de CO₂ por kWh, valor medio orientativo

export const APARATOS_ENERGIA = [
  { n: "Bombilla incandescente 60 W", w: 60, precio: 1 },
  { n: "Bombilla LED 9 W (misma luz)", w: 9, precio: 3 },
  { n: "Televisión antigua 150 W", w: 150, precio: 0 },
  { n: "Televisión LED 50 W", w: 50, precio: 0 },
] as const;

export const FRACCIONES = ["Orgánico", "Envases", "Papel y cartón", "Vidrio", "Resto"] as const;
/** Fracción reciclada (%) dado el peso de cada residuo y el % bien separado de cada uno. */
export function tasaReciclaje(kg: readonly number[], pctBien: readonly number[]) {
  const total = kg.reduce((a, b) => a + b, 0);
  const bien = kg.reduce((a, k, i) => a + (k * pctBien[i]!) / 100, 0);
  return { total, bien, tasa: total > 0 ? (bien / total) * 100 : 0 };
}

export const MANDOS = [
  { n: "Interruptor de la luz", min: 80, max: 120 },
  { n: "Picaporte de una puerta", min: 90, max: 110 },
  { n: "Botón del ascensor", min: 80, max: 120 },
  { n: "Mostrador de atención", min: 70, max: 85 },
] as const;
export const alcanzable = (m: number, alturaCm: number) => alturaCm >= MANDOS[m]!.min && alturaCm <= MANDOS[m]!.max;

export const CALIDADES = [
  { n: "Definición estándar", gbHora: 0.7 },
  { n: "Alta definición (HD)", gbHora: 3 },
  { n: "Ultra alta definición (4K)", gbHora: 7 },
] as const;
export const KWH_POR_GB = 0.05; // estimación muy aproximada de la energía de la red y los centros de datos
/** Datos (GB) y energía (kWh) de ver vídeo durante `dias` días. */
export function energiaVideo(horasDia: number, calidad: number, dispW: number, dias = 30) {
  const horas = horasDia * dias;
  const gb = horas * CALIDADES[calidad]!.gbHora;
  return { gb, kwhRed: gb * KWH_POR_GB, kwhDisp: (horas * dispW) / 1000 };
}

/* ───────────── 1. Fases del ciclo de vida ───────────── */

export function CicloVidaFasesExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.n, 0, 0, PRODUCTOS_VIDA.length - 1)), anios: Math.round(num(block.params?.a, 3, 1, 10)) };
  const [s, setS] = useState(init);
  const P = PRODUCTOS_VIDA[s.p]!;
  const fases: readonly number[] = P.fases;
  const max = Math.max(...fases);
  const peor = fases.indexOf(max);
  const anual = impactoAnual(P.total, s.anios);
  const inicios = fases.map((_, i) => 20 + (fases.slice(0, i).reduce((a, b) => a + b, 0) / 100) * 480);
  const COLS = [MANIM.blue, MANIM.orange, MANIM.purple, MANIM.green, MANIM.red];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un producto y mira en qué fase se concentra su impacto. Después alarga su vida útil y observa el impacto por año. Los datos son aproximados."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Producto" items={PRODUCTOS_VIDA.map((p, value) => ({ value, label: p.n }))} value={s.p} onChange={(p) => setS((v) => ({ ...v, p }))} />
          <Slider label="Años de uso" value={s.anios} min={1} max={20} step={1} unit=" años" color={MANIM.green} onChange={(anios) => setS((v) => ({ ...v, anios }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="ciclo-vida-fases" maxH={120}>
        {fases.map((f, i) => {
          const w = (f / 100) * 480;
          const x = inicios[i]!;
          return (
            <g key={i}>
              <rect x={x} y={20} width={w} height={36} fill={COLS[i]} fillOpacity={i === peor ? 0.85 : 0.45} stroke={COLS[i]} strokeWidth={2} />
              {f >= 8 ? (
                <text x={x + w / 2} y={43} fill={MANIM.ink} fontSize={13} textAnchor="middle" fontWeight={700}>
                  {f} %
                </text>
              ) : null}
            </g>
          );
        })}
        {FASES_VIDA.map((n, i) => (
          <g key={n}>
            <rect x={14 + i * 100} y={76} width={10} height={10} fill={COLS[i]} />
            <text x={28 + i * 100} y={85} fill={MANIM.muted} fontSize={9}>
              {n.split(" ")[0]}
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Fase de mayor impacto">{FASES_VIDA[peor]}</Stat>
        <Stat color={MANIM.blue} label="Impacto total (orient.)">{fmtEs(P.total, 1)} {P.u}</Stat>
        <Stat color={MANIM.green} label={`Por año si dura ${s.anios}`}>{f2(anual)} {P.u}</Stat>
      </Readout>
      <Note>{peor === 3 ? "En este producto la fase de uso es la más pesada: lo que más ayuda es consumir menos energía." : peor === 1 ? "Aquí casi todo el impacto está en fabricarlo: lo mejor es que dure mucho, se repare y se reutilice." : "El impacto está sobre todo en el origen de los materiales y la fabricación: conviene reducir, reutilizar y reciclar."}</Note>
    </Frame>
  );
}

/* ───────────── 2. Etiqueta y consumo energético ───────────── */

export function EtiquetaEnergeticaExplorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.n, 0, 0, APARATOS_ENERGIA.length - 1)), b: Math.round(num(block.params?.a, 1, 0, APARATOS_ENERGIA.length - 1)), h: Math.round(num(block.params?.b, 4, 1, 12)), pr: 20 };
  const [s, setS] = useState(init);
  const A = APARATOS_ENERGIA[s.a]!;
  const B = APARATOS_ENERGIA[s.b]!;
  const kA = kwhAnual(A.w, s.h);
  const kB = kwhAnual(B.w, s.h);
  const ahorro = kA - kB;
  const euro = costeAnual(ahorro, s.pr / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara dos aparatos que hacen lo mismo. Mira cuánta energía y dinero ahorra el más eficiente en un año."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Aparato A" items={APARATOS_ENERGIA.map((a, value) => ({ value, label: a.n }))} value={s.a} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Choice label="Aparato B" items={APARATOS_ENERGIA.map((a, value) => ({ value, label: a.n }))} value={s.b} onChange={(b) => setS((x) => ({ ...x, b }))} />
          <Slider label="Horas de uso al día" value={s.h} min={1} max={12} step={1} unit=" h" color={MANIM.blue} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Slider label="Precio de la energía" value={s.pr} min={5} max={40} step={1} unit=" c€/kWh" color={MANIM.green} onChange={(pr) => setS((x) => ({ ...x, pr }))} />
        </>
      }
    >
      <Svg w={520} h={80} testId="etiqueta-energia" maxH={90}>
        {[kA, kB].map((k, i) => (
          <g key={i}>
            <rect x={120} y={8 + i * 34} width={Math.max(3, (k / Math.max(kA, kB, 1)) * 330)} height={24} rx={3} fill={i === 0 ? MANIM.orange : MANIM.green} fillOpacity={0.6} />
            <text x={10} y={25 + i * 34} fill={MANIM.ink} fontSize={13}>
              Aparato {i === 0 ? "A" : "B"}
            </text>
            <text x={126 + (k / Math.max(kA, kB, 1)) * 330} y={25 + i * 34} fill={MANIM.yellow} fontSize={12}>
              {f1(k)} kWh
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="A: energía al año">{f1(kA)} kWh</Stat>
        <Stat color={MANIM.green} label="B: energía al año">{f1(kB)} kWh</Stat>
        <Stat color={MANIM.yellow} label="Diferencia (A − B)">{f1(ahorro)} kWh · {f2(euro)} €</Stat>
        <Stat color={MANIM.blue} label={`CO₂ de la diferencia (${fmtEs(CO2_KWH, 1)} kg/kWh, orient.)`}>{f1(ahorro * CO2_KWH)} kg</Stat>
      </Readout>
      <Note>Energía anual = potencia (kW) × horas al día × 365. La etiqueta energética clasifica los aparatos de la A (más eficiente) a la G (menos) y muestra su consumo anual. Un aparato eficiente suele costar más al comprarlo, pero se paga con el ahorro en la factura.</Note>
    </Frame>
  );
}

/* ───────────── 3. Residuos del hogar ───────────── */

export function ResiduosHogarExplorador({ block }: { block: ToolBlock }) {
  const init = { kg: [4, 2, 1.5, 1, 3], bien: [60, 70, 80, 90, 100].map((v, i) => (i === 1 ? Math.round(num(block.params?.a, 70, 0, 100)) : v)) };
  const [s, setS] = useState(init);
  const r = tasaReciclaje(s.kg, s.bien);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Indica cuántos kilos de cada residuo genera tu hogar a la semana y qué porcentaje separas bien. Mira el porcentaje que se recicla de verdad."}
      onReset={() => setS(init)}
      controls={
        <>
          {FRACCIONES.map((f, i) => (
            <Slider key={f} label={`${f} (bien separado)`} value={s.bien[i]!} min={0} max={100} step={5} unit=" %" color={MANIM.green} disabled={i === 4} onChange={(v) => setS((x) => ({ ...x, bien: x.bien.map((o, k) => (k === i ? v : o)) }))} />
          ))}
        </>
      }
    >
      <Svg w={520} h={150} testId="residuos-hogar" maxH={160}>
        {FRACCIONES.map((f, i) => (
          <g key={f}>
            <text x={10} y={20 + i * 28} fill={MANIM.ink} fontSize={12}>
              {f} ({fmtEs(s.kg[i]!, 1)} kg)
            </text>
            <rect x={170} y={6 + i * 28} width={(s.kg[i]! / 5) * 300} height={20} fill={MANIM.muted} fillOpacity={0.3} />
            <rect x={170} y={6 + i * 28} width={((s.kg[i]! * s.bien[i]!) / 100 / 5) * 300} height={20} fill={MANIM.green} fillOpacity={0.7} />
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Residuos a la semana">{f1(r.total)} kg</Stat>
        <Stat color={MANIM.green} label="Bien separados">{f1(r.bien)} kg</Stat>
        <Stat color={MANIM.yellow} label="Porcentaje bien gestionado">{fmtEs(r.tasa, 0)} %</Stat>
      </Readout>
      <Note>Un envase en el contenedor equivocado puede estropear toda una partida. Por eso importa separar bien: aclarar los envases, plegar el cartón y llevar al punto limpio lo que no es de la basura habitual (pilas, aceite, electrónica).</Note>
    </Frame>
  );
}

/* ───────────── 4. Diseño accesible: alturas de alcance ───────────── */

export function DisenoUniversalExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, MANDOS.length - 1)), h: Math.round(num(block.params?.a, 150, 40, 200)) };
  const [s, setS] = useState(init);
  const M = MANDOS[s.m]!;
  const ok = alcanzable(s.m, s.h);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Coloca cada mando a una altura y comprueba si lo alcanza una persona sentada y una persona baja. Los rangos son orientativos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Elemento" items={MANDOS.map((m, value) => ({ value, label: m.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Altura sobre el suelo" value={s.h} min={40} max={200} step={5} unit=" cm" color={MANIM.blue} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Svg w={520} h={220} testId="alcance" maxH={230}>
        <line x1={40} y1={200} x2={480} y2={200} stroke={MANIM.muted} strokeWidth={3} />
        <rect x={60} y={200 - M.max * 1.0} width={70} height={(M.max - M.min) * 1.0} fill={MANIM.green} fillOpacity={0.2} stroke={MANIM.green} strokeWidth={2} strokeDasharray="5 4" />
        <text x={140} y={200 - (M.min + M.max) / 2} fill={MANIM.green} fontSize={12}>
          zona recomendada {M.min}–{M.max} cm
        </text>
        <rect x={380} y={200 - s.h - 6} width={40} height={12} rx={3} fill={ok ? MANIM.green : MANIM.red} />
        <text x={430} y={200 - s.h + 4} fill={ok ? MANIM.green : MANIM.red} fontSize={13} fontWeight={700}>
          {s.h} cm
        </text>
      </Svg>
      <Readout>
        <Stat color={ok ? MANIM.green : MANIM.red} label="¿Alcance cómodo para todas las personas?">{ok ? "Sí" : s.h > M.max ? "No: demasiado alto" : "No: demasiado bajo"}</Stat>
        <Stat color={MANIM.blue} label="Rango recomendado">{M.min}–{M.max} cm</Stat>
      </Readout>
      <Note>El diseño universal busca que un producto o espacio lo usen personas muy distintas sin adaptaciones. Los mandos situados a una altura cómoda benefician a quien va en silla de ruedas, a la infancia, a las personas mayores y a cualquiera con las manos ocupadas.</Note>
    </Frame>
  );
}

/* ───────────── 5. Huella digital: ver vídeo ───────────── */

export function HuellaDigitalExplorador({ block }: { block: ToolBlock }) {
  const init = { h: Math.round(num(block.params?.a, 2, 0, 8) * 2) / 2, q: Math.round(num(block.params?.n, 1, 0, 2)), d: 0 };
  const [s, setS] = useState(init);
  const DISP = [{ n: "Móvil (5 W)", w: 5 }, { n: "Portátil (50 W)", w: 50 }, { n: "Televisión (100 W)", w: 100 }];
  const r = energiaVideo(s.h, s.q, DISP[s.d]!.w);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Calcula el consumo de ver vídeo en streaming: los datos que se descargan y la energía del dispositivo. Son estimaciones muy aproximadas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Horas de vídeo al día" value={s.h} min={0} max={8} step={0.5} unit=" h" color={MANIM.blue} format={(v) => fmtEs(v, 1)} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Choice label="Calidad" items={CALIDADES.map((c, value) => ({ value, label: c.n }))} value={s.q} onChange={(q) => setS((x) => ({ ...x, q }))} />
          <Choice label="Dispositivo" items={DISP.map((d, value) => ({ value, label: d.n }))} value={s.d} onChange={(d) => setS((x) => ({ ...x, d }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Datos al mes">{f1(r.gb)} GB</Stat>
        <Stat color={MANIM.orange} label="Energía de la red y los servidores (aprox.)">{f1(r.kwhRed)} kWh</Stat>
        <Stat color={MANIM.green} label="Energía del dispositivo">{f1(r.kwhDisp)} kWh</Stat>
        <Stat color={MANIM.yellow} label="CO₂ total al mes (orient.)">{f1((r.kwhRed + r.kwhDisp) * CO2_KWH)} kg</Stat>
      </Readout>
      <Note>Cada hora de vídeo mueve datos por la red y por centros de datos que consumen electricidad. Reducir la calidad cuando no hace falta (HD en un móvil es suficiente), descargar en vez de repetir y usar wifi en lugar de datos móviles son hábitos fáciles. Los números exactos varían mucho según el país y la tecnología.</Note>
    </Frame>
  );
}
