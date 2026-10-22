"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmt } from "@/components/lesson/anim/format";
import { sup } from "@/components/lesson/anim/scenes/potencias-factores";
import { expandFraction, expansionTex, gcd, generatrix, shiftedPeriodic } from "@/components/lesson/anim/periodic";
import { fromScaled, parseDec, trimDec } from "@/components/lesson/anim/decimal";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);

/* ───────────── Fracción → decimal: exacto, periódico puro o mixto ───────────── */

const KIND_LABEL = { exacto: "decimal exacto", puro: "periódico puro", mixto: "periódico mixto" } as const;

export function DecimalExplorador({ block }: { block: ToolBlock }) {
  const initN = int(block.params?.n, 41, 1, 99);
  const initD = int(block.params?.d, 33, 2, 40);
  const [n, setN] = useState(initN);
  const [d, setD] = useState(initD);
  const e = expandFraction(n, d);
  const g = gcd(n, d);
  const color = e.kind === "exacto" ? MANIM.green : e.kind === "puro" ? MANIM.orange : MANIM.purple;
  const factors = (() => {
    let x = d / g;
    const out: number[] = [];
    for (const p of [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]) {
      while (x % p === 0) {
        out.push(p);
        x /= p;
      }
    }
    if (x > 1) out.push(x);
    return out;
  })();

  return (
    <Frame
      hint={block.hint ?? "Prueba denominadores como 8, 20 o 25 (solo con 2 y 5) y compáralos con 3, 7 u 11."}
      onReset={() => {
        setN(initN);
        setD(initD);
      }}
      controls={
        <>
          <Slider label="Numerador" value={n} min={1} max={99} color={MANIM.blue} onChange={setN} />
          <Slider label="Denominador" value={d} min={2} max={40} color={MANIM.green} onChange={setD} />
        </>
      }
    >
      <div className="text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\dfrac{${n}}{${d}} = ${expansionTex(e)}$`} className="text-3xl" />
        <p className="mt-2 text-lg font-semibold" style={{ color }} data-testid="tool-decimal-tipo">
          {KIND_LABEL[e.kind]}
          {e.per ? ` · periodo de ${e.per.length} ${e.per.length === 1 ? "cifra" : "cifras"}` : ""}
        </p>
      </div>
      <div className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">
        <MathRenderer
          text={`Denominador de la irreducible: $${d / g}$ = $${factors.join(" \\cdot ")}$${
            factors.every((f) => f === 2 || f === 5) ? " → solo factores 2 y 5" : " → hay otros factores"
          }`}
        />
      </div>
      <Svg w={420} h={70} testId="tool-restos">
        {e.rems.slice(0, 12).map((r, i, arr) => {
          const x = 24 + (i * 372) / Math.max(arr.length - 1, 1);
          const loop = e.loopAt >= 0 && i >= e.loopAt;
          return (
            <g key={i}>
              <circle cx={x} cy={30} r={14} fill={MANIM.panel} stroke={loop ? MANIM.orange : r === 0 ? MANIM.green : MANIM.blue} strokeWidth={2.5} />
              <text x={x} y={35} fontSize={13} fontWeight={700} textAnchor="middle" fill={MANIM.ink}>{r}</text>
            </g>
          );
        })}
        <text x={210} y={64} fontSize={12} textAnchor="middle" fill={MANIM.muted}>restos de la división (naranja: los que se repiten)</text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Fracción generatriz ───────────── */

export function GeneratrizExplorador({ block }: { block: ToolBlock }) {
  const initLens = block.initial ?? [];
  const aLen0 = int(initLens[0], 0, 0, 2);
  const pLen0 = int(initLens[1], 2, 1, 3);
  const init = {
    whole: int(block.params?.a, 3, 0, 20),
    aLen: aLen0,
    ante: int(block.params?.b, 0, 0, 10 ** aLen0 - 1),
    pLen: pLen0,
    per: int(block.params?.c, 84, 0, 10 ** pLen0 - 1),
  };
  const [v, setV] = useState(init);
  const set = (patch: Partial<typeof init>) =>
    setV((p) => {
      const next = { ...p, ...patch };
      next.ante = clamp(next.ante, 0, 10 ** next.aLen - 1);
      next.per = clamp(next.per, 0, 10 ** next.pLen - 1);
      return next;
    });
  const pad = (x: number, len: number) => (len === 0 ? "" : String(x).padStart(len, "0"));
  const int_ = String(v.whole);
  const ante = pad(v.ante, v.aLen);
  const per = pad(v.per, v.pLen);
  const g = generatrix(int_, ante, per);
  const k1 = v.aLen;
  const k2 = v.aLen + v.pLen;
  const tex = (s: string) => s.replace(",", "{,}").replace("…", "\\ldots");
  const tailA = Number(`${int_}${ante}`);
  const tailB = Number(`${int_}${ante}${per}`);
  const den = (10 ** v.pLen - 1) * 10 ** v.aLen;
  const N = `${int_}{,}${ante}\\overline{${per}}`;
  const lenBtn = (label: string, on: boolean, onClick: () => void, key: string) => (
    <button key={key} type="button" className={TOOL_BTN} aria-pressed={on} onClick={onClick}>
      {label}
    </button>
  );

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el periodo y las cifras que no se repiten. Observa cómo se cancela la cola decimal al restar."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Parte entera" value={v.whole} min={0} max={20} color={MANIM.blue} onChange={(whole) => set({ whole })} />
          <Slider label="Periodo" value={v.per} min={0} max={10 ** v.pLen - 1} color={MANIM.orange} onChange={(per) => set({ per })} format={(x) => pad(x, v.pLen)} />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Cifras del periodo</span>
            {[1, 2, 3].map((l) => lenBtn(String(l), v.pLen === l, () => set({ pLen: l }), `p${l}`))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Cifras sin repetir</span>
            {[0, 1, 2].map((l) => lenBtn(String(l), v.aLen === l, () => set({ aLen: l }), `a${l}`))}
          </div>
          {v.aLen > 0 ? (
            <Slider label="Cifras sin repetir" value={v.ante} min={0} max={10 ** v.aLen - 1} color={MANIM.purple} onChange={(ante) => set({ ante })} format={(x) => pad(x, v.aLen)} />
          ) : null}
        </>
      }
    >
      <Readout>
        <MathRenderer text={`$N = ${N}\\ldots$`.replace("\\overline", "\\overline")} className="text-3xl" />
      </Readout>
      <div className="flex flex-col gap-1 text-lg text-[color:var(--stage-ink,#fff)]" data-testid="tool-generatriz">
        {v.aLen > 0 ? <MathRenderer text={`$${10 ** k1}N = ${tex(shiftedPeriodic(int_, ante, per, k1))}$`} /> : null}
        <MathRenderer text={`$${10 ** k2}N = ${tex(shiftedPeriodic(int_, ante, per, k2))}$`} />
        <MathRenderer text={`$${10 ** k2}N - ${v.aLen > 0 ? `${10 ** k1}N` : "N"} = ${tailB} - ${tailA} = ${tailB - tailA}$`} />
        <MathRenderer text={`$${den}\\,N = ${tailB - tailA}$`} />
        <MathRenderer text={`$N = \\dfrac{${g.n}}{${g.d}}$`} className="text-3xl" />
      </div>
    </Frame>
  );
}

/* ───────────── Aproximaciones: redondeo, cifras significativas y errores ───────────── */

const VALUES = ["183594", "234590", "11892583", "3017849", "15,123", "6,175", "0,358", "12,106", "81394"];
const SCALE = 3;

/** «6,175» → 6175 (entero escalado ×10³, sin coma flotante). */
const milli = (text: string): number => {
  const { int: i, frac } = parseDec(text);
  return Number(`${i}${frac.padEnd(SCALE, "0").slice(0, SCALE)}`);
};

const show = (x: number): string => {
  const [i = "0", f] = trimDec(fromScaled(x, SCALE)).split(",");
  const grouped = i.length >= 5 ? fmt(Number(i)) : i;
  return f ? `${grouped},${f}` : grouped;
};

/** Redondea `value` (entero escalado ×10³) al orden 10^k y devuelve aproximación y errores. */
export function roundingReport(valueText: string, k: number) {
  const V = milli(valueText);
  const S = 10 ** (k + SCALE);
  const approx = Math.round(V / S) * S;
  const err = Math.abs(V - approx);
  const bound = S / 2;
  const mag = String(Math.trunc(V / 10 ** SCALE)).length;
  const intMag = V >= 10 ** SCALE ? mag : 0;
  return { V, S, approx, err, bound, intMag };
}

export function AproximacionExplorador({ block }: { block: ToolBlock }) {
  const idx0 = int(block.params?.a, 0, 0, VALUES.length - 1);
  const [idx, setIdx] = useState(idx0);
  const value = VALUES[idx]!;
  const top = (() => {
    const V = milli(value);
    return V >= 10 ** SCALE ? String(Math.trunc(V / 10 ** SCALE)).length - 1 : -1;
  })();
  const k0 = clamp(int(block.params?.b, 3, -3, 7), -3, Math.max(top, -3));
  const [k, setK] = useState(k0);
  const kk = clamp(k, -3, Math.max(top, -3));
  const r = roundingReport(value, kk);
  const sig = Math.max(top - kk + 1, 0);
  const relBound = r.approx === 0 ? null : r.bound / r.approx;
  const relText = relBound === null ? "—" : `${(relBound * 100).toFixed(relBound < 0.01 ? 3 : 2).replace(".", ",")} %`;
  const orderName = kk >= 0 ? show(10 ** (kk + SCALE)) : String(10 ** kk).replace(".", ",").replace(/^0,/, "0,");

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige una cantidad y cambia el orden del redondeo: cuantas menos cifras, mayor es la cota del error."}
      onReset={() => {
        setIdx(idx0);
        setK(k0);
      }}
      controls={
        <>
          <Slider label="Cantidad" value={idx} min={0} max={VALUES.length - 1} color={MANIM.blue} onChange={(i) => setIdx(i)} format={(i) => VALUES[i]!.replace(/^(\d{4,})$/, (m) => fmt(Number(m)))} />
          <Slider label="Redondear al orden 10^k" value={kk} min={-3} max={Math.max(top, -3)} color={MANIM.orange} onChange={setK} format={(x) => `10^${x}`} />
        </>
      }
    >
      <Readout>
        <MathRenderer text={`$${show(r.V).replace(/\u00a0/g, "\\ ").replace(",", "{,}")} \\approx ${show(r.approx).replace(/\u00a0/g, "\\ ").replace(",", "{,}")}$`} className="text-3xl" />
      </Readout>
      <div className="grid grid-cols-1 gap-1 text-lg text-[color:var(--stage-ink,#fff)] sm:grid-cols-2" data-testid="tool-aprox">
        <MathRenderer text={`Cifras significativas: $${sig}$`} />
        <MathRenderer text={`Error absoluto: $${show(r.err).replace(/\u00a0/g, "\\ ").replace(",", "{,}")}$`} />
        <MathRenderer text={`Cota: $< ${show(r.bound).replace(/\u00a0/g, "\\ ").replace(",", "{,}")}$ ($5$ unidades del orden siguiente)`} />
        <MathRenderer text={`Cota del error relativo: $${relText.replace(",", "{,}").replace("%", "\\%")}$`} />
      </div>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Orden de redondeo: unidades de {orderName}.</p>
    </Frame>
  );
}

