"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, SplitBar, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const MU0 = 4 * Math.PI * 1e-7;
const rad = (deg: number) => (deg * Math.PI) / 180;
const SQ3 = Math.sqrt(3);

/** Etiquetas tal cual: llevan símbolos (E', μ₀, φ) que las mayúsculas estropearían. */
const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

/** Notación científica sencilla con coma decimal: 1,6·10⁻¹⁹. */
function sci(v: number, d = 2): string {
  if (!Number.isFinite(v) || v === 0) {
    return "0";
  }
  const e = Math.floor(Math.log10(Math.abs(v)));
  const m = v / 10 ** e;
  const sup = String(e).replace(/-/g, "⁻").replace(/\d/g, (c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(c)]!);
  return `${m.toFixed(d).replace(".", ",")}·10${sup}`;
}

/* ───────────── Campo de un hilo y fuerza entre dos hilos ───────────── */

export function CampoHiloExplorador({ block }: { block: ToolBlock }) {
  const init = { i1: num(block.params?.a, 20, 1, 1000), i2: num(block.params?.b, 20, 1, 1000), a: num(block.params?.c, 10, 1, 200), l: 1.5, same: true };
  const [s, setS] = useState(init);
  const a = s.a / 1000;
  const B1 = (MU0 * s.i1) / (2 * Math.PI * a);
  const fl = (MU0 * s.i1 * s.i2) / (2 * Math.PI * a);
  const F = fl * s.l;
  const gap = 30 + Math.min(s.a, 100) * 1.2;
  const farrow = Math.min(70, 8 + Math.log10(1 + fl * 100) * 18);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Duplica una corriente y duplica la distancia: ¿cómo cambia la fuerza? Cambia el sentido de la segunda corriente y mira qué pasa con los hilos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Corriente del hilo 1, I₁" value={s.i1} min={1} max={1000} step={1} unit=" A" color={MANIM.orange} onChange={(i1) => setS((p) => ({ ...p, i1 }))} />
          <Slider label="Corriente del hilo 2, I₂" value={s.i2} min={1} max={1000} step={1} unit=" A" color={MANIM.blue} onChange={(i2) => setS((p) => ({ ...p, i2 }))} />
          <Slider label="Distancia entre hilos, a" value={s.a} min={1} max={200} step={1} unit=" mm" color={MANIM.green} onChange={(a2) => setS((p) => ({ ...p, a: a2 }))} />
          <Slider label="Longitud de los hilos, l" value={s.l} min={0.5} max={5} step={0.5} unit=" m" format={(v) => fmtEs(v, 1)} color={MANIM.purple} onChange={(l) => setS((p) => ({ ...p, l }))} />
          <Choice label="Sentido de I₂" value={s.same ? 1 : 0} onChange={(v) => setS((p) => ({ ...p, same: v === 1 }))} items={[{ value: 1, label: "Mismo sentido" }, { value: 0, label: "Contrario" }]} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Campo de I₁ a la distancia a, B = μ₀I/(2πa)">
          {sci(B1)} T
        </Stat>
        <Stat color={MANIM.red} label="Fuerza por unidad de longitud">
          {sci(fl)} N/m
        </Stat>
        <Stat color={MANIM.red} label="Fuerza sobre l">
          {fmtEs(F, F < 0.01 ? 5 : 3)} N · {s.same ? "atracción" : "repulsión"}
        </Stat>
      </Readout>
      <Svg w={520} h={170} maxH={175} testId="tool-campo-hilo">
        <line x1={40} y1={85 - gap / 2} x2={480} y2={85 - gap / 2} stroke={MANIM.orange} strokeWidth={8} strokeLinecap="round" className="anim-t" />
        <line x1={40} y1={85 + gap / 2} x2={480} y2={85 + gap / 2} stroke={MANIM.blue} strokeWidth={8} strokeLinecap="round" className="anim-t" />
        <text x={30} y={89 - gap / 2} textAnchor="end" fill={MANIM.orange} fontSize={14}>
          I₁
        </text>
        <text x={30} y={89 + gap / 2} textAnchor="end" fill={MANIM.blue} fontSize={14}>
          I₂
        </text>
        {[-1, 1].map((side) => {
          const y0 = 85 + (side * gap) / 2;
          const dir = (s.same ? -side : side) * 1;
          const y1 = y0 + dir * farrow;
          return (
            <g key={side} className="anim-t">
              <line x1={420} y1={y0} x2={420} y2={y1} stroke={MANIM.red} strokeWidth={5} strokeLinecap="round" />
              <polygon points={`420,${y1 + dir * 8} 413,${y1 - dir * 2} 427,${y1 - dir * 2}`} fill={MANIM.red} />
            </g>
          );
        })}
        <text x={436} y={89} fill={MANIM.red} fontSize={14}>
          F
        </text>
      </Svg>
      <MathRenderer text={`$\\dfrac{F}{l} = \\dfrac{\\mu_0}{2\\pi}\\dfrac{I_1 I_2}{a} = 2\\cdot 10^{-7}\\cdot\\dfrac{${fmtEs(s.i1, 0)}\\cdot ${fmtEs(s.i2, 0)}}{${fmtEs(a, 3)}} = ${sci(fl)}\\ \\text{N/m}$`} className="text-lg" />
      <Note>Mismo sentido: los hilos se atraen. Sentidos contrarios: se repelen. La fuerza crece con las dos intensidades y es inversamente proporcional a la distancia (no al cuadrado).</Note>
    </Frame>
  );
}

/* ───────────── Fuerza de Lorentz ───────────── */

