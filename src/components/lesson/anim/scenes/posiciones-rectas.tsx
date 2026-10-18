import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, RightMark, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const R_Y = 110;
const S_Y = 250;
const PIVOT: Pt = [400, S_Y];
const SECANT_DEG = 55;

/** Posiciones relativas de dos rectas: paralelas, secantes y perpendiculares (s gira en torno a un punto). */
export function buildPosicionesRectas(): AnimBuild {
  const rot = (beat: number) => (beat < 2 ? 0 : beat === 2 ? -SECANT_DEG : -90);
  return {
    label: "Dos rectas: primero paralelas, después secantes y por último perpendiculares al girar la recta s",
    captions: [
      "Dos rectas **paralelas**, $r \\parallel s$, no tienen ningún punto en común: nunca se cortan.",
      "Mantienen siempre **la misma distancia**: por mucho que las prolongues, no llegan a juntarse.",
      "Si giramos $s$, deja de ser paralela y corta a $r$ en un punto $P$: son **secantes**.",
      "Cuando se cortan formando ángulos de $90^\\circ$, las rectas son **perpendiculares**, $r \\perp s$.",
    ],
    render: (beat) => {
      const px = 400 + (S_Y - R_Y) / Math.tan((SECANT_DEG * Math.PI) / 180);
      const P: Pt = beat === 3 ? [400, R_Y] : [px, R_Y];
      return (
        <Canvas>
          <line x1={70} y1={R_Y} x2={730} y2={R_Y} stroke={MANIM.blue} strokeWidth={4} strokeLinecap="round" />
          <g className="anim-t" style={{ transform: `rotate(${rot(beat)}deg)`, transformOrigin: `${PIVOT[0]}px ${PIVOT[1]}px` }}>
            <line x1={PIVOT[0] - 330} y1={S_Y} x2={PIVOT[0] + 330} y2={S_Y} stroke={MANIM.orange} strokeWidth={4} strokeLinecap="round" />
          </g>
          <Txt x={750} y={R_Y - 12} size={30} color={MANIM.blue}>r</Txt>
          <Fade show={beat <= 1}>
            <Txt x={750} y={S_Y - 12} size={30} color={MANIM.orange}>s</Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={574} y={44} size={30} color={MANIM.orange}>s</Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Txt x={424} y={36} size={30} color={MANIM.orange}>s</Txt>
          </Fade>

          {/* distancia constante entre paralelas */}
          <Fade show={beat === 1} dy={-6}>
            {[190, 600].map((x) => (
              <g key={x} stroke={MANIM.yellow} strokeWidth={3} strokeLinecap="round">
                <line x1={x} y1={R_Y + 6} x2={x} y2={S_Y - 6} strokeDasharray="7 6" />
                <line x1={x - 8} y1={R_Y + 12} x2={x} y2={R_Y + 4} />
                <line x1={x + 8} y1={R_Y + 12} x2={x} y2={R_Y + 4} />
                <line x1={x - 8} y1={S_Y - 12} x2={x} y2={S_Y - 4} />
                <line x1={x + 8} y1={S_Y - 12} x2={x} y2={S_Y - 4} />
                <text x={x + 14} y={(R_Y + S_Y) / 2 + 8} fill={MANIM.yellow} fontSize={26} stroke="none" fontWeight={700}>d</text>
              </g>
            ))}
          </Fade>

          <Fade show={beat >= 2}>
            <Dot p={P} color={MANIM.yellow} r={8} />
            <Txt x={P[0] - 26} y={P[1] - 16} size={30} color={MANIM.yellow}>P</Txt>
          </Fade>
          <Fade show={beat === 3}>
            <RightMark v={P} a={0} b={270} size={14} color={MANIM.yellow} />
            <RightMark v={P} a={180} b={270} size={14} color={MANIM.yellow} />
            <RightMark v={P} a={0} b={90} size={14} color={MANIM.yellow} />
            <RightMark v={P} a={180} b={90} size={14} color={MANIM.yellow} />
            <Txt x={P[0] + 60} y={P[1] + 44} size={26} color={MANIM.yellow}>90°</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
