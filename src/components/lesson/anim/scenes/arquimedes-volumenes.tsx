import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const R = 66;
const TOP = 100;
const BASE = TOP + 2 * R;
const XS = [170, 400, 630];
const UNIT = 30;
const FLOOR = 408;

/** Cono, esfera y cilindro del mismo radio r y altura 2r: sus volúmenes están en proporción 1 : 2 : 3. */
export function buildArquimedesVolumenes(): AnimBuild {
  const bars = [
    { x: XS[0]!, k: 1, color: MANIM.green, label: "cono" },
    { x: XS[1]!, k: 2, color: MANIM.blue, label: "esfera" },
    { x: XS[2]!, k: 3, color: MANIM.orange, label: "cilindro" },
  ];
  return {
    label: "Los volúmenes del cono, la esfera y el cilindro de igual radio y altura 2r están en proporción 1 a 2 a 3",
    beatMs: 3600,
    captions: [
      "Un **cono**, una **esfera** y un **cilindro** con el mismo radio $r$ y de altura $2r$ (el cilindro envuelve a la esfera).",
      "Sus volúmenes: cono $\\dfrac{1}{3}\\pi r^2 \\cdot 2r = \\dfrac{2}{3}\\pi r^3$; esfera $\\dfrac{4}{3}\\pi r^3$; cilindro $\\pi r^2 \\cdot 2r = 2\\pi r^3$.",
      "En unidades de $\\dfrac{2}{3}\\pi r^3$, el cono vale $1$, la esfera $2$ y el cilindro $3$: la esfera ocupa **dos tercios** del cilindro.",
      "Se cumple: **cono + esfera = cilindro**, porque $1 + 2 = 3$.",
    ],
    render: (beat) => (
      <Canvas>
        <polygon points={`${XS[0]},${TOP} ${XS[0]! - R},${BASE} ${XS[0]! + R},${BASE}`} fill={MANIM.green} fillOpacity={0.3} stroke={MANIM.green} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={XS[1]} cy={TOP + R} r={R} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={4} />
        <rect x={XS[2]! - R} y={TOP} width={2 * R} height={2 * R} fill={MANIM.orange} fillOpacity={0.3} stroke={MANIM.orange} strokeWidth={4} />
        <Txt x={XS[0]!} y={BASE + 30} size={24} color={MANIM.green}>cono</Txt>
        <Txt x={XS[1]!} y={BASE + 30} size={24} color={MANIM.blue}>esfera</Txt>
        <Txt x={XS[2]!} y={BASE + 30} size={24} color={MANIM.orange}>cilindro</Txt>
        <Fade show={beat === 0}>
          <Txt x={XS[2]! + R + 14} y={TOP + R + 8} size={22} color={MANIM.muted} anchor="start">2r</Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Txt x={XS[0]!} y={BASE + 62} size={20} color={MANIM.green}>⅔ π r³</Txt>
          <Txt x={XS[1]!} y={BASE + 62} size={20} color={MANIM.blue}>4⁄3 π r³</Txt>
          <Txt x={XS[2]!} y={BASE + 62} size={20} color={MANIM.orange}>2 π r³</Txt>
        </Fade>
        {bars.map((b) => (
          <Fade key={b.label} show={beat >= 2}>
            <rect x={b.x - 28} y={FLOOR - b.k * UNIT} width={56} height={b.k * UNIT} fill={b.color} fillOpacity={0.7} />
            <Txt x={b.x + 44} y={FLOOR - (b.k * UNIT) / 2 + 8} size={24} color={b.color} anchor="start">{b.k}</Txt>
          </Fade>
        ))}
        <Fade show={beat >= 3} dy={8}>
          <Txt x={XS[1]!} y={56} size={30} color={MANIM.yellow}>cono + esfera = cilindro</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
