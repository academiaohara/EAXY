/** Divisores con criterio de divisibilidad que se explican en la lección. */
export const CRITERIA_DIVISORS = [2, 3, 4, 5, 6, 9, 10, 11, 12] as const;
export type CriteriaDivisor = (typeof CRITERIA_DIVISORS)[number];

/** Número en LaTeX con espacio fino cada tres cifras (como en el resto de lecciones). */
export function texNumber(n: number): string {
  const digits = String(Math.abs(n));
  const grouped = digits.length > 4 ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : digits;
  return n < 0 ? `-${grouped}` : grouped;
}

export function isDivisibleBy(n: number, divisor: number): boolean {
  return n % divisor === 0;
}

function digitsOf(n: number): number[] {
  return String(n).split("").map(Number);
}

function multipleNote(value: number, divisor: number): string {
  if (value % divisor === 0) {
    return `$${value} = ${divisor} \\cdot ${value / divisor}$`;
  }
  const below = Math.floor(value / divisor) * divisor;
  return `entre $${below}$ y $${below + divisor}$ no hay múltiplo de $${divisor}$ que sea $${value}$`;
}

function alternating(n: number): { odd: number[]; even: number[]; diff: number } {
  const fromRight = digitsOf(n).reverse();
  const odd = fromRight.filter((_, index) => index % 2 === 0);
  const even = fromRight.filter((_, index) => index % 2 === 1);
  const sum = (list: number[]) => list.reduce((total, digit) => total + digit, 0);
  return { odd, even, diff: sum(odd) - sum(even) };
}

/**
 * Explica, con el criterio correspondiente, por qué `n` es o no es divisible entre `divisor`.
 * El texto admite Markdown ligero y LaTeX inline.
 */
export function explainDivisibility(n: number, divisor: number): string {
  const yes = isDivisibleBy(n, divisor);
  const num = `$${texNumber(n)}$`;
  const digits = digitsOf(n);
  const last = digits[digits.length - 1];
  const verdict = yes ? `**sí** es divisible entre $${divisor}$` : `**no** es divisible entre $${divisor}$`;

  switch (divisor) {
    case 2:
      return `${num} acaba en $${last}$, que es cifra ${last % 2 === 0 ? "par" : "impar"}: ${verdict}.`;
    case 5:
      return `${num} acaba en $${last}$${last === 0 || last === 5 ? "" : ", y para el $5$ tiene que acabar en $0$ o en $5$"}: ${verdict}.`;
    case 10:
      return `${num} acaba en $${last}$${last === 0 ? "" : ", y para el $10$ tiene que acabar en $0$"}: ${verdict}.`;
    case 3:
    case 9: {
      const sum = digits.reduce((total, digit) => total + digit, 0);
      const sumTex = `${digits.join(" + ")} = ${sum}`;
      return `Las cifras de ${num} suman $${sumTex}$, ${sum % divisor === 0 ? "múltiplo" : "que no es múltiplo"} de $${divisor}$: ${verdict}.`;
    }
    case 4: {
      const lastTwo = n % 100;
      const shown = digits.length > 1 ? String(lastTwo).padStart(2, "0") : String(lastTwo);
      return `Las dos últimas cifras de ${num} forman $${shown}$ (${multipleNote(lastTwo, 4)}): ${verdict}.`;
    }
    case 6: {
      const by2 = isDivisibleBy(n, 2);
      const sum = digits.reduce((total, digit) => total + digit, 0);
      const by3 = sum % 3 === 0;
      const part2 = by2 ? `es par` : `acaba en $${last}$, no es par`;
      const part3 = by3 ? `sus cifras suman $${sum}$, múltiplo de $3$` : `sus cifras suman $${sum}$, que no es múltiplo de $3$`;
      return `Para el $6$ hacen falta el $2$ **y** el $3$. ${num}: ${part2} y ${part3}. Por tanto ${verdict}.`;
    }
    case 12: {
      const sum = digits.reduce((total, digit) => total + digit, 0);
      const by3 = sum % 3 === 0;
      const lastTwo = n % 100;
      const by4 = lastTwo % 4 === 0;
      const part3 = by3 ? `sus cifras suman $${sum}$, múltiplo de $3$` : `sus cifras suman $${sum}$, que no es múltiplo de $3$`;
      const part4 = by4 ? `$${String(lastTwo).padStart(2, "0")}$ es múltiplo de $4$` : `$${String(lastTwo).padStart(2, "0")}$ no es múltiplo de $4$`;
      return `Para el $12$ hacen falta el $3$ **y** el $4$. ${num}: ${part3} y ${part4}. Por tanto ${verdict}.`;
    }
    case 11: {
      const { odd, even, diff } = alternating(n);
      const oddTex = odd.length > 1 ? `(${odd.join(" + ")})` : String(odd[0]);
      const evenTex = even.length > 1 ? `(${even.join(" + ")})` : String(even[0] ?? 0);
      const reading =
        diff === 0 ? "es $0$" : diff % 11 === 0 ? `es múltiplo de $11$` : `no es $0$ ni múltiplo de $11$`;
      return `Cifras de posición impar menos cifras de posición par en ${num}: $${oddTex} - ${evenTex} = ${diff}$, que ${reading}. Por eso ${verdict}.`;
    }
    default:
      return `${num} ${yes ? "es" : "no es"} divisible entre $${divisor}$.`;
  }
}
