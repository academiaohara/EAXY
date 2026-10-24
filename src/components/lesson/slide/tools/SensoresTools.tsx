"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const f3 = (v: number) => fmtEs(v, 3);

/* ───────────── Cálculos puros (se prueban aparte) ───────────── */

/** Conversor A/D de 0 a `full` voltios con `bits` bits: intervalo, código, resolución. */
export function quantAd(volts: number, bits: number, full = 12) {
  const n = 2 ** bits;
  const step = full / n;
  const code = Math.min(n - 1, Math.max(0, Math.floor(volts / step)));
  return { n, step, code, low: code * step, high: (code + 1) * step, binary: code.toString(2).padStart(bits, "0") };
}

/** Galga extensométrica: tensión, deformación unitaria y resistencia nueva. */
export function galgaR(force: number, section: number, young: number, k: number, r0: number) {
  const sigma = force / section;
  const eps = sigma / young;
  return { sigma, eps, r: r0 * (1 + k * eps) };
}

/** Termorresistencia R_T = R₀(1 + αT). */
export const rtd = (r0: number, alpha: number, t: number) => r0 * (1 + alpha * t);

/** Operacional ideal con saturación a ±vcc. */
export function opamp(mode: "inv" | "comp", r1: number, r2: number, v1: number, v2: number, vcc = 15) {
  const raw = mode === "inv" ? -(r2 / r1) * v1 : (r2 / r1) * (v2 - v1);
  return { raw, out: Math.max(-vcc, Math.min(vcc, raw)), saturated: Math.abs(raw) > vcc };
}

/* ───────────── 1. Conversión A/D ───────────── */

