/** Mezcla estable (misma semilla → mismo orden) para opciones de un paso. */
export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  let state = hashSeed(seed);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    const j = state % (i + 1);
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) || 1;
}
