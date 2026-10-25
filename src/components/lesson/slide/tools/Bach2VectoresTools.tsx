"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { det, mat, qShow, rango } from "@/components/lesson/anim/matrices";
import { Arrow3D, Axes3D, Dot3D, Poly3D, stdProj } from "@/components/lesson/anim/space3d";
import { anguloGrados, cross, dot, mixto, norma, normaTxt, restaV, sumaV, vecTxt, type V3 } from "@/components/lesson/anim/vec3";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { MatrixEditor, gridFrom } from "@/components/lesson/slide/tools/matrix-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const sgn = (x: number) => String(x).replace("-", "−");
const dec = (x: number, d = 2) => x.toFixed(d).replace(".", ",").replace(/,?0+$/, "");
const rows3 = (m: number[][]) => m.map((r) => [r[0]!, r[1]!, r[2]!] as V3);

/** `initial`: [Ax, Ay, Az, Bx, By, Bz] (−4 a 4). */
export function VectoresPuntosExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { p: [0, 1, 2, 3, 4, 5].map((i) => int(ini[i], [1, 0, 1, 3, 2, 4][i]!, -4, 4)) };
  const [v, setV] = useState(init);
  const A = v.p.slice(0, 3) as V3;
  const B = v.p.slice(3) as V3;
  const AB = restaV(B, A);
  const M = sumaV(A, B).map((x) => x / 2) as V3;
  const proj = stdProj(28, 200, 190);
  const names = ["Ax", "Ay", "Az", "Bx", "By", "Bz"];
  return (
    <Frame
      hint={block.hint ?? "Las componentes de AB son «extremo menos origen». El punto medio es la media de las coordenadas."}
      onReset={() => setV(init)}
      controls={
        <>
          {names.map((n, i) => (
            <Slider key={n} label={n.replace("x", " (x)").replace("y", " (y)").replace("z", " (z)")} value={v.p[i]!} min={-4} max={4} color={i < 3 ? MANIM.blue : MANIM.green} format={sgn} onChange={(x) => setV((s) => ({ p: s.p.map((q, k) => (k === i ? x : q)) }))} />
          ))}
        </>
      }
    >
      <Svg w={400} h={300} maxH={260}>
        <Axes3D proj={proj} len={4} />
        <Arrow3D proj={proj} from={A} to={B} color={MANIM.yellow} width={4} />
        <Dot3D proj={proj} p={A} color={MANIM.blue} label="A" />
        <Dot3D proj={proj} p={B} color={MANIM.green} label="B" />
        <Dot3D proj={proj} p={M} color={MANIM.orange} label="M" r={4} />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Vector AB" plain><span data-testid="tool-vp-ab">{vecTxt(AB)}</span></Stat>
        <Stat color={MANIM.green} label="|AB|" plain><span data-testid="tool-vp-mod">{normaTxt(AB)}</span></Stat>
        <Stat color={MANIM.orange} label="Punto medio M" plain><span data-testid="tool-vp-medio">{`(${M.map((x) => sgn(Number(dec(x, 1).replace(",", ".")))).join(", ").replace(/\./g, ",")})`}</span></Stat>
      </Readout>
    </Frame>
  );
}

