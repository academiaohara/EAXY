"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { sub } from "@/components/lesson/slide/tools/Fq4FormulacionTools";
import { RAICES } from "@/components/lesson/slide/tools/Fq4CarbonoTools";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);

/* ───────────── Motor de nomenclatura (se comprueba en los tests) ───────────── */

const ALQUILO = ["", "metil", "etil", "propil", "butil", "pentil", "hexil"];
const ALCOXI = ["", "metoxi", "etoxi", "propoxi", "butoxi", "pentoxi"];
const raiz = (n: number): string => RAICES[n] ?? "";

export type TipoHC = "alcano" | "alqueno" | "alquino";
/** Hidrocarburo acíclico con un posible sustituyente alquilo (metilo o etilo) en la cadena principal. */
export function ramificado(n: number, tipo: TipoHC, k: number, tam: 0 | 1 | 2, s: number): { ok: boolean; motivo: string; nombre: string; formula: string; semi: string; carbonos: number; h: number; locInsat: number; locSub: number } | null {
  if (!Number.isInteger(n) || n < 1 || n > 10) return null;
  const vacio = { nombre: "—", formula: "—", semi: "—", carbonos: 0, h: 0, locInsat: 0, locSub: 0 };
  if (tipo !== "alcano" && n < 2) return { ok: false, motivo: "un alqueno o alquino necesita al menos 2 carbonos", ...vacio };
  const kk = tipo === "alcano" ? 0 : Math.min(Math.max(1, Math.round(k)), n - 1);
  if (tam === 1 && !(s >= 2 && s <= n - 1)) return { ok: false, motivo: "el metilo debe ir en un carbono interior (2 a n−1); si no, alargaría la cadena", ...vacio };
  if (tam === 2 && !(s >= 3 && s <= n - 2)) return { ok: false, motivo: "el etilo debe ir entre los carbonos 3 y n−2; si no, la cadena principal sería más larga", ...vacio };
  if (tam > 0 && tipo === "alquino" && (s === kk || s === kk + 1)) return { ok: false, motivo: "un carbono del triple enlace no puede llevar sustituyente (ya tiene 4 enlaces)", ...vacio };
  const dirAdelante = { u: kk, s };
  const dirAtras = { u: n - kk, s: n + 1 - s };
  const adelante = tipo === "alcano" ? (tam > 0 ? s <= n + 1 - s : true) : kk < n - kk || (kk === n - kk && (tam === 0 || s <= n + 1 - s));
  const loc = adelante ? dirAdelante : dirAtras;
  const raizN = raiz(n);
  const carbonos = n + tam;
  const h = tipo === "alcano" ? 2 * carbonos + 2 : tipo === "alqueno" ? 2 * carbonos : 2 * carbonos - 2;
  const sufijo = tipo === "alcano" ? "ano" : tipo === "alqueno" ? "eno" : "ino";
  const tronco = tipo === "alcano" ? `${raizN}ano` : n <= 3 ? `${raizN}${sufijo}` : `${raizN}-${loc.u}-${sufijo}`;
  const nombre = tam > 0 ? `${loc.s}-${ALQUILO[tam]}${tronco}` : tronco;
  const orden = (i: number): number => (tipo === "alcano" ? 1 : i === kk ? (tipo === "alqueno" ? 2 : 3) : 1);
  let semi = "";
  for (let i = 1; i <= n; i += 1) {
    const izq = i > 1 ? orden(i - 1) : 0;
    const der = i < n ? orden(i) : 0;
    const hi = 4 - izq - der - (tam > 0 && i === s ? 1 : 0);
    const ramaTxt = tam > 0 && i === s ? `(${tam === 1 ? "CH₃" : "CH₂–CH₃"})` : "";
    semi += `C${hi > 0 ? `H${hi > 1 ? sub(hi) : ""}` : ""}${ramaTxt}`;
    if (i < n) semi += orden(i) === 1 ? "–" : orden(i) === 2 ? "=" : "≡";
  }
  return { ok: true, motivo: "", nombre, formula: `C${carbonos > 1 ? sub(carbonos) : ""}H${sub(h)}`, semi, carbonos, h, locInsat: loc.u, locSub: loc.s };
}

