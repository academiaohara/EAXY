"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { interp } from "@/components/lesson/anim/scenes/industrial/common";
import { TTT_A1, TTT_BF, TTT_BS, TTT_MF, TTT_MS, TTT_PF, TTT_PS, TTT_X_MAX, TTT_X_MIN, coolingEndX, coolingT, tttResult, type Pt2 } from "@/components/lesson/anim/scenes/industrial/ttt";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, TOOL_BTN, type ToolBlock } from "@/components/lesson/slide/tool-ui";

/* ───────────── Intersticios de la red del hierro ───────────── */

export function IntersticioRed({ block }: { block: ToolBlock }) {
  const init = { fcc: block.params?.c !== 1, R: Math.round(num(block.params?.a, 129, 100, 160)), x: num(block.params?.b, 0.4, 0, 6) };
  const [s, setS] = useState(init);
  const R = s.R / 1000;
  const rInt = s.fcc ? (Math.SQRT2 - 1) * R : ((Math.sqrt(5) - Math.sqrt(3)) / Math.sqrt(3)) * R;
  const rC = 0.075;
  const fits = rInt >= rC;
  const nFe = s.fcc ? 4 : 2;
  const conc = ((12.011 * s.x) / (55.85 * nFe + 12.011 * s.x)) * 100;
  const max = s.fcc ? 2.08 : 0.025;
  const sc = 700;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara los huecos de la red FCC y de la BCC con el tamaño del átomo de carbono. ¿Dónde cabe mejor?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Red cristalina del hierro" value={s.fcc ? "fcc" : "bcc"} onChange={(v) => setS((p) => ({ ...p, fcc: v === "fcc", x: v === "fcc" ? 0.4 : 0.01 }))} items={[{ value: "fcc", label: "Austenita (FCC)" }, { value: "bcc", label: "Ferrita (BCC)" }]} />
          <Slider label="Radio del Fe, R" value={s.R} min={100} max={160} format={(v) => fmtEs(v / 1000, 3)} unit=" nm" color={MANIM.blue} onChange={(R) => setS((p) => ({ ...p, R }))} />
          <Slider label="Átomos de C en la celda" value={s.x} min={0} max={s.fcc ? 6 : 0.2} step={s.fcc ? 0.05 : 0.002} format={(v) => fmtEs(v, s.fcc ? 2 : 3)} color={MANIM.yellow} onChange={(x) => setS((p) => ({ ...p, x }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Mayor hueco que cabe">
          r = {fmtEs(rInt, 3)} nm ({fmtEs(rInt / R, 3)}·R)
        </Stat>
        <Stat color={fits ? MANIM.green : MANIM.red} label="Átomo de carbono: 0,075 nm">
          {fits ? "Cabe sin deformar" : "No cabe: deforma la red"}
        </Stat>
      </Readout>
      <Svg w={520} h={150} maxH={235} testId="tool-intersticio">
        <circle cx={110} cy={75} r={R * sc * 0.6} fill="#b7c2d3" fillOpacity={0.75} stroke="#e9eef6" strokeWidth={2} />
        <text x={110} y={80} fill={MANIM.surface} fontSize={16} textAnchor="middle" fontWeight={700}>Fe</text>
        <circle cx={290} cy={75} r={rInt * sc * 0.6} fill="none" stroke={MANIM.green} strokeWidth={3} strokeDasharray="6 5" />
        <text x={290} y={125} fill={MANIM.green} fontSize={14} textAnchor="middle">hueco</text>
        <circle cx={400} cy={75} r={rC * sc * 0.6} fill="#0d1520" stroke={MANIM.yellow} strokeWidth={3} />
        <text x={400} y={125} fill={MANIM.yellow} fontSize={14} textAnchor="middle">C</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label={`Con ${fmtEs(s.x, s.fcc ? 2 : 3)} átomos de C y ${nFe} de Fe por celda`}>
          {fmtEs(conc, 2)} % de C
        </Stat>
        <Stat color={conc <= max + 0.001 ? MANIM.green : MANIM.red} label="Solubilidad máxima real">
          {fmtEs(max, max < 1 ? 3 : 2)} %
        </Stat>
      </Readout>
      <Note>
        {s.fcc ? "La FCC admite más carbono: hasta el 2,08 % a 1 148 °C, que equivale a unos 2 átomos de C cada 5 celdas." : "En la BCC el carbono apenas cabe: la solubilidad máxima es de solo el 0,025 %."}
      </Note>
    </Frame>
  );
}

/* ───────────── Dureza de la martensita según el carbono ───────────── */

const HRC_MARTENSITA: readonly Pt2[] = [
  [0, 25],
  [0.1, 37],
  [0.2, 47],
  [0.3, 54],
  [0.4, 60],
  [0.5, 63],
  [0.6, 65],
  [0.8, 65],
  [1, 65],
];

export function DurezaMartensita({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 0.3, 0, 1) * 100) / 100;
  const [c, setC] = useState(init);
  const hrc = interp(HRC_MARTENSITA, c);
  const X = (v: number) => 60 + v * 420;
  const Y = (h: number) => 240 - ((h - 20) / 50) * 200;
  const pts = Array.from({ length: 51 }, (_, i) => `${X(i / 50)},${Y(interp(HRC_MARTENSITA, i / 50))}`).join(" ");

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube el contenido de carbono: la dureza de la martensita crece, pero no indefinidamente. ¿A partir de qué valor se estabiliza?"}
      onReset={() => setC(init)}
      controls={<Slider label="Carbono, % en peso" value={c} min={0} max={1} step={0.01} format={(v) => fmtEs(v, 2)} unit=" %" color={MANIM.orange} onChange={setC} />}
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Dureza de la martensita">
          {fmtEs(hrc, 0)} HRC
        </Stat>
        <span className="text-base text-[color:var(--stage-ink,#fff)]">
          {c < 0.6 ? "Más carbono atrapado en las aristas: más tensión en la red y más dureza." : "A partir del 0,6 % ya no sube: ni siquiera con enfriamiento rápido se transforma toda la austenita (queda austenita retenida, más blanda)."}
        </span>
      </Readout>
      <Svg w={520} h={290} maxH={235} testId="tool-dureza-martensita">
        <line x1={60} y1={240} x2={500} y2={240} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={60} y1={240} x2={60} y2={30} stroke={MANIM.muted} strokeWidth={2} />
        {[0, 0.2, 0.4, 0.6, 0.8, 1].map((v) => (
          <text key={v} x={X(v)} y={262} fill={MANIM.muted} fontSize={13} textAnchor="middle">{fmtEs(v, 1)}</text>
        ))}
        {[30, 40, 50, 60, 70].map((h) => (
          <g key={h}>
            <line x1={56} y1={Y(h)} x2={500} y2={Y(h)} stroke={MANIM.grid} strokeWidth={1} />
            <text x={50} y={Y(h) + 4} fill={MANIM.muted} fontSize={13} textAnchor="end">{h}</text>
          </g>
        ))}
        <text x={280} y={282} fill={MANIM.muted} fontSize={14} textAnchor="middle">% C</text>
        <text x={18} y={130} fill={MANIM.muted} fontSize={14} textAnchor="middle" transform="rotate(-90 18 130)">Dureza HRC</text>
        <polyline points={pts} fill="none" stroke={MANIM.orange} strokeWidth={4} strokeLinejoin="round" />
        <line x1={X(c)} y1={240} x2={X(c)} y2={Y(hrc)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 5" />
        <circle cx={X(c)} cy={Y(hrc)} r={8} fill={MANIM.yellow} className="anim-t" />
      </Svg>
      <Note>Curva aproximada tomada de la figura 4.3 del libro.</Note>
    </Frame>
  );
}

/* ───────────── Explorador de curvas TTT ───────────── */

const TX = (x: number) => 70 + ((x - TTT_X_MIN) / (TTT_X_MAX - TTT_X_MIN)) * 430;
const TY = (t: number) => 270 - t * 0.31;
const pathOf = (pts: readonly Pt2[]) => pts.map(([x, t]) => `${TX(x).toFixed(1)},${TY(t).toFixed(1)}`).join(" ");

export function TttExplorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 50, 0, 100));
  const [pos, setPos] = useState(init);
  const m = 10 ** (1.2 + (pos / 100) * 1.8);
  const res = tttResult(m);
  const x1 = coolingEndX(m);
  const velocidad = pos < 25 ? "muy lenta (recocido)" : pos < 50 ? "lenta" : pos < 70 ? "moderada" : pos < 88 ? "rápida" : "muy rápida (temple en agua)";

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve la velocidad de enfriamiento y observa qué curvas corta la línea. ¿Con qué velocidad aparece la martensita?"}
      onReset={() => setPos(init)}
      controls={
        <>
          <Slider label="Velocidad de enfriamiento" value={pos} min={0} max={100} color={MANIM.red} format={(v) => (v < 25 ? "muy lenta" : v < 50 ? "lenta" : v < 70 ? "media" : v < 88 ? "rápida" : "muy rápida")} onChange={setPos} />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button type="button" className={TOOL_BTN} onClick={() => setPos(5)}>Recocido (en el horno)</button>
            <button type="button" className={TOOL_BTN} onClick={() => setPos(42)}>Normalizado (al aire)</button>
            <button type="button" className={TOOL_BTN} onClick={() => setPos(60)}>Temple en aceite</button>
            <button type="button" className={TOOL_BTN} onClick={() => setPos(100)}>Temple en agua</button>
          </div>
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label={`Enfriamiento ${velocidad}`}>
          {res.name}
        </Stat>
      </Readout>
      <Svg w={540} h={310} maxH={235} testId="tool-ttt">
        <line x1={70} y1={270} x2={510} y2={270} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={70} y1={270} x2={70} y2={20} stroke={MANIM.muted} strokeWidth={2} />
        {[-1, 0, 1, 2, 3, 4, 5, 6].map((x) => (
          <text key={x} x={TX(x)} y={288} fill={MANIM.muted} fontSize={12} textAnchor="middle">{["0,1", "1", "10", "10²", "10³", "10⁴", "10⁵", "10⁶"][x + 1]}</text>
        ))}
        <text x={290} y={305} fill={MANIM.muted} fontSize={13} textAnchor="middle">Tiempo (s)</text>
        <line x1={70} y1={TY(TTT_A1)} x2={500} y2={TY(TTT_A1)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="7 5" />
        <text x={66} y={TY(TTT_A1) + 4} fill={MANIM.yellow} fontSize={12} textAnchor="end">A₁</text>
        <polyline points={pathOf(TTT_PS)} fill="none" stroke={MANIM.red} strokeWidth={3} />
        <polyline points={pathOf(TTT_PF)} fill="none" stroke="#3bb8a6" strokeWidth={3} />
        <polyline points={pathOf(TTT_BS)} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <polyline points={pathOf(TTT_BF)} fill="none" stroke="#b07a52" strokeWidth={3} />
        <line x1={70} y1={TY(TTT_MS)} x2={500} y2={TY(TTT_MS)} stroke={MANIM.blue} strokeWidth={2.5} />
        <line x1={70} y1={TY(TTT_MF)} x2={500} y2={TY(TTT_MF)} stroke="#5b6cff" strokeWidth={2.5} />
        <text x={66} y={TY(TTT_MS) + 4} fill={MANIM.blue} fontSize={12} textAnchor="end">Ms</text>
        <text x={66} y={TY(TTT_MF) + 4} fill="#8b97ff" fontSize={12} textAnchor="end">Mf</text>
        <text x={TX(3.3)} y={TY(655)} fill={MANIM.muted} fontSize={13}>Perlita</text>
        <text x={TX(3.6)} y={TY(330)} fill={MANIM.muted} fontSize={13}>Bainita</text>
        <text x={TX(5.3)} y={TY(52)} fill={MANIM.muted} fontSize={13}>Martensita</text>
        <text x={TX(1.5)} y={TY(765)} fill={MANIM.blue} fontSize={14}>Austenita</text>
        <line x1={TX(TTT_X_MIN)} y1={TY(800)} x2={TX(x1)} y2={TY(coolingT(m, x1))} stroke={MANIM.ink} strokeWidth={3.5} className="anim-t" />
        <circle cx={TX(x1)} cy={TY(coolingT(m, x1))} r={5} fill={MANIM.ink} />
      </Svg>
      <MathRenderer text={res.detail} className="text-base" />
    </Frame>
  );
}

