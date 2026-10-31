"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Datos y cálculos (se comprueban en los tests) ───────────── */

export type CompIonico = { id: string; formula: string; q1: number; q2: number; r1: number; r2: number; U: number; Tf: number };
export const COMPUESTOS: CompIonico[] = [
  { id: "LiF", formula: "LiF", q1: 1, q2: 1, r1: 76, r2: 133, U: 1036, Tf: 845 },
  { id: "NaF", formula: "NaF", q1: 1, q2: 1, r1: 102, r2: 133, U: 923, Tf: 993 },
  { id: "NaCl", formula: "NaCl", q1: 1, q2: 1, r1: 102, r2: 181, U: 787, Tf: 801 },
  { id: "NaBr", formula: "NaBr", q1: 1, q2: 1, r1: 102, r2: 196, U: 747, Tf: 747 },
  { id: "NaI", formula: "NaI", q1: 1, q2: 1, r1: 102, r2: 220, U: 704, Tf: 661 },
  { id: "KCl", formula: "KCl", q1: 1, q2: 1, r1: 138, r2: 181, U: 715, Tf: 770 },
  { id: "CsCl", formula: "CsCl", q1: 1, q2: 1, r1: 167, r2: 181, U: 657, Tf: 645 },
  { id: "CaO", formula: "CaO", q1: 2, q2: 2, r1: 100, r2: 140, U: 3401, Tf: 2613 },
  { id: "MgO", formula: "MgO", q1: 2, q2: 2, r1: 72, r2: 140, U: 3791, Tf: 2852 },
];
/** Índice de la energía reticular según Coulomb: |q₁·q₂|/(r₁ + r₂) (r en pm). Proporcional a U. */
export const indiceCoulomb = (q1: number, q2: number, r1: number, r2: number): number => (r1 + r2 > 0 ? (Math.abs(q1 * q2) / (r1 + r2)) * 1000 : NaN);
/** Fuerza de Coulomb relativa entre dos iones separados d (pm) respecto a otra distancia: F ∝ q₁q₂/d². */
export const fuerzaRelativa = (q1: number, q2: number, d: number, dRef = 276): number => (d > 0 ? (Math.abs(q1 * q2) / (d * d)) / (1 / (dRef * dRef)) : NaN);

