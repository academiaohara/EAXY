"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { sub } from "@/components/lesson/slide/tools/Fq4FormulacionTools";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);

/* ───────────── Cálculos y datos (se comprueban en los tests) ───────────── */

export const RAICES = ["", "met", "et", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec"] as const;
export type TipoHC = "alcano" | "alqueno" | "alquino";
export const SUFIJO: Record<TipoHC, string> = { alcano: "ano", alqueno: "eno", alquino: "ino" };
const SIMB_ENLACE = { 1: "–", 2: "=", 3: "≡" } as const;

/** Fórmula molecular de un hidrocarburo acíclico con n átomos de carbono. */
export function formulaMolecular(n: number, tipo: TipoHC): string | null {
  if (!Number.isInteger(n) || n < 1) return null;
  if (tipo !== "alcano" && n < 2) return null;
  const h = tipo === "alcano" ? 2 * n + 2 : tipo === "alqueno" ? 2 * n : 2 * n - 2;
  return `C${n > 1 ? sub(n) : ""}H${sub(h)}`;
}
/** Posición máxima válida (numeración desde el extremo más cercano) del enlace múltiple. */
export const posicionMaxima = (n: number): number => Math.max(1, Math.floor(n / 2));
/** Fórmula semidesarrollada: CH₃–CH=CH–CH₃. pos = posición del enlace múltiple (entre C_pos y C_pos+1). */
export function semidesarrollada(n: number, tipo: TipoHC, pos = 1): string | null {
  if (!formulaMolecular(n, tipo)) return null;
  const orden = tipo === "alqueno" ? 2 : tipo === "alquino" ? 3 : 1;
  const p = Math.min(Math.max(1, Math.round(pos)), n - 1);
  const orders = Array.from({ length: Math.max(0, n - 1) }, (_, i) => (i + 1 === p && tipo !== "alcano" ? orden : 1));
  let s = "";
  for (let i = 0; i < n; i++) {
    const izq = i > 0 ? orders[i - 1]! : 0;
    const der = i < n - 1 ? orders[i]! : 0;
    const h = 4 - izq - der;
    s += `C${h > 0 ? `H${h > 1 ? sub(h) : ""}` : ""}`;
    if (i < n - 1) s += SIMB_ENLACE[orders[i] as 1 | 2 | 3];
  }
  return s;
}
/** Nombre IUPAC (but-1-eno, propano, etino…). */
export function nombreHidrocarburo(n: number, tipo: TipoHC, pos = 1): string | null {
  if (!formulaMolecular(n, tipo) || n > 10) return null;
  const raiz = RAICES[n]!;
  if (tipo === "alcano") return `${raiz}ano`;
  const p = Math.min(Math.max(1, Math.round(pos)), posicionMaxima(n));
  return n <= 3 ? `${raiz}${SUFIJO[tipo]}` : `${raiz}-${p}-${SUFIJO[tipo]}`;
}
/** Nº de isómeros de cadena de los alcanos más sencillos. */
export const ISOMEROS_ALCANOS: Record<number, number> = { 1: 1, 2: 1, 3: 1, 4: 2, 5: 3, 6: 5, 7: 9, 8: 18 };

export type Familia = "alcohol" | "aldehído" | "cetona" | "ácido carboxílico" | "amina";
export const FAMILIAS: { id: Familia; grupo: string; sufijo: string; general: string; uso: string }[] = [
  { id: "alcohol", grupo: "–OH (hidroxilo)", sufijo: "-ol", general: "R–OH", uso: "etanol: bebidas, desinfectante y biocombustible" },
  { id: "aldehído", grupo: "–CHO (carbonilo terminal)", sufijo: "-al", general: "R–CHO", uso: "metanal: conservación de muestras (formol)" },
  { id: "cetona", grupo: "–CO– (carbonilo interior)", sufijo: "-ona", general: "R–CO–R'", uso: "propanona: disolvente (acetona)" },
  { id: "ácido carboxílico", grupo: "–COOH (carboxilo)", sufijo: "ácido …-oico", general: "R–COOH", uso: "ácido etanoico: vinagre" },
  { id: "amina", grupo: "–NH₂ (amino)", sufijo: "-amina", general: "R–NH₂", uso: "metilamina: síntesis de medicamentos y pesticidas" },
];
/** Compuesto de una familia funcional con n carbonos (cadena lineal, grupo en el extremo salvo las cetonas). */
export function compuestoFuncional(familia: Familia, n: number): { nombre: string; formula: string } | null {
  if (!Number.isInteger(n) || n < 1 || n > 10) return null;
  const raiz = RAICES[n]!;
  const cadena = (fin: string, interior = "CH₂"): string => (n === 1 ? fin.startsWith("CH") ? fin : `CH₃${fin}` : ["CH₃", ...Array(Math.max(0, n - 2)).fill(interior), fin].join("–"));
  switch (familia) {
    case "alcohol": return { nombre: n <= 2 ? `${raiz}anol` : `${raiz}an-1-ol`, formula: n === 1 ? "CH₃–OH" : cadena("CH₂–OH") };
    case "aldehído": return { nombre: `${raiz}anal`, formula: n === 1 ? "H–CHO" : cadena("CHO") };
    case "ácido carboxílico": return { nombre: `ácido ${raiz}anoico`, formula: n === 1 ? "H–COOH" : cadena("COOH") };
    case "amina": return { nombre: `${raiz}ilamina`, formula: n === 1 ? "CH₃–NH₂" : cadena("CH₂–NH₂") };
    case "cetona": {
      if (n < 3) return null;
      const nombre = n === 3 ? "propanona" : n === 4 ? "butanona" : `${raiz}an-2-ona`;
      return { nombre, formula: ["CH₃", "CO", ...Array(n - 3).fill("CH₂"), "CH₃"].join("–") };
    }
  }
}

export type Fraccion = { nombre: string; carbonos: string; ebullicion: string; tMin: number; tMax: number; uso: string };
export const FRACCIONES: Fraccion[] = [
  { nombre: "Gases de refinería (GLP)", carbonos: "C₁–C₄", ebullicion: "< 40 °C", tMin: -160, tMax: 40, uso: "butano, propano, gas de calefacción" },
  { nombre: "Gasolina", carbonos: "C₅–C₁₂", ebullicion: "40–200 °C", tMin: 40, tMax: 200, uso: "combustible de automóviles" },
  { nombre: "Queroseno", carbonos: "C₁₀–C₁₆", ebullicion: "175–275 °C", tMin: 175, tMax: 275, uso: "combustible de aviones" },
  { nombre: "Gasóleo (diésel)", carbonos: "C₁₄–C₂₀", ebullicion: "250–350 °C", tMin: 250, tMax: 350, uso: "camiones, barcos y calefacción" },
  { nombre: "Aceites lubricantes y parafinas", carbonos: "C₂₀–C₅₀", ebullicion: "350–500 °C", tMin: 350, tMax: 500, uso: "lubricantes, ceras, velas" },
  { nombre: "Residuos: asfalto y alquitrán", carbonos: "> C₅₀", ebullicion: "> 500 °C", tMin: 500, tMax: 900, uso: "asfaltado de carreteras, impermeabilizantes" },
];
/** Fracciones que ya han vaporizado y subido a una columna calentada a T (°C): las que tienen su mínimo de ebullición por debajo de T. */
export const fraccionesVaporizadas = (T: number): Fraccion[] => FRACCIONES.filter((f) => f.tMin < T);

export type Polimero = { nombre: string; sigla: string; monomero: string; masaMonomero: number; tipo: "adición" | "condensación" | "natural"; uso: string };
export const POLIMEROS: Polimero[] = [
  { nombre: "Polietileno", sigla: "PE", monomero: "eteno (CH₂=CH₂)", masaMonomero: 28, tipo: "adición", uso: "bolsas, botellas, film" },
  { nombre: "Polipropileno", sigla: "PP", monomero: "propeno (CH₂=CH–CH₃)", masaMonomero: 42, tipo: "adición", uso: "envases, tapones, textiles" },
  { nombre: "Policloruro de vinilo", sigla: "PVC", monomero: "cloroeteno (CH₂=CHCl)", masaMonomero: 62.5, tipo: "adición", uso: "tuberías, ventanas, cables" },
  { nombre: "Poliestireno", sigla: "PS", monomero: "estireno (C₈H₈)", masaMonomero: 104, tipo: "adición", uso: "envases, aislante (corcho blanco)" },
  { nombre: "Tereftalato de polietileno", sigla: "PET", monomero: "ácido tereftálico y etilenglicol", masaMonomero: 192, tipo: "condensación", uso: "botellas de bebidas" },
  { nombre: "Nailon (poliamida)", sigla: "PA", monomero: "diamina y diácido", masaMonomero: 226, tipo: "condensación", uso: "medias, cuerdas, tejidos" },
  { nombre: "Almidón", sigla: "—", monomero: "glucosa (C₆H₁₂O₆)", masaMonomero: 162, tipo: "natural", uso: "reserva de energía en las plantas" },
  { nombre: "Celulosa", sigla: "—", monomero: "glucosa (C₆H₁₂O₆)", masaMonomero: 162, tipo: "natural", uso: "pared de las células vegetales, papel" },
];
/** Masa molecular media del polímero: n · masa del monómero (u). */
export const masaPolimero = (masaMonomero: number, n: number): number => masaMonomero * Math.max(0, n);

export type MoleculaCarbono = { id: string; nombre: string; formula: string; hibridacion: "sp³" | "sp²" | "sp"; angulo: number; sigma: number; pi: number; atomos: { s: string; x: number; y: number }[]; enlaces: [number, number, number][] };
export const MOLECULAS_C: MoleculaCarbono[] = [
  { id: "metano", nombre: "Metano", formula: "CH₄", hibridacion: "sp³", angulo: 109.5, sigma: 4, pi: 0, atomos: [{ s: "C", x: 0, y: 0 }, { s: "H", x: -1, y: -0.8 }, { s: "H", x: 1, y: -0.8 }, { s: "H", x: -1, y: 0.8 }, { s: "H", x: 1, y: 0.8 }], enlaces: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]] },
  { id: "etano", nombre: "Etano", formula: "C₂H₆", hibridacion: "sp³", angulo: 109.5, sigma: 4, pi: 0, atomos: [{ s: "C", x: -0.6, y: 0 }, { s: "C", x: 0.6, y: 0 }, { s: "H", x: -1.2, y: -0.8 }, { s: "H", x: -1.2, y: 0.8 }, { s: "H", x: -1.5, y: 0 }, { s: "H", x: 1.2, y: -0.8 }, { s: "H", x: 1.2, y: 0.8 }, { s: "H", x: 1.5, y: 0 }], enlaces: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 1], [1, 6, 1], [1, 7, 1]] },
  { id: "eteno", nombre: "Eteno (etileno)", formula: "C₂H₄", hibridacion: "sp²", angulo: 120, sigma: 3, pi: 1, atomos: [{ s: "C", x: -0.6, y: 0 }, { s: "C", x: 0.6, y: 0 }, { s: "H", x: -1.2, y: -0.8 }, { s: "H", x: -1.2, y: 0.8 }, { s: "H", x: 1.2, y: -0.8 }, { s: "H", x: 1.2, y: 0.8 }], enlaces: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]] },
  { id: "etino", nombre: "Etino (acetileno)", formula: "C₂H₂", hibridacion: "sp", angulo: 180, sigma: 2, pi: 2, atomos: [{ s: "H", x: -1.5, y: 0 }, { s: "C", x: -0.6, y: 0 }, { s: "C", x: 0.6, y: 0 }, { s: "H", x: 1.5, y: 0 }], enlaces: [[0, 1, 1], [1, 2, 3], [2, 3, 1]] },
  { id: "benceno", nombre: "Benceno", formula: "C₆H₆", hibridacion: "sp²", angulo: 120, sigma: 3, pi: 1, atomos: Array.from({ length: 6 }, (_, k) => ({ s: "C", x: Math.cos((k * Math.PI) / 3), y: Math.sin((k * Math.PI) / 3) })).concat(Array.from({ length: 6 }, (_, k) => ({ s: "H", x: 1.7 * Math.cos((k * Math.PI) / 3), y: 1.7 * Math.sin((k * Math.PI) / 3) }))), enlaces: [[0, 1, 2], [1, 2, 1], [2, 3, 2], [3, 4, 1], [4, 5, 2], [5, 0, 1], [0, 6, 1], [1, 7, 1], [2, 8, 1], [3, 9, 1], [4, 10, 1], [5, 11, 1]] },
];

