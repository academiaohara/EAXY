"use client";

import { useState, type ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, TOOL_BTN, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

const f0 = (v: number) => fmtEs(v, 0);

/* ───────────── Cálculos puros (se prueban aparte) ───────────── */

export type QState = 0 | 1 | "?";

/** Biestable R-S con puertas NOR. `prohibido` marca R = S = 1; tras soltar ese caso el estado queda indeterminado. */
export function rsStep(q: QState, r: number, s: number): { q: QState; qb: QState; prohibido: boolean } {
  if (r === 1 && s === 1) {
    return { q: 0, qb: 0, prohibido: true };
  }
  if (r === 0 && s === 1) {
    return { q: 1, qb: 0, prohibido: false };
  }
  if (r === 1 && s === 0) {
    return { q: 0, qb: 1, prohibido: false };
  }
  return { q, qb: q === "?" ? "?" : ((1 - q) as 0 | 1), prohibido: false };
}

/** Biestable J-K (flanco): 00 mantiene, 01 reset, 10 set, 11 conmuta. */
export const jkNext = (q: number, j: number, k: number) => (j === 0 && k === 0 ? q : j === 0 && k === 1 ? 0 : j === 1 && k === 0 ? 1 : 1 - q);

/** Ecuaciones del libro (ejemplos 1 a 3 de la teoría bimodal). Pulsados = true. */
export function bimodalNext(ej: 1 | 2 | 3, prev: number, p: { sb1: boolean; sb2: boolean; sb3: boolean; sb4: boolean }): number {
  if (ej === 1) {
    // KM1 = ¬SB2 · (SB1 + KM1)   (SB2 es NC: conduce si NO está pulsado)
    return !p.sb2 && (p.sb1 || prev === 1) ? 1 : 0;
  }
  if (ej === 2) {
    // KA2 = (¬SB3 + ¬SB4) · (SB1·SB2 + KA2)
    return (!p.sb3 || !p.sb4) && ((p.sb1 && p.sb2) || prev === 1) ? 1 : 0;
  }
  // KA3 = (¬SB3 · ¬SB4) · (SB1 + SB2 + KA3)
  return !p.sb3 && !p.sb4 && (p.sb1 || p.sb2 || prev === 1) ? 1 : 0;
}

/** Inversión de giro (ejemplo 7): KM1 y KM2 enclavados, con paro y relé térmico. Si piden los dos a la vez, gana KM1. */
export function reversalStep(prev: { km1: number; km2: number }, p: { sb0: boolean; sb1: boolean; sb2: boolean; ft1: boolean }) {
  const stopOk = !p.sb0 && !p.ft1;
  const km1 = stopOk && ((p.sb1 && prev.km2 === 0) || prev.km1 === 1) ? 1 : 0;
  const km2 = stopOk && ((p.sb2 && km1 === 0) || prev.km2 === 1) ? 1 : 0;
  return { km1, km2 };
}

/** Intervalos en alto de la lámpara de un temporizador a la conexión o a la desconexión. */
export function timerOutput(kind: "on" | "off", t: number, start: number, end: number): [number, number] | null {
  if (kind === "on") {
    return end - start > t ? [start + t, end] : null;
  }
  return [start, end + t];
}

/* ───────────── Elementos de interfaz ───────────── */

function PressBtn({ label, pressed, onToggle, color = MANIM.yellow, hint }: { label: string; pressed: boolean; onToggle: () => void; color?: string; hint?: string }) {
  return (
    <button type="button" aria-pressed={pressed} aria-label={label} onClick={onToggle} className={`${TOOL_BTN} flex min-w-[6.5rem] flex-col items-center gap-0.5`} style={pressed ? { borderColor: color, background: `${color}33`, color } : undefined}>
      <span className="font-semibold">{label}</span>
      <span className="text-xs opacity-80">{hint ?? (pressed ? "pulsado" : "suelto")}</span>
    </button>
  );
}

function Lamp({ on, label, color = MANIM.yellow }: { on: boolean; label: string; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2" role="img" aria-label={`${label}: ${on ? "encendido" : "apagado"}`}>
      <span className="h-5 w-5 rounded-full border-2" style={{ borderColor: on ? color : MANIM.muted, background: on ? color : "transparent", boxShadow: on ? `0 0 12px ${color}` : "none" }} />
      <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">{label}</span>
    </span>
  );
}

function Log({ items }: { items: ReactNode[] }) {
  return (
    <ol className="flex max-w-md list-decimal flex-col gap-0.5 pl-6 text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-log">
      {items.slice(-5).map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ol>
  );
}

/* ───────────── 1. Con y sin memoria ───────────── */

export function SecuencialMemoriaExplorador({ block }: { block: ToolBlock }) {
  const init = { a: false, r: false, q: 0, log: [] as string[] };
  const [s, setS] = useState(init);
  const apply = (a: boolean, r: boolean, q: number, what: string) => {
    const nq = !r && (a || q === 1) ? 1 : 0;
    setS((x) => ({ a, r, q: nq, log: [...x.log, `${what} → S = ${a ? 1 : 0}, Q = ${nq}`] }));
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa y suelta «a»: el circuito sin memoria sigue al pulsador; el que tiene memoria se queda encendido hasta el reset."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <PressBtn label="a (marcha)" pressed={s.a} onToggle={() => apply(!s.a, s.r, s.q, s.a ? "Se suelta a" : "Se pulsa a")} color={MANIM.blue} />
          <PressBtn label="R (reset)" pressed={s.r} onToggle={() => apply(s.a, !s.r, s.q, s.r ? "Se suelta R" : "Se pulsa R")} color={MANIM.red} />
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2" data-testid="tool-mem">
        <div className="flex flex-col gap-1 rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-3">
          <span className="font-semibold" style={{ color: MANIM.blue }}>
            Combinacional
          </span>
          <MathRenderer text="$S = a$" />
          <Lamp on={s.a} label="Lámpara S" />
        </div>
        <div className="flex flex-col gap-1 rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-3">
          <span className="font-semibold" style={{ color: MANIM.orange }}>
            Secuencial (con memoria)
          </span>
          <MathRenderer text="$Q^{+} = \bar R\,(a + Q)$" />
          <Lamp on={s.q === 1} label="Lámpara Q" color={MANIM.orange} />
        </div>
      </div>
      <Log items={s.log} />
      <Note>La salida con memoria depende de las entradas y del estado anterior (Q): por eso la ecuación contiene a la propia salida. Es la idea de realimentación que usarán los biestables y el control cableado.</Note>
    </Frame>
  );
}

/* ───────────── 2. Biestable R-S ───────────── */

export function BiestableRsExplorador({ block }: { block: ToolBlock }) {
  const init = { r: 0, s: 0, q: 0 as QState, prohibido: false, hist: ["R=0 S=0 → Q=0"] };
  const [st, setSt] = useState(init);
  const set = (r: number, s: number) => {
    // al soltar a la vez R y S desde el caso prohibido, el estado queda indeterminado
    const from: QState = st.prohibido && r === 0 && s === 0 ? "?" : st.q;
    const out = rsStep(from, r, s);
    setSt({ r, s, q: out.q, prohibido: out.prohibido, hist: [...st.hist, `R=${r} S=${s} → Q=${out.q === "?" ? "indeterminado" : out.q}`].slice(-6) });
  };
  const out = rsStep(st.q, 0, 0);
  const rows = [
    [0, 0, "Q anterior", "mantiene"],
    [0, 1, "—", "Set: Q = 1"],
    [1, 0, "—", "Reset: Q = 0"],
    [1, 1, "—", "prohibido (Q = Q̄ = 0)"],
  ];
  const hi = rows.findIndex((x) => x[0] === st.r && x[1] === st.s);
  const qShow = st.prohibido ? 0 : st.q;
  const qbShow = st.prohibido ? 0 : out.qb;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Prueba Set, suelta y observa que Q se mantiene; después Reset. Evita R = S = 1: las salidas dejan de ser complementarias."}
      onReset={() => setSt(init)}
      controls={
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <PressBtn label="S (Set)" pressed={st.s === 1} onToggle={() => set(st.r, 1 - st.s)} color={MANIM.green} />
          <PressBtn label="R (Reset)" pressed={st.r === 1} onToggle={() => set(1 - st.r, st.s)} color={MANIM.red} />
        </div>
      }
    >
      <Readout>
        <Stat color={qShow === "?" ? MANIM.yellow : qShow ? MANIM.green : MANIM.muted} label="Q">
          {qShow === "?" ? "?" : qShow}
        </Stat>
        <Stat color={qbShow === "?" ? MANIM.yellow : qbShow ? MANIM.green : MANIM.muted} label="Q̄">
          {qbShow === "?" ? "?" : qbShow}
        </Stat>
        {st.prohibido ? (
          <Stat color={MANIM.red} label="Aviso">
            entrada prohibida
          </Stat>
        ) : null}
        {st.q === "?" && !st.prohibido ? (
          <Stat color={MANIM.yellow} label="Aviso">
            estado indeterminado
          </Stat>
        ) : null}
      </Readout>
      <table className="w-full max-w-md border-collapse text-center font-mono" data-testid="tool-rs">
        <thead>
          <tr>
            {["R", "S", "Q anterior", "Q siguiente"].map((h) => (
              <th key={h} className="border-b border-[color:var(--stage-border,#3d4f66)] px-2 py-1 text-sm font-semibold text-[color:var(--stage-muted,#b8c2d0)]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={i === hi ? { background: "rgba(255,216,102,0.18)" } : undefined}>
              {r.map((c, k) => (
                <td key={k} className="px-2 py-1">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Log items={st.hist} />
      <Note>Es un biestable asíncrono: reacciona en cuanto cambian R o S. Si sueltas a la vez las dos entradas desde R = S = 1, el estado final es imprevisible (indeterminado).</Note>
    </Frame>
  );
}

/* ───────────── 3. J-K, T y D con reloj ───────────── */

export function BiestableJkExplorador({ block }: { block: ToolBlock }) {
  const init = { tipo: "jk" as string, j: 1, k: 1, d: 1, q: 0, hist: [0] };
  const [s, setS] = useState(init);
  const clock = () => {
    const nq = s.tipo === "jk" ? jkNext(s.q, s.j, s.k) : s.tipo === "t" ? (s.j === 1 ? 1 - s.q : s.q) : s.d;
    setS((x) => ({ ...x, q: nq, hist: [...x.hist, nq].slice(-10) }));
  };
  const pred = s.tipo === "jk" ? jkNext(s.q, s.j, s.k) : s.tipo === "t" ? (s.j === 1 ? 1 - s.q : s.q) : s.d;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Fija las entradas y da un flanco de reloj: la salida cambia solo en ese instante, aunque las entradas lleven tiempo así."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={[{ value: "jk", label: "J-K" }, { value: "t", label: "T" }, { value: "d", label: "D" }]} value={s.tipo} onChange={(tipo) => setS((x) => ({ ...x, tipo }))} label="Biestable síncrono por flanco" />
          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            {s.tipo === "jk" ? (
              <>
                <PressBtn label="J" pressed={s.j === 1} onToggle={() => setS((x) => ({ ...x, j: 1 - x.j }))} color={MANIM.blue} hint={String(s.j)} />
                <PressBtn label="K" pressed={s.k === 1} onToggle={() => setS((x) => ({ ...x, k: 1 - x.k }))} color={MANIM.orange} hint={String(s.k)} />
              </>
            ) : null}
            {s.tipo === "t" ? <PressBtn label="T" pressed={s.j === 1} onToggle={() => setS((x) => ({ ...x, j: 1 - x.j }))} color={MANIM.blue} hint={String(s.j)} /> : null}
            {s.tipo === "d" ? <PressBtn label="D" pressed={s.d === 1} onToggle={() => setS((x) => ({ ...x, d: 1 - x.d }))} color={MANIM.blue} hint={String(s.d)} /> : null}
            <button type="button" className={`${TOOL_BTN} font-semibold`} style={{ borderColor: MANIM.yellow, color: MANIM.yellow }} onClick={clock}>
              Flanco de reloj ↑
            </button>
          </div>
        </>
      }
    >
      <Readout>
        <Stat color={s.q ? MANIM.green : MANIM.muted} label="Q">
          {s.q}
        </Stat>
        <Stat color={s.q ? MANIM.muted : MANIM.green} label="Q̄">
          {1 - s.q}
        </Stat>
        <Stat color={MANIM.yellow} label="Siguiente flanco → Q">
          {pred}
        </Stat>
      </Readout>
      <Svg w={520} h={80} maxH={90} testId="tool-q-hist">
        {s.hist.map((q, i) => (
          <g key={i}>
            <rect x={20 + i * 48} y={q ? 12 : 40} width={44} height={28} fill={q ? MANIM.green : MANIM.panel} fillOpacity={q ? 0.35 : 1} stroke={q ? MANIM.green : MANIM.muted} strokeWidth={2} rx={4} />
            <text x={42 + i * 48} y={q ? 32 : 60} textAnchor="middle" fill={MANIM.ink} fontSize={16}>
              {q}
            </text>
          </g>
        ))}
        <text x={500} y={74} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          historial de Q en cada flanco
        </text>
      </Svg>
      <MathRenderer
        text={s.tipo === "jk" ? "$J K = 00$: mantiene · $01$: reset · $10$: set · $11$: cambia de estado" : s.tipo === "t" ? "$T = 1$: cambia de estado en cada flanco; $T = 0$: mantiene" : "$Q^{+} = D$: copia la entrada en cada flanco"}
        className="text-base"
      />
      <Note>El J-K elimina la indeterminación del R-S: con J = K = 1 conmuta. Si se unen J y K se obtiene el T. El D copia su entrada.</Note>
    </Frame>
  );
}

/* ───────────── 4. Registro de desplazamiento y contador ───────────── */

export function RegistroContadorExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: num(block.params?.a, 0, 0, 1) >= 0.5 ? "cont" : "reg", bits: [0, 0, 0, 0], din: 1, n: 0, log: [] as string[] };
  const [s, setS] = useState(init);
  const clock = () => {
    if (s.modo === "reg") {
      const bits = [s.din, ...s.bits.slice(0, 3)];
      setS((x) => ({ ...x, bits, log: [...x.log, `entra ${x.din}: ${bits.join("")}`].slice(-6) }));
    } else {
      const n = (s.n + 1) % 16;
      setS((x) => ({ ...x, n, log: [...x.log, `${n}`].slice(-8) }));
    }
  };
  const countBits = [3, 2, 1, 0].map((i) => (s.n >> i) & 1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Da pulsos de reloj. En el registro cada bit avanza una posición; en el contador, el número binario sube de uno en uno."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={[{ value: "reg", label: "Registro de desplazamiento" }, { value: "cont", label: "Contador binario" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} label="Circuito" />
          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            {s.modo === "reg" ? <PressBtn label="Entrada serie D" pressed={s.din === 1} onToggle={() => setS((x) => ({ ...x, din: 1 - x.din }))} color={MANIM.blue} hint={String(s.din)} /> : null}
            <button type="button" className={`${TOOL_BTN} font-semibold`} style={{ borderColor: MANIM.yellow, color: MANIM.yellow }} onClick={clock}>
              Pulso de reloj ↑
            </button>
          </div>
        </>
      }
    >
      <div className="flex items-center gap-2" data-testid="tool-reg">
        {[4, 3, 2, 1].map((n, i) => {
          const v = s.modo === "reg" ? s.bits[3 - i]! : countBits[i]!;
          return (
            <div key={n} className="flex flex-col items-center gap-1 rounded-lg border px-3 py-2" style={{ borderColor: v ? MANIM.green : MANIM.muted }}>
              <span className="text-xs text-[color:var(--stage-muted,#b8c2d0)]">Q{n}</span>
              <span className="font-mono text-2xl font-bold" style={{ color: v ? MANIM.green : MANIM.muted }}>
                {v}
              </span>
            </div>
          );
        })}
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label={s.modo === "reg" ? "Q4 Q3 Q2 Q1" : "Número (Q4 Q3 Q2 Q1)"}>
          {s.modo === "reg" ? [...s.bits].reverse().join("") : countBits.join("")}
        </Stat>
        {s.modo === "cont" ? (
          <Stat color={MANIM.green} label="Decimal">
            {f0(s.n)}
          </Stat>
        ) : null}
      </Readout>
      <Log items={s.log} />
      <Note>{s.modo === "reg" ? "Cada flanco desplaza el contenido una posición: el primer bit que entró llega a Q4 tras cuatro pulsos." : "Un contador binario de cuatro biestables cuenta de 0 a 15 y vuelve a 0. Cada etapa divide por dos la frecuencia de la anterior."}</Note>
    </Frame>
  );
}

/* ───────────── 5. Temporizadores a la conexión y a la desconexión ───────────── */

export function CableadoElementosExplorador({ block }: { block: ToolBlock }) {
  const init = { kind: "on" as "on" | "off", t: num(block.params?.a, 6, 1, 15), d: num(block.params?.b, 14, 1, 24) };
  const [s, setS] = useState(init);
  const start = 3;
  const end = start + s.d;
  const out = timerOutput(s.kind, s.t, start, end);
  const TOT = 44;
  const X = (t: number) => 60 + (t / TOT) * 440;
  const path = (spans: [number, number][], yb: number) => {
    const pts: string[] = [`M ${X(0)} ${yb}`];
    for (const [a, b] of spans) {
      pts.push(`L ${X(a)} ${yb} L ${X(a)} ${yb - 30} L ${X(b)} ${yb - 30} L ${X(b)} ${yb}`);
    }
    pts.push(`L ${X(TOT)} ${yb}`);
    return pts.join(" ");
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Con el temporizador a la conexión, si la orden dura menos que t la lámpara nunca llega a encender. Con el de desconexión sigue t segundos tras soltar."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={[{ value: "on", label: "A la conexión" }, { value: "off", label: "A la desconexión" }]} value={s.kind} onChange={(kind) => setS((x) => ({ ...x, kind }))} label="Temporizador" />
          <Slider label="Tiempo ajustado, t" value={s.t} min={1} max={15} step={1} unit=" s" color={MANIM.red} onChange={(t) => setS((x) => ({ ...x, t }))} />
          <Slider label="Duración de la orden SA1" value={s.d} min={1} max={24} step={1} unit=" s" color={MANIM.yellow} onChange={(d) => setS((x) => ({ ...x, d }))} />
        </>
      }
    >
      <Readout>
        <Stat color={out ? MANIM.green : MANIM.red} label="Lámpara H1">
          {out ? `${f0(out[1] - out[0])} s encendida` : "nunca se enciende"}
        </Stat>
        {out ? (
          <Stat color={MANIM.yellow} label="Se enciende / se apaga en">
            {f0(out[0])} s / {f0(out[1])} s
          </Stat>
        ) : null}
      </Readout>
      <Svg w={520} h={170} maxH={190} testId="tool-timer">
        <text x={50} y={72} textAnchor="end" fill={MANIM.yellow} fontSize={14}>
          SA1
        </text>
        <text x={50} y={142} textAnchor="end" fill={MANIM.green} fontSize={14}>
          H1
        </text>
        <path d={path([[start, end]], 80)} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
        <path d={path(out ? [out] : [], 150)} fill="none" stroke={MANIM.green} strokeWidth={3} />
        <line x1={X(start)} y1={30} x2={X(start)} y2={160} stroke={MANIM.grid} strokeDasharray="4 4" />
        <line x1={X(end)} y1={30} x2={X(end)} y2={160} stroke={MANIM.grid} strokeDasharray="4 4" />
        {out ? (
          <g>
            <line x1={s.kind === "on" ? X(start) : X(end)} y1={162} x2={s.kind === "on" ? X(out[0]) : X(out[1])} y2={162} stroke={MANIM.red} strokeWidth={3} />
            <text x={(s.kind === "on" ? (X(start) + X(out[0])) / 2 : (X(end) + X(out[1])) / 2)} y={158} textAnchor="middle" fill={MANIM.red} fontSize={13}>
              t = {s.t} s
            </text>
          </g>
        ) : null}
      </Svg>
      <Note>{s.kind === "on" ? "A la conexión: los contactos cierran t segundos después de aplicar la orden y abren al instante al quitarla. Una orden más corta que t no llega a nada." : "A la desconexión: los contactos conmutan al instante al aplicar la orden y vuelven al reposo t segundos después de quitarla."}</Note>
    </Frame>
  );
}

/* ───────────── 6. Teoría bimodal: ecuaciones de los ejemplos 1 a 3 ───────────── */

const BIMODAL: Record<number, { tex: string; titulo: string; botones: { id: "sb1" | "sb2" | "sb3" | "sb4"; label: string; nc: boolean }[]; out: string }> = {
  1: { tex: "KM_1 = \\overline{SB_2}\\cdot (SB_1 + KM_1)", titulo: "Ejemplo 1: marcha con SB₁ (NA), paro con SB₂ (NC)", botones: [{ id: "sb1", label: "SB₁ (marcha, NA)", nc: false }, { id: "sb2", label: "SB₂ (paro, NC)", nc: true }], out: "KM₁" },
  2: { tex: "KA_2 = (\\overline{SB_3} + \\overline{SB_4})\\cdot\\left[(SB_1\\cdot SB_2) + KA_2\\right]", titulo: "Ejemplo 2: marcha con SB₁ «y» SB₂, paro con SB₃ «y» SB₄", botones: [{ id: "sb1", label: "SB₁ (NA)", nc: false }, { id: "sb2", label: "SB₂ (NA)", nc: false }, { id: "sb3", label: "SB₃ (NC)", nc: true }, { id: "sb4", label: "SB₄ (NC)", nc: true }], out: "KA₂" },
  3: { tex: "KA_3 = (\\overline{SB_3}\\cdot\\overline{SB_4})\\cdot\\left[(SB_1 + SB_2) + KA_3\\right]", titulo: "Ejemplo 3: marcha con SB₁ «o» SB₂, paro con SB₃ «o» SB₄", botones: [{ id: "sb1", label: "SB₁ (NA)", nc: false }, { id: "sb2", label: "SB₂ (NA)", nc: false }, { id: "sb3", label: "SB₃ (NC)", nc: true }, { id: "sb4", label: "SB₄ (NC)", nc: true }], out: "KA₃" },
};

export function GrafoBimodalExplorador({ block }: { block: ToolBlock }) {
  const ej0 = Math.round(num(block.params?.a, 1, 1, 3)) as 1 | 2 | 3;
  const init = { ej: ej0, p: { sb1: false, sb2: false, sb3: false, sb4: false }, q: 0, log: [] as string[] };
  const [s, setS] = useState(init);
  const def = BIMODAL[s.ej]!;
  const toggle = (id: "sb1" | "sb2" | "sb3" | "sb4") => {
    const p = { ...s.p, [id]: !s.p[id] };
    const q = bimodalNext(s.ej, s.q, p);
    const b = def.botones.find((x) => x.id === id)!;
    setS((x) => ({ ...x, p, q, log: [...x.log, `${b.label.split(" ")[0]} ${p[id] ? "pulsado" : "suelto"} → ${def.out} ${q ? "conectado" : "desconectado"}`].slice(-6) }));
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa y suelta los pulsadores. Fíjate en que el relé se mantiene al soltar la marcha (realimentación) y solo cae con una orden de paro."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={[1, 2, 3].map((v) => ({ value: v, label: `Ejemplo ${v}` }))} value={s.ej} onChange={(ej) => setS({ ej: ej as 1 | 2 | 3, p: { sb1: false, sb2: false, sb3: false, sb4: false }, q: 0, log: [] })} label="Circuito" />
          <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
            {def.botones.map((b) => (
              <PressBtn key={b.id} label={b.label} pressed={s.p[b.id]} onToggle={() => toggle(b.id)} color={b.nc ? MANIM.red : MANIM.green} />
            ))}
          </div>
        </>
      }
    >
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">{def.titulo}</p>
      <MathRenderer text={`$${def.tex}$`} className="text-lg" />
      <Readout>
        <Stat color={s.q ? MANIM.green : MANIM.muted} label={`Relé ${def.out}`}>
          {s.q ? "conectado" : "desconectado"}
        </Stat>
      </Readout>
      <Lamp on={s.q === 1} label={`Salida ${def.out}`} color={MANIM.orange} />
      <Log items={s.log} />
      <Note>Un pulsador normalmente cerrado (NC) está «cerrado» cuando NO se pulsa: por eso en la ecuación aparece negado. Las condiciones «y» a la marcha van en serie; «o», en paralelo; con el paro es al revés.</Note>
    </Frame>
  );
}

