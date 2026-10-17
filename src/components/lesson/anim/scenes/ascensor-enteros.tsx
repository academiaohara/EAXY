import { Canvas, Fade, Move, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { NEG, POS, signColor, tex, z, zs } from "@/components/lesson/anim/integers";

const BUILD_X = 250;
const BUILD_W = 210;

function floorName(f: number): string {
  if (f === 0) {
    return "calle";
  }
  return f > 0 ? `piso ${f}` : `sótano ${-f}`;
}

/** Ascensor: la planta es una posición fija; subir o bajar es una variación. Mismo signo, dos usos. */
export function buildAscensorEnteros(params: { a?: number; b?: number }): AnimBuild {
  const start = params.a ?? 3;
  const delta = params.b ?? -5;
  const end = start + delta;
  const fmax = Math.max(start, end, 1);
  const fmin = Math.min(start, end, -1);
  const rows = fmax - fmin + 1;
  const row = Math.min(52, 370 / rows);
  const TOP = (420 - rows * row) / 2;
  const rowY = (f: number) => TOP + (fmax - f) * row;
  const carY = (f: number) => rowY(f) + 4;
  const groundY = rowY(0) + row;
  const bottom = rowY(fmin) + row;
  const moved = delta !== 0;

  return {
    label: `Un ascensor que sube o baja ${Math.abs(delta)} plantas desde la planta ${start}: posición ${zs(start)}, variación ${zs(delta)}`,
    captions: [
      `El edificio es una **recta vertical**: la calle es el $0$, los pisos suben ($+$) y los sótanos bajan ($-$).`,
      `Tu **posición**: planta $${tex(start)}$. Un número que dice *dónde* estás.`,
      `${delta < 0 ? "Bajas" : "Subes"} **${Math.abs(delta)}** plantas: la **variación** es $${delta > 0 ? "+" : ""}${tex(delta)}$. Dice *cuánto* te mueves y en qué sentido.`,
      `Terminas en la planta $${tex(end)}$ (${floorName(end)}). Mismo signo, dos usos: **posición** y **variación**.`,
    ],
    render: (beat) => (
      <Canvas>
        {/* edificio */}
        <rect x={BUILD_X} y={TOP} width={BUILD_W} height={groundY - TOP} rx={6} fill={MANIM.panel} />
        <rect x={BUILD_X} y={groundY} width={BUILD_W} height={bottom - groundY} rx={6} fill="#3a2f28" />
        <line x1={BUILD_X - 40} y1={groundY} x2={BUILD_X + BUILD_W + 40} y2={groundY} stroke={MANIM.yellow} strokeWidth={3} strokeLinecap="round" />
        {Array.from({ length: rows }, (_, k) => fmax - k).map((f) => (
          <g key={f}>
            {f !== fmax ? <line x1={BUILD_X} y1={rowY(f)} x2={BUILD_X + BUILD_W} y2={rowY(f)} stroke={MANIM.grid} strokeWidth={1.5} /> : null}
            <Txt x={BUILD_X - 16} y={rowY(f) + row / 2 + 8} size={22} color={signColor(f)} anchor="end">
              {z(f)}
            </Txt>
            <Txt x={BUILD_X + BUILD_W + 16} y={rowY(f) + row / 2 + 7} size={17} color={MANIM.muted} anchor="start" weight={500}>
              {floorName(f)}
            </Txt>
          </g>
        ))}

        {/* ascensor */}
        <Move x={0} y={beat >= 2 && moved ? carY(end) - carY(start) : 0}>
          <rect x={BUILD_X + 55} y={carY(start)} width={BUILD_W - 110} height={row - 8} rx={5} fill={MANIM.blue} fillOpacity={0.9} stroke={MANIM.ink} strokeWidth={2} />
          <line x1={BUILD_X + BUILD_W / 2} y1={carY(start)} x2={BUILD_X + BUILD_W / 2} y2={carY(start) + row - 8} stroke={MANIM.surface} strokeWidth={2} />
        </Move>

        {/* recorrido */}
        <Fade show={beat >= 2 && moved} dy={delta < 0 ? -10 : 10}>
          <line
            x1={BUILD_X - 80}
            y1={rowY(start) + row / 2}
            x2={BUILD_X - 80}
            y2={rowY(end) + row / 2 + (delta < 0 ? -10 : 10)}
            stroke={signColor(delta)}
            strokeWidth={5}
            strokeLinecap="round"
          />
          <path
            d={`M ${BUILD_X - 92} ${rowY(end) + row / 2 + (delta < 0 ? -22 : 22)} L ${BUILD_X - 80} ${rowY(end) + row / 2 + (delta < 0 ? -6 : 6)} L ${BUILD_X - 68} ${rowY(end) + row / 2 + (delta < 0 ? -22 : 22)}`}
            fill="none"
            stroke={signColor(delta)}
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Fade>

        {/* paneles de la derecha */}
        <Fade show={beat >= 1 && beat < 3} dx={-12}>
          <rect x={600} y={90} width={170} height={90} rx={14} fill="none" stroke={signColor(start)} strokeWidth={3} />
          <Txt x={685} y={122} size={18} color={MANIM.muted} weight={500}>posición</Txt>
          <Txt x={685} y={166} size={42} color={signColor(start)}>{zs(start)}</Txt>
        </Fade>
        <Fade show={beat >= 2 && moved} dx={-12}>
          <rect x={600} y={200} width={170} height={90} rx={14} fill="none" stroke={delta < 0 ? NEG : POS} strokeWidth={3} />
          <Txt x={685} y={232} size={18} color={MANIM.muted} weight={500}>variación</Txt>
          <Txt x={685} y={276} size={42} color={delta < 0 ? NEG : POS}>{zs(delta)}</Txt>
        </Fade>
        <Fade show={beat >= 3} dx={-12}>
          <rect x={600} y={90} width={170} height={90} rx={14} fill="none" stroke={signColor(end)} strokeWidth={3} />
          <Txt x={685} y={122} size={18} color={MANIM.muted} weight={500}>posición final</Txt>
          <Txt x={685} y={166} size={42} color={signColor(end)}>{zs(end)}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
