import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const E_MIN = -10;
const E_MAX = 16;
const X0 = 34;
const X1 = 766;
const AXIS_Y = 215;
const xe = (e: number) => X0 + ((e - E_MIN) / (E_MAX - E_MIN)) * (X1 - X0);

type Mark = { e: number; sym: string; desc: string; up: boolean; group: 0 | 1 | 2; anchor?: "start" | "middle" | "end" };

const MARKS: Mark[] = [
  { e: 0, sym: "1 m", desc: "una persona", up: true, group: 0 },
  { e: -3, sym: "1 mm", desc: "milímetro", up: false, group: 0 },
  { e: -6, sym: "1 µm", desc: "bacterias", up: true, group: 1 },
  { e: -9, sym: "1 nm", desc: "moléculas", up: false, group: 1 },
  { e: -10, sym: "1 Å", desc: "átomos", up: true, group: 1, anchor: "start" },
  { e: 3, sym: "1 km", desc: "kilómetro", up: false, group: 2 },
  { e: 11.18, sym: "1 UA", desc: "Tierra – Sol", up: true, group: 2 },
  { e: 15.98, sym: "1 a. l.", desc: "estrellas y galaxias", up: false, group: 2, anchor: "end" },
];

/** Eje de longitudes en escala de potencias de 10: de los átomos a las galaxias. */
export function buildEscalaLongitudes(): AnimBuild {
  const captions = [
    "Cada marca del eje multiplica la longitud por **10**. El metro es la medida de lo cotidiano.",
    "Hacia la izquierda, lo **muy pequeño**: la **micra** ($0{,}001$ mm), el **nanómetro** ($0{,}000001$ mm) y el **ángstrom** ($0{,}0000001$ mm, el tamaño de un átomo).",
    "Hacia la derecha, lo **muy grande**: la **unidad astronómica** ($\\approx 150$ millones de km, Tierra–Sol) y el **año luz** ($\\approx 9{,}5$ billones de km).",
  ];
  return {
    label: "Eje de longitudes de los átomos a las galaxias con la micra, el nanómetro, el ángstrom, la UA y el año luz",
    captions,
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <line x1={X0} y1={AXIS_Y} x2={X1} y2={AXIS_Y} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
        {Array.from({ length: E_MAX - E_MIN + 1 }, (_, i) => {
          const e = E_MIN + i;
          return <line key={e} x1={xe(e)} y1={AXIS_Y - 7} x2={xe(e)} y2={AXIS_Y + 7} stroke={MANIM.muted} strokeWidth={2} />;
        })}
        <Txt x={400} y={256 + 130} size={18} color={MANIM.muted} weight={500}>
          cada marca es 10 veces mayor que la anterior
        </Txt>
        {MARKS.map((m) => {
          const shown = beat >= m.group;
          const x = xe(m.e);
          const ly = m.up ? AXIS_Y - 70 : AXIS_Y + 82;
          const color = m.group === 1 ? MANIM.orange : m.group === 2 ? MANIM.blue : MANIM.yellow;
          const a = m.anchor ?? "middle";
          const tx = a === "start" ? x - 6 : a === "end" ? x + 6 : x;
          return (
            <Fade key={m.sym} show={shown} dy={m.up ? 10 : -10}>
              <line x1={x} y1={AXIS_Y} x2={x} y2={m.up ? ly + 32 : ly - 26} stroke={color} strokeWidth={2.5} strokeDasharray="4 4" />
              <circle cx={x} cy={AXIS_Y} r={7} fill={color} />
              <Txt x={tx} y={ly} size={24} color={color} anchor={a}>
                {m.sym}
              </Txt>
              <Txt x={tx} y={ly + 22} size={16} color={MANIM.muted} weight={500} anchor={a}>
                {m.desc}
              </Txt>
            </Fade>
          );
        })}
      </Canvas>
    ),
  };
}
