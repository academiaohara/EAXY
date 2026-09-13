"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const STEPS = ["2x + 4 = 10", "2x = 6", "x = 3"];

const STEP_DELAYS_MS = [0, 1400, 1400];

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function HeroEquation() {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;

    for (let index = 1; index < STEPS.length; index += 1) {
      elapsed += STEP_DELAYS_MS[index];
      timeouts.push(
        setTimeout(() => {
          setStepIndex(index);
          setAnimationKey(index);
        }, elapsed),
      );
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [prefersReducedMotion]);

  const displayIndex = prefersReducedMotion ? STEPS.length - 1 : stepIndex;

  return (
    <div
      className="rounded-lg border border-border bg-paper-raised px-6 py-8"
      aria-label="Ecuación resolviéndose paso a paso"
    >
      <p className="mb-3 text-xs font-medium text-ink-muted">Resolviendo</p>
      <p
        key={prefersReducedMotion ? "static" : animationKey}
        className="hero-equation-step font-mono text-2xl font-medium tracking-tight text-ink sm:text-3xl"
        aria-live="polite"
      >
        {STEPS[displayIndex]}
      </p>
    </div>
  );
}