/* ───────────── Notación científica ───────────── */

const PREFIXES: { e: number; name: string }[] = [
  { e: 9, name: "giga" },
  { e: 6, name: "mega" },
  { e: 3, name: "kilo" },
  { e: 0, name: "(unidad)" },
  { e: -3, name: "mili" },
  { e: -6, name: "micro" },
  { e: -9, name: "nano" },
];

/** Todas las cifras de `m · 10^e` con `m` entero de 3 cifras que representa `m/100`. */
export function expandSci(m: number, e: number): string {
  const digits = String(m); // «634» = 6,34
  const point = 1 + e; // posición de la coma respecto del inicio de `digits`
  if (point <= 0) return `0,${"0".repeat(-point)}${digits}`.replace(/0+$/, "").replace(/,$/, "");
  if (point >= digits.length) return `${digits}${"0".repeat(point - digits.length)}`;
  return `${digits.slice(0, point)},${digits.slice(point)}`.replace(/0+$/, "").replace(/,$/, "");
}

const groupInt = (s: string) => {
  const [i = "", f] = s.split(",");
  const g = i.length >= 5 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : i;
  return f ? `${g},${f}` : g;
};

export function NotacionExplorador({ block }: { block: ToolBlock }) {
  const m0 = int(block.params?.a, 634, 100, 999);
  const e0 = int(block.params?.b, 10, -12, 15);
  const [m, setM] = useState(m0);
  const [e, setE] = useState(e0);
  const mant = m / 100;
  const mantText = String(mant).replace(".", ",");
  const full = groupInt(expandSci(m, e));
  const pref = PREFIXES.find((p) => p.e <= e) ?? PREFIXES[PREFIXES.length - 1]!;
  const inPref = m / 100 * 10 ** (e - pref.e);
  const W = 420;
  const sx = (x: number) => 16 + ((x + 12) / 27) * (W - 32);
  const pos = e + Math.log10(mant);

  return (
    <Frame
      hint={block.hint ?? "Mueve el exponente: cada unidad desplaza la coma un lugar. Un exponente negativo es un número pequeño."}
      onReset={() => {
        setM(m0);
        setE(e0);
      }}
      controls={
        <>
          <Slider label="Mantisa (entre 1 y 10)" value={m} min={100} max={999} color={MANIM.blue} onChange={setM} format={(x) => String(x / 100).replace(".", ",")} />
          <Slider label="Exponente" value={e} min={-12} max={15} color={MANIM.orange} onChange={setE} format={(x) => String(x).replace("-", "−")} />
        </>
      }
    >
      <div className="text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${mantText.replace(",", "{,}")} \\cdot 10^{${e}}$`} className="text-3xl" />
        <p className="mt-2 break-all text-xl tabular-nums" data-testid="tool-notacion-cifras">
          = {full}
        </p>
        <p className="mt-1 text-sm text-[color:var(--stage-muted,#b8c2d0)]">
          {e >= 0 ? `Número grande: la coma se corre ${e} ${e === 1 ? "lugar" : "lugares"} a la derecha.` : `Número pequeño: la coma se corre ${-e} ${e === -1 ? "lugar" : "lugares"} a la izquierda.`}
          {" "}
          {pref.e !== 0 || e === 0 ? `≈ ${String(Math.round(inPref * 100) / 100).replace(".", ",")} ${pref.name}` : ""}
        </p>
      </div>
      <Svg w={W} h={64} testId="tool-escala-sci">
        <line x1={10} y1={30} x2={W - 10} y2={30} stroke={MANIM.grid} strokeWidth={3} strokeLinecap="round" />
        {Array.from({ length: 10 }, (_, i) => -12 + i * 3).map((x) => (
          <g key={x}>
            <line x1={sx(x)} y1={24} x2={sx(x)} y2={36} stroke={MANIM.muted} strokeWidth={2} />
            <text x={sx(x)} y={54} fontSize={12} textAnchor="middle" fill={MANIM.muted}>{`10${sup(x)}`}</text>
          </g>
        ))}
        <circle cx={sx(pos)} cy={30} r={8} fill={MANIM.orange} className="anim-t" />
      </Svg>
    </Frame>
  );
}
