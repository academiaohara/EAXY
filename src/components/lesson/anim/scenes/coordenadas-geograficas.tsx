import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const K = 2.2; // px por grado
const CX = 400;
const CY = 215;
const gx = (lon: number) => CX + lon * K;
const gy = (lat: number) => CY - lat * K;

/** Latitud y longitud sobre un planisferio: Jerez (37° N, 6° O) y su antípoda Auckland (37° S, 174° E). */
export function buildCoordenadasGeograficas(): AnimBuild {
  return {
    label: "Latitud y longitud: Jerez de la Frontera y Auckland son antípodas",
    captions: [
      "El **ecuador** (latitud $0^\\circ$) y el **meridiano de Greenwich** (longitud $0^\\circ$) son las referencias.",
      "**Latitud:** ángulo hasta el ecuador, de $0^\\circ$ a $90^\\circ$ al norte o al sur. Jerez: $37^\\circ$ N.",
      "**Longitud:** ángulo hasta Greenwich, de $0^\\circ$ a $180^\\circ$ al este o al oeste. Jerez: $6^\\circ$ O.",
      "Auckland: $37^\\circ$ S y $174^\\circ$ E. La latitud es opuesta y $174^\\circ + 6^\\circ = 180^\\circ$: son **antípodas**.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={gx(-180)} y={gy(90)} width={360 * K} height={180 * K} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={2} />
        {[-60, -30, 30, 60].map((lat) => (
          <line key={lat} x1={gx(-180)} y1={gy(lat)} x2={gx(180)} y2={gy(lat)} stroke={MANIM.grid} strokeWidth={1} />
        ))}
        {[-120, -60, 60, 120].map((lon) => (
          <line key={lon} x1={gx(lon)} y1={gy(-90)} x2={gx(lon)} y2={gy(90)} stroke={MANIM.grid} strokeWidth={1} />
        ))}
        <line x1={gx(-180)} y1={gy(0)} x2={gx(180)} y2={gy(0)} stroke={MANIM.yellow} strokeWidth={3} />
        <line x1={gx(0)} y1={gy(-90)} x2={gx(0)} y2={gy(90)} stroke={MANIM.blue} strokeWidth={3} />
        <Txt x={gx(180) - 6} y={gy(0) - 8} size={18} color={MANIM.yellow} anchor="end">ecuador</Txt>
        <Txt x={gx(0) + 8} y={gy(90) + 20} size={18} color={MANIM.blue} anchor="start">Greenwich</Txt>
        <Fade show={beat >= 1}>
          <line x1={gx(-6)} y1={gy(0)} x2={gx(-6)} y2={gy(37)} stroke={MANIM.green} strokeWidth={4} />
          <Txt x={gx(-6) - 10} y={gy(18)} size={20} color={MANIM.green} anchor="end">37° N</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={gx(0)} y1={gy(37)} x2={gx(-6)} y2={gy(37)} stroke={MANIM.orange} strokeWidth={4} />
          <Txt x={gx(-6) - 10} y={gy(37) - 10} size={20} color={MANIM.orange} anchor="end">6° O</Txt>
        </Fade>
        <circle cx={gx(-6)} cy={gy(37)} r={8} fill={MANIM.red} stroke={MANIM.surface} strokeWidth={3} />
        <Txt x={gx(-6) - 20} y={gy(37) - 30} size={20} color={MANIM.red} anchor="end">Jerez</Txt>
        <Fade show={beat >= 3} scale={0.4}>
          <circle cx={gx(174)} cy={gy(-37)} r={8} fill={MANIM.purple} stroke={MANIM.surface} strokeWidth={3} />
          <Txt x={gx(174) - 12} y={gy(-37) + 28} size={20} color={MANIM.purple} anchor="end">Auckland (37° S, 174° E)</Txt>
          <line x1={gx(-6)} y1={gy(37)} x2={gx(174)} y2={gy(-37)} stroke={MANIM.purple} strokeWidth={2} strokeDasharray="6 6" />
        </Fade>
      </Canvas>
    ),
  };
}