export type FamiliaO = "alcohol" | "aldehído" | "cetona" | "ácido carboxílico" | "éster" | "éter" | "amina" | "amida" | "nitrilo" | "haluro";
export const FAMILIAS_O: { id: FamiliaO; grupo: string; sufijo: string; prioridad: number }[] = [
  { id: "ácido carboxílico", grupo: "–COOH", sufijo: "ácido -oico", prioridad: 1 }, { id: "éster", grupo: "–COO–", sufijo: "-oato de alquilo", prioridad: 2 },
  { id: "amida", grupo: "–CONH₂", sufijo: "-amida", prioridad: 3 }, { id: "nitrilo", grupo: "–C≡N", sufijo: "-nitrilo", prioridad: 4 },
  { id: "aldehído", grupo: "–CHO", sufijo: "-al", prioridad: 5 }, { id: "cetona", grupo: "–CO–", sufijo: "-ona", prioridad: 6 },
  { id: "alcohol", grupo: "–OH", sufijo: "-ol", prioridad: 7 }, { id: "amina", grupo: "–NH₂", sufijo: "-amina", prioridad: 8 },
  { id: "éter", grupo: "–O–", sufijo: "alcoxi- (sustituyente)", prioridad: 9 }, { id: "haluro", grupo: "–Cl", sufijo: "cloro- (sustituyente)", prioridad: 10 },
];
const alquilo = (k: number): string => (k <= 0 ? "" : ["CH₃", ...Array(k - 1).fill("CH₂")].join("–"));
/** Radical escrito desde el átomo que se une al resto de la molécula (–CH₂–CH₃). */
const alquiloInv = (k: number): string => (k <= 0 ? "" : [...Array(k - 1).fill("CH₂"), "CH₃"].join("–"));
/** Cadena lineal con un grupo X (texto) en la posición p. */
function lineal(n: number, p: number, X: string): string {
  const partes: string[] = [];
  for (let i = 1; i <= n; i += 1) {
    const vecinos = (i > 1 ? 1 : 0) + (i < n ? 1 : 0);
    const conX = i === p;
    const h = 4 - vecinos - (conX ? 1 : 0);
    if (!conX) partes.push(`C${h > 0 ? `H${h > 1 ? sub(h) : ""}` : ""}`);
    else partes.push(vecinos === 1 ? `CH₂${X}` : `CH(${X})`);
  }
  return partes.join("–");
}
const locMin = (p: number, n: number): number => Math.min(p, n + 1 - p);
/** Compuesto de una familia: n = carbonos de la cadena principal (del ácido en los ésteres), p = posición del grupo, m = carbonos del segundo grupo (ésteres y éteres). */
export function compuesto(f: FamiliaO, n: number, p: number, m: number): { nombre: string; formula: string; alt?: string; error?: string } | null {
  if (!Number.isInteger(n) || n < 1 || n > 8) return null;
  const pp = Math.min(Math.max(1, Math.round(p)), n);
  const mm = Math.min(Math.max(1, Math.round(m)), 5);
  const r = raiz(n);
  switch (f) {
    case "alcohol": {
      const L = locMin(pp, n);
      return { nombre: n <= 2 ? `${r}anol` : `${r}an-${L}-ol`, formula: lineal(n, L === 1 ? n : L, "OH") };
    }
    case "aldehído": return { nombre: `${r}anal`, formula: n === 1 ? "HCHO" : `${alquilo(n - 1)}–CHO` };
    case "cetona": {
      if (n < 3) return { nombre: "—", formula: "—", error: "una cetona necesita al menos 3 carbonos" };
      const L = Math.min(Math.max(2, pp), n - 1);
      const Lm = locMin(L, n);
      const partes = Array.from({ length: n }, (_, i) => (i + 1 === Lm ? "CO" : i === 0 || i === n - 1 ? "CH₃" : "CH₂"));
      return { nombre: n <= 4 ? `${r}anona` : `${r}an-${Lm}-ona`, formula: partes.join("–"), alt: n === 3 ? "acetona" : undefined };
    }
    case "ácido carboxílico": return { nombre: `ácido ${r}anoico`, formula: n === 1 ? "HCOOH" : `${alquilo(n - 1)}–COOH`, alt: n === 1 ? "ácido fórmico" : n === 2 ? "ácido acético (vinagre)" : undefined };
    case "éster": return { nombre: `${r}anoato de ${ALQUILO[mm] ?? ""}o`, formula: `${n === 1 ? "H" : alquilo(n - 1)}–COO–${alquiloInv(mm)}`, alt: n === 2 && mm === 2 ? "acetato de etilo (disolvente)" : undefined };
    case "éter": {
      const a = Math.max(n, mm);
      const b = Math.min(n, mm);
      const nombres = [ALQUILO[n], ALQUILO[mm]].sort();
      return { nombre: `${ALCOXI[b] ?? ""}${raiz(a)}ano`, formula: `${alquilo(n)}–O–${alquiloInv(mm)}`, alt: n === mm ? `di${ALQUILO[n]} éter` : `${nombres[0]} ${nombres[1]} éter` };
    }
    case "amina": {
      const L = locMin(pp, n);
      return { nombre: n <= 2 ? `${r}anamina` : `${r}an-${L}-amina`, formula: lineal(n, L === 1 ? n : L, "NH₂") };
    }
    case "amida": return { nombre: `${r}anamida`, formula: n === 1 ? "HCONH₂" : `${alquilo(n - 1)}–CONH₂` };
    case "nitrilo": {
      if (n < 2) return { nombre: "—", formula: "—", error: "un nitrilo necesita al menos 2 carbonos (el del –CN y uno más)" };
      return { nombre: `${r}anonitrilo`, formula: `${alquilo(n - 1)}–C≡N` };
    }
    case "haluro": {
      const L = locMin(pp, n);
      return { nombre: n <= 2 ? `cloro${r}ano` : `${L}-cloro${r}ano`, formula: lineal(n, L === 1 ? n : L, "Cl") };
    }
  }
}

