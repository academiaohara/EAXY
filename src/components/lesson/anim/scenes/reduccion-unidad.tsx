import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

type Params = { rel?: "directa" | "inversa"; a?: number; b?: number; c?: number; titles?: string[] };

const X1 = 190;
const X2 = 470;
const Y = [110, 210, 310];

/**
 * Reducción a la unidad: de `a` ↔ `b` se baja a 1 y se sube a `c`.
 * Directa: b : a y luego · c. Inversa: b · a y luego : c.
 */
export function buildReduccionUnidad(params: Params): AnimBuild {
  const rel = params.rel ?? "directa";
  const a = params.a ?? 3;
  const b = params.b ?? 60;
  const c = params.c ?? 4;
  const [tL = "Magnitud A", tR = "Magnitud B"] = params.titles ?? [];
  const unit = rel === "directa" ? b / a : b * a;
  const res = rel === "directa" ? unit * c : unit / c;
  const op1 = rel === "directa" ? `: ${numEs(a)}` : `· ${numEs(a)}`;
  const op2 = rel === "directa" ? `· ${numEs(c)}` : `: ${numEs(c)}`;
  const t1 = rel === "directa" ? `${numTex(b)} : ${numTex(a)}` : `${numTex(b)} \\cdot ${numTex(a)}`;
  const t2 = rel === "directa" ? `${numTex(unit)} \\cdot ${numTex(c)}` : `${numTex(unit)} : ${numTex(c)}`;

  const captions = [
    `El dato: con **${numEs(a)}** de ${tL}, ${tR} vale **${numEs(b)}**. Se pregunta por **${numEs(c)}**.`,
    `Primero se baja a **1**: ${tL} pasa de ${numEs(a)} a 1 (se divide entre ${numEs(a)}).`,
    rel === "directa"
      ? `Si una se divide entre ${numEs(a)}, la otra también: $${t1} = ${numTex(unit)}$.`
      : `Si una se divide entre ${numEs(a)}, la otra se **multiplica**: $${t1} = ${numTex(unit)}$.`,
    `Ahora se sube de 1 a **${numEs(c)}**.`,
    rel === "directa"
      ? `Se multiplica por ${numEs(c)}: $${t2} = ${numTex(res)}$.`
      : `Se divide entre ${numEs(c)}: $${t2} = ${numTex(res)}$.`,
  ];

  const row = (i: number, l: string, r: string, color: string, show: boolean) => (
    <Fade key={i} show={show} dy={-10}>
      <rect x={X1 - 70} y={Y[i]! - 38} width={150} height={60} rx={8} fill={MANIM.blue} fillOpacity={0.18} stroke={MANIM.blue} strokeWidth={2} />
      <rect x={X2 - 70} y={Y[i]! - 38} width={150} height={60} rx={8} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={2} />
      <Txt x={X1 + 5} y={Y[i]! + 6} size={32} color={MANIM.blue}>{l}</Txt>
      <Txt x={X2 + 5} y={Y[i]! + 6} size={32} color={color}>{r}</Txt>
      <Txt x={(X1 + X2) / 2 + 5} y={Y[i]! + 6} size={30} color={MANIM.muted}>→</Txt>
    </Fade>
  );

  return {
    label: `Reducción a la unidad en proporcionalidad ${rel}: ${numEs(a)} → ${numEs(b)}, pasando por 1, hasta ${numEs(c)}`,
    captions,
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        <Fade show>
          <Txt x={X1 + 5} y={40} size={22} color={MANIM.blue}>{tL}</Txt>
          <Txt x={X2 + 5} y={40} size={22} color={MANIM.green}>{tR}</Txt>
        </Fade>
        {row(0, numEs(a), numEs(b), MANIM.green, true)}
        {row(1, "1", beat >= 2 ? numEs(unit) : "?", MANIM.green, beat >= 1)}
        {row(2, numEs(c), beat >= 4 ? numEs(res) : "?", MANIM.green, beat >= 3)}
        <Fade show={beat >= 1} dx={-6}>
          <path d={`M ${X1 - 100} ${Y[0]! - 6} Q ${X1 - 140} ${(Y[0]! + Y[1]!) / 2} ${X1 - 100} ${Y[1]! - 6}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={X1 - 150} y={(Y[0]! + Y[1]!) / 2 + 6} size={26} color={MANIM.yellow} anchor="end">{`: ${numEs(a)}`}</Txt>
        </Fade>
        <Fade show={beat >= 2} dx={6}>
          <path d={`M ${X2 + 100} ${Y[0]! - 6} Q ${X2 + 140} ${(Y[0]! + Y[1]!) / 2} ${X2 + 100} ${Y[1]! - 6}`} fill="none" stroke={MANIM.orange} strokeWidth={3} />
          <Txt x={X2 + 150} y={(Y[0]! + Y[1]!) / 2 + 6} size={26} color={MANIM.orange} anchor="start">{op1}</Txt>
        </Fade>
        <Fade show={beat >= 3} dx={-6}>
          <path d={`M ${X1 - 100} ${Y[1]! + 6} Q ${X1 - 140} ${(Y[1]! + Y[2]!) / 2} ${X1 - 100} ${Y[2]! + 6}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={X1 - 150} y={(Y[1]! + Y[2]!) / 2 + 6} size={26} color={MANIM.yellow} anchor="end">{`· ${numEs(c)}`}</Txt>
        </Fade>
        <Fade show={beat >= 4} dx={6}>
          <path d={`M ${X2 + 100} ${Y[1]! + 6} Q ${X2 + 140} ${(Y[1]! + Y[2]!) / 2} ${X2 + 100} ${Y[2]! + 6}`} fill="none" stroke={MANIM.orange} strokeWidth={3} />
          <Txt x={X2 + 150} y={(Y[1]! + Y[2]!) / 2 + 6} size={26} color={MANIM.orange} anchor="start">{op2}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
