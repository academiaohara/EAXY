"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  SkipForwardIcon,
  LogOutIcon,
} from "lucide-react";
import {
  LessonSlidesSidebar,
  type LessonSlideNavItem,
} from "@/components/lesson/lesson-slides-sidebar";
import { furthestVisitedStepIndex } from "@/lib/local-progress/interactive-lesson-state";
import { LessonFeedbackActions } from "@/components/lesson/LessonFeedbackActions";
import type { LessonStepControl, LessonPresenterNavigation } from "@/components/lesson/LessonStepControlContext";
import type { FeedbackStatus } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

export type LessonPresenterChromeProps = {
  closeHref: string;
  stepTitle: React.ReactNode;
  steps: LessonSlideNavItem[];
  currentStepIndex: number;
  completedSteps: boolean[];
  visitedSteps: boolean[];
  onGoToStep: (index: number) => void;
  canBack: boolean;
  onBack: () => void;
  onSkip?: () => void;
  control: LessonStepControl | null;
  footerCenter: React.ReactNode | null;
  presenterNav: LessonPresenterNavigation | null;
  feedback: FeedbackStatus | null;
  isLastStep: boolean;
  onNext: () => void;
  onReset?: () => void;
  onHelp?: () => void;
  stepHelpAvailable: boolean;
  onOpenHelp: () => void;
  meta?: React.ReactNode;
};

function PresenterCircleButton({
  label,
  onClick,
  disabled,
  testId,
  children,
  active,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  testId?: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      data-testid={testId}
      onClick={onClick}
      className={cn(
        "pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-[color:var(--stage-border,#475569)] bg-[color:var(--stage-surface,#1a2332)]/90 text-[color:var(--stage-muted,#94a3b8)] shadow-sm backdrop-blur-sm transition hover:border-cobalt/45 hover:text-[color:var(--stage-ink,#e8edf5)] disabled:opacity-35",
        active && "border-cobalt/60 text-[color:var(--stage-ink,#e8edf5)] ring-1 ring-cobalt/30",
      )}
    >
      {children}
    </button>
  );
}

