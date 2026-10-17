import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { IntAxis, MINUS, NEG, POS, lineScale, z } from "@/components/lesson/anim/integers";

const LO = -6;
const HI = 6;
const Y = 270;

function Arc({ x1, x2, y, color, show, delay = 0 }: { x1: number; x2: number; y: number; color: string; show: boolean; delay?: number }) {
  const h = Math.abs(x2 - x1) * 0.5;
  return (
    <path
      d={`M ${x1} ${y} Q ${(x1 + x2) / 2} ${y - h * 1.6} ${x2} ${y}`}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeDasharray="9 7"
      className="anim-t"
      style={{ opacity: show ? 1 : 0, transitionDelay: `${show ? delay : 0}ms` }}
    />
  );
}

/** Los enteros: los naturales se reflejan respecto del 0 y aparecen los opuestos. */
export function buildRectaEnteros(): AnimBuild {
  const sx = lineScale(LO, HI, 70, 730);
  const positives = Array.from({ length: HI }, (_, k) => k + 1);

  return {
    label: "La recta de los enteros: los naturales a la derecha del cero y sus opuestos negativos a la izquierda",
    captions: [
      `Los **naturales** parten del $0$ y solo crecen hacia la derecha.`,
      `Al otro lado del $0$ ponemos los **negativos**: cada natural tiene su **opuesto**, a la misma distancia.`,
      `$+3$ y $-3$ son opuestos; también $+5$ y $-5$. El opuesto de $0$ es el propio $0$.`,
      `Todos juntos forman el conjunto de los **enteros**, $\\mathbb{Z}$. Los naturales son solo una parte: $\\mathbb{N} \\subset \\mathbb{Z}$.`,
    ],
    render: (beat) => (
      <Canvas>
        <IntAxis lo={LO} hi={HI} y={Y} x0={70} x1={730} showNegatives={beat >= 1} />
        {/* color de las marcas */}
        {positives.map((v) => (
          <Fade key={`p${v}`} show dy={-4}>
            <circle cx={sx(v)} cy={Y} r={7} fill={POS} />
          </Fade>
        ))}
        <circle cx={sx(0)} cy={Y} r={8} fill={MANIM.ink} />
        {positives.map((v) => (
          <Fade key={`n${v}`} show={beat >= 1} dx={2 * v * ((730 - 70) / (HI - LO))} delay={(v - 1) * 90}>
            <circle cx={sx(-v)} cy={Y} r={7} fill={NEG} />
          </Fade>
        ))}

        {/* ejes y rótulos de conjunto */}
        <Fade show={beat === 0} dy={8}>
          <Txt x={sx(3)} y={Y - 64} size={26} color={POS}>naturales: 0, 1, 2, 3…</Txt>
        </Fade>
        <Fade show={beat === 1} dy={8}>
          <Txt x={sx(-3)} y={Y - 64} size={26} color={NEG}>negativos</Txt>
          <Txt x={sx(3)} y={Y - 64} size={26} color={POS}>positivos</Txt>
        </Fade>

        {/* opuestos */}
        <Arc x1={sx(-3)} x2={sx(3)} y={Y - 14} color={MANIM.yellow} show={beat === 2} />
        <Arc x1={sx(-5)} x2={sx(5)} y={Y - 14} color={MANIM.orange} show={beat === 2} delay={200} />
        <Fade show={beat === 2} dy={6} delay={300}>
          <Txt x={sx(0)} y={Y + 100} size={26} color={MANIM.yellow}>{`+3 y ${MINUS}3 son opuestos`}</Txt>
          <Txt x={sx(0)} y={Y + 136} size={22} color={MANIM.orange} weight={500}>{`+5 y ${MINUS}5 también`}</Txt>
        </Fade>

        {/* ℕ ⊂ ℤ */}
        <Fade show={beat >= 3} dy={8}>
          <path d={`M ${sx(LO) - 6} ${Y - 56} L ${sx(LO) - 6} ${Y - 70} L ${sx(HI) + 6} ${Y - 70} L ${sx(HI) + 6} ${Y - 56}`} fill="none" stroke={MANIM.blue} strokeWidth={3} strokeLinejoin="round" />
          <Txt x={sx(0)} y={Y - 86} size={30} color={MANIM.blue}>ℤ: los enteros</Txt>
          <path d={`M ${sx(0) - 6} ${Y - 28} L ${sx(0) - 6} ${Y - 40} L ${sx(HI) + 6} ${Y - 40} L ${sx(HI) + 6} ${Y - 28}`} fill="none" stroke={POS} strokeWidth={3} strokeLinejoin="round" />
          <Txt x={sx(3)} y={Y - 50} size={22} color={POS}>ℕ</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={6}>
          <Txt x={sx(0)} y={Y + 96} size={22} color={MANIM.muted} weight={500}>… {z(-3)}, {z(-2)}, {z(-1)}, 0, 1, 2, 3 …</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