/** `initial`: 9 elementos: u, v y w por filas (−9 a 9). */
export function VectoresDependenciaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { M: gridFrom(ini, 0, 3, 3, [[1, 0, 1], [0, 1, 1], [1, 1, 0]]) };
  const [v, setV] = useState(init);
  const A = mat(v.M);
  const d = det(A);
  const r = rango(A);
  const [u, w2, z] = rows3(v.M);
  const proj = stdProj(26, 200, 190);
  return (
    <Frame
      hint={block.hint ?? "Tres vectores forman base de R³ si su determinante no es 0. Si vale 0 son coplanares: uno es combinación lineal de los otros."}
      onReset={() => setV(init)}
      controls={<MatrixEditor name="Filas u, v, w" m={v.M} rows={3} cols={3} onChange={(M2) => setV({ M: M2 })} />}
    >
      <Svg w={400} h={300} maxH={240}>
        <Axes3D proj={proj} len={4} floor={false} />
        {r === 2 ? <Poly3D proj={proj} pts={[[0, 0, 0], u!, sumaV(u!, w2!), w2!]} color={MANIM.red} fillOpacity={0.12} stroke={false} /> : null}
        <Arrow3D proj={proj} to={u!} color={MANIM.blue} label="u" />
        <Arrow3D proj={proj} to={w2!} color={MANIM.green} label="v" />
        <Arrow3D proj={proj} to={z!} color={MANIM.orange} label="w" />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Determinante" plain><span data-testid="tool-vd-det">{qShow(d)}</span></Stat>
        <Stat color={MANIM.blue} label="Rango" plain><span data-testid="tool-vd-rango">{String(r)}</span></Stat>
        <Stat color={r === 3 ? MANIM.green : MANIM.red} label="Los tres vectores" plain>
          <span data-testid="tool-vd-estado">{r === 3 ? "son independientes: forman una base" : "son dependientes (coplanares o alineados)"}</span>
        </Stat>
      </Readout>
    </Frame>
  );
}

/** `initial`: u (3 elementos) y v (3 elementos), entre −9 y 9. */
export function ProductoEscalar3dExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { M: gridFrom(ini, 0, 2, 3, [[1, 2, 2], [2, 0, -1]]) };
  const [v, setV] = useState(init);
  const [u, w] = rows3(v.M) as [V3, V3];
  const p = dot(u, w);
  const ang = anguloGrados(u, w);
  const mu = norma(u);
  const cd = (a: V3) => (norma(a) === 0 ? null : a.map((x) => x / norma(a)));
  const dirs = cd(u);
  return (
    <Frame
      hint={block.hint ?? "u·v = u₁v₁ + u₂v₂ + u₃v₃. Busca vectores perpendiculares (producto 0) y observa el signo del producto cuando el ángulo es agudo u obtuso."}
      onReset={() => setV(init)}
      controls={<MatrixEditor name="Filas u, v" m={v.M} rows={2} cols={3} onChange={(M2) => setV({ M: M2 })} />}
    >
      <Readout>
        <Stat color={MANIM.yellow} label="u · v" plain><span data-testid="tool-pe-dot">{sgn(p)}</span></Stat>
        <Stat color={MANIM.blue} label="|u|" plain><span data-testid="tool-pe-mu">{normaTxt(u)}</span></Stat>
        <Stat color={MANIM.green} label="|v|" plain><span data-testid="tool-pe-mv">{normaTxt(w)}</span></Stat>
      </Readout>
      <Readout>
        <Stat color={MANIM.orange} label="Ángulo entre u y v" plain><span data-testid="tool-pe-ang">{ang === null ? "no definido (vector nulo)" : `${dec(ang, 1)}°`}</span></Stat>
        <Stat color={MANIM.purple} label="Proyección de v sobre u" plain><span data-testid="tool-pe-proy">{mu === 0 ? "—" : dec(p / mu)}</span></Stat>
      </Readout>
      <p className="text-base" style={{ color: p === 0 ? MANIM.yellow : MANIM.ink }} data-testid="tool-pe-tipo">
        {p === 0 ? "u y v son perpendiculares (u·v = 0)." : p > 0 ? "Ángulo agudo: producto positivo." : "Ángulo obtuso: producto negativo."}
      </p>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-pe-cos">
        {dirs ? `Cosenos directores de u: (${dirs.map((x) => dec(x)).join("; ")}) — suman 1 al elevar al cuadrado.` : "u es el vector nulo."}
      </p>
    </Frame>
  );
}

