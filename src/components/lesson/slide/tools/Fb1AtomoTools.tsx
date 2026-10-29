"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Seg, arrowHead } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");

const SUPD = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (n: number): string => String(Math.abs(n)).replace(/[0-9]/g, (c) => SUPD[Number(c)]!);
/** Notación científica con coma decimal: 1,23·10⁻⁷ */
export function cient(v: number, dec = 2): string {
  if (!Number.isFinite(v) || v === 0) return "—";
  let e = Math.floor(Math.log10(Math.abs(v)));
  let m = v / 10 ** e;
  if (Math.abs(Number(m.toFixed(dec))) >= 10) { m /= 10; e += 1; }
  return e === 0 ? fmtEs(m, dec) : `${fmtEs(m, dec)}·10${e < 0 ? "⁻" : ""}${sup(e)}`;
}

/* ───────────── Datos y cálculos (se comprueban en los tests) ───────────── */

export const SIMB = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe"] as const;
export const NOMB = ["Hidrógeno", "Helio", "Litio", "Berilio", "Boro", "Carbono", "Nitrógeno", "Oxígeno", "Flúor", "Neón", "Sodio", "Magnesio", "Aluminio", "Silicio", "Fósforo", "Azufre", "Cloro", "Argón", "Potasio", "Calcio", "Escandio", "Titanio", "Vanadio", "Cromo", "Manganeso", "Hierro", "Cobalto", "Níquel", "Cobre", "Cinc", "Galio", "Germanio", "Arsénico", "Selenio", "Bromo", "Kriptón", "Rubidio", "Estroncio", "Itrio", "Circonio", "Niobio", "Molibdeno", "Tecnecio", "Rutenio", "Rodio", "Paladio", "Plata", "Cadmio", "Indio", "Estaño", "Antimonio", "Telurio", "Yodo", "Xenón"] as const;
export const simbolo = (Z: number): string => SIMB[Math.round(Z) - 1] ?? "?";
export const nombreElemento = (Z: number): string => NOMB[Math.round(Z) - 1] ?? "?";

/** Partículas de un átomo o ion: protones = Z, neutrones = A − Z, electrones = Z − carga. */
export function particulas(Z: number, A: number, carga: number) {
  const z = Math.round(Z);
  const a = Math.round(A);
  return { p: z, n: a - z, e: z - Math.round(carga), valido: z >= 1 && a >= z };
}

export const ORDEN = [
  { sub: "1s", n: 1, l: 0 }, { sub: "2s", n: 2, l: 0 }, { sub: "2p", n: 2, l: 1 }, { sub: "3s", n: 3, l: 0 }, { sub: "3p", n: 3, l: 1 },
  { sub: "4s", n: 4, l: 0 }, { sub: "3d", n: 3, l: 2 }, { sub: "4p", n: 4, l: 1 }, { sub: "5s", n: 5, l: 0 }, { sub: "4d", n: 4, l: 2 }, { sub: "5p", n: 5, l: 1 },
] as const;
const LETRA = ["s", "p", "d", "f"];
export const capacidad = (l: number): number => 2 * (2 * l + 1);
const EXCEPCIONES: Record<number, Record<string, number>> = {
  24: { "4s": 1, "3d": 5 }, 29: { "4s": 1, "3d": 10 },
  41: { "5s": 1, "4d": 4 }, 42: { "5s": 1, "4d": 5 }, 44: { "5s": 1, "4d": 7 }, 45: { "5s": 1, "4d": 8 }, 46: { "5s": 0, "4d": 10 }, 47: { "5s": 1, "4d": 10 },
};

