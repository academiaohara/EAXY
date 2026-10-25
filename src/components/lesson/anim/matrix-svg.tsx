import { MANIM } from "@/components/lesson/anim/palette";
import { Txt } from "@/components/lesson/anim/primitives";
import { qShow, type Mat } from "@/components/lesson/anim/matrices";

type MatrixSvgProps = {
  /** Texto de cada celda (ya formateado). */
  cells: string[][];
  /** Esquina superior izquierda. */
  x: number;
  y: number;
  cw?: number;
  ch?: number;
  size?: number;
  color?: string;
  bracket?: string;
  /** Color de texto por celda. */
  tint?: (i: number, j: number) => string | undefined;
  /** Fondo resaltado por celda. */
  fill?: (i: number, j: number) => string | undefined;
  /** Línea vertical de separación tras esta columna (matriz ampliada). */
  split?: number;
};

export const cellsOf = (m: Mat): string[][] => m.map((r) => r.map((x) => qShow(x)));
export const numCells = (m: number[][]): string[][] => m.map((r) => r.map((x) => String(x).replace("-", "−")));

export const matWidth = (cols: number, cw = 56) => cols * cw;
export const matHeight = (rows: number, ch = 44) => rows * ch;

/** Matriz dibujada con corchetes, columnas alineadas y celdas que se pueden resaltar. */
export function MatrixSvg({ cells, x, y, cw = 56, ch = 44, size = 26, color = MANIM.ink, bracket = MANIM.muted, tint, fill, split }: MatrixSvgProps) {
  const m = cells.length;
  const n = cells[0]?.length ?? 0;
  const w = n * cw;
  const h = m * ch;
  const pad = 8;
  return (
    <g>
      {fill
        ? cells.map((r, i) =>
            r.map((_, j) => {
              const f = fill(i, j);
              return f ? <rect key={`f${i}-${j}`} x={x + j * cw + 2} y={y + i * ch + 2} width={cw - 4} height={ch - 4} rx={8} fill={f} fillOpacity={0.28} stroke={f} strokeWidth={2} /> : null;
            }),
          )
        : null}
      <path d={`M ${x - pad + 8} ${y - 4} H ${x - pad} V ${y + h + 4} H ${x - pad + 8}`} fill="none" stroke={bracket} strokeWidth={3} strokeLinecap="round" />
      <path d={`M ${x + w + pad - 8} ${y - 4} H ${x + w + pad} V ${y + h + 4} H ${x + w + pad - 8}`} fill="none" stroke={bracket} strokeWidth={3} strokeLinecap="round" />
      {split !== undefined ? <line x1={x + split * cw} y1={y - 4} x2={x + split * cw} y2={y + h + 4} stroke={bracket} strokeWidth={2} strokeDasharray="6 5" /> : null}
      {cells.map((r, i) =>
        r.map((t, j) => (
          <Txt key={`${i}-${j}`} x={x + j * cw + cw / 2} y={y + i * ch + ch / 2 + size * 0.35} size={t.length > 4 ? size * 0.8 : size} color={tint?.(i, j) ?? color}>
            {t}
          </Txt>
        )),
      )}
    </g>
  );
}