const PARTS = [
  { id: "p", label: "Protón", q: 1.602e-19, m: 1.673e-27 },
  { id: "e", label: "Electrón", q: -1.602e-19, m: 9.109e-31 },
  { id: "a", label: "Partícula α", q: 3.204e-19, m: 6.645e-27 },
];

export function LorentzExplorador({ block }: { block: ToolBlock }) {
  const init = { k: 0, v: num(block.params?.a, 8, 0.1, 100), B: num(block.params?.b, 2, 0.1, 5) };
  const [s, setS] = useState(init);
  const p = PARTS[s.k]!;
  const v = s.v * 1e6;
  const F = Math.abs(p.q) * v * s.B;
  const r = (p.m * v) / (Math.abs(p.q) * s.B);
  const T = (2 * Math.PI * p.m) / (Math.abs(p.q) * s.B);
  const Rpx = Math.max(14, Math.min(100, 100 * (Math.log10(r) + 6) / 5));
  const pos = p.q > 0;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Dobla la velocidad y el campo, uno cada vez: ¿qué le pasa al radio? Cambia a electrón y observa el sentido del giro."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Partícula" value={s.k} onChange={(k) => setS((x) => ({ ...x, k }))} items={PARTS.map((x, i) => ({ value: i, label: x.label }))} />
          <Slider label="Velocidad, v" value={s.v} min={0.1} max={100} step={0.1} unit=" ·10⁶ m/s" format={(x) => fmtEs(x, 1)} color={MANIM.yellow} onChange={(v2) => setS((x) => ({ ...x, v: v2 }))} />
          <Slider label="Campo magnético, B" value={s.B} min={0.1} max={5} step={0.1} unit=" T" format={(x) => fmtEs(x, 1)} color={MANIM.blue} onChange={(B) => setS((x) => ({ ...x, B }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Fuerza, F = |q|·v·B">
          {sci(F)} N
        </Stat>
        <Stat color={MANIM.green} label="Radio, r = m·v/(|q|·B)">
          {r >= 1 ? `${fmtEs(r, 2)} m` : r >= 0.01 ? `${fmtEs(r * 100, 2)} cm` : `${fmtEs(r * 1000, 3)} mm`}
        </Stat>
        <Stat color={MANIM.purple} label="Periodo de giro">
          {sci(T)} s
        </Stat>
      </Readout>
      <Svg w={520} h={240} maxH={245} testId="tool-lorentz">
        {Array.from({ length: 8 }, (_, i) =>
          Array.from({ length: 4 }, (_, j) => (
            <g key={`${i}-${j}`} opacity={0.35}>
              <line x1={60 + i * 55 - 5} y1={30 + j * 60 - 5} x2={60 + i * 55 + 5} y2={30 + j * 60 + 5} stroke={MANIM.blue} strokeWidth={2} />
              <line x1={60 + i * 55 - 5} y1={30 + j * 60 + 5} x2={60 + i * 55 + 5} y2={30 + j * 60 - 5} stroke={MANIM.blue} strokeWidth={2} />
            </g>
          )),
        )}
        <circle cx={260} cy={pos ? 120 - Rpx : 120 + Rpx} r={Rpx} fill="none" stroke={pos ? MANIM.green : MANIM.orange} strokeWidth={3.5} className="anim-t" />
        <circle cx={260} cy={120} r={9} fill={pos ? MANIM.red : MANIM.blue} />
        <text x={260} y={125} textAnchor="middle" fill={MANIM.ink} fontSize={13} fontWeight={700}>
          {pos ? "+" : "−"}
        </text>
        <line x1={272} y1={120} x2={340} y2={120} stroke={MANIM.yellow} strokeWidth={3} />
        <polygon points="348,120 336,114 336,126" fill={MANIM.yellow} />
        <text x={356} y={125} fill={MANIM.yellow} fontSize={14}>
          v
        </text>
        <text x={500} y={20} textAnchor="end" fill={MANIM.blue} fontSize={13}>
          B entrando
        </text>
      </Svg>
      <MathRenderer text={`$r = \\dfrac{m\\,v}{|q|\\,B} = \\dfrac{${sci(p.m)}\\cdot ${sci(v, 1)}}{${sci(Math.abs(p.q))}\\cdot ${fmtEs(s.B, 1)}}$`} className="text-base" />
      <Note>La fuerza es perpendicular a la velocidad: no hace trabajo y la partícula describe una circunferencia. Más velocidad, círculo mayor; más campo, círculo menor. El radio del dibujo está en escala logarítmica.</Note>
    </Frame>
  );
}

/* ───────────── Momento sobre una espira ───────────── */

export function EspiraParExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 100, 1, 500)), i: num(block.params?.b, 2, 0.5, 20), s: 100, b: 0.5, phi: Math.round(num(block.params?.c, 90, 0, 180)) };
  const [st, setS] = useState(init);
  const S = st.s / 10000;
  const Mmax = st.n * st.i * S * st.b;
  const M = Mmax * Math.sin(rad(st.phi));
  const X = (a: number) => 50 + (a / 180) * 440;
  const Y = (v: number) => 130 - v * 100;
  const curve = Array.from({ length: 61 }, (_, i) => `${i ? "L" : "M"} ${X(i * 3).toFixed(1)} ${Y(Math.sin(rad(i * 3))).toFixed(1)}`).join(" ");

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el ángulo φ entre S y B: ¿cuándo es máximo el momento y cuándo se anula? Después sube el número de espiras."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo entre S y B, φ" value={st.phi} min={0} max={180} step={1} unit="°" color={MANIM.yellow} onChange={(phi) => setS((x) => ({ ...x, phi }))} />
          <Slider label="Número de espiras, N" value={st.n} min={1} max={500} step={1} color={MANIM.purple} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Corriente, I" value={st.i} min={0.5} max={20} step={0.5} unit=" A" format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(i) => setS((x) => ({ ...x, i }))} />
          <Slider label="Superficie de la espira, S" value={st.s} min={10} max={400} step={10} unit=" cm²" color={MANIM.green} onChange={(s2) => setS((x) => ({ ...x, s: s2 }))} />
          <Slider label="Campo, B" value={st.b} min={0.1} max={2} step={0.1} unit=" T" format={(v) => fmtEs(v, 1)} color={MANIM.blue} onChange={(b) => setS((x) => ({ ...x, b }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Momento, M = N·I·S·B·sen φ">
          {fmtEs(M, 3)} N·m
        </Stat>
        <Stat color={MANIM.yellow} label="Momento máximo (φ = 90°)">
          {fmtEs(Mmax, 3)} N·m
        </Stat>
      </Readout>
      <Svg w={520} h={160} maxH={165} testId="tool-espira">
        <line x1={50} y1={130} x2={495} y2={130} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={130} x2={50} y2={15} stroke={MANIM.muted} strokeWidth={2} />
        <path d={curve} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <circle className="anim-t" cx={X(st.phi)} cy={Y(Math.sin(rad(st.phi)))} r={7} fill={MANIM.yellow} />
        <text x={495} y={150} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          φ (0° – 180°)
        </text>
        <text x={44} y={24} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          M
        </text>
      </Svg>
      <Note>{st.phi === 0 || st.phi === 180 ? "Con S paralelo a B el momento es nulo: la espira está en equilibrio y se detendría." : st.phi === 90 ? "Con S perpendicular a B el par es máximo." : "El momento es proporcional al seno del ángulo."}</Note>
    </Frame>
  );
}

/* ───────────── Fem inducida ───────────── */

export function FemInduccionExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: "barra" as "barra" | "flujo", B: num(block.params?.a, 0.5, 0.1, 2), l: 0.4, v: num(block.params?.b, 3, 0.5, 20), n: 200, dphi: 2, dt: 0.1 };
  const [s, setS] = useState(init);
  const eBarra = s.B * s.l * s.v;
  const eFlujo = (s.n * (s.dphi / 1000)) / s.dt;
  const eps = s.modo === "barra" ? eBarra : eFlujo;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Prueba a doblar la velocidad de la barra, o a hacer el cambio de flujo la mitad de rápido: la fem es la rapidez con que cambia el flujo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Situación" value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} items={[{ value: "barra" as const, label: "Barra que se mueve" }, { value: "flujo" as const, label: "Bobina con flujo variable" }]} />
          {s.modo === "barra" ? (
            <>
              <Slider label="Campo, B" value={s.B} min={0.1} max={2} step={0.1} unit=" T" format={(v) => fmtEs(v, 1)} color={MANIM.blue} onChange={(B) => setS((x) => ({ ...x, B }))} />
              <Slider label="Longitud de la barra, l" value={s.l} min={0.1} max={1} step={0.05} unit=" m" format={(v) => fmtEs(v, 2)} color={MANIM.green} onChange={(l) => setS((x) => ({ ...x, l }))} />
              <Slider label="Velocidad, v" value={s.v} min={0.5} max={20} step={0.5} unit=" m/s" format={(v) => fmtEs(v, 1)} color={MANIM.yellow} onChange={(v) => setS((x) => ({ ...x, v }))} />
            </>
          ) : (
            <>
              <Slider label="Número de espiras, N" value={s.n} min={1} max={1000} step={1} color={MANIM.purple} onChange={(n) => setS((x) => ({ ...x, n }))} />
              <Slider label="Variación de flujo, ΔΦ" value={s.dphi} min={0.1} max={10} step={0.1} unit=" mWb" format={(v) => fmtEs(v, 1)} color={MANIM.blue} onChange={(dphi) => setS((x) => ({ ...x, dphi }))} />
              <Slider label="Tiempo, Δt" value={s.dt} min={0.01} max={1} step={0.01} unit=" s" format={(v) => fmtEs(v, 2)} color={MANIM.orange} onChange={(dt) => setS((x) => ({ ...x, dt }))} />
            </>
          )}
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label={s.modo === "barra" ? "fem, ε = B·l·v" : "fem, |ε| = N·ΔΦ/Δt"}>
          {fmtEs(eps, 3)} V
        </Stat>
      </Readout>
      <SplitBar parts={[{ value: Math.min(eps, 100), color: MANIM.green, label: `${fmtEs(eps, 2)} V` }, { value: Math.max(0, 100 - eps), color: MANIM.panel, label: "" }]} />
      <MathRenderer
        text={s.modo === "barra" ? `$\\varepsilon = B\\,l\\,v = ${fmtEs(s.B, 1)}\\cdot ${fmtEs(s.l, 2)}\\cdot ${fmtEs(s.v, 1)} = ${fmtEs(eBarra, 3)}\\ \\text{V}$` : `$\\varepsilon = -N\\dfrac{\\Delta\\Phi}{\\Delta t} = -${fmtEs(s.n, 0)}\\cdot\\dfrac{${fmtEs(s.dphi / 1000, 4)}}{${fmtEs(s.dt, 2)}} = -${fmtEs(eFlujo, 3)}\\ \\text{V}$`}
        className="text-lg"
      />
      <Note>El signo menos de la ley de Faraday es la ley de Lenz: la fem inducida tiene un sentido tal que se opone a la causa que la produce.</Note>
    </Frame>
  );
}

