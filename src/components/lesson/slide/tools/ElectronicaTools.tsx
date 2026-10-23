"use client";

import { useEffect, useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, TOOL_BTN, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

const toBin = (n: number, bits = 8) => n.toString(2).padStart(bits, "0");

function BitRow({ bits, onToggle, label }: { bits: boolean[]; onToggle: (i: number) => void; label?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label ?? "Bits"}>
      {bits.map((b, i) => (
        <button
          key={i}
          type="button"
          aria-pressed={b}
          className={`${TOOL_BTN} min-w-[2.5rem] font-mono ${b ? "border-[color:var(--stage-ink,#fff)] bg-white/20" : ""}`}
          onClick={() => onToggle(i)}
        >
          {b ? "1" : "0"}
        </button>
      ))}
    </div>
  );
}

function Lamp({ on, x = 400, y = 60 }: { on: boolean; x?: number; y?: number }) {
  return (
    <g className="anim-t">
      <circle cx={x} cy={y} r={22} fill={on ? MANIM.yellow : MANIM.surface} stroke={MANIM.ink} strokeWidth={3} />
      <text x={x} y={y + 5} textAnchor="middle" fill={MANIM.ink} fontSize={14}>
        L
      </text>
    </g>
  );
}

/* ───────────── 1. Cuantización A/D ───────────── */

export function CuantizacionAdExplorador({ block }: { block: ToolBlock }) {
  const init = { vol: num(block.params?.a, 30, 0, 60), V: num(block.params?.b, 6, 0, 12), bits: num(block.params?.c, 4, 1, 8) };
  const [s, setS] = useState(init);
  const V = s.V;
  const levels = 2 ** s.bits;
  const code = Math.min(levels - 1, Math.floor((V / 12) * levels));
  const Vq = (code / (levels - 1 || 1)) * 12;
  const res = 12 / (levels - 1 || 1);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube los bits: el código binario se aproxima mejor a la tensión real y la resolución del conversor mejora."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Volumen en el depósito" value={s.vol} min={0} max={60} step={1} unit=" L" color={MANIM.blue} onChange={(vol) => setS((x) => ({ ...x, vol, V: (vol / 60) * 12 }))} />
          <Slider label="Tensión analógica" value={s.V} min={0} max={12} step={0.1} unit=" V" format={f1} color={MANIM.orange} onChange={(Vv) => setS((x) => ({ ...x, V: Vv, vol: (Vv / 12) * 60 }))} />
          <Slider label="Bits del conversor A/D" value={s.bits} min={1} max={8} step={1} color={MANIM.green} onChange={(bits) => setS((x) => ({ ...x, bits }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Tensión analógica (lineal 5 L → 1 V)">
          {f1(V)} V
        </Stat>
        <Stat color={MANIM.green} label="Código cuantizado (decimal)">
          {code} / {levels - 1}
        </Stat>
        <Stat color={MANIM.yellow} label="Código binario">
          {toBin(code, s.bits)}
        </Stat>
        <Stat color={MANIM.red} label="Resolución ΔV ≈ 12/(2ⁿ−1)">
          {f2(res)} V
        </Stat>
      </Readout>
      <Svg w={520} h={120} maxH={125} testId="tool-cuantizacion-ad">
        <line x1={40} y1={90} x2={480} y2={90} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={90} x2={40} y2={20} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40 + (V / 12) * 440} y1={25} x2={40 + (V / 12) * 440} y2={85} stroke={MANIM.blue} strokeWidth={3} strokeDasharray="4 4" />
        <rect x={40} y={70 - (Vq / 12) * 50} width={440} height={(Vq / 12) * 50} fill={MANIM.orange} fillOpacity={0.85} className="anim-t" />
      </Svg>
      <Note>Con pocos bits el escalón de cuantización es grande; en instrumentación real suelen usarse 10–12 bits o más para reducir el error de cuantización.</Note>
    </Frame>
  );
}

/* ───────────── 2. Sensor inductivo ───────────── */

type MatInd = "fe" | "al" | "plastic";

export function InductivoSnExplorador({ block }: { block: ToolBlock }) {
  const init = { d: num(block.params?.a, 6, 0, 15), mat: (block.params?.b === 1 ? "al" : block.params?.b === 2 ? "plastic" : "fe") as MatInd };
  const [s, setS] = useState(init);
  const sn = s.mat === "fe" ? 8 : s.mat === "al" ? 4 : 0;
  const detected = s.mat !== "plastic" && s.d <= sn;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Acerca el metal al frente activo: el acero activa a mayor distancia que el aluminio; el plástico no conmuta."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Distancia pieza – sensor" value={s.d} min={0} max={15} step={0.5} unit=" mm" format={f1} color={MANIM.blue} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Choice
            label="Material de la pieza"
            value={s.mat}
            onChange={(mat) => setS((x) => ({ ...x, mat }))}
            items={[
              { value: "fe", label: "Acero (Fe)" },
              { value: "al", label: "Aluminio" },
              { value: "plastic", label: "Plástico" },
            ]}
          />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Alcance nominal Sn (modelo)">
          {sn > 0 ? `${f1(sn)} mm` : "—"}
        </Stat>
        <Stat color={detected ? MANIM.green : MANIM.red} label="Salida del sensor">
          {detected ? "DETECTADO (1)" : "Libre (0)"}
        </Stat>
      </Readout>
      <Svg w={520} h={100} maxH={105} testId="tool-inductivo-sn">
        <rect x={60} y={35} width={50} height={50} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={2} rx={4} />
        <text x={85} y={65} textAnchor="middle" fill={MANIM.muted} fontSize={11}>
          LC
        </text>
        <rect className="anim-t" x={110 + s.d * 18} y={40} width={36} height={40} fill={s.mat === "fe" ? MANIM.blue : s.mat === "al" ? MANIM.orange : MANIM.muted} stroke={MANIM.ink} />
        <line x1={110} y1={60} x2={110 + s.d * 18} y2={60} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 4" />
        <circle cx={470} cy={60} r={16} fill={detected ? MANIM.green : MANIM.surface} stroke={MANIM.ink} strokeWidth={2} />
      </Svg>
      <Note>Las corrientes de Foucault en el metal amortiguan el oscilador; la histéresis evita parpadeos cuando la pieza queda justo en el límite de Sn.</Note>
    </Frame>
  );
}

