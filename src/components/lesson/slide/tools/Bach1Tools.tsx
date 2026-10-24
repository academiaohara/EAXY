"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import {
  add, argDeg, binomText, conj, degText, div, fromPolar, modulus, mul, sub, wrapDeg, type Cx,
} from "@/components/lesson/anim/complex";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { NumberLine, notation, type Interval } from "@/components/lesson/slide/tools/Eso4bTools";
import { Choice } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const f = (x: number) => String(x).replace("-", "−");
const ink = "text-[color:var(--stage-ink,#fff)]";
const sub10 = (n: number) => String(n).split("").map((d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)]).join("");

/* ───────────── Entornos ───────────── */

/** Entorno E(a, r): el intervalo abierto (a − r, a + r) y un número de prueba. */
export function EntornoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 5, -6, 6), r2: int(ini[1], 4, 1, 12), x2: int(ini[2], 14, -18, 18) };
  const [v, setV] = useState(init);
  const r = v.r2 / 2;
  const x = v.x2 / 2;
  const itv: Interval = { lo: v.a - r, loIncl: false, hi: v.a + r, hiIncl: false };
  const d = Math.abs(x - v.a);
  const dentro = d < r;
  return (
    <Frame
      hint={block.hint ?? "Mueve el número de prueba: pertenece al entorno cuando su distancia al centro es menor que el radio."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Centro a" value={v.a} min={-6} max={6} color={MANIM.blue} onChange={(a) => setV((p) => ({ ...p, a }))} format={f} />
          <Slider label="Radio r" value={r} min={0.5} max={6} step={0.5} color={MANIM.orange} onChange={(nr) => setV((p) => ({ ...p, r2: Math.round(nr * 2) }))} format={(n) => fmtEs(n, 1)} />
          <Slider label="Número de prueba x" value={x} min={-9} max={9} step={0.5} color={MANIM.yellow} onChange={(nx) => setV((p) => ({ ...p, x2: Math.round(nx * 2) }))} format={(n) => fmtEs(n, 1)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-ent-entorno">{`E(${f(v.a)}; ${fmtEs(r, 1)})`}</p>
        <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-ent-notacion">{`${notation(itv).replace(/(\d),/g, "$1;")}`.replace(/(\d)\.(\d)/g, "$1,$2")}</p>
        <p className="text-lg" data-testid="tool-ent-dist">{`|x − a| = |${fmtEs(x, 1)} − ${f(v.a)}| = ${fmtEs(d, 1)}   ${dentro ? "<" : "≥"}   r = ${fmtEs(r, 1)}`}</p>
        <p className="text-lg font-semibold" style={{ color: dentro ? MANIM.green : MANIM.red }} data-testid="tool-ent-x">
          {`x = ${fmtEs(x, 1)} ${dentro ? "pertenece" : "no pertenece"} al entorno`}
        </p>
      </div>
      <NumberLine sets={[{ i: itv, color: MANIM.blue, y: 26 }]} probe={x} testId="tool-ent-recta" />
    </Frame>
  );
}

/* ───────────── Plano complejo ───────────── */

const PW = 520;
const PH = 340;
const OX = PW / 2;
const OY = PH / 2;

type Vec = { z: Cx; color: string; label: string; dashed?: boolean };

function ComplexPlane({ vectors, u, testId }: { vectors: Vec[]; u: number; testId: string }) {
  const nx = Math.floor((PW / 2 - 10) / u);
  const ny = Math.floor((PH / 2 - 10) / u);
  const P = (z: Cx): [number, number] => [OX + z.x * u, OY - z.y * u];
  return (
    <Svg w={PW} h={PH} testId={testId}>
      {Array.from({ length: 2 * nx + 1 }, (_, i) => i - nx).map((t) => (
        <line key={`x${t}`} x1={OX + t * u} y1={OY - ny * u} x2={OX + t * u} y2={OY + ny * u} stroke={MANIM.grid} strokeWidth={t === 0 ? 0 : 1} opacity={0.6} />
      ))}
      {Array.from({ length: 2 * ny + 1 }, (_, i) => i - ny).map((t) => (
        <line key={`y${t}`} x1={OX - nx * u} y1={OY - t * u} x2={OX + nx * u} y2={OY - t * u} stroke={MANIM.grid} strokeWidth={t === 0 ? 0 : 1} opacity={0.6} />
      ))}
      <line x1={OX - nx * u - 6} y1={OY} x2={OX + nx * u + 6} y2={OY} stroke={MANIM.ink} strokeWidth={2} />
      <line x1={OX} y1={OY + ny * u + 6} x2={OX} y2={OY - ny * u - 6} stroke={MANIM.ink} strokeWidth={2} />
      <text x={OX + nx * u} y={OY + 18} fontSize={13} fill={MANIM.muted} textAnchor="end">Re</text>
      <text x={OX + 8} y={OY - ny * u + 10} fontSize={13} fill={MANIM.muted}>Im</text>
      {vectors.map((v, k) => {
        const [x, y] = P(v.z);
        const flip = v.z.x < 0;
        return (
          <g key={k}>
            <line x1={OX} y1={OY} x2={x} y2={y} stroke={v.color} strokeWidth={v.dashed ? 2.5 : 3.5} strokeDasharray={v.dashed ? "6 5" : undefined} strokeLinecap="round" />
            <circle cx={x} cy={y} r={5.5} fill={v.color} />
            <text x={x + (flip ? -9 : 9)} y={y - 8} fontSize={14} fontWeight={600} fill={v.color} textAnchor={flip ? "end" : "start"}>{v.label}</text>
          </g>
        );
      })}
    </Svg>
  );
}

const fit = (zs: Cx[], base = 4, min = 8) => clamp(150 / (Math.max(base, ...zs.map((z) => Math.max(Math.abs(z.x) * 0.62, Math.abs(z.y)))) + 0.8), min, 36);

const modTxt = (z: Cx) => {
  const sq = z.x * z.x + z.y * z.y;
  return Number.isInteger(sq) && !Number.isInteger(Math.sqrt(sq)) ? `√${sq} ≈ ${fmtEs(Math.sqrt(sq), 3)}` : fmtEs(modulus(z), 3);
};

/** Número complejo: parte real e imaginaria, conjugado, módulo y argumento. */
export function ComplejoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { x: int(ini[0], 3, -5, 5), y: int(ini[1], 2, -5, 5) };
  const [v, setV] = useState(init);
  const z: Cx = { x: v.x, y: v.y };
  const zc = conj(z);
  const cero = v.x === 0 && v.y === 0;
  return (
    <Frame
      hint={block.hint ?? "Mueve la parte real e imaginaria. Fíjate en que el conjugado es el simétrico respecto del eje real y que el módulo no cambia."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Parte real x" value={v.x} min={-5} max={5} color={MANIM.blue} onChange={(x) => setV((p) => ({ ...p, x }))} format={f} />
          <Slider label="Parte imaginaria y" value={v.y} min={-5} max={5} color={MANIM.orange} onChange={(y) => setV((p) => ({ ...p, y }))} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-2xl font-bold" style={{ color: MANIM.blue }} data-testid="tool-cx-binomica">{`z = ${binomText(z)}`}</p>
        <p className="text-lg" style={{ color: MANIM.orange }} data-testid="tool-cx-conjugado">{`conjugado: z̄ = ${binomText(zc)}`}</p>
        <p className="text-lg" data-testid="tool-cx-modulo">{`módulo: |z| = ${modTxt(z)}`}</p>
        <p className="text-lg" data-testid="tool-cx-argumento">{cero ? "argumento: no está definido para z = 0" : `argumento principal: ${degText(argDeg(z))}`}</p>
      </div>
      <ComplexPlane u={30} testId="tool-cx-plano" vectors={[{ z, color: MANIM.blue, label: "z" }, ...(v.y !== 0 ? [{ z: zc, color: MANIM.orange, label: "z̄", dashed: true }] : [])]} />
    </Frame>
  );
}

const OPS = [
  { value: 0, label: "z₁ + z₂" },
  { value: 1, label: "z₁ − z₂" },
  { value: 2, label: "z₁ · z₂" },
  { value: 3, label: "z₁ : z₂" },
] as const;

/** Suma, resta, producto y cociente de dos complejos en forma binómica, con su resultado en el plano. */
export function ComplejosOperacionesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 2, -5, 5), b: int(ini[1], 1, -5, 5), c: int(ini[2], 1, -5, 5), d: int(ini[3], -2, -5, 5), op: int(ini[4], 2, 0, 3) };
  const [v, setV] = useState(init);
  const z1: Cx = { x: v.a, y: v.b };
  const z2: Cx = { x: v.c, y: v.d };
  const res = v.op === 0 ? add(z1, z2) : v.op === 1 ? sub(z1, z2) : v.op === 2 ? mul(z1, z2) : div(z1, z2);
  const vectors: Vec[] = [
    { z: z1, color: MANIM.blue, label: "z₁" },
    { z: z2, color: MANIM.orange, label: "z₂" },
    ...(res ? [{ z: res, color: MANIM.green, label: "resultado" }] : []),
  ];
  return (
    <Frame
      hint={block.hint ?? "Prueba z₂ = i con el producto: multiplicar por i gira z₁ noventa grados. Con z₂ = 0 el cociente no existe."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Parte real de z₁" value={v.a} min={-5} max={5} color={MANIM.blue} onChange={(a) => setV((p) => ({ ...p, a }))} format={f} />
          <Slider label="Parte imaginaria de z₁" value={v.b} min={-5} max={5} color={MANIM.blue} onChange={(b) => setV((p) => ({ ...p, b }))} format={f} />
          <Slider label="Parte real de z₂" value={v.c} min={-5} max={5} color={MANIM.orange} onChange={(c) => setV((p) => ({ ...p, c }))} format={f} />
          <Slider label="Parte imaginaria de z₂" value={v.d} min={-5} max={5} color={MANIM.orange} onChange={(d) => setV((p) => ({ ...p, d }))} format={f} />
          <Choice label="Operación" items={OPS} value={v.op} onChange={(op) => setV((p) => ({ ...p, op }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg">{`z₁ = ${binomText(z1)}    z₂ = ${binomText(z2)}`}</p>
        {res ? (
          <>
            <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-co-resultado">{`${OPS[v.op]!.label} = ${binomText(res)}`}</p>
            <p className="text-lg" data-testid="tool-co-polar">{res.x === 0 && res.y === 0 ? "en polar: 0" : `en polar: módulo ${fmtEs(modulus(res), 3)} y argumento ${degText(argDeg(res))}`}</p>
          </>
        ) : (
          <p className="text-xl font-bold" style={{ color: MANIM.red }} data-testid="tool-co-resultado">No se puede dividir entre 0</p>
        )}
      </div>
      <ComplexPlane u={fit([z1, z2, ...(res ? [res] : [])], 5)} testId="tool-co-plano" vectors={vectors} />
    </Frame>
  );
}

/** Fórmula de Moivre: z = r_θ elevado a n (módulo^n, argumento n·θ). */
export function PotenciaComplejaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { r10: int(ini[0], 12, 5, 15), th: int(ini[1], 30, -180, 180), n: int(ini[2], 3, 1, 12) };
  const [v, setV] = useState(init);
  const r = v.r10 / 10;
  const z = fromPolar(r, v.th);
  const rn = Math.pow(r, v.n);
  const ang = wrapDeg(v.th * v.n);
  const zn = fromPolar(rn, ang);
  return (
    <Frame
      hint={block.hint ?? "Con módulo 1 la potencia se queda sobre la circunferencia unidad; con módulo mayor que 1, se aleja. Prueba 30° con n = 12 (lo mismo que 360° → vuelve a 1)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Módulo r" value={r} min={0.5} max={1.5} step={0.1} color={MANIM.blue} onChange={(nr) => setV((p) => ({ ...p, r10: Math.round(nr * 10) }))} format={(n) => fmtEs(n, 1)} />
          <Slider label="Argumento θ" value={v.th} min={-180} max={180} step={15} color={MANIM.orange} unit="°" onChange={(th) => setV((p) => ({ ...p, th }))} format={f} />
          <Slider label="Exponente n" value={v.n} min={1} max={12} color={MANIM.yellow} onChange={(n) => setV((p) => ({ ...p, n }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg">{`z = ${fmtEs(r, 1)}  con ángulo ${v.th}°`}</p>
        <p className="text-lg" data-testid="tool-mv-modulo">{`módulo de zⁿ: rⁿ = ${fmtEs(r, 1)}^${v.n} = ${fmtEs(rn, 3)}`}</p>
        <p className="text-lg" data-testid="tool-mv-arg">{`argumento de zⁿ: n·θ = ${v.n}·${v.th}° = ${v.n * v.th}°  →  ${ang}° (principal)`}</p>
        <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-mv-binomica">{`zⁿ = ${binomText(zn, 3)}`}</p>
      </div>
      <ComplexPlane u={fit([z, zn], 1.4, 1)} testId="tool-mv-plano" vectors={[{ z, color: MANIM.blue, label: "z" }, { z: zn, color: MANIM.green, label: "zⁿ" }]} />
    </Frame>
  );
}

/** Raíces n-ésimas de un complejo en forma polar. */
export function RaicesComplejasExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { r: int(ini[0], 8, 1, 64), th: int(ini[1], 0, -180, 180), n: int(ini[2], 3, 2, 8) };
  const [v, setV] = useState(init);
  const rho = Math.pow(v.r, 1 / v.n);
  const roots = Array.from({ length: v.n }, (_, k) => fromPolar(rho, (v.th + 360 * k) / v.n));
  const u = clamp(150 / rho, 6, 60);
  const P = (z: Cx): [number, number] => [OX + z.x * u, OY - z.y * u];
  const poly = roots.map((z) => P(z).join(",")).join(" ");
  return (
    <Frame
      hint={block.hint ?? "Sube el índice: siempre hay tantas raíces como indica n, y forman un polígono regular. Con r = 1 se ven las raíces de la unidad."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Módulo r del radicando" value={v.r} min={1} max={64} color={MANIM.blue} onChange={(r) => setV((p) => ({ ...p, r }))} />
          <Slider label="Argumento θ del radicando" value={v.th} min={-180} max={180} step={15} color={MANIM.orange} unit="°" onChange={(th) => setV((p) => ({ ...p, th }))} format={f} />
          <Slider label="Índice n de la raíz" value={v.n} min={2} max={8} color={MANIM.yellow} onChange={(n) => setV((p) => ({ ...p, n }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-rc-modulo">{`${v.n} raíces de módulo ${fmtEs(rho, 3)}, separadas ${fmtEs(360 / v.n, 1)}°`}</p>
        <p className="text-sm" data-testid="tool-rc-raices">{roots.map((z) => binomText(z)).join("   ·   ")}</p>
      </div>
      <Svg w={PW} h={PH} testId="tool-rc-plano">
        <line x1={10} y1={OY} x2={PW - 10} y2={OY} stroke={MANIM.ink} strokeWidth={2} />
        <line x1={OX} y1={PH - 10} x2={OX} y2={10} stroke={MANIM.ink} strokeWidth={2} />
        <circle cx={OX} cy={OY} r={rho * u} fill="none" stroke={MANIM.yellow} strokeWidth={2.5} strokeDasharray="7 6" />
        <polygon points={poly} fill={MANIM.green} fillOpacity={0.15} stroke={MANIM.green} strokeWidth={3} />
        {roots.map((z, k) => {
          const [x, y] = P(z);
          return (
            <g key={k}>
              <line x1={OX} y1={OY} x2={x} y2={y} stroke={MANIM.orange} strokeWidth={1.8} />
              <circle cx={x} cy={y} r={6} fill={MANIM.green} />
            </g>
          );
        })}
      </Svg>
    </Frame>
  );
}

/* ───────────── Logaritmos ───────────── */

const logB = (b: number, x: number) => Math.log(x) / Math.log(b);

/** Logaritmo en base b de N: exponente exacto o entre dos potencias consecutivas. */
export function LogaritmoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { b: int(ini[0], 2, 2, 10), n: int(ini[1], 8, 1, 1000) };
  const [v, setV] = useState(init);
  const lg = logB(v.b, v.n);
  const k = Math.floor(lg + 1e-9);
  const exact = Math.abs(Math.pow(v.b, Math.round(lg)) - v.n) < 1e-9;
  return (
    <Frame
      hint={block.hint ?? "Busca números que sean potencias exactas de la base: ahí el logaritmo es un entero. Los demás caen entre dos potencias consecutivas."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Base" value={v.b} min={2} max={10} color={MANIM.blue} onChange={(b) => setV((p) => ({ ...p, b }))} />
          <Slider label="Número N" value={v.n} min={1} max={1000} color={MANIM.orange} onChange={(n) => setV((p) => ({ ...p, n }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-lg-valor">{`log${sub10(v.b)} ${v.n} = ${exact ? fmtEs(Math.round(lg), 0) : `${fmtEs(lg, 4)}…`}`}</p>
        <p className="text-lg" data-testid="tool-lg-entre">
          {exact
            ? `Es exacto: ${v.b}^${fmtEs(Math.round(lg), 0)} = ${v.n}`
            : `Está entre ${v.b}^${k} = ${Math.pow(v.b, k)} y ${v.b}^${k + 1} = ${Math.pow(v.b, k + 1)}`}
        </p>
        <p className="text-lg" data-testid="tool-lg-comprobacion">{`Comprobación: ${v.b}^${fmtEs(lg, 4)} ≈ ${fmtEs(Math.pow(v.b, lg), 2)}`}</p>
        <p className="text-sm" style={{ color: MANIM.muted }}>{`Con la calculadora: log ${v.n} ÷ log ${v.b} (cambio de base).`}</p>
      </div>
    </Frame>
  );
}

/** Propiedades del logaritmo con números concretos: producto, cociente y potencia. */
export function LogPropiedadesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { b: int(ini[0], 10, 2, 10), x: int(ini[1], 8, 1, 100), y: int(ini[2], 5, 1, 100), n: int(ini[3], 3, 1, 5) };
  const [v, setV] = useState(init);
  const L = (t: number) => logB(v.b, t);
  const g = (t: number) => fmtEs(t, 4);
  const filas = [
    { id: "producto", izq: `log${sub10(v.b)}(${v.x}·${v.y})`, valIzq: L(v.x * v.y), der: `log ${v.x} + log ${v.y}`, valDer: L(v.x) + L(v.y) },
    { id: "cociente", izq: `log${sub10(v.b)}(${v.x}/${v.y})`, valIzq: L(v.x / v.y), der: `log ${v.x} − log ${v.y}`, valDer: L(v.x) - L(v.y) },
    { id: "potencia", izq: `log${sub10(v.b)}(${v.x}^${v.n})`, valIzq: L(Math.pow(v.x, v.n)), der: `${v.n}·log ${v.x}`, valDer: v.n * L(v.x) },
  ];
  return (
    <Frame
      hint={block.hint ?? "Cambia x, y y la base: los dos lados de cada igualdad siempre dan lo mismo. ¿Y log(x + y) frente a log x + log y? No coinciden."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Base" value={v.b} min={2} max={10} color={MANIM.yellow} onChange={(b) => setV((p) => ({ ...p, b }))} />
          <Slider label="x" value={v.x} min={1} max={100} color={MANIM.blue} onChange={(x) => setV((p) => ({ ...p, x }))} />
          <Slider label="y" value={v.y} min={1} max={100} color={MANIM.orange} onChange={(y) => setV((p) => ({ ...p, y }))} />
          <Slider label="Exponente n" value={v.n} min={1} max={5} color={MANIM.purple} onChange={(n) => setV((p) => ({ ...p, n }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-2 ${ink}`} data-testid="tool-readout">
        {filas.map((r) => (
          <p key={r.id} className="text-lg" data-testid={`tool-lp-${r.id}`}>
            {`${r.izq} = ${g(r.valIzq)}  =  ${r.der} = ${g(r.valDer)}`}
          </p>
        ))}
        <p className="text-lg" style={{ color: MANIM.red }} data-testid="tool-lp-suma">
          {`Pero log${sub10(v.b)}(${v.x} + ${v.y}) = ${g(L(v.x + v.y))}  ≠  log ${v.x} + log ${v.y} = ${g(L(v.x) + L(v.y))}`}
        </p>
      </div>
    </Frame>
  );
}
