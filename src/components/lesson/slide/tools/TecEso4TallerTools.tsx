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

/** Descompone una medida de micrómetro: escala del cilindro (pasos de 0,5 mm) y divisiones del tambor (0,01 mm). */
export function lecturaMicrometro(mm: number) {
  const x = Math.max(0, Math.min(25, mm));
  const escala = Math.floor(x / 0.5 + 1e-9) * 0.5;
  const tambor = Math.round((x - escala) / 0.01);
  return { escala, tambor, total: Math.round((escala + tambor * 0.01) * 100) / 100 };
}

/** Incertidumbre de un polímetro digital: ±(% de la lectura + n dígitos de la última cifra). */
export const errorPolimetro = (lectura: number, pctLectura: number, digitos: number, resolucion: number) => Math.abs(lectura) * (pctLectura / 100) + digitos * resolucion;

export const MAGNITUDES = [
  { n: "Tensión continua", u: "V", pct: 0.5, dig: 2, rangos: [0.2, 2, 20, 200] },
  { n: "Resistencia", u: "kΩ", pct: 1, dig: 2, rangos: [0.2, 2, 20, 200] },
  { n: "Corriente continua", u: "mA", pct: 1.5, dig: 3, rangos: [2, 20, 200] },
];
/** Resolución de un polímetro de 3½ dígitos (máximo 1999) en un rango dado. */
export const resolucionRango = (rango: number) => rango / 2000;

/** Tolerancia acumulada de una cadena de piezas: caso peor (suma) y estadística (raíz de la suma de cuadrados). */
export function apilado(tols: readonly number[]) {
  const peor = tols.reduce((a, b) => a + Math.abs(b), 0);
  const rss = Math.sqrt(tols.reduce((a, b) => a + b * b, 0));
  return { peor, rss };
}

/** Caudal volumétrico de extrusión (mm³/s) = ancho × alto de línea × velocidad. */
export const caudalExtrusion = (anchoMm: number, altoMm: number, velMmS: number) => anchoMm * altoMm * velMmS;
/** Volumen de material (mm³) con una fracción de pared y un relleno (%) del resto. */
export const volumenMaterial = (volPiezaMm3: number, fraccionPared: number, rellenoPct: number) => volPiezaMm3 * (fraccionPared + (1 - fraccionPared) * (rellenoPct / 100));
/** Tiempo estimado (min) de impresión con una eficiencia que incluye desplazamientos y capas. */
export const tiempoImpresion = (volMaterialMm3: number, caudal: number, eficiencia = 0.6) => (caudal > 0 && eficiencia > 0 ? volMaterialMm3 / (caudal * eficiencia) / 60 : Infinity);

/** Ancho de pista de cobre (mm) para una corriente y una elevación de temperatura (IPC-2221, capa externa, cobre de 35 µm). */
export function anchoPista(corrienteA: number, dT = 10, espesorUm = 35) {
  if (corrienteA <= 0 || dT <= 0) return 0;
  const areaMil2 = (corrienteA / (0.048 * dT ** 0.44)) ** (1 / 0.725);
  const espMil = espesorUm / 25.4;
  return (areaMil2 / espMil) * 0.0254;
}
/** Resistencia de una pista de cobre (mΩ): ρ·L/(w·t). */
export const resistenciaPista = (longMm: number, anchoMm: number, espesorUm = 35) => (anchoMm > 0 && espesorUm > 0 ? ((1.72e-5 * longMm) / (anchoMm * (espesorUm / 1000))) : Infinity);

/* ───────────── 1. Micrómetro ───────────── */

export function MicrometroExplorador({ block }: { block: ToolBlock }) {
  const init = { x: num(block.params?.a, 7.38, 0, 25) };
  const [s, setS] = useState(init);
  const l = lecturaMicrometro(s.x);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El micrómetro mide con una resolución de 0,01 mm. La medida es la lectura del cilindro más la del tambor."}
      onReset={() => setS(init)}
      controls={<Slider label="Medida de la pieza" value={s.x} min={0} max={25} step={0.01} unit=" mm" color={MANIM.blue} onChange={(x) => setS({ x })} />}
    >
      <Svg w={520} h={110} testId="micrometro" maxH={130}>
        <line x1={30} y1={50} x2={330} y2={50} stroke={MANIM.muted} strokeWidth={2} />
        {Array.from({ length: 26 }, (_, i) => (
          <line key={i} x1={30 + i * 11.5} y1={50} x2={30 + i * 11.5} y2={i % 2 === 0 ? 34 : 42} stroke={MANIM.muted} strokeWidth={1.5} />
        ))}
        <line x1={30 + (l.escala / 0.5) * 11.5} y1={20} x2={30 + (l.escala / 0.5) * 11.5} y2={60} stroke={MANIM.orange} strokeWidth={3} />
        <rect x={30 + (l.escala / 0.5) * 11.5} y={55} width={150} height={40} rx={6} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={2} />
        <text x={30 + (l.escala / 0.5) * 11.5 + 75} y={80} textAnchor="middle" fill={MANIM.ink} fontSize={13}>
          tambor: {l.tambor} div.
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Lectura del cilindro">{f1(l.escala)} mm</Stat>
        <Stat color={MANIM.blue} label="Lectura del tambor">{l.tambor} × 0,01 = {f2(l.tambor * 0.01)} mm</Stat>
        <Stat color={MANIM.green} label="Medida">{f2(l.total)} mm</Stat>
      </Readout>
      <Note>El micrómetro de tornillo mide con una resolución de 0,01 mm (el pie de rey, 0,05 o 0,02 mm). Cada vuelta del tambor avanza 0,5 mm y tiene 50 divisiones. Se usa para piezas de precisión: se acerca el tope con la <b>carraca</b>, que limita la fuerza, para no deformar la pieza ni falsear la medida.</Note>
    </Frame>
  );
}

