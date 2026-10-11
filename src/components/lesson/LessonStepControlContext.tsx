"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
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

/** Avance/retroceso de fases de animación (teclado ←/→ y controles del centro del pie). */
export type LessonPresenterNavigation = {
  onAdvance: () => void;
  onRetreat: () => void;
  canAdvance?: boolean;
  canRetreat?: boolean;
};

type StackEntry<T> = {
  id: symbol;
  value: T | null;
};

function stackTop<T>(stack: StackEntry<T>[]): T | null {
  if (stack.length === 0) {
    return null;
  }
  return stack[stack.length - 1]!.value;
}

function upsertStackEntry<T>(stack: StackEntry<T>[], id: symbol, value: T | null) {
  const index = stack.findIndex((entry) => entry.id === id);
  if (index >= 0) {
    stack[index]!.value = value;
    return;
  }
  stack.push({ id, value });
}

function removeStackEntry<T>(stack: StackEntry<T>[], id: symbol) {
  const index = stack.findIndex((entry) => entry.id === id);
  if (index >= 0) {
    stack.splice(index, 1);
  }
}

type LessonStepControlContextValue = {
  control: LessonStepControl | null;
  registerControl: (ownerId: symbol, control: LessonStepControl | null) => void;
  unregisterControl: (ownerId: symbol) => void;
  footerCenter: ReactNode | null;
  registerFooterCenter: (ownerId: symbol, node: ReactNode | null) => void;
  unregisterFooterCenter: (ownerId: symbol) => void;
  presenterNav: LessonPresenterNavigation | null;
  registerPresenterNav: (ownerId: symbol, nav: LessonPresenterNavigation | null) => void;
  unregisterPresenterNav: (ownerId: symbol) => void;
};

const LessonStepControlContext = createContext<LessonStepControlContextValue | null>(null);

export function LessonStepControlProvider({ children }: { children: ReactNode }) {
  const controlStackRef = useRef<StackEntry<LessonStepControl>[]>([]);
  const footerStackRef = useRef<StackEntry<ReactNode>[]>([]);
  const presenterNavStackRef = useRef<StackEntry<LessonPresenterNavigation>[]>([]);

  const [control, setControl] = useState<LessonStepControl | null>(null);
  const [footerCenter, setFooterCenter] = useState<ReactNode | null>(null);
  const [presenterNav, setPresenterNav] = useState<LessonPresenterNavigation | null>(null);

  const syncControl = useCallback(() => {
    setControl((prev) => {
      const top = stackTop(controlStackRef.current);
      if (controlSignature(prev) === controlSignature(top)) {
        return top ?? prev;
      }
      return top;
    });
  }, []);

  const registerControl = useCallback(
    (ownerId: symbol, next: LessonStepControl | null) => {
      upsertStackEntry(controlStackRef.current, ownerId, next);
      syncControl();
    },
    [syncControl],
  );

  const unregisterControl = useCallback(
    (ownerId: symbol) => {
      removeStackEntry(controlStackRef.current, ownerId);
      syncControl();
    },
    [syncControl],
  );

  const syncFooterCenter = useCallback(() => {
    setFooterCenter((prev) => {
      const top = stackTop(footerStackRef.current);
      return prev === top ? prev : top;
    });
  }, []);

  const registerFooterCenter = useCallback(
    (ownerId: symbol, node: ReactNode | null) => {
      upsertStackEntry(footerStackRef.current, ownerId, node);
      syncFooterCenter();
    },
    [syncFooterCenter],
  );

  const unregisterFooterCenter = useCallback(
    (ownerId: symbol) => {
      removeStackEntry(footerStackRef.current, ownerId);
      syncFooterCenter();
    },
    [syncFooterCenter],
  );

  const syncPresenterNav = useCallback(() => {
    setPresenterNav((prev) => {
      const top = stackTop(presenterNavStackRef.current);
      return prev === top ? prev : top;
    });
  }, []);

  const registerPresenterNav = useCallback(
    (ownerId: symbol, nav: LessonPresenterNavigation | null) => {
      upsertStackEntry(presenterNavStackRef.current, ownerId, nav);
      syncPresenterNav();
    },
    [syncPresenterNav],
  );

  const unregisterPresenterNav = useCallback(
    (ownerId: symbol) => {
      removeStackEntry(presenterNavStackRef.current, ownerId);
      syncPresenterNav();
    },
    [syncPresenterNav],
  );

  const value = useMemo(
    () => ({
      control,
      registerControl,
      unregisterControl,
      footerCenter,
      registerFooterCenter,
      unregisterFooterCenter,
      presenterNav,
      registerPresenterNav,
      unregisterPresenterNav,
    }),
    [
      control,
      footerCenter,
      presenterNav,
      registerControl,
      registerFooterCenter,
      registerPresenterNav,
      unregisterControl,
      unregisterFooterCenter,
      unregisterPresenterNav,
    ],
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

function useRegistrationOwnerId() {
  const ownerIdRef = useRef<symbol | null>(null);
  if (ownerIdRef.current === null) {
    ownerIdRef.current = Symbol("lesson-step-registration");
  }
  return ownerIdRef.current;
}

export function useRegisterLessonStepControl(control: LessonStepControl | null) {
  const { registerControl, unregisterControl } = useLessonStepControl();
  const ownerId = useRegistrationOwnerId();
  const signature = controlSignature(control);
  const controlRef = useRef(control);
  controlRef.current = control;

  useLayoutEffect(() => {
    registerControl(ownerId, controlRef.current);
  }, [ownerId, registerControl, signature]);

  useLayoutEffect(() => {
    return () => unregisterControl(ownerId);
  }, [ownerId, unregisterControl]);
}

/** Controles de animación / sub-pasos en el centro del pie (Continuar va a la derecha junto a Saltar). */
export function useRegisterLessonFooterCenter(node: ReactNode | null) {
  const { registerFooterCenter, unregisterFooterCenter } = useLessonStepControl();
  const ownerId = useRegistrationOwnerId();
  const nodeRef = useRef(node);
  nodeRef.current = node;

  useLayoutEffect(() => {
    registerFooterCenter(ownerId, nodeRef.current);
  }, [node, ownerId, registerFooterCenter]);

  useLayoutEffect(() => {
    return () => unregisterFooterCenter(ownerId);
  }, [ownerId, unregisterFooterCenter]);
}

/** Montar solo cuando este paso aporta controles al pie (evita pisar el registro de escenas hijas). */
export function LessonFooterCenterSlot({ children }: { children: ReactNode }) {
  useRegisterLessonFooterCenter(children);
  return null;
}

export function useRegisterLessonPresenterNavigation(nav: LessonPresenterNavigation | null) {
  const { registerPresenterNav, unregisterPresenterNav } = useLessonStepControl();
  const ownerId = useRegistrationOwnerId();
  const navRef = useRef(nav);
  navRef.current = nav;

  useLayoutEffect(() => {
    registerPresenterNav(ownerId, navRef.current);
  });

  useLayoutEffect(() => {
    return () => unregisterPresenterNav(ownerId);
  }, [ownerId, unregisterPresenterNav]);
}
