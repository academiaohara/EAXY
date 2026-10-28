"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { contarAtomos, masaMolecular, sub, sup } from "@/components/lesson/slide/tools/Fq2AtomoTools";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const AVOGADRO = 6.022e23;

const mcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : mcd(b, a % b));

export const CATIONES = [
  { sim: "Li", nombre: "litio", carga: 1 },
  { sim: "Na", nombre: "sodio", carga: 1 },
  { sim: "K", nombre: "potasio", carga: 1 },
  { sim: "Mg", nombre: "magnesio", carga: 2 },
  { sim: "Ca", nombre: "calcio", carga: 2 },
  { sim: "Al", nombre: "aluminio", carga: 3 },
] as const;
export const ANIONES = [
  { sim: "F", nombre: "fluoruro", carga: -1 },
  { sim: "Cl", nombre: "cloruro", carga: -1 },
  { sim: "O", nombre: "óxido", carga: -2 },
  { sim: "S", nombre: "sulfuro", carga: -2 },
  { sim: "N", nombre: "nitruro", carga: -3 },
] as const;

/** Número de iones de cada tipo en la fórmula de un compuesto iónico binario (cargas cruzadas y simplificadas). */
export function proporcionIonica(cargaCation: number, cargaAnion: number): { cationes: number; aniones: number } {
  const c = Math.abs(cargaCation);
  const a = Math.abs(cargaAnion);
  if (c === 0 || a === 0) return { cationes: NaN, aniones: NaN };
  const g = mcd(c, a);
  return { cationes: a / g, aniones: c / g };
}
export function formulaIonica(cation: { sim: string; carga: number }, anion: { sim: string; carga: number }): string {
  const { cationes, aniones } = proporcionIonica(cation.carga, anion.carga);
  if (Number.isNaN(cationes)) return "?";
  return `${cation.sim}${cationes > 1 ? sub(cationes) : ""}${anion.sim}${aniones > 1 ? sub(aniones) : ""}`;
}
export const nombreIonico = (cation: { nombre: string }, anion: { nombre: string }): string => `${anion.nombre} de ${cation.nombre}`;

export const VALENCIA_COVALENTE: Record<string, number> = { H: 1, C: 4, N: 3, O: 2, F: 1, Cl: 1, S: 2 };
export type Molecula = { formula: string; nombre: string; atomos: string[]; enlaces: number[] };
/** atomos[0] es el átomo central; enlaces[i] es el orden de enlace entre el central y atomos[i + 1]. */
export const MOLECULAS: Molecula[] = [
  { formula: "H2", nombre: "Hidrógeno", atomos: ["H", "H"], enlaces: [1] },
  { formula: "O2", nombre: "Oxígeno", atomos: ["O", "O"], enlaces: [2] },
  { formula: "N2", nombre: "Nitrógeno", atomos: ["N", "N"], enlaces: [3] },
  { formula: "HCl", nombre: "Cloruro de hidrógeno", atomos: ["Cl", "H"], enlaces: [1] },
  { formula: "H2O", nombre: "Agua", atomos: ["O", "H", "H"], enlaces: [1, 1] },
  { formula: "NH3", nombre: "Amoniaco", atomos: ["N", "H", "H", "H"], enlaces: [1, 1, 1] },
  { formula: "CH4", nombre: "Metano", atomos: ["C", "H", "H", "H", "H"], enlaces: [1, 1, 1, 1] },
  { formula: "CO2", nombre: "Dióxido de carbono", atomos: ["C", "O", "O"], enlaces: [2, 2] },
];
/** Pares de electrones compartidos en la molécula. */
export const paresCompartidos = (m: Molecula): number => m.enlaces.reduce((s, e) => s + e, 0);
/** Comprueba que cada átomo completa su valencia (H: 1; resto: 8 − electrones de valencia). */
export function valenciasCorrectas(m: Molecula): boolean {
  if (m.enlaces.length !== m.atomos.length - 1) return false;
  const central = m.atomos[0]!;
  if (VALENCIA_COVALENTE[central] !== paresCompartidos(m)) return false;
  return m.enlaces.every((e, i) => VALENCIA_COVALENTE[m.atomos[i + 1]!] === e);
}

