export type BudgetItem = { id: string; price: number };

export type MaxSpendSolution = {
  ids: string[];
  spend: number;
  remainder: number;
};

/** Gasto máximo ≤ presupuesto (enumeración de subconjuntos). */
export function bestSpendUnderBudget(
  items: BudgetItem[],
  budget: number,
): MaxSpendSolution | null {
  let best: MaxSpendSolution | null = null;

  const n = items.length;
  for (let mask = 0; mask < 1 << n; mask += 1) {
    const ids: string[] = [];
    let spend = 0;
    for (let i = 0; i < n; i += 1) {
      if (mask & (1 << i)) {
        ids.push(items[i]!.id);
        spend += items[i]!.price;
      }
    }
    if (spend > budget) {
      continue;
    }
    if (!best || spend > best.spend) {
      best = { ids: ids.sort(), spend, remainder: budget - spend };
    }
  }

  return best;
}

export function isOptimalPurchase(
  selectedIds: string[],
  items: BudgetItem[],
  budget: number,
): boolean {
  const best = bestSpendUnderBudget(items, budget);
  if (!best) {
    return false;
  }
  const sorted = [...selectedIds].sort();
  return sorted.length === best.ids.length && sorted.every((id, index) => id === best.ids[index]);
}
