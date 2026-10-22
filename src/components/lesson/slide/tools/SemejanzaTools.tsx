"use client";

import { useState, type ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { fourth, ratios } from "@/components/lesson/anim/sem";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const num = (v: number, d = 2) => fmtEs(Math.round(v * 10 ** d) / 10 ** d, d);
const thou = (v: number) => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Longitud en cm con la unidad más cómoda. */
function fmtLen(cm: number): string {
  if (cm >= 100000) return `${num(cm / 100000)} km`;
  if (cm >= 100) return `${num(cm / 100)} m`;
  return `${num(cm)} cm`;
}

/* ───────────── Escala ───────────── */

const ESCALAS = [50, 100, 200, 500, 1000, 10000, 1500000, 20000000];

export function EscalaExplorador({ block }: { block: ToolBlock }) {
  const idx0 = Math.max(0, ESCALAS.indexOf(Number(block.params?.a ?? 10000)));
  const init = { i: idx0, d: int(block.params?.b, 2, 1, 30) };
  const [s, setS] = useState(init);
  const n = ESCALAS[s.i]!;
  const real = s.d * n;
  const r = ratios(n);

  return (
    <Frame
      hint={block.hint ?? "Elige la escala y la medida en el plano: la distancia real es esa medida multiplicada por el denominador."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Escala 1 : N" value={s.i} min={0} max={ESCALAS.length - 1} color={MANIM.orange} onChange={(i) => setS((p) => ({ ...p, i }))} format={(i) => `1 : ${thou(ESCALAS[i]!)}`} />
          <Slider label="Medida en el plano" value={s.d} min={1} max={30} color={MANIM.blue} unit=" cm" onChange={(d) => setS((p) => ({ ...p, d }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <p className="text-base" data-testid="tool-escala-1cm">{`1 cm del plano son ${fmtLen(n)} reales`}</p>
        <p className="text-xl font-semibold" style={{ color: MANIM.yellow }} data-testid="tool-escala-real">{`${s.d} cm del plano → ${fmtLen(real)} reales`}</p>
        <MathRenderer text={`$\\text{razón de áreas } = N^2 = ${thou(r.area)}$`} className="text-base" />
        <MathRenderer text={`$\\text{razón de volúmenes } = N^3 = ${thou(r.volume)}$`} className="text-base" />
        <p className="sr-only" data-testid="tool-escala-razones">{`${r.area} ${r.volume}`}</p>
      </div>
      <svg viewBox="0 0 420 60" className="w-full" aria-hidden>
        <rect x={10} y={24} width={Math.min(400, 12 * s.d)} height={12} fill={MANIM.blue} />
        <text x={10} y={18} fontSize={12} fill={MANIM.muted}>plano</text>
      </svg>
    </Frame>
  );
}

/* ───────────── Razón de longitudes, áreas y volúmenes ───────────── */

export function SemejanzaRazonExplorador({ block }: { block: ToolBlock }) {
  const init = { k2: int(block.params?.a, 4, 1, 8), L: int(block.params?.b, 2, 1, 5) };
  const [s, setS] = useState(init);
  const k = s.k2 / 2;
  const r = ratios(k);
  const side = s.L;
  const cell = 150 / Math.max(side * 4, side * k);
  const SQ = (v: number) => v * cell;

  return (
    <Frame
      hint={block.hint ?? "Cambia la razón k: las longitudes se multiplican por k, las áreas por k² y los volúmenes por k³."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Razón de semejanza k" value={k} min={0.5} max={4} step={0.5} color={MANIM.orange} onChange={(v) => setS((p) => ({ ...p, k2: Math.round(v * 2) }))} format={(v) => num(v, 1)} />
          <Slider label="Lado del cubo original" value={s.L} min={1} max={5} color={MANIM.blue} unit=" cm" onChange={(L) => setS((p) => ({ ...p, L }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <p className="text-base" data-testid="tool-razon-lado">{`Lado: ${s.L} cm → ${num(side * k, 1)} cm (× ${num(r.length, 1)})`}</p>
        <p className="text-base" style={{ color: MANIM.green }} data-testid="tool-razon-area">{`Área de una cara: ${num(side * side, 1)} cm² → ${num(side * side * r.area, 2)} cm² (× ${num(r.area, 2)})`}</p>
        <p className="text-base" style={{ color: MANIM.red }} data-testid="tool-razon-vol">{`Volumen: ${num(side ** 3, 1)} cm³ → ${num(side ** 3 * r.volume, 2)} cm³ (× ${num(r.volume, 3)})`}</p>
      </div>
      <svg viewBox="0 0 420 200" className="w-full" aria-hidden data-testid="tool-razon">
        <rect x={20} y={190 - SQ(side)} width={SQ(side)} height={SQ(side)} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={3} />
        <rect x={230} y={190 - SQ(side * k)} width={SQ(side * k)} height={SQ(side * k)} fill={MANIM.orange} fillOpacity={0.4} stroke={MANIM.orange} strokeWidth={3} />
        {Array.from({ length: Math.min(40, Math.floor(r.area)) }, (_, i) => i).map((i) => {
          const cols = Math.max(1, Math.round(k));
          return <rect key={i} x={230 + (i % cols) * SQ(side)} y={190 - SQ(side) - Math.floor(i / cols) * SQ(side)} width={SQ(side)} height={SQ(side)} fill="none" stroke={MANIM.ink} strokeOpacity={0.5} />;
        })}
      </svg>
    </Frame>
  );
}

/* ───────────── Triángulo en posición de Tales ───────────── */

export function TalesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { ab: int(ini[0], 12, 6, 20), ac: int(ini[1], 15, 6, 20), bc: int(ini[2], 18, 6, 20), ad: int(ini[3], 8, 1, 19) };
  const [s, setS] = useState(init);
  const ad = Math.min(s.ad, s.ab - 1);
  const f = ad / s.ab;
  const valid = s.ab + s.ac > s.bc && s.ab + s.bc > s.ac && s.ac + s.bc > s.ab;
  // vértices: A en el origen, B sobre el eje, C por la ley del coseno
  const cosA = (s.ab ** 2 + s.ac ** 2 - s.bc ** 2) / (2 * s.ab * s.ac);
  const sinA = Math.sqrt(Math.max(0, 1 - cosA * cosA));
  const sc = 200 / Math.max(s.ab, s.ac * Math.abs(cosA), s.ac);
  const P = (x: number, y: number) => `${30 + x * sc},${220 - y * sc}`;
  const B = [s.ab, 0] as const;
  const C = [s.ac * cosA, s.ac * sinA] as const;
  const D = [B[0] * f, 0] as const;
  const E = [C[0] * f, C[1] * f] as const;

  return (
    <Frame
      hint={block.hint ?? "DE es paralela a BC: los lados de ADE son proporcionales a los de ABC con razón AD/AB."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="AB" value={s.ab} min={6} max={20} color={MANIM.blue} onChange={(ab) => setS((p) => ({ ...p, ab }))} />
          <Slider label="AC" value={s.ac} min={6} max={20} color={MANIM.blue} onChange={(ac) => setS((p) => ({ ...p, ac }))} />
          <Slider label="BC" value={s.bc} min={6} max={20} color={MANIM.blue} onChange={(bc) => setS((p) => ({ ...p, bc }))} />
          <Slider label="AD" value={ad} min={1} max={s.ab - 1} color={MANIM.orange} onChange={(v) => setS((p) => ({ ...p, ad: v }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        {valid ? (
          <>
            <MathRenderer text={`$\\dfrac{AD}{AB} = \\dfrac{${ad}}{${s.ab}} = ${num(f, 3).replace(",", "{,}")}$`} className="text-lg" />
            <p className="text-base" style={{ color: MANIM.orange }} data-testid="tool-tales-lados">
              {`AE = ${num(fourth(s.ab, s.ac, ad))} · DE = ${num(fourth(s.ab, s.bc, ad))} · razón de áreas ${num(f * f, 3)}`}
            </p>
            <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-tales-razon">{`Los triángulos ADE y ABC están en posición de Tales: razón ${num(f, 3)}`}</p>
          </>
        ) : (
          <p className="text-base" style={{ color: MANIM.red }} data-testid="tool-tales-lados">Con esas medidas no se puede formar un triángulo</p>
        )}
      </div>
      {valid ? (
        <svg viewBox="0 0 420 240" className="w-full" aria-hidden data-testid="tool-tales">
          <polygon points={`${P(0, 0)} ${P(...B)} ${P(...C)}`} fill={MANIM.blue} fillOpacity={0.2} stroke={MANIM.blue} strokeWidth={3} strokeLinejoin="round" />
          <polygon points={`${P(0, 0)} ${P(...D)} ${P(...E)}`} fill={MANIM.orange} fillOpacity={0.4} stroke={MANIM.orange} strokeWidth={3} strokeLinejoin="round" />
        </svg>
      ) : null}
    </Frame>
  );
}

/* ───────────── Sombras y alturas ───────────── */

export function SombraExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { h10: int(ini[0], 16, 5, 30), s10: int(ini[1], 7, 3, 30), S: int(ini[2], 72, 10, 300) };
  const [v, setV] = useState(init);
  const h = v.h10 / 10;
  const sv = v.s10 / 10;
  const S = v.S / 10;
  const H = fourth(sv, h, S);
  const sc = 160 / Math.max(H, h, 1);
  const sx = 200 / Math.max(S, sv, 1);

  return (
    <Frame
      hint={block.hint ?? "En el mismo instante, altura y sombra son proporcionales: H / S = h / s."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Altura de la vara" value={h} min={0.5} max={3} step={0.1} color={MANIM.blue} unit=" m" onChange={(x) => setV((p) => ({ ...p, h10: Math.round(x * 10) }))} format={(x) => num(x, 1)} />
          <Slider label="Sombra de la vara" value={sv} min={0.3} max={3} step={0.1} color={MANIM.green} unit=" m" onChange={(x) => setV((p) => ({ ...p, s10: Math.round(x * 10) }))} format={(x) => num(x, 1)} />
          <Slider label="Sombra del árbol" value={S} min={1} max={30} step={0.1} color={MANIM.orange} unit=" m" onChange={(x) => setV((p) => ({ ...p, S: Math.round(x * 10) }))} format={(x) => num(x, 1)} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\dfrac{H}{${num(S, 1).replace(",", "{,}")}} = \\dfrac{${num(h, 1).replace(",", "{,}")}}{${num(sv, 1).replace(",", "{,}")}}$`} className="text-lg" />
        <p className="text-xl font-semibold" style={{ color: MANIM.yellow }} data-testid="tool-sombra-altura">{`Altura del árbol: ${num(H, 2)} m`}</p>
      </div>
      <svg viewBox="0 0 420 200" className="w-full" aria-hidden data-testid="tool-sombra">
        <line x1={10} y1={180} x2={410} y2={180} stroke={MANIM.grid} strokeWidth={2} />
        <polygon points={`210,180 210,${180 - H * sc} ${210 + S * sx},180`} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={3} />
        <polygon points={`30,180 30,${180 - h * sc} ${30 + sv * sx},180`} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={3} />
        <line x1={30} y1={180} x2={30} y2={180 - h * sc} stroke={MANIM.blue} strokeWidth={5} />
        <line x1={210} y1={180} x2={210} y2={180 - H * sc} stroke={MANIM.orange} strokeWidth={6} />
      </svg>
    </Frame>
  );
}

/* ───────────── Homotecia ───────────── */

const FIG: [number, number][] = [[1, 1], [2, 1], [2, 2], [1, 2.5]];
const R = 8;
const W = 320;
const px = (x: number) => 10 + ((x + R) / (2 * R)) * (W - 20);
const py = (y: number) => W - 10 - ((y + R) / (2 * R)) * (W - 20);

function Plane({ children }: { children: ReactNode }) {
  const ticks = Array.from({ length: 2 * R + 1 }, (_, i) => i - R);
  return (
    <Svg w={W} h={W} testId="tool-homo">
      <defs>
        <clipPath id="tool-homo-clip">
          <rect x={10} y={10} width={W - 20} height={W - 20} />
        </clipPath>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={px(t)} y1={10} x2={px(t)} y2={W - 10} stroke={MANIM.grid} strokeWidth={t === 0 ? 2.5 : 0.8} opacity={t === 0 ? 1 : 0.5} />
          <line x1={10} y1={py(t)} x2={W - 10} y2={py(t)} stroke={MANIM.grid} strokeWidth={t === 0 ? 2.5 : 0.8} opacity={t === 0 ? 1 : 0.5} />
        </g>
      ))}
      <g clipPath="url(#tool-homo-clip)">{children}</g>
    </Svg>
  );
}

export function HomoteciaExplorador({ block }: { block: ToolBlock }) {
  const init = int(block.params?.a, 4, -6, 6);
  const [k2, setK2] = useState(init === 0 ? 4 : init);
  const k = k2 / 2;
  const img = FIG.map(([x, y]) => [x * k, y * k] as const);
  const pts = (a: readonly (readonly number[])[]) => a.map(([x, y]) => `${px(x!)},${py(y!)}`).join(" ");
  const kind = k > 1 ? "ampliación" : k > 0 && k < 1 ? "reducción" : k === 1 ? "la misma figura" : "ampliación o reducción con giro de 180°";

  return (
    <Frame
      hint={block.hint ?? "El centro es O (el origen). Cada punto va a k veces su distancia a O; si k < 0, al otro lado."}
      onReset={() => setK2(init === 0 ? 4 : init)}
      controls={<Slider label="Razón de homotecia k" value={k} min={-3} max={3} step={0.5} color={MANIM.orange} onChange={(x) => setK2(Math.round(x * 2) === 0 ? 1 : Math.round(x * 2))} format={(x) => num(x, 1)} />}
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <p className="text-lg font-semibold" style={{ color: MANIM.yellow }} data-testid="tool-homo-razon">{`Razón ${num(k, 1)}: ${kind}`}</p>
        <p className="text-base" data-testid="tool-homo-medidas">{`Longitudes × ${num(Math.abs(k), 1)} · áreas × ${num(k * k, 2)} · lados paralelos a los originales`}</p>
      </div>
      <Plane>
        {[...img.map((p) => p)].map((p, i) => (
          <line key={i} x1={px(0)} y1={py(0)} x2={px(p[0])} y2={py(p[1])} stroke={MANIM.muted} strokeDasharray="4 4" strokeOpacity={0.6} />
        ))}
        <polygon points={pts(FIG)} fill={MANIM.blue} fillOpacity={0.4} stroke={MANIM.blue} strokeWidth={3} strokeLinejoin="round" />
        <polygon points={pts(img)} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={px(0)} cy={py(0)} r={6} fill={MANIM.yellow} />
      </Plane>
    </Frame>
  );
}