/** Configuración electrónica (principio de construcción, Pauli y Hund) de un átomo neutro o ion (Z entre 1 y 54). */
export function configuracionBach(Z: number, carga = 0): { sub: string; n: number; l: number; e: number }[] {
  const z = Math.round(Z);
  const q = Math.round(carga);
  if (!(z >= 1 && z <= 54)) return [];
  const total = z - q;
  if (total < 0) return [];
  const llenar = (cuantos: number, exc?: Record<string, number>) => {
    let resto = cuantos;
    const out = ORDEN.map((s) => ({ sub: s.sub, n: s.n, l: s.l, e: 0 }));
    for (const s of out) {
      const k = Math.min(capacidad(s.l), resto);
      s.e = k;
      resto -= k;
      if (resto <= 0) break;
    }
    if (exc) for (const s of out) if (s.sub in exc) s.e = exc[s.sub]!;
    return out;
  };
  let cfg;
  if (q <= 0) {
    cfg = llenar(total, q === 0 ? EXCEPCIONES[z] : undefined);
  } else {
    cfg = llenar(z, EXCEPCIONES[z]);
    let quitar = q;
    const orden = [...cfg].sort((a, b) => b.n - a.n || b.l - a.l);
    for (const s of orden) {
      const k = Math.min(s.e, quitar);
      s.e -= k;
      quitar -= k;
      if (quitar <= 0) break;
    }
  }
  return cfg.filter((s) => s.e > 0);
}
const SUPE = "⁰¹²³⁴⁵⁶⁷⁸⁹";
export const textoConfig = (cfg: { sub: string; e: number }[]): string => cfg.map((s) => `${s.sub}${String(s.e).replace(/[0-9]/g, (c) => SUPE[Number(c)]!)}`).join(" ");
/** Notación abreviada con el gas noble anterior. */
export function configAbreviada(Z: number, carga = 0): string {
  const nobles = [{ z: 2, s: "He" }, { z: 10, s: "Ne" }, { z: 18, s: "Ar" }, { z: 36, s: "Kr" }];
  const e = Math.round(Z) - Math.round(carga);
  const gas = [...nobles].reverse().find((g) => g.z < e && Math.round(Z) <= 54);
  const cfg = configuracionBach(Z, carga);
  if (!gas || carga !== 0) return textoConfig(cfg);
  const base = configuracionBach(gas.z, 0);
  const rest = cfg.map((s) => ({ ...s, e: s.e - (base.find((b) => b.sub === s.sub)?.e ?? 0) })).filter((s) => s.e > 0);
  return `[${gas.s}] ${textoConfig(rest)}`;
}
/** Electrones desapareados (regla de Hund) y carácter magnético. */
export function desapareadosBach(cfg: { l: number; e: number }[]): number {
  return cfg.reduce((s, x) => s + (x.e <= 2 * x.l + 1 ? x.e : 2 * (2 * x.l + 1) - x.e), 0);
}
/** Números cuánticos del último electrón colocado según el orden de llenado. */
export function ultimoElectron(cfg: { sub: string; n: number; l: number; e: number }[]) {
  const ultimo = [...cfg].sort((a, b) => ORDEN.findIndex((o) => o.sub === a.sub) - ORDEN.findIndex((o) => o.sub === b.sub)).at(-1);
  if (!ultimo) return null;
  const k = ultimo.e;
  const orbitales = 2 * ultimo.l + 1;
  const ml = k <= orbitales ? -ultimo.l + (k - 1) : -ultimo.l + (k - orbitales - 1);
  return { n: ultimo.n, l: ultimo.l, ml, ms: k <= orbitales ? 0.5 : -0.5, sub: ultimo.sub };
}

/** Modelo de Bohr del hidrógeno. */
export const energiaNivel = (n: number): number => (n >= 1 ? -13.6 / (n * n) : NaN);
export const RYDBERG = 1.097e7;
export const HC_EV_NM = 1239.84;
export function transicion(ni: number, nf: number) {
  if (!(ni >= 1) || !(nf >= 1) || ni === nf) return { dE: 0, lambda: NaN, tipo: "ninguna" as const, region: "—", serie: "—" };
  const dE = energiaNivel(ni) - energiaNivel(nf); // >0 emisión (ni > nf)
  const lambda = HC_EV_NM / Math.abs(dE);
  const region = lambda < 380 ? "ultravioleta" : lambda <= 750 ? "visible" : "infrarrojo";
  const menor = Math.min(ni, nf);
  const serie = ["", "Lyman", "Balmer", "Paschen", "Brackett", "Pfund"][menor] ?? `n = ${menor}`;
  return { dE: Math.abs(dE), lambda, tipo: dE > 0 ? ("emisión" as const) : ("absorción" as const), region, serie };
}
export const lambdaRydberg = (ni: number, nf: number): number => 1 / (RYDBERG * Math.abs(1 / (nf * nf) - 1 / (ni * ni))) * 1e9;

