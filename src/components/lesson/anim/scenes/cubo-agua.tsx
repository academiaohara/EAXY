import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const FX = 60;
const FY = 160;
const S = 140;
const D = 46;

function Cube({ x, y, s, d, water, grid }: { x: number; y: number; s: number; d: number; water: boolean; grid?: number }) {
  const front = `${x},${y} ${x + s},${y} ${x + s},${y + s} ${x},${y + s}`;
  const top = `${x},${y} ${x + d},${y - d} ${x + s + d},${y - d} ${x + s},${y}`;
  const right = `${x + s},${y} ${x + s + d},${y - d} ${x + s + d},${y + s - d} ${x + s},${y + s}`;
  const fill = water ? MANIM.blue : "none";
  const op = water ? 0.4 : 0;
  const lines: number[] = grid ? Array.from({ length: grid - 1 }, (_, i) => (i + 1) / grid) : [];
  return (
    <g>
      <polygon points={front} fill={fill} fillOpacity={op} className="anim-t" />
      <polygon points={top} fill={fill} fillOpacity={op + 0.12} className="anim-t" />
      <polygon points={right} fill={fill} fillOpacity={op - 0.1} className="anim-t" />
      {lines.map((t) => (
        <g key={t} stroke={MANIM.ink} strokeOpacity={0.35} strokeWidth={1.2}>
          <line x1={x + s * t} y1={y} x2={x + s * t} y2={y + s} />
          <line x1={x} y1={y + s * t} x2={x + s} y2={y + s * t} />
        </g>
      ))}
      {[front, top, right].map((p, i) => (
        <polygon key={i} points={p} fill="none" stroke={MANIM.ink} strokeWidth={3} strokeLinejoin="round" />
      ))}
    </g>
  );
}

/** Un cubo de 1 dm de arista: es 1 dm³ = 1 litro, y el agua que cabe pesa 1 kg. */
export function buildCuboAgua(): AnimBuild {
  const captions = [
    "Un cubo de **1 dm de arista** tiene un volumen de $1\\ \\mathrm{dm}^3$.",
    "Ese cubo tiene una **capacidad** de exactamente **1 litro**: de ahí sale el litro.",
    "Lleno de agua, **pesa 1 kg**. Las tres unidades quedan unidas por el agua.",
    "El cubo se divide en $10 \\cdot 10 \\cdot 10 = 1\\,000$ cubitos de $1\\ \\mathrm{cm}^3$. Un cubito de agua pesa **1 gramo**; mil cubitos, $1\\,000$ g $= 1$ kg.",
  ];
  return {
    label: "Un cubo de 1 dm de arista: 1 litro de capacidad, 1 kg de agua, 1000 cm³",
    captions,
    beatMs: 4000,
    render: (beat) => (
      <Canvas>
        <Cube x={FX} y={FY} s={S} d={D} water={beat >= 2} grid={beat >= 3 ? 10 : undefined} />
        <Txt x={FX + S / 2} y={FY + S + 30} size={22} color={MANIM.yellow}>
          1 dm
        </Txt>
        <Txt x={FX + S + D + 12} y={FY + S / 2 - D / 2 + 6} size={22} color={MANIM.yellow} anchor="start">
          1 dm
        </Txt>
        <Txt x={FX + D + S / 2} y={FY - D - 12} size={22} color={MANIM.yellow}>
          1 dm
        </Txt>

        {/* litro */}
        <Fade show={beat >= 1 && beat < 3} dx={-10}>
          <Txt x={310} y={246} size={44} color={MANIM.ink}>
            =
          </Txt>
          <path d="M 372 126 h 36 v 24 q 18 14 18 40 v 70 q 0 20 -18 20 h -36 q -18 0 -18 -20 v -70 q 0 -26 18 -40 z" fill={beat >= 2 ? MANIM.blue : "none"} fillOpacity={0.4} stroke={MANIM.ink} strokeWidth={3} strokeLinejoin="round" className="anim-t" />
          <rect x={376} y={112} width={28} height={14} rx={3} fill="none" stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={390} y={328} size={32} color={MANIM.green}>
            1 litro
          </Txt>
        </Fade>

        {/* kilo */}
        <Fade show={beat === 2} dx={-10}>
          <Txt x={480} y={246} size={44} color={MANIM.ink}>
            =
          </Txt>
          <rect x={540} y={250} width={190} height={18} rx={6} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={3} />
          <rect x={560} y={268} width={150} height={44} rx={8} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={3} />
          <rect x={606} y={278} width={58} height={22} rx={4} fill="none" stroke={MANIM.green} strokeWidth={2.5} />
          <Txt x={635} y={296} size={17} color={MANIM.green}>
            1 kg
          </Txt>
          <polygon points="618,246 652,246 646,226 624,226" fill={MANIM.blue} fillOpacity={0.45} stroke={MANIM.ink} strokeWidth={2.5} />
          <Txt x={635} y={348} size={28} color={MANIM.green}>
            1 kilogramo
          </Txt>
        </Fade>

        {/* cubitos */}
        <Fade show={beat >= 3} dx={14}>
          <g transform="translate(470 120)">
            <Cube x={0} y={50} s={46} d={16} water grid={1} />
            <Txt x={34} y={150} size={22} color={MANIM.yellow}>
              1 cm³
            </Txt>
            <Txt x={34} y={184} size={30} color={MANIM.green}>
              = 1 gramo
            </Txt>
          </g>
          <Txt x={640} y={206} size={26} color={MANIM.ink} anchor="start">
            ×1 000
          </Txt>
          <Txt x={640} y={246} size={26} color={MANIM.ink} anchor="start">
            1 000 g
          </Txt>
          <Txt x={640} y={286} size={30} color={MANIM.green} anchor="start">
            = 1 kg
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
