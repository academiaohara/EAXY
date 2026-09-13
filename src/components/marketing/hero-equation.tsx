"use client";

import { useEffect, useState } from "react";

const STEPS = ["2x + 4 = 10", "2x = 6", "x = 3"];
const STEP_DELAYS_MS = [0, 1400, 1400];

function getInitialStepIndex(): number {
  if (typeof window === "undefined") {
    return 0;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? STEPS.length - 1 : 0;
}

export function HeroEquation() {
  const [stepIndex, setStepIndex] = useState(getInitialStepIndex);
  const [animationKey, setAnimationKey] = useState(getInitialStepIndex);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
  }, []);

  return (
    <div
      className="rounded-lg border border-border bg-paper-raised px-6 py-8"
      aria-label="Ecuación resolviéndose paso a paso"
    >
      <p className="mb-3 text-xs font-medium text-ink-muted">Resolviendo</p>
      <p
        key={animationKey}
        className="hero-equation-step font-mono text-2xl font-medium tracking-tight text-ink sm:text-3xl"
        aria-live="polite"
      >
        {STEPS[stepIndex]}
      </p>
    </div>
  );
}