export type Isomero = { nombre: string; tipo: string; teb: number };
export type GrupoIsomeros = { formula: string; titulo: string; isomeros: Isomero[]; nota: string };
export const ISOMEROS: GrupoIsomeros[] = [
  { formula: "C₄H₁₀", titulo: "Butano", nota: "Solo isomería de cadena", isomeros: [{ nombre: "butano", tipo: "cadena lineal", teb: -0.5 }, { nombre: "2-metilpropano", tipo: "cadena ramificada", teb: -11.7 }] },
  { formula: "C₅H₁₂", titulo: "Pentano", nota: "Isomería de cadena: más ramificado, menor punto de ebullición", isomeros: [{ nombre: "pentano", tipo: "cadena lineal", teb: 36 }, { nombre: "2-metilbutano", tipo: "cadena ramificada", teb: 28 }, { nombre: "2,2-dimetilpropano", tipo: "cadena muy ramificada", teb: 9.5 }] },
  { formula: "C₆H₁₄", titulo: "Hexano", nota: "Cinco isómeros de cadena", isomeros: [{ nombre: "hexano", tipo: "cadena lineal", teb: 69 }, { nombre: "2-metilpentano", tipo: "cadena", teb: 60 }, { nombre: "3-metilpentano", tipo: "cadena", teb: 63 }, { nombre: "2,3-dimetilbutano", tipo: "cadena", teb: 58 }, { nombre: "2,2-dimetilbutano", tipo: "cadena", teb: 50 }] },
  { formula: "C₄H₈", titulo: "Buteno y ciclobutano", nota: "Posición, geometría (cis/trans), cadena y ciclo", isomeros: [{ nombre: "but-1-eno", tipo: "posición del doble enlace", teb: -6.3 }, { nombre: "cis-but-2-eno", tipo: "geométrica (cis)", teb: 3.7 }, { nombre: "trans-but-2-eno", tipo: "geométrica (trans)", teb: 0.9 }, { nombre: "2-metilpropeno", tipo: "cadena", teb: -6.9 }, { nombre: "ciclobutano", tipo: "cadena cerrada", teb: 12.5 }, { nombre: "metilciclopropano", tipo: "cadena cerrada", teb: 0.7 }] },
  { formula: "C₂H₆O", titulo: "Etanol y dimetil éter", nota: "Isomería de función: alcohol frente a éter", isomeros: [{ nombre: "etanol", tipo: "alcohol", teb: 78.4 }, { nombre: "metoximetano (dimetil éter)", tipo: "éter", teb: -24 }] },
  { formula: "C₃H₈O", titulo: "Propanoles y éter", nota: "Posición del –OH y función", isomeros: [{ nombre: "propan-1-ol", tipo: "alcohol (posición 1)", teb: 97 }, { nombre: "propan-2-ol", tipo: "alcohol (posición 2)", teb: 82 }, { nombre: "metoxietano", tipo: "éter (función)", teb: 7.4 }] },
  { formula: "C₃H₆O", titulo: "Propanal y propanona", nota: "Isomería de función: aldehído frente a cetona", isomeros: [{ nombre: "propanal", tipo: "aldehído", teb: 48 }, { nombre: "propanona (acetona)", tipo: "cetona", teb: 56 }] },
  { formula: "C₂H₄O₂", titulo: "Ácido acético y metanoato de metilo", nota: "Función: ácido frente a éster", isomeros: [{ nombre: "ácido etanoico (acético)", tipo: "ácido carboxílico", teb: 118 }, { nombre: "metanoato de metilo", tipo: "éster", teb: 32 }] },
];

