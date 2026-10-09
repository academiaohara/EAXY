/** Operadores unicode usados en la lección de jerarquía (coinciden con el prototipo HTML). */
export type JerarquiaOp = "+" | "−" | "×" | "÷" | ":";

export function isJerarquiaOperator(token: string): token is JerarquiaOp {
  return token === "+" || token === "−" || token === "×" || token === "÷" || token === ":";
}

export function calcBinary(left: string, op: string, right: string): string {
  const x = Number(left);
  const y = Number(right);
  if (op === "+") {
    return String(x + y);
  }
  if (op === "−") {
    return String(x - y);
  }
  if (op === "×") {
    return String(x * y);
  }
  return String(x / y);
}

export type PickOperationResult = {
  /** Índice del operador a aplicar en `tokens`. */
  m: number;
  a: number;
  b: number;
  /** La operación elegida está dentro de un paréntesis. */
  p: boolean;
};

/** Devuelve qué operación debe aplicarse ahora según jerarquía y lectura izquierda-derecha. */
export function pickNextOperation(tokens: readonly string[]): PickOperationResult {
  let a = 0;
  let b = tokens.length - 1;
  let p = false;
  const close = tokens.indexOf(")");
  if (close >= 0) {
    let open = close;
    while (tokens[open] !== "(") {
      open -= 1;
    }
    a = open + 1;
    b = close - 1;
    p = true;
  }
  let m = -1;
  for (let i = a; i <= b; i += 1) {
    const t = tokens[i];
    if ((t === "×" || t === "÷" || t === ":") && !/\d/.test(t)) {
      m = i;
      break;
    }
  }
  if (m < 0) {
    for (let i = a; i <= b; i += 1) {
      if (tokens[i] === "+" || tokens[i] === "−") {
        m = i;
        break;
      }
    }
  }
  return { m, a, b, p };
}

export function collapseParenthesisGroups(tokens: string[]): string[] {
  const next = [...tokens];
  for (let j = 0; j < next.length - 2; j += 1) {
    if (next[j] === "(" && next[j + 2] === ")") {
      next.splice(j, 3, next[j + 1] ?? "");
      break;
    }
  }
  return next;
}

export function applyOperationAt(tokens: readonly string[], opIndex: number): string[] {
  const left = tokens[opIndex - 1];
  const op = tokens[opIndex];
  const right = tokens[opIndex + 1];
  if (left === undefined || op === undefined || right === undefined) {
    return [...tokens];
  }
  const value = calcBinary(left, op, right);
  const next = [...tokens];
  next.splice(opIndex - 1, 3, value);
  return collapseParenthesisGroups(next);
}

export function wrongTapMessage(
  tokens: readonly string[],
  tappedIndex: number,
  pick: PickOperationResult,
): string {
  const tapped = tokens[tappedIndex];
  const correct = tokens[pick.m];
  if (pick.p && (tappedIndex < pick.a || tappedIndex > pick.b)) {
    return "Antes va lo de dentro del paréntesis.";
  }
  if (
    tapped &&
    (tapped === "+" || tapped === "−") &&
    correct &&
    (correct === "×" || correct === "÷" || correct === ":")
  ) {
    return "× y ÷ van antes que + y −.";
  }
  return "Mismo nivel: de izquierda a derecha.";
}

export function operationHighlightLevel(
  tokens: readonly string[],
  opIndex: number,
  pick: PickOperationResult,
): 1 | 2 | 3 {
  if (pick.p && opIndex >= pick.a && opIndex <= pick.b) {
    return 1;
  }
  const op = tokens[opIndex];
  if (op === "×" || op === "÷" || op === ":") {
    return 2;
  }
  return 3;
}
