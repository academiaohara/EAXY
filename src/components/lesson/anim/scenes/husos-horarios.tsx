import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 40;
const W = 720;
const Y = 150;
const H = 70;
const lonX = (lon: number) => X0 + ((lon + 180) / 360) * W;

/** Husos horarios: cada 15° de longitud es una hora (Bilbao 12 h → Estambul 14 h, Monterrey 5 h). */
export function buildHusosHorarios(): AnimBuild {
  return {
    label: "Husos horarios: 15° de longitud equivalen a una hora",
    captions: [
      "La Tierra gira $360^\\circ$ en $24$ h: cada huso horario abarca $\\dfrac{360^\\circ}{24} = 15^\\circ$ de longitud. El huso $0$ está centrado en el meridiano de Greenwich.",
      "Estambul está en $29^\\circ$ E: dos husos al **este** de Bilbao. Hacia el este es más tarde: **$+2$ h**, las $14$ h.",
      "Monterrey está en $100^\\circ$ O: $\\dfrac{100}{15} \\approx 7$ husos al **oeste**. Hacia el oeste es más pronto: **$-7$ h**, las $5$ h.",
    ],
    render: (beat) => (
      <Canvas>
        {Array.from({ length: 24 }, (_, i) => {
          const lon0 = -187.5 + i * 15;
          const x = lonX(lon0);
          return (
            <rect key={i} x={x} y={Y} width={W / 24} height={H} fill={i === 12 ? MANIM.yellow : MANIM.panel} fillOpacity={i === 12 ? 0.6 : 1} stroke={MANIM.grid} strokeWidth={1.5} />
          );
        })}
        {[-150, -90, -30, 0, 30, 90, 150].map((lon) => (
          <Txt key={lon} x={lonX(lon)} y={Y + H + 28} size={18} color={MANIM.muted}>{lon === 0 ? "0°" : `${Math.abs(lon)}° ${lon < 0 ? "O" : "E"}`}</Txt>
        ))}
        <Txt x={lonX(0)} y={Y - 20} size={22} color={MANIM.yellow}>12 h (Bilbao)</Txt>
        <Fade show={beat === 1}>
          <circle cx={lonX(29)} cy={Y + H / 2} r={9} fill={MANIM.green} />
          <Txt x={lonX(29) + 30} y={Y + H + 70} size={24} color={MANIM.green}>Estambul: +2 h → 14 h</Txt>
          <line x1={lonX(0)} y1={Y + H + 42} x2={lonX(30)} y2={Y + H + 42} stroke={MANIM.green} strokeWidth={4} />
        </Fade>
        <Fade show={beat === 2}>
          <circle cx={lonX(-100)} cy={Y + H / 2} r={9} fill={MANIM.orange} />
          <Txt x={lonX(-100)} y={Y + H + 90} size={24} color={MANIM.orange}>Monterrey: −7 h → 5 h</Txt>
          <line x1={lonX(-105)} y1={Y + H + 52} x2={lonX(0)} y2={Y + H + 52} stroke={MANIM.orange} strokeWidth={4} />
        </Fade>
      </Canvas>
    ),
  };
}
