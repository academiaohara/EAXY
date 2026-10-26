import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── De la pieza a sus vistas (sistema europeo) ───────────── */

export function buildVistasEuropeo(): AnimBuild {
  const u = 44;
  // Pieza: base 3 × 2 × 1 con una torre de 2 de alto en el extremo izquierdo.
  const iso = (x: number, y: number, z: number) => [330 + (x - y) * u * 0.87, 330 - (x + y) * u * 0.5 - z * u] as const;
  const P = (pts: (readonly number[])[]) => pts.map((p) => p.join(",")).join(" ");
  const caja = (x0: number, y0: number, x1: number, y1: number, z1: number, tone: number) => {
    const top = P([iso(x0, y0, z1), iso(x1, y0, z1), iso(x1, y1, z1), iso(x0, y1, z1)].map((p) => [...p]));
    const frente = P([iso(x0, y0, z1), iso(x1, y0, z1), iso(x1, y0, 0), iso(x0, y0, 0)].map((p) => [...p]));
    const lado = P([iso(x0, y0, z1), iso(x0, y1, z1), iso(x0, y1, 0), iso(x0, y0, 0)].map((p) => [...p]));
    return (
      <g key={tone} stroke={MANIM.surface} strokeWidth={1.5}>
        <polygon points={top} fill={MANIM.surface} />
        <polygon points={frente} fill={MANIM.surface} />
        <polygon points={lado} fill={MANIM.surface} />
        <polygon points={top} fill={MANIM.green} fillOpacity={0.5} />
        <polygon points={frente} fill={MANIM.blue} fillOpacity={0.5} />
        <polygon points={lado} fill={MANIM.purple} fillOpacity={0.5} />
      </g>
    );
  };
  const v = 44; // lado de cada cubo en las vistas
  const AX = 150;
  const AY = 110;
  return {
    label: "Vistas de una pieza en el sistema europeo: alzado, planta y perfil izquierdo",
    beatMs: 5600,
    captions: [
      "Esta pieza tiene una **base** de 3 × 2 × 1 y una **torre** más alta en un extremo. En una perspectiva se ve entera, pero **no se pueden medir** todas sus caras.",
      "El **alzado** es la vista **de frente**: la silueta que se ve mirando a la pieza desde delante. Es la vista principal.",
      "La **planta** es la vista **desde arriba**. En el sistema europeo se dibuja **debajo** del alzado, alineada con él.",
      "El **perfil izquierdo** es la vista **desde la izquierda**. Se dibuja a la **derecha** del alzado, alineado en altura.",
      "Las tres vistas **alineadas** describen la pieza sin ambigüedad: las líneas de referencia mantienen las **mismas medidas** en cada vista.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          {caja(0, 0, 3, 2, 1, 0)}
          {caja(0, 0, 1, 2, 2, 1)}
        </Fade>
        <Fade show={beat >= 1}>
          {/* alzado: L de 3 anchos, torre izquierda de 2 */}
          <polygon points={P([[AX, AY], [AX + v, AY], [AX + v, AY + v], [AX + 3 * v, AY + v], [AX + 3 * v, AY + 2 * v], [AX, AY + 2 * v]].map((p) => [...p]))} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={4} />
          <line x1={AX + v} y1={AY + v} x2={AX + v} y2={AY + 2 * v} stroke={MANIM.blue} strokeWidth={2} />
          <Txt x={AX + 1.5 * v} y={AY - 14} size={22} color={MANIM.blue}>
            alzado
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <rect x={AX} y={AY + 2 * v + 40} width={3 * v} height={2 * v} fill={MANIM.green} fillOpacity={0.3} stroke={MANIM.green} strokeWidth={4} />
          <line x1={AX + v} y1={AY + 2 * v + 40} x2={AX + v} y2={AY + 4 * v + 40} stroke={MANIM.green} strokeWidth={2} />
          <Txt x={AX + 1.5 * v} y={AY + 4 * v + 70} size={22} color={MANIM.green}>
            planta
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <rect x={AX + 3 * v + 50} y={AY} width={2 * v} height={2 * v} fill={MANIM.purple} fillOpacity={0.3} stroke={MANIM.purple} strokeWidth={4} />
          <line x1={AX + 3 * v + 50} y1={AY + v} x2={AX + 5 * v + 50} y2={AY + v} stroke={MANIM.purple} strokeWidth={2} strokeDasharray="6 5" />
          <Txt x={AX + 4 * v + 50} y={AY - 14} size={22} color={MANIM.purple}>
            perfil izquierdo
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Arrow x1={60} y1={AY + v} x2={AX - 14} y2={AY + v} color={MANIM.yellow} width={4} />
          <Txt x={90} y={AY + v - 20} size={20} color={MANIM.yellow}>
            mirada
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Arrow x1={AX + 1.5 * v} y1={AY - 40} x2={AX + 1.5 * v} y2={AY + 2 * v + 26} color={MANIM.yellow} width={4} />
        </Fade>
        <Fade show={beat === 4}>
          <line x1={AX} y1={AY + 2 * v + 20} x2={AX} y2={AY + 2 * v + 40} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 4" />
          <line x1={AX + v} y1={AY + v} x2={AX + v} y2={AY + 4 * v + 40} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="5 5" />
          <line x1={AX + 3 * v} y1={AY + 1.5 * v} x2={AX + 3 * v + 50} y2={AY + 1.5 * v} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="5 5" />
          <Txt x={640} y={310} size={24} color={MANIM.yellow}>
            vistas alineadas
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
