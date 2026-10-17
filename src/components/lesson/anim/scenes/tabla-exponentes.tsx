import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { factorize, factorsToString, power } from "@/components/lesson/anim/number-theory";
import { fmt } from "@/components/lesson/anim/format";

const ROW_Y0 = 150;
const ROW_H = 58;
const LABEL_X = 130;

/**
 * Tabla de exponentes: una fila por número y una columna por primo.
 * m.c.m. = mayor exponente de cada primo; m.c.d. = menor exponente, solo de los primos que están en todos.
 */
export function buildTablaExponentes(params: { nums?: number[]; mode?: "mcm" | "mcd" }): AnimBuild {
  const nums = params.nums ?? [16, 24, 320];
  const mode = params.mode ?? "mcm";
  const facs = nums.map((n) => new Map(factorize(n)));
  const primes = Array.from(new Set(nums.flatMap((n) => factorize(n).map(([p]) => p)))).sort((a, b) => a - b);
  const colGap = Math.min(130, 420 / primes.length);
  const colX = (j: number) => 300 + j * colGap;
  const rowY = (i: number) => ROW_Y0 + i * ROW_H;
  const resY = ROW_Y0 + nums.length * ROW_H + 36;

  /** Exponente elegido en cada columna (0 = el primo no entra en el resultado). */
  const chosen = primes.map((p) => {
    const es = facs.map((m) => m.get(p) ?? 0);
    if (mode === "mcm") {
      return Math.max(...es);
    }
    return es.every((e) => e > 0) ? Math.min(...es) : 0;
  });
  const result = primes.reduce((acc, p, j) => acc * p ** chosen[j]!, 1);
  const resultFactors = primes.flatMap((p, j) => (chosen[j]! > 0 ? [[p, chosen[j]!] as [number, number]] : []));
  const resultTxt = resultFactors.length ? factorsToString(resultFactors) : "1";
  const name = mode === "mcm" ? "m.c.m." : "m.c.d.";
  const list = nums.map(fmt).join(", ");

  const captions = [
    `Para el ${name}(${list}) descomponemos cada número en factores primos.`,
    `Cada **fila** es una descomposición; cada **columna**, un primo. Un guion indica que ese primo no aparece.`,
    mode === "mcm"
      ? `En cada columna nos quedamos con el **mayor exponente**, aunque el primo solo aparezca en un número.`
      : `Solo valen las columnas donde el primo está en **todos** los números; de cada una, el **menor exponente**.`,
    resultFactors.length
      ? `Multiplicamos lo elegido: $${resultTxt.replace(/ · /g, " \\cdot ")}$, es decir, **${name}(${list}) = ${fmt(result)}**.`
      : `No hay ningún primo común: **${name}(${list}) = 1**.`,
  ];

  return {
    label: `${name} de ${list} con la tabla de exponentes: resultado ${fmt(result)}`,
    captions,
    beatMs: 3200,
    render: (beat) => (
      <Canvas>
        {primes.map((p, j) => (
          <Fade key={p} show={beat >= 1} dy={-8}>
            <Txt x={colX(j)} y={ROW_Y0 - 52} size={26} color={MANIM.muted}>{`primo ${p}`}</Txt>
          </Fade>
        ))}
        {nums.map((num, i) => (
          <g key={num}>
            <Fade show dy={8} delay={i * 80}>
              <Txt x={LABEL_X} y={rowY(i)} size={30} color={MANIM.ink} anchor="end">{fmt(num)}</Txt>
              <Txt x={LABEL_X + 12} y={rowY(i)} size={30} color={MANIM.muted} anchor="start">=</Txt>
            </Fade>
            {primes.map((p, j) => {
              const e = facs[i]!.get(p) ?? 0;
              const picked = beat >= 2 && chosen[j]! > 0 && e === chosen[j];
              const dim = beat >= 2 && chosen[j] === 0;
              return (
                <g key={p}>
                  <Fade show={beat >= 1} dy={8} delay={j * 90}>
                    <g className="anim-t" style={{ opacity: dim ? 0.3 : 1 }}>
                      <Txt x={colX(j)} y={rowY(i)} size={32} color={e ? MANIM.ink : MANIM.grid}>
                        {e ? power(p, e) : "–"}
                      </Txt>
                    </g>
                  </Fade>
                  <Fade show={picked} scale={0.85}>
                    <rect x={colX(j) - 38} y={rowY(i) - 34} width={76} height={46} rx={10} fill="rgba(255,216,102,0.14)" stroke={MANIM.yellow} strokeWidth={3} />
                  </Fade>
                </g>
              );
            })}
          </g>
        ))}
        <Fade show={beat >= 3} dy={-10}>
          <line x1={LABEL_X - 90} y1={resY - 48} x2={colX(primes.length - 1) + 120} y2={resY - 48} stroke={MANIM.grid} strokeWidth={2} />
          <Txt x={LABEL_X} y={resY} size={28} color={MANIM.yellow} anchor="end">{name}</Txt>
          <Txt x={LABEL_X + 12} y={resY} size={28} color={MANIM.muted} anchor="start">=</Txt>
          {primes.map((p, j) => (
            <Txt key={p} x={colX(j)} y={resY} size={32} color={chosen[j] ? MANIM.yellow : MANIM.grid}>
              {chosen[j] ? power(p, chosen[j]!) : "–"}
            </Txt>
          ))}
          <Txt x={colX(primes.length - 1) + 130} y={resY} size={32} color={MANIM.yellow} anchor="start">{`= ${fmt(result)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
