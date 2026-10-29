"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

/* ───────────── Cálculos y datos (se comprueban en los tests) ───────────── */

export const SIMBOLOS = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"] as const;
export const NOMBRES = ["Hidrógeno", "Helio", "Litio", "Berilio", "Boro", "Carbono", "Nitrógeno", "Oxígeno", "Flúor", "Neón", "Sodio", "Magnesio", "Aluminio", "Silicio", "Fósforo", "Azufre", "Cloro", "Argón", "Potasio", "Calcio", "Escandio", "Titanio", "Vanadio", "Cromo", "Manganeso", "Hierro", "Cobalto", "Níquel", "Cobre", "Cinc", "Galio", "Germanio", "Arsénico", "Selenio", "Bromo", "Kriptón"] as const;
export const simbolo = (Z: number): string => SIMBOLOS[Math.round(Z) - 1] ?? "?";
export const nombre = (Z: number): string => NOMBRES[Math.round(Z) - 1] ?? "?";

/** Orden de llenado (regla de Madelung) hasta el 4p. */
export const ORDEN_LLENADO = [
  { sub: "1s", n: 1, l: 0 }, { sub: "2s", n: 2, l: 0 }, { sub: "2p", n: 2, l: 1 }, { sub: "3s", n: 3, l: 0 }, { sub: "3p", n: 3, l: 1 },
  { sub: "4s", n: 4, l: 0 }, { sub: "3d", n: 3, l: 2 }, { sub: "4p", n: 4, l: 1 },
] as const;
const capacidad = (l: number): number => 2 * (2 * l + 1);
/** Configuración electrónica (subnivel → electrones) de un átomo neutro con Z entre 1 y 36 (con las excepciones del Cr y del Cu). */
export function configuracion(Z: number): { sub: string; e: number }[] {
  const z = Math.round(Z);
  if (!(z >= 1 && z <= 36)) return [];
  let resto = z;
  const out: { sub: string; e: number }[] = [];
  for (const s of ORDEN_LLENADO) {
    const k = Math.min(capacidad(s.l), resto);
    if (k > 0) out.push({ sub: s.sub, e: k });
    resto -= k;
    if (resto <= 0) break;
  }
  const set = (sub: string, e: number) => {
    const f = out.find((x) => x.sub === sub);
    if (f) f.e = e;
    else out.push({ sub, e });
  };
  if (z === 24) { set("4s", 1); set("3d", 5); }
  if (z === 29) { set("4s", 1); set("3d", 10); }
  return out.sort((a, b) => ORDEN_LLENADO.findIndex((x) => x.sub === a.sub) - ORDEN_LLENADO.findIndex((x) => x.sub === b.sub));
}
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
export const sup = (n: number): string => String(n).replace(/[0-9]/g, (c) => SUP[Number(c)]!);
/** Configuración como texto ordenada por n y l (1s² 2s² 2p⁶ 3s² 3p⁶ 3d¹⁰ 4s² …). */
export function textoConfiguracion(Z: number): string {
  return configuracion(Z)
    .slice()
    .sort((a, b) => Number(a.sub[0]) - Number(b.sub[0]) || "spdf".indexOf(a.sub[1]!) - "spdf".indexOf(b.sub[1]!))
    .map((x) => `${x.sub}${sup(x.e)}`)
    .join(" ");
}
/** Electrones de valencia (capa más externa; en los metales de transición se cuentan los de 4s y 3d incompleto). */
export function electronesValencia(Z: number): number {
  const c = configuracion(Z);
  if (c.length === 0) return NaN;
  const nMax = Math.max(...c.map((x) => Number(x.sub[0])));
  const ext = c.filter((x) => Number(x.sub[0]) === nMax).reduce((s, x) => s + x.e, 0);
  const d = c.find((x) => x.sub === "3d");
  return d && d.e < 10 && nMax === 4 ? ext + d.e : ext;
}
/** Electrones desapareados (regla de Hund). */
export function desapareados(Z: number): number {
  return configuracion(Z).reduce((s, x) => {
    const l = "spdf".indexOf(x.sub[1]!);
    const orb = 2 * l + 1;
    return s + (x.e <= orb ? x.e : 2 * orb - x.e);
  }, 0);
}
/** Posición en la tabla periódica (Z ≤ 36): periodo, grupo (1–18) y bloque. */
export function posicion(Z: number): { periodo: number; grupo: number; bloque: "s" | "p" | "d" } | null {
  const z = Math.round(Z);
  if (z < 1 || z > 36) return null;
  const periodo = z <= 2 ? 1 : z <= 10 ? 2 : z <= 18 ? 3 : 4;
  if (z === 1) return { periodo, grupo: 1, bloque: "s" };
  if (z === 2) return { periodo, grupo: 18, bloque: "s" };
  const ini = periodo === 2 ? 3 : periodo === 3 ? 11 : 19;
  const k = z - ini; // 0..
  if (k <= 1) return { periodo, grupo: k + 1, bloque: "s" };
  if (periodo === 4 && z >= 21 && z <= 30) return { periodo, grupo: z - 18, bloque: "d" };
  const kp = periodo === 4 ? z - 31 : k - 2;
  return { periodo, grupo: 13 + kp, bloque: "p" };
}
/** Ion monoatómico más probable (carga) según el grupo. */
export function cargaIon(Z: number): number | null {
  const p = posicion(Z);
  if (!p) return null;
  if (p.bloque === "d") return 2;
  if (p.grupo === 1) return 1;
  if (p.grupo === 2) return 2;
  if (p.grupo === 13) return 3;
  if (p.grupo === 15) return -3;
  if (p.grupo === 16) return -2;
  if (p.grupo === 17) return -1;
  return null;
}