/** Hipótesis de De Broglie: λ = h/(m·v). */
export const H_PLANCK = 6.626e-34;
export const PARTICULAS_DB = [
  { id: "electron", nombre: "Electrón", m: 9.109e-31 },
  { id: "proton", nombre: "Protón", m: 1.673e-27 },
  { id: "pelota", nombre: "Pelota de tenis", m: 0.057 },
  { id: "persona", nombre: "Persona", m: 70 },
] as const;
export const deBroglie = (m: number, v: number): number => (m > 0 && v > 0 ? H_PLANCK / (m * v) : NaN);

/** Validez de un conjunto de números cuánticos. */
export function cuanticosValidos(n: number, l: number, ml: number, ms: number): { ok: boolean; motivo: string } {
  if (!Number.isInteger(n) || n < 1) return { ok: false, motivo: "n debe ser un entero ≥ 1" };
  if (!Number.isInteger(l) || l < 0 || l > n - 1) return { ok: false, motivo: `l debe estar entre 0 y n − 1 = ${n - 1}` };
  if (!Number.isInteger(ml) || Math.abs(ml) > l) return { ok: false, motivo: `m_l debe estar entre −l = ${-l} y +l = ${l}` };
  if (ms !== 0.5 && ms !== -0.5) return { ok: false, motivo: "m_s solo puede valer +½ o −½" };
  return { ok: true, motivo: "combinación permitida" };
}
export const nombreSubnivel = (n: number, l: number): string => `${n}${LETRA[l] ?? `(l=${l})`}`;

/* ───────────── 1. Partículas e isótopos ───────────── */

export function ParticulasIsotoposFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { Z: Math.round(num(block.params?.a, 6, 1, 54)), A: Math.round(num(block.params?.b, 14, 1, 140)), q: Math.round(num(block.params?.c, 0, -3, 3)) };
  const [s, setS] = useState(init);
  const A = Math.max(s.A, s.Z);
  const p = particulas(s.Z, A, s.q);
  const max = Math.max(p.p, p.n, p.e, 1);
  const bar = (x: number, v: number, color: string, l: string) => (
    <g key={l}>
      <rect x={x} y={100 - (v / max) * 75} width={50} height={(v / max) * 75} fill={color} />
      <text x={x + 25} y={116} textAnchor="middle" fill={color} fontSize={12}>{l}</text>
      <text x={x + 25} y={95 - (v / max) * 75} textAnchor="middle" fill={MANIM.ink} fontSize={12}>{v}</text>
    </g>
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "Z (nº atómico) = protones; A (nº másico) = protones + neutrones; en un ion, electrones = Z − carga."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Número atómico Z" value={s.Z} min={1} max={54} step={1} color={MANIM.blue} onChange={(Z) => setS((o) => ({ ...o, Z }))} />
          <Slider label="Número másico A" value={A} min={1} max={140} step={1} color={MANIM.orange} onChange={(a) => setS((o) => ({ ...o, A: a }))} />
          <Slider label="Carga del ion" value={s.q} min={-3} max={3} step={1} color={MANIM.purple} format={(v) => (v > 0 ? `+${v}` : String(v))} onChange={(q) => setS((o) => ({ ...o, q }))} />
        </>
      }
    >
      <Svg w={520} h={125} testId="particulas-isotopos" maxH={145}>
        <text x={130} y={62} textAnchor="middle" fill={MANIM.yellow} fontSize={34} fontWeight={700}>{`${A}`}</text>
        <text x={130} y={98} textAnchor="middle" fill={MANIM.muted} fontSize={22}>{`${s.Z}`}</text>
        <text x={190} y={80} fill={MANIM.yellow} fontSize={44} fontWeight={700}>{simbolo(s.Z)}</text>
        {s.q !== 0 && <text x={250} y={54} fill={MANIM.purple} fontSize={22}>{`${Math.abs(s.q) > 1 ? Math.abs(s.q) : ""}${s.q > 0 ? "+" : "−"}`}</text>}
        {bar(320, p.p, MANIM.red, "protones")}
        {bar(380, p.n, MANIM.muted, "neutrones")}
        {bar(440, p.e, MANIM.blue, "electrones")}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Especie">{`${nombreElemento(s.Z)}-${A}${s.q === 0 ? "" : s.q > 0 ? ` (catión ${s.q}+)` : ` (anión ${Math.abs(s.q)}−)`}`}</Stat>
        <Stat color={MANIM.red} label="Protones · neutrones · electrones">{`${p.p} · ${p.n} · ${p.e}`}</Stat>
        <Stat color={MANIM.purple} label="Carga neta">{`${s.q > 0 ? "+" : ""}${s.q} (${s.q === 0 ? "átomo neutro" : "ion"})`}</Stat>
        <Stat color={MANIM.green} label="Isótopos">{`mismo Z (${s.Z}), distinto A: cambia solo el nº de neutrones`}</Stat>
      </Readout>
      <Note>El átomo tiene un <b>núcleo</b> (protones + neutrones, los <b>nucleones</b>) y una <b>corteza</b> de electrones. <b>Z</b> (número atómico) = nº de <b>protones</b>: identifica el elemento. <b>A</b> (número másico) = protones + neutrones. Un átomo neutro tiene Z electrones; un <b>catión</b> ha <b>perdido</b> electrones (carga +) y un <b>anión</b> los ha <b>ganado</b> (carga −), sin que cambie el núcleo. Los <b>isótopos</b> son átomos del mismo elemento (mismo Z) con distinto A, como ¹²C, ¹³C y ¹⁴C. La <b>masa atómica</b> de un elemento es la <b>media ponderada</b> de las masas de sus isótopos según su abundancia.</Note>
    </Frame>
  );
}

