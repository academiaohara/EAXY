"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { SIMB, configAbreviada, configuracionBach, nombreElemento, simbolo } from "@/components/lesson/slide/tools/Fb1AtomoTools";
import { IONIZACION as IE36, RADIO as R36, ELECTRONEG as EN36 } from "@/components/lesson/slide/tools/Fq4AtomoTools";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Datos y cálculos (se comprueban en los tests) ───────────── */

/** Radio covalente (pm), 1.ª energía de ionización (kJ/mol), electronegatividad de Pauling y afinidad electrónica (kJ/mol, positiva si se libera energía), Z = 1…54. */
export const RADIO = [...R36, 220, 195, 190, 175, 164, 154, 147, 146, 142, 139, 145, 144, 142, 139, 139, 138, 139, 140] as const;
export const IONIZACION = [...IE36, 403, 550, 600, 640, 652, 684, 702, 710, 720, 804, 731, 868, 558, 709, 834, 869, 1008, 1170] as const;
export const ELECTRONEG: (number | null)[] = [...EN36, 0.82, 0.95, 1.22, 1.33, 1.6, 2.16, 1.9, 2.2, 2.28, 2.2, 1.93, 1.69, 1.78, 1.96, 2.05, 2.1, 2.66, null];
export const AFINIDAD = [73, 0, 60, 0, 27, 122, 0, 141, 328, 0, 53, 0, 42, 134, 72, 200, 349, 0, 48, 2, 18, 8, 51, 65, 0, 15, 64, 112, 119, 0, 29, 119, 78, 195, 325, 0, 47, 5, 30, 41, 86, 72, 53, 101, 110, 54, 126, 0, 29, 107, 101, 190, 295, 0] as const;

export type PropiedadB = "radio" | "ionizacion" | "afinidad" | "electroneg";
export const PROPS_B: { id: PropiedadB; nombre: string; unidad: string }[] = [
  { id: "radio", nombre: "Radio atómico (covalente)", unidad: "pm" },
  { id: "ionizacion", nombre: "1.ª energía de ionización", unidad: "kJ/mol" },
  { id: "afinidad", nombre: "Afinidad electrónica", unidad: "kJ/mol" },
  { id: "electroneg", nombre: "Electronegatividad", unidad: "" },
];
export function valor(p: PropiedadB, Z: number): number | null {
  const i = Math.round(Z) - 1;
  if (i < 0 || i > 53) return null;
  return p === "radio" ? RADIO[i]! : p === "ionizacion" ? IONIZACION[i]! : p === "afinidad" ? AFINIDAD[i]! : ELECTRONEG[i] ?? null;
}

/** Posición en la tabla periódica (Z = 1…54): periodo, grupo y bloque. */
export function posicionTabla(Z: number): { periodo: number; grupo: number; bloque: "s" | "p" | "d" } | null {
  const z = Math.round(Z);
  if (!(z >= 1 && z <= 54)) return null;
  const cfg = configuracionBach(z);
  const periodo = z <= 2 ? 1 : z <= 10 ? 2 : z <= 18 ? 3 : z <= 36 ? 4 : 5;
  const orden = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p", "5s", "4d", "5p"];
  const last = [...cfg].sort((a, b) => orden.indexOf(a.sub) - orden.indexOf(b.sub)).at(-1)!;
  if (z === 2) return { periodo: 1, grupo: 18, bloque: "s" };
  const letra = last.sub.slice(-1) as "s" | "p" | "d";
  let grupo: number;
  if (letra === "s") grupo = last.e;
  else if (letra === "p") grupo = 12 + last.e;
  else grupo = (cfg.find((c) => c.n === periodo && c.l === 0)?.e ?? 0) + last.e;
  return { periodo, grupo, bloque: letra };
}
/** Elemento de la tabla en un periodo y grupo dados, o null. */
export function elementoEn(periodo: number, grupo: number): number | null {
  for (let z = 1; z <= 54; z += 1) {
    const p = posicionTabla(z)!;
    if (p.periodo === periodo && p.grupo === grupo) return z;
  }
  return null;
}
export const COLOR_BLOQUE = { s: "#58c4dd", p: "#ff862f", d: "#83c167" } as const;

