const VALUES: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

/** Valor de una cadena romana (reglas de suma y resta elementales). */
export function romanToInt(raw: string): number {
  const s = raw.toUpperCase().replace(/[^IVXLCDM]/g, "");
  if (!s) {
    return 0;
  }
  let total = 0;
  for (let i = 0; i < s.length; i += 1) {
    const val = VALUES[s[i]] ?? 0;
    const next = VALUES[s[i + 1]] ?? 0;
    if (val < next) {
      total -= val;
    } else {
      total += val;
    }
  }
  return total;
}

const ROMAN_TABLE: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

/** Escritura romana canónica (con restas) de un natural entre 1 y 3999. */
export function intToRoman(n: number): string {
  let rest = Math.trunc(n);
  let out = "";
  for (const [value, symbol] of ROMAN_TABLE) {
    while (rest >= value) {
      out += symbol;
      rest -= value;
    }
  }
  return out;
}