/* ───────────── 2. Modelo de Bohr y espectros ───────────── */

export function BohrEspectroFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { ni: Math.round(num(block.params?.a, 3, 1, 7)), nf: Math.round(num(block.params?.b, 2, 1, 7)) };
  const [s, setS] = useState(init);
  const t = transicion(s.ni, s.nf);
  const Y = (n: number): number => 155 - (n - 1) * 20;
  const colorLuz = t.region === "visible" ? colorVisible(t.lambda) : MANIM.purple;
  const x0 = 150;
  const xa = 300;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada salto entre niveles emite o absorbe un fotón de energía exacta: de ahí los espectros de rayas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Nivel inicial nᵢ" value={s.ni} min={1} max={7} step={1} color={MANIM.orange} onChange={(ni) => setS((o) => ({ ...o, ni }))} />
          <Slider label="Nivel final n_f" value={s.nf} min={1} max={7} step={1} color={MANIM.blue} onChange={(nf) => setS((o) => ({ ...o, nf }))} />
        </>
      }
    >
      <Svg w={520} h={175} testId="bohr-espectro" maxH={195}>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <g key={n}>
            <Seg a={[x0, Y(n)]} b={[x0 + 220, Y(n)]} color={n === s.ni || n === s.nf ? MANIM.ink : MANIM.muted} width={n === s.ni || n === s.nf ? 3 : 1.5} />
            <text x={x0 - 8} y={Y(n) + 4} textAnchor="end" fill={MANIM.muted} fontSize={11}>{`n = ${n}`}</text>
            <text x={x0 + 228} y={Y(n) + 4} fill={MANIM.muted} fontSize={10}>{`${fmtEs(energiaNivel(n), 2)} eV`}</text>
          </g>
        ))}
        {t.tipo !== "ninguna" && (
          <g>
            <Seg a={[xa, Y(s.ni)]} b={[xa, Y(s.nf)]} color={colorLuz} width={4} />
            <polygon points={arrowHead([xa, Y(s.ni)], [xa, Y(s.nf)], 14)} fill={colorLuz} />
            <text x={xa - 10} y={(Y(s.ni) + Y(s.nf)) / 2 + 4} textAnchor="end" fill={colorLuz} fontSize={12}>{t.tipo === "emisión" ? "fotón emitido" : "fotón absorbido"}</text>
          </g>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Transición">{t.tipo === "ninguna" ? "elige dos niveles distintos" : `n = ${s.ni} → n = ${s.nf} (${t.tipo})`}</Stat>
        <Stat color={MANIM.orange} label="Energía del fotón">{`${fin(t.dE, (x) => fmtEs(x, 3))} eV`}</Stat>
        <Stat color={MANIM.blue} label="Longitud de onda λ = h·c/E">{`${fin(t.lambda, f1)} nm (${t.region})`}</Stat>
        <Stat color={MANIM.green} label="Serie espectral">{t.serie}</Stat>
      </Readout>
      <Note>Un átomo excitado emite luz y los <b>espectros</b> de emisión son <b>discontinuos</b> (de rayas) y característicos de cada elemento. <b>Bohr</b> (1913) lo explicó para el hidrógeno: el electrón solo puede estar en <b>niveles de energía</b> cuantizados, <b>E_n = −13,6 eV/n²</b>; al pasar de un nivel superior a uno inferior emite un <b>fotón</b> de energía <b>ΔE = h·f = E_i − E_f</b>, y al absorber uno de esa energía exacta, sube. De ahí la <b>fórmula de Rydberg</b>: 1/λ = R_H·(1/n_f² − 1/n_i²) con R_H = 1,097·10⁷ m⁻¹. Series: <b>Lyman</b> (n_f = 1, ultravioleta), <b>Balmer</b> (n_f = 2, visible) y <b>Paschen</b> (n_f = 3, infrarrojo). La energía de ionización del H es 13,6 eV. Solo explica bien el hidrógeno y los hidrogenoides. El dibujo no está a escala (los niveles reales se juntan al subir n).</Note>
    </Frame>
  );
}