export const IONES = [
  { sim: "N³⁻", Z: 7, q: -3, r: 146, serie: "Ne" }, { sim: "O²⁻", Z: 8, q: -2, r: 140, serie: "Ne" }, { sim: "F⁻", Z: 9, q: -1, r: 133, serie: "Ne" },
  { sim: "Na⁺", Z: 11, q: 1, r: 102, serie: "Ne" }, { sim: "Mg²⁺", Z: 12, q: 2, r: 72, serie: "Ne" }, { sim: "Al³⁺", Z: 13, q: 3, r: 54, serie: "Ne" },
  { sim: "Li⁺", Z: 3, q: 1, r: 76, serie: "He" }, { sim: "Be²⁺", Z: 4, q: 2, r: 45, serie: "He" },
  { sim: "Cl⁻", Z: 17, q: -1, r: 181, serie: "Ar" }, { sim: "S²⁻", Z: 16, q: -2, r: 184, serie: "Ar" }, { sim: "K⁺", Z: 19, q: 1, r: 138, serie: "Ar" }, { sim: "Ca²⁺", Z: 20, q: 2, r: 100, serie: "Ar" },
  { sim: "Br⁻", Z: 35, q: -1, r: 196, serie: "Kr" }, { sim: "Rb⁺", Z: 37, q: 1, r: 152, serie: "Kr" }, { sim: "Sr²⁺", Z: 38, q: 2, r: 118, serie: "Kr" },
] as const;

export const SEMIMETALES = [5, 14, 32, 33, 51, 52];
/** Carácter del elemento: metal, no metal o semimetal. */
export function caracter(Z: number): "metal" | "no metal" | "semimetal" | "gas noble" {
  const p = posicionTabla(Z);
  if (!p) return "no metal";
  if (p.grupo === 18) return "gas noble";
  if (SEMIMETALES.includes(Math.round(Z))) return "semimetal";
  if (Z === 1) return "no metal";
  if (p.bloque === "d") return "metal";
  if (p.grupo <= 2) return "metal";
  if (p.grupo === 13) return "metal";
  if (p.grupo === 14) return Z >= 50 ? "metal" : "no metal";
  if (p.grupo === 15 || p.grupo === 16 || p.grupo === 17) return "no metal";
  return "no metal";
}
/** Ion más probable de los elementos representativos: carga o null si no forma iones. */
export function cargaTipica(Z: number): number | null {
  const p = posicionTabla(Z);
  if (!p || p.bloque === "d") return null;
  if (Z === 1) return 1;
  if (p.grupo === 1) return 1;
  if (p.grupo === 2) return 2;
  if (p.grupo === 13) return 3;
  if (p.grupo === 15) return -3;
  if (p.grupo === 16) return -2;
  if (p.grupo === 17) return -1;
  return null;
}
/** Valencia (número de enlaces / oxidación positiva máxima) y fórmula del óxido de un elemento representativo. */
export function oxidoTipico(Z: number): { formula: string; naturaleza: string } | null {
  const p = posicionTabla(Z);
  if (!p || p.bloque === "d" || p.grupo === 18) return null;
  const s = simbolo(Z);
  const sub = ["", "", "₂", "₃", "₄", "₅", "₆", "₇"];
  const car = caracter(Z);
  let nox = p.grupo <= 2 ? p.grupo : p.grupo - 10;
  if (Z === 1) nox = 1;
  if (p.grupo === 17 && Z === 9) return { formula: "OF₂ (no forma óxido: el F es más electronegativo que el O)", naturaleza: "—" };
  if (p.grupo === 16 && Z === 8) return { formula: "O₂", naturaleza: "—" };
  const mcd = (a: number, b: number): number => (b === 0 ? a : mcd(b, a % b));
  const d = mcd(nox, 2);
  const nE = 2 / d;
  const nO = nox / d;
  const formula = `${s}${nE > 1 ? sub[nE] : ""}O${nO > 1 ? sub[nO] : ""}`;
  const naturaleza = Z === 1 ? "neutro" : Z === 13 || Z === 50 ? "anfótero" : car === "metal" ? "básico" : car === "semimetal" ? "ácido débil o anfótero" : "ácido";
  return { formula, naturaleza };
}

