"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DefinitionBox } from "@/components/lesson/stage/DefinitionBox";
import { StageModuleRenderer } from "@/components/lesson/stage/StageModuleRenderer";
import { StageViewport } from "@/components/lesson/stage/StageViewport";
import { useRegisterLessonStepControl } from "@/components/lesson/LessonStepControlContext";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { checkFillInBlankAnswerFlexible } from "@/lib/lesson/check-answer";
import {
  evalWithParenthesisPlacement,
  isValidParenthesisPlacement,
} from "@/lib/lesson/stage/eval-natural-expression";
import type { PredictSnapshot, ExploreSnapshot, StepCheckResult } from "@/lib/lesson/step-attempt";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import type {
  ExploreStep,
  LessonStageTheme,
  NarrateStep,
  PredictStep,
  RevealStep,
  TiendaCiclistaItem,
} from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

const TEAM_ITEMS: TiendaCiclistaItem[] = [
  { id: "bici", label: "Bici", price: 583 },
  { id: "casco", label: "Casco", price: 162 },
  { id: "maillot", label: "Maillot", price: 45 },
  { id: "culotte", label: "Culotte", price: 38 },
];

type StageShellProps = {
  theme: LessonStageTheme;
  definitionBox?: string;
  title: string;
  stage: React.ReactNode;
  children?: React.ReactNode;
};

function StageShell({ theme, definitionBox, title, stage, children }: StageShellProps) {
  return (
    <StageViewport theme={theme} stage={stage}>
      {definitionBox ? <DefinitionBox text={definitionBox} /> : null}
      {children}
      <h3 className="sr-only">{title}</h3>
    </StageViewport>
  );
}

export function NarrateStepView({
  step,
  theme,
  onContinue,
}: {
  step: NarrateStep;
  theme: LessonStageTheme;
  onContinue: () => void;
}) {
  const [ready, setReady] = useState(false);

  const control = useMemo(
    () =>
      ready
        ? {
            label: "Continuar",
            onClick: () => onContinue(),
            testId: "lesson-continue-button",
          }
        : null,
    [onContinue, ready],
  );
  useRegisterLessonStepControl(control);

  const tienda = step.tienda;

  const stage = (
    <StageModuleRenderer
      module={step.module}
      stepId={step.id}
      scene={step.scene}
      tienda={
        tienda
          ? {
              items: tienda.items,
              wallet: tienda.wallet,
              spendAmount: tienda.spendAmount,
              mode: tienda.mode,
            }
          : undefined
      }
      piramide={
        step.piramide
          ? { variant: step.piramide.variant }
          : step.module === "piramide-reduccion"
            ? { variant: "dual-parentesis" }
            : undefined
      }
      onReadyChange={setReady}
    />
  );

  return (
    <div data-testid="lesson-narrate-step">
      <StageShell theme={theme} definitionBox={step.definitionBox} title={step.title} stage={stage} />
    </div>
  );
}