/* ───────────── Ensayo Jominy ───────────── */

const ACEROS_JOMINY = [
  { name: "Baja templabilidad (al carbono)", hi: 62, lo: 24, len: 7 },
  { name: "Media (aleado)", hi: 62, lo: 30, len: 20 },
  { name: "Alta (Cr-Ni-Mo)", hi: 63, lo: 38, len: 45 },
] as const;
const hrcJominy = (a: (typeof ACEROS_JOMINY)[number], d: number) => a.lo + (a.hi - a.lo) * Math.exp(-((d / a.len) ** 1.6));

export function JominyExplorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.a, 1, 0, 2)), d: Math.round(num(block.params?.b, 15, 0, 50)) };
  const [s, setS] = useState(init);
  const a = ACEROS_JOMINY[s.i]!;
  const h = hrcJominy(a, s.d);
  const estructura = h >= 55 ? "Martensita (casi 100 %)" : h >= 45 ? "Martensita + bainita" : h >= 35 ? "Bainita + perlita fina" : "Perlita + ferrita";
  const X = (d: number) => 60 + (d / 50) * 420;
  const Y = (v: number) => 250 - ((v - 20) / 50) * 210;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el acero y recorre la probeta desde el extremo templado. ¿Hasta qué distancia sigue siendo duro?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Acero" value={s.i} onChange={(i) => setS((p) => ({ ...p, i }))} items={ACEROS_JOMINY.map((x, i) => ({ value: i, label: x.name }))} />
          <Slider label="Distancia al extremo templado" value={s.d} min={0} max={50} unit=" mm" color={MANIM.blue} onChange={(d) => setS((p) => ({ ...p, d }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Dureza">
          {fmtEs(h, 0)} HRC
        </Stat>
        <Stat color={MANIM.green} label="Estructura">
          {estructura}
        </Stat>
      </Readout>
      <Svg w={540} h={300} maxH={235} testId="tool-jominy">
        <line x1={60} y1={250} x2={500} y2={250} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={60} y1={250} x2={60} y2={30} stroke={MANIM.muted} strokeWidth={2} />
        {[0, 10, 20, 30, 40, 50].map((d) => (
          <text key={d} x={X(d)} y={270} fill={MANIM.muted} fontSize={13} textAnchor="middle">{d}</text>
        ))}
        <text x={280} y={292} fill={MANIM.muted} fontSize={13} textAnchor="middle">Distancia al extremo templado (mm)</text>
        {[30, 40, 50, 60].map((v) => (
          <g key={v}>
            <line x1={56} y1={Y(v)} x2={500} y2={Y(v)} stroke={MANIM.grid} strokeWidth={1} />
            <text x={50} y={Y(v) + 4} fill={MANIM.muted} fontSize={13} textAnchor="end">{v}</text>
          </g>
        ))}
        {ACEROS_JOMINY.map((x, i) => (
          <polyline
            key={x.name}
            points={Array.from({ length: 51 }, (_, k) => `${X(k)},${Y(hrcJominy(x, k))}`).join(" ")}
            fill="none"
            stroke={[MANIM.orange, MANIM.yellow, MANIM.green][i]}
            strokeWidth={i === s.i ? 5 : 2}
            opacity={i === s.i ? 1 : 0.4}
          />
        ))}
        <line x1={X(s.d)} y1={250} x2={X(s.d)} y2={Y(h)} stroke={MANIM.ink} strokeWidth={2} strokeDasharray="5 5" />
        <circle cx={X(s.d)} cy={Y(h)} r={8} fill={MANIM.ink} stroke={MANIM.red} strokeWidth={3} className="anim-t" />
      </Svg>
      <Note>Curvas esquemáticas: lo importante es la forma. Cuanto más aleado, más lenta es la caída de dureza.</Note>
    </Frame>
  );
}

/* ───────────── Temperaturas de los tratamientos ───────────── */

const A3 = (c: number) => 910 - (187 / 0.89) * c;
const ACM = (c: number) => 723 + (407 / 0.87) * (c - 0.89);

type Trat = "temple" | "recocido" | "normalizado" | "globulizacion" | "revenido";
const TRATAMIENTOS: { id: Trat; label: string; color: string }[] = [
  { id: "temple", label: "Temple", color: MANIM.red },
  { id: "recocido", label: "Recocido total", color: MANIM.green },
  { id: "normalizado", label: "Normalizado", color: MANIM.yellow },
  { id: "globulizacion", label: "Globulización", color: MANIM.blue },
  { id: "revenido", label: "Revenido", color: MANIM.purple },
];

function rango(t: Trat, c: number): [number, number, string] {
  const hypo = c < 0.89;
  const base = hypo ? A3(c) : 723;
  const baseN = hypo ? A3(c) : ACM(c);
  switch (t) {
    case "temple":
      return [base + 50, base + 50, hypo ? "A₃ + 50 °C (austenización completa)" : "A₁ + 50 °C (austenización incompleta)"];
    case "recocido":
      return [base + 15, base + 40, hypo ? "A₃ + 15 a 40 °C" : "A₁ + 15 a 40 °C"];
    case "normalizado":
      return [baseN + 55, baseN + 85, hypo ? "A₃ + 55 a 85 °C" : "A_cm + 55 a 85 °C"];
    case "globulizacion":
      return [700, 700, "justo por debajo de A₁ (unas 15–25 horas)"];
    case "revenido":
      return [150, 700, "por debajo de A₁; rango habitual, según la dureza que se quiera mantener"];
  }
}

export function TemperaturasTratamiento({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.a, 0.4, 0.05, 1.5) * 100) / 100, t: "normalizado" as Trat };
  const [s, setS] = useState(init);
  const [lo, hi, nota] = rango(s.t, s.c);
  const color = TRATAMIENTOS.find((x) => x.id === s.t)!.color;
  const X = (c: number) => 70 + (c / 1.6) * 420;
  const Y = (t: number) => 265 - (t - 600) * 0.58;
  const hypo = s.c < 0.89;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un tratamiento y mueve el carbono: la temperatura sigue a las líneas críticas A₃ y A_cm."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Carbono, % en peso" value={s.c} min={0.05} max={1.5} step={0.01} format={(v) => fmtEs(v, 2)} unit=" %" color={MANIM.orange} onChange={(c) => setS((p) => ({ ...p, c }))} />
          <Choice label="Tratamiento" value={s.t} onChange={(t) => setS((p) => ({ ...p, t }))} items={TRATAMIENTOS.map((t) => ({ value: t.id, label: t.label }))} />
        </>
      }
    >
      <Readout>
        <Stat color={color} label={`${TRATAMIENTOS.find((x) => x.id === s.t)!.label} · acero ${hypo ? "hipoeutectoide" : "hipereutectoide"}`}>
          {lo === hi ? `${fmtEs(lo, 0)} °C` : `${fmtEs(lo, 0)} a ${fmtEs(hi, 0)} °C`}
        </Stat>
        <span className="text-base text-[color:var(--stage-ink,#fff)]">{nota}</span>
      </Readout>
      <Svg w={540} h={300} maxH={235} testId="tool-temperaturas">
        <line x1={70} y1={265} x2={500} y2={265} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={70} y1={265} x2={70} y2={25} stroke={MANIM.muted} strokeWidth={2} />
        {[0, 0.4, 0.8, 1.2, 1.6].map((c) => (
          <text key={c} x={X(c)} y={285} fill={MANIM.muted} fontSize={13} textAnchor="middle">{fmtEs(c, 1)}</text>
        ))}
        {[600, 700, 800, 900, 1000].map((t) => (
          <g key={t}>
            <line x1={66} y1={Y(t)} x2={500} y2={Y(t)} stroke={MANIM.grid} strokeWidth={1} />
            <text x={60} y={Y(t) + 4} fill={MANIM.muted} fontSize={13} textAnchor="end">{t}</text>
          </g>
        ))}
        <polyline points={`${X(0)},${Y(910)} ${X(0.89)},${Y(723)}`} fill="none" stroke={MANIM.green} strokeWidth={3} />
        <polyline points={`${X(0.89)},${Y(723)} ${X(1.6)},${Y(ACM(1.6))}`} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <line x1={X(0)} y1={Y(723)} x2={X(1.6)} y2={Y(723)} stroke={MANIM.yellow} strokeWidth={3} />
        <text x={X(0.2)} y={Y(870)} fill={MANIM.green} fontSize={13}>A₃</text>
        <text x={X(1.25)} y={Y(930)} fill={MANIM.orange} fontSize={13}>Acm</text>
        <text x={X(0.15)} y={Y(723) + 16} fill={MANIM.yellow} fontSize={13}>A₁</text>
        <rect x={X(s.c) - 9} y={Y(Math.max(lo, hi))} width={18} height={Math.max(4, Math.abs(Y(Math.min(lo, hi)) - Y(Math.max(lo, hi))))} fill={color} fillOpacity={0.75} rx={4} className="anim-t" />
        <line x1={X(s.c)} y1={265} x2={X(s.c)} y2={Y(1010)} stroke={MANIM.ink} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.5} />
      </Svg>
      <Note>Valores del libro: temple, recocido y normalizado respecto a las líneas A₃, A₁ y A_cm del diagrama Fe-C (eutectoide en 0,89 % de C).</Note>
    </Frame>
  );
}

