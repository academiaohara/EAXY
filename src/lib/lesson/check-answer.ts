/** Normaliza una expresión algebraica simple para comparación flexible. */
export function normalizeMathExpression(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/\*\*/g, "^")
    .replace(/\^2/g, "²")
    .replace(/²/g, "^2")
    .replace(/\+-/g, "-")
    .replace(/--/g, "+");
}

/** Comprueba si la respuesta del alumno coincide con alguna variante aceptada. */
export function checkFillInBlankAnswer(input: string, acceptedAnswers: string[]): boolean {
  const normalizedInput = normalizeMathExpression(input);
  return acceptedAnswers.some(
    (answer) => normalizeMathExpression(answer) === normalizedInput,
  );
}

/** Ordena sumandos simples para aceptar "1+x" y "x+1". */
export function normalizeCommutativeSum(value: string): string {
  const normalized = normalizeMathExpression(value);
  if (!normalized.includes("+") || normalized.includes("(")) {
    return normalized;
  }
  const parts = normalized.split("+").filter(Boolean).sort();
  return parts.join("+");
}

export function checkFillInBlankAnswerFlexible(
  input: string,
  acceptedAnswers: string[],
): boolean {
  const normalizedInput = normalizeCommutativeSum(input);
  return acceptedAnswers.some(
    (answer) => normalizeCommutativeSum(answer) === normalizedInput,
  );
}