export type Tipo = { id: string; nombre: string; ejemplo: string; condiciones: string; descripcion: string };
export const TIPOS_RX: Tipo[] = [
  { id: "combustion", nombre: "Combustión", ejemplo: "CH₃–CH₃ + 7/2 O₂ → 2 CO₂ + 3 H₂O", condiciones: "llama o chispa, exceso de O₂", descripcion: "el compuesto orgánico reacciona con O₂ y da CO₂ y H₂O con gran desprendimiento de energía" },
  { id: "sustitucion", nombre: "Sustitución", ejemplo: "CH₄ + Cl₂ → CH₃Cl + HCl", condiciones: "luz ultravioleta", descripcion: "un átomo o grupo se sustituye por otro (típica de alcanos y del benceno)" },
  { id: "adicion", nombre: "Adición", ejemplo: "CH₂=CH₂ + H₂ → CH₃–CH₃", condiciones: "catalizador de Ni o Pt", descripcion: "se rompe el enlace π de un doble o triple enlace y se añaden átomos (alquenos y alquinos)" },
  { id: "eliminacion", nombre: "Eliminación", ejemplo: "CH₃–CH₂OH → CH₂=CH₂ + H₂O", condiciones: "H₂SO₄ concentrado, calor", descripcion: "se pierden átomos de carbonos contiguos y aparece un doble enlace (deshidratación de alcoholes)" },
  { id: "esterificacion", nombre: "Esterificación", ejemplo: "CH₃–COOH + CH₃–CH₂OH ⇌ CH₃–COO–CH₂–CH₃ + H₂O", condiciones: "catalizador ácido, calor", descripcion: "ácido carboxílico + alcohol dan éster + agua; proceso reversible (la hidrólisis es la inversa)" },
  { id: "oxidacion", nombre: "Oxidación de alcoholes", ejemplo: "CH₃–CH₂OH → CH₃–CHO → CH₃–COOH", condiciones: "oxidante (K₂Cr₂O₇, KMnO₄)", descripcion: "alcohol primario → aldehído → ácido; el secundario → cetona" },
];
export const ENTALPIAS_COMB: Record<number, number> = { 1: 890, 2: 1560, 3: 2220, 4: 2877, 5: 3509, 6: 4163, 7: 4817, 8: 5471 };
/** Combustión completa del alcano CₙH₂ₙ₊₂: coeficientes enteros mínimos, masas y energía. */
export function combustionAlcano(n: number) {
  if (!Number.isInteger(n) || n < 1 || n > 8) return null;
  const x2 = n % 2 === 0 ? 2 : 1; // factor para evitar fracciones
  const cAlc = x2;
  const cO2 = ((3 * n + 1) / 2) * x2;
  const cCO2 = n * x2;
  const cH2O = (n + 1) * x2;
  const M = 12 * n + (2 * n + 2);
  return { ecuacion: `${cAlc > 1 ? `${cAlc} ` : ""}C${n > 1 ? sub(n) : ""}H${sub(2 * n + 2)} + ${cO2} O₂ → ${cCO2 > 1 ? `${cCO2} ` : ""}CO₂ + ${cH2O > 1 ? `${cH2O} ` : ""}H₂O`, M, kJmol: ENTALPIAS_COMB[n]!, kJg: ENTALPIAS_COMB[n]! / M, gCO2porMol: n * 44, gCO2porMJ: ((n * 44) / ENTALPIAS_COMB[n]!) * 1000 };
}

/* ───────────── Dibujo ───────────── */

function Titulo({ f, sub: s, id, size }: { f: string; sub?: string; id: string; size?: number }) {
  return (
    <Svg w={520} h={90} testId={id} maxH={110}>
      <text x={260} y={46} textAnchor="middle" fill={MANIM.yellow} fontSize={size ?? (f.length > 30 ? 18 : f.length > 20 ? 24 : 30)} fontWeight={700}>{f}</text>
      {s && <text x={260} y={78} textAnchor="middle" fill={MANIM.muted} fontSize={13}>{s}</text>}
    </Svg>
  );
}

