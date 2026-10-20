import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs } from "@/components/lesson/anim/prop";

type Face = { x: number; y: number; w: number; h: number; label: string; color: string; group: number };

/** Desarrollo de un ortoedro de aristas a, b y c: seis rectángulos, iguales de dos en dos. */
export function buildDesarrolloOrtoedro(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = params.a ?? 6;
  const b = params.b ?? 3;
  const c = params.c ?? 2;
  const u = Math.min(40, 690 / (2 * a + 2 * b), 380 / (2 * b + c));
  const x0 = (800 - (2 * a + 2 * b) * u) / 2;
  const y0 = (420 - (2 * b + c) * u) / 2;
  const row = y0 + b * u;
  const AB = a * b;
  const AC = a * c;
  const BC = b * c;
  const total = 2 * (AB + AC + BC);
  const faces: Face[] = [
    { x: x0 + b * u, y: y0, w: a * u, h: b * u, label: `${numEs(a)}·${numEs(b)}`, color: MANIM.blue, group: 1 },
    { x: x0 + b * u, y: row + c * u, w: a * u, h: b * u, label: `${numEs(a)}·${numEs(b)}`, color: MANIM.blue, group: 1 },
    { x: x0 + b * u, y: row, w: a * u, h: c * u, label: `${numEs(a)}·${numEs(c)}`, color: MANIM.green, group: 2 },
    { x: x0 + (a + 2 * b) * u, y: row, w: a * u, h: c * u, label: `${numEs(a)}·${numEs(c)}`, color: MANIM.green, group: 2 },
    { x: x0, y: row, w: b * u, h: c * u, label: `${numEs(b)}·${numEs(c)}`, color: MANIM.orange, group: 3 },
    { x: x0 + (a + b) * u, y: row, w: b * u, h: c * u, label: `${numEs(b)}·${numEs(c)}`, color: MANIM.orange, group: 3 },
  ];

  return {
    label: `Desarrollo de un ortoedro de aristas ${numEs(a)}, ${numEs(b)} y ${numEs(c)}`,
    beatMs: 3400,
    captions: [
      `Al abrir un ortoedro de aristas $${numEs(a)}$, $${numEs(b)}$ y $${numEs(c)}$ salen **seis rectángulos**.`,
      `Las dos bases miden $a \\cdot b = ${AB}$ cada una (**azul**). Hay dos en total.`,
      `Las caras de delante y detrás miden $a \\cdot c = ${AC}$ (**verde**) y las laterales, $b \\cdot c = ${BC}$ (**naranja**).`,
      `Se suman las seis: $A = 2(ab + ac + bc) = 2(${AB} + ${AC} + ${BC}) = ${total}$.`,
    ],
    render: (beat) => (
      <Canvas>
        {faces.map((f, i) => {
          const active = beat === 0 || (beat === 1 && f.group === 1) || (beat === 2 && f.group !== 1) || beat === 3;
          const visibleColor = beat === 0 ? MANIM.muted : f.color;
          return (
            <g key={i} className="anim-t" style={{ opacity: active ? 1 : 0.3 }}>
              <rect x={f.x} y={f.y} width={f.w} height={f.h} fill={visibleColor} fillOpacity={0.3} stroke={visibleColor} strokeWidth={3} />
              <Txt x={f.x + f.w / 2} y={f.y + f.h / 2 + 8} size={Math.min(26, f.w / 4)} color={visibleColor}>{beat >= 1 ? f.label : ""}</Txt>
            </g>
          );
        })}
        <Fade show={beat >= 3} dy={8}>
          <Txt x={x0 + (a + 2 * b + a / 2) * u} y={y0 + b * u * 0.55} size={26} color={MANIM.yellow}>{`A = ${numEs(total)}`}</Txt>
        </Fade>
        <Fade show={beat === 0}>
          <Txt x={x0 + (b + a / 2) * u} y={y0 - 6} size={22} color={MANIM.muted}>base</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