export function CuantizacionAdExplorador({ block }: { block: ToolBlock }) {
  const init = { vol: num(block.params?.a, 35, 0, 60), bits: Math.round(num(block.params?.b, 3, 1, 8)) };
  const [s, setS] = useState(init);
  const volts = 0.2 * s.vol;
  const q = quantAd(volts, s.bits);
  const X = (l: number) => 60 + (l / 60) * 420;
  const Y = (v: number) => 170 - (v / 12) * 140;
  const stairs = Array.from({ length: q.n }, (_, i) => {
    const y = ((i + 0.5) * 12) / q.n;
    return `${i ? "L" : "M"} ${X((60 * i) / q.n)} ${Y(y)} L ${X((60 * (i + 1)) / q.n)} ${Y(y)}`;
  }).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube los bits y mira cómo se estrecha el escalón; mueve el volumen y fíjate en qué intervalo cae."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Volumen en el depósito" value={s.vol} min={0} max={60} step={1} unit=" L" color={MANIM.blue} onChange={(vol) => setS((x) => ({ ...x, vol }))} />
          <Slider label="Bits del conversor A/D" value={s.bits} min={1} max={8} step={1} color={MANIM.orange} onChange={(bits) => setS((x) => ({ ...x, bits }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Señal analógica, V = 0,2 · volumen">
          {f1(volts)} V
        </Stat>
        <Stat color={MANIM.orange} label={`Intervalos, 2^${s.bits}`}>
          {f0(q.n)}
        </Stat>
        <Stat color={MANIM.green} label="Resolución, 12 / 2^n">
          {f3(q.step)} V
        </Stat>
        <Stat color={MANIM.yellow} label="Código de salida">
          {q.binary}
        </Stat>
      </Readout>
      <Svg w={520} h={200} maxH={210} testId="tool-ad">
        <line x1={60} y1={170} x2={490} y2={170} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={60} y1={170} x2={60} y2={20} stroke={MANIM.muted} strokeWidth={2} />
        <path d={`M ${X(0)} ${Y(0)} L ${X(60)} ${Y(12)}`} stroke={MANIM.blue} strokeWidth={3} fill="none" />
        <path d={stairs} stroke={MANIM.orange} strokeWidth={q.n > 32 ? 2 : 3} fill="none" />
        <rect x={X((60 * q.code) / q.n)} y={Y(q.high)} width={X(60 / q.n) - X(0)} height={Y(q.low) - Y(q.high)} fill={MANIM.yellow} fillOpacity={0.35} />
        <line x1={X(s.vol)} y1={170} x2={X(s.vol)} y2={Y(volts)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 4" />
        <circle cx={X(s.vol)} cy={Y(volts)} r={5} fill={MANIM.yellow} />
        <text x={485} y={190} textAnchor="end" fill={MANIM.muted} fontSize={13}>
          volumen (L)
        </text>
        <text x={66} y={26} fill={MANIM.muted} fontSize={13}>
          12 V
        </text>
      </Svg>
      <MathRenderer text={`$${f1(volts)}\\ \\mathrm{V}\\ \\in\\ [${f3(q.low)}\\,;\\,${f3(q.high)}]\\ \\mathrm{V}\\ \\Rightarrow\\ \\text{código } ${q.code}_{(10)} = ${q.binary}_{(2)}$`} className="text-lg" />
      <Note>Cada bit que se añade duplica el número de intervalos y reduce a la mitad la resolución. Con 8 bits el escalón es de 0,047 V: casi una recta.</Note>
    </Frame>
  );
}

/* ───────────── 2. Propiedades de un sensor: no linealidad e histéresis ───────────── */

export function SensorCurvaExplorador({ block }: { block: ToolBlock }) {
  const init = { nl: num(block.params?.a, 3.6, 0, 6), hy: num(block.params?.b, 3, 0, 6), x: num(block.params?.c, 30, 0, 60) };
  const [s, setS] = useState(init);
  const RANGE = 60;
  const bump = (l: number) => Math.sin((Math.PI * l) / RANGE);
  const up = (l: number) => l + s.nl * bump(l) - (s.hy / 2) * bump(l);
  const down = (l: number) => l + s.nl * bump(l) + (s.hy / 2) * bump(l);
  const X = (l: number) => 50 + (l / RANGE) * 430;
  const Y = (v: number) => 190 - (v / RANGE) * 160;
  const path = (f: (l: number) => number) => Array.from({ length: 61 }, (_, l) => `${l ? "L" : "M"} ${X(l)} ${Y(f(l))}`).join(" ");
  const sens = 0.2;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Aumenta la curvatura y el ciclo de histéresis: el sensor se aleja de la recta ideal y lee distinto al subir que al bajar."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Desviación máxima de la recta" value={s.nl} min={0} max={6} step={0.1} unit=" L" format={f1} color={MANIM.orange} onChange={(nl) => setS((x) => ({ ...x, nl }))} />
          <Slider label="Diferencia subida / bajada" value={s.hy} min={0} max={6} step={0.1} unit=" L" format={f1} color={MANIM.purple} onChange={(hy) => setS((x) => ({ ...x, hy }))} />
          <Slider label="Volumen real" value={s.x} min={0} max={60} step={1} unit=" L" color={MANIM.blue} onChange={(x) => setS((v) => ({ ...v, x }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Sensibilidad (pendiente)">
          {f1(sens)} V/L
        </Stat>
        <Stat color={MANIM.orange} label="No linealidad">
          {f1((s.nl / RANGE) * 100)} %
        </Stat>
        <Stat color={MANIM.purple} label="Histéresis">
          {f1((s.hy / RANGE) * 100)} %
        </Stat>
      </Readout>
      <Svg w={520} h={215} maxH={230} testId="tool-curva">
        <line x1={50} y1={190} x2={490} y2={190} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={190} x2={50} y2={20} stroke={MANIM.muted} strokeWidth={2} />
        <path d={`M ${X(0)} ${Y(0)} L ${X(RANGE)} ${Y(RANGE)}`} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 5" fill="none" />
        <path d={path(up)} stroke={MANIM.green} strokeWidth={3} fill="none" />
        <path d={path(down)} stroke={MANIM.red} strokeWidth={3} fill="none" />
        <line x1={X(s.x)} y1={190} x2={X(s.x)} y2={Y(down(s.x))} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="4 4" />
        <circle cx={X(s.x)} cy={Y(up(s.x))} r={5} fill={MANIM.green} />
        <circle cx={X(s.x)} cy={Y(down(s.x))} r={5} fill={MANIM.red} />
        <text x={485} y={208} textAnchor="end" fill={MANIM.muted} fontSize={13}>
          magnitud real
        </text>
        <text x={58} y={26} fill={MANIM.muted} fontSize={13}>
          lectura
        </text>
        <text x={X(40) + 6} y={Y(up(40)) + 30} fill={MANIM.green} fontSize={13}>
          creciente
        </text>
        <text x={X(12)} y={Y(down(12)) - 14} fill={MANIM.red} fontSize={13}>
          decreciente
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label={`Lectura al subir hasta ${f0(s.x)} L`}>
          {f1(up(s.x))} L ({f2(up(s.x) * sens)} V)
        </Stat>
        <Stat color={MANIM.red} label={`Lectura al bajar hasta ${f0(s.x)} L`}>
          {f1(down(s.x))} L ({f2(down(s.x) * sens)} V)
        </Stat>
      </Readout>
      <Note>Porcentaje = máxima diferencia / rango de medida × 100, con el rango de 60 L. La repetibilidad se calcula igual, pero comparando varias medidas seguidas del mismo valor.</Note>
    </Frame>
  );
}

/* ───────────── 4. ¿Qué detector de proximidad usar? ───────────── */

const OBJETOS = [
  { value: "acero", label: "Pieza de acero", metal: true, opaco: true },
  { value: "aluminio", label: "Aluminio", metal: true, opaco: true },
  { value: "plastico", label: "Plástico", metal: false, opaco: true },
  { value: "madera", label: "Madera", metal: false, opaco: true },
  { value: "agua", label: "Líquido", metal: false, opaco: true },
  { value: "cereal", label: "Cereal (grano)", metal: false, opaco: true },
] as const;

export function SensorProximidadExplorador({ block }: { block: ToolBlock }) {
  const init = { obj: OBJETOS[Math.round(num(block.params?.a, 0, 0, OBJETOS.length - 1))]!.value as string, d: num(block.params?.b, 15, 1, 300) };
  const [s, setS] = useState(init);
  const o = OBJETOS.find((x) => x.value === s.obj) ?? OBJETOS[0]!;
  const rows = [
    { name: "Inductivo", c: MANIM.blue, ok: o.metal && s.d <= 40, why: !o.metal ? "solo reacciona frente a metales" : s.d > 40 ? "alcance máximo 40 mm" : "campo magnético y corrientes de Foucault" },
    { name: "Capacitivo", c: MANIM.green, ok: s.d <= 40, why: s.d > 40 ? "alcance máximo 40 mm" : "detecta metales, líquidos, polvo y grano; no con productos adherentes" },
    { name: "Óptico de proximidad", c: MANIM.orange, ok: s.d <= 200, why: s.d > 200 ? "los sensores ópticos llegan a 200 mm" : "la luz infrarroja rebota en el objeto" },
    { name: "Célula fotoeléctrica", c: MANIM.purple, ok: true, why: "barrera 200 m, reflexión 10 m, proximidad 15 m" },
  ];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el material y la distancia y mira qué familias de detectores sirven y por qué las otras no."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={OBJETOS.map((x) => ({ value: x.value, label: x.label }))} value={s.obj} onChange={(obj) => setS((x) => ({ ...x, obj }))} label="Objeto a detectar" />
          <Slider label="Distancia al objeto" value={s.d} min={1} max={300} step={1} unit=" mm" color={MANIM.yellow} onChange={(d) => setS((x) => ({ ...x, d }))} />
        </>
      }
    >
      <ul className="flex flex-col gap-2" data-testid="tool-prox">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-3 rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-2">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: r.ok ? MANIM.green : MANIM.red }} aria-hidden />
            <span className="w-44 shrink-0 font-semibold" style={{ color: r.c }}>
              {r.name}
            </span>
            <span className="font-bold" style={{ color: r.ok ? MANIM.green : MANIM.red }}>
              {r.ok ? "Detecta" : "No detecta"}
            </span>
            <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">{r.why}</span>
          </li>
        ))}
      </ul>
      <Note>Los inductivos son los más robustos con metales; los capacitivos se usan cuando el material no es metálico. Más allá de 200 mm solo quedan las células fotoeléctricas.</Note>
    </Frame>
  );
}

