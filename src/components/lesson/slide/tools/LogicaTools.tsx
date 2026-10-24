"use client";

import { useState, type ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, TOOL_BTN, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { BCD, VARS, canonicalTerm, cellsOf, divisionSteps, fractionSteps, karnaughLayout, maxtermIndexes, minterms, simplify, type Implicant } from "@/lib/lesson/logic-minimize";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

const f0 = (v: number) => fmtEs(v, 0);

const bin = (n: number, bits: number) => n.toString(2).padStart(bits, "0");

/** Botón de bit: muestra el valor y alterna al pulsarlo. */
function BitBtn({ value, onToggle, label, color = MANIM.yellow }: { value: boolean; onToggle: () => void; label: string; color?: string }) {
  return (
    <button
      type="button"
      aria-pressed={value}
      aria-label={label}
      onClick={onToggle}
      className={`${TOOL_BTN} min-w-[2.6rem] font-mono text-base`}
      style={value ? { borderColor: color, background: `${color}33`, color } : undefined}
    >
      {value ? "1" : "0"}
    </button>
  );
}

function Lamp({ on, label }: { on: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-2" role="img" aria-label={`${label}: ${on ? "encendida" : "apagada"}`}>
      <span className="h-5 w-5 rounded-full border-2" style={{ borderColor: on ? MANIM.yellow : MANIM.muted, background: on ? MANIM.yellow : "transparent", boxShadow: on ? `0 0 12px ${MANIM.yellow}` : "none" }} />
      <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">{label}</span>
    </span>
  );
}

function Table({ head, rows, hi, mono = true }: { head: ReactNode[]; rows: ReactNode[][]; hi?: number; mono?: boolean }) {
  return (
    <table className={`w-full max-w-md border-collapse text-center ${mono ? "font-mono" : ""}`}>
      <thead>
        <tr>
          {head.map((h, i) => (
            <th key={i} className="border-b border-[color:var(--stage-border,#3d4f66)] px-2 py-1 text-sm font-semibold text-[color:var(--stage-muted,#b8c2d0)]">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, ri) => (
          <tr key={ri} style={ri === hi ? { background: "rgba(255,216,102,0.18)" } : undefined}>
            {r.map((c, ci) => (
              <td key={ci} className="px-2 py-1 text-base">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ───────────── 1. Byte y peso de cada bit ───────────── */

export function BinarioByteExplorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 45, 0, 255));
  const [v, setV] = useState(init);
  const bits = bin(v, 8).split("").map((c) => c === "1");
  const toggle = (i: number) => setV((x) => x ^ (1 << (7 - i)));
  const terms = bits.map((b, i) => (b ? 2 ** (7 - i) : null)).filter((x): x is number => x !== null);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Activa y desactiva bits: cada uno aporta su peso (una potencia de 2) solo cuando vale 1."}
      onReset={() => setV(init)}
      controls={<span className="text-sm text-[color:var(--stage-muted,#b8c2d0)] sm:col-span-2">Pulsa un bit para cambiarlo.</span>}
    >
      <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(8, minmax(0, 1fr))" }} data-testid="tool-byte">
        {bits.map((_, i) => (
          <span key={`p${i}`} className="text-center text-xs text-[color:var(--stage-muted,#b8c2d0)]">
            2<sup>{7 - i}</sup>
          </span>
        ))}
        {bits.map((_, i) => (
          <span key={`w${i}`} className="text-center text-sm font-semibold" style={{ color: bits[i] ? MANIM.green : MANIM.muted }}>
            {2 ** (7 - i)}
          </span>
        ))}
        {bits.map((b, i) => (
          <div key={`b${i}`} className="flex justify-center">
            <BitBtn value={b} onToggle={() => toggle(i)} label={`Bit ${7 - i}`} />
          </div>
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Byte">
          {bin(v, 8)}
        </Stat>
        <Stat color={MANIM.green} label="Decimal">
          {f0(v)}
        </Stat>
        <Stat color={MANIM.blue} label="Hexadecimal">
          {v.toString(16).toUpperCase().padStart(2, "0")}
        </Stat>
      </Readout>
      <MathRenderer text={terms.length ? `$${terms.join(" + ")} = ${v}$` : "$0 = 0$"} className="text-lg" />
      <Note>Un byte son 8 bits: 256 combinaciones, de 0 a 255. El bit de la izquierda es el más significativo (MSB) y el de la derecha el menos significativo (LSB).</Note>
    </Frame>
  );
}

/* ───────────── 2. Decimal → binario ───────────── */

export function ConversionDecimalBinarioExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 45, 0, 255)), f: Math.round(num(block.params?.b, 0, 0, 99)), d: 4 };
  const [s, setS] = useState(init);
  const steps = divisionSteps(s.n);
  const frac = fractionSteps(s.f / 100, s.d);
  const intBin = steps
    .map((x) => x.r)
    .reverse()
    .join("");
  const fracBin = frac.map((x) => x.bit).join("");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Divide entre 2 hasta llegar a 0 y lee los restos de abajo arriba; la parte decimal se multiplica por 2."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Parte entera" value={s.n} min={0} max={255} step={1} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Parte decimal" value={s.f} min={0} max={99} step={1} unit=" centésimas" color={MANIM.orange} onChange={(f) => setS((x) => ({ ...x, f }))} />
          <Slider label="Cifras binarias decimales" value={s.d} min={1} max={6} step={1} color={MANIM.green} onChange={(d) => setS((x) => ({ ...x, d }))} />
        </>
      }
    >
      <div className="flex flex-wrap gap-x-10 gap-y-4" data-testid="tool-conv">
        <div>
          <p className="mb-1 text-sm text-[color:var(--stage-muted,#b8c2d0)]">Divisiones entre 2</p>
          <Table head={["Dividendo", "Cociente", "Resto"]} rows={steps.map((x, i) => [x.dividend, x.q, <span key={i} style={{ color: MANIM.yellow }}>{x.r}</span>])} />
        </div>
        {frac.length ? (
          <div>
            <p className="mb-1 text-sm text-[color:var(--stage-muted,#b8c2d0)]">Multiplicaciones por 2</p>
            <Table head={["Fracción", "× 2", "Cifra"]} rows={frac.map((x, i) => [fmtEs(x.value, 4), fmtEs(x.product, 4), <span key={i} style={{ color: MANIM.yellow }}>{x.bit}</span>])} />
          </div>
        ) : null}
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Resultado en binario">
          {intBin}
          {frac.length ? `,${fracBin}` : ""}
        </Stat>
        <Stat color={MANIM.green} label="Decimal de partida">
          {fmtEs(s.n + s.f / 100, 2)}
        </Stat>
      </Readout>
      <Note>La parte entera se lee desde el último resto hasta el primero. La parte decimal suele ser solo una aproximación: se corta cuando hay precisión suficiente.</Note>
    </Frame>
  );
}

/* ───────────── 3. Hexadecimal y códigos BCD ───────────── */

export function HexBcdExplorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 342, 0, 9999));
  const [n, setN] = useState(init);
  const digits = String(n).split("").map(Number);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el número y compara cómo lo escriben el binario natural, el hexadecimal y los tres códigos BCD."}
      onReset={() => setN(init)}
      controls={<Slider label="Número decimal" value={n} min={0} max={9999} step={1} format={f0} color={MANIM.blue} onChange={setN} />}
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Binario natural">
          {n.toString(2)}
        </Stat>
        <Stat color={MANIM.green} label="Hexadecimal">
          {n.toString(16).toUpperCase()}
        </Stat>
        <Stat color={MANIM.orange} label="Octal">
          {n.toString(8)}
        </Stat>
      </Readout>
      <Table
        head={["Dígito", "BCD natural", "BCD Aiken", "Exceso 3"]}
        rows={digits.map((d) => [d, BCD.natural(d), BCD.aiken(d), BCD.exceso3(d)])}
      />
      <Note>En BCD cada cifra decimal se codifica por separado con 4 bits. Con 4 bits caben 16 combinaciones y solo se usan 10; en hexadecimal sí se aprovechan todas (A a F).</Note>
    </Frame>
  );
}

