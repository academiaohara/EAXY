import type { CSSProperties, ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";

type FadeProps = {
  show: boolean;
  /** Desplazamiento inicial (px del lienzo) desde el que entra / hacia el que sale. */
  dx?: number;
  dy?: number;
  scale?: number;
  /** Retardo en ms (escalonar elementos de un mismo paso). */
  delay?: number;
  children: ReactNode;
  className?: string;
};

/** Aparece / desaparece con fundido y pequeño desplazamiento (FadeIn / FadeOut de Manim). */
export function Fade({ show, dx = 0, dy = 0, scale = 1, delay = 0, children, className }: FadeProps) {
  const style: CSSProperties = {
    opacity: show ? 1 : 0,
    transform: show ? "translate(0px, 0px) scale(1)" : `translate(${dx}px, ${dy}px) scale(${scale})`,
    transitionDelay: `${show ? delay : 0}ms`,
    transformBox: "fill-box",
    transformOrigin: "center",
    pointerEvents: "none",
  };
  return (
    <g className={`anim-t ${className ?? ""}`} style={style}>
      {children}
    </g>
  );
}

type MoveProps = {
  x: number;
  y: number;
  delay?: number;
  children: ReactNode;
};

/** Desplaza un grupo con transición suave (animación `.animate.shift`). */
export function Move({ x, y, delay = 0, children }: MoveProps) {
  return (
    <g
      className="anim-t"
      style={{ transform: `translate(${x}px, ${y}px)`, transitionDelay: `${delay}ms` }}
    >
      {children}
    </g>
  );
}

type WriteLineProps = {
  show: boolean;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  delay?: number;
  dashed?: boolean;
};

/** Línea que se «dibuja» de un extremo al otro (Create / Write). */
export function WriteLine({
  show,
  x1,
  y1,
  x2,
  y2,
  color = MANIM.ink,
  width = 3,
  delay = 0,
  dashed = false,
}: WriteLineProps) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={dashed ? undefined : 1}
      strokeDashoffset={show ? 0 : 1}
      className="anim-draw"
      style={{ transitionDelay: `${show ? delay : 0}ms`, opacity: show ? 1 : 0 }}
    />
  );
}

type TxtProps = {
  x: number;
  y: number;
  size?: number;
  color?: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  children: ReactNode;
  opacity?: number;
  mono?: boolean;
};

export function Txt({
  x,
  y,
  size = 28,
  color = MANIM.ink,
  weight = 600,
  anchor = "middle",
  children,
  opacity = 1,
  mono = false,
}: TxtProps) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fill={color}
      fontWeight={weight}
      textAnchor={anchor}
      opacity={opacity}
      style={{
        fontFamily: mono ? "var(--font-mono, ui-monospace, monospace)" : "var(--font-sans, system-ui, sans-serif)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {children}
    </text>
  );
}

type BraceProps = {
  show: boolean;
  x1: number;
  x2: number;
  y: number;
  /** `down`: llave bajo el tramo (abre hacia abajo); `up`: encima. */
  dir?: "down" | "up";
  color?: string;
  label?: ReactNode;
  labelSize?: number;
  delay?: number;
};

/** Llave curva (Béziers): `h` es el fondo del tramo recto, con signo según el lado. */
function curlyBracePath(a1: number, a2: number, base: number, h: number, vertical = false): string {
  const mid = (a1 + a2) / 2;
  const pt = (along: number, across: number) => (vertical ? `${base + across} ${along}` : `${along} ${base + across}`);
  return [
    `M ${pt(a1, 0)}`,
    `C ${pt(a1, h * 0.6)} ${pt(a1 + 4, h)} ${pt(a1 + 16, h)}`,
    `L ${pt(mid - 18, h)}`,
    `C ${pt(mid - 6, h)} ${pt(mid, h * 1.1)} ${pt(mid, h * 1.9)}`,
    `C ${pt(mid, h * 1.1)} ${pt(mid + 6, h)} ${pt(mid + 18, h)}`,
    `L ${pt(a2 - 16, h)}`,
    `C ${pt(a2 - 4, h)} ${pt(a2, h * 0.6)} ${pt(a2, 0)}`,
  ].join(" ");
}

type VBraceProps = {
  show: boolean;
  x: number;
  y1: number;
  y2: number;
  /** `left`: la punta mira a la izquierda (llave a la izquierda de la figura). */
  dir?: "left" | "right";
  color?: string;
  label?: ReactNode;
  labelSize?: number;
};

/** Llave vertical con rótulo al lado de la punta. */
export function VBrace({ show, x, y1, y2, dir = "left", color = MANIM.yellow, label, labelSize = 30 }: VBraceProps) {
  const s = dir === "left" ? -1 : 1;
  const d = curlyBracePath(y1, y2, x, 14 * s, true);
  return (
    <Fade show={show} dx={dir === "left" ? 6 : -6}>
      <path d={d} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" />
      {label !== undefined ? (
        <Txt x={x + 14 * 1.9 * s + 8 * s} y={(y1 + y2) / 2 + labelSize * 0.35} size={labelSize} color={color} anchor={dir === "left" ? "end" : "start"}>
          {label}
        </Txt>
      ) : null}
    </Fade>
  );
}

/** Llave horizontal con rótulo (`Brace` + `.get_text` de Manim). */
export function HBrace({
  show,
  x1,
  x2,
  y,
  dir = "down",
  color = MANIM.yellow,
  label,
  labelSize = 24,
  delay = 0,
}: BraceProps) {
  const s = dir === "down" ? 1 : -1;
  const mid = (x1 + x2) / 2;
  const h = 14 * s;
  const d = curlyBracePath(x1, x2, y, h);
  return (
    <Fade show={show} dy={dir === "down" ? -6 : 6} delay={delay}>
      <path d={d} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" />
      {label !== undefined ? (
        <Txt x={mid} y={y + (dir === "down" ? 50 : -34)} size={labelSize} color={color}>
          {label}
        </Txt>
      ) : null}
    </Fade>
  );
}

/**
 * Punta de flecha rellena para una curva cuadrática `M x1 y1 Q cx cy x2 y2`:
 * el vértice cae en (x2, y2) y se orienta según la tangente final (control → fin).
 */
export function quadArrowHead(cx: number, cy: number, x2: number, y2: number, size = 14): string {
  const tx = x2 - cx;
  const ty = y2 - cy;
  const len = Math.hypot(tx, ty) || 1;
  const ux = tx / len;
  const uy = ty / len;
  const bx = x2 - ux * size;
  const by = y2 - uy * size;
  const w = size * 0.5;
  return `${x2},${y2} ${bx - uy * w},${by + ux * w} ${bx + uy * w},${by - ux * w}`;
}

export const CANVAS_W = 800;
export const CANVAS_H = 420;

/** Lienzo SVG estándar de las animaciones (800 × 420). */
export function Canvas({ children, height = CANVAS_H }: { children: ReactNode; height?: number }) {
  return (
    <svg
      viewBox={`0 0 ${CANVAS_W} ${height}`}
      className="block h-auto w-full"
      aria-hidden
      focusable="false"
    >
      {children}
    </svg>
  );
}
