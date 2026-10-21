"use client";

import { useState, type ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { ParalelasFigure } from "@/components/lesson/anim/scenes/paralelas-secante";
import { TriangulatedPolygon } from "@/components/lesson/anim/scenes/poligono-triangulos";
import { decEs } from "@/components/lesson/anim/fraction";
import { MANIM } from "@/components/lesson/anim/palette";
import {
  Dot,
  RightMark,
  Seg,
  TickMark,
  Wedge,
  WedgeLabel,
  angleOf,
  footOn,
  lineThrough,
  polar,
  wedgePath,
  type Pt,
} from "@/components/lesson/anim/geometry";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const SVG_CLASS = "mx-auto block h-auto w-full max-w-2xl";

export function Svg({ w = 520, h = 300, children, testId, maxH }: { w?: number; h?: number; children: ReactNode; testId?: string; maxH?: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={SVG_CLASS} style={maxH ? { maxHeight: maxH } : undefined} aria-hidden focusable="false" data-testid={testId}>
      {children}
    </svg>
  );
}

export function Readout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1" data-testid="tool-readout">
      {children}
    </div>
  );
}

export const cm = (v: number) => decEs(Math.round(v * 10) / 10);

/* ───────────── Rectas: paralelas, secantes y perpendiculares ───────────── */

export function RectasPosicion({ block }: { block: ToolBlock }) {
  const init = clamp(Math.round(block.params?.a ?? 60), 0, 180);
  const [alpha, setAlpha] = useState(init);
  const P: Pt = [260, 90];
  const ry = 215;
  const parallel = alpha === 0 || alpha === 180;
  const perpendicular = alpha === 90;
  const hit: Pt | null = parallel ? null : [P[0] - (ry - P[1]) / Math.tan((alpha * Math.PI) / 180), ry];
  const visible = hit !== null && hit[0] >= 30 && hit[0] <= 490;
  const [s1, s2] = lineThrough(P, alpha, 330);
  const acute = Math.min(alpha, 180 - alpha);
  const color = parallel ? MANIM.green : perpendicular ? MANIM.yellow : MANIM.orange;
  const kind = parallel ? "paralelas" : perpendicular ? "perpendiculares" : "secantes";
  const hitAngle = hit ? (alpha <= 90 ? [0, alpha] : [alpha, 180]) : null;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Gira la recta s alrededor de P y mira cuándo deja de cortar a r y cuándo la corta formando esquinas rectas."}
      onReset={() => setAlpha(init)}
      controls={
        <>
          <Slider label="Giro de la recta s" value={alpha} min={0} max={180} unit="°" color={MANIM.orange} onChange={setAlpha} />
          <div className="flex flex-wrap gap-2">
            <button type="button" className={TOOL_BTN} onClick={() => setAlpha(0)}>
              Paralelas
            </button>
            <button type="button" className={TOOL_BTN} onClick={() => setAlpha(90)}>
              Perpendiculares
            </button>
          </div>
        </>
      }
    >
      <Readout>
        <span className="text-2xl font-bold" style={{ color }}>
          r y s son {kind}
        </span>
        <span className="text-base text-[color:var(--stage-ink,#fff)]">
          {parallel
            ? "No tienen ningún punto en común."
            : perpendicular
              ? "Se cortan formando cuatro ángulos de 90°."
              : `Se cortan en un punto y forman ángulos de ${acute}° y ${180 - acute}°.`}
        </span>
      </Readout>
      <Svg testId="tool-rectas">
        <line x1={20} y1={ry} x2={500} y2={ry} stroke={MANIM.blue} strokeWidth={4} strokeLinecap="round" />
        <text x={500} y={ry - 10} fill={MANIM.blue} fontSize={22} fontWeight={700} textAnchor="end">r</text>
        <Seg a={s1} b={s2} color={MANIM.orange} width={4} />
        <Dot p={P} color={MANIM.yellow} r={6} />
        <text x={P[0] - 28} y={P[1] - 10} fill={MANIM.yellow} fontSize={22} fontWeight={700}>P</text>
        {hit && visible ? (
          <>
            <Dot p={hit} color={MANIM.yellow} r={7} />
            {hitAngle ? <Wedge c={hit} r={36} a0={hitAngle[0]!} a1={hitAngle[1]!} color={color} opacity={0.4} /> : null}
            {perpendicular ? <RightMark v={hit} a={0} b={90} size={14} color={MANIM.yellow} /> : null}
          </>
        ) : null}
        {hit && !visible ? (
          <text x={260} y={286} fill={MANIM.muted} fontSize={17} textAnchor="middle">
            Se cortan más allá del dibujo: las rectas no se acaban.
          </text>
        ) : null}
      </Svg>
    </Frame>
  );
}

