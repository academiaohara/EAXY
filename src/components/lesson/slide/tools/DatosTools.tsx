"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, PieSlices, SECTORES } from "@/components/lesson/anim/scenes/estadistica";
import { Chip } from "@/components/lesson/anim/scenes/probabilidad";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { decEs } from "@/components/lesson/anim/fraction";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) => Math.round(clamp(Number.isFinite(v) ? (v as number) : fallback, lo, hi));

function Value({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="text-xl font-bold tabular-nums" style={{ color }}>
      {children}
    </span>
  );
}

/* ───────────── Plano cartesiano ───────────── */

export function cuadrante(x: number, y: number): string {
  if (x === 0 && y === 0) {
    return "el origen";
  }
  if (x === 0) {
    return "el eje Y";
  }
  if (y === 0) {
    return "el eje X";
  }
  if (x > 0) {
    return y > 0 ? "el cuadrante I" : "el cuadrante IV";
  }
  return y > 0 ? "el cuadrante II" : "el cuadrante III";
}

export function PlanoExplorador({ block }: { block: ToolBlock }) {
  const init = { x: int(block.params?.a, 3, -6, 6), y: int(block.params?.b, 5, -6, 6), swap: false };
  const [p, setP] = useState(init);
  const u = 22;
  const ox = 260;
  const oy = 150;
  const px = p.swap ? p.y : p.x;
  const py = p.swap ? p.x : p.y;
  const P: Pt = [ox + px * u, oy - py * u];
  const lab = (x: number, y: number) => `(${x}, ${y})`.replace(/-/g, "−");

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve la abscisa y la ordenada. Después intercambia x e y: ¿es el mismo punto?"}
      onReset={() => setP(init)}
      controls={
        <>
          <Slider label="Abscisa x" value={p.x} min={-6} max={6} color={MANIM.blue} onChange={(x) => setP((s) => ({ ...s, x }))} />
          <Slider label="Ordenada y" value={p.y} min={-6} max={6} color={MANIM.green} onChange={(y) => setP((s) => ({ ...s, y }))} />
          <div className="sm:col-span-2">
            <button type="button" className={TOOL_BTN} aria-pressed={p.swap} onClick={() => setP((s) => ({ ...s, swap: !s.swap }))}>
              Intercambiar x e y
            </button>
          </div>
        </>
      }
    >
      <Readout>
        <Value color={MANIM.yellow}>P{lab(px, py)}</Value>
        <span className="text-lg text-[color:var(--stage-ink,#fff)]">Está en {cuadrante(px, py)}.</span>
      </Readout>
      <Svg h={310} testId="tool-plano">
        <Axes ox={ox} oy={oy} u={u} xmin={-6} xmax={6} ymin={-6} ymax={6} ticks={false} />
        <Seg a={[ox, P[1]]} b={P} color={MANIM.muted} width={2} dashed />
        <Seg a={[P[0], oy]} b={P} color={MANIM.muted} width={2} dashed />
        <Dot p={P} color={MANIM.yellow} r={8} />
        <text x={px < 0 ? P[0] - 12 : P[0] + 12} y={P[1] - 10} fill={MANIM.yellow} fontSize={17} fontWeight={700} textAnchor={px < 0 ? "end" : "start"}>{lab(px, py)}</text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Media, mediana y moda ───────────── */

export function estadisticos(datos: number[]) {
  const n = datos.length;
  const orden = [...datos].sort((a, b) => a - b);
  const media = datos.reduce((a, b) => a + b, 0) / n;
  const mediana = n % 2 === 1 ? orden[(n - 1) / 2]! : (orden[n / 2 - 1]! + orden[n / 2]!) / 2;
  const freq = new Map<number, number>();
  for (const d of datos) {
    freq.set(d, (freq.get(d) ?? 0) + 1);
  }
  const max = Math.max(...freq.values());
  const modas = [...freq.entries()].filter(([, f]) => f === max).map(([v]) => v).sort((a, b) => a - b);
  return { n, orden, media, mediana, modas, max };
}

export function DatosExplorador({ block }: { block: ToolBlock }) {
  const initial = [1, 3, 2, 0, 1, 3, 4, 2, 2];
  const [datos, setDatos] = useState(initial);
  const e = estadisticos(datos);
  const set = (i: number, d: number) => setDatos((s) => s.map((v, k) => (k === i ? clamp(v + d, 0, 10) : v)));
  const size = 44;
  const x0 = 260 - (e.n * (size + 6)) / 2;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia los datos con + y −. ¿Qué pasa con la media si un dato se hace muy grande? ¿Y con la mediana?"}
      onReset={() => setDatos(initial)}
      controls={
        <div className="flex flex-col gap-3 sm:col-span-2">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Datos">
            {datos.map((v, i) => (
              <div key={i} className="flex items-center gap-1 rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-1.5 py-1 text-sm text-[color:var(--stage-ink,#fff)]">
                <button type="button" aria-label={`Bajar dato ${i + 1}`} className="px-1.5 font-bold" onClick={() => set(i, -1)}>
                  −
                </button>
                <span className="w-5 text-center font-bold tabular-nums">{v}</span>
                <button type="button" aria-label={`Subir dato ${i + 1}`} className="px-1.5 font-bold" onClick={() => set(i, 1)}>
                  +
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={TOOL_BTN} disabled={datos.length >= 11} onClick={() => setDatos((s) => [...s, 5])}>
              Añadir un dato
            </button>
            <button type="button" className={TOOL_BTN} disabled={datos.length <= 3} onClick={() => setDatos((s) => s.slice(0, -1))}>
              Quitar un dato
            </button>
          </div>
        </div>
      }
    >
      <Readout>
        <Value color={MANIM.blue}>Media = {decEs(Math.round(e.media * 100) / 100, 2)}</Value>
        <Value color={MANIM.green}>Mediana = {decEs(e.mediana, 1)}</Value>
        <Value color={MANIM.yellow}>{e.max === 1 ? "Moda: no hay (todos aparecen una vez)" : `Moda = ${e.modas.join(" y ")}`}</Value>
      </Readout>
      <Svg h={130} testId="tool-datos">
        <g>
          {e.orden.map((v, i) => (
            <Chip key={i} x={x0 + i * (size + 6)} y={30} size={size} label={String(v)} tone={e.n % 2 === 1 ? (i === (e.n - 1) / 2 ? "hit" : "idle") : i === e.n / 2 - 1 || i === e.n / 2 ? "hit" : "idle"} />
          ))}
        </g>
        <text x={260} y={110} fill={MANIM.muted} fontSize={15} textAnchor="middle">datos ordenados: en amarillo, el valor central (o los dos centrales)</text>
      </Svg>
      <p className="text-base text-[color:var(--stage-ink,#fff)]">
        {e.n} datos · suma = {e.orden.reduce((a, b) => a + b, 0)}.
      </p>
    </Frame>
  );
}

/* ───────────── Diagrama de sectores ───────────── */

export function SectoresExplorador({ block }: { block: ToolBlock }) {
  const initial = SECTORES.map((s) => s.f);
  const [f, setF] = useState(initial);
  const total = f.reduce((a, b) => a + b, 0);
  const per = total > 0 ? 360 / total : 0;
  const data = SECTORES.map((s, i) => ({ ...s, f: f[i]! }));
  const fmt = (v: number) => decEs(Math.round(v * 10) / 10, 1);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia las frecuencias: ¿qué le pasa al ángulo de cada sector cuando aumenta el total de personas?"}
      onReset={() => setF(initial)}
      controls={
        <>
          {SECTORES.map((s, i) => (
            <Slider key={s.name} label={s.name} value={f[i]!} min={0} max={30} color={s.color} onChange={(v) => setF((p) => p.map((q, k) => (k === i ? v : q)))} />
          ))}
        </>
      }
    >
      <Readout>
        <Value color={MANIM.yellow}>N = {total} personas</Value>
        <Value color={MANIM.green}>{total > 0 ? `360° : ${total} = ${fmt(per)}° por persona` : "Sin datos"}</Value>
      </Readout>
      <Svg h={300} testId="tool-sectores">
        {total > 0 ? <PieSlices data={data} c={[170, 150]} r={125} /> : <circle cx={170} cy={150} r={125} fill="none" stroke={MANIM.grid} strokeWidth={3} />}
        {data.map((s, i) => (
          <g key={s.name}>
            <rect x={330} y={50 + i * 50} width={18} height={18} rx={4} fill={s.color} fillOpacity={0.6} />
            <text x={356} y={65 + i * 50} fill={MANIM.ink} fontSize={16} fontWeight={600}>
              {s.name}: {s.f} → {fmt(s.f * per)}°
            </text>
          </g>
        ))}
      </Svg>
      <p className="text-base text-[color:var(--stage-ink,#fff)]">Los ángulos suman {total > 0 ? "360" : "0"}°.</p>
    </Frame>
  );
}
