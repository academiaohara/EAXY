import { Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";

/** Fracción apilada (numerador, raya, denominador) centrada en `x`. `y` es la raya. */
export function Frac({
  x,
  y,
  n,
  d,
  size = 40,
  color = MANIM.ink,
  nColor,
  dColor,
}: {
  x: number;
  y: number;
  n: number | string;
  d: number | string;
  size?: number;
  color?: string;
  nColor?: string;
  dColor?: string;
}) {
  const w = Math.max(String(n).length, String(d).length) * size * 0.62 + size * 0.5;
  return (
    <g>
      <Txt x={x} y={y - size * 0.28} size={size} color={nColor ?? color}>
        {n}
      </Txt>
      <line x1={x - w / 2} y1={y} x2={x + w / 2} y2={y} stroke={color} strokeWidth={Math.max(2, size / 14)} strokeLinecap="round" />
      <Txt x={x} y={y + size * 0.88} size={size} color={dColor ?? color}>
        {d}
      </Txt>
    </g>
  );
}

/** Sector circular `i` de `d` (empieza arriba y sigue en sentido horario). */
export function sectorPath(cx: number, cy: number, r: number, i: number, d: number): string {
  const a0 = -Math.PI / 2 + (2 * Math.PI * i) / d;
  const a1 = -Math.PI / 2 + (2 * Math.PI * (i + 1)) / d;
  const p = (a: number) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
  return `M ${cx} ${cy} L ${p(a0)} A ${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)} Z`;
}

/** Número con coma decimal y como mucho `max` decimales, sin ceros finales. */
export function decEs(v: number, max = 3): string {
  return v.toFixed(max).replace(/0+$/, "").replace(/\.$/, "").replace(".", ",");
}
