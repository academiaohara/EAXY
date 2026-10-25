"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Arrow3D, Axes3D, Dot3D, Poly3D, Seg3D, stdProj } from "@/components/lesson/anim/space3d";
import { normalPlano, planoTresPuntos, planoTxt, posPlanos, posRectaPlano, posRectas, posTresPlanos, puntoRecta, puntoTxt, rectaDeDosPlanos, type Plano } from "@/components/lesson/anim/geo3d";
import { qShow } from "@/components/lesson/anim/matrices";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { MatrixEditor, gridFrom } from "@/components/lesson/slide/tools/matrix-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import type { V3 } from "@/components/lesson/anim/vec3";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const sg = (x: number) => String(x).replace("-", "−");
const f3 = (m: number[][], i: number): V3 => [m[i]![0]!, m[i]![1]!, m[i]![2]!];
const eq = (p: number, d: number, v: string) => `${v} = ${p} ${d < 0 ? "−" : "+"} ${Math.abs(d)}t`;

/** `initial`: P (3) y v (3), entre −5 y 5, y el parámetro t (×1). */
export function RectaEspacioExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { M: gridFrom(ini, 0, 2, 3, [[1, 1, 0], [2, 1, 2]], -5, 5), t: int(ini[6], 1, -3, 3) };
  const [s, setS] = useState(init);
  const P = f3(s.M, 0);
  const v = f3(s.M, 1);
  const X = puntoRecta(P, v, s.t);
  const proj = stdProj(26, 200, 190);
  return (
    <Frame
      hint={block.hint ?? "Cambia el punto P, el vector director v y el parámetro t: el punto X = P + t·v recorre la recta."}
      onReset={() => setS(init)}
      controls={
        <>
          <MatrixEditor name="Filas P, v" m={s.M} rows={2} cols={3} min={-5} max={5} onChange={(M) => setS((p) => ({ ...p, M }))} />
          <Slider label="Parámetro t" value={s.t} min={-3} max={3} color={MANIM.orange} format={sg} onChange={(t) => setS((p) => ({ ...p, t }))} />
        </>
      }
    >
      <Svg w={400} h={300} maxH={250}>
        <Axes3D proj={proj} len={4} />
        <Seg3D proj={proj} a={puntoRecta(P, v, -3)} b={puntoRecta(P, v, 3)} color={MANIM.yellow} width={2} opacity={0.7} />
        <Arrow3D proj={proj} from={P} to={puntoRecta(P, v, 1)} color={MANIM.blue} width={3.5} />
        <Dot3D proj={proj} p={P} color={MANIM.blue} label="P" />
        <Dot3D proj={proj} p={X} color={MANIM.green} label="X" />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Ecuaciones paramétricas" plain>
          <span data-testid="tool-re-param">{`${eq(P[0], v[0], "x")}, ${eq(P[1], v[1], "y")}, ${eq(P[2], v[2], "z")}`.replace(/-/g, "−")}</span>
        </Stat>
        <Stat color={MANIM.green} label={`Punto con t = ${s.t}`} plain><span data-testid="tool-re-punto">{`(${X.map(sg).join(", ")})`}</span></Stat>
      </Readout>
    </Frame>
  );
}