/* ───────────── 3. Óptica modos ───────────── */

export function OpticaModosExplorador({ block }: { block: ToolBlock }) {
  const init = { mode: "barrier" as "barrier" | "reflection" | "direct", obj: true };
  const [s, setS] = useState(init);
  const out = s.mode === "barrier" ? !s.obj : s.mode === "reflection" ? s.obj : s.obj;

  return (
    <Frame
      stacked
      hint={block.hint ?? "En barrera falta luz si hay objeto; en reflexión con reflector la señal cae al interponerse; en directo el haz rebota en el propio objeto."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice
            label="Modo óptico"
            value={s.mode}
            onChange={(mode) => setS((x) => ({ ...x, mode }))}
            items={[
              { value: "barrier", label: "Barrera (emisor–receptor)" },
              { value: "reflection", label: "Reflexión (reflector)" },
              { value: "direct", label: "Directo sobre objeto" },
            ]}
          />
          <Choice
            label="Objeto en el haz"
            value={s.obj ? 1 : 0}
            onChange={(v) => setS((x) => ({ ...x, obj: v === 1 }))}
            items={[{ value: 1, label: "Sí" }, { value: 0, label: "No" }]}
          />
        </>
      }
    >
      <Readout>
        <Stat color={out ? MANIM.green : MANIM.red} label="Salida lógica">
          {out ? "1 (luz recibida / activo)" : "0 (interrumpido)"}
        </Stat>
      </Readout>
      <Svg w={520} h={110} maxH={115} testId="tool-optica-modos">
        <line x1={50} y1={55} x2={s.obj ? 220 : 400} y2={55} stroke={MANIM.yellow} strokeWidth={3} />
        {s.mode === "reflection" ? <rect x={400} y={40} width={20} height={30} fill={MANIM.muted} /> : null}
        {s.obj ? <rect x={240} y={35} width={24} height={40} fill={MANIM.orange} className="anim-t" /> : null}
        <text x={260} y={95} textAnchor="middle" fill={MANIM.muted} fontSize={12}>
          {s.mode}
        </text>
      </Svg>
      <Note>La luz suele ser infrarroja modulada para ignorar la iluminación ambiente; el receptor solo cuenta pulsos del emisor.</Note>
    </Frame>
  );
}

/* ───────────── 4. Galga extensiométrica ───────────── */