export const VALENCIA: Record<string, number> = { H: 1, Be: 2, B: 3, C: 4, N: 5, O: 6, F: 7, P: 5, S: 6, Cl: 7, Br: 7, I: 7, Xe: 8, Si: 4, Al: 3 };
export type Molecula = { formula: string; nombre: string; atomos: Record<string, number>; carga: number; enlaces: number; ab: string; geometria: string };
/** Enlaces: suma de los órdenes de enlace (pares compartidos). */
export const MOLECULAS: Molecula[] = [
  { formula: "H₂O", nombre: "agua", atomos: { H: 2, O: 1 }, carga: 0, enlaces: 2, ab: "AX₂E₂", geometria: "angular" },
  { formula: "NH₃", nombre: "amoníaco", atomos: { N: 1, H: 3 }, carga: 0, enlaces: 3, ab: "AX₃E", geometria: "piramidal trigonal" },
  { formula: "CH₄", nombre: "metano", atomos: { C: 1, H: 4 }, carga: 0, enlaces: 4, ab: "AX₄", geometria: "tetraédrica" },
  { formula: "CO₂", nombre: "dióxido de carbono", atomos: { C: 1, O: 2 }, carga: 0, enlaces: 4, ab: "AX₂", geometria: "lineal" },
  { formula: "N₂", nombre: "nitrógeno", atomos: { N: 2 }, carga: 0, enlaces: 3, ab: "—", geometria: "lineal (diatómica)" },
  { formula: "O₂", nombre: "oxígeno", atomos: { O: 2 }, carga: 0, enlaces: 2, ab: "—", geometria: "lineal (diatómica)" },
  { formula: "HCl", nombre: "cloruro de hidrógeno", atomos: { H: 1, Cl: 1 }, carga: 0, enlaces: 1, ab: "—", geometria: "lineal (diatómica)" },
  { formula: "HCN", nombre: "cianuro de hidrógeno", atomos: { H: 1, C: 1, N: 1 }, carga: 0, enlaces: 4, ab: "AX₂", geometria: "lineal" },
  { formula: "C₂H₄", nombre: "eteno", atomos: { C: 2, H: 4 }, carga: 0, enlaces: 6, ab: "AX₃ (cada C)", geometria: "plana" },
  { formula: "C₂H₂", nombre: "etino", atomos: { C: 2, H: 2 }, carga: 0, enlaces: 5, ab: "AX₂ (cada C)", geometria: "lineal" },
  { formula: "SO₂", nombre: "dióxido de azufre", atomos: { S: 1, O: 2 }, carga: 0, enlaces: 3, ab: "AX₂E", geometria: "angular" },
  { formula: "NH₄⁺", nombre: "ion amonio", atomos: { N: 1, H: 4 }, carga: 1, enlaces: 4, ab: "AX₄", geometria: "tetraédrica" },
  { formula: "BF₃", nombre: "trifluoruro de boro", atomos: { B: 1, F: 3 }, carga: 0, enlaces: 3, ab: "AX₃", geometria: "trigonal plana" },
  { formula: "PCl₅", nombre: "pentacloruro de fósforo", atomos: { P: 1, Cl: 5 }, carga: 0, enlaces: 5, ab: "AX₅", geometria: "bipirámide trigonal" },
  { formula: "SF₆", nombre: "hexafluoruro de azufre", atomos: { S: 1, F: 6 }, carga: 0, enlaces: 6, ab: "AX₆", geometria: "octaédrica" },
];
/** Electrones de valencia totales de una molécula o ion. */
export function electronesTotales(m: Molecula): number {
  return Object.entries(m.atomos).reduce((s, [a, n]) => s + (VALENCIA[a] ?? 0) * n, 0) - m.carga;
}
/** Pares compartidos (suma de órdenes de enlace) y pares solitarios totales. */
export function paresLewis(m: Molecula): { enlazantes: number; solitarios: number } {
  const E = electronesTotales(m);
  return { enlazantes: m.enlaces, solitarios: (E - 2 * m.enlaces) / 2 };
}
/** Electrones alrededor de un átomo al contar los pares compartidos como propios (octeto). */
export const regla = (enlaces: number, solitarios: number): number => 2 * enlaces + 2 * solitarios;

export type Geom = { nombre: string; ang: string; hib: string; ejemplo: string; polar: boolean | null };
const GEOM: Record<string, Geom> = {
  "2,0": { nombre: "lineal", ang: "180°", hib: "sp", ejemplo: "CO₂, BeCl₂", polar: false },
  "3,0": { nombre: "trigonal plana", ang: "120°", hib: "sp²", ejemplo: "BF₃, SO₃", polar: false },
  "2,1": { nombre: "angular", ang: "≈ 119° (< 120°)", hib: "sp²", ejemplo: "SO₂, O₃", polar: true },
  "4,0": { nombre: "tetraédrica", ang: "109,5°", hib: "sp³", ejemplo: "CH₄, CCl₄", polar: false },
  "3,1": { nombre: "piramidal trigonal", ang: "≈ 107°", hib: "sp³", ejemplo: "NH₃, PCl₃", polar: true },
  "2,2": { nombre: "angular", ang: "≈ 104,5°", hib: "sp³", ejemplo: "H₂O, H₂S", polar: true },
  "1,3": { nombre: "lineal (diatómica)", ang: "—", hib: "sp³", ejemplo: "HF", polar: true },
  "5,0": { nombre: "bipirámide trigonal", ang: "90° y 120°", hib: "sp³d", ejemplo: "PCl₅", polar: false },
  "4,1": { nombre: "balancín (tetraedro distorsionado)", ang: "≈ 90° y 120°", hib: "sp³d", ejemplo: "SF₄", polar: true },
  "3,2": { nombre: "forma de T", ang: "≈ 90°", hib: "sp³d", ejemplo: "ClF₃", polar: true },
  "2,3": { nombre: "lineal", ang: "180°", hib: "sp³d", ejemplo: "XeF₂, I₃⁻", polar: false },
  "6,0": { nombre: "octaédrica", ang: "90°", hib: "sp³d²", ejemplo: "SF₆", polar: false },
  "5,1": { nombre: "pirámide cuadrada", ang: "≈ 90°", hib: "sp³d²", ejemplo: "BrF₅", polar: true },
  "4,2": { nombre: "plana cuadrada", ang: "90°", hib: "sp³d²", ejemplo: "XeF₄", polar: false },
};
/** Geometría según la teoría RPECV para n pares enlazantes (X) y m pares solitarios (E) alrededor del átomo central. */
export function geometriaRPECV(n: number, m: number): Geom | null {
  return GEOM[`${Math.round(n)},${Math.round(m)}`] ?? null;
}
/** Dominios de electrones y forma de la distribución electrónica. */
export function distribucionElectronica(dominios: number): string {
  return ({ 2: "lineal", 3: "trigonal plana", 4: "tetraédrica", 5: "bipirámide trigonal", 6: "octaédrica" } as Record<number, string>)[dominios] ?? "—";
}
/** Polaridad de la molécula: apolar si es simétrica y todos los terminales son iguales; los enlaces se suponen polares. */
export function polaridadMolecular(n: number, m: number, terminalesIguales: boolean, enlacesPolares: boolean): "polar" | "apolar" | null {
  const g = geometriaRPECV(n, m);
  if (!g) return null;
  if (!enlacesPolares) return "apolar";
  if (g.polar === false && terminalesIguales) return "apolar";
  return "polar";
}