/* ───────────── Mediatriz: puntos que equidistan ───────────── */

export function PuntoMediatriz({ block }: { block: ToolBlock }) {
  const init = { dx: clamp(Math.round(block.params?.a ?? 0), -2, 2), dy: clamp(Math.round(block.params?.b ?? 2), -3, 3) };
  const [dx, setDx] = useState(init.dx);
  const [dy, setDy] = useState(init.dy);
  const U = 50;
  const M: Pt = [260, 160];
  const A: Pt = [M[0] - 3 * U, M[1]];
  const B: Pt = [M[0] + 3 * U, M[1]];
  const P: Pt = [M[0] + dx * U, M[1] - dy * U];
  const pa = Math.hypot(3 + dx, dy);
  const pb = Math.hypot(3 - dx, dy);
  const equal = dx === 0;
  const color = equal ? MANIM.green : MANIM.red;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve P arriba y abajo y luego hacia los lados: ¿cuándo coinciden PA y PB?"}
      onReset={() => {
        setDx(init.dx);
        setDy(init.dy);
      }}
      controls={
        <>
          <Slider label="Altura de P" value={dy} min={-3} max={3} unit=" cm" color={MANIM.blue} onChange={setDy} />
          <Slider label="Desplazamiento lateral de P" value={dx} min={-2} max={2} unit=" cm" color={MANIM.orange} onChange={setDx} />
        </>
      }
    >
      <Readout>
        <span className="text-xl font-bold tabular-nums" style={{ color: MANIM.blue }}>
          PA = {cm(pa)} cm
        </span>
        <span className="text-xl font-bold tabular-nums" style={{ color: MANIM.orange }}>
          PB = {cm(pb)} cm
        </span>
        <span className="text-lg font-semibold" style={{ color }}>
          {equal ? "PA = PB: P está en la mediatriz" : `P no está en la mediatriz: queda más cerca de ${dx > 0 ? "B" : "A"}`}
        </span>
      </Readout>
      <Svg h={320} testId="tool-mediatriz">
        <Seg a={A} b={B} width={4} />
        <line x1={A[0]} y1={A[1] - 10} x2={A[0]} y2={A[1] + 10} stroke={MANIM.ink} strokeWidth={4} />
        <line x1={B[0]} y1={B[1] - 10} x2={B[0]} y2={B[1] + 10} stroke={MANIM.ink} strokeWidth={4} />
        <Seg a={[M[0], 12]} b={[M[0], 308]} color={MANIM.purple} width={3.5} />
        <RightMark v={M} a={90} b={0} size={14} color={MANIM.purple} />
        <text x={A[0]} y={A[1] + 34} fill={MANIM.ink} fontSize={22} fontWeight={700} textAnchor="middle">A</text>
        <text x={B[0]} y={B[1] + 34} fill={MANIM.ink} fontSize={22} fontWeight={700} textAnchor="middle">B</text>
        <text x={M[0] + 14} y={304} fill={MANIM.purple} fontSize={22} fontWeight={700}>m</text>
        <Seg a={P} b={A} color={MANIM.blue} width={3} />
        <Seg a={P} b={B} color={MANIM.orange} width={3} />
        <Dot p={P} color={color} r={8} />
        <text x={P[0] + 14} y={P[1] - 10} fill={color} fontSize={22} fontWeight={700}>P</text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Bisectriz: mitades iguales y distancias a los lados ───────────── */

export function BisectrizExplorador({ block }: { block: ToolBlock }) {
  const initA = clamp(Math.round((block.params?.a ?? 60) / 2) * 2, 20, 160);
  const initD = clamp(Math.round(block.params?.b ?? 3), 1, 5);
  const [alpha, setAlpha] = useState(initA);
  const [d, setD] = useState(initD);
  const U = 38;
  const V: Pt = [220, 250];
  const half = alpha / 2;
  const sideS = polar(V, 200, 0);
  const sideR = polar(V, 200, alpha);
  const bis = polar(V, 215, half);
  const P = polar(V, d * U, half);
  const fs = footOn(P, V, sideS);
  const fr = footOn(P, V, sideR);
  const dist = d * Math.sin((half * Math.PI) / 180);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la amplitud y mueve P a lo largo de la bisectriz: las dos distancias a los lados siguen siendo iguales."}
      onReset={() => {
        setAlpha(initA);
        setD(initD);
      }}
      controls={
        <>
          <Slider label="Amplitud del ángulo" value={alpha} min={20} max={160} step={2} unit="°" color={MANIM.blue} onChange={setAlpha} />
          <Slider label="Distancia de P al vértice" value={d} min={1} max={5} unit=" cm" color={MANIM.purple} onChange={setD} />
        </>
      }
    >
      <Readout>
        <span className="text-xl font-bold tabular-nums">
          <span style={{ color: MANIM.green }}>{decEs(half)}°</span> + <span style={{ color: MANIM.orange }}>{decEs(half)}°</span> = {alpha}°
        </span>
        <span className="text-lg font-semibold tabular-nums" style={{ color: MANIM.yellow }}>
          PR = PS = {cm(dist)} cm
        </span>
      </Readout>
      <Svg testId="tool-bisectriz">
        <Wedge c={V} r={64} a0={0} a1={half} color={MANIM.green} opacity={0.4} />
        <Wedge c={V} r={64} a0={half} a1={alpha} color={MANIM.orange} opacity={0.4} />
        <Seg a={V} b={sideS} width={4} />
        <Seg a={V} b={sideR} width={4} />
        <Seg a={V} b={bis} color={MANIM.purple} width={3.5} />
        <Seg a={P} b={fs} color={MANIM.yellow} dashed />
        <Seg a={P} b={fr} color={MANIM.yellow} dashed />
        <TickMark a={P} b={fs} n={2} color={MANIM.yellow} />
        <TickMark a={P} b={fr} n={2} color={MANIM.yellow} />
        {d * U * Math.sin((half * Math.PI) / 180) > 16 ? (
          <>
            <RightMark v={fs} a={angleOf(fs, V)} b={angleOf(fs, P)} size={11} color={MANIM.yellow} />
            <RightMark v={fr} a={angleOf(fr, V)} b={angleOf(fr, P)} size={11} color={MANIM.yellow} />
          </>
        ) : null}
        <Dot p={P} color={MANIM.purple} r={7} />
        <text x={P[0] + 14} y={P[1] + 22} fill={MANIM.purple} fontSize={20} fontWeight={700}>P</text>
        <text x={bis[0] + 8} y={bis[1] - 8} fill={MANIM.purple} fontSize={20} fontWeight={700}>b</text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Ángulos según su amplitud ───────────── */

export function anguloTipo(a: number): { name: string; note: string; color: string } {
  if (a === 0) return { name: "nulo", note: "Los dos lados coinciden.", color: MANIM.muted };
  if (a < 90) return { name: "agudo", note: "Mide menos de 90°.", color: MANIM.blue };
  if (a === 90) return { name: "recto", note: "Mide 90°: los lados son perpendiculares.", color: MANIM.green };
  if (a < 180) return { name: "obtuso", note: "Mide más de 90° y menos de 180°.", color: MANIM.orange };
  if (a === 180) return { name: "llano", note: "Mide 180°: los lados forman una recta.", color: MANIM.yellow };
  if (a < 360) return { name: "cóncavo", note: "Mide más de 180° y menos de 360°.", color: MANIM.purple };
  return { name: "completo", note: "Mide 360°: da la vuelta entera.", color: MANIM.red };
}

export function AnguloExplorador({ block }: { block: ToolBlock }) {
  const init = clamp(Math.round(block.params?.a ?? 40), 0, 360);
  const [alpha, setAlpha] = useState(init);
  const V: Pt = [260, 150];
  const t = anguloTipo(alpha);
  const end = polar(V, 130, alpha);
  const base = polar(V, 130, 0);
  const R = 70;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Abre y cierra el ángulo y fíjate en el nombre que recibe según su amplitud."}
      onReset={() => setAlpha(init)}
      controls={
        <>
          <Slider label="Amplitud del ángulo" value={alpha} min={0} max={360} unit="°" color={MANIM.blue} onChange={setAlpha} />
          <div className="flex flex-wrap gap-2">
            {[90, 180, 360].map((v) => (
              <button key={v} type="button" className={TOOL_BTN} onClick={() => setAlpha(v)}>
                {v}°
              </button>
            ))}
          </div>
        </>
      }
    >
      <Readout>
        <span className="text-2xl font-bold" style={{ color: t.color }}>
          Ángulo {t.name}
        </span>
        <span className="text-base text-[color:var(--stage-ink,#fff)]">{t.note}</span>
      </Readout>
      <Svg h={300} testId="tool-angulo">
        {alpha >= 360 ? (
          <circle cx={V[0]} cy={V[1]} r={R} fill={t.color} fillOpacity={0.35} stroke={t.color} strokeWidth={2} />
        ) : alpha > 0 ? (
          <path d={wedgePath(V, R, 0, alpha)} fill={t.color} fillOpacity={0.35} stroke={t.color} strokeWidth={2} strokeLinejoin="round" />
        ) : null}
        <Seg a={V} b={base} width={4} />
        <Seg a={V} b={end} width={4} color={MANIM.ink} />
        {alpha === 90 ? <RightMark v={V} a={0} b={90} size={22} color={MANIM.ink} /> : null}
        <Dot p={V} color={MANIM.yellow} r={6} />
        <text x={V[0] - 16} y={V[1] + 28} fill={MANIM.yellow} fontSize={20} fontWeight={700}>O</text>
        {alpha > 0 && alpha < 360 ? (
          <WedgeLabel c={V} r={R + 28} a0={0} a1={alpha} text={`${alpha}°`} size={22} color={t.color} />
        ) : null}
        {alpha === 360 ? (
          <text x={V[0]} y={V[1] + R + 34} fill={t.color} fontSize={22} fontWeight={700} textAnchor="middle">360°</text>
        ) : null}
      </Svg>
    </Frame>
  );
}

/* ───────────── Complementarios y suplementarios ───────────── */

export function AngulosSuma({ block }: { block: ToolBlock }) {
  const initTotal = block.params?.b === 180 ? 180 : 90;
  const [total, setTotal] = useState<90 | 180>(initTotal);
  const initA = clamp(Math.round(block.params?.a ?? 64), 1, initTotal - 1);
  const [alpha, setAlpha] = useState(initA);
  const a = clamp(alpha, 1, total - 1);
  const b = total - a;
  const V: Pt = [260, 240];

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el ángulo α y mira cuánto le falta al otro para completar 90° o 180°."}
      onReset={() => {
        setTotal(initTotal);
        setAlpha(initA);
      }}
      controls={
        <>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button type="button" className={TOOL_BTN} aria-pressed={total === 90} onClick={() => setTotal(90)}>
              Complementarios (90°)
            </button>
            <button type="button" className={TOOL_BTN} aria-pressed={total === 180} onClick={() => setTotal(180)}>
              Suplementarios (180°)
            </button>
          </div>
          <Slider label="Ángulo α" value={a} min={1} max={total - 1} unit="°" color={MANIM.blue} onChange={setAlpha} />
        </>
      }
    >
      <Readout>
        <MathRenderer text={`$\\alpha + \\beta = ${total}^\\circ \\;\\Rightarrow\\; \\beta = ${total}^\\circ - ${a}^\\circ = ${b}^\\circ$`} className="text-2xl" />
        <span className="text-lg font-semibold" style={{ color: MANIM.yellow }}>
          {total === 90 ? "son complementarios" : "son suplementarios"}
        </span>
      </Readout>
      <Svg h={270} testId="tool-suma">
        <Wedge c={V} r={90} a0={0} a1={a} color={MANIM.blue} opacity={0.4} />
        <Wedge c={V} r={90} a0={a} a1={total} color={MANIM.orange} opacity={0.4} />
        <Seg a={V} b={polar(V, 190, 0)} width={4} />
        <Seg a={V} b={polar(V, 190, total)} width={4} />
        <Seg a={V} b={polar(V, 190, a)} width={4} color={MANIM.yellow} />
        {total === 180 ? <Seg a={V} b={polar(V, 190, 180)} width={4} /> : <RightMark v={V} a={0} b={90} size={16} color={MANIM.ink} />}
        <WedgeLabel c={V} r={122} a0={0} a1={a} text={`α = ${a}°`} size={20} color={MANIM.blue} halo={MANIM.surface} />
        <WedgeLabel c={V} r={122} a0={a} a1={total} text={`β = ${b}°`} size={20} color={MANIM.orange} halo={MANIM.surface} />
      </Svg>
    </Frame>
  );
}

