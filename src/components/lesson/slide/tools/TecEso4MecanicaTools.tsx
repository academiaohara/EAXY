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

export const omega = (rpm: number) => (2 * Math.PI * rpm) / 60;
export const rpmDeOmega = (w: number) => (w * 60) / (2 * Math.PI);

/** Relación de transmisión i = n1/n2 = z2/z1 (motriz → conducida). */
export const relacionTransmision = (z1: number, z2: number) => (z1 > 0 ? z2 / z1 : 0);

/** Etapa de engranajes: velocidad, par y potencia de salida con un rendimiento η. */
export function etapa(nEntrada: number, parEntrada: number, z1: number, z2: number, eta: number) {
  const i = relacionTransmision(z1, z2);
  const nSalida = i > 0 ? nEntrada / i : 0;
  const parSalida = parEntrada * i * eta;
  return { i, nSalida, parSalida, potSalida: parSalida * omega(nSalida) };
}

/** Reductora de k etapas iguales con relación i cada una y rendimiento η por etapa. */
export function reductora(nMotor: number, parMotor: number, iEtapa: number, k: number, etaEtapa: number) {
  const iTotal = iEtapa ** k;
  const eta = etaEtapa ** k;
  const nOut = iTotal > 0 ? nMotor / iTotal : 0;
  const parOut = parMotor * iTotal * eta;
  return { iTotal, eta, nOut, parOut, potEntrada: parMotor * omega(nMotor), potSalida: parOut * omega(nOut) };
}

/** Posición del émbolo (mm) en un mecanismo biela-manivela: x = r·cosθ + √(l² − r²·sen²θ). */
export function posicionEmbolo(r: number, l: number, thetaDeg: number) {
  const t = (thetaDeg * Math.PI) / 180;
  const raiz = l * l - r * r * Math.sin(t) ** 2;
  return r * Math.cos(t) + Math.sqrt(Math.max(0, raiz));
}
export const carrera = (r: number) => 2 * r;

/** Bloque sobre un plano inclinado con rozamiento. */
export function planoInclinado(masaKg: number, anguloDeg: number, mu: number, g = 9.81) {
  const a = (anguloDeg * Math.PI) / 180;
  const peso = masaKg * g;
  const normal = peso * Math.cos(a);
  const tangencial = peso * Math.sin(a);
  const roce = mu * normal;
  return { peso, normal, tangencial, roce, desliza: tangencial > roce, fuerzaSubir: tangencial + roce, fuerzaSujetar: Math.max(0, tangencial - roce) };
}

/** Cinta transportadora accionada por motor + reductora. */
export function cinta(nMotor: number, iRed: number, dTamborMm: number, fuerzaN: number, eta: number) {
  const nTambor = iRed > 0 ? nMotor / iRed : 0;
  const v = (Math.PI * (dTamborMm / 1000) * nTambor) / 60;
  const potUtil = fuerzaN * v;
  return { nTambor, v, potUtil, potMotor: eta > 0 ? potUtil / eta : Infinity };
}

/* ───────────── 1. Transmisión ───────────── */