export type TipoEnlace = "ionico" | "molecular" | "reticular" | "metalico";
export const TIPOS_ENLACE: { id: TipoEnlace; nombre: string; ejemplo: string; fusion: number; conductorSolido: boolean; conductorDisuelto: boolean | null; aspecto: string; solubilidad: string }[] = [
  { id: "ionico", nombre: "Iónico", ejemplo: "NaCl (sal común)", fusion: 801, conductorSolido: false, conductorDisuelto: true, aspecto: "sólido cristalino, duro y quebradizo", solubilidad: "suele disolverse en agua" },
  { id: "molecular", nombre: "Covalente molecular", ejemplo: "H₂O (agua)", fusion: 0, conductorSolido: false, conductorDisuelto: false, aspecto: "gases, líquidos o sólidos blandos", solubilidad: "depende de la sustancia" },
  { id: "reticular", nombre: "Covalente reticular", ejemplo: "Diamante (C)", fusion: 3550, conductorSolido: false, conductorDisuelto: null, aspecto: "sólido muy duro", solubilidad: "insoluble" },
  { id: "metalico", nombre: "Metálico", ejemplo: "Cobre (Cu)", fusion: 1085, conductorSolido: true, conductorDisuelto: null, aspecto: "brillante, dúctil y maleable", solubilidad: "insoluble en agua" },
];

export type Sustancia = { formula: string; nombre: string; clase: "elemento" | "compuesto"; particula: "átomos" | "moléculas" | "iones"; enlace: TipoEnlace; dibujo: "atomo" | "molecula" | "red-ionica" | "metal" | "red-covalente" };
export const SUSTANCIAS: Sustancia[] = [
  { formula: "He", nombre: "Helio", clase: "elemento", particula: "átomos", enlace: "molecular", dibujo: "atomo" },
  { formula: "O2", nombre: "Oxígeno", clase: "elemento", particula: "moléculas", enlace: "molecular", dibujo: "molecula" },
  { formula: "Fe", nombre: "Hierro", clase: "elemento", particula: "átomos", enlace: "metalico", dibujo: "metal" },
  { formula: "C", nombre: "Diamante", clase: "elemento", particula: "átomos", enlace: "reticular", dibujo: "red-covalente" },
  { formula: "H2O", nombre: "Agua", clase: "compuesto", particula: "moléculas", enlace: "molecular", dibujo: "molecula" },
  { formula: "CO2", nombre: "Dióxido de carbono", clase: "compuesto", particula: "moléculas", enlace: "molecular", dibujo: "molecula" },
  { formula: "NaCl", nombre: "Cloruro de sodio", clase: "compuesto", particula: "iones", enlace: "ionico", dibujo: "red-ionica" },
];
export const MASAS_MOL = ["H2O", "CO2", "NaCl", "CH4", "NH3", "C6H12O6", "CaCO3", "MgO"] as const;
/** Moles que hay en `masa` gramos de una sustancia de masa molar `M` (g/mol). */
export const moles = (masa: number, M: number): number => (M > 0 ? masa / M : NaN);
export const particulas = (n: number): number => n * AVOGADRO;
/** Número de átomos totales en n moles de una fórmula. */
export function atomosEnMoles(formula: string, n: number): number {
  const c = contarAtomos(formula);
  if (!c) return NaN;
  return Object.values(c).reduce((s, k) => s + k, 0) * n * AVOGADRO;
}
export const texSci = (x: number): string => {
  if (!Number.isFinite(x) || x === 0) return x === 0 ? "0" : "—";
  const exp = Math.floor(Math.log10(Math.abs(x)));
  const m = x / 10 ** exp;
  return `${fmtEs(m, 2)} · 10${sup(exp)}`;
};
export const formulaBonita = (f: string): string => f.replace(/\d/g, (d) => sub(d));

