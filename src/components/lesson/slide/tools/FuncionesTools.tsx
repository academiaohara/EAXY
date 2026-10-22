"use client";

import { useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { FUNCS, analyze, noria, tarifa } from "@/components/lesson/anim/fn";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const f = (x: number) => String(x).replace("-", "−");
const d2 = (x: number) => fmtEs(Math.round(x * 100) / 100, 2);
const W = 420;
const H = 260;
const PAD = 28;

/* ───────────── Explorador de una función ───────────── */

export function FuncionExplorador({ block }: { block: ToolBlock }) {
  const idx0 = int(block.params?.a, 0, 0, FUNCS.length - 1);
  const [idx, setIdx] = useState(idx0);
  const fn = FUNCS[idx]!;
  const [x, setX] = useState(fn.a);
  const an = useMemo(() => analyze(fn.f, fn.a, fn.b), [fn]);
  const xv = clamp(x, fn.a, fn.b);
  const yv = fn.f(xv);
  const span = an.ymax - an.ymin || 1;
  const px = (v: number) => PAD + ((v - fn.a) / (fn.b - fn.a)) * (W - 2 * PAD);
  const py = (v: number) => H - PAD - ((v - an.ymin) / span) * (H - 2 * PAD);
  const path = Array.from({ length: 161 }, (_, i) => fn.a + (i * (fn.b - fn.a)) / 160)
    .map((t, i) => `${i === 0 ? "M" : "L"} ${px(t).toFixed(1)} ${py(fn.f(t)).toFixed(1)}`)
    .join(" ");
  const tramo = an.tramos.find((t) => xv >= t.from && xv <= t.to) ?? an.tramos[0]!;
  const label = (n: number) => d2(n).replace(",", "{,}");
  const tramosTxt = an.tramos.map((t) => `${t.dir === "crece" ? "\\nearrow" : t.dir === "decrece" ? "\\searrow" : "\\rightarrow"}\\ (${label(t.from)},\\ ${label(t.to)})`).join("\\quad");
  const set = (i: number) => {
    setIdx(i);
    setX(FUNCS[i]!.a);
  };

  return (
    <Frame
      hint={block.hint ?? "Mueve x y mira la gráfica: el punto sube cuando la función crece y baja cuando decrece."}
      onReset={() => set(idx0)}
      controls={
        <>
          <div className="flex flex-wrap gap-2">
            {FUNCS.map((g, i) => (
              <button key={g.id} type="button" className={`${TOOL_BTN} ${i === idx ? "border-white bg-white/20" : ""}`} aria-pressed={i === idx} onClick={() => set(i)}>
                {`Función ${i + 1}`}
              </button>
            ))}
          </div>
          <Slider label={`Valor de ${fn.xVar}`} value={xv} min={fn.a} max={fn.b} step={0.1} color={MANIM.blue} onChange={setX} format={(v) => fmtEs(v, 1).replace("-", "−")} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${fn.tex}$`} className="text-xl" />
        <p className="text-lg font-semibold" style={{ color: MANIM.yellow }} data-testid="tool-fn-valor">
          {`${fn.xVar} = ${fmtEs(xv, 1)} → ${d2(yv)}`.replace(/-/g, "−")}
        </p>
        <MathRenderer text={`Dominio $[${label(fn.a)},\\ ${label(fn.b)}]$ · Recorrido $[${label(an.ymin)},\\ ${label(an.ymax)}]$`} className="text-base" />
        <p className="text-base" style={{ color: tramo.dir === "crece" ? MANIM.green : tramo.dir === "decrece" ? MANIM.red : MANIM.muted }} data-testid="tool-fn-tramo">
          {tramo.dir === "crece" ? "Aquí la función crece" : tramo.dir === "decrece" ? "Aquí la función decrece" : "Aquí la función es constante"}
        </p>
        <MathRenderer text={`$${tramosTxt}$`} className="text-sm" />
        {an.extremos.length > 0 ? (
          <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-fn-extremos">
            {an.extremos.map((e) => `${e.tipo === "max" ? "Máximo" : "Mínimo"} relativo en ${fn.xVar} = ${fmtEs(e.x, 2)} (valor ${fmtEs(e.y, 2)})`).join(" · ").replace(/-/g, "−")}
          </p>
        ) : (
          <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-fn-extremos">Sin máximos ni mínimos relativos</p>
        )}
      </div>
      <Svg w={W} h={H} testId="tool-fn">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke={MANIM.grid} strokeWidth={2} />
        <path d={path} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        {an.extremos.map((e) => (
          <circle key={e.x} cx={px(e.x)} cy={py(e.y)} r={5} fill="none" stroke={e.tipo === "max" ? MANIM.green : MANIM.red} strokeWidth={3} />
        ))}
        <line x1={px(xv)} y1={py(yv)} x2={px(xv)} y2={H - PAD} stroke={MANIM.muted} strokeDasharray="4 4" />
        <circle cx={px(xv)} cy={py(yv)} r={8} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} />
      </Svg>
    </Frame>
  );
}

/* ───────────── Función periódica: la noria ───────────── */

export function PeriodicaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { T: int(ini[0], 30, 10, 60), t: int(ini[1], 5, 0, 120) };
  const [v, setV] = useState(init);
  const T = v.T;
  const h = noria(v.t, T);
  const base = v.t % T;
  const TMAX = 120;
  const px = (t: number) => PAD + (t / TMAX) * (W - 2 * PAD);
  const py = (y: number) => H - PAD - (y / 40) * (H - 2 * PAD);
  const path = Array.from({ length: 241 }, (_, i) => i / 2).map((t, i) => `${i === 0 ? "M" : "L"} ${px(t).toFixed(1)} ${py(noria(t, T)).toFixed(1)}`).join(" ");
  const copies = Array.from({ length: Math.floor(TMAX / T) + 1 }, (_, k) => base + k * T).filter((t) => t <= TMAX);

  return (
    <Frame
      hint={block.hint ?? "Cambia el periodo y el instante: f(t) vale lo mismo que f(t + T), f(t + 2T)…"}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Periodo T" value={T} min={10} max={60} step={5} color={MANIM.orange} unit=" s" onChange={(T2) => setV((p) => ({ ...p, T: T2 }))} />
          <Slider label="Instante t" value={v.t} min={0} max={TMAX} color={MANIM.blue} unit=" s" onChange={(t) => setV((p) => ({ ...p, t }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <p className="text-lg font-semibold" style={{ color: MANIM.yellow }} data-testid="tool-periodo-valor">
          {`Altura en t = ${v.t} s: ${d2(h)} m`}
        </p>
        <p className="text-base" data-testid="tool-periodo-resto">
          {`${v.t} = ${Math.floor(v.t / T)}·${T} + ${base}: se comporta como en t = ${base} s`}
        </p>
      </div>
      <Svg w={W} h={H} testId="tool-periodica">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke={MANIM.grid} strokeWidth={2} />
        {Array.from({ length: Math.floor(TMAX / T) + 1 }, (_, k) => (
          <line key={k} x1={px(k * T)} y1={PAD - 6} x2={px(k * T)} y2={H - PAD} stroke={MANIM.grid} strokeDasharray="3 5" />
        ))}
        <path d={path} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        {copies.map((t) => (
          <circle key={t} cx={px(t)} cy={py(noria(t, T))} r={t === v.t ? 8 : 5} fill={t === v.t ? MANIM.yellow : MANIM.orange} />
        ))}
      </Svg>
    </Frame>
  );
}

/* ───────────── Tarifas de aparcamiento: continuidad ───────────── */

const MODELOS: { id: 1 | 2 | 3; nombre: string; tex: string; color: string }[] = [
  { id: 1, nombre: "Por horas empezadas", tex: "2\\,\\lceil t\\rceil", color: MANIM.red },
  { id: 2, nombre: "Exacta", tex: "2t", color: MANIM.green },
  { id: 3, nombre: "Entrada + exacta", tex: "2 + 1{,}6\\,t", color: MANIM.blue },
];

export function AparcamientoExplorador({ block }: { block: ToolBlock }) {
  const init = int(block.params?.a, 75, 0, 300);
  const [min, setMin] = useState(init);
  const horas = min / 60;
  const px = (t: number) => PAD + (t / 5) * (W - 2 * PAD);
  const py = (y: number) => H - PAD - (y / 12) * (H - 2 * PAD);
  const h = (m: number) => `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")} min`;

  return (
    <Frame
      hint={block.hint ?? "Mueve el tiempo: compara lo que cuesta cada tarifa y busca los saltos en la gráfica."}
      onReset={() => setMin(init)}
      controls={<Slider label="Tiempo aparcado" value={min} min={0} max={300} step={5} color={MANIM.yellow} format={h} onChange={setMin} />}
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        {MODELOS.map((m) => (
          <p key={m.id} className="text-base" style={{ color: m.color }} data-testid={`tool-aparcamiento-${m.id}`}>
            {`${m.nombre}: ${d2(tarifa(m.id, horas))} €`}
          </p>
        ))}
      </div>
      <Svg w={W} h={H} testId="tool-aparcamiento">
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke={MANIM.grid} strokeWidth={2} />
        <line x1={PAD} y1={H - PAD} x2={PAD} y2={PAD - 8} stroke={MANIM.grid} strokeWidth={2} />
        {[1, 2, 3, 4, 5].map((k) => (
          <text key={k} x={px(k)} y={H - 8} textAnchor="middle" fontSize={12} fill={MANIM.muted}>{k}</text>
        ))}
        {[1, 2, 3, 4, 5].map((k) => (
          <g key={k}>
            <line x1={px(k - 1)} y1={py(2 * k)} x2={px(k)} y2={py(2 * k)} stroke={MODELOS[0]!.color} strokeWidth={3.5} />
            <circle cx={px(k - 1)} cy={py(2 * k)} r={3.5} fill={k === 1 ? MANIM.surface : MANIM.surface} stroke={MODELOS[0]!.color} strokeWidth={2} />
            <circle cx={px(k)} cy={py(2 * k)} r={3.5} fill={MODELOS[0]!.color} />
          </g>
        ))}
        <line x1={px(0)} y1={py(0)} x2={px(5)} y2={py(10)} stroke={MODELOS[1]!.color} strokeWidth={3.5} />
        <line x1={px(0)} y1={py(2)} x2={px(5)} y2={py(10)} stroke={MODELOS[2]!.color} strokeWidth={3.5} />
        <line x1={px(horas)} y1={PAD - 8} x2={px(horas)} y2={H - PAD} stroke={MANIM.yellow} strokeDasharray="4 4" />
      </Svg>
    </Frame>
  );
}