/* ───────────── Perfil de dureza: cementación ───────────── */

export function PerfilDureza({ block }: { block: ToolBlock }) {
  const init = { d: num(block.params?.a, 1, 0.2, 3), mode: block.params?.c === 1 ? ("total" as const) : ("cementado" as const) };
  const [s, setS] = useState(init);
  const hrc = (z: number) => {
    if (s.mode === "cementado") {
      const k = 1 / (1 + Math.exp((z - s.d) / 0.12));
      return 34 + 28 * k;
    }
    return 60 - 14 * (1 - Math.exp(-z / 1.4));
  };
  const X = (z: number) => 60 + (z / 4) * 420;
  const Y = (h: number) => 240 - ((h - 20) / 50) * 200;
  const surf = hrc(0);
  const core = hrc(4);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara la pieza cementada con una templada en toda su masa: ¿dónde está el núcleo tenaz?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tratamiento" value={s.mode} onChange={(mode) => setS((p) => ({ ...p, mode }))} items={[{ value: "cementado", label: "Cementación + temple" }, { value: "total", label: "Temple de toda la pieza" }]} />
          <Slider label="Espesor de la capa cementada" value={s.d} min={0.2} max={3} step={0.1} format={(v) => fmtEs(v, 1)} unit=" mm" color={MANIM.orange} disabled={s.mode === "total"} onChange={(d) => setS((p) => ({ ...p, d }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Dureza en la superficie">
          {fmtEs(surf, 0)} HRC
        </Stat>
        <Stat color={MANIM.green} label="Dureza del núcleo">
          {fmtEs(core, 0)} HRC
        </Stat>
      </Readout>
      <Svg w={540} h={290} maxH={235} testId="tool-perfil-dureza">
        <line x1={60} y1={240} x2={500} y2={240} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={60} y1={240} x2={60} y2={30} stroke={MANIM.muted} strokeWidth={2} />
        {[0, 1, 2, 3, 4].map((z) => (
          <text key={z} x={X(z)} y={260} fill={MANIM.muted} fontSize={13} textAnchor="middle">{z}</text>
        ))}
        <text x={280} y={282} fill={MANIM.muted} fontSize={13} textAnchor="middle">Profundidad desde la superficie (mm)</text>
        {[30, 40, 50, 60].map((h) => (
          <g key={h}>
            <line x1={56} y1={Y(h)} x2={500} y2={Y(h)} stroke={MANIM.grid} strokeWidth={1} />
            <text x={50} y={Y(h) + 4} fill={MANIM.muted} fontSize={13} textAnchor="end">{h}</text>
          </g>
        ))}
        <polyline points={Array.from({ length: 81 }, (_, i) => `${X(i / 20)},${Y(hrc(i / 20))}`).join(" ")} fill="none" stroke={MANIM.orange} strokeWidth={4.5} strokeLinejoin="round" />
        {s.mode === "cementado" ? <rect x={60} y={30} width={X(s.d) - 60} height={210} fill={MANIM.orange} fillOpacity={0.15} className="anim-t" /> : null}
      </Svg>
      <Note>Esquema cualitativo: la cementación endurece solo la capa exterior; el temple de toda la pieza deja más duro el exterior que el interior, pero sin núcleo blando y tenaz.</Note>
    </Frame>
  );
}

/* ───────────── Serie electroquímica: pila de dos metales ───────────── */

export const SERIE_FEM = [
  { sym: "Mg", name: "Magnesio", u: -2.37, n: 2 },
  { sym: "Al", name: "Aluminio", u: -1.66, n: 3 },
  { sym: "Zn", name: "Cinc", u: -0.76, n: 2 },
  { sym: "Cr", name: "Cromo", u: -0.74, n: 3 },
  { sym: "Fe", name: "Hierro", u: -0.44, n: 2 },
  { sym: "Ni", name: "Níquel", u: -0.25, n: 2 },
  { sym: "Sn", name: "Estaño", u: -0.14, n: 2 },
  { sym: "Pb", name: "Plomo", u: -0.13, n: 2 },
  { sym: "Cu", name: "Cobre", u: 0.34, n: 2 },
  { sym: "Ag", name: "Plata", u: 0.8, n: 1 },
] as const;

const ion = (m: (typeof SERIE_FEM)[number]) => `${m.sym}${m.n === 1 ? "⁺" : m.n === 2 ? "²⁺" : "³⁺"}`;
const sup = (m: (typeof SERIE_FEM)[number]) => (m.n === 1 ? "+" : `${m.n}+`);

export function PilaElectroquimica({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 4, 0, SERIE_FEM.length - 1)), b: Math.round(num(block.params?.b, 8, 0, SERIE_FEM.length - 1)) };
  const [s, setS] = useState(init);
  const m1 = SERIE_FEM[s.a]!;
  const m2 = SERIE_FEM[s.b]!;
  const same = s.a === s.b;
  const [an, ca] = m1.u <= m2.u ? [m1, m2] : [m2, m1];
  const du = ca.u - an.u;
  const n = an.n === ca.n ? an.n : an.n * ca.n;
  const nA = n / an.n;
  const nC = n / ca.n;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige dos metales. El de menor potencial es el ánodo y se corroe; la diferencia de potenciales es lo que marcaría el voltímetro."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Electrodo 1" value={s.a} onChange={(a) => setS((p) => ({ ...p, a }))} items={SERIE_FEM.map((m, i) => ({ value: i, label: m.sym }))} />
          <Choice label="Electrodo 2" value={s.b} onChange={(b) => setS((p) => ({ ...p, b }))} items={SERIE_FEM.map((m, i) => ({ value: i, label: m.sym }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            {[
              ["Fe + Cu", 4, 8],
              ["Fe + Zn", 4, 2],
              ["Zn + Cu", 2, 8],
              ["Al + Cu", 1, 8],
              ["Fe + Ni", 4, 5],
            ].map(([label, a, b]) => (
              <button key={String(label)} type="button" className={TOOL_BTN} onClick={() => setS({ a: a as number, b: b as number })}>
                {label}
              </button>
            ))}
          </div>
        </>
      }
    >
      {same ? (
        <Note>Elige dos metales distintos: con el mismo metal en los dos lados no hay diferencia de potencial.</Note>
      ) : (
        <>
          <Readout>
            <Stat color={MANIM.red} label="Ánodo (se corroe)">
              {an.name} ({an.u > 0 ? "+" : ""}
              {fmtEs(an.u, 2)} V)
            </Stat>
            <Stat color={MANIM.green} label="Cátodo (recibe electrones)">
              {ca.name} ({ca.u > 0 ? "+" : ""}
              {fmtEs(ca.u, 2)} V)
            </Stat>
            <Stat color={MANIM.yellow} label="Voltímetro">
              ΔU = {fmtEs(du, 2)} V
            </Stat>
          </Readout>
          <Svg w={540} h={230} maxH={235} testId="tool-pila">
            <rect x={90} y={95} width={150} height={110} fill={MANIM.blue} fillOpacity={0.18} />
            <rect x={300} y={95} width={150} height={110} fill={MANIM.orange} fillOpacity={0.15} />
            <line x1={270} y1={85} x2={270} y2={215} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 6" />
            <rect x={150} y={55} width={22} height={140} fill="#8b9bb3" className="anim-t" />
            <rect x={380} y={55} width={22} height={140} fill="#d98b4f" />
            <path d="M 161 55 L 161 40 L 391 40 L 391 55" stroke={MANIM.ink} strokeWidth={3} fill="none" />
            <circle cx={276} cy={40} r={19} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={3} />
            <text x={276} y={44} fill={MANIM.yellow} fontSize={11} textAnchor="middle">{fmtEs(du, 2)} V</text>
            <path d="M 205 14 L 330 14" stroke={MANIM.yellow} strokeWidth={Math.min(6, 1.5 + du * 1.5)} />
            <polygon points="336,14 322,7 322,21" fill={MANIM.yellow} />
            <text x={268} y={30} fill={MANIM.yellow} fontSize={12} textAnchor="middle" opacity={0}>e⁻</text>
            <text x={355} y={18} fill={MANIM.yellow} fontSize={13} textAnchor="start">e⁻</text>
            <text x={161} y={225} fill={MANIM.red} fontSize={15} textAnchor="middle" fontWeight={700}>{an.sym} (ánodo)</text>
            <text x={391} y={225} fill={MANIM.green} fontSize={15} textAnchor="middle" fontWeight={700}>{ca.sym} (cátodo)</text>
          </Svg>
          <MathRenderer
            text={`$${nA > 1 ? nA : ""}${an.sym} \\rightarrow ${nA > 1 ? nA : ""}${an.sym}^{${sup(an)}} + ${n}e^-\\qquad ${nC > 1 ? nC : ""}${ca.sym}^{${sup(ca)}} + ${n}e^- \\rightarrow ${nC > 1 ? nC : ""}${ca.sym}$`}
            className="text-lg"
          />
          <Note>
            ΔU = {fmtEs(ca.u, 2)} − ({fmtEs(an.u, 2)}) = {fmtEs(du, 2)} V. Cuanto más separados están en la serie, mayor es la diferencia de potencial y la corrosión del ánodo.
          </Note>
        </>
      )}
    </Frame>
  );
}

/* ───────────── Ley de Nernst ───────────── */

export function NernstExplorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 6, 0, SERIE_FEM.length - 1)), b: Math.round(num(block.params?.b, 7, 0, SERIE_FEM.length - 1)), k1: num(block.params?.c, 0, -4, 1), k2: 0, n: 2 };
  const [s, setS] = useState(init);
  const m1 = SERIE_FEM[s.a]!;
  const m2 = SERIE_FEM[s.b]!;
  const [an, ca] = m1.u <= m2.u ? [m1, m2] : [m2, m1];
  const [kA, kC] = m1.u <= m2.u ? [s.k1, s.k2] : [s.k2, s.k1];
  const du0 = ca.u - an.u;
  const du = du0 - (0.0592 / s.n) * (kA - kC);
  const reversed = du < 0;
  const conc = (k: number) => (k >= 0 ? fmtEs(10 ** k, 2) : 10 ** k >= 0.01 ? fmtEs(10 ** k, 3) : `10^${fmtEs(k, 1)}`);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia las concentraciones de los iones: con diferencias grandes puede invertirse el sentido de la reacción."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Metal 1" value={s.a} onChange={(a) => setS((p) => ({ ...p, a }))} items={SERIE_FEM.map((m, i) => ({ value: i, label: m.sym }))} />
          <Choice label="Metal 2" value={s.b} onChange={(b) => setS((p) => ({ ...p, b }))} items={SERIE_FEM.map((m, i) => ({ value: i, label: m.sym }))} />
          <Slider label={`Concentración de ${ion(m1)} (escala logarítmica)`} value={s.k1} min={-4} max={1} step={0.1} format={(v) => `${fmtEs(10 ** v, v < -1 ? 4 : 3)} M`} color={MANIM.blue} onChange={(k1) => setS((p) => ({ ...p, k1 }))} />
          <Slider label={`Concentración de ${ion(m2)} (escala logarítmica)`} value={s.k2} min={-4} max={1} step={0.1} format={(v) => `${fmtEs(10 ** v, v < -1 ? 4 : 3)} M`} color={MANIM.orange} onChange={(k2) => setS((p) => ({ ...p, k2 }))} />
          <Choice label="Electrones intercambiados, n" value={s.n} onChange={(n) => setS((p) => ({ ...p, n }))} items={[{ value: 1, label: "1" }, { value: 2, label: "2" }, { value: 3, label: "3" }]} />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button type="button" className={TOOL_BTN} onClick={() => setS({ a: 6, b: 7, k1: Math.log10(0.5), k2: -3, n: 2 })}>Sn 0,5 M / Pb 0,001 M</button>
            <button type="button" className={TOOL_BTN} onClick={() => setS((p) => ({ ...p, k1: 0, k2: 0 }))}>Estándar 1 M</button>
          </div>
        </>
      }
    >
      {s.a === s.b ? (
        <Note>Elige dos metales distintos.</Note>
      ) : (
        <>
          <Readout>
            <Stat color={MANIM.muted} label="Diferencia estándar (1 M)">
              ΔU₀ = {fmtEs(du0, 2)} V
            </Stat>
            <Stat color={reversed ? MANIM.red : MANIM.yellow} label="Con estas concentraciones">
              ΔU = {fmtEs(du, 3)} V
            </Stat>
            <Stat color={reversed ? MANIM.red : MANIM.green} label="Ánodo">
              {reversed ? `${ca.name} (¡se invierte!)` : an.name}
            </Stat>
          </Readout>
          <MathRenderer
            text={`$\\Delta U = (U_2 - U_1) - \\dfrac{0{,}0592}{n}\\log\\dfrac{[M_1^{n+}]}{[M_2^{n+}]} = ${fmtEs(du0, 2)} - \\dfrac{0{,}0592}{${s.n}}\\log\\dfrac{${conc(kA)}}{${conc(kC)}} = ${fmtEs(du, 3)}\\ \\text{V}$`}
            className="text-lg"
          />
          <Note>{reversed ? "El signo cambia: el metal que era cátodo pasa a ser ánodo. La concentración de iones decide el sentido de la corrosión." : "El sentido es el mismo que con concentraciones estándar, aunque la tensión cambia."}</Note>
        </>
      )}
    </Frame>
  );
}