export function GalgaDeformacionExplorador({ block }: { block: ToolBlock }) {
  const init = {
    F: num(block.params?.a, 500, 0, 5000),
    R: num(block.params?.b, 1200, 100, 5000),
    k: num(block.params?.c, 2.1, 1, 3),
    E: num(block.params?.d, 210, 50, 300) * 1e3,
    A: 100,
  };
  const [s, setS] = useState(init);
  const sigma = s.F / s.A; // N/mm² ≈ MPa si A en mm²
  const eps = sigma / s.E;
  const dR = s.R * s.k * eps;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Aumenta la fuerza: la deformación ε crece y la resistencia de la galga cambia proporcionalmente (efecto piezorresistivo)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza axial, F" value={s.F} min={0} max={5000} step={50} unit=" N" color={MANIM.red} onChange={(F) => setS((x) => ({ ...x, F }))} />
          <Slider label="Resistencia nominal, R" value={s.R} min={100} max={5000} step={50} unit=" Ω" color={MANIM.blue} onChange={(R) => setS((x) => ({ ...x, R }))} />
          <Slider label="Factor de galga, k" value={s.k} min={1} max={3} step={0.1} format={f1} color={MANIM.orange} onChange={(k) => setS((x) => ({ ...x, k }))} />
          <Slider label="Módulo de Young, E" value={s.E / 1e3} min={50} max={300} step={5} unit=" GPa" color={MANIM.green} onChange={(E) => setS((x) => ({ ...x, E: E * 1e3 }))} />
          <Slider label="Sección, A" value={s.A} min={10} max={500} step={5} unit=" mm²" color={MANIM.purple} onChange={(A) => setS((x) => ({ ...x, A }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Tensión σ = F/A">
          {f1(sigma)} MPa
        </Stat>
        <Stat color={MANIM.green} label="Deformación ε = σ/E">
          {fmtEs(eps, 5)}
        </Stat>
        <Stat color={MANIM.orange} label="ΔR = R·k·ε">
          {f2(dR)} Ω
        </Stat>
      </Readout>
      <MathRenderer text={`$\\Delta R = R\\,k\\,\\varepsilon = ${f0(s.R)}\\cdot ${f1(s.k)}\\cdot ${fmtEs(eps, 5)} = ${f2(dR)}\\ \\Omega$`} className="text-base" />
      <Note>En un puente de Wheatstone la variación de ΔR se convierte en tensión medible; el factor k depende de la orientación de la galga respecto al eje principal.</Note>
    </Frame>
  );
}

/* ───────────── 5. Encoder y frecuencia ───────────── */

export function EncoderRpmExplorador({ block }: { block: ToolBlock }) {
  const init = { ppr: num(block.params?.a, 360, 1, 2048), rpm: num(block.params?.b, 300, 0, 3000) };
  const [s, setS] = useState(init);
  const f = (s.rpm / 60) * s.ppr;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Duplica las RPM o los pulsos por vuelta: la frecuencia del tren de impulsos se duplica también."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Pulsos por revolución (PPR)" value={s.ppr} min={1} max={2048} step={1} color={MANIM.blue} onChange={(ppr) => setS((x) => ({ ...x, ppr }))} />
          <Slider label="Velocidad del eje" value={s.rpm} min={0} max={3000} step={10} unit=" rpm" color={MANIM.orange} onChange={(rpm) => setS((x) => ({ ...x, rpm }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Frecuencia f = (rpm/60)·PPR">
          {f1(f)} Hz
        </Stat>
        <Stat color={MANIM.yellow} label="Periodo entre flancos">
          {f > 0 ? `${fmtEs(1000 / f, 2)} ms` : "—"}
        </Stat>
      </Readout>
      <MathRenderer text={`$f = \\dfrac{\\text{rpm}}{60}\\cdot \\text{PPR} = \\dfrac{${f0(s.rpm)}}{60}\\cdot ${f0(s.ppr)} = ${f1(f)}\\ \\text{Hz}$`} className="text-lg" />
      <Note>Contando pulsos en una ventana de tiempo obtienes posición y velocidad; con dos canales en cuadratura también discriminas el sentido de giro.</Note>
    </Frame>
  );
}

/* ───────────── 6. Presión / temperatura ───────────── */

export function CaptadorPresionTempExplorador({ block }: { block: ToolBlock }) {
  const init = { tipo: "bourdon" as "bourdon" | "termopar", val: num(block.params?.a, 5, 0, 10) };
  const [s, setS] = useState(init);
  const unit = s.tipo === "bourdon" ? " bar" : " mV";
  const label = s.tipo === "bourdon" ? "Presión manométrica" : "Tensión del termopar (modelo)";

  return (
    <Frame
      stacked
      hint={block.hint ?? "El Bourdon deforma un tubo curvo con la presión; el termopar genera una tensión milivoltios según el gradiente térmico."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice
            label="Tipo de captador"
            value={s.tipo}
            onChange={(tipo) => setS((x) => ({ ...x, tipo, val: tipo === "bourdon" ? 5 : 12 }))}
            items={[
              { value: "bourdon", label: "Tubo Bourdon (presión)" },
              { value: "termopar", label: "Termopar tipo K" },
            ]}
          />
          <Slider label={label} value={s.val} min={0} max={s.tipo === "bourdon" ? 10 : 40} step={s.tipo === "bourdon" ? 0.1 : 0.5} unit={unit} format={f1} color={MANIM.orange} onChange={(val) => setS((x) => ({ ...x, val }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Magnitud medida">
          {s.tipo === "bourdon" ? `${f1(s.val)} bar` : `≈ ${f0(s.val * 25)} °C (aprox.)`}
        </Stat>
      </Readout>
      <Svg w={520} h={100} maxH={105} testId="tool-captador-presion-temp">
        {s.tipo === "bourdon" ? (
          <path d="M 120 70 Q 200 20 280 70" fill="none" stroke={MANIM.orange} strokeWidth={6} className="anim-t" />
        ) : (
          <line x1={120} y1={50} x2={320} y2={50} stroke={MANIM.red} strokeWidth={4} />
        )}
        <text x={360} y={55} fill={MANIM.muted} fontSize={13}>
          {s.tipo === "bourdon" ? "deformación → puntero" : "Seebeck → mV"}
        </text>
      </Svg>
      <Note>En planta los Bourdon suelen ir con transmisor 4–20 mA; los termopares necesitan compensación de unión fría y cableado de extensión adecuado.</Note>
    </Frame>
  );
}

/* ───────────── 7. Amplificador inversor ───────────── */

export function OperacionalInversorExplorador({ block }: { block: ToolBlock }) {
  const init = { r1: num(block.params?.a, 10, 1, 200), r2: num(block.params?.b, 100, 1, 500), ve: num(block.params?.c, 0.5, -5, 5) };
  const [s, setS] = useState(init);
  const gain = s.r2 / s.r1;
  const vs = -gain * s.ve;

  return (
    <Frame
      stacked
      hint={block.hint ?? "La ganancia en módulo es R₂/R₁; la salida está invertida respecto a la entrada."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="R₁" value={s.r1} min={1} max={200} step={1} unit=" kΩ" color={MANIM.blue} onChange={(r1) => setS((x) => ({ ...x, r1 }))} />
          <Slider label="R₂" value={s.r2} min={1} max={500} step={1} unit=" kΩ" color={MANIM.orange} onChange={(r2) => setS((x) => ({ ...x, r2 }))} />
          <Slider label="Tensión de entrada, Ve" value={s.ve} min={-5} max={5} step={0.1} unit=" V" format={f1} color={MANIM.green} onChange={(ve) => setS((x) => ({ ...x, ve }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.purple} label="|Vs/Ve| = R₂/R₁">
          {f1(gain)}
        </Stat>
        <Stat color={MANIM.red} label="Salida Vs (ideal)">
          {f1(vs)} V
        </Stat>
      </Readout>
      <MathRenderer text={`$V_s = -\\dfrac{R_2}{R_1}\\,V_e = -\\dfrac{${f0(s.r2)}}{${f0(s.r1)}}\\cdot (${f1(s.ve)}) = ${f1(vs)}\\ \\text{V}$`} className="text-lg" />
      <Note>En la entrada − hay tierra virtual: la corriente por R₁ sale por R₂ y fija la salida. La salida real se satura cerca de ±Vcc.</Note>
    </Frame>
  );
}

/* ───────────── 8. Byte binario ───────────── */

export function BinarioByteExplorador({ block }: { block: ToolBlock }) {
  const initVal = num(block.params?.a, 170, 0, 255);
  const init = { bits: Array.from({ length: 8 }, (_, i) => Boolean((initVal >> (7 - i)) & 1)) };
  const [s, setS] = useState(init);
  const dec = s.bits.reduce((acc, b, i) => acc + (b ? 1 << (7 - i) : 0), 0);
  const toggle = (i: number) => setS((x) => ({ bits: x.bits.map((b, j) => (j === i ? !b : b)) }));

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada bit es una potencia de 2; el byte agrupa ocho bits (256 combinaciones)."}
      onReset={() => setS(init)}
      controls={<BitRow bits={s.bits} onToggle={toggle} label="Bits del byte (MSB a la izquierda)" />}
    >
      <Readout>
        <Stat color={MANIM.green} label="Valor decimal">
          {dec}
        </Stat>
        <Stat color={MANIM.yellow} label="Binario">
          {toBin(dec)}
        </Stat>
      </Readout>
      <Note>Un bit solo distingue dos estados; juntando bits formas palabras (nibble, byte, word) para codificar números, caracteres o instrucciones.</Note>
    </Frame>
  );
}

/* ───────────── 9. Decimal → binario ───────────── */

export function ConversionDecimalBinarioExplorador({ block }: { block: ToolBlock }) {
  const init = { n: num(block.params?.a, 42, 0, 255) };
  const [s, setS] = useState(init);
  const bin = toBin(s.n);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Para pasar de decimal a binario divide sucesivamente por 2 y lee los restos de abajo arriba."}
      onReset={() => setS(init)}
      controls={<Slider label="Entero decimal" value={s.n} min={0} max={255} step={1} color={MANIM.blue} onChange={(n) => setS({ n })} />}
    >
      <Readout>
        <Stat color={MANIM.orange} label="Decimal">
          {s.n}
        </Stat>
        <Stat color={MANIM.green} label="Binario (8 bits)">
          {bin}
        </Stat>
      </Readout>
      <MathRenderer text={`$${s.n}_{(10)} = ${bin}_{(2)}$`} className="text-xl" />
      <Note>La parte fraccionaria decimal se convierte multiplicando por 2 y tomando la parte entera de cada paso.</Note>
    </Frame>
  );
}

/* ───────────── 10. Lógica positiva / negativa ───────────── */

export function LogicaNivelesExplorador({ block }: { block: ToolBlock }) {
  const initPos = block.params?.a !== 1;
  const [pos, setPos] = useState(initPos);
  const levels = pos
    ? [{ bit: "0", v: "0 V (GND)" }, { bit: "1", v: "+5 V (TTL)" }]
    : [{ bit: "0", v: "+5 V" }, { bit: "1", v: "0 V" }];

  return (
    <Frame
      stacked
      hint={block.hint ?? "En lógica positiva el 1 es el nivel alto; en negativa el 0 lógico corresponde al nivel alto físico."}
      onReset={() => setPos(initPos)}
      controls={
        <Choice
          label="Convención"
          value={pos ? 1 : 0}
          onChange={(v) => setPos(v === 1)}
          items={[{ value: 1, label: "Positiva (1 = alto)" }, { value: 0, label: "Negativa (0 = alto)" }]}
        />
      }
    >
      <Readout>
        {levels.map((l) => (
          <Stat key={l.bit} color={l.bit === "1" ? MANIM.green : MANIM.red} label={`Nivel lógico ${l.bit}`}>
            {l.v}
          </Stat>
        ))}
      </Readout>
      <Note>Lo importante es ser coherente en todo el circuito: contactos NA/NC y bobinas se dibujan según la convención elegida.</Note>
    </Frame>
  );
}

/* ───────────── 11. Puertas OR / AND / NOT ───────────── */

export function PuertaLogicaExplorador({ block }: { block: ToolBlock }) {
  const gate = num(block.params?.n, 0, 0, 2);
  const init = { a: false, b: false };
  const [s, setS] = useState(init);
  const out = gate === 0 ? s.a || s.b : gate === 1 ? s.a && s.b : !s.a;
  const name = gate === 0 ? "OR" : gate === 1 ? "AND" : "NOT";

  return (
    <Frame
      stacked
      hint={block.hint ?? "Completa la tabla con los interruptores: OR suma lógica, AND producto, NOT invierte una entrada."}
      onReset={() => setS(init)}
      controls={
        <>
          {gate !== 2 ? (
            <>
              <Choice label="Entrada a" value={s.a ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, a: v === 1 }))} items={[{ value: 0, label: "a = 0" }, { value: 1, label: "a = 1" }]} />
              <Choice label="Entrada b" value={s.b ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, b: v === 1 }))} items={[{ value: 0, label: "b = 0" }, { value: 1, label: "b = 1" }]} />
            </>
          ) : (
            <Choice label="Entrada a" value={s.a ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, a: v === 1 }))} items={[{ value: 0, label: "a = 0" }, { value: 1, label: "a = 1" }]} />
          )}
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label={`Puerta ${name}`}>
          S = {out ? "1" : "0"}
        </Stat>
      </Readout>
      <Svg w={400} h={80} maxH={85} testId="tool-puerta-logica">
        <Lamp on={out} />
      </Svg>
      <Note>En contactos cableados, OR suele ser paralelo y AND serie de interruptores normalmente abiertos.</Note>
    </Frame>
  );
}

/* ───────────── 12. XOR / NAND ───────────── */

export function PuertaUniversalExplorador({ block }: { block: ToolBlock }) {
  const gate = num(block.params?.n, 0, 0, 1);
  const init = { a: false, b: true };
  const [s, setS] = useState(init);
  const out = gate === 0 ? (s.a !== s.b) : !(s.a && s.b);
  const name = gate === 0 ? "XOR" : "NAND";

  return (
    <Frame
      stacked
      hint={block.hint ?? "XOR es 1 si las entradas son distintas; NAND es la negación del AND (puerta universal)." }
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="a" value={s.a ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, a: v === 1 }))} items={[{ value: 0, label: "0" }, { value: 1, label: "1" }]} />
          <Choice label="b" value={s.b ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, b: v === 1 }))} items={[{ value: 0, label: "0" }, { value: 1, label: "1" }]} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.purple} label={name}>
          S = {out ? "1" : "0"}
        </Stat>
      </Readout>
      <Note>Con NAND (o NOR) puedes implementar cualquier función booleana; los CI 7400/7402 son la base de muchos circuitos combinacionales.</Note>
    </Frame>
  );
}