export const SERIES_EB = [
  { id: "g14", nombre: "Hidruros del grupo 14", tipo: "London", datos: [{ f: "CH₄", T: 112 }, { f: "SiH₄", T: 161 }, { f: "GeH₄", T: 185 }, { f: "SnH₄", T: 221 }] },
  { id: "g15", nombre: "Hidruros del grupo 15", tipo: "enlace de H en el NH₃", datos: [{ f: "NH₃", T: 240 }, { f: "PH₃", T: 185 }, { f: "AsH₃", T: 218 }, { f: "SbH₃", T: 255 }] },
  { id: "g16", nombre: "Hidruros del grupo 16", tipo: "enlace de H en el H₂O", datos: [{ f: "H₂O", T: 373 }, { f: "H₂S", T: 213 }, { f: "H₂Se", T: 232 }, { f: "H₂Te", T: 271 }] },
  { id: "g17", nombre: "Hidruros del grupo 17", tipo: "enlace de H en el HF", datos: [{ f: "HF", T: 293 }, { f: "HCl", T: 188 }, { f: "HBr", T: 207 }, { f: "HI", T: 238 }] },
  { id: "nobles", nombre: "Gases nobles", tipo: "solo London", datos: [{ f: "He", T: 4 }, { f: "Ne", T: 27 }, { f: "Ar", T: 87 }, { f: "Kr", T: 120 }, { f: "Xe", T: 165 }] },
  { id: "halog", nombre: "Halógenos (X₂)", tipo: "solo London", datos: [{ f: "F₂", T: 85 }, { f: "Cl₂", T: 239 }, { f: "Br₂", T: 332 }, { f: "I₂", T: 457 }] },
] as const;
/** Una serie presenta anomalía si su primer término tiene mayor punto de ebullición que el segundo (enlace de hidrógeno). */
export const hayAnomalia = (datos: readonly { f: string; T: number }[]): boolean => datos.length > 1 && datos[0]!.T > datos[1]!.T;