/* ───────────── 1. Enlaces del carbono ───────────── */

export function CarbonoEnlacesFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 2, 0, MOLECULAS_C.length - 1));
  const [i, setI] = useState(init);
  const m = MOLECULAS_C[i]!;
  const cx = 260;
  const cy = 70;
  const k = 42;
  const P = (a: { x: number; y: number }): [number, number] => [cx + a.x * k, cy + a.y * k];
  return (
    <Frame
      stacked
      hint={block.hint ?? "El carbono forma siempre 4 enlaces: simples, dobles o triples. Según cuáles, la geometría es tetraédrica, plana o lineal."}
      onReset={() => setI(init)}
      controls={<Choice label="Molécula" items={MOLECULAS_C.map((x, kk) => ({ value: String(kk), label: x.nombre.split(" ")[0]! }))} value={String(i)} onChange={(kk) => setI(Number(kk))} />}
    >
      <Svg w={520} h={150} testId="carbono-enlaces" maxH={170}>
        {m.enlaces.map(([a, b, o], ei) => {
          const A = P(m.atomos[a]!);
          const B = P(m.atomos[b]!);
          const dx = B[0] - A[0];
          const dy = B[1] - A[1];
          const L = Math.hypot(dx, dy) || 1;
          return (
            <g key={ei}>
              {Array.from({ length: o }, (_, j) => {
                const off = (j - (o - 1) / 2) * 6;
                return <Seg key={j} a={[A[0] + (-dy / L) * off + (dx / L) * 10, A[1] + (dx / L) * off + (dy / L) * 10]} b={[B[0] + (-dy / L) * off - (dx / L) * 10, B[1] + (dx / L) * off - (dy / L) * 10]} color={MANIM.ink} width={2.5} />;
              })}
            </g>
          );
        })}
        {m.atomos.map((a, ai) => {
          const [x, y] = P(a);
          return <text key={ai} x={x} y={y + 5} textAnchor="middle" fill={a.s === "C" ? MANIM.yellow : MANIM.ink} fontSize={a.s === "C" ? 16 : 13} fontWeight={700}>{a.s}</text>;
        })}
        <Dot p={[40, 130]} r={0.1} color={MANIM.muted} />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Molécula">{`${m.nombre} (${m.formula})`}</Stat>
        <Stat color={MANIM.orange} label="Hibridación del carbono">{m.hibridacion}</Stat>
        <Stat color={MANIM.blue} label="Ángulo de enlace">{`${f1(m.angulo)}°`}</Stat>
        <Stat color={MANIM.purple} label="Enlaces σ y π por átomo de C">{`${m.sigma} σ + ${m.pi} π`}</Stat>
        <Stat color={MANIM.green} label="Geometría">{m.hibridacion === "sp³" ? "tetraédrica" : m.hibridacion === "sp²" ? "plana (triangular)" : "lineal"}</Stat>
      </Readout>
      <Note>El <b>carbono</b> (Z = 6, 2s² 2p²) tiene <b>4 electrones de valencia</b> y forma <b>4 enlaces covalentes</b> (<b>tetravalencia</b>). Puede unirse a otros carbonos formando <b>cadenas</b> (lineales, ramificadas o cíclicas): por eso existen millones de compuestos orgánicos. Según los enlaces: <b>4 sencillos</b> (hibridación <b>sp³</b>, geometría tetraédrica, 109,5°); <b>1 doble</b> (<b>sp²</b>, plana, 120°); <b>1 triple</b> (<b>sp</b>, lineal, 180°). Un enlace doble contiene un enlace <b>σ</b> y uno <b>π</b>; uno triple, un σ y dos π. Los dibujos son planos y esquemáticos (el benceno se dibuja con sus enlaces alternados).</Note>
    </Frame>
  );
}