/* ───────────── 1. Hidrocarburos: nomenclatura y fórmula de esqueleto ───────────── */

export function RamificadosFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 5, 2, 10)), tipo: Math.round(num(block.params?.n, 0, 0, 2)), k: Math.round(num(block.params?.b, 2, 1, 9)), tam: Math.round(num(block.params?.c, 1, 0, 2)), s: 3 };
  const [st, setSt] = useState(init);
  const tipo = (["alcano", "alqueno", "alquino"] as TipoHC[])[st.tipo]!;
  const n = Math.max(tipo === "alcano" ? 1 : 2, st.n);
  const r = ramificado(n, tipo, st.k, st.tam as 0 | 1 | 2, st.s);
  const dx = Math.min(56, 330 / Math.max(1, n - 1));
  const x0 = 60;
  const yArriba = 40;
  const yAbajo = 90;
  const pos = (i: number): [number, number] => [x0 + (i - 1) * dx, i % 2 === 1 ? yAbajo : yArriba];
  const kk = tipo === "alcano" ? 0 : Math.min(st.k, n - 1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La cadena principal es la más larga que contiene los enlaces múltiples; se numera por el extremo que dé el localizador más bajo."}
      onReset={() => setSt(init)}
      controls={
        <>
          <Choice label="Tipo" items={[{ value: "0", label: "Alcano" }, { value: "1", label: "Alqueno" }, { value: "2", label: "Alquino" }]} value={String(st.tipo)} onChange={(v) => setSt((o) => ({ ...o, tipo: Number(v) }))} />
          <Slider label="Carbonos de la cadena principal" value={n} min={tipo === "alcano" ? 1 : 2} max={10} step={1} color={MANIM.blue} onChange={(v) => setSt((o) => ({ ...o, n: v }))} />
          {tipo !== "alcano" && <Slider label="Posición del enlace múltiple (desde la izquierda)" value={kk} min={1} max={Math.max(1, n - 1)} step={1} color={MANIM.orange} onChange={(v) => setSt((o) => ({ ...o, k: v }))} />}
          <Choice label="Ramificación" items={[{ value: "0", label: "ninguna" }, { value: "1", label: "metilo (–CH₃)" }, { value: "2", label: "etilo (–CH₂CH₃)" }]} value={String(st.tam)} onChange={(v) => setSt((o) => ({ ...o, tam: Number(v) }))} />
          {st.tam > 0 && <Slider label="Posición de la ramificación (desde la izquierda)" value={Math.min(Math.max(st.s, 1), n)} min={1} max={n} step={1} color={MANIM.green} onChange={(v) => setSt((o) => ({ ...o, s: v }))} />}
        </>
      }
    >
      <Svg w={520} h={135} testId="ramificados" maxH={155}>
        {Array.from({ length: n - 1 }, (_, i) => {
          const a = pos(i + 1);
          const b = pos(i + 2);
          const orden = tipo === "alcano" ? 1 : i + 1 === kk ? (tipo === "alqueno" ? 2 : 3) : 1;
          const off = orden === 1 ? [0] : orden === 2 ? [-3, 3] : [-4, 0, 4];
          return <g key={i}>{off.map((o, q) => <Seg key={q} a={[a[0], a[1] + o]} b={[b[0], b[1] + o]} color={i + 1 === kk ? MANIM.orange : MANIM.ink} width={2.5} />)}</g>;
        })}
        {Array.from({ length: n }, (_, i) => <Dot key={i} p={pos(i + 1)} r={4} color={MANIM.blue} />)}
        {Array.from({ length: n }, (_, i) => <text key={i} x={pos(i + 1)[0]} y={i % 2 === 0 ? yArriba - 10 : yAbajo + 20} textAnchor="middle" fill={MANIM.muted} fontSize={10}>{i + 1}</text>)}
        {st.tam > 0 && r?.ok && (() => {
          const p = pos(st.s);
          const arriba = st.s % 2 === 0;
          const y2 = p[1] + (arriba ? -32 : 32);
          return (
            <g>
              <Seg a={p} b={[p[0], y2]} color={MANIM.green} width={2.5} />
              {st.tam === 2 && <Seg a={[p[0], y2]} b={[p[0] + dx * 0.6, y2 + (arriba ? -16 : 16)]} color={MANIM.green} width={2.5} />}
            </g>
          );
        })()}
      </Svg>
      <Readout>
        <Stat color={r?.ok ? MANIM.green : MANIM.red} label="Nombre IUPAC">{r?.ok ? r.nombre : (r?.motivo ?? "—")}</Stat>
        <Stat color={MANIM.yellow} label="Fórmula molecular · carbonos totales">{r?.ok ? `${r.formula} · ${r.carbonos} C` : "—"}</Stat>
        <Stat color={MANIM.blue} label="Fórmula semidesarrollada">{r?.ok ? r.semi : "—"}</Stat>
        <Stat color={MANIM.orange} label="Localizadores (numerando por el lado correcto)">{r?.ok ? `${tipo === "alcano" ? "" : `enlace múltiple: ${r.locInsat}`}${st.tam > 0 ? `${tipo === "alcano" ? "" : " · "}ramificación: ${r.locSub}` : ""}` || "ninguno" : "—"}</Stat>
      </Readout>
      <Note>Reglas IUPAC para hidrocarburos: <b>1)</b> la <b>cadena principal</b> es la más larga (que contenga los enlaces dobles o triples); <b>2)</b> se <b>numera</b> por el extremo que dé el <b>localizador más bajo</b> primero al <b>enlace múltiple</b> y después a las <b>ramificaciones</b>; <b>3)</b> los <b>radicales</b> (metil, etil, propil…) se nombran delante, <b>con su localizador</b>, en orden alfabético; <b>4)</b> el nombre termina en <b>-ano</b>, <b>-eno</b> o <b>-ino</b>, con el localizador del enlace múltiple delante (but-1-eno). Ejemplos: <i>2-metilbutano</i>, <i>3-metilpent-1-eno</i>. Los <b>alcanos</b> tienen fórmula CₙH₂ₙ₊₂; los <b>alquenos</b>, CₙH₂ₙ; los <b>alquinos</b>, CₙH₂ₙ₋₂. En la fórmula de <b>esqueleto</b> cada vértice es un C y se omiten los H. Solo se admite una ramificación (metilo o etilo).</Note>
    </Frame>
  );
}