const sat = (t: number): string => `hsl(${Math.round(240 - 240 * Math.min(1, Math.max(0, t)))} 70% 52%)`;

/* ───────────── 1. Tabla periódica y configuración ───────────── */

function Tabla({ colorDe, sel, onSel }: { colorDe: (z: number) => string; sel: number; onSel?: (z: number) => void }) {
  const cw = 24;
  const ch = 26;
  const x0 = 40;
  const y0 = 22;
  return (
    <g>
      {SIMB.map((s, i) => {
        const z = i + 1;
        const p = posicionTabla(z)!;
        const x = x0 + (p.grupo - 1) * cw;
        const y = y0 + (p.periodo - 1) * ch;
        const on = z === sel;
        return (
          <g key={s} onClick={onSel ? () => onSel(z) : undefined} style={onSel ? { cursor: "pointer" } : undefined}>
            <rect x={x} y={y} width={cw - 2} height={ch - 2} rx={3} fill={colorDe(z)} fillOpacity={on ? 1 : 0.4} stroke={on ? MANIM.ink : colorDe(z)} strokeWidth={on ? 2.5 : 1} />
            <text x={x + (cw - 2) / 2} y={y + 16} textAnchor="middle" fill={MANIM.ink} fontSize={10} fontWeight={700}>{s}</text>
          </g>
        );
      })}
      {Array.from({ length: 18 }, (_, g) => <text key={g} x={x0 + g * cw + 11} y={15} textAnchor="middle" fill={MANIM.muted} fontSize={9}>{g + 1}</text>)}
      {[1, 2, 3, 4, 5].map((pp) => <text key={pp} x={26} y={y0 + (pp - 1) * ch + 16} textAnchor="middle" fill={MANIM.muted} fontSize={9}>{pp}</text>)}
    </g>
  );
}

