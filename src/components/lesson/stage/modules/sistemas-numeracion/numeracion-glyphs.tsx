import { AMBER, BLUE, INK, MUTED, TEAL, VIOLET } from "./numeracion-shared";

export function StickGlyph({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <line x1={0} y1={-10} x2={0} y2={10} stroke={INK} strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

export function HandGlyph({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <path
        d="M0 8 L0 -2 M-6 4 L-6 -6 M6 4 L6 -6 M-3 6 L-3 -4 M3 6 L3 -4"
        fill="none"
        stroke={TEAL}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      <path d="M-8 8 Q0 14 8 8" fill="none" stroke={TEAL} strokeWidth={1.5} />
    </g>
  );
}

export function PersonGlyph({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <circle cx={0} cy={-12} r={5} fill="none" stroke={BLUE} strokeWidth={1.5} />
      <path d="M0 -7 L0 8 M-8 0 L8 0 M0 8 L-6 18 M0 8 L6 18" fill="none" stroke={BLUE} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

export function ShepherdGlyph({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx={0} cy={-14} r={5} fill="none" stroke={INK} strokeWidth={1.5} />
      <path d="M0 -9 L0 6 M-7 0 L7 0 M0 6 L-5 16 M0 6 L5 16" fill="none" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
      <path d="M10 -4 Q18 -8 22 0" fill="none" stroke={MUTED} strokeWidth={1.2} />
    </g>
  );
}

export function GoatGlyph({ x, y, missing }: { x: number; y: number; missing?: boolean }) {
  const stroke = missing ? "#f87171" : INK;
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={0} cy={4} rx={10} ry={6} fill="none" stroke={stroke} strokeWidth={1.4} />
      <circle cx={8} cy={-2} r={4} fill="none" stroke={stroke} strokeWidth={1.4} />
      <path d="M-6 -2 L-10 -8 M-4 -2 L-6 -7" fill="none" stroke={stroke} strokeWidth={1.2} />
      <line x1={-8} y1={10} x2={-8} y2={14} stroke={stroke} strokeWidth={1.2} />
      <line x1={6} y1={10} x2={6} y2={14} stroke={stroke} strokeWidth={1.2} />
    </g>
  );
}

export function EgyptianStick({ x, y }: { x: number; y: number }) {
  return <StickGlyph x={x} y={y} scale={0.9} />;
}

export function EgyptianTen({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M-8 0 Q0 -6 8 0 Q0 6 -8 0" fill="none" stroke={BLUE} strokeWidth={1.6} />
    </g>
  );
}

export function EgyptianHundred({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M-10 -4 L10 -4 M-10 4 L10 4 M0 -8 L0 8" fill="none" stroke={VIOLET} strokeWidth={1.4} />
    </g>
  );
}

export function EgyptianThousand({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path
        d="M0 -10 C-8 -6 -8 2 0 6 C8 2 8 -6 0 -10 M-6 8 L6 8"
        fill="none"
        stroke={AMBER}
        strokeWidth={1.4}
      />
    </g>
  );
}

export function RomanLetter({
  letter,
  x,
  y,
  highlight,
  small,
}: {
  letter: string;
  x: number;
  y: number;
  highlight?: "suma" | "resta" | "cursor";
  small?: boolean;
}) {
  const fill =
    highlight === "resta" ? TEAL : highlight === "suma" ? AMBER : highlight === "cursor" ? VIOLET : INK;
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={fill}
      fontSize={small ? 18 : 22}
      fontFamily="ui-serif, Georgia, serif"
      fontWeight={600}
    >
      {letter}
    </text>
  );
}
