import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const H = (x: number, y: number, k: string) => <circle key={k} cx={x} cy={y} r={15} fill={MANIM.blue} stroke={MANIM.surface} strokeWidth={2} />;
const O = (x: number, y: number, k: string) => <circle key={k} cx={x} cy={y} r={24} fill={MANIM.red} stroke={MANIM.surface} strokeWidth={2} />;

export function buildLavoisier(): AnimBuild {
  return {
    label: "Conservación de la masa: los átomos se reordenan en 2 H₂ + O₂ → 2 H₂O",
    beatMs: 5600,
    captions: [
      "**Reactivos**: 2 moléculas de **hidrógeno** (H₂) y 1 de **oxígeno** (O₂). En total, **4 átomos de H** y **2 átomos de O**.",
      "En la reacción se **rompen los enlaces** de los reactivos: los átomos quedan **sueltos**.",
      "Los átomos se **reordenan** y se unen de otra manera: cada átomo de oxígeno se une a **dos** de hidrógeno.",
      "**Productos**: 2 moléculas de **agua** (H₂O). Son sustancias **nuevas**, con propiedades distintas de los reactivos.",
      "Se han **conservado todos los átomos**: antes 4 H y 2 O, después 4 H y 2 O. Por eso la **masa total no cambia** (ley de Lavoisier).",
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={400} y={34} size={22} color={MANIM.orange}>Reactivos: 2 H₂ + O₂</Txt>
        <g opacity={beat >= 1 ? 0.25 : 1}>
          {H(110, 90, "a")}{H(146, 90, "b")}{H(240, 90, "c")}{H(276, 90, "d")}{O(470, 90, "e")}{O(518, 90, "f")}
        </g>
        <Fade show={beat === 1}>
          {[[150, 200], [250, 220], [350, 190], [450, 215], [560, 195], [650, 220]].map(([x, y], i) => (i < 4 ? H(x!, y!, `h${i}`) : O(x!, y!, `o${i}`)))}
          <Txt x={400} y={278} size={20} color={MANIM.yellow}>se rompen los enlaces</Txt>
        </Fade>
        <Fade show={beat === 2}>
          {[[220, 330], [200, 280], [260, 280]].map(([x, y], i) => (i === 0 ? O(x!, y!, "p0") : H(x!, y!, `p${i}`)))}
          {[[520, 330], [500, 280], [560, 280]].map(([x, y], i) => (i === 0 ? O(x!, y!, "q0") : H(x!, y!, `q${i}`)))}
          <Txt x={400} y={392} size={20} color={MANIM.yellow}>los átomos se reordenan</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={400} y={190} size={22} color={MANIM.green}>Productos: 2 H₂O</Txt>
          {[[220, 290, 190, 316, 250, 316], [520, 290, 490, 316, 550, 316]].map(([ox, oy, h1x, h1y, h2x, h2y], i) => (
            <g key={i}>
              {O(ox!, oy!, `o${i}`)}{H(h1x!, h1y!, `ha${i}`)}{H(h2x!, h2y!, `hb${i}`)}
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 4}>
          <rect x={150} y={352} width={500} height={50} rx={10} fill={MANIM.green} fillOpacity={0.18} stroke={MANIM.green} strokeWidth={2} />
          <Txt x={400} y={385} size={22} color={MANIM.green}>antes: 4 H + 2 O  =  después: 4 H + 2 O</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