/* ───────────── 7. Secuencia con temporizadores ───────────── */

export function SecuenciaRelesExplorador({ block }: { block: ToolBlock }) {
  const init = { ej: num(block.params?.a, 5, 5, 6) >= 5.5 ? 6 : 5, t1: num(block.params?.b, 20, 5, 40), t2: num(block.params?.c, 30, 5, 40), t: 0 };
  const [s, setS] = useState(init);
  const SB2 = 75;
  const H1: [number, number] = [0, s.t1 + s.t2];
  const H2: [number, number] = [s.t1, s.ej === 5 ? s.t1 + s.t2 : SB2];
  const on = (r: [number, number]) => s.t >= r[0] && s.t < r[1];
  const TOT = 90;
  const X = (t: number) => 70 + (t / TOT) * 430;
  const row = (r: [number, number], yb: number) => `M ${X(0)} ${yb} L ${X(r[0])} ${yb} L ${X(r[0])} ${yb - 26} L ${X(r[1])} ${yb - 26} L ${X(r[1])} ${yb} L ${X(TOT)} ${yb}`;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Ajusta los dos temporizadores y recorre el tiempo: ¿cuándo se enciende cada lámpara y cuándo se apagan?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={[{ value: 5, label: "Ejemplo 5: se apagan a la vez" }, { value: 6, label: "Ejemplo 6: H₂ sigue hasta el paro" }]} value={s.ej} onChange={(ej) => setS((x) => ({ ...x, ej }))} label="Secuencia" />
          <Slider label="Temporizador KT₁" value={s.t1} min={5} max={40} step={1} unit=" s" color={MANIM.blue} onChange={(t1) => setS((x) => ({ ...x, t1 }))} />
          <Slider label="Temporizador KT₂" value={s.t2} min={5} max={40} step={1} unit=" s" color={MANIM.purple} onChange={(t2) => setS((x) => ({ ...x, t2 }))} />
          <Slider label="Instante, t (desde SB₁)" value={s.t} min={0} max={TOT} step={1} unit=" s" color={MANIM.yellow} onChange={(t) => setS((x) => ({ ...x, t }))} />
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-6" data-testid="tool-secuencia">
        <Lamp on={on(H1)} label="H₁" color={MANIM.green} />
        <Lamp on={on(H2)} label="H₂" color={MANIM.orange} />
      </div>
      <Svg w={520} h={150} maxH={170} testId="tool-cronograma">
        <text x={60} y={58} textAnchor="end" fill={MANIM.green} fontSize={14}>
          H₁
        </text>
        <text x={60} y={118} textAnchor="end" fill={MANIM.orange} fontSize={14}>
          H₂
        </text>
        <path d={row(H1, 66)} fill="none" stroke={MANIM.green} strokeWidth={3} />
        <path d={row(H2, 126)} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <line x1={X(s.t)} y1={20} x2={X(s.t)} y2={136} stroke={MANIM.yellow} strokeWidth={2} />
        {[0, 20, 40, 60, 80].map((t) => (
          <text key={t} x={X(t)} y={146} textAnchor="middle" fill={MANIM.muted} fontSize={11}>
            {t}
          </text>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="H₁ se enciende / apaga">
          {f0(H1[0])} s / {f0(H1[1])} s
        </Stat>
        <Stat color={MANIM.orange} label="H₂ se enciende / apaga">
          {f0(H2[0])} s / {f0(H2[1])} s{s.ej === 6 ? " (con SB₂)" : ""}
        </Stat>
      </Readout>
      <Note>{s.ej === 5 ? "Ejemplo 5: KT₂ abre su contacto a los t₁ + t₂ segundos y desconecta KA₁; con él caen KT₁, KA₂ y las dos lámparas." : "Ejemplo 6: a los t₁ + t₂ segundos se apaga H₁, pero H₂ sigue encendida hasta que se pulse SB₂ (NC), aquí a los 75 s."}</Note>
    </Frame>
  );
}

/* ───────────── 8. Inversión de giro con enclavamiento ───────────── */

export function MotorEnclavamientoExplorador({ block }: { block: ToolBlock }) {
  const init = { p: { sb0: false, sb1: false, sb2: false, ft1: false }, k: { km1: 0, km2: 0 }, log: [] as string[] };
  const [s, setS] = useState(init);
  const toggle = (id: "sb0" | "sb1" | "sb2" | "ft1", label: string) => {
    const p = { ...s.p, [id]: !s.p[id] };
    const k = reversalStep(s.k, p);
    const estado = k.km1 ? "gira a derechas" : k.km2 ? "gira a izquierdas" : "parado";
    setS((x) => ({ p, k, log: [...x.log, `${label} ${p[id] ? "activado" : "suelto"} → ${estado}`].slice(-6) }));
  };
  const estado = s.k.km1 ? "derechas" : s.k.km2 ? "izquierdas" : "parado";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Arranca a derechas y, sin parar, pulsa la marcha a izquierdas: el enclavamiento impide el cambio. Para, y entonces sí funciona."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <PressBtn label="SB₁ derechas" pressed={s.p.sb1} onToggle={() => toggle("sb1", "SB₁")} color={MANIM.green} />
          <PressBtn label="SB₂ izquierdas" pressed={s.p.sb2} onToggle={() => toggle("sb2", "SB₂")} color={MANIM.blue} />
          <PressBtn label="SB₀ paro (NC)" pressed={s.p.sb0} onToggle={() => toggle("sb0", "SB₀")} color={MANIM.red} />
          <PressBtn label="FT₁ sobrecarga" pressed={s.p.ft1} onToggle={() => toggle("ft1", "FT₁")} color={MANIM.orange} hint={s.p.ft1 ? "disparado" : "normal"} />
        </div>
      }
    >
      <MathRenderer text="$KM_1 = \overline{SB_0}\cdot\overline{FT_1}\cdot\left[(SB_1\cdot\overline{KM_2}) + KM_1\right]\qquad KM_2 = \overline{SB_0}\cdot\overline{FT_1}\cdot\left[(SB_2\cdot\overline{KM_1}) + KM_2\right]$" className="text-base" />
      <Readout>
        <Stat color={s.k.km1 ? MANIM.green : MANIM.muted} label="KM₁ (derechas)">
          {s.k.km1 ? "conectado" : "desconectado"}
        </Stat>
        <Stat color={s.k.km2 ? MANIM.green : MANIM.muted} label="KM₂ (izquierdas)">
          {s.k.km2 ? "conectado" : "desconectado"}
        </Stat>
        <Stat color={s.k.km1 || s.k.km2 ? MANIM.yellow : MANIM.muted} label="Motor">
          {estado}
        </Stat>
      </Readout>
      <Lamp on={s.p.ft1} label="H₁: parada por sobrecarga" color={MANIM.red} />
      <Log items={s.log} />
      <Note>Enclavamiento eléctrico: el contacto cerrado de KM₂ está en serie con la marcha de KM₁ y al revés, así los dos contactores nunca pueden estar conectados a la vez (se cortocircuitarían dos fases).</Note>
    </Frame>
  );
}
