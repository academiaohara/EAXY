/** Huecos entre operandos en `9 - 1 + 3` (índices 0 y 1). */
export type ParenthesisGap = 0 | 1;

export function gapToPlacement(gap: ParenthesisGap): {
  openAfter: number;
  closeBefore: number;
} {
  if (gap === 0) {
    return { openAfter: -1, closeBefore: 2 };
  }
  return { openAfter: 1, closeBefore: 4 };
}

export function placementToGap(
  openAfter: number | null,
  closeBefore: number | null,
): ParenthesisGap | null {
  if (openAfter === -1 && closeBefore === 2) {
    return 0;
  }
  if (openAfter === 1 && closeBefore === 4) {
    return 1;
  }
  return null;
}