/** `initial`: A, B y C (9 elementos, −5 a 5). */
export function PlanoEspacioExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { M: gridFrom(ini, 0, 3, 3, [[3, 0, 0], [0, 4, 0], [0, 0, 2]], -5, 5) };
  const [s, setS] = useState(init);
  const [A, B, C] = [f3(s.M, 0), f3(s.M, 1), f3(s.M, 2)];
  const p = planoTresPuntos(A, B, C);
  const proj = stdProj(26, 200, 190);
  const nulo = p[0] === 0 && p[1] === 0 && p[2] === 0;
  const n = normalPlano(p);
  const m = Math.max(1, ...n.map(Math.abs));
  return (
    <Frame
      hint={block.hint ?? "Con tres puntos no alineados se obtiene la normal con un producto vectorial y de ella la ecuación general. Alinea los puntos y el plano desaparece."}
      onReset={() => setS(init)}
      controls={<MatrixEditor name="Filas A, B, C" m={s.M} rows={3} cols={3} min={-5} max={5} onChange={(M) => setS({ M })} />}
    >
      <Svg w={400} h={300} maxH={250}>
        <Axes3D proj={proj} len={4} floor={false} />
        {!nulo ? <Poly3D proj={proj} pts={[A, B, C]} color={MANIM.yellow} fillOpacity={0.25} /> : null}
        {!nulo ? <Arrow3D proj={proj} from={A} to={[A[0] + (n[0] / m) * 2.5, A[1] + (n[1] / m) * 2.5, A[2] + (n[2] / m) * 2.5]} color={MANIM.red} label="n" /> : null}
        <Dot3D proj={proj} p={A} color={MANIM.blue} label="A" />
        <Dot3D proj={proj} p={B} color={MANIM.green} label="B" />
        <Dot3D proj={proj} p={C} color={MANIM.orange} label="C" />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Ecuación general" plain><span data-testid="tool-pe-eq">{nulo ? "los puntos están alineados" : planoTxt(p)}</span></Stat>
        <Stat color={MANIM.red} label="Vector normal" plain><span data-testid="tool-pe-normal">{nulo ? "—" : `(${n.map(sg).join(", ")})`}</span></Stat>
      </Readout>
    </Frame>
  );
}

/** `initial`: P, u, Q, v (4 filas de 3 elementos, −5 a 5). */
export function PosicionRectasExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { M: gridFrom(ini, 0, 4, 3, [[0, 0, 1], [1, 1, 0], [3, 0, 1], [-1, 1, 0]], -5, 5) };
  const [s, setS] = useState(init);
  const [P, u, Q, v] = [f3(s.M, 0), f3(s.M, 1), f3(s.M, 2), f3(s.M, 3)];
  const r = posRectas(P, u, Q, v);
  const proj = stdProj(22, 200, 190);
  const nombre = { secantes: "Secantes", paralelas: "Paralelas", cruzan: "Se cruzan", coincidentes: "Coincidentes" }[r.tipo];
  return (
    <Frame
      hint={block.hint ?? "Cambia los puntos y los vectores directores: los rangos de {u, v} y de {u, v, PQ} deciden la posición relativa."}
      onReset={() => setS(init)}
      controls={<MatrixEditor name="Filas P, u, Q, v" m={s.M} rows={4} cols={3} min={-5} max={5} onChange={(M) => setS({ M })} />}
    >
      <Svg w={400} h={300} maxH={240}>
        <Axes3D proj={proj} len={4} floor={false} />
        <Seg3D proj={proj} a={puntoRecta(P, u, -3)} b={puntoRecta(P, u, 3)} color={MANIM.blue} width={3} />
        <Seg3D proj={proj} a={puntoRecta(Q, v, -3)} b={puntoRecta(Q, v, 3)} color={MANIM.green} width={3} />
        {r.punto ? <Dot3D proj={proj} p={r.punto.map((x) => x.n / x.d) as V3} color={MANIM.yellow} label="corte" r={6} /> : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Posición" plain><span data-testid="tool-pr-tipo">{nombre}</span></Stat>
        <Stat color={MANIM.blue} label="rg{u, v}" plain><span data-testid="tool-pr-r1">{String(r.r1)}</span></Stat>
        <Stat color={MANIM.orange} label="rg{u, v, PQ}" plain><span data-testid="tool-pr-r2">{String(r.r2)}</span></Stat>
      </Readout>
      {r.punto ? <p className="text-base" data-testid="tool-pr-punto">{`Punto de corte: ${puntoTxt(r.punto)}`}</p> : null}
    </Frame>
  );
}

