import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow3D, Axes3D, Dot3D, Poly3D, Seg3D, stdProj } from "@/components/lesson/anim/space3d";
import { dist2PuntoPlano, dist2PuntoRecta, dist2Rectas, evaluaPlano, normalPlano, proyeccionPuntoPlano, proyeccionPuntoRecta, puntoRecta, raizRacional, simetrico, type Plano } from "@/components/lesson/anim/geo3d";
import { cross, mixto, norma, normaTxt, restaV, sumaV, type V3 } from "@/components/lesson/anim/vec3";

const ci = (v: number | undefined, fb: number) => (Number.isFinite(v) ? Math.max(-6, Math.min(6, Math.round(v as number))) : fb);
const trip = (n: number[] | undefined, s: number, fb: V3): V3 => [0, 1, 2].map((i) => ci(n?.[s + i], fb[i]!)) as V3;
const tx = (v: V3) => `(${v.join(",\\ ")})`;
const dec = (x: number) => x.toFixed(2).replace(".", "{,}");
const num = (x: { n: number; d: number }) => x.n / x.d;
const pt = (p: { n: number; d: number }[]): V3 => p.map(num) as V3;
const ptTex = (p: { n: number; d: number }[]) => `(${p.map((x) => (x.d === 1 ? String(x.n) : `${x.n}/${x.d}`)).join(",\\ ")})`;

/** Parche de plano alrededor de un punto: cuatro vértices en el plano. */
function parche(pl: Plano, c: V3, r = 2.4): V3[] {
  const n = normalPlano(pl);
  const eje: V3 = Math.abs(n[0]) <= Math.abs(n[1]) && Math.abs(n[0]) <= Math.abs(n[2]) ? [1, 0, 0] : Math.abs(n[1]) <= Math.abs(n[2]) ? [0, 1, 0] : [0, 0, 1];
  const u0 = cross(n, eje);
  const v0 = cross(n, u0);
  const u = u0.map((x) => (x / norma(u0)) * r) as V3;
  const v = v0.map((x) => (x / norma(v0)) * r) as V3;
  return [sumaV(sumaV(c, u), v), sumaV(restaV(c, u), v), restaV(restaV(c, u), v), restaV(sumaV(c, u), v)];
}

