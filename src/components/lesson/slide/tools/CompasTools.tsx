"use client";

import { useState, type ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import {
  Compass,
  Dot,
  RightMark,
  Ruler,
  Seg,
  Wedge,
  WedgeLabel,
  angleOf,
  arcPath,
  polar,
  type Pt,
} from "@/components/lesson/anim/geometry";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const PX_PER_MM = 4;

/** Arco trazado hasta la fracción `f` (0…1) del recorrido del compás. */
function PartialArc({ c, r, a0, a1, f, color }: { c: Pt; r: number; a0: number; a1: number; f: number; color: string }) {
  if (f <= 0) {
    return null;
  }
  return <path d={arcPath(c, r, a0, a0 + (a1 - a0) * Math.min(1, f))} fill="none" stroke={color} strokeWidth={3.5} strokeLinecap="round" />;
}

function Status({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warn" | "ok" }) {
  const color = tone === "warn" ? MANIM.red : tone === "ok" ? MANIM.green : MANIM.yellow;
  return (
    <p className="text-lg font-semibold leading-snug" style={{ color }} data-testid="tool-readout">
      {children}
    </p>
  );
}

type ConstructionState = { step: number; sweep: number };

/** Controles comunes: giro del compás y botón para pasar al siguiente paso. */
function StepControls({
  state,
  setState,
  lastSweepStep,
  nextLabels,
  doneLabel,
  doneTone = "ok",
  children,
}: {
  state: ConstructionState;
  setState: (s: ConstructionState) => void;
  lastSweepStep: number;
  nextLabels: string[];
  doneLabel: string;
  doneTone?: "ok" | "warn";
  children?: ReactNode;
}) {
  const sweeping = state.step <= lastSweepStep;
  const complete = state.sweep >= 100;
  return (
    <>
      {children}
      <Slider
        label="Giro del compás"
        value={sweeping ? state.sweep : 100}
        min={0}
        max={100}
        unit=" %"
        color={MANIM.yellow}
        disabled={!sweeping}
        onChange={(v) => setState({ ...state, sweep: v })}
      />
      <div className="flex items-end">
        {sweeping ? (
          <button type="button" className={TOOL_BTN} disabled={!complete} onClick={() => setState({ step: state.step + 1, sweep: 0 })}>
            {nextLabels[state.step]}
          </button>
        ) : (
          <span className="text-sm font-semibold" style={{ color: doneTone === "ok" ? MANIM.green : MANIM.red }}>
            {doneLabel}
          </span>
        )}
      </div>
    </>
  );
}

/* ───────────── Mediatriz con compás y regla ───────────── */

export function CompasMediatriz({ block }: { block: ToolBlock }) {
  const initMm = clamp(Math.round(block.params?.a ?? 40), 24, 50);
  const [mm, setMm] = useState(initMm);
  const [state, setState] = useState<ConstructionState>({ step: 0, sweep: 0 });
  const A: Pt = [110, 190];
  const B: Pt = [350, 190];
  const AB = 60 * PX_PER_MM;
  const r = mm * PX_PER_MM;
  const SPAN = 62;
  const meets = r > AB / 2;
  const h = meets ? Math.sqrt(r * r - (AB / 2) ** 2) : 0;
  const T1: Pt = [(A[0] + B[0]) / 2, 190 - h];
  const T2: Pt = [(A[0] + B[0]) / 2, 190 + h];
  const { step, sweep } = state;
  const fA = step === 0 ? sweep / 100 : 1;
  const fB = step === 1 ? sweep / 100 : step > 1 ? 1 : 0;
  const locked = step > 0 || sweep > 0;
  const angleA = SPAN - (2 * SPAN * sweep) / 100;
  const angleB = 180 - SPAN + (2 * SPAN * sweep) / 100;

  const reset = () => {
    setMm(initMm);
    setState({ step: 0, sweep: 0 });
  };
  const message =
    step === 0
      ? "Paso 1: pincha el compás en A (AB mide 60 mm) y gíralo para trazar un arco a cada lado del segmento."
      : step === 1
        ? "Paso 2: sin cambiar la abertura, pincha en B y traza el segundo arco."
        : meets
          ? "Paso 3: la regla une los dos cortes de los arcos. Esa recta es la mediatriz: pasa por el punto medio y es perpendicular a AB."
          : "Con esta abertura los arcos no llegan a cortarse. Reinicia y abre el compás más de la mitad de AB.";

  return (
    <Frame
      stacked
      hint={block.hint ?? "Prueba abertura pequeña y grande: el compás tiene que abrirse más de la mitad de AB."}
      onReset={reset}
      controls={
        <StepControls
          state={state}
          setState={setState}
          lastSweepStep={1}
          nextLabels={["Pinchar en B", "Colocar la regla"]}
          doneLabel={meets ? "Mediatriz trazada" : "Los arcos no se cortan"}
          doneTone={meets ? "ok" : "warn"}
        >
          <Slider
            label="Abertura del compás"
            value={mm}
            min={24}
            max={50}
            unit=" mm"
            color={meets ? MANIM.blue : MANIM.red}
            disabled={locked}
            onChange={setMm}
          />
        </StepControls>
      }
    >
      <Status tone={step >= 2 && !meets ? "warn" : step >= 2 ? "ok" : "info"}>{message}</Status>
      <svg viewBox="0 0 460 380" className="mx-auto block h-[17rem] w-auto max-w-full" aria-hidden focusable="false" data-testid="tool-compas">
        <Seg a={A} b={B} width={4} />
        <line x1={A[0]} y1={A[1] - 10} x2={A[0]} y2={A[1] + 10} stroke={MANIM.ink} strokeWidth={4} />
        <line x1={B[0]} y1={B[1] - 10} x2={B[0]} y2={B[1] + 10} stroke={MANIM.ink} strokeWidth={4} />
        <text x={A[0] - 14} y={A[1] + 30} fill={MANIM.ink} fontSize={22} fontWeight={700} textAnchor="middle">A</text>
        <text x={B[0] + 14} y={B[1] + 30} fill={MANIM.ink} fontSize={22} fontWeight={700} textAnchor="middle">B</text>
        <PartialArc c={A} r={r} a0={SPAN} a1={-SPAN} f={fA} color={MANIM.blue} />
        <PartialArc c={B} r={r} a0={180 - SPAN} a1={180 + SPAN} f={fB} color={MANIM.orange} />
        {step === 0 ? <Compass c={A} r={r} angle={angleA} instant /> : null}
        {step === 1 ? <Compass c={B} r={r} angle={angleB} flip instant /> : null}
        {step >= 2 && meets ? (
          <>
            <Dot p={T1} color={MANIM.yellow} r={6} />
            <Dot p={T2} color={MANIM.yellow} r={6} />
            <Ruler a={T2} b={T1} show side={1} over={26} />
            <Seg a={[T2[0], Math.min(T2[1] + 40, 372)]} b={[T1[0], Math.max(T1[1] - 40, 8)]} color={MANIM.purple} width={4} />
            <RightMark v={[(A[0] + B[0]) / 2, 190]} a={90} b={0} size={14} color={MANIM.purple} />
            <text x={T1[0] + 14} y={Math.max(T1[1] - 24, 22)} fill={MANIM.purple} fontSize={22} fontWeight={700}>m</text>
          </>
        ) : null}
      </svg>
    </Frame>
  );
}

/* ───────────── Bisectriz con compás y regla ───────────── */

export function CompasBisectriz({ block }: { block: ToolBlock }) {
  const initAlpha = clamp(Math.round((block.params?.a ?? 60) / 2) * 2, 30, 120);
  const [alpha, setAlpha] = useState(initAlpha);
  const initMm2 = clamp(Math.round(block.params?.b ?? 40), 10, 50);
  const [mm2, setMm2] = useState(initMm2);
  const [state, setState] = useState<ConstructionState>({ step: 0, sweep: 0 });
  const V: Pt = [170, 330];
  const rho1 = 100;
  const rho2 = mm2 * PX_PER_MM;
  const half = alpha / 2;
  const sinH = Math.sin((half * Math.PI) / 180);
  const cosH = Math.cos((half * Math.PI) / 180);
  const meets = rho2 > rho1 * sinH;
  const R1 = polar(V, rho1, 0);
  const S1 = polar(V, rho1, alpha);
  const tDist = rho1 * cosH + Math.sqrt(Math.max(rho2 * rho2 - rho1 * rho1 * sinH * sinH, 0));
  const T = polar(V, tDist, half);
  const fromR = angleOf(R1, T);
  const fromS = angleOf(S1, T);
  const { step, sweep } = state;
  const f1 = step === 0 ? sweep / 100 : 1;
  const f2 = step === 1 ? sweep / 100 : step > 1 ? 1 : 0;
  const f3 = step === 2 ? sweep / 100 : step > 2 ? 1 : 0;
  const locked = step > 0 || sweep > 0;
  const lockedR = step > 1 || (step === 1 && sweep > 0);
  const SPAN = 36;
  const compassAngle =
    step === 0 ? (alpha * sweep) / 100 : step === 1 ? fromR - SPAN + (2 * SPAN * sweep) / 100 : fromS - SPAN + (2 * SPAN * sweep) / 100;
  const bisEnd = polar(V, 300, half);

  const reset = () => {
    setAlpha(initAlpha);
    setMm2(initMm2);
    setState({ step: 0, sweep: 0 });
  };
  const message =
    step === 0
      ? "Paso 1: pincha el compás en el vértice y traza un arco que corte a los dos lados (quedan R y S)."
      : step === 1
        ? "Paso 2: pincha en R y traza un arco dentro del ángulo. Ábrelo más de la mitad de RS."
        : step === 2
          ? "Paso 3: pincha en S, con la misma abertura, y traza otro arco que corte al anterior."
          : meets
            ? "Paso 4: la regla une el vértice con el corte de los arcos. Esa semirrecta es la bisectriz: deja dos ángulos iguales."
            : "Con esta abertura los arcos no llegan a cortarse. Reinicia y ábrelo más.";

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la amplitud o la abertura del segundo arco y comprueba que la bisectriz siempre reparte el ángulo por la mitad."}
      onReset={reset}
      controls={
        <StepControls
          state={state}
          setState={setState}
          lastSweepStep={2}
          nextLabels={["Pinchar en R", "Pinchar en S", "Colocar la regla"]}
          doneLabel={meets ? "Bisectriz trazada" : "Los arcos no se cortan"}
          doneTone={meets ? "ok" : "warn"}
        >
          <Slider label="Amplitud del ángulo" value={alpha} min={30} max={120} step={2} unit="°" color={MANIM.blue} disabled={locked} onChange={setAlpha} />
          <Slider
            label="Abertura (arcos de R y S)"
            value={mm2}
            min={10}
            max={50}
            unit=" mm"
            color={meets ? MANIM.green : MANIM.red}
            disabled={lockedR}
            onChange={setMm2}
          />
        </StepControls>
      }
    >
      <Status tone={step >= 3 && !meets ? "warn" : step >= 3 ? "ok" : "info"}>{message}</Status>
      <svg viewBox="0 0 560 380" className="mx-auto block h-[17rem] w-auto max-w-full" aria-hidden focusable="false" data-testid="tool-compas">
        {step >= 3 && meets ? (
          <>
            <Wedge c={V} r={66} a0={0} a1={half} color={MANIM.green} opacity={0.35} />
            <Wedge c={V} r={66} a0={half} a1={alpha} color={MANIM.orange} opacity={0.35} />
            <WedgeLabel c={V} r={98} a0={0} a1={half} text={`${half}°`} size={18} color={MANIM.green} halo={MANIM.surface} />
            <WedgeLabel c={V} r={98} a0={half} a1={alpha} text={`${half}°`} size={18} color={MANIM.orange} halo={MANIM.surface} />
          </>
        ) : null}
        <Seg a={V} b={polar(V, 330, 0)} width={4} />
        <Seg a={V} b={polar(V, 330, alpha)} width={4} />
        <PartialArc c={V} r={rho1} a0={0} a1={alpha} f={f1} color={MANIM.blue} />
        <PartialArc c={R1} r={rho2} a0={fromR - SPAN} a1={fromR + SPAN} f={f2} color={MANIM.green} />
        <PartialArc c={S1} r={rho2} a0={fromS - SPAN} a1={fromS + SPAN} f={f3} color={MANIM.orange} />
        {step === 0 ? <Compass c={V} r={rho1} angle={compassAngle} instant /> : null}
        {step === 1 ? <Compass c={R1} r={rho2} angle={compassAngle} instant /> : null}
        {step === 2 ? <Compass c={S1} r={rho2} angle={compassAngle} instant /> : null}
        {step >= 1 || sweep >= 100 ? (
          <>
            <Dot p={R1} color={MANIM.yellow} r={5} />
            <Dot p={S1} color={MANIM.yellow} r={5} />
            <text x={R1[0] + 4} y={R1[1] + 28} fill={MANIM.yellow} fontSize={20} fontWeight={700}>R</text>
            <text x={S1[0] - 24} y={S1[1] - 6} fill={MANIM.yellow} fontSize={20} fontWeight={700}>S</text>
          </>
        ) : null}
        {step >= 3 && meets ? (
          <>
            <Dot p={T} color={MANIM.purple} r={6} />
            <Ruler a={V} b={T} show side={-1} over={40} thickness={40} />
            <Seg a={V} b={bisEnd} color={MANIM.purple} width={4} />
            <text x={bisEnd[0] + 10} y={bisEnd[1] - 6} fill={MANIM.purple} fontSize={22} fontWeight={700}>b</text>
          </>
        ) : null}
      </svg>
    </Frame>
  );
}
