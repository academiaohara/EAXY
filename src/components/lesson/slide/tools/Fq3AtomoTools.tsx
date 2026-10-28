"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { capas, elemento, electronesValencia, posicionTabla, sup } from "@/components/lesson/slide/tools/Fq2AtomoTools";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Energía (eV) del nivel n del hidrógeno según Bohr: −13,6 / n². */
export const energiaNivel = (n: number): number => (n >= 1 ? -13.6 / (n * n) : NaN);
/** Energía (eV) del fotón emitido en una transición ni → nf (positiva solo si ni > nf). */
export const energiaFoton = (ni: number, nf: number): number => 13.6 * (1 / (nf * nf) - 1 / (ni * ni));
/** Longitud de onda (nm) de un fotón de energía E (eV): λ = 1240 / E. */
export const longitudOndaNm = (eV: number): number => (eV > 0 ? 1240 / eV : NaN);
export function regionEspectro(nm: number): "ultravioleta" | "visible" | "infrarrojo" | "—" {
  if (!(nm > 0)) return "—";
  return nm < 380 ? "ultravioleta" : nm <= 750 ? "visible" : "infrarrojo";
}
/** Color aproximado de una longitud de onda visible (tono HSL). */
export const colorVisible = (nm: number): string => {
  const t = Math.max(0, Math.min(1, (nm - 380) / (750 - 380)));
  return `hsl(${Math.round(270 - t * 270)}, 90%, 60%)`;
};

export type Isotopo = { A: number; ab: number };
export const ELEMENTOS_ISOTOPOS = [
  { sim: "Cl", nombre: "Cloro", z: 17, isotopos: [{ A: 35, ab: 75.8 }, { A: 37, ab: 24.2 }], real: 35.45 },
  { sim: "B", nombre: "Boro", z: 5, isotopos: [{ A: 10, ab: 19.9 }, { A: 11, ab: 80.1 }], real: 10.81 },
  { sim: "Cu", nombre: "Cobre", z: 29, isotopos: [{ A: 63, ab: 69.2 }, { A: 65, ab: 30.8 }], real: 63.55 },
  { sim: "Li", nombre: "Litio", z: 3, isotopos: [{ A: 6, ab: 7.5 }, { A: 7, ab: 92.5 }], real: 6.94 },
] as const;
/** Masa atómica media (u) de dos isótopos si el primero tiene abundancia `ab1` (%). */
export function masaMediaDos(A1: number, A2: number, ab1: number): number {
  const a = Math.max(0, Math.min(100, ab1)) / 100;
  return A1 * a + A2 * (1 - a);
}
/** Masa media de una lista de isótopos con abundancias (%) cualesquiera. */
export function masaMedia(isotopos: readonly Isotopo[]): number {
  const total = isotopos.reduce((s, i) => s + i.ab, 0);
  return total > 0 ? isotopos.reduce((s, i) => s + i.A * i.ab, 0) / total : NaN;
}

/** Carga típica del ion que forma un elemento de Z ≤ 20 (null si no suele formar iones). */
export function cargaIonTipica(Z: number): number | null {
  const pos = posicionTabla(Z);
  if (!pos) return null;
  if (Z === 1) return 1;
  switch (pos.grupo) {
    case 1: return 1;
    case 2: return 2;
    case 13: return 3;
    case 15: return -3;
    case 16: return -2;
    case 17: return -1;
    default: return null;
  }
}

export type Propiedad = "radio" | "electroneg";
export type Serie = "periodo2" | "periodo3" | "grupo1" | "grupo2";
const DATOS: Record<string, { radio: number; en?: number }> = {
  Li: { radio: 128, en: 0.98 }, Be: { radio: 96, en: 1.57 }, B: { radio: 84, en: 2.04 }, C: { radio: 76, en: 2.55 }, N: { radio: 71, en: 3.04 }, O: { radio: 66, en: 3.44 }, F: { radio: 57, en: 3.98 },
  Na: { radio: 166, en: 0.93 }, Mg: { radio: 141, en: 1.31 }, Al: { radio: 121, en: 1.61 }, Si: { radio: 111, en: 1.9 }, P: { radio: 107, en: 2.19 }, S: { radio: 105, en: 2.58 }, Cl: { radio: 102, en: 3.16 },
  K: { radio: 203, en: 0.82 }, Ca: { radio: 176, en: 1.0 },
};
const SERIES: Record<Serie, string[]> = {
  periodo2: ["Li", "Be", "B", "C", "N", "O", "F"],
  periodo3: ["Na", "Mg", "Al", "Si", "P", "S", "Cl"],
  grupo1: ["Li", "Na", "K"],
  grupo2: ["Be", "Mg", "Ca"],
};
/** Valores (radio atómico en pm aprox. o electronegatividad de Pauling) de una serie de elementos. */
export function serieValores(serie: Serie, prop: Propiedad): { sim: string; valor: number }[] {
  return SERIES[serie].map((sim) => ({ sim, valor: prop === "radio" ? DATOS[sim]!.radio : DATOS[sim]!.en! }));
}
/** Tendencia de una serie: "crece", "decrece" o "irregular". */
export function tendencia(vals: readonly number[]): "crece" | "decrece" | "irregular" {
  let up = true;
  let down = true;
  for (let i = 1; i < vals.length; i++) {
    if (vals[i]! <= vals[i - 1]!) up = false;
    if (vals[i]! >= vals[i - 1]!) down = false;
  }
  return up ? "crece" : down ? "decrece" : "irregular";
}