/** Distancia de un punto a un plano: pie de la perpendicular y simétrico. `nums`: `[Px,Py,Pz, A,B,C,D]`. */
export function buildProyeccionPuntoPlano3d(params: { nums?: number[] }): AnimBuild {
  const P = trip(params.nums, 0, [2, 1, 4]);
  const n = trip(params.nums, 3, [0, 0, 1]);
  const D = ci(params.nums?.[6], -1);
  const pl: Plano = [n[0], n[1], n[2], D];
  const F = proyeccionPuntoPlano(P, pl);
  const Fn = pt(F);
  const S = simetrico(P, F);
  const d2 = dist2PuntoPlano(P, pl);
  const proj = stdProj(32, 340, 290);
  const val = evaluaPlano(pl, P);
  return {
    label: "Proyección ortogonal de un punto sobre un plano",
    captions: [
      `Un punto $P${tx(P)}$ y un plano $\\pi$ de normal $\\vec{n} = ${tx(n)}$.`,
      "La **recta perpendicular** al plano por $P$ tiene la dirección de $\\vec{n}$: $X = P + t\\,\\vec{n}$.",
      `Esa recta corta al plano en el **pie** $F = ${ptTex(F)}$: es la **proyección ortogonal** de $P$ sobre $\\pi$.`,
      `La **distancia** es $|\\overrightarrow{PF}| = \\dfrac{|\\vec{n}\\cdot P + D|}{|\\vec{n}|} = \\dfrac{${Math.abs(val)}}{${normaTxt(n)}} = ${raizRacional(d2)} \\approx ${dec(Math.sqrt(d2.n / d2.d))}$. El **simétrico** es $P' = 2F - P = ${ptTex(S)}$.`,
    ],
    beatMs: 5600,
    render: (beat) => (
      <Canvas>
        <Axes3D proj={proj} len={5} floor={false} />
        <Poly3D proj={proj} pts={parche(pl, Fn)} color={MANIM.blue} fillOpacity={0.18} />
        <Dot3D proj={proj} p={P} color={MANIM.yellow} label="P" />
        <Fade show={beat >= 1}>
          <Seg3D proj={proj} a={puntoRecta(P, n, -2)} b={puntoRecta(P, n, 2)} color={MANIM.orange} dashed width={2.5} />
        </Fade>
        <Fade show={beat >= 2}>
          <Dot3D proj={proj} p={Fn} color={MANIM.green} label="F" />
        </Fade>
        <Fade show={beat >= 3}>
          <Seg3D proj={proj} a={P} b={Fn} color={MANIM.yellow} width={4} />
          <Dot3D proj={proj} p={pt(S)} color={MANIM.purple} label="P′" r={4.5} />
        </Fade>
        <Fade show={beat === 3} dx={20}>
          <Txt x={560} y={90} size={22} color={MANIM.yellow} anchor="start">{`d = ${raizRacional(d2)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Distancia de un punto a una recta con el producto vectorial. `nums`: `[Px,Py,Pz, Ax,Ay,Az, vx,vy,vz]`. */
export function buildDistanciaPuntoRecta3d(params: { nums?: number[] }): AnimBuild {
  const P = trip(params.nums, 0, [1, 3, 1]);
  const A = trip(params.nums, 3, [0, 0, 0]);
  const v = trip(params.nums, 6, [3, 0, 0]);
  const AP = restaV(P, A);
  const w = cross(AP, v);
  const d2 = dist2PuntoRecta(P, A, v);
  const F = pt(proyeccionPuntoRecta(P, A, v));
  const proj = stdProj(32, 330, 290);
  return {
    label: "Distancia de un punto a una recta",
    captions: [
      `La recta pasa por $A${tx(A)}$ con vector director $\\vec{v} = ${tx(v)}$; el punto es $P${tx(P)}$.`,
      `Los vectores $\\overrightarrow{AP} = ${tx(AP)}$ y $\\vec{v}$ forman un **paralelogramo**: su base es $|\\vec{v}|$ y su altura es la distancia $d$ buscada.`,
      `Área $= |\\overrightarrow{AP}\\times\\vec{v}| = |${tx(w)}| = ${normaTxt(w)}$.`,
      `Como área $=$ base $\\times$ altura: $d = \\dfrac{|\\overrightarrow{AP}\\times\\vec{v}|}{|\\vec{v}|} = ${raizRacional(d2)} \\approx ${dec(Math.sqrt(d2.n / d2.d))}$. El pie de la perpendicular es $F = ${ptTex(proyeccionPuntoRecta(P, A, v))}$.`,
    ],
    beatMs: 5600,
    render: (beat) => (
      <Canvas>
        <Axes3D proj={proj} len={5} floor={false} />
        <Seg3D proj={proj} a={puntoRecta(A, v, -1.2)} b={puntoRecta(A, v, 2.4)} color={MANIM.blue} width={3.5} />
        <Arrow3D proj={proj} from={A} to={sumaV(A, v)} color={MANIM.blue} width={4.5} label="v" />
        <Dot3D proj={proj} p={A} color={MANIM.blue} label="A" />
        <Dot3D proj={proj} p={P} color={MANIM.yellow} label="P" />
        <Fade show={beat >= 1}>
          <Arrow3D proj={proj} from={A} to={P} color={MANIM.green} width={3} />
          <Poly3D proj={proj} pts={[A, sumaV(A, v), sumaV(P, v), P]} color={MANIM.yellow} fillOpacity={0.14} />
        </Fade>
        <Fade show={beat >= 3}>
          <Seg3D proj={proj} a={P} b={F} color={MANIM.red} width={4} />
          <Dot3D proj={proj} p={F} color={MANIM.green} label="F" r={4.5} />
        </Fade>
        <Fade show={beat >= 2} dx={20}>
          <Txt x={540} y={86} size={22} color={MANIM.yellow} anchor="start">{`|AP × v| = ${normaTxt(w)}`}</Txt>
        </Fade>
        <Fade show={beat === 3} dx={20}>
          <Txt x={540} y={120} size={22} color={MANIM.red} anchor="start">{`d = ${raizRacional(d2)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Distancia entre dos rectas que se cruzan: volumen entre área de la base. `nums`: `[P,u,Q,v]` (12 valores). */
export function buildDistanciaRectasCruzan3d(params: { nums?: number[] }): AnimBuild {
  const P = trip(params.nums, 0, [0, 0, 0]);
  const u = trip(params.nums, 3, [3, 0, 0]);
  const Q = trip(params.nums, 6, [0, 0, 3]);
  const v = trip(params.nums, 9, [0, 3, 0]);
  const PQ = restaV(Q, P);
  const m = mixto(u, v, PQ);
  const w = cross(u, v);
  const d2 = dist2Rectas(P, u, Q, v);
  const proj = stdProj(32, 320, 300);
  const base = [P, sumaV(P, u), sumaV(sumaV(P, u), v), sumaV(P, v)];
  return {
    label: "Distancia entre dos rectas que se cruzan",
    captions: [
      `Dos rectas que se cruzan: $r$ por $P${tx(P)}$ con $\\vec{u} = ${tx(u)}$ y $s$ por $Q${tx(Q)}$ con $\\vec{v} = ${tx(v)}$.`,
      `Los vectores $\\vec{u}$, $\\vec{v}$ y $\\overrightarrow{PQ} = ${tx(PQ)}$ forman un **paralelepípedo**. Su base es el paralelogramo de $\\vec{u}$ y $\\vec{v}$, de área $|\\vec{u}\\times\\vec{v}| = ${normaTxt(w)}$.`,
      `Su volumen es $|[\\vec{u}, \\vec{v}, \\overrightarrow{PQ}]| = ${Math.abs(m)}$.`,
      `La altura del paralelepípedo es la **distancia entre las rectas**: $d = \\dfrac{|[\\vec{u}, \\vec{v}, \\overrightarrow{PQ}]|}{|\\vec{u}\\times\\vec{v}|} = ${raizRacional(d2)} \\approx ${dec(Math.sqrt(d2.n / d2.d))}$.`,
    ],
    beatMs: 5600,
    render: (beat) => (
      <Canvas>
        <Axes3D proj={proj} len={5} floor={false} />
        <Seg3D proj={proj} a={puntoRecta(P, u, -0.5)} b={puntoRecta(P, u, 1.8)} color={MANIM.blue} width={3.5} />
        <Seg3D proj={proj} a={puntoRecta(Q, v, -0.5)} b={puntoRecta(Q, v, 1.8)} color={MANIM.green} width={3.5} />
        <Dot3D proj={proj} p={P} color={MANIM.blue} label="P" />
        <Dot3D proj={proj} p={Q} color={MANIM.green} label="Q" />
        <Fade show={beat >= 1}>
          <Poly3D proj={proj} pts={base} color={MANIM.yellow} fillOpacity={0.2} />
          <Arrow3D proj={proj} from={P} to={Q} color={MANIM.orange} width={3} />
        </Fade>
        <Fade show={beat >= 2}>
          {[[0, 1], [1, 2], [2, 3], [3, 0]].map(([a, b], i) => <Seg3D key={i} proj={proj} a={sumaV(base[a!]!, PQ)} b={sumaV(base[b!]!, PQ)} color={MANIM.purple} width={1.6} />)}
          {base.map((b, i) => <Seg3D key={`v${i}`} proj={proj} a={b} b={sumaV(b, PQ)} color={MANIM.purple} width={1.6} />)}
        </Fade>
        <Fade show={beat === 3} dx={20}>
          <Txt x={560} y={90} size={22} color={MANIM.yellow} anchor="start">{`d = ${Math.abs(m)} / ${normaTxt(w)}`}</Txt>
          <Txt x={560} y={122} size={22} color={MANIM.red} anchor="start">{`= ${raizRacional(d2)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
