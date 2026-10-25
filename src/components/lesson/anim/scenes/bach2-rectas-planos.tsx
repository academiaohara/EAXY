import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow3D, Axes3D, Dot3D, Poly3D, Seg3D, stdProj } from "@/components/lesson/anim/space3d";
import { planoTresPuntos, planoTxt, posRectas, puntoRecta } from "@/components/lesson/anim/geo3d";
import { restaV, sumaV, type V3 } from "@/components/lesson/anim/vec3";

const ci = (v: number | undefined, fb: number) => (Number.isFinite(v) ? Math.max(-5, Math.min(5, Math.round(v as number))) : fb);
const trip = (n: number[] | undefined, s: number, fb: V3): V3 => [0, 1, 2].map((i) => ci(n?.[s + i], fb[i]!)) as V3;

const tx = (v: V3) => `(${v.join(",\\ ")})`;

/** Recta en el espacio: punto, vector director y puntos `P + t·v`. `nums`: `[Px,Py,Pz,vx,vy,vz]`. */
export function buildRectaEspacio3d(params: { nums?: number[] }): AnimBuild {
  const P = trip(params.nums, 0, [1, 1, 0]);
  const v = trip(params.nums, 3, [2, 1, 2]);
  const proj = stdProj(32, 340, 280);
  const ext = (t: number) => puntoRecta(P, v, t);
  return {
    label: "Ecuación vectorial de una recta",
    captions: [
      `Una recta queda determinada por un **punto** $P = ${tx(P)}$ y un **vector director** $\\vec{v} = ${tx(v)}$ que marca su dirección.`,
      `Los puntos de la recta son $X = P + t\\,\\vec{v}$. Para $t = 1$ se llega a $${tx(ext(1))}$.`,
      `Para $t = 2$ se avanza dos veces el vector, y para $t = -1$ se retrocede: $${tx(ext(2))}$ y $${tx(ext(-1))}$.`,
      `Escrito por componentes, son las **ecuaciones paramétricas**: $x = ${P[0]} ${v[0] < 0 ? "-" : "+"} ${Math.abs(v[0])}t,\\ y = ${P[1]} ${v[1] < 0 ? "-" : "+"} ${Math.abs(v[1])}t,\\ z = ${P[2]} ${v[2] < 0 ? "-" : "+"} ${Math.abs(v[2])}t$.`,
    ],
    beatMs: 5200,
    render: (beat) => (
      <Canvas>
        <Axes3D proj={proj} len={5} />
        <Seg3D proj={proj} a={ext(-1.5)} b={ext(3)} color={MANIM.yellow} width={2} opacity={0.6} />
        <Arrow3D proj={proj} from={P} to={sumaV(P, v)} color={MANIM.blue} width={4.5} label="v" />
        <Dot3D proj={proj} p={P} label="P" />
        <Fade show={beat >= 1}>
          <Dot3D proj={proj} p={ext(1)} color={MANIM.green} label="t=1" r={4.5} />
        </Fade>
        <Fade show={beat >= 2}>
          <Dot3D proj={proj} p={ext(2)} color={MANIM.green} label="t=2" r={4.5} />
          <Dot3D proj={proj} p={ext(-1)} color={MANIM.orange} label="t=−1" r={4.5} />
        </Fade>
        <Fade show={beat === 3} dx={20}>
          <Txt x={640} y={90} size={22} color={MANIM.yellow} anchor="start">{`x = ${P[0]} ${v[0] < 0 ? "−" : "+"} ${Math.abs(v[0])}t`}</Txt>
          <Txt x={640} y={122} size={22} color={MANIM.yellow} anchor="start">{`y = ${P[1]} ${v[1] < 0 ? "−" : "+"} ${Math.abs(v[1])}t`}</Txt>
          <Txt x={640} y={154} size={22} color={MANIM.yellow} anchor="start">{`z = ${P[2]} ${v[2] < 0 ? "−" : "+"} ${Math.abs(v[2])}t`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Plano por tres puntos: dos vectores, normal y ecuación general. `nums`: `[Ax,Ay,Az,Bx,By,Bz,Cx,Cy,Cz]`. */
export function buildPlanoTresPuntos3d(params: { nums?: number[] }): AnimBuild {
  const A = trip(params.nums, 0, [3, 0, 0]);
  const B = trip(params.nums, 3, [0, 4, 0]);
  const C = trip(params.nums, 6, [0, 0, 2]);
  const p = planoTresPuntos(A, B, C);
  const proj = stdProj(32, 330, 290);
  const nrm = p.slice(0, 3) as V3;
  const m = Math.max(1, ...nrm.map(Math.abs));
  const AB = restaV(B, A);
  const AC = restaV(C, A);
  const D = sumaV(B, AC);
  return {
    label: "Plano por tres puntos",
    captions: [
      `Tres puntos no alineados determinan un plano: $A${tx(A)}$, $B${tx(B)}$ y $C${tx(C)}$.`,
      `Dos vectores del plano: $\\overrightarrow{AB} = ${tx(AB)}$ y $\\overrightarrow{AC} = ${tx(AC)}$. Son los vectores directores.`,
      `Su producto vectorial da un **vector normal** al plano: $\\vec{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC} = ${tx(nrm)}$.`,
      `Con la normal y un punto: $${planoTxt(p).replace("−", "-").replace("= 0", "= 0")}$. Es la **ecuación general** del plano.`,
    ],
    beatMs: 5400,
    render: (beat) => (
      <Canvas>
        <Axes3D proj={proj} len={5} floor={false} />
        <Poly3D proj={proj} pts={[A, B, D, C]} color={MANIM.yellow} fillOpacity={beat >= 1 ? 0.2 : 0.08} />
        <Poly3D proj={proj} pts={[A, B, C]} color={MANIM.purple} fillOpacity={0.15} />
        <Dot3D proj={proj} p={A} color={MANIM.blue} label="A" />
        <Dot3D proj={proj} p={B} color={MANIM.green} label="B" />
        <Dot3D proj={proj} p={C} color={MANIM.orange} label="C" />
        <Fade show={beat >= 1}>
          <Arrow3D proj={proj} from={A} to={B} color={MANIM.green} width={3} />
          <Arrow3D proj={proj} from={A} to={C} color={MANIM.orange} width={3} />
        </Fade>
        <Fade show={beat >= 2}>
          <Arrow3D proj={proj} from={A} to={sumaV(A, nrm.map((x) => (x / m) * 3) as V3)} color={MANIM.red} width={4.5} label="n" />
        </Fade>
        <Fade show={beat === 3} dx={20}>
          <Txt x={470} y={80} size={24} color={MANIM.yellow} anchor="start">{planoTxt(p)}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

const CASOS: { nombre: string; P: V3; u: V3; Q: V3; v: V3 }[] = [
  { nombre: "Secantes", P: [0, 0, 1], u: [1, 1, 0], Q: [3, 0, 1], v: [-1, 1, 0] },
  { nombre: "Paralelas", P: [0, 0, 0], u: [1, 1, 1], Q: [2, 0, 0], v: [1, 1, 1] },
  { nombre: "Se cruzan", P: [0, 0, 0], u: [1, 1, 0], Q: [0, 0, 2], v: [1, -1, 0] },
  { nombre: "Coincidentes", P: [0, 0, 0], u: [1, 1, 1], Q: [2, 2, 2], v: [-1, -1, -1] },
];

/** Las cuatro posiciones relativas de dos rectas, con los rangos de {u, v} y {u, v, PQ}. */
export function buildRectasPosiciones3d(): AnimBuild {
  const proj = stdProj(34, 330, 290);
  const info = CASOS.map((c) => posRectas(c.P, c.u, c.Q, c.v));
  const exp = [
    "**Secantes**: se cortan en un punto. $\\operatorname{rg}\\{\\vec{u}, \\vec{v}\\} = 2$ y $\\operatorname{rg}\\{\\vec{u}, \\vec{v}, \\overrightarrow{PQ}\\} = 2$ (los tres vectores son coplanares).",
    "**Paralelas**: misma dirección, sin puntos comunes. $\\operatorname{rg}\\{\\vec{u}, \\vec{v}\\} = 1$ y $\\operatorname{rg}\\{\\vec{u}, \\vec{v}, \\overrightarrow{PQ}\\} = 2$.",
    "**Se cruzan**: no son paralelas ni se cortan (no están en un mismo plano). $\\operatorname{rg}\\{\\vec{u}, \\vec{v}\\} = 2$ y $\\operatorname{rg}\\{\\vec{u}, \\vec{v}, \\overrightarrow{PQ}\\} = 3$.",
    "**Coincidentes**: es la misma recta. Los tres vectores son proporcionales: $\\operatorname{rg} = 1$ en los dos casos.",
  ];
  return {
    label: "Posiciones relativas de dos rectas",
    captions: exp,
    beatMs: 5600,
    render: (beat) => {
      const c = CASOS[beat]!;
      const i = info[beat]!;
      const color = [MANIM.green, MANIM.blue, MANIM.red, MANIM.yellow][beat]!;
      return (
        <Canvas>
          <Axes3D proj={proj} len={4} floor={false} />
          <Seg3D proj={proj} a={puntoRecta(c.P, c.u, -2.5)} b={puntoRecta(c.P, c.u, 3)} color={MANIM.blue} width={3.5} />
          <Seg3D proj={proj} a={puntoRecta(c.Q, c.v, -2.5)} b={puntoRecta(c.Q, c.v, 3)} color={MANIM.green} width={beat === 3 ? 2 : 3.5} dashed={beat === 3} />
          <Dot3D proj={proj} p={c.P} color={MANIM.blue} label="P" />
          <Dot3D proj={proj} p={c.Q} color={MANIM.green} label="Q" />
          {i.punto ? <Dot3D proj={proj} p={i.punto.map((x) => x.n / x.d) as V3} color={MANIM.yellow} label="corte" r={6} /> : null}
          <Txt x={610} y={86} size={26} color={color} anchor="start">{c.nombre}</Txt>
          <Txt x={610} y={120} size={20} color={MANIM.muted} anchor="start">{`rg{u, v} = ${i.r1}`}</Txt>
          <Txt x={610} y={148} size={20} color={MANIM.muted} anchor="start">{`rg{u, v, PQ} = ${i.r2}`}</Txt>
        </Canvas>
      );
    },
  };
}
