"use client";

import { useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

/** Etiquetas tal cual: llevan símbolos (ζ, ω, τ…) que las mayúsculas estropearían. */
const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Lazo abierto frente a lazo cerrado ───────────── */

export function LazoPerturbacionExplorador({ block }: { block: ToolBlock }) {
  const init = { r: num(block.params?.a, 50, 0, 100), d: num(block.params?.b, -20, -40, 40), k: num(block.params?.c, 10, 0.5, 50), g: 2 };
  const [s, setS] = useState(init);
  const yAbierto = s.r + s.d; // el mando está calibrado para u = r/G
  const yCerrado = (s.k * s.g * s.r + s.d) / (1 + s.k * s.g);
  const errCerrado = s.r - yCerrado;
  const bar = (v: number) => Math.max(0, Math.min(100, v));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Aplica una perturbación y compara: el lazo abierto la deja pasar entera; el cerrado la reduce 1 + Kp·G veces."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Referencia, r" value={s.r} min={0} max={100} step={5} unit=" %" color={MANIM.green} onChange={(r) => setS((x) => ({ ...x, r }))} />
          <Slider label="Perturbación, d" value={s.d} min={-40} max={40} step={5} unit=" %" color={MANIM.red} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Ganancia del regulador, Kp" value={s.k} min={0.5} max={50} step={0.5} format={f1} color={MANIM.blue} onChange={(k) => setS((x) => ({ ...x, k }))} />
          <Slider label="Ganancia de la planta, G" value={s.g} min={0.5} max={5} step={0.5} format={f1} color={MANIM.orange} onChange={(g) => setS((x) => ({ ...x, g }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Salida en lazo abierto, y = r + d">
          {f1(yAbierto)} %
        </Stat>
        <Stat color={MANIM.green} label="Salida en lazo cerrado">
          {f1(yCerrado)} %
        </Stat>
        <Stat color={MANIM.yellow} label="Error del lazo cerrado, e = r − y">
          {f1(errCerrado)} %
        </Stat>
      </Readout>
      <Svg w={520} h={110} maxH={120} testId="tool-lazo">
        {[
          { y: 14, v: yAbierto, c: MANIM.red, t: "abierto" },
          { y: 62, v: yCerrado, c: MANIM.green, t: "cerrado" },
        ].map((b) => (
          <g key={b.t}>
            <rect x={80} y={b.y} width={400} height={26} fill={MANIM.panel} rx={4} />
            <rect x={80} y={b.y} width={4 * bar(b.v)} height={26} fill={b.c} fillOpacity={0.75} rx={4} className="anim-t" />
            <text x={74} y={b.y + 18} textAnchor="end" fill={MANIM.muted} fontSize={13}>
              {b.t}
            </text>
          </g>
        ))}
        <line x1={80 + 4 * s.r} y1={6} x2={80 + 4 * s.r} y2={98} stroke={MANIM.yellow} strokeWidth={2.5} strokeDasharray="5 4" />
        <text x={80 + 4 * s.r} y={108} textAnchor="middle" fill={MANIM.yellow} fontSize={12}>
          referencia
        </text>
      </Svg>
      <MathRenderer text={`$y_{cerrado} = \\dfrac{K_p G\\,r + d}{1 + K_p G} = \\dfrac{${f1(s.k)}\\cdot ${f1(s.g)}\\cdot ${f1(s.r)} + (${f1(s.d)})}{1 + ${f1(s.k * s.g)}} = ${f1(yCerrado)}\\ \\%$`} className="text-lg" />
      <Note>Con ganancia grande el lazo cerrado se acerca a la referencia, pero nunca la alcanza del todo con un regulador solo proporcional (queda el <strong>offset</strong>). Y una ganancia excesiva acaba haciendo inestable al sistema real.</Note>
    </Frame>
  );
}

/* ───────────── Sistema de segundo orden: parámetros de la respuesta transitoria ───────────── */

function respuesta2(zeta: number, wn: number, t: number): number {
  if (t <= 0) {
    return 0;
  }
  if (Math.abs(zeta - 1) < 1e-6) {
    return 1 - (1 + wn * t) * Math.exp(-wn * t);
  }
  if (zeta < 1) {
    const wd = wn * Math.sqrt(1 - zeta * zeta);
    return 1 - Math.exp(-zeta * wn * t) * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta * zeta)) * Math.sin(wd * t));
  }
  const q = Math.sqrt(zeta * zeta - 1);
  const wd = wn * q;
  return 1 - Math.exp(-zeta * wn * t) * (Math.cosh(wd * t) + (zeta / q) * Math.sinh(wd * t));
}