/* ───────────── 2. Hidrocarburos ───────────── */

export function HidrocarburosFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 4, 1, 10)), t: (["alcano", "alqueno", "alquino"] as TipoHC[])[Math.round(num(block.params?.n, 1, 0, 2))]!, p: Math.round(num(block.params?.b, 1, 1, 5)) };
  const [s, setS] = useState<{ n: number; t: TipoHC; p: number }>(init);
  const nEfec = s.t === "alcano" ? s.n : Math.max(2, s.n);
  const pMax = posicionMaxima(nEfec);
  const p = Math.min(s.p, pMax);
  const formula = formulaMolecular(nEfec, s.t);
  const semi = semidesarrollada(nEfec, s.t, p);
  const nombre = nombreHidrocarburo(nEfec, s.t, p);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Alcanos: enlaces sencillos (CₙH₂ₙ₊₂); alquenos: un doble enlace (CₙH₂ₙ); alquinos: un triple (CₙH₂ₙ₋₂)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo" items={[{ value: "alcano", label: "Alcano" }, { value: "alqueno", label: "Alqueno" }, { value: "alquino", label: "Alquino" }]} value={s.t} onChange={(t) => setS((o) => ({ ...o, t: t as TipoHC }))} />
          <Slider label="Átomos de carbono" value={nEfec} min={s.t === "alcano" ? 1 : 2} max={10} step={1} color={MANIM.blue} onChange={(n) => setS((o) => ({ ...o, n }))} />
          {s.t !== "alcano" && pMax > 1 && <Slider label="Posición del enlace múltiple" value={p} min={1} max={pMax} step={1} color={MANIM.orange} onChange={(pp) => setS((o) => ({ ...o, p: pp }))} />}
        </>
      }
    >
      <Svg w={520} h={100} testId="hidrocarburos" maxH={120}>
        <text x={260} y={42} textAnchor="middle" fill={MANIM.yellow} fontSize={nEfec > 7 ? 16 : 24} fontWeight={700}>{semi}</text>
        <text x={260} y={80} textAnchor="middle" fill={MANIM.green} fontSize={18} fontWeight={700}>{nombre}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Fórmula molecular">{formula ?? "—"}</Stat>
        <Stat color={MANIM.orange} label="Fórmula general">{s.t === "alcano" ? "CₙH₂ₙ₊₂" : s.t === "alqueno" ? "CₙH₂ₙ" : "CₙH₂ₙ₋₂"}</Stat>
        <Stat color={MANIM.purple} label="Isómeros de cadena del alcano">{ISOMEROS_ALCANOS[nEfec] !== undefined ? `${ISOMEROS_ALCANOS[nEfec]}` : "muchos"}</Stat>
      </Readout>
      <Note>Los <b>hidrocarburos</b> contienen solo <b>C e H</b>. Los <b>alcanos</b> (saturados) tienen enlaces sencillos: CₙH₂ₙ₊₂ (metano, etano, propano, butano…). Los <b>alquenos</b> tienen un enlace doble (CₙH₂ₙ) y los <b>alquinos</b>, uno triple (CₙH₂ₙ₋₂). El nombre usa una <b>raíz</b> según el nº de carbonos (<b>met-, et-, prop-, but-, pent-, hex-, hept-, oct-, non-, dec-</b>) y el sufijo <b>-ano, -eno, -ino</b>; desde 4 carbonos se indica la <b>posición</b> del enlace múltiple (<i>but-1-eno</i>, <i>but-2-eno</i>), con el número más bajo posible. Los <b>isómeros</b> comparten fórmula molecular pero tienen distinta estructura (el butano tiene 2). Aquí solo se tratan cadenas lineales.</Note>
    </Frame>
  );
}