export type Propiedad = "radio" | "ionizacion" | "electroneg";
export const RADIO = [31, 28, 128, 96, 84, 76, 71, 66, 57, 58, 166, 141, 121, 111, 107, 105, 102, 106, 203, 176, 170, 160, 153, 139, 139, 132, 126, 124, 132, 122, 122, 120, 119, 120, 120, 116] as const;
export const IONIZACION = [1312, 2372, 520, 900, 801, 1086, 1402, 1314, 1681, 2081, 496, 738, 578, 787, 1012, 1000, 1251, 1521, 419, 590, 633, 659, 651, 653, 717, 763, 760, 737, 745, 906, 579, 762, 947, 941, 1140, 1351] as const;
export const ELECTRONEG: (number | null)[] = [2.2, null, 0.98, 1.57, 2.04, 2.55, 3.04, 3.44, 3.98, null, 0.93, 1.31, 1.61, 1.9, 2.19, 2.58, 3.16, null, 0.82, 1.0, 1.36, 1.54, 1.63, 1.66, 1.55, 1.83, 1.88, 1.91, 1.9, 1.65, 1.81, 2.01, 2.18, 2.55, 2.96, 3.0];
export function valorPropiedad(p: Propiedad, Z: number): number | null {
  const i = Math.round(Z) - 1;
  if (i < 0 || i > 35) return null;
  return p === "radio" ? RADIO[i]! : p === "ionizacion" ? IONIZACION[i]! : ELECTRONEG[i] ?? null;
}
export const UNIDAD: Record<Propiedad, string> = { radio: "pm", ionizacion: "kJ/mol", electroneg: "" };
export const NOMBRE_PROP: Record<Propiedad, string> = { radio: "Radio atómico (covalente)", ionizacion: "Primera energía de ionización", electroneg: "Electronegatividad (Pauling)" };

/* ───────────── 1. Configuración electrónica ───────────── */