/* ───────────── 2. Grupos funcionales ───────────── */

export function GruposFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { f: Math.round(num(block.params?.n, 6, 0, FAMILIAS_O.length - 1)), n: Math.round(num(block.params?.a, 4, 1, 8)), p: Math.round(num(block.params?.b, 2, 1, 8)), m: Math.round(num(block.params?.c, 2, 1, 5)) };
  const [s, setS] = useState(init);
  const fam = FAMILIAS_O[s.f]!;
  const n = Math.max(1, s.n);
  const c = compuesto(fam.id, n, s.p, s.m);
  const usaPos = ["alcohol", "cetona", "amina", "haluro"].includes(fam.id);
  const usaM = fam.id === "éster" || fam.id === "éter";
  return (
    <Frame
      stacked
      hint={block.hint ?? "El grupo funcional de mayor prioridad se nombra como sufijo y se numera la cadena para darle el localizador más bajo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Familia" items={FAMILIAS_O.map((x, k) => ({ value: String(k), label: x.id }))} value={String(s.f)} onChange={(k) => setS((o) => ({ ...o, f: Number(k) }))} />
          <Slider label={usaM ? (fam.id === "éster" ? "Carbonos del ácido (con el C=O)" : "Carbonos del primer radical") : "Carbonos de la cadena principal"} value={n} min={1} max={8} step={1} color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, n: v }))} />
          {usaPos && <Slider label="Posición del grupo" value={Math.min(s.p, n)} min={1} max={n} step={1} color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, p: v }))} />}
          {usaM && <Slider label={fam.id === "éster" ? "Carbonos del alcohol (radical –O–R)" : "Carbonos del segundo radical"} value={s.m} min={1} max={5} step={1} color={MANIM.green} onChange={(v) => setS((o) => ({ ...o, m: v }))} />}
        </>
      }
    >
      <Titulo f={c && !c.error ? c.formula : "—"} sub={c?.error ?? `grupo funcional ${fam.grupo}`} id="grupos-fb1" />
      <Readout>
        <Stat color={MANIM.green} label="Nombre IUPAC">{c && !c.error ? c.nombre : (c?.error ?? "—")}</Stat>
        {c?.alt && <Stat color={MANIM.blue} label="Otro nombre">{c.alt}</Stat>}
        <Stat color={MANIM.orange} label="Grupo funcional · terminación">{`${fam.grupo} · ${fam.sufijo}`}</Stat>
        <Stat color={MANIM.purple} label="Prioridad al nombrar (1 = máxima)">{`${fam.prioridad} de ${FAMILIAS_O.length}`}</Stat>
      </Readout>
      <Note>Un <b>grupo funcional</b> determina las propiedades de la familia. <b>Orden de prioridad</b> para elegir el sufijo cuando hay varios: <b>ácido &gt; éster &gt; amida &gt; nitrilo &gt; aldehído &gt; cetona &gt; alcohol &gt; amina</b> (éteres y halogenuros solo como sustituyentes: <i>metoxi-</i>, <i>cloro-</i>). <b>Alcoholes</b> R–OH (-ol); <b>éteres</b> R–O–R&apos; (alcoxi-); <b>aldehídos</b> R–CHO (-al, siempre en el extremo: carbono 1); <b>cetonas</b> R–CO–R&apos; (-ona); <b>ácidos</b> R–COOH (ácido -oico, el C del grupo es el 1); <b>ésteres</b> R–COO–R&apos; (-oato de alquilo); <b>aminas</b> R–NH₂ (-amina); <b>amidas</b> R–CONH₂ (-amida); <b>nitrilos</b> R–C≡N (-nitrilo); <b>halogenuros</b> R–X. Se muestran cadenas lineales.</Note>
    </Frame>
  );
}