/* ───────────── 3. Grupos funcionales ───────────── */

export function GruposFuncionalesFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { f: Math.round(num(block.params?.n, 0, 0, FAMILIAS.length - 1)), n: Math.round(num(block.params?.a, 2, 1, 6)) };
  const [s, setS] = useState(init);
  const fam = FAMILIAS[s.f]!;
  const comp = compuestoFuncional(fam.id, s.n);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El grupo funcional determina las propiedades y la terminación del nombre."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Familia" items={FAMILIAS.map((x, k) => ({ value: String(k), label: x.id }))} value={String(s.f)} onChange={(k) => setS((o) => ({ ...o, f: Number(k) }))} />
          <Slider label="Átomos de carbono de la cadena" value={s.n} min={1} max={6} step={1} color={MANIM.blue} onChange={(n) => setS((o) => ({ ...o, n }))} />
        </>
      }
    >
      <Svg w={520} h={100} testId="grupos-funcionales" maxH={120}>
        <text x={260} y={42} textAnchor="middle" fill={MANIM.yellow} fontSize={22} fontWeight={700}>{comp ? comp.formula : "(necesita al menos 3 carbonos)"}</text>
        <text x={260} y={80} textAnchor="middle" fill={MANIM.green} fontSize={18} fontWeight={700}>{comp ? comp.nombre : "—"}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Grupo funcional">{fam.grupo}</Stat>
        <Stat color={MANIM.blue} label="Fórmula general · sufijo">{`${fam.general} · ${fam.sufijo}`}</Stat>
        <Stat color={MANIM.green} label="Ejemplo de uso">{fam.uso}</Stat>
      </Readout>
      <Note>Un <b>grupo funcional</b> es un átomo o grupo de átomos que da a la molécula sus propiedades características. <b>Alcoholes</b> (–OH), <b>aldehídos</b> (–CHO, en un extremo), <b>cetonas</b> (–CO– en el interior), <b>ácidos carboxílicos</b> (–COOH), <b>aminas</b> (–NH₂), y también <b>éteres</b> (–O–), <b>ésteres</b> (–COO–) y <b>amidas</b> (–CONH₂). En el nombre, la <b>cadena principal</b> más larga que contiene el grupo da la raíz y el grupo da la <b>terminación</b>: etano → <i>etanol</i>, <i>etanal</i>, <i>ácido etanoico</i>. Se muestran solo cadenas lineales con el grupo en el extremo (las cetonas, en el carbono 2).</Note>
    </Frame>
  );
}