/* ───────────── 13. Karnaugh 2 variables ───────────── */

function simplifyK2(c: boolean[][]): string {
  const m = (r: number, col: number) => c[r][col];
  const ones = c.flat().filter(Boolean).length;
  if (ones === 0) return "0";
  if (ones === 4) return "1";
  if (m(0, 0) && m(0, 1) && !m(1, 0) && !m(1, 1)) return "A'";
  if (!m(0, 0) && !m(0, 1) && m(1, 0) && m(1, 1)) return "A";
  if (m(0, 0) && !m(0, 1) && m(1, 0) && !m(1, 1)) return "B'";
  if (!m(0, 0) && m(0, 1) && !m(1, 0) && m(1, 1)) return "B";
  const terms: string[] = [];
  if (m(0, 0)) terms.push("A'B'");
  if (m(0, 1)) terms.push("A'B");
  if (m(1, 0)) terms.push("AB'");
  if (m(1, 1)) terms.push("AB");
  return terms.join(" + ") || "0";
}

export function Karnaugh2Explorador({ block }: { block: ToolBlock }) {
  const init = { cells: [[false, true], [true, true]] as boolean[][] };
  const [s, setS] = useState(init);
  const simp = useMemo(() => simplifyK2(s.cells), [s.cells]);
  const flip = (r: number, col: number) =>
    setS((x) => ({ cells: x.cells.map((row, ri) => row.map((v, ci) => (ri === r && ci === col ? !v : v))) }));

  return (
    <Frame
      stacked
      hint={block.hint ?? "Haz clic en las celdas para marcar unos; agrupa adyacentes en potencias de 2 para simplificar la función."}
      onReset={() => setS(init)}
      controls={<span className="text-sm text-[color:var(--stage-muted,#b8c2d0)] sm:col-span-2">Mapa 2×2: filas = A, columnas = B</span>}
    >
      <div className="grid w-fit grid-cols-2 gap-2">
        {s.cells.map((row, r) =>
          row.map((on, col) => (
            <button
              key={`${r}-${col}`}
              type="button"
              aria-pressed={on}
              className={`${TOOL_BTN} h-16 w-20 text-lg font-bold ${on ? "bg-[color:var(--stage-ink,#fff)]/25" : ""}`}
              onClick={() => flip(r, col)}
            >
              {on ? "1" : "0"}
            </button>
          )),
        )}
      </div>
      <Readout>
        <Stat color={MANIM.green} label="Función simplificada F">
          {simp}
        </Stat>
      </Readout>
      <MathRenderer text={`$F \\approx ${simp}$`} className="text-lg" />
      <Note>En mapas mayores las agrupaciones deben tener tamaño 1, 2, 4… y solo en potencias de 2 en filas/columnas adyacentes.</Note>
    </Frame>
  );
}

