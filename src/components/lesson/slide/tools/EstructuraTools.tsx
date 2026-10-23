"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { LewisMolecule, Nucleus } from "@/components/lesson/anim/scenes/industrial/estructura";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Etiquetas tal cual: llevan símbolos (σ, ε, d²) que las mayúsculas estropearían. */
const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const en1 = (v: number) => v.toFixed(1).replace(".", ",");

const SELECT_CLS =
  "rounded-lg border border-[color:var(--stage-border,#3d4f66)] bg-[color:var(--stage-surface,#1a2332)] px-3 py-2 text-base text-[color:var(--stage-ink,#fff)]";

/* ───────────── Isótopos, isóbaros e isótonos ───────────── */

const SIMBOLOS = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca"];

export function IsotoposExplorador({ block }: { block: ToolBlock }) {
  const refZ = Math.round(num(block.params?.a, 6, 1, 20));
  const refN = Math.round(num(block.params?.b, 8, 0, 30));
  const init = { z: refZ, n: Math.max(0, refN - 2) };
  const [s, setS] = useState(init);
  const A = s.z + s.n;
  const refA = refZ + refN;
  const sym = SIMBOLOS[s.z - 1]!;
  const refSym = SIMBOLOS[refZ - 1]!;
  let rel: { text: string; color: string; why: string };
  if (s.z === refZ && s.n === refN) {
    rel = { text: "el mismo átomo", color: MANIM.muted, why: "Mismo Z y mismo N: es el átomo de referencia." };
  } else if (s.z === refZ) {
    rel = { text: "isótopo", color: MANIM.green, why: `Mismo número de protones (Z = ${refZ}) y distinto de neutrones.` };
  } else if (A === refA) {
    rel = { text: "isóbaro", color: MANIM.orange, why: `Mismo número másico (A = ${refA}) y distinto Z.` };
  } else if (s.n === refN) {
    rel = { text: "isótono", color: MANIM.purple, why: `Mismo número de neutrones (N = ${refN}) y distinto Z.` };
  } else {
    rel = { text: "sin relación", color: MANIM.red, why: "No coincide Z, ni A, ni N con el átomo de referencia." };
  }
  const total = (z: number, n: number) => z + n;
  const r = (t: number) => (t > 34 ? 4.6 : t > 20 ? 6 : 8);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve protones y neutrones. Prueba a dejar fijo uno de los tres números (Z, N o A) y ver qué relación sale."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Protones, Z" value={s.z} min={1} max={20} color={MANIM.red} onChange={(z) => setS((p) => ({ ...p, z }))} />
          <Slider label="Neutrones, N" value={s.n} min={0} max={30} color="#c3ccd8" onChange={(n) => setS((p) => ({ ...p, n }))} />
        </>
      }
    >
      <Svg w={520} h={210} maxH={220} testId="tool-isotopos">
        <Nucleus cx={130} cy={90} p={refZ} n={refN} r={r(total(refZ, refN))} />
        <text x={130} y={185} textAnchor="middle" fill={MANIM.blue} fontSize={17} fontWeight={700}>
          {refSym}-{refA} (referencia)
        </text>
        <Nucleus cx={390} cy={90} p={s.z} n={s.n} r={r(A)} />
        <text x={390} y={185} textAnchor="middle" fill={rel.color} fontSize={17} fontWeight={700}>
          {sym}-{A}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Z (protones)">
          {s.z}
        </Stat>
        <Stat color="#c3ccd8" label="N (neutrones)">
          {s.n}
        </Stat>
        <Stat color={MANIM.green} label="A = Z + N">
          {A}
        </Stat>
        <Stat color={rel.color} label={`Respecto de ${refSym}-${refA}`}>
          {rel.text}
        </Stat>
      </Readout>
      <Note>{rel.why}</Note>
    </Frame>
  );
}

/* ───────────── Energía de interacción entre dos átomos ───────────── */

const A0 = 0.3;
const eNet = (r: number) => (A0 / r) ** 12 - 2 * (A0 / r) ** 6;
const eAtt = (r: number) => -2 * (A0 / r) ** 6;
const eRep = (r: number) => (A0 / r) ** 12;