/* ───────────── 4. Destilación del petróleo ───────────── */

export function PetroleoFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 300, 0, 600));
  const [T, setT] = useState(init);
  const vap = fraccionesVaporizadas(T);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Los hidrocarburos más ligeros hierven a menor temperatura y salen por la parte alta de la torre."}
      onReset={() => setT(init)}
      controls={<Slider label="Temperatura del horno de la torre" value={T} min={0} max={600} step={10} unit=" °C" color={MANIM.red} onChange={setT} />}
    >
      <Svg w={520} h={185} testId="petroleo" maxH={205}>
        <rect x={190} y={10} width={140} height={150} rx={6} fill="none" stroke={MANIM.ink} strokeWidth={3} />
        {FRACCIONES.map((f, k) => {
          const y = 18 + k * 24;
          const act = f.tMin < T;
          return (
            <g key={f.nombre}>
              <Seg a={[190, y + 10]} b={[330, y + 10]} color={act ? MANIM.orange : MANIM.muted} width={act ? 3 : 1} dashed={!act} />
              <text x={184} y={y + 14} textAnchor="end" fill={act ? MANIM.ink : MANIM.muted} fontSize={11}>{f.carbonos}</text>
              <text x={338} y={y + 14} fill={act ? MANIM.ink : MANIM.muted} fontSize={11}>{f.nombre.split(" (")[0]}</text>
            </g>
          );
        })}
        <rect x={190} y={160 - Math.min(150, (T / 600) * 150)} width={140} height={Math.min(150, (T / 600) * 150)} fill={MANIM.red} fillOpacity={0.15} />
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Temperatura del horno">{`${T} °C`}</Stat>
        <Stat color={MANIM.orange} label="Fracciones ya vaporizadas">{`${vap.length} de ${FRACCIONES.length}`}</Stat>
        <Stat color={MANIM.green} label="Última fracción que alcanza">{vap.length ? `${vap[vap.length - 1]!.nombre} (${vap[vap.length - 1]!.carbonos}) — ${vap[vap.length - 1]!.uso}` : "ninguna"}</Stat>
      </Readout>
      <Note>El <b>petróleo</b> es una mezcla de cientos de <b>hidrocarburos</b>. En la <b>destilación fraccionada</b> se calienta y se introduce en una <b>torre</b>: los componentes de <b>cadena corta</b> (poco peso molecular, fuerzas de London débiles) hierven a baja temperatura y suben hasta la parte alta; los de <b>cadena larga</b> hierven a más temperatura y se condensan más abajo. Así se obtienen <b>gases</b> (GLP), <b>gasolina</b>, <b>queroseno</b>, <b>gasóleo</b>, <b>lubricantes</b> y <b>asfalto</b>. Los <b>combustibles fósiles</b> (petróleo, gas natural, carbón) se formaron durante millones de años y son <b>no renovables</b>: su combustión emite <b>CO₂</b>. Los intervalos son orientativos.</Note>
    </Frame>
  );
}

