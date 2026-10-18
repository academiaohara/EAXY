import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Seg, Wedge, polar, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const O: Pt = [140, 310];
const X0 = 90;
const X1 = 710;

/** Primera división resaltada, con su nombre debajo. */
function Piece({ y, color, label }: { y: number; color: string; label: string }) {
  const w = (X1 - X0) / 60;
  return (
    <g>
      <rect x={X0} y={y - 20} width={w} height={40} rx={3} fill={color} fillOpacity={0.8} />
      <line x1={X0 + w / 2} y1={y + 24} x2={X0 + w / 2} y2={y + 60} stroke={color} strokeWidth={3} />
      <Txt x={X0 + w / 2} y={y + 92} size={26} color={color}>{label}</Txt>
    </g>
  );
}

function Scale({ y, color, label, filled = 0 }: { y: number; color: string; label: string; filled?: number }) {
  const step = (X1 - X0) / 60;
  return (
    <g>
      <rect x={X0} y={y - 20} width={X1 - X0} height={40} rx={6} fill={MANIM.panel} />
      <rect x={X0} y={y - 20} width={filled * step} height={40} rx={6} fill={color} fillOpacity={0.55} className="anim-t" />
      {Array.from({ length: 61 }, (_, i) => (
        <line key={i} x1={X0 + i * step} y1={y - (i % 10 === 0 ? 20 : i % 5 === 0 ? 14 : 8)} x2={X0 + i * step} y2={y + (i % 10 === 0 ? 20 : i % 5 === 0 ? 14 : 8)} stroke={MANIM.ink} strokeWidth={i % 10 === 0 ? 2.5 : 1.2} />
      ))}
      <Txt x={X0 - 8} y={y + 48} size={22} color={MANIM.muted} anchor="start">0</Txt>
      <Txt x={X1 + 8} y={y + 48} size={22} color={MANIM.muted} anchor="end">{label}</Txt>
    </g>
  );
}

/** El grado se divide en 60 minutos y el minuto en 60 segundos; 37° 40′ es 37° más 40/60 de grado. */
export function buildGradoMinuto(): AnimBuild {
  return {
    label: "Un ángulo recto de 90 grados; el grado se divide en 60 minutos y el minuto en 60 segundos",
    captions: [
      "Un ángulo recto se divide en $90$ partes iguales: cada una es **un grado**, $1^\\circ$.",
      "Para medir con más precisión, el grado se divide en $60$ partes: **minutos**. $1^\\circ = 60'$.",
      "Y el minuto, en $60$ partes más: **segundos**. $1' = 60''$.",
      "$37^\\circ\\,40'$ es $37$ grados más $\\dfrac{40}{60}$ de grado: **menos de 38° pero más de 37°**.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <Wedge c={O} r={240} a0={0} a1={90} color={MANIM.blue} opacity={0.15} />
          {Array.from({ length: 91 }, (_, d) => {
            const a = polar(O, 240, d);
            const b = polar(O, d % 10 === 0 ? 205 : d % 5 === 0 ? 220 : 230, d);
            return <line key={d} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={MANIM.ink} strokeWidth={d % 10 === 0 ? 2.5 : 1} />;
          })}
          <Seg a={O} b={polar(O, 250, 0)} width={4} />
          <Seg a={O} b={polar(O, 250, 90)} width={4} />
          <Wedge c={O} r={240} a0={0} a1={1} color={MANIM.yellow} opacity={0.8} />
          <Txt x={430} y={O[1] - 110} size={30} color={MANIM.yellow} anchor="start">1° = 1/90 de recto</Txt>
          <Txt x={430} y={O[1] - 70} size={24} color={MANIM.muted} anchor="start">90 partes en un recto</Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Scale y={190} color={MANIM.yellow} label="1°" />
          <Txt x={400} y={110} size={34} color={MANIM.yellow}>1° = 60′</Txt>
          <Piece color={MANIM.green} y={190} label="1′" />
        </Fade>
        <Fade show={beat === 2}>
          <Scale y={190} color={MANIM.green} label="1′" />
          <Txt x={400} y={110} size={34} color={MANIM.green}>1′ = 60″</Txt>
          <Piece color={MANIM.orange} y={190} label="1″" />
        </Fade>
        <Fade show={beat === 3}>
          <Scale y={200} color={MANIM.yellow} label="38°" filled={40} />
          <Txt x={X0} y={150} size={26} color={MANIM.ink} anchor="start">37°</Txt>
          <HBrace show={beat === 3} x1={X0} x2={X0 + 40 * ((X1 - X0) / 60)} y={250} color={MANIM.yellow} label="40′" labelSize={26} />
          <Txt x={400} y={360} size={32} color={MANIM.ink}>37° 40′ = 37° + 40/60 de grado</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
