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

/** Avance/retroceso de fases de animación (flechas, clic en pizarra). */
export type LessonPresenterNavigation = {
  onAdvance: () => void;
  onRetreat: () => void;
  canAdvance?: boolean;
  canRetreat?: boolean;
  /** Si true, un clic en la pizarra llama a onAdvance (salvo elementos interactivos). */
  clickSurfaceToAdvance?: boolean;
};

type LessonStepControlContextValue = {
  control: LessonStepControl | null;
  setControl: (control: LessonStepControl | null) => void;
  footerCenter: ReactNode | null;
  setFooterCenter: (node: ReactNode | null) => void;
  presenterNav: LessonPresenterNavigation | null;
  setPresenterNav: (nav: LessonPresenterNavigation | null) => void;
};

const LessonStepControlContext = createContext<LessonStepControlContextValue | null>(null);

export function LessonStepControlProvider({ children }: { children: ReactNode }) {
  const [control, setControl] = useState<LessonStepControl | null>(null);
  const [footerCenter, setFooterCenter] = useState<ReactNode | null>(null);
  const [presenterNav, setPresenterNav] = useState<LessonPresenterNavigation | null>(null);
  const value = useMemo(
    () => ({ control, setControl, footerCenter, setFooterCenter, presenterNav, setPresenterNav }),
    [control, footerCenter, presenterNav],
  );

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

/** Controles de animación / sub-pasos en el centro del pie (Continuar va a la derecha junto a Saltar). */
export function useRegisterLessonFooterCenter(node: ReactNode | null) {
  const { setFooterCenter } = useLessonStepControl();

  useEffect(() => {
    setFooterCenter(node);
    return () => setFooterCenter(null);
  }, [node, setFooterCenter]);
}

/** Montar solo cuando este paso aporta controles al pie (evita pisar el registro de escenas hijas). */
export function LessonFooterCenterSlot({ children }: { children: ReactNode }) {
  useRegisterLessonFooterCenter(children);
  return null;
}

function presenterNavSignature(nav: LessonPresenterNavigation | null): string {
  if (!nav) {
    return "null";
  }
  return `${nav.clickSurfaceToAdvance ? "1" : "0"}|${nav.canAdvance ? "1" : "0"}|${nav.canRetreat ? "1" : "0"}`;
}

export function useRegisterLessonPresenterNavigation(nav: LessonPresenterNavigation | null) {
  const { setPresenterNav } = useLessonStepControl();
  const signature = presenterNavSignature(nav);

  useEffect(() => {
    setPresenterNav(nav);
    return () => setPresenterNav(null);
  }, [nav, signature, setPresenterNav]);
}
