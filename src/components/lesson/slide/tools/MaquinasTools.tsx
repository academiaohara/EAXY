"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, SplitBar, Stat, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const G = 9.8;

/* ───────────── Conversor de unidades industriales ───────────── */

type Unidad = { id: string; label: string; factor: number };
const MAGNITUDES: { id: string; label: string; base: string; unidades: Unidad[]; init: number }[] = [
  {
    id: "presion",
    label: "Presión",
    base: "Pa",
    init: 6,
    unidades: [
      { id: "pa", label: "Pa", factor: 1 },
      { id: "kpcm2", label: "kp/cm²", factor: 98_000 },
      { id: "bar", label: "bar", factor: 100_000 },
      { id: "atm", label: "atm", factor: 101_325 },
    ],
  },
  {
    id: "potencia",
    label: "Potencia",
    base: "W",
    init: 90,
    unidades: [
      { id: "w", label: "W", factor: 1 },
      { id: "kw", label: "kW", factor: 1000 },
      { id: "cv", label: "CV", factor: 735.5 },
    ],
  },
  {
    id: "energia",
    label: "Trabajo y energía",
    base: "J",
    init: 1,
    unidades: [
      { id: "j", label: "J", factor: 1 },
      { id: "cal", label: "cal", factor: 4.1868 },
      { id: "kcal", label: "kcal", factor: 4186.8 },
      { id: "kpm", label: "kpm", factor: 9.8 },
      { id: "kwh", label: "kWh", factor: 3_600_000 },
    ],
  },
  {
    id: "fuerza",
    label: "Fuerza",
    base: "N",
    init: 1,
    unidades: [
      { id: "n", label: "N", factor: 1 },
      { id: "kp", label: "kp", factor: 9.8 },
    ],
  },
];

export function ConversorIndustrial({ block }: { block: ToolBlock }) {
  const initIdx = Math.round(num(block.params?.a, 0, 0, MAGNITUDES.length - 1));
  const [s, setS] = useState({ m: initIdx, u: 1, v: MAGNITUDES[initIdx]!.init });
  const mag = MAGNITUDES[s.m]!;
  const unit = mag.unidades[Math.min(s.u, mag.unidades.length - 1)]!;
  const base = (Number.isFinite(s.v) ? s.v : 0) * unit.factor;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Escribe una cantidad, elige su unidad y mira todas las equivalencias. Cuidado con kg y kp: no son la misma magnitud."}
      onReset={() => setS({ m: initIdx, u: 1, v: MAGNITUDES[initIdx]!.init })}
      controls={
        <>
          <Choice label="Magnitud" value={s.m} onChange={(m) => setS({ m, u: 1, v: MAGNITUDES[m]!.init })} items={MAGNITUDES.map((x, i) => ({ value: i, label: x.label }))} />
          <label className="flex flex-col gap-1.5 text-sm text-[color:var(--stage-muted,#b8c2d0)]">
            Cantidad
            <input
              type="number"
              value={Number.isFinite(s.v) ? s.v : ""}
              min={0}
              step="any"
              aria-label="Cantidad"
              onChange={(e) => setS((p) => ({ ...p, v: e.target.value === "" ? 0 : Math.max(0, Number(e.target.value)) }))}
              className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] bg-black/20 px-3 py-2 text-xl font-bold tabular-nums text-[color:var(--stage-ink,#fff)]"
            />
          </label>
          <Choice label="Unidad de partida" value={Math.min(s.u, mag.unidades.length - 1)} onChange={(u) => setS((p) => ({ ...p, u }))} items={mag.unidades.map((x, i) => ({ value: i, label: x.label }))} />
        </>
      }
    >
      <div className="grid gap-2 sm:grid-cols-2" data-testid="tool-conversor">
        {mag.unidades.map((x) => (
          <div key={x.id} className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] bg-white/5 px-3 py-2">
            <span className="text-xs uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">{x.label}</span>
            <div className="text-xl font-bold tabular-nums" style={{ color: x.id === unit.id ? MANIM.yellow : MANIM.ink }}>
              {fmtEs(base / x.factor, Math.abs(base / x.factor) >= 100 ? 1 : 4)}
            </div>
          </div>
        ))}
      </div>
      <Note>
        {mag.id === "presion" && "1 kp/cm² = 9,8 N / 10⁻⁴ m² = 98 000 Pa. La atmósfera física es 101 325 Pa (en cálculos aproximados, 101 300 Pa)."}
        {mag.id === "potencia" && "1 CV ≈ 735,5 W. En electricidad se usa el kW; en motores térmicos, a menudo el CV."}
        {mag.id === "energia" && "1 cal = 4,1868 J; 1 kWh = 3,6·10⁶ J; 1 kpm = 9,8 J. Trabajo, energía y calor tienen las mismas unidades."}
        {mag.id === "fuerza" && "La masa de 1 kg es atraída por la Tierra con una fuerza de 9,8 N = 1 kp. «Pesar 1 kg» significa en realidad 1 kp."}
      </Note>
    </Frame>
  );
}

/* ───────────── Plano inclinado ───────────── */