/* ───────────── 14. De Morgan con NAND ───────────── */

export function DeMorganNandExplorador({ block }: { block: ToolBlock }) {
  const init = { a: true, b: false };
  const [s, setS] = useState(init);
  const andOut = s.a && s.b;
  const nand1 = !(s.a && s.b);
  const nand2 = !(nand1 && nand1);
  const viaNand = nand2;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos NAND con la misma salida intermedia reconstruyen un AND: es la implementación típica con puertas universales."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="a" value={s.a ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, a: v === 1 }))} items={[{ value: 0, label: "0" }, { value: 1, label: "1" }]} />
          <Choice label="b" value={s.b ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, b: v === 1 }))} items={[{ value: 0, label: "0" }, { value: 1, label: "1" }]} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="AND directo a·b">
          {andOut ? "1" : "0"}
        </Stat>
        <Stat color={MANIM.orange} label="AND vía NAND-NAND">
          {viaNand ? "1" : "0"}
        </Stat>
      </Readout>
      <MathRenderer text={`$\\overline{\\overline{a\\cdot b}} = a\\cdot b\\quad\\text{(De Morgan)}$`} className="text-lg" />
      <Note>La primera NAND calcula el complemento de a·b; la segunda invierte de nuevo (De Morgan). Con NOR se obtiene igualmente cualquier puerta.</Note>
    </Frame>
  );
}