const COL: Record<string, string> = { H: MANIM.ink, O: MANIM.red, C: MANIM.muted, N: MANIM.blue, Cl: MANIM.green, Na: MANIM.purple, He: MANIM.yellow, Fe: MANIM.orange };

/* ───────────── 1. De los átomos a las sustancias ───────────── */

export function SustanciasFq3Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 4, 0, SUSTANCIAS.length - 1));
  const [i, setI] = useState(init);
  const s = SUSTANCIAS[i]!;
  const comp = contarAtomos(s.formula) ?? {};
  const tipo = TIPOS_ENLACE.find((t) => t.id === s.enlace)!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una sustancia simple tiene un solo tipo de átomo; un compuesto, al menos dos distintos."}
      onReset={() => setI(init)}
      controls={<Choice label="Sustancia" items={SUSTANCIAS.map((x, k) => ({ value: String(k), label: formulaBonita(x.formula) }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={150} testId="sustancias" maxH={170}>
        {s.dibujo === "atomo" && <Dot p={[260, 70]} r={16} color={COL.He!} />}
        {s.dibujo === "molecula" && (() => {
          const syms = Object.entries(comp).flatMap(([el, n]) => Array<string>(n).fill(el));
          const mol = MOLECULAS.find((m) => m.formula === s.formula);
          const base = mol ? mol.atomos : syms;
          const atomos = base.length === 3 ? [base[1]!, base[0]!, base[2]!] : base;
          const x0 = 260 - ((atomos.length - 1) * 50) / 2;
          return (
            <>
              {atomos.slice(0, -1).map((_, k) => <Seg key={k} a={[x0 + k * 50, 70]} b={[x0 + (k + 1) * 50, 70]} color={MANIM.muted} width={3} />)}
              {atomos.map((a, k) => <Dot key={k} p={[x0 + k * 50, 70]} r={a === "H" ? 11 : 16} color={COL[a] ?? MANIM.orange} />)}
            </>
          );
        })()}
        {s.dibujo === "red-ionica" && Array.from({ length: 16 }, (_, k) => {
          const r = Math.floor(k / 4);
          const c = k % 4;
          return <Dot key={k} p={[200 + c * 40, 20 + r * 36]} r={13} color={(r + c) % 2 === 0 ? COL.Na! : COL.Cl!} />;
        })}
        {s.dibujo === "metal" && Array.from({ length: 16 }, (_, k) => {
          const r = Math.floor(k / 4);
          const c = k % 4;
          return <Dot key={k} p={[200 + c * 40, 20 + r * 36]} r={13} color={COL.Fe!} />;
        })}
        {s.dibujo === "red-covalente" && Array.from({ length: 16 }, (_, k) => {
          const r = Math.floor(k / 4);
          const c = k % 4;
          return (
            <g key={k}>
              {c < 3 && <Seg a={[200 + c * 40, 20 + r * 36]} b={[240 + c * 40, 20 + r * 36]} color={MANIM.muted} width={2} />}
              {r < 3 && <Seg a={[200 + c * 40, 20 + r * 36]} b={[200 + c * 40, 56 + r * 36]} color={MANIM.muted} width={2} />}
              <Dot p={[200 + c * 40, 20 + r * 36]} r={9} color={COL.C!} />
            </g>
          );
        })}
        <text x={260} y={142} textAnchor="middle" fill={MANIM.muted} fontSize={12}>{s.dibujo === "red-ionica" ? "Iones Na⁺ y Cl⁻ alternados" : s.dibujo === "metal" ? "Cationes en un «mar» de electrones" : s.dibujo === "red-covalente" ? "Red de átomos unidos por enlaces covalentes" : s.dibujo === "atomo" ? "Átomos aislados" : "Moléculas independientes"}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Sustancia">{`${s.nombre} (${formulaBonita(s.formula)})`}</Stat>
        <Stat color={MANIM.green} label="Clase">{s.clase === "elemento" ? "sustancia simple (un elemento)" : "compuesto (varios elementos)"}</Stat>
        <Stat color={MANIM.blue} label="Formada por">{s.particula}</Stat>
        <Stat color={MANIM.purple} label="Enlace">{tipo.nombre.toLowerCase()}</Stat>
      </Readout>
      <Note>Un <b>elemento</b> está formado por átomos del mismo número atómico. Una <b>sustancia simple</b> contiene un único elemento (O₂, Fe, C), y un <b>compuesto</b>, dos o más elementos combinados en proporción fija (H₂O, NaCl). Las partículas pueden ser <b>átomos</b>, <b>moléculas</b> (grupos de átomos unidos) o <b>iones</b>. Que una sustancia sea molecular, iónica, metálica o reticular depende del tipo de <b>enlace</b> que une sus átomos.</Note>
    </Frame>
  );
}

/* ───────────── 2. Enlace iónico ───────────── */

export function EnlaceIonicoFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.a, 1, 0, CATIONES.length - 1)), a: Math.round(num(block.params?.b, 1, 0, ANIONES.length - 1)) };
  const [s, setS] = useState(init);
  const cat = CATIONES[s.c]!;
  const ani = ANIONES[s.a]!;
  const p = proporcionIonica(cat.carga, ani.carga);
  const total = Math.min(6, p.cationes) + Math.min(6, p.aniones);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El metal cede electrones y el no metal los gana; la fórmula resulta de igualar cargas positivas y negativas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Metal (forma catión)" items={CATIONES.map((x, k) => ({ value: String(k), label: `${x.sim}${sup(`${x.carga > 1 ? x.carga : ""}+`)}` }))} value={String(s.c)} onChange={(k) => setS((o) => ({ ...o, c: Number(k) }))} />
          <Choice label="No metal (forma anión)" items={ANIONES.map((x, k) => ({ value: String(k), label: `${x.sim}${sup(`${-x.carga > 1 ? -x.carga : ""}−`)}` }))} value={String(s.a)} onChange={(k) => setS((o) => ({ ...o, a: Number(k) }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="enlace-ionico" maxH={150}>
        {Array.from({ length: Math.min(6, p.cationes) }, (_, k) => (
          <g key={`c${k}`}>
            <Dot p={[60 + k * 40, 50]} r={14} color={MANIM.purple} />
            <text x={60 + k * 40} y={55} textAnchor="middle" fill={MANIM.ink} fontSize={12} fontWeight={700}>{`${sup(`${cat.carga > 1 ? cat.carga : ""}+`)}`}</text>
          </g>
        ))}
        {Array.from({ length: Math.min(6, p.aniones) }, (_, k) => (
          <g key={`a${k}`}>
            <Dot p={[60 + k * 40, 100]} r={14} color={MANIM.green} />
            <text x={60 + k * 40} y={105} textAnchor="middle" fill={MANIM.ink} fontSize={12} fontWeight={700}>{`${sup(`${-ani.carga > 1 ? -ani.carga : ""}−`)}`}</text>
          </g>
        ))}
        <text x={330} y={58} fill={MANIM.yellow} fontSize={22} fontWeight={700}>{formulaIonica(cat, ani)}</text>
        <text x={330} y={84} fill={MANIM.muted} fontSize={13}>{`Carga total: ${p.cationes}·(+${cat.carga}) + ${p.aniones}·(${ani.carga}) = ${p.cationes * cat.carga + p.aniones * ani.carga}`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Fórmula">{formulaIonica(cat, ani)}</Stat>
        <Stat color={MANIM.green} label="Nombre">{nombreIonico(cat, ani)}</Stat>
        <Stat color={MANIM.purple} label="Iones por unidad fórmula">{`${total}`}</Stat>
      </Readout>
      <Note>En el <b>enlace iónico</b> un <b>metal</b> cede electrones y un <b>no metal</b> los gana: se forman <b>iones</b> de carga opuesta que se <b>atraen</b> y se ordenan en una <b>red cristalina</b>. Como el conjunto debe ser <b>neutro</b>, la fórmula iguala las cargas: Mg²⁺ y Cl⁻ dan <b>MgCl₂</b> (1·(+2) + 2·(−1) = 0). La fórmula indica la <b>proporción</b> de iones, no una molécula. (Se dibujan hasta 6 iones de cada tipo.)</Note>
    </Frame>
  );
}

/* ───────────── 3. Enlace covalente ───────────── */

export function EnlaceCovalenteFq3Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 4, 0, MOLECULAS.length - 1));
  const [i, setI] = useState(init);
  const m = MOLECULAS[i]!;
  const n = m.atomos.length - 1;
  const cx = 260;
  const cy = 75;
  const pos = (k: number): [number, number] => {
    if (k === 0) return [cx, cy];
    if (n === 1) return [cx + 90, cy];
    if (m.formula === "CO2") return [cx + (k === 1 ? -100 : 100), cy];
    if (n === 2) return [cx + (k === 1 ? -65 : 65), cy + 42];
    const ang = ((k - 1) / n) * 2 * Math.PI - Math.PI / 2;
    return [cx + 75 * Math.cos(ang), cy + 62 * Math.sin(ang)];
  };
  const posAtom = (k: number): [number, number] => (n === 1 && k === 0 ? [cx - 90, cy] : pos(k));
  const centroPos = posAtom(0);
  return (
    <Frame
      stacked
      hint={block.hint ?? "En el enlace covalente los átomos comparten pares de electrones hasta completar su capa."}
      onReset={() => setI(init)}
      controls={<Choice label="Molécula" items={MOLECULAS.map((x, k) => ({ value: String(k), label: formulaBonita(x.formula) }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={150} testId="enlace-covalente" maxH={170}>
        {m.enlaces.map((e, k) => {
          const p = posAtom(k + 1);
          const dx = p[0] - centroPos[0];
          const dy = p[1] - centroPos[1];
          const L = Math.hypot(dx, dy) || 1;
          const nx = -dy / L;
          const ny = dx / L;
          return (
            <g key={k}>
              {Array.from({ length: e }, (_, j) => {
                const off = (j - (e - 1) / 2) * 6;
                return <Seg key={j} a={[centroPos[0] + nx * off, centroPos[1] + ny * off]} b={[p[0] + nx * off, p[1] + ny * off]} color={MANIM.ink} width={2.5} />;
              })}
            </g>
          );
        })}
        {m.atomos.map((a, k) => {
          const p = posAtom(k);
          return (
            <g key={k}>
              <Dot p={p} r={a === "H" ? 13 : 19} color={COL[a] ?? MANIM.orange} />
              <text x={p[0]} y={p[1] + 5} textAnchor="middle" fill={a === "H" ? "#111827" : MANIM.ink} fontSize={13} fontWeight={700}>{a}</text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Molécula">{`${m.nombre} (${formulaBonita(m.formula)})`}</Stat>
        <Stat color={MANIM.blue} label="Pares compartidos">{`${paresCompartidos(m)}`}</Stat>
        <Stat color={MANIM.purple} label="Enlaces">{m.enlaces.every((e) => e === 1) ? "simples" : m.enlaces.some((e) => e === 3) ? "triple" : "dobles"}</Stat>
      </Readout>
      <Note>En el <b>enlace covalente</b> dos <b>no metales</b> <b>comparten</b> pares de electrones para completar su última capa (8 electrones; 2 en el hidrógeno). Cada <b>par</b> compartido es una <b>raya</b>: <b>simple</b> (un par), <b>doble</b> (dos) o <b>triple</b> (tres). El número de enlaces que forma un átomo es lo que le <b>falta</b> para el octeto: H → 1, O → 2, N → 3, C → 4. Los dibujos son esquemáticos (no muestran los ángulos reales).</Note>
    </Frame>
  );
}

/* ───────────── 4. Propiedades según el enlace ───────────── */

export function PropiedadesEnlaceFq3Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 0, 0, TIPOS_ENLACE.length - 1));
  const [i, setI] = useState(init);
  const t = TIPOS_ENLACE[i]!;
  const max = 3550;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El tipo de enlace explica el punto de fusión, la dureza y la conductividad."}
      onReset={() => setI(init)}
      controls={<Choice label="Tipo de enlace" items={TIPOS_ENLACE.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={170} testId="propiedades-enlace" maxH={190}>
        <Seg a={[30, 140]} b={[490, 140]} color={MANIM.ink} width={2} />
        {TIPOS_ENLACE.map((x, k) => {
          const h = (Math.max(x.fusion, 0) / max) * 100;
          const sel = k === i;
          return (
            <g key={x.id}>
              <rect x={60 + k * 110} y={140 - Math.max(2, h)} width={70} height={Math.max(2, h)} fill={sel ? MANIM.orange : MANIM.muted} fillOpacity={sel ? 0.9 : 0.4} />
              <text x={95 + k * 110} y={134 - Math.max(2, h)} textAnchor="middle" fill={MANIM.ink} fontSize={11}>{`${x.fusion} °C`}</text>
              <text x={95 + k * 110} y={158} textAnchor="middle" fill={sel ? MANIM.ink : MANIM.muted} fontSize={11} fontWeight={sel ? 700 : 400}>{x.id === "reticular" ? "Reticular" : x.id === "molecular" ? "Molecular" : x.nombre}</text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Ejemplo">{t.ejemplo}</Stat>
        <Stat color={MANIM.orange} label="Punto de fusión aprox.">{`${t.fusion} °C`}</Stat>
        <Stat color={MANIM.blue} label="Conduce la electricidad">{`${t.conductorSolido ? "sólido: sí" : "sólido: no"}${t.conductorDisuelto === null ? "" : t.conductorDisuelto ? " · disuelto: sí" : " · disuelto: no"}`}</Stat>
        <Stat color={MANIM.green} label="Aspecto">{t.aspecto}</Stat>
        <Stat color={MANIM.purple} label="Solubilidad">{t.solubilidad}</Stat>
      </Readout>
      <Note>Las <b>sustancias iónicas</b> forman redes de iones muy atraídos: son sólidas, de <b>punto de fusión alto</b> y <b>conducen</b> la electricidad solo <b>disueltas o fundidas</b> (cuando los iones se mueven). Las <b>moleculares</b> tienen enlaces débiles <b>entre</b> moléculas: puntos de fusión bajos y no conducen. Las de <b>red covalente</b> (diamante) son durísimas y de punto de fusión altísimo. Los <b>metales</b> conducen en estado sólido gracias al «mar» de electrones, y son dúctiles y maleables. Los valores son orientativos y están redondeados.</Note>
    </Frame>
  );
}

/* ───────────── 5. El mol ───────────── */

export function MolFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { f: Math.round(num(block.params?.n, 0, 0, MASAS_MOL.length - 1)), m: num(block.params?.a, 36, 1, 500) };
  const [s, setS] = useState(init);
  const f = MASAS_MOL[s.f]!;
  const M = masaMolecular(f);
  const n = moles(s.m, M);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un mol son 6,022·10²³ partículas, y su masa en gramos coincide con la masa molecular en u."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Sustancia" items={MASAS_MOL.map((x, k) => ({ value: String(k), label: formulaBonita(x) }))} value={String(s.f)} onChange={(k) => setS((o) => ({ ...o, f: Number(k) }))} />
          <Slider label="Masa de la muestra" value={s.m} min={1} max={500} step={1} unit=" g" color={MANIM.orange} onChange={(m) => setS((o) => ({ ...o, m }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="mol" maxH={130}>
        <text x={260} y={36} textAnchor="middle" fill={MANIM.ink} fontSize={15}>{`n = m / M = ${fmtEs(s.m, 0)} g / ${f2(M)} g/mol`}</text>
        <text x={260} y={76} textAnchor="middle" fill={MANIM.green} fontSize={22} fontWeight={700}>{`${f2(n)} mol`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label={`Masa molar de ${formulaBonita(f)}`}>{`${f2(M)} g/mol`}</Stat>
        <Stat color={MANIM.green} label="Cantidad de sustancia">{`${f2(n)} mol`}</Stat>
        <Stat color={MANIM.orange} label="Unidades fórmula">{texSci(particulas(n))}</Stat>
      </Readout>
      <Note>El <b>mol</b> es la unidad de <b>cantidad de sustancia</b>: 1 mol contiene <b>6,022 · 10²³</b> partículas (número de Avogadro). La <b>masa molar</b> (g/mol) coincide numéricamente con la <b>masa molecular</b> en u, que se obtiene sumando las masas atómicas de los átomos de la fórmula (H₂O: 2·1 + 16 = 18). Así, <b>n = m / M</b>: moles = gramos / masa molar. Se usan masas atómicas redondeadas (H 1, C 12, N 14, O 16, Na 23, Mg 24, Cl 35,5, Ca 40).</Note>
    </Frame>
  );
}

/* ───────────── 6. Nomenclatura ───────────── */

export function NomenclaturaFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.a, 3, 0, CATIONES.length - 1)), a: Math.round(num(block.params?.b, 2, 0, ANIONES.length - 1)) };
  const [s, setS] = useState(init);
  const cat = CATIONES[s.c]!;
  const ani = ANIONES[s.a]!;
  const f = formulaIonica(cat, ani);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Se nombra primero el anión (terminado en -uro u óxido) y después el metal: «cloruro de sodio»."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Metal" items={CATIONES.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.c)} onChange={(k) => setS((o) => ({ ...o, c: Number(k) }))} />
          <Choice label="No metal" items={ANIONES.map((x, k) => ({ value: String(k), label: x.sim }))} value={String(s.a)} onChange={(k) => setS((o) => ({ ...o, a: Number(k) }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="nomenclatura" maxH={130}>
        <text x={260} y={44} textAnchor="middle" fill={MANIM.yellow} fontSize={30} fontWeight={700}>{f}</text>
        <text x={260} y={86} textAnchor="middle" fill={MANIM.green} fontSize={18} fontWeight={700}>{nombreIonico(cat, ani)}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Catión">{`${cat.sim}${sup(`${cat.carga > 1 ? cat.carga : ""}+`)}`}</Stat>
        <Stat color={MANIM.blue} label="Anión">{`${ani.sim}${sup(`${-ani.carga > 1 ? -ani.carga : ""}−`)}`}</Stat>
      </Readout>
      <Note>Un compuesto <b>iónico binario</b> se nombra con el <b>anión</b> primero (<b>cloruro</b>, <b>sulfuro</b>, <b>fluoruro</b>, <b>nitruro</b>, y <b>óxido</b> para el oxígeno), seguido de «de» y el nombre del <b>metal</b>: NaCl, <b>cloruro de sodio</b>. La fórmula lleva primero el metal. Para compuestos <b>covalentes</b> de dos no metales se usan <b>prefijos</b> numerales (mono-, di-, tri-…): CO₂, <b>dióxido de carbono</b>; algunos tienen nombre propio (H₂O, agua; NH₃, amoniaco; CH₄, metano).</Note>
    </Frame>
  );
}
