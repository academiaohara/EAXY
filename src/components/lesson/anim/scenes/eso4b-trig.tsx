import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const rad = (d: number) => (d * Math.PI) / 180;
const clampN = (v: number | undefined, d: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, Number.isFinite(v) ? (v as number) : d));

type Tri = { A: [number, number]; B: [number, number]; C: [number, number] };

/** Triángulo rectángulo con el ángulo agudo α en A y el recto en C (cateto contiguo horizontal). */
function triangle(alpha: number, hyp: number, ax: number, ay: number): Tri {
  return {
    A: [ax, ay],
    C: [ax + hyp * Math.cos(rad(alpha)), ay],
    B: [ax + hyp * Math.cos(rad(alpha)), ay - hyp * Math.sin(rad(alpha))],
  };
}

function RightMark({ t, size = 18 }: { t: Tri; size?: number }) {
  const [cx, cy] = t.C;
  return <path d={`M ${cx - size} ${cy} L ${cx - size} ${cy - size} L ${cx} ${cy - size}`} fill="none" stroke={MANIM.ink} strokeWidth={2.5} />;
}

function AlphaArc({ t, alpha, r = 54, label = "α" }: { t: Tri; alpha: number; r?: number; label?: string }) {
  const [ax, ay] = t.A;
  const ex = ax + r * Math.cos(rad(alpha));
  const ey = ay - r * Math.sin(rad(alpha));
  const mx = ax + (r + 20) * Math.cos(rad(alpha / 2));
  const my = ay - (r + 20) * Math.sin(rad(alpha / 2));
  return (
    <g>
      <path d={`M ${ax + r} ${ay} A ${r} ${r} 0 0 0 ${ex} ${ey}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
      <Txt x={mx + 10} y={my + 8} size={26} color={MANIM.yellow}>{label}</Txt>
    </g>
  );
}

function Side({ p, q, color, width = 5, show }: { p: [number, number]; q: [number, number]; color: string; width?: number; show: boolean }) {
  return (
    <Fade show={show}>
      <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={color} strokeWidth={width} strokeLinecap="round" />
    </Fade>
  );
}

function Base({ t }: { t: Tri }) {
  return <polygon points={`${t.A.join(",")} ${t.B.join(",")} ${t.C.join(",")}`} fill={MANIM.panel} stroke={MANIM.grid} strokeWidth={3} />;
}

/**
 * Razones trigonométricas: hipotenusa, cateto opuesto y contiguo a α, y seno, coseno y tangente.
 */
export function buildTrigTrianguloRazones(params: { a?: number }): AnimBuild {
  const alpha = clampN(params.a, 35, 20, 65);
  const t = triangle(alpha, 330, 90, 350);
  const mid = (p: [number, number], q: [number, number]): [number, number] => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const mh = mid(t.A, t.B);
  const mo = mid(t.C, t.B);
  const mc = mid(t.A, t.C);
  return {
    label: "Triángulo rectángulo: hipotenusa, cateto opuesto y cateto contiguo a un ángulo agudo α",
    captions: [
      "Un triángulo rectángulo tiene un ángulo de $90°$ y dos **ángulos agudos**. Elegimos uno: $\\alpha$.",
      "La **hipotenusa** es el lado opuesto al ángulo recto: siempre es el más largo.",
      "El **cateto opuesto** a $\\alpha$ es el que queda enfrente, sin tocar el ángulo.",
      "El **cateto contiguo** a $\\alpha$ es el otro: forma el ángulo junto con la hipotenusa.",
      "Las razones entre dos lados: $\\operatorname{sen}\\alpha = \\dfrac{\\text{opuesto}}{\\text{hipotenusa}}$, $\\cos\\alpha = \\dfrac{\\text{contiguo}}{\\text{hipotenusa}}$, $\\operatorname{tg}\\alpha = \\dfrac{\\text{opuesto}}{\\text{contiguo}}$.",
    ],
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        <Base t={t} />
        <RightMark t={t} />
        <AlphaArc t={t} alpha={alpha} />
        <Side p={t.A} q={t.B} color={MANIM.blue} show={beat === 1 || beat >= 4} />
        <Side p={t.C} q={t.B} color={MANIM.orange} show={beat === 2 || beat >= 4} />
        <Side p={t.A} q={t.C} color={MANIM.green} show={beat === 3 || beat >= 4} />
        <Fade show={beat >= 1} dy={-6}>
          <Txt x={mh[0] - 70} y={mh[1] - 12} size={24} color={MANIM.blue}>hipotenusa</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={-6}>
          <Txt x={mo[0] + 14} y={mo[1] + 8} size={24} color={MANIM.orange} anchor="start">opuesto</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={6}>
          <Txt x={mc[0]} y={mc[1] + 38} size={24} color={MANIM.green}>contiguo</Txt>
        </Fade>
        <Fade show={beat >= 4} dx={20}>
          <Txt x={470} y={110} size={34} color={MANIM.ink} anchor="start">{"sen α = opuesto / hipotenusa"}</Txt>
          <Txt x={470} y={165} size={34} color={MANIM.ink} anchor="start">{"cos α = contiguo / hipotenusa"}</Txt>
          <Txt x={470} y={220} size={34} color={MANIM.ink} anchor="start">{"tg α = opuesto / contiguo"}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Dos triángulos con el mismo ángulo: lados distintos, razones iguales (datos del libro: 41, 28 y 50 mm). */
export function buildTrigSemejantes(): AnimBuild {
  const alpha = 34;
  const small = triangle(alpha, 190, 70, 350);
  const big = triangle(alpha, 380, 70, 350);
  return {
    label: "Triángulos rectángulos con el mismo ángulo de 34°: las razones no cambian",
    captions: [
      "Triángulo pequeño con $\\alpha = 34°$. Se miden los lados: contiguo $41$ mm, opuesto $28$ mm, hipotenusa $50$ mm.",
      "Sus razones: $\\operatorname{sen} 34° = \\frac{28}{50} = 0{,}56$, $\\cos 34° = \\frac{41}{50} = 0{,}82$, $\\operatorname{tg} 34° = \\frac{28}{41} = 0{,}68$.",
      "Ahora un triángulo **más grande** con el mismo ángulo: todos los lados se duplican ($82$, $56$ y $100$ mm).",
      "Las razones salen **iguales**: $\\frac{56}{100} = 0{,}56$, $\\frac{82}{100} = 0{,}82$, $\\frac{56}{82} \\approx 0{,}68$. Dependen del ángulo, no del tamaño del triángulo.",
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Fade show={beat >= 2}>
          <Base t={big} />
          <RightMark t={big} size={22} />
        </Fade>
        <Base t={small} />
        <RightMark t={small} />
        <AlphaArc t={small} alpha={alpha} r={44} />
        <Txt x={small.A[0] + 95} y={small.A[1] + 30} size={22} color={MANIM.green}>{beat >= 2 ? "41 · 82 mm" : "41 mm"}</Txt>
        <Txt x={small.C[0] + 12} y={small.C[1] - 50} size={22} color={MANIM.orange} anchor="start">{beat >= 2 ? "28 · 56" : "28 mm"}</Txt>
        <Txt x={small.A[0] + 70} y={small.A[1] - 88} size={22} color={MANIM.blue}>{beat >= 2 ? "50 · 100" : "50 mm"}</Txt>
        <Fade show={beat >= 1 && beat < 2} dx={20}>
          <Txt x={560} y={140} size={30} color={MANIM.ink} anchor="start">{"sen α = 28/50 = 0,56"}</Txt>
          <Txt x={560} y={190} size={30} color={MANIM.ink} anchor="start">{"cos α = 41/50 = 0,82"}</Txt>
          <Txt x={560} y={240} size={30} color={MANIM.ink} anchor="start">{"tg α = 28/41 ≈ 0,68"}</Txt>
        </Fade>
        <Fade show={beat >= 3} dx={20}>
          <Txt x={560} y={140} size={30} color={MANIM.yellow} anchor="start">{"sen α = 56/100 = 0,56"}</Txt>
          <Txt x={560} y={190} size={30} color={MANIM.yellow} anchor="start">{"cos α = 82/100 = 0,82"}</Txt>
          <Txt x={560} y={240} size={30} color={MANIM.yellow} anchor="start">{"tg α = 56/82 ≈ 0,68"}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Razones de 45° (diagonal del cuadrado) y de 30° y 60° (altura del triángulo equilátero). */
export function buildTrigNotables(params: { a?: number }): AnimBuild {
  const is45 = clampN(params.a, 45, 30, 45) >= 45;
  if (is45) {
    const s = 220;
    const x0 = 150;
    const y0 = 360;
    const sq = (children: ReactNode) => <g>{children}</g>;
    return {
      label: "Razones trigonométricas de 45°: mitad de un cuadrado de lado 1",
      captions: [
        "Un cuadrado de lado $1$. Su diagonal lo parte en dos triángulos rectángulos **isósceles**.",
        "Por Pitágoras, la diagonal mide $\\sqrt{1^2 + 1^2} = \\sqrt{2}$. Los ángulos agudos miden $45°$.",
        "$\\operatorname{sen} 45° = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$ y $\\cos 45° = \\frac{\\sqrt{2}}{2}$.",
        "$\\operatorname{tg} 45° = \\frac{1}{1} = 1$: los dos catetos son iguales.",
      ],
      beatMs: 3800,
      render: (beat) =>
        sq(
          <Canvas>
            <rect x={x0} y={y0 - s} width={s} height={s} fill={MANIM.panel} stroke={MANIM.grid} strokeWidth={3} />
            <Side p={[x0, y0]} q={[x0 + s, y0 - s]} color={MANIM.blue} show={beat >= 1} />
            <Txt x={x0 + s / 2} y={y0 + 34} size={26} color={MANIM.green}>1</Txt>
            <Txt x={x0 + s + 18} y={y0 - s / 2 + 8} size={26} color={MANIM.orange} anchor="start">1</Txt>
            <Fade show={beat >= 1}>
              <Txt x={x0 + s / 2 - 34} y={y0 - s / 2 - 18} size={26} color={MANIM.blue}>√2</Txt>
              <Txt x={x0 + 62} y={y0 - 12} size={22} color={MANIM.yellow}>45°</Txt>
            </Fade>
            <Fade show={beat >= 2} dx={20}>
              <Txt x={520} y={150} size={34} color={MANIM.ink} anchor="start">{"sen 45° = √2 / 2"}</Txt>
              <Txt x={520} y={205} size={34} color={MANIM.ink} anchor="start">{"cos 45° = √2 / 2"}</Txt>
            </Fade>
            <Fade show={beat >= 3} dx={20}>
              <Txt x={520} y={260} size={34} color={MANIM.yellow} anchor="start">{"tg 45° = 1"}</Txt>
            </Fade>
          </Canvas>,
        ),
    };
  }
  const side = 280;
  const x0 = 130;
  const y0 = 360;
  const top: [number, number] = [x0 + side / 2, y0 - (side * Math.sqrt(3)) / 2];
  const foot: [number, number] = [x0 + side / 2, y0];
  return {
    label: "Razones trigonométricas de 30° y 60°: mitad de un triángulo equilátero de lado 1",
    captions: [
      "Un triángulo **equilátero** de lado $1$: sus tres ángulos miden $60°$.",
      "Se traza su altura: parte la base en dos mitades de $\\frac12$ y el ángulo de arriba en dos de $30°$.",
      "La altura, por Pitágoras: $\\sqrt{1 - \\frac14} = \\sqrt{\\frac34} = \\frac{\\sqrt{3}}{2}$.",
      "Con ese triángulo: $\\operatorname{sen} 30° = \\frac12$, $\\cos 30° = \\frac{\\sqrt3}{2}$, $\\operatorname{tg} 30° = \\frac{1}{\\sqrt3} = \\frac{\\sqrt3}{3}$.",
      "Y con el ángulo de $60°$ se intercambian los papeles: $\\operatorname{sen} 60° = \\frac{\\sqrt3}{2}$, $\\cos 60° = \\frac12$, $\\operatorname{tg} 60° = \\sqrt3$.",
    ],
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        <polygon points={`${x0},${y0} ${x0 + side},${y0} ${top.join(",")}`} fill={MANIM.panel} stroke={MANIM.grid} strokeWidth={3} />
        <Fade show={beat >= 1}>
          <line x1={top[0]} y1={top[1]} x2={foot[0]} y2={foot[1]} stroke={MANIM.blue} strokeWidth={5} />
          <Txt x={x0 + side / 4 + 4} y={y0 + 34} size={24} color={MANIM.green}>1/2</Txt>
          <Txt x={x0 + side / 2 + 70} y={y0 - 20} size={22} color={MANIM.muted}>1/2</Txt>
          <Txt x={top[0] - 36} y={top[1] + 90} size={22} color={MANIM.yellow}>30°</Txt>
          <Txt x={x0 + 60} y={y0 - 12} size={22} color={MANIM.yellow}>60°</Txt>
        </Fade>
        <Txt x={x0 + side / 4 - 26} y={top[1] + (y0 - top[1]) / 2 - 24} size={26} color={MANIM.ink}>1</Txt>
        <Fade show={beat >= 2}>
          <Txt x={top[0] + 18} y={top[1] + (y0 - top[1]) / 2} size={26} color={MANIM.blue} anchor="start">{"√3 / 2"}</Txt>
        </Fade>
        <Fade show={beat >= 3} dx={20}>
          <Txt x={520} y={120} size={30} color={MANIM.ink} anchor="start">{"sen 30° = 1/2"}</Txt>
          <Txt x={520} y={168} size={30} color={MANIM.ink} anchor="start">{"cos 30° = √3/2"}</Txt>
          <Txt x={520} y={216} size={30} color={MANIM.ink} anchor="start">{"tg 30° = √3/3"}</Txt>
        </Fade>
        <Fade show={beat >= 4} dx={20}>
          <Txt x={520} y={278} size={30} color={MANIM.yellow} anchor="start">{"sen 60° = √3/2"}</Txt>
          <Txt x={520} y={326} size={30} color={MANIM.yellow} anchor="start">{"cos 60° = 1/2"}</Txt>
          <Txt x={520} y={374} size={30} color={MANIM.yellow} anchor="start">{"tg 60° = √3"}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Altura de un árbol a partir de la distancia a su base y del ángulo bajo el que se ve la copa. */
export function buildTrigAlturaArbol(params: { a?: number; b?: number }): AnimBuild {
  const alpha = clampN(params.a, 50, 15, 75);
  const dist = clampN(params.b, 20, 5, 60);
  const h = dist * Math.tan(rad(alpha));
  const px = 440;
  const ground = 340;
  const treeH = Math.min(240, (px - 90) * Math.tan(rad(alpha)));
  const eye: [number, number] = [90, ground];
  const top: [number, number] = [px, ground - treeH];
  return {
    label: `Altura de un árbol: ángulo de ${alpha}° a ${dist} m de la base`,
    captions: [
      `Desde el suelo, a $${dist}$ m de la base del árbol, se ve la copa bajo un ángulo de $${alpha}°$.`,
      "Se forma un triángulo rectángulo: el cateto **contiguo** es la distancia ($" + dist + "$ m) y el **opuesto**, la altura $h$.",
      `Sabemos contiguo y queremos el opuesto: la razón que los relaciona es la tangente. $\\operatorname{tg} ${alpha}° = \\dfrac{h}{${dist}}$.`,
      `Se despeja: $h = ${dist} \\cdot \\operatorname{tg} ${alpha}° \\approx ${fmtEs(h, 2)}$ m.`,
    ],
    beatMs: 4000,
    render: (beat) => (
      <Canvas>
        <line x1={40} y1={ground} x2={760} y2={ground} stroke={MANIM.grid} strokeWidth={4} />
        <rect x={px - 7} y={top[1]} width={14} height={treeH} fill="#8b6b45" />
        <circle cx={px} cy={top[1] - 18} r={44} fill="#3f8a4a" opacity={0.9} />
        <circle cx={eye[0]} cy={ground - 14} r={9} fill={MANIM.ink} />
        <Fade show={beat >= 1}>
          <polygon points={`${eye[0]},${ground} ${px},${ground} ${px},${top[1]}`} fill={MANIM.blue} opacity={0.12} />
          <line x1={eye[0]} y1={ground} x2={px} y2={top[1]} stroke={MANIM.blue} strokeWidth={4} />
          <line x1={eye[0]} y1={ground} x2={px} y2={ground} stroke={MANIM.green} strokeWidth={5} />
          <line x1={px} y1={ground} x2={px} y2={top[1]} stroke={MANIM.orange} strokeWidth={5} />
          <path d={`M ${eye[0] + 60} ${ground} A 60 60 0 0 0 ${eye[0] + 60 * Math.cos(rad(alpha))} ${ground - 60 * Math.sin(rad(alpha))}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={eye[0] + 92} y={ground - 14} size={24} color={MANIM.yellow}>{`${alpha}°`}</Txt>
          <Txt x={(eye[0] + px) / 2} y={ground + 34} size={24} color={MANIM.green}>{`${dist} m`}</Txt>
          <Txt x={px + 26} y={ground - treeH / 2 + 8} size={26} color={MANIM.orange} anchor="start">h</Txt>
        </Fade>
        <Fade show={beat >= 2} dx={20}>
          <Txt x={60} y={70} size={34} color={MANIM.ink} anchor="start">{`tg ${alpha}° = h / ${dist}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dx={20}>
          <Txt x={60} y={120} size={34} color={MANIM.yellow} anchor="start">{`h = ${dist} · tg ${alpha}° ≈ ${fmtEs(h, 2)} m`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
