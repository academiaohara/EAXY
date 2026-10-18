import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CX = 220;
const CY = 215;
const R = 140;

/** De dónde sale el metro: la diezmillonésima parte del cuadrante del meridiano terrestre. */
export function buildMeridianoMetro(): AnimBuild {
  const captions = [
    "En 1792 se buscó una referencia que no dependiera de nadie: **la Tierra**. Se midió el **meridiano**, la vuelta completa pasando por los polos.",
    "El meridiano terrestre mide unos **40 000 km**.",
    "Un cuarto del meridiano, del polo al ecuador, es el **cuadrante**: $40\\,000 : 4 = 10\\,000$ km $= 10\\,000\\,000$ m.",
    "El **metro** se definió como la **diezmillonésima parte** del cuadrante: se divide en $10\\,000\\,000$ partes iguales y cada una es 1 m.",
  ];
  return {
    label: "El metro es la diezmillonésima parte del cuadrante del meridiano terrestre",
    captions,
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        <circle cx={CX} cy={CY} r={R} fill={MANIM.panel} stroke={beat >= 1 ? MANIM.blue : MANIM.grid} strokeWidth={beat >= 1 ? 5 : 3} className="anim-t" />
        {/* paralelos y polos */}
        <ellipse cx={CX} cy={CY} rx={R} ry={36} fill="none" stroke={MANIM.grid} strokeWidth={2} />
        <ellipse cx={CX} cy={CY} rx={R} ry={90} fill="none" stroke={MANIM.grid} strokeWidth={1.5} strokeDasharray="5 6" />
        <line x1={CX} y1={CY - R - 14} x2={CX} y2={CY + R + 14} stroke={MANIM.grid} strokeWidth={2} />
        <Txt x={CX} y={CY - R - 22} size={18} color={MANIM.muted} weight={500}>
          polo norte
        </Txt>
        <Txt x={CX + R + 12} y={CY + 6} size={18} color={MANIM.muted} weight={500} anchor="start">
          ecuador
        </Txt>
        {/* cuadrante */}
        <Fade show={beat >= 2}>
          <path d={`M ${CX} ${CY - R} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`} fill="none" stroke={MANIM.yellow} strokeWidth={9} strokeLinecap="round" />
        </Fade>
        {/* marcas de las 10 000 000 partes */}
        <Fade show={beat >= 3}>
          {Array.from({ length: 14 }, (_, i) => {
            const a = (i / 13) * (Math.PI / 2);
            const x = CX + Math.sin(a) * R;
            const y = CY - Math.cos(a) * R;
            return <line key={i} x1={x} y1={y} x2={x + Math.sin(a) * 16} y2={y - Math.cos(a) * 16} stroke={MANIM.ink} strokeWidth={2.5} strokeLinecap="round" />;
          })}
        </Fade>
        {/* panel derecho */}
        <Fade show={beat >= 1} dx={14}>
          <Txt x={500} y={120} size={20} color={MANIM.blue} anchor="start">
            meridiano
          </Txt>
          <Txt x={500} y={156} size={36} color={MANIM.blue} anchor="start">
            40 000 km
          </Txt>
        </Fade>
        <Fade show={beat >= 2} dx={14}>
          <Txt x={500} y={212} size={20} color={MANIM.yellow} anchor="start">
            cuadrante (÷ 4)
          </Txt>
          <Txt x={500} y={248} size={36} color={MANIM.yellow} anchor="start">
            10 000 000 m
          </Txt>
        </Fade>
        <Fade show={beat >= 3} dx={14}>
          <Txt x={500} y={304} size={20} color={MANIM.green} anchor="start">
            cada parte (÷ 10 000 000)
          </Txt>
          <Txt x={500} y={340} size={36} color={MANIM.green} anchor="start">
            = 1 metro
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