export function PlanoInclinadoTrabajo({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 120, 20, 500) / 10) * 10, h: num(block.params?.b, 0.8, 0.2, 2), l: num(block.params?.c, 6, 1, 12), mu: 0 };
  const [s, setS] = useState(init);
  const len = Math.hypot(s.l, s.h);
  const sin = s.h / len;
  const cos = s.l / len;
  const beta = (Math.asin(sin) * 180) / Math.PI;
  const F = s.m * G * (sin + s.mu * cos);
  const W = F * len;
  const Wu = s.m * G * s.h;
  const Fvert = s.m * G;
  const sc = 360 / Math.max(s.l, 1);
  const hh = Math.min(150, s.h * sc * 1.5);
  const gx = 80;
  const gy = 190;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la longitud de la rampa: la fuerza baja, el recorrido sube y el trabajo no cambia. Activa el rozamiento y verás qué se pierde."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa de la carga" value={s.m} min={20} max={500} step={10} unit=" kg" color={MANIM.orange} onChange={(m) => setS((p) => ({ ...p, m }))} />
          <Slider label="Altura a salvar, h" value={s.h} min={0.2} max={2} step={0.05} format={(v) => fmtEs(v, 2)} unit=" m" color={MANIM.green} onChange={(h) => setS((p) => ({ ...p, h }))} />
          <Slider label="Longitud horizontal de la rampa" value={s.l} min={1} max={12} step={0.5} format={(v) => fmtEs(v, 1)} unit=" m" color={MANIM.blue} onChange={(l) => setS((p) => ({ ...p, l }))} />
          <Slider label="Coeficiente de rozamiento, μ" value={s.mu} min={0} max={0.5} step={0.05} format={(v) => fmtEs(v, 2)} color={MANIM.red} onChange={(mu) => setS((p) => ({ ...p, mu }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Fuerza para subirla">
          F = {fmtEs(F, 0)} N <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">(vertical: {fmtEs(Fvert, 0)} N)</span>
        </Stat>
        <Stat color={MANIM.green} label="Recorrido">
          e = {fmtEs(len, 2)} m (β = {fmtEs(beta, 1)}°)
        </Stat>
        <Stat color={MANIM.orange} label="Trabajo">
          W = {fmtEs(W, 0)} J
        </Stat>
      </Readout>
      <Svg w={520} h={220} maxH={235} testId="tool-plano">
        <line x1={20} y1={gy} x2={500} y2={gy} stroke={MANIM.muted} strokeWidth={2.5} />
        <polygon points={`${gx},${gy} ${gx + s.l * sc},${gy} ${gx + s.l * sc},${gy - hh}`} fill={MANIM.blue} fillOpacity={0.2} stroke={MANIM.blue} strokeWidth={3} className="anim-t" />
        <g transform={`translate(${gx + s.l * sc * 0.6} ${gy - hh * 0.6}) rotate(${-beta})`}>
          <rect x={-18} y={-26} width={36} height={26} fill={MANIM.orange} rx={3} />
        </g>
        <text x={gx + s.l * sc + 8} y={gy - hh / 2} fill={MANIM.green} fontSize={14}>h</text>
        <text x={gx + (s.l * sc) / 2} y={gy + 20} fill={MANIM.blue} fontSize={14} textAnchor="middle">{fmtEs(s.l, 1)} m</text>
      </Svg>
      <MathRenderer text={`$W = F\\,e = m\\,g\\,(\\sin\\beta + \\mu\\cos\\beta)\\,e = ${fmtEs(W, 0)}\\ \\text{J}\\qquad (m\\,g\\,h = ${fmtEs(Wu, 0)}\\ \\text{J})$`} className="text-lg" />
      <Note>{s.mu === 0 ? "Sin rozamiento, W = m·g·h para cualquier longitud de rampa. La ventaja mecánica es sen β." : `Con rozamiento hace falta un trabajo extra de ${fmtEs(W - Wu, 0)} J: es el trabajo de rozamiento, que se disipa en calor.`}</Note>
    </Frame>
  );
}

/* ───────────── Resorte ───────────── */

export function ResorteExplorador({ block }: { block: ToolBlock }) {
  const init = { k: Math.round(num(block.params?.a, 200, 50, 2000) / 50) * 50, x: num(block.params?.b, 0.1, 0, 0.3) };
  const [s, setS] = useState(init);
  const F = s.k * s.x;
  const W = 0.5 * s.k * s.x ** 2;
  const X = (x: number) => 60 + (x / 0.3) * 380;
  const Y = (f: number) => 190 - (f / 600) * 150;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Estira el resorte al doble: ¿cuánto crece la fuerza y cuánto el trabajo?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Constante del resorte, k" value={s.k} min={50} max={2000} step={50} unit=" N/m" color={MANIM.blue} onChange={(k) => setS((p) => ({ ...p, k }))} />
          <Slider label="Alargamiento, x" value={s.x} min={0} max={0.3} step={0.01} format={(v) => fmtEs(v, 2)} unit=" m" color={MANIM.green} onChange={(x) => setS((p) => ({ ...p, x }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Fuerza aplicada">
          F = k·x = {fmtEs(F, 1)} N
        </Stat>
        <Stat color={MANIM.yellow} label="Trabajo = área del triángulo">
          W = ½·k·x² = {fmtEs(W, 2)} J
        </Stat>
      </Readout>
      <Svg w={520} h={230} maxH={235} testId="tool-resorte">
        <line x1={60} y1={190} x2={470} y2={190} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={60} y1={190} x2={60} y2={30} stroke={MANIM.muted} strokeWidth={2} />
        <text x={470} y={212} fill={MANIM.muted} fontSize={13} textAnchor="end">x (m)</text>
        <text x={50} y={36} fill={MANIM.muted} fontSize={13} textAnchor="end">F (N)</text>
        <polygon points={`${X(0)},${Y(0)} ${X(s.x)},${Y(0)} ${X(s.x)},${Y(Math.min(600, F))}`} fill={MANIM.yellow} fillOpacity={0.35} stroke={MANIM.yellow} strokeWidth={2} className="anim-t" />
        <line x1={X(0)} y1={Y(0)} x2={X(0.3)} y2={Y(Math.min(600, s.k * 0.3))} stroke={MANIM.red} strokeWidth={3} />
        <circle cx={X(s.x)} cy={Y(Math.min(600, F))} r={6} fill={MANIM.red} />
      </Svg>
      <Note>Si x se duplica, la fuerza se duplica pero el trabajo se multiplica por cuatro: W es proporcional a x².</Note>
    </Frame>
  );
}

/* ───────────── Energía a lo largo de una rampa, con rozamiento ───────────── */

export function EnergiaRampa({ block }: { block: ToolBlock }) {
  const init = { m: 10, h0: num(block.params?.a, 5, 1, 20), beta: Math.round(num(block.params?.b, 30, 10, 60)), mu: num(block.params?.c, 0, 0, 0.5), pos: 40 };
  const [s, setS] = useState(init);
  const rad = (s.beta * Math.PI) / 180;
  const total = s.m * G * s.h0;
  const dFull = s.h0 / Math.sin(rad);
  const d = (s.pos / 100) * dFull;
  const h = s.h0 - d * Math.sin(rad);
  const Ep = s.m * G * h;
  const Wr = s.mu * s.m * G * Math.cos(rad) * d;
  const Ec = Math.max(0, total - Ep - Wr);
  const stopped = total - Ep - Wr < -1e-6;
  const v = Math.sqrt((2 * Ec) / s.m);
  const stopD = s.mu > 0 && Math.tan(rad) <= s.mu ? 0 : Infinity;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Desliza el cuerpo por la rampa. Sin rozamiento, la energía potencial se transforma en cinética; con rozamiento, parte se pierde."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición en la rampa" value={s.pos} min={0} max={100} unit=" %" color={MANIM.yellow} onChange={(pos) => setS((p) => ({ ...p, pos }))} />
          <Slider label="Altura inicial, h₀" value={s.h0} min={1} max={20} step={0.5} format={(v) => fmtEs(v, 1)} unit=" m" color={MANIM.green} onChange={(h0) => setS((p) => ({ ...p, h0 }))} />
          <Slider label="Inclinación, β" value={s.beta} min={10} max={60} unit="°" color={MANIM.blue} onChange={(beta) => setS((p) => ({ ...p, beta }))} />
          <Slider label="Rozamiento, μ" value={s.mu} min={0} max={0.5} step={0.05} format={(v) => fmtEs(v, 2)} color={MANIM.red} onChange={(mu) => setS((p) => ({ ...p, mu }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Altura">
          h = {fmtEs(h, 2)} m
        </Stat>
        <Stat color={MANIM.blue} label="Velocidad">
          {stopped || stopD === 0 ? "se detiene" : `v = ${fmtEs(v, 2)} m/s`}
        </Stat>
      </Readout>
      <SplitBar
        parts={[
          { value: Ep, color: MANIM.green, label: "Ep" },
          { value: Ec, color: MANIM.blue, label: "Ec" },
          { value: Wr, color: MANIM.red, label: "Wr" },
        ]}
        height={38}
      />
      <MathRenderer text={`$E_p = ${fmtEs(Ep, 0)}\\ \\text{J}\\quad E_c = ${fmtEs(Ec, 0)}\\ \\text{J}\\quad W_r = ${fmtEs(Wr, 0)}\\ \\text{J}\\quad \\text{Total} = ${fmtEs(total, 0)}\\ \\text{J}$`} className="text-lg" />
      <Note>
        {s.mu === 0
          ? "Sin rozamiento, Ep + Ec es constante: W = ΔEp + ΔEc."
          : "Con rozamiento hay que añadir el trabajo de rozamiento: W = ΔEp + ΔEc + Wr. La suma de las tres barras siempre es la energía inicial."}
      </Note>
    </Frame>
  );
}

/* ───────────── Momento de inercia ───────────── */

const FORMAS = [
  { id: "aro", label: "Aro", k: 1 },
  { id: "cilindro", label: "Cilindro o disco", k: 0.5 },
  { id: "esfera", label: "Esfera maciza", k: 0.4 },
  { id: "varilla", label: "Varilla (eje por el centro)", k: 1 / 12 },
] as const;

export function MomentoInercia({ block }: { block: ToolBlock }) {
  const init = { f: Math.round(num(block.params?.a, 1, 0, FORMAS.length - 1)), m: num(block.params?.b, 2, 0.1, 50), r: num(block.params?.c, 0.2, 0.05, 1), w: 20 };
  const [s, setS] = useState(init);
  const forma = FORMAS[s.f]!;
  const dim = forma.id === "varilla" ? 2 * s.r : s.r;
  const I2 = forma.k * s.m * dim * dim;
  const rho = Math.sqrt(I2 / s.m);
  const EcRot = 0.5 * I2 * s.w * s.w;
  const v = s.w * s.r;
  const EcTras = 0.5 * s.m * v * v;
  const total = EcRot + (forma.id === "varilla" ? 0 : EcTras);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Con la misma masa y radio, ¿qué forma tiene mayor momento de inercia? ¿Y qué le pasa a la energía cinética de rotación?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Cuerpo" value={s.f} onChange={(f) => setS((p) => ({ ...p, f }))} items={FORMAS.map((x, i) => ({ value: i, label: x.label }))} />
          <Slider label="Masa, m" value={s.m} min={0.1} max={50} step={0.1} format={(v) => fmtEs(v, 1)} unit=" kg" color={MANIM.orange} onChange={(m) => setS((p) => ({ ...p, m }))} />
          <Slider label={forma.id === "varilla" ? "Semilongitud, l/2" : "Radio, r"} value={s.r} min={0.05} max={1} step={0.01} format={(v) => fmtEs(v, 2)} unit=" m" color={MANIM.blue} onChange={(r) => setS((p) => ({ ...p, r }))} />
          <Slider label="Velocidad angular, ω" value={s.w} min={1} max={100} unit=" rad/s" color={MANIM.green} onChange={(w) => setS((p) => ({ ...p, w }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Momento de inercia">
          I = {fmtEs(I2, 4)} kg·m²
        </Stat>
        <Stat color={MANIM.green} label="Radio de giro">
          ρ = √(I/m) = {fmtEs(rho, 3)} m
        </Stat>
        <Stat color={MANIM.blue} label="Energía cinética de rotación">
          ½·I·ω² = {fmtEs(EcRot, 1)} J
        </Stat>
      </Readout>
      <Svg w={520} h={150} maxH={235} testId="tool-inercia">
        {forma.id === "aro" ? <circle cx={260} cy={75} r={Math.min(65, s.r * 100)} fill="none" stroke={MANIM.red} strokeWidth={9} /> : null}
        {forma.id === "cilindro" ? <circle cx={260} cy={75} r={Math.min(65, s.r * 100)} fill={MANIM.yellow} fillOpacity={0.7} stroke={MANIM.yellow} strokeWidth={3} /> : null}
        {forma.id === "esfera" ? <circle cx={260} cy={75} r={Math.min(65, s.r * 100)} fill={MANIM.green} fillOpacity={0.7} stroke={MANIM.green} strokeWidth={3} /> : null}
        {forma.id === "varilla" ? <rect x={260 - Math.min(190, s.r * 190)} y={68} width={Math.min(190, s.r * 190) * 2} height={14} fill={MANIM.blue} fillOpacity={0.8} /> : null}
        <circle cx={260} cy={75} r={4} fill={MANIM.ink} />
      </Svg>
      <MathRenderer text={forma.id === "varilla" ? `$I = \\dfrac{1}{12}\\,m\\,\\ell^2 = ${fmtEs(I2, 4)}\\ \\text{kg·m}^2$` : `$I = ${fmtEs(forma.k, 2)}\\,m\\,r^2 = ${fmtEs(I2, 4)}\\ \\text{kg·m}^2$`} className="text-lg" />
      <Note>
        {forma.id === "varilla"
          ? "En la varilla, I depende del eje elegido: aquí gira alrededor de un eje perpendicular que pasa por su centro."
          : `Si el cuerpo rueda sin deslizar con ω = ${fmtEs(s.w, 0)} rad/s, la energía cinética total es ½mv² + ½Iω² = ${fmtEs(total, 1)} J: ${fmtEs((EcRot / total) * 100, 0)} % es de rotación.`}
      </Note>
    </Frame>
  );
}

/* ───────────── Equilibrio térmico ───────────── */

const MATERIALES_TERMICOS = [
  { name: "Acero", c: 460 },
  { name: "Cobre", c: 380 },
  { name: "Aluminio", c: 900 },
  { name: "Agua", c: 4186 },
] as const;

export function EquilibrioTermico({ block }: { block: ToolBlock }) {
  const init = { mat: Math.round(num(block.params?.a, 0, 0, 3)), m1: num(block.params?.b, 23, 1, 500), T1: Math.round(num(block.params?.c, 817, 20, 900)), m2: 400, T2: 25 };
  const [s, setS] = useState(init);
  const mat = MATERIALES_TERMICOS[s.mat]!;
  const c2 = 4186;
  const Tf = (s.m1 * mat.c * s.T1 + s.m2 * c2 * s.T2) / (s.m1 * mat.c + s.m2 * c2);
  const Q = s.m2 * c2 * (Tf - s.T2);
  const Y = (t: number) => 190 - (t / 900) * 160;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mezcla un cuerpo caliente con agua: la temperatura final queda mucho más cerca de la del que tiene más masa y más calor específico."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material del cuerpo caliente" value={s.mat} onChange={(mat) => setS((p) => ({ ...p, mat }))} items={MATERIALES_TERMICOS.map((x, i) => ({ value: i, label: `${x.name} (${x.c} J/kg·°C)` }))} />
          <Slider label="Masa del cuerpo" value={s.m1} min={1} max={500} unit=" kg" color={MANIM.red} onChange={(m1) => setS((p) => ({ ...p, m1 }))} />
          <Slider label="Temperatura del cuerpo" value={s.T1} min={20} max={900} step={5} unit=" °C" color={MANIM.orange} onChange={(T1) => setS((p) => ({ ...p, T1 }))} />
          <Slider label="Masa de agua" value={s.m2} min={10} max={1000} step={10} unit=" kg" color={MANIM.blue} onChange={(m2) => setS((p) => ({ ...p, m2 }))} />
          <Slider label="Temperatura del agua" value={s.T2} min={5} max={60} unit=" °C" color={MANIM.green} onChange={(T2) => setS((p) => ({ ...p, T2 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Temperatura final de equilibrio">
          {fmtEs(Tf, 1)} °C
        </Stat>
        <Stat color={MANIM.green} label="Calor que absorbe el agua">
          Q = {fmtEs(Q / 1000, 0)} kJ
        </Stat>
      </Readout>
      <Svg w={520} h={220} maxH={235} testId="tool-equilibrio">
        <line x1={60} y1={190} x2={470} y2={190} stroke={MANIM.muted} strokeWidth={2} />
        {[
          { x: 130, t: s.T1, c: MANIM.red, label: mat.name },
          { x: 250, t: s.T2, c: MANIM.blue, label: "Agua" },
          { x: 370, t: Tf, c: MANIM.yellow, label: "Final" },
        ].map((b) => (
          <g key={b.label}>
            <rect x={b.x - 28} y={Y(b.t)} width={56} height={190 - Y(b.t)} fill={b.c} fillOpacity={0.7} className="anim-t" />
            <text x={b.x} y={Y(b.t) - 8} fill={b.c} fontSize={15} textAnchor="middle" fontWeight={700}>{fmtEs(b.t, 0)} °C</text>
            <text x={b.x} y={210} fill={MANIM.muted} fontSize={14} textAnchor="middle">{b.label}</text>
          </g>
        ))}
      </Svg>
      <MathRenderer text={`$T_f = \\dfrac{m_1 c_1 T_1 + m_2 c_2 T_2}{m_1 c_1 + m_2 c_2} = ${fmtEs(Tf, 1)}\\ °\\text{C}$`} className="text-lg" />
      <Note>El calor cedido por el cuerpo caliente es igual al que absorbe el agua (principio de conservación, sin pérdidas): Q = m·c·ΔT.</Note>
    </Frame>
  );
}

/* ───────────── Primer principio ───────────── */

export function PrimerPrincipio({ block }: { block: ToolBlock }) {
  const init = { motor: block.params?.c !== 1, Q: Math.round(num(block.params?.a, 100, 10, 200)), W: Math.round(num(block.params?.b, 35, 0, 200)) };
  const [s, setS] = useState(init);
  const dU = s.motor ? s.Q - s.W : s.W - s.Q;
  const eff = s.motor ? (s.Q > 0 ? s.W / s.Q : 0) : s.W > 0 ? s.Q / s.W : 0;
  const w = (v: number) => 6 + Math.abs(v) * 0.22;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el calor y el trabajo: la energía interna absorbe la diferencia. Compara el motor con la máquina frigorífica."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Máquina" value={s.motor ? "motor" : "frigo"} onChange={(v) => setS((p) => ({ ...p, motor: v === "motor" }))} items={[{ value: "motor", label: "Motor térmico: Q = ΔU + W" }, { value: "frigo", label: "Máquina frigorífica: W = ΔU + Q" }]} />
          <Slider label="Calor, Q" value={s.Q} min={10} max={200} step={5} unit=" kJ" color={MANIM.red} onChange={(Q) => setS((p) => ({ ...p, Q }))} />
          <Slider label="Trabajo, W" value={s.W} min={0} max={200} step={5} unit=" kJ" color={MANIM.blue} onChange={(W) => setS((p) => ({ ...p, W }))} />
        </>
      }
    >
      <Readout>
        <Stat color={dU >= 0 ? MANIM.yellow : MANIM.orange} label="Variación de energía interna">
          ΔU = {fmtEs(dU, 0)} kJ
        </Stat>
        <Stat color={MANIM.green} label={s.motor ? "Rendimiento" : "Calor extraído por cada kJ de trabajo"}>
          {s.motor ? `${fmtEs(eff * 100, 0)} %` : fmtEs(eff, 2)}
        </Stat>
      </Readout>
      <Svg w={520} h={180} maxH={235} testId="tool-primer-principio">
        <ellipse cx={260} cy={90} rx={80} ry={55} fill={MANIM.yellow} fillOpacity={0.2} stroke={MANIM.yellow} strokeWidth={3} />
        <text x={260} y={86} fill={MANIM.ink} fontSize={17} textAnchor="middle" fontWeight={700}>Sistema</text>
        <text x={260} y={108} fill={MANIM.yellow} fontSize={15} textAnchor="middle">ΔU = {fmtEs(dU, 0)}</text>
        <line x1={30} y1={90} x2={170} y2={90} stroke={s.motor ? MANIM.red : MANIM.blue} strokeWidth={w(s.motor ? s.Q : s.W)} className="anim-t" />
        <polygon points="182,90 164,78 164,102" fill={s.motor ? MANIM.red : MANIM.blue} />
        <text x={100} y={70} fill={s.motor ? MANIM.red : MANIM.blue} fontSize={16} textAnchor="middle" fontWeight={700}>{s.motor ? `Q = ${s.Q}` : `W = ${s.W}`}</text>
        <line x1={350} y1={90} x2={490} y2={90} stroke={s.motor ? MANIM.blue : MANIM.red} strokeWidth={w(s.motor ? s.W : s.Q)} className="anim-t" />
        <polygon points="502,90 484,78 484,102" fill={s.motor ? MANIM.blue : MANIM.red} />
        <text x={430} y={70} fill={s.motor ? MANIM.blue : MANIM.red} fontSize={16} textAnchor="middle" fontWeight={700}>{s.motor ? `W = ${s.W}` : `Q = ${s.Q}`}</text>
      </Svg>
      <MathRenderer text={s.motor ? `$Q = \\Delta U + W \\;\\Rightarrow\\; ${s.Q} = ${fmtEs(dU, 0)} + ${s.W}$` : `$W = \\Delta U + Q \\;\\Rightarrow\\; ${s.W} = ${fmtEs(dU, 0)} + ${s.Q}$`} className="text-lg" />
      <Note>{dU < 0 ? "ΔU negativo: el sistema pierde energía interna (se enfría)." : "Si ΔU es positivo, aumenta la energía interna del sistema (sube su temperatura)."}</Note>
    </Frame>
  );
}

/* ───────────── Rendimiento de un conjunto de máquinas ───────────── */

const ETAPAS = ["Motor térmico", "Alternador", "Transformador", "Motor eléctrico", "Reductor"] as const;
const ETAPAS_INIT = [30, 95, 90, 80, 96];

export function RendimientoCadena({ block }: { block: ToolBlock }) {
  const init = { eta: [...ETAPAS_INIT], P: num(block.params?.a, 10, 1, 100) };
  const [s, setS] = useState(init);
  const accum = s.eta.reduce<number[]>((acc, e) => [...acc, (acc[acc.length - 1] ?? 100) * (e / 100)], []);
  const total = accum[accum.length - 1]! / 100;
  const Pm = s.P / total;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el rendimiento de cada máquina. El rendimiento total es el producto, siempre menor que el más bajo de la cadena."}
      onReset={() => setS(init)}
      controls={
        <>
          {ETAPAS.map((n, i) => (
            <Slider key={n} label={n} value={s.eta[i]!} min={10} max={100} unit=" %" color={[MANIM.red, MANIM.orange, MANIM.yellow, MANIM.green, MANIM.blue][i]!} onChange={(v) => setS((p) => ({ ...p, eta: p.eta.map((e, k) => (k === i ? v : e)) }))} />
          ))}
          <Slider label="Potencia útil que se quiere" value={s.P} min={1} max={100} unit=" kW" color={MANIM.purple} onChange={(P) => setS((p) => ({ ...p, P }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Rendimiento total">
          η = {fmtEs(total * 100, 1)} %
        </Stat>
        <Stat color={MANIM.red} label={`Para ${fmtEs(s.P, 0)} kW útiles hace falta`}>
          {fmtEs(Pm, 1)} kW de potencia motriz
        </Stat>
      </Readout>
      <div className="flex flex-col gap-1.5" data-testid="tool-cadena-rendimiento">
        {["Entrada", ...ETAPAS].map((n, i) => (
          <div key={n} className="flex items-center gap-3">
            <span className="w-32 text-sm text-[color:var(--stage-muted,#b8c2d0)]">{n}</span>
            <span className="relative h-5 flex-1 rounded-sm bg-white/5">
              <span className="anim-t absolute inset-y-0 left-0 rounded-sm" style={{ width: `${i === 0 ? 100 : accum[i - 1]}%`, background: i === 0 ? MANIM.muted : [MANIM.red, MANIM.orange, MANIM.yellow, MANIM.green, MANIM.blue][i - 1], opacity: 0.8 }} />
            </span>
            <span className="w-14 text-right text-sm tabular-nums text-[color:var(--stage-ink,#fff)]">{fmtEs(i === 0 ? 100 : accum[i - 1]!, 1)} %</span>
          </div>
        ))}
      </div>
      <MathRenderer text={`$\\eta_t = \\eta_1\\,\\eta_2\\,\\eta_3\\,\\eta_4\\,\\eta_5 = ${s.eta.map((e) => fmtEs(e / 100, 2)).join(" \\cdot ")} = ${fmtEs(total, 3)}$`} className="text-lg" />
    </Frame>
  );
}

/* ───────────── Potencia de un vehículo ───────────── */

export function PotenciaVehiculo({ block }: { block: ToolBlock }) {
  const init = { v: Math.round(num(block.params?.a, 120, 30, 200)), cx: num(block.params?.b, 0.5, 0.25, 0.8), S: 1.44, eta: 0.8 };
  const [s, setS] = useState(init);
  const v = s.v / 3.6;
  const Ra = ((1 / 16) * s.cx * s.S * v * v) * G;
  const mu = 15 + 0.5e-6 * s.v * s.v;
  const Rr = 1 * mu * G;
  const R = Ra + Rr;
  const P = (R * v) / s.eta;
  const Pa = (Ra * v) / s.eta;
  const Pr = (Rr * v) / s.eta;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la velocidad: la resistencia del aire crece con v² y la potencia necesaria con v³. ¿Qué pesa más a 120 km/h?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad" value={s.v} min={30} max={200} step={5} unit=" km/h" color={MANIM.blue} onChange={(v) => setS((p) => ({ ...p, v }))} />
          <Slider label="Coeficiente aerodinámico, Cx" value={s.cx} min={0.25} max={0.8} step={0.05} format={(x) => fmtEs(x, 2)} color={MANIM.orange} onChange={(cx) => setS((p) => ({ ...p, cx }))} />
          <Slider label="Superficie frontal, S" value={s.S} min={1} max={3} step={0.05} format={(x) => fmtEs(x, 2)} unit=" m²" color={MANIM.green} onChange={(S) => setS((p) => ({ ...p, S }))} />
          <Slider label="Rendimiento de la transmisión" value={Math.round(s.eta * 100)} min={50} max={100} unit=" %" color={MANIM.purple} onChange={(e) => setS((p) => ({ ...p, eta: e / 100 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Resistencia total (coche de 1 t)">
          R = {fmtEs(R, 0)} N
        </Stat>
        <Stat color={MANIM.red} label="Potencia en el motor">
          P = {fmtEs(P / 1000, 1)} kW ≈ {fmtEs(P / 735.5, 0)} CV
        </Stat>
      </Readout>
      <SplitBar parts={[{ value: Pa, color: MANIM.blue, label: "aire" }, { value: Pr, color: MANIM.orange, label: "rodadura" }]} height={36} />
      <MathRenderer text={`$R_a = \\dfrac{1}{16}\\,C_x\\,S\\,v^2 = ${fmtEs(Ra / G, 0)}\\ \\text{kp},\\quad R_r = Q\\,\\mu = ${fmtEs(Rr / G, 0)}\\ \\text{kp},\\quad P = \\dfrac{F\\,v}{\\eta} = \\dfrac{${fmtEs(R, 0)}\\cdot ${fmtEs(v, 1)}}{${fmtEs(s.eta, 2)}}$`} className="text-base" />
      <Note>Con 120 km/h, Cx = 0,5 y S = 1,44 m² salen unos 27 kW. Esta potencia solo sirve para mantener la velocidad en llano; para acelerar hace falta más.</Note>
    </Frame>
  );
}

/* ───────────── Par y trabajo de rotación ───────────── */

export function ParTrabajo({ block }: { block: ToolBlock }) {
  const init = { M: Math.round(num(block.params?.a, 500, 50, 1000) / 50) * 50, D: num(block.params?.b, 0.5, 0.4, 1), s: Math.round(num(block.params?.c, 1000, 100, 2000) / 100) * 100 };
  const [st, setSt] = useState(init);
  const r = st.D / 2;
  const theta = st.s / r;
  const turns = theta / (2 * Math.PI);
  const W = st.M * theta;
  const F = st.M / r;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el par, el diámetro de la rueda y la distancia recorrida: el ángulo girado y el trabajo salen de ellos."}
      onReset={() => setSt(init)}
      controls={
        <>
          <Slider label="Par en la rueda, M" value={st.M} min={50} max={1000} step={50} unit=" N·m" color={MANIM.yellow} onChange={(M) => setSt((p) => ({ ...p, M }))} />
          <Slider label="Diámetro de la rueda" value={st.D} min={0.4} max={1} step={0.05} format={(v) => fmtEs(v, 2)} unit=" m" color={MANIM.blue} onChange={(D) => setSt((p) => ({ ...p, D }))} />
          <Slider label="Distancia recorrida" value={st.s} min={100} max={2000} step={100} unit=" m" color={MANIM.green} onChange={(s) => setSt((p) => ({ ...p, s }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Fuerza de contacto con el suelo">
          F = M/r = {fmtEs(F, 0)} N
        </Stat>
        <Stat color={MANIM.green} label="Ángulo girado">
          θ = {fmtEs(theta, 0)} rad ({fmtEs(turns, 1)} vueltas)
        </Stat>
        <Stat color={MANIM.orange} label="Trabajo">
          W = M·θ = {fmtEs(W / 1e6, 2)}·10⁶ J
        </Stat>
      </Readout>
      <Svg w={520} h={150} maxH={235} testId="tool-par">
        <circle cx={260} cy={75} r={55} fill={MANIM.blue} fillOpacity={0.15} stroke={MANIM.blue} strokeWidth={4} />
        <g className="anim-t" style={{ transform: `rotate(${(turns * 360) % 360}deg)`, transformOrigin: "260px 75px" }}>
          <line x1={260} y1={75} x2={260 + 55} y2={75} stroke={MANIM.blue} strokeWidth={3} />
          <line x1={260} y1={75} x2={260 - 55} y2={75} stroke={MANIM.blue} strokeWidth={3} />
        </g>
        <circle cx={260} cy={75} r={4} fill={MANIM.ink} />
        <line x1={150} y1={140} x2={370} y2={140} stroke={MANIM.muted} strokeWidth={2} />
        <path d="M 400 100 L 460 100" stroke={MANIM.red} strokeWidth={5} />
        <polygon points="470,100 456,92 456,108" fill={MANIM.red} />
        <text x={430} y={86} fill={MANIM.red} fontSize={14} textAnchor="middle">F</text>
      </Svg>
      <MathRenderer text={`$\\theta = \\dfrac{s}{r} = \\dfrac{${fmtEs(st.s, 0)}}{${fmtEs(r, 2)}} = ${fmtEs(theta, 0)}\\ \\text{rad}\\qquad W = M\\,\\theta = ${fmtEs(st.M, 0)}\\cdot ${fmtEs(theta, 0)}$`} className="text-lg" />
      <Note>Ejemplo del libro: M = 500 N·m, D = 0,5 m y 1 000 m de recorrido dan θ = 4 000 rad y W = 2·10⁶ J.</Note>
    </Frame>
  );
}

/* ───────────── Transformaciones de un gas en el diagrama p-V ───────────── */

type Proceso = "isobarica" | "isoterma" | "isocora" | "adiabatica" | "politropica";

export function DiagramaPV({ block }: { block: ToolBlock }) {
  const init = { proc: "isoterma" as Proceso, p1: num(block.params?.a, 4, 1, 10), V1: num(block.params?.b, 1, 0.5, 4), ratio: num(block.params?.c, 2, 0.5, 3), n: 1.25, p2: 8 };
  const [s, setS] = useState(init);
  const gamma = 1.4;
  const n = s.proc === "isobarica" ? 0 : s.proc === "isoterma" ? 1 : s.proc === "adiabatica" ? gamma : s.n;
  const V2 = s.proc === "isocora" ? s.V1 : s.V1 * s.ratio;
  const p2 = s.proc === "isocora" ? s.p2 : s.p1 * (s.V1 / V2) ** n;
  let W: number;
  if (s.proc === "isocora") {
    W = 0;
  } else if (Math.abs(n - 1) < 0.02) {
    W = s.p1 * s.V1 * Math.log(V2 / s.V1);
  } else {
    W = (s.p1 * s.V1 - p2 * V2) / (n - 1);
  }
  const Wj = W * 100;
  const Vmax = Math.max(s.V1, V2) * 1.25;
  const X = (V: number) => 60 + (V / Vmax) * 400;
  const Pmax = Math.max(s.p1, p2, 1) * 1.3;
  const Y = (p: number) => 230 - (p / Pmax) * 200;
  const curve = (() => {
    if (s.proc === "isocora") {
      return `${X(s.V1)},${Y(s.p1)} ${X(s.V1)},${Y(p2)}`;
    }
    const pts: string[] = [];
    const steps = 40;
    for (let i = 0; i <= steps; i += 1) {
      const V = s.V1 + ((V2 - s.V1) * i) / steps;
      pts.push(`${X(V)},${Y(s.p1 * (s.V1 / V) ** n)}`);
    }
    return pts.join(" ");
  })();
  const area = s.proc === "isocora" ? "" : `${curve} ${X(V2)},${Y(0)} ${X(s.V1)},${Y(0)}`;
  const label = { isobarica: "Isobárica (n = 0)", isoterma: "Isoterma (n = 1)", isocora: "Isocora (V constante)", adiabatica: "Adiabática (n = γ = 1,4)", politropica: `Politrópica (n = ${fmtEs(s.n, 2)})` }[s.proc];

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige la transformación y expande o comprime el gas: el trabajo es el área sombreada bajo la curva."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Transformación" value={s.proc} onChange={(proc) => setS((p) => ({ ...p, proc }))} items={[{ value: "isobarica", label: "Isobárica" }, { value: "isoterma", label: "Isoterma" }, { value: "isocora", label: "Isocora" }, { value: "adiabatica", label: "Adiabática" }, { value: "politropica", label: "Politrópica" }]} />
          <Slider label="Presión inicial, p₁" value={s.p1} min={1} max={10} step={0.5} format={(v) => fmtEs(v, 1)} unit=" bar" color={MANIM.red} onChange={(p1) => setS((p) => ({ ...p, p1 }))} />
          <Slider label="Volumen inicial, V₁" value={s.V1} min={0.5} max={4} step={0.5} format={(v) => fmtEs(v, 1)} unit=" L" color={MANIM.blue} onChange={(V1) => setS((p) => ({ ...p, V1 }))} />
          {s.proc === "isocora" ? (
            <Slider label="Presión final, p₂" value={s.p2} min={1} max={10} step={0.5} format={(v) => fmtEs(v, 1)} unit=" bar" color={MANIM.orange} onChange={(p2) => setS((p) => ({ ...p, p2 }))} />
          ) : (
            <Slider label="V₂ / V₁ (expansión > 1, compresión < 1)" value={s.ratio} min={0.5} max={3} step={0.1} format={(v) => fmtEs(v, 1)} color={MANIM.orange} onChange={(ratio) => setS((p) => ({ ...p, ratio }))} />
          )}
          {s.proc === "politropica" ? <Slider label="Exponente politrópico, n" value={s.n} min={0.2} max={2} step={0.05} format={(v) => fmtEs(v, 2)} color={MANIM.purple} onChange={(nn) => setS((p) => ({ ...p, n: nn }))} /> : null}
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label={label}>
          p₂ = {fmtEs(p2, 2)} bar · V₂ = {fmtEs(V2, 2)} L
        </Stat>
        <Stat color={W >= 0 ? MANIM.green : MANIM.red} label={W >= 0 ? "Trabajo que realiza el gas" : "Trabajo que se realiza sobre el gas"}>
          W = {fmtEs(Wj, 0)} J
        </Stat>
      </Readout>
      <Svg w={520} h={260} maxH={235} testId="tool-pv">
        <line x1={60} y1={230} x2={490} y2={230} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={60} y1={230} x2={60} y2={20} stroke={MANIM.muted} strokeWidth={2} />
        <text x={490} y={250} fill={MANIM.muted} fontSize={13} textAnchor="end">V (L)</text>
        <text x={52} y={26} fill={MANIM.muted} fontSize={13} textAnchor="end">p (bar)</text>
        {area ? <polygon points={area} fill={MANIM.green} fillOpacity={0.35} className="anim-t" /> : null}
        <polyline points={curve} fill="none" stroke={MANIM.orange} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={X(s.V1)} cy={Y(s.p1)} r={6} fill={MANIM.blue} />
        <circle cx={X(V2)} cy={Y(p2)} r={6} fill={MANIM.red} />
        <text x={X(s.V1)} y={Y(s.p1) - 10} fill={MANIM.blue} fontSize={13} textAnchor="middle">1</text>
        <text x={X(V2)} y={Y(p2) - 10} fill={MANIM.red} fontSize={13} textAnchor="middle">2</text>
      </Svg>
      <MathRenderer
        text={
          s.proc === "isocora"
            ? "$W = p\\,\\Delta V = 0$ (no hay variación de volumen)"
            : s.proc === "isobarica"
              ? `$W = p\\,(V_2 - V_1) = ${fmtEs(s.p1, 1)}\\cdot(${fmtEs(V2, 2)} - ${fmtEs(s.V1, 2)}) = ${fmtEs(W, 2)}\\ \\text{bar·L}$`
              : Math.abs(n - 1) < 0.02
                ? `$W = p_1V_1\\ln\\dfrac{V_2}{V_1} = ${fmtEs(W, 2)}\\ \\text{bar·L}$`
                : `$W = \\dfrac{p_1V_1 - p_2V_2}{n - 1} = ${fmtEs(W, 2)}\\ \\text{bar·L}$`
        }
        className="text-lg"
      />
      <Note>1 bar·L = 100 J. La adiabática cae más deprisa que la isoterma: tiene más pendiente en el diagrama.</Note>
    </Frame>
  );
}

/* ───────────── Potencia eléctrica e hidráulica ───────────── */

export function PotenciaElectricaHidraulica({ block }: { block: ToolBlock }) {
  const init = { mode: block.params?.c === 1 ? ("hidraulica" as const) : ("electrica" as const), U: Math.round(num(block.params?.a, 220, 12, 400)), I: num(block.params?.b, 20, 0.1, 100), t: 5, h: 80, Q: 1, price: 0.15 };
  const [s, setS] = useState(init);
  const Pe = s.U * s.I;
  const We = (Pe * s.t) / 1000;
  const p = 1000 * G * s.h;
  const Ph = p * s.Q;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia entre potencia eléctrica (P = U·I) e hidráulica (P = p·Q) y mira cómo depende cada una de sus variables."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo de potencia" value={s.mode} onChange={(mode) => setS((p0) => ({ ...p0, mode }))} items={[{ value: "electrica", label: "Eléctrica" }, { value: "hidraulica", label: "Hidráulica (presa)" }]} />
          {s.mode === "electrica" ? (
            <>
              <Slider label="Tensión, U" value={s.U} min={12} max={400} step={4} unit=" V" color={MANIM.yellow} onChange={(U) => setS((p0) => ({ ...p0, U }))} />
              <Slider label="Intensidad, I" value={s.I} min={0.1} max={100} step={0.1} format={(v) => fmtEs(v, 1)} unit=" A" color={MANIM.blue} onChange={(I) => setS((p0) => ({ ...p0, I }))} />
              <Slider label="Tiempo de funcionamiento" value={s.t} min={1} max={24} unit=" h" color={MANIM.green} onChange={(t) => setS((p0) => ({ ...p0, t }))} />
              <Slider label="Precio de la energía" value={s.price} min={0.05} max={0.4} step={0.01} format={(v) => fmtEs(v, 2)} unit=" €/kWh" color={MANIM.orange} onChange={(price) => setS((p0) => ({ ...p0, price }))} />
            </>
          ) : (
            <>
              <Slider label="Altura de la presa sobre las turbinas, h" value={s.h} min={10} max={200} step={5} unit=" m" color={MANIM.blue} onChange={(h) => setS((p0) => ({ ...p0, h }))} />
              <Slider label="Caudal, Q" value={s.Q} min={0.1} max={10} step={0.1} format={(v) => fmtEs(v, 1)} unit=" m³/s" color={MANIM.green} onChange={(Q) => setS((p0) => ({ ...p0, Q }))} />
            </>
          )}
        </>
      }
    >
      {s.mode === "electrica" ? (
        <>
          <Readout>
            <Stat color={MANIM.yellow} label="Potencia">
              P = U·I = {fmtEs(Pe / 1000, 2)} kW
            </Stat>
            <Stat color={MANIM.green} label={`Energía en ${s.t} h`}>
              W = {fmtEs(We, 2)} kWh
            </Stat>
            <Stat color={MANIM.orange} label="Coste">
              {fmtEs(We * s.price, 2)} €
            </Stat>
          </Readout>
          <MathRenderer text={`$P = U\\,I = ${fmtEs(s.U, 0)}\\cdot ${fmtEs(s.I, 1)} = ${fmtEs(Pe, 0)}\\ \\text{W},\\qquad W = P\\,t = ${fmtEs(We, 2)}\\ \\text{kWh} = ${fmtEs(We * 3.6, 1)}\\cdot 10^6\\ \\text{J}$`} className="text-lg" />
        </>
      ) : (
        <>
          <Readout>
            <Stat color={MANIM.blue} label="Presión en la base de la tubería">
              p = d·g·h = {fmtEs(p / 1000, 0)} kPa
            </Stat>
            <Stat color={MANIM.yellow} label="Potencia máxima (sin pérdidas)">
              P = p·Q = {fmtEs(Ph / 1000, 0)} kW
            </Stat>
          </Readout>
          <MathRenderer text={`$p = d\\,g\\,h = 1\\,000\\cdot 9{,}8\\cdot ${fmtEs(s.h, 0)} = ${fmtEs(p, 0)}\\ \\text{N/m}^2,\\qquad P = p\\,Q = ${fmtEs(p, 0)}\\cdot ${fmtEs(s.Q, 1)} = ${fmtEs(Ph / 1000, 0)}\\ \\text{kW}$`} className="text-lg" />
        </>
      )}
      <Note>{s.mode === "electrica" ? "La factura eléctrica cobra la energía en kWh: a más potencia y más tiempo, más coste." : "Ejemplo del libro: 80 m y 1 m³/s dan 784 kW; con 100 m y 1,5 m³/s, 1 470 kW."}</Note>
    </Frame>
  );
}