export type Sustancia = { id: string; nombre: string; formula: string; tipo: "iónica" | "covalente reticular" | "covalente molecular" | "metálica"; Tf: number; solido: string; liquido: string; solubilidad: string; dureza: string; explicacion: string };
export const SUSTANCIAS: Sustancia[] = [
  { id: "nacl", nombre: "Cloruro de sodio", formula: "NaCl", tipo: "iónica", Tf: 801, solido: "no conduce", liquido: "conduce (iones móviles)", solubilidad: "soluble en agua", dureza: "duro y frágil", explicacion: "Red de iones con fuerte atracción electrostática: alta T de fusión; frágil porque al desplazarse una capa se enfrentan iones de igual carga." },
  { id: "mgo", nombre: "Óxido de magnesio", formula: "MgO", tipo: "iónica", Tf: 2852, solido: "no conduce", liquido: "conduce", solubilidad: "muy poco soluble", dureza: "muy duro", explicacion: "Cargas 2+ y 2−: energía reticular muy alta, T de fusión muy elevada; es refractario." },
  { id: "cu", nombre: "Cobre", formula: "Cu", tipo: "metálica", Tf: 1085, solido: "conduce muy bien", liquido: "conduce", solubilidad: "insoluble", dureza: "dúctil y maleable", explicacion: "Cationes en un mar de electrones deslocalizados: conductor y deformable sin romperse." },
  { id: "na", nombre: "Sodio", formula: "Na", tipo: "metálica", Tf: 98, solido: "conduce", liquido: "conduce", solubilidad: "reacciona con agua", dureza: "blando", explicacion: "Un solo electrón por átomo y radio grande: enlace metálico débil y T de fusión baja." },
  { id: "diamante", nombre: "Diamante", formula: "C", tipo: "covalente reticular", Tf: 3550, solido: "no conduce", liquido: "—", solubilidad: "insoluble", dureza: "el más duro", explicacion: "Red covalente tridimensional de enlaces σ C–C (sp³): para fundir hay que romper enlaces covalentes." },
  { id: "grafito", nombre: "Grafito", formula: "C", tipo: "covalente reticular", Tf: 3650, solido: "conduce (electrones π deslocalizados)", liquido: "—", solubilidad: "insoluble", dureza: "blando, láminas deslizantes", explicacion: "Láminas de hexágonos sp²; entre láminas, fuerzas débiles; los electrones π se mueven por la lámina." },
  { id: "sio2", nombre: "Cuarzo", formula: "SiO₂", tipo: "covalente reticular", Tf: 1710, solido: "no conduce", liquido: "—", solubilidad: "insoluble", dureza: "muy duro", explicacion: "Red covalente tridimensional Si–O." },
  { id: "h2o", nombre: "Agua", formula: "H₂O", tipo: "covalente molecular", Tf: 0, solido: "no conduce", liquido: "conduce poco", solubilidad: "disuelve compuestos polares", dureza: "(hielo) frágil", explicacion: "Moléculas unidas por enlaces de hidrógeno (fuerzas intermoleculares), más débiles que los enlaces covalentes." },
  { id: "i2", nombre: "Diyodo", formula: "I₂", tipo: "covalente molecular", Tf: 114, solido: "no conduce", liquido: "no conduce", solubilidad: "soluble en disolventes apolares", dureza: "blando, sublima", explicacion: "Moléculas apolares unidas por fuerzas de London (grandes por su gran nube electrónica)." },
  { id: "ch4", nombre: "Metano", formula: "CH₄", tipo: "covalente molecular", Tf: -182, solido: "no conduce", liquido: "no conduce", solubilidad: "soluble en disolventes apolares", dureza: "gas", explicacion: "Molécula apolar pequeña: fuerzas de London muy débiles; T de fusión muy baja." },
];

/* ───────────── 1. Energía reticular ───────────── */