/* ───────────── 3. Isomería ───────────── */

export function IsomeriaFb1Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 1, 0, ISOMEROS.length - 1));
  const [i, setI] = useState(init);
  const g = ISOMEROS[i]!;
  const min = Math.min(...g.isomeros.map((x) => x.teb), 0);
  const max = Math.max(...g.isomeros.map((x) => x.teb), 1);
  const Y = (T: number): number => 105 - ((T - min) / (max - min || 1)) * 65;
  const ancho = Math.min(80, 420 / g.isomeros.length);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Los isómeros comparten fórmula molecular pero tienen distinta estructura y, por tanto, distintas propiedades."}
      onReset={() => setI(init)}
      controls={<Choice label="Fórmula molecular" items={ISOMEROS.map((x, k) => ({ value: String(k), label: x.formula }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={150} testId="isomeria" maxH={170}>
        <Seg a={[40, Y(0)]} b={[500, Y(0)]} color={MANIM.muted} width={1} dashed />
        {g.isomeros.map((x, k) => {
          const cx = 70 + k * (ancho + 6) + ancho / 2;
          const top = Math.min(Y(x.teb), Y(0));
          const h = Math.abs(Y(x.teb) - Y(0));
          return (
            <g key={x.nombre}>
              <rect x={cx - ancho / 2 + 4} y={top} width={ancho - 8} height={Math.max(2, h)} fill={x.teb >= 0 ? MANIM.red : MANIM.blue} fillOpacity={0.8} />
              <text x={cx} y={x.teb >= 0 ? top - 4 : top + h + 12} textAnchor="middle" fill={MANIM.ink} fontSize={10}>{`${fmtEs(x.teb, 1)} °C`}</text>
              <text x={cx} y={142} textAnchor="middle" fill={MANIM.muted} fontSize={ancho < 60 ? 8 : 9}>{x.nombre.length > 16 ? `${x.nombre.slice(0, 15)}…` : x.nombre}</text>
            </g>
          );
        })}
        <text x={500} y={12} textAnchor="end" fill={MANIM.muted} fontSize={11}>temperatura de ebullición</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label={`Fórmula ${g.formula}: ${g.titulo}`}>{`${g.isomeros.length} isómeros`}</Stat>
        {g.isomeros.map((x, k) => <Stat key={x.nombre} color={[MANIM.blue, MANIM.orange, MANIM.green, MANIM.purple, MANIM.red, MANIM.yellow][k % 6]!} label={x.tipo}>{`${x.nombre} · T eb = ${fmtEs(x.teb, 1)} °C`}</Stat>)}
        <Stat color={MANIM.muted} label="Observación">{g.nota}</Stat>
      </Readout>
      <Note>Los <b>isómeros</b> son compuestos con la <b>misma fórmula molecular</b> y <b>distinta fórmula estructural</b>. <b>Isomería estructural</b>: de <b>cadena</b> (distinta ramificación: butano y 2-metilpropano), de <b>posición</b> (el grupo o el doble enlace en otro carbono: propan-1-ol y propan-2-ol) y de <b>función</b> (otro grupo funcional: etanol y dimetil éter; propanal y propanona). Además hay <b>estereoisomería</b>: <b>geométrica</b> cis/trans en los alquenos (cada carbono del doble enlace con dos sustituyentes distintos) y <b>óptica</b> en carbonos con cuatro sustituyentes distintos (quirales). Los isómeros tienen <b>propiedades físicas y químicas distintas</b>: a igual masa, un compuesto <b>más ramificado</b> tiene menor punto de ebullición (menos superficie de contacto) y los que forman <b>enlaces de hidrógeno</b> (alcoholes, ácidos) hierven mucho más que sus isómeros sin ellos.</Note>
    </Frame>
  );
}

/* ───────────── 4. Reacciones orgánicas y combustión ───────────── */

export function ReaccionesOrganicasFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), t: Math.round(num(block.params?.b, 1, 0, TIPOS_RX.length - 1)), c: Math.round(num(block.params?.a, 4, 1, 8)) };
  const [s, setS] = useState(init);
  const tipo = TIPOS_RX[s.t]!;
  const comb = combustionAlcano(s.c);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Las reacciones orgánicas se clasifican según lo que le ocurre al sustrato: se quema, se sustituye, se añade, se elimina…"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Estudio" items={[{ value: "0", label: "Tipos de reacciones" }, { value: "1", label: "Combustión de alcanos" }]} value={String(s.modo)} onChange={(v) => setS((o) => ({ ...o, modo: Number(v) }))} />
          {s.modo === 0 ? (
            <Choice label="Tipo" items={TIPOS_RX.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.t)} onChange={(k) => setS((o) => ({ ...o, t: Number(k) }))} />
          ) : (
            <Slider label="Carbonos del alcano" value={s.c} min={1} max={8} step={1} color={MANIM.orange} onChange={(c) => setS((o) => ({ ...o, c }))} />
          )}
        </>
      }
    >
      {s.modo === 0 ? (
        <>
          <Titulo f={tipo.ejemplo} sub={`condiciones: ${tipo.condiciones}`} id="rx-organicas" />
          <Readout>
            <Stat color={MANIM.yellow} label="Reacción de">{tipo.nombre}</Stat>
            <Stat color={MANIM.green} label="Qué ocurre">{tipo.descripcion}</Stat>
          </Readout>
        </>
      ) : (
        <>
          <Titulo f={comb ? comb.ecuacion : "—"} sub={comb ? `M = ${comb.M} g/mol` : undefined} id="combustion-organica" />
          <Readout>
            <Stat color={MANIM.orange} label="Energía liberada">{comb ? `${f0(comb.kJmol)} kJ/mol · ${f1(comb.kJg)} kJ/g` : "—"}</Stat>
            <Stat color={MANIM.red} label="CO₂ emitido por mol quemado">{comb ? `${f0(comb.gCO2porMol)} g (${s.c} mol)` : "—"}</Stat>
            <Stat color={MANIM.purple} label="CO₂ emitido por cada megajulio de energía">{comb ? `${f1(comb.gCO2porMJ)} g/MJ` : "—"}</Stat>
          </Readout>
        </>
      )}
      <Note>{s.modo === 0 ? <>Principales <b>reacciones orgánicas</b>: <b>combustión</b> (con O₂: CO₂ + H₂O + energía); <b>sustitución</b> (un átomo se cambia por otro: halogenación de alcanos, nitración del benceno); <b>adición</b> (a dobles y triples enlaces: hidrogenación, halogenación, hidratación; <b>regla de Markovnikov</b>: el H se une al carbono con más H); <b>eliminación</b> (deshidratación de alcoholes a alquenos); <b>esterificación</b> (ácido + alcohol ⇌ éster + agua) e <b>hidrólisis</b>; <b>oxidación</b> de alcoholes. Los <b>polímeros de adición</b> (polietileno, PVC) se forman por adición repetida de alquenos.</> : <>La <b>combustión completa</b> de un alcano CₙH₂ₙ₊₂ es <b>CₙH₂ₙ₊₂ + (3n+1)/2 O₂ → n CO₂ + (n+1) H₂O</b>. Si hay poco oxígeno, la combustión es <b>incompleta</b> y se produce <b>CO</b> (tóxico) y hollín. La energía por mol crece con el tamaño de la molécula, pero <b>por gramo</b> es casi igual (≈ 48–55 kJ/g). El <b>metano</b> emite menos CO₂ por energía obtenida que los alcanos largos (por eso el gas natural es un combustible «de transición»), pero sigue contribuyendo al <b>efecto invernadero</b>. Entalpías de combustión aproximadas.</>}</Note>
    </Frame>
  );
}