/** Color aproximado de una longitud de onda visible (nm). */
export function colorVisible(nm: number): string {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else if (nm <= 750) { r = 1; }
  else return "#c59bd6";
  const h = (v: number): string => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

/* ───────────── 3a. De Broglie ───────────── */

export function DeBroglieFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 0, 0, PARTICULAS_DB.length - 1)), e: num(block.params?.a, 6, -1, 8) };
  const [s, setS] = useState(init);
  const p = PARTICULAS_DB[s.i]!;
  const v = 10 ** s.e;
  const lambda = deBroglie(p.m, v);
  const apreciable = lambda >= 1e-12;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Toda partícula tiene asociada una onda de longitud λ = h/(m·v); solo es apreciable para masas diminutas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Partícula" items={PARTICULAS_DB.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.i)} onChange={(k) => setS((o) => ({ ...o, i: Number(k) }))} />
          <Slider label="log₁₀ de la velocidad (m/s)" value={s.e} min={-1} max={8} step={0.1} color={MANIM.orange} format={f1} onChange={(e) => setS((o) => ({ ...o, e }))} />
        </>
      }
    >
      <Svg w={520} h={90} testId="de-broglie" maxH={110}>
        <path d={`M 40 45 ${Array.from({ length: 12 }, (_, k) => `q ${18} ${k % 2 === 0 ? -22 : 22} ${36} 0`).join(" ")}`} fill="none" stroke={apreciable ? MANIM.green : MANIM.muted} strokeWidth={3} opacity={apreciable ? 1 : 0.4} />
        <text x={260} y={82} textAnchor="middle" fill={apreciable ? MANIM.green : MANIM.muted} fontSize={12}>{apreciable ? "comportamiento ondulatorio apreciable" : "λ despreciable: se comporta como partícula"}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Masa">{`${cient(p.m)} kg`}</Stat>
        <Stat color={MANIM.orange} label="Velocidad">{`${cient(v)} m/s`}</Stat>
        <Stat color={apreciable ? MANIM.green : MANIM.red} label="λ = h/(m·v)">{`${cient(lambda)} m`}</Stat>
        <Stat color={MANIM.purple} label="Comparación">{lambda >= 1e-10 ? "mayor que un átomo (≈ 10⁻¹⁰ m)" : lambda >= 1e-12 ? "comparable al tamaño atómico" : "mucho menor que cualquier estructura atómica"}</Stat>
      </Readout>
      <Note><b>De Broglie</b> (1924) propuso que toda partícula con masa m y velocidad v tiene asociada una <b>onda de materia</b> de longitud <b>λ = h/(m·v)</b>, con <b>h = 6,626·10⁻³⁴ J·s</b> (constante de Planck). Se confirmó con la <b>difracción de electrones</b>. Para un electrón a 10⁶ m/s, λ ≈ 7·10⁻¹⁰ m, comparable al tamaño del átomo: su carácter ondulatorio es esencial. Para una pelota o una persona λ es <b>inconcebiblemente pequeña</b> y no se aprecia. El <b>principio de incertidumbre de Heisenberg</b> (Δx·Δp ≥ h/4π) añade que no se puede conocer a la vez con exactitud la posición y el momento de una partícula: por eso se habla de <b>orbitales</b> (regiones de probabilidad) y no de órbitas.</Note>
    </Frame>
  );
}