export function EnergiaReticularFb1Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 2, 0, COMPUESTOS.length - 1));
  const [i, setI] = useState(init);
  const c = COMPUESTOS[i]!;
  const idx = indiceCoulomb(c.q1, c.q2, c.r1, c.r2);
  const maxU = Math.max(...COMPUESTOS.map((x) => x.U));
  return (
    <Frame
      stacked
      hint={block.hint ?? "U crece con la carga de los iones y al disminuir la distancia entre ellos (q₁q₂/d)."}
      onReset={() => setI(init)}
      controls={<Choice label="Compuesto iónico" items={COMPUESTOS.map((x, k) => ({ value: String(k), label: x.formula }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={130} testId="energia-reticular" maxH={150}>
        <circle cx={90} cy={50} r={c.r1 * 0.22} fill={MANIM.red} fillOpacity={0.6} stroke={MANIM.red} strokeWidth={2} />
        <circle cx={90 + (c.r1 + c.r2) * 0.22} cy={50} r={c.r2 * 0.22} fill={MANIM.blue} fillOpacity={0.6} stroke={MANIM.blue} strokeWidth={2} />
        <text x={90} y={104} textAnchor="middle" fill={MANIM.red} fontSize={12}>{`catión ${c.q1}+ (${c.r1} pm)`}</text>
        <text x={90 + (c.r1 + c.r2) * 0.22} y={118} textAnchor="middle" fill={MANIM.blue} fontSize={12}>{`anión ${c.q2}− (${c.r2} pm)`}</text>
        {COMPUESTOS.map((x, k) => (
          <g key={x.id}>
            <rect x={270 + k * 26} y={105 - (x.U / maxU) * 85} width={20} height={(x.U / maxU) * 85} fill={k === i ? MANIM.yellow : MANIM.muted} fillOpacity={k === i ? 1 : 0.5} />
            <text x={280 + k * 26} y={120} textAnchor="middle" fill={MANIM.muted} fontSize={8}>{x.formula}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label={`Energía reticular de ${c.formula}`}>{`${f0(c.U)} kJ/mol`}</Stat>
        <Stat color={MANIM.orange} label="Índice de Coulomb |q₁q₂|/(r₁ + r₂)">{`${f2(idx)} (u. arb.)`}</Stat>
        <Stat color={MANIM.green} label="Temperatura de fusión">{`${f0(c.Tf)} °C`}</Stat>
        <Stat color={MANIM.purple} label="Distancia entre núcleos">{`${c.r1 + c.r2} pm`}</Stat>
      </Readout>
      <Note>En un <b>cristal iónico</b> cada ion se rodea de iones de signo opuesto formando una <b>red cristalina</b> (NaCl: índice de coordinación 6:6). La <b>energía reticular U</b> es la que se libera al formarse 1 mol de red a partir de los iones gaseosos (o la que cuesta romperla). Según la <b>ley de Coulomb</b> (F = k·q₁·q₂/d²) crece con la <b>carga de los iones</b> y al <b>disminuir su tamaño</b>: <b>U ∝ |q₁·q₂|/(r₁ + r₂)</b>. Por eso el MgO (2+/2−) tiene una U unas cuatro veces la del NaCl y funde a 2852 °C, y el LiF supera al NaF. Los valores de U se calculan con el <b>ciclo de Born-Haber</b> (aplicación de la ley de Hess). Valores aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 2. Estructuras de Lewis ───────────── */

export function LewisFb1Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 0, 0, MOLECULAS.length - 1));
  const [i, setI] = useState(init);
  const m = MOLECULAS[i]!;
  const E = electronesTotales(m);
  const { enlazantes, solitarios } = paresLewis(m);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Electrones de valencia totales = pares enlazantes + pares solitarios, contando 2 electrones por par."}
      onReset={() => setI(init)}
      controls={<Choice label="Especie" items={MOLECULAS.map((x, k) => ({ value: String(k), label: x.formula }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={80} testId="lewis" maxH={100}>
        <text x={260} y={44} textAnchor="middle" fill={MANIM.yellow} fontSize={32} fontWeight={700}>{m.formula}</text>
        <text x={260} y={70} textAnchor="middle" fill={MANIM.muted} fontSize={14}>{m.nombre}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Electrones de valencia totales">{`${E}${m.carga !== 0 ? ` (${Object.entries(m.atomos).reduce((s, [a, n]) => s + (VALENCIA[a] ?? 0) * n, 0)} ${m.carga > 0 ? "−" : "+"} ${Math.abs(m.carga)})` : ""}`}</Stat>
        <Stat color={MANIM.green} label="Pares enlazantes (compartidos)">{`${enlazantes}`}</Stat>
        <Stat color={MANIM.orange} label="Pares solitarios (no enlazantes)">{`${solitarios}`}</Stat>
        <Stat color={MANIM.purple} label="Dominios del átomo central · geometría">{`${m.ab} · ${m.geometria}`}</Stat>
      </Readout>
      <Note>Para dibujar una <b>estructura de Lewis</b>: <b>1)</b> suma los <b>electrones de valencia</b> de todos los átomos (resta la carga si es un catión, suma si es un anión); <b>2)</b> coloca el átomo <b>menos electronegativo</b> en el centro (el H siempre es terminal); <b>3)</b> une con <b>enlaces sencillos</b>; <b>4)</b> reparte el resto como <b>pares solitarios</b> hasta completar el <b>octeto</b> (2 para el H); <b>5)</b> si faltan electrones, forma <b>enlaces dobles o triples</b>. En el cuadro: <b>E = 2·(pares enlazantes + pares solitarios)</b>. Hay <b>excepciones</b>: <b>octeto incompleto</b> (BF₃, BeCl₂, con 6 y 4 electrones) y <b>octeto expandido</b> (PCl₅, SF₆, con 10 y 12, posible desde el 3.er periodo).</Note>
    </Frame>
  );
}

/* ───────────── 3. Geometría y polaridad ───────────── */

const LAYOUT: Record<string, { b: number[]; l: number[] }> = {
  "2,0": { b: [0, 180], l: [] }, "3,0": { b: [90, 210, 330], l: [] }, "2,1": { b: [210, 330], l: [90] }, "4,0": { b: [45, 135, 225, 315], l: [] },
  "3,1": { b: [210, 270, 330], l: [90] }, "2,2": { b: [225, 315], l: [45, 135] }, "1,3": { b: [0], l: [100, 180, 260] },
  "5,0": { b: [90, 270, 0, 140, 220], l: [] }, "4,1": { b: [90, 270, 150, 210], l: [0] }, "3,2": { b: [90, 270, 0], l: [150, 210] }, "2,3": { b: [90, 270], l: [0, 150, 210] },
  "6,0": { b: [90, 270, 0, 180, 230, 50], l: [] }, "5,1": { b: [0, 90, 180, 270, 45], l: [225] }, "4,2": { b: [0, 90, 180, 270], l: [45, 225] },
};

export function GeometriaFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 4, 1, 6)), m: Math.round(num(block.params?.b, 0, 0, 3)), iguales: true, polares: true };
  const [s, setS] = useState(init);
  const g = geometriaRPECV(s.n, s.m);
  const dominios = s.n + s.m;
  const lay = LAYOUT[`${s.n},${s.m}`];
  const pol = polaridadMolecular(s.n, s.m, s.iguales, s.polares);
  const cx = 260;
  const cy = 80;
  const R = 55;
  const pt = (a: number): [number, number] => [cx + R * Math.cos((a * Math.PI) / 180), cy - R * Math.sin((a * Math.PI) / 180)];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Los pares de electrones (enlazantes y solitarios) se repelen y se sitúan lo más lejos posible; los solitarios ocupan más espacio."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Pares enlazantes (átomos unidos al central)" value={s.n} min={1} max={6} step={1} color={MANIM.blue} onChange={(n) => setS((o) => ({ ...o, n }))} />
          <Slider label="Pares solitarios del átomo central" value={s.m} min={0} max={3} step={1} color={MANIM.orange} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Choice label="Átomos terminales" items={[{ value: "1", label: "todos iguales" }, { value: "0", label: "distintos" }]} value={s.iguales ? "1" : "0"} onChange={(v) => setS((o) => ({ ...o, iguales: v === "1" }))} />
          <Choice label="Enlaces" items={[{ value: "1", label: "polares" }, { value: "0", label: "apolares" }]} value={s.polares ? "1" : "0"} onChange={(v) => setS((o) => ({ ...o, polares: v === "1" }))} />
        </>
      }
    >
      <Svg w={520} h={160} testId="geometria" maxH={180}>
        {lay ? (
          <g>
            {lay.b.map((a, k) => { const p = pt(a); return <g key={`b${k}`}><Seg a={[cx, cy]} b={p} color={MANIM.ink} width={3} /><Dot p={p} r={10} color={MANIM.blue} /></g>; })}
            {lay.l.map((a, k) => { const p = pt(a); return <ellipse key={`l${k}`} cx={(cx + p[0]) / 2} cy={(cy + p[1]) / 2} rx={18} ry={9} transform={`rotate(${-a} ${(cx + p[0]) / 2} ${(cy + p[1]) / 2})`} fill={MANIM.orange} fillOpacity={0.4} stroke={MANIM.orange} strokeWidth={2} strokeDasharray="4 3" />; })}
            <Dot p={[cx, cy]} r={14} color={MANIM.yellow} />
          </g>
        ) : <text x={260} y={84} textAnchor="middle" fill={MANIM.red} fontSize={14}>combinación no habitual (2 a 6 dominios)</text>}
        <text x={40} y={150} fill={MANIM.muted} fontSize={11}>esquema plano simplificado; las líneas discontinuas naranjas son pares solitarios</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Tipo AXₙEₘ · dominios">{`AX${s.n}${s.m > 0 ? `E${s.m > 1 ? s.m : ""}` : ""} · ${dominios}`}</Stat>
        <Stat color={MANIM.green} label="Geometría molecular">{g ? g.nombre : "no habitual"}</Stat>
        <Stat color={MANIM.blue} label="Ángulo · hibridación del átomo central">{g ? `${g.ang} · ${g.hib}` : "—"}</Stat>
        <Stat color={MANIM.purple} label="Distribución de los dominios · ejemplos">{g ? `${distribucionElectronica(dominios)} · ${g.ejemplo}` : "—"}</Stat>
        <Stat color={pol === "polar" ? MANIM.red : MANIM.green} label="Polaridad de la molécula">{pol ?? "—"}</Stat>
      </Readout>
      <Note>La <b>teoría RPECV</b> (repulsión de pares de electrones de la capa de valencia) dice que los <b>dominios de electrones</b> (cada enlace, sencillo o múltiple, y cada par solitario cuentan como uno) se disponen para <b>minimizar la repulsión</b>: 2 → <b>lineal</b>, 3 → <b>trigonal plana</b>, 4 → <b>tetraédrica</b>, 5 → <b>bipirámide trigonal</b>, 6 → <b>octaédrica</b>. La <b>geometría molecular</b> describe solo la posición de los <b>átomos</b>; los <b>pares solitarios repelen más</b> y cierran los ángulos (NH₃ ≈ 107°, H₂O ≈ 104,5°). Cada geometría se asocia a una <b>hibridación</b> del átomo central (sp, sp², sp³…). Una molécula es <b>polar</b> si la suma vectorial de los momentos dipolares de enlace no es nula: tiene enlaces polares y una geometría <b>asimétrica</b> (H₂O, NH₃); si es simétrica con terminales iguales, es <b>apolar</b> aunque tenga enlaces polares (CO₂, BF₃, CH₄).</Note>
    </Frame>
  );
}

