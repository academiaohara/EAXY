"use client";

import { useCallback, useEffect, useState } from "react";
import { readLocalProgress } from "@/lib/local-progress/storage";
import type { LocalProgressStore } from "@/lib/local-progress/types";

export function useLocalProgress(): LocalProgressStore {
  const [store, setStore] = useState<LocalProgressStore>(() =>
    typeof window === "undefined" ? { version: 1, lessons: {}, exercises: {} } : readLocalProgress(),
  );

  const refresh = useCallback(() => {
    setStore(readLocalProgress());
  }, []);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("eaxy-local-progress-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("eaxy-local-progress-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, [refresh]);

  return store;
}