/* ───────────── 15. Multiplexor 4:1 ───────────── */

export function MuxDecoderExplorador({ block }: { block: ToolBlock }) {
  const init = { sel: 0, ins: [false, true, false, true] };
  const [s, setS] = useState(init);
  const s0 = s.sel & 1;
  const s1 = (s.sel >> 1) & 1;
  const out = s.ins[s.sel];

  return (
    <Frame
      stacked
      hint={block.hint ?? "Las líneas de selección eligen cuál de las cuatro entradas llega a la salida (multiplexor)." }
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Selección S1S0 (decimal)" value={s.sel} min={0} max={3} step={1} color={MANIM.purple} onChange={(sel) => setS((x) => ({ ...x, sel }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            {s.ins.map((v, i) => (
              <button key={i} type="button" className={`${TOOL_BTN} ${v ? "bg-white/20" : ""}`} aria-pressed={v} onClick={() => setS((x) => ({ ...x, ins: x.ins.map((b, j) => (j === i ? !b : b)) }))}>
                I{i}={v ? "1" : "0"}
              </button>
            ))}
          </div>
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="S1 S0">
          {s1} {s0}
        </Stat>
        <Stat color={MANIM.yellow} label="Salida Y">
          {out ? "1" : "0"}
        </Stat>
      </Readout>
      <Note>El decodificador hace lo inverso: activa una de varias salidas según el código de entrada (por ejemplo el 74154).</Note>
    </Frame>
  );
}

/* ───────────── 16. Sumador binario ───────────── */

export function SumadorBinarioExplorador({ block }: { block: ToolBlock }) {
  const init = { a: true, b: false, cin: false };
  const [s, setS] = useState(init);
  const ai = s.a ? 1 : 0;
  const bi = s.b ? 1 : 0;
  const ci = s.cin ? 1 : 0;
  const sum = ai + bi + ci;
  const S = sum & 1;
  const Cout = sum >> 1;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Un sumador completo suma dos bits más el arrastre de entrada; la salida es suma y carry."}
      onReset={() => setS(init)}
      controls={
        <>
          {(["a", "b", "cin"] as const).map((k) => (
            <Choice
              key={k}
              label={k === "cin" ? "Cin" : k}
              value={s[k] ? 1 : 0}
              onChange={(v) => setS((x) => ({ ...x, [k]: v === 1 }))}
              items={[{ value: 0, label: "0" }, { value: 1, label: "1" }]}
            />
          ))}
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Suma S">
          {S}
        </Stat>
        <Stat color={MANIM.orange} label="Arrastre Cout">
          {Cout}
        </Stat>
      </Readout>
      <MathRenderer text={`$S = a \\oplus b \\oplus C_{in},\\quad C_{out} = ab + aC_{in} + bC_{in}$`} className="text-base" />
      <Note>Encadenando sumadores completos obtienes sumadores de palabra de n bits (registros, ALU).</Note>
    </Frame>
  );
}

/* ───────────── 17. Máquina de estados (3) ───────────── */

