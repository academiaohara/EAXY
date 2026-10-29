"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const f0 = (v: number) => fmtEs(v, 0);
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");

/* ───────────── Datos y cálculos (se comprueban en los tests) ───────────── */

export const C_AGUA = 4180;
export const C_HIELO = 2090;
export const L_FUSION = 334000;
export const L_VAPORIZACION = 2260000;

/** Escalas de temperatura. */
export const aKelvin = (c: number): number => c + 273.15;
export const aFahrenheit = (c: number): number => (c * 9) / 5 + 32;

export const MATERIALES_C = [
  { id: "agua", nombre: "Agua", c: 4180 },
  { id: "aceite", nombre: "Aceite", c: 2000 },
  { id: "aluminio", nombre: "Aluminio", c: 900 },
  { id: "hierro", nombre: "Hierro", c: 450 },
  { id: "cobre", nombre: "Cobre", c: 385 },
] as const;

/** Calor intercambiado: Q = m·c·ΔT (J). */
export const calorSensible = (m: number, c: number, dT: number): number => m * c * dT;
/** Temperatura final de equilibrio al mezclar dos cuerpos sin cambios de estado ni pérdidas. */
export function temperaturaEquilibrio(m1: number, c1: number, T1: number, m2: number, c2: number, T2: number): number {
  const k = m1 * c1 + m2 * c2;
  return k > 0 ? (m1 * c1 * T1 + m2 * c2 * T2) / k : NaN;
}

/** Curva de calentamiento de m kg de agua que parte de hielo a −20 °C: temperatura y estado tras absorber Q (J). */
export function curvaCalentamiento(m: number, Q: number, T0 = -20) {
  if (!(m > 0)) return { T: NaN, estado: "—", qTotal: NaN };
  const q1 = m * C_HIELO * (0 - T0);
  const q2 = q1 + m * L_FUSION;
  const q3 = q2 + m * C_AGUA * 100;
  const q4 = q3 + m * L_VAPORIZACION;
  const q = Math.max(0, Q);
  let T: number;
  let estado: string;
  if (q < q1) { T = T0 + q / (m * C_HIELO); estado = "hielo"; }
  else if (q < q2) { T = 0; estado = "fusión (hielo + agua)"; }
  else if (q < q3) { T = (q - q2) / (m * C_AGUA); estado = "agua líquida"; }
  else if (q < q4) { T = 100; estado = "ebullición (agua + vapor)"; }
  else { T = 100 + (q - q4) / (m * 2010); estado = "vapor"; }
  return { T, estado, qTotal: q4, q1, q2, q3, q4 };
}

export const CONDUCTORES = [
  { id: "cobre", nombre: "Cobre", k: 400 },
  { id: "aluminio", nombre: "Aluminio", k: 237 },
  { id: "hierro", nombre: "Hierro", k: 80 },
  { id: "vidrio", nombre: "Vidrio", k: 1 },
  { id: "madera", nombre: "Madera", k: 0.15 },
  { id: "poliestireno", nombre: "Poliestireno", k: 0.033 },
  { id: "aire", nombre: "Aire", k: 0.026 },
] as const;
/** Potencia térmica por conducción (W): k·A·ΔT/L. */
export const conduccion = (k: number, A: number, dT: number, L: number): number => (L > 0 ? (k * A * dT) / L : NaN);

export const DILATABLES = [
  { id: "aluminio", nombre: "Aluminio", alfa: 24e-6 },
  { id: "cobre", nombre: "Cobre", alfa: 17e-6 },
  { id: "acero", nombre: "Acero", alfa: 12e-6 },
  { id: "hormigon", nombre: "Hormigón", alfa: 12e-6 },
  { id: "vidrio", nombre: "Vidrio", alfa: 9e-6 },
] as const;
/** Dilatación lineal (m): ΔL = α·L₀·ΔT. */
export const dilatacion = (alfa: number, L0: number, dT: number): number => alfa * L0 * dT;

/** Rendimiento máximo (Carnot) entre focos a T_caliente y T_fría (K). */
export const rendimientoCarnot = (Tc: number, Tf: number): number => (Tc > Tf && Tf > 0 ? 1 - Tf / Tc : NaN);
/** Máquina térmica: trabajo y calor cedido a partir del calor absorbido y el rendimiento. */
export const maquinaTermica = (Qh: number, eta: number): { W: number; Qc: number } => ({ W: Qh * eta, Qc: Qh * (1 - eta) });

/* ───────────── 1. Temperatura y equilibrio ───────────── */

