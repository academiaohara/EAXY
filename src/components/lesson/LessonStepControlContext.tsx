"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type LessonContinueMeta = {
  /** Si false, el alumno avanza pero el paso no queda marcado como completado. */
  completed?: boolean;
};

export type LessonStepControl = {
  label: string;
  onClick: (meta?: LessonContinueMeta) => void;
  disabled?: boolean;
  testId?: string;
  /** Sustituye «Atrás» del pie cuando el paso tiene sub-navegación interna. */
  onBack?: () => void;
};

type LessonStepControlContextValue = {
  control: LessonStepControl | null;
  setControl: (control: LessonStepControl | null) => void;
};

const LessonStepControlContext = createContext<LessonStepControlContextValue | null>(null);

export function LessonStepControlProvider({ children }: { children: ReactNode }) {
  const [control, setControl] = useState<LessonStepControl | null>(null);
  const value = useMemo(() => ({ control, setControl }), [control]);

  return (
    <LessonStepControlContext.Provider value={value}>{children}</LessonStepControlContext.Provider>
  );
}

export function useLessonStepControl() {
  const context = useContext(LessonStepControlContext);
  if (!context) {
    throw new Error("useLessonStepControl debe usarse dentro de LessonStepControlProvider");
  }
  return context;
}

function controlSignature(control: LessonStepControl | null): string {
  if (!control) {
    return "null";
  }
  return `${control.label}|${control.disabled ? "1" : "0"}|${control.testId ?? ""}|${control.onBack ? "back" : ""}`;
}

export function useRegisterLessonStepControl(control: LessonStepControl | null) {
  const { setControl } = useLessonStepControl();
  const signature = controlSignature(control);

  useEffect(() => {
    setControl(control);
    return () => setControl(null);
  }, [control, signature, setControl]);
}