export function SecuencialMemoriaExplorador({ block }: { block: ToolBlock }) {
  const init = { st: 0 };
  const [s, setS] = useState(init);
  const names = ["Reposo", "Proceso", "Fin"];
  const next = () => setS((x) => ({ st: (x.st + 1) % 3 }));

  return (
    <Frame
      stacked
      hint={block.hint ?? "En un circuito secuencial la salida depende de las entradas y del estado anterior; pulsa Avanzar para ver la secuencia."}
      onReset={() => setS(init)}
      controls={
        <button type="button" className={TOOL_BTN} onClick={next}>
          Avanzar paso
        </button>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Estado actual">
          S{s.st}: {names[s.st]}
        </Stat>
      </Readout>
      <Svg w={420} h={90} maxH={95} testId="tool-secuencial-memoria">
        {names.map((nm, i) => (
          <g key={nm}>
            <circle cx={80 + i * 130} cy={45} r={28} fill={s.st === i ? MANIM.green : MANIM.panel} stroke={MANIM.ink} strokeWidth={2} className="anim-t" />
            <text x={80 + i * 130} y={50} textAnchor="middle" fill={MANIM.ink} fontSize={12}>
              {nm}
            </text>
          </g>
        ))}
      </Svg>
      <Note>Los flip-flops y registros guardan el estado; los contadores incrementan con cada flanco de reloj.</Note>
    </Frame>
  );
}

/* ───────────── 18. Biestable R-S ───────────── */

export function BiestableRsExplorador({ block }: { block: ToolBlock }) {
  const init = { q: false, s: false, r: false };
  const [st, setSt] = useState(init);
  const forbidden = st.s && st.r;
  const apply = (which: "s" | "r", on: boolean) =>
    setSt((x) => {
      const next = { ...x, [which]: on };
      if (next.s && next.r) return { ...next, q: x.q };
      if (which === "s" && on) return { ...next, q: true };
      if (which === "r" && on) return { ...next, q: false };
      return next;
    });

  return (
    <Frame
      stacked
      hint={block.hint ?? "Set pone Q=1; Reset pone Q=0. No pulses Set y Reset a la vez (entrada prohibida 11 en R-S asíncrono)." }
      onReset={() => setSt(init)}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2">
          <button type="button" className={`${TOOL_BTN} ${st.s ? "bg-white/20" : ""}`} aria-pressed={st.s} onMouseDown={() => apply("s", true)} onMouseUp={() => apply("s", false)} onMouseLeave={() => apply("s", false)}>
            Set (S)
          </button>
          <button type="button" className={`${TOOL_BTN} ${st.r ? "bg-white/20" : ""}`} aria-pressed={st.r} onMouseDown={() => apply("r", true)} onMouseUp={() => apply("r", false)} onMouseLeave={() => apply("r", false)}>
            Reset (R)
          </button>
        </div>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Q">
          {forbidden ? "—" : st.q ? "1" : "0"}
        </Stat>
        <Stat color={MANIM.red} label="Q'">
          {forbidden ? "—" : st.q ? "0" : "1"}
        </Stat>
        {forbidden ? (
          <Stat color={MANIM.yellow} label="S y R a la vez">
            Prohibido (11)
          </Stat>
        ) : null}
      </Readout>
      <Note>El biestable memoriza el último comando válido hasta que llegue la entrada contraria.</Note>
    </Frame>
  );
}

/* ───────────── 19. Biestable J-K ───────────── */

export function BiestableJkExplorador({ block }: { block: ToolBlock }) {
  const init = { j: false, k: false, q: false };
  const [s, setS] = useState(init);
  const clock = () => {
    if (s.j && s.k) setS((x) => ({ ...x, q: !x.q }));
    else if (s.j && !s.k) setS((x) => ({ ...x, q: true }));
    else if (!s.j && s.k) setS((x) => ({ ...x, q: false }));
  };

  return (
    <Frame
      stacked
      hint={block.hint ?? "En el flanco de reloj: J=K=1 conmuta Q; J=1,K=0 pone 1; J=0,K=1 pone 0; J=K=0 mantiene."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="J" value={s.j ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, j: v === 1 }))} items={[{ value: 0, label: "0" }, { value: 1, label: "1" }]} />
          <Choice label="K" value={s.k ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, k: v === 1 }))} items={[{ value: 0, label: "0" }, { value: 1, label: "1" }]} />
          <button type="button" className={`${TOOL_BTN} sm:col-span-2`} onClick={clock}>
            Flanco de reloj ↑
          </button>
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Q">
          {s.q ? "1" : "0"}
        </Stat>
      </Readout>
      <Note>El modo J=K=1 convierte el J-K en bascula (toggle), muy usado en contadores.</Note>
    </Frame>
  );
}

/* ───────────── 20. Contactos NO/NC ───────────── */

export function CableadoElementosExplorador({ block }: { block: ToolBlock }) {
  const init = { nc: false, press: false };
  const [s, setS] = useState(init);
  const closed = s.nc ? !s.press : s.press;
  const lamp = closed;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Un contacto NA cierra al pulsar; un NC abre. La lámpara recibe tensión si el contacto cierra la cadena."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo de contacto" value={s.nc ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, nc: v === 1 }))} items={[{ value: 0, label: "NA (normalmente abierto)" }, { value: 1, label: "NC (normalmente cerrado)" }]} />
          <Choice label="Pulsador" value={s.press ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, press: v === 1 }))} items={[{ value: 0, label: "Suelto" }, { value: 1, label: "Pulsado" }]} />
        </>
      }
    >
      <Readout>
        <Stat color={lamp ? MANIM.yellow : MANIM.muted} label="Lámpara">
          {lamp ? "ENCENDIDA" : "Apagada"}
        </Stat>
      </Readout>
      <Svg w={400} h={80} maxH={85} testId="tool-cableado-elementos">
        <Lamp on={lamp} x={320} y={40} />
        <line x1={60} y1={40} x2={closed ? 260 : 200} y2={40} stroke={MANIM.orange} strokeWidth={3} />
      </Svg>
      <Note>En esquemas de control cableado los símbolos de relés y finales de carrera distinguen NA y NC para leer la lógica de enclavamiento.</Note>
    </Frame>
  );
}

