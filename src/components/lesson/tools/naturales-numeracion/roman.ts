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