export function ConfiguracionFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 17, 1, 36));
  const [Z, setZ] = useState(init);
  const conf = configuracion(Z);
  const pos = posicion(Z)!;
  // dibujamos las cajas (orbitales) en el orden de llenado
  let x = 24;
  const cajas: { x: number; sub: string; arriba: boolean; abajo: boolean; etiqueta: boolean }[] = [];
  const grupos: { x0: number; x1: number; sub: string }[] = [];
  for (const s of ORDEN_LLENADO) {
    const e = conf.find((c) => c.sub === s.sub)?.e ?? 0;
    const orb = 2 * s.l + 1;
    const x0 = x;
    for (let o = 0; o < orb; o++) {
      const arriba = e > o;
      const abajo = e > orb + o;
      cajas.push({ x, sub: s.sub, arriba, abajo, etiqueta: o === 0 });
      x += 24;
    }
    grupos.push({ x0, x1: x - 4, sub: s.sub });
    x += 8;
  }
  const val = electronesValencia(Z);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Los electrones ocupan los subniveles de menor energía primero; en orbitales del mismo subnivel se colocan desapareados antes de aparearse (regla de Hund)."}
      onReset={() => setZ(init)}
      controls={<Slider label="Número atómico Z" value={Z} min={1} max={36} step={1} color={MANIM.red} onChange={setZ} />}
    >
      <Svg w={520} h={110} testId="configuracion-orbitales" maxH={130}>
        {cajas.map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={38} width={20} height={24} fill="none" stroke={MANIM.muted} strokeWidth={1.5} />
            {c.arriba && <text x={c.x + 6} y={55} fill={MANIM.blue} fontSize={13} fontWeight={700}>↑</text>}
            {c.abajo && <text x={c.x + 9} y={55} fill={MANIM.orange} fontSize={13} fontWeight={700}>↓</text>}
          </g>
        ))}
        {grupos.map((g) => (
          <text key={g.sub} x={(g.x0 + g.x1) / 2} y={80} textAnchor="middle" fill={MANIM.ink} fontSize={11}>{g.sub}</text>
        ))}
        <text x={24} y={20} fill={MANIM.yellow} fontSize={14} fontWeight={700}>{`${nombre(Z)} (${simbolo(Z)}), Z = ${Z}`}</text>
        <Seg a={[24, 100]} b={[496, 100]} color={MANIM.grid} width={1} />
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Configuración electrónica">{textoConfiguracion(Z)}</Stat>
        <Stat color={MANIM.purple} label="Electrones de valencia">{`${val}`}</Stat>
        <Stat color={MANIM.blue} label="Electrones desapareados">{`${desapareados(Z)}`}</Stat>
        <Stat color={MANIM.orange} label="Posición">{`periodo ${pos.periodo}, grupo ${pos.grupo}, bloque ${pos.bloque}`}</Stat>
      </Readout>
      <Note>Los electrones se distribuyen en <b>niveles</b> (n = 1, 2, 3…) y <b>subniveles</b> (s, p, d, f), formados por <b>orbitales</b> con capacidad de 2 electrones (s: 1 orbital, p: 3, d: 5). Se llenan según la <b>regla de Madelung</b>: 1s, 2s, 2p, 3s, 3p, <b>4s, 3d</b>, 4p… (el 4s se llena antes que el 3d). Se cumple el <b>principio de exclusión de Pauli</b> (dos electrones de un orbital tienen espines opuestos) y la <b>regla de Hund</b> (en orbitales de igual energía, los electrones se colocan <b>desapareados</b> mientras se pueda). El <b>cromo</b> (4s¹ 3d⁵) y el <b>cobre</b> (4s¹ 3d¹⁰) son <b>excepciones</b> por la estabilidad de d semilleno o lleno.</Note>
    </Frame>
  );
}

/* ───────────── 2. Tabla periódica y bloques ───────────── */

const COLOR_BLOQUE = { s: MANIM.red, p: MANIM.green, d: MANIM.orange } as const;

