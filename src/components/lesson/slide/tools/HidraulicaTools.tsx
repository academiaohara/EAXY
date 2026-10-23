"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, SplitBar, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

/** Etiquetas tal cual: llevan símbolos (μ, ν, ψ, η…) que las mayúsculas estropearían. */
const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

const G = 9.8;
const circ = (dMm: number) => (Math.PI / 4) * (dMm / 10) ** 2; // cm²

/* ───────────── Prensa hidráulica ───────────── */

export function PascalPrensaExplorador({ block }: { block: ToolBlock }) {
  const init = { f1: num(block.params?.a, 50, 5, 500), s1: num(block.params?.b, 2.5, 0.5, 20), s2: num(block.params?.c, 150, 10, 600), l1: 7, l2: 10 };
  const [s, setS] = useState(init);
  const p = s.f1 / s.s1; // N/cm²
  const f2 = (s.f1 * s.s2) / s.s1;
  const n = Math.ceil((s.s2 * s.l2) / (s.s1 * s.l1) - 1e-9);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Duplica la sección grande: la fuerza se duplica, pero también las emboladas necesarias. ¿Qué se gana y qué se pierde?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza aplicada, F₁" value={s.f1} min={5} max={500} step={5} unit=" N" color={MANIM.red} onChange={(f1) => setS((x) => ({ ...x, f1 }))} />
          <Slider label="Sección del émbolo pequeño, S₁" value={s.s1} min={0.5} max={20} step={0.5} unit=" cm²" format={(v) => fmtEs(v, 1)} color={MANIM.blue} onChange={(s1) => setS((x) => ({ ...x, s1 }))} />
          <Slider label="Sección del émbolo grande, S₂" value={s.s2} min={10} max={600} step={10} unit=" cm²" color={MANIM.green} onChange={(s2) => setS((x) => ({ ...x, s2 }))} />
          <Slider label="Carrera del émbolo pequeño, l₁" value={s.l1} min={2} max={15} step={1} unit=" cm" color={MANIM.purple} onChange={(l1) => setS((x) => ({ ...x, l1 }))} />
          <Slider label="Desplazamiento deseado, l₂" value={s.l2} min={1} max={30} step={1} unit=" cm" color={MANIM.orange} onChange={(l2) => setS((x) => ({ ...x, l2 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Presión, p = F₁/S₁">
          {fmtEs(p, 1)} N/cm² ({fmtEs(p / 10, 2)} bar)
        </Stat>
        <Stat color={MANIM.green} label="Fuerza obtenida, F₂ = F₁·S₂/S₁">
          {fmtEs(f2, 0)} N
        </Stat>
        <Stat color={MANIM.orange} label="Emboladas, n = S₂·l₂/(S₁·l₁)">
          {n}
        </Stat>
      </Readout>
      <Svg w={520} h={80} maxH={85} testId="tool-pascal">
        <rect x={40} y={20} width={Math.min(200, 12 * s.s1 + 14)} height={30} fill={MANIM.blue} fillOpacity={0.7} className="anim-t" />
        <rect x={260} y={20} width={Math.min(240, s.s2 / 2.6 + 14)} height={30} fill={MANIM.green} fillOpacity={0.7} className="anim-t" />
        <text x={40} y={70} fill={MANIM.muted} fontSize={12}>
          S₁
        </text>
        <text x={260} y={70} fill={MANIM.muted} fontSize={12}>
          S₂ (la fuerza se multiplica por {fmtEs(s.s2 / s.s1, 1)})
        </text>
      </Svg>
      <MathRenderer text={`$F_2 = F_1\\,\\dfrac{S_2}{S_1} = ${fmtEs(s.f1, 0)}\\cdot\\dfrac{${fmtEs(s.s2, 0)}}{${fmtEs(s.s1, 1)}} = ${fmtEs(f2, 0)}\\ \\text{N}$`} className="text-lg" />
      <Note>El volumen que expulsa el émbolo pequeño es el que entra en el grande: S₁·l₁ = S₂·l₂. Se multiplica la fuerza, pero se divide el recorrido (por eso se necesitan varias emboladas).</Note>
    </Frame>
  );
}

/* ───────────── Continuidad y Bernoulli ───────────── */

export function ContinuidadBernoulliExplorador({ block }: { block: ToolBlock }) {
  const init = { d1: num(block.params?.a, 30, 5, 100), d2: num(block.params?.b, 10, 2, 100), q: num(block.params?.c, 30, 1, 300), p1: 30 };
  const [s, setS] = useState(init);
  const d2 = Math.min(s.d2, s.d1);
  const S1 = circ(s.d1);
  const S2 = circ(d2);
  const v1 = (s.q / 60000) / (S1 * 1e-4);
  const v2 = v1 * (S1 / S2);
  const rho = 900;
  const p2 = s.p1 * 1e5 - 0.5 * rho * (v2 * v2 - v1 * v1);
  const cav = p2 < 0.02e5;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Estrecha la tubería: la velocidad crece con el inverso del cuadrado del diámetro y la presión baja. Aumenta el caudal hasta que se acerque a la presión de vapor."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Diámetro de la tubería, D₁" value={s.d1} min={5} max={100} step={1} unit=" mm" color={MANIM.blue} onChange={(d1) => setS((x) => ({ ...x, d1 }))} />
          <Slider label="Diámetro del estrechamiento, D₂" value={d2} min={2} max={100} step={1} unit=" mm" color={MANIM.red} onChange={(dd) => setS((x) => ({ ...x, d2: dd }))} />
          <Slider label="Caudal, Q" value={s.q} min={1} max={300} step={1} unit=" l/min" color={MANIM.green} onChange={(q) => setS((x) => ({ ...x, q }))} />
          <Slider label="Presión en la tubería, p₁" value={s.p1} min={1} max={100} step={1} unit=" bar" color={MANIM.orange} onChange={(p1) => setS((x) => ({ ...x, p1 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Velocidad v₁">
          {fmtEs(v1, 2)} m/s
        </Stat>
        <Stat color={MANIM.red} label="Velocidad v₂ = v₁·(D₁/D₂)²">
          {fmtEs(v2, 2)} m/s
        </Stat>
        <Stat color={cav ? MANIM.red : MANIM.orange} label="Presión p₂ (aceite de 900 kg/m³)">
          {fmtEs(p2 / 1e5, 2)} bar
        </Stat>
      </Readout>
      <Note>
        {cav ? "¡Cuidado! La presión en el estrechamiento cae hasta la de vapor: se forman burbujas de vapor que implosionan aguas abajo (cavitación) y erosionan bombas y válvulas." : v1 > 5 || v2 > 5 ? "La velocidad supera los 5 m/s de una tubería de presión: aumentan las pérdidas y el riesgo de turbulencia." : "Velocidades dentro de lo habitual (2,5–5 m/s en tuberías de presión)."}
      </Note>
    </Frame>
  );
}

/* ───────────── Viscosidad y fuerza de rozamiento (Ejemplo 1) ───────────── */

export function ViscosidadFuerzaExplorador({ block }: { block: ToolBlock }) {
  const init = { nu: num(block.params?.a, 4, 0.1, 50), dr: 0.85, D: 250, hol: 0.125, v: num(block.params?.b, 10, 1, 60), L: 3 };
  const [s, setS] = useState(init);
  const mu = s.nu * s.dr; // poise (dina·s/cm²)
  const S = Math.PI * (s.D / 10) * (s.L * 100); // cm²
  const vcm = (s.v / 60) * 100; // cm/s
  const dvdy = vcm / (s.hol / 10); // 1/s
  const F = (mu * S * dvdy) / 1e5; // N

  return (
    <Frame
      stacked
      hint={block.hint ?? "Prueba con un aceite menos viscoso o con un huelgo mayor: la fuerza de rozamiento cae. Es el caso del elevador hidráulico del libro."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Viscosidad cinemática, ν" value={s.nu} min={0.1} max={50} step={0.1} unit=" cm²/s" format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(nu) => setS((x) => ({ ...x, nu }))} />
          <Slider label="Velocidad del pistón" value={s.v} min={1} max={60} step={1} unit=" m/min" color={MANIM.green} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Huelgo radial, y" value={s.hol} min={0.02} max={0.5} step={0.005} unit=" mm" format={(v) => fmtEs(v, 3)} color={MANIM.blue} onChange={(hol) => setS((x) => ({ ...x, hol }))} />
          <Slider label="Longitud del pistón dentro, L" value={s.L} min={0.5} max={6} step={0.5} unit=" m" format={(v) => fmtEs(v, 1)} color={MANIM.purple} onChange={(L) => setS((x) => ({ ...x, L }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Viscosidad dinámica, μ = ν·d">
          {fmtEs(mu, 2)} poises
        </Stat>
        <Stat color={MANIM.blue} label="Superficie, S = πDL">
          {fmtEs(S, 0)} cm²
        </Stat>
        <Stat color={MANIM.red} label="Fuerza de rozamiento">
          {fmtEs(F, 0)} N ({fmtEs(F / 9.8, 0)} kp)
        </Stat>
      </Readout>
      <MathRenderer text={`$F = \\mu\\,S\\,\\dfrac{\\Delta v}{\\Delta y} = ${fmtEs(mu, 2)}\\cdot ${fmtEs(S, 0)}\\cdot\\dfrac{${fmtEs(vcm, 1)}}{${fmtEs(s.hol / 10, 4)}}\\ \\text{dinas} = ${fmtEs(F, 0)}\\ \\text{N}$`} className="text-base" />
      <Note>1 poise = 1 dina·s/cm²; 1 stoke = 1 cm²/s; μ = ν·d. La fuerza crece con la viscosidad, la superficie y la velocidad, y baja al aumentar el huelgo.</Note>
    </Frame>
  );
}

/* ───────────── Energía de un fluido: alturas de Bernoulli ───────────── */

export function EnergiaBernoulliExplorador({ block }: { block: ToolBlock }) {
  const init = { h: num(block.params?.a, 1, 0, 20), p: num(block.params?.b, 80, 1, 400), v: num(block.params?.c, 3.5, 0, 15), d: 900 };
  const [s, setS] = useState(init);
  const hp = (s.p * 9.8e4) / (s.d * G); // kp/cm² → Pa
  const hc = (s.v * s.v) / (2 * G);
  const tot = s.h + hp + hc;
  const pc = (x: number) => (x / tot) * 100;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la presión, la velocidad y la altura: en oleohidráulica casi toda la energía es de presión. ¿Podrías conseguir que la cinética importe?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Presión de la bomba" value={s.p} min={1} max={400} step={1} unit=" kp/cm²" color={MANIM.red} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Slider label="Velocidad del aceite" value={s.v} min={0} max={15} step={0.5} unit=" m/s" format={(v) => fmtEs(v, 1)} color={MANIM.green} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Altura sobre el depósito" value={s.h} min={0} max={20} step={0.5} unit=" m" format={(v) => fmtEs(v, 1)} color={MANIM.blue} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Geométrica, h">
          {fmtEs(s.h, 2)} m ({fmtEs(pc(s.h), 2)} %)
        </Stat>
        <Stat color={MANIM.red} label="Piezométrica, p/(d·g)">
          {fmtEs(hp, 0)} m ({fmtEs(pc(hp), 2)} %)
        </Stat>
        <Stat color={MANIM.green} label="Cinética, v²/2g">
          {fmtEs(hc, 3)} m ({fmtEs(pc(hc), 2)} %)
        </Stat>
      </Readout>
      <SplitBar
        parts={[
          { value: Math.max(s.h, 0.001), color: MANIM.blue, label: "" },
          { value: hp, color: MANIM.red, label: "presión" },
          { value: Math.max(hc, 0.001), color: MANIM.green, label: "" },
        ]}
      />
      <Note>Con aceite de 900 kg/m³ (0,9 kg/l), la presión aporta casi toda la energía: por eso en automatización oleohidráulica se pueden despreciar la altura y, normalmente, la velocidad.</Note>
    </Frame>
  );
}

/* ───────────── Potencia de la bomba ───────────── */

export function PotenciaHidraulicaExplorador({ block }: { block: ToolBlock }) {
  const init = { p: num(block.params?.a, 80, 1, 400), q: num(block.params?.b, 100, 1, 500), eta: 80 };
  const [s, setS] = useState(init);
  const eta = s.eta / 100;
  const cv = (s.p * s.q) / (450 * eta);
  const kw = (s.p * s.q) / (612 * eta);
  const util = (s.p * s.q) / 612;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara la potencia útil con la que debe tomar el motor eléctrico: la diferencia es el calor que se lleva el aceite."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Presión de trabajo" value={s.p} min={1} max={400} step={1} unit=" kp/cm²" color={MANIM.red} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Slider label="Caudal" value={s.q} min={1} max={500} step={1} unit=" l/min" color={MANIM.blue} onChange={(q) => setS((x) => ({ ...x, q }))} />
          <Slider label="Rendimiento total, η" value={s.eta} min={50} max={95} step={1} unit=" %" color={MANIM.green} onChange={(eta2) => setS((x) => ({ ...x, eta: eta2 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Potencia hidráulica útil">
          {fmtEs(util, 2)} kW
        </Stat>
        <Stat color={MANIM.red} label="Potencia en el eje, P = p·Q/(612·η)">
          {fmtEs(kw, 2)} kW
        </Stat>
        <Stat color={MANIM.orange} label="En caballos, p·Q/(450·η)">
          {fmtEs(cv, 1)} CV
        </Stat>
      </Readout>
      <SplitBar
        parts={[
          { value: util, color: MANIM.green, label: "útil" },
          { value: kw - util, color: MANIM.orange, label: "pérdidas" },
        ]}
      />
      <MathRenderer text={`$P = \\dfrac{p\\,Q}{612\\,\\eta} = \\dfrac{${fmtEs(s.p, 0)}\\cdot ${fmtEs(s.q, 0)}}{612\\cdot ${fmtEs(eta, 2)}} = ${fmtEs(kw, 2)}\\ \\text{kW}$`} className="text-lg" />
      <Note>Fórmulas con p en kp/cm² y Q en l/min. En unidades SI, P = p·Q/η con p en N/m² y Q en m³/s. El rendimiento total de una bomba suele estar entre 0,75 y 0,95.</Note>
    </Frame>
  );
}

/* ───────────── Pérdida de carga ───────────── */

export function PerdidaCargaExplorador({ block }: { block: ToolBlock }) {
  const init = { psi: num(block.params?.a, 0.04, 0.01, 0.2), l: num(block.params?.b, 20, 1, 100), d: 20, v: num(block.params?.c, 4, 0.5, 8) };
  const [s, setS] = useState(init);
  const hf = s.psi * (s.l / (s.d / 1000)) * ((s.v * s.v) / (2 * G));
  const dp = (900 * G * hf) / 1e5;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Dobla la velocidad: la pérdida se cuadruplica. Aumenta el diámetro y observa cuánto mejora."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Coeficiente de fricción, ψ" value={s.psi} min={0.01} max={0.2} step={0.005} format={(v) => fmtEs(v, 3)} color={MANIM.purple} onChange={(psi) => setS((x) => ({ ...x, psi }))} />
          <Slider label="Longitud de la tubería, l" value={s.l} min={1} max={100} step={1} unit=" m" color={MANIM.blue} onChange={(l) => setS((x) => ({ ...x, l }))} />
          <Slider label="Diámetro interior, D" value={s.d} min={6} max={60} step={1} unit=" mm" color={MANIM.green} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Velocidad, v" value={s.v} min={0.5} max={8} step={0.1} unit=" m/s" format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(v) => setS((x) => ({ ...x, v }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Pérdida de carga, h_f">
          {fmtEs(hf, 1)} m de aceite
        </Stat>
        <Stat color={MANIM.orange} label="Caída de presión">
          {fmtEs(dp, 2)} bar
        </Stat>
      </Readout>
      <MathRenderer text={`$h_f = \\psi\\,\\dfrac{l}{D}\\,\\dfrac{v^2}{2g} = ${fmtEs(s.psi, 3)}\\cdot\\dfrac{${fmtEs(s.l, 0)}}{${fmtEs(s.d / 1000, 3)}}\\cdot\\dfrac{${fmtEs(s.v, 1)}^2}{2g} = ${fmtEs(hf, 1)}\\ \\text{m}$`} className="text-base" />
      <Note>La pérdida crece con la longitud y con el cuadrado de la velocidad, y baja con el diámetro. En codos, racores y otros accesorios se usa una «longitud equivalente» de tubería recta.</Note>
    </Frame>
  );
}

/* ───────────── Caudal de los distintos tipos de bomba ───────────── */

type TipoBomba = "engranajes" | "paletas" | "pistones" | "tornillo";

export function BombaCaudalExplorador({ block }: { block: ToolBlock }) {
  const init = { tipo: (["engranajes", "paletas", "pistones", "tornillo"] as const)[Math.round(num(block.params?.a, 0, 0, 3))] as TipoBomba, n: 1500, z: 12, m: 4, h: 30, D: 60, e: 5, zp: 7, De: 40, Di: 20, paso: 30, eta: 80 };
  const [s, setS] = useState(init);
  const Q = (() => {
    switch (s.tipo) {
      case "engranajes":
        return (Math.PI * s.z * s.m * s.m * s.h * s.n) / 500000;
      case "paletas":
        return (Math.PI * s.h * s.e * s.D * s.n) / 500000;
      case "pistones":
        return (Math.PI * s.D * s.D * s.e * s.zp * s.n) / 2e6;
      default:
        return (Math.PI * (s.De ** 2 - s.Di ** 2) * s.paso * s.n) / 4e6;
    }
  })();
  const Qreal = Q * (s.eta / 100);
  const desp = s.n > 0 ? (Q * 1000) / s.n : 0;
  const formula: Record<TipoBomba, string> = {
    engranajes: "Q = \\dfrac{\\pi\\,z\\,m^2\\,h\\,n}{500\\,000}",
    paletas: "Q = \\dfrac{\\pi\\,h\\,e\\,D\\,n}{500\\,000}",
    pistones: "Q = \\dfrac{\\pi\\,D^2\\,e\\,z\\,n}{2\\cdot 10^6}",
    tornillo: "Q = \\dfrac{\\pi\\,(D_e^2 - D_i^2)\\,s\\,n}{4\\cdot 10^6}",
  };
  const sl = (label: string, k: keyof typeof init, min: number, max: number, step: number, unit: string) => (
    <Slider key={k} label={label} value={s[k] as number} min={min} max={max} step={step} unit={unit} color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, [k]: v }))} />
  );

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el tipo de bomba y cambia sus dimensiones. El caudal real es el teórico por el rendimiento volumétrico (0,75–0,85 en engranajes)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo de bomba" value={s.tipo} onChange={(tipo) => setS((x) => ({ ...x, tipo }))} items={[{ value: "engranajes" as const, label: "Engranajes" }, { value: "paletas" as const, label: "Paletas" }, { value: "pistones" as const, label: "Pistones radiales" }, { value: "tornillo" as const, label: "Tornillo" }]} />
          {sl("Velocidad, n", "n", 500, 3000, 50, " rpm")}
          {s.tipo === "engranajes" ? (
            <>
              {sl("Dientes, z", "z", 6, 30, 1, "")}
              {sl("Módulo, m", "m", 1, 8, 0.5, " mm")}
              {sl("Longitud del diente, h", "h", 10, 80, 1, " mm")}
            </>
          ) : null}
          {s.tipo === "paletas" ? (
            <>
              {sl("Diámetro de la carcasa, D", "D", 30, 120, 1, " mm")}
              {sl("Excentricidad, e", "e", 0, 15, 0.5, " mm")}
              {sl("Longitud de la paleta, h", "h", 10, 80, 1, " mm")}
            </>
          ) : null}
          {s.tipo === "pistones" ? (
            <>
              {sl("Diámetro del émbolo, D", "D", 5, 30, 1, " mm")}
              {sl("Excentricidad, e", "e", 0, 15, 0.5, " mm")}
              {sl("Número de émbolos, z", "zp", 3, 11, 1, "")}
            </>
          ) : null}
          {s.tipo === "tornillo" ? (
            <>
              {sl("Diámetro exterior, Dₑ", "De", 20, 80, 1, " mm")}
              {sl("Diámetro interior, Dᵢ", "Di", 8, 60, 1, " mm")}
              {sl("Paso, s", "paso", 10, 80, 1, " mm")}
            </>
          ) : null}
          {sl("Rendimiento volumétrico, ηᵥ", "eta", 70, 98, 1, " %")}
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Caudal teórico">
          {fmtEs(Q, 1)} l/min
        </Stat>
        <Stat color={MANIM.orange} label="Caudal real, Q·ηᵥ">
          {fmtEs(Qreal, 1)} l/min
        </Stat>
        <Stat color={MANIM.purple} label="Desplazamiento (por vuelta)">
          {fmtEs(desp, 1)} cm³
        </Stat>
      </Readout>
      <MathRenderer text={`$${formula[s.tipo]}$`} className="text-lg" />
      <Note>El desplazamiento (volumen bombeado en una vuelta) es una constante de la máquina; el caudal depende además de las revoluciones. Las bombas de pistones llegan a 700 bar y las de engranajes a unos 200.</Note>
    </Frame>
  );
}

/* ───────────── Cilindro hidráulico: fuerza y velocidad ───────────── */

export function CilindroHidraulicoExplorador({ block }: { block: ToolBlock }) {
  const init = { D: num(block.params?.a, 32, 20, 200), d: num(block.params?.b, 22, 6, 120), p: num(block.params?.c, 150, 10, 400), q: 50 };
  const [s, setS] = useState(init);
  const d = Math.min(s.d, s.D - 2);
  const S = circ(s.D);
  const Sr = S - circ(d);
  const Fa = S * s.p * 0.9 * 10; // N (1 bar ≈ 10 N/cm²)
  const Fr = Sr * s.p * 0.9 * 10;
  const va = (s.q * 1000) / S / 100 / 60; // m/s
  const vr = (s.q * 1000) / Sr / 100 / 60;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Con el mismo caudal, el avance es más lento y con más fuerza que el retroceso. Ajusta el vástago y mira cuánto cambia el retroceso."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Diámetro del émbolo, D" value={s.D} min={20} max={200} step={1} unit=" mm" color={MANIM.blue} onChange={(D) => setS((x) => ({ ...x, D }))} />
          <Slider label="Diámetro del vástago, d" value={d} min={6} max={120} step={1} unit=" mm" color={MANIM.green} onChange={(dd) => setS((x) => ({ ...x, d: dd }))} />
          <Slider label="Presión de trabajo" value={s.p} min={10} max={400} step={5} unit=" bar" color={MANIM.red} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Slider label="Caudal de la bomba" value={s.q} min={5} max={200} step={5} unit=" l/min" color={MANIM.orange} onChange={(q) => setS((x) => ({ ...x, q }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Avance: fuerza real (10 % de rozamiento)">
          {fmtEs(Fa, 0)} N ({fmtEs(Fa / 9800, 2)} tm)
        </Stat>
        <Stat color={MANIM.green} label="Avance: velocidad">
          {fmtEs(va, 2)} m/s
        </Stat>
        <Stat color={MANIM.orange} label="Retroceso: fuerza real">
          {fmtEs(Fr, 0)} N
        </Stat>
        <Stat color={MANIM.orange} label="Retroceso: velocidad">
          {fmtEs(vr, 2)} m/s
        </Stat>
      </Readout>
      <Note>Con la misma presión y caudal, el retroceso tiene menos superficie (S&apos; = π(R² − r²)): más velocidad y menos fuerza. Esto es lo que ocurre en un cilindro diferencial.</Note>
    </Frame>
  );
}

/* ───────────── Válvula limitadora: presión de tarado ───────────── */

export function LimitadoraExplorador({ block }: { block: ToolBlock }) {
  const init = { tarado: num(block.params?.a, 150, 20, 300), carga: num(block.params?.b, 100, 0, 300), q: 40 };
  const [s, setS] = useState(init);
  const abre = s.carga >= s.tarado;
  const pSist = Math.min(s.carga, s.tarado);
  const qCil = abre ? 0 : s.q;
  const qDep = s.q - qCil;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la presión que pide la carga por encima del tarado: la válvula abre y todo el caudal vuelve al depósito."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Presión de tarado de la limitadora" value={s.tarado} min={20} max={300} step={5} unit=" bar" color={MANIM.red} onChange={(tarado) => setS((x) => ({ ...x, tarado }))} />
          <Slider label="Presión que exige la carga" value={s.carga} min={0} max={300} step={5} unit=" bar" color={MANIM.orange} onChange={(carga) => setS((x) => ({ ...x, carga }))} />
          <Slider label="Caudal de la bomba" value={s.q} min={5} max={200} step={5} unit=" l/min" color={MANIM.blue} onChange={(q) => setS((x) => ({ ...x, q }))} />
        </>
      }
    >
      <Readout>
        <Stat color={abre ? MANIM.red : MANIM.green} label="Válvula">
          {abre ? "abierta (descarga)" : "cerrada"}
        </Stat>
        <Stat color={MANIM.yellow} label="Presión en el circuito">
          {fmtEs(pSist, 0)} bar
        </Stat>
        <Stat color={MANIM.green} label="Caudal al cilindro">
          {fmtEs(qCil, 0)} l/min
        </Stat>
        <Stat color={MANIM.red} label="Caudal al depósito">
          {fmtEs(qDep, 0)} l/min
        </Stat>
      </Readout>
      <Note>{abre ? "El aceite se descarga a la presión de tarado: toda la energía de la bomba se convierte en calor. Si es frecuente, conviene una válvula de tres posiciones con centro abierto." : "Mientras la carga pida menos que el tarado, la válvula no interviene y todo el caudal va al cilindro."}</Note>
    </Frame>
  );
}
