const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";

/** Exponente en voladito (`3` → `³`); el 1 no se escribe, como en un monomio. */
export function sup(n: number): string {
  if (n <= 1) {
    return "";
  }
  return String(n)
    .split("")
    .map((d) => SUP[Number(d)])
    .join("");
}

/** Monomio de una letra en texto plano: `mono(6, 3)` → `6x³`, `mono(1, 1)` → `x`. */
export function mono(coef: number, exp: number, letter = "x"): string {
  const c = coef === 1 ? "" : coef === -1 ? "−" : String(coef).replace("-", "−");
  return `${c}${exp === 0 ? "" : `${letter}${sup(exp)}`}` || String(coef);
}
