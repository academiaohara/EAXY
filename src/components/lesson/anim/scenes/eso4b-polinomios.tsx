import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const SUP = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
const sg = (n: number) => String(n).replace("-", "−");
const par = (n: number) => (n < 0 ? `(${n})` : String(n));

/** `c·x^d` en texto plano (sin signo si es el primero de la fila). */
function term(c: number, d: number, first: boolean): string {
  if (c === 0) return "";
  const abs = Math.abs(c);
  const body = d === 0 ? String(abs) : `${abs === 1 ? "" : abs}x${d === 1 ? "" : SUP[d] ?? `^${d}`}`;
  return `${c < 0 ? "−" : first ? "" : "+"}${body}`;
}

/** Polinomio (coeficientes de mayor a menor grado) en texto plano. */
export function polyText(p: number[]): string {
  const n = p.length - 1;
  let first = true;
  let out = "";
  p.forEach((c, i) => {
    const t = term(c, n - i, first);
    if (t) {
      out += (first ? "" : " ") + t;
      first = false;
    }
  });
  return out || "0";
}

/** Polinomio en LaTeX (mayor a menor grado). */
export function polyTexDesc(p: number[]): string {
  const n = p.length - 1;
  let out = "";
  p.forEach((c, i) => {
    if (c === 0) return;
    const d = n - i;
    const abs = Math.abs(c);
    const body = d === 0 ? String(abs) : `${abs === 1 ? "" : abs}x${d === 1 ? "" : `^{${d}}`}`;
    out += `${c < 0 ? "-" : out ? "+" : ""}${body}`;
  });
  return out || "0";
}

type DivStep = { q: number; deg: number; product: number[]; rem: number[] };

/** División larga: devuelve los pasos (cada uno con el producto restado y el resto parcial). */
export function longDivision(p: number[], q: number[]) {
  const n = p.length - 1;
  const m = q.length - 1;
  let rem = [...p];
  const steps: DivStep[] = [];
  const quotient: number[] = [];
  for (let k = 0; k <= n - m; k += 1) {
    const lead = rem[k]!;
    const qk = lead / q[0]!;
    quotient.push(qk);
    const product = Array.from({ length: n + 1 }, () => 0);
    q.forEach((c, j) => {
      product[k + j] = c * qk;
    });
    rem = rem.map((c, i) => c - product[i]!);
    steps.push({ q: qk, deg: n - m - k, product, rem: [...rem] });
  }
  return { quotient, remainder: rem.slice(n - m + 1), steps };
}

const COL = 96;
const ROW = 46;

/**
 * División larga de `p` entre `q` (coeficientes de mayor a menor grado), un cociente por paso.
 */