/* ───────────── 5. Potenciómetro como transductor de nivel ───────────── */

export function PotenciometroDivisorExplorador({ block }: { block: ToolBlock }) {
  const init = { h: num(block.params?.a, 2.4, 0, 6) };
  const [s, setS] = useState(init);
  const H = 6;
  const D = 3;
  const vol = (Math.PI * (D / 2) ** 2) * s.h;
  const volMax = (Math.PI * (D / 2) ** 2) * H;
  const volts = (12 * s.h) / H;
  const yLevel = 200 - (s.h / H) * 150;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube el nivel: el flotador arrastra el cursor del reóstato y la tensión es proporcional a la altura."}
      onReset={() => setS(init)}
      controls={<Slider label="Altura del líquido" value={s.h} min={0} max={H} step={0.1} unit=" m" format={f1} color={MANIM.blue} onChange={(h) => setS({ h })} />}
    >
      <Readout>
        <Stat color={MANIM.blue} label="Volumen">
          {f1(vol)} m³ ({f0(vol * 1000)} L)
        </Stat>
        <Stat color={MANIM.yellow} label="Tensión V = 12 · h / h₀">
          {f2(volts)} V
        </Stat>
        <Stat color={MANIM.green} label="Llenado">
          {f0((vol / volMax) * 100)} %
        </Stat>
      </Readout>
      <Svg w={520} h={230} maxH={240} testId="tool-pot">
        <rect x={60} y={50} width={140} height={150} fill="none" stroke={MANIM.muted} strokeWidth={3} />
        <rect x={61.5} y={yLevel} width={137} height={200 - yLevel} fill={MANIM.blue} fillOpacity={0.45} className="anim-t" />
        <circle cx={130 + 0} cy={yLevel} r={9} fill={MANIM.orange} className="anim-t" />
        <line x1={130} y1={yLevel} x2={290} y2={yLevel} stroke={MANIM.orange} strokeWidth={3} className="anim-t" />
        {/* reóstato */}
        <rect x={290} y={50} width={26} height={150} rx={4} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
        <polygon points={`316,${yLevel} 336,${yLevel - 8} 336,${yLevel + 8}`} fill={MANIM.orange} className="anim-t" />
        <text x={300} y={40} textAnchor="middle" fill={MANIM.yellow} fontSize={14}>
          12 V
        </text>
        <text x={300} y={218} textAnchor="middle" fill={MANIM.yellow} fontSize={14}>
          0 V
        </text>
        <text x={350} y={yLevel + 5} fill={MANIM.yellow} fontSize={16} fontWeight={700}>
          V = {f2(volts)} V
        </text>
        <text x={130} y={226} textAnchor="middle" fill={MANIM.muted} fontSize={13}>
          depósito Ø 3 m, h₀ = 6 m
        </text>
      </Svg>
      <Note>Como el depósito es cilíndrico, volumen y altura son proporcionales y la escala del voltímetro es lineal: cada décima del volumen (4,24 m³) corresponde a 1,2 V.</Note>
    </Frame>
  );
}

