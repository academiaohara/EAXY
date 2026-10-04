/** Pasos visibles del algoritmo de división «en rincón» (ESO). */
export type DivisionAlgorithmStep = {
  caption: string;
  /** Cifras del cociente mostradas (de izquierda a derecha). */
  quotientDigits: string;
  /** Número activo bajo el dividendo (resto parcial ×10 + cifra bajada). */
  working: string;
  /** Producto divisor × cifra del cociente que se resta. */
  subtract?: string;
  /** Resto tras la resta. */
  remainderLine?: string;
  highlightQuotientIndex?: number;
};

export function buildDivisionAlgorithmSteps(
  dividend: number,
  divisor: number,
): DivisionAlgorithmStep[] {
  const dStr = String(dividend);
  const steps: DivisionAlgorithmStep[] = [
    {
      caption: "Coloca el **dividendo** y el **divisor**. El cociente irá arriba.",
      quotientDigits: "",
      working: "",
    },
  ];

  let quotient = "";
  let remainder = 0;
  let working = "";

  for (let i = 0; i < dStr.length; i += 1) {
    const digit = Number(dStr[i]);
    remainder = remainder * 10 + digit;
    working = String(remainder);

    if (remainder < divisor) {
      if (quotient.length > 0) {
        quotient += "0";
      }
      steps.push({
        caption:
          i === 0
            ? `La cifra ${digit} es menor que ${divisor}: aún no hay cifra en el cociente.`
            : `Bajamos el ${digit}: formamos **${working}**.`,
        quotientDigits: quotient,
        working,
      });
      continue;
    }

    const qDigit = Math.floor(remainder / divisor);
    const product = qDigit * divisor;
    const newRem = remainder - product;
    quotient += String(qDigit);

    steps.push({
      caption: `¿Cuántas veces cabe ${divisor} en **${working}**? **${qDigit}** veces (${qDigit} · ${divisor} = ${product}).`,
      quotientDigits: quotient,
      working,
      subtract: String(product),
      remainderLine: String(newRem),
      highlightQuotientIndex: quotient.length - 1,
    });

    remainder = newRem;
    working = remainder === 0 && i < dStr.length - 1 ? "0" : String(remainder);
  }

  const exact = remainder === 0;
  steps.push({
    caption: exact
      ? `Resto **0**: división **exacta**. ${dividend} = ${divisor} · ${quotient}.`
      : `Sobra **${remainder}**: división **entera**. ${dividend} = ${divisor} · ${quotient} + ${remainder}.`,
    quotientDigits: quotient,
    working: String(remainder),
  });

  return steps;
}

export type MultiplicationAlgorithmStep = {
  caption: string;
  /** Líneas parciales visibles (texto alineado). */
  partialLines: { text: string; tone: "accent" | "muted" }[];
  /** Resultado final, si ya se sumó. */
  total?: string;
  highlightRow?: number;
};

/** Algoritmo clásico: multiplica por cada cifra del segundo factor y suma. */
export function buildMultiplicationAlgorithmSteps(
  multiplicand: number,
  multiplier: number,
): MultiplicationAlgorithmStep[] {
  const mStr = String(multiplicand);
  const tStr = String(multiplier);
  const steps: MultiplicationAlgorithmStep[] = [
    {
      caption: "Alinea los factores y multiplica la cifra de las **unidades** del segundo factor.",
      partialLines: [],
    },
  ];

  const partials: { value: number; shift: number; digit: number }[] = [];
  for (let i = tStr.length - 1; i >= 0; i -= 1) {
    const digit = Number(tStr[i]);
    const shift = tStr.length - 1 - i;
    partials.push({ value: multiplicand * digit, shift, digit });
  }

  const formatPartial = (p: { value: number; shift: number }) => {
    const scaled = p.value * 10 ** p.shift;
    return String(scaled);
  };

  partials.forEach((part, index) => {
    const label =
      part.shift === 0
        ? `${multiplicand} · ${part.digit} = ${part.value}`
        : `${multiplicand} · ${part.digit} · 10 = ${formatPartial(part)} (desplazada una columna)`;

    steps.push({
      caption: label,
      partialLines: partials.slice(0, index + 1).map((p, row) => ({
        text: formatPartial(p),
        tone: row === index ? "accent" : "muted",
      })),
      highlightRow: index,
    });
  });

  const total = multiplicand * multiplier;
  steps.push({
    caption: "Suma las filas parciales para obtener el **producto**.",
    partialLines: partials.map((p) => ({
      text: formatPartial(p),
      tone: "muted" as const,
    })),
    total: String(total),
  });

  return steps;
}
