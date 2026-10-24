import { Canvas, Fade, Txt, quadArrowHead } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmtEs } from "@/components/lesson/anim/arith";
import { angleBetween, dot, norm, projScalar } from "@/components/lesson/anim/geo";

const CX = 400;
const CY = 215;
const clampInt = (v: number | undefined, d: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(v) ? (v as number) : d)));
const tex = (n: number, dec = 2) => fmtEs(n, dec).replace(",", "{,}");

function Arrow({ x1, y1, x2, y2, color, width = 4 }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={quadArrowHead(x1, y1, x2, y2, 13)} fill={color} />
    </g>
  );
}

/**
 * Producto escalar como «sombra»: proyección de u sobre v.
 * `nums`: `[ux, uy, vx, vy]` (enteros en [−6, 6], v no nulo).
 */
export function buildProyeccionVector(params: { nums?: number[] }): AnimBuild {
  const n = params.nums && params.nums.length >= 4 ? params.nums : [4, 3, 5, 0];
  const u = { x: clampInt(n[0], 4, -6, 6), y: clampInt(n[1], 3, -6, 6) };
  let v = { x: clampInt(n[2], 5, -6, 6), y: clampInt(n[3], 0, -6, 6) };
  if (v.x === 0 && v.y === 0) v = { x: 5, y: 0 };
  const sc = 28;
  const P = (p: { x: number; y: number }): [number, number] => [CX + p.x * sc, CY - p.y * sc];
  const d = dot(u, v);
  const nv = norm(v);
  const proj = projScalar(u, v)!;
  const ang = angleBetween(u, v);
  const unit = { x: v.x / nv, y: v.y / nv };
  const foot = { x: unit.x * proj, y: unit.y * proj };
  return {
    label: "El producto escalar como proyección de un vector sobre otro",
    captions: [
      `Dos vectores desde el origen: $\\vec{u} = (${u.x}, ${u.y})$ y $\\vec{v} = (${v.x}, ${v.y})$.`,
      `La **sombra** de $\\vec{u}$ sobre la recta de $\\vec{v}$ es su proyección. Su longitud (con signo) es $\\dfrac{\\vec{u}\\cdot\\vec{v}}{|\\vec{v}|} = ${tex(proj)}$.`,
      `Producto escalar: $\\vec{u}\\cdot\\vec{v} = ${u.x}\\cdot ${v.x < 0 ? `(${v.x})` : v.x} + ${u.y < 0 ? `(${u.y})` : u.y}\\cdot ${v.y < 0 ? `(${v.y})` : v.y} = ${tex(d, 0)}$.`,
      ang === null ? `Alguno de los vectores es nulo.` : `También $\\vec{u}\\cdot\\vec{v} = |\\vec{u}|\\,|\\vec{v}|\\cos\\theta$, y de ahí el ángulo: $\\theta = ${tex(ang, 1)}^\\circ$. Si el producto es $0$, los vectores son **perpendiculares**.`,
    ],
    beatMs: 4800,
    render: (beat) => (
      <Canvas>
        <line x1={20} y1={CY} x2={780} y2={CY} stroke={MANIM.grid} strokeWidth={1.5} />
        <line x1={CX} y1={10} x2={CX} y2={410} stroke={MANIM.grid} strokeWidth={1.5} />
        <line x1={CX - unit.x * 340} y1={CY + unit.y * 340} x2={CX + unit.x * 340} y2={CY - unit.y * 340} stroke={MANIM.orange} strokeWidth={1.5} strokeDasharray="6 6" opacity={0.6} />
        <Arrow x1={CX} y1={CY} x2={P(v)[0]} y2={P(v)[1]} color={MANIM.orange} />
        <Txt x={P(v)[0] + 10} y={P(v)[1] - 10} size={22} color={MANIM.orange} anchor="start">{`v = (${v.x}, ${v.y})`}</Txt>
        <Arrow x1={CX} y1={CY} x2={P(u)[0]} y2={P(u)[1]} color={MANIM.blue} />
        <Txt x={P(u)[0] + 10} y={P(u)[1] - 10} size={22} color={MANIM.blue} anchor="start">{`u = (${u.x}, ${u.y})`}</Txt>
        <Fade show={beat >= 1}>
          <line x1={P(u)[0]} y1={P(u)[1]} x2={P(foot)[0]} y2={P(foot)[1]} stroke={MANIM.green} strokeWidth={2.5} strokeDasharray="6 5" />
          <line x1={CX} y1={CY} x2={P(foot)[0]} y2={P(foot)[1]} stroke={MANIM.green} strokeWidth={7} opacity={0.85} />
          <Txt x={P(foot)[0]} y={P(foot)[1] + 36} size={20} color={MANIM.green}>{`proy = ${fmtEs(proj, 2)}`}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={400} y={40} size={28} color={MANIM.yellow}>{`u · v = ${fmtEs(d, 0)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={400} y={400} size={24} color={MANIM.muted}>{ang === null ? "" : `θ = ${fmtEs(ang, 1)}°   ·   ${Math.abs(d) < 1e-9 ? "perpendiculares" : d > 0 ? "ángulo agudo" : "ángulo obtuso"}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