/* ───────────── 6. Galga extensométrica ───────────── */

export function GalgaDeformacionExplorador({ block }: { block: ToolBlock }) {
  const init = { F: num(block.params?.a, 10000, 0, 30000), S: num(block.params?.b, 30, 10, 100), K: num(block.params?.c, 2.5, 1.5, 4) };
  const [s, setS] = useState(init);
  const E = 220000;
  const R0 = 5000;
  const g = galgaR(s.F, s.S, E, s.K, R0);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Carga la pletina con más fuerza o reduce su sección: crece la deformación y la resistencia de la galga sube."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza de tracción, F" value={s.F} min={0} max={30000} step={500} unit=" N" format={f0} color={MANIM.red} onChange={(F) => setS((x) => ({ ...x, F }))} />
          <Slider label="Sección de la pletina, S" value={s.S} min={10} max={100} step={5} unit=" mm²" color={MANIM.blue} onChange={(S) => setS((x) => ({ ...x, S }))} />
          <Slider label="Factor de galga, K" value={s.K} min={1.5} max={4} step={0.1} format={f1} color={MANIM.orange} onChange={(K) => setS((x) => ({ ...x, K }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="σ = F / S">
          {f1(g.sigma)} N/mm²
        </Stat>
        <Stat color={MANIM.orange} label="ε = σ / E">
          {fmtEs(g.eps, 5)}
        </Stat>
        <Stat color={MANIM.green} label="R = R₀(1 + K·ε)">
          {f1(g.r)} Ω
        </Stat>
        <Stat color={MANIM.yellow} label="ΔR">
          {f2(g.r - R0)} Ω
        </Stat>
      </Readout>
      <MathRenderer text={`$R = 5000\\,(1 + ${f1(s.K)}\\cdot ${fmtEs(g.eps, 5)}) = ${f1(g.r)}\\ \\Omega$`} className="text-lg" />
      <Note>Acero con E = 220 000 N/mm² y galga de 5000 Ω. El cambio relativo de resistencia es K·ε: una milésima de deformación solo cambia la resistencia un 0,25 %, por eso se mide con puentes y amplificadores.</Note>
    </Frame>
  );
}

/* ───────────── 7. Encoder y tacómetro ───────────── */

export function EncoderRpmExplorador({ block }: { block: ToolBlock }) {
  const init = { N: Math.round(num(block.params?.a, 12, 4, 120)), n: num(block.params?.b, 600, 0, 3000) };
  const [s, setS] = useState(init);
  const f = (s.N * s.n) / 60;
  const omega = (2 * Math.PI * s.n) / 60;
  const KB = 0.05;
  const shown = Math.min(s.N, 60);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Más ranuras dan más resolución angular; más rpm dan más impulsos por segundo. El tacómetro entrega una tensión proporcional a ω."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ranuras del disco, N" value={s.N} min={4} max={120} step={4} color={MANIM.yellow} onChange={(N) => setS((x) => ({ ...x, N }))} />
          <Slider label="Velocidad del eje, n" value={s.n} min={0} max={3000} step={30} unit=" rpm" format={f0} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Frecuencia, f = N·n/60">
          {f0(f)} Hz
        </Stat>
        <Stat color={MANIM.yellow} label="Ángulo por impulso, 360°/N">
          {f2(360 / s.N)}°
        </Stat>
        <Stat color={MANIM.purple} label="Tacómetro, e = K·B·ω">
          {f2(KB * omega)} V
        </Stat>
      </Readout>
      <Svg w={520} h={190} maxH={200} testId="tool-encoder">
        <circle cx={130} cy={95} r={80} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={4} />
        {Array.from({ length: shown }, (_, i) => {
          const a = (i * 360) / shown;
          return <rect key={i} x={130 - 3} y={95 - 70} width={6} height={20} rx={2} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={1.5} transform={`rotate(${a} 130 95)`} />;
        })}
        <circle cx={130} cy={95} r={8} fill={MANIM.ink} />
        <text x={250} y={70} fill={MANIM.muted} fontSize={14}>
          ω = {f1(omega)} rad/s
        </text>
        <text x={250} y={100} fill={MANIM.green} fontSize={14}>
          tiempo entre impulsos: {f > 0 ? `${f2(1000 / f)} ms` : "—"}
        </text>
        <text x={250} y={130} fill={MANIM.purple} fontSize={14}>
          K·B = 0,05 V·s/rad (valor de ejemplo)
        </text>
      </Svg>
      <Note>{s.N > 60 ? "Con más de 60 ranuras el dibujo muestra solo 60. " : ""}Para conocer la velocidad hay que contar los impulsos en un tiempo conocido (reloj): n = 60·f/N.</Note>
    </Frame>
  );
}

/* ───────────── 8. Termorresistencia y puente de Wheatstone ───────────── */

const METALES = [
  { value: "pt", label: "Platino (hasta 750 °C)", alpha: 0.00385, max: 750 },
  { value: "ni", label: "Níquel (hasta 150 °C)", alpha: 0.00618, max: 150 },
  { value: "cu", label: "Cobre (hasta 150 °C)", alpha: 0.00427, max: 150 },
] as const;

export function TermorresistenciaPuenteExplorador({ block }: { block: ToolBlock }) {
  const init = { m: "pt" as string, T: num(block.params?.a, 150, -50, 750) };
  const [s, setS] = useState(init);
  const mat = METALES.find((x) => x.value === s.m) ?? METALES[0]!;
  const R0 = 100;
  const Rx = rtd(R0, mat.alpha, s.T);
  const R1 = (100 * 100) / Rx;
  const fuera = s.T > mat.max;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la temperatura y el metal: la resistencia crece casi linealmente y el puente se equilibra con otro valor de R₁."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={METALES.map((x) => ({ value: x.value, label: x.label }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} label="Material del sensor (R₀ = 100 Ω a 0 °C)" />
          <Slider label="Temperatura, T" value={s.T} min={-50} max={750} step={10} unit=" °C" color={MANIM.red} onChange={(T) => setS((x) => ({ ...x, T }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Resistencia, R_T = R₀(1 + α·T)">
          {f1(Rx)} Ω
        </Stat>
        <Stat color={MANIM.green} label="R₁ que equilibra el puente (R₂ = R₃ = 100 Ω)">
          {f1(R1)} Ω
        </Stat>
        <Stat color={MANIM.blue} label="α">
          {fmtEs(mat.alpha * 1000, 2)}·10⁻³ °C⁻¹
        </Stat>
      </Readout>
      <MathRenderer text={`$R_x = \\dfrac{R_2 R_3}{R_1}\\ \\Rightarrow\\ R_1 = \\dfrac{100\\cdot 100}{${f1(Rx)}} = ${f1(R1)}\\ \\Omega$`} className="text-lg" />
      {fuera ? <Note>Fuera del rango de trabajo de este metal: la relación deja de ser fiable y el hilo puede dañarse.</Note> : <Note>Para trabajos industriales la termorresistencia suele ser de 100 Ω. El platino es el más estable; níquel y cobre se usan hasta 150 °C.</Note>}
    </Frame>
  );
}

/* ───────────── 9. Detector de error: puente de potenciómetros ───────────── */

export function PuentePotenciometrosExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: "lin" as string, f1: num(block.params?.a, 70, 0, 100) / 100, f2: num(block.params?.b, 40, 0, 100) / 100 };
  const [s, setS] = useState(init);
  const V = 10;
  const circ = s.modo === "circ";
  const span = circ ? 360 : 100;
  const e = V * (s.f1 - s.f2);
  const x1 = Math.round(s.f1 * span);
  const x2 = Math.round(s.f2 * span);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve los dos cursores: el error cambia de signo según cuál esté más adelantado y vale 0 cuando coinciden."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={[{ value: "lin", label: "Lineales (l = 100 mm)" }, { value: "circ", label: "Circulares (360°)" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} label="Potenciómetros" />
          <Slider label={circ ? "Posición 1, φ₁" : "Posición 1, X₁"} value={x1} min={0} max={span} step={circ ? 5 : 1} unit={circ ? "°" : " mm"} color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, f1: v / span }))} />
          <Slider label={circ ? "Posición 2, φ₂" : "Posición 2, X₂"} value={x2} min={0} max={span} step={circ ? 5 : 1} unit={circ ? "°" : " mm"} color={MANIM.orange} onChange={(v) => setS((x) => ({ ...x, f2: v / span }))} />
        </>
      }
    >
      <Readout>
        <Stat color={e > 0.0001 ? MANIM.green : e < -0.0001 ? MANIM.red : MANIM.yellow} label="Señal de error, e">
          {f2(e)} V
        </Stat>
        <Stat color={MANIM.muted} label="Alimentación">
          {V} V
        </Stat>
      </Readout>
      <Svg w={520} h={110} maxH={120} testId="tool-error">
        <rect x={60} y={20} width={400} height={16} rx={6} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={2} />
        <rect x={60} y={64} width={400} height={16} rx={6} fill={MANIM.panel} stroke={MANIM.orange} strokeWidth={2} />
        <polygon points={`${60 + 400 * s.f1},40 ${52 + 400 * s.f1},54 ${68 + 400 * s.f1},54`} fill={MANIM.blue} className="anim-t" />
        <polygon points={`${60 + 400 * s.f2},60 ${52 + 400 * s.f2},46 ${68 + 400 * s.f2},46`} fill={MANIM.orange} className="anim-t" />
        <text x={470} y={34} fill={MANIM.blue} fontSize={13}>
          {circ ? "φ₁" : "X₁"}
        </text>
        <text x={470} y={78} fill={MANIM.orange} fontSize={13}>
          {circ ? "φ₂" : "X₂"}
        </text>
        <text x={260} y={104} textAnchor="middle" fill={MANIM.muted} fontSize={13}>
          {e > 0.0001 ? "X₁ > X₂ → e > 0" : e < -0.0001 ? "X₁ < X₂ → e < 0" : "X₁ = X₂ → e = 0"}
        </text>
      </Svg>
      <MathRenderer
        text={circ ? `$e = \\dfrac{V_{alim}\\,(\\varphi_1-\\varphi_2)}{2\\pi} = \\dfrac{10\\cdot(${x1}-${x2})^\\circ}{360^\\circ} = ${f2(e)}\\ \\mathrm{V}$` : `$e = \\dfrac{V_{alim}}{l}\\,(X_1 - X_2) = \\dfrac{10}{100}\\,(${x1} - ${x2}) = ${f2(e)}\\ \\mathrm{V}$`}
        className="text-lg"
      />
      <Note>El comparador resta la señal de referencia y la realimentada; esa diferencia excita al regulador, que actúa hasta que el error sea cero.</Note>
    </Frame>
  );
}

