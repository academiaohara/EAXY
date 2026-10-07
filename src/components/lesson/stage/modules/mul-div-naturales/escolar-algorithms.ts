/** Pasos visibles del algoritmo de división «en rincón» (ESO). */
export type DivisionAlgorithmStep = {
  caption: string;
  /** Cifras del cociente mostradas (de izquierda a derecha). */
  quotientDigits: string;
  /** Número activo bajo el dividendo (resto parcial ×10 + cifra bajada). */
  working?: string;
  /** Producto divisor × cifra del cociente que se resta. */
  subtract?: string;
  /** Resto tras la resta. */
  remainderLine?: string;
  highlightQuotientIndex?: number;
  highlightWorking?: boolean;
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

/** Cinco pasos guiados para $150 : 6$ (cociente bajo el divisor, estilo España). */
export function buildDivisionManoGuidedSteps(
  dividend: number,
  divisor: number,
): DivisionAlgorithmStep[] {
  if (dividend !== 150 || divisor !== 6) {
    return buildDivisionAlgorithmSteps(dividend, divisor);
  }

  return [
    {
      caption:
        "Cogemos las primeras cifras: **15**. ¿Cuántas veces cabe **6** en **15**? **2** veces ($2 \\cdot 6 = 12$).",
      quotientDigits: "2",
      working: "15",
      highlightWorking: true,
      highlightQuotientIndex: 0,
    },
    {
      caption: "Restamos: $15 - 12 = 3$.",
      quotientDigits: "2",
      working: "15",
      subtract: "12",
      remainderLine: "3",
    },
    {
      caption: "Bajamos el **0**: queda **30**.",
      quotientDigits: "2",
      working: "30",
      highlightWorking: true,
    },
    {
      caption:
        "¿Cuántas veces cabe **6** en **30**? **5** veces ($5 \\cdot 6 = 30$).",
      quotientDigits: "25",
      working: "30",
      subtract: "30",
      highlightQuotientIndex: 1,
    },
    {
      caption:
        "Restamos: $30 - 30 = 0$. Cociente **25**, resto **0**. Comprobación: $25 \\cdot 6 = 150$.",
      quotientDigits: "25",
      working: "30",
      remainderLine: "0",
    },
  ];
}

export type MultiplicationResultRow = {
  text: string;
  /** Fila revelada con opacidad plena. */
  revealed: boolean;
  /** Resaltar el cero final (p. ej. el de 340). */
  highlightTrailingZero?: boolean;
};

export type MultiplicationAlgorithmStep = {
  caption: string;
  /** Tres filas fijas: primera parcial, segunda parcial desplazada, producto final. */
  rows: [MultiplicationResultRow, MultiplicationResultRow, MultiplicationResultRow];
  /** Índice de cifra resaltada en el segundo factor (cadena). */
  highlightMultiplierDigitIndex?: number;
  /** Compatibilidad con tests / consumidores legacy. */
  total?: string;
};

/** Algoritmo clásico: cuatro pasos guiados con filas reservadas desde el inicio. */
export function buildMultiplicationAlgorithmSteps(
  multiplicand: number,
  multiplier: number,
): MultiplicationAlgorithmStep[] {
  const tStr = String(multiplier);
  const partials: { value: number; shift: number; digit: number }[] = [];
  for (let i = tStr.length - 1; i >= 0; i -= 1) {
    const digit = Number(tStr[i]);
    const shift = tStr.length - 1 - i;
    partials.push({ value: multiplicand * digit, shift, digit });
  }

  const formatPartial = (p: { value: number; shift: number }) => String(p.value * 10 ** p.shift);
  const row1Text = partials[0] ? formatPartial(partials[0]) : "";
  const row2Text = partials[1] ? formatPartial(partials[1]) : "";
  const totalText = String(multiplicand * multiplier);

  const unitDigitIndex = tStr.length - 1;
  const tensDigitIndex = tStr.length >= 2 ? tStr.length - 2 : 0;

  const faint = (text: string): MultiplicationResultRow => ({ text, revealed: false });
  const revealed = (text: string, extra?: Partial<MultiplicationResultRow>): MultiplicationResultRow => ({
    text,
    revealed: true,
    ...extra,
  });

  const steps: MultiplicationAlgorithmStep[] = [
    {
      caption:
        multiplicand === 34 && multiplier === 12
          ? "Empezamos multiplicando 34 por la cifra de las unidades del segundo factor: 2."
          : `Multiplicamos ${multiplicand} por la cifra de las **unidades** del segundo factor (${tStr[unitDigitIndex]}).`,
      rows: [faint(row1Text), faint(row2Text), faint(totalText)],
      highlightMultiplierDigitIndex: unitDigitIndex,
    },
    {
      caption:
        multiplicand === 34 && multiplier === 12
          ? "2 × 34 = 68. Esta es la primera fila."
          : `${tStr[unitDigitIndex]} × ${multiplicand} = ${row1Text}. Esta es la primera fila.`,
      rows: [revealed(row1Text), faint(row2Text), faint(totalText)],
    },
    {
      caption:
        multiplicand === 34 && multiplier === 12
          ? "Ahora multiplicamos por la cifra de las decenas: 1. Como el 1 son en realidad 10 unidades, desplazamos la fila una posición y añadimos un 0 al final."
          : `Multiplicamos por la siguiente cifra (${tStr[tensDigitIndex]}), desplazamos la fila y añadimos ceros al final.`,
      rows: [
        revealed(row1Text),
        revealed(row2Text, { highlightTrailingZero: row2Text.endsWith("0") }),
        faint(totalText),
      ],
      highlightMultiplierDigitIndex: tensDigitIndex,
    },
    {
      caption:
        multiplicand === 34 && multiplier === 12
          ? "1 × 34 = 34, que desplazado queda 340. Sumamos las filas: 68 + 340 = 408."
          : `Sumamos las filas parciales: **${totalText}**.`,
      rows: [revealed(row1Text), revealed(row2Text), revealed(totalText)],
      total: totalText,
    },
  ];

  return steps;
}