export function useLessonPresenterChrome(props: LessonPresenterChromeProps) {
  const {
    closeHref,
    stepTitle,
    steps,
    currentStepIndex,
    visitedSteps,
    onGoToStep,
    canBack,
    onBack,
    onSkip,
    control,
    footerCenter,
    presenterNav,
    feedback,
    isLastStep,
    onNext,
    onReset,
    onHelp,
    stepHelpAvailable,
    onOpenHelp,
    meta,
  } = props;

  const maxReached = furthestVisitedStepIndex(visitedSteps);

  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const hasAnimation = Boolean(footerCenter);
  const animationAdvance = presenterNav?.onAdvance;
  const animationRetreat = presenterNav?.onRetreat;

  const handleForward = useCallback(() => {
    if (feedback) {
      return;
    }
    if (hasAnimation && animationAdvance && presenterNav?.canAdvance !== false) {
      animationAdvance();
      return;
    }
    if (control && !control.disabled) {
      control.onClick();
    }
  }, [animationAdvance, control, feedback, hasAnimation, presenterNav?.canAdvance]);

  const handleBack = useCallback(() => {
    if (feedback) {
      return;
    }
    if (hasAnimation && animationRetreat && presenterNav?.canRetreat !== false) {
      animationRetreat();
      return;
    }
    if (control?.onBack) {
      control.onBack();
      return;
    }
    if (canBack) {
      onBack();
    }
  }, [animationRetreat, canBack, control, feedback, hasAnimation, onBack, presenterNav?.canRetreat]);

  useEffect(() => {
    if (feedback || !hasAnimation) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }
      if (event.key === "ArrowRight") {
        if (animationAdvance && presenterNav?.canAdvance !== false) {
          event.preventDefault();
          animationAdvance();
        }
        return;
      }
      if (event.key === "ArrowLeft") {
        if (animationRetreat && presenterNav?.canRetreat !== false) {
          event.preventDefault();
          animationRetreat();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    animationAdvance,
    animationRetreat,
    feedback,
    hasAnimation,
    presenterNav?.canAdvance,
    presenterNav?.canRetreat,
  ]);

  useEffect(() => {
    if (!moreOpen) {
      return;
    }
    const close = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    };
    window.addEventListener("mousedown", close);
    return () => window.removeEventListener("mousedown", close);
  }, [moreOpen]);

  const forwardDisabled =
    feedback !== null
      ? false
      : hasAnimation
        ? presenterNav?.canAdvance === false
        : !control || control.disabled;

  const backDisabled =
    feedback !== null
      ? true
      : hasAnimation
        ? presenterNav?.canRetreat === false
        : !canBack && !control?.onBack;

  const header = (
    <header className="relative z-50 flex shrink-0 items-start justify-between gap-4 px-4 pb-4 pt-5 sm:px-6 sm:pb-4 sm:pt-5">
      <div
        className="lesson-step-title min-w-0 max-w-[min(42rem,70vw)] font-heading text-[color:var(--stage-ink,#e8edf5)]"
        data-testid="lesson-step-title"
      >
        {stepTitle}
      </div>
      {meta ? <div className="shrink-0">{meta}</div> : null}
    </header>
  );

  const overlays = (
    <>
      {hasAnimation && footerCenter ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-5 z-[60] flex justify-center px-4"
          data-testid="lesson-presenter-center"
        >
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[color:var(--stage-border,#334155)] bg-[#121a26]/92 px-3 py-2 shadow-lg backdrop-blur-md">
            {footerCenter}
          </div>
        </div>
      ) : null}

      {feedback ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-5 z-[60] flex justify-center px-4"
          data-testid="lesson-feedback-footer"
        >
          <div className="pointer-events-auto max-w-3xl">
            <LessonFeedbackActions
              status={feedback}
              isLastStep={isLastStep}
              onNext={onNext}
              onReset={onReset}
              onHelp={onHelp}
            />
          </div>
        </div>
      ) : null}

      <div
        className="pointer-events-none absolute bottom-4 right-4 z-[60] flex items-center gap-2 sm:bottom-5 sm:right-5 sm:gap-2.5"
        data-testid="lesson-presenter-rail"
      >
        <PresenterCircleButton
          label="Diapositiva anterior"
          disabled={backDisabled}
          testId="lesson-presenter-back"
          onClick={handleBack}
        >
          <ChevronLeftIcon className="size-5" aria-hidden />
        </PresenterCircleButton>
        <PresenterCircleButton
          label={hasAnimation ? "Siguiente fase de la animación" : control?.label ?? "Continuar"}
          disabled={forwardDisabled}
          testId={control?.testId ?? "lesson-presenter-forward"}
          onClick={handleForward}
        >
          <ChevronRightIcon className="size-5" aria-hidden />
        </PresenterCircleButton>
        {stepHelpAvailable ? (
          <PresenterCircleButton label="Pedir ayuda al tutor" testId="lesson-presenter-help" onClick={onOpenHelp}>
            <MessageCircleIcon className="size-5" aria-hidden />
          </PresenterCircleButton>
        ) : null}
        <div className="relative" ref={moreRef}>
          <PresenterCircleButton
            label="Más opciones"
            testId="lesson-presenter-more"
            active={moreOpen}
            onClick={() => setMoreOpen((open) => !open)}
          >
            <MoreHorizontalIcon className="size-5" aria-hidden />
          </PresenterCircleButton>
          {moreOpen ? (
            <div className="pointer-events-auto absolute bottom-full right-0 mb-2 min-w-[11rem] overflow-hidden rounded-md border border-[color:var(--stage-border,#334155)] bg-[#121a26] py-1 shadow-xl">
              {onSkip ? (
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[color:var(--stage-ink,#e8edf5)] hover:bg-white/5"
                  data-testid="lesson-skip-button"
                  onClick={() => {
                    setMoreOpen(false);
                    onSkip();
                  }}
                >
                  <SkipForwardIcon className="size-4 text-[color:var(--stage-muted,#94a3b8)]" aria-hidden />
                  Saltar paso
                </button>
              ) : null}
              <Link
                href={closeHref}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[color:var(--stage-ink,#e8edf5)] hover:bg-white/5"
                data-testid="lesson-exit-link"
                onClick={() => setMoreOpen(false)}
              >
                <LogOutIcon className="size-4 text-[color:var(--stage-muted,#94a3b8)]" aria-hidden />
                Salir de la lección
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <LessonSlidesSidebar
        slides={steps}
        current={currentStepIndex}
        maxReached={maxReached}
        onSelect={onGoToStep}
      />
    </>
  );

  return { header, overlays };
}
