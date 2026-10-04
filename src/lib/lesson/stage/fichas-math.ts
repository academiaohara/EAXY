export type FichaCounts = {
  hundreds: number;
  tens: number;
  ones: number;
};

export function decomposeNatural(n: number): FichaCounts {
  const safe = Math.max(0, Math.floor(n));
  return {
    hundreds: Math.floor(safe / 100),
    tens: Math.floor((safe % 100) / 10),
    ones: safe % 10,
  };
}

export function fichasTotal(counts: FichaCounts): number {
  return counts.hundreds * 100 + counts.tens * 10 + counts.ones;
}

export function addFichaCounts(a: FichaCounts, b: FichaCounts): FichaCounts {
  return {
    hundreds: a.hundreds + b.hundreds,
    tens: a.tens + b.tens,
    ones: a.ones + b.ones,
  };
}

export function subtractFichaCounts(from: FichaCounts, amount: FichaCounts): FichaCounts | null {
  let { hundreds, tens, ones } = from;
  let need = { ...amount };

  const takeOnes = () => {
    while (need.ones > ones) {
      if (tens > 0) {
        tens -= 1;
        ones += 10;
      } else if (hundreds > 0) {
        hundreds -= 1;
        tens += 10;
      } else {
        return false;
      }
    }
    return true;
  };

  const takeTens = () => {
    while (need.tens > tens) {
      if (hundreds > 0) {
        hundreds -= 1;
        tens += 10;
      } else {
        return false;
      }
    }
    return true;
  };

  if (!takeOnes() || !takeTens()) {
    return null;
  }
  if (need.hundreds > hundreds) {
    return null;
  }

  return {
    hundreds: hundreds - need.hundreds,
    tens: tens - need.tens,
    ones: ones - need.ones,
  };
}

/** Canje escolar: 10 unidades → 1 decena; 10 decenas → 1 centena. */
export function normalizeFichaCounts(input: FichaCounts): FichaCounts {
  let { hundreds, tens, ones } = input;
  if (ones >= 10) {
    tens += Math.floor(ones / 10);
    ones %= 10;
  }
  if (tens >= 10) {
    hundreds += Math.floor(tens / 10);
    tens %= 10;
  }
  return { hundreds, tens, ones };
}

export function sumPricesAsFichas(prices: number[]): FichaCounts {
  return normalizeFichaCounts(
    prices.reduce(
      (acc, price) => addFichaCounts(acc, decomposeNatural(price)),
      { hundreds: 0, tens: 0, ones: 0 },
    ),
  );
}