export function buildDivisionPolinomios(params: { p?: number[]; q?: number[] }): AnimBuild {
  const p = params.p && params.p.length >= 2 ? params.p : [2, -7, -11, 13];
  const q = params.q && params.q.length >= 2 && params.q.length <= p.length ? params.q : [2, 3];
  const n = p.length - 1;
  const { quotient, remainder, steps } = longDivision(p, q);
  const x0 = 70;
  const colX = (j: number) => x0 + j * COL + COL / 2;
  const split = x0 + (n + 1) * COL + 10;
  const rowY = (r: number) => 90 + r * ROW;
  const quotientCells = quotient.map((c, k) => term(c, quotient.length - 1 - k, k === 0));
  const remText = polyText(remainder.map((c) => c));
  const captions = ["Se ordena el dividendo y se coloca el divisor a la derecha."];
  steps.forEach((s, k) => {
    const lead = k === 0 ? "el primer término del dividendo" : "el primer término del resto";
    captions.push(
      `Se divide ${lead} entre el de $${polyTexDesc(q)}$: sale **${term(s.q, s.deg, true)}** en el cociente. Se multiplica por el divisor y el producto se **resta**.`,
    );
    captions.push(k === steps.length - 1 ? `Resto: $${polyTexDesc(remainder)}$ (de grado menor que el divisor). Ahí termina la división.` : "Se restan los términos y queda un resto parcial; se repite con él.");
  });
  captions.push(
    `Comprobación: dividendo = divisor · cociente + resto, es decir, $${polyTexDesc(p)} = (${polyTexDesc(q)})(${polyTexDesc(quotient)}) + ${remText === "0" ? "0" : "(" + polyTexDesc(remainder) + ")"}$.`,
  );
  return {
    label: `División de ${polyText(p)} entre ${polyText(q)}`,
    captions,
    beatMs: 4200,
    render: (beat) => {
      const prodShown = (k: number) => beat >= 2 * k + 1;
      const remShown = (k: number) => beat >= 2 * k + 2;
      return (
        <Canvas>
          {p.map((c, j) => (
            <Txt key={`d${j}`} x={colX(j)} y={rowY(0)} size={30} color={MANIM.ink}>{term(c, n - j, j === 0)}</Txt>
          ))}
          <line x1={split} y1={rowY(0) - 32} x2={split} y2={rowY(0) + 14} stroke={MANIM.ink} strokeWidth={3} />
          <line x1={split} y1={rowY(0) + 14} x2={split + 250} y2={rowY(0) + 14} stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={split + 20} y={rowY(0)} size={30} color={MANIM.blue} anchor="start">{polyText(q)}</Txt>
          {quotientCells.map((t, k) => (
            <Fade key={`q${k}`} show={beat >= 2 * k + 1} dy={-8}>
              <Txt x={split + 30 + k * 90 + 30} y={rowY(0) + 62} size={30} color={MANIM.green}>{t}</Txt>
            </Fade>
          ))}
          {steps.map((s, k) => {
            const prodRow = 1 + 2 * k;
            const remRow = 2 + 2 * k;
            const neg = s.product.map((c) => (c === 0 ? 0 : -c));
            return (
              <g key={`s${k}`}>
                <Fade show={prodShown(k)} dy={8}>
                  {neg.map((c, j) => (c === 0 ? null : <Txt key={j} x={colX(j)} y={rowY(prodRow)} size={28} color={MANIM.orange}>{term(c, n - j, false)}</Txt>))}
                </Fade>
                <Fade show={remShown(k)} dy={8}>
                  <line x1={x0} y1={rowY(prodRow) + 12} x2={x0 + (n + 1) * COL} y2={rowY(prodRow) + 12} stroke={MANIM.grid} strokeWidth={2} />
                  {s.rem.map((c, j) => (c === 0 || j <= k ? null : <Txt key={j} x={colX(j)} y={rowY(remRow)} size={28} color={k === steps.length - 1 ? MANIM.yellow : MANIM.ink}>{term(c, n - j, false)}</Txt>))}
                </Fade>
              </g>
            );
          })}
          <Fade show={beat >= 2 * steps.length + 1} dy={8}>
            <Txt x={400} y={404} size={26} color={MANIM.yellow}>{`${polyText(p)} = (${polyText(q)})·(${polyText(quotient)}) + ${remText === "0" ? "0" : `(${remText})`}`}</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/**
 * Regla de Ruffini: `p` (coeficientes de mayor a menor grado) entre `x − a`.
 */
export function buildRuffiniTabla(params: { p?: number[]; a?: number }): AnimBuild {
  const p = params.p && params.p.length >= 2 ? params.p : [7, -11, 0, -94, 7];
  const a = Number.isFinite(params.a) ? (params.a as number) : 3;
  const n = p.length;
  const bottom: number[] = [p[0]!];
  const prods: number[] = [0];
  for (let i = 1; i < n; i += 1) {
    prods.push(a * bottom[i - 1]!);
    bottom.push(p[i]! + prods[i]!);
  }
  const rest = bottom[n - 1]!;
  const cw = Math.min(110, 560 / n);
  const x0 = 250;
  const colX = (j: number) => x0 + j * cw + cw / 2;
  const yTop = 120;
  const yMid = 200;
  const yBot = 290;
  const quotientTex = polyTexDesc(bottom.slice(0, n - 1));
  const captions = [
    `Se escriben solo los **coeficientes** (con $0$ en los términos que faltan) y, a la izquierda, el valor $a = ${a}$ del divisor $x ${a < 0 ? "+" : "-"} ${Math.abs(a)}$.`,
    `Se baja el primer coeficiente tal cual: $${bottom[0]}$.`,
  ];
  for (let i = 1; i < n; i += 1) {
    captions.push(
      `$${par(a)} \\cdot ${par(bottom[i - 1]!)} = ${prods[i]}$ se escribe debajo del siguiente coeficiente y se suma: $${p[i]} ${prods[i]! < 0 ? "-" : "+"} ${Math.abs(prods[i]!)} = ${bottom[i]}$.`,
    );
  }
  captions.push(
    `La última cifra es el **resto**: $${rest}$. Las anteriores son los coeficientes del cociente (un grado menos): $${quotientTex}$.`,
  );
  return {
    label: `Ruffini: ${polyText(p)} entre x ${a < 0 ? "+" : "−"} ${Math.abs(a)}`,
    captions,
    beatMs: 4000,
    render: (beat) => (
      <Canvas>
        {p.map((c, j) => (
          <Txt key={j} x={colX(j)} y={yTop} size={34} color={MANIM.ink}>{sg(c)}</Txt>
        ))}
        <line x1={x0 - 30} y1={yTop + 22} x2={x0 + n * cw} y2={yTop + 22} stroke={MANIM.ink} strokeWidth={3} />
        <line x1={x0 - 30} y1={yTop - 40} x2={x0 - 30} y2={yBot + 24} stroke={MANIM.ink} strokeWidth={3} />
        <line x1={colX(n - 2) + cw / 2} y1={yMid - 36} x2={colX(n - 2) + cw / 2} y2={yBot + 24} stroke={MANIM.ink} strokeWidth={3} />
        <Txt x={x0 - 62} y={yMid} size={34} color={MANIM.orange}>{sg(a)}</Txt>
        <Fade show={beat >= 1} dy={-8}>
          <Txt x={colX(0)} y={yBot} size={34} color={MANIM.green}>{sg(bottom[0]!)}</Txt>
        </Fade>
        {Array.from({ length: n - 1 }, (_, k) => k + 1).map((i) => (
          <g key={i}>
            <Fade show={beat >= i + 1} dy={-10}>
              <Txt x={colX(i)} y={yMid} size={30} color={MANIM.orange}>{sg(prods[i]!)}</Txt>
            </Fade>
            <Fade show={beat >= i + 1} dy={10} delay={200}>
              <Txt x={colX(i)} y={yBot} size={34} color={i === n - 1 ? MANIM.yellow : MANIM.green}>{sg(bottom[i]!)}</Txt>
            </Fade>
          </g>
        ))}
        <Fade show={beat >= n + 1} dy={8}>
          <Txt x={colX(n - 1)} y={yBot + 52} size={22} color={MANIM.yellow}>resto</Txt>
          <Txt x={x0 + ((n - 1) * cw) / 2} y={yBot + 52} size={22} color={MANIM.green}>coeficientes del cociente</Txt>
        </Fade>
        <Fade show={beat >= n + 1} dy={8}>
          <Txt x={400} y={400} size={28} color={MANIM.ink}>{`cociente: ${polyText(bottom.slice(0, n - 1))}    resto: ${sg(rest)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