export function PredictStepView({
  step,
  theme,
  onCheck,
  disabled,
  saved,
}: {
  step: PredictStep;
  theme: LessonStageTheme;
  onCheck: (result: StepCheckResult) => void;
  disabled?: boolean;
  saved?: PredictSnapshot | null;
}) {
  const restored = saved ?? null;
  const [numericValue, setNumericValue] = useState(restored?.numericValue ?? "");
  const [choiceId, setChoiceId] = useState(restored?.choiceId ?? "");
  const [checked, setChecked] = useState(Boolean(restored));
  const [isCorrect, setIsCorrect] = useState(restored?.isCorrect ?? false);
  const [reveal, setReveal] = useState(restored?.revealPlayed ?? false);

  const runCheck = useCallback(() => {
    if (checked) {
      return;
    }
    let correct = false;
    if (step.mode === "numeric") {
      correct = checkFillInBlankAnswerFlexible(numericValue, step.correctAnswers ?? []);
    } else {
      correct = choiceId === step.correctChoiceId;
    }
    setIsCorrect(correct);
    setChecked(true);
    setReveal(true);
    onCheck({
      correct,
      snapshot: {
        kind: "predict",
        numericValue: step.mode === "numeric" ? numericValue : undefined,
        choiceId: step.mode === "choice" ? choiceId : undefined,
        isCorrect: correct,
        revealPlayed: true,
      },
    });
  }, [checked, choiceId, numericValue, onCheck, step]);

  const control = useMemo(() => {
    if (checked) {
      return null;
    }
    const canSubmit =
      step.mode === "numeric" ? numericValue.trim().length > 0 : Boolean(choiceId);
    return {
      label: "Comprobar",
      onClick: runCheck,
      disabled: !canSubmit || disabled,
      testId: "lesson-check-button",
    };
  }, [checked, choiceId, disabled, numericValue, runCheck, step.mode]);

  useRegisterLessonStepControl(control);

  const tiendaReveal =
    reveal && step.module === "tienda-ciclista" && step.tienda
      ? (
          <StageModuleRenderer
            module="tienda-ciclista"
            stepId={`${step.id}-reveal`}
            scene={step.scene ?? "reveal"}
            tienda={{ ...step.tienda, mode: step.tienda.mode ?? "sumar-cesta" }}
            autoPlay
          />
        )
      : null;

  return (
    <StageViewport theme={theme}>
      {step.definitionBox ? <DefinitionBox text={step.definitionBox} /> : null}
      <section
        className="lesson-idea-enter rounded-2xl border-2 border-cobalt/15 bg-white p-6 shadow-sm sm:p-8"
        data-testid="lesson-predict-step"
      >
        <h3 className="mb-4 text-center text-lg font-semibold text-ink">
          <MathRenderer text={step.question} />
        </h3>
        {step.mode === "numeric" ? (
          <input
            type="text"
            inputMode="numeric"
            value={numericValue}
            onChange={(event) => setNumericValue(event.target.value)}
            disabled={disabled || checked}
            className="mx-auto block w-full max-w-xs rounded-xl border-2 border-slate-200 px-4 py-3 text-center text-lg font-semibold"
            aria-label="Tu respuesta"
          />
        ) : (
          <div className="mx-auto flex max-w-md flex-col gap-2">
            {(step.choices ?? []).map((choice) => (
              <button
                key={choice.id}
                type="button"
                disabled={disabled || checked}
                onClick={() => setChoiceId(choice.id)}
                className={cn(
                  "rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition",
                  choiceId === choice.id
                    ? "border-cobalt bg-cobalt-tint"
                    : "border-slate-200 hover:border-cobalt/30",
                )}
                aria-pressed={choiceId === choice.id}
              >
                <MathRenderer text={choice.label} />
              </button>
            ))}
          </div>
        )}
        {reveal ? (
          <div className="mt-6 space-y-3">
            {tiendaReveal}
            {step.mode === "numeric" ? (
              <p className="text-center text-sm text-ink-muted">
                <MathRenderer text="$583 + 162 + 45 + 38 = 828$ €" />
              </p>
            ) : null}
          </div>
        ) : null}
      </section>
    </StageViewport>
  );
}

type ExplorePersist = {
  selectedIds: string[];
  openAfter: number | null;
  closeBefore: number | null;
};

