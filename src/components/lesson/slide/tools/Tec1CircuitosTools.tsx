"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const f3 = (v: number) => fmtEs(v, 3);

/** Formatea una intensidad: mA si es pequeña, A si es grande. */
export function fmtI(a: number): string {
  if (!Number.isFinite(a)) return "—";
  return Math.abs(a) < 1 ? `${fmtEs(a * 1000, Math.abs(a) < 0.01 ? 2 : 1)} mA` : `${fmtEs(a, 2)} A`;
}

function HBar({ label, value, max, color, text }: { label: string; value: number; max: number; color: string; text?: string }) {
  const w = max > 0 ? Math.max(0, Math.min(100, (Math.abs(value) / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-3 text-sm text-[color:var(--stage-ink,#fff)]">
      <span className="w-40 shrink-0 text-[color:var(--stage-muted,#b8c2d0)]">{label}</span>
      <div className="h-4 flex-1 overflow-hidden rounded bg-white/10">
        <div className="anim-t h-full rounded" style={{ width: `${w}%`, background: color }} />
      </div>
      <span className="w-24 shrink-0 text-right font-bold tabular-nums">{text ?? f1(value)}</span>
    </div>
  );
}

/* ───────────── 4.1 Carga que circula ───────────── */

export function CargaCorrienteExplorador({ block }: { block: ToolBlock }) {
  const init = { V: num(block.params?.a, 6, 0, 12), R: Math.round(num(block.params?.b, 30, 5, 100)), t: Math.round(num(block.params?.c, 10, 1, 60)), play: true };
  const [s, setS] = useState(init);
  const I = s.V / s.R;
  const Q = I * s.t;
  const e = Q / 1.602e-19;
  const dur = clamp(2.5 / Math.max(I, 0.02), 0.6, 30);
  const n = Math.round(clamp(I * 40, 0, 14));
  const camino = "M 130 60 L 390 60 L 390 190 L 130 190 Z";
  return (
    <Frame
      stacked
      hint={block.hint ?? "La pila (tensión) empuja a las cargas; la resistencia limita cuántas pasan por segundo. Sube V y verás más cargas; sube R y verás menos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión de la pila, V" value={s.V} min={0} max={12} step={0.5} unit=" V" format={f1} color={MANIM.yellow} onChange={(V) => setS((x) => ({ ...x, V }))} />
          <Slider label="Resistencia del receptor, R" value={s.R} min={5} max={100} unit=" Ω" color={MANIM.orange} onChange={(R) => setS((x) => ({ ...x, R }))} />
          <Slider label="Tiempo" value={s.t} min={1} max={60} unit=" s" color={MANIM.blue} onChange={(t) => setS((x) => ({ ...x, t }))} />
          <button type="button" className={TOOL_BTN} aria-pressed={s.play} onClick={() => setS((x) => ({ ...x, play: !x.play }))}>
            {s.play ? "Pausar las cargas" : "Mover las cargas"}
          </button>
        </>
      }
    >
      <Svg w={520} h={250} maxH={260} testId="tool-cargas">
        <path d={camino} fill="none" stroke={MANIM.muted} strokeWidth={4} />
        <rect x={110} y={100} width={40} height={50} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
        <text x={130} y={130} textAnchor="middle" fill={MANIM.yellow} fontSize={16}>
          V
        </text>
        <rect x={370} y={100} width={40} height={50} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={3} />
        <text x={390} y={130} textAnchor="middle" fill={MANIM.orange} fontSize={16}>
          R
        </text>
        {s.play
          ? Array.from({ length: n }, (_, k) => (
              <circle key={k} r={6} fill={MANIM.blue}>
                <animateMotion dur={`${dur}s`} repeatCount="indefinite" begin={`${-(k / n) * dur}s`} path={camino} />
              </circle>
            ))
          : Array.from({ length: n }, (_, k) => <circle key={k} cx={130 + (k * 260) / Math.max(n, 1)} cy={60} r={6} fill={MANIM.blue} />)}
        <text x={260} y={225} textAnchor="middle" fill={MANIM.muted} fontSize={13}>
          cargas dibujadas ∝ intensidad (no son electrones reales a escala)
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Intensidad, I = V/R">
          {fmtI(I)}
        </Stat>
        <Stat color={MANIM.blue} label="Carga que pasa, Q = I·t">
          {f2(Q)} C
        </Stat>
        <Stat color={MANIM.purple} label="Número de electrones">
          {e.toExponential(2).replace(".", ",")}
        </Stat>
      </Readout>
      <Note>1 A es 1 C por segundo. La corriente tiene el sentido convencional de + a − fuera de la pila, aunque los electrones se muevan en sentido contrario.</Note>
    </Frame>
  );
}

/* ───────────── 4.2 Ley de Ohm ───────────── */

export function OhmExplorador({ block }: { block: ToolBlock }) {
  const init = { V: num(block.params?.a, 6, 0, 12), R: Math.round(num(block.params?.b, 100, 10, 500)), bomb: num(block.params?.n, 0, 0, 1) >= 0.5 };
  const [s, setS] = useState(init);
  // Bombilla de filamento: la resistencia crece al calentarse (modelo simplificado)
  const Rv = (v: number) => (s.bomb ? s.R * (1 + (9 * clamp(v, 0, 12)) / 12) : s.R);
  const I = s.V / Rv(s.V);
  const X = (v: number) => 50 + (v / 12) * 440;
  const Y = (i: number) => 200 - (i / 0.15) * 170;
  const curva = Array.from({ length: 49 }, (_, k) => {
    const v = (k * 12) / 48;
    return `${k ? "L" : "M"} ${X(v).toFixed(1)} ${Y(Math.min(0.15, v / Rv(v))).toFixed(1)}`;
  }).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "En una resistencia óhmica la gráfica V–I es una recta: doblar V dobla I. Cambia a la bombilla y verás que la recta se curva: la ley de Ohm no es universal."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión, V" value={s.V} min={0} max={12} step={0.5} unit=" V" format={f1} color={MANIM.yellow} onChange={(V) => setS((x) => ({ ...x, V }))} />
          <Slider label={s.bomb ? "Resistencia en frío, R₀" : "Resistencia, R"} value={s.R} min={10} max={500} step={10} unit=" Ω" color={MANIM.orange} onChange={(R) => setS((x) => ({ ...x, R }))} />
          <Choice label="Componente" items={[{ value: 0, label: "Resistencia (óhmica)" }, { value: 1, label: "Bombilla de filamento" }]} value={s.bomb ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, bomb: v === 1 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Intensidad, I = V/R">
          {fmtI(I)}
        </Stat>
        <Stat color={MANIM.orange} label="Resistencia en este punto">
          {f1(Rv(s.V))} Ω
        </Stat>
        <Stat color={MANIM.purple} label="Potencia, P = V·I">
          {f2(s.V * I)} W
        </Stat>
      </Readout>
      <Svg w={520} h={235} maxH={245} testId="tool-ohm">
        <line x1={50} y1={200} x2={500} y2={200} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={200} x2={50} y2={15} stroke={MANIM.muted} strokeWidth={2} />
        <path d={curva} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        <line x1={X(s.V)} y1={200} x2={X(s.V)} y2={Y(Math.min(0.15, I))} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="4 3" />
        <circle cx={X(s.V)} cy={Y(Math.min(0.15, I))} r={7} fill={MANIM.green} />
        <text x={500} y={220} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          V (V)
        </text>
        <text x={56} y={26} fill={MANIM.muted} fontSize={12}>
          I (A)
        </text>
      </Svg>
      <MathRenderer text={`$I = \\dfrac{V}{R} = \\dfrac{${f1(s.V)}}{${f1(Rv(s.V))}} = ${f3(I)}\\ \\text{A}$`} className="text-lg" />
      <Note>Pendiente de la recta = 1/R: a más resistencia, menos intensidad para la misma tensión. La bombilla es un modelo <strong>simplificado</strong> (su resistencia caliente es unas 10 veces la fría).</Note>
    </Frame>
  );
}

/* ───────────── 4.3 Circuito básico: interruptor, polaridad, cortocircuito y fusible ───────────── */

export function CircuitoBasicoExplorador({ block }: { block: ToolBlock }) {
  const init = { cerrado: false, led: num(block.params?.n, 0, 0, 1) >= 0.5, inv: false, corto: false, fundido: false };
  const [s, setS] = useState(init);
  /** Cerrar el interruptor con el cable en paralelo funde el fusible (hasta que se cambie). */
  const update = (patch: Partial<typeof init>) =>
    setS((x) => {
      const n = { ...x, ...patch };
      if (n.cerrado && n.corto) n.fundido = true;
      return n;
    });
  const V = 9;
  const RL = s.led ? 330 : 90; // lámpara de 0,1 A o LED con resistencia de 330 Ω
  const Rint = 0.5;
  const conduce = s.cerrado && !s.fundido && !(s.led && s.inv);
  const I = conduce ? (s.led ? Math.max(0, (V - 2) / RL) : V / (RL + Rint)) : 0;
  const luce = conduce && I > 0.001;
  const estado = s.fundido
    ? s.corto
      ? `Cortocircuito: la corriente habría sido de ${fmtI(V / Rint)} (solo la limita la resistencia interna de la pila) y el fusible de 1 A se ha fundido.`
      : "El fusible está fundido: el circuito queda abierto hasta que lo cambies."
    : !s.cerrado
      ? "Circuito abierto: no circula corriente."
      : s.led && s.inv
        ? "El LED está en inverso: no conduce."
        : luce
          ? "Circuito cerrado: el receptor funciona."
          : "Sin corriente suficiente.";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cierra el interruptor y prueba cada alteración: polaridad, cortocircuito y fusible. Un fusible protege al circuito: se funde antes de que se sobrecaliente."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Interruptor" items={[{ value: 0, label: "Abierto" }, { value: 1, label: "Cerrado" }]} value={s.cerrado ? 1 : 0} onChange={(v) => update({ cerrado: v === 1 })} />
          <Choice label="Receptor" items={[{ value: 0, label: "Lámpara" }, { value: 1, label: "LED con resistencia" }]} value={s.led ? 1 : 0} onChange={(v) => update({ led: v === 1 })} />
          <Choice label="Pila" items={[{ value: 0, label: "Polaridad correcta" }, { value: 1, label: "Invertida" }]} value={s.inv ? 1 : 0} onChange={(v) => update({ inv: v === 1 })} />
          <Choice label="Cable en paralelo con el receptor" items={[{ value: 0, label: "No" }, { value: 1, label: "Sí (cortocircuito)" }]} value={s.corto ? 1 : 0} onChange={(v) => update({ corto: v === 1 })} />
          <button type="button" className={TOOL_BTN} onClick={() => setS((x) => ({ ...x, fundido: x.cerrado && x.corto }))} disabled={!s.fundido}>
            Cambiar el fusible
          </button>
        </>
      }
    >
      <Svg w={520} h={230} maxH={240} testId="tool-circuito">
        <path d="M 110 60 L 410 60 L 410 190 L 110 190 Z" fill="none" stroke={conduce ? MANIM.yellow : MANIM.muted} strokeWidth={4} strokeDasharray={conduce ? undefined : "6 5"} />
        <rect x={90} y={110} width={40} height={50} fill={MANIM.surface} stroke={MANIM.green} strokeWidth={3} />
        <text x={110} y={140} textAnchor="middle" fill={MANIM.green} fontSize={14}>
          {s.inv ? "−  +" : "+  −"}
        </text>
        <circle cx={330} cy={60} r={22} fill={luce ? MANIM.yellow : MANIM.surface} fillOpacity={luce ? clamp(I * (s.led ? 30 : 9), 0.25, 1) : 1} stroke={MANIM.orange} strokeWidth={3} />
        <text x={330} y={66} textAnchor="middle" fill={MANIM.orange} fontSize={13}>
          {s.led ? "LED" : "L"}
        </text>
        {s.corto ? <path d="M 300 60 L 300 96 L 360 96 L 360 60" fill="none" stroke={MANIM.red} strokeWidth={4} /> : null}
        <line x1={190} y1={60} x2={s.cerrado ? 240 : 230} y2={s.cerrado ? 60 : 36} stroke={MANIM.blue} strokeWidth={5} className="anim-t" />
        <circle cx={190} cy={60} r={4} fill={MANIM.blue} />
        <circle cx={240} cy={60} r={4} fill={MANIM.blue} />
        <rect x={405} y={115} width={12} height={36} fill={s.fundido ? MANIM.red : MANIM.purple} />
        <text x={430} y={138} fill={s.fundido ? MANIM.red : MANIM.purple} fontSize={12}>
          {s.fundido ? "fusible fundido" : "fusible 1 A"}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Intensidad">
          {fmtI(I)}
        </Stat>
        <Stat color={MANIM.yellow} label="Sentido convencional">
          {conduce ? "De + a − por fuera de la pila" : "No circula"}
        </Stat>
      </Readout>
      <Note>{estado}</Note>
    </Frame>
  );
}

/* ───────────── 4.4 Asociación de resistencias ───────────── */

export function resistenciaEquivalente(modo: "serie" | "paralelo" | "mixto", r1: number, r2: number, r3: number): number {
  if (modo === "serie") return r1 + r2 + r3;
  if (modo === "paralelo") return 1 / (1 / r1 + 1 / r2 + 1 / r3);
  return r1 + (r2 * r3) / (r2 + r3);
}

export function ResistenciasExplorador({ block }: { block: ToolBlock }) {
  const MODOS = ["serie", "paralelo", "mixto"] as const;
  const init = { modo: MODOS[Math.round(num(block.params?.n, 0, 0, 2))]!, r1: Math.round(num(block.params?.a, 100, 10, 500)), r2: Math.round(num(block.params?.b, 200, 10, 500)), r3: Math.round(num(block.params?.c, 300, 10, 500)), V: 12 };
  const [s, setS] = useState(init);
  const Req = resistenciaEquivalente(s.modo, s.r1, s.r2, s.r3);
  const It = s.V / Req;
  let v = [0, 0, 0];
  let i = [0, 0, 0];
  if (s.modo === "serie") {
    i = [It, It, It];
    v = [It * s.r1, It * s.r2, It * s.r3];
  } else if (s.modo === "paralelo") {
    v = [s.V, s.V, s.V];
    i = [s.V / s.r1, s.V / s.r2, s.V / s.r3];
  } else {
    const rp = (s.r2 * s.r3) / (s.r2 + s.r3);
    const vp = It * rp;
    v = [It * s.r1, vp, vp];
    i = [It, vp / s.r2, vp / s.r3];
  }
  const nombres = ["R₁", "R₂", "R₃"];
  const rs = [s.r1, s.r2, s.r3];
  return (
    <Frame
      stacked
      hint={block.hint ?? "En serie la intensidad es común y la tensión se reparte; en paralelo la tensión es común y la intensidad se reparte. En mixto, R₁ en serie con el paralelo R₂‖R₃."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Asociación" items={MODOS.map((m) => ({ value: m, label: m === "serie" ? "Serie" : m === "paralelo" ? "Paralelo" : "Mixta: R₁ + (R₂ ‖ R₃)" }))} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          <Slider label="R₁" value={s.r1} min={10} max={500} step={10} unit=" Ω" color={MANIM.blue} onChange={(r1) => setS((x) => ({ ...x, r1 }))} />
          <Slider label="R₂" value={s.r2} min={10} max={500} step={10} unit=" Ω" color={MANIM.green} onChange={(r2) => setS((x) => ({ ...x, r2 }))} />
          <Slider label="R₃" value={s.r3} min={10} max={500} step={10} unit=" Ω" color={MANIM.orange} onChange={(r3) => setS((x) => ({ ...x, r3 }))} />
          <Slider label="Tensión de la fuente, V" value={s.V} min={1} max={24} unit=" V" color={MANIM.yellow} onChange={(V) => setS((x) => ({ ...x, V }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.purple} label="Resistencia equivalente">
          {f1(Req)} Ω
        </Stat>
        <Stat color={MANIM.green} label="Intensidad total, I = V/Req">
          {fmtI(It)}
        </Stat>
        <Stat color={MANIM.red} label="Potencia total">
          {f2(s.V * It)} W
        </Stat>
      </Readout>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-[color:var(--stage-ink,#fff)]" data-testid="resistencias-tabla">
          <thead>
            <tr className="text-left text-[color:var(--stage-muted,#b8c2d0)]">
              <th className="py-1">Resistencia</th>
              <th>Valor</th>
              <th>Tensión</th>
              <th>Intensidad</th>
              <th>Potencia</th>
            </tr>
          </thead>
          <tbody>
            {nombres.map((n, k) => (
              <tr key={n} className="border-t border-[color:var(--stage-border,#3d4f66)]">
                <td className="py-1 font-semibold">{n}</td>
                <td>{rs[k]} Ω</td>
                <td>{f2(v[k]!)} V</td>
                <td>{fmtI(i[k]!)}</td>
                <td>{f2(v[k]! * i[k]!)} W</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note>
        {s.modo === "serie" ? "Serie: Req = R₁ + R₂ + R₃; las tensiones suman V." : s.modo === "paralelo" ? "Paralelo: 1/Req = 1/R₁ + 1/R₂ + 1/R₃; las intensidades suman I. Req es menor que la menor de las resistencias." : "Mixta: primero se reduce el paralelo R₂‖R₃ y se suma a R₁."}
      </Note>
    </Frame>
  );
}

/* ───────────── 4.5 Leyes de Kirchhoff ───────────── */

export function resolverKirchhoff(V1: number, V2: number, R1: number, R2: number, R3: number) {
  const det = (R1 + R3) * (R2 + R3) - R3 * R3;
  const I1 = (V1 * (R2 + R3) - R3 * V2) / det;
  const I2 = ((R1 + R3) * V2 - R3 * V1) / det;
  return { I1, I2, I3: I1 + I2 };
}

export function KirchhoffExplorador({ block }: { block: ToolBlock }) {
  const init = { V1: num(block.params?.a, 12, 0, 24), V2: num(block.params?.b, 6, 0, 24), R1: 10, R2: 20, R3: 30 };
  const [s, setS] = useState(init);
  const { I1, I2, I3 } = resolverKirchhoff(s.V1, s.V2, s.R1, s.R2, s.R3);
  const malla1 = s.V1 - I1 * s.R1 - I3 * s.R3;
  const malla2 = s.V2 - I2 * s.R2 - I3 * s.R3;
  const nudo = I1 + I2 - I3;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos fuentes y tres ramas. Las corrientes se calculan resolviendo las ecuaciones de nudo y malla; abajo se comprueba que ambas leyes se cumplen. Un signo negativo indica sentido contrario al dibujado."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuente V₁" value={s.V1} min={0} max={24} step={0.5} unit=" V" format={f1} color={MANIM.yellow} onChange={(V1) => setS((x) => ({ ...x, V1 }))} />
          <Slider label="Fuente V₂" value={s.V2} min={0} max={24} step={0.5} unit=" V" format={f1} color={MANIM.green} onChange={(V2) => setS((x) => ({ ...x, V2 }))} />
          <Slider label="R₁" value={s.R1} min={5} max={100} step={5} unit=" Ω" color={MANIM.blue} onChange={(R1) => setS((x) => ({ ...x, R1 }))} />
          <Slider label="R₂" value={s.R2} min={5} max={100} step={5} unit=" Ω" color={MANIM.orange} onChange={(R2) => setS((x) => ({ ...x, R2 }))} />
          <Slider label="R₃ (rama central)" value={s.R3} min={5} max={100} step={5} unit=" Ω" color={MANIM.purple} onChange={(R3) => setS((x) => ({ ...x, R3 }))} />
        </>
      }
    >
      <Svg w={520} h={210} maxH={220} testId="tool-kirchhoff">
        <path d="M 80 40 L 440 40 M 80 170 L 440 170 M 80 40 L 80 170 M 260 40 L 260 170 M 440 40 L 440 170" fill="none" stroke={MANIM.muted} strokeWidth={3} />
        <circle cx={260} cy={40} r={6} fill={MANIM.yellow} />
        <text x={270} y={34} fill={MANIM.yellow} fontSize={13}>
          nudo A
        </text>
        <text x={90} y={110} fill={MANIM.yellow} fontSize={13}>
          V₁ + R₁ · I₁ = {f2(I1)} A
        </text>
        <text x={266} y={110} fill={MANIM.purple} fontSize={13}>
          R₃ · I₃ = {f2(I3)} A
        </text>
        <text x={446} y={110} fill={MANIM.green} fontSize={13} textAnchor="end" transform="translate(-6 0)">
          V₂ + R₂ · I₂ = {f2(I2)} A
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="I₁ (rama izquierda)">
          {f3(I1)} A
        </Stat>
        <Stat color={MANIM.green} label="I₂ (rama derecha)">
          {f3(I2)} A
        </Stat>
        <Stat color={MANIM.purple} label="I₃ = I₁ + I₂ (rama central, hacia abajo)">
          {f3(I3)} A
        </Stat>
      </Readout>
      <div className="grid gap-1 text-sm text-[color:var(--stage-ink,#fff)]" data-testid="kirchhoff-comprobacion">
        <p>
          <strong>Nudo A:</strong> I₁ + I₂ − I₃ = {f3(nudo)} A {Math.abs(nudo) < 1e-9 ? "✓" : "✗"}
        </p>
        <p>
          <strong>Malla izquierda:</strong> V₁ − R₁·I₁ − R₃·I₃ = {f3(malla1)} V {Math.abs(malla1) < 1e-9 ? "✓" : "✗"}
        </p>
        <p>
          <strong>Malla derecha:</strong> V₂ − R₂·I₂ − R₃·I₃ = {f3(malla2)} V {Math.abs(malla2) < 1e-9 ? "✓" : "✗"}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── 4.6 Potencia y energía ───────────── */

const APARATOS = [
  { n: "Lámpara LED", P: 9, h: 5 },
  { n: "Televisor", P: 100, h: 3 },
  { n: "Nevera", P: 150, h: 8 },
  { n: "Ordenador", P: 80, h: 4 },
  { n: "Lavadora", P: 2000, h: 1 },
  { n: "Horno", P: 2500, h: 1 },
];

export function ConsumoEnergiaExplorador({ block }: { block: ToolBlock }) {
  const init = { h: APARATOS.map((a) => a.h), precio: num(block.params?.a, 0.15, 0.05, 0.5) };
  const [s, setS] = useState(init);
  const E = APARATOS.map((a, i) => (a.P * s.h[i]! * 30) / 1000); // kWh al mes
  const total = E.reduce((a, b) => a + b, 0);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Energía = potencia × tiempo. Un aparato potente usado poco puede gastar menos que uno pequeño siempre encendido. Cambia las horas diarias."}
      onReset={() => setS(init)}
      controls={
        <>
          {APARATOS.map((a, i) => (
            <Slider key={a.n} label={`${a.n} (${a.P} W), h/día`} value={s.h[i]!} min={0} max={24} step={0.5} format={f1} unit=" h" color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, h: x.h.map((y, j) => (j === i ? v : y)) }))} />
          ))}
          <Slider label="Precio de la electricidad" value={s.precio} min={0.05} max={0.5} step={0.01} unit=" €/kWh" format={f2} color={MANIM.yellow} onChange={(precio) => setS((x) => ({ ...x, precio }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1.5" data-testid="consumo-barras">
        {APARATOS.map((a, i) => (
          <HBar key={a.n} label={a.n} value={E[i]!} max={Math.max(...E, 1)} color={MANIM.blue} text={`${f1(E[i]!)} kWh`} />
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.green} label="Energía en 30 días">
          {f1(total)} kWh
        </Stat>
        <Stat color={MANIM.yellow} label="Coste">
          {f2(total * s.precio)} €
        </Stat>
      </Readout>
      <Note>E (kWh) = P (kW) × t (h). 1 kWh = 3,6 MJ. Los consumos son de ejemplo: la nevera se tiene en cuenta por sus horas efectivas de motor.</Note>
    </Frame>
  );
}

export function SobrecargaCircuitoExplorador({ block }: { block: ToolBlock }) {
  const init = { n: [1, 0, 0, 0, 0], V: 230, lim: Math.round(num(block.params?.a, 16, 10, 25)) };
  const aparatos = [
    { n: "Lavadora", P: 2000 },
    { n: "Horno", P: 2500 },
    { n: "Plancha", P: 1200 },
    { n: "Tostadora", P: 800 },
    { n: "Microondas", P: 1000 },
  ];
  const [s, setS] = useState(init);
  const P = aparatos.reduce((a, ap, i) => a + ap.P * s.n[i]!, 0);
  const I = P / s.V;
  const salta = I > s.lim;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Todos los aparatos de un mismo circuito suman su intensidad. Si pasa del límite del magnetotérmico, salta para evitar que los cables se calienten."}
      onReset={() => setS(init)}
      controls={
        <>
          {aparatos.map((ap, i) => (
            <Choice key={ap.n} label={`${ap.n} (${ap.P} W)`} items={[{ value: 0, label: "Apagado" }, { value: 1, label: "Encendido" }]} value={s.n[i]!} onChange={(v) => setS((x) => ({ ...x, n: x.n.map((y, j) => (j === i ? v : y)) }))} />
          ))}
          <Slider label="Magnetotérmico del circuito" value={s.lim} min={10} max={25} unit=" A" color={MANIM.orange} onChange={(lim) => setS((x) => ({ ...x, lim }))} />
        </>
      }
    >
      <HBar label="Intensidad del circuito" value={I} max={Math.max(30, I)} color={salta ? MANIM.red : MANIM.green} text={`${f1(I)} A`} />
      <Readout>
        <Stat color={MANIM.blue} label="Potencia total">
          {f0(P)} W
        </Stat>
        <Stat color={salta ? MANIM.red : MANIM.green} label="Intensidad, I = P/V">
          {f1(I)} A
        </Stat>
        <Stat color={salta ? MANIM.red : MANIM.green} label={`Magnetotérmico de ${s.lim} A`}>
          {salta ? "SALTA" : "Aguanta"}
        </Stat>
      </Readout>
      <Note>Red doméstica de {s.V} V. Con {s.lim} A el circuito soporta como máximo {f0(s.lim * s.V)} W. El efecto Joule en los cables es proporcional a I²: duplicar la intensidad cuadruplica el calor.</Note>
    </Frame>
  );
}

/* ───────────── 4.7 Multímetro virtual ───────────── */

type Funcion = "V" | "A" | "Ω";
const R1M = 30;
const R2M = 60;
const VM = 9;
const RANGOS: Record<Funcion, number[]> = { V: [2, 20, 200], A: [0.02, 0.2, 10], Ω: [200, 2000, 20000] };

/** Lectura del multímetro según función y conexión; `null` si es un error de uso. */
export function lecturaMultimetro(f: Funcion, c: number, alimentado: boolean): { v: number; msg: string } {
  const It = VM / (R1M + R2M);
  if (f === "V") {
    if (!alimentado) return { v: 0, msg: "Sin alimentación no hay tensión que medir." };
    if (c === 0) return { v: It * R1M, msg: "Voltímetro en paralelo con R₁: correcto." };
    if (c === 1) return { v: It * R2M, msg: "Voltímetro en paralelo con R₂: correcto." };
    if (c === 2) return { v: VM, msg: "En serie, el voltímetro (muy alta resistencia) corta la corriente y marca casi toda la tensión de la pila. No es la forma de medir." };
    return { v: VM, msg: "Entre los bornes de la pila: mide su tensión." };
  }
  if (f === "A") {
    if (!alimentado) return { v: 0, msg: "Sin alimentación no circula corriente." };
    if (c === 2) return { v: It, msg: "Amperímetro en serie: correcto." };
    if (c === 0) return { v: VM / R2M, msg: "En paralelo con R₁ lo cortocircuitas: mides otra corriente y alteras el circuito." };
    if (c === 1) return { v: VM / R1M, msg: "En paralelo con R₂ lo cortocircuitas: mides otra corriente y alteras el circuito." };
    return { v: 18, msg: "¡Amperímetro en paralelo con la pila! Es un cortocircuito: se fundiría el fusible del aparato." };
  }
  if (alimentado) return { v: 0, msg: "No midas resistencias con el circuito alimentado: puedes dañar el aparato y la medida no vale." };
  if (c === 0) return { v: (R1M * R2M) / (R1M + R2M), msg: "Con la pila quitada, R₁ y R₂ siguen conectadas entre sí y la medida (20 Ω) NO es R₁. Para medir una resistencia hay que aislarla del circuito." };
  if (c === 1) return { v: (R1M * R2M) / (R1M + R2M), msg: "Igual que antes: mides R₁ ‖ R₂, no R₂ sola." };
  if (c === 2) return { v: R1M + R2M, msg: "Con el circuito abierto en un punto, mides R₁ + R₂ en serie: 90 Ω." };
  return { v: 0, msg: "Los bornes de la pila no son una resistencia." };
}

export function MultimetroExplorador({ block }: { block: ToolBlock }) {
  const init = { f: "V" as Funcion, c: 0, r: 1, on: true };
  const [s, setS] = useState<{ f: Funcion; c: number; r: number; on: boolean }>(init);
  const rangos = RANGOS[s.f];
  const rango = rangos[Math.min(s.r, 2)]!;
  const { v, msg } = lecturaMultimetro(s.f, s.c, s.on);
  const paso = rango / 2000;
  const dec = Math.max(0, Math.ceil(-Math.log10(paso)));
  const fuera = Math.abs(v) > rango;
  const mostrar = (x: number) => {
    const mA = s.f === "A" && rango <= 0.2;
    const val = mA ? x * 1000 : x;
    const d = mA ? Math.max(0, dec - 3) : dec;
    return `${fmtEs(val, d)}${s.f === "V" ? " V" : s.f === "A" ? (mA ? " mA" : " A") : " Ω"}`;
  };
  const unidadRango = (x: number) => (s.f === "V" ? `${x} V` : s.f === "A" ? (x <= 0.2 ? `${x * 1000} mA` : `${x} A`) : `${f0(x)} Ω`);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Circuito: pila de 9 V con R₁ = 30 Ω y R₂ = 60 Ω en serie. Elige función, conexión y rango. Hay conexiones incorrectas a propósito: ¿qué mide el aparato y qué le pasa al circuito?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Función" items={[{ value: "V", label: "Voltímetro (V)" }, { value: "A", label: "Amperímetro (A)" }, { value: "Ω", label: "Óhmetro (Ω)" }]} value={s.f} onChange={(f) => setS((x) => ({ ...x, f, r: 1 }))} />
          <Choice label="Conexión" items={[{ value: 0, label: "En paralelo con R₁" }, { value: 1, label: "En paralelo con R₂" }, { value: 2, label: "En serie con el circuito" }, { value: 3, label: "En bornes de la pila" }]} value={s.c} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Choice label="Rango" items={rangos.map((rg, i) => ({ value: i, label: unidadRango(rg) }))} value={Math.min(s.r, 2)} onChange={(r) => setS((x) => ({ ...x, r }))} />
          <Choice label="Alimentación" items={[{ value: 1, label: "Encendida" }, { value: 0, label: "Apagada" }]} value={s.on ? 1 : 0} onChange={(o) => setS((x) => ({ ...x, on: o === 1 }))} />
        </>
      }
    >
      <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-2 rounded-xl border-2 p-3" style={{ borderColor: MANIM.yellow, background: MANIM.surface }} data-testid="multimetro">
        <div className="w-full rounded-md bg-[#0f1a12] px-3 py-2 text-right font-mono text-3xl font-bold tabular-nums" style={{ color: MANIM.green }}>
          {fuera ? "OL" : mostrar(Math.round(v / paso) * paso)}
        </div>
        <div className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">rango {unidadRango(rango)}{fuera ? " · fuera de rango: sube de rango" : ""}</div>
      </div>
      <Note>{msg}</Note>
      <Readout>
        <Stat color={MANIM.blue} label="Valor teórico del circuito correcto">
          I = {fmtI(VM / (R1M + R2M))}; V₁ = 3 V; V₂ = 6 V
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 4.7 Diagnóstico de un circuito ───────────── */

const FALLOS = [
  { id: "lampara", n: "La lámpara está fundida (filamento roto)", med: { Vp: 6, Vs: 0, Vl: 6, I: 0 } },
  { id: "interruptor", n: "El interruptor no hace contacto", med: { Vp: 6, Vs: 6, Vl: 0, I: 0 } },
  { id: "pila", n: "La pila está casi agotada", med: { Vp: 1.1, Vs: 0, Vl: 1.1, I: 0.09 } },
  { id: "corto", n: "Hay un cortocircuito en la lámpara", med: { Vp: 0.4, Vs: 0, Vl: 0, I: 4.5 } },
] as const;
const MEDIDAS: { k: "Vp" | "Vs" | "Vl" | "I"; n: string }[] = [
  { k: "Vp", n: "Tensión de la pila" },
  { k: "Vs", n: "Tensión del interruptor" },
  { k: "Vl", n: "Tensión de la lámpara" },
  { k: "I", n: "Intensidad del circuito" },
];

export function DiagnosticoCircuitoExplorador({ block }: { block: ToolBlock }) {
  const idx = Math.round(num(block.params?.n, 0, 0, FALLOS.length - 1));
  const real = FALLOS[idx]!;
  const [hechas, setHechas] = useState<string[]>([]);
  const [dx, setDx] = useState<string | null>(null);
  const [comprobado, setComprobado] = useState(false);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Circuito de referencia: pila de 6 V, interruptor cerrado y lámpara de 12 Ω (0,5 A). La lámpara no luce. Toma medidas y deduce el fallo."}
      onReset={() => {
        setHechas([]);
        setDx(null);
        setComprobado(false);
      }}
      controls={<span />}
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Medidas">
        {MEDIDAS.map((m) => (
          <button key={m.k} type="button" className={`${TOOL_BTN} ${hechas.includes(m.k) ? "bg-white/15" : ""}`} onClick={() => setHechas((h) => (h.includes(m.k) ? h : [...h, m.k]))}>
            {m.n}
          </button>
        ))}
      </div>
      <ul className="grid gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="diagnostico-medidas">
        {MEDIDAS.filter((m) => hechas.includes(m.k)).map((m) => (
          <li key={m.k}>
            <strong>{m.n}:</strong> {m.k === "I" ? fmtI(real.med[m.k]) : `${f2(real.med[m.k])} V`}
          </li>
        ))}
        {hechas.length === 0 ? <li className="text-[color:var(--stage-muted,#b8c2d0)]">Aún no has medido nada.</li> : null}
      </ul>
      <Choice label="Mi diagnóstico" items={FALLOS.map((f) => ({ value: f.id, label: f.n }))} value={dx ?? ""} onChange={(v) => { setDx(v); setComprobado(false); }} />
      <div className="flex items-center gap-3">
        <button type="button" className={TOOL_BTN} disabled={!dx} onClick={() => setComprobado(true)}>
          Comprobar diagnóstico
        </button>
        {comprobado ? (
          <span className="font-bold" style={{ color: dx === real.id ? MANIM.green : MANIM.red }} role="status">
            {dx === real.id ? "Correcto: las medidas lo confirman." : "No encaja con las medidas: revisa dónde cae la tensión y cuánto circula."}
          </span>
        ) : null}
      </div>
      <Note>Pista de método: en un circuito en serie con un único fallo, la tensión de la pila aparece entera en el elemento que está abierto y la corriente es cero.</Note>
    </Frame>
  );
}

/* ───────────── 4.8 Diodo y LED ───────────── */

const LEDS = [
  { n: "LED rojo", vf: 1.9, c: MANIM.red },
  { n: "LED verde", vf: 2.1, c: MANIM.green },
  { n: "LED azul", vf: 3.0, c: MANIM.blue },
  { n: "Diodo de silicio", vf: 0.7, c: MANIM.muted },
];
const NVT = 0.06; // tensión térmica efectiva del modelo (V)
const IREF = 0.02; // corriente a la que la caída vale vf (A)

/** Punto de trabajo diodo + resistencia en serie, resuelto por bisección sobre el modelo exponencial. */
export function puntoDiodo(Vs: number, R: number, vf: number): { I: number; Vd: number } {
  if (Vs <= 0) return { I: 0, Vd: 0 };
  let lo = 0;
  let hi = Vs / R;
  for (let k = 0; k < 60; k += 1) {
    const mid = (lo + hi) / 2;
    const Vd = mid <= 1e-12 ? 0 : vf + NVT * Math.log(mid / IREF);
    if (Vd + mid * R > Vs) hi = mid;
    else lo = mid;
  }
  const I = (lo + hi) / 2;
  return { I, Vd: I <= 1e-12 ? 0 : vf + NVT * Math.log(I / IREF) };
}

export function DiodoLedExplorador({ block }: { block: ToolBlock }) {
  const init = { Vs: num(block.params?.a, 5, 0, 12), R: Math.round(num(block.params?.b, 220, 47, 1000)), d: Math.round(num(block.params?.n, 0, 0, 3)), inv: false };
  const [s, setS] = useState(init);
  const led = LEDS[s.d]!;
  const { I, Vd } = s.inv ? { I: 0, Vd: 0 } : puntoDiodo(s.Vs, s.R, led.vf);
  const estado = s.inv ? "Polarización inversa: no conduce" : I < 0.0005 ? "Apagado (por debajo del umbral)" : I > 0.03 ? "Sobrecorriente: se quemaría" : I > 0.02 ? "Muy brillante (en el límite)" : "Luce normalmente";
  const X = (v: number) => 50 + (v / 4) * 440;
  const Y = (i: number) => 200 - (i / 0.04) * 170;
  const curva = Array.from({ length: 60 }, (_, k) => {
    const v = 0.3 + (k * (led.vf + 0.12 - 0.3)) / 59;
    const i = IREF * Math.exp((v - led.vf) / NVT);
    return `${k ? "L" : "M"} ${X(v).toFixed(1)} ${Y(Math.min(0.04, i)).toFixed(1)}`;
  }).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "El diodo no conduce hasta superar su tensión umbral (≈ Vf) y entonces la corriente crece muy deprisa: siempre necesita una resistencia en serie que la limite."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión de la fuente" value={s.Vs} min={0} max={12} step={0.1} unit=" V" format={f1} color={MANIM.yellow} onChange={(Vs) => setS((x) => ({ ...x, Vs }))} />
          <Slider label="Resistencia en serie" value={s.R} min={47} max={1000} step={1} unit=" Ω" color={MANIM.orange} onChange={(R) => setS((x) => ({ ...x, R }))} />
          <Choice label="Componente" items={LEDS.map((l, i) => ({ value: i, label: l.n }))} value={s.d} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Choice label="Conexión" items={[{ value: 0, label: "Directa" }, { value: 1, label: "Invertida" }]} value={s.inv ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, inv: v === 1 }))} />
        </>
      }
    >
      <Svg w={520} h={230} maxH={240} testId="tool-diodo">
        <line x1={50} y1={200} x2={500} y2={200} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={200} x2={50} y2={15} stroke={MANIM.muted} strokeWidth={2} />
        <path d={curva} fill="none" stroke={led.c} strokeWidth={3.5} />
        <circle cx={X(Math.min(4, Vd))} cy={Y(Math.min(0.04, I))} r={7} fill={I > 0.02 ? MANIM.red : MANIM.green} />
        <circle cx={460} cy={50} r={22} fill={led.c} fillOpacity={clamp(I / 0.02, 0, 1) * 0.9 + 0.05} stroke={led.c} strokeWidth={3} />
        <text x={500} y={218} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          tensión en el diodo (V)
        </text>
        <text x={56} y={26} fill={MANIM.muted} fontSize={12}>
          I (A) · modelo exponencial simplificado
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Intensidad">
          {fmtI(I)}
        </Stat>
        <Stat color={MANIM.blue} label="Caída en el diodo">
          {f2(Vd)} V
        </Stat>
        <Stat color={MANIM.orange} label="Caída en la resistencia">
          {f2(I * s.R)} V
        </Stat>
        <Stat color={MANIM.purple} label="Potencia en la resistencia">
          {fmtEs(I * I * s.R * 1000, 1)} mW
        </Stat>
      </Readout>
      <Note>{estado}. Cálculo de diseño habitual: R = (V − Vf)/I. Un LED común trabaja con unos 10–20 mA.</Note>
    </Frame>
  );
}

/* ───────────── 4.8 Transistor como conmutador ───────────── */

export function TransistorConmutadorExplorador({ block }: { block: ToolBlock }) {
  const init = { Vin: num(block.params?.a, 3, 0, 5), Rb: Math.round(num(block.params?.b, 10, 1, 100)), Rc: 100, Vcc: 9 };
  const [s, setS] = useState(init);
  const beta = 100;
  const Ib = Math.max(0, (s.Vin - 0.7) / (s.Rb * 1000));
  const IcSat = (s.Vcc - 0.2) / s.Rc;
  const IcAct = beta * Ib;
  const sat = IcAct >= IcSat;
  const Ic = Ib === 0 ? 0 : Math.min(IcAct, IcSat);
  const modo = Ib === 0 ? "Corte (interruptor abierto)" : sat ? "Saturación (interruptor cerrado)" : "Zona activa (amplificador)";
  const Vce = s.Vcc - Ic * s.Rc;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Con poca corriente de base el transistor está en corte; con la suficiente se satura y la carga recibe casi toda la tensión. Entre ambos extremos amplifica: Ic = β·Ib."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión de entrada, V_in" value={s.Vin} min={0} max={5} step={0.1} unit=" V" format={f1} color={MANIM.yellow} onChange={(Vin) => setS((x) => ({ ...x, Vin }))} />
          <Slider label="Resistencia de base, R_B" value={s.Rb} min={1} max={100} unit=" kΩ" color={MANIM.blue} onChange={(Rb) => setS((x) => ({ ...x, Rb }))} />
          <Slider label="Resistencia de la carga, R_C" value={s.Rc} min={50} max={1000} step={10} unit=" Ω" color={MANIM.orange} onChange={(Rc) => setS((x) => ({ ...x, Rc }))} />
          <Slider label="Alimentación, V_CC" value={s.Vcc} min={5} max={12} unit=" V" color={MANIM.green} onChange={(Vcc) => setS((x) => ({ ...x, Vcc }))} />
        </>
      }
    >
      <Readout>
        <Stat color={sat ? MANIM.green : Ib === 0 ? MANIM.muted : MANIM.yellow} label="Región de trabajo">
          {modo}
        </Stat>
        <Stat color={MANIM.blue} label="Corriente de base, I_B">
          {fmtEs(Ib * 1e6, 1)} µA
        </Stat>
        <Stat color={MANIM.orange} label="Corriente de colector, I_C">
          {fmtI(Ic)}
        </Stat>
        <Stat color={MANIM.purple} label="Tensión V_CE">
          {f2(Vce)} V
        </Stat>
      </Readout>
      <HBar label="Tensión en la carga" value={Ic * s.Rc} max={s.Vcc} color={sat ? MANIM.green : MANIM.yellow} text={`${f2(Ic * s.Rc)} V`} />
      <Note>Modelo ideal: V_BE = 0,7 V, β = 100, V_CE(sat) = 0,2 V. Para que conmute de verdad hay que dar a la base unas 2–5 veces más corriente que I_C/β.</Note>
    </Frame>
  );
}

/* ───────────── 4.8 Condensador ───────────── */

export function CondensadorCargaExplorador({ block }: { block: ToolBlock }) {
  const init = { V: num(block.params?.a, 9, 1, 12), R: Math.round(num(block.params?.b, 10, 1, 100)), C: Math.round(num(block.params?.c, 100, 10, 1000)), t: 1, desc: false };
  const [s, setS] = useState(init);
  const tau = s.R * 1e3 * s.C * 1e-6; // s
  const Vc = (t: number) => (s.desc ? s.V * Math.exp(-t / tau) : s.V * (1 - Math.exp(-t / tau)));
  const tmax = 5 * tau;
  const t = (s.t / 100) * tmax;
  const X = (x: number) => 50 + (x / tmax) * 440;
  const Y = (v: number) => 200 - (v / s.V) * 170;
  const curva = Array.from({ length: 61 }, (_, k) => `${k ? "L" : "M"} ${X((k * tmax) / 60).toFixed(1)} ${Y(Vc((k * tmax) / 60)).toFixed(1)}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "El condensador almacena carga y tarda unas 5 constantes de tiempo (τ = R·C) en cargarse o descargarse del todo. Aumenta R o C y todo es más lento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión de la fuente" value={s.V} min={1} max={12} unit=" V" color={MANIM.yellow} onChange={(V) => setS((x) => ({ ...x, V }))} />
          <Slider label="Resistencia, R" value={s.R} min={1} max={100} unit=" kΩ" color={MANIM.orange} onChange={(R) => setS((x) => ({ ...x, R }))} />
          <Slider label="Capacidad, C" value={s.C} min={10} max={1000} step={10} unit=" µF" color={MANIM.blue} onChange={(C) => setS((x) => ({ ...x, C }))} />
          <Slider label="Instante (de 0 a 5τ)" value={s.t} min={0} max={100} unit=" %" color={MANIM.green} onChange={(tt) => setS((x) => ({ ...x, t: tt }))} />
          <Choice label="Proceso" items={[{ value: 0, label: "Carga" }, { value: 1, label: "Descarga" }]} value={s.desc ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, desc: v === 1 }))} />
        </>
      }
    >
      <Svg w={520} h={235} maxH={245} testId="tool-condensador">
        <line x1={50} y1={200} x2={500} y2={200} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={200} x2={50} y2={15} stroke={MANIM.muted} strokeWidth={2} />
        <path d={curva} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        <line x1={X(tau)} y1={200} x2={X(tau)} y2={Y(Vc(tau))} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={X(tau)} y={216} textAnchor="middle" fill={MANIM.yellow} fontSize={12}>
          τ
        </text>
        <circle cx={X(t)} cy={Y(Vc(t))} r={7} fill={MANIM.green} />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Constante de tiempo, τ = R·C">
          {f2(tau)} s
        </Stat>
        <Stat color={MANIM.green} label="Tensión del condensador">
          {f2(Vc(t))} V
        </Stat>
        <Stat color={MANIM.blue} label="Instante">
          {f2(t)} s
        </Stat>
        <Stat color={MANIM.purple} label="Tensión en τ">
          {f2(Vc(tau))} V ({s.desc ? "37" : "63"} %)
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 4.9 Reto: circuito con LED ───────────── */

const SERIE_R = [100, 150, 220, 330, 470, 680, 1000];

export function RetoLedExplorador({ block }: { block: ToolBlock }) {
  const init = { V: Math.round(num(block.params?.a, 9, 3, 12)), R: 2, nled: Math.round(num(block.params?.b, 1, 1, 3)) };
  const [s, setS] = useState(init);
  const vf = 2.0;
  const R = SERIE_R[s.R]!;
  const I = Math.max(0, (s.V - s.nled * vf) / R);
  const PR = I * I * R;
  const ok1 = I >= 0.008 && I <= 0.02;
  const ok2 = PR <= 0.25;
  const ok3 = s.V > s.nled * vf;
  const todo = ok1 && ok2 && ok3;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Reto: LED rojos (Vf ≈ 2 V) en serie con una resistencia. Cumple tres condiciones: corriente entre 8 y 20 mA, resistencia de ¼ W (≤ 0,25 W) y tensión suficiente para encenderlos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión de la fuente" value={s.V} min={3} max={12} unit=" V" color={MANIM.yellow} onChange={(V) => setS((x) => ({ ...x, V }))} />
          <Slider label="Número de LED en serie" value={s.nled} min={1} max={3} color={MANIM.red} onChange={(nled) => setS((x) => ({ ...x, nled }))} />
          <Choice label="Resistencia (serie E-6/E-12)" items={SERIE_R.map((r, i) => ({ value: i, label: `${r} Ω` }))} value={s.R} onChange={(r) => setS((x) => ({ ...x, R: r }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Intensidad, (V − n·Vf)/R">
          {fmtI(I)}
        </Stat>
        <Stat color={MANIM.orange} label="Potencia en la resistencia">
          {fmtEs(PR * 1000, 1)} mW
        </Stat>
        <Stat color={MANIM.blue} label="Resistencia calculada ideal">
          {s.V > s.nled * vf ? `${f0((s.V - s.nled * vf) / 0.015)} Ω (para 15 mA)` : "—"}
        </Stat>
      </Readout>
      <ul className="grid gap-1.5 text-[color:var(--stage-ink,#fff)]" data-testid="reto-criterios">
        {[
          { ok: ok3, t: "La fuente supera la suma de las tensiones umbral" },
          { ok: ok1, t: "Intensidad entre 8 y 20 mA" },
          { ok: ok2, t: "Potencia en la resistencia ≤ 0,25 W" },
        ].map((c) => (
          <li key={c.t} className="flex items-center gap-2">
            <span className="font-bold" style={{ color: c.ok ? MANIM.green : MANIM.red }}>
              {c.ok ? "✓" : "✗"}
            </span>
            {c.t}
          </li>
        ))}
      </ul>
      <Note>{todo ? "Reto superado: el circuito cumple las tres condiciones." : "Todavía no: ajusta la resistencia o el número de LED."} Seguridad: trabaja siempre con baja tensión y comprueba la polaridad antes de conectar.</Note>
    </Frame>
  );
}
