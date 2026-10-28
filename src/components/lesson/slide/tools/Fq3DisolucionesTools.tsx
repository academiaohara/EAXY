"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { masaMolecular } from "@/components/lesson/slide/tools/Fq2AtomoTools";
import { SALES, solubilidad, type Sal } from "@/components/lesson/slide/tools/Fq2MezclasTools";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const SOLUTOS = [
  { nombre: "Sal común (NaCl)", formula: "NaCl" },
  { nombre: "Glucosa (C₆H₁₂O₆)", formula: "C6H12O6" },
] as const;

/** g/L: masa de soluto (g) entre volumen de disolución (mL). */
export const gPorLitro = (masaG: number, volMl: number): number => (volMl > 0 ? (masaG / volMl) * 1000 : NaN);
/** Porcentaje masa/volumen: g de soluto por cada 100 mL de disolución. */
export const porcentajeMasaVolumen = (masaG: number, volMl: number): number => (volMl > 0 ? (100 * masaG) / volMl : NaN);
/** Porcentaje en volumen: mL de soluto por cada 100 mL de disolución. */
export const porcentajeVolumen = (volSolutoMl: number, volDisolucionMl: number): number => (volDisolucionMl > 0 ? (100 * volSolutoMl) / volDisolucionMl : NaN);
/** Porcentaje en masa: g de soluto por cada 100 g de disolución. */
export const porcentajeEnMasa = (masaSoluto: number, masaDisolucion: number): number => (masaDisolucion > 0 ? (100 * masaSoluto) / masaDisolucion : NaN);
/** Molaridad: moles de soluto por litro de disolución. */
export const molaridad = (masaG: number, masaMolar: number, volMl: number): number => (masaMolar > 0 && volMl > 0 ? masaG / masaMolar / (volMl / 1000) : NaN);

/** Gramos de sal que precipitan al enfriar una disolución con `gDisueltos` g por 100 g de agua hasta T (°C). */
export const precipitado = (sal: Sal, gDisueltos: number, T: number): number => Math.max(0, gDisueltos - solubilidad(sal, T));

/** Concentración tras diluir: C₁·V₁ = C₂·V₂. */
export const concentracionDiluida = (c1: number, v1: number, v2: number): number => (v2 > 0 ? (c1 * v1) / v2 : NaN);
/** Volumen de disolución concentrada que hay que coger para preparar v2 a concentración c2: V₁ = C₂·V₂ / C₁. */
export const volumenAlicuota = (c1: number, c2: number, v2: number): number => (c1 > 0 ? (c2 * v2) / c1 : NaN);

export type Mezcla3 = { id: string; nombre: string; componentes: string[]; pasos: { tecnica: string; accion: string; resto: string }[] };
export const MEZCLAS_SEPARACION: Mezcla3[] = [
  {
    id: "arena-sal", nombre: "Arena, sal y agua", componentes: ["arena", "sal", "agua"],
    pasos: [
      { tecnica: "Filtración", accion: "El filtro retiene la arena (sólido insoluble)", resto: "agua con sal (disolución)" },
      { tecnica: "Evaporación", accion: "Se calienta hasta que el agua se evapora", resto: "queda la sal" },
    ],
  },
  {
    id: "agua-aceite-hierro", nombre: "Agua, aceite y limaduras de hierro", componentes: ["agua", "aceite", "hierro"],
    pasos: [
      { tecnica: "Separación magnética", accion: "Un imán retira el hierro", resto: "agua y aceite" },
      { tecnica: "Decantación", accion: "El embudo de decantación separa el líquido menos denso (aceite) del agua", resto: "aceite y agua por separado" },
    ],
  },
  {
    id: "agua-alcohol", nombre: "Agua y alcohol (disolución)", componentes: ["agua", "alcohol"],
    pasos: [
      { tecnica: "Destilación", accion: "El alcohol hierve antes (78 °C) y se recoge al condensar", resto: "agua en el matraz; alcohol en el destilado" },
    ],
  },
  {
    id: "tinta", nombre: "Pigmentos de una tinta", componentes: ["pigmentos"],
    pasos: [
      { tecnica: "Cromatografía", accion: "Cada pigmento sube por el papel a distinta velocidad", resto: "manchas de colores separadas" },
    ],
  },
];

