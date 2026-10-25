import { Canvas, Fade, Txt, quadArrowHead } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmtEs } from "@/components/lesson/anim/arith";
import { cosD, exactTrig, piFrac, quadrant, reference, sinD, tanD, toRad } from "@/components/lesson/anim/trig";

const CX = 400;
const CY = 215;

const clampInt = (v: number | undefined, d: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(v) ? (v as number) : d)));

const tex = (n: number, dec = 3) => fmtEs(n, dec).replace(",", "{,}");

/** Arco de circunferencia desde `from` hasta `to` (grados, sentido antihorario) de radio `r` px. */
function arcPath(r: number, from: number, to: number): string {
  const a0 = toRad(from);
  const a1 = toRad(to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  return `M ${CX + r * Math.cos(a0)} ${CY - r * Math.sin(a0)} A ${r} ${r} 0 ${large} 0 ${CX + r * Math.cos(a1)} ${CY - r * Math.sin(a1)}`;
}

/** Un radián: el arco mide lo mismo que el radio. `a` = número de radianes que se destacan (1–6). */
export function buildRadianArco(params: { a?: number }): AnimBuild {
  const R = 140;
  const k = clampInt(params.a, 3, 1, 6);
  const rad = 180 / Math.PI;
  const P = (deg: number): [number, number] => [CX + R * Math.cos(toRad(deg)), CY - R * Math.sin(toRad(deg))];
  return {
    label: "El radián: el arco que mide lo mismo que el radio",
    captions: [
      `Una circunferencia de radio $r$. Su longitud es $2\\pi r$: caben **$2\\pi \\approx 6{,}28$ radios** a lo largo de la circunferencia.`,
      `Llevamos un trozo de cuerda de longitud $r$ sobre la circunferencia. El ángulo central que abarca es **1 radián** ($\\approx 57{,}3^\\circ$).`,
      `Con $${k}$ cuerdas seguidas el ángulo es $${k}$ rad $\\approx ${tex(k * rad, 1)}^\\circ$. En general, **$\\text{longitud del arco} = \\text{ángulo (rad)} \\cdot r$**.`,
      `Media vuelta es $\\pi$ rad y una vuelta completa, $2\\pi$ rad. Por eso $180^\\circ = \\pi$ rad y $360^\\circ = 2\\pi$ rad.`,
    ],
    beatMs: 4800,
    render: (beat) => (
      <Canvas>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={MANIM.grid} strokeWidth={3} />
        <line x1={CX - R - 20} y1={CY} x2={CX + R + 20} y2={CY} stroke={MANIM.muted} strokeWidth={1.5} />
        <line x1={CX} y1={CY - R - 20} x2={CX} y2={CY + R + 20} stroke={MANIM.muted} strokeWidth={1.5} />
        <line x1={CX} y1={CY} x2={P(0)[0]} y2={P(0)[1]} stroke={MANIM.blue} strokeWidth={4} />
        <Txt x={CX + R / 2} y={CY + 26} size={22} color={MANIM.blue}>r</Txt>
        <Fade show={beat === 1 || beat === 2}>
          <path d={arcPath(R, 0, rad)} fill="none" stroke={MANIM.orange} strokeWidth={7} />
          <line x1={CX} y1={CY} x2={P(rad)[0]} y2={P(rad)[1]} stroke={MANIM.orange} strokeWidth={3} />
          <path d={arcPath(36, 0, rad)} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={CX + 56} y={CY - 18} size={22} color={MANIM.yellow} anchor="start">1 rad</Txt>
        </Fade>
        <Fade show={beat === 2}>
          {Array.from({ length: k }, (_, i) => (
            <path key={i} d={arcPath(R + 14 + (i % 2) * 8, i * rad, Math.min((i + 1) * rad, 359.9))} fill="none" stroke={i % 2 ? MANIM.green : MANIM.orange} strokeWidth={5} />
          ))}
          <Txt x={CX} y={CY + R + 52} size={26} color={MANIM.yellow}>{`${k} rad ≈ ${fmtEs(k * rad, 1)}°`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <path d={arcPath(R + 12, 0, 180)} fill="none" stroke={MANIM.green} strokeWidth={6} />
          <path d={arcPath(R + 12, 180, 359.9)} fill="none" stroke={MANIM.orange} strokeWidth={6} />
          <Txt x={CX} y={CY - R - 30} size={26} color={MANIM.green}>180° = π rad</Txt>
          <Txt x={CX} y={CY + R + 56} size={26} color={MANIM.orange}>360° = 2π rad</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Circunferencia goniométrica: seno, coseno y tangente de un ángulo cualquiera. `a` = ángulo en grados. */
export function buildCirculoGoniometrico(params: { a?: number }): AnimBuild {
  const R = 150;
  const th = clampInt(params.a, 150, 0, 359);
  const c = cosD(th);
  const s = sinD(th);
  const t = tanD(th);
  const q = quadrant(th);
  const ref = reference(th);
  const Px = CX + R * c;
  const Py = CY - R * s;
  const exS = exactTrig("sen", th);
  const exC = exactTrig("cos", th);
  return {
    label: `Seno, coseno y tangente de ${th}° en la circunferencia goniométrica`,
    captions: [
      `En la circunferencia de **radio 1**, el ángulo $${th}^\\circ$ (${piFrac(th)} rad) se mide desde el semieje positivo, en sentido antihorario. Apunta al punto $P$.`,
      `Las coordenadas de $P$ son $(\\cos\\theta,\\ \\sin\\theta)$: $\\cos ${th}^\\circ = ${tex(c)}$ (abscisa) y $\\sin ${th}^\\circ = ${tex(s)}$ (ordenada).`,
      q === 0
        ? `El punto está sobre un eje: uno de los valores es $0$ y el otro $\\pm 1$.`
        : `Está en el **cuadrante ${q}**: seno ${s > 0 ? "positivo" : "negativo"} y coseno ${c > 0 ? "positivo" : "negativo"}. Sus valores absolutos son los del ángulo agudo de referencia, $${ref}^\\circ$.`,
      t === null
        ? `La tangente no existe en $${th}^\\circ$: la recta del ángulo es paralela a la recta $x = 1$ y no la corta.`
        : `La **tangente** es la altura en la recta $x = 1$: $\\tan ${th}^\\circ = \\dfrac{\\sin\\theta}{\\cos\\theta} = ${tex(t)}$.`,
    ],
    beatMs: 5000,
    render: (beat) => (
      <Canvas>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={MANIM.grid} strokeWidth={2.5} />
        <line x1={CX - R - 40} y1={CY} x2={CX + R + 60} y2={CY} stroke={MANIM.ink} strokeWidth={2} />
        <line x1={CX} y1={CY + R + 20} x2={CX} y2={CY - R - 20} stroke={MANIM.ink} strokeWidth={2} />
        <Txt x={CX + R + 14} y={CY + 24} size={18} color={MANIM.muted}>1</Txt>
        <Txt x={CX - R - 14} y={CY + 24} size={18} color={MANIM.muted}>−1</Txt>
        {[1, 2, 3, 4].map((k) => (
          <Txt key={k} x={CX + (k === 1 || k === 4 ? 1 : -1) * (R + 30)} y={CY + (k <= 2 ? -1 : 1) * (R * 0.7)} size={18} color={MANIM.muted}>{["I", "II", "III", "IV"][k - 1]}</Txt>
        ))}
        <path d={arcPath(34, 0, th)} fill="none" stroke={MANIM.yellow} strokeWidth={3.5} />
        <line x1={CX} y1={CY} x2={Px} y2={Py} stroke={MANIM.blue} strokeWidth={4} />
        <circle cx={Px} cy={Py} r={7} fill={MANIM.blue} />
        <Txt x={Px + (c >= 0 ? 14 : -14)} y={Py + (s >= 0 ? -12 : 24)} size={22} color={MANIM.blue} anchor={c >= 0 ? "start" : "end"}>P</Txt>
        <Txt x={CX + 50} y={CY - 10} size={20} color={MANIM.yellow} anchor="start">{`${th}°`}</Txt>
        <Fade show={beat >= 1}>
          <line x1={Px} y1={Py} x2={Px} y2={CY} stroke={MANIM.orange} strokeWidth={4} />
          <line x1={CX} y1={CY} x2={Px} y2={CY} stroke={MANIM.green} strokeWidth={5} />
          <Txt x={(CX + Px) / 2} y={CY + (s >= 0 ? 24 : -12)} size={20} color={MANIM.green}>{`cos = ${fmtEs(c, 3)}`}</Txt>
          <Txt x={Px + (c >= 0 ? 12 : -12)} y={(Py + CY) / 2} size={20} color={MANIM.orange} anchor={c >= 0 ? "start" : "end"}>{`sen = ${fmtEs(s, 3)}`}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={CX} y={36} size={24} color={MANIM.yellow}>{q === 0 ? "sobre un eje" : `cuadrante ${q}: ángulo de referencia ${ref}°`}</Txt>
          {exS && exC ? <Txt x={CX} y={64} size={22} color={MANIM.muted}>{`sen ${th}° = ${exS}    cos ${th}° = ${exC}`}</Txt> : null}
        </Fade>
        <Fade show={beat >= 3}>
          <line x1={CX + R} y1={CY + 140} x2={CX + R} y2={CY - 140} stroke={MANIM.purple} strokeWidth={2.5} strokeDasharray="6 6" />
          {t !== null && Math.abs(t) < 2.4 ? (
            <g>
              <line x1={CX} y1={CY} x2={CX + R} y2={CY - R * t} stroke={MANIM.purple} strokeWidth={2.5} />
              <line x1={CX + R} y1={CY} x2={CX + R} y2={CY - R * t} stroke={MANIM.purple} strokeWidth={6} />
              <polygon points={quadArrowHead(CX + R, CY, CX + R, CY - R * t, 12)} fill={MANIM.purple} />
            </g>
          ) : null}
          <Txt x={CX + R + 12} y={CY + 160} size={20} color={MANIM.purple} anchor="start">x = 1</Txt>
          <Txt x={CX + R + 50} y={CY - (t !== null ? clampPx(R * t) : 0)} size={20} color={MANIM.purple} anchor="start">{t === null ? "tg: no existe" : `tg = ${fmtEs(t, 3)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

const clampPx = (v: number) => Math.max(-150, Math.min(150, v));