/* ───────────── Ley de Faraday ───────────── */

const FARADAY = [
  { sym: "Zn", name: "Cinc", M: 65.38, n: 2, rho: 7.13 },
  { sym: "Cu", name: "Cobre", M: 63.55, n: 2, rho: 8.96 },
  { sym: "Fe", name: "Hierro", M: 55.85, n: 2, rho: 7.87 },
  { sym: "Ni", name: "Níquel", M: 58.69, n: 2, rho: 8.9 },
  { sym: "Cr", name: "Cromo", M: 52.0, n: 3, rho: 7.19 },
  { sym: "Ag", name: "Plata", M: 107.87, n: 1, rho: 10.49 },
] as const;
const F = 96500;

export function FaradayExplorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.a, 0, 0, FARADAY.length - 1)), I: Math.round(num(block.params?.b, 10, 1, 50)), t: Math.round(num(block.params?.c, 60, 1, 180)), A: 4 };
  const [s, setS] = useState(init);
  const m = FARADAY[s.i]!;
  const mass = (s.I * s.t * 60 * m.M) / (m.n * F);
  const thickness = mass / (m.rho * s.A) * 10;
  const target = 0.05;
  const tTarget = (m.rho * s.A * (target / 10) * m.n * F) / (s.I * m.M);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el metal, la intensidad y el tiempo. ¿Cuánto metal se deposita y qué espesor de capa se consigue?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Metal que se deposita" value={s.i} onChange={(i) => setS((p) => ({ ...p, i }))} items={FARADAY.map((x, i) => ({ value: i, label: x.sym }))} />
          <Slider label="Intensidad, I" value={s.I} min={1} max={50} unit=" A" color={MANIM.yellow} onChange={(I) => setS((p) => ({ ...p, I }))} />
          <Slider label="Tiempo, t" value={s.t} min={1} max={180} unit=" min" color={MANIM.blue} onChange={(t) => setS((p) => ({ ...p, t }))} />
          <Slider label="Superficie a recubrir" value={s.A} min={1} max={100} unit=" cm²" color={MANIM.green} onChange={(A) => setS((p) => ({ ...p, A }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label={`Masa de ${m.name.toLowerCase()} depositada`}>
          {fmtEs(mass, 2)} g
        </Stat>
        <Stat color={MANIM.green} label="Espesor de la capa">
          {fmtEs(thickness, 3)} mm
        </Stat>
        <Stat color={MANIM.orange} label="Tiempo para una capa de 0,05 mm">
          {tTarget < 120 ? `${fmtEs(tTarget, 0)} s` : `${fmtEs(tTarget / 60, 1)} min`}
        </Stat>
      </Readout>
      <div className="h-6 w-full overflow-hidden rounded-md bg-white/5" data-testid="tool-faraday-capa">
        <div className="anim-t h-full" style={{ width: `${Math.min(100, (thickness / 0.2) * 100)}%`, background: MANIM.yellow }} />
      </div>
      <MathRenderer text={`$m = \\dfrac{I\\,t\\,M}{n\\,F} = \\dfrac{${fmtEs(s.I, 0)}\\cdot ${fmtEs(s.t * 60, 0)}\\cdot ${fmtEs(m.M, 2)}}{${m.n}\\cdot 96\\,500} = ${fmtEs(mass, 2)}\\ \\text{g}$`} className="text-lg" />
      <Note>La barra llega al máximo con 0,2 mm de espesor. Ejemplo del libro: 10 A durante 1 h depositan 12,2 g de Zn.</Note>
    </Frame>
  );
}

/* ───────────── Recubrimiento rayado ───────────── */

const RECUBRIMIENTOS = SERIE_FEM.filter((m) => m.sym !== "Fe" && m.sym !== "Cr");
const U_FE = -0.44;

export function RecubrimientoRayado({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 2, 0, RECUBRIMIENTOS.length - 1));
  const [i, setI] = useState(init);
  const c = RECUBRIMIENTOS[i]!;
  const anodico = c.u < U_FE;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el metal del recubrimiento y mira qué pasa en la rayadura: ¿se corroe el recubrimiento o el acero?"}
      onReset={() => setI(init)}
      controls={<Choice label="Recubrimiento sobre acero" value={i} onChange={setI} items={RECUBRIMIENTOS.map((m, k) => ({ value: k, label: m.sym }))} />}
    >
      <Readout>
        <Stat color={anodico ? MANIM.green : MANIM.red} label="Se corroe">
          {anodico ? `${c.name} (el acero queda protegido)` : "El acero (a través de la rayadura)"}
        </Stat>
        <Stat color={MANIM.yellow} label="Potenciales">
          {c.sym} {c.u > 0 ? "+" : ""}
          {fmtEs(c.u, 2)} V · Fe {fmtEs(U_FE, 2)} V
        </Stat>
      </Readout>
      <Svg w={540} h={230} maxH={235} testId="tool-recubrimiento">
        <rect x={60} y={120} width={420} height={80} fill="#8b97a6" fillOpacity={0.6} stroke={MANIM.muted} strokeWidth={2} />
        <text x={270} y={170} fill={MANIM.ink} fontSize={16} textAnchor="middle" fontWeight={700}>Acero (Fe)</text>
        <rect x={60} y={96} width={190} height={24} fill={anodico ? MANIM.green : MANIM.orange} fillOpacity={0.7} />
        <rect x={290} y={96} width={190} height={24} fill={anodico ? MANIM.green : MANIM.orange} fillOpacity={0.7} />
        <text x={155} y={113} fill={MANIM.surface} fontSize={14} textAnchor="middle" fontWeight={800}>{c.sym}</text>
        <text x={385} y={113} fill={MANIM.surface} fontSize={14} textAnchor="middle" fontWeight={800}>{c.sym}</text>
        <rect x={250} y={96} width={40} height={24} fill={MANIM.surface} />
        <text x={270} y={86} fill={MANIM.muted} fontSize={13} textAnchor="middle">rayadura</text>
        <path d="M 250 90 q -10 -40 -20 -50" stroke={anodico ? MANIM.green : MANIM.blue} strokeWidth={3} fill="none" className="anim-t" style={{ opacity: anodico ? 1 : 0 }} />
        <path d="M 270 100 q 0 -40 0 -62" stroke={MANIM.blue} strokeWidth={3} fill="none" className="anim-t" style={{ opacity: anodico ? 0 : 1 }} />
        <text x={anodico ? 205 : 292} y={30} fill={anodico ? MANIM.green : MANIM.blue} fontSize={15} textAnchor="middle" fontWeight={700}>
          {anodico ? `${c.sym}${c.n === 1 ? "⁺" : c.n === 2 ? "²⁺" : "³⁺"} se disuelve` : "Fe²⁺ se disuelve (herrumbre)"}
        </text>
        <path d="M 170 130 L 250 130" stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="7 5" style={{ opacity: anodico ? 1 : 0 }} />
        <text x={210} y={146} fill={MANIM.yellow} fontSize={13} textAnchor="middle" style={{ opacity: anodico ? 1 : 0 }}>e⁻ hacia el Fe</text>
        <path d="M 340 130 L 280 130" stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="7 5" style={{ opacity: anodico ? 0 : 1 }} />
        <text x={330} y={146} fill={MANIM.yellow} fontSize={13} textAnchor="middle" style={{ opacity: anodico ? 0 : 1 }}>e⁻ hacia el {c.sym}</text>
      </Svg>
      <Note>
        {anodico ? "Tiene menor potencial que el hierro: es anódico. Aunque se raye, se corroe él y el acero actúa de cátodo (galvanizado con cinc)." : "Tiene mayor potencial que el hierro: es catódico. Si se raya, el acero queda expuesto y se corroe más deprisa (estaño, cobre, níquel…)."}
      </Note>
    </Frame>
  );
}

