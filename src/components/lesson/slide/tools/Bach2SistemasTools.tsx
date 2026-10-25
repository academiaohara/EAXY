"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { analizarSistema, cramer, mat, qShow, type AnalisisSistema, type Mat } from "@/components/lesson/anim/matrices";
import { cellsOf, numCells } from "@/components/lesson/anim/matrix-svg";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { MatrixEditor, MatrixView, gridFrom } from "@/components/lesson/slide/tools/matrix-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const sgn = (x: number) => String(x).replace("-", "−");
const WRAP = "flex flex-wrap items-center justify-center gap-x-6 gap-y-3";
const NOMBRES = ["x", "y", "z"];

const TIPO_TXT: Record<AnalisisSistema["tipo"], string> = {
  determinado: "Compatible determinado (una solución)",
  indeterminado: "Compatible indeterminado (infinitas soluciones)",
  incompatible: "Incompatible (sin solución)",
};
const TIPO_COLOR: Record<AnalisisSistema["tipo"], string> = { determinado: MANIM.green, indeterminado: MANIM.yellow, incompatible: MANIM.red };

/** Ecuación `ax + by + cz = d` en texto plano. */
function ecuacion(r: number[]): string {
  let out = "";
  for (let j = 0; j < 3; j++) {
    const c = r[j]!;
    if (c === 0) continue;
    const abs = Math.abs(c) === 1 ? "" : String(Math.abs(c));
    out += out === "" ? `${c < 0 ? "−" : ""}${abs}${NOMBRES[j]}` : ` ${c < 0 ? "−" : "+"} ${abs}${NOMBRES[j]}`;
  }
  return `${out || "0"} = ${sgn(r[3]!)}`;
}

function Resultado({ an, testPrefix }: { an: AnalisisSistema; testPrefix: string }) {
  return (
    <>
      <Readout>
        <Stat color={MANIM.blue} label="rg(A)" plain><span data-testid={`${testPrefix}-rA`}>{String(an.rA)}</span></Stat>
        <Stat color={MANIM.orange} label="rg(A*)" plain><span data-testid={`${testPrefix}-rAmp`}>{String(an.rAmp)}</span></Stat>
        <Stat color={TIPO_COLOR[an.tipo]} label="Tipo de sistema" plain><span data-testid={`${testPrefix}-tipo`}>{TIPO_TXT[an.tipo]}</span></Stat>
      </Readout>
      {an.solucion ? (
        <p className="text-lg font-semibold text-[color:var(--stage-ink,#fff)]" data-testid={`${testPrefix}-solucion`}>
          {an.solucion.map((v, j) => `${NOMBRES[j]} = ${qShow(v)}`).join(",  ")}
        </p>
      ) : an.general ? (
        <p className="text-lg font-semibold text-[color:var(--stage-ink,#fff)]" data-testid={`${testPrefix}-general`}>
          {an.general.join(",  ")}
        </p>
      ) : (
        <p className="text-base" style={{ color: MANIM.red }} data-testid={`${testPrefix}-sin`}>
          El rango de A* es mayor que el de A: una ecuación contradice a las demás.
        </p>
      )}
    </>
  );
}

