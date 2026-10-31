"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { SIMBOLOS, valorPropiedad } from "@/components/lesson/slide/tools/Fq4AtomoTools";
import { Frame, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos y datos (se comprueban en los tests) ───────────── */

/** Índice de energía reticular (unidades arbitrarias): |q₊·q₋| / (r₊ + r₋) con radios en pm. */
export const indiceReticular = (q1: number, q2: number, r1: number, r2: number): number => (r1 + r2 > 0 ? Math.abs(q1 * q2) / (r1 + r2) : NaN);
export const COMPUESTOS_IONICOS = [
  { formula: "KCl", cation: "K⁺", anion: "Cl⁻", q1: 1, q2: 1, r1: 138, r2: 181, fusion: 770 },
  { formula: "NaCl", cation: "Na⁺", anion: "Cl⁻", q1: 1, q2: 1, r1: 102, r2: 181, fusion: 801 },
  { formula: "LiF", cation: "Li⁺", anion: "F⁻", q1: 1, q2: 1, r1: 76, r2: 133, fusion: 845 },
  { formula: "CaO", cation: "Ca²⁺", anion: "O²⁻", q1: 2, q2: 2, r1: 100, r2: 140, fusion: 2613 },
  { formula: "MgO", cation: "Mg²⁺", anion: "O²⁻", q1: 2, q2: 2, r1: 72, r2: 140, fusion: 2852 },
] as const;

export type Atomo = { s: string; x: number; y: number; lp: number[] };
export type Molecula = { formula: string; nombre: string; atomos: Atomo[]; enlaces: [number, number, number][]; geometria: string; polar: boolean };
/** lp = ángulos (grados, sentido antihorario desde +x) donde se dibuja cada par solitario. */
export const MOLECULAS: Molecula[] = [
  { formula: "H2", nombre: "Hidrógeno", atomos: [{ s: "H", x: -1, y: 0, lp: [] }, { s: "H", x: 1, y: 0, lp: [] }], enlaces: [[0, 1, 1]], geometria: "lineal", polar: false },
  { formula: "Cl2", nombre: "Cloro", atomos: [{ s: "Cl", x: -1, y: 0, lp: [90, 180, 270] }, { s: "Cl", x: 1, y: 0, lp: [90, 0, 270] }], enlaces: [[0, 1, 1]], geometria: "lineal", polar: false },
  { formula: "O2", nombre: "Oxígeno", atomos: [{ s: "O", x: -1, y: 0, lp: [90, 270] }, { s: "O", x: 1, y: 0, lp: [90, 270] }], enlaces: [[0, 1, 2]], geometria: "lineal", polar: false },
  { formula: "N2", nombre: "Nitrógeno", atomos: [{ s: "N", x: -1, y: 0, lp: [180] }, { s: "N", x: 1, y: 0, lp: [0] }], enlaces: [[0, 1, 3]], geometria: "lineal", polar: false },
  { formula: "HCl", nombre: "Cloruro de hidrógeno", atomos: [{ s: "H", x: -1, y: 0, lp: [] }, { s: "Cl", x: 1, y: 0, lp: [90, 0, 270] }], enlaces: [[0, 1, 1]], geometria: "lineal", polar: true },
  { formula: "H2O", nombre: "Agua", atomos: [{ s: "O", x: 0, y: -0.3, lp: [60, 120] }, { s: "H", x: -0.9, y: 0.7, lp: [] }, { s: "H", x: 0.9, y: 0.7, lp: [] }], enlaces: [[0, 1, 1], [0, 2, 1]], geometria: "angular", polar: true },
  { formula: "NH3", nombre: "Amoniaco", atomos: [{ s: "N", x: 0, y: -0.2, lp: [90] }, { s: "H", x: -1, y: 0.6, lp: [] }, { s: "H", x: 1, y: 0.6, lp: [] }, { s: "H", x: 0, y: 1, lp: [] }], enlaces: [[0, 1, 1], [0, 2, 1], [0, 3, 1]], geometria: "piramidal", polar: true },
  { formula: "CH4", nombre: "Metano", atomos: [{ s: "C", x: 0, y: 0, lp: [] }, { s: "H", x: -1, y: 0, lp: [] }, { s: "H", x: 1, y: 0, lp: [] }, { s: "H", x: 0, y: -1, lp: [] }, { s: "H", x: 0, y: 1, lp: [] }], enlaces: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]], geometria: "tetraédrica", polar: false },
  { formula: "CO2", nombre: "Dióxido de carbono", atomos: [{ s: "O", x: -1.3, y: 0, lp: [90, 270] }, { s: "C", x: 0, y: 0, lp: [] }, { s: "O", x: 1.3, y: 0, lp: [90, 270] }], enlaces: [[0, 1, 2], [1, 2, 2]], geometria: "lineal", polar: false },
];
export const VALENCIA: Record<string, number> = { H: 1, C: 4, N: 5, O: 6, Cl: 7 };
/** Electrones de valencia totales de la molécula. */
export const electronesTotales = (m: Molecula): number => m.atomos.reduce((s, a) => s + (VALENCIA[a.s] ?? 0), 0);
/** Electrones que aparecen en la estructura de Lewis (2 por cada enlace de orden 1 en cada línea, más 2 por par solitario). */
export const electronesLewis = (m: Molecula): number => m.enlaces.reduce((s, e) => s + 2 * e[2], 0) + m.atomos.reduce((s, a) => s + 2 * a.lp.length, 0);
export const paresEnlazantes = (m: Molecula): number => m.enlaces.reduce((s, e) => s + e[2], 0);
export const paresSolitarios = (m: Molecula): number => m.atomos.reduce((s, a) => s + a.lp.length, 0);
export function diferenciaEN(a: string, b: string): number | null {
  const ia = (SIMBOLOS as readonly string[]).indexOf(a) + 1;
  const ib = (SIMBOLOS as readonly string[]).indexOf(b) + 1;
  const ea = ia > 0 ? valorPropiedad("electroneg", ia) : null;
  const eb = ib > 0 ? valorPropiedad("electroneg", ib) : null;
  return ea === null || eb === null ? null : Math.abs(ea - eb);
}
export function tipoPorEN(d: number | null): string {
  if (d === null) return "no definida";
  if (d < 0.4) return "covalente apolar";
  if (d < 1.7) return "covalente polar";
  return "iónico";
}