/* ───────────── 4. Lógica positiva y negativa ───────────── */

export function LogicaNivelesExplorador({ block }: { block: ToolBlock }) {
  const init = { pos: num(block.params?.a, 1, 0, 1) >= 0.5 };
  const [s, setS] = useState(init);
  const levels = [1, 1, 0, 1, 0, 0, 1, 0]; // 1 = nivel alto
  const logic = levels.map((l) => (s.pos ? l : 1 - l));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia de lógica positiva a negativa: la misma señal de tensión se lee con unos y ceros invertidos."}
      onReset={() => setS(init)}
      controls={<Choice items={[{ value: "pos", label: "Lógica positiva" }, { value: "neg", label: "Lógica negativa" }]} value={s.pos ? "pos" : "neg"} onChange={(v) => setS({ pos: v === "pos" })} label="Convenio" />}
    >
      <Svg w={520} h={150} maxH={170} testId="tool-niveles">
        <line x1={40} y1={40} x2={490} y2={40} stroke={MANIM.grid} strokeDasharray="4 4" />
        <line x1={40} y1={110} x2={490} y2={110} stroke={MANIM.grid} strokeDasharray="4 4" />
        <text x={34} y={44} textAnchor="end" fill={MANIM.muted} fontSize={13}>
          +5 V
        </text>
        <text x={34} y={114} textAnchor="end" fill={MANIM.muted} fontSize={13}>
          0 V
        </text>
        <path d={levels.map((l, i) => `${i ? "L" : "M"} ${40 + i * 56} ${l ? 40 : 110} L ${96 + i * 56} ${l ? 40 : 110}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        {logic.map((b, i) => (
          <text key={i} x={68 + i * 56} y={140} textAnchor="middle" fill={b ? MANIM.green : MANIM.muted} fontSize={22} fontWeight={700}>
            {b}
          </text>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Nivel alto (+5 V) se lee">
          {s.pos ? "1" : "0"}
        </Stat>
        <Stat color={MANIM.orange} label="Nivel bajo (0 V) se lee">
          {s.pos ? "0" : "1"}
        </Stat>
        <Stat color={MANIM.yellow} label="Mensaje">
          {logic.join("")}
        </Stat>
      </Readout>
      <Note>En lógica positiva el nivel más alto de tensión es el 1; en negativa es el 0. Los fabricantes hablan de niveles altos (H) y bajos (L) para no tener que elegir. En este curso se usa la lógica positiva.</Note>
    </Frame>
  );
}

/* ───────────── 5 y 7. Puertas lógicas ───────────── */

type GateDef = { id: string; label: string; inputs: 1 | 2; fn: (a: number, b: number) => number; expr: string };

const GATES_BASIC: GateDef[] = [
  { id: "not", label: "NOT", inputs: 1, fn: (a) => 1 - a, expr: "S = \\bar{a}" },
  { id: "or", label: "OR", inputs: 2, fn: (a, b) => a | b, expr: "S = a + b" },
  { id: "and", label: "AND", inputs: 2, fn: (a, b) => a & b, expr: "S = a\\cdot b" },
];
const GATES_UNIV: GateDef[] = [
  { id: "nor", label: "NOR", inputs: 2, fn: (a, b) => 1 - (a | b), expr: "S = \\overline{a + b} = \\bar{a}\\cdot \\bar{b}" },
  { id: "nand", label: "NAND", inputs: 2, fn: (a, b) => 1 - (a & b), expr: "S = \\overline{a\\cdot b} = \\bar{a} + \\bar{b}" },
  { id: "xor", label: "XOR", inputs: 2, fn: (a, b) => a ^ b, expr: "S = a\\oplus b = \\bar{b}\\cdot a + b\\cdot \\bar{a}" },
];

function GateShape({ id, out }: { id: string; out: boolean }) {
  const stroke = out ? MANIM.green : MANIM.ink;
  const bubble = id === "not" || id === "nor" || id === "nand";
  return (
    <g>
      {id === "or" || id === "nor" || id === "xor" ? (
        <path d="M 60 20 Q 100 20 140 60 Q 100 100 60 100 Q 84 60 60 20 Z" fill={MANIM.panel} stroke={stroke} strokeWidth={4} />
      ) : null}
      {id === "xor" ? <path d="M 48 20 Q 72 60 48 100" fill="none" stroke={stroke} strokeWidth={4} /> : null}
      {id === "and" || id === "nand" ? <path d="M 60 20 L 100 20 Q 140 20 140 60 Q 140 100 100 100 L 60 100 Z" fill={MANIM.panel} stroke={stroke} strokeWidth={4} /> : null}
      {id === "not" ? <polygon points="70,25 70,95 135,60" fill={MANIM.panel} stroke={stroke} strokeWidth={4} strokeLinejoin="round" /> : null}
      {bubble ? <circle cx={id === "not" ? 143 : 148} cy={60} r={8} fill={MANIM.surface} stroke={stroke} strokeWidth={4} /> : null}
    </g>
  );
}

export function PuertaLogicaExplorador({ block }: { block: ToolBlock }) {
  const set = num(block.params?.a, 0, 0, 1) >= 0.5 ? GATES_UNIV : GATES_BASIC;
  const init = { g: set[0]!.id, a: 0, b: 0 };
  const [s, setS] = useState(init);
  const gate = set.find((x) => x.id === s.g) ?? set[0]!;
  const out = gate.fn(s.a, gate.inputs === 1 ? 0 : s.b);
  const combos = gate.inputs === 1 ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
  const hi = combos.findIndex((c) => c[0] === s.a && (gate.inputs === 1 || c[1] === s.b));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa las entradas y comprueba que la salida coincide con la fila resaltada de la tabla de verdad."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={set.map((x) => ({ value: x.id, label: x.label }))} value={s.g} onChange={(g) => setS((x) => ({ ...x, g, b: g === "not" ? 0 : x.b }))} label="Puerta" />
          <div className="flex items-center gap-3 sm:col-span-2">
            <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Entradas</span>
            <BitBtn value={s.a === 1} onToggle={() => setS((x) => ({ ...x, a: 1 - x.a }))} label="Entrada a" color={MANIM.blue} />
            <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">a</span>
            {gate.inputs === 2 ? (
              <>
                <BitBtn value={s.b === 1} onToggle={() => setS((x) => ({ ...x, b: 1 - x.b }))} label="Entrada b" color={MANIM.orange} />
                <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">b</span>
              </>
            ) : null}
          </div>
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-6">
        <Svg w={240} h={120} maxH={130} testId="tool-gate">
          <GateShape id={gate.id} out={out === 1} />
          <line x1={10} y1={gate.inputs === 1 ? 60 : 42} x2={gate.id === "xor" || gate.id === "or" || gate.id === "nor" ? 66 : 60} y2={gate.inputs === 1 ? 60 : 42} stroke={s.a ? MANIM.blue : MANIM.muted} strokeWidth={4} />
          <text x={4} y={gate.inputs === 1 ? 48 : 30} fill={MANIM.blue} fontSize={15}>
            a={s.a}
          </text>
          {gate.inputs === 2 ? (
            <g>
              <line x1={10} y1={78} x2={gate.id === "xor" || gate.id === "or" || gate.id === "nor" ? 66 : 60} y2={78} stroke={s.b ? MANIM.orange : MANIM.muted} strokeWidth={4} />
              <text x={4} y={100} fill={MANIM.orange} fontSize={15}>
                b={s.b}
              </text>
            </g>
          ) : null}
          <line x1={gate.id === "or" || gate.id === "and" || gate.id === "xor" ? 140 : 156} y1={60} x2={200} y2={60} stroke={out ? MANIM.green : MANIM.muted} strokeWidth={4} />
          <text x={236} y={66} textAnchor="end" fill={out ? MANIM.green : MANIM.muted} fontSize={20} fontWeight={700}>
            S={out}
          </text>
        </Svg>
        <div className="flex flex-col gap-3">
          <Lamp on={out === 1} label="Lámpara de salida" />
          <MathRenderer text={`$${gate.expr}$`} className="text-lg" />
        </div>
      </div>
      <Table head={gate.inputs === 1 ? ["a", "S"] : ["b", "a", "S"]} rows={combos.map((c) => (gate.inputs === 1 ? [c[0], gate.fn(c[0]!, 0)] : [c[1], c[0], gate.fn(c[0]!, c[1]!)]))} hi={hi} />
    </Frame>
  );
}

/* ───────────── 6. Teoremas de Morgan ───────────── */

export function MorganExplorador({ block }: { block: ToolBlock }) {
  const init = { law: num(block.params?.a, 1, 1, 2) === 2 ? "2" : "1", a: 0, b: 0 };
  const [s, setS] = useState(init);
  const lhs = (a: number, b: number) => (s.law === "1" ? 1 - (a | b) : 1 - (a & b));
  const rhs = (a: number, b: number) => (s.law === "1" ? (1 - a) & (1 - b) : (1 - a) | (1 - b));
  const combos = [[0, 0], [0, 1], [1, 0], [1, 1]];
  const hi = combos.findIndex((c) => c[0] === s.a && c[1] === s.b);
  const all = combos.every((c) => lhs(c[0]!, c[1]!) === rhs(c[0]!, c[1]!));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Recorre las cuatro combinaciones: las dos columnas de resultado coinciden siempre, y eso demuestra el teorema."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={[{ value: "1", label: "1.ª ley: negar una suma" }, { value: "2", label: "2.ª ley: negar un producto" }]} value={s.law} onChange={(law) => setS((x) => ({ ...x, law }))} label="Teorema de Morgan" />
          <div className="flex items-center gap-3 sm:col-span-2">
            <BitBtn value={s.a === 1} onToggle={() => setS((x) => ({ ...x, a: 1 - x.a }))} label="Variable a" color={MANIM.blue} />
            <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">a</span>
            <BitBtn value={s.b === 1} onToggle={() => setS((x) => ({ ...x, b: 1 - x.b }))} label="Variable b" color={MANIM.orange} />
            <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">b</span>
          </div>
        </>
      }
    >
      <MathRenderer text={s.law === "1" ? "$\\overline{a + b} = \\bar{a}\\cdot \\bar{b}$" : "$\\overline{a\\cdot b} = \\bar{a} + \\bar{b}$"} className="text-xl" />
      <Table
        head={["b", "a", s.law === "1" ? <MathRenderer key="l" text="$\overline{a+b}$" /> : <MathRenderer key="l" text="$\overline{a\cdot b}$" />, s.law === "1" ? <MathRenderer key="r" text="$\bar a\cdot\bar b$" /> : <MathRenderer key="r" text="$\bar a+\bar b$" />]}
        rows={combos.map((c) => [c[1], c[0], lhs(c[0]!, c[1]!), rhs(c[0]!, c[1]!)])}
        hi={hi}
      />
      <p className="font-semibold" style={{ color: all ? MANIM.green : MANIM.red }} data-testid="tool-morgan">
        {all ? "Las dos columnas coinciden en las cuatro filas: el teorema se cumple." : "No coinciden."}
      </p>
      <Note>Regla práctica: para negar una expresión se cambia la operación (suma por producto o al revés) y se niega cada variable.</Note>
    </Frame>
  );
}

/* ───────────── 8. Formas canónicas ───────────── */

const PRESETS_CANON: { label: string; out: number[] }[] = [
  { label: "Tabla 12.15 del libro", out: [0, 1, 0, 1, 1, 0, 1, 1] },
  { label: "Ejemplo 13 (un solo pulsador, o dos que no sean a y b)", out: [0, 1, 1, 0, 1, 1, 1, 0] },
  { label: "Mayoría de tres", out: [0, 0, 0, 1, 0, 1, 1, 1] },
];

export function FormasCanonicasExplorador({ block }: { block: ToolBlock }) {
  const p0 = Math.round(num(block.params?.a, 0, 0, PRESETS_CANON.length - 1));
  const init = PRESETS_CANON[p0]!.out;
  const [out, setOut] = useState<number[]>(init);
  const mins = minterms(out);
  const maxs = maxtermIndexes(out);
  const sop = mins.length ? mins.map((i) => canonicalTerm(i, 3, "min")).join(" + ") : "0";
  const pos = maxs.length ? maxs.map((i) => canonicalTerm(i, 3, "max")).join("") : "1";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la salida de cada fila: los unos dan la suma de productos (minterms) y los ceros, el producto de sumas (maxterms)."}
      onReset={() => setOut(init)}
      controls={
        <Choice
          items={PRESETS_CANON.map((p, i) => ({ value: i, label: p.label }))}
          value={PRESETS_CANON.findIndex((p) => p.out.join() === out.join())}
          onChange={(i) => setOut(PRESETS_CANON[i]!.out)}
          label="Ejemplos"
        />
      }
    >
      <Table
        head={["i", "c", "b", "a", "S"]}
        rows={out.map((v, i) => [
          i,
          (i >> 2) & 1,
          (i >> 1) & 1,
          i & 1,
          <button key={i} type="button" aria-label={`Salida de la fila ${i}`} onClick={() => setOut((o) => o.map((x, k) => (k === i ? 1 - x : x)))} className="min-w-[2rem] rounded border px-2" style={{ borderColor: v ? MANIM.green : MANIM.muted, color: v ? MANIM.green : MANIM.muted }}>
            {v}
          </button>,
        ])}
      />
      <Readout>
        <Stat color={MANIM.green} label="Primera forma canónica (unos)">
          Σ({mins.join(", ") || "—"})
        </Stat>
        <Stat color={MANIM.orange} label="Segunda forma canónica (ceros)">
          Π({maxs.map((i) => 7 - i).sort((x, y) => x - y).join(", ") || "—"})
        </Stat>
      </Readout>
      <MathRenderer text={`$S = ${sop}$`} className="text-base" />
      <MathRenderer text={`$S = ${pos}$`} className="text-base" />
      <Note>En la segunda forma, el libro numera cada término con la regla i → 2ⁿ − 1 − i (aquí 7 − i). Si escribes cada suma directamente desde las filas con salida 0 (variable directa donde vale 0 y negada donde vale 1) obtienes la misma función.</Note>
    </Frame>
  );
}

/* ───────────── 9 y 10. Mapas de Karnaugh ───────────── */

const GROUP_COLORS = [MANIM.green, MANIM.orange, MANIM.blue, MANIM.red, MANIM.purple, MANIM.yellow, "#7fd3c8", "#ff9ac1"];

const KMAP_PRESETS: Record<number, { label: string; out: number[]; mode?: "sop" | "pos" }[]> = {
  2: [{ label: "S = b", out: [0, 0, 1, 1] }],
  3: [
    { label: "Ejemplo 11: Σ(2, 6)", out: [0, 0, 1, 0, 0, 0, 1, 0] },
    { label: "Ejemplo 13: Σ(1, 2, 4, 5, 6)", out: [0, 1, 1, 0, 1, 1, 1, 0] },
    { label: "Ejemplo 16: Σ(1, 2, 4, 5, 6, 7)", out: [0, 1, 1, 0, 1, 1, 1, 1] },
  ],
  4: [
    { label: "Ejemplo 17 (con indiferentes)", out: [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 2, 2], mode: "pos" },
    { label: "Cuatro esquinas", out: [1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  ],
};

export function KarnaughExplorador({ block }: { block: ToolBlock }) {
  const n0 = Math.round(num(block.params?.a, 3, 2, 4));
  const startPreset = (n: number) => KMAP_PRESETS[n]![Math.min(Math.round(num(block.params?.b, 0, 0, 5)), KMAP_PRESETS[n]!.length - 1)]!;
  const init = { n: n0, out: startPreset(n0).out, mode: (startPreset(n0).mode ?? "sop") as "sop" | "pos" };
  const [s, setS] = useState(init);
  const lay = karnaughLayout(s.n);
  const { imps, tex } = simplify(s.out, s.n, s.mode);
  const target = s.mode === "sop" ? 1 : 0;
  const cell = 64;
  const x0 = 70;
  const y0 = 50;
  const cycle = (i: number) => setS((x) => ({ ...x, out: x.out.map((v, k) => (k === i ? (v + 1) % 3 : v)) }));
  const changeN = (n: number) => setS({ n, out: KMAP_PRESETS[n]![0]!.out, mode: KMAP_PRESETS[n]![0]!.mode ?? "sop" });
  const groupsOf = (i: number) => imps.map((g, k) => ({ g, k })).filter(({ g }) => cellsOf(g, s.n).includes(i));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa una celda para cambiarla (0 → 1 → X). El mapa agrupa los unos (o los ceros) y escribe la expresión mínima."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={[2, 3, 4].map((v) => ({ value: v, label: `${v} variables` }))} value={s.n} onChange={changeN} label="Variables" />
          <Choice items={[{ value: "sop", label: "Agrupar unos (suma de productos)" }, { value: "pos", label: "Agrupar ceros (producto de sumas)" }]} value={s.mode} onChange={(mode) => setS((x) => ({ ...x, mode }))} label="Forma" />
          <Choice items={KMAP_PRESETS[s.n]!.map((p, i) => ({ value: i, label: p.label }))} value={KMAP_PRESETS[s.n]!.findIndex((p) => p.out.join() === s.out.join())} onChange={(i) => setS((x) => ({ ...x, out: KMAP_PRESETS[s.n]![i]!.out, mode: KMAP_PRESETS[s.n]![i]!.mode ?? x.mode }))} label="Ejemplos del libro" />
        </>
      }
    >
      <Svg w={400} h={y0 + lay.rows.length * cell + 24} maxH={320} testId="tool-kmap">
        <text x={x0 - 10} y={y0 - 28} textAnchor="end" fill={MANIM.muted} fontSize={13}>
          {lay.rowVars} \ {lay.colVars}
        </text>
        {lay.cols.map((c) => (
          <text key={c} x={x0 + c * cell + cell / 2} y={y0 - 10} textAnchor="middle" fill={MANIM.muted} fontSize={14}>
            {lay.colLabels[c]}
          </text>
        ))}
        {lay.rows.map((r) => (
          <text key={r} x={x0 - 10} y={y0 + r * cell + cell / 2 + 5} textAnchor="end" fill={MANIM.muted} fontSize={14}>
            {lay.rowLabels[r]}
          </text>
        ))}
        {lay.rows.map((r) =>
          lay.cols.map((c) => {
            const i = lay.index(c, r);
            const v = s.out[i]!;
            const gs = groupsOf(i);
            return (
              <g key={i} onClick={() => cycle(i)} style={{ cursor: "pointer" }} role="button" aria-label={`Celda ${i}: ${v === 2 ? "indiferente" : v}`}>
                <rect x={x0 + c * cell} y={y0 + r * cell} width={cell} height={cell} fill={v === target ? MANIM.panel : MANIM.surface} stroke={MANIM.muted} strokeWidth={2} />
                <text x={x0 + c * cell + 6} y={y0 + r * cell + 15} fill={MANIM.muted} fontSize={11}>
                  {i}
                </text>
                <text x={x0 + c * cell + cell / 2} y={y0 + r * cell + cell / 2 + 9} textAnchor="middle" fill={v === 2 ? MANIM.yellow : v === 1 ? MANIM.green : MANIM.muted} fontSize={26} fontWeight={700}>
                  {v === 2 ? "X" : v}
                </text>
                {gs.map(({ k }, j) => (
                  <rect key={k} x={x0 + c * cell + 4 + j * 4} y={y0 + r * cell + 4 + j * 4} width={cell - 8 - j * 8} height={cell - 8 - j * 8} rx={8} fill="none" stroke={GROUP_COLORS[k % GROUP_COLORS.length]} strokeWidth={3} />
                ))}
              </g>
            );
          }),
        )}
      </Svg>
      <div className="flex flex-wrap gap-3" data-testid="tool-kmap-groups">
        {imps.map((g: Implicant, k) => (
          <span key={k} className="rounded-lg border px-2 py-1 text-sm" style={{ borderColor: GROUP_COLORS[k % GROUP_COLORS.length] }}>
            Grupo de {cellsOf(g, s.n).length}: celdas {cellsOf(g, s.n).join(", ")}
          </span>
        ))}
      </div>
      <MathRenderer text={`$S = ${tex}$`} className="text-xl" />
      <Note>
        Las celdas del borde son adyacentes entre sí (el mapa es «cerrado»). X es un término indiferente: se agrupa solo si agranda el grupo. Variables: {VARS.slice(0, s.n).reverse().join(", ")}; a es la de menos peso.
      </Note>
    </Frame>
  );
}

/* ───────────── 11. Realización con NAND o NOR ───────────── */

export function NandNorExplorador({ block }: { block: ToolBlock }) {
  const presets = KMAP_PRESETS[3]!;
  const init = { out: presets[Math.min(Math.round(num(block.params?.a, 2, 0, 2)), presets.length - 1)]!.out, kind: "nand" as "nand" | "nor" };
  const [s, setS] = useState(init);
  const mode = s.kind === "nand" ? "sop" : "pos";
  const { imps, tex } = simplify(s.out, 3, mode);
  // inversores: variables que aparecen negadas (SOP) o directas... se cuentan los literales que hay que invertir
  const lit = (imp: Implicant) => [0, 1, 2].filter((i) => !(imp.mask & (1 << i))).map((i) => ({ i, bit: (imp.val >> i) & 1 }));
  const needsInv = new Set<number>();
  for (const imp of imps) {
    const ls = lit(imp);
    for (const l of ls) {
      const complemented = mode === "sop" ? l.bit === 0 : l.bit === 1;
      if (complemented || ls.length === 1) {
        needsInv.add(l.i);
      }
    }
  }
  const gate = s.kind === "nand" ? "NAND" : "NOR";
  const multi = imps.filter((i) => lit(i).length > 1).length;
  const total = needsInv.size + multi + (imps.length > 0 ? 1 : 0);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cualquier función se puede construir con solo NAND (a partir de la suma de productos) o solo NOR (a partir del producto de sumas)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={[{ value: "nand", label: "Solo puertas NAND" }, { value: "nor", label: "Solo puertas NOR" }]} value={s.kind} onChange={(kind) => setS((x) => ({ ...x, kind }))} label="Tecnología" />
          <Choice items={presets.map((p, i) => ({ value: i, label: p.label }))} value={presets.findIndex((p) => p.out.join() === s.out.join())} onChange={(i) => setS((x) => ({ ...x, out: presets[i]!.out }))} label="Función" />
        </>
      }
    >
      <MathRenderer text={`$S = ${tex}$`} className="text-xl" />
      <ol className="flex list-decimal flex-col gap-1 pl-6 text-[color:var(--stage-ink,#fff)]" data-testid="tool-nandnor">
        <li>
          <strong>Simplifica</strong> la función en {s.kind === "nand" ? "suma de productos" : "producto de sumas"} con Karnaugh.
        </li>
        <li>
          <strong>Doble inversión</strong> y Morgan: {s.kind === "nand" ? "S = NAND de los NAND de cada producto" : "S = NOR de los NOR de cada suma"}.
        </li>
        <li>
          Inversores ({gate} con las entradas unidas): <strong>{needsInv.size}</strong>{needsInv.size ? ` (para ${[...needsInv].sort().map((i) => VARS[i]).join(", ")})` : ""}.
        </li>
        <li>
          {gate} del primer nivel (uno por {s.kind === "nand" ? "producto" : "suma"} de varias variables): <strong>{multi}</strong>.
        </li>
        <li>
          {gate} de salida con {imps.length} entrada{imps.length === 1 ? "" : "s"}: <strong>1</strong>. Total: <strong>{total}</strong> puertas.
        </li>
      </ol>
      <Note>Un NAND (o un NOR) con las dos entradas unidas es un inversor. Por eso la familia entera es «universal»: con un solo tipo de puerta se construye todo.</Note>
    </Frame>
  );
}

/* ───────────── 12. Codificador, decodificador, multiplexor y comparador ───────────── */

const MODES_IC = [
  { value: "mux", label: "Multiplexor 8→1" },
  { value: "dec", label: "Decodificador 3→8" },
  { value: "enc", label: "Codificador 8→3" },
  { value: "cmp", label: "Comparador 4 bits" },
];

export function MuxDecoderExplorador({ block }: { block: ToolBlock }) {
  const init = { mode: MODES_IC[Math.round(num(block.params?.a, 0, 0, 3))]!.value, d: [0, 1, 1, 0, 1, 0, 0, 1], sel: 5, en: true, A: 9, B: 6 };
  const [s, setS] = useState(init);
  const toggleD = (i: number) => setS((x) => ({ ...x, d: x.d.map((v, k) => (k === i ? 1 - v : v)) }));
  const hiIdx = s.d.reduce((acc, v, i) => (v ? i : acc), -1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia de circuito y juega con sus entradas: cada uno es una «caja negra» con su tabla de comportamiento."}
      onReset={() => setS(init)}
      controls={<Choice items={MODES_IC} value={s.mode} onChange={(mode) => setS((x) => ({ ...x, mode }))} label="Circuito integrado" />}
    >
      {s.mode === "mux" ? (
        <div className="flex flex-col gap-3" data-testid="tool-ic">
          <div className="flex flex-wrap items-center gap-2">
            {s.d.map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-1" style={i === s.sel ? { outline: `2px solid ${MANIM.yellow}`, borderRadius: 8, padding: 2 } : undefined}>
                <span className="text-xs text-[color:var(--stage-muted,#b8c2d0)]">D{i}</span>
                <BitBtn value={v === 1} onToggle={() => toggleD(i)} label={`Entrada de datos D${i}`} color={MANIM.blue} />
              </div>
            ))}
          </div>
          <Slider label="Selección (ABC en binario)" value={s.sel} min={0} max={7} step={1} format={(v) => `${v} = ${bin(v, 3)}`} color={MANIM.orange} onChange={(sel) => setS((x) => ({ ...x, sel }))} />
          <Readout>
            <Stat color={MANIM.yellow} label={`Salida W = D${s.sel}`}>
              {s.d[s.sel]}
            </Stat>
          </Readout>
          <Note>El multiplexor canaliza una de las 8 entradas de datos hacia la única salida, la que indique la combinación binaria de las entradas de selección.</Note>
        </div>
      ) : null}
      {s.mode === "dec" ? (
        <div className="flex flex-col gap-3" data-testid="tool-ic">
          <Slider label="Entrada binaria" value={s.sel} min={0} max={7} step={1} format={(v) => `${bin(v, 3)} = ${v}`} color={MANIM.orange} onChange={(sel) => setS((x) => ({ ...x, sel }))} />
          <label className="flex items-center gap-2 text-sm text-[color:var(--stage-muted,#b8c2d0)]">
            <input type="checkbox" checked={s.en} onChange={(e) => setS((x) => ({ ...x, en: e.target.checked }))} />
            Habilitado (enable)
          </label>
          <div className="flex flex-wrap items-center gap-3">
            {Array.from({ length: 8 }, (_, i) => (
              <Lamp key={i} on={s.en && i === s.sel} label={`Y${i}`} />
            ))}
          </div>
          <Note>Un decodificador activa una única salida entre las 2ⁿ posibles, la del número que llega en binario. El 74138 real tiene las salidas activas a nivel bajo.</Note>
        </div>
      ) : null}
      {s.mode === "enc" ? (
        <div className="flex flex-col gap-3" data-testid="tool-ic">
          <div className="flex flex-wrap items-center gap-2">
            {s.d.map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-xs text-[color:var(--stage-muted,#b8c2d0)]">E{i}</span>
                <BitBtn value={v === 1} onToggle={() => toggleD(i)} label={`Entrada E${i}`} color={MANIM.blue} />
              </div>
            ))}
          </div>
          <Readout>
            <Stat color={MANIM.yellow} label="Salida (binario)">
              {hiIdx >= 0 ? bin(hiIdx, 3) : "000"}
            </Stat>
            <Stat color={MANIM.green} label="Entrada con prioridad">
              {hiIdx >= 0 ? `E${hiIdx}` : "ninguna"}
            </Stat>
          </Readout>
          <Note>En un codificador con prioridad, si varias entradas están activas a la vez gana la de mayor peso (como el 74148). Sin prioridad, solo se permite una entrada activa.</Note>
        </div>
      ) : null}
      {s.mode === "cmp" ? (
        <div className="flex flex-col gap-3" data-testid="tool-ic">
          <Slider label="Palabra A" value={s.A} min={0} max={15} step={1} format={(v) => `${bin(v, 4)} = ${v}`} color={MANIM.blue} onChange={(A) => setS((x) => ({ ...x, A }))} />
          <Slider label="Palabra B" value={s.B} min={0} max={15} step={1} format={(v) => `${bin(v, 4)} = ${v}`} color={MANIM.orange} onChange={(B) => setS((x) => ({ ...x, B }))} />
          <div className="flex flex-wrap items-center gap-4">
            <Lamp on={s.A > s.B} label="A > B" />
            <Lamp on={s.A === s.B} label="A = B" />
            <Lamp on={s.A < s.B} label="A < B" />
          </div>
          <Note>El comparador (74LS85) tiene dos palabras de 4 bits y tres salidas. Con las entradas en cascada se pueden unir varios para comparar 8 o 16 bits.</Note>
        </div>
      ) : null}
    </Frame>
  );
}

/* ───────────── 13. Sumadores ───────────── */

export function SumadorBinarioExplorador({ block }: { block: ToolBlock }) {
  const init = { mode: ["half", "full", "four"][Math.round(num(block.params?.a, 1, 0, 2))]!, a: 1, b: 1, c: 0, A: 11, B: 6 };
  const [s, setS] = useState(init);
  const full = s.mode === "full";
  const tot = s.a + s.b + (full ? s.c : 0);
  const sum = tot % 2;
  const carry = tot >> 1;
  // suma de 4 bits con acarreos
  const aBits = bin(s.A, 4).split("").map(Number);
  const bBits = bin(s.B, 4).split("").map(Number);
  const carries: number[] = [0, 0, 0, 0, 0];
  const res: number[] = [0, 0, 0, 0];
  for (let i = 3; i >= 0; i -= 1) {
    const t = aBits[i]! + bBits[i]! + carries[i + 1]!;
    res[i] = t % 2;
    carries[i] = t >> 1;
  }
  const result = [carries[0], ...res].join("");
  return (
    <Frame
      stacked
      hint={block.hint ?? "El sumador completo suma dos bits y el acarreo de la columna anterior; encadenando cuatro se suman números de 4 bits."}
      onReset={() => setS(init)}
      controls={
        <Choice items={[{ value: "half", label: "Medio sumador" }, { value: "full", label: "Sumador completo" }, { value: "four", label: "Sumador de 4 bits" }]} value={s.mode} onChange={(mode) => setS((x) => ({ ...x, mode }))} label="Circuito" />
      }
    >
      {s.mode !== "four" ? (
        <div className="flex flex-col gap-3" data-testid="tool-adder">
          <div className="flex items-center gap-3">
            <BitBtn value={s.a === 1} onToggle={() => setS((x) => ({ ...x, a: 1 - x.a }))} label="Bit A" color={MANIM.blue} />
            <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">A</span>
            <BitBtn value={s.b === 1} onToggle={() => setS((x) => ({ ...x, b: 1 - x.b }))} label="Bit B" color={MANIM.orange} />
            <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">B</span>
            {full ? (
              <>
                <BitBtn value={s.c === 1} onToggle={() => setS((x) => ({ ...x, c: 1 - x.c }))} label="Acarreo de entrada" color={MANIM.purple} />
                <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">acarreo de entrada</span>
              </>
            ) : null}
          </div>
          <Readout>
            <Stat color={MANIM.green} label="Suma S">
              {sum}
            </Stat>
            <Stat color={MANIM.red} label="Acarreo de salida">
              {carry}
            </Stat>
            <Stat color={MANIM.yellow} label="Resultado">
              {s.a} + {s.b}
              {full ? ` + ${s.c}` : ""} = {bin(tot, 2)}
            </Stat>
          </Readout>
          <MathRenderer text={full ? "$S = A \\oplus B \\oplus C_{in}\\qquad C_{out} = A\\cdot B + C_{in}\\,(A\\oplus B)$" : "$S = A \\oplus B\\qquad C_{out} = A\\cdot B$"} className="text-lg" />
          <Note>{full ? "El sumador completo tiene tres entradas: A, B y el acarreo que viene de la columna de la derecha." : "El medio sumador no admite acarreo de entrada: solo sirve para la primera columna."}</Note>
        </div>
      ) : (
        <div className="flex flex-col gap-3" data-testid="tool-adder">
          <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            <Slider label="A" value={s.A} min={0} max={15} step={1} format={(v) => `${bin(v, 4)} = ${v}`} color={MANIM.blue} onChange={(A) => setS((x) => ({ ...x, A }))} />
            <Slider label="B" value={s.B} min={0} max={15} step={1} format={(v) => `${bin(v, 4)} = ${v}`} color={MANIM.orange} onChange={(B) => setS((x) => ({ ...x, B }))} />
          </div>
          <Table
            mono
            head={["", "2⁴", "2³", "2²", "2¹", "2⁰"]}
            rows={[
              [<span key="c" style={{ color: MANIM.red }}>acarreo</span>, ...carries.slice(0, 4).map((c, i) => <span key={i} style={{ color: MANIM.red }}>{c}</span>), ""],
              ["A", "", ...aBits],
              ["+ B", "", ...bBits],
              [<span key="s" style={{ color: MANIM.green }}>S</span>, ...result.split("").map((b, i) => <span key={i} style={{ color: MANIM.green }}>{b}</span>)],
            ]}
          />
          <Readout>
            <Stat color={MANIM.yellow} label="Resultado">
              {s.A} + {s.B} = {s.A + s.B} = {result}
            </Stat>
          </Readout>
          <Note>Cada columna es un sumador completo: el acarreo de salida de una entra en la siguiente. Si el último acarreo es 1, hace falta un quinto bit.</Note>
        </div>
      )}
    </Frame>
  );
}