/* ───────────── Paralelas cortadas por una secante ───────────── */

type RelationId = "opuestos" | "correspondientes" | "internos" | "externos" | "consecutivos";

const RELATIONS: { id: RelationId; label: string; ids: number[]; color: string; equal: boolean }[] = [
  { id: "opuestos", label: "Opuestos por el vértice", ids: [1, 3], color: MANIM.blue, equal: true },
  { id: "correspondientes", label: "Correspondientes", ids: [1, 5], color: MANIM.green, equal: true },
  { id: "internos", label: "Alternos internos", ids: [3, 5], color: MANIM.orange, equal: true },
  { id: "externos", label: "Alternos externos", ids: [1, 7], color: MANIM.purple, equal: true },
  { id: "consecutivos", label: "Consecutivos", ids: [1, 2], color: MANIM.red, equal: false },
];

export function ParalelasExplorador({ block }: { block: ToolBlock }) {
  const init = clamp(Math.round(block.params?.a ?? 65), 30, 150);
  const [theta, setTheta] = useState(init);
  const [rel, setRel] = useState<RelationId | null>("correspondientes");
  const current = RELATIONS.find((r) => r.id === rel);
  const value = (k: number) => (k % 2 === 1 ? theta : 180 - theta);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un tipo de pareja y cambia la inclinación de la secante: ¿qué parejas son siempre iguales?"}
      onReset={() => {
        setTheta(init);
        setRel("correspondientes");
      }}
      controls={
        <>
          <Slider label="Inclinación de la secante" value={theta} min={30} max={150} unit="°" color={MANIM.orange} onChange={setTheta} />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            {RELATIONS.map((r) => (
              <button key={r.id} type="button" className={TOOL_BTN} aria-pressed={rel === r.id} onClick={() => setRel(r.id)} style={rel === r.id ? { borderColor: r.color, color: r.color } : undefined}>
                {r.label}
              </button>
            ))}
          </div>
        </>
      }
    >
      <Readout>
        {current ? (
          <>
            <span className="text-xl font-bold" style={{ color: current.color }}>
              {current.label}
            </span>
            <MathRenderer
              text={
                current.equal
                  ? `$\\hat{${current.ids[0]}} = ${value(current.ids[0]!)}^\\circ$ y $\\hat{${current.ids[1]}} = ${value(current.ids[1]!)}^\\circ$: **son iguales**`
                  : `$\\hat{1} + \\hat{2} = ${value(1)}^\\circ + ${value(2)}^\\circ = 180^\\circ$: **son suplementarios**`
              }
              className="text-lg"
            />
          </>
        ) : null}
      </Readout>
      <svg viewBox="0 0 800 420" className={SVG_CLASS} aria-hidden focusable="false" data-testid="tool-paralelas">
        <ParalelasFigure theta={theta} active={current ? [{ ids: current.ids, color: current.color }] : []} ghost={false} labelValues />
      </svg>
    </Frame>
  );
}