export function ExploreStepView({
  step,
  theme,
  onCheck,
  disabled,
  saved,
}: {
  step: ExploreStep;
  theme: LessonStageTheme;
  onCheck: (result: StepCheckResult) => void;
  disabled?: boolean;
  saved?: ExploreSnapshot | null;
}) {
  const defaultIds = step.tienda?.items.map((item) => item.id) ?? TEAM_ITEMS.map((i) => i.id);
  const [persist, setPersist] = usePersistedLessonToolState<ExplorePersist>(step.id, () => ({
    selectedIds: defaultIds,
    openAfter: null,
    closeBefore: null,
  }));

  const [checked, setChecked] = useState(Boolean(saved));

  const goalMet = useMemo(() => {
    if (step.goal.kind === "wallet-remainder" && step.tienda) {
      const total = step.tienda.items
        .filter((item) => persist.selectedIds.includes(item.id))
        .reduce((s, item) => s + item.price, 0);
      const left = step.tienda.wallet - total;
      return left >= 0 && left < step.goal.maxRemainder;
    }
    if (step.goal.kind === "expression-result") {
      if (!isValidParenthesisPlacement(step.goal.tokens, persist.openAfter, persist.closeBefore)) {
        return false;
      }
      const value = evalWithParenthesisPlacement(
        step.goal.tokens,
        persist.openAfter,
        persist.closeBefore,
      );
      return value === step.goal.target;
    }
    return false;
  }, [persist, step]);

  const runCheck = useCallback(() => {
    if (checked || !goalMet) {
      return;
    }
    setChecked(true);
    onCheck({
      correct: true,
      snapshot: {
        kind: "explore",
        goalMet: true,
        isCorrect: true,
      },
    });
  }, [checked, goalMet, onCheck]);

  const control = useMemo(() => {
    if (checked) {
      return null;
    }
    return {
      label: "Comprobar",
      onClick: runCheck,
      disabled: !goalMet || disabled,
      testId: "lesson-check-button",
    };
  }, [checked, disabled, goalMet, runCheck]);

  useRegisterLessonStepControl(control);

  const stage = (
    <StageModuleRenderer
      module={step.module}
      stepId={step.id}
      scene={step.scene}
      tienda={
        step.tienda
          ? {
              items: step.tienda.items,
              wallet: step.tienda.wallet,
              mode: "explorar-compra",
            }
          : undefined
      }
      piramide={
        step.module === "piramide-reduccion"
          ? {
              variant: "explorar-parentesis",
              tokens: step.goal.kind === "expression-result" ? step.goal.tokens : undefined,
              openAfter: persist.openAfter,
              closeBefore: persist.closeBefore,
              onOpenAfterChange: (index) => setPersist((prev) => ({ ...prev, openAfter: index })),
              onCloseBeforeChange: (index) => setPersist((prev) => ({ ...prev, closeBefore: index })),
            }
          : undefined
      }
      selectedIds={persist.selectedIds}
      onSelectedIdsChange={(ids) => setPersist((prev) => ({ ...prev, selectedIds: ids }))}
    />
  );

  return (
    <div data-testid="lesson-explore-step">
      <StageShell theme={theme} definitionBox={step.definitionBox} title={step.title} stage={stage}>
        <p className="text-center text-sm font-medium text-ink">
          <MathRenderer text={step.question} />
        </p>
      </StageShell>
    </div>
  );
}

export function RevealStepView({
  step,
  theme,
  onContinue,
}: {
  step: RevealStep;
  theme: LessonStageTheme;
  onContinue: () => void;
}) {
  const [ready, setReady] = useState(false);

  const control = useMemo(
    () =>
      ready
        ? {
            label: "Continuar",
            onClick: () => onContinue(),
            testId: "lesson-continue-button",
          }
        : null,
    [onContinue, ready],
  );
  useRegisterLessonStepControl(control);

  const equation =
    step.scene === "conmutativa"
      ? `$${step.blocks[0]} + ${step.blocks[1]} = ${step.blocks[1]} + ${step.blocks[0]}$`
      : `$(${step.blocks[0]} + ${step.blocks[1]}) + ${step.blocks[2]} = ${step.blocks[0]} + (${step.blocks[1]} + ${step.blocks[2]})$`;

  const stage = (
    <StageModuleRenderer
      module="bloques-numericos"
      stepId={step.id}
      scene={step.scene}
      bloques={{ blocks: step.blocks }}
      onReadyChange={setReady}
    />
  );

  return (
    <div data-testid="lesson-reveal-step">
      <StageShell theme={theme} definitionBox={step.definitionBox} title={step.title} stage={stage}>
        <p className="text-center text-base text-ink-muted">
          <MathRenderer text={equation} />
        </p>
      </StageShell>
    </div>
  );
}
