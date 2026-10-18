import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const XD = 330;
const XM = 520;
const ROW = { carry: 120, a: 200, b: 270, line: 300, res: 370 } as const;

type Params = { a?: number; b?: number; c?: number; d?: number; op?: "+" | "-" };

function Cell({ x, y, children, color = MANIM.ink, size = 58, show = true }: { x: number; y: number; children: React.ReactNode; color?: string; size?: number; show?: boolean }) {
  return (
    <Fade show={show} dy={-6}>
      <Txt x={x} y={y} size={size} color={color} anchor="end" mono>{children}</Txt>
    </Fade>
  );
}

function Unit({ x, y, ch, color = MANIM.muted }: { x: number; y: number; ch: string; color?: string }) {
  return <Txt x={x} y={y} size={46} color={color} anchor="start">{ch}</Txt>;
}

/** Suma o resta de ángulos en grados y minutos, en columna: llevada de 60′ a 1° o préstamo de 1° = 60′. */
export function buildAngulosColumna(params: Params): AnimBuild {
  const op = params.op ?? "+";
  const g1 = params.a ?? (op === "+" ? 36 : 87);
  const m1 = params.b ?? (op === "+" ? 45 : 10);
  const g2 = params.c ?? (op === "+" ? 82 : 36);
  const m2 = params.d ?? (op === "+" ? 56 : 20);

  if (op === "+") {
    const rawM = m1 + m2;
    const carry = Math.floor(rawM / 60);
    const resM = rawM % 60;
    const resG = g1 + g2 + carry;
    const captions = [
      `Colocamos los ángulos en columna: grados bajo grados y minutos bajo minutos.`,
      `Sumamos los **minutos**: $${m1}' + ${m2}' = ${rawM}'$.`,
      carry > 0
        ? `$${rawM}'$ es más de $60'$: $${rawM}' = ${carry}^\\circ\\,${resM}'$. Escribimos $${resM}'$ y **llevamos $${carry}^\\circ$**.`
        : `$${rawM}'$ es menos de $60'$: lo escribimos tal cual.`,
      `Sumamos los **grados**${carry > 0 ? ", con lo que llevamos" : ""}: $${g1} + ${g2}${carry > 0 ? ` + ${carry}` : ""} = ${resG}$.`,
      `Resultado: $${g1}^\\circ\\,${m1}' + ${g2}^\\circ\\,${m2}' = ${resG}^\\circ\\,${resM}'$.`,
    ];
    return {
      label: `Suma en columna de ${g1}° ${m1}′ y ${g2}° ${m2}′ con llevada de minutos a grados`,
      captions,
      render: (beat) => (
        <Canvas>
          <Cell x={XD} y={ROW.carry} color={MANIM.yellow} size={40} show={beat >= 2 && carry > 0}>{`+${carry}`}</Cell>
          <Cell x={XD} y={ROW.a}>{g1}</Cell>
          <Unit x={XD + 6} y={ROW.a} ch="°" />
          <Cell x={XM} y={ROW.a}>{m1}</Cell>
          <Unit x={XM + 6} y={ROW.a} ch="′" />
          <Txt x={XD - 150} y={ROW.b} size={58} color={MANIM.muted} mono>+</Txt>
          <Cell x={XD} y={ROW.b}>{g2}</Cell>
          <Unit x={XD + 6} y={ROW.b} ch="°" />
          <Cell x={XM} y={ROW.b}>{m2}</Cell>
          <Unit x={XM + 6} y={ROW.b} ch="′" />
          <line x1={XD - 190} y1={ROW.line} x2={XM + 70} y2={ROW.line} stroke={MANIM.ink} strokeWidth={4} strokeLinecap="round" />
          <Fade show={beat === 1}>
            <rect x={XM - 100} y={ROW.a - 60} width={150} height={ROW.b - ROW.a + 82} rx={12} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={400} y={52} size={32} color={MANIM.yellow} anchor="middle">{`${m1}′ + ${m2}′ = ${rawM}′`}</Txt>
          </Fade>
          <Fade show={beat === 2 && carry > 0}>
            <Txt x={400} y={52} size={32} color={MANIM.yellow} anchor="middle">{`${rawM}′ = ${carry}° ${resM}′`}</Txt>
          </Fade>
          <Fade show={beat === 3}>
            <rect x={XD - 100} y={ROW.carry - 50} width={150} height={ROW.b - ROW.carry + 72} rx={12} fill="none" stroke={MANIM.blue} strokeWidth={3} />
          </Fade>
          <Cell x={XM} y={ROW.res} color={MANIM.green} show={beat >= 2}>{resM}</Cell>
          <Fade show={beat >= 2}><Unit x={XM + 6} y={ROW.res} ch="′" color={MANIM.green} /></Fade>
          <Cell x={XD} y={ROW.res} color={MANIM.green} show={beat >= 3}>{resG}</Cell>
          <Fade show={beat >= 3}><Unit x={XD + 6} y={ROW.res} ch="°" color={MANIM.green} /></Fade>
        </Canvas>
      ),
    };
  }

  const borrow = m1 < m2;
  const topG = borrow ? g1 - 1 : g1;
  const topM = borrow ? m1 + 60 : m1;
  const resM = topM - m2;
  const resG = topG - g2;
  const captions = borrow
    ? [
        `Colocamos el minuendo arriba y el sustraendo debajo, en columna.`,
        `Miramos los minutos: $${m1}'$ **no llega** a $${m2}'$. No podemos restar.`,
        `Convertimos $1^\\circ$ en $60'$: el minuendo pasa a $${topG}^\\circ\\,${topM}'$ ($${m1}' + 60' = ${topM}'$).`,
        `Restamos los **minutos**: $${topM}' - ${m2}' = ${resM}'$.`,
        `Restamos los **grados**: $${topG} - ${g2} = ${resG}$. Resultado: $${resG}^\\circ\\,${resM}'$.`,
      ]
    : [
        `Colocamos el minuendo arriba y el sustraendo debajo, en columna.`,
        `Los minutos de arriba son mayores: se restan directamente, $${m1}' - ${m2}' = ${resM}'$.`,
        `Restamos los **grados**: $${g1} - ${g2} = ${resG}$.`,
        `Resultado: $${resG}^\\circ\\,${resM}'$.`,
      ];
  const gradeBeat = borrow ? 4 : 2;
  const minBeat = borrow ? 3 : 1;
  return {
    label: `Resta en columna de ${g1}° ${m1}′ menos ${g2}° ${m2}′`,
    captions,
    render: (beat) => {
      const done = beat >= captions.length - 1;
      const cvt = borrow && beat >= 2;
      return (
        <Canvas>
          <Fade show={cvt}>
            <Txt x={XD - 20} y={ROW.carry + 20} size={34} color={MANIM.yellow} anchor="end" mono>{`${topG}`}</Txt>
            <Txt x={XM - 20} y={ROW.carry + 20} size={34} color={MANIM.yellow} anchor="end" mono>{`${topM}`}</Txt>
          </Fade>
          <Cell x={XD} y={ROW.a} color={cvt ? MANIM.muted : MANIM.ink}>{g1}</Cell>
          <Unit x={XD + 6} y={ROW.a} ch="°" />
          <Cell x={XM} y={ROW.a} color={cvt ? MANIM.muted : MANIM.ink}>{m1}</Cell>
          <Unit x={XM + 6} y={ROW.a} ch="′" />
          <Txt x={XD - 150} y={ROW.b} size={58} color={MANIM.muted} mono>−</Txt>
          <Cell x={XD} y={ROW.b}>{g2}</Cell>
          <Unit x={XD + 6} y={ROW.b} ch="°" />
          <Cell x={XM} y={ROW.b}>{m2}</Cell>
          <Unit x={XM + 6} y={ROW.b} ch="′" />
          <line x1={XD - 190} y1={ROW.line} x2={XM + 70} y2={ROW.line} stroke={MANIM.ink} strokeWidth={4} strokeLinecap="round" />
          <Fade show={borrow && beat === 1}>
            <rect x={XM - 100} y={ROW.a - 60} width={150} height={ROW.b - ROW.a + 82} rx={12} fill="none" stroke={MANIM.red} strokeWidth={3} />
            <Txt x={400} y={52} size={32} color={MANIM.red} anchor="middle">{`${m1}′ < ${m2}′`}</Txt>
          </Fade>
          <Fade show={borrow && beat === 2}>
            <Txt x={400} y={52} size={32} color={MANIM.yellow} anchor="middle">1° = 60′</Txt>
          </Fade>
          <Cell x={XM} y={ROW.res} color={MANIM.green} show={beat >= minBeat}>{resM}</Cell>
          <Fade show={beat >= minBeat}><Unit x={XM + 6} y={ROW.res} ch="′" color={MANIM.green} /></Fade>
          <Cell x={XD} y={ROW.res} color={MANIM.green} show={beat >= gradeBeat}>{resG}</Cell>
          <Fade show={beat >= gradeBeat}><Unit x={XD + 6} y={ROW.res} ch="°" color={MANIM.green} /></Fade>
          <Fade show={done}>
            <rect x={XD - 120} y={ROW.res - 56} width={XM - XD + 200} height={78} rx={14} fill="none" stroke={MANIM.green} strokeWidth={3} />
          </Fade>
        </Canvas>
      );
    },
  };
}