/** `initial`: 12 elementos `[a, b, c, d]` por ecuación (3 ecuaciones); el 13.º es 1 si el sistema es homogéneo. */
export function SistemaRoucheExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const flat = [0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => ini[i * 4 + j]));
  const init = {
    A: gridFrom(flat, 0, 3, 3, [[1, 1, 1], [2, -1, 1], [1, 2, -3]], -99, 99),
    B: gridFrom([ini[3], ini[7], ini[11]], 0, 3, 1, [[3], [2], [0]], -9999, 9999),
    hom: int(ini[12], 0, 0, 1),
  };
  const [v, setV] = useState(init);
  const B = v.hom === 1 ? [[0], [0], [0]] : v.B;
  const an = analizarSistema(mat(v.A), mat(B));
  const eqs = v.A.map((r, i) => ecuacion([...r, B[i]![0]!]));
  return (
    <Frame
      hint={block.hint ?? "Cambia coeficientes y términos independientes. Compara rg(A) y rg(A*) con n = 3: el teorema de Rouché–Frobenius decide el tipo de sistema."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice
            label="Términos independientes"
            value={v.hom}
            onChange={(hom) => setV((p) => ({ ...p, hom }))}
            items={[
              { value: 0, label: "B libre" },
              { value: 1, label: "Homogéneo (B = 0)" },
            ]}
          />
          <MatrixEditor name="A" m={v.A} rows={3} cols={3} min={-99} max={99} onChange={(A2) => setV((p) => ({ ...p, A: A2 }))} color={MANIM.blue} />
          {v.hom === 0 ? <MatrixEditor name="B" m={v.B} rows={3} cols={1} min={-9999} max={9999} onChange={(B2) => setV((p) => ({ ...p, B: B2 }))} color={MANIM.orange} /> : null}
        </>
      }
    >
      <div className={WRAP}>
        <div className="flex flex-col gap-0.5 text-base text-[color:var(--stage-ink,#fff)]" data-testid="tool-sr-ecuaciones">
          {eqs.map((e, i) => <span key={i}>{e}</span>)}
        </div>
        <MatrixView cells={[...cellsOf(mat(v.A))].map((r, i) => [...r, sgn(B[i]![0]!)])} label="A* =" split={3} tint={(_, j) => (j === 3 ? MANIM.orange : MANIM.blue)} />
      </div>
      <Resultado an={an} testPrefix="tool-sr" />
    </Frame>
  );
}

/** `initial`: [tamaño (2 o 3)], 9 elementos de A por filas y 3 términos independientes. */
export function CramerExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = {
    n: int(ini[0], 3, 2, 3),
    A: gridFrom(ini, 1, 3, 3, [[2, 3, -1], [3, -1, 5], [1, 2, 4]]),
    B: gridFrom(ini, 10, 3, 1, [[-2], [22], [12]], -999, 999),
  };
  const [v, setV] = useState(init);
  const n = v.n;
  const A: Mat = mat(v.A.slice(0, n).map((r) => r.slice(0, n)));
  const B: Mat = mat(v.B.slice(0, n));
  const c = cramer(A, B);
  return (
    <Frame
      hint={block.hint ?? "Cada incógnita es el cociente de dos determinantes: el de A con su columna sustituida por B, entre |A|. Si |A| = 0 la regla de Cramer no se puede aplicar."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Tamaño" value={v.n} onChange={(k) => setV((p) => ({ ...p, n: k }))} items={[{ value: 2, label: "2 × 2" }, { value: 3, label: "3 × 3" }]} />
          <MatrixEditor name="A" m={v.A} rows={n} cols={n} onChange={(A2) => setV((p) => ({ ...p, A: p.A.map((r, a) => r.map((x, b) => A2[a]?.[b] ?? x)) }))} color={MANIM.blue} />
          <MatrixEditor name="B" m={v.B} rows={n} cols={1} min={-999} max={999} onChange={(B2) => setV((p) => ({ ...p, B: p.B.map((r, a) => (B2[a] ? B2[a]! : r)) }))} color={MANIM.orange} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="|A|" plain><span data-testid="tool-cr-det">{qShow(c.detA)}</span></Stat>
        {c.dets.map((d, j) => (
          <Stat key={j} color={MANIM.green} label={`|A${NOMBRES[j]}|`} plain>
            <span data-testid={`tool-cr-d${NOMBRES[j]}`}>{qShow(d)}</span>
          </Stat>
        ))}
      </Readout>
      {c.solucion ? (
        <p className="text-lg font-semibold text-[color:var(--stage-ink,#fff)]" data-testid="tool-cr-solucion">
          {c.solucion.map((s, j) => `${NOMBRES[j]} = ${qShow(c.dets[j]!)} / ${qShow(c.detA)} = ${qShow(s)}`).join(",  ")}
        </p>
      ) : (
        <p className="text-base" style={{ color: MANIM.red }} data-testid="tool-cr-nosistema">
          |A| = 0: no es un sistema de Cramer. Hay que discutirlo con Rouché–Frobenius (puede ser incompatible o indeterminado).
        </p>
      )}
    </Frame>
  );
}