/* ───────────── Transportador ───────────── */

export function Transportador({ block }: { block: ToolBlock }) {
  const init = clamp(Math.round(block.params?.a ?? 47), 1, 179);
  const [alpha, setAlpha] = useState(init);
  const C: Pt = [260, 262];
  const R = 220;
  const t = anguloTipo(alpha);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Apoya un lado en la línea de 0° y lee la escala por el otro lado: empieza a contar desde el 0 que tiene tu lado."}
      onReset={() => setAlpha(init)}
      controls={<Slider label="Abertura del ángulo" value={alpha} min={1} max={179} unit="°" color={MANIM.blue} onChange={setAlpha} />}
    >
      <Readout>
        <span className="text-2xl font-bold tabular-nums" style={{ color: MANIM.yellow }}>
          Lectura: {alpha}°
        </span>
        <span className="text-lg" style={{ color: t.color }}>
          ángulo {t.name}
        </span>
      </Readout>
      <Svg h={285} testId="tool-transportador">
        <path d={`M ${C[0] - R} ${C[1]} A ${R} ${R} 0 0 1 ${C[0] + R} ${C[1]} Z`} fill={MANIM.blue} fillOpacity={0.1} stroke={MANIM.blue} strokeWidth={2} />
        {Array.from({ length: 181 }, (_, d) => {
          const len = d % 10 === 0 ? 20 : d % 5 === 0 ? 14 : 8;
          const a = polar(C, R, d);
          const b = polar(C, R - len, d);
          return <line key={d} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={d === alpha ? MANIM.yellow : MANIM.ink} strokeWidth={d === alpha ? 3 : d % 10 === 0 ? 2 : 1} />;
        })}
        {Array.from({ length: 19 }, (_, i) => {
          const d = i * 10;
          const o = polar(C, R - 34, d);
          const inner = polar(C, R - 62, d);
          return (
            <g key={d} fontSize={13} textAnchor="middle" fontWeight={600}>
              <text x={o[0]} y={o[1] + 5} fill={MANIM.ink}>{d}</text>
              <text x={inner[0]} y={inner[1] + 5} fill={MANIM.muted}>{180 - d}</text>
            </g>
          );
        })}
        <Wedge c={C} r={70} a0={0} a1={alpha} color={MANIM.yellow} opacity={0.3} />
        <Seg a={C} b={polar(C, R + 12, 0)} width={3} />
        <Seg a={C} b={polar(C, R + 12, alpha)} color={MANIM.purple} width={4} />
        <Seg a={[C[0] - R - 20, C[1]]} b={[C[0] + R + 20, C[1]]} width={2.5} color={MANIM.ink} />
        <Dot p={C} color={MANIM.yellow} r={5} />
      </Svg>
    </Frame>
  );
}