export type Fusion = "baja" | "media" | "alta";
export type Pruebas = { conduceSolido: boolean; conduceDisuelto: boolean; fusion: Fusion; dura: boolean; soluble: boolean };
export function clasificarSustancia(p: Pruebas): string {
  if (p.conduceSolido) return "metálica";
  if (p.conduceDisuelto) return "iónica";
  if (p.fusion === "alta" && p.dura) return "covalente reticular";
  if (p.fusion === "baja") return "covalente molecular";
  return "indeterminada (faltan datos)";
}
export const EJEMPLOS_PRUEBAS: { nombre: string; pruebas: Pruebas }[] = [
  { nombre: "Sal común (NaCl)", pruebas: { conduceSolido: false, conduceDisuelto: true, fusion: "media", dura: true, soluble: true } },
  { nombre: "Cobre", pruebas: { conduceSolido: true, conduceDisuelto: false, fusion: "alta", dura: false, soluble: false } },
  { nombre: "Azúcar", pruebas: { conduceSolido: false, conduceDisuelto: false, fusion: "baja", dura: false, soluble: true } },
  { nombre: "Cuarzo (SiO₂)", pruebas: { conduceSolido: false, conduceDisuelto: false, fusion: "alta", dura: true, soluble: false } },
];

export type TipoFuerza = "London" | "dipolo-dipolo" | "enlace de hidrógeno";
export const SUSTANCIAS_FUERZAS: { nombre: string; formula: string; tipo: TipoFuerza; ebullicion: number }[] = [
  { nombre: "Helio", formula: "He", tipo: "London", ebullicion: -269 },
  { nombre: "Neón", formula: "Ne", tipo: "London", ebullicion: -246 },
  { nombre: "Argón", formula: "Ar", tipo: "London", ebullicion: -186 },
  { nombre: "Kriptón", formula: "Kr", tipo: "London", ebullicion: -153 },
  { nombre: "Xenón", formula: "Xe", tipo: "London", ebullicion: -108 },
  { nombre: "Metano", formula: "CH₄", tipo: "London", ebullicion: -162 },
  { nombre: "Cloruro de hidrógeno", formula: "HCl", tipo: "dipolo-dipolo", ebullicion: -85 },
  { nombre: "Sulfuro de hidrógeno", formula: "H₂S", tipo: "dipolo-dipolo", ebullicion: -60 },
  { nombre: "Amoniaco", formula: "NH₃", tipo: "enlace de hidrógeno", ebullicion: -33 },
  { nombre: "Fluoruro de hidrógeno", formula: "HF", tipo: "enlace de hidrógeno", ebullicion: 20 },
  { nombre: "Metanol", formula: "CH₃OH", tipo: "enlace de hidrógeno", ebullicion: 65 },
  { nombre: "Agua", formula: "H₂O", tipo: "enlace de hidrógeno", ebullicion: 100 },
];
export const COLOR_FUERZA: Record<TipoFuerza, string> = { London: MANIM.blue, "dipolo-dipolo": MANIM.orange, "enlace de hidrógeno": MANIM.red };
export const EXPLICACION_FUERZA: Record<TipoFuerza, string> = {
  London: "Fuerzas de dispersión: dipolos instantáneos en moléculas apolares. Aumentan con el tamaño y la masa.",
  "dipolo-dipolo": "Atracción entre los extremos con carga parcial opuesta de moléculas polares.",
  "enlace de hidrógeno": "Atracción especialmente fuerte entre un H unido a F, O o N y un par solitario de F, O o N de otra molécula.",
};