/* ───────────── Motor de corriente continua: corrientes según la conexión ───────────── */

type Conex = "indep" | "deriv" | "serie";

export function MotorCcExplorador({ block }: { block: ToolBlock }) {
  const init = { c: "deriv" as Conex, U: num(block.params?.a, 200, 50, 500), E: num(block.params?.b, 160, 0, 500), ri: 4, rx: 200, rs: 4 };
  const [s, setS] = useState(init);
  const E = Math.min(s.E, s.U);
  const ri = s.ri;
  const rs = s.rs;
  const Ii = s.c === "serie" ? (s.U - E) / (ri + rs) : (s.U - E) / ri;
  const Iex = s.c === "serie" ? Ii : s.c === "deriv" ? s.U / s.rx : 0;
  const I = s.c === "deriv" ? Ii + Iex : Ii;
  const arranque = s.c === "serie" ? s.U / (ri + rs) : s.U / ri;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la fuerza contraelectromotriz E': la corriente del inducido baja. Cambia la conexión y mira qué intensidades pasan por cada circuito."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Excitación" value={s.c} onChange={(c) => setS((x) => ({ ...x, c }))} items={[{ value: "indep" as const, label: "Independiente" }, { value: "deriv" as const, label: "Derivación" }, { value: "serie" as const, label: "Serie" }]} />
          <Slider label="Tensión de la red, U" value={s.U} min={50} max={500} step={10} unit=" V" color={MANIM.red} onChange={(U) => setS((x) => ({ ...x, U }))} />
          <Slider label="Fuerza contraelectromotriz, E'" value={E} min={0} max={s.U} step={5} unit=" V" color={MANIM.blue} onChange={(e) => setS((x) => ({ ...x, E: e }))} />
          <Slider label="Resistencia del inducido, rᵢ" value={s.ri} min={0.5} max={10} step={0.5} unit=" Ω" format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(ri2) => setS((x) => ({ ...x, ri: ri2 }))} />
          {s.c === "deriv" ? <Slider label="Resistencia de excitación, R_d" value={s.rx} min={40} max={400} step={20} unit=" Ω" color={MANIM.purple} onChange={(rx) => setS((x) => ({ ...x, rx }))} /> : null}
          {s.c === "serie" ? <Slider label="Resistencia del inductor, r_s" value={s.rs} min={0.5} max={10} step={0.5} unit=" Ω" format={(v) => fmtEs(v, 1)} color={MANIM.purple} onChange={(rs2) => setS((x) => ({ ...x, rs: rs2 }))} /> : null}
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Intensidad del inducido, Iᵢ">
          {fmtEs(Ii, 1)} A
        </Stat>
        {s.c !== "indep" ? (
          <Stat color={MANIM.purple} label="Intensidad de excitación, I_ex">
            {fmtEs(Iex, 2)} A
          </Stat>
        ) : null}
        <Stat color={MANIM.green} label="Intensidad de la red, I">
          {fmtEs(I, 1)} A
        </Stat>
        <Stat color={MANIM.red} label="En el arranque (E' = 0)">
          {fmtEs(arranque, 0)} A
        </Stat>
      </Readout>
      <MathRenderer
        text={
          s.c === "serie"
            ? `$I = I_i = I_{ex} = \\dfrac{U - E'}{r_i + r_s} = \\dfrac{${fmtEs(s.U, 0)} - ${fmtEs(E, 0)}}{${fmtEs(ri, 1)} + ${fmtEs(rs, 1)}} = ${fmtEs(Ii, 1)}\\ \\text{A}$`
            : s.c === "deriv"
              ? `$I_{ex} = \\dfrac{U}{R_d} = ${fmtEs(Iex, 2)}\\ \\text{A};\\quad I_i = \\dfrac{U - E'}{r_i} = ${fmtEs(Ii, 1)}\\ \\text{A};\\quad I = I_i + I_{ex} = ${fmtEs(I, 1)}\\ \\text{A}$`
              : `$I = I_i = \\dfrac{U - E'}{r_i} = \\dfrac{${fmtEs(s.U, 0)} - ${fmtEs(E, 0)}}{${fmtEs(ri, 1)}} = ${fmtEs(Ii, 1)}\\ \\text{A}$`
        }
        className="text-base"
      />
      <Note>
        {s.c === "indep" ? "El inductor tiene su propia fuente: el flujo es constante y la red solo alimenta el inducido." : s.c === "deriv" ? "El inductor está en paralelo con el inducido, a la misma tensión: el flujo es prácticamente constante." : "El inductor va en serie con el inducido: el flujo depende de la carga y toda la corriente pasa por los dos."}
      </Note>
    </Frame>
  );
}

