"use client";

import { useCallback, useMemo, useRef, useState } from "react";
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
import type { ExploreSnapshot, PredictSnapshot, StepCheckResult } from "@/lib/lesson/step-attempt";
import { usePersistedLessonToolState } from "@/components/lesson/LessonPersistedStateContext";
import type {
  ExploreStep,
  LessonStageTheme,
  NarrateStep,
  PredictStep,
  RevealStep,
} from "@/lib/lesson/types";
import { cn } from "@/lib/utils";

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

function buildEmbeddedCheckHandler(
  submitRef: React.MutableRefObject<(() => boolean) | null>,
  onCheck: (result: StepCheckResult) => void,
  checked: boolean,
) {
  return () => {
    if (checked || !submitRef.current) {
      return;
    }
    const correct = submitRef.current();
    onCheck({
      correct,
      snapshot: {
        kind: "predict",
        isCorrect: correct,
        revealPlayed: correct,
      },
    });
  };
}

type NarrateProps = {
  step: NarrateStep;
  theme: LessonStageTheme;
  onContinue: () => void;
  onCheck?: (result: StepCheckResult) => void;
  disabled?: boolean;
  saved?: PredictSnapshot | null;
};

export function NarrateStepView({ step, theme, onContinue, onCheck, disabled, saved }: NarrateProps) {
  const [ready, setReady] = useState(false);
  const [predictPhase, setPredictPhase] = useState(false);
  const [canSubmitPredict, setCanSubmitPredict] = useState(false);
  const predictSubmitRef = useRef<(() => boolean) | null>(null);
  const checked = Boolean(saved?.isCorrect);

  const runEmbeddedCheck = useCallback(
    buildEmbeddedCheckHandler(predictSubmitRef, onCheck ?? (() => {}), checked),
    [checked, onCheck],
  );

  const control = useMemo(() => {
    if (step.embeddedPrediction && predictPhase && !checked) {
      return {
        label: "Comprobar",
        onClick: runEmbeddedCheck,
        disabled: !canSubmitPredict || disabled,
        testId: "lesson-check-button",
      };
    }
    return ready
      ? {
          label: "Continuar",
          onClick: () => onContinue(),
          testId: "lesson-continue-button",
        }
      : null;
  }, [
    canSubmitPredict,
    checked,
    disabled,
    onContinue,
    predictPhase,
    ready,
    runEmbeddedCheck,
    step.embeddedPrediction,
  ]);

  useRegisterLessonStepControl(control);

  const stage = (
    <StageModuleRenderer
      module={step.module}
      stepId={step.id}
      scene={step.scene}
      embeddedPrediction={step.embeddedPrediction}
      tiendaFichas={step.tiendaFichas}
      tienda={
        step.tienda
          ? {
              items: step.tienda.items,
              wallet: step.tienda.wallet,
              mode: step.tienda.mode,
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
      onPredictPhaseChange={(active, canSubmit) => {
        setPredictPhase(active);
        setCanSubmitPredict(canSubmit);
      }}
      onRegisterPredict={(submit) => {
        predictSubmitRef.current = submit;
      }}
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
    setChecked(true);
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

  const stage =
    step.module && step.scene ? (
      <StageModuleRenderer
        module={step.module}
        stepId={step.id}
        scene={step.scene}
        tiendaFichas={undefined}
        tienda={
          step.tienda
            ? { ...step.tienda, mode: step.tienda.mode as "sumar-cesta" }
            : undefined
        }
      />
    ) : null;

  return (
    <StageViewport theme={theme} stage={stage}>
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
  const items = step.tiendaFichas?.items ?? step.tienda?.items ?? [];
  const budget =
    step.goal.kind === "maximize-under-budget"
      ? step.goal.budget
      : (step.tiendaFichas?.wallet ?? step.tienda?.wallet ?? 0);

  const usesLegacyPersist = step.module === "piramide-reduccion" || step.module === "tienda-ciclista";
  const [persist, setPersist] = usePersistedLessonToolState<ExplorePersist>(step.id, () => ({
    selectedIds: step.tienda?.items.map((item) => item.id) ?? [],
    openAfter: null,
    closeBefore: null,
  }));

  const [checked, setChecked] = useState(Boolean(saved));
  const [inlineMessage, setInlineMessage] = useState<string | null>(null);
  const [failCount, setFailCount] = useState(0);
  const exploreCheckRef = useRef<(() => void) | null>(null);
  const predictSubmitRef = useRef<(() => boolean) | null>(null);
  const [predictPhase, setPredictPhase] = useState(false);
  const [canSubmitPredict, setCanSubmitPredict] = useState(false);
  const [expressionGoalMet, setExpressionGoalMet] = useState(false);
  const [moduleReady, setModuleReady] = useState(false);

  const goalMet = useMemo(() => {
    if (step.goal.kind === "maximize-under-budget") {
      return false;
    }
    if (step.goal.kind === "expression-result") {
      if (step.module === "piramide-reduccion") {
        if (
          !isValidParenthesisPlacement(
            step.goal.tokens,
            persist.openAfter,
            persist.closeBefore,
          )
        ) {
          return false;
        }
        return (
          evalWithParenthesisPlacement(
            step.goal.tokens,
            persist.openAfter,
            persist.closeBefore,
          ) === step.goal.target
        );
      }
      return expressionGoalMet;
    }
    if (step.goal.kind === "module-ready") {
      return moduleReady;
    }
    if (step.goal.kind === "wallet-remainder" && step.tienda) {
      const total = step.tienda.items
        .filter((item) => persist.selectedIds.includes(item.id))
        .reduce((s, item) => s + item.price, 0);
      const left = step.tienda.wallet - total;
      return left >= 0 && left < step.goal.maxRemainder;
    }
    return false;
  }, [expressionGoalMet, moduleReady, persist.selectedIds, step]);

  const runExploreCheck = useCallback(() => {
    if (checked) {
      return;
    }
    if (step.goal.kind === "maximize-under-budget") {
      exploreCheckRef.current?.();
      return;
    }
    if (!goalMet) {
      return;
    }
    setChecked(true);
    onCheck({
      correct: true,
      snapshot: { kind: "explore", goalMet: true, isCorrect: true },
    });
  }, [checked, goalMet, onCheck, step.goal.kind]);

  const runEmbeddedCheck = useCallback(() => {
    if (checked || !predictSubmitRef.current) {
      return;
    }
    const correct = predictSubmitRef.current();
    if (correct) {
      setModuleReady(true);
      setChecked(true);
    }
    onCheck({
      correct,
      snapshot: {
        kind: "predict",
        isCorrect: correct,
        revealPlayed: correct,
      },
    });
  }, [checked, onCheck]);

  const exploreControl = useMemo(() => {
    if (checked) {
      return null;
    }
    if (step.embeddedPrediction && predictPhase) {
      return {
        label: "Comprobar",
        onClick: runEmbeddedCheck,
        disabled: !canSubmitPredict || disabled,
        testId: "lesson-check-button",
      };
    }
    if (step.goal.kind === "maximize-under-budget") {
      return {
        label: "Comprobar compra",
        onClick: runExploreCheck,
        disabled: disabled,
        testId: "lesson-check-button",
      };
    }
    return {
      label: "Comprobar",
      onClick: runExploreCheck,
      disabled: !goalMet || disabled,
      testId: "lesson-check-button",
    };
  }, [
    canSubmitPredict,
    checked,
    disabled,
    goalMet,
    predictPhase,
    runEmbeddedCheck,
    runExploreCheck,
    step.embeddedPrediction,
    step.goal.kind,
  ]);

  useRegisterLessonStepControl(exploreControl);

  const handleExploreResult = useCallback(
    (result: { correct: boolean; message: string }) => {
      setInlineMessage(result.message);
      if (result.correct) {
        setChecked(true);
        onCheck({
          correct: true,
          snapshot: { kind: "explore", goalMet: true, isCorrect: true },
        });
        return;
      }
      const nextFails = failCount + 1;
      setFailCount(nextFails);
    },
    [failCount, onCheck],
  );

  const stage = (
    <StageModuleRenderer
      module={step.module}
      stepId={step.id}
      scene={step.scene}
      embeddedPrediction={step.embeddedPrediction}
      tiendaFichas={
        step.tiendaFichas
          ? { ...step.tiendaFichas, items }
          : step.tienda
            ? {
                items: step.tienda.items,
                wallet: step.tienda.wallet,
                mode: "explorar-toggle",
              }
            : undefined
      }
      exploreBudget={step.goal.kind === "maximize-under-budget" ? budget : undefined}
      onExploreCheck={handleExploreResult}
      onRegisterExplore={(check) => {
        exploreCheckRef.current = check;
      }}
      onRegisterPredict={(submit) => {
        predictSubmitRef.current = submit;
      }}
      onPredictPhaseChange={(active, canSubmit) => {
        setPredictPhase(active);
        setCanSubmitPredict(canSubmit);
      }}
      onGoalChange={(met) => setExpressionGoalMet(met)}
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
      selectedIds={usesLegacyPersist ? persist.selectedIds : undefined}
      onSelectedIdsChange={
        usesLegacyPersist
          ? (ids) => setPersist((prev) => ({ ...prev, selectedIds: ids }))
          : undefined
      }
      onReadyChange={setModuleReady}
    />
  );

  const showExploreHint = failCount >= 2 && step.hint && !checked;

  return (
    <div data-testid="lesson-explore-step">
      <StageShell theme={theme} definitionBox={step.definitionBox} title={step.title} stage={stage}>
        <p className="text-center text-sm font-medium text-ink">
          <MathRenderer text={step.question} />
        </p>
        {inlineMessage ? (
          <p className="text-center text-sm font-medium text-amber-900" role="status">
            {inlineMessage}
          </p>
        ) : null}
        {showExploreHint ? (
          <p className="text-center text-sm text-ink-muted">
            <MathRenderer text={step.hint!} />
          </p>
        ) : null}
      </StageShell>
    </div>
  );
}

export function RevealStepView({
  step,
  theme,
  onContinue,
  onCheck,
  disabled,
  saved,
}: {
  step: RevealStep;
  theme: LessonStageTheme;
  onContinue: () => void;
  onCheck?: (result: StepCheckResult) => void;
  disabled?: boolean;
  saved?: PredictSnapshot | null;
}) {
  const [ready, setReady] = useState(false);
  const [predictPhase, setPredictPhase] = useState(false);
  const [canSubmitPredict, setCanSubmitPredict] = useState(false);
  const predictSubmitRef = useRef<(() => boolean) | null>(null);
  const checked = Boolean(saved?.isCorrect);

  const runEmbeddedCheck = useCallback(
    buildEmbeddedCheckHandler(predictSubmitRef, onCheck ?? (() => {}), checked),
    [checked, onCheck],
  );

  const control = useMemo(() => {
    if (step.embeddedPrediction && predictPhase && !checked) {
      return {
        label: "Comprobar",
        onClick: runEmbeddedCheck,
        disabled: !canSubmitPredict || disabled,
        testId: "lesson-check-button",
      };
    }
    return ready
      ? {
          label: "Continuar",
          onClick: () => onContinue(),
          testId: "lesson-continue-button",
        }
      : null;
  }, [
    canSubmitPredict,
    checked,
    disabled,
    onContinue,
    predictPhase,
    ready,
    runEmbeddedCheck,
    step.embeddedPrediction,
  ]);

  useRegisterLessonStepControl(control);

  const stage = (
    <StageModuleRenderer
      module={step.module}
      stepId={step.id}
      scene={step.scene}
      bloques={{ blocks: step.blocks }}
      embeddedPrediction={step.embeddedPrediction}
      onReadyChange={setReady}
      onPredictPhaseChange={(active, canSubmit) => {
        setPredictPhase(active);
        setCanSubmitPredict(canSubmit);
      }}
      onRegisterPredict={(submit) => {
        predictSubmitRef.current = submit;
      }}
    />
  );

  return (
    <div data-testid="lesson-reveal-step">
      <StageShell theme={theme} definitionBox={step.definitionBox} title={step.title} stage={stage} />
    </div>
  );
}
