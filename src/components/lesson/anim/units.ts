/** Unidades del sistema métrico decimal: columnas de la tabla de múltiplos y submúltiplos. */

export type UnitFamily = "m" | "l" | "g" | "m2";

export const UNIT_COLS: Record<UnitFamily, string[]> = {
  m: ["km", "hm", "dam", "m", "dm", "cm", "mm"],
  l: ["kl", "hl", "dal", "l", "dl", "cl", "ml"],
  g: ["kg", "hg", "dag", "g", "dg", "cg", "mg"],
  m2: ["km²", "hm²", "dam²", "m²", "dm²", "cm²", "mm²"],
};

export const PREFIX_NAMES = ["kilo", "hecto", "deca", "", "deci", "centi", "mili"];

/** Cifras que ocupa cada columna: 1 en las unidades lineales y 2 en las de superficie (de 100 en 100). */
export const UNIT_WIDTH: Record<UnitFamily, number> = { m: 1, l: 1, g: 1, m2: 2 };

export const BASE_COL = 3;

/** Índice de columna de una unidad («hm», «hm²», «m2»…). */
export function unitIndex(family: UnitFamily, key: string): number {
  const clean = (s: string) => s.replace("²", "").replace("2", "").trim();
  const i = UNIT_COLS[family].findIndex((c) => clean(c) === clean(key));
  if (i < 0) {
    throw new Error(`Unidad «${key}» desconocida en la familia ${family}`);
  }
  return i;
}

/** Unidad en LaTeX: `km` → `\mathrm{km}`, `km²` → `\mathrm{km}^2`. */
export function unitTex(family: UnitFamily, col: number): string {
  const name = UNIT_COLS[family][col]!.replace("²", "");
  return family === "m2" ? `\\mathrm{${name}}^2` : `\\mathrm{${name}}`;
}

/** Agrupa en miles la parte entera de un texto con coma («15000» → «15 000», «1280,5» → «1 280,5»). */
export function groupDec(text: string): string {
  const [int = "0", frac] = text.split(",");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return frac !== undefined ? `${grouped},${frac}` : grouped;
}

/** Igual que `groupDec` pero para LaTeX (espacio fino y coma sin hueco). */
export function groupTex(text: string): string {
  const [int = "0", frac] = text.split(",");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
  return frac !== undefined ? `${grouped}{,}${frac}` : grouped;
}