/* ───────────── 1. Redes iónicas ───────────── */

export function RedIonicaFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 1, 0, COMPUESTOS_IONICOS.length - 1));
  const [i, setI] = useState(init);
  const c = COMPUESTOS_IONICOS[i]!;
  const nacl = COMPUESTOS_IONICOS[1]!;
  const idx = indiceReticular(c.q1, c.q2, c.r1, c.r2);
  const refIdx = indiceReticular(nacl.q1, nacl.q2, nacl.r1, nacl.r2);
  const maxIdx = Math.max(...COMPUESTOS_IONICOS.map((x) => indiceReticular(x.q1, x.q2, x.r1, x.r2)));
  const esc = 0.28;
  const cx = 90;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cuanto mayores son las cargas y menores los iones, más fuerte es la atracción y mayor el punto de fusión."}
      onReset={() => setI(init)}
      controls={<Choice label="Compuesto iónico" items={COMPUESTOS_IONICOS.map((x, k) => ({ value: String(k), label: x.formula }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={190} testId="red-ionica" maxH={210}>
        <circle cx={cx} cy={70} r={c.r1 * esc} fill={MANIM.red} fillOpacity={0.6} stroke={MANIM.ink} strokeWidth={2} />
        <circle cx={cx + (c.r1 + c.r2) * esc} cy={70} r={c.r2 * esc} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.ink} strokeWidth={2} />
        <text x={cx} y={74} textAnchor="middle" fill={MANIM.ink} fontSize={12} fontWeight={700}>{c.cation}</text>
        <text x={cx + (c.r1 + c.r2) * esc} y={74} textAnchor="middle" fill={MANIM.ink} fontSize={12} fontWeight={700}>{c.anion}</text>
        <text x={40} y={150} fill={MANIM.muted} fontSize={11}>{`d = r₊ + r₋ = ${c.r1} + ${c.r2} = ${c.r1 + c.r2} pm`}</text>
        {COMPUESTOS_IONICOS.map((x, k) => {
          const v = indiceReticular(x.q1, x.q2, x.r1, x.r2);
          const h = (v / maxIdx) * 90;
          const sel = k === i;
          return (
            <g key={x.formula}>
              <rect x={290 + k * 46} y={130 - h} width={34} height={h} fill={sel ? MANIM.orange : MANIM.muted} fillOpacity={sel ? 0.95 : 0.4} />
              <text x={307 + k * 46} y={145} textAnchor="middle" fill={sel ? MANIM.ink : MANIM.muted} fontSize={11}>{x.formula}</text>
              <text x={307 + k * 46} y={124 - h} textAnchor="middle" fill={MANIM.muted} fontSize={10}>{`${fmtEs(x.fusion, 0)}`}</text>
            </g>
          );
        })}
        <text x={290} y={170} fill={MANIM.muted} fontSize={11}>altura: índice reticular · cifra: p. fusión (°C)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Compuesto">{`${c.formula} (${c.cation} y ${c.anion})`}</Stat>
        <Stat color={MANIM.orange} label="Índice |q₊q₋|/(r₊+r₋) (×1000)">{`${f2(idx * 1000)}`}</Stat>
        <Stat color={MANIM.purple} label="Frente al NaCl">{`× ${f2(idx / refIdx)}`}</Stat>
        <Stat color={MANIM.red} label="Punto de fusión aprox.">{`${fmtEs(c.fusion, 0)} °C`}</Stat>
      </Readout>
      <Note>En un <b>cristal iónico</b> cada ion se rodea de iones de carga contraria formando una <b>red cristalina</b> (en el NaCl, cada Na⁺ tiene 6 Cl⁻ alrededor). La <b>energía reticular</b> es la que se desprende al formarse la red a partir de iones gaseosos. Según la <b>ley de Coulomb</b>, es mayor cuanto <b>mayores son las cargas</b> y <b>menor es la distancia</b> entre iones: por eso el <b>MgO</b> (2+ y 2−, iones pequeños) funde a 2850 °C y el NaCl a 801 °C. El índice de aquí es un <b>modelo simplificado</b>; los radios iónicos y los puntos de fusión son valores aproximados y solo para los cinco compuestos mostrados.</Note>
    </Frame>
  );
}

/* ───────────── 2. Lewis y polaridad ───────────── */

export function LewisFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 5, 0, MOLECULAS.length - 1));
  const [i, setI] = useState(init);
  const m = MOLECULAS[i]!;
  const cx = 260;
  const cy = 80;
  const k = 50;
  const P = (a: Atomo): [number, number] => [cx + a.x * k, cy + a.y * k];
  const diffs = m.enlaces.map(([a, b]) => ({ par: `${m.atomos[a]!.s}–${m.atomos[b]!.s}`, d: diferenciaEN(m.atomos[a]!.s, m.atomos[b]!.s) }));
  const dMax = Math.max(...diffs.map((d) => d.d ?? 0));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada átomo completa su octeto (dos electrones el H) compartiendo pares de electrones."}
      onReset={() => setI(init)}
      controls={<Choice label="Molécula" items={MOLECULAS.map((x, kk) => ({ value: String(kk), label: x.formula.replace(/\d/g, (d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)]!) }))} value={String(i)} onChange={(kk) => setI(Number(kk))} />}
    >
      <Svg w={520} h={160} testId="lewis" maxH={180}>
        {m.enlaces.map(([a, b, o], ei) => {
          const A = P(m.atomos[a]!);
          const B = P(m.atomos[b]!);
          const dx = B[0] - A[0];
          const dy = B[1] - A[1];
          const L = Math.hypot(dx, dy) || 1;
          const nx = -dy / L;
          const ny = dx / L;
          const ux = dx / L;
          const uy = dy / L;
          return (
            <g key={ei}>
              {Array.from({ length: o }, (_, j) => {
                const off = (j - (o - 1) / 2) * 6;
                return <Seg key={j} a={[A[0] + ux * 14 + nx * off, A[1] + uy * 14 + ny * off]} b={[B[0] - ux * 14 + nx * off, B[1] - uy * 14 + ny * off]} color={MANIM.ink} width={2.5} />;
              })}
            </g>
          );
        })}
        {m.atomos.map((a, ai) => {
          const [x, y] = P(a);
          return (
            <g key={ai}>
              <text x={x} y={y + 5} textAnchor="middle" fill={MANIM.yellow} fontSize={16} fontWeight={700}>{a.s}</text>
              {a.lp.map((ang, j) => {
                const r = 22;
                const px = x + r * Math.cos((ang * Math.PI) / 180);
                const py = y - r * Math.sin((ang * Math.PI) / 180);
                const tx = -Math.sin((ang * Math.PI) / 180) * 3;
                const ty = -Math.cos((ang * Math.PI) / 180) * 3;
                return (
                  <g key={j}>
                    <Dot p={[px - tx, py - ty]} r={2.8} color={MANIM.green} />
                    <Dot p={[px + tx, py + ty]} r={2.8} color={MANIM.green} />
                  </g>
                );
              })}
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Molécula">{`${m.nombre} (${m.formula})`}</Stat>
        <Stat color={MANIM.blue} label="Electrones de valencia">{`${electronesTotales(m)} = ${paresEnlazantes(m) * 2} (enlazantes) + ${paresSolitarios(m) * 2} (solitarios)`}</Stat>
        <Stat color={MANIM.orange} label="Diferencia de electronegatividad">{diffs.map((d) => `${d.par}: ${d.d === null ? "—" : f2(d.d)}`).join(" · ")}</Stat>
        <Stat color={MANIM.purple} label="Tipo de enlace">{tipoPorEN(dMax)}</Stat>
        <Stat color={MANIM.green} label="Geometría">{m.geometria}</Stat>
        <Stat color={m.polar ? MANIM.red : MANIM.muted} label="Molécula">{m.polar ? "polar" : "apolar"}</Stat>
      </Readout>
      <Note>En una <b>estructura de Lewis</b> cada átomo se rodea de <b>8 electrones</b> (2 el hidrógeno): los <b>pares compartidos</b> son enlaces (una raya cada uno: simple, doble o triple) y los <b>pares solitarios</b> se dibujan como puntos. El nº total de electrones es la <b>suma de los electrones de valencia</b>. La forma de la molécula depende de que los pares de electrones se <b>repelan</b> y se sitúen lo más lejos posible (<b>modelo RPECV</b>): lineal, angular, piramidal, tetraédrica. Una molécula es <b>polar</b> si tiene enlaces polares y su geometría es <b>asimétrica</b> (H₂O, NH₃, HCl); el CO₂ y el CH₄ tienen enlaces polares o casi apolares pero son <b>apolares</b> por su simetría. Los dibujos son <b>planos y esquemáticos</b>.</Note>
    </Frame>
  );
}

/* ───────────── 3. ¿Qué tipo de sustancia es? ───────────── */

const SI_NO = [{ value: "si", label: "Sí" }, { value: "no", label: "No" }];

export function ClasificaSustanciaFq4Explorador({ block }: { block: ToolBlock }) {
  const idx = Math.round(num(block.params?.n, 0, 0, EJEMPLOS_PRUEBAS.length - 1));
  const init = EJEMPLOS_PRUEBAS[idx]!.pruebas;
  const [p, setP] = useState<Pruebas>(init);
  const tipo = clasificarSustancia(p);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Combina los resultados de los ensayos para deducir el tipo de enlace."}
      onReset={() => setP(init)}
      controls={
        <>
          <Choice label="Cargar un ejemplo" items={EJEMPLOS_PRUEBAS.map((x, k) => ({ value: String(k), label: x.nombre }))} value="" onChange={(k) => setP(EJEMPLOS_PRUEBAS[Number(k)]!.pruebas)} />
          <Choice label="Conduce la electricidad en estado sólido" items={SI_NO} value={p.conduceSolido ? "si" : "no"} onChange={(v) => setP((o) => ({ ...o, conduceSolido: v === "si" }))} />
          <Choice label="Conduce fundida o disuelta" items={SI_NO} value={p.conduceDisuelto ? "si" : "no"} onChange={(v) => setP((o) => ({ ...o, conduceDisuelto: v === "si" }))} />
          <Choice label="Punto de fusión" items={[{ value: "baja", label: "Bajo (< 300 °C)" }, { value: "media", label: "Medio (300–1000 °C)" }, { value: "alta", label: "Alto (> 1000 °C)" }]} value={p.fusion} onChange={(v) => setP((o) => ({ ...o, fusion: v as Fusion }))} />
          <Choice label="Dureza" items={[{ value: "dura", label: "Dura" }, { value: "blanda", label: "Blanda" }]} value={p.dura ? "dura" : "blanda"} onChange={(v) => setP((o) => ({ ...o, dura: v === "dura" }))} />
        </>
      }
    >
      <Svg w={520} h={80} testId="clasifica-sustancia" maxH={100}>
        <text x={260} y={36} textAnchor="middle" fill={MANIM.muted} fontSize={13}>Sustancia con enlace…</text>
        <text x={260} y={64} textAnchor="middle" fill={MANIM.yellow} fontSize={22} fontWeight={700}>{tipo}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Razonamiento">{p.conduceSolido ? "Conduce en estado sólido: hay electrones libres → metálico." : p.conduceDisuelto ? "No conduce sólida pero sí fundida o disuelta: hay iones → iónico." : p.fusion === "alta" && p.dura ? "No conduce, muy dura y de fusión muy alta: red covalente." : p.fusion === "baja" ? "No conduce y funde a baja temperatura: moléculas → covalente molecular." : "Con estos datos no se puede decidir."}</Stat>
      </Readout>
      <Note>Las <b>propiedades</b> de una sustancia dependen de su <b>estructura</b> y de las fuerzas que mantienen unidas sus partículas. Los <b>metales</b> conducen la electricidad en estado sólido porque tienen <b>electrones deslocalizados</b> (modelo del mar de electrones) y son dúctiles y maleables. Los <b>compuestos iónicos</b> son sólidos duros y quebradizos, con puntos de fusión altos, <b>no conducen en sólido</b> y sí fundidos o disueltos (los iones se mueven). Las sustancias <b>covalentes moleculares</b> tienen puntos de fusión bajos y no conducen. Los <b>sólidos covalentes reticulares</b> (diamante, cuarzo) son muy duros y de punto de fusión altísimo. La clasificación es una guía, no una regla absoluta (el grafito, por ejemplo, conduce).</Note>
    </Frame>
  );
}

/* ───────────── 4. Fuerzas intermoleculares ───────────── */

export function FuerzasIntermolecularesFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 11, 0, SUSTANCIAS_FUERZAS.length - 1));
  const [i, setI] = useState(init);
  const s = SUSTANCIAS_FUERZAS[i]!;
  const orden = SUSTANCIAS_FUERZAS.map((x, k) => ({ ...x, k })).sort((a, b) => a.ebullicion - b.ebullicion);
  const min = -280;
  const max = 120;
  const bw = 28;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cuanto más fuertes son las fuerzas entre moléculas, mayor es el punto de ebullición."}
      onReset={() => setI(init)}
      controls={<Choice label="Sustancia" items={SUSTANCIAS_FUERZAS.map((x, k) => ({ value: String(k), label: x.formula }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={185} testId="fuerzas-intermoleculares" maxH={205}>
        <Seg a={[30, 150]} b={[500, 150]} color={MANIM.ink} width={2} />
        {orden.map((x, j) => {
          const h = ((x.ebullicion - min) / (max - min)) * 120;
          const sel = x.k === i;
          return (
            <g key={x.formula}>
              <rect x={36 + j * (bw + 9)} y={150 - h} width={bw} height={h} fill={COLOR_FUERZA[x.tipo]} fillOpacity={sel ? 0.95 : 0.45} stroke={sel ? MANIM.ink : "none"} strokeWidth={2} />
              <text x={36 + j * (bw + 9) + bw / 2} y={164} textAnchor="middle" fill={sel ? MANIM.ink : MANIM.muted} fontSize={9}>{x.formula}</text>
            </g>
          );
        })}
        {(Object.keys(COLOR_FUERZA) as TipoFuerza[]).map((t, j) => (
          <g key={t}>
            <rect x={36 + j * 150} y={4} width={10} height={10} fill={COLOR_FUERZA[t]} />
            <text x={50 + j * 150} y={13} fill={MANIM.muted} fontSize={10}>{t}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Sustancia">{`${s.nombre} (${s.formula})`}</Stat>
        <Stat color={COLOR_FUERZA[s.tipo]} label="Fuerza intermolecular dominante">{s.tipo}</Stat>
        <Stat color={MANIM.orange} label="Punto de ebullición aprox.">{`${fmtEs(s.ebullicion, 0)} °C`}</Stat>
        <Stat color={MANIM.green} label="Explicación">{EXPLICACION_FUERZA[s.tipo]}</Stat>
      </Readout>
      <Note>Entre las moléculas actúan <b>fuerzas intermoleculares</b>, mucho más débiles que los enlaces covalentes, que determinan los puntos de fusión y de ebullición. De menor a mayor intensidad: <b>fuerzas de London</b> (dispersión; existen en todas las sustancias y crecen con la masa y el tamaño: sube la temperatura de ebullición de He a Xe), <b>dipolo–dipolo</b> (moléculas polares) y <b>enlace de hidrógeno</b> (H unido a F, O o N). Por eso el <b>agua</b> (masa 18) hierve a 100 °C mientras que el metano (masa 16) lo hace a −162 °C. Puntos de ebullición aproximados, a presión normal.</Note>
    </Frame>
  );
}
