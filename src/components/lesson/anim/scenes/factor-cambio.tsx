import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

const X0 = 60;
const MAXW = 680;
const H = 52;
const Y1 = 70;
const Y2 = 230;

/**
 * Factor de cambio: aumento `b` % sobre `a` (100 % + b % = (100 + b) % → · 1,b) y rebaja
 * `d` % sobre `c` (100 % − d % → · 0,x), con una barra para cada caso.
 */
export function buildFactorCambio(params: { a?: number; b?: number; c?: number; d?: number }): AnimBuild {
  const p1 = params.a ?? 460;
  const up = params.b ?? 20;
  const p2 = params.c ?? 900;
  const down = params.d ?? 15;
  const f1 = 1 + up / 100;
  const f2 = 1 - down / 100;
  const r1 = p1 * f1;
  const r2 = p2 * f2;
  const base1 = MAXW / f1;
  const ext = (base1 * up) / 100;
  const cut = (MAXW * down) / 100;

  const captions = [
    `Aumento: el precio de partida, **${numEs(p1)} €**, es el **100 %**.`,
    `Subir un ${up} % es **añadir** el ${up} %: se pasa a pagar el $100\\% + ${up}\\% = ${100 + up}\\%$.`,
    `El ${100 + up} % es **${numEs(f1)}** veces el precio: $${numTex(p1)} \\cdot ${numTex(f1)} = ${numTex(r1)}$ €, en un solo paso.`,
    `Rebaja: de **${numEs(p2)} €** (100 %) se **quita** el ${down} %: se paga el $100\\% - ${down}\\% = ${100 - down}\\%$.`,
    `El ${100 - down} % es **${numEs(f2)}** veces el precio: $${numTex(p2)} \\cdot ${numTex(f2)} = ${numTex(r2)}$ €.`,
  ];

  return {
    label: `Factor de cambio: ${numEs(p1)} € con un aumento del ${up} % y ${numEs(p2)} € con una rebaja del ${down} %`,
    captions,
    beatMs: 4000,
    render: (beat) => (
      <Canvas>
        <Fade show dy={-10}>
          <rect x={X0} y={Y1} width={base1} height={H} rx={8} fill={MANIM.blue} fillOpacity={0.85} />
          <Txt x={X0 + base1 / 2} y={Y1 + 34} size={24} color={MANIM.surface} weight={700}>{`${numEs(p1)} €  ·  100 %`}</Txt>
        </Fade>
        <Fade show={beat >= 1} dx={-12}>
          <rect x={X0 + base1} y={Y1} width={ext} height={H} rx={8} fill={MANIM.orange} fillOpacity={0.9} />
          <Txt x={X0 + base1 + ext / 2} y={Y1 + 34} size={22} color={MANIM.surface} weight={700}>{`+ ${up} %`}</Txt>
        </Fade>
        <Fade show={beat >= 1} dy={6}>
          <Txt x={X0 + MAXW} y={Y1 - 14} size={22} color={MANIM.yellow} anchor="end">{`${100 + up} %`}</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          <Txt x={400} y={Y1 + 105} size={32} color={MANIM.green}>{`${numEs(p1)} · ${numEs(f1)} = ${numEs(r1)} €`}</Txt>
        </Fade>

        <Fade show={beat >= 3} dy={-10}>
          <rect x={X0} y={Y2} width={MAXW - cut} height={H} rx={8} fill={MANIM.blue} fillOpacity={0.85} />
          <Txt x={X0 + (MAXW - cut) / 2} y={Y2 + 34} size={24} color={MANIM.surface} weight={700}>{`${numEs(p2)} €  ·  ${100 - down} %`}</Txt>
          <rect x={X0 + MAXW - cut} y={Y2} width={cut} height={H} rx={8} fill={MANIM.red} fillOpacity={0.55} stroke={MANIM.red} strokeWidth={2} strokeDasharray="6 5" />
          <Txt x={X0 + MAXW - cut / 2} y={Y2 + 34} size={22} color={MANIM.ink} weight={700}>{`− ${down} %`}</Txt>
          <Txt x={X0 + MAXW} y={Y2 - 14} size={22} color={MANIM.yellow} anchor="end">100 %</Txt>
        </Fade>
        <Fade show={beat >= 4} dy={8}>
          <Txt x={400} y={Y2 + 105} size={32} color={MANIM.green}>{`${numEs(p2)} · ${numEs(f2)} = ${numEs(r2)} €`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
