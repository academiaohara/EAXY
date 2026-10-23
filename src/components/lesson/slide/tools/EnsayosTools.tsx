"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { interp } from "@/components/lesson/anim/scenes/industrial/common";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const G = 9.8;
const KP = 9.8; // 1 kp = 9,8 N  →  1 kp/mm² = 9,8 MPa
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Etiquetas tal cual: llevan símbolos (σ, ε, d²) que las mayúsculas estropearían. */
const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

/* ───────────── Tensión y deformación en una probeta ───────────── */

export function TensionDeformacionExplorador({ block }: { block: ToolBlock }) {
  const init = {
    f: num(block.params?.a, 30, 1, 120),
    d: num(block.params?.b, 13.8, 4, 30),
    l0: 100,
    dl: num(block.params?.c, 0.1, 0, 5),
  };
  const [s, setS] = useState(init);
  const A0 = (Math.PI * s.d ** 2) / 4;
  const sigma = (s.f * 1000) / A0;
  const eps = s.dl / s.l0;
  const BW = 330;
  const stretch = Math.min(eps * 6, 0.5) * BW;
  const th = Math.max(20, Math.min(90, s.d * 3.2));

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la fuerza y el diámetro: la tensión depende de F y de A₀. Cambia Δl y la longitud inicial: la deformación depende del cociente."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza de tracción, F" value={s.f} min={1} max={120} step={1} unit=" kN" color={MANIM.red} onChange={(f) => setS((p) => ({ ...p, f }))} />
          <Slider label="Diámetro de la probeta, D" value={s.d} min={4} max={30} step={0.2} unit=" mm" format={(v) => fmtEs(v, 1)} color={MANIM.green} onChange={(d) => setS((p) => ({ ...p, d }))} />
          <Slider label="Longitud inicial, l₀" value={s.l0} min={50} max={200} step={10} unit=" mm" color={MANIM.blue} onChange={(l0) => setS((p) => ({ ...p, l0 }))} />
          <Slider label="Alargamiento, Δl" value={s.dl} min={0} max={5} step={0.05} unit=" mm" format={(v) => fmtEs(v, 2)} color={MANIM.orange} onChange={(dl) => setS((p) => ({ ...p, dl }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Sección, A₀ = πD²/4">
          {fmtEs(A0, 0)} mm²
        </Stat>
        <Stat color={MANIM.red} label="Tensión, σ = F/A₀">
          {fmtEs(sigma, 0)} MPa
        </Stat>
        <Stat color={MANIM.orange} label="Deformación, ε = Δl/l₀">
          {fmtEs(eps, 4)} ({fmtEs(eps * 100, 2)} %)
        </Stat>
      </Readout>
      <Svg w={520} h={150} maxH={160} testId="tool-tension">
        <rect x={40} y={75 - th / 2 - 14} width={26} height={th + 28} fill={MANIM.muted} fillOpacity={0.4} rx={4} />
        <rect x={66} y={75 - th / 2} width={BW * 0.6 + stretch} height={th} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={2.5} className="anim-t" />
        <rect x={66 + BW * 0.6 + stretch} y={75 - th / 2 - 14} width={26} height={th + 28} fill={MANIM.muted} fillOpacity={0.4} rx={4} className="anim-t" />
        <line x1={34} y1={75} x2={8} y2={75} stroke={MANIM.red} strokeWidth={4} />
        <line x1={98 + BW * 0.6 + stretch} y1={75} x2={124 + BW * 0.6 + stretch} y2={75} stroke={MANIM.red} strokeWidth={4} />
        <text x={66 + (BW * 0.6 + stretch) / 2} y={140} textAnchor="middle" fill={MANIM.yellow} fontSize={13}>
          longitud de medida (dibujo exagerado)
        </text>
      </Svg>
      <MathRenderer text={`$\\sigma = \\dfrac{F}{A_0} = \\dfrac{${fmtEs(s.f * 1000, 0)}}{${fmtEs(A0, 0)}} = ${fmtEs(sigma, 0)}\\ \\text{N/mm}^2 = ${fmtEs(sigma, 0)}\\ \\text{MPa}$`} className="text-lg" />
      <Note>1 N/mm² = 1 MPa. La deformación no tiene unidades (mm/mm); en la industria se da en porcentaje: ε · 100.</Note>
    </Frame>
  );
}

/* ───────────── Diagramas de tracción de distintos materiales ───────────── */

type CurvaMat = { id: string; label: string; pts: [number, number][]; eElastico: number; nota: string };
const CURVAS: CurvaMat[] = [
  {
    id: "acero",
    label: "Acero con fluencia",
    pts: [[0, 0], [0.06, 0.5], [0.075, 0.6], [0.09, 0.65], [0.1, 0.63], [0.11, 0.66], [0.12, 0.63], [0.16, 0.65], [0.3, 0.82], [0.5, 0.97], [0.6, 1], [0.75, 0.93], [0.85, 0.8]],
    eElastico: 0.09,
    nota: "Presenta fluencia: tras el límite elástico se alarga sin que suba la tensión. Muy dúctil: gran deformación plástica antes de romper.",
  },
  {
    id: "fundido",
    label: "Hierro fundido",
    pts: [[0, 0], [0.04, 0.5], [0.1, 0.78], [0.2, 0.93], [0.3, 1], [0.34, 0.99]],
    eElastico: 0.04,
    nota: "Frágil: rompe con poca deformación y sin un límite elástico claro.",
  },
  {
    id: "bronce",
    label: "Bronce",
    pts: [[0, 0], [0.05, 0.55], [0.1, 0.8], [0.25, 0.97], [0.45, 1], [0.62, 0.93]],
    eElastico: 0.05,
    nota: "Deformación plástica notable: la tensión sube hasta un máximo y baja un poco antes de la rotura.",
  },
  {
    id: "alcu",
    label: "Aluminio-cobre",
    pts: [[0, 0], [0.06, 0.5], [0.2, 0.78], [0.4, 0.92], [0.55, 1], [0.7, 0.94], [0.78, 0.82]],
    eElastico: 0.05,
    nota: "No presenta fluencia: la curva se redondea poco a poco hasta el máximo y después baja.",
  },
  {
    id: "frio",
    label: "Deformado en frío",
    pts: [[0, 0], [0.08, 0.9], [0.1, 0.96], [0.16, 0.88], [0.4, 0.86], [0.85, 0.7]],
    eElastico: 0.09,
    nota: "El trabajo en frío endurece el metal: sube mucho el límite elástico y después la tensión baja con la deformación.",
  },
  {
    id: "templado",
    label: "Acero templado",
    pts: [[0, 0], [0.2, 0.95], [0.26, 1]],
    eElastico: 0.22,
    nota: "Muy resistente y poco deformable: apenas hay zona plástica; rompe casi a la vez que supera el límite elástico.",
  },
];

export function DiagramaTraccionExplorador({ block }: { block: ToolBlock }) {
  const initM = Math.round(num(block.params?.a, 0, 0, CURVAS.length - 1));
  const [s, setS] = useState({ m: initM, x: 20, soltar: false });
  const mat = CURVAS[s.m]!;
  const eMax = mat.pts[mat.pts.length - 1]![0];
  const eps = (s.x / 100) * eMax;
  const sigma = interp(mat.pts, eps);
  const slope = mat.pts[1]![1] / mat.pts[1]![0];
  const elasticRecovery = sigma / slope;
  const epsPerm = Math.max(0, eps - elasticRecovery);
  const zona = s.x >= 100 ? "rotura" : eps <= mat.eElastico ? "elástica" : "plástica";
  const X = (e: number) => 60 + (e / 0.9) * 430;
  const Y = (v: number) => 220 - v * 190;
  const path = mat.pts.map(([e, v], i) => `${i ? "L" : "M"} ${X(e).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  const colorZona = zona === "elástica" ? MANIM.green : zona === "plástica" ? MANIM.orange : MANIM.red;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Estira la probeta y pulsa «Soltar»: si no ha pasado el límite elástico, vuelve al origen; si lo ha pasado, queda deformada."}
      onReset={() => setS({ m: initM, x: 20, soltar: false })}
      controls={
        <>
          <Choice label="Material" value={s.m} onChange={(m) => setS({ m, x: 20, soltar: false })} items={CURVAS.map((c, i) => ({ value: i, label: c.label }))} />
          <Slider label="Deformación aplicada" value={s.x} min={0} max={100} step={1} unit=" %" color={MANIM.orange} onChange={(x) => setS((p) => ({ ...p, x }))} />
          <Choice label="Carga" value={s.soltar ? 1 : 0} onChange={(v) => setS((p) => ({ ...p, soltar: v === 1 }))} items={[{ value: 0, label: "Cargada" }, { value: 1, label: "Soltar" }]} />
        </>
      }
    >
      <Readout>
        <Stat color={colorZona} label="Zona">
          {zona}
        </Stat>
        <Stat color={MANIM.yellow} label="Tensión">
          {fmtEs(sigma * 100, 0)} % de σ_R
        </Stat>
        <Stat color={s.soltar && epsPerm > 0.002 ? MANIM.red : MANIM.green} label={s.soltar ? "Deformación que queda" : "Deformación permanente si se soltara"}>
          {epsPerm > 0.002 ? `${fmtEs((epsPerm / eMax) * 100, 0)} % de la total` : "ninguna"}
        </Stat>
      </Readout>
      <Svg w={520} h={250} maxH={255} testId="tool-diagrama-traccion">
        <line x1={60} y1={220} x2={505} y2={220} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={60} y1={220} x2={60} y2={14} stroke={MANIM.muted} strokeWidth={2} />
        <text x={505} y={240} textAnchor="end" fill={MANIM.muted} fontSize={13}>
          ε
        </text>
        <text x={50} y={22} textAnchor="end" fill={MANIM.muted} fontSize={13}>
          σ
        </text>
        <rect x={60} y={14} width={X(mat.eElastico) - 60} height={206} fill={MANIM.green} fillOpacity={0.1} />
        <path d={path} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        <line x1={X(mat.eElastico)} y1={14} x2={X(mat.eElastico)} y2={220} stroke={MANIM.green} strokeWidth={1.5} strokeDasharray="4 4" />
        <text x={X(mat.eElastico) + 4} y={30} fill={MANIM.green} fontSize={12}>
          límite elástico
        </text>
        {s.soltar ? (
          <g>
            <line x1={X(eps)} y1={Y(sigma)} x2={X(epsPerm)} y2={220} stroke={MANIM.orange} strokeWidth={2.5} strokeDasharray="6 5" />
            <line x1={60} y1={226} x2={X(epsPerm)} y2={226} stroke={MANIM.red} strokeWidth={4} />
          </g>
        ) : null}
        <circle className="anim-t" cx={s.soltar ? X(epsPerm) : X(eps)} cy={s.soltar ? 220 : Y(sigma)} r={7} fill={colorZona} />
      </Svg>
      <Note>{mat.nota}</Note>
    </Frame>
  );
}

/* ───────────── Ley de Hooke con los materiales de la Tabla 1.6 ───────────── */

type MatHooke = { id: string; label: string; e: number; se: number; sr: number; st: string };
// E, σE, σR en kp/mm² (valor inferior del intervalo del libro), tensión de trabajo como en la tabla.
const MAT_HOOKE: MatHooke[] = [
  { id: "hierro", label: "Hierro homogéneo", e: 20_000, se: 8, sr: 35, st: "9 – 12" },
  { id: "acero", label: "Acero", e: 22_000, se: 25, sr: 40, st: "12 – 15" },
  { id: "especial", label: "Acero especial", e: 22_000, se: 60, sr: 90, st: "15 – 30" },
  { id: "fundicion", label: "Fundición", e: 10_000, se: 6, sr: 10, st: "3" },
  { id: "cobre", label: "Cobre en alambre", e: 13_000, se: 5, sr: 40, st: "4 – 6" },
  { id: "bronce", label: "Bronce en lingotes", e: 7_000, se: 6, sr: 15, st: "2 – 3" },
];

export function HookeExplorador({ block }: { block: ToolBlock }) {
  const initM = Math.round(num(block.params?.a, 1, 0, MAT_HOOKE.length - 1));
  const init = { m: initM, f: num(block.params?.b, 20, 0, 200), a0: Math.round(num(block.params?.c, 150, 20, 600) / 10) * 10, l0: 1000 };
  const [s, setS] = useState(init);
  const mat = MAT_HOOKE[s.m]!;
  const E = mat.e * KP; // MPa
  const sE = mat.se * KP;
  const sigma = (s.f * 1000) / s.a0;
  const eps = sigma / E;
  const dl = eps * s.l0;
  const dentro = sigma <= sE;
  const X = (e: number) => 50 + (e / 0.0045) * 440;
  const Y = (v: number) => 185 - (v / 400) * 165;
  const eEl = sE / E;
  const px = Math.min(X(eps), 495);
  const py = Math.max(Y(sigma), 12);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Aumenta la fuerza hasta pasar el límite elástico: la recta de Hooke deja de valer. Compara el alargamiento del acero con el del cobre o el bronce."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material (Tabla 1.6)" value={s.m} onChange={(m) => setS((p) => ({ ...p, m }))} items={MAT_HOOKE.map((c, i) => ({ value: i, label: c.label }))} />
          <Slider label="Fuerza de tracción, F" value={s.f} min={0} max={200} step={1} unit=" kN" color={MANIM.red} onChange={(f) => setS((p) => ({ ...p, f }))} />
          <Slider label="Sección, A₀" value={s.a0} min={20} max={600} step={10} unit=" mm²" color={MANIM.green} onChange={(a0) => setS((p) => ({ ...p, a0 }))} />
          <Slider label="Longitud inicial, l₀" value={s.l0} min={200} max={3000} step={100} unit=" mm" color={MANIM.blue} onChange={(l0) => setS((p) => ({ ...p, l0 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Módulo elástico, E">
          {fmtEs(E / 1000, 0)} GPa
        </Stat>
        <Stat color={MANIM.red} label="Tensión, σ = F/A₀">
          {fmtEs(sigma, 0)} MPa
        </Stat>
        <Stat color={MANIM.orange} label="Alargamiento, Δl">
          {fmtEs(dl, 2)} mm
        </Stat>
        <Stat color={dentro ? MANIM.green : MANIM.red} label="Estado">
          {dentro ? "elástico: Hooke vale" : "pasa el límite elástico"}
        </Stat>
      </Readout>
      <Svg w={520} h={215} maxH={215} testId="tool-hooke">
        <line x1={50} y1={185} x2={505} y2={185} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={185} x2={50} y2={10} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={185} x2={X(eEl)} y2={Y(sE)} stroke={MANIM.green} strokeWidth={4} />
        <path d={`M ${X(eEl)} ${Y(sE)} q 40 -14 90 -14`} fill="none" stroke={MANIM.orange} strokeWidth={3} strokeDasharray="6 5" />
        <circle cx={X(eEl)} cy={Y(sE)} r={5} fill={MANIM.yellow} />
        <text x={X(eEl) + 8} y={Y(sE) + 18} fill={MANIM.yellow} fontSize={12}>
          límite elástico
        </text>
        <circle className="anim-t" cx={px} cy={py} r={7.5} fill={dentro ? MANIM.green : MANIM.red} />
        <text x={505} y={206} textAnchor="end" fill={MANIM.muted} fontSize={13}>
          ε
        </text>
        <text x={44} y={18} textAnchor="end" fill={MANIM.muted} fontSize={13}>
          σ
        </text>
      </Svg>
      <MathRenderer text={`$\\Delta l = \\dfrac{F\\,l_0}{A_0\\,E} = \\dfrac{${fmtEs(s.f * 1000, 0)}\\cdot ${fmtEs(s.l0, 0)}}{${fmtEs(s.a0, 0)}\\cdot ${fmtEs(E, 0)}} = ${fmtEs(dl, 2)}\\ \\text{mm}$`} className="text-lg" />
      <Note>
        Solo es válida dentro de la zona de proporcionalidad. {dentro ? "Aquí σ está por debajo del límite elástico." : "Aquí el cálculo ya no es fiable: hay deformación permanente."}
      </Note>
    </Frame>
  );
}

/* ───────────── Tensión máxima de trabajo ───────────── */

export function TensionTrabajoExplorador({ block }: { block: ToolBlock }) {
  const initM = Math.round(num(block.params?.a, 1, 0, MAT_HOOKE.length - 1));
  const init = { m: initM, n: num(block.params?.b, 1.7, 1.2, 4), a0: 200, ref: "fluencia" as "fluencia" | "rotura" };
  const [s, setS] = useState(init);
  const mat = MAT_HOOKE[s.m]!;
  const ref = (s.ref === "fluencia" ? mat.se : mat.sr) * KP;
  const st = ref / s.n;
  const fmax = (st * s.a0) / 1000;
  const barMax = mat.sr * KP;
  const W = 440;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Aumenta el coeficiente de seguridad: la tensión de trabajo baja y la pieza queda más alejada del peligro, pero soporta menos carga."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material (Tabla 1.6)" value={s.m} onChange={(m) => setS((p) => ({ ...p, m }))} items={MAT_HOOKE.map((c, i) => ({ value: i, label: c.label }))} />
          <Choice label="Tensión de referencia" value={s.ref} onChange={(r) => setS((p) => ({ ...p, ref: r }))} items={[{ value: "fluencia" as const, label: "Límite elástico / fluencia" }, { value: "rotura" as const, label: "Rotura" }]} />
          <Slider label="Coeficiente de seguridad, n" value={s.n} min={1.2} max={4} step={0.1} format={(v) => fmtEs(v, 1)} color={MANIM.yellow} onChange={(n) => setS((p) => ({ ...p, n }))} />
          <Slider label="Sección, A₀" value={s.a0} min={20} max={600} step={10} unit=" mm²" color={MANIM.green} onChange={(a0) => setS((p) => ({ ...p, a0 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label={s.ref === "fluencia" ? "σ de fluencia" : "σ de rotura"}>
          {fmtEs(ref, 0)} MPa
        </Stat>
        <Stat color={MANIM.green} label="Tensión de trabajo, σt = σ/n">
          {fmtEs(st, 0)} MPa
        </Stat>
        <Stat color={MANIM.red} label="Fuerza máxima de trabajo">
          {fmtEs(fmax, 1)} kN
        </Stat>
      </Readout>
      <Svg w={520} h={110} maxH={115} testId="tool-tension-trabajo">
        <rect x={30} y={40} width={W} height={26} fill={MANIM.muted} fillOpacity={0.12} stroke={MANIM.muted} strokeWidth={1.5} />
        <rect x={30} y={40} width={(Math.min(mat.se * KP, barMax) / barMax) * W} height={26} fill={MANIM.orange} fillOpacity={0.35} />
        <rect className="anim-t" x={30} y={40} width={(st / barMax) * W} height={26} fill={MANIM.green} fillOpacity={0.85} />
        <text x={30 + (mat.se * KP / barMax) * W} y={30} textAnchor="middle" fill={MANIM.orange} fontSize={12}>
          σ elástico
        </text>
        <text x={30 + W} y={90} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          rotura {fmtEs(barMax, 0)} MPa
        </text>
        <text x={30} y={90} fill={MANIM.green} fontSize={12}>
          σt (verde)
        </text>
      </Svg>
      <Note>Valor de la tabla del libro para {mat.label.toLowerCase()}: {mat.st} kp/mm². La norma elige σ_F/n o σ_R/n según el uso de la pieza; n suele estar entre 1,2 y 4,0.</Note>
    </Frame>
  );
}

/* ───────────── Dureza Brinell ───────────── */

const K_BRINELL: { id: string; label: string; k: number }[] = [
  { id: "aceros", label: "Hierro y aceros", k: 30 },
  { id: "cobre", label: "Cu, bronce, latón", k: 10 },
  { id: "ligeras", label: "Aleaciones ligeras", k: 5 },
  { id: "snpb", label: "Sn–Pb", k: 1.5 },
];

export function BrinellExplorador({ block }: { block: ToolBlock }) {
  const init = { m: 0, D: 5, F: num(block.params?.a, 500, 50, 3000), d: num(block.params?.b, 2.3, 0.5, 5) };
  const [s, setS] = useState(init);
  const mat = K_BRINELL[s.m]!;
  const dEff = Math.min(s.d, s.D * 0.999);
  const root = Math.sqrt(s.D ** 2 - dEff ** 2);
  const f = (s.D - root) / 2;
  const S = Math.PI * s.D * f;
  const HB = S > 0 ? s.F / S : 0;
  const Fnom = mat.k * s.D ** 2;
  const valida = dEff > s.D / 4 && dEff < s.D / 2;
  const R = 56;
  const dPx = (dEff / s.D) * 2 * R;
  const fPx = (f / s.D) * 2 * R;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Fija la bola y la carga, y mueve el diámetro de la huella: una huella más grande significa un material más blando (menor HB)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material (constante K)" value={s.m} onChange={(m) => setS((p) => ({ ...p, m }))} items={K_BRINELL.map((c, i) => ({ value: i, label: c.label }))} />
          <Choice label="Diámetro de la bola, D" value={s.D} onChange={(D) => setS((p) => ({ ...p, D }))} items={[{ value: 2.5, label: "2,5 mm" }, { value: 5, label: "5 mm" }, { value: 10, label: "10 mm" }]} />
          <Slider label="Carga, F" value={s.F} min={50} max={3000} step={10} unit=" kp" color={MANIM.red} onChange={(F) => setS((p) => ({ ...p, F }))} />
          <Slider label="Diámetro de la huella, d" value={s.d} min={0.5} max={5} step={0.05} unit=" mm" format={(v) => fmtEs(v, 2)} color={MANIM.yellow} onChange={(d) => setS((p) => ({ ...p, d }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Profundidad, f">
          {fmtEs(f, 3)} mm
        </Stat>
        <Stat color={MANIM.blue} label="Superficie, S = π·D·f">
          {fmtEs(S, 2)} mm²
        </Stat>
        <Stat color={MANIM.orange} label="Dureza, HB = F/S">
          {fmtEs(HB, 0)} HB
        </Stat>
      </Readout>
      <Svg w={520} h={160} maxH={165} testId="tool-brinell">
        <rect x={80} y={90} width={360} height={60} fill={MANIM.muted} fillOpacity={0.18} stroke={MANIM.muted} strokeWidth={1.5} />
        <path d={`M ${260 - dPx / 2} 90 A ${R} ${R} 0 0 0 ${260 + dPx / 2} 90 Z`} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={2.5} />
        <line x1={260 - dPx / 2} y1={80} x2={260 + dPx / 2} y2={80} stroke={MANIM.yellow} strokeWidth={2.5} />
        <text x={260} y={70} textAnchor="middle" fill={MANIM.yellow} fontSize={14}>
          d
        </text>
        <line x1={260 + dPx / 2 + 14} y1={90} x2={260 + dPx / 2 + 14} y2={90 + fPx} stroke={MANIM.green} strokeWidth={3} />
        <text x={260 + dPx / 2 + 22} y={90 + fPx + 4} fill={MANIM.green} fontSize={14}>
          f
        </text>
      </Svg>
      <Note>
        {valida
          ? `Huella válida (D/4 < d < D/2). Para este material y esta bola, la carga recomendada es P = K·D² = ${fmtEs(mat.k, 1)} · ${fmtEs(s.D, 1)}² = ${fmtEs(Fnom, 0)} kp.`
          : `Huella fuera del intervalo recomendado D/4 < d < D/2 (${fmtEs(s.D / 4, 2)} – ${fmtEs(s.D / 2, 2)} mm): cambia la carga o la bola. Carga recomendada: ${fmtEs(Fnom, 0)} kp.`}
      </Note>
    </Frame>
  );
}

/* ───────────── Dureza Vickers ───────────── */

export function VickersExplorador({ block }: { block: ToolBlock }) {
  const init = { F: num(block.params?.a, 30, 1, 120), d: num(block.params?.b, 0.3, 0.05, 1) };
  const [s, setS] = useState(init);
  const HV = (2 * Math.sin(rad(68)) * s.F) / s.d ** 2;
  const side = Math.min((s.d / 1) * 300, 170);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Con la misma carga, una diagonal más pequeña significa un material más duro. Duplica d y observa cuánto cambia HV."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Carga, F" value={s.F} min={1} max={120} step={1} unit=" kp" color={MANIM.red} onChange={(F) => setS((p) => ({ ...p, F }))} />
          <Slider label="Diagonal de la huella, d" value={s.d} min={0.05} max={1} step={0.01} unit=" mm" format={(v) => fmtEs(v, 2)} color={MANIM.yellow} onChange={(d) => setS((p) => ({ ...p, d }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Dureza Vickers, HV = 1,8543 F/d²">
          {fmtEs(HV, 0)} HV
        </Stat>
        <Stat color={HV > 500 ? MANIM.green : MANIM.muted} label="Uso recomendado">
          {HV > 500 ? "Vickers: dureza alta (> 500)" : "Brinell también valdría"}
        </Stat>
      </Readout>
      <Svg w={520} h={190} maxH={195} testId="tool-vickers">
        <rect x={260 - side / 2} y={95 - side / 2} width={side} height={side} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={3} transform={`rotate(45 260 95)`} className="anim-t" />
        <line x1={260 - (side * Math.SQRT2) / 2} y1={95} x2={260 + (side * Math.SQRT2) / 2} y2={95} stroke={MANIM.yellow} strokeWidth={2.5} />
        <text x={260} y={90} textAnchor="middle" fill={MANIM.yellow} fontSize={14}>
          d
        </text>
      </Svg>
      <Note>Penetrador: pirámide regular de base cuadrada con caras a 136°. Se usa también con piezas muy delgadas (hasta 0,05 mm) y con materiales duros o blandos.</Note>
    </Frame>
  );
}

/* ───────────── Dureza Rockwell ───────────── */

export function RockwellExplorador({ block }: { block: ToolBlock }) {
  const init = { e: num(block.params?.a, 40, 5, 100), esc: "hrc" as "hrc" | "hrb" };
  const [s, setS] = useState(init);
  const ref = s.esc === "hrc" ? 100 : 130;
  const HR = ref - s.e;
  const mm = s.e * 0.002;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Aumenta e (más profundidad permanente): el material es más blando y la dureza Rockwell baja. Cambia de escala para ver HRC y HRB."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Escala" value={s.esc} onChange={(esc) => setS((p) => ({ ...p, esc }))} items={[{ value: "hrc" as const, label: "HRC · cono de diamante (duros)" }, { value: "hrb" as const, label: "HRB · bola (blandos)" }]} />
          <Slider label="Deformación permanente, e" value={s.e} min={5} max={100} step={1} unit=" uds." color={MANIM.green} onChange={(e) => setS((p) => ({ ...p, e }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Profundidad permanente">
          {fmtEs(mm, 3)} mm ({fmtEs(mm * 1000, 0)} µm)
        </Stat>
        <Stat color={MANIM.orange} label={s.esc === "hrc" ? "HRC = 100 − e" : "HRB = 130 − e"}>
          {fmtEs(HR, 0)}
        </Stat>
      </Readout>
      <Svg w={520} h={170} maxH={175} testId="tool-rockwell">
        <rect x={60} y={80} width={380} height={80} fill={MANIM.muted} fillOpacity={0.18} stroke={MANIM.muted} strokeWidth={1.5} />
        <polygon className="anim-t" points={`250,${80 + s.e * 0.7} ${250 - 34},${80 + s.e * 0.7 - 20} ${250 + 34},${80 + s.e * 0.7 - 20}`} fill={MANIM.blue} fillOpacity={0.85} />
        <line x1={60} y1={80} x2={440} y2={80} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="5 5" />
        <line x1={310} y1={80} x2={310} y2={80 + s.e * 0.7} stroke={MANIM.green} strokeWidth={3} />
        <text x={320} y={80 + (s.e * 0.7) / 2 + 4} fill={MANIM.green} fontSize={14}>
          e
        </text>
      </Svg>
      <Note>Cada unidad de e equivale a 0,002 mm. Se resta a 100 (cono) o 130 (bola) para que los materiales más duros den los números más altos.</Note>
    </Frame>
  );
}

/* ───────────── Péndulo de Charpy ───────────── */

export function CharpyExplorador({ block }: { block: ToolBlock }) {
  const init = { m: 20, a0: Math.round(num(block.params?.a, 120, 60, 160)), a1: Math.round(num(block.params?.b, 75, 0, 150)), S: 0.8 };
  const [s, setS] = useState(init);
  const a1 = Math.min(s.a1, s.a0);
  const L = 0.8;
  const h0 = L * (1 - Math.cos(rad(s.a0)));
  const h1 = L * (1 - Math.cos(rad(a1)));
  const E0 = s.m * G * h0;
  const E1 = s.m * G * h1;
  const Ep = E0 - E1;
  const rho = Ep / s.S;
  const px = 200;
  const py = 70;
  const Lp = 90;
  const pos = (t: number) => ({ x: px + Lp * Math.sin(rad(t)), y: py + Lp * Math.cos(rad(t)) });
  const p0 = pos(-s.a0);
  const p1 = pos(a1);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cuanto más sube el péndulo al otro lado, menos energía ha absorbido la probeta. Sube el ángulo final hasta el inicial: ¿qué resiliencia sale?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo inicial" value={s.a0} min={60} max={160} step={1} unit="°" color={MANIM.orange} onChange={(a0) => setS((p) => ({ ...p, a0 }))} />
          <Slider label="Ángulo al que sube tras romper" value={a1} min={0} max={160} step={1} unit="°" color={MANIM.green} onChange={(a1v) => setS((p) => ({ ...p, a1: a1v }))} />
          <Slider label="Masa del péndulo" value={s.m} min={10} max={40} step={1} unit=" kg" color={MANIM.blue} onChange={(m) => setS((p) => ({ ...p, m }))} />
          <Slider label="Sección bajo la entalla, S" value={s.S} min={0.4} max={1} step={0.05} unit=" cm²" format={(v) => fmtEs(v, 2)} color={MANIM.purple} onChange={(S) => setS((p) => ({ ...p, S }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="E₀ = m·g·h₀">
          {fmtEs(E0, 0)} J
        </Stat>
        <Stat color={MANIM.green} label="E₁ = m·g·h₁">
          {fmtEs(E1, 0)} J
        </Stat>
        <Stat color={MANIM.yellow} label="Absorbida, Eₚ">
          {fmtEs(Ep, 0)} J
        </Stat>
        <Stat color={MANIM.red} label="Resiliencia, ρ = Eₚ/S">
          {fmtEs(rho, 0)} J/cm²
        </Stat>
      </Readout>
      <Svg w={520} h={190} maxH={195} testId="tool-charpy">
        <line x1={px - 130} y1={p0.y} x2={px + 190} y2={p0.y} stroke={MANIM.orange} strokeWidth={1.2} strokeDasharray="5 5" />
        <line x1={px - 130} y1={p1.y} x2={px + 190} y2={p1.y} stroke={MANIM.green} strokeWidth={1.2} strokeDasharray="5 5" />
        <line x1={px - 130} y1={py + Lp} x2={px + 190} y2={py + Lp} stroke={MANIM.muted} strokeWidth={1.2} strokeDasharray="5 5" />
        <rect x={px - 24} y={py + Lp + 14} width={48} height={10} fill={MANIM.yellow} fillOpacity={0.7} />
        <line x1={px} y1={py} x2={p0.x} y2={p0.y} stroke={MANIM.orange} strokeWidth={3} strokeOpacity={0.5} />
        <circle cx={p0.x} cy={p0.y} r={14} fill={MANIM.orange} fillOpacity={0.4} />
        <line x1={px} y1={py} x2={p1.x} y2={p1.y} stroke={MANIM.green} strokeWidth={3} />
        <circle cx={p1.x} cy={p1.y} r={14} fill={MANIM.green} fillOpacity={0.85} className="anim-t" />
        <circle cx={px} cy={py} r={5} fill={MANIM.muted} />
      </Svg>
      <Note>
        {rho > 120 ? "Mucha energía absorbida: material tenaz, resiste bien el choque." : rho > 40 ? "Energía intermedia." : "Poca energía absorbida: material frágil, rompe con facilidad ante un golpe."}
      </Note>
    </Frame>
  );
}

/* ───────────── Fatiga: tensión alterna y número de ciclos ───────────── */

export function FatigaExplorador({ block }: { block: ToolBlock }) {
  const init = { s: Math.round(num(block.params?.a, 70, 20, 95)) };
  const [st, setSt] = useState(init);
  const limite = 40;
  const rompe = st.s > limite;
  const logN = rompe ? 3.5 + ((90 - st.s) / 50) * 3.5 : Infinity;
  const X = (l: number) => 60 + ((l - 3) / 5) * 420;
  const Y = (v: number) => 215 - ((v - 15) / 85) * 195;
  const curva = Array.from({ length: 41 }, (_, i) => {
    const v = 95 - (i / 40) * (95 - limite);
    const l = 3.5 + ((90 - v) / 50) * 3.5;
    return `${i ? "L" : "M"} ${X(l).toFixed(1)} ${Y(v).toFixed(1)}`;
  }).join(" ");

  return (
    <Frame
      stacked
      hint={block.hint ?? "Baja la tensión alterna por debajo del límite de fatiga: la probeta ya no rompe por muchos ciclos que se repitan."}
      onReset={() => setSt(init)}
      controls={<Slider label="Tensión alterna (% de σ_R)" value={st.s} min={20} max={95} step={1} unit=" %" color={MANIM.orange} onChange={(s) => setSt({ s })} />}
    >
      <Readout>
        <Stat color={rompe ? MANIM.red : MANIM.green} label="Resultado">
          {rompe ? `rompe tras ≈ ${fmtEs(10 ** logN, 0)} ciclos` : "no rompe nunca (supera 10⁷ ciclos)"}
        </Stat>
        <Stat color={MANIM.yellow} label="Límite de fatiga (modelo)">
          ≈ {limite} % de σ_R
        </Stat>
      </Readout>
      <Svg w={520} h={250} maxH={255} testId="tool-fatiga">
        <line x1={60} y1={215} x2={500} y2={215} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={60} y1={215} x2={60} y2={12} stroke={MANIM.muted} strokeWidth={2} />
        <path d={curva} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        <line x1={X(7)} y1={Y(limite)} x2={500} y2={Y(limite)} stroke={MANIM.blue} strokeWidth={3.5} />
        <line x1={60} y1={Y(limite)} x2={500} y2={Y(limite)} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="6 5" />
        <text x={70} y={Y(limite) - 6} fill={MANIM.yellow} fontSize={12}>
          límite de fatiga
        </text>
        <line x1={60} y1={Y(st.s)} x2={rompe ? X(logN) : 500} y2={Y(st.s)} stroke={rompe ? MANIM.red : MANIM.green} strokeWidth={1.5} strokeDasharray="4 4" />
        <circle className="anim-t" cx={rompe ? X(logN) : 480} cy={Y(st.s)} r={7} fill={rompe ? MANIM.red : MANIM.green} />
        <text x={500} y={236} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          nº de ciclos (escala logarítmica)
        </text>
        <text x={54} y={20} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          σ
        </text>
      </Svg>
      <Note>Curva esquemática de Wöhler: a más tensión, menos ciclos de vida. Por debajo del límite de fatiga la vida es, en la práctica, ilimitada.</Note>
    </Frame>
  );
}