/* ───────────── 1. Formas de expresar la concentración ───────────── */

export function ConcentracionesFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { s: Math.round(num(block.params?.n, 0, 0, SOLUTOS.length - 1)), m: num(block.params?.a, 10, 1, 100), v: num(block.params?.b, 250, 50, 1000) };
  const [st, setSt] = useState(init);
  const soluto = SOLUTOS[st.s]!;
  const M = masaMolecular(soluto.formula);
  const nivel = Math.min(1, st.m / st.v / 0.15);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La misma disolución se puede expresar de varias formas: g/L, % masa/volumen y molaridad."}
      onReset={() => setSt(init)}
      controls={
        <>
          <Choice label="Soluto" items={SOLUTOS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(st.s)} onChange={(k) => setSt((o) => ({ ...o, s: Number(k) }))} />
          <Slider label="Masa de soluto" value={st.m} min={1} max={100} step={1} unit=" g" color={MANIM.orange} onChange={(m) => setSt((o) => ({ ...o, m }))} />
          <Slider label="Volumen de disolución" value={st.v} min={50} max={1000} step={50} unit=" mL" color={MANIM.blue} onChange={(v) => setSt((o) => ({ ...o, v }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="concentraciones" maxH={170}>
        <path d="M 230 15 L 230 125 Q 230 135 240 135 L 290 135 Q 300 135 300 125 L 300 15" fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <rect x={232} y={30} width={66} height={103} fill={MANIM.blue} fillOpacity={0.25 + nivel * 0.55} />
        <text x={150} y={80} textAnchor="end" fill={MANIM.orange} fontSize={13} fontWeight={700}>{`${st.m} g de soluto`}</text>
        <text x={320} y={80} fill={MANIM.blue} fontSize={13} fontWeight={700}>{`${st.v} mL de disolución`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Concentración (g/L)">{`${f1(gPorLitro(st.m, st.v))} g/L`}</Stat>
        <Stat color={MANIM.green} label="% masa/volumen">{`${f2(porcentajeMasaVolumen(st.m, st.v))} g/100 mL`}</Stat>
        <Stat color={MANIM.purple} label={`Molaridad (M = ${f1(M)} g/mol)`}>{`${f2(molaridad(st.m, M, st.v))} mol/L`}</Stat>
      </Readout>
      <Note>La <b>concentración</b> mide cuánto <b>soluto</b> hay en una cantidad de disolución. Formas habituales: <b>g/L</b> (gramos de soluto por litro de disolución), <b>% masa/volumen</b> (g de soluto en 100 mL), <b>% en masa</b> (g de soluto en 100 g de disolución), <b>% en volumen</b> (mL de soluto en 100 mL, típico de bebidas alcohólicas) y <b>molaridad</b> (moles de soluto por litro, M = n / V). Ojo: el volumen es el de la <b>disolución</b>, no el del disolvente. Masas molares con valores redondeados.</Note>
    </Frame>
  );
}

/* ───────────── 2. Cristalización por enfriamiento ───────────── */

export function CristalizacionFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { sal: (num(block.params?.n, 0, 0, 1) >= 0.5 ? "cloruro" : "nitrato") as Sal, g: num(block.params?.a, 60, 10, 120), T: Math.round(num(block.params?.b, 60, 0, 100)) };
  const [s, setS] = useState(init);
  const solT = solubilidad(s.sal, s.T);
  const prec = precipitado(s.sal, s.g, s.T);
  const estado = s.g < solT ? "insaturada" : s.g === solT ? "saturada" : "sobresaturada";
  const X = (t: number): number => 50 + (t / 100) * 420;
  const Y = (g: number): number => 150 - (g / 250) * 130;
  const pts = SALES[s.sal].puntos.map(([t, g]) => `${X(t)},${Y(g)}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Si enfrías una disolución por debajo de su temperatura de saturación, el exceso de soluto cristaliza."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Sal" items={(Object.keys(SALES) as Sal[]).map((k) => ({ value: k, label: SALES[k].nombre }))} value={s.sal} onChange={(sal) => setS((o) => ({ ...o, sal: sal as Sal }))} />
          <Slider label="Sal disuelta en 100 g de agua" value={s.g} min={10} max={120} step={5} unit=" g" color={MANIM.orange} onChange={(g) => setS((o) => ({ ...o, g }))} />
          <Slider label="Temperatura final" value={s.T} min={0} max={100} step={5} unit=" °C" color={MANIM.red} onChange={(T) => setS((o) => ({ ...o, T }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="cristalizacion" maxH={205}>
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 15]} color={MANIM.ink} width={2} />
        <polyline points={pts} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <Seg a={[50, Y(Math.min(250, s.g))]} b={[480, Y(Math.min(250, s.g))]} color={MANIM.orange} width={1.5} dashed />
        <text x={56} y={Y(Math.min(250, s.g)) - 5} fill={MANIM.orange} fontSize={11}>{`disuelto: ${s.g} g`}</text>
        <circle cx={X(s.T)} cy={Y(Math.min(250, solT))} r={6} fill={MANIM.red} />
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={12}>temperatura (°C)</text>
        <text x={58} y={14} fill={MANIM.muted} fontSize={12}>g de sal / 100 g de agua</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label={`Solubilidad a ${s.T} °C`}>{`${f1(solT)} g / 100 g`}</Stat>
        <Stat color={MANIM.purple} label="Estado">{estado}</Stat>
        <Stat color={MANIM.green} label="Sal que cristaliza">{`${f1(prec)} g`}</Stat>
      </Readout>
      <Note>La <b>solubilidad</b> es la cantidad máxima de soluto que se disuelve en 100 g de disolvente a una temperatura dada. En la mayoría de las sales <b>aumenta con la temperatura</b>: si se enfría una disolución concentrada, el <b>exceso</b> (lo disuelto menos la solubilidad a la nueva temperatura) <b>cristaliza</b>. Así se obtienen cristales de sal. En el cloruro de sodio la solubilidad casi no cambia con la temperatura, por eso para obtener sal se <b>evapora</b> el agua. Los datos de la gráfica son <b>aproximados</b> (tabla interpolada).</Note>
    </Frame>
  );
}

/* ───────────── 3. Diluciones ───────────── */

export function DilucionFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { c1: num(block.params?.a, 100, 10, 200), v1: num(block.params?.b, 50, 10, 200), v2: num(block.params?.c, 200, 50, 1000) };
  const [s, setS] = useState(init);
  const v2 = Math.max(s.v2, s.v1);
  const c2 = concentracionDiluida(s.c1, s.v1, v2);
  const hv = (v: number): number => 14 + v * 0.1;
  const ancho = (c: number): number => 0.2 + 0.7 * Math.min(1, c / 200);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Al añadir disolvente, el soluto es el mismo pero el volumen aumenta: la concentración disminuye."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Concentración inicial" value={s.c1} min={10} max={200} step={10} unit=" g/L" color={MANIM.orange} onChange={(c1) => setS((o) => ({ ...o, c1 }))} />
          <Slider label="Volumen que tomas" value={s.v1} min={10} max={200} step={10} unit=" mL" color={MANIM.blue} onChange={(v1) => setS((o) => ({ ...o, v1 }))} />
          <Slider label="Volumen final (con agua)" value={s.v2} min={50} max={1000} step={50} unit=" mL" color={MANIM.purple} onChange={(v2n) => setS((o) => ({ ...o, v2: v2n }))} />
        </>
      }
    >
      <Svg w={520} h={160} testId="dilucion" maxH={180}>
        <rect x={90} y={125 - hv(s.v1)} width={60} height={hv(s.v1)} fill={MANIM.orange} fillOpacity={ancho(s.c1)} stroke={MANIM.ink} strokeWidth={2} />
        <text x={120} y={146} textAnchor="middle" fill={MANIM.ink} fontSize={12}>{`${f1(s.c1)} g/L · ${f1(s.v1)} mL`}</text>
        <text x={220} y={95} textAnchor="middle" fill={MANIM.ink} fontSize={20}>+ agua →</text>
        <rect x={300} y={125 - hv(v2)} width={90} height={hv(v2)} fill={MANIM.orange} fillOpacity={ancho(c2)} stroke={MANIM.ink} strokeWidth={2} />
        <text x={345} y={146} textAnchor="middle" fill={MANIM.ink} fontSize={12}>{`${f1(c2)} g/L · ${f1(v2)} mL`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Soluto (no cambia)">{`${f2((s.c1 * s.v1) / 1000)} g`}</Stat>
        <Stat color={MANIM.purple} label="Agua que se añade">{`${f1(v2 - s.v1)} mL`}</Stat>
        <Stat color={MANIM.green} label="Concentración final">{`${f1(c2)} g/L`}</Stat>
        <Stat color={MANIM.blue} label="Factor de dilución">{`÷ ${f2(s.c1 / c2)}`}</Stat>
      </Readout>
      <Note>Al <b>diluir</b>, la cantidad de <b>soluto no cambia</b>: C₁ · V₁ = C₂ · V₂. Si el volumen se multiplica por 4, la concentración se divide entre 4. Para <b>preparar una disolución</b> a partir de un sólido: se pesa el soluto en la <b>balanza</b>, se disuelve en algo de agua en un <b>vaso</b>, se pasa a un <b>matraz aforado</b> y se <b>enrasa</b> con agua hasta la marca. Para diluir una disolución se toma un volumen con una <b>pipeta</b> y se enrasa. (Los dibujos no están a escala.)</Note>
    </Frame>
  );
}

/* ───────────── 4. Separación en varias etapas ───────────── */

export function SeparacionEtapasFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, MEZCLAS_SEPARACION.length - 1)), p: 0 };
  const [s, setS] = useState(init);
  const mezcla = MEZCLAS_SEPARACION[s.m]!;
  const paso = Math.min(s.p, mezcla.pasos.length);
  const actual = paso === 0 ? null : mezcla.pasos[paso - 1]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Se elige la técnica según la propiedad que distingue a los componentes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Mezcla" items={MEZCLAS_SEPARACION.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.m)} onChange={(k) => setS({ m: Number(k), p: 0 })} />
          <Slider label="Etapa del proceso" value={paso} min={0} max={mezcla.pasos.length} step={1} color={MANIM.green} format={(v) => (v === 0 ? "mezcla inicial" : `etapa ${v}`)} onChange={(p) => setS((o) => ({ ...o, p }))} />
        </>
      }
    >
      <Svg w={520} h={100} testId="separacion-etapas" maxH={120}>
        <text x={260} y={36} textAnchor="middle" fill={MANIM.yellow} fontSize={18} fontWeight={700}>{actual ? actual.tecnica : "Mezcla inicial"}</text>
        <text x={260} y={70} textAnchor="middle" fill={MANIM.ink} fontSize={13}>{actual ? actual.accion : mezcla.componentes.join(" + ")}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Componentes">{mezcla.componentes.join(", ")}</Stat>
        <Stat color={MANIM.green} label="Resultado">{actual ? actual.resto : "todos mezclados"}</Stat>
      </Readout>
      <Note>Las mezclas complejas se separan <b>por etapas</b>, eligiendo en cada una la técnica que aprovecha una <b>propiedad distinta</b> de los componentes: <b>filtración</b> (sólido insoluble frente a líquido), <b>decantación</b> (líquidos inmiscibles de distinta densidad), <b>separación magnética</b> (materiales que atrae un imán), <b>evaporación</b> o <b>cristalización</b> (soluto sólido disuelto), <b>destilación</b> (líquidos con distinto punto de ebullición) y <b>cromatografía</b> (distinta velocidad sobre un soporte). El orden importa: por ejemplo, primero se filtra y después se evapora.</Note>
    </Frame>
  );
}
