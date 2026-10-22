/** Desarrollo decimal de fracciones y fracción generatriz, solo con enteros (sin coma flotante). */

export function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

export type Expansion = {
  /** Parte entera (valor absoluto). */
  int: number;
  /** Cifras decimales hasta que acaba o se repite el primer resto (sin repetir el periodo). */
  pre: string;
  /** Cifras del periodo (vacío si el decimal es exacto). */
  per: string;
  /** Restos sucesivos: `rems[0]` es el resto tras la parte entera y `rems[i]` el resto tras la cifra `i`. */
  rems: number[];
  /** Posición (en `rems`) en la que empieza el periodo; −1 si es exacto. */
  loopAt: number;
  kind: "exacto" | "puro" | "mixto";
};

/** División decimal de `n` entre `d` (d > 0) con detección del periodo por repetición de restos. */
export function expandFraction(n: number, d: number): Expansion {
  const num = Math.abs(n);
  const int = Math.floor(num / d);
  let r = num % d;
  const rems = [r];
  const digits: string[] = [];
  const seen = new Map<number, number>([[r, 0]]);
  let loopAt = -1;
  while (r !== 0) {
    r *= 10;
    digits.push(String(Math.floor(r / d)));
    r %= d;
    const prev = seen.get(r);
    if (prev !== undefined) {
      loopAt = prev;
      rems.push(r);
      break;
    }
    seen.set(r, rems.length);
    rems.push(r);
  }
  if (loopAt === -1) {
    return { int, pre: digits.join(""), per: "", rems, loopAt, kind: "exacto" };
  }
  return {
    int,
    pre: digits.slice(0, loopAt).join(""),
    per: digits.slice(loopAt).join(""),
    rems,
    loopAt,
    kind: loopAt === 0 ? "puro" : "mixto",
  };
}

/** Escribe el desarrollo en LaTeX con coma y arco sobre el periodo: `3{,}8\overline{4}`. */
export function expansionTex(e: Expansion, negative = false): string {
  const sign = negative ? "-" : "";
  const dec = e.pre + (e.per ? `\\overline{${e.per}}` : "");
  return `${sign}${e.int}${dec ? `{,}${dec}` : ""}`;
}

/** Fracción generatriz de `int , ante periodo…` (número positivo). */
export function generatrix(int: string, ante: string, per: string): { n: number; d: number } {
  const a = ante.length;
  const p = per.length;
  const base = Number(`${int}${ante}`);
  if (p === 0) {
    const d = 10 ** a;
    const g = gcd(base, d);
    return { n: base / g, d: d / g };
  }
  const full = Number(`${int}${ante}${per}`);
  const n = full - base;
  const d = (10 ** p - 1) * 10 ** a;
  const g = gcd(n, d) || 1;
  return { n: n / g, d: d / g };
}

/** Cadena de cifras de `int,ante per per per…` desplazada `k` lugares: «384,8484…». */
export function shiftedPeriodic(int: string, ante: string, per: string, k: number, reps = 3): string {
  const intDigits = int.replace(/^0+(?=\d)/, "") || "0";
  const stream = `${intDigits === "0" && k > 0 ? "" : intDigits}${ante}${per.repeat(reps)}`;
  const point = (intDigits === "0" && k > 0 ? 0 : intDigits.length) + k;
  const head = stream.slice(0, point).replace(/^0+(?=\d)/, "") || "0";
  const tail = stream.slice(point);
  return `${head},${tail}…`;
}
