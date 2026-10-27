import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { ArcStroke, Dot, Seg, polar, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Línea del tiempo del dibujo técnico ───────────── */

const HITOS = [
  { y: "s. III a. C.", t: "Euclides", d: "Regla y compás" },
  { y: "s. XV", t: "Renacimiento", d: "Perspectiva" },
  { y: "finales s. XVIII", t: "Monge", d: "Sistema diédrico" },
  { y: "s. XX", t: "Normalización", d: "UNE e ISO" },
];
const HCOL = [MANIM.blue, MANIM.purple, MANIM.orange, MANIM.green];

export function buildLineaTiempoDibujo(): AnimBuild {
  return {
    label: "Historia del dibujo técnico: Euclides, Renacimiento, Monge y normalización",
    beatMs: 5400,
    captions: [
      "La **geometría griega** (Thales, Pitágoras, **Euclides**) fija los razonamientos y las construcciones con **regla y compás** que aún se usan.",
      "En el **Renacimiento** nace la **perspectiva cónica**: Brunelleschi y Alberti buscan representar el espacio tal como se ve.",
      "**Monge** sistematiza a finales del siglo XVIII la **geometría descriptiva**: el sistema **diédrico** permite definir objetos con precisión para construirlos.",
      "La industria exige un lenguaje común: las **normas UNE e ISO** unifican líneas, escalas, formatos y acotación para que cualquier técnico lea un plano.",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={60} y1={200} x2={740} y2={200} stroke={MANIM.muted} strokeWidth={4} strokeLinecap="round" />
        {HITOS.map((h, i) => {
          const x = 120 + i * 185;
          const on = i === beat;
          return (
            <g key={h.t}>
              <circle cx={x} cy={200} r={on ? 17 : 11} fill={HCOL[i]} fillOpacity={i <= beat ? 1 : 0.25} className="anim-t" />
              <Fade show={i <= beat}>
                <Txt x={x} y={162} size={20} color={HCOL[i]} weight={700}>
                  {h.y}
                </Txt>
                <Txt x={x} y={248} size={24} color={MANIM.ink} weight={700}>
                  {h.t}
                </Txt>
                <Txt x={x} y={280} size={17} color={MANIM.muted} weight={500}>
                  {h.d}
                </Txt>
              </Fade>
            </g>
          );
        })}
      </Canvas>
    ),
  };
}

/* ───────────── Construcción del arco capaz ───────────── */

const A: Pt = [250, 320];
const B: Pt = [550, 320];
const ALPHA = 60;
const AB = B[0] - A[0];
const R = AB / (2 * Math.sin((ALPHA * Math.PI) / 180));
const D = R * Math.cos((ALPHA * Math.PI) / 180);
const O: Pt = [(A[0] + B[0]) / 2, A[1] - D];
/** El arco sobre AB va de OB (−(90° − α)) a OA (180° + (90° − α)) pasando por 90°. */
const A0 = -(90 - ALPHA);
const A1 = 180 + (90 - ALPHA);
const P: Pt = polar(O, R, 90);

export function buildTrazadoArcoCapaz(): AnimBuild {
  return {
    label: "Trazado del arco capaz de 60° sobre un segmento AB",
    beatMs: 5400,
    captions: [
      "Se quiere el **lugar de los puntos** desde los que se ve el segmento **AB** bajo un ángulo de **60°**. Se empieza dibujando AB.",
      "El centro del arco equidista de A y B: está en la **mediatriz** de AB. Se traza.",
      "En el extremo **A** se dibuja, por debajo de AB, una recta que forma con AB el ángulo **α = 60°** (será la **tangente** a la circunferencia en A).",
      "La **perpendicular** a esa recta por A corta a la mediatriz en el **centro O**, porque el radio es perpendicular a la tangente.",
      "Con centro en **O** y radio **OA** se traza la circunferencia. El **arco** sobre AB es el arco capaz: desde cualquier punto P del arco, **APB = 60°**.",
    ],
    render: (beat) => {
      const tan = polar(A, 100, -ALPHA);
      const tan2 = polar(A, 80, 180 - ALPHA);
      const per = polar(A, 190, 30);
      return (
        <Canvas>
          <Seg a={A} b={B} width={4} />
          <Dot p={A} r={6} />
          <Dot p={B} r={6} />
          <Txt x={A[0] - 18} y={A[1] + 28} size={24}>A</Txt>
          <Txt x={B[0] + 18} y={B[1] + 28} size={24}>B</Txt>
          <Fade show={beat >= 1}>
            <Seg a={[O[0], 395]} b={[O[0], 40]} color={MANIM.purple} width={3} dashed />
            <Txt x={O[0] + 62} y={398} size={22} color={MANIM.purple}>mediatriz</Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <Seg a={tan2} b={tan} color={MANIM.orange} width={3.5} />
            <Txt x={A[0] + 46} y={A[1] + 30} size={22} color={MANIM.orange}>60°</Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Seg a={A} b={per} color={MANIM.blue} width={3.5} />
            <Dot p={O} color={MANIM.blue} r={7} />
            <Txt x={O[0] + 18} y={O[1] + 26} size={24} color={MANIM.blue}>O</Txt>
          </Fade>
          <ArcStroke c={O} r={R} a0={A0} a1={A1} show={beat >= 4} color={MANIM.green} width={4.5} />
          <Fade show={beat >= 4}>
            <Seg a={P} b={A} color={MANIM.green} width={2.5} />
            <Seg a={P} b={B} color={MANIM.green} width={2.5} />
            <Dot p={P} color={MANIM.green} r={7} />
            <Txt x={P[0] + 18} y={P[1] - 12} size={24} color={MANIM.green}>P</Txt>
            <Txt x={P[0] + 40} y={P[1] + 46} size={22} color={MANIM.green}>60°</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Sección áurea de un segmento ───────────── */

const SA: Pt = [150, 310];
const SB: Pt = [550, 310];
const SC: Pt = [550, 110];
const SLEN = Math.hypot(SC[0] - SA[0], SC[1] - SA[1]);
const SD: Pt = [SC[0] + (200 * (SA[0] - SC[0])) / SLEN, SC[1] + (200 * (SA[1] - SC[1])) / SLEN];
const SAD = Math.hypot(SD[0] - SA[0], SD[1] - SA[1]);
const SE: Pt = [SA[0] + SAD, SA[1]];
/** Ángulos (y hacia arriba) de CB y CA vistos desde C, y de AC y AB vistos desde A. */
const C_B = -90;
const C_A = -(180 - (Math.atan(200 / 400) * 180) / Math.PI);
const A_C = (Math.atan(200 / 400) * 180) / Math.PI;

export function buildSeccionAurea(): AnimBuild {
  return {
    label: "Construcción de la sección áurea de un segmento AB",
    beatMs: 5400,
    captions: [
      "Se quiere dividir **AB** en dos partes tales que **el segmento entero es a la parte mayor como la mayor es a la menor**. Se parte de AB.",
      "En **B** se levanta una **perpendicular** de longitud **BC = AB/2**.",
      "Se une **A con C**. Con centro en **C** y radio **CB** se corta AC en **D**.",
      "Con centro en **A** y radio **AD** se corta AB en **E**.",
      "**AE** es el **segmento áureo**: $AB/AE = AE/EB \\approx 1{,}618$, el **número áureo** $\\varphi$. Lo mayor mide el 61,8 % del total.",
    ],
    render: (beat) => (
      <Canvas>
        <Seg a={SA} b={SB} width={4} />
        <Dot p={SA} r={6} />
        <Dot p={SB} r={6} />
        <Txt x={SA[0] - 16} y={SA[1] + 30} size={24}>A</Txt>
        <Txt x={SB[0] + 18} y={SB[1] + 30} size={24}>B</Txt>
        <Fade show={beat >= 1}>
          <Seg a={SB} b={SC} color={MANIM.purple} width={3.5} />
          <Dot p={SC} color={MANIM.purple} r={6} />
          <Txt x={SC[0] + 18} y={SC[1] - 8} size={24} color={MANIM.purple}>C</Txt>
          <Txt x={SB[0] + 52} y={215} size={20} color={MANIM.purple}>AB/2</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Seg a={SA} b={SC} color={MANIM.blue} width={3} />
          <Dot p={SD} color={MANIM.orange} r={6} />
          <Txt x={SD[0] - 8} y={SD[1] - 16} size={24} color={MANIM.orange}>D</Txt>
        </Fade>
        <ArcStroke c={SC} r={200} a0={C_B} a1={C_A} show={beat >= 2} color={MANIM.orange} width={3} />
        <ArcStroke c={SA} r={SAD} a0={A_C} a1={0} show={beat >= 3} color={MANIM.green} width={3.5} />
        <Fade show={beat >= 3}>
          <Dot p={SE} color={MANIM.green} r={7} />
          <Txt x={SE[0]} y={SE[1] + 32} size={24} color={MANIM.green}>E</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <Seg a={[SA[0], SA[1] + 52]} b={[SE[0], SE[1] + 52]} color={MANIM.green} width={4} />
          <Txt x={(SA[0] + SE[0]) / 2} y={SA[1] + 82} size={20} color={MANIM.green}>AE = 0,618 · AB</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