/* ───────────── 4. Fuerzas intermoleculares ───────────── */

export function FuerzasIntermolecularesFb1Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 2, 0, SERIES_EB.length - 1));
  const [i, setI] = useState(init);
  const serie = SERIES_EB[i]!;
  const maxT = Math.max(...serie.datos.map((d) => d.T), 1);
  const n = serie.datos.length;
  const X = (k: number): number => 80 + (k / Math.max(1, n - 1)) * 360;
  const Y = (T: number): number => 120 - (T / maxT) * 95;
  const anomalia = hayAnomalia(serie.datos);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Las fuerzas de London crecen con el tamaño de la molécula; el enlace de hidrógeno (en HF, H₂O, NH₃) rompe la tendencia."}
      onReset={() => setI(init)}
      controls={<Choice label="Serie de sustancias" items={SERIES_EB.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={150} testId="fuerzas-intermoleculares" maxH={170}>
        <Seg a={[50, 120]} b={[480, 120]} color={MANIM.ink} width={2} />
        <Seg a={[50, 120]} b={[50, 15]} color={MANIM.ink} width={2} />
        <polyline points={serie.datos.map((d, k) => `${X(k)},${Y(d.T)}`).join(" ")} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        {serie.datos.map((d, k) => (
          <g key={d.f}>
            <Dot p={[X(k), Y(d.T)]} r={6} color={k === 0 && anomalia ? MANIM.red : MANIM.yellow} />
            <text x={X(k)} y={138} textAnchor="middle" fill={MANIM.muted} fontSize={11}>{d.f}</text>
            <text x={X(k)} y={Y(d.T) - 10} textAnchor="middle" fill={MANIM.ink} fontSize={11}>{`${d.T} K`}</text>
          </g>
        ))}
        <text x={480} y={14} textAnchor="end" fill={MANIM.muted} fontSize={11}>T de ebullición (K)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Serie">{serie.nombre}</Stat>
        <Stat color={anomalia ? MANIM.red : MANIM.green} label="Tendencia">{anomalia ? `anomalía: el primero hierve más alto (${serie.tipo})` : "crece con la masa y el tamaño (fuerzas de London)"}</Stat>
        <Stat color={MANIM.blue} label="Tipo de fuerza predominante">{serie.tipo}</Stat>
      </Readout>
      <Note>Las <b>fuerzas intermoleculares</b> (de van der Waals) son mucho más débiles que los enlaces, pero determinan los puntos de fusión y ebullición de las sustancias moleculares. <b>Fuerzas de London</b> (dispersión): entre <b>todas</b> las moléculas, por dipolos instantáneos; crecen con el <b>tamaño y la masa</b> de la molécula (por eso el I₂ es sólido y el F₂ gas). <b>Dipolo-dipolo</b>: entre moléculas <b>polares</b>. <b>Enlace de hidrógeno</b>: especialmente fuerte, entre un H unido a <b>F, O o N</b> y un par solitario de otro F, O o N (HF, H₂O, NH₃): explica el <b>punto de ebullición anómalo</b> del agua (373 K, frente a los 213 K del H₂S) y que el hielo flote. Los valores son aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 5. Tipos de sustancias y propiedades ───────────── */

export function SustanciasFb1Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 0, 0, SUSTANCIAS.length - 1));
  const [i, setI] = useState(init);
  const s = SUSTANCIAS[i]!;
  const color = s.tipo === "iónica" ? MANIM.red : s.tipo === "metálica" ? MANIM.yellow : s.tipo === "covalente reticular" ? MANIM.green : MANIM.blue;
  const maxT = 3700;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Las propiedades macroscópicas dependen del tipo de enlace y de las fuerzas que mantienen unidas las partículas."}
      onReset={() => setI(init)}
      controls={<Choice label="Sustancia" items={SUSTANCIAS.map((x, k) => ({ value: String(k), label: x.id === "grafito" || x.id === "diamante" ? x.nombre : x.formula }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={80} testId="sustancias" maxH={100}>
        <rect x={60} y={30} width={400} height={16} fill={MANIM.panel} />
        <rect x={60} y={30} width={Math.max(3, (Math.max(0, s.Tf + 200) / (maxT + 200)) * 400)} height={16} fill={color} fillOpacity={0.85} />
        <text x={60} y={22} fill={MANIM.muted} fontSize={11}>temperatura de fusión</text>
        <text x={460} y={22} textAnchor="end" fill={color} fontSize={12}>{`${f0(s.Tf)} °C`}</text>
        <text x={60} y={68} fill={MANIM.muted} fontSize={10}>−200 °C</text>
        <text x={460} y={68} textAnchor="end" fill={MANIM.muted} fontSize={10}>3700 °C</text>
      </Svg>
      <Readout>
        <Stat color={color} label={`${s.nombre} (${s.formula})`}>{`sólido ${s.tipo}`}</Stat>
        <Stat color={MANIM.orange} label="Conductividad (sólido · líquido)">{`${s.solido} · ${s.liquido}`}</Stat>
        <Stat color={MANIM.blue} label="Solubilidad · dureza">{`${s.solubilidad} · ${s.dureza}`}</Stat>
        <Stat color={MANIM.green} label="Por qué">{s.explicacion}</Stat>
      </Readout>
      <Note>Tipos de sustancias: <b>iónicas</b> (red de iones: T de fusión alta, duras y frágiles, solubles en agua, conducen <b>fundidas o disueltas</b> pero no sólidas); <b>metálicas</b> (cationes en un <b>mar de electrones</b> deslocalizados: <b>conductoras</b> en estado sólido, <b>dúctiles</b> y <b>maleables</b>, brillo; T de fusión variable); <b>covalentes reticulares</b> (red de átomos unidos por enlaces covalentes: T de fusión muy alta, muy duras, insolubles, aislantes salvo el grafito); y <b>covalentes moleculares</b> (moléculas unidas por fuerzas intermoleculares: T de fusión y ebullición bajas, blandas, no conductoras; solubles según su polaridad: «lo semejante disuelve a lo semejante»). Valores aproximados.</Note>
    </Frame>
  );
}
