import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

const X0 = 60;
const MAXW = 680;

/**
 * Aumento (`sign: "+"`) o rebaja (`"-"`) porcentual: `a` = precio inicial, `b` = porcentaje.
 * La barra del precio inicial es el 100 %; el cambio se añade o se quita.
 */
export function buildAumentoBarra(params: { a?: number; b?: number; sign?: "+" | "-" }): AnimBuild {
  const price = params.a ?? 460;
  const pct = params.b ?? 20;
  const up = (params.sign ?? "+") === "+";
  const change = (price * pct) / 100;
  const final = up ? price + change : price - change;
  const factor = up ? 1 + pct / 100 : 1 - pct / 100;
  const base = MAXW / (up ? factor : 1);
  const wChange = (base * pct) / 100;
  const sign = up ? "+" : "−";
  const word = up ? "sube" : "baja";

  const captions = [
    `Precio de partida: **${numEs(price)} €**. Es el **100 %**.`,
    `Primero se calcula el **${pct} %** de ${numEs(price)}: $${numTex(price)} \\cdot ${numTex(pct / 100)} = ${numTex(change)}$.`,
    up
      ? `Como el precio **sube**, esos ${numEs(change)} € se **añaden** a la barra.`
      : `Como el precio **baja**, esos ${numEs(change)} € se **quitan** de la barra.`,
    `Precio nuevo $= ${numTex(price)} ${sign} ${numTex(change)} = ${numTex(final)}$ €.`,
    `Atajo: el precio nuevo es el **${numEs(factor * 100)} %** del antiguo, es decir, se multiplica por **${numEs(factor)}**: $${numTex(price)} \\cdot ${numTex(factor)} = ${numTex(final)}$.`,
  ];

  return {
    label: `El precio ${word} un ${pct} %: de ${numEs(price)} € a ${numEs(final)} €`,
    captions,
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        <Fade show dy={-10}>
          <rect x={X0} y={110} width={base} height={56} rx={10} fill={MANIM.blue} fillOpacity={0.85} />
          <Txt x={X0 + base / 2} y={147} size={26} color={MANIM.surface} weight={700}>
            {`${numEs(price)} €  ·  100 %`}
          </Txt>
        </Fade>
        <Fade show={beat >= 1 && beat <= 2 ? true : false} dy={-6}>
          <HBrace show x1={up ? X0 + base : X0 + base - wChange} x2={up ? X0 + base + wChange : X0 + base} y={176} color={MANIM.yellow} label={`${pct} % = ${numEs(change)} €`} labelSize={24} />
        </Fade>
        <Fade show={beat >= 2 && up} dx={-12}>
          <rect x={X0 + base} y={110} width={wChange} height={56} rx={10} fill={MANIM.orange} fillOpacity={0.9} />
          <Txt x={X0 + base + wChange / 2} y={147} size={22} color={MANIM.surface} weight={700}>{`+ ${numEs(change)}`}</Txt>
        </Fade>
        <Fade show={beat >= 2 && !up} dx={12}>
          <rect x={X0 + base - wChange} y={110} width={wChange} height={56} rx={10} fill={MANIM.red} fillOpacity={0.9} />
          <Txt x={X0 + base - wChange / 2} y={147} size={22} color={MANIM.surface} weight={700}>{`− ${numEs(change)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={280} size={34} color={MANIM.green}>
            {`${numEs(price)} ${sign} ${numEs(change)} = ${numEs(final)} €`}
          </Txt>
        </Fade>
        <Fade show={beat >= 4} dy={10}>
          <Txt x={400} y={340} size={30} color={MANIM.yellow}>
            {`${numEs(price)} · ${numEs(factor)} = ${numEs(final)} €`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