/** `initial`: u y v (3 elementos cada uno). */
export function ProductoVectorialExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { M: gridFrom(ini, 0, 2, 3, [[3, 0, 0], [1, 3, 0]]) };
  const [v, setV] = useState(init);
  const [u, w] = rows3(v.M) as [V3, V3];
  const c = cross(u, w);
  const proj = stdProj(26, 200, 190);
  const m = Math.max(1, ...c.map(Math.abs));
  return (
    <Frame
      hint={block.hint ?? "u×v es perpendicular a u y a v; su módulo es el área del paralelogramo. Con u y v paralelos vale el vector nulo."}
      onReset={() => setV(init)}
      controls={<MatrixEditor name="Filas u, v" m={v.M} rows={2} cols={3} onChange={(M2) => setV({ M: M2 })} />}
    >
      <Svg w={400} h={300} maxH={240}>
        <Axes3D proj={proj} len={4} floor={false} />
        <Poly3D proj={proj} pts={[[0, 0, 0], u, sumaV(u, w), w]} color={MANIM.yellow} fillOpacity={0.2} />
        <Arrow3D proj={proj} to={u} color={MANIM.blue} label="u" />
        <Arrow3D proj={proj} to={w} color={MANIM.green} label="v" />
        <Arrow3D proj={proj} to={c.map((x) => (x / m) * 3.5) as V3} color={MANIM.red} label="u×v" />
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="u × v" plain><span data-testid="tool-pv-cross">{vecTxt(c)}</span></Stat>
        <Stat color={MANIM.yellow} label="Área del paralelogramo" plain><span data-testid="tool-pv-area">{normaTxt(c)}</span></Stat>
        <Stat color={MANIM.orange} label="Área del triángulo" plain><span data-testid="tool-pv-tri">{dec(norma(c) / 2)}</span></Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-pv-perp">
        {`(u×v)·u = ${dot(c, u)} y (u×v)·v = ${dot(c, w)}: perpendicular a los dos.`}
      </p>
    </Frame>
  );
}

/** `initial`: u, v y w por filas (9 elementos). */
export function ProductoMixtoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { M: gridFrom(ini, 0, 3, 3, [[3, 0, 0], [1, 3, 0], [1, 1, 3]]) };
  const [v, setV] = useState(init);
  const [u, w, z] = rows3(v.M) as [V3, V3, V3];
  const m = mixto(u, w, z);
  const proj = stdProj(24, 200, 200);
  const top = (p: V3) => sumaV(p, z);
  const base: V3[] = [[0, 0, 0], u, sumaV(u, w), w];
  return (
    <Frame
      hint={block.hint ?? "El producto mixto es el determinante de las tres filas. Su valor absoluto es el volumen del paralelepípedo; si vale 0, los tres vectores son coplanares."}
      onReset={() => setV(init)}
      controls={<MatrixEditor name="Filas u, v, w" m={v.M} rows={3} cols={3} onChange={(M2) => setV({ M: M2 })} />}
    >
      <Svg w={400} h={300} maxH={240}>
        <Axes3D proj={proj} len={4} floor={false} />
        <Poly3D proj={proj} pts={base} color={MANIM.yellow} fillOpacity={0.2} />
        <Poly3D proj={proj} pts={base.map(top)} color={MANIM.purple} fillOpacity={0.1} />
        <Arrow3D proj={proj} to={u} color={MANIM.blue} label="u" />
        <Arrow3D proj={proj} to={w} color={MANIM.green} label="v" />
        <Arrow3D proj={proj} to={z} color={MANIM.red} label="w" />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="[u, v, w]" plain><span data-testid="tool-pm-mixto">{sgn(m)}</span></Stat>
        <Stat color={MANIM.purple} label="Volumen del paralelepípedo" plain><span data-testid="tool-pm-vol">{String(Math.abs(m))}</span></Stat>
        <Stat color={MANIM.orange} label="Volumen del tetraedro" plain><span data-testid="tool-pm-tetra">{dec(Math.abs(m) / 6)}</span></Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-pm-estado">{m === 0 ? "Los tres vectores son coplanares: volumen 0." : "Los tres vectores no son coplanares."}</p>
    </Frame>
  );
}

