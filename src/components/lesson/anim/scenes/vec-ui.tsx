/** Flecha SVG (segmento con cabeza triangular) en coordenadas de lienzo. */
export function Arrow({ x1, y1, x2, y2, color, width = 5, head = 16, dash }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number; head?: number; dash?: string }) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const bx = x2 - head * Math.cos(ang);
  const by = y2 - head * Math.sin(ang);
  const w = head * 0.55;
  const px = -Math.sin(ang) * w;
  const py = Math.cos(ang) * w;
  return (
    <g>
      <line x1={x1} y1={y1} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} />
      <polygon points={`${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}`} fill={color} />
    </g>
  );
}