/* ───────────── Relación de Pilling-Bedworth ───────────── */

const OXIDOS = [
  { sym: "Mg", ox: "MgO", dMet: 1.74, dOx: 3.58, mMet: 24.305, mOx: 40.3, n: 1 },
  { sym: "Al", ox: "Al₂O₃", dMet: 2.7, dOx: 4.0, mMet: 26.98, mOx: 101.96, n: 2 },
  { sym: "Zn", ox: "ZnO", dMet: 7.13, dOx: 5.61, mMet: 65.38, mOx: 81.38, n: 1 },
  { sym: "Fe", ox: "Fe₂O₃", dMet: 7.87, dOx: 5.3, mMet: 55.85, mOx: 159.69, n: 2 },
  { sym: "V", ox: "V₂O₅", dMet: 6.11, dOx: 3.56, mMet: 50.94, mOx: 181.88, n: 2 },
] as const;

export function PillingBedworth({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 1, 0, OXIDOS.length - 1));
  const [i, setI] = useState(init);
  const o = OXIDOS[i]!;
  const r = (o.mOx * o.dMet) / (o.n * o.mMet * o.dOx);
  const verdict = r < 1 ? { t: "Capa porosa: no protege", c: MANIM.orange, d: "El óxido ocupa menos volumen que el metal del que se formó: no lo cubre del todo y el oxígeno sigue entrando." } : r <= 2 ? { t: "Capa protectora", c: MANIM.green, d: "Volumen casi igual al del metal: capa muy adherente e impermeable, sin grietas. La oxidación se detiene." } : { t: "Se agrieta y se desprende", c: MANIM.red, d: "El óxido ocupa mucho más volumen: aparecen tensiones, se resquebraja y salta. La oxidación continúa." };
  const w = Math.min(190, r * 60);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el metal y compara el volumen del óxido con el del metal que se consume."}
      onReset={() => setI(init)}
      controls={<Choice label="Metal" value={i} onChange={setI} items={OXIDOS.map((x, k) => ({ value: k, label: `${x.sym} → ${x.ox}` }))} />}
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Relación V(óxido) / V(metal)">
          {fmtEs(r, 2)}
        </Stat>
        <Stat color={verdict.c} label="Resultado">
          {verdict.t}
        </Stat>
      </Readout>
      <Svg w={540} h={190} maxH={235} testId="tool-pilling">
        <rect x={60} y={50} width={60} height={60} fill="#8b9bb3" />
        <text x={90} y={86} fill={MANIM.surface} fontSize={18} textAnchor="middle" fontWeight={800}>{o.sym}</text>
        <text x={90} y={135} fill={MANIM.muted} fontSize={13} textAnchor="middle">1 de metal</text>
        <text x={170} y={86} fill={MANIM.muted} fontSize={26} textAnchor="middle">→</text>
        <rect x={220} y={110 - 60 * Math.min(r, 3)} width={w} height={60 * Math.min(r, 3)} fill={verdict.c} fillOpacity={0.55} stroke={verdict.c} strokeWidth={3} className="anim-t" />
        <text x={220 + w / 2} y={135} fill={verdict.c} fontSize={13} textAnchor="middle">{fmtEs(r, 2)} de óxido ({o.ox})</text>
        <line x1={215} y1={50} x2={440} y2={50} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="5 5" />
      </Svg>
      <MathRenderer text={`$R = \\dfrac{M_{\\text{óxido}}\\,d_{\\text{metal}}}{n\\,M_{\\text{metal}}\\,d_{\\text{óxido}}} = \\dfrac{${fmtEs(o.mOx, 2)}\\cdot ${fmtEs(o.dMet, 2)}}{${o.n}\\cdot ${fmtEs(o.mMet, 2)}\\cdot ${fmtEs(o.dOx, 2)}} = ${fmtEs(r, 2)}$`} className="text-lg" />
      <Note>{verdict.d}</Note>
    </Frame>
  );
}
