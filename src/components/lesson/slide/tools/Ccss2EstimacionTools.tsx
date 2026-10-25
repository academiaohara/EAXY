"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { densidadN, phi, tablaZ } from "@/components/lesson/anim/distrib1b";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);

type Zona = { a: number; b: number; color: string };
const W = 520;
const H = 190;

/** Curva normal con zonas sombreadas y marcas verticales (x̄ observada). */
function Bell({ mu, sd, zonas = [], marca, testId, fmt = 2 }: { mu: number; sd: number; zonas?: Zona[]; marca?: number; testId: string; fmt?: number }) {
  const lo = mu - 4 * sd;
  const hi = mu + 4 * sd;
  const peak = densidadN(mu, mu, sd);
  const px = (x: number) => 20 + ((x - lo) / (hi - lo)) * (W - 40);
  const py = (d: number) => H - 28 - (d / peak) * (H - 55);
  const xs = Array.from({ length: 121 }, (_, i) => lo + ((hi - lo) * i) / 120);
  const poli = (a: number, b: number) => {
    const aa = Math.max(a, lo);
    const bb = Math.min(b, hi);
    if (bb <= aa) return "";
    const p = Array.from({ length: 61 }, (_, i) => aa + ((bb - aa) * i) / 60);
    return `${px(aa)},${py(0)} ${p.map((x) => `${px(x)},${py(densidadN(x, mu, sd))}`).join(" ")} ${px(bb)},${py(0)}`;
  };
  return (
    <Svg w={W} h={H} testId={testId}>
      <line x1={10} y1={py(0)} x2={W - 10} y2={py(0)} stroke={MANIM.ink} strokeWidth={1.6} />
      {zonas.map((z, i) => <polygon key={i} points={poli(z.a, z.b)} fill={z.color} fillOpacity={0.45} />)}
      <polyline points={xs.map((x) => `${px(x)},${py(densidadN(x, mu, sd))}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3} />
      {[-3, -2, -1, 0, 1, 2, 3].map((k) => <text key={k} x={px(mu + k * sd)} y={H - 10} fontSize={11} fill={MANIM.muted} textAnchor="middle">{fmtEs(mu + k * sd, fmt)}</text>)}
      {marca !== undefined && marca >= lo && marca <= hi && (
        <g>
          <line x1={px(marca)} y1={py(0)} x2={px(marca)} y2={20} stroke={MANIM.yellow} strokeWidth={3} />
          <circle cx={px(marca)} cy={py(0)} r={6} fill={MANIM.yellow} />
        </g>
      )}
      {marca !== undefined && (marca < lo || marca > hi) && <text x={marca < lo ? 24 : W - 24} y={30} fontSize={13} fill={MANIM.yellow} textAnchor={marca < lo ? "start" : "end"}>{marca < lo ? "◀ x̄ fuera del dibujo" : "x̄ fuera del dibujo ▶"}</text>}
    </Svg>
  );
}

/** `initial`: [μ (0–200), σ (1–30), n (1–400), a (0–200), b (0–200)]. Distribución de la media muestral N(μ, σ/√n). */
export function MediaMuestralExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { mu: int(ini[0], 10, 0, 200), s: int(ini[1], 20, 1, 30), n: int(ini[2], 100, 1, 400), a: int(ini[3], 8, 0, 200), b: int(ini[4], 12, 0, 200) };
  const [v, setV] = useState(init);
  const sd = v.s / Math.sqrt(v.n);
  const [lo, hi] = v.a <= v.b ? [v.a, v.b] : [v.b, v.a];
  const za = (lo - v.mu) / sd;
  const zb = (hi - v.mu) / sd;
  const tabla = tablaZ(zb) - tablaZ(za);
  const exacta = phi(zb) - phi(za);
  return (
    <Frame
      hint={block.hint ?? "La media muestral de n datos tiene media μ y desviación típica σ/√n: cuanto mayor es n, más estrecha es su campana. Con μ = 10, σ = 20 y n = 100, P(8 < x̄ < 12) = 0,6826."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Media poblacional μ" value={v.mu} min={0} max={200} color={MANIM.blue} onChange={(mu) => setV((s) => ({ ...s, mu }))} />
          <Slider label="Desviación típica σ" value={v.s} min={1} max={30} color={MANIM.green} onChange={(s) => setV((q) => ({ ...q, s }))} />
          <Slider label="Tamaño de la muestra n" value={v.n} min={1} max={400} color={MANIM.orange} onChange={(n) => setV((s) => ({ ...s, n }))} />
          <Slider label="Extremo a" value={v.a} min={0} max={200} color={MANIM.yellow} onChange={(a) => setV((s) => ({ ...s, a }))} />
          <Slider label="Extremo b" value={v.b} min={0} max={200} color={MANIM.purple} onChange={(b) => setV((s) => ({ ...s, b }))} />
        </>
      }
    >
      <Bell mu={v.mu} sd={sd} zonas={[{ a: lo, b: hi, color: MANIM.yellow }]} testId="tool-mm-grafica" fmt={1} />
      <Readout>
        <Stat color={MANIM.blue} label="x̄ sigue N(μ, σ/√n)" plain><span data-testid="tool-mm-dist">{`N(${fmtEs(v.mu, 0)}; ${fmtEs(sd, 3)})`}</span></Stat>
        <Stat color={MANIM.yellow} label={`P(${lo} < x̄ < ${hi})  (tabla)`} plain><span data-testid="tool-mm-prob">{fmtEs(tabla, 4)}</span></Stat>
        <Stat color={MANIM.muted} label="valor exacto" plain><span data-testid="tool-mm-exacta">{fmtEs(exacta, 4)}</span></Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-mm-z">{`z = (${lo} − ${v.mu}) / ${fmtEs(sd, 3)} = ${fmtEs(za, 2)};  z = (${hi} − ${v.mu}) / ${fmtEs(sd, 3)} = ${fmtEs(zb, 2)}`}</p>
    </Frame>
  );
}

/** `initial`: [p % (1–99), n (10–400), a % (0–100), b % (0–100)]. Proporción muestral N(p, √(pq/n)). */
export function ProporcionMuestralExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { p: int(ini[0], 20, 1, 99), n: int(ini[1], 100, 10, 400), a: int(ini[2], 16, 0, 100), b: int(ini[3], 24, 0, 100) };
  const [v, setV] = useState(init);
  const p = v.p / 100;
  const sd = Math.sqrt((p * (1 - p)) / v.n);
  const [lo, hi] = v.a <= v.b ? [v.a, v.b] : [v.b, v.a];
  const za = (lo / 100 - p) / sd;
  const zb = (hi / 100 - p) / sd;
  const tabla = tablaZ(zb) - tablaZ(za);
  const valida = v.n * p >= 5 && v.n * (1 - p) >= 5;
  return (
    <Frame
      hint={block.hint ?? "Con n grande, la proporción muestral sigue N(p, √(p·q/n)). Con p = 20 % y n = 100, σ = 0,04 y P(16 % < p̂ < 24 %) = 0,6826."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Proporción poblacional p (%)" value={v.p} min={1} max={99} color={MANIM.blue} onChange={(pp) => setV((s) => ({ ...s, p: pp }))} />
          <Slider label="Tamaño de la muestra n" value={v.n} min={10} max={400} color={MANIM.orange} onChange={(n) => setV((s) => ({ ...s, n }))} />
          <Slider label="Extremo a (%)" value={v.a} min={0} max={100} color={MANIM.yellow} onChange={(a) => setV((s) => ({ ...s, a }))} />
          <Slider label="Extremo b (%)" value={v.b} min={0} max={100} color={MANIM.purple} onChange={(b) => setV((s) => ({ ...s, b }))} />
        </>
      }
    >
      <Bell mu={p} sd={sd} zonas={[{ a: lo / 100, b: hi / 100, color: MANIM.yellow }]} testId="tool-pm-grafica" fmt={3} />
      <Readout>
        <Stat color={MANIM.blue} label="p̂ sigue N(p, √(pq/n))" plain><span data-testid="tool-pm-dist">{`N(${fmtEs(p, 2)}; ${fmtEs(sd, 4)})`}</span></Stat>
        <Stat color={MANIM.yellow} label={`P(${lo} % < p̂ < ${hi} %)  (tabla)`} plain><span data-testid="tool-pm-prob">{fmtEs(tabla, 4)}</span></Stat>
        <Stat color={valida ? MANIM.green : MANIM.red} label="n·p ≥ 5 y n·q ≥ 5" plain><span data-testid="tool-pm-valida">{valida ? "sí, aproximación válida" : "no: la aproximación no es fiable"}</span></Stat>
      </Readout>
    </Frame>
  );
}

const NIVEL = [{ value: 0, label: "α = 10 %" }, { value: 1, label: "α = 5 %" }, { value: 2, label: "α = 1 %" }] as const;
const MODOS = [{ value: 0, label: "Bilateral (H₁: ≠)" }, { value: 1, label: "Unilateral izq. (H₁: <)" }, { value: 2, label: "Unilateral der. (H₁: >)" }] as const;
const ZB = [1.645, 1.96, 2.575];
const ZU = [1.282, 1.645, 2.326];

function zonaAceptacion(modo: number, nivel: number, mu0: number, sd: number) {
  if (modo === 0) { const z = ZB[nivel]!; return { a: mu0 - z * sd, b: mu0 + z * sd, z }; }
  if (modo === 1) { const z = ZU[nivel]!; return { a: mu0 - z * sd, b: Infinity, z }; }
  const z = ZU[nivel]!;
  return { a: -Infinity, b: mu0 + z * sd, z };
}

function ZonasContraste(modo: number, a: number, b: number, mu: number, sd: number): Zona[] {
  const l = mu - 5 * sd;
  const h = mu + 5 * sd;
  const A = Number.isFinite(a) ? a : l;
  const B = Number.isFinite(b) ? b : h;
  return [{ a: A, b: B, color: MANIM.green }, ...(Number.isFinite(a) ? [{ a: l, b: A, color: MANIM.red }] : []), ...(Number.isFinite(b) ? [{ a: B, b: h, color: MANIM.red }] : [])].filter((z) => modo >= 0 && z.b > z.a);
}

/** `initial`: [modo (0 bilateral, 1 unilateral <, 2 unilateral >), μ₀·10, σ·10, n, x̄·10, nivel (0 10 %, 1 5 %, 2 1 %)]. */
export function ContrasteMediaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { m: int(ini[0], 0, 0, 2), mu: int(ini[1], 20, 0, 200), s: int(ini[2], 4, 1, 100), n: int(ini[3], 100, 4, 400), x: int(ini[4], 18, 0, 200), z: int(ini[5], 1, 0, 2) };
  const [v, setV] = useState(init);
  const mu0 = v.mu / 10;
  const sd = v.s / 10 / Math.sqrt(v.n);
  const xbar = v.x / 10;
  const zona = zonaAceptacion(v.m, v.z, mu0, sd);
  const dentro = xbar >= zona.a - 1e-12 && xbar <= zona.b + 1e-12;
  const f = (x: number) => (Number.isFinite(x) ? fmtEs(x, 4) : x < 0 ? "−∞" : "+∞");
  return (
    <Frame
      hint={block.hint ?? "Si la media muestral cae en la zona de aceptación no se rechaza H₀; si cae en la zona crítica (rojo), se rechaza con el nivel de significación elegido."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Tipo de contraste" items={MODOS} value={v.m} onChange={(m) => setV((s) => ({ ...s, m }))} />
          <Choice label="Nivel de significación" items={NIVEL} value={v.z} onChange={(z) => setV((s) => ({ ...s, z }))} />
          <Slider label="Media supuesta μ₀" value={v.mu} min={0} max={200} color={MANIM.blue} format={(x) => fmtEs(x / 10, 1)} onChange={(mu) => setV((s) => ({ ...s, mu }))} />
          <Slider label="Desviación típica σ" value={v.s} min={1} max={100} color={MANIM.green} format={(x) => fmtEs(x / 10, 1)} onChange={(s) => setV((q) => ({ ...q, s }))} />
          <Slider label="Tamaño de la muestra n" value={v.n} min={4} max={400} color={MANIM.orange} onChange={(n) => setV((s) => ({ ...s, n }))} />
          <Slider label="Media muestral x̄" value={v.x} min={0} max={200} color={MANIM.yellow} format={(x) => fmtEs(x / 10, 1)} onChange={(x) => setV((s) => ({ ...s, x }))} />
        </>
      }
    >
      <Bell mu={mu0} sd={sd} zonas={ZonasContraste(v.m, zona.a, zona.b, mu0, sd)} marca={xbar} testId="tool-cm-grafica" fmt={3} />
      <Readout>
        <Stat color={MANIM.green} label="Zona de aceptación" plain><span data-testid="tool-cm-zona">{`(${f(zona.a)}; ${f(zona.b)})`}</span></Stat>
        <Stat color={dentro ? MANIM.green : MANIM.red} label={`x̄ = ${fmtEs(xbar, 2)}`} plain><span data-testid="tool-cm-decision">{dentro ? "no se rechaza H₀" : "se rechaza H₀"}</span></Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-cm-error">{`σ/√n = ${fmtEs(sd, 4)};  valor crítico z = ${fmtEs(zona.z, 3)}`}</p>
    </Frame>
  );
}

/** `initial`: [modo (0–2), p₀ % (1–99), n (10–1000), éxitos (0–n), nivel (0 10 %, 1 5 %, 2 1 %)]. */
export function ContrasteProporcionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const n0 = int(ini[2], 100, 10, 1000);
  const init = { m: int(ini[0], 0, 0, 2), p: int(ini[1], 50, 1, 99), n: n0, k: int(ini[3], 65, 0, n0), z: int(ini[4], 1, 0, 2) };
  const [v, setV] = useState(init);
  const p0 = v.p / 100;
  const sd = Math.sqrt((p0 * (1 - p0)) / v.n);
  const k = Math.min(v.k, v.n);
  const phat = k / v.n;
  const zona = zonaAceptacion(v.m, v.z, p0, sd);
  const dentro = phat >= zona.a - 1e-12 && phat <= zona.b + 1e-12;
  const f = (x: number) => (Number.isFinite(x) ? fmtEs(x, 4) : x < 0 ? "−∞" : "+∞");
  return (
    <Frame
      hint={block.hint ?? "Con H₀: p = 0,5, n = 100 y 65 caras, la proporción muestral 0,65 queda fuera de (0,402; 0,598): la moneda no parece equilibrada al 5 %."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Tipo de contraste" items={MODOS} value={v.m} onChange={(m) => setV((s) => ({ ...s, m }))} />
          <Choice label="Nivel de significación" items={NIVEL} value={v.z} onChange={(z) => setV((s) => ({ ...s, z }))} />
          <Slider label="Proporción supuesta p₀ (%)" value={v.p} min={1} max={99} color={MANIM.blue} onChange={(p) => setV((s) => ({ ...s, p }))} />
          <Slider label="Tamaño de la muestra n" value={v.n} min={10} max={1000} color={MANIM.orange} onChange={(nn) => setV((s) => ({ ...s, n: nn }))} />
          <Slider label="Éxitos observados" value={k} min={0} max={v.n} color={MANIM.yellow} onChange={(kk) => setV((s) => ({ ...s, k: kk }))} />
        </>
      }
    >
      <Bell mu={p0} sd={sd} zonas={ZonasContraste(v.m, zona.a, zona.b, p0, sd)} marca={phat} testId="tool-cp-grafica" fmt={3} />
      <Readout>
        <Stat color={MANIM.green} label="Zona de aceptación" plain><span data-testid="tool-cp-zona">{`(${f(zona.a)}; ${f(zona.b)})`}</span></Stat>
        <Stat color={dentro ? MANIM.green : MANIM.red} label={`p̂ = ${k}/${v.n} = ${fmtEs(phat, 4)}`} plain><span data-testid="tool-cp-decision">{dentro ? "no se rechaza H₀" : "se rechaza H₀"}</span></Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-cp-error">{`σ = √(p₀·q₀/n) = ${fmtEs(sd, 4)};  valor crítico z = ${fmtEs(zona.z, 3)}`}</p>
    </Frame>
  );
}
