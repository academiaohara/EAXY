import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { MINUS, NEG, POS, zp } from "@/components/lesson/anim/integers";

const CELL_W = 372;
const CELL_H = 190;

type Case = { sa: 1 | -1; sb: 1 | -1 };
const CASES: Case[] = [
  { sa: 1, sb: 1 },
  { sa: 1, sb: -1 },
  { sa: -1, sb: 1 },
  { sa: -1, sb: -1 },
];

/** Multiplicar es repetir (o anular lo repetido): los cuatro casos del signo con ingresos y facturas. */
export function buildProductoSignos(params: { a?: number; b?: number }): AnimBuild {
  const a = Math.min(params.a ?? 3, 4);
  const b = params.b ?? 5;
  const chipW = 62;
  const chipGap = 10;
  const chipsW = a * chipW + (a - 1) * chipGap;

  const story = ({ sa, sb }: Case) =>
    `${sa === 1 ? "" : "anulan "}${a} ${sb === 1 ? "ingresos" : "facturas"} de ${b} €`;

  return {
    label: `Producto de enteros: ${a} ingresos o facturas de ${b} €, repetidos o anulados, dan los cuatro casos del signo`,
    captions: [
      `**${a} ingresos de ${b} €** ($+${a}$ veces $+${b}$): ganas ${a * b} €. Positivo por positivo, **positivo**.`,
      `**${a} facturas de ${b} €** ($+${a}$ veces $-${b}$): pierdes ${a * b} €. Positivo por negativo, **negativo**.`,
      `**Anulan ${a} ingresos de ${b} €** ($-${a}$ veces $+${b}$): se esfuma lo que ganabas, pierdes ${a * b} €. Negativo por positivo, **negativo**.`,
      `**Anulan ${a} facturas de ${b} €** ($-${a}$ veces $-${b}$): te quitan deudas, ganas ${a * b} €. Negativo por negativo, **positivo**.`,
      `Signos **iguales** → resultado **positivo**. Signos **distintos** → resultado **negativo**. El valor absoluto siempre es $${a}\\cdot ${b} = ${a * b}$.`,
    ],
    render: (beat) => (
      <Canvas>
        {CASES.map((c, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const tx = 14 + col * (CELL_W + 16);
          const ty = 8 + row * (CELL_H + 14);
          const cx = tx + CELL_W / 2;
          const product = c.sa * c.sb * a * b;
          const chipSign = c.sb;
          const annulled = c.sa === -1;
          const chipColor = chipSign === 1 ? POS : NEG;
          const same = c.sa === c.sb;
          return (
            <Fade key={i} show={beat >= i} dy={10}>
              <rect
                x={tx}
                y={ty}
                width={CELL_W}
                height={CELL_H}
                rx={16}
                fill={MANIM.panel}
                fillOpacity={0.55}
                stroke={beat >= 4 ? (same ? POS : NEG) : MANIM.grid}
                strokeWidth={beat >= 4 ? 3.5 : 1.5}
                className="anim-t"
              />
              <Txt x={cx} y={ty + 38} size={30}>{`${zp(c.sa * a)} · ${zp(c.sb * b)}`}</Txt>
              <Txt x={cx} y={ty + 66} size={17} color={MANIM.muted} weight={500}>{story(c)}</Txt>
              {Array.from({ length: a }, (_, k) => {
                const x = cx - chipsW / 2 + k * (chipW + chipGap);
                return (
                  <g key={k} opacity={annulled ? 0.6 : 1}>
                    <rect
                      x={x}
                      y={ty + 84}
                      width={chipW}
                      height={40}
                      rx={9}
                      fill={annulled ? "none" : chipColor}
                      fillOpacity={0.9}
                      stroke={chipColor}
                      strokeWidth={2.5}
                      strokeDasharray={annulled ? "6 5" : undefined}
                    />
                    <Txt x={x + chipW / 2} y={ty + 112} size={22} color={annulled ? chipColor : MANIM.surface} weight={800}>
                      {`${chipSign === 1 ? "+" : MINUS}${b}`}
                    </Txt>
                    {annulled ? <line x1={x + 6} y1={ty + 128} x2={x + chipW - 6} y2={ty + 80} stroke={MANIM.yellow} strokeWidth={3} strokeLinecap="round" /> : null}
                  </g>
                );
              })}
              <Txt x={cx} y={ty + 166} size={34} color={product > 0 ? POS : NEG}>{`= ${product > 0 ? "+" : MINUS}${Math.abs(product)}`}</Txt>
              <Fade show={beat >= 4} dy={4}>
                <Txt x={tx + CELL_W - 14} y={ty + 26} size={16} color={same ? POS : NEG} anchor="end" weight={700}>
                  {same ? "iguales" : "distintos"}
                </Txt>
              </Fade>
            </Fade>
          );
        })}
      </Canvas>
    ),
  };
}