/* ───────────── Triángulo: a + b + c = 180° ───────────── */

export function TrianguloExplorador({ block }: { block: ToolBlock }) {
  const init = { a: clamp(Math.round(block.params?.a ?? 50), 15, 150), b: clamp(Math.round(block.params?.b ?? 60), 15, 150) };
  const [ang, setAng] = useState(() => ({ a: init.a, b: Math.min(init.b, 165 - init.a) }));
  const { a, b } = ang;
  const c = 180 - a - b;
  const setA = (v: number) => setAng((s) => ({ a: v, b: Math.min(s.b, 165 - v) }));
  const setB = (v: number) => setAng((s) => ({ a: Math.min(s.a, 165 - v), b: v }));

  // Triángulo con base AB = 1 y ángulos a (en A) y b (en B); se escala para que quepa.
  const rad = (d: number) => (d * Math.PI) / 180;
  const ac = Math.sin(rad(b)) / Math.sin(rad(c));
  const cx = ac * Math.cos(rad(a));
  const cy = ac * Math.sin(rad(a));
  const minX = Math.min(0, cx);
  const maxX = Math.max(1, cx);
  const scale = Math.min(380 / (maxX - minX), 175 / cy);
  const ox = 260 - ((minX + maxX) / 2) * scale;
  const oy = 205;
  const A: Pt = [ox, oy];
  const B: Pt = [ox + scale, oy];
  const C: Pt = [ox + cx * scale, oy - cy * scale];
  const r = 34;

  const barX = 50;
  const barW = 420;
  const wa = (a / 180) * barW;
  const wb = (b / 180) * barW;
  const wc = (c / 180) * barW;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia los ángulos a y b: el tercero se ajusta solo, y los tres juntos siempre llenan un ángulo llano."}
      onReset={() => setAng({ a: init.a, b: Math.min(init.b, 165 - init.a) })}
      controls={
        <>
          <Slider label="Ángulo a" value={a} min={15} max={150} unit="°" color={MANIM.blue} onChange={setA} />
          <Slider label="Ángulo b" value={b} min={15} max={150} unit="°" color={MANIM.green} onChange={setB} />
        </>
      }
    >
      <Readout>
        <span className="text-xl font-bold tabular-nums">
          <span style={{ color: MANIM.blue }}>{a}°</span> + <span style={{ color: MANIM.green }}>{b}°</span> +{" "}
          <span style={{ color: MANIM.orange }}>{c}°</span> = 180°
        </span>
        <span className="text-base text-[color:var(--stage-ink,#fff)]">
          c = 180° − {a}° − {b}° = {c}°
        </span>
      </Readout>
      <Svg h={300} testId="tool-triangulo">
        <Wedge c={A} r={r} a0={0} a1={a} color={MANIM.blue} opacity={0.55} />
        <Wedge c={B} r={r} a0={180 - b} a1={180} color={MANIM.green} opacity={0.55} />
        <Wedge c={C} r={r} a0={angleOf(C, A)} a1={angleOf(C, B)} color={MANIM.orange} opacity={0.55} />
        <polygon points={[A, B, C].map((p) => p.join(",")).join(" ")} fill="none" stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
        <WedgeLabel c={A} r={r + 22} a0={0} a1={a} text="a" size={20} color={MANIM.blue} halo={MANIM.surface} />
        <WedgeLabel c={B} r={r + 22} a0={180 - b} a1={180} text="b" size={20} color={MANIM.green} halo={MANIM.surface} />
        <WedgeLabel c={C} r={r + 22} a0={angleOf(C, A)} a1={angleOf(C, B)} text="c" size={20} color={MANIM.orange} halo={MANIM.surface} />
        {/* los tres ángulos, uno junto a otro, forman un llano */}
        <rect x={barX} y={236} width={wa} height={26} fill={MANIM.blue} fillOpacity={0.8} className="anim-t" />
        <rect x={barX + wa} y={236} width={wb} height={26} fill={MANIM.green} fillOpacity={0.8} className="anim-t" />
        <rect x={barX + wa + wb} y={236} width={wc} height={26} fill={MANIM.orange} fillOpacity={0.8} className="anim-t" />
        <text x={barX + wa / 2} y={255} fill={MANIM.surface} fontSize={16} fontWeight={700} textAnchor="middle">a</text>
        <text x={barX + wa + wb / 2} y={255} fill={MANIM.surface} fontSize={16} fontWeight={700} textAnchor="middle">b</text>
        <text x={barX + wa + wb + wc / 2} y={255} fill={MANIM.surface} fontSize={16} fontWeight={700} textAnchor="middle">c</text>
        <text x={barX + barW / 2} y={290} fill={MANIM.yellow} fontSize={16} fontWeight={700} textAnchor="middle">
          juntos: 180° (ángulo llano)
        </text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Polígonos: (n − 2) · 180° ───────────── */

export function PoligonoExplorador({ block }: { block: ToolBlock }) {
  const init = clamp(Math.round(block.params?.n ?? 5), 3, 12);
  const [n, setN] = useState(init);
  const total = (n - 2) * 180;
  const each = total / n;
  const exact = (total * 10) % n === 0;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el número de lados: cada lado más añade un triángulo y 180° a la suma."}
      onReset={() => setN(init)}
      controls={<Slider label="Número de lados n" value={n} min={3} max={12} color={MANIM.orange} onChange={setN} />}
    >
      <Readout>
        <MathRenderer text={`$(${n} - 2) \\cdot 180^\\circ = ${total}^\\circ$`} className="text-3xl" />
        <span className="text-lg font-semibold" style={{ color: MANIM.green }}>
          {n - 2} {n - 2 === 1 ? "triángulo" : "triángulos"}
        </span>
      </Readout>
      <svg viewBox="0 0 400 320" className="mx-auto block h-64 w-auto max-w-full" aria-hidden focusable="false" data-testid="tool-poligono">
        <TriangulatedPolygon n={n} c={[200, 165]} r={135} />
      </svg>
      <p className="text-base text-[color:var(--stage-ink,#fff)]">
        Si es regular, cada ángulo mide {total}° : {n} {exact ? "=" : "≈"} {decEs(each, 1)}°.
      </p>
    </Frame>
  );
}