/* ───────────── 5. Polímeros ───────────── */

export function PolimerosFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 0, 0, POLIMEROS.length - 1)), n: Math.round(num(block.params?.a, 1000, 100, 10000)) };
  const [s, setS] = useState(init);
  const p = POLIMEROS[s.i]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un polímero es una molécula enorme formada por la unión de muchas unidades repetidas (monómeros)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Polímero" items={POLIMEROS.map((x, k) => ({ value: String(k), label: x.sigla === "—" ? x.nombre : x.sigla }))} value={String(s.i)} onChange={(k) => setS((o) => ({ ...o, i: Number(k) }))} />
          <Slider label="Nº de monómeros unidos (n)" value={s.n} min={100} max={10000} step={100} color={MANIM.blue} onChange={(n) => setS((o) => ({ ...o, n }))} />
        </>
      }
    >
      <Svg w={520} h={80} testId="polimeros" maxH={100}>
        {Array.from({ length: 8 }, (_, k) => <Dot key={k} p={[70 + k * 54, 40]} r={12} color={k % 2 === 0 ? MANIM.blue : MANIM.orange} />)}
        {Array.from({ length: 7 }, (_, k) => <Seg key={k} a={[82 + k * 54, 40]} b={[112 + k * 54, 40]} color={MANIM.ink} width={3} />)}
        <text x={260} y={72} textAnchor="middle" fill={MANIM.muted} fontSize={12}>— monómero — monómero — monómero —  (n veces)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Polímero">{`${p.nombre}${p.sigla !== "—" ? ` (${p.sigla})` : ""}`}</Stat>
        <Stat color={MANIM.blue} label="Monómero">{p.monomero}</Stat>
        <Stat color={MANIM.orange} label="Tipo de polimerización">{p.tipo === "natural" ? "polímero natural (biopolímero)" : p.tipo}</Stat>
        <Stat color={MANIM.purple} label={`Masa molecular con n = ${fmtEs(s.n, 0)}`}>{`≈ ${fmtEs(masaPolimero(p.masaMonomero, s.n), 0)} u`}</Stat>
        <Stat color={MANIM.green} label="Usos">{p.uso}</Stat>
      </Readout>
      <Note>Un <b>polímero</b> es una macromolécula formada por la repetición de unidades llamadas <b>monómeros</b>; su masa molecular es muy grande (n · masa del monómero, aproximadamente). En la <b>polimerización por adición</b>, los monómeros con doble enlace se unen sin perder nada (eteno → polietileno); en la de <b>condensación</b>, se unen liberando una molécula pequeña (agua). Hay polímeros <b>sintéticos</b> (plásticos, nailon) y <b>naturales</b> o <b>biomoléculas</b>: <b>glúcidos</b> (almidón, celulosa: monómero glucosa), <b>proteínas</b> (aminoácidos), <b>lípidos</b> y <b>ácidos nucleicos</b> (nucleótidos). Los plásticos tardan siglos en degradarse: hay que <b>reducir, reutilizar y reciclar</b>. Las masas de los monómeros son aproximadas.</Note>
    </Frame>
  );
}
