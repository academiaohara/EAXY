/** Utilidades de los números decimales: se trabaja con el texto («2,375») y con enteros escalados, nunca con coma flotante. */

export type Dec = { int: string; frac: string };

export function parseDec(text: string): Dec {
  const [int = "0", frac = ""] = text.trim().replace(".", ",").split(",");
  return { int: int.replace(/^0+(?=\d)/, "") || "0", frac };
}

/** Todas las cifras como un entero: «12,85» → 1285. */
export function scaled(text: string): number {
  const { int, frac } = parseDec(text);
  return Number(`${int}${frac}`);
}

/** Entero escalado con `decimals` cifras decimales → texto con coma: (1115, 2) → «11,15». */
export function fromScaled(value: number, decimals: number): string {
  const digits = String(Math.round(value)).padStart(decimals + 1, "0");
  return decimals === 0 ? digits : `${digits.slice(0, -decimals)},${digits.slice(-decimals)}`;
}

/** Con una cifra decimal de más o de menos hasta `decimals` (rellena con ceros). */
export function padFrac(text: string, decimals: number): string {
  const { int, frac } = parseDec(text);
  return decimals === 0 ? int : `${int},${frac.padEnd(decimals, "0")}`;
}

/** Quita ceros sobrantes a la derecha de la coma («2,50» → «2,5», «3,0» → «3»). */
export function trimDec(text: string): string {
  const { int, frac } = parseDec(text);
  const f = frac.replace(/0+$/, "");
  return f ? `${int},${f}` : int;
}

/** LaTeX con coma sin espacio: «2,5» → «2{,}5». */
export function texDec(text: string): string {
  return text.replace(",", "{,}");
}

const UNITS = [
  "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece",
  "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte", "veintiuno", "veintidós",
  "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve",
];
const TENS = ["", "", "", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const HUNDREDS = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

function below1000(n: number): string {
  if (n === 100) {
    return "cien";
  }
  const h = Math.floor(n / 100);
  const rest = n % 100;
  const parts: string[] = [];
  if (h > 0) {
    parts.push(HUNDREDS[h]!);
  }
  if (rest > 0) {
    if (rest < 30) {
      parts.push(UNITS[rest]!);
    } else {
      const u = rest % 10;
      parts.push(u === 0 ? TENS[Math.floor(rest / 10)]! : `${TENS[Math.floor(rest / 10)]} y ${UNITS[u]}`);
    }
  }
  return parts.join(" ");
}

/** Número en palabras (0 – 999 999). Con `fem` concuerda con un sustantivo femenino: «una», «doscientas». */
export function words(n: number, fem = false): string {
  if (n === 0) {
    return "cero";
  }
  const thousands = Math.floor(n / 1000);
  const rest = n % 1000;
  const parts: string[] = [];
  if (thousands > 0) {
    parts.push(thousands === 1 ? "mil" : `${below1000(thousands)} mil`);
  }
  if (rest > 0) {
    parts.push(below1000(rest));
  }
  let text = parts.join(" ");
  if (fem) {
    text = text.replace(/uno\b/g, "una").replace(/(\w)ientos\b/g, "$1ientas");
  }
  return text;
}

export const ORDER_PLURAL = ["décimas", "centésimas", "milésimas", "diezmilésimas", "cienmilésimas", "millonésimas"];
export const ORDER_SINGULAR = ["décima", "centésima", "milésima", "diezmilésima", "cienmilésima", "millonésima"];
/** Valor de una unidad de cada orden, como texto («0,01»). */
export const ORDER_VALUE = ["0,1", "0,01", "0,001", "0,0001", "0,00001", "0,000001"];
/** Rótulos de columna de la tabla de órdenes. */
export const ORDER_ABBR = ["d", "c", "m", "dm", "cm", "mm"];

/** Orden (plural) de la última cifra decimal: «0,05» → «centésimas». */
export function lastOrder(frac: string): string {
  return ORDER_PLURAL[Math.min(frac.length, ORDER_PLURAL.length) - 1] ?? "";
}

/** Cómo se lee un decimal: «13,0574» → «trece unidades y quinientas setenta y cuatro diezmilésimas». */
export function readDec(text: string): string {
  const { int, frac } = parseDec(text);
  const intN = Number(int);
  const fracN = Number(frac || "0");
  const intText = `${words(intN, true)} ${intN === 1 ? "unidad" : "unidades"}`;
  if (!frac || fracN === 0) {
    return intText;
  }
  const order = (fracN === 1 ? ORDER_SINGULAR : ORDER_PLURAL)[frac.length - 1]!;
  const fracText = `${words(fracN, true)} ${order}`;
  return intN === 0 ? fracText : `${intText} y ${fracText}`;
}