/* ───────────── 1. Niveles de energía (Bohr) ───────────── */

export function NivelesBohrFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { ni: Math.round(num(block.params?.a, 3, 1, 6)), nf: Math.round(num(block.params?.b, 2, 1, 6)) };
  const [s, setS] = useState(init);
  const emite = s.ni > s.nf;
  const e = emite ? energiaFoton(s.ni, s.nf) : NaN;
  const nm = longitudOndaNm(e);
  const region = regionEspectro(nm);
  const col = region === "visible" ? colorVisible(nm) : MANIM.muted;
  const yOf = (n: number): number => [150, 105, 75, 53, 37, 25][n - 1] ?? 25;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cuando un electrón baja de nivel, emite un fotón con la energía que le sobra."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Nivel inicial" value={s.ni} min={1} max={6} step={1} color={MANIM.orange} onChange={(ni) => setS((o) => ({ ...o, ni }))} />
          <Slider label="Nivel final" value={s.nf} min={1} max={6} step={1} color={MANIM.blue} onChange={(nf) => setS((o) => ({ ...o, nf }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="niveles-bohr" maxH={210}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <g key={n}>
            <Seg a={[140, yOf(n)]} b={[320, yOf(n)]} color={n === s.ni ? MANIM.orange : n === s.nf ? MANIM.blue : MANIM.muted} width={n === s.ni || n === s.nf ? 3 : 1.5} />
            <text x={128} y={yOf(n) + 4} textAnchor="end" fill={MANIM.muted} fontSize={11}>{`n = ${n}`}</text>
          </g>
        ))}
        {emite ? (
          <>
            <Seg a={[230, yOf(s.ni)]} b={[230, yOf(s.nf)]} color={col} width={3} />
            <Dot p={[230, yOf(s.nf)]} r={5} color={col} />
            <Seg a={[330, yOf(s.nf)]} b={[440, yOf(s.nf) - 30]} color={col} width={3} />
            <text x={440} y={yOf(s.nf) - 38} textAnchor="end" fill={col} fontSize={12} fontWeight={700}>fotón</text>
          </>
        ) : (
          <text x={230} y={100} textAnchor="middle" fill={MANIM.muted} fontSize={12}>Para subir de nivel el electrón debe absorber energía</text>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Energía del fotón">{emite ? `${f2(e)} eV` : "no se emite"}</Stat>
        <Stat color={col} label="Longitud de onda">{emite ? `${fmtEs(nm, 0)} nm` : "—"}</Stat>
        <Stat color={MANIM.purple} label="Región del espectro">{emite ? region : "—"}</Stat>
      </Readout>
      <Note>En el <b>modelo de Bohr</b> los electrones solo pueden ocupar <b>niveles de energía</b> determinados (n = 1, 2, 3…). Si un electrón <b>baja</b> de un nivel a otro, <b>emite</b> un fotón cuya energía es la diferencia entre los dos niveles; si <b>sube</b>, absorbe esa energía. Cada elemento tiene sus propios niveles y, por tanto, un <b>espectro</b> de líneas característico, como una <b>huella dactilar</b>. Los niveles de aquí son los del <b>hidrógeno</b> (E = −13,6 eV / n²), dibujados <b>sin escala</b>, y las longitudes de onda son aproximadas.</Note>
    </Frame>
  );
}

/* ───────────── 2. Masa atómica media ───────────── */