export function TablaBloquesFb1Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 26, 1, 54));
  const [Z, setZ] = useState(init);
  const p = posicionTabla(Z)!;
  const cfg = configuracionBach(Z);
  const ext = cfg.filter((c) => c.n === p.periodo).reduce((a, c) => a + c.e, 0);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Periodo = nivel más externo; bloque = subnivel que se llena; grupo = columna (misma configuración externa)."}
      onReset={() => setZ(init)}
      controls={<Slider label="Elemento (número atómico Z)" value={Z} min={1} max={54} step={1} color={MANIM.red} onChange={setZ} />}
    >
      <Svg w={520} h={175} testId="tabla-bloques-bach" maxH={195}>
        <Tabla colorDe={(z) => COLOR_BLOQUE[posicionTabla(z)!.bloque]} sel={Z} onSel={setZ} />
        {(["s", "p", "d"] as const).map((b, i) => (
          <g key={b}>
            <rect x={110 + i * 100} y={160} width={10} height={10} fill={COLOR_BLOQUE[b]} />
            <text x={124 + i * 100} y={169} fill={MANIM.muted} fontSize={10}>{`bloque ${b}`}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Elemento">{`${nombreElemento(Z)} (${simbolo(Z)}), Z = ${Z}`}</Stat>
        <Stat color={MANIM.green} label="Periodo · grupo · bloque">{`${p.periodo} · ${p.grupo} · ${p.bloque}`}</Stat>
        <Stat color={MANIM.blue} label="Configuración">{configAbreviada(Z)}</Stat>
        <Stat color={MANIM.orange} label="Electrones en la capa más externa">{`${ext}`}</Stat>
        <Stat color={MANIM.purple} label="Tipo">{caracter(Z)}</Stat>
      </Readout>
      <Note>La <b>tabla periódica</b> actual ordena los elementos por <b>número atómico creciente</b> (Mendeléyev los ordenaba por masa atómica). El <b>periodo</b> es el <b>nivel (n) más externo ocupado</b>: 7 periodos. Los <b>18 grupos</b> reúnen elementos con la <b>misma configuración electrónica externa</b>: alcalinos (ns¹), alcalinotérreos (ns²), térreos (ns² np¹), carbonoideos (ns² np²), nitrogenoideos (ns² np³), anfígenos (ns² np⁴), halógenos (ns² np⁵) y gases nobles (ns² np⁶; el He, 1s²). Por <b>bloques</b>: <b>s</b> (grupos 1–2), <b>p</b> (13–18), <b>d</b> (3–12, metales de transición) y <b>f</b> (lantánidos y actínidos). Se muestran los 54 primeros elementos; pulsa un elemento para elegirlo.</Note>
    </Frame>
  );
}

/* ───────────── 2. Tendencias periódicas ───────────── */

export function TendenciasFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { Z: Math.round(num(block.params?.a, 11, 1, 54)), pi: Math.round(num(block.params?.n, 0, 0, PROPS_B.length - 1)) };
  const [s, setS] = useState(init);
  const pr = PROPS_B[s.pi]!;
  const vals = SIMB.map((_, i) => valor(pr.id, i + 1)).filter((v): v is number => v !== null);
  const lo = Math.min(...vals);
  const hi = Math.max(...vals);
  const color = (z: number): string => {
    const v = valor(pr.id, z);
    return v === null ? MANIM.muted : sat((v - lo) / (hi - lo || 1));
  };
  const p = posicionTabla(s.Z)!;
  const izq = elementoEn(p.periodo, p.grupo - 1);
  const arr = elementoEn(p.periodo - 1, p.grupo);
  const v = valor(pr.id, s.Z);
  const cmp = (o: number | null): string => {
    if (o === null) return "—";
    const a = valor(pr.id, o);
    if (a === null || v === null) return "—";
    return `${simbolo(o)}: ${a === v ? "igual" : v > a ? "mayor" : "menor"} que en ${simbolo(o)} (${pr.id === "electroneg" ? f2(a) : f0(a)})`;
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Azul = valor bajo; rojo = valor alto. Pulsa un elemento y compara con su vecino de la izquierda y con el de arriba."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Propiedad" items={PROPS_B.map((x, k) => ({ value: String(k), label: x.nombre.split(" (")[0]! }))} value={String(s.pi)} onChange={(k) => setS((o) => ({ ...o, pi: Number(k) }))} />
          <Slider label="Elemento" value={s.Z} min={1} max={54} step={1} color={MANIM.red} onChange={(Z) => setS((o) => ({ ...o, Z }))} />
        </>
      }
    >
      <Svg w={520} h={178} testId="tendencias" maxH={198}>
        <Tabla colorDe={color} sel={s.Z} onSel={(Z) => setS((o) => ({ ...o, Z }))} />
        <text x={40} y={172} fill={MANIM.muted} fontSize={10}>{`${pr.nombre}: de ${f2(lo)} (azul) a ${f2(hi)} (rojo)${pr.unidad ? ` ${pr.unidad}` : ""}`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label={`${nombreElemento(s.Z)} (${simbolo(s.Z)})`}>{v === null ? "sin dato (gas noble)" : `${pr.id === "electroneg" ? f2(v) : f0(v)} ${pr.unidad}`}</Stat>
        <Stat color={MANIM.blue} label="Respecto al elemento anterior del periodo">{cmp(izq)}</Stat>
        <Stat color={MANIM.orange} label="Respecto al elemento de arriba (mismo grupo)">{cmp(arr)}</Stat>
      </Readout>
      <Note><b>Radio atómico</b>: <b>aumenta hacia abajo</b> en un grupo (más capas) y <b>disminuye hacia la derecha</b> en un periodo (la <b>carga nuclear efectiva</b> crece y atrae más a los electrones). <b>Energía de ionización</b> (la mínima para arrancar un electrón de un átomo gaseoso): <b>aumenta hacia la derecha y hacia arriba</b>; con pequeñas irregularidades (Be/B, N/O) por la estabilidad de subniveles llenos y semillenos. <b>Afinidad electrónica</b> (energía liberada al captar un electrón): crece hacia la derecha; es máxima en los halógenos y casi nula en gases nobles. <b>Electronegatividad</b> (tendencia a atraer el par de enlace; Pauling): <b>aumenta hacia la derecha y hacia arriba</b>; el F (3,98) es el más electronegativo. Los datos son aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 3. Radios iónicos ───────────── */

export function RadiosIonicosFb1Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 3, 0, IONES.length - 1));
  const [i, setI] = useState(init);
  const ion = IONES[i]!;
  const ra = RADIO[ion.Z - 1]!;
  const mismaSerie = IONES.filter((x) => x.serie === ion.serie);
  const esc = 0.36;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un catión es más pequeño que su átomo; un anión, más grande. En una serie isoelectrónica, más protones significa menor radio."}
      onReset={() => setI(init)}
      controls={<Choice label="Ion" items={IONES.map((x, k) => ({ value: String(k), label: x.sim }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={150} testId="radios-ionicos" maxH={170}>
        <circle cx={130} cy={75} r={ra * esc} fill={MANIM.muted} fillOpacity={0.4} stroke={MANIM.ink} strokeWidth={2} />
        <circle cx={130} cy={75} r={3} fill={MANIM.ink} />
        <text x={130} y={142} textAnchor="middle" fill={MANIM.muted} fontSize={12}>{`átomo ${simbolo(ion.Z)}: ${ra} pm`}</text>
        <circle cx={310} cy={75} r={ion.r * esc} fill={ion.q > 0 ? MANIM.red : MANIM.blue} fillOpacity={0.4} stroke={ion.q > 0 ? MANIM.red : MANIM.blue} strokeWidth={2} />
        <circle cx={310} cy={75} r={3} fill={MANIM.ink} />
        <text x={310} y={142} textAnchor="middle" fill={ion.q > 0 ? MANIM.red : MANIM.blue} fontSize={12}>{`ion ${ion.sim}: ${ion.r} pm`}</text>
        {mismaSerie.length > 1 && mismaSerie.map((x, k) => <circle key={x.sim} cx={430} cy={30 + k * 22} r={Math.max(2, x.r * 0.07)} fill={x.sim === ion.sim ? MANIM.yellow : MANIM.muted} />)}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Ion">{`${ion.sim} (Z = ${ion.Z}, ${ion.q > 0 ? "catión" : "anión"})`}</Stat>
        <Stat color={MANIM.blue} label="Radio del átomo → radio del ion">{`${ra} pm → ${ion.r} pm (${ion.r < ra ? "se contrae" : "se expande"} un ${f0(Math.abs(1 - ion.r / ra) * 100)} %)`}</Stat>
        <Stat color={MANIM.orange} label="Electrones · protones">{`${ion.Z - ion.q} · ${ion.Z}`}</Stat>
        <Stat color={MANIM.purple} label={`Serie isoelectrónica (como el ${ion.serie})`}>{mismaSerie.map((x) => `${x.sim} ${x.r}`).join(" · ")}</Stat>
      </Readout>
      <Note>Al <b>perder electrones</b>, un átomo se convierte en un <b>catión</b> <b>más pequeño</b> (desaparece la capa externa y los electrones restantes sienten más la carga nuclear); al <b>ganarlos</b> forma un <b>anión</b> <b>mayor</b> (más repulsión entre electrones). Los iones con <b>el mismo número de electrones</b> forman una serie <b>isoelectrónica</b> (N³⁻, O²⁻, F⁻, Ne, Na⁺, Mg²⁺, Al³⁺): su radio <b>disminuye al aumentar Z</b>, porque más protones atraen más a los mismos electrones. Radios iónicos aproximados (pm).</Note>
    </Frame>
  );
}

/* ───────────── 4. Reactividad ───────────── */

export function ReactividadFb1Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 11, 1, 54));
  const [Z, setZ] = useState(init);
  const p = posicionTabla(Z)!;
  const q = cargaTipica(Z);
  const ox = oxidoTipico(Z);
  const car = caracter(Z);
  const ie = valor("ionizacion", Z)!;
  const en = valor("electroneg", Z);
  const ea = valor("afinidad", Z)!;
  const tendencia = q === null ? (p.grupo === 18 ? "gas noble: capa completa, muy poco reactivo" : "no forma un ion característico") : q > 0 ? `tiende a perder ${q} e⁻ (reductor)` : `tiende a ganar ${-q} e⁻ (oxidante)`;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La reactividad depende de la facilidad para perder o ganar electrones y alcanzar una configuración de gas noble."}
      onReset={() => setZ(init)}
      controls={<Slider label="Elemento" value={Z} min={1} max={54} step={1} color={MANIM.red} onChange={setZ} />}
    >
      <Svg w={520} h={175} testId="reactividad" maxH={195}>
        <Tabla colorDe={(z) => { const t = caracter(z); return t === "metal" ? "#58c4dd" : t === "no metal" ? "#ff862f" : t === "semimetal" ? "#c59bd6" : "#b8c2d0"; }} sel={Z} onSel={setZ} />
        {[["metal", "#58c4dd"], ["no metal", "#ff862f"], ["semimetal", "#c59bd6"], ["gas noble", "#b8c2d0"]].map(([l, c], k) => (
          <g key={l}>
            <rect x={80 + k * 100} y={160} width={10} height={10} fill={c} />
            <text x={94 + k * 100} y={169} fill={MANIM.muted} fontSize={10}>{l}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Elemento">{`${nombreElemento(Z)} (${simbolo(Z)}): ${car}`}</Stat>
        <Stat color={MANIM.orange} label="Tendencia">{tendencia}</Stat>
        <Stat color={MANIM.blue} label="Ion más probable">{q === null ? "—" : `${simbolo(Z)}${q > 0 ? (q > 1 ? `${q}+` : "+") : (-q > 1 ? `${-q}−` : "−")}`}</Stat>
        <Stat color={MANIM.green} label="Óxido típico · carácter">{ox ? `${ox.formula} · ${ox.naturaleza}` : "—"}</Stat>
        <Stat color={MANIM.purple} label="E. ionización · afinidad · electronegatividad">{`${f0(ie)} kJ/mol · ${f0(ea)} kJ/mol · ${en === null ? "—" : f2(en)}`}</Stat>
      </Readout>
      <Note>Los átomos tienden a alcanzar la <b>configuración de gas noble</b> (regla del octeto). Los <b>metales</b> (baja energía de ionización y electronegatividad) <b>pierden</b> electrones y forman <b>cationes</b>: son <b>reductores</b>, sus óxidos son <b>básicos</b> y la reactividad de los <b>alcalinos</b> <b>aumenta al bajar en el grupo</b> (el electrón externo está más lejos y se arranca más fácil). Los <b>no metales</b> (alta afinidad electrónica y electronegatividad) <b>ganan</b> electrones y forman <b>aniones</b>: son <b>oxidantes</b>, con óxidos <b>ácidos</b>; la reactividad de los <b>halógenos</b> <b>disminuye al bajar</b> en el grupo. Los <b>gases nobles</b> (capa completa) son muy poco reactivos. El Al y los semimetales dan óxidos <b>anfóteros</b>.</Note>
    </Frame>
  );
}
