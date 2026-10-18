import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const L = 200;
const T = 90;
const W = 360;
const H = 200;

/** Campo de largo `x` y ancho `y`: el perímetro suma los cuatro lados y el área cubre la superficie. */
export function buildCampoPerimetroArea(): AnimBuild {
  const R = L + W;
  const B = T + H;
  return {
    label: "Campo de largo x y ancho y: perímetro P = 2x + 2y (rodear) y área A = x·y (cubrir)",
    captions: [
      "Un campo rectangular de largo $x$ y ancho $y$. No damos medidas: sirve para **cualquier** campo.",
      "**Perímetro**: recorremos el borde y sumamos los lados, $x + y + x + y$.",
      "Los lados iguales se agrupan: $P = 2x + 2y$. Es una **suma** de longitudes.",
      "**Área**: cubrimos el interior con cuadrados, $x$ columnas por $y$ filas. Es un **producto**: $A = x \\cdot y$.",
    ],
    render: (beat) => {
      const trace = beat >= 1;
      const area = beat >= 3;
      return (
        <Canvas>
          <rect x={L} y={T} width={W} height={H} rx={4} fill={MANIM.green} fillOpacity={area ? 0.35 : 0.08} className="anim-t" />
          <Fade show={area}>
            {Array.from({ length: 5 }, (_, i) => (
              <line key={`v${i}`} x1={L + ((i + 1) * W) / 6} y1={T} x2={L + ((i + 1) * W) / 6} y2={B} stroke={MANIM.green} strokeOpacity={0.7} strokeWidth={1.5} />
            ))}
            {Array.from({ length: 3 }, (_, i) => (
              <line key={`h${i}`} x1={L} y1={T + ((i + 1) * H) / 4} x2={R} y2={T + ((i + 1) * H) / 4} stroke={MANIM.green} strokeOpacity={0.7} strokeWidth={1.5} />
            ))}
          </Fade>
          <WriteLine show={trace} x1={L} y1={T} x2={R} y2={T} color={MANIM.yellow} width={6} />
          <WriteLine show={trace} x1={R} y1={T} x2={R} y2={B} color={MANIM.blue} width={6} delay={250} />
          <WriteLine show={trace} x1={R} y1={B} x2={L} y2={B} color={MANIM.yellow} width={6} delay={500} />
          <WriteLine show={trace} x1={L} y1={B} x2={L} y2={T} color={MANIM.blue} width={6} delay={750} />
          <Txt x={L + W / 2} y={T - 14} size={28} color={MANIM.yellow} weight={800}>
            x
          </Txt>
          <Txt x={R + 22} y={T + H / 2 + 10} size={28} color={MANIM.blue} weight={800}>
            y
          </Txt>
          <Fade show={trace}>
            <Txt x={L + W / 2} y={B + 28} size={28} color={MANIM.yellow} weight={800}>
              x
            </Txt>
            <Txt x={L - 22} y={T + H / 2 + 10} size={28} color={MANIM.blue} weight={800}>
              y
            </Txt>
          </Fade>
          <Fade show={beat === 1} dy={8}>
            <Txt x={400} y={370} size={30} color={MANIM.ink}>
              <tspan fill={MANIM.yellow}>x</tspan> + <tspan fill={MANIM.blue}>y</tspan> + <tspan fill={MANIM.yellow}>x</tspan> + <tspan fill={MANIM.blue}>y</tspan>
            </Txt>
          </Fade>
          <Fade show={beat === 2} dy={8}>
            <Txt x={400} y={370} size={32} color={MANIM.ink}>
              P = <tspan fill={MANIM.yellow}>2x</tspan> + <tspan fill={MANIM.blue}>2y</tspan>
            </Txt>
          </Fade>
          <Fade show={area} dy={8}>
            <Txt x={400} y={370} size={32} color={MANIM.green} weight={800}>
              A = x · y
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
