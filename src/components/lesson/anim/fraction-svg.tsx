import { Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";

type FracProps = {
  x: number;
  /** Ordenada de la raya de fracción. */
  y: number;
  n: number | string;
  d: number | string;
  size?: number;
  color?: string;
};

/** Fracción apilada (numerador, raya y denominador) centrada en `x`. */
export function Frac({ x, y, n, d, size = 32, color = MANIM.ink }: FracProps) {
  const chars = Math.max(String(n).length, String(d).length);
  const half = chars * size * 0.34 + 8;
  return (
    <g>
      <Txt x={x} y={y - size * 0.3} size={size} color={color}>
        {String(n)}
      </Txt>
      <line x1={x - half} x2={x + half} y1={y} y2={y} stroke={color} strokeWidth={Math.max(2, size / 12)} strokeLinecap="round" />
      <Txt x={x} y={y + size * 0.95} size={size} color={color}>
        {String(d)}
      </Txt>
    </g>
  );
}

type BarProps = {
  x: number;
  y: number;
  /** Ancho de una unidad. */
  unitW: number;
  h: number;
  /** Número de unidades que se dibujan (más de una para fracciones mayores que 1). */
  units?: number;
  /** Partes en que se divide cada unidad. */
  den: number;
  /** Partes coloreadas, contadas desde la izquierda. */
  shaded: number;
  color: string;
  /** Parte inicial coloreada con otro tono (p. ej. lo que se quita en una resta). */
  skip?: number;
  skipColor?: string;
  /** Dibuja solo los trozos coloreados, sin el resto de la barra. */
  trim?: boolean;
};

/** Barra partida en `den` partes iguales por unidad, con las primeras `shaded` coloreadas. */
export function FractionBar({ x, y, unitW, h, units = 1, den, shaded, color, skip = 0, skipColor = MANIM.red, trim = false }: BarProps) {
  const cell = unitW / den;
  const total = trim ? shaded : den * units;
  const cells = [];
  for (let i = 0; i < total; i += 1) {
    const filled = i < shaded;
    const removed = i >= shaded - skip && i < shaded && skip > 0;
    cells.push(
      <rect
        key={i}
        x={x + i * cell}
        y={y}
        width={cell}
        height={h}
        fill={removed ? skipColor : filled ? color : "transparent"}
        fillOpacity={removed ? 0.5 : 0.5}
        stroke={MANIM.muted}
        strokeOpacity={0.55}
        strokeWidth={1.5}
      />,
    );
  }
  const unitLines = [];
  for (let u = 0; u <= units; u += 1) {
    unitLines.push(<line key={u} x1={x + u * unitW} x2={x + u * unitW} y1={y - 6} y2={y + h + 6} stroke={MANIM.ink} strokeWidth={3.5} strokeLinecap="round" />);
  }
  return (
    <g>
      {cells}
      <rect x={x} y={y} width={trim ? cell * total : unitW * units} height={h} fill="none" stroke={MANIM.ink} strokeWidth={3} rx={3} />
      {trim ? null : unitLines}
    </g>
  );
}

type SubdivProps = {
  show: boolean;
  x: number;
  y: number;
  unitW: number;
  h: number;
  units?: number;
  /** Partes totales por unidad tras subdividir. */
  parts: number;
  /** Partes por unidad que ya estaban dibujadas (esas rayas no se repiten). */
  existing: number;
  color?: string;
};

/** Rayas nuevas con las que se corta cada parte de una barra en trozos más pequeños. */
export function Subdivision({ show, x, y, unitW, h, units = 1, parts, existing, color = MANIM.yellow }: SubdivProps) {
  const lines = [];
  for (let i = 1; i < parts * units; i += 1) {
    if ((i * existing) % parts === 0) {
      continue;
    }
    lines.push(
      <line key={i} x1={x + (i * unitW) / parts} x2={x + (i * unitW) / parts} y1={y} y2={y + h} stroke={color} strokeWidth={1.6} strokeOpacity={0.75} strokeLinecap="round" />,
    );
  }
  return <Fade show={show}>{lines}</Fade>;
}

type OpProps = {
  /** Centro del signo. Con `y` en la ordenada de la raya de fracción queda alineado con ella. */
  x: number;
  y: number;
  kind: "+" | "-" | "·" | ":" | "=";
  size?: number;
  color?: string;
};

/** Signo dibujado con formas (no con texto): su centro es exactamente (x, y). */
export function Op({ x, y, kind, size = 40, color = MANIM.ink }: OpProps) {
  const sw = Math.max(2.5, size * 0.085);
  const r = size * 0.085;
  const hw = size * 0.24;
  const line = (cy: number, key: string) => <line key={key} x1={x - hw} x2={x + hw} y1={cy} y2={cy} stroke={color} strokeWidth={sw} strokeLinecap="round" />;
  return (
    <g>
      {kind === "·" ? <circle cx={x} cy={y} r={r * 1.15} fill={color} /> : null}
      {kind === ":" ? (
        <>
          <circle cx={x} cy={y - size * 0.2} r={r * 1.15} fill={color} />
          <circle cx={x} cy={y + size * 0.2} r={r * 1.15} fill={color} />
        </>
      ) : null}
      {kind === "-" ? line(y, "m") : null}
      {kind === "+" ? (
        <>
          {line(y, "h")}
          <line x1={x} x2={x} y1={y - hw} y2={y + hw} stroke={color} strokeWidth={sw} strokeLinecap="round" />
        </>
      ) : null}
      {kind === "=" ? (
        <>
          {line(y - size * 0.1, "a")}
          {line(y + size * 0.1, "b")}
        </>
      ) : null}
    </g>
  );
}

/** Ancho que ocupa una `Frac` del tamaño dado. */
export function fracWidth(n: number | string, d: number | string, size = 32): number {
  return (Math.max(String(n).length, String(d).length) * size * 0.34 + 8) * 2;
}

/** Centros de elementos de ancho dado, colocados de izquierda a derecha con un hueco fijo y centrados en `cx`. */
export function placeRow(widths: number[], gap: number, cx = 400): number[] {
  const total = widths.reduce((acc, w) => acc + w, 0) + gap * Math.max(0, widths.length - 1);
  let at = cx - total / 2;
  return widths.map((w) => {
    const c = at + w / 2;
    at += w + gap;
    return c;
  });
}