/* ───────────── 21. Grafo bimodal ───────────── */

export function GrafoBimodalExplorador({ block }: { block: ToolBlock }) {
  const init = { st: 1, sm: false };
  const [s, setS] = useState(init);
  const ka1 = s.sm && s.st === 1;
  const eq = "KA₁ = SM · S₁";

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada estado es un nodo; las transiciones dependen de condiciones (aquí el pulsador SM). La ecuación de bobina usa el estado activo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Estado" value={s.st} onChange={(st) => setS((x) => ({ ...x, st }))} items={[{ value: 1, label: "S₁ activo" }, { value: 2, label: "S₂ activo" }]} />
          <Choice label="Pulsador SM" value={s.sm ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, sm: v === 1 }))} items={[{ value: 0, label: "0" }, { value: 1, label: "1" }]} />
        </>
      }
    >
      <Readout>
        <Stat color={ka1 ? MANIM.green : MANIM.red} label="Bobina KA₁ (modelo)">
          {ka1 ? "Excitada" : "Reposo"}
        </Stat>
      </Readout>
      <MathRenderer text={`$${eq}$`} className="text-lg" />
      <Svg w={400} h={100} maxH={105} testId="tool-grafo-bimodal">
        <circle cx={120} cy={50} r={30} fill={s.st === 1 ? MANIM.blue : MANIM.panel} stroke={MANIM.ink} strokeWidth={2} />
        <text x={120} y={55} textAnchor="middle" fill={MANIM.ink} fontSize={13}>
          S₁
        </text>
        <circle cx={300} cy={50} r={30} fill={s.st === 2 ? MANIM.blue : MANIM.panel} stroke={MANIM.ink} strokeWidth={2} />
        <text x={300} y={55} textAnchor="middle" fill={MANIM.ink} fontSize={13}>
          S₂
        </text>
        {s.sm ? <text x={210} y={30} textAnchor="middle" fill={MANIM.orange} fontSize={12}>SM</text> : null}
      </Svg>
      <Note>En la teoría bimodal las ecuaciones de conmutación se obtienen del grafo de estados y de las condiciones de transición.</Note>
    </Frame>
  );
}

/* ───────────── 22. Secuencia relés y temporizadores ───────────── */

export function SecuenciaRelesExplorador({ block }: { block: ToolBlock }) {
  const init = { sm: false, phase: 0, t: 0 };
  const [s, setS] = useState(init);
  const T1 = 30;
  const T2 = 20;

  useEffect(() => {
    if (s.phase === 0) return;
    const id = window.setInterval(() => {
      setS((x) => {
        const limit = x.phase === 1 ? T1 : T2;
        const t = x.t + 0.5;
        if (t >= limit) return { ...x, phase: x.phase === 1 ? 2 : 0, t: 0 };
        return { ...x, t };
      });
    }, 500);
    return () => window.clearInterval(id);
  }, [s.phase]);

  const start = () => s.sm && s.phase === 0 && setS((x) => ({ ...x, phase: 1, t: 0 }));
  const bar1 = s.phase === 1 ? (s.t / T1) * 100 : s.phase > 1 ? 100 : 0;
  const bar2 = s.phase === 2 ? (s.t / T2) * 100 : 0;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa SM para arrancar: el temporizador T₁ (30 s) y luego T₂ (20 s) modelan una secuencia típica de relés."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Pulsador SM" value={s.sm ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, sm: v === 1 }))} items={[{ value: 0, label: "Suelto" }, { value: 1, label: "Pulsado" }]} />
          <button type="button" className={TOOL_BTN} disabled={!s.sm || s.phase !== 0} onClick={start}>
            Arrancar secuencia
          </button>
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Fase">
          {s.phase === 0 ? "Espera" : s.phase === 1 ? "T₁ en marcha" : "T₂ en marcha"}
        </Stat>
      </Readout>
      <div className="flex flex-col gap-2">
        <div className="text-xs text-[color:var(--stage-muted,#b8c2d0)]">T₁ = 30 s</div>
        <div className="h-6 w-full overflow-hidden rounded border border-[color:var(--stage-border,#3d4f66)] bg-[color:var(--stage-panel,#243044)]">
          <div className="anim-t h-full bg-[color:var(--stage-blue,#58a6ff)]" style={{ width: `${bar1}%` }} />
        </div>
        <div className="text-xs text-[color:var(--stage-muted,#b8c2d0)]">T₂ = 20 s</div>
        <div className="h-6 w-full overflow-hidden rounded border border-[color:var(--stage-border,#3d4f66)] bg-[color:var(--stage-panel,#243044)]">
          <div className="anim-t h-full bg-[color:var(--stage-orange,#f0883e)]" style={{ width: `${bar2}%` }} />
        </div>
      </div>
      <Note>Los relés temporizados ON-delay u OFF-delay encadenan fases sin PLC; el diagrama de funcionamiento fija los tiempos y condiciones.</Note>
    </Frame>
  );
}
