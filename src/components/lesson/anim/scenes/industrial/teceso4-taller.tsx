import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Flujo de fabricación digital ───────────── */

const FASES = ["CAD", "CAM", "máquina", "medida"];
const COL = [MANIM.blue, MANIM.purple, MANIM.orange, MANIM.green];

export function buildFlujoDigital(): AnimBuild {
  return {
    label: "Flujo de fabricación digital: CAD, CAM, máquina y medida",
    beatMs: 5400,
    captions: [
      "En **CAD** se diseña el modelo digital de la pieza con sus medidas y tolerancias.",
      "En **CAM** se eligen la herramienta y las trayectorias y se genera el programa de la máquina (**código G** o archivo de impresión).",
      "La **máquina** (fresadora CNC, impresora 3D, cortadora láser) ejecuta el programa y fabrica la pieza.",
      "Se **mide** la pieza con calibre o micrómetro y se **compara con el modelo**: si no cumple, se corrige el diseño o los parámetros y se repite.",
    ],
    render: (beat) => (
      <Canvas>
        {FASES.map((f, i) => {
          const x = 40 + i * 190;
          const on = i === beat;
          return (
            <g key={f}>
              <rect x={x} y={140} width={150} height={80} rx={10} fill={COL[i]} fillOpacity={on ? 0.6 : i < beat ? 0.25 : 0.08} stroke={COL[i]} strokeWidth={on ? 5 : 2} className="anim-t" />
              <Txt x={x + 75} y={180} size={24} color={MANIM.ink}>
                {f}
              </Txt>
              {i < 3 ? <path d={`M ${x + 154} 180 L ${x + 186} 180`} stroke={i < beat ? MANIM.green : MANIM.muted} strokeWidth={4} /> : null}
            </g>
          );
        })}
        <Fade show={beat === 1}>
          <Txt x={400} y={110} size={20} color={MANIM.purple}>
            G1 X10 Y20 F300 …
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <path d="M 705 225 C 705 320 115 320 115 225" fill="none" stroke={MANIM.green} strokeWidth={5} strokeDasharray="8 6" />
          <Txt x={410} y={350} size={22} color={MANIM.green}>
            si no cumple, se corrige y se repite
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
