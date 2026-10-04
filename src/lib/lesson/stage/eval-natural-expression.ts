/**
 * Evalúa expresiones de números naturales con +, − y paréntesis.
 * Sin paréntesis: sumas y restas de izquierda a derecha (como en la lección).
 */

function tokenize(input: string): string[] {
  const normalized = input.replace(/−/g, "-").replace(/\s+/g, "");
  const tokens: string[] = [];
  let index = 0;
  while (index < normalized.length) {
    const char = normalized[index]!;
    if (char === "+" || char === "-" || char === "(" || char === ")") {
      tokens.push(char);
      index += 1;
      continue;
    }
    let end = index;
    while (end < normalized.length && /[0-9]/.test(normalized[end]!)) {
      end += 1;
    }
    if (end === index) {
      return [];
    }
    tokens.push(normalized.slice(index, end));
    index = end;
  }
  return tokens;
}

function parsePrimary(tokens: string[], index: { i: number }): number | null {
  const token = tokens[index.i];
  if (!token) {
    return null;
  }

  if (token === "(") {
    index.i += 1;
    const inner = parseExpression(tokens, index);
    if (inner === null || tokens[index.i] !== ")") {
      return null;
    }
    index.i += 1;
    return inner;
  }

  if (token === ")") {
    return null;
  }

  const value = Number.parseInt(token, 10);
  if (Number.isNaN(value) || value < 0) {
    return null;
  }
  index.i += 1;
  return value;
}

function parseExpression(tokens: string[], index: { i: number }): number | null {
  let value = parsePrimary(tokens, index);
  if (value === null) {
    return null;
  }

  while (index.i < tokens.length) {
    const op = tokens[index.i];
    if (op !== "+" && op !== "-") {
      break;
    }
    index.i += 1;
    const right = parsePrimary(tokens, index);
    if (right === null) {
      return null;
    }
    if (op === "+") {
      value += right;
    } else {
      if (value < right) {
        return null;
      }
      value -= right;
    }
  }

  return value;
}

export function evalNaturalExpression(source: string): number | null {
  const tokens = tokenize(source);
  if (tokens.length === 0) {
    return null;
  }
  const index = { i: 0 };
  const result = parseExpression(tokens, index);
  if (result === null || index.i !== tokens.length) {
    return null;
  }
  return result;
}

export function tokensToExpression(tokens: string[], openAfter: number | null, closeBefore: number | null): string {
  const parts: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (openAfter !== null && i === openAfter + 1) {
      parts.push("(");
    }
    parts.push(tokens[i]!);
    if (closeBefore !== null && i === closeBefore) {
      parts.push(")");
    }
  }
  return parts.join(" ");
}

/** Índices: paréntesis abre justo después del token `openAfter`; cierra justo después del token `closeBefore`. */
export function evalWithParenthesisPlacement(
  tokens: string[],
  openAfter: number | null,
  closeBefore: number | null,
): number | null {
  if (openAfter === null !== (closeBefore === null)) {
    return null;
  }
  if (openAfter === null) {
    return evalNaturalExpression(tokens.join(" "));
  }
  if (openAfter < -1 || closeBefore === null || closeBefore < openAfter + 1) {
    return null;
  }
  const expr = tokensToExpression(tokens, openAfter, closeBefore);
  return evalNaturalExpression(expr);
}

export function isValidParenthesisPlacement(
  tokens: string[],
  openAfter: number | null,
  closeBefore: number | null,
): boolean {
  return evalWithParenthesisPlacement(tokens, openAfter, closeBefore) !== null;
}