/* ───────────── Curvas características del motor de corriente continua ───────────── */

export function CurvasCcExplorador({ block }: { block: ToolBlock }) {
  const init = { c: "deriv" as "deriv" | "serie", I: num(block.params?.a, 10, 2, 40) };
  const [s, setS] = useState(init);
  // Derivación (ejemplo 5 del libro): U = 230, E'0 = 226, n0 = 1500, ri = 2, Mn = 100 a 20 A.
  const U = 230;
  const E0 = 226;
  const n0 = 1500;
  const ri = 2;
  const In = 20;
  const nDer = (I: number) => (n0 * (U - ri * I)) / E0;
  const MDer = (I: number) => 5 * I;
  // Serie (modelo): flujo proporcional a I, R = 1 Ω, n = 1 500 rpm a 20 A.
  const R = 1;
  const nSer = (I: number) => (1500 * ((U - R * I) / I)) / ((U - R * In) / In);
  const MSer = (I: number) => 0.25 * I * I;
  const n = s.c === "deriv" ? nDer(s.I) : nSer(s.I);
  const M = s.c === "deriv" ? MDer(s.I) : MSer(s.I);
  const Ix = (I: number) => 50 + (I / 40) * 200;
  const nMax = s.c === "deriv" ? 1600 : 6500;
  const nMin = s.c === "deriv" ? 900 : 0;
  const Yn = (v: number) => 180 - ((Math.min(v, nMax) - nMin) / (nMax - nMin)) * 160;
  const pathN = Array.from({ length: 79 }, (_, i) => {
    const I = 2 + (i / 78) * 38;
    return `${i ? "L" : "M"} ${Ix(I).toFixed(1)} ${Yn(s.c === "deriv" ? nDer(I) : nSer(I)).toFixed(1)}`;
  }).join(" ");
  const MM = s.c === "deriv" ? 200 : 400;
  const Xn = (v: number) => 300 + ((v - nMin) / (nMax - nMin)) * 200;
  const YM = (v: number) => 180 - (Math.min(v, MM) / MM) * 160;
  const pathM = Array.from({ length: 79 }, (_, i) => {
    const I = 2 + (i / 78) * 38;
    const nn = s.c === "deriv" ? nDer(I) : nSer(I);
    const mm = s.c === "deriv" ? MDer(I) : MSer(I);
    return `${i ? "L" : "M"} ${Xn(Math.min(nn, nMax)).toFixed(1)} ${YM(mm).toFixed(1)}`;
  }).join(" ");

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve la corriente del inducido y compara los dos motores: el derivación casi no cambia de velocidad; el serie se dispara cuando la carga baja."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Motor" value={s.c} onChange={(c) => setS((x) => ({ ...x, c, I: c === "serie" ? Math.max(x.I, 5) : x.I }))} items={[{ value: "deriv" as const, label: "Derivación" }, { value: "serie" as const, label: "Serie" }]} />
          <Slider label="Intensidad del inducido, Iᵢ" value={s.I} min={s.c === "serie" ? 5 : 2} max={40} step={1} unit=" A" color={MANIM.orange} onChange={(I) => setS((x) => ({ ...x, I }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Velocidad, n">
          {fmtEs(n, 0)} rpm
        </Stat>
        <Stat color={MANIM.green} label="Par interno, Mᵢ">
          {fmtEs(M, 1)} N·m
        </Stat>
      </Readout>
      <Svg w={520} h={215} maxH={220} testId="tool-curvas-cc">
        <line x1={50} y1={180} x2={250} y2={180} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={180} x2={50} y2={15} stroke={MANIM.muted} strokeWidth={2} />
        <path d={pathN} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        <circle className="anim-t" cx={Ix(s.I)} cy={Yn(n)} r={6} fill={MANIM.orange} />
        <text x={250} y={200} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          Iᵢ
        </text>
        <text x={56} y={24} fill={MANIM.muted} fontSize={12}>
          n = f(Iᵢ)
        </text>
        <line x1={300} y1={180} x2={500} y2={180} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={300} y1={180} x2={300} y2={15} stroke={MANIM.muted} strokeWidth={2} />
        <path d={pathM} fill="none" stroke={MANIM.green} strokeWidth={3.5} />
        <circle className="anim-t" cx={Xn(Math.min(n, nMax))} cy={YM(M)} r={6} fill={MANIM.orange} />
        <text x={500} y={200} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          n
        </text>
        <text x={306} y={24} fill={MANIM.muted} fontSize={12}>
          M = f(n)
        </text>
      </Svg>
      <Note>
        {s.c === "deriv"
          ? "Derivación: el flujo es constante, así que M ∝ Iᵢ (recta) y la velocidad solo baja un poco con la carga (≈ 4 % de la tensión se pierde en rᵢ·Iᵢ). Muy estable."
          : "Serie: el flujo es proporcional a la corriente, M ∝ Iᵢ² (parábola) y n ∝ 1/Iᵢ (hipérbola). Gran par de arranque, pero en vacío se embala: este motor nunca debe funcionar sin carga."}
      </Note>
    </Frame>
  );
}

/* ───────────── Balance de potencias del motor de corriente continua ───────────── */

export function BalanceCcExplorador({ block }: { block: ToolBlock }) {
  const init = { U: num(block.params?.a, 150, 50, 500), I: num(block.params?.b, 20, 2, 100), ri: 1, rd: 150, I0: 2 };
  const [s, setS] = useState(init);
  const Pab = s.U * s.I;
  const Iex = s.U / s.rd;
  const Pcu1 = s.rd * Iex ** 2;
  const Ii = Math.max(0, s.I - Iex);
  const Pcu2 = s.ri * Ii ** 2;
  const Pvacio = s.U * s.I0;
  const PfeM = Math.max(0, Pvacio - Pcu1);
  const Pu = Math.max(0, Pab - Pcu1 - Pcu2 - PfeM);
  const eta = Pab > 0 ? Pu / Pab : 0;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la corriente absorbida: las pérdidas en el cobre del inducido crecen con el cuadrado y el rendimiento acaba cayendo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión, U" value={s.U} min={50} max={500} step={10} unit=" V" color={MANIM.red} onChange={(U) => setS((x) => ({ ...x, U }))} />
          <Slider label="Intensidad absorbida, I" value={s.I} min={2} max={100} step={1} unit=" A" color={MANIM.orange} onChange={(I) => setS((x) => ({ ...x, I }))} />
          <Slider label="Resistencia del inducido, rᵢ" value={s.ri} min={0.1} max={3} step={0.1} unit=" Ω" format={(v) => fmtEs(v, 1)} color={MANIM.yellow} onChange={(ri) => setS((x) => ({ ...x, ri }))} />
          <Slider label="Corriente en vacío, I₀" value={s.I0} min={0.5} max={10} step={0.5} unit=" A" format={(v) => fmtEs(v, 1)} color={MANIM.purple} onChange={(I0) => setS((x) => ({ ...x, I0 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Potencia absorbida, U·I">
          {fmtEs(Pab, 0)} W
        </Stat>
        <Stat color={MANIM.green} label="Potencia útil">
          {fmtEs(Pu, 0)} W
        </Stat>
        <Stat color={MANIM.blue} label="Rendimiento">
          {fmtEs(eta * 100, 1)} %
        </Stat>
      </Readout>
      <SplitBar
        parts={[
          { value: Pu, color: MANIM.green, label: `P_u ${fmtEs(Pu, 0)}` },
          { value: Pcu1, color: MANIM.orange, label: `${fmtEs(Pcu1, 0)}` },
          { value: Pcu2, color: MANIM.red, label: `${fmtEs(Pcu2, 0)}` },
          { value: PfeM, color: MANIM.purple, label: `${fmtEs(PfeM, 0)}` },
        ]}
        height={42}
      />
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Verde: potencia útil · naranja: cobre del inductor · rojo: cobre del inducido · morado: hierro + mecánicas.</p>
      <Note>
        Pérdidas fijas en vacío (Fe + mecánicas) = U·I₀ − P_Cu1 = {fmtEs(PfeM, 0)} W. Con I = I_i + I_ex = {fmtEs(Ii, 1)} + {fmtEs(Iex, 2)} A, P_Cu2 = rᵢ·Iᵢ² = {fmtEs(Pcu2, 0)} W.
      </Note>
    </Frame>
  );
}

/* ───────────── Arranque con reóstato ───────────── */

export function ArranqueCcExplorador({ block }: { block: ToolBlock }) {
  const init = { U: num(block.params?.a, 250, 50, 500), E: num(block.params?.b, 230, 0, 480), ri: 0.5, k: 2 };
  const [s, setS] = useState(init);
  const E = Math.min(s.E, s.U - 1);
  const In = (s.U - E) / s.ri;
  const Idir = s.U / s.ri;
  const Ia = s.k * In;
  const Ra = Math.max(0, (s.U - s.ri * Ia) / Ia);
  const Ireal = s.U / (s.ri + Ra);
  const W = 440;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara el arranque directo con el del reóstato. Después pide que la intensidad de arranque sea solo 1,5 veces la nominal: ¿qué resistencia hace falta?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión, U" value={s.U} min={50} max={500} step={10} unit=" V" color={MANIM.red} onChange={(U) => setS((x) => ({ ...x, U }))} />
          <Slider label="E' nominal" value={E} min={0} max={s.U - 1} step={5} unit=" V" color={MANIM.blue} onChange={(e) => setS((x) => ({ ...x, E: e }))} />
          <Slider label="Resistencia del inducido, rᵢ" value={s.ri} min={0.1} max={2} step={0.1} unit=" Ω" format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(ri) => setS((x) => ({ ...x, ri }))} />
          <Slider label="Arranque deseado, Iₐ/Iₙ" value={s.k} min={1} max={4} step={0.5} unit=" ×" format={(v) => fmtEs(v, 1)} color={MANIM.green} onChange={(k) => setS((x) => ({ ...x, k }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Intensidad nominal, Iᵢ = (U − E')/rᵢ">
          {fmtEs(In, 1)} A
        </Stat>
        <Stat color={MANIM.red} label="Arranque directo, U/rᵢ">
          {fmtEs(Idir, 0)} A ({fmtEs(Idir / In, 1)} × Iₙ)
        </Stat>
        <Stat color={MANIM.green} label="Reóstato necesario, Rₐ">
          {fmtEs(Ra, 2)} Ω
        </Stat>
      </Readout>
      <Svg w={520} h={110} maxH={115} testId="tool-arranque-cc">
        <rect x={40} y={14} width={W} height={26} fill={MANIM.panel} />
        <rect className="anim-t" x={40} y={14} width={W} height={26} fill={MANIM.red} fillOpacity={0.85} />
        <text x={46} y={32} fill={MANIM.ink} fontSize={13}>
          directo: {fmtEs(Idir, 0)} A
        </text>
        <rect x={40} y={52} width={W} height={26} fill={MANIM.panel} />
        <rect className="anim-t" x={40} y={52} width={Math.min(1, Ireal / Idir) * W} height={26} fill={MANIM.green} fillOpacity={0.85} />
        <text x={46} y={70} fill={MANIM.ink} fontSize={13}>
          con reóstato: {fmtEs(Ireal, 0)} A
        </text>
        <rect className="anim-t" x={40} y={90} width={Math.min(1, In / Idir) * W} height={10} fill={MANIM.orange} />
        <text x={40 + Math.min(1, In / Idir) * W + 8} y={99} fill={MANIM.orange} fontSize={12}>
          nominal {fmtEs(In, 0)} A
        </text>
      </Svg>
      <MathRenderer text={`$R_a = \\dfrac{U - r_i\\,I_{ia}}{I_{ia}} = \\dfrac{${fmtEs(s.U, 0)} - ${fmtEs(s.ri, 1)}\\cdot ${fmtEs(Ia, 0)}}{${fmtEs(Ia, 0)}} = ${fmtEs(Ra, 2)}\\ \\Omega$`} className="text-lg" />
      <Note>Al arrancar E&apos; = 0 y solo limita la corriente rᵢ, que es muy pequeña. El reóstato se va quitando a medida que el motor acelera y E&apos; crece.</Note>
    </Frame>
  );
}

/* ───────────── Velocidad de un motor trifásico ───────────── */

export function VelocidadTrifasicoExplorador({ block }: { block: ToolBlock }) {
  const init = { f: 50 as 50 | 60, p: Math.round(num(block.params?.a, 2, 1, 6)), s: num(block.params?.b, 4, 0, 10) };
  const [st, setS] = useState(init);
  const n1 = (60 * st.f) / st.p;
  const n2 = n1 * (1 - st.s / 100);
  const d = n1 - n2;
  const R = 60;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el número de polos y la frecuencia: así se regula la velocidad. Después sube el deslizamiento y mira cuánto se retrasa el rotor."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Frecuencia de la red" value={st.f} onChange={(f) => setS((x) => ({ ...x, f }))} items={[{ value: 50 as const, label: "50 Hz (Europa)" }, { value: 60 as const, label: "60 Hz (EE. UU.)" }]} />
          <Slider label="Pares de polos, p" value={st.p} min={1} max={6} step={1} color={MANIM.purple} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Slider label="Deslizamiento, s" value={st.s} min={0} max={10} step={0.5} unit=" %" format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(s2) => setS((x) => ({ ...x, s: s2 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Velocidad del campo, n₁ = 60·f/p">
          {fmtEs(n1, 0)} rpm
        </Stat>
        <Stat color={MANIM.green} label="Velocidad del rotor, n₂ = (1 − s)·n₁">
          {fmtEs(n2, 0)} rpm
        </Stat>
        <Stat color={MANIM.orange} label="Deslizamiento absoluto, d = n₁ − n₂">
          {fmtEs(d, 0)} rpm
        </Stat>
      </Readout>
      <Svg w={520} h={150} maxH={155} testId="tool-velocidad-trifasico">
        <circle cx={130} cy={75} r={R} fill="none" stroke={MANIM.blue} strokeWidth={4} />
        <circle cx={390} cy={75} r={R} fill="none" stroke={MANIM.green} strokeWidth={4} />
        <text x={130} y={78} textAnchor="middle" fill={MANIM.blue} fontSize={15}>
          campo {fmtEs(n1, 0)}
        </text>
        <text x={390} y={78} textAnchor="middle" fill={MANIM.green} fontSize={15}>
          rotor {fmtEs(n2, 0)}
        </text>
        <rect x={190} y={72} width={140} height={6} fill={MANIM.panel} />
        <rect className="anim-t" x={190} y={72} width={(n2 / n1) * 140} height={6} fill={MANIM.green} />
        <text x={260} y={62} textAnchor="middle" fill={MANIM.muted} fontSize={12}>
          n₂ / n₁ = {fmtEs(n2 / n1, 3)}
        </text>
      </Svg>
      <MathRenderer text={`$n_1 = \\dfrac{60\\,f}{p} = \\dfrac{60\\cdot ${st.f}}{${st.p}} = ${fmtEs(n1, 0)}\\ \\text{rpm}\\qquad S = \\dfrac{n_1 - n_2}{n_1} = ${fmtEs(st.s, 1)}\\,\\%$`} className="text-lg" />
      <Note>Con {2 * st.p} polos y {st.f} Hz el campo gira a {fmtEs(n1, 0)} rpm. El rotor de un motor asíncrono siempre va algo más lento ({fmtEs(n2, 0)} rpm): si igualara al campo no cortaría líneas y no habría par.</Note>
    </Frame>
  );
}

/* ───────────── Conexión estrella / triángulo ───────────── */

export function TrifasicoConexionExplorador({ block }: { block: ToolBlock }) {
  const init = { placa: 0, red: 230, IL: num(block.params?.a, 18, 1, 100) };
  const [s, setS] = useState(init);
  const placas = [
    { label: "230/400 V", uf: 230, redes: [230, 400] },
    { label: "400/690 V", uf: 400, redes: [400, 690] },
  ];
  const pl = placas[s.placa]!;
  const U = pl.redes.includes(s.red) ? s.red : pl.redes[0]!;
  const tri = U === pl.uf;
  const Uf = tri ? U : U / SQ3;
  const If = tri ? s.IL / SQ3 : s.IL;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Lee la placa: la tensión menor es la que soporta cada devanado. Elige la red y mira si corresponde estrella o triángulo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Placa de características" value={s.placa} onChange={(placa) => setS((x) => ({ ...x, placa, red: placas[placa]!.redes[0]! }))} items={placas.map((p, i) => ({ value: i, label: p.label }))} />
          <Choice label="Tensión de línea de la red" value={U} onChange={(red) => setS((x) => ({ ...x, red }))} items={pl.redes.map((r) => ({ value: r, label: `${r} V` }))} />
          <Slider label="Intensidad de línea, I_L" value={s.IL} min={1} max={100} step={0.5} unit=" A" format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(IL) => setS((x) => ({ ...x, IL }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Conexión correcta">
          {tri ? "Triángulo (Δ)" : "Estrella (Y)"}
        </Stat>
        <Stat color={MANIM.blue} label="Tensión en cada devanado, U_f">
          {fmtEs(Uf, 0)} V
        </Stat>
        <Stat color={MANIM.orange} label="Intensidad en cada devanado, I_f">
          {fmtEs(If, 2)} A
        </Stat>
      </Readout>
      <Svg w={520} h={150} maxH={155} testId="tool-conexion">
        {tri ? (
          <g>
            <polygon points="260,25 205,115 315,115" fill="none" stroke={MANIM.green} strokeWidth={8} strokeLinejoin="round" />
            <text x={260} y={142} textAnchor="middle" fill={MANIM.muted} fontSize={13}>
              U_L = U_f · I_L = √3·I_f
            </text>
          </g>
        ) : (
          <g>
            {[90, 210, 330].map((a) => (
              <line key={a} x1={260} y1={80} x2={260 + 55 * Math.cos(rad(a))} y2={80 - 55 * Math.sin(rad(a))} stroke={MANIM.orange} strokeWidth={8} strokeLinecap="round" />
            ))}
            <text x={260} y={146} textAnchor="middle" fill={MANIM.muted} fontSize={13}>
              U_L = √3·U_f · I_L = I_f
            </text>
          </g>
        )}
      </Svg>
      <Note>Cada devanado debe quedar a {pl.uf} V (la menor tensión de la placa). {tri ? "A esta tensión de línea basta con el triángulo." : "La estrella divide la tensión de línea entre √3."}</Note>
    </Frame>
  );
}

/* ───────────── Característica mecánica del motor asíncrono ───────────── */

export function CurvaParAsincronoExplorador({ block }: { block: ToolBlock }) {
  const init = { load: num(block.params?.a, 100, 5, 200), u: num(block.params?.b, 100, 50, 110) };
  const [s, setS] = useState(init);
  const sk = 0.2;
  const uu = (s.u / 100) ** 2;
  const M = (sl: number) => (2 * uu) / (sl / sk + sk / sl);
  const ml = (s.load / 100) * 0.25;
  const c = (2 * uu) / ml;
  const feasible = ml < uu && c >= 2;
  const x = feasible ? (c - Math.sqrt(c * c - 4)) / 2 : NaN;
  const slip = x * sk;
  const Ma = M(1);
  const arranca = Ma > ml;
  const X = (sl: number) => 50 + (1 - sl) * 440;
  const Y = (m: number) => 190 - m * 170;
  const path = Array.from({ length: 100 }, (_, i) => {
    const sl = Math.max(0.005, 1 - i / 99);
    return `${i ? "L" : "M"} ${X(sl).toFixed(1)} ${Y(M(sl)).toFixed(1)}`;
  }).join(" ");

  return (
    <Frame
      stacked
      hint={block.hint ?? "Aumenta el par resistente hasta que el motor «se cale» (no hay punto de funcionamiento). Baja la tensión al 70 %: el par cae con el cuadrado."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Par resistente de la carga" value={s.load} min={5} max={200} step={1} unit=" %" color={MANIM.red} onChange={(load) => setS((x2) => ({ ...x2, load }))} />
          <Slider label="Tensión aplicada" value={s.u} min={50} max={110} step={1} unit=" %" color={MANIM.blue} onChange={(u) => setS((x2) => ({ ...x2, u }))} />
        </>
      }
    >
      <Readout>
        <Stat color={feasible ? MANIM.green : MANIM.red} label="Punto de funcionamiento">
          {feasible ? `n = ${fmtEs(1500 * (1 - slip), 0)} rpm · s = ${fmtEs(slip * 100, 1)} %` : "no existe: el motor se cala"}
        </Stat>
        <Stat color={arranca ? MANIM.green : MANIM.red} label="Arranque (M_a > M_resistente)">
          {arranca ? "arranca" : "no arranca"}
        </Stat>
      </Readout>
      <Svg w={520} h={225} maxH={230} testId="tool-par-asincrono">
        <line x1={50} y1={190} x2={495} y2={190} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={190} x2={50} y2={12} stroke={MANIM.muted} strokeWidth={2} />
        <path d={path} fill="none" stroke={MANIM.blue} strokeWidth={3.5} className="anim-t" />
        <line x1={50} y1={Y(ml)} x2={490} y2={Y(ml)} stroke={MANIM.red} strokeWidth={2.5} strokeDasharray="6 5" />
        <text x={56} y={Y(ml) - 6} fill={MANIM.red} fontSize={12}>
          par resistente
        </text>
        {feasible ? <circle className="anim-t" cx={X(slip)} cy={Y(ml)} r={7} fill={MANIM.green} /> : null}
        <circle cx={X(1)} cy={Y(Ma)} r={5} fill={MANIM.orange} />
        <text x={X(1) + 8} y={Y(Ma) - 6} fill={MANIM.orange} fontSize={12}>
          arranque
        </text>
        <text x={X(0)} y={206} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          n_s
        </text>
        <text x={X(1)} y={206} textAnchor="start" fill={MANIM.muted} fontSize={12}>
          0
        </text>
        <text x={270} y={218} textAnchor="middle" fill={MANIM.muted} fontSize={12}>
          velocidad n →
        </text>
        <text x={44} y={22} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          M
        </text>
      </Svg>
      <Note>El punto de funcionamiento es donde se cruzan la curva del motor y la de la carga. Con la carga nominal el motor gira muy cerca de la velocidad de sincronismo. Con la tensión reducida el par máximo cae con U².</Note>
    </Frame>
  );
}
