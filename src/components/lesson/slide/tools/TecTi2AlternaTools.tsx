"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

const rad = (deg: number) => (deg * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

/** Valor instantáneo de una señal senoidal con valor de pico, frecuencia (Hz), tiempo (s) y desfase (grados). */
export const senoidal = (pico: number, f: number, t: number, faseDeg = 0) => pico * Math.sin(2 * Math.PI * f * t + rad(faseDeg));
export const valorEficaz = (pico: number) => pico / Math.SQRT2;

/** Reactancia inductiva (Ω) con L en mH y f en Hz. */
export const reactanciaL = (f: number, L_mH: number) => 2 * Math.PI * f * (L_mH / 1000);
/** Reactancia capacitiva (Ω) con C en µF y f en Hz. */
export const reactanciaC = (f: number, C_uF: number) => (f > 0 && C_uF > 0 ? 1 / (2 * Math.PI * f * (C_uF / 1e6)) : Infinity);
/** Impedancia de un circuito RLC serie: módulo (Ω) y ángulo (grados; positivo = inductivo: la corriente se retrasa). */
export function impedanciaSerie(R: number, XL: number, XC: number) {
  const X = XL - (Number.isFinite(XC) ? XC : 1e12);
  return { Z: Math.hypot(R, X), fase: deg(Math.atan2(X, R)), X };
}
/** Frecuencia de resonancia (Hz) con L en mH y C en µF. */
export const frecuenciaResonancia = (L_mH: number, C_uF: number) => (L_mH > 0 && C_uF > 0 ? 1 / (2 * Math.PI * Math.sqrt((L_mH / 1000) * (C_uF / 1e6))) : 0);

/** Potencias activa (W), reactiva (var) y aparente (VA) y factor de potencia. */
export function potencias(V: number, I: number, faseDeg: number) {
  const S = V * I;
  return { P: S * Math.cos(rad(faseDeg)), Q: S * Math.sin(rad(faseDeg)), S, fp: Math.cos(rad(faseDeg)) };
}

/** Corrección del factor de potencia con una batería de condensadores en paralelo. */
export function correccionFp(P: number, cos1: number, cos2: number, V: number, f: number) {
  const t1 = Math.tan(Math.acos(Math.min(1, Math.max(0.01, cos1))));
  const t2 = Math.tan(Math.acos(Math.min(1, Math.max(0.01, cos2))));
  const Qc = P * (t1 - t2);
  const C = V > 0 && f > 0 ? Qc / (2 * Math.PI * f * V * V) : 0;
  const I1 = V > 0 ? P / (V * cos1) : Infinity;
  const I2 = V > 0 ? P / (V * cos2) : Infinity;
  return { Qc, C_uF: C * 1e6, I1, I2 };
}

/** Sistema trifásico equilibrado: potencia activa total y magnitudes de fase según la conexión. */
export function trifasica(VL: number, IL: number, cosphi: number, conexion: "estrella" | "triangulo") {
  const P = Math.sqrt(3) * VL * IL * cosphi;
  const Q = Math.sqrt(3) * VL * IL * Math.sqrt(Math.max(0, 1 - cosphi * cosphi));
  const Vf = conexion === "estrella" ? VL / Math.sqrt(3) : VL;
  const If = conexion === "estrella" ? IL : IL / Math.sqrt(3);
  return { P, Q, S: Math.sqrt(3) * VL * IL, Vf, If };
}

/* ───────────── 1. Señal senoidal y desfase ───────────── */

export function SenoidalExplorador({ block }: { block: ToolBlock }) {
  const init = { f: num(block.params?.a, 50, 5, 200), fase: num(block.params?.b, 30, -90, 90), Vp: 325 };
  const [s, setS] = useState(init);
  const N = 200;
  const T = 1 / s.f;
  const pts = (fase: number, escala: number) =>
    Array.from({ length: N + 1 }, (_, k) => {
      const t = (k / N) * 2 * T;
      return `${30 + (k / N) * 460},${75 - (senoidal(1, s.f, t, fase) * escala)}`;
    }).join(" ");
  const retraso = s.fase / 360 * T * 1000;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Tensión (azul) y corriente (naranja) de una misma carga. El desfase indica cuánto se adelanta o se retrasa la corriente."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Frecuencia" value={s.f} min={5} max={200} step={5} unit=" Hz" color={MANIM.blue} onChange={(f) => setS((x) => ({ ...x, f }))} />
          <Slider label="Desfase de la corriente respecto a la tensión (− adelanta, + retrasa)" value={s.fase} min={-90} max={90} step={5} unit="°" color={MANIM.orange} onChange={(fase) => setS((x) => ({ ...x, fase }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="senoidal" maxH={170}>
        <line x1={30} y1={75} x2={490} y2={75} stroke={MANIM.muted} strokeWidth={1} />
        <polyline points={pts(0, 55)} fill="none" stroke={MANIM.blue} strokeWidth={2.5} />
        <polyline points={pts(-s.fase, 40)} fill="none" stroke={MANIM.orange} strokeWidth={2.5} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Tensión eficaz">{f1(valorEficaz(s.Vp))} V</Stat>
        <Stat color={MANIM.muted} label="Periodo">{f1(T * 1000)} ms</Stat>
        <Stat color={MANIM.orange} label="Desfase">{s.fase} °</Stat>
        <Stat color={MANIM.purple} label="Tiempo equivalente">{f2(Math.abs(retraso))} ms {s.fase > 0 ? "de retraso" : s.fase < 0 ? "de adelanto" : ""}</Stat>
        <Stat color={s.fase === 0 ? MANIM.green : MANIM.yellow} label="Tipo de carga">{s.fase === 0 ? "resistiva" : s.fase > 0 ? "inductiva (la corriente se retrasa)" : "capacitiva (la corriente se adelanta)"}</Stat>
      </Readout>
      <Note>Una señal senoidal es v(t) = V<sub>p</sub>·sen(2π·f·t + φ). El <b>desfase</b> φ mide la distancia en el tiempo entre dos señales de la misma frecuencia (360° = un periodo). En una resistencia, tensión y corriente están <b>en fase</b>; en una bobina la corriente se <b>retrasa</b> hasta 90°; en un condensador se <b>adelanta</b> hasta 90°.</Note>
    </Frame>
  );
}

/* ───────────── 2. Circuito RLC serie ───────────── */

export function RlcExplorador({ block }: { block: ToolBlock }) {
  const init = { R: 20, L: num(block.params?.a, 100, 1, 1000), C: 100, f: 50, V: 230 };
  const [s, setS] = useState(init);
  const XL = reactanciaL(s.f, s.L);
  const XC = reactanciaC(s.f, s.C);
  const z = impedanciaSerie(s.R, XL, XC);
  const I = z.Z > 0 ? s.V / z.Z : Infinity;
  const f0r = frecuenciaResonancia(s.L, s.C);
  const nat = Math.abs(z.fase) < 5 ? "resistivo (resonancia)" : z.fase > 0 ? "inductivo" : "capacitivo";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una resistencia, una bobina y un condensador en serie. La impedancia depende de la frecuencia."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Resistencia R" value={s.R} min={1} max={200} step={1} unit=" Ω" color={MANIM.blue} onChange={(R) => setS((x) => ({ ...x, R }))} />
          <Slider label="Inductancia L" value={s.L} min={1} max={1000} step={1} unit=" mH" color={MANIM.orange} onChange={(L) => setS((x) => ({ ...x, L }))} />
          <Slider label="Capacidad C" value={s.C} min={1} max={1000} step={1} unit=" µF" color={MANIM.purple} onChange={(C) => setS((x) => ({ ...x, C }))} />
          <Slider label="Frecuencia" value={s.f} min={5} max={500} step={5} unit=" Hz" color={MANIM.green} onChange={(f) => setS((x) => ({ ...x, f }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Reactancia inductiva">{f1(XL)} Ω</Stat>
        <Stat color={MANIM.purple} label="Reactancia capacitiva">{Number.isFinite(XC) ? f1(XC) : "—"} Ω</Stat>
        <Stat color={MANIM.blue} label="Impedancia Z">{f1(z.Z)} Ω</Stat>
        <Stat color={MANIM.yellow} label="Ángulo φ">{f1(z.fase)} °</Stat>
        <Stat color={MANIM.green} label="Corriente (230 V)">{Number.isFinite(I) ? f2(I) : "—"} A</Stat>
        <Stat color={MANIM.muted} label="Carácter">{nat}</Stat>
        <Stat color={MANIM.red} label="Frecuencia de resonancia">{f1(f0r)} Hz</Stat>
      </Readout>
      <Note>X<sub>L</sub> = ω·L y X<sub>C</sub> = 1/(ω·C), con ω = 2π·f. La impedancia de la serie es Z = √(R² + (X<sub>L</sub> − X<sub>C</sub>)²) y el desfase φ = arctg((X<sub>L</sub> − X<sub>C</sub>)/R). En la <b>resonancia</b> (X<sub>L</sub> = X<sub>C</sub>) la impedancia es mínima (Z = R) y la corriente máxima, y el circuito se comporta como una resistencia pura.</Note>
    </Frame>
  );
}

/* ───────────── 3. Triángulo de potencias ───────────── */

export function PotenciasExplorador({ block }: { block: ToolBlock }) {
  const init = { V: 230, I: num(block.params?.a, 10, 0.5, 40), fase: num(block.params?.b, 37, 0, 89) };
  const [s, setS] = useState(init);
  const p = potencias(s.V, s.I, s.fase);
  const k = 190 / Math.max(1, p.S);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una carga inductiva consume potencia activa (trabajo útil) y reactiva (campo magnético). El triángulo las relaciona."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión eficaz" value={s.V} min={12} max={400} step={1} unit=" V" color={MANIM.blue} onChange={(V) => setS((x) => ({ ...x, V }))} />
          <Slider label="Corriente eficaz" value={s.I} min={0.5} max={40} step={0.5} unit=" A" color={MANIM.orange} onChange={(I) => setS((x) => ({ ...x, I }))} />
          <Slider label="Desfase φ" value={s.fase} min={0} max={89} step={1} unit="°" color={MANIM.purple} onChange={(fase) => setS((x) => ({ ...x, fase }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="potencias" maxH={170}>
        <polygon points={`60,125 ${60 + p.P * k * 1.2},125 ${60 + p.P * k * 1.2},${125 - p.Q * k}`} fill={MANIM.blue} fillOpacity={0.2} stroke={MANIM.blue} strokeWidth={2} />
        <text x={60 + (p.P * k * 1.2) / 2} y={140} textAnchor="middle" fill={MANIM.green} fontSize={12}>
          P = {f0(p.P)} W
        </text>
        <text x={66 + p.P * k * 1.2} y={125 - (p.Q * k) / 2} fill={MANIM.orange} fontSize={12}>
          Q = {f0(p.Q)} var
        </text>
        <text x={60 + (p.P * k * 1.2) / 2 - 12} y={125 - (p.Q * k) / 2 - 12} textAnchor="end" fill={MANIM.blue} fontSize={12}>
          S = {f0(p.S)} VA
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Activa P = V·I·cosφ">{f0(p.P)} W</Stat>
        <Stat color={MANIM.orange} label="Reactiva Q = V·I·senφ">{f0(p.Q)} var</Stat>
        <Stat color={MANIM.blue} label="Aparente S = V·I">{f0(p.S)} VA</Stat>
        <Stat color={p.fp >= 0.95 ? MANIM.green : p.fp >= 0.8 ? MANIM.yellow : MANIM.red} label="Factor de potencia cosφ">{f2(p.fp)}</Stat>
      </Readout>
      <Note>La potencia <b>activa</b> (W) es la que se convierte en trabajo o calor; la <b>reactiva</b> (var) se intercambia con bobinas y condensadores y no se consume, pero circula por la instalación; la <b>aparente</b> (VA) es la que dimensiona cables y transformadores. S² = P² + Q². El factor de potencia cosφ = P/S indica qué parte de la corriente hace trabajo útil.</Note>
    </Frame>
  );
}

/* ───────────── 4. Corrección del factor de potencia ───────────── */

export function CorreccionFpExplorador({ block }: { block: ToolBlock }) {
  const init = { P: num(block.params?.a, 10, 1, 100), c1: 70, c2: 95, V: 400, f: 50 };
  const [s, setS] = useState(init);
  const r = correccionFp(s.P * 1000, s.c1 / 100, s.c2 / 100, s.V, s.f);
  const dism = r.I1 > 0 && Number.isFinite(r.I1) ? (1 - r.I2 / r.I1) * 100 : 0;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una instalación con muchos motores tiene un cosφ bajo. Se corrige con condensadores en paralelo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Potencia activa de la carga" value={s.P} min={1} max={100} step={1} unit=" kW" color={MANIM.green} onChange={(P) => setS((x) => ({ ...x, P }))} />
          <Slider label="cosφ de partida" value={s.c1} min={30} max={99} step={1} unit=" %" color={MANIM.red} onChange={(c1) => setS((x) => ({ ...x, c1 }))} />
          <Slider label="cosφ deseado" value={s.c2} min={50} max={100} step={1} unit=" %" color={MANIM.blue} onChange={(c2) => setS((x) => ({ ...x, c2 }))} />
          <Slider label="Tensión de la red" value={s.V} min={230} max={690} step={10} unit=" V" color={MANIM.orange} onChange={(V) => setS((x) => ({ ...x, V }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.purple} label="Potencia reactiva a compensar">{f1(r.Qc / 1000)} kvar</Stat>
        <Stat color={MANIM.blue} label="Capacidad de la batería (monofásica equivalente)">{f0(r.C_uF)} µF</Stat>
        <Stat color={MANIM.red} label="Corriente antes">{f1(r.I1)} A</Stat>
        <Stat color={MANIM.green} label="Corriente después">{f1(r.I2)} A</Stat>
        <Stat color={dism > 0 ? MANIM.green : MANIM.yellow} label="Reducción de corriente">{f0(Math.max(0, dism))} %</Stat>
      </Readout>
      <Note>Q<sub>c</sub> = P·(tgφ<sub>1</sub> − tgφ<sub>2</sub>) y C = Q<sub>c</sub>/(ω·V²). Los condensadores en paralelo aportan la reactiva que piden los motores, así que la red entrega menos corriente para la misma potencia útil: <b>menos pérdidas en los cables</b>, cables y transformadores más pequeños y, en muchos contratos, <b>menos recargo</b> por reactiva. Con una carga trifásica la fórmula de C depende de si los condensadores se conectan en estrella o en triángulo; aquí se muestra la capacidad equivalente por fase para la tensión indicada.</Note>
    </Frame>
  );
}

/* ───────────── 5. Sistema trifásico ───────────── */

export function TrifasicaExplorador({ block }: { block: ToolBlock }) {
  const init = { VL: 400, IL: num(block.params?.a, 20, 1, 100), c: 85, con: Math.round(num(block.params?.n, 0, 0, 1)) };
  const [s, setS] = useState(init);
  const r = trifasica(s.VL, s.IL, s.c / 100, s.con === 0 ? "estrella" : "triangulo");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un receptor trifásico equilibrado conectado en estrella o en triángulo. Compara las magnitudes de línea y de fase."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Conexión" items={[{ value: 0, label: "Estrella (Y)" }, { value: 1, label: "Triángulo (Δ)" }]} value={s.con} onChange={(con) => setS((x) => ({ ...x, con }))} />
          <Slider label="Tensión de línea" value={s.VL} min={230} max={690} step={10} unit=" V" color={MANIM.blue} onChange={(VL) => setS((x) => ({ ...x, VL }))} />
          <Slider label="Corriente de línea" value={s.IL} min={1} max={100} step={1} unit=" A" color={MANIM.orange} onChange={(IL) => setS((x) => ({ ...x, IL }))} />
          <Slider label="cosφ" value={s.c} min={30} max={100} step={1} unit=" %" color={MANIM.purple} onChange={(c) => setS((x) => ({ ...x, c }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Potencia activa total P = √3·V_L·I_L·cosφ">{f1(r.P / 1000)} kW</Stat>
        <Stat color={MANIM.orange} label="Potencia reactiva">{f1(r.Q / 1000)} kvar</Stat>
        <Stat color={MANIM.blue} label="Potencia aparente">{f1(r.S / 1000)} kVA</Stat>
        <Stat color={MANIM.purple} label="Tensión en cada fase">{f0(r.Vf)} V</Stat>
        <Stat color={MANIM.red} label="Corriente en cada fase">{f1(r.If)} A</Stat>
      </Readout>
      <Note>En <b>estrella</b> la tensión de fase es la de línea dividida por √3 y la corriente de fase es la de línea; en <b>triángulo</b>, la tensión de fase es la de línea y la corriente de fase es la de línea dividida por √3. En ambos casos P = √3·V<sub>L</sub>·I<sub>L</sub>·cosφ. La trifásica transporta más potencia con menos cable y da campos giratorios para los motores. En la red de 400 V, la tensión entre fase y neutro es 230 V.</Note>
    </Frame>
  );
}