/* ───────────── 2. Polímetro: rango y error ───────────── */

export function PolimetroEso4Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, 2)), r: 2, v: 0.005 };
  const [s, setS] = useState(init);
  const M = MAGNITUDES[s.m]!;
  const rango = M.rangos[Math.min(s.r, M.rangos.length - 1)]!;
  const lectura = s.v * M.rangos[M.rangos.length - 1]!;
  const fuera = lectura >= rango;
  const res = resolucionRango(rango);
  const err = errorPolimetro(lectura, M.pct, M.dig, res);
  const rel = lectura > 0 && !fuera ? (err / lectura) * 100 : Infinity;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un polímetro no mide con exactitud: su error depende del rango. Mide siempre con el rango más pequeño que no se sature."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Magnitud" items={MAGNITUDES.map((x, value) => ({ value, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m, r: Math.min(x.r, MAGNITUDES[m]!.rangos.length - 1) }))} />
          <Choice label="Rango" items={M.rangos.map((r, value) => ({ value, label: `${r} ${M.u}` }))} value={Math.min(s.r, M.rangos.length - 1)} onChange={(r) => setS((x) => ({ ...x, r }))} />
          <Slider label="Valor real (fracción del rango máximo)" value={s.v} min={0.0005} max={1} step={0.0005} color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, v }))} />
        </>
      }
    >
      <Readout>
        <Stat color={fuera ? MANIM.red : MANIM.blue} label="Lectura">{fuera ? "fuera de rango (OL)" : `${f3(lectura)} ${M.u}`}</Stat>
        <Stat color={MANIM.orange} label="Error absoluto (±)">{fuera ? "—" : `${f3(err)} ${M.u}`}</Stat>
        <Stat color={rel < 2 ? MANIM.green : rel < 10 ? MANIM.yellow : MANIM.red} label="Error relativo">{Number.isFinite(rel) ? `${f1(rel)} %` : "—"}</Stat>
      </Readout>
      <Note>Error = ±(% de la lectura + n dígitos). Cuando la lectura es pequeña en un rango grande, los «dígitos» pesan mucho y el error relativo se dispara. Por eso se empieza por el rango más alto para no dañar el aparato y se baja hasta el menor que no se desborde. Valores típicos de un polímetro de 3½ dígitos.</Note>
    </Frame>
  );
}

/* ───────────── 3. Acumulación de tolerancias ───────────── */