/* ───────────── 10. Amplificador operacional ideal ───────────── */

export function OperacionalInversorExplorador({ block }: { block: ToolBlock }) {
  const init = {
    modo: "inv" as string,
    r1: num(block.params?.a, 0.5, 0.1, 100),
    r2: num(block.params?.b, 150, 1, 500),
    v1: num(block.params?.c, 15, -50, 50),
    v2: 25,
  };
  const [s, setS] = useState(init);
  const comp = s.modo === "comp";
  const r = opamp(comp ? "comp" : "inv", s.r1, s.r2, s.v1 / 1000, s.v2 / 1000);
  const gain = s.r2 / s.r1;
  const fmtV = (v: number) => (Math.abs(v) < 1 ? `${f1(v * 1000)} mV` : `${f2(v)} V`);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La ganancia solo depende de las resistencias externas. Sube R₂ o baja R₁ hasta que la salida sature en ±15 V."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice items={[{ value: "inv", label: "Amplificador inversor" }, { value: "comp", label: "Comparador (R₁ = R₄, R₂ = R₃)" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} label="Montaje" />
          <Slider label="R₁" value={s.r1} min={0.1} max={100} step={0.1} unit=" kΩ" format={f1} color={MANIM.blue} onChange={(r1) => setS((x) => ({ ...x, r1 }))} />
          <Slider label="R₂" value={s.r2} min={1} max={500} step={1} unit=" kΩ" color={MANIM.orange} onChange={(r2) => setS((x) => ({ ...x, r2 }))} />
          <Slider label="Entrada V₁" value={s.v1} min={-50} max={50} step={1} unit=" mV" color={MANIM.yellow} onChange={(v1) => setS((x) => ({ ...x, v1 }))} />
          {comp ? <Slider label="Entrada V₂" value={s.v2} min={-50} max={50} step={1} unit=" mV" color={MANIM.green} onChange={(v2) => setS((x) => ({ ...x, v2 }))} /> : null}
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label={comp ? "Amplificación, R₂/R₁" : "Ganancia, −R₂/R₁"}>
          {comp ? f1(gain) : f1(-gain)}
        </Stat>
        <Stat color={r.saturated ? MANIM.red : MANIM.green} label="Salida V₀">
          {fmtV(r.out)}
        </Stat>
      </Readout>
      <MathRenderer
        text={comp ? `$V_0 = \\dfrac{R_2}{R_1}(V_2 - V_1) = ${f1(gain)}\\cdot(${f1(s.v2)} - ${f1(s.v1)})\\ \\mathrm{mV} = ${f1(r.raw * 1000)}\\ \\mathrm{mV}$` : `$V_0 = -\\dfrac{R_2}{R_1}V_1 = -${f1(gain)}\\cdot ${f1(s.v1)}\\ \\mathrm{mV} = ${f1(r.raw * 1000)}\\ \\mathrm{mV}$`}
        className="text-lg"
      />
      {r.saturated ? <Note>La salida no puede superar la alimentación (±15 V): el operacional real satura y el resultado teórico ya no se cumple.</Note> : <Note>Con 150 kΩ y 0,5 kΩ, 15 mV de un termopar se convierten en −4,5 V: una señal que ya se puede medir y digitalizar.</Note>}
    </Frame>
  );
}