export function MasaAtomicaMediaFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { e: Math.round(num(block.params?.n, 0, 0, ELEMENTOS_ISOTOPOS.length - 1)), ab: -1 };
  const [s, setS] = useState(init);
  const el = ELEMENTOS_ISOTOPOS[s.e]!;
  const [i1, i2] = el.isotopos;
  const ab = s.ab < 0 ? i1.ab : s.ab;
  const m = masaMediaDos(i1.A, i2.A, ab);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La masa atómica que aparece en la tabla es la media ponderada de las masas de los isótopos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Elemento" items={ELEMENTOS_ISOTOPOS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.e)} onChange={(k) => setS({ e: Number(k), ab: -1 })} />
          <Slider label={`Abundancia del isótopo ${i1.A}${el.sim}`} value={ab} min={0} max={100} step={0.5} unit=" %" color={MANIM.orange} format={f1} onChange={(v) => setS((o) => ({ ...o, ab: v }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="masa-media" maxH={170}>
        <rect x={60} y={50} width={400} height={26} rx={6} fill={MANIM.blue} fillOpacity={0.5} />
        <rect x={60} y={50} width={(ab / 100) * 400} height={26} rx={6} fill={MANIM.orange} fillOpacity={0.9} />
        <text x={60} y={42} fill={MANIM.orange} fontSize={13} fontWeight={700}>{`${i1.A}${el.sim}: ${f1(ab)} %`}</text>
        <text x={460} y={42} textAnchor="end" fill={MANIM.blue} fontSize={13} fontWeight={700}>{`${i2.A}${el.sim}: ${f1(100 - ab)} %`}</text>
        <text x={60} y={110} fill={MANIM.ink} fontSize={13}>{`Masa atómica media = (${i1.A} · ${f1(ab)} + ${i2.A} · ${f1(100 - ab)}) / 100`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Masa atómica media">{`${f2(m)} u`}</Stat>
        <Stat color={MANIM.muted} label="Valor de la tabla">{`${f2(el.real)} u`}</Stat>
        <Stat color={MANIM.purple} label="Isótopo más abundante">{ab >= 50 ? `${i1.A}${el.sim}` : `${i2.A}${el.sim}`}</Stat>
      </Readout>
      <Note>Los <b>isótopos</b> de un elemento tienen el mismo número de protones pero distinto número de <b>neutrones</b>, y por eso distinta <b>masa</b>. La <b>masa atómica</b> que da la tabla periódica es la <b>media ponderada</b> de las masas de sus isótopos naturales, según su <b>abundancia</b>: por eso no es un número entero. Con las abundancias naturales (≈ 75,8 % de ³⁵Cl y 24,2 % de ³⁷Cl) sale 35,45 u. Las abundancias son valores aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 3. Configuración electrónica por capas ───────────── */

export function ConfiguracionElectronicaFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { Z: Math.round(num(block.params?.a, 11, 1, 20)) };
  const [s, setS] = useState(init);
  const el = elemento(s.Z)!;
  const cp = capas(s.Z);
  const val = electronesValencia(s.Z);
  const q = cargaIonTipica(s.Z);
  const pos = posicionTabla(s.Z)!;
  const cx = 150;
  const cy = 95;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Los electrones se colocan por capas: 2, 8, 8… La última capa decide cómo se comporta el elemento."}
      onReset={() => setS(init)}
      controls={<Slider label="Número atómico Z" value={s.Z} min={1} max={20} step={1} color={MANIM.red} onChange={(Z) => setS({ Z })} />}
    >
      <Svg w={520} h={190} testId="configuracion-electronica" maxH={210}>
        <circle cx={cx} cy={cy} r={9} fill={MANIM.red} fillOpacity={0.9} />
        <text x={cx} y={cy + 4} textAnchor="middle" fill={MANIM.ink} fontSize={9} fontWeight={700}>{`${s.Z}+`}</text>
        {cp.map((n, k) => {
          const r = 24 + k * 20;
          return (
            <g key={k}>
              <circle cx={cx} cy={cy} r={r} fill="none" stroke={k === cp.length - 1 ? MANIM.blue : MANIM.muted} strokeWidth={k === cp.length - 1 ? 2 : 1} />
              {Array.from({ length: n }, (_, j) => {
                const a = (j / n) * 2 * Math.PI - Math.PI / 2;
                return <Dot key={j} p={[cx + r * Math.cos(a), cy + r * Math.sin(a)]} r={3.5} color={k === cp.length - 1 ? MANIM.blue : MANIM.yellow} />;
              })}
            </g>
          );
        })}
        <text x={300} y={50} fill={MANIM.yellow} fontSize={16} fontWeight={700}>{`${el.nombre} (${el.sim})`}</text>
        <text x={300} y={78} fill={MANIM.ink} fontSize={13}>{`Capas: ${cp.join(" – ")}`}</text>
        <text x={300} y={100} fill={MANIM.blue} fontSize={13}>{`Última capa: ${val} ${val === 1 ? "electrón" : "electrones"}`}</text>
        <text x={300} y={122} fill={MANIM.muted} fontSize={13}>{`Grupo ${pos.grupo} · periodo ${pos.periodo}`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Electrones de valencia">{`${val}`}</Stat>
        <Stat color={MANIM.purple} label="Tiende a">{q === null ? (el.tipo === "gas noble" ? "no reaccionar (capa completa)" : "compartir electrones") : q > 0 ? `perder ${q} → ion ${sup(`${q === 1 ? "" : q}+`)}` : `ganar ${-q} → ion ${sup(`${q === -1 ? "" : -q}−`)}`}</Stat>
      </Readout>
      <Note>Los electrones se distribuyen en <b>capas</b> alrededor del núcleo: la 1.ª admite hasta <b>2</b> electrones, la 2.ª hasta <b>8</b> y la 3.ª, en estos elementos, también <b>8</b> (los 20 primeros). Los de la <b>última capa</b> son los <b>electrones de valencia</b> y determinan el comportamiento químico. Los átomos tienden a quedarse con la capa externa <b>completa</b> (como los gases nobles): los <b>metales</b> pierden electrones y forman <b>cationes</b>; los <b>no metales</b> los ganan y forman <b>aniones</b>. El número de capas ocupadas es el <b>periodo</b>; los electrones de valencia, el <b>grupo</b> (en los grupos principales).</Note>
    </Frame>
  );
}

/* ───────────── 4. Propiedades periódicas ───────────── */

const NOMBRE_SERIE: Record<Serie, string> = { periodo2: "Periodo 2 (Li → F)", periodo3: "Periodo 3 (Na → Cl)", grupo1: "Grupo 1 (Li, Na, K)", grupo2: "Grupo 2 (Be, Mg, Ca)" };

export function PropiedadesPeriodicasFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { serie: (["periodo2", "periodo3", "grupo1", "grupo2"] as Serie[])[Math.round(num(block.params?.n, 0, 0, 3))]!, prop: (num(block.params?.a, 0, 0, 1) >= 0.5 ? "electroneg" : "radio") as Propiedad };
  const [s, setS] = useState<{ serie: Serie; prop: Propiedad }>(init);
  const datos = serieValores(s.serie, s.prop);
  const max = Math.max(...datos.map((d) => d.valor));
  const t = tendencia(datos.map((d) => d.valor));
  const bw = 40;
  const unidad = s.prop === "radio" ? "pm" : "";
  return (
    <Frame
      stacked
      hint={block.hint ?? "El radio atómico y la electronegatividad cambian de forma regular a lo largo de un periodo y de un grupo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Serie de elementos" items={(Object.keys(NOMBRE_SERIE) as Serie[]).map((k) => ({ value: k, label: NOMBRE_SERIE[k] }))} value={s.serie} onChange={(serie) => setS((o) => ({ ...o, serie: serie as Serie }))} />
          <Choice label="Propiedad" items={[{ value: "radio", label: "Radio atómico" }, { value: "electroneg", label: "Electronegatividad" }]} value={s.prop} onChange={(prop) => setS((o) => ({ ...o, prop: prop as Propiedad }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="propiedades-periodicas" maxH={210}>
        <Seg a={[30, 150]} b={[490, 150]} color={MANIM.ink} width={2} />
        {datos.map((d, i) => {
          const h = (d.valor / max) * 110;
          const x = 50 + i * ((440 - bw) / (datos.length - 1));
          return (
            <g key={d.sim}>
              <rect x={x} y={150 - h} width={bw} height={h} fill={s.prop === "radio" ? MANIM.orange : MANIM.purple} fillOpacity={0.85} />
              <text x={x + bw / 2} y={168} textAnchor="middle" fill={MANIM.ink} fontSize={13} fontWeight={700}>{d.sim}</text>
              <text x={x + bw / 2} y={150 - h - 6} textAnchor="middle" fill={MANIM.muted} fontSize={11}>{`${fmtEs(d.valor, s.prop === "radio" ? 0 : 2)}`}</text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Tendencia">{t}</Stat>
        <Stat color={MANIM.muted} label="Unidad">{unidad || "(sin unidad)"}</Stat>
      </Readout>
      <Note>El <b>radio atómico</b> es el tamaño del átomo. <b>En un periodo</b> disminuye al ir hacia la derecha (más protones atraen con más fuerza a los electrones de la misma capa); <b>en un grupo</b> aumenta al bajar (hay más capas). La <b>electronegatividad</b> mide la tendencia a atraer electrones en un enlace: <b>aumenta</b> hacia la derecha en un periodo y <b>disminuye</b> al bajar en un grupo; el flúor es el más electronegativo. Los valores son aproximados (radios covalentes en pm y escala de Pauling).</Note>
    </Frame>
  );
}
