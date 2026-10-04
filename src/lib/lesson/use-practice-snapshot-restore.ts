"use client";

import { useEffect, useRef } from "react";

/** Sincroniza el estado local cuando el snapshot persistido llega tras rehidratar localStorage. */
export function usePracticeSnapshotRestore<T>(
  snapshot: T | null | undefined,
  apply: (value: T) => void,
): void {
  const applyRef = useRef(apply);
  applyRef.current = apply;

  useEffect(() => {
    if (snapshot == null) {
      return;
    }
    applyRef.current(snapshot);
  }, [snapshot]);
}