export function CurvaEnlaceExplorador({ block }: { block: ToolBlock }) {
  const init = { r: num(block.params?.a, 55, 20, 90) / 100, e0: Math.round(num(block.params?.b, 100, 10, 300) / 10) * 10 };
  const [s, setS] = useState(init);
  const X = (r: number) => 40 + ((r - 0.15) / 0.8) * 440;
  const Y = (e: number) => 100 - e * 62;
  const curve = (f: (r: number) => number) => {
    const pts: string[] = [];
    for (let r = 0.18; r <= 0.95 + 1e-9; r += 0.01) {
      const e = f(r);
      if (e > 1.7 || e < -1.4) {
        continue;
      }
      pts.push(`${pts.length ? "L" : "M"} ${X(r).toFixed(1)} ${Y(e).toFixed(1)}`);
    }
    return pts.join(" ");
  };
  const e = eNet(s.r);
  const eKcal = e * s.e0;
  const near = Math.abs(s.r - A0) <= 0.011;
  const state = near
    ? { text: "equilibrio: atracción = repulsión", color: MANIM.yellow }
    : s.r > A0
      ? { text: "domina la atracción", color: MANIM.green }
      : { text: "domina la repulsión", color: MANIM.red };
  const my = Math.max(24, Math.min(190, Y(Math.max(-1.3, Math.min(1.6, e)))));

  return (
    <Frame
      stacked
      hint={block.hint ?? "Acerca los átomos y busca el punto de energía mínima. Después cambia la energía de enlace: ¿qué cambia en la curva y qué no?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Distancia entre núcleos, r" value={s.r} min={0.2} max={0.9} step={0.01} unit=" nm" color={MANIM.orange} format={(v) => fmtEs(v, 2)} onChange={(r) => setS((p) => ({ ...p, r }))} />
          <Slider label="Energía de enlace, E₀" value={s.e0} min={10} max={300} step={10} unit=" kcal/mol" color={MANIM.blue} onChange={(e0) => setS((p) => ({ ...p, e0 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Distancia">
          r = {fmtEs(s.r, 2)} nm
        </Stat>
        <Stat color={state.color} label="Energía neta">
          E = {eKcal > 9999 ? "≫ 0" : `${fmtEs(eKcal, 0)} kcal/mol`}
        </Stat>
        <Stat color={state.color} label="Fuerzas">
          {state.text}
        </Stat>
      </Readout>
      <Svg w={520} h={250} maxH={250} testId="tool-curva-enlace">
        <line x1={40} y1={100} x2={500} y2={100} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={10} x2={40} y2={200} stroke={MANIM.muted} strokeWidth={2} />
        <path d={curve(eAtt)} fill="none" stroke={MANIM.green} strokeWidth={2.5} />
        <path d={curve(eRep)} fill="none" stroke={MANIM.red} strokeWidth={2.5} />
        <path d={curve(eNet)} fill="none" stroke={MANIM.blue} strokeWidth={4} />
        <line x1={X(A0)} y1={100} x2={X(A0)} y2={Y(-1)} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="4 4" />
        <text x={X(A0) + 8} y={Y(-1) + 18} fill={MANIM.yellow} fontSize={13}>
          −E₀ = −{s.e0} kcal/mol
        </text>
        <text x={X(A0)} y={116} textAnchor="middle" fill={MANIM.yellow} fontSize={13}>
          a₀
        </text>
        <circle cx={X(s.r)} cy={my} r={7} fill={MANIM.orange} className="anim-t" />
        <circle cx={X(0.15)} cy={228} r={14} fill={MANIM.purple} fillOpacity={0.8} />
        <circle cx={X(s.r)} cy={228} r={14} fill={MANIM.orange} fillOpacity={0.85} className="anim-t" />
        <text x={500} y={226} textAnchor="end" fill={MANIM.muted} fontSize={13}>
          r (nm)
        </text>
      </Svg>
      <Note>
        La curva azul es la suma de atracción (verde) y repulsión (roja). Su mínimo está a {fmtEs(A0, 1)} nm y su profundidad es la energía de enlace: un enlace más fuerte hace el
        pozo más profundo, pero no mueve el mínimo en este modelo.
      </Note>
    </Frame>
  );
}

/* ───────────── Electronegatividad y tipo de enlace ───────────── */

const ELEMENTOS_EN: { s: string; name: string; en: number; doble?: boolean }[] = [
  { s: "Cs", name: "cesio", en: 0.7 },
  { s: "K", name: "potasio", en: 0.8 },
  { s: "Rb", name: "rubidio", en: 0.8 },
  { s: "Na", name: "sodio", en: 0.9 },
  { s: "Ba", name: "bario", en: 0.9 },
  { s: "Li", name: "litio", en: 1.0 },
  { s: "Ca", name: "calcio", en: 1.0 },
  { s: "Sr", name: "estroncio", en: 1.0 },
  { s: "Mg", name: "magnesio", en: 1.2 },
  { s: "Sc", name: "escandio", en: 1.3 },
  { s: "Y", name: "itrio", en: 1.3 },
  { s: "Be", name: "berilio", en: 1.5 },
  { s: "Al", name: "aluminio", en: 1.5 },
  { s: "Ti", name: "titanio", en: 1.6 },
  { s: "Zr", name: "circonio", en: 1.6 },
  { s: "Ge", name: "germanio", en: 1.7, doble: true },
  { s: "Sn", name: "estaño", en: 1.7 },
  { s: "Si", name: "silicio", en: 1.8, doble: true },
  { s: "Sb", name: "antimonio", en: 1.8, doble: true },
  { s: "B", name: "boro", en: 2.0 },
  { s: "As", name: "arsénico", en: 2.0, doble: true },
  { s: "H", name: "hidrógeno", en: 2.1 },
  { s: "P", name: "fósforo", en: 2.1, doble: true },
  { s: "Te", name: "telurio", en: 2.1 },
  { s: "Se", name: "selenio", en: 2.4 },
  { s: "C", name: "carbono", en: 2.5, doble: true },
  { s: "S", name: "azufre", en: 2.5 },
  { s: "I", name: "yodo", en: 2.5 },
  { s: "Br", name: "bromo", en: 2.8 },
  { s: "Cl", name: "cloro", en: 3.0 },
  { s: "N", name: "nitrógeno", en: 3.1 },
  { s: "O", name: "oxígeno", en: 3.5 },
  { s: "F", name: "flúor", en: 4.1 },
];

function tipoEnlace(a: (typeof ELEMENTOS_EN)[number], b: (typeof ELEMENTOS_EN)[number]) {
  const dEN = Math.abs(a.en - b.en);
  const aMetal = a.en < 2;
  const bMetal = b.en < 2;
  if (aMetal && bMetal) {
    return { tipo: "metálico", color: MANIM.blue, why: "Dos elementos de baja electronegatividad: ceden electrones de valencia y forman una nube compartida por todos los núcleos." };
  }
  if (aMetal !== bMetal) {
    const menos = a.en < b.en ? a : b;
    const mas = a.en < b.en ? b : a;
    if (dEN >= 1.7) {
      return { tipo: "iónico", color: MANIM.orange, why: `${menos.s} (electropositivo) cede electrones a ${mas.s} (electronegativo): se forman iones y se atraen por fuerzas electrostáticas.` };
    }
    return { tipo: "covalente polar", color: MANIM.green, why: "Hay un metal y un no metal, pero la diferencia no es suficiente para una transferencia completa: los electrones se comparten de forma desigual." };
  }
  if (dEN < 0.4) {
    return { tipo: "covalente (apolar)", color: MANIM.green, why: "Electronegatividades muy parecidas: los electrones se comparten casi por igual entre los dos átomos." };
  }
  return { tipo: "covalente polar", color: MANIM.green, why: "Los átomos comparten electrones, pero el más electronegativo los atrae más: aparece un dipolo." };
}

export function ElectronegatividadExplorador({ block }: { block: ToolBlock }) {
  const iNa = ELEMENTOS_EN.findIndex((e) => e.s === "Na");
  const iCl = ELEMENTOS_EN.findIndex((e) => e.s === "Cl");
  const init = {
    a: Math.round(num(block.params?.a, iNa, 0, ELEMENTOS_EN.length - 1)),
    b: Math.round(num(block.params?.b, iCl, 0, ELEMENTOS_EN.length - 1)),
  };
  const [s, setS] = useState(init);
  const A = ELEMENTOS_EN[s.a]!;
  const B = ELEMENTOS_EN[s.b]!;
  const d = Math.abs(A.en - B.en);
  const t = tipoEnlace(A, B);
  const X = (en: number) => 30 + (en / 4.1) * 460;
  const [lo, hi] = A.en <= B.en ? [A, B] : [B, A];

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige dos elementos de la tabla (Na y Cl, K y F, O y O, C y H…). Fíjate en la diferencia de electronegatividad y en qué lado de 2,0 cae cada uno."}
      onReset={() => setS(init)}
      controls={
        <>
          {(["a", "b"] as const).map((k) => (
            <label key={k} className="flex flex-col gap-1.5 text-sm text-[color:var(--stage-muted,#b8c2d0)]">
              {k === "a" ? "Elemento 1" : "Elemento 2"}
              <select className={SELECT_CLS} value={s[k]} onChange={(e) => setS((p) => ({ ...p, [k]: Number(e.target.value) }))} aria-label={k === "a" ? "Elemento 1" : "Elemento 2"}>
                {ELEMENTOS_EN.map((el, i) => (
                  <option key={el.s} value={i}>
                    {el.s} · {el.name} ({en1(el.en)})
                  </option>
                ))}
              </select>
            </label>
          ))}
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Elemento 1">
          {A.s} · {en1(A.en)}
        </Stat>
        <Stat color={MANIM.purple} label="Elemento 2">
          {B.s} · {en1(B.en)}
        </Stat>
        <Stat color={MANIM.yellow} label="Diferencia">
          ΔEN = {en1(d)}
        </Stat>
        <Stat color={t.color} label="Enlace entre ellos">
          {t.tipo}
        </Stat>
      </Readout>
      <Svg w={520} h={120} maxH={125} testId="tool-electroneg">
        <line x1={30} y1={60} x2={490} y2={60} stroke={MANIM.muted} strokeWidth={3} />
        <line x1={X(2)} y1={36} x2={X(2)} y2={84} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="4 4" />
        <text x={X(2)} y={28} textAnchor="middle" fill={MANIM.yellow} fontSize={12}>
          2,0 (metal | no metal)
        </text>
        <text x={30} y={102} fill={MANIM.muted} fontSize={12}>
          0
        </text>
        <text x={490} y={102} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          4,1
        </text>
        <line x1={X(lo.en)} y1={60} x2={X(hi.en)} y2={60} stroke={t.color} strokeWidth={6} className="anim-t" />
        <circle cx={X(A.en)} cy={60} r={11} fill={MANIM.blue} />
        <circle cx={X(B.en)} cy={60} r={11} fill={MANIM.purple} />
        <text x={X(A.en)} y={A.en <= B.en ? 90 : 90} textAnchor="middle" fill={MANIM.blue} fontSize={14} fontWeight={700}>
          {A.s}
        </text>
        <text x={X(B.en)} y={90} textAnchor="middle" fill={MANIM.purple} fontSize={14} fontWeight={700}>
          {B.s}
        </text>
      </Svg>
      <Note>
        {t.why}
        {A.doble || B.doble ? " Ojo: " + [A, B].filter((e) => e.doble).map((e) => e.s).join(" y ") + " puede(n) comportarse como electropositivo(s) o electronegativo(s) según la reacción." : ""}
      </Note>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Criterio orientativo: metal si EN &lt; 2,0; iónico si ΔEN ≥ 1,7 entre metal y no metal.</p>
    </Frame>
  );
}

/* ───────────── Enlace covalente: pares compartidos ───────────── */

const COV_ELEM: { a: string; name: string; v: number; color: string }[] = [
  { a: "H", name: "hidrógeno", v: 1, color: MANIM.yellow },
  { a: "F", name: "flúor", v: 7, color: MANIM.green },
  { a: "Cl", name: "cloro", v: 7, color: MANIM.green },
  { a: "O", name: "oxígeno", v: 6, color: MANIM.blue },
  { a: "N", name: "nitrógeno", v: 5, color: MANIM.purple },
];

export function CovalenteExplorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 3, 0, COV_ELEM.length - 1));
  const [i, setI] = useState(init);
  const el = COV_ELEM[i]!;
  const objetivo = el.a === "H" ? 2 : 8;
  const faltan = objetivo - el.v;
  const mol = { name: `${el.a}₂`, a: el.a, v: el.v, pairs: faltan, x: 260, color: el.color };

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un elemento: cuenta cuántos electrones le faltan para completar su capa y cuántos pares comparten los dos átomos."}
      onReset={() => setI(init)}
      controls={<Choice label="Elemento (molécula X₂)" value={i} onChange={setI} items={COV_ELEM.map((e, k) => ({ value: k, label: `${e.a} · ${e.name}` }))} />}
    >
      <Readout>
        <Stat color={el.color} label="Electrones de valencia">
          {el.v}
        </Stat>
        <Stat color={MANIM.yellow} label={`Le faltan para ${objetivo}`}>
          {faltan}
        </Stat>
        <Stat color={MANIM.green} label="Pares compartidos">
          {faltan}
        </Stat>
        <Stat color={MANIM.orange} label="Enlace">
          {faltan === 1 ? `${el.a}–${el.a} simple` : faltan === 2 ? `${el.a}=${el.a} doble` : `${el.a}≡${el.a} triple`}
        </Stat>
      </Readout>
      <svg viewBox="0 0 520 300" className="mx-auto block h-auto max-h-[240px] w-full" aria-hidden focusable="false" data-testid="tool-covalente">
        <LewisMolecule m={mol} lines={false} cy={130} />
      </svg>
      <Note>
        {el.a === "H"
          ? "El hidrógeno solo necesita 2 electrones (como el helio): con un par compartido completa su capa."
          : `Cada átomo de ${el.name} aporta ${faltan} electrón${faltan > 1 ? "es" : ""} al enlace y los dos alcanzan 8 electrones (octeto).`}
      </Note>
    </Frame>
  );
}

/* ───────────── Energía de enlace frente a temperatura de fusión (Tabla 1.4) ───────────── */

type Sustancia = { s: string; tipo: "ionico" | "covalente" | "metalico" | "secundario"; e: number; tf: number };
const SUSTANCIAS: Sustancia[] = [
  { s: "LiCl", tipo: "ionico", e: 198, tf: 613 },
  { s: "KCl", tipo: "ionico", e: 164, tf: 776 },
  { s: "NaCl", tipo: "ionico", e: 153, tf: 801 },
  { s: "BaO", tipo: "ionico", e: 747, tf: 1923 },
  { s: "CaO", tipo: "ionico", e: 846, tf: 2580 },
  { s: "MgO", tipo: "ionico", e: 239, tf: 2800 },
  { s: "Si", tipo: "covalente", e: 108, tf: 1410 },
  { s: "C (diamante)", tipo: "covalente", e: 170, tf: 3550 },
  { s: "Hg", tipo: "metalico", e: 16, tf: -39 },
  { s: "K", tipo: "metalico", e: 21.4, tf: 63.5 },
  { s: "Al", tipo: "metalico", e: 77, tf: 660 },
  { s: "Fe", tipo: "metalico", e: 97, tf: 1536 },
  { s: "Ti", tipo: "metalico", e: 113, tf: 1812 },
  { s: "W", tipo: "metalico", e: 203, tf: 3410 },
  { s: "Ar", tipo: "secundario", e: 1.8, tf: -189 },
  { s: "Cl₂", tipo: "secundario", e: 7.4, tf: -101 },
  { s: "NH₃", tipo: "secundario", e: 8.4, tf: -78 },
  { s: "H₂O", tipo: "secundario", e: 12.2, tf: 0 },
];
const TIPO_COLOR: Record<Sustancia["tipo"], string> = { ionico: MANIM.orange, covalente: MANIM.green, metalico: MANIM.blue, secundario: MANIM.purple };
const TIPO_LABEL: Record<Sustancia["tipo"], string> = { ionico: "Iónico", covalente: "Covalente", metalico: "Metálico", secundario: "Van der Waals / H" };

/** Recta de mínimos cuadrados T = m·E + n con los metales de la tabla. */
function ajusteMetales() {
  const pts = SUSTANCIAS.filter((x) => x.tipo === "metalico");
  const n = pts.length;
  const sx = pts.reduce((a, p) => a + p.e, 0);
  const sy = pts.reduce((a, p) => a + p.tf, 0);
  const sxx = pts.reduce((a, p) => a + p.e * p.e, 0);
  const sxy = pts.reduce((a, p) => a + p.e * p.tf, 0);
  const m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  return { m, n: (sy - m * sx) / n };
}

export function EnlaceFusionGrafica({ block }: { block: ToolBlock }) {
  const initT = Math.round(num(block.params?.a, 1500, -50, 3500) / 50) * 50;
  const [s, setS] = useState<{ filtro: "todos" | Sustancia["tipo"]; t: number }>({ filtro: "metalico", t: initT });
  const { m, n } = ajusteMetales();
  const todos = s.filtro === "todos";
  const visibles = SUSTANCIAS.filter((x) => todos || x.tipo === s.filtro);
  const eMax = Math.max(...visibles.map((p) => p.e)) * 1.12;
  const tMin = Math.min(...visibles.map((p) => p.tf), 0) - 100;
  const tMax = Math.max(...visibles.map((p) => p.tf)) + 250;
  // En «todos» el eje de energías es logarítmico (de 1 a 1 000 kcal/mol) para que no se amontonen.
  const X = (e: number) => (todos ? 50 + (Math.log10(Math.max(e, 1)) / 3) * 440 : 50 + (e / eMax) * 440);
  const Y = (t: number) => 205 - ((t - tMin) / (tMax - tMin)) * 175;
  const estE = (s.t - n) / m;
  const metales = s.filtro === "metalico";
  const ticksE = todos ? [1, 10, 100, 1000] : [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round((eMax * f) / 10) * 10);
  const ticksT = [0, 1000, 2000, 3000].filter((t) => t > tMin && t < tMax);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada punto es una sustancia de la tabla. Filtra por tipo de enlace y usa la temperatura para estimar la energía de enlace de un metal."}
      onReset={() => setS({ filtro: "metalico", t: initT })}
      controls={
        <>
          <Choice
            label="Tipo de enlace"
            value={s.filtro}
            onChange={(filtro) => setS((p) => ({ ...p, filtro }))}
            items={[{ value: "todos" as const, label: "Todos" }, ...(Object.keys(TIPO_LABEL) as Sustancia["tipo"][]).map((k) => ({ value: k, label: TIPO_LABEL[k] }))]}
          />
          <Slider label="T de fusión de un metal" value={s.t} min={-50} max={3500} step={50} unit=" °C" color={MANIM.yellow} onChange={(t) => setS((p) => ({ ...p, t }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Si T de fusión =">
          {fmtEs(s.t, 0)} °C
        </Stat>
        <Stat color={MANIM.blue} label="Energía de enlace estimada (recta de los metales)">
          ≈ {fmtEs(Math.max(0, estE), 0)} kcal/mol
        </Stat>
      </Readout>
      <Svg w={520} h={260} maxH={265} testId="tool-enlace-fusion">
        <line x1={50} y1={205} x2={505} y2={205} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={22} x2={50} y2={205} stroke={MANIM.muted} strokeWidth={2} />
        {tMin < 0 ? <line x1={50} y1={Y(0)} x2={505} y2={Y(0)} stroke={MANIM.grid} strokeWidth={1.5} strokeDasharray="4 4" /> : null}
        {ticksT.map((t) => (
          <text key={t} x={46} y={Y(t) + 4} textAnchor="end" fill={MANIM.muted} fontSize={11}>
            {fmtEs(t, 0)}
          </text>
        ))}
        {ticksE.map((e) => (
          <text key={e} x={X(e)} y={221} textAnchor="middle" fill={MANIM.muted} fontSize={11}>
            {fmtEs(e, 0)}
          </text>
        ))}
        <text x={505} y={242} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          energía de enlace (kcal/mol){todos ? " · escala logarítmica" : ""}
        </text>
        <text x={50} y={14} fill={MANIM.muted} fontSize={12}>
          T de fusión (°C)
        </text>
        {metales ? (
          <g>
            <line x1={X(0)} y1={Y(n)} x2={X(eMax)} y2={Y(m * eMax + n)} stroke={MANIM.blue} strokeWidth={2} strokeDasharray="6 5" />
            <circle cx={X(Math.max(0, estE))} cy={Y(s.t)} r={8} fill="none" stroke={MANIM.yellow} strokeWidth={3} className="anim-t" />
          </g>
        ) : null}
        {visibles.map((p) => (
          <g key={p.s}>
            <circle cx={X(p.e)} cy={Y(p.tf)} r={5.5} fill={TIPO_COLOR[p.tipo]} />
            <text x={X(p.e) + 8} y={Y(p.tf) + 4} fill={TIPO_COLOR[p.tipo]} fontSize={11}>
              {p.s}
            </text>
          </g>
        ))}
      </Svg>
      <Note>
        A más energía de enlace, más calor hace falta para romper la red: sube la temperatura de fusión. En los metales (línea discontinua) la relación es casi lineal; el enlace
        iónico alcanza energías mucho mayores.
      </Note>
    </Frame>
  );
}

/* ───────────── Celdas unitarias BCC, FCC y HCP en 3D ───────────── */

type Cell = "bcc" | "fcc" | "hcp";
type P3 = [number, number, number];
type CellAtom = { p: P3; tipo: "esquina" | "cara" | "centro" };

const C_A = 1.633;
function geometria(cell: Cell): { atoms: CellAtom[]; edges: [P3, P3][]; scale: number } {
  if (cell === "hcp") {
    const top = (i: number): P3 => [Math.cos(rad(60 * i)), C_A / 2, Math.sin(rad(60 * i))];
    const bot = (i: number): P3 => [Math.cos(rad(60 * i)), -C_A / 2, Math.sin(rad(60 * i))];
    const atoms: CellAtom[] = [
      ...Array.from({ length: 6 }, (_, i) => ({ p: top(i), tipo: "esquina" as const })),
      ...Array.from({ length: 6 }, (_, i) => ({ p: bot(i), tipo: "esquina" as const })),
      { p: [0, C_A / 2, 0], tipo: "cara" },
      { p: [0, -C_A / 2, 0], tipo: "cara" },
      ...[30, 150, 270].map((a) => ({ p: [Math.cos(rad(a)) / Math.sqrt(3), 0, Math.sin(rad(a)) / Math.sqrt(3)] as P3, tipo: "centro" as const })),
    ];
    const edges: [P3, P3][] = [];
    for (let i = 0; i < 6; i += 1) {
      edges.push([top(i), top((i + 1) % 6)], [bot(i), bot((i + 1) % 6)], [top(i), bot(i)]);
    }
    return { atoms, edges, scale: 78 };
  }
  const v: P3[] = [];
  for (const x of [-0.5, 0.5]) {
    for (const y of [-0.5, 0.5]) {
      for (const z of [-0.5, 0.5]) {
        v.push([x, y, z]);
      }
    }
  }
  const atoms: CellAtom[] = v.map((p) => ({ p, tipo: "esquina" }));
  if (cell === "bcc") {
    atoms.push({ p: [0, 0, 0], tipo: "centro" });
  } else {
    for (const [x, y, z] of [
      [0.5, 0, 0],
      [-0.5, 0, 0],
      [0, 0.5, 0],
      [0, -0.5, 0],
      [0, 0, 0.5],
      [0, 0, -0.5],
    ] as P3[]) {
      atoms.push({ p: [x, y, z], tipo: "cara" });
    }
  }
  const edges: [P3, P3][] = [];
  for (const a of v) {
    for (const b of v) {
      const diff = (a[0] !== b[0] ? 1 : 0) + (a[1] !== b[1] ? 1 : 0) + (a[2] !== b[2] ? 1 : 0);
      if (diff === 1 && a < b) {
        edges.push([a, b]);
      }
    }
  }
  return { atoms, edges, scale: 135 };
}

const TILT = 24;
function proyectar(p: P3, angle: number, scale: number, cx: number, cy: number) {
  const th = rad(angle);
  const ph = rad(TILT);
  const X = p[0] * Math.cos(th) + p[2] * Math.sin(th);
  const Z = -p[0] * Math.sin(th) + p[2] * Math.cos(th);
  const Y = p[1] * Math.cos(ph) - Z * Math.sin(ph);
  const depth = Z * Math.cos(ph) + p[1] * Math.sin(ph);
  return { sx: cx + X * scale, sy: cy - Y * scale, depth };
}

const CELL_COLOR = { esquina: MANIM.blue, cara: MANIM.green, centro: MANIM.orange } as const;

/** Celda unitaria dibujada con proyección ortogonal (átomos ordenados por profundidad). */
export function CellDrawing({ cell, angle, cx = 260, cy = 130, size = 1 }: { cell: Cell; angle: number; cx?: number; cy?: number; size?: number }) {
  const g = geometria(cell);
  const sc = g.scale * size;
  const atoms = g.atoms
    .map((a) => ({ ...a, ...proyectar(a.p, angle, sc, cx, cy) }))
    .sort((a, b) => a.depth - b.depth);
  return (
    <g>
      {g.edges.map(([a, b], i) => {
        const pa = proyectar(a, angle, sc, cx, cy);
        const pb = proyectar(b, angle, sc, cx, cy);
        return <line key={i} x1={pa.sx} y1={pa.sy} x2={pb.sx} y2={pb.sy} stroke={MANIM.muted} strokeWidth={1.8} strokeOpacity={0.75} />;
      })}
      {atoms.map((a, i) => (
        <circle key={i} cx={a.sx} cy={a.sy} r={(cell === "hcp" ? 9 : 11) * size * (0.85 + 0.15 * Math.max(-1, Math.min(1, a.depth)))} fill={CELL_COLOR[a.tipo]} stroke={MANIM.surface} strokeWidth={1.5} />
      ))}
    </g>
  );
}

const CELL_INFO: Record<Cell, { nombre: string; atomos: string; total: number; coord: number; ejemplos: string }> = {
  bcc: { nombre: "BCC · cúbica centrada en el cuerpo (CC)", atomos: "8 · 1/8 + 1", total: 2, coord: 8, ejemplos: "Fe (a temperatura ambiente), Cr, Na" },
  fcc: { nombre: "FCC · cúbica centrada en las caras (CCC)", atomos: "8 · 1/8 + 6 · 1/2", total: 4, coord: 12, ejemplos: "Al, Cu, Ni, Ca" },
  hcp: { nombre: "HCP · hexagonal compacta", atomos: "12 · 1/6 + 2 · 1/2 + 3", total: 6, coord: 12, ejemplos: "Ti, Co" },
};

export function CeldaExplorador({ block }: { block: ToolBlock }) {
  const idx = Math.round(num(block.params?.a, 0, 0, 2));
  const initCell: Cell = (["bcc", "fcc", "hcp"] as const)[idx]!;
  const [s, setS] = useState<{ cell: Cell; ang: number }>({ cell: initCell, ang: 35 });
  const info = CELL_INFO[s.cell];

  return (
    <Frame
      stacked
      hint={block.hint ?? "Gira la celda para ver los átomos de delante y de detrás. Cambia de estructura y compara cuántos átomos tiene cada una."}
      onReset={() => setS({ cell: initCell, ang: 35 })}
      controls={
        <>
          <Choice
            label="Estructura"
            value={s.cell}
            onChange={(cell) => setS((p) => ({ ...p, cell }))}
            items={[
              { value: "bcc" as const, label: "BCC" },
              { value: "fcc" as const, label: "FCC" },
              { value: "hcp" as const, label: "HCP" },
            ]}
          />
          <Slider label="Giro" value={s.ang} min={0} max={360} step={5} unit="°" color={MANIM.yellow} onChange={(ang) => setS((p) => ({ ...p, ang }))} />
        </>
      }
    >
      <Svg w={520} h={275} maxH={275} testId="tool-celda">
        <CellDrawing cell={s.cell} angle={s.ang} cx={260} cy={112} size={0.88} />
        <g fontSize={13}>
          <circle cx={30} cy={256} r={6} fill={MANIM.blue} />
          <text x={42} y={261} fill={MANIM.muted}>
            vértice
          </text>
          {s.cell !== "bcc" ? (
            <g>
              <circle cx={110} cy={256} r={6} fill={MANIM.green} />
              <text x={122} y={261} fill={MANIM.muted}>
                centro de cara
              </text>
            </g>
          ) : null}
          {s.cell !== "fcc" ? (
            <g>
              <circle cx={230} cy={256} r={6} fill={MANIM.orange} />
              <text x={242} y={261} fill={MANIM.muted}>
                {s.cell === "bcc" ? "centro del cuerpo" : "dentro de la celda"}
              </text>
            </g>
          ) : null}
        </g>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Estructura">
          {info.nombre}
        </Stat>
      </Readout>
      <Readout>
        <Stat color={MANIM.green} label="Átomos por celda">
          {info.atomos} = {info.total}
        </Stat>
        <Stat color={MANIM.orange} label="Vecinos más próximos">
          {info.coord}
        </Stat>
        <Stat color={MANIM.purple} label="Ejemplos">
          {info.ejemplos}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── Alotropía: la estructura depende de la temperatura ───────────── */

type Tramo = { hasta: number; cell: Cell };
const ALOTROPOS: { id: string; label: string; tramos: Tramo[] }[] = [
  { id: "Fe", label: "Hierro (Fe)", tramos: [{ hasta: 912, cell: "bcc" }, { hasta: 1394, cell: "fcc" }, { hasta: 99_999, cell: "bcc" }] },
  { id: "Ca", label: "Calcio (Ca)", tramos: [{ hasta: 447, cell: "fcc" }, { hasta: 99_999, cell: "bcc" }] },
  { id: "Ti", label: "Titanio (Ti)", tramos: [{ hasta: 883, cell: "hcp" }, { hasta: 99_999, cell: "bcc" }] },
  { id: "Na", label: "Sodio (Na)", tramos: [{ hasta: -193, cell: "hcp" }, { hasta: 99_999, cell: "bcc" }] },
  { id: "Al", label: "Aluminio (Al)", tramos: [{ hasta: 99_999, cell: "fcc" }] },
  { id: "Cu", label: "Cobre (Cu)", tramos: [{ hasta: 99_999, cell: "fcc" }] },
  { id: "Cr", label: "Cromo (Cr)", tramos: [{ hasta: 99_999, cell: "bcc" }] },
];
const T_MIN = -273;
const T_MAX = 1600;

export function AlotropiaExplorador({ block }: { block: ToolBlock }) {
  const initM = Math.round(num(block.params?.a, 0, 0, ALOTROPOS.length - 1));
  const initT = Math.round(num(block.params?.b, 20, T_MIN, T_MAX));
  const [s, setS] = useState({ m: initM, t: initT });
  const metal = ALOTROPOS[s.m]!;
  const tramo = metal.tramos.find((x) => s.t < x.hasta) ?? metal.tramos[metal.tramos.length - 1]!;
  const cambios = metal.tramos.slice(0, -1).map((x) => x.hasta);
  const BX = (t: number) => 30 + ((t - T_MIN) / (T_MAX - T_MIN)) * 460;
  const edges = [T_MIN, ...cambios, T_MAX];

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube y baja la temperatura del hierro y mira cuándo cambia la celda. Compara con el aluminio, que nunca cambia."}
      onReset={() => setS({ m: initM, t: initT })}
      controls={
        <>
          <Choice label="Metal" value={s.m} onChange={(m) => setS((p) => ({ ...p, m }))} items={ALOTROPOS.map((a, i) => ({ value: i, label: a.id }))} />
          <Slider label="Temperatura" value={s.t} min={T_MIN} max={T_MAX} step={1} unit=" °C" color={MANIM.orange} onChange={(t) => setS((p) => ({ ...p, t }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label={metal.label}>
          {tramo.cell.toUpperCase()}
        </Stat>
        <Stat color={MANIM.yellow} label="Transformaciones">
          {cambios.length ? cambios.map((c) => `${fmtEs(c, 0)} °C`).join(" y ") : "ninguna (no cambia)"}
        </Stat>
      </Readout>
      <Svg w={520} h={290} maxH={290} testId="tool-alotropia">
        <CellDrawing cell={tramo.cell} angle={35} cx={260} cy={100} size={0.85} />
        {edges.slice(0, -1).map((lo, i) => (
          <rect key={i} x={BX(lo)} y={215} width={BX(edges[i + 1]!) - BX(lo)} height={22} fill={{ bcc: MANIM.orange, fcc: MANIM.green, hcp: MANIM.purple }[(metal.tramos[i] ?? tramo).cell]} fillOpacity={0.55} />
        ))}
        {edges.slice(0, -1).map((lo, i) => (
          <text key={`t${i}`} x={(BX(lo) + BX(edges[i + 1]!)) / 2} y={231} textAnchor="middle" fill={MANIM.ink} fontSize={12} fontWeight={700}>
            {(metal.tramos[i] ?? tramo).cell.toUpperCase()}
          </text>
        ))}
        <line x1={BX(s.t)} y1={206} x2={BX(s.t)} y2={246} stroke={MANIM.yellow} strokeWidth={3} />
        <text x={30} y={266} fill={MANIM.muted} fontSize={12}>
          −273 °C
        </text>
        <text x={490} y={266} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          1 600 °C
        </text>
      </Svg>
      <Note>Un mismo elemento puede cristalizar de formas distintas según la presión y la temperatura: es la alotropía (polimorfismo).</Note>
    </Frame>
  );
}
