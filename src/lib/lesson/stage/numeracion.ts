const ROMAN_VALUES: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

/** Valor de una cadena romana (recorrido izquierda → derecha con restas). */
export function romanToInt(raw: string): number {
  const s = raw.toUpperCase().replace(/[^IVXLCDM]/g, "");
  if (!s) {
    return 0;
  }
  let total = 0;
  for (let i = 0; i < s.length; i += 1) {
    const val = ROMAN_VALUES[s[i] ?? ""] ?? 0;
    const next = ROMAN_VALUES[s[i + 1] ?? ""] ?? 0;
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

/** Convierte un entero entre 1 y 3999 a numeral romano. */
export function intToRoman(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > 3999) {
    return "";
  }
  let rest = n;
  let out = "";
  for (const [value, sym] of ROMAN_TABLE) {
    while (rest >= value) {
      out += sym;
      rest -= value;
    }
  }
  return out;
}

export type EgyptianBreakdown = {
  thousands: number;
  hundreds: number;
  tens: number;
  ones: number;
};

/** Cuántos glifos egipcios hacen falta para representar `n`. */
export function egyptianBreakdown(n: number): EgyptianBreakdown {
  const safe = Math.max(0, Math.floor(n));
  return {
    thousands: Math.floor(safe / 1000),
    hundreds: Math.floor((safe % 1000) / 100),
    tens: Math.floor((safe % 100) / 10),
    ones: safe % 10,
  };
}

/** Valor posicional de cada cifra, p. ej. 35318 → [30000, 5000, 300, 10, 8]. */
export function positionalBreakdown(n: number): number[] {
  const s = String(Math.max(0, Math.floor(n)));
  const len = s.length;
  return [...s].map((digit, index) => Number(digit) * 10 ** (len - 1 - index));
}

export type RomanStepAction = "suma" | "resta";

export type RomanStep = {
  letter: string;
  action: RomanStepAction;
  value: number;
  runningTotal: number;
};

/** Pasos del recorrido romano para animar cursor y acumulado. */
export function romanSteps(raw: string): RomanStep[] {
  const s = raw.toUpperCase().replace(/[^IVXLCDM]/g, "");
  const steps: RomanStep[] = [];
  let total = 0;
  for (let i = 0; i < s.length; i += 1) {
    const letter = s[i] ?? "";
    const val = ROMAN_VALUES[letter] ?? 0;
    const next = ROMAN_VALUES[s[i + 1] ?? ""] ?? 0;
    const action: RomanStepAction = val < next ? "resta" : "suma";
    if (action === "resta") {
      total -= val;
    } else {
      total += val;
    }
    steps.push({ letter, action, value: val, runningTotal: total });
  }
  return steps;
}

/** Descomposición prehistórica: personas (20), manos (5), palitos (1). */
export function prehistoricBreakdown(n: number): { people: number; hands: number; sticks: number } {
  let rest = Math.max(0, Math.floor(n));
  const people = Math.floor(rest / 20);
  rest -= people * 20;
  const hands = Math.floor(rest / 5);
  rest -= hands * 5;
  return { people, hands, sticks: rest };
}
