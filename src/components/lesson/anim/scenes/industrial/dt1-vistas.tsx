import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Seg, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Tres vistas de una pieza en el sistema europeo (método E) ───────────── */

const A = 200; // largo
const B = 110; // ancho
const C1 = 50; // altura de la base
const C2 = 70; // altura del bloque superior
const A2 = 90; // largo del bloque superior
const H = C1 + C2;
const GAP = 40;
const X0 = 130;
const Y0 = 70 + H; // base del alzado
const alz = (x: number, z: number): Pt => [X0 + x, Y0 - z];
const pla = (x: number, y: number): Pt => [X0 + x, Y0 + GAP + y];
const per = (y: number, z: number): Pt => [X0 + A + GAP + (B - y), Y0 - z];
const pts = (a: Pt[]) => a.map((p) => p.join(",")).join(" ");

export function buildVistasPieza(): AnimBuild {
  return {
    label: "Vistas de una pieza en el sistema europeo: alzado, planta y perfil izquierdo",
    beatMs: 5400,
    captions: [
      "Se elige el **alzado** (vista frontal): la cara que **mejor define** la forma de la pieza y la posición en que se usa o fabrica.",
      "La **planta** (vista superior) se dibuja **debajo** del alzado, alineada con él: el **ancho** de las dos vistas es el mismo.",
      "El **perfil izquierdo** (vista desde la izquierda) se dibuja a la **derecha** del alzado, alineado con él en altura.",
      "Las **líneas de proyección** (finas) relacionan las vistas. La arista que **no se ve** desde la izquierda se dibuja **discontinua**.",
    ],
    render: (beat) => (
      <Canvas>
        <polygon points={pts([alz(0, 0), alz(A, 0), alz(A, C1), alz(A2, C1), alz(A2, H), alz(0, H)])} fill={MANIM.blue} fillOpacity={0.22} stroke={MANIM.ink} strokeWidth={3.5} strokeLinejoin="round" />
        <Txt x={X0 + A / 2} y={Y0 + 20} size={18} color={MANIM.blue}>Alzado</Txt>
        <Fade show={beat >= 1}>
          <polygon points={pts([pla(0, 0), pla(A, 0), pla(A, B), pla(0, B)])} fill={MANIM.green} fillOpacity={0.22} stroke={MANIM.ink} strokeWidth={3.5} strokeLinejoin="round" />
          <Seg a={pla(A2, 0)} b={pla(A2, B)} color={MANIM.ink} width={2.5} />
          <Txt x={X0 + A / 2} y={Y0 + GAP + B + 22} size={18} color={MANIM.green}>Planta</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <polygon points={pts([per(0, 0), per(B, 0), per(B, H), per(0, H)])} fill={MANIM.orange} fillOpacity={0.22} stroke={MANIM.ink} strokeWidth={3.5} strokeLinejoin="round" />
          <Txt x={X0 + A + GAP + B / 2} y={Y0 + 20} size={18} color={MANIM.orange}>Perfil izquierdo</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Seg a={alz(A2, 0)} b={pla(A2, 0)} color={MANIM.muted} width={1.2} dashed />
          <Seg a={alz(A, 0)} b={pla(A, 0)} color={MANIM.muted} width={1.2} dashed />
          <Seg a={alz(A, H)} b={per(B, H)} color={MANIM.muted} width={1.2} dashed />
          <Seg a={alz(A, C1)} b={per(B, C1)} color={MANIM.muted} width={1.2} dashed />
          <Seg a={per(0, C1)} b={per(B, C1)} color={MANIM.yellow} width={3} dashed />
          <Txt x={X0 + A + GAP + B + 6} y={Y0 - C1 + 5} size={16} color={MANIM.yellow} anchor="start">oculta</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