export function SegundoOrdenExplorador({ block }: { block: ToolBlock }) {
  const init = { z: num(block.params?.a, 0.35, 0.1, 2), w: num(block.params?.b, 1.6, 0.5, 5) };
  const [s, setS] = useState(init);
  const m = useMemo(() => {
    const tmax = Math.max(8 / (s.z * s.w), 6 / s.w);
    const N = 400;
    const ys = Array.from({ length: N + 1 }, (_, i) => respuesta2(s.z, s.w, (tmax * i) / N));
    const ts = (i: number) => (tmax * i) / N;
    let t10 = NaN;
    let t90 = NaN;
    let tSet = 0;
    let peak = 0;
    ys.forEach((y, i) => {
      if (Number.isNaN(t10) && y >= 0.1) t10 = ts(i);
      if (Number.isNaN(t90) && y >= 0.9) t90 = ts(i);
      if (Math.abs(y - 1) > 0.02) tSet = ts(i);
      peak = Math.max(peak, y);
    });
    return { tmax, ys, t10, t90, tSet, mp: Math.max(0, peak - 1) * 100 };
  }, [s.z, s.w]);
  const tp = s.z < 1 ? Math.PI / (s.w * Math.sqrt(1 - s.z * s.z)) : NaN;
  const X = (t: number) => 40 + (t / m.tmax) * 460;
  const Y = (y: number) => 150 - 100 * Math.min(1.8, y);
  const d = m.ys.map((y, i) => `${i === 0 ? "M" : "L"} ${X((m.tmax * i) / 400).toFixed(1)} ${Y(y).toFixed(1)}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube el amortiguamiento ζ: la sobreoscilación desaparece, pero el sistema se vuelve más lento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Amortiguamiento, ζ" value={s.z} min={0.1} max={2} step={0.05} format={f2} color={MANIM.purple} onChange={(z) => setS((x) => ({ ...x, z }))} />
          <Slider label="Frecuencia natural, ωn" value={s.w} min={0.5} max={5} step={0.1} unit=" rad/s" format={f1} color={MANIM.blue} onChange={(w) => setS((x) => ({ ...x, w }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Sobreoscilación, MP">
          {f1(m.mp)} %
        </Stat>
        <Stat color={MANIM.red} label="Tiempo de pico, tp">
          {Number.isNaN(tp) ? "—" : `${f2(tp)} s`}
        </Stat>
        <Stat color={MANIM.purple} label="Subida 10–90 %, tr">
          {f2(m.t90 - m.t10)} s
        </Stat>
        <Stat color={MANIM.blue} label="Establecimiento ±2 %, ts">
          {f2(m.tSet)} s
        </Stat>
      </Readout>
      <Svg w={520} h={170} maxH={190} testId="tool-segundo-orden">
        <line x1={40} y1={150} x2={510} y2={150} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={150} x2={40} y2={10} stroke={MANIM.muted} strokeWidth={2} />
        <rect x={40} y={Y(1.02)} width={460} height={Y(0.98) - Y(1.02)} fill={MANIM.blue} fillOpacity={0.25} />
        <line x1={40} y1={Y(1)} x2={500} y2={Y(1)} stroke={MANIM.green} strokeWidth={1.5} strokeDasharray="5 5" />
        <path d={d} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
        <line x1={X(m.tSet)} y1={Y(1) - 20} x2={X(m.tSet)} y2={150} stroke={MANIM.blue} strokeWidth={1.5} strokeDasharray="4 4" />
        <text x={X(m.tSet)} y={166} textAnchor="middle" fill={MANIM.blue} fontSize={12}>
          ts
        </text>
      </Svg>
      <Note>
        {s.z < 1 ? "Subamortiguado: oscila antes de asentarse. " : s.z === 1 ? "Amortiguamiento crítico: la respuesta más rápida sin sobreoscilación. " : "Sobreamortiguado: sin oscilar, pero lento. "}
        En un sistema real, ζ pequeño significa poco amortiguamiento y riesgo de inestabilidad.
      </Note>
    </Frame>
  );
}

/* ───────────── Álgebra de bloques ───────────── */

export function BloquesExplorador({ block }: { block: ToolBlock }) {
  const init = { cfg: "serie" as "serie" | "paralelo" | "anillo" | "anilloH", g1: num(block.params?.a, 2, 0.1, 10), g2: num(block.params?.b, 3, 0.1, 10), h: num(block.params?.c, 0.5, 0.1, 5) };
  const [s, setS] = useState(init);
  const r = {
    serie: { g: s.g1 * s.g2, tex: `G_1 G_2 = ${f2(s.g1)}\\cdot ${f2(s.g2)}` },
    paralelo: { g: s.g1 + s.g2, tex: `G_1 + G_2 = ${f2(s.g1)} + ${f2(s.g2)}` },
    anillo: { g: s.g1 / (1 + s.g1), tex: `\\dfrac{G_1}{1+G_1} = \\dfrac{${f2(s.g1)}}{1+${f2(s.g1)}}` },
    anilloH: { g: s.g1 / (1 + s.g1 * s.h), tex: `\\dfrac{G_1}{1+G_1 H} = \\dfrac{${f2(s.g1)}}{1+${f2(s.g1)}\\cdot ${f2(s.h)}}` },
  }[s.cfg];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el tipo de conexión y mira cómo se combinan los bloques: producto, suma o G/(1+GH)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice
            label="Conexión"
            value={s.cfg}
            onChange={(cfg) => setS((x) => ({ ...x, cfg }))}
            items={[
              { value: "serie" as const, label: "Serie" },
              { value: "paralelo" as const, label: "Paralelo" },
              { value: "anillo" as const, label: "Anillo directo" },
              { value: "anilloH" as const, label: "Anillo con H" },
            ]}
          />
          <Slider label="Bloque G₁" value={s.g1} min={0.1} max={10} step={0.1} format={f1} color={MANIM.blue} onChange={(g1) => setS((x) => ({ ...x, g1 }))} />
          <Slider label="Bloque G₂" value={s.g2} min={0.1} max={10} step={0.1} format={f1} color={MANIM.green} disabled={s.cfg === "anillo" || s.cfg === "anilloH"} onChange={(g2) => setS((x) => ({ ...x, g2 }))} />
          <Slider label="Realimentación, H" value={s.h} min={0.1} max={5} step={0.1} format={f1} color={MANIM.purple} disabled={s.cfg !== "anilloH"} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Función de transferencia equivalente, V/U">
          {f2(r.g)}
        </Stat>
      </Readout>
      <MathRenderer text={`$\\dfrac{V}{U} = ${r.tex} = ${f2(r.g)}$`} className="text-lg" />
      <Note>Los bloques de ganancia estática se tratan como números; con funciones de s, las reglas son exactamente las mismas. El lazo cerrado con realimentación negativa siempre «frena» la ganancia: divide por 1 + G·H.</Note>
    </Frame>
  );
}

/* ───────────── Criterio de Routh (ecuación de grado 4) ───────────── */

export function RouthExplorador({ block }: { block: ToolBlock }) {
  const init = { a1: num(block.params?.a, 3, 0, 10), a2: num(block.params?.b, 3, 0, 10), a3: num(block.params?.c, 2, 0, 10), a4: num(block.params?.n, 0.5, 0, 10) };
  const [s, setS] = useState(init);
  const { rows, cambios, estable, especial } = useMemo(() => {
    const { a1, a2, a3, a4 } = s;
    const b1 = a1 > 1e-9 ? (a1 * a2 - a3) / a1 : NaN;
    const b2 = a4;
    const c1 = Math.abs(b1) > 1e-9 ? (b1 * a3 - a1 * b2) / b1 : NaN;
    const d1 = a4;
    const filas = [
      { n: "s⁴", v: [1, a2, a4] },
      { n: "s³", v: [a1, a3, 0] },
      { n: "s²", v: [b1, b2, 0] },
      { n: "s¹", v: [c1, 0, 0] },
      { n: "s⁰", v: [d1, 0, 0] },
    ];
    const col = filas.map((f) => f.v[0]!);
    const especial = col.some((v) => !Number.isFinite(v) || Math.abs(v) < 1e-9);
    let cambios = 0;
    for (let i = 1; i < col.length; i++) {
      if (Number.isFinite(col[i]) && Number.isFinite(col[i - 1]!) && col[i]! * col[i - 1]! < 0) cambios++;
    }
    return { rows: filas, cambios, estable: !especial && cambios === 0, especial };
  }, [s]);
  const cell = (v: number) => (Number.isFinite(v) ? f2(v) : "?");
  const sl = (label: string, k: "a1" | "a2" | "a3" | "a4", color: string) => (
    <Slider label={label} value={s[k]} min={0} max={10} step={0.1} format={f1} color={color} onChange={(v) => setS((x) => ({ ...x, [k]: v }))} />
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube a₄ (la «K» del ejemplo del libro) hasta que la primera columna cambie de signo: ahí se pierde la estabilidad."}
      onReset={() => setS(init)}
      controls={
        <>
          {sl("Coeficiente a₁ (s³)", "a1", MANIM.blue)}
          {sl("Coeficiente a₂ (s²)", "a2", MANIM.green)}
          {sl("Coeficiente a₃ (s)", "a3", MANIM.orange)}
          {sl("Coeficiente a₄ (término libre, K)", "a4", MANIM.red)}
        </>
      }
    >
      <MathRenderer text={`$s^4 + ${f1(s.a1)}\\,s^3 + ${f1(s.a2)}\\,s^2 + ${f1(s.a3)}\\,s + ${f1(s.a4)} = 0$`} className="text-lg" />
      <table className="mx-auto w-full max-w-md border-collapse text-center text-base tabular-nums" data-testid="tool-routh-tabla">
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.n} className="border-b border-white/10">
              <th className="px-3 py-1 text-left font-semibold text-[color:var(--stage-muted,#b8c2d0)]">{r.n}</th>
              <td className="px-3 py-1 font-bold" style={{ color: MANIM.yellow }}>
                {cell(r.v[0]!)}
              </td>
              <td className="px-3 py-1">{i < 3 ? cell(r.v[1]!) : ""}</td>
              <td className="px-3 py-1">{i < 2 ? cell(r.v[2]!) : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Readout>
        <Stat color={cambios === 0 ? MANIM.green : MANIM.red} label="Cambios de signo en la 1.ª columna">
          {cambios} {cambios === 1 ? "cambio" : "cambios"}
        </Stat>
        <Stat color={estable ? MANIM.green : MANIM.red} label="Veredicto">
          {estable ? "Estable" : especial ? "Caso especial / límite" : `Inestable (${cambios} raíces con parte real > 0)`}
        </Stat>
      </Readout>
      <Note>Con a₁ = 3, a₂ = 3 y a₃ = 2 (el sistema de la figura 10.36), el sistema es estable solo para 0 &lt; K &lt; 14/9 ≈ 1,56.</Note>
    </Frame>
  );
}

/* ───────────── Regulador PID sobre un proceso de segundo orden ───────────── */

type Modo = "P" | "PI" | "PD" | "PID";

function simulaPID(kp: number, ti: number, td: number, modo: Modo) {
  const dt = 0.005;
  const T = 25;
  const tau1 = 1;
  const tau2 = 0.5;
  let y = 0;
  let dy = 0;
  let integ = 0;
  const out: number[] = [];
  for (let i = 0; i <= T / dt; i++) {
    const e = 1 - y;
    integ += e * dt;
    const pi = modo === "PI" || modo === "PID" ? integ / ti : 0;
    const dd = modo === "PD" || modo === "PID" ? -td * dy : 0;
    const u = Math.max(-50, Math.min(50, kp * (e + pi + dd)));
    const ddy = (u - y - (tau1 + tau2) * dy) / (tau1 * tau2);
    dy += ddy * dt;
    y += dy * dt;
    if (!Number.isFinite(y) || Math.abs(y) > 1e4) {
      y = Math.sign(y || 1) * 1e4;
      dy = 0;
    }
    if (i % 25 === 0) out.push(y);
  }
  return { out, dt: dt * 25, T };
}

export function PidExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: "P" as Modo, kp: num(block.params?.a, 4, 0.5, 30), ti: num(block.params?.b, 2, 0.2, 10), td: num(block.params?.c, 0.5, 0, 2) };
  const [s, setS] = useState(init);
  const sim = useMemo(() => simulaPID(s.kp, s.ti, s.td, s.modo), [s]);
  const final = sim.out[sim.out.length - 1]!;
  const peak = Math.max(...sim.out);
  const ref = Math.abs(final) > 1e-6 ? final : 1;
  const mp = final > 0 ? Math.max(0, (peak - final) / final) * 100 : 0;
  let tSet = 0;
  sim.out.forEach((y, i) => {
    if (Math.abs(y - final) > 0.02 * Math.abs(ref)) tSet = i * sim.dt;
  });
  const diverge = !Number.isFinite(final) || Math.abs(final) > 50 || tSet > sim.T - 2;
  const X = (t: number) => 40 + (t / sim.T) * 460;
  const Y = (y: number) => 150 - 80 * Math.max(-0.3, Math.min(2, y));
  const d = sim.out.map((y, i) => `${i === 0 ? "M" : "L"} ${X(i * sim.dt).toFixed(1)} ${Y(y).toFixed(1)}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Con solo P, ¿cuánto vale el error permanente? Añade I para eliminarlo y D para amortiguar las oscilaciones."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice
            label="Acciones del regulador"
            value={s.modo}
            onChange={(modo) => setS((x) => ({ ...x, modo }))}
            items={[
              { value: "P" as const, label: "P" },
              { value: "PI" as const, label: "PI" },
              { value: "PD" as const, label: "PD" },
              { value: "PID" as const, label: "PID" },
            ]}
          />
          <Slider label="Ganancia proporcional, Kp" value={s.kp} min={0.5} max={30} step={0.5} format={f1} color={MANIM.blue} onChange={(kp) => setS((x) => ({ ...x, kp }))} />
          <Slider label="Tiempo integral, ti" value={s.ti} min={0.2} max={10} step={0.2} unit=" s" format={f1} color={MANIM.green} disabled={s.modo === "P" || s.modo === "PD"} onChange={(ti) => setS((x) => ({ ...x, ti }))} />
          <Slider label="Tiempo derivativo, td" value={s.td} min={0} max={2} step={0.1} unit=" s" format={f1} color={MANIM.orange} disabled={s.modo === "P" || s.modo === "PI"} onChange={(td) => setS((x) => ({ ...x, td }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Valor final de la salida">
          {diverge && Math.abs(final) > 50 ? "diverge" : f2(final)}
        </Stat>
        <Stat color={MANIM.red} label="Error permanente">
          {diverge && Math.abs(final) > 50 ? "—" : `${f2(1 - final)}`}
        </Stat>
        <Stat color={MANIM.purple} label="Sobreoscilación (sobre el valor final)">
          {f1(Math.min(mp, 999))} %
        </Stat>
        <Stat color={MANIM.blue} label="Establecimiento ±2 % del valor final">
          {diverge ? "no se asienta" : `${f1(tSet)} s`}
        </Stat>
      </Readout>
      <Svg w={520} h={170} maxH={190} testId="tool-pid">
        <line x1={40} y1={150} x2={510} y2={150} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={150} x2={40} y2={10} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={Y(1)} x2={500} y2={Y(1)} stroke={MANIM.green} strokeWidth={1.5} strokeDasharray="5 5" />
        <text x={500} y={Y(1) - 5} textAnchor="end" fill={MANIM.green} fontSize={12}>
          consigna
        </text>
        <path d={d} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
      </Svg>
      <Note>Proceso: dos retardos de primer orden, Gp = 1/((s+1)(0,5·s+1)). P solo deja un error permanente de 1/(1+Kp); la integral lo anula; la derivada frena las oscilaciones (aplicada sobre la medida).</Note>
    </Frame>
  );
}