export function ApiladoExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.n, 4, 2, 8)), t: num(block.params?.a, 0.1, 0.01, 0.5) };
  const [s, setS] = useState(init);
  const tols = Array.from({ length: s.n }, () => s.t);
  const r = apilado(tols);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Varias piezas se montan en fila y cada una tiene su tolerancia. ¿Cuánto varía la longitud total?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Número de piezas en cadena" value={s.n} min={2} max={8} step={1} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Tolerancia de cada pieza (±)" value={s.t} min={0.01} max={0.5} step={0.01} unit=" mm" color={MANIM.orange} onChange={(t) => setS((x) => ({ ...x, t }))} />
        </>
      }
    >
      <Svg w={520} h={100} testId="apilado" maxH={120}>
        {tols.map((_, i) => (
          <rect key={i} x={20 + i * (470 / s.n)} y={35} width={470 / s.n - 4} height={30} rx={3} fill={MANIM.blue} fillOpacity={0.4 + (i % 2) * 0.2} stroke={MANIM.blue} strokeWidth={2} />
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Caso peor (suma)">± {f2(r.peor)} mm</Stat>
        <Stat color={MANIM.green} label="Estadístico (raíz de suma de cuadrados)">± {f2(r.rss)} mm</Stat>
        <Stat color={MANIM.muted} label="Piezas">{s.n}</Stat>
      </Readout>
      <Note>En el <b>caso peor</b> todos los errores van en el mismo sentido y se suman. Estadísticamente es muy poco probable, así que el error típico crece como la raíz de la suma de cuadrados. Un diseñador comprueba con una simulación de tolerancias que el montaje sigue funcionando con el peor caso o con una probabilidad muy alta, y decide dónde exigir más precisión.</Note>
    </Frame>
  );
}

/* ───────────── 4. Parámetros de impresión 3D ───────────── */

export function Impresion3dFlujoExplorador({ block }: { block: ToolBlock }) {
  const init = { alt: 0.2, vel: num(block.params?.a, 50, 10, 150), rel: 20, vol: 30000, ancho: 0.4 };
  const [s, setS] = useState(init);
  const q = caudalExtrusion(s.ancho, s.alt, s.vel);
  const mat = volumenMaterial(s.vol, 0.35, s.rel);
  const t = tiempoImpresion(mat, q);
  const masa = (mat / 1000) * 1.24;
  const capas = Math.ceil(40 / s.alt);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El tiempo de impresión depende del material que hay que depositar y del caudal de la boquilla. Cambia la altura de capa, la velocidad y el relleno."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Altura de capa" value={s.alt} min={0.1} max={0.32} step={0.02} unit=" mm" color={MANIM.blue} onChange={(alt) => setS((x) => ({ ...x, alt }))} />
          <Slider label="Velocidad de impresión" value={s.vel} min={10} max={150} step={5} unit=" mm/s" color={MANIM.orange} onChange={(vel) => setS((x) => ({ ...x, vel }))} />
          <Slider label="Relleno" value={s.rel} min={0} max={100} step={5} unit=" %" color={MANIM.purple} onChange={(rel) => setS((x) => ({ ...x, rel }))} />
          <Slider label="Volumen de la pieza" value={s.vol} min={5000} max={100000} step={5000} unit=" mm³" color={MANIM.green} onChange={(vol) => setS((x) => ({ ...x, vol }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Caudal (ancho·alto·velocidad)">{f1(q)} mm³/s</Stat>
        <Stat color={MANIM.purple} label="Material depositado">{f1(mat / 1000)} cm³ · {f1(masa)} g</Stat>
        <Stat color={MANIM.orange} label="Tiempo estimado">{Number.isFinite(t) ? `${f0(t)} min` : "—"}</Stat>
        <Stat color={MANIM.muted} label="Capas en 40 mm de alto">{capas}</Stat>
      </Readout>
      <Note>Cada capa es una línea de 0,4 mm de ancho; el caudal vale ancho × altura × velocidad. Capas más gruesas o más velocidad reducen el tiempo, pero empeoran el acabado y la resistencia. El <b>relleno</b> es lo que más material consume: 20 % suele bastar. Con la masa (PLA ≈ 1,24 g/cm³) se estima el coste. Estimación orientativa.</Note>
    </Frame>
  );
}

/* ───────────── 5. Ancho de pista en una placa ───────────── */

export function PistaPcbExplorador({ block }: { block: ToolBlock }) {
  const init = { i: num(block.params?.a, 1, 0.1, 10), dT: 10, l: 50 };
  const [s, setS] = useState(init);
  const w = anchoPista(s.i, s.dT);
  const r = resistenciaPista(s.l, w);
  const caida = s.i * r; // V
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una pista de cobre es un conductor: si es muy estrecha para la corriente, se calienta. Calcula su ancho."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Corriente por la pista" value={s.i} min={0.1} max={10} step={0.1} unit=" A" color={MANIM.red} onChange={(i) => setS((x) => ({ ...x, i }))} />
          <Slider label="Calentamiento admitido" value={s.dT} min={5} max={40} step={5} unit=" °C" color={MANIM.orange} onChange={(dT) => setS((x) => ({ ...x, dT }))} />
          <Slider label="Longitud de la pista" value={s.l} min={5} max={200} step={5} unit=" mm" color={MANIM.blue} onChange={(l) => setS((x) => ({ ...x, l }))} />
        </>
      }
    >
      <Svg w={520} h={80} testId="pista" maxH={100}>
        <rect x={30} y={40 - Math.min(30, w * 6) / 2} width={460} height={Math.max(2, Math.min(30, w * 6))} fill={MANIM.orange} fillOpacity={0.7} />
        <text x={260} y={14} textAnchor="middle" fill={MANIM.muted} fontSize={11}>
          pista de cobre de {f2(w)} mm de ancho (dibujo a escala 6:1)
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Ancho mínimo de la pista">{f2(w)} mm</Stat>
        <Stat color={MANIM.blue} label="Resistencia de la pista">{f1(r * 1000)} mΩ</Stat>
        <Stat color={MANIM.purple} label="Caída de tensión">{f1(caida * 1000)} mV</Stat>
      </Readout>
      <Note>Fórmula orientativa IPC-2221 para pistas externas de cobre de 35 µm. Con 1 A se necesitan unos 0,3 mm; con 3 A, unos 1,5 mm. Las pistas de señal pueden ser finas (0,2–0,3 mm); las de alimentación y las de potencia, mucho más anchas. Es mejor ensanchar que arriesgar: una pista fina con mucha corriente se calienta y se puede quemar.</Note>
    </Frame>
  );
}
