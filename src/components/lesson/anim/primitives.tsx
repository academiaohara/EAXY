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
  const h = 12 * s;
  const d = [
    `M ${x1} ${y}`,
    `Q ${x1} ${y + h} ${x1 + 14} ${y + h}`,
    `L ${mid - 14} ${y + h}`,
    `Q ${mid} ${y + h} ${mid} ${y + h * 1.9}`,
    `Q ${mid} ${y + h} ${mid + 14} ${y + h}`,
    `L ${x2 - 14} ${y + h}`,
    `Q ${x2} ${y + h} ${x2} ${y}`,
  ].join(" ");
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