/* ───────────── 3b. Números cuánticos ───────────── */

export function NumerosCuanticosFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 3, 1, 7)), l: Math.round(num(block.params?.b, 2, 0, 6)), ml: Math.round(num(block.params?.c, 0, -6, 6)), ms: 0.5 };
  const [s, setS] = useState(init);
  const v = cuanticosValidos(s.n, s.l, s.ml, s.ms);
  const orbitales = 2 * s.l + 1;
  return (
    <Frame
      stacked
      hint={block.hint ?? "n define el nivel, l la forma, m_l la orientación y m_s el espín; combinaciones no permitidas no corresponden a ningún orbital."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="n (nivel principal)" value={s.n} min={1} max={7} step={1} color={MANIM.blue} onChange={(n) => setS((o) => ({ ...o, n }))} />
          <Slider label="l (subnivel)" value={s.l} min={0} max={6} step={1} color={MANIM.orange} onChange={(l) => setS((o) => ({ ...o, l }))} />
          <Slider label="m_l (orientación)" value={s.ml} min={-6} max={6} step={1} color={MANIM.green} onChange={(ml) => setS((o) => ({ ...o, ml }))} />
          <Choice label="m_s (espín)" items={[{ value: "0.5", label: "+½" }, { value: "-0.5", label: "−½" }]} value={String(s.ms)} onChange={(x) => setS((o) => ({ ...o, ms: Number(x) }))} />
        </>
      }
    >
      <Svg w={520} h={90} testId="numeros-cuanticos" maxH={110}>
        <text x={260} y={52} textAnchor="middle" fill={v.ok ? MANIM.yellow : MANIM.red} fontSize={26} fontWeight={700}>{`(${s.n}, ${s.l}, ${s.ml}, ${s.ms > 0 ? "+½" : "−½"})`}</text>
        <text x={260} y={80} textAnchor="middle" fill={v.ok ? MANIM.green : MANIM.red} fontSize={14}>{v.ok ? `electrón en un orbital ${nombreSubnivel(s.n, s.l)}` : "combinación NO permitida"}</text>
      </Svg>
      <Readout>
        <Stat color={v.ok ? MANIM.green : MANIM.red} label="Validez">{v.motivo}</Stat>
        <Stat color={MANIM.blue} label="Subnivel">{s.l <= s.n - 1 ? nombreSubnivel(s.n, s.l) : "—"}</Stat>
        <Stat color={MANIM.orange} label="Orbitales del subnivel · electrones máx.">{`${orbitales} orbitales · ${capacidad(s.l)} e⁻`}</Stat>
        <Stat color={MANIM.purple} label="Capa n: orbitales · electrones máx.">{`${s.n * s.n} orbitales · ${2 * s.n * s.n} e⁻`}</Stat>
      </Readout>
      <Note>En el modelo <b>mecanocuántico</b> cada electrón se describe con 4 <b>números cuánticos</b>: <b>n</b> (1, 2, 3…): tamaño y energía del nivel; <b>l</b> (0 … n−1): <b>forma</b> del orbital (0 = s esférico, 1 = p lobular, 2 = d, 3 = f); <b>m_l</b> (−l … +l): <b>orientación</b> en el espacio (hay 2l+1 orbitales por subnivel); <b>m_s</b> (±½): <b>espín</b>. Un <b>orbital</b> (n, l, m_l) es la región donde es más probable encontrar al electrón y cabe un máximo de <b>2 electrones</b> con espines opuestos (<b>principio de exclusión de Pauli</b>: no hay dos electrones con los cuatro números iguales). Cada capa n tiene n² orbitales y admite 2n² electrones.</Note>
    </Frame>
  );
}