/** `initial`: P y v (2 filas) y el plano `A, B, C, D` (4 elementos). */
export function PosicionRectaPlanoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { M: gridFrom(ini, 0, 2, 3, [[1, 0, 0], [1, 1, 1]], -5, 5), pl: gridFrom(ini, 6, 1, 4, [[1, 1, 1, -4]], -9, 9) };
  const [s, setS] = useState(init);
  const P = f3(s.M, 0);
  const v = f3(s.M, 1);
  const pl = s.pl[0] as Plano;
  const r = posRectaPlano(P, v, pl);
  const nombre = { contenida: "La recta está contenida en el plano", paralela: "Recta y plano paralelos", secante: "Se cortan en un punto" }[r.tipo];
  return (
    <Frame
      hint={block.hint ?? "Sustituye la recta en el plano: si queda una ecuación en t con solución única, se cortan; si queda 0 = 0, la recta está contenida; si 0 = c, son paralelos."}
      onReset={() => setS(init)}
      controls={
        <>
          <MatrixEditor name="Filas P, v" m={s.M} rows={2} cols={3} min={-5} max={5} onChange={(M) => setS((p) => ({ ...p, M }))} />
          <MatrixEditor name="Plano A B C D" m={s.pl} rows={1} cols={4} min={-9} max={9} onChange={(m) => setS((p) => ({ ...p, pl: m }))} color={MANIM.orange} />
        </>
      }
    >
      <p className="text-base" data-testid="tool-rp-plano">{`Plano: ${planoTxt(pl)}`}</p>
      <p className="text-lg font-semibold" style={{ color: r.tipo === "secante" ? MANIM.green : r.tipo === "contenida" ? MANIM.yellow : MANIM.red }} data-testid="tool-rp-tipo">{nombre}</p>
      <p className="text-base" data-testid="tool-rp-detalle">
        {r.tipo === "secante" ? `n·v ≠ 0: t = ${qShow(r.t!)} y el punto de corte es ${puntoTxt(r.punto!)}.` : "n·v = 0: la dirección de la recta es paralela al plano."}
      </p>
    </Frame>
  );
}

/** `initial`: 12 elementos: tres planos `A, B, C, D` por filas. */
export function PosicionPlanosExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { M: gridFrom(ini, 0, 3, 4, [[1, 0, 0, -1], [0, 1, 0, -2], [0, 0, 1, -3]], -9, 9) };
  const [s, setS] = useState(init);
  const [a, b, c] = s.M as [Plano, Plano, Plano];
  const t = posTresPlanos(a, b, c);
  const rec = rectaDeDosPlanos(a, b);
  const pares = [posPlanos(a, b), posPlanos(a, c), posPlanos(b, c)];
  const nombres = { coincidentes: "coincidentes", paralelos: "paralelos", secantes: "secantes" };
  return (
    <Frame
      hint={block.hint ?? "Compara rg(M) y rg(M*) del sistema de los tres planos. Prueba a hacer paralelos o coincidentes a dos de ellos."}
      onReset={() => setS(init)}
      controls={<MatrixEditor name="Planos A B C D" m={s.M} rows={3} cols={4} min={-9} max={9} onChange={(M) => setS({ M })} />}
    >
      <div className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-pp-ecs">
        {s.M.map((p, i) => <div key={i}>{`π${i + 1}: ${planoTxt(p as Plano)}`}</div>)}
      </div>
      <Readout>
        <Stat color={MANIM.blue} label="rg(M)" plain><span data-testid="tool-pp-rA">{String(t.an.rA)}</span></Stat>
        <Stat color={MANIM.orange} label="rg(M*)" plain><span data-testid="tool-pp-rAmp">{String(t.an.rAmp)}</span></Stat>
      </Readout>
      <p className="text-lg font-semibold text-[color:var(--stage-ink,#fff)]" data-testid="tool-pp-caso">{t.texto}</p>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-pp-pares">
        {`π1 y π2: ${nombres[pares[0]!.tipo]}; π1 y π3: ${nombres[pares[1]!.tipo]}; π2 y π3: ${nombres[pares[2]!.tipo]}.`}
        {rec ? ` La recta π1 ∩ π2 tiene dirección (${rec.v.map(sg).join(", ")}).` : ""}
      </p>
    </Frame>
  );
}
