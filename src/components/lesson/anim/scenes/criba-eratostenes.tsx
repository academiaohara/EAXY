import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { smallestPrimeFactor } from "@/components/lesson/anim/number-theory";

const COLS = 10;
const CELL = 62;
const X0 = (800 - COLS * CELL) / 2;
const Y0 = 62;
const SIEVE = [2, 3, 5, 7];

function isPrime(n: number): boolean {
  return n > 1 && smallestPrimeFactor(n) === n;
}

/** Criba de Eratóstenes hasta `n` (por defecto 50): se tachan los múltiplos de 2, 3, 5 y 7. */
export function buildCribaEratostenes(params: { n?: number }): AnimBuild {
  const n = params.n ?? 50;
  const rows = Math.ceil(n / COLS);
  const primes = Array.from({ length: n }, (_, i) => i + 1).filter(isPrime);
  const last = SIEVE.length + 1;

  /** Estado visual de cada número en un paso. */
  const stateOf = (v: number, beat: number): "one" | "plain" | "now" | "old" | "current" | "prime" | "dead" => {
    if (v === 1) {
      return beat >= 1 ? "one" : "plain";
    }
    if (beat === last) {
      return isPrime(v) ? "prime" : "dead";
    }
    const k = beat - 1; // índice del primo que se criba en este paso
    if (k < 0) {
      return "plain";
    }
    const p = SIEVE[k]!;
    if (v === p) {
      return "current";
    }
    const spf = smallestPrimeFactor(v);
    if (!isPrime(v) && spf < p && SIEVE.indexOf(spf) >= 0 && SIEVE.indexOf(spf) < k) {
      return "old";
    }
    if (!isPrime(v) && spf === p) {
      return "now";
    }
    if (isPrime(v) && SIEVE.indexOf(v) >= 0 && SIEVE.indexOf(v) < k) {
      return "prime";
    }
    return "plain";
  };

  const colors = {
    one: { fill: "rgba(184,194,208,0.08)", stroke: MANIM.grid, text: MANIM.muted },
    plain: { fill: "rgba(255,255,255,0.04)", stroke: MANIM.grid, text: MANIM.ink },
    now: { fill: "rgba(252,98,85,0.28)", stroke: MANIM.red, text: MANIM.red },
    old: { fill: "rgba(255,255,255,0.02)", stroke: MANIM.grid, text: "#5b6a80" },
    current: { fill: "rgba(255,216,102,0.3)", stroke: MANIM.yellow, text: MANIM.yellow },
    prime: { fill: "rgba(131,193,103,0.28)", stroke: MANIM.green, text: MANIM.green },
    dead: { fill: "rgba(255,255,255,0.02)", stroke: MANIM.grid, text: "#5b6a80" },
  } as const;

  const captions = [
    `Los números del $1$ al $${n}$. Buscamos los **primos**: los que no tienen más divisores que $1$ y ellos mismos.`,
    `El $1$ queda aparte. El $2$ es primo; **tachamos sus múltiplos**: tienen al $2$ como divisor, así que son compuestos.`,
    `El siguiente sin tachar, el $3$, es primo. Tachamos sus múltiplos.`,
    `El $4$ ya estaba tachado; el siguiente libre es el $5$. Tachamos sus múltiplos.`,
    `Seguimos con el $7$. Con el $11$ no hace falta: $11^2 = 121$ ya pasa de $${n}$, y todo compuesto menor tiene un factor primo menor.`,
    `Lo que queda sin tachar son los **${primes.length} primos** hasta ${n}: $${primes.join(", ")}$.`,
  ];

  return {
    label: `Criba de Eratóstenes: los ${primes.length} números primos hasta ${n}`,
    captions,
    beatMs: 3000,
    render: (beat) => (
      <Canvas>
        {Array.from({ length: n }, (_, i) => i + 1).map((v) => {
          const st = colors[stateOf(v, beat)];
          const x = X0 + ((v - 1) % COLS) * CELL;
          const y = Y0 + Math.floor((v - 1) / COLS) * (CELL - 4);
          return (
            <g key={v}>
              <rect
                x={x + 3}
                y={y + 3}
                width={CELL - 6}
                height={CELL - 14}
                rx={9}
                fill={st.fill}
                stroke={st.stroke}
                strokeWidth={2}
                className="anim-t"
              />
              <text
                x={x + CELL / 2}
                y={y + (CELL - 14) / 2 + 10}
                textAnchor="middle"
                fontSize={24}
                fontWeight={700}
                fill={st.text}
                className="anim-t"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {v}
              </text>
            </g>
          );
        })}
        <Fade show={beat >= 1 && beat < last} dy={8}>
          <Txt x={400} y={Y0 + rows * (CELL - 4) + 36} size={26} color={MANIM.yellow}>
            {`múltiplos de ${SIEVE[Math.min(Math.max(beat - 1, 0), SIEVE.length - 1)]}`}
          </Txt>
        </Fade>
        <Fade show={beat === last} dy={8}>
          <Txt x={400} y={Y0 + rows * (CELL - 4) + 36} size={26} color={MANIM.green}>
            {`${primes.length} primos`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
