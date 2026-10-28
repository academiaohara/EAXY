import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const NA: [number, number] = [220, 210];
const CL: [number, number] = [580, 210];

/** Un electrón pasa del sodio al cloro y los iones resultantes se atraen. */
export function buildEnlaceIonico(): AnimBuild {
  const moved = (b: number) => b >= 2;
  const close = (b: number) => b >= 4;
  return {
    label: "Enlace iónico: el sodio cede un electrón al cloro",
    beatMs: 5400,
    captions: [
      "El **sodio** (2 – 8 – 1) tiene **1 electrón** en la última capa; el **cloro** (2 – 8 – 7) tiene **7**.",
      "Al sodio le **sobra** un electrón para quedarse con la capa llena; al cloro le **falta** uno.",
      "El sodio **cede** su electrón de valencia al cloro.",
      "El sodio queda con carga **+1** (**Na⁺**) y el cloro con carga **−1** (**Cl⁻**): son **iones**.",
      "Las cargas **opuestas se atraen**: ese es el **enlace iónico**, que forma el **cloruro de sodio** (NaCl).",
    ],
    render: (beat) => {
      const dx = close(beat) ? 85 : 0;
      const na: [number, number] = [NA[0] + dx, NA[1]];
      const cl: [number, number] = [CL[0] - dx, CL[1]];
      const e: [number, number] = moved(beat) ? [cl[0] - 70, cl[1] - 40] : [na[0] + 70, na[1] - 40];
      return (
        <Canvas>
          <circle cx={na[0]} cy={na[1]} r={70} fill="none" stroke={MANIM.purple} strokeWidth={3} />
          <circle cx={na[0]} cy={na[1]} r={14} fill={MANIM.purple} />
          <circle cx={cl[0]} cy={cl[1]} r={85} fill="none" stroke={MANIM.green} strokeWidth={3} />
          <circle cx={cl[0]} cy={cl[1]} r={14} fill={MANIM.green} />
          <Txt x={na[0]} y={na[1] + 110} size={26} color={MANIM.purple}>{beat >= 3 ? "Na⁺" : "Na"}</Txt>
          <Txt x={cl[0]} y={cl[1] + 125} size={26} color={MANIM.green}>{beat >= 3 ? "Cl⁻" : "Cl"}</Txt>
          <circle cx={e[0]} cy={e[1]} r={10} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} />
          <Fade show={beat === 2}>
            <Txt x={400} y={110} size={22} color={MANIM.yellow}>e⁻ →</Txt>
          </Fade>
          <Fade show={beat >= 4}>
            <Txt x={400} y={60} size={24} color={MANIM.orange}>NaCl: atracción entre cargas opuestas</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
