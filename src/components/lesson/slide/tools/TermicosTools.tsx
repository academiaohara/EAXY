"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, SplitBar, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const GAMMA = 1.4;
const rad = (deg: number) => (deg * Math.PI) / 180;
const pct = (v: number, d = 0) => `${fmtEs(v * 100, d)} %`;

/** Etiquetas tal cual: llevan símbolos (η, ε, T_f) que las mayúsculas estropearían. */
const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

/* ───────────── Rendimiento de Carnot y eficiencia frigorífica ───────────── */

export function CarnotExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: "motor" as "motor" | "frigo", tc: num(block.params?.a, 900, 0, 1500), tf: num(block.params?.b, 20, -60, 200) };
  const [s, setS] = useState(init);
  const tf = Math.min(s.tf, s.tc - 1);
  const Tc = s.tc + 273;
  const Tf = tf + 273;
  const eta = 1 - Tf / Tc;
  const cop = Tf / (Tc - Tf);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la temperatura del foco caliente o baja la del frío: el rendimiento de Carnot sube. Fíjate en que se usan kelvin, no grados Celsius."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Máquina" value={s.modo} onChange={(modo) => setS((p) => ({ ...p, modo }))} items={[{ value: "motor" as const, label: "Motor térmico" }, { value: "frigo" as const, label: "Máquina frigorífica" }]} />
          <Slider label="Foco caliente, T_c" value={s.tc} min={0} max={1500} step={5} unit=" °C" color={MANIM.red} onChange={(tc) => setS((p) => ({ ...p, tc }))} />
          <Slider label="Foco frío, T_f" value={tf} min={-60} max={200} step={1} unit=" °C" color={MANIM.blue} onChange={(t) => setS((p) => ({ ...p, tf: t }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="T_c en kelvin">
          {fmtEs(Tc, 0)} K
        </Stat>
        <Stat color={MANIM.blue} label="T_f en kelvin">
          {fmtEs(Tf, 0)} K
        </Stat>
        {s.modo === "motor" ? (
          <Stat color={MANIM.green} label="Rendimiento, η = 1 − T_f/T_c">
            {pct(eta, 1)}
          </Stat>
        ) : (
          <Stat color={MANIM.green} label="Eficiencia, T_f/(T_c − T_f)">
            {fmtEs(cop, 1)}
          </Stat>
        )}
      </Readout>
      {s.modo === "motor" ? (
        <>
          <SplitBar
            parts={[
              { value: eta, color: MANIM.green, label: `W = ${fmtEs(eta * 100, 0)}` },
              { value: 1 - eta, color: MANIM.blue, label: `Q_f = ${fmtEs((1 - eta) * 100, 0)}` },
            ]}
          />
          <Note>De cada 100 unidades de calor Q_c que absorbe del foco caliente, solo {fmtEs(eta * 100, 1)} se convierten en trabajo; el resto se cede al foco frío. Ningún motor real que trabaje entre estas temperaturas puede superar este valor.</Note>
        </>
      ) : (
        <>
          <SplitBar
            parts={[
              { value: 1, color: MANIM.blue, label: "Q_f = 100" },
              { value: 1 / cop, color: MANIM.green, label: `W = ${fmtEs(100 / cop, 1)}` },
            ]}
          />
          <Note>Para extraer 100 unidades de calor Q_f del foco frío hace falta un trabajo de {fmtEs(100 / cop, 1)}; al foco caliente se envían Q_c = {fmtEs(100 + 100 / cop, 1)}. Cuanto menor es el salto de temperatura, menos trabajo.</Note>
        </>
      )}
      <MathRenderer text={s.modo === "motor" ? `$\\eta = 1 - \\dfrac{${fmtEs(Tf, 0)}}{${fmtEs(Tc, 0)}} = ${fmtEs(eta, 3)}$` : `$\\text{COP} = \\dfrac{${fmtEs(Tf, 0)}}{${fmtEs(Tc, 0)} - ${fmtEs(Tf, 0)}} = ${fmtEs(cop, 1)}$`} className="text-lg" />
    </Frame>
  );
}

/* ───────────── Turbina de gas: rendimiento frente a la relación de presiones ───────────── */

export function BraytonExplorador({ block }: { block: ToolBlock }) {
  const init = { rp: num(block.params?.a, 10, 2, 40) };
  const [s, setS] = useState(init);
  const etaF = (r: number) => 1 - 1 / r ** ((GAMMA - 1) / GAMMA);
  const eta = etaF(s.rp);
  const X = (r: number) => 50 + ((r - 1) / 39) * 440;
  const Y = (e: number) => 200 - e * 220;
  const path = Array.from({ length: 79 }, (_, i) => {
    const r = 1 + (i / 78) * 39;
    return `${i ? "L" : "M"} ${X(r).toFixed(1)} ${Y(etaF(r)).toFixed(1)}`;
  }).join(" ");

  return (
    <Frame
      stacked
      hint={block.hint ?? "Aumenta la relación de presiones del compresor: el rendimiento teórico sube, pero cada vez más despacio."}
      onReset={() => setS(init)}
      controls={<Slider label="Relación de presiones, r_p = p₂/p₁" value={s.rp} min={2} max={40} step={0.5} format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(rp) => setS({ rp })} />}
    >
      <Readout>
        <Stat color={MANIM.green} label="Rendimiento, η">
          {pct(eta, 1)}
        </Stat>
        <Stat color={MANIM.red} label="Energía perdida en los gases de escape">
          {pct(1 - eta, 1)}
        </Stat>
      </Readout>
      <Svg w={520} h={230} maxH={235} testId="tool-brayton">
        <line x1={50} y1={200} x2={500} y2={200} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={200} x2={50} y2={10} stroke={MANIM.muted} strokeWidth={2} />
        <path d={path} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        <circle className="anim-t" cx={X(s.rp)} cy={Y(eta)} r={7} fill={MANIM.orange} />
        <text x={500} y={222} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          relación de presiones r_p
        </text>
        <text x={44} y={18} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          η
        </text>
      </Svg>
      <MathRenderer text={`$\\eta = 1 - \\dfrac{1}{r_p^{(\\gamma-1)/\\gamma}} = 1 - \\dfrac{1}{${fmtEs(s.rp, 1)}^{0{,}286}} = ${fmtEs(eta, 2)}\\qquad(\\gamma = 1{,}4)$`} className="text-lg" />
    </Frame>
  );
}

