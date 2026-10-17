import { Canvas, Fade, HBrace, Txt, VBrace, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 190;
const Y0 = 160;
const H = 190;
const W_TOTAL = 420;
/** Separación entre los dos rectángulos antes de juntarlos. */
const GAP = 80;

/** Propiedad distributiva con áreas: dos rectángulos con el mismo alto se juntan en uno. */
export function buildAreaDistributiva(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = params.a ?? 15;
  const b = params.b ?? 4;
  const c = params.c ?? 3;
  const wb = (b / (b + c)) * W_TOTAL;
  const wc = W_TOTAL - wb;
  const ab = a * b;
  const ac = a * c;

  return {
    label: `${a} · ${b} y ${a} · ${c} comparten el factor ${a} y se juntan en ${a} · (${b} + ${c}) = ${ab + ac}, con áreas de rectángulos`,
    captions: [
      `Dos cálculos por separado: $${a} \\cdot ${b}$ y $${a} \\cdot ${c}$. Los dos rectángulos tienen el mismo alto, **${a}**.`,
      `Como comparten el **factor común ${a}**, podemos pegar los rectángulos en uno solo.`,
      `El rectángulo grande mide **${a}** de alto y **${b} + ${c}** de ancho: su área es $${a} \\cdot (${b} + ${c})$.`,
      `Es el mismo área, así que $${a} \\cdot ${b} + ${a} \\cdot ${c} = ${a} \\cdot (${b} + ${c}) = ${ab + ac}$.`,
    ],
    render: (beat) => {
      const apart = beat === 0;
      const dxL = apart ? -GAP / 2 : 0;
      const dxR = apart ? GAP / 2 : 0;
      return (
        <Canvas>
          {/* trozo izquierdo */}
          <g className="anim-t" style={{ transform: `translate(${dxL}px, 0px)` }}>
            <rect x={X0} y={Y0} width={wb} height={H} rx={6} fill={MANIM.blue} fillOpacity={0.45} stroke={MANIM.ink} strokeWidth={3} />
            <Txt x={X0 + wb / 2} y={Y0 + H / 2 - 4} size={26} color={MANIM.ink}>
              {`${a} · ${b}`}
            </Txt>
            <Fade show scale={0.8}>
              <Txt x={X0 + wb / 2} y={Y0 + H / 2 + 32} size={32} color={MANIM.blue}>
                {String(ab)}
              </Txt>
            </Fade>
          </g>
          {/* trozo derecho */}
          <g className="anim-t" style={{ transform: `translate(${dxR}px, 0px)` }}>
            <rect x={X0 + wb} y={Y0} width={wc} height={H} rx={6} fill={MANIM.green} fillOpacity={0.45} stroke={MANIM.ink} strokeWidth={3} />
            <Txt x={X0 + wb + wc / 2} y={Y0 + H / 2 - 4} size={26} color={MANIM.ink}>
              {`${a} · ${c}`}
            </Txt>
            <Fade show scale={0.8}>
              <Txt x={X0 + wb + wc / 2} y={Y0 + H / 2 + 32} size={32} color={MANIM.green}>
                {String(ac)}
              </Txt>
            </Fade>
          </g>
          {/* unión: línea amarilla que marca por dónde se pegaron */}
          <WriteLine show={beat >= 1} x1={X0 + wb} y1={Y0 - 6} x2={X0 + wb} y2={Y0 + H + 6} color={MANIM.yellow} width={4} />
          {/* alturas: una por rectángulo mientras están separados, una sola al juntarlos */}
          <Fade show={apart} dx={-6}>
            <VBrace show x={X0 - 14 - GAP / 2} y1={Y0} y2={Y0 + H} dir="left" color={MANIM.orange} label={String(a)} />
          </Fade>
          <Fade show={!apart} dx={-6}>
            <VBrace show x={X0 - 14} y1={Y0} y2={Y0 + H} dir="left" color={MANIM.orange} label={String(a)} />
          </Fade>
          {/* factor común */}
          <Fade show={beat === 1} dy={-6}>
            <Txt x={400} y={398} size={26} color={MANIM.orange}>
              {`factor común: ${a}`}
            </Txt>
          </Fade>
          {/* anchuras */}
          <g className="anim-t" style={{ transform: `translate(${dxL}px, 0px)` }}>
            <HBrace show x1={X0} x2={X0 + wb - 4} y={Y0 - 20} dir="up" color={MANIM.blue} label={String(b)} />
          </g>
          <g className="anim-t" style={{ transform: `translate(${dxR}px, 0px)` }}>
            <HBrace show x1={X0 + wb + 4} x2={X0 + W_TOTAL} y={Y0 - 20} dir="up" color={MANIM.green} label={String(c)} delay={150} />
          </g>
          <HBrace show={beat === 2} x1={X0} x2={X0 + W_TOTAL} y={Y0 - 84} dir="up" color={MANIM.yellow} label={`${b} + ${c}`} />
          <Fade show={beat === 2} dy={10}>
            <Txt x={400} y={398} size={30} color={MANIM.yellow}>
              {`${a} · (${b} + ${c})`}
            </Txt>
          </Fade>
          <Fade show={beat >= 3} dy={10}>
            <Txt x={400} y={398} size={30} color={MANIM.yellow}>
              {`${ab} + ${ac} = ${a} · (${b} + ${c}) = ${ab + ac}`}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