export function TransmisionExplorador({ block }: { block: ToolBlock }) {
  const init = { n1: num(block.params?.a, 1500, 100, 3000), z1: 20, z2: Math.round(num(block.params?.b, 60, 10, 100)), par: 0.5, eta: 95 };
  const [s, setS] = useState(init);
  const r = etapa(s.n1, s.par, s.z1, s.z2, s.eta / 100);
  const w1 = omega(s.n1);
  const p1 = s.par * w1;
  const R1 = 10 + s.z1 * 0.9;
  const R2 = 10 + s.z2 * 0.9;
  const k = Math.min(1, 110 / Math.max(R1, R2));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos ruedas dentadas engranan. Elige los dientes de cada una, la velocidad y el par de entrada y calcula la salida."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad de entrada" value={s.n1} min={100} max={3000} step={100} unit=" rpm" color={MANIM.blue} onChange={(n1) => setS((x) => ({ ...x, n1 }))} />
          <Slider label="Dientes de la rueda motriz z₁" value={s.z1} min={10} max={60} step={1} color={MANIM.orange} onChange={(z1) => setS((x) => ({ ...x, z1 }))} />
          <Slider label="Dientes de la rueda conducida z₂" value={s.z2} min={10} max={100} step={1} color={MANIM.purple} onChange={(z2) => setS((x) => ({ ...x, z2 }))} />
          <Slider label="Par de entrada" value={s.par} min={0.1} max={2} step={0.1} unit=" N·m" color={MANIM.yellow} onChange={(par) => setS((x) => ({ ...x, par }))} />
          <Slider label="Rendimiento de la etapa" value={s.eta} min={80} max={100} step={1} unit=" %" color={MANIM.green} onChange={(eta) => setS((x) => ({ ...x, eta }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="transmision" maxH={170}>
        <circle cx={260 - R2 * k * 0.6} cy={75} r={R1 * k * 0.6} fill={MANIM.orange} fillOpacity={0.35} stroke={MANIM.orange} strokeWidth={3} strokeDasharray="4 3" />
        <circle cx={260 + R1 * k * 0.6} cy={75} r={R2 * k * 0.6} fill={MANIM.purple} fillOpacity={0.35} stroke={MANIM.purple} strokeWidth={3} strokeDasharray="4 3" />
        <text x={260 - R2 * k * 0.6} y={14} textAnchor="middle" fill={MANIM.orange} fontSize={12}>
          z₁ = {s.z1}
        </text>
        <text x={260 + R1 * k * 0.6} y={146} textAnchor="middle" fill={MANIM.purple} fontSize={12}>
          z₂ = {s.z2}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Relación i = z₂/z₁">{f2(r.i)}</Stat>
        <Stat color={MANIM.purple} label="Velocidad de salida">{f0(r.nSalida)} rpm</Stat>
        <Stat color={MANIM.blue} label="ω de salida">{f1(omega(r.nSalida))} rad/s</Stat>
        <Stat color={MANIM.yellow} label="Par de salida">{f2(r.parSalida)} N·m</Stat>
        <Stat color={MANIM.green} label="Potencia entrada → salida">{f0(p1)} → {f0(r.potSalida)} W</Stat>
      </Readout>
      <Note>n₁/n₂ = z₂/z₁ = i. Si i &gt; 1 se <b>reduce</b> la velocidad y se <b>multiplica</b> el par (por i y por el rendimiento): la potencia ni se crea ni se destruye, solo se pierde algo por rozamiento. La velocidad angular es ω = 2π·n/60 rad/s.</Note>
    </Frame>
  );
}

/* ───────────── 2. Reductora de varias etapas ───────────── */

export function ReductoraExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.n, 2, 1, 4)), i: num(block.params?.a, 4, 2, 8), eta: 96, nm: 3000, par: 0.1 };
  const [s, setS] = useState(init);
  const r = reductora(s.nm, s.par, s.i, s.n, s.eta / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un motor rápido y de poco par se acopla a una reductora de varias etapas. Cada etapa reduce la velocidad y pierde algo de rendimiento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Etapas de la reductora" items={[1, 2, 3, 4].map((v) => ({ value: v, label: `${v}` }))} value={s.n} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Relación de cada etapa" value={s.i} min={2} max={8} step={0.5} color={MANIM.orange} onChange={(i) => setS((x) => ({ ...x, i }))} />
          <Slider label="Rendimiento por etapa" value={s.eta} min={85} max={100} step={1} unit=" %" color={MANIM.green} onChange={(eta) => setS((x) => ({ ...x, eta }))} />
          <Slider label="Velocidad del motor" value={s.nm} min={500} max={6000} step={100} unit=" rpm" color={MANIM.blue} onChange={(nm) => setS((x) => ({ ...x, nm }))} />
          <Slider label="Par del motor" value={s.par} min={0.02} max={0.5} step={0.02} unit=" N·m" color={MANIM.yellow} onChange={(par) => setS((x) => ({ ...x, par }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Relación total">{f1(r.iTotal)}</Stat>
        <Stat color={MANIM.green} label="Rendimiento total">{f1(r.eta * 100)} %</Stat>
        <Stat color={MANIM.blue} label="Velocidad de salida">{f1(r.nOut)} rpm</Stat>
        <Stat color={MANIM.yellow} label="Par de salida">{f1(r.parOut)} N·m</Stat>
        <Stat color={MANIM.purple} label="Potencia entrada → salida">{f1(r.potEntrada)} → {f1(r.potSalida)} W</Stat>
      </Readout>
      <Note>Las relaciones se <b>multiplican</b> etapa a etapa (i<sub>total</sub> = i₁·i₂·…) y los rendimientos también (η<sub>total</sub> = η₁·η₂·…). Por eso conviene el menor número de etapas posible: cada una añade pérdidas. A la salida: par = par motor · i · η.</Note>
    </Frame>
  );
}

/* ───────────── 3. Biela-manivela ───────────── */

export function BielaManivelaPosExplorador({ block }: { block: ToolBlock }) {
  const init = { r: num(block.params?.a, 30, 10, 60), l: 100, th: 0 };
  const [s, setS] = useState(init);
  const l = Math.max(s.l, s.r * 1.2);
  const x = posicionEmbolo(s.r, l, s.th);
  const xMax = posicionEmbolo(s.r, l, 0);
  const xMin = posicionEmbolo(s.r, l, 180);
  const t = (s.th * Math.PI) / 180;
  const cx = 110;
  const px = (v: number) => cx + v * 1.6;
  const cyl = 75;
  const crankX = cx + s.r * 1.6 * Math.cos(t);
  const crankY = cyl - s.r * 1.6 * Math.sin(t);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Gira la manivela y mira cómo se mueve el émbolo. La carrera vale el doble del radio de la manivela."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo de la manivela" value={s.th} min={0} max={360} step={5} unit="°" color={MANIM.blue} onChange={(th) => setS((v) => ({ ...v, th }))} />
          <Slider label="Radio de la manivela" value={s.r} min={10} max={60} step={5} unit=" mm" color={MANIM.orange} onChange={(r) => setS((v) => ({ ...v, r }))} />
          <Slider label="Longitud de la biela" value={s.l} min={60} max={200} step={10} unit=" mm" color={MANIM.purple} onChange={(l2) => setS((v) => ({ ...v, l: l2 }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="biela-pos" maxH={170}>
        <circle cx={cx} cy={cyl} r={s.r * 1.6} fill="none" stroke={MANIM.muted} strokeWidth={1} strokeDasharray="4 3" />
        <line x1={cx} y1={cyl} x2={crankX} y2={crankY} stroke={MANIM.orange} strokeWidth={5} />
        <line x1={crankX} y1={crankY} x2={px(x)} y2={cyl} stroke={MANIM.purple} strokeWidth={4} />
        <rect x={px(x)} y={cyl - 14} width={30} height={28} fill={MANIM.blue} fillOpacity={0.6} stroke={MANIM.blue} strokeWidth={2} />
        <circle cx={cx} cy={cyl} r={5} fill={MANIM.ink} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Posición del émbolo">{f1(x)} mm</Stat>
        <Stat color={MANIM.green} label="Carrera (2·r)">{f0(carrera(s.r))} mm</Stat>
        <Stat color={MANIM.purple} label="Recorrido medido">{f1(xMax - xMin)} mm</Stat>
      </Readout>
      <Note>La manivela transforma un giro en un movimiento de vaivén (y al revés, como en un motor de explosión). El émbolo recorre una <b>carrera</b> igual al doble del radio de la manivela. En los extremos (0° y 180°) la velocidad del émbolo es cero.</Note>
    </Frame>
  );
}

/* ───────────── 4. Rozamiento en un plano inclinado ───────────── */

export function RozamientoExplorador({ block }: { block: ToolBlock }) {
  const init = { m: num(block.params?.a, 10, 1, 100), al: num(block.params?.b, 20, 0, 60), mu: 0.3 };
  const [s, setS] = useState(init);
  const r = planoInclinado(s.m, s.al, s.mu);
  const a = (s.al * Math.PI) / 180;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un bloque sobre un plano inclinado. El rozamiento depende de la fuerza normal y del coeficiente μ de las superficies."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa del bloque" value={s.m} min={1} max={100} step={1} unit=" kg" color={MANIM.blue} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Inclinación del plano" value={s.al} min={0} max={60} step={1} unit="°" color={MANIM.orange} onChange={(al) => setS((x) => ({ ...x, al }))} />
          <Slider label="Coeficiente de rozamiento μ" value={s.mu} min={0.05} max={1} step={0.05} color={MANIM.purple} onChange={(mu) => setS((x) => ({ ...x, mu }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="rozamiento" maxH={170}>
        <polygon points={`40,130 480,130 480,${130 - Math.tan(a) * 440 > 10 ? 130 - Math.tan(a) * 440 : 10}`} fill={MANIM.surface} fillOpacity={0.5} stroke={MANIM.muted} strokeWidth={2} />
        <rect x={230} y={100} width={36} height={22} fill={r.desliza ? MANIM.red : MANIM.green} fillOpacity={0.7} transform={`rotate(${-s.al} 248 122)`} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Fuerza normal N">{f1(r.normal)} N</Stat>
        <Stat color={MANIM.purple} label="Rozamiento máximo μ·N">{f1(r.roce)} N</Stat>
        <Stat color={MANIM.orange} label="Componente del peso que lo empuja">{f1(r.tangencial)} N</Stat>
        <Stat color={r.desliza ? MANIM.red : MANIM.green} label="Situación">{r.desliza ? "desliza" : "se queda quieto"}</Stat>
        <Stat color={MANIM.yellow} label="Fuerza para subirlo">{f1(r.fuerzaSubir)} N</Stat>
      </Readout>
      <Note>N = m·g·cosα; rozamiento máximo F<sub>r</sub> = μ·N; el bloque desliza cuando m·g·senα &gt; μ·N, es decir, cuando tgα &gt; μ. El rozamiento es útil (frenos, agarre) y perjudicial (pérdidas, desgaste): se aumenta o se reduce según el caso, y se combate con lubricantes y rodamientos.</Note>
    </Frame>
  );
}

/* ───────────── 5. Cinta transportadora ───────────── */

export function CintaTransportadoraExplorador({ block }: { block: ToolBlock }) {
  const init = { nm: 1400, i: num(block.params?.a, 20, 5, 60), d: 100, F: 80, eta: 70 };
  const [s, setS] = useState(init);
  const r = cinta(s.nm, s.i, s.d, s.F, s.eta / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un motor mueve una cinta a través de una reductora y un tambor. Elige la reductora y calcula la velocidad de la cinta y la potencia del motor."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad del motor" value={s.nm} min={700} max={3000} step={100} unit=" rpm" color={MANIM.blue} onChange={(nm) => setS((x) => ({ ...x, nm }))} />
          <Slider label="Relación de la reductora" value={s.i} min={5} max={60} step={1} color={MANIM.orange} onChange={(i) => setS((x) => ({ ...x, i }))} />
          <Slider label="Diámetro del tambor" value={s.d} min={40} max={250} step={10} unit=" mm" color={MANIM.purple} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Fuerza de arrastre de la carga" value={s.F} min={10} max={500} step={10} unit=" N" color={MANIM.red} onChange={(F) => setS((x) => ({ ...x, F }))} />
          <Slider label="Rendimiento del conjunto" value={s.eta} min={40} max={95} step={5} unit=" %" color={MANIM.green} onChange={(eta) => setS((x) => ({ ...x, eta }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Velocidad del tambor">{f1(r.nTambor)} rpm</Stat>
        <Stat color={MANIM.purple} label="Velocidad de la cinta">{f2(r.v)} m/s</Stat>
        <Stat color={MANIM.yellow} label="Potencia útil F·v">{f1(r.potUtil)} W</Stat>
        <Stat color={MANIM.red} label="Potencia que debe dar el motor">{Number.isFinite(r.potMotor) ? `${f1(r.potMotor)} W` : "—"}</Stat>
      </Readout>
      <Note>v = π·D·n/60 con D en metros. La potencia útil es fuerza por velocidad y el motor debe dar más por los rendimientos (P<sub>motor</sub> = P<sub>útil</sub>/η). Con una reductora mayor la cinta va más lenta, pero el motor trabaja con menos esfuerzo.</Note>
    </Frame>
  );
}