/* ───────────── Otto frente a Diesel ───────────── */

export function OttoDieselExplorador({ block }: { block: ToolBlock }) {
  const init = { r: num(block.params?.a, 10, 5, 24), rc: num(block.params?.b, 2, 1.2, 4) };
  const [s, setS] = useState(init);
  const etaO = 1 - 1 / s.r ** (GAMMA - 1);
  const etaD = 1 - (1 / s.r ** (GAMMA - 1)) * ((s.rc ** GAMMA - 1) / (GAMMA * (s.rc - 1)));
  const detona = s.r > 12;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la relación de compresión: ambos rendimientos mejoran. Pasa de 12 y verás por qué el motor de gasolina no puede seguir."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Relación de compresión, r" value={s.r} min={5} max={24} step={0.5} format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(r) => setS((p) => ({ ...p, r }))} />
          <Slider label="Relación de combustión (Diesel), r_c" value={s.rc} min={1.2} max={4} step={0.1} format={(v) => fmtEs(v, 1)} color={MANIM.purple} onChange={(rc) => setS((p) => ({ ...p, rc }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Otto: η = 1 − 1/r^(γ−1)">
          {pct(etaO, 1)}
        </Stat>
        <Stat color={MANIM.green} label="Diesel">
          {pct(etaD, 1)}
        </Stat>
      </Readout>
      <Svg w={520} h={150} maxH={155} testId="tool-otto-diesel">
        <rect x={110} y={20} width={380 * etaO} height={34} fill={MANIM.blue} fillOpacity={0.8} className="anim-t" />
        <text x={100} y={43} textAnchor="end" fill={MANIM.blue} fontSize={15}>
          Otto
        </text>
        <rect x={110} y={76} width={380 * etaD} height={34} fill={MANIM.green} fillOpacity={0.8} className="anim-t" />
        <text x={100} y={99} textAnchor="end" fill={MANIM.green} fontSize={15}>
          Diesel
        </text>
        <line x1={110} y1={14} x2={110} y2={120} stroke={MANIM.muted} strokeWidth={2} />
        <text x={110} y={140} textAnchor="middle" fill={MANIM.muted} fontSize={12}>
          0
        </text>
        <text x={490} y={140} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          100 %
        </text>
      </Svg>
      <Note>
        {detona
          ? "Con esta relación de compresión un motor de gasolina detonaría (autoinflamación): el ciclo Otto real está limitado, mientras que el Diesel comprime solo aire y admite relaciones mucho mayores."
          : etaD < etaO
            ? "Con la misma relación de compresión y el mismo calor, el ciclo Otto resulta más eficiente que el Diesel teórico."
            : "Con estos valores el Diesel teórico supera al Otto."}
      </Note>
    </Frame>
  );
}

/* ───────────── Potencia de un motor alternativo ───────────── */

const COMBUSTIBLES = [
  { id: "gasolina", label: "Gasolina", dosado: 1 / 14.9, qc: 43_700 },
  { id: "gasoleo", label: "Gasóleo", dosado: 1 / 14.5, qc: 43_200 },
];

export function PotenciaMotorExplorador({ block }: { block: ToolBlock }) {
  const init = { n: num(block.params?.a, 3000, 1000, 8000), vt: num(block.params?.b, 2, 0.5, 5), comb: 0, eta: 30 };
  const [s, setS] = useState(init);
  const c = COMBUSTIBLES[s.comb]!;
  const da = 0.0012; // kg/l, aire a unos 20 °C
  const P = ((s.n / 60 / 2) * s.vt * da * c.dosado * c.qc * s.eta) / 100;
  const cv = (P * 1000) / 735.5;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube las revoluciones o la cilindrada y mira la potencia. ¿Qué otro factor de la fórmula podrías mejorar sin tocar el motor?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Combustible" value={s.comb} onChange={(comb) => setS((p) => ({ ...p, comb }))} items={COMBUSTIBLES.map((x, i) => ({ value: i, label: x.label }))} />
          <Slider label="Revoluciones, N" value={s.n} min={1000} max={8000} step={100} unit=" rpm" color={MANIM.orange} onChange={(n) => setS((p) => ({ ...p, n }))} />
          <Slider label="Cilindrada total, V_T" value={s.vt} min={0.5} max={5} step={0.1} unit=" l" format={(v) => fmtEs(v, 1)} color={MANIM.blue} onChange={(vt) => setS((p) => ({ ...p, vt }))} />
          <Slider label="Rendimiento, η" value={s.eta} min={15} max={50} step={1} unit=" %" color={MANIM.green} onChange={(eta) => setS((p) => ({ ...p, eta }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Potencia">
          {fmtEs(P, 1)} kW
        </Stat>
        <Stat color={MANIM.red} label="En caballos de vapor">
          {fmtEs(cv, 0)} CV
        </Stat>
      </Readout>
      <MathRenderer
        text={`$P = \\dfrac{N}{2}\\,V_T\\,d_a\\,\\delta\\,Q_c\\,\\eta = \\dfrac{${fmtEs(s.n / 60, 1)}}{2}\\cdot ${fmtEs(s.vt, 1)}\\cdot 0{,}0012\\cdot \\dfrac{1}{${fmtEs(1 / c.dosado, 1)}}\\cdot ${fmtEs(c.qc, 0)}\\cdot ${fmtEs(s.eta / 100, 2)} = ${fmtEs(P, 1)}\\ \\text{kW}$`}
        className="text-base"
      />
      <Note>N se mete en vueltas por segundo y se divide entre 2 porque solo hay una explosión cada dos vueltas. La densidad del aire es 0,0012 kg/l; Q_c es el poder calorífico inferior.</Note>
    </Frame>
  );
}

/* ───────────── Cilindrada y cámara de combustión ───────────── */

export function CilindradaExplorador({ block }: { block: ToolBlock }) {
  const init = { d: num(block.params?.a, 89, 50, 120), c: num(block.params?.b, 79.5, 50, 120), r: num(block.params?.c, 10.5, 6, 22), n: 6 };
  const [s, setS] = useState(init);
  const vu = (Math.PI / 4) * (s.d / 10) ** 2 * (s.c / 10); // cm³
  const vt = (vu * s.n) / 1000;
  const vc = vu / (s.r - 1);
  const eta = 1 - 1 / s.r ** (GAMMA - 1);
  const chamberH = 150 / s.r;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el diámetro, la carrera y la relación de compresión: la cilindrada solo depende de las dos primeras; la cámara y el rendimiento, de la relación."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Diámetro del cilindro, D" value={s.d} min={50} max={120} step={0.5} unit=" mm" format={(v) => fmtEs(v, 1)} color={MANIM.blue} onChange={(d) => setS((p) => ({ ...p, d }))} />
          <Slider label="Carrera, C" value={s.c} min={50} max={120} step={0.5} unit=" mm" format={(v) => fmtEs(v, 1)} color={MANIM.green} onChange={(c) => setS((p) => ({ ...p, c }))} />
          <Slider label="Relación de compresión, r" value={s.r} min={6} max={22} step={0.5} format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(r) => setS((p) => ({ ...p, r }))} />
          <Slider label="Número de cilindros" value={s.n} min={1} max={12} step={1} color={MANIM.purple} onChange={(n) => setS((p) => ({ ...p, n }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Cilindrada unitaria, π·D²·C/4">
          {fmtEs(vu, 1)} cm³
        </Stat>
        <Stat color={MANIM.green} label="Cilindrada total">
          {fmtEs(vt, 2)} l
        </Stat>
        <Stat color={MANIM.orange} label="Cámara de combustión, V_c = V_u/(r − 1)">
          {fmtEs(vc, 1)} cm³
        </Stat>
        <Stat color={MANIM.red} label="η Otto ideal">
          {pct(eta, 1)}
        </Stat>
      </Readout>
      <Svg w={520} h={190} maxH={195} testId="tool-cilindrada">
        <rect x={150} y={20} width={90} height={160} fill={MANIM.muted} fillOpacity={0.15} stroke={MANIM.muted} strokeWidth={2} />
        <rect x={150} y={20} width={90} height={chamberH} fill={MANIM.red} fillOpacity={0.5} className="anim-t" />
        <rect x={150} y={20 + chamberH} width={90} height={150 - chamberH} fill={MANIM.blue} fillOpacity={0.25} className="anim-t" />
        <line x1={140} y1={20 + chamberH} x2={250} y2={20 + chamberH} stroke={MANIM.yellow} strokeWidth={3} />
        <line x1={140} y1={170} x2={250} y2={170} stroke={MANIM.yellow} strokeWidth={3} />
        <text x={260} y={20 + chamberH / 2 + 5} fill={MANIM.red} fontSize={14}>
          PMS: cámara de combustión
        </text>
        <text x={260} y={174} fill={MANIM.blue} fontSize={14}>
          PMI: la carrera barre la cilindrada
        </text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Máquina frigorífica y bomba de calor ───────────── */

export function FrigorificaExplorador({ block }: { block: ToolBlock }) {
  const init = { tf: num(block.params?.a, -10, -40, 30), tc: num(block.params?.b, 28, 15, 50), f: 100, qf: 700 };
  const [s, setS] = useState(init);
  const Tf = s.tf + 273;
  const Tc = Math.max(s.tc, s.tf + 5) + 273;
  const copC = Tf / (Tc - Tf);
  const cop = (copC * s.f) / 100;
  const W = s.qf / cop;
  const Qc = s.qf + W;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Baja la temperatura del congelador o sube la de la calle: la eficiencia cae y el trabajo crece. Después, compara con una máquina real que solo alcanza una fracción de Carnot."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Temperatura del recinto frío, T_f" value={s.tf} min={-40} max={30} step={1} unit=" °C" color={MANIM.blue} onChange={(tf) => setS((p) => ({ ...p, tf }))} />
          <Slider label="Temperatura exterior, T_c" value={s.tc} min={15} max={50} step={1} unit=" °C" color={MANIM.red} onChange={(tc) => setS((p) => ({ ...p, tc }))} />
          <Slider label="Fracción de Carnot" value={s.f} min={30} max={100} step={5} unit=" %" color={MANIM.yellow} onChange={(f) => setS((p) => ({ ...p, f }))} />
          <Slider label="Calor a extraer, Q_f" value={s.qf} min={100} max={2000} step={50} unit=" kJ/h" color={MANIM.green} onChange={(qf) => setS((p) => ({ ...p, qf }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="COP de Carnot">
          {fmtEs(copC, 1)}
        </Stat>
        <Stat color={MANIM.green} label="COP real">
          {fmtEs(cop, 1)}
        </Stat>
        <Stat color={MANIM.orange} label="Trabajo, W = Q_f/COP">
          {fmtEs(W, 0)} kJ/h ({fmtEs(W / 3.6, 1)} W)
        </Stat>
        <Stat color={MANIM.red} label="Calor cedido, Q_c = W + Q_f">
          {fmtEs(Qc, 0)} kJ/h
        </Stat>
      </Readout>
      <SplitBar
        parts={[
          { value: s.qf, color: MANIM.blue, label: `Q_f ${fmtEs(s.qf, 0)}` },
          { value: W, color: MANIM.green, label: `W ${fmtEs(W, 0)}` },
        ]}
      />
      <Note>Como bomba de calor (el foco útil es el caliente) la eficiencia sería ε = Q_c/W = {fmtEs(Qc / W, 1)}, siempre mayor que 1: una resistencia eléctrica solo da W.</Note>
    </Frame>
  );
}

/* ───────────── Los cuatro tiempos con el cigüeñal ───────────── */

export function MotorTiemposExplorador({ block }: { block: ToolBlock }) {
  const init = { th: Math.round(num(block.params?.a, 0, 0, 720) / 5) * 5 };
  const [s, setS] = useState(init);
  const R = 34;
  const L = 100;
  const cx = 170;
  const crankY = 235;
  const t = rad(s.th);
  const pinX = cx + R * Math.sin(t);
  const pinY = crankY - R * Math.cos(t);
  const pistonPinY = pinY - Math.sqrt(L * L - (R * Math.sin(t)) ** 2);
  const pistonTop = pistonPinY - 40;
  const cylTop = 20;
  const tiempo = Math.floor((s.th % 720) / 180) + 1;
  const nombres = ["Admisión", "Compresión", "Expansión", "Escape"];
  const admisionAbierta = s.th < 180 + 10 || s.th >= 710;
  const escapeAbierto = s.th >= 540 - 10 && s.th < 720;
  const chispa = s.th >= 345 && s.th <= 375;
  const color = tiempo === 1 ? MANIM.blue : tiempo === 2 ? "#3b7fb0" : tiempo === 3 ? MANIM.red : MANIM.muted;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Gira el cigüeñal 720° (dos vueltas) y fíjate en qué válvula está abierta en cada tiempo y en cuál de ellos baja el pistón empujado por la combustión."}
      onReset={() => setS(init)}
      controls={<Slider label="Ángulo del cigüeñal" value={s.th} min={0} max={720} step={5} unit="°" color={MANIM.orange} onChange={(th) => setS({ th })} />}
    >
      <Readout>
        <Stat color={color} label="Tiempo">
          {tiempo}.º · {nombres[tiempo - 1]}
        </Stat>
        <Stat color={MANIM.green} label="Válvulas">
          admisión {admisionAbierta ? "abierta" : "cerrada"} · escape {escapeAbierto ? "abierto" : "cerrado"}
        </Stat>
        <Stat color={MANIM.red} label="Trabajo">
          {tiempo === 3 ? "sí: el gas empuja el pistón" : "no (lo aporta el volante de inercia)"}
        </Stat>
      </Readout>
      <Svg w={520} h={270} maxH={275} testId="tool-motor-tiempos">
        <rect x={cx - 40} y={cylTop} width={80} height={pistonTop - cylTop + 6} fill={color} fillOpacity={0.4} />
        <rect x={cx - 52} y={cylTop} width={12} height={170} fill={MANIM.muted} fillOpacity={0.5} />
        <rect x={cx + 40} y={cylTop} width={12} height={170} fill={MANIM.muted} fillOpacity={0.5} />
        <rect x={cx - 52} y={cylTop - 14} width={104} height={14} fill={MANIM.muted} fillOpacity={0.5} />
        <rect x={cx - 26} y={cylTop - 8 + (admisionAbierta ? 10 : 0)} width={8} height={14} fill={MANIM.green} />
        <rect x={cx + 18} y={cylTop - 8 + (escapeAbierto ? 10 : 0)} width={8} height={14} fill={MANIM.orange} />
        {chispa ? <polygon points={`${cx},${cylTop + 2} ${cx + 8},${cylTop + 18} ${cx - 8},${cylTop + 18}`} fill={MANIM.yellow} /> : null}
        <line x1={pinX} y1={pinY} x2={cx} y2={pistonPinY} stroke={MANIM.ink} strokeWidth={5} strokeLinecap="round" />
        <rect x={cx - 40} y={pistonTop} width={80} height={44} fill={MANIM.muted} fillOpacity={0.9} stroke={MANIM.ink} strokeWidth={2} />
        <circle cx={cx} cy={crankY} r={R + 12} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={2} />
        <circle cx={pinX} cy={pinY} r={7} fill={MANIM.orange} />
        <text x={cx - 62} y={cylTop - 2} textAnchor="end" fill={MANIM.green} fontSize={12}>
          admisión
        </text>
        <text x={cx + 62} y={cylTop - 2} fill={MANIM.orange} fontSize={12}>
          escape
        </text>
        {nombres.map((n, i) => (
          <g key={n}>
            <rect x={300} y={50 + i * 50} width={190} height={36} rx={8} fill={i + 1 === tiempo ? (i === 2 ? MANIM.red : MANIM.yellow) : MANIM.muted} fillOpacity={i + 1 === tiempo ? 0.85 : 0.2} className="anim-t" />
            <text x={395} y={74 + i * 50} textAnchor="middle" fill={i + 1 === tiempo ? MANIM.surface : MANIM.muted} fontSize={16} fontWeight={700}>
              {i + 1}.º {n}
            </text>
          </g>
        ))}
      </Svg>
      <Note>Cada tiempo es media vuelta del cigüeñal (180°). Solo el tercero produce trabajo; con los otros tres el motor sigue girando gracias al volante de inercia. En la práctica las válvulas se abren antes y se cierran después de los puntos muertos.</Note>
    </Frame>
  );
}