/* ───────────── 4. Configuración electrónica ───────────── */

export function ConfiguracionFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { Z: Math.round(num(block.params?.a, 26, 1, 54)), q: Math.round(num(block.params?.b, 0, -3, 3)) };
  const [s, setS] = useState(init);
  const cfg = configuracionBach(s.Z, s.q);
  const valido = cfg.length > 0;
  const des = desapareadosBach(cfg);
  const ult = ultimoElectron(cfg);
  const capa = valido ? Math.max(...cfg.map((x) => x.n)) : 0;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Aufbau (menor energía primero), Pauli (máximo 2 por orbital) y Hund (se desaparean al máximo en orbitales degenerados)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Número atómico Z" value={s.Z} min={1} max={54} step={1} color={MANIM.blue} onChange={(Z) => setS((o) => ({ ...o, Z }))} />
          <Slider label="Carga del ion" value={s.q} min={-3} max={3} step={1} color={MANIM.purple} format={(v) => (v > 0 ? `+${v}` : String(v))} onChange={(q) => setS((o) => ({ ...o, q }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="configuracion-bach" maxH={170}>
        {valido && cfg.map((x, k) => {
          const orbs = 2 * x.l + 1;
          const y = 14 + Math.floor(k / 4) * 44;
          const x0 = 40 + (k % 4) * 118;
          return (
            <g key={x.sub}>
              <text x={x0} y={y + 24} fill={MANIM.muted} fontSize={11}>{x.sub}</text>
              {Array.from({ length: orbs }, (_, o) => {
                const arriba = x.e > o;
                const abajo = x.e > orbs + o;
                return (
                  <g key={o}>
                    <rect x={x0 + 22 + o * 17} y={y + 8} width={15} height={22} fill="none" stroke={MANIM.ink} strokeWidth={1.5} />
                    {arriba && <text x={x0 + 24 + o * 17} y={y + 24} fill={MANIM.blue} fontSize={12}>↑</text>}
                    {abajo && <text x={x0 + 30 + o * 17} y={y + 24} fill={MANIM.orange} fontSize={12}>↓</text>}
                  </g>
                );
              })}
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label={`Configuración de ${nombreElemento(s.Z)}${s.q === 0 ? "" : s.q > 0 ? ` (${s.q}+)` : ` (${Math.abs(s.q)}−)`}`}>{valido ? textoConfig(cfg) : "no válida"}</Stat>
        <Stat color={MANIM.blue} label="Notación abreviada">{valido ? configAbreviada(s.Z, s.q) : "—"}</Stat>
        <Stat color={MANIM.orange} label="Electrones desapareados · magnetismo">{valido ? `${des} · ${des > 0 ? "paramagnético" : "diamagnético"}` : "—"}</Stat>
        <Stat color={MANIM.green} label="Números cuánticos del último electrón">{ult ? `(${ult.n}, ${ult.l}, ${ult.ml}, ${ult.ms > 0 ? "+½" : "−½"}) · ${ult.sub}` : "—"}</Stat>
        <Stat color={MANIM.purple} label="Electrones de la capa más externa (n máx.)">{valido ? `${cfg.filter((x) => x.n === capa).reduce((a, x) => a + x.e, 0)}` : "—"}</Stat>
      </Readout>
      <Note>La <b>configuración electrónica</b> reparte los electrones en orbitales siguiendo tres reglas: <b>principio de construcción (Aufbau)</b>: se llenan primero los de menor energía (1s, 2s, 2p, 3s, 3p, <b>4s</b>, 3d, 4p, 5s, 4d, 5p… regla de Madelung, n + l creciente); <b>exclusión de Pauli</b>: máx. 2 electrones por orbital, de espín opuesto; y <b>regla de Hund</b>: en orbitales de igual energía se coloca un electrón en cada uno con espines paralelos antes de aparearlos. Hay <b>excepciones</b> por la estabilidad de subniveles llenos o semillenos (Cr, Cu, Mo, Ag…). Los <b>cationes</b> pierden primero los electrones de la capa más externa (el 4s antes que el 3d). Con electrones desapareados el átomo es <b>paramagnético</b>; sin ellos, <b>diamagnético</b>.</Note>
    </Frame>
  );
}
