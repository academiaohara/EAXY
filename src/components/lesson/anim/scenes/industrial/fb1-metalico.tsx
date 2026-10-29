import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const COLS = 6;
const ROWS = 4;
const SP = 70;
const X0 = 220;
const Y0 = 110;

/** Enlace metálico: cationes en un mar de electrones deslocalizados; conductividad y maleabilidad frente al cristal iónico. */
export function buildMarElectrones(): AnimBuild {
  return {
    label: "Enlace metálico: cationes y mar de electrones",
    beatMs: 5600,
    captions: [
      "En un **metal**, los átomos ceden sus electrones de valencia y quedan como **cationes** ordenados en una red.",
      "Los electrones de valencia no pertenecen a ningún átomo: forman un **mar de electrones deslocalizados** que mantiene unida la red.",
      "Al aplicar una **diferencia de potencial**, los electrones se mueven en bloque: el metal **conduce la electricidad** (y el calor).",
      "Si se **golpea**, una capa de cationes se desliza sobre otra y el mar de electrones sigue envolviéndolos: el metal es **maleable y dúctil**, no se rompe.",
      "En un **cristal iónico** ocurre lo contrario: al desplazarse una capa, se enfrentan iones de **igual carga**, se repelen y el cristal **se rompe** (frágil).",
    ],
    render: (beat) => {
      const desl = beat === 3 ? 35 : 0;
      const cat = [];
      for (let r = 0; r < ROWS; r += 1) for (let c = 0; c < COLS; c += 1) cat.push([X0 + c * SP + (r === 1 ? desl : 0) + (r === 2 ? desl : 0), Y0 + r * SP] as const);
      const electrones = Array.from({ length: 30 }, (_, k) => [X0 - 20 + ((k * 0.618034) % 1) * COLS * SP, Y0 - 30 + ((k * 0.7548776) % 1) * ROWS * SP] as const);
      if (beat === 4) {
        const iones = [];
        for (let r = 0; r < 3; r += 1) for (let c = 0; c < 6; c += 1) iones.push([X0 + c * 60 + (r === 1 ? 30 : 0), Y0 + 20 + r * 70, (r + c + (r === 1 ? 1 : 0)) % 2 === 0] as const);
        return (
          <Canvas>
            {iones.map(([x, y, pos], k) => <circle key={k} cx={x} cy={y} r={pos ? 18 : 25} fill={pos ? MANIM.red : MANIM.blue} fillOpacity={0.7} stroke={MANIM.ink} strokeWidth={1.5} />)}
            <Txt x={400} y={52} size={20} color={MANIM.red}>cristal iónico: iguales cargas enfrentadas → repulsión → fractura</Txt>
            <line x1={X0 - 30} y1={Y0 + 55} x2={X0 + 400} y2={Y0 + 55} stroke={MANIM.yellow} strokeWidth={4} strokeDasharray="8 6" />
          </Canvas>
        );
      }
      return (
        <Canvas>
          <Fade show={beat >= 1}>
            <rect x={X0 - 40} y={Y0 - 45} width={COLS * SP + 40} height={ROWS * SP + 10} rx={24} fill={MANIM.yellow} fillOpacity={0.12} />
            {electrones.map(([x, y], k) => <circle key={k} cx={x + (beat === 2 ? 30 : 0)} cy={y} r={4} fill={MANIM.yellow} />)}
          </Fade>
          {cat.map(([x, y], k) => <circle key={k} cx={x} cy={y} r={18} fill={MANIM.red} fillOpacity={0.75} stroke={MANIM.ink} strokeWidth={1.5} />)}
          <Fade show={beat === 2}>
            <line x1={X0 - 110} y1={Y0 + 110} x2={X0 - 30} y2={Y0 + 110} stroke={MANIM.green} strokeWidth={4} />
            <Txt x={X0 - 70} y={Y0 + 96} size={18} color={MANIM.green}>e⁻ →</Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Txt x={400} y={52} size={20} color={MANIM.green}>los cationes se deslizan y el enlace se mantiene</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