type Familia = { nombre: string; matriz: (a: number) => number[][]; b: (a: number) => number[]; det: string; especiales: string };
const FAMILIAS: Familia[] = [
  { nombre: "x+y+z = 1, 2x+3y+az = 3, x+ay+3z = 3", matriz: (a) => [[1, 1, 1], [2, 3, a], [1, a, 3]], b: () => [1, 3, 3], det: "−a(a − 3)", especiales: "a = 0 y a = 3" },
  { nombre: "ax+y+z = 1, x+ay+z = a, x+y+az = a²", matriz: (a) => [[a, 1, 1], [1, a, 1], [1, 1, a]], b: (a) => [1, a, a * a], det: "(a − 1)²(a + 2)", especiales: "a = 1 y a = −2" },
  { nombre: "Homogéneo: ax+y+z = 0, x+ay+z = 0, x+y+az = 0", matriz: (a) => [[a, 1, 1], [1, a, 1], [1, 1, a]], b: () => [0, 0, 0], det: "(a − 1)²(a + 2)", especiales: "a = 1 y a = −2" },
];

/** `initial`: [familia (0–2), a (−5 a 5)]. */
export function SistemaFamiliaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { f: int(ini[0], 0, 0, 2), a: int(ini[1], 1, -5, 5) };
  const [v, setV] = useState(init);
  const F = FAMILIAS[v.f]!;
  const A = F.matriz(v.a);
  const b = F.b(v.a);
  const an = analizarSistema(mat(A), mat(b.map((x) => [x])));
  const dt = cramer(mat(A), mat(b.map((x) => [x]))).detA;
  const X = (x: number) => 20 + ((x + 5) / 10) * 280;
  const curva = Array.from({ length: 101 }, (_, i) => {
    const x = -5 + i * 0.1;
    const [r0, r1, r2] = F.matriz(x) as [number[], number[], number[]];
    return { x, y: r0[0]! * (r1[1]! * r2[2]! - r1[2]! * r2[1]!) - r0[1]! * (r1[0]! * r2[2]! - r1[2]! * r2[0]!) + r0[2]! * (r1[0]! * r2[1]! - r1[1]! * r2[0]!) };
  });
  const clip = Math.min(60, Math.max(10, ...curva.map((p) => Math.abs(p.y))));
  const Y = (y: number) => 70 - (Math.max(-clip, Math.min(clip, y)) / clip) * 55;
  return (
    <Frame
      hint={block.hint ?? "Recorre el parámetro a: el sistema cambia de tipo justo en los valores donde el determinante vale 0 (los valores especiales)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Sistema" value={v.f} onChange={(f) => setV((p) => ({ ...p, f }))} items={FAMILIAS.map((x, i) => ({ value: i, label: `Sistema ${i + 1}` }))} />
          <Slider label="Parámetro a" value={v.a} min={-5} max={5} color={MANIM.orange} onChange={(a) => setV((p) => ({ ...p, a }))} format={sgn} />
        </>
      }
    >
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-sf-nombre">{F.nombre}. |A| = {F.det}; valores especiales: {F.especiales}.</p>
      <div className={WRAP}>
        <MatrixView cells={numCells(A).map((r, i) => [...r, sgn(b[i]!)])} label="A* =" split={3} tint={(_, j) => (j === 3 ? MANIM.orange : MANIM.blue)} />
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="|A|" plain><span data-testid="tool-sf-det">{qShow(dt)}</span></Stat>
      </Readout>
      <Resultado an={an} testPrefix="tool-sf" />
      <Svg w={320} h={140}>
        <line x1={20} y1={Y(0)} x2={300} y2={Y(0)} stroke={MANIM.grid} strokeWidth={1.5} />
        <polyline points={curva.map((p) => `${X(p.x)},${Y(p.y)}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={2.5} />
        <circle cx={X(v.a)} cy={Y(Number(dt.n) / Number(dt.d))} r={6} fill={MANIM.yellow} />
      </Svg>
    </Frame>
  );
}