export function TablaBloquesFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 26, 1, 36));
  const [Z, setZ] = useState(init);
  const p = posicion(Z)!;
  const cw = 24;
  const ch = 26;
  const x0 = 34;
  const y0 = 24;
  const q = cargaIon(Z);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El periodo es el nivel más externo; el bloque, el subnivel que se está llenando; el grupo, la columna."}
      onReset={() => setZ(init)}
      controls={<Slider label="Elemento (número atómico Z)" value={Z} min={1} max={36} step={1} color={MANIM.red} onChange={setZ} />}
    >
      <Svg w={520} h={150} testId="tabla-bloques" maxH={170}>
        {SIMBOLOS.map((s, i) => {
          const pos = posicion(i + 1)!;
          const x = x0 + (pos.grupo - 1) * cw;
          const y = y0 + (pos.periodo - 1) * ch;
          const sel = i + 1 === Z;
          return (
            <g key={s}>
              <rect x={x} y={y} width={cw - 2} height={ch - 2} rx={3} fill={COLOR_BLOQUE[pos.bloque]} fillOpacity={sel ? 0.95 : 0.3} stroke={sel ? MANIM.ink : COLOR_BLOQUE[pos.bloque]} strokeWidth={sel ? 2.5 : 1} />
              <text x={x + (cw - 2) / 2} y={y + 16} textAnchor="middle" fill={MANIM.ink} fontSize={10} fontWeight={700}>{s}</text>
            </g>
          );
        })}
        {Array.from({ length: 18 }, (_, g) => <text key={g} x={x0 + g * cw + 11} y={16} textAnchor="middle" fill={MANIM.muted} fontSize={9}>{g + 1}</text>)}
        {[1, 2, 3, 4].map((pp) => <text key={pp} x={20} y={y0 + (pp - 1) * ch + 16} textAnchor="middle" fill={MANIM.muted} fontSize={9}>{pp}</text>)}
        {(["s", "p", "d"] as const).map((b, i) => (
          <g key={b}>
            <rect x={60 + i * 90} y={134} width={10} height={10} fill={COLOR_BLOQUE[b]} />
            <text x={74 + i * 90} y={143} fill={MANIM.muted} fontSize={10}>{`bloque ${b}`}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Elemento">{`${nombre(Z)} (${simbolo(Z)})`}</Stat>
        <Stat color={MANIM.green} label="Periodo · grupo · bloque">{`${p.periodo} · ${p.grupo} · ${p.bloque}`}</Stat>
        <Stat color={MANIM.blue} label="Configuración">{textoConfiguracion(Z)}</Stat>
        <Stat color={MANIM.purple} label="Ion más probable">{q === null ? "no forma iones habitualmente" : q > 0 ? `catión ${q}+` : `anión ${-q}−`}</Stat>
      </Readout>
      <Note>La <b>tabla periódica</b> se organiza según la configuración electrónica. El <b>periodo</b> (fila) es el <b>nivel más externo</b> ocupado (n). El <b>bloque</b> indica el subnivel que se llena: <b>s</b> (grupos 1 y 2), <b>p</b> (grupos 13 a 18) y <b>d</b> (metales de transición, grupos 3 a 12). Los elementos de un <b>grupo</b> tienen la <b>misma configuración externa</b> y por eso propiedades químicas parecidas (alcalinos: ns¹; halógenos: ns² np⁵; gases nobles: ns² np⁶). Se muestran los 36 primeros elementos (el helio se coloca en el grupo 18).</Note>
    </Frame>
  );
}

/* ───────────── 3. Propiedades periódicas ───────────── */

export function PropiedadesPeriodicasFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { p: (["radio", "ionizacion", "electroneg"] as Propiedad[])[Math.round(num(block.params?.n, 0, 0, 2))]!, Z: Math.round(num(block.params?.a, 11, 1, 36)) };
  const [s, setS] = useState<{ p: Propiedad; Z: number }>(init);
  const vals = Array.from({ length: 36 }, (_, i) => valorPropiedad(s.p, i + 1));
  const max = Math.max(...vals.map((v) => v ?? 0));
  const bw = 11;
  const X = (i: number): number => 30 + i * (bw + 2.4);
  const v = valorPropiedad(s.p, s.Z);
  const pos = posicion(s.Z)!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El radio disminuye a lo largo de un periodo y aumenta al bajar en un grupo; la ionización y la electronegatividad, al revés."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Propiedad" items={(Object.keys(NOMBRE_PROP) as Propiedad[]).map((k) => ({ value: k, label: NOMBRE_PROP[k] }))} value={s.p} onChange={(p) => setS((o) => ({ ...o, p: p as Propiedad }))} />
          <Slider label="Elemento (Z)" value={s.Z} min={1} max={36} step={1} color={MANIM.red} onChange={(Z) => setS((o) => ({ ...o, Z }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="propiedades-periodicas-fq4" maxH={190}>
        <Seg a={[26, 140]} b={[500, 140]} color={MANIM.ink} width={2} />
        {vals.map((val, i) => {
          const h = val === null ? 0 : (val / max) * 110;
          const sel = i + 1 === s.Z;
          return (
            <g key={i}>
              <rect x={X(i)} y={140 - h} width={bw} height={h} fill={sel ? MANIM.orange : MANIM.blue} fillOpacity={sel ? 0.95 : 0.55} />
              {(i === 0 || i === 1 || i === 2 || i === 10 || i === 18 || i === 35) && <text x={X(i) + bw / 2} y={154} textAnchor="middle" fill={MANIM.muted} fontSize={9}>{SIMBOLOS[i]}</text>}
              {val === null && <text x={X(i) + bw / 2} y={136} textAnchor="middle" fill={MANIM.muted} fontSize={9}>—</text>}
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Elemento">{`${nombre(s.Z)} (${simbolo(s.Z)}) · periodo ${pos.periodo}, grupo ${pos.grupo}`}</Stat>
        <Stat color={MANIM.orange} label={NOMBRE_PROP[s.p]}>{v === null ? "no se define (gas noble)" : `${fmtEs(v, s.p === "electroneg" ? 2 : 0)} ${UNIDAD[s.p]}`.trim()}</Stat>
      </Readout>
      <Note>Las propiedades periódicas varían de forma regular con Z. El <b>radio atómico</b> <b>disminuye</b> a lo largo de un periodo (la carga nuclear efectiva aumenta y atrae más a los electrones de la misma capa) y <b>aumenta</b> al bajar en un grupo (hay más capas). La <b>energía de ionización</b> (energía para arrancar el electrón más externo) y la <b>electronegatividad</b> (tendencia a atraer electrones en un enlace) siguen la tendencia contraria: <b>aumentan</b> en un periodo y <b>disminuyen</b> en un grupo. Los <b>gases nobles</b> tienen las mayores energías de ionización. Valores aproximados (radios covalentes, escala de Pauling); no se define la electronegatividad del He, Ne y Ar.</Note>
    </Frame>
  );
}
