"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react";

type LessonPersistedStateContextValue = {
  getToolState: <T>(stepId: string) => T | undefined;
  setToolState: (stepId: string, value: unknown) => void;
};

const LessonPersistedStateContext = createContext<LessonPersistedStateContextValue | null>(null);

export function LessonPersistedStateProvider({
  toolState,
  onToolStateChange,
  children,
}: {
  toolState: Record<string, unknown>;
  onToolStateChange: Dispatch<SetStateAction<Record<string, unknown>>>;
  children: React.ReactNode;
}) {
  const getToolState = useCallback(
    <T,>(stepId: string): T | undefined => toolState[stepId] as T | undefined,
    [toolState],
  );

  const setToolState = useCallback(
    (stepId: string, value: unknown) => {
      onToolStateChange((prev) => {
        if (Object.is(prev[stepId], value)) {
          return prev;
        }
        return { ...prev, [stepId]: value };
      });
    },
    [onToolStateChange],
  );

  const value = useMemo(
    () => ({
      getToolState,
      setToolState,
    }),
    [getToolState, setToolState],
  );

  return (
    <LessonPersistedStateContext.Provider value={value}>{children}</LessonPersistedStateContext.Provider>
  );
}

export function useLessonPersistedState() {
  const ctx = useContext(LessonPersistedStateContext);
  if (!ctx) {
    throw new Error("useLessonPersistedState debe usarse dentro de LessonPersistedStateProvider");
  }
  return ctx;
}

/** Estado de un minijuego/paso interactivo, persistido al cambiar de diapositiva o salir de la lección. */
export function usePersistedLessonToolState<T>(
  stepId: string,
  createDefault: () => T,
): [T, Dispatch<SetStateAction<T>>] {
  const { getToolState, setToolState } = useLessonPersistedState();
  const stored = getToolState<T>(stepId);
  const state = stored ?? createDefault();

  const setState = useCallback(
    (action: SetStateAction<T>) => {
      const current = getToolState<T>(stepId) ?? createDefault();
      const next = typeof action === "function" ? (action as (value: T) => T)(current) : action;
      setToolState(stepId, next);
    },
    [createDefault, getToolState, setToolState, stepId],
  );

  return [state, setState];
}
