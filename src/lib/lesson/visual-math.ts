/** Término $kx$ con el signo y el coeficiente escritos como en la pizarra. */
function linearTerm(coefficient: number, variable: string, first: boolean): string {
  if (coefficient === 0) {
    return "";
  }
  const sign = coefficient < 0 ? "-" : "+";
  const magnitude = Math.abs(coefficient);
  const body = magnitude === 1 ? variable : `${magnitude}${variable}`;
  if (first) {
    return coefficient < 0 ? `-${body}` : body;
  }
  return ` ${sign} ${body}`;
}

/** Escribe $ax + by = c$ en LaTeX, sin «1x» ni «+ -2y». */
export function formatLinearEquation(a: number, b: number, c: number): string {
  const left = `${linearTerm(a, "x", true)}${linearTerm(b, "y", a === 0)}`.trim();
  return `${left || "0"} = ${c}`;
}

function wrapNegative(value: number): string {
  return value < 0 ? `(${value})` : String(value);
}

export type SubstitutionCheck = {
  /** Sustitución escrita, p. ej. `2 + 2 \cdot 1`. */
  expression: string;
  value: number;
  holds: boolean;
};

/** Sustituye $(x, y)$ en $ax + by$ y dice si da $c$. */
export function checkLinearPair(a: number, b: number, c: number, [x, y]: [number, number]): SubstitutionCheck {
  const parts: string[] = [];
  if (a !== 0) {
    parts.push(a === 1 ? wrapNegative(x) : `${a} \\cdot ${wrapNegative(x)}`);
  }
  if (b !== 0) {
    const magnitude = Math.abs(b);
    const term = magnitude === 1 ? wrapNegative(y) : `${magnitude} \\cdot ${wrapNegative(y)}`;
    if (parts.length === 0) {
      parts.push(b < 0 ? `-${term}` : term);
    } else {
      parts.push(`${b < 0 ? "-" : "+"} ${term}`);
    }
  }
  const value = a * x + b * y;
  return { expression: parts.join(" ") || "0", value, holds: value === c };
}