export function EquilibrioTermicoFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { mat: Math.round(num(block.params?.n, 2, 0, MATERIALES_C.length - 1)), mA: num(block.params?.a, 1, 0.1, 5), TA: Math.round(num(block.params?.b, 200, 20, 300)), mB: 1, TB: 20 };
  const [s, setS] = useState(init);
  const mat = MATERIALES_C[s.mat]!;
  const Te = temperaturaEquilibrio(s.mA, mat.c, s.TA, s.mB, C_AGUA, s.TB);
  const Q = calorSensible(s.mB, C_AGUA, Te - s.TB);
  const Y = (T: number): number => 135 - (T / 300) * 110;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El calor fluye del cuerpo caliente al frío hasta igualar las temperaturas: Q cedido = Q absorbido."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Cuerpo caliente (material)" items={MATERIALES_C.map((m, k) => ({ value: String(k), label: m.nombre }))} value={String(s.mat)} onChange={(k) => setS((o) => ({ ...o, mat: Number(k) }))} />
          <Slider label="Masa del cuerpo caliente" value={s.mA} min={0.1} max={5} step={0.1} unit=" kg" color={MANIM.red} format={f1} onChange={(mA) => setS((o) => ({ ...o, mA }))} />
          <Slider label="Temperatura del cuerpo caliente" value={s.TA} min={20} max={300} step={5} unit=" °C" color={MANIM.red} onChange={(TA) => setS((o) => ({ ...o, TA }))} />
          <Slider label="Masa de agua" value={s.mB} min={0.1} max={5} step={0.1} unit=" kg" color={MANIM.blue} format={f1} onChange={(mB) => setS((o) => ({ ...o, mB }))} />
          <Slider label="Temperatura del agua" value={s.TB} min={0} max={80} step={5} unit=" °C" color={MANIM.blue} onChange={(TB) => setS((o) => ({ ...o, TB }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="equilibrio" maxH={170}>
        <Seg a={[60, 135]} b={[460, 135]} color={MANIM.ink} width={2} />
        {[
          { x: 90, T: s.TA, color: MANIM.red, l: mat.nombre },
          { x: 200, T: s.TB, color: MANIM.blue, l: "Agua" },
          { x: 340, T: Te, color: MANIM.yellow, l: "Equilibrio" },
        ].map((b) => (
          <g key={b.l}>
            <rect x={b.x} y={Y(Math.max(0, b.T))} width={70} height={135 - Y(Math.max(0, b.T))} fill={b.color} fillOpacity={0.85} />
            <text x={b.x + 35} y={148} textAnchor="middle" fill={b.color} fontSize={12}>{b.l}</text>
            <text x={b.x + 35} y={Y(Math.max(0, b.T)) - 4} textAnchor="middle" fill={MANIM.ink} fontSize={12}>{fin(b.T, f1)} °C</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Temperatura de equilibrio">{`${fin(Te, f1)} °C (${fin(aKelvin(Te), f1)} K)`}</Stat>
        <Stat color={MANIM.red} label="Calor transferido del caliente al agua">{`${fin(Q / 1000, f1)} kJ`}</Stat>
        <Stat color={MANIM.blue} label={`Calor específico del ${mat.nombre.toLowerCase()}`}>{`${f0(mat.c)} J/(kg·K)`}</Stat>
        <Stat color={MANIM.purple} label="Referencia: agua a esa temperatura">{`${fin(aFahrenheit(Te), f1)} °F`}</Stat>
      </Readout>
      <Note>La <b>temperatura</b> mide el <b>grado de agitación</b> de las partículas (energía cinética media); el <b>calor</b> es la energía que <b>se transfiere</b> entre cuerpos a distinta temperatura, siempre del caliente al frío, hasta el <b>equilibrio térmico</b>. Escalas: <b>K = °C + 273,15</b> y °F = 1,8·°C + 32; el <b>cero absoluto</b> es 0 K (−273,15 °C). Sin pérdidas: <b>Q cedido = Q absorbido</b>, es decir m₁·c₁·(T₁ − T_e) = m₂·c₂·(T_e − T₂), y <b>T_e = (m₁c₁T₁ + m₂c₂T₂)/(m₁c₁ + m₂c₂)</b>. Se supone que no hay cambios de estado (el agua no llega a hervir).</Note>
    </Frame>
  );
}

/* ───────────── 2. Calor específico y cambios de estado ───────────── */

export function CambiosEstadoFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { m: num(block.params?.a, 1, 0.1, 5), q: Math.round(num(block.params?.b, 500, 0, 3500)) };
  const [s, setS] = useState(init);
  const r = curvaCalentamiento(s.m, s.q * 1000);
  const total = Number.isFinite(r.qTotal) && r.qTotal! > 0 ? (r.qTotal as number) : 1;
  const qMax = total * 1.1;
  const X = (q: number): number => 50 + (q / qMax) * 420;
  const Y = (T: number): number => 140 - ((T + 20) / 160) * 120;
  const pts = r.q1 === undefined ? "" : [[0, -20], [r.q1, 0], [r.q2!, 0], [r.q3!, 100], [r.q4!, 100], [qMax, 100 + (qMax - r.q4!) / (s.m * 2010)]].map(([q, T]) => `${X(q!)},${Y(Math.min(140, T!))}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Durante un cambio de estado la temperatura se mantiene constante: el calor se invierte en romper las uniones entre partículas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa de agua (hielo a −20 °C)" value={s.m} min={0.1} max={5} step={0.1} unit=" kg" color={MANIM.blue} format={f1} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Calor absorbido" value={s.q} min={0} max={3500} step={10} unit=" kJ" color={MANIM.red} onChange={(q) => setS((o) => ({ ...o, q }))} />
        </>
      }
    >
      <Svg w={520} h={165} testId="cambios-estado" maxH={185}>
        <Seg a={[50, 140]} b={[480, 140]} color={MANIM.ink} width={2} />
        <Seg a={[50, 140]} b={[50, 10]} color={MANIM.ink} width={2} />
        <polyline points={pts} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        {Number.isFinite(r.T) && <Dot p={[X(Math.min(s.q * 1000, qMax)), Y(Math.min(r.T, 140))]} r={6} color={MANIM.yellow} />}
        <text x={480} y={158} textAnchor="end" fill={MANIM.muted} fontSize={12}>calor absorbido Q</text>
        <text x={58} y={14} fill={MANIM.muted} fontSize={12}>T (°C)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Estado">{r.estado}</Stat>
        <Stat color={MANIM.red} label="Temperatura">{`${fin(r.T, f1)} °C`}</Stat>
        <Stat color={MANIM.orange} label="Calor para fundir todo el hielo">{`${fin(((r.q2 ?? NaN) - (r.q1 ?? NaN)) / 1000, f0)} kJ`}</Stat>
        <Stat color={MANIM.purple} label="Calor para vaporizar toda el agua">{`${fin(((r.q4 ?? NaN) - (r.q3 ?? NaN)) / 1000, f0)} kJ`}</Stat>
      </Readout>
      <Note>Sin cambio de estado: <b>Q = m·c·ΔT</b>, con <b>c</b> el <b>calor específico</b> (hielo ≈ 2090, agua ≈ 4180, vapor ≈ 2010 J/kg·K). Durante un <b>cambio de estado</b> la temperatura <b>no varía</b> y el calor es <b>Q = m·L</b>, con <b>L</b> el <b>calor latente</b>: de fusión (agua: 334 kJ/kg) y de vaporización (agua: 2260 kJ/kg). Vaporizar 1 kg de agua requiere unas <b>7 veces</b> más energía que fundirlo. El agua tiene un calor específico alto: por eso modera el clima. Presión de 1 atm; valores aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 3. Transmisión y dilatación ───────────── */

export function TransmisionDilatacionFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), mat: 2, A: num(block.params?.a, 1, 0.1, 5), L: num(block.params?.b, 0.1, 0.01, 0.5), dT: 20, L0: 50, matD: 0 };
  const [s, setS] = useState(init);
  const dil = s.modo === 1;
  const mc = CONDUCTORES[Math.min(s.mat, CONDUCTORES.length - 1)]!;
  const md = DILATABLES[Math.min(s.matD, DILATABLES.length - 1)]!;
  const P = conduccion(mc.k, s.A, s.dT, s.L);
  const dL = dilatacion(md.alfa, s.L0, s.dT);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Conducción, convección y radiación; y los cuerpos se dilatan al calentarse."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Estudio" items={[{ value: "0", label: "Conducción" }, { value: "1", label: "Dilatación" }]} value={String(s.modo)} onChange={(v) => setS((o) => ({ ...o, modo: Number(v) }))} />
          {!dil ? (
            <>
              <Choice label="Material" items={CONDUCTORES.map((m, k) => ({ value: String(k), label: m.nombre }))} value={String(s.mat)} onChange={(k) => setS((o) => ({ ...o, mat: Number(k) }))} />
              <Slider label="Superficie" value={s.A} min={0.1} max={5} step={0.1} unit=" m²" color={MANIM.blue} format={f1} onChange={(A) => setS((o) => ({ ...o, A }))} />
              <Slider label="Espesor" value={s.L} min={0.01} max={0.5} step={0.01} unit=" m" color={MANIM.orange} format={f2} onChange={(L) => setS((o) => ({ ...o, L }))} />
              <Slider label="Diferencia de temperatura" value={s.dT} min={0} max={50} step={1} unit=" °C" color={MANIM.red} onChange={(dT) => setS((o) => ({ ...o, dT }))} />
            </>
          ) : (
            <>
              <Choice label="Material" items={DILATABLES.map((m, k) => ({ value: String(k), label: m.nombre }))} value={String(s.matD)} onChange={(k) => setS((o) => ({ ...o, matD: Number(k) }))} />
              <Slider label="Longitud inicial" value={s.L0} min={1} max={100} step={1} unit=" m" color={MANIM.blue} onChange={(L0) => setS((o) => ({ ...o, L0 }))} />
              <Slider label="Variación de temperatura" value={s.dT} min={-30} max={100} step={5} unit=" °C" color={MANIM.red} onChange={(dT) => setS((o) => ({ ...o, dT }))} />
            </>
          )}
        </>
      }
    >
      <Svg w={520} h={100} testId="transmision" maxH={120}>
        {!dil ? (
          <g>
            <rect x={80} y={25} width={60} height={50} fill={MANIM.red} fillOpacity={0.8} />
            <rect x={140} y={25} width={Math.max(8, 20 + s.L * 280)} height={50} fill={MANIM.muted} fillOpacity={0.6} stroke={MANIM.ink} strokeWidth={2} />
            <rect x={140 + Math.max(8, 20 + s.L * 280)} y={25} width={60} height={50} fill={MANIM.blue} fillOpacity={0.8} />
            <text x={110} y={95} textAnchor="middle" fill={MANIM.red} fontSize={12}>caliente</text>
            <text x={170 + Math.max(8, 20 + s.L * 280)} y={95} textAnchor="middle" fill={MANIM.blue} fontSize={12}>frío</text>
          </g>
        ) : (
          <g>
            <rect x={60} y={35} width={300} height={22} fill={MANIM.muted} fillOpacity={0.5} />
            <rect x={60} y={35} width={300 + Math.max(-50, Math.min(100, dL * 3000))} height={22} fill={dL >= 0 ? MANIM.red : MANIM.blue} fillOpacity={0.75} />
            <text x={60} y={80} fill={MANIM.muted} fontSize={12}>barra (el cambio de longitud está muy exagerado)</text>
          </g>
        )}
      </Svg>
      <Readout>
        {!dil ? (
          <>
            <Stat color={MANIM.red} label="Potencia térmica conducida k·A·ΔT/L">{`${fin(P, (x) => (x >= 100 ? f0(x) : f2(x)))} W`}</Stat>
            <Stat color={MANIM.blue} label={`Conductividad del ${mc.nombre.toLowerCase()}`}>{`${fmtEs(mc.k, mc.k < 1 ? 3 : 0)} W/(m·K)`}</Stat>
            <Stat color={MANIM.green} label="Tipo de material">{mc.k >= 50 ? "buen conductor" : mc.k >= 0.5 ? "conductor medio" : "aislante"}</Stat>
          </>
        ) : (
          <>
            <Stat color={dL >= 0 ? MANIM.red : MANIM.blue} label="Variación de longitud ΔL = α·L₀·ΔT">{`${fmtEs(dL * 1000, 1)} mm`}</Stat>
            <Stat color={MANIM.orange} label="Coeficiente de dilatación α">{`${fmtEs(md.alfa * 1e6, 0)}·10⁻⁶ K⁻¹`}</Stat>
            <Stat color={MANIM.purple} label="Longitud final">{`${fmtEs(s.L0 + dL, 3)} m`}</Stat>
          </>
        )}
      </Readout>
      <Note>{!dil ? <>El calor se transmite por <b>conducción</b> (por contacto, en sólidos: las partículas transmiten la agitación), por <b>convección</b> (en fluidos: el caliente asciende y el frío desciende) y por <b>radiación</b> (ondas electromagnéticas, sin medio material: así nos llega el Sol). En la conducción, la potencia es <b>P = k·A·ΔT/L</b>: mayor con buenos conductores (metales), más superficie y más ΔT, y menor con más espesor. Los <b>aislantes</b> (aire, poliestireno, lana) se usan en ropa y viviendas.</> : <>Al calentarse, los cuerpos <b>se dilatan</b>: sus partículas vibran más y se separan. En una barra, <b>ΔL = α·L₀·ΔT</b>, con α el <b>coeficiente de dilatación lineal</b>. Se deja <b>juntas de dilatación</b> en puentes, vías y aceras. Los <b>líquidos</b> también se dilatan (termómetros). El <b>agua</b> es excepcional: entre 0 y 4 °C se contrae al calentarse, por eso el hielo flota. Valores aproximados.</>}</Note>
    </Frame>
  );
}

/* ───────────── 4. Máquinas térmicas ───────────── */

export function MaquinasTermicasFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { Qh: Math.round(num(block.params?.a, 100, 10, 500)), eta: num(block.params?.b, 0.25, 0.05, 0.9), Th: 800, Tf: 300 };
  const [s, setS] = useState(init);
  const { W, Qc } = maquinaTermica(s.Qh, s.eta);
  const carnot = rendimientoCarnot(s.Th, s.Tf);
  const imposible = Number.isFinite(carnot) && s.eta > carnot;
  const H = 90;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una máquina térmica toma calor de un foco caliente, convierte una parte en trabajo y cede el resto a un foco frío."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Calor absorbido del foco caliente" value={s.Qh} min={10} max={500} step={10} unit=" kJ" color={MANIM.red} onChange={(Qh) => setS((o) => ({ ...o, Qh }))} />
          <Slider label="Rendimiento" value={s.eta} min={0.05} max={0.9} step={0.01} color={MANIM.green} format={(v) => `${f0(v * 100)} %`} onChange={(eta) => setS((o) => ({ ...o, eta }))} />
          <Slider label="Temperatura del foco caliente" value={s.Th} min={400} max={1500} step={50} unit=" K" color={MANIM.orange} onChange={(Th) => setS((o) => ({ ...o, Th }))} />
          <Slider label="Temperatura del foco frío" value={s.Tf} min={250} max={400} step={10} unit=" K" color={MANIM.blue} onChange={(Tf) => setS((o) => ({ ...o, Tf }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="maquinas-termicas" maxH={150}>
        <rect x={60} y={20} width={110} height={30} fill={MANIM.red} fillOpacity={0.8} />
        <text x={115} y={40} textAnchor="middle" fill={MANIM.ink} fontSize={12}>foco caliente</text>
        <rect x={60} y={90} width={110} height={30} fill={MANIM.blue} fillOpacity={0.8} />
        <text x={115} y={110} textAnchor="middle" fill={MANIM.ink} fontSize={12}>foco frío</text>
        <circle cx={260} cy={70} r={30} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={2} />
        <text x={260} y={75} textAnchor="middle" fill={MANIM.ink} fontSize={13}>motor</text>
        <rect x={180} y={50 - (s.Qh / 500) * H * 0.3} width={40} height={(s.Qh / 500) * H * 0.3 + 4} fill={MANIM.red} fillOpacity={0.6} />
        <rect x={300} y={65 - (W / 500) * H * 0.4} width={90} height={(W / 500) * H * 0.4 + 6} fill={MANIM.green} />
        <rect x={180} y={86} width={40} height={(Qc / 500) * H * 0.3 + 4} fill={MANIM.blue} fillOpacity={0.6} />
        <text x={345} y={118} textAnchor="middle" fill={MANIM.green} fontSize={12}>trabajo W</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Trabajo útil W = η·Q_h">{`${f1(W)} kJ`}</Stat>
        <Stat color={MANIM.blue} label="Calor cedido al foco frío Q_c">{`${f1(Qc)} kJ`}</Stat>
        <Stat color={MANIM.orange} label="Rendimiento máximo teórico (Carnot)">{`${fin(carnot * 100, f0)} %`}</Stat>
        <Stat color={imposible ? MANIM.red : MANIM.green} label="Comprobación">{imposible ? "Imposible: supera el límite de Carnot" : "Posible"}</Stat>
      </Readout>
      <Note>Una <b>máquina térmica</b> (motor de gasolina, diésel, turbina de vapor, central térmica) toma calor <b>Q_h</b> de un <b>foco caliente</b>, convierte parte en <b>trabajo W</b> y <b>cede el resto Q_c</b> a un <b>foco frío</b>: <b>Q_h = W + Q_c</b> (conservación de la energía). Su <b>rendimiento</b> es <b>η = W/Q_h</b> y siempre es <b>menor que 1</b>: no se puede convertir todo el calor en trabajo (<b>segundo principio</b>). El máximo teórico entre dos temperaturas (en kelvin) es <b>η = 1 − T_f/T_h</b> (Carnot). Un motor de coche ronda el 25–35 %. El calor cedido supone un impacto ambiental (calentamiento de ríos, gases).</Note>
    </Frame>
  );
}
