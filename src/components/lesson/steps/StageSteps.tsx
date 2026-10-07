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
    <StageViewport
      theme={theme}
      header={definitionBox ? <DefinitionBox text={definitionBox} /> : null}
      stage={stage}
    >
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
      mulDiv={step.mulDiv}
      autoPlay={
        step.module === "mul-div-naturales" && step.scene !== "multiplicacion-mano"
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
  const isMultiplicarSextaEntrada =
    step.module === "mul-div-naturales" && step.mulDiv?.scene === "multiplicar-sexta-entrada";

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

  const selectedChoice = (step.choices ?? []).find((choice) => choice.id === choiceId);
  const checkFeedback = checked
    ? isCorrect
      ? step.explanation
      : selectedChoice?.incorrectFeedback ?? step.hint
    : null;

  const jerarquiaStage =
    step.module === "jerarquia-operaciones" && step.scene ? (
      <StageModuleRenderer
        module="jerarquia-operaciones"
        stepId={reveal ? `${step.id}-reveal` : step.id}
        scene={step.scene}
        jerarquia={{ revealPlayed: reveal }}
      />
    ) : null;

  if (isMultiplicarSextaEntrada && step.mulDiv) {
    const sextaStage = (
      <StageModuleRenderer
        module="mul-div-naturales"
        stepId={step.id}
        scene={step.scene ?? "multiplicar-sexta-entrada"}
        mulDiv={{ ...step.mulDiv, scene: "multiplicar-sexta-entrada" }}
        autoPlay
      />
    );

    return (
      <div data-testid="lesson-predict-step">
        <StageShell theme={theme} definitionBox={step.definitionBox} title={step.title} stage={sextaStage}>
          <h3 className="mb-5 text-center text-base font-semibold text-ink">
            <MathRenderer text={step.question} />
          </h3>
          <div className="mx-auto grid max-w-lg grid-cols-3 gap-3 sm:gap-4">
            {(step.choices ?? []).map((choice) => (
              <button
                key={choice.id}
                type="button"
                disabled={disabled || checked}
                onClick={() => setChoiceId(choice.id)}
                className={cn(
                  "group flex aspect-square min-h-[5.5rem] flex-col items-center justify-center rounded-2xl border-2 bg-white p-3 text-center shadow-sm transition duration-200",
                  "hover:-translate-y-1 hover:border-cobalt/70 hover:shadow-lg",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2",
                  choiceId === choice.id
                    ? "border-cobalt bg-cobalt-tint ring-2 ring-cobalt/30 shadow-md"
                    : "border-slate-200",
                  checked && choiceId !== choice.id && "opacity-55",
                )}
                aria-pressed={choiceId === choice.id}
                aria-label={`${choice.id} euros`}
              >
                <span className="text-lg font-bold text-ink transition group-hover:text-cobalt">
                  <MathRenderer text={choice.label} />
                </span>
              </button>
            ))}
          </div>
          {checked ? (
            <div className="mt-5 space-y-2" role="status">
              <p className="text-center text-sm font-medium text-ink">
                {isCorrect ? "¡Correcto!" : "Casi: piensa en añadir una entrada más."}
              </p>
              {step.explanation ? (
                <p className="text-center text-sm text-ink-muted">
                  <MathRenderer text={step.explanation} />
                </p>
              ) : null}
            </div>
          ) : null}
        </StageShell>
      </div>
    );
  }

  if (step.module === "jerarquia-operaciones" && step.scene) {
    return (
      <div data-testid="lesson-predict-step">
        <StageShell theme={theme} definitionBox={step.definitionBox} title={step.title} stage={jerarquiaStage}>
          <h3 className="mb-4 text-center text-base font-semibold text-ink">
            <MathRenderer text={step.question} />
          </h3>
          {step.mode === "choice" ? (
            <div className="mx-auto flex max-w-md flex-col gap-2">
              {(step.choices ?? []).map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  disabled={disabled || checked}
                  onClick={() => setChoiceId(choice.id)}
                  className={cn(
                    "min-h-11 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition",
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
          ) : null}
          {checked ? (
            <p className="mt-4 text-center text-sm text-ink-muted" role="status">
              {isCorrect ? "¡Bien visto!" : "Mira la animación: el orden importa."}
            </p>
          ) : null}
        </StageShell>
      </div>
    );
  }

  const stageReveal =
    reveal && step.module && step.scene
      ? step.module === "tienda-ciclista" && step.tienda
        ? (
            <StageModuleRenderer
              module="tienda-ciclista"
              stepId={`${step.id}-reveal`}
              scene={step.scene}
              tienda={{ ...step.tienda, mode: step.tienda.mode ?? "sumar-cesta" }}
              autoPlay
            />
          )
        : step.module === "mul-div-naturales" && step.mulDiv
          ? (
              <StageModuleRenderer
                module="mul-div-naturales"
                stepId={`${step.id}-reveal`}
                scene={step.scene}
                mulDiv={{ ...step.mulDiv, scene: step.mulDiv.scene }}
                autoPlay
              />
            )
          : null
      : null;

  return (
    <StageViewport theme={theme} header={step.definitionBox ? <DefinitionBox text={step.definitionBox} /> : null}>
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
        {checked && checkFeedback ? (
          <div className="mt-5 space-y-2" role="status">
            <p
              className={cn(
                "text-center text-sm font-medium",
                isCorrect ? "text-emerald-800" : "text-amber-950",
              )}
            >
              {isCorrect ? "¡Correcto!" : "Revisa tu respuesta."}
            </p>
            <p className="text-center text-sm leading-relaxed text-ink-muted">
              <MathRenderer text={checkFeedback} />
            </p>
          </div>
        ) : null}
        {reveal ? (
          <div className="mt-6 space-y-3">
            {stageReveal}
            {step.explanation && reveal && isCorrect && !checkFeedback ? (
              <p className="text-center text-sm text-ink-muted">
                <MathRenderer text={step.explanation} />
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
  tapSequence: string[];
  boxCounts: number[];
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
  const defaultBoxCounts =
    step.goal.kind === "boxes-equal" ? Array.from({ length: step.goal.boxes }, () => 0) : [];

  const [persist, setPersist] = usePersistedLessonToolState<ExplorePersist>(step.id, () => ({
    selectedIds: defaultIds,
    openAfter: null,
    closeBefore: null,
    tapSequence: [],
    boxCounts: defaultBoxCounts,
  }));

  const [checked, setChecked] = useState(Boolean(saved));
  const [isCorrect, setIsCorrect] = useState(saved?.isCorrect ?? false);

  const placementReady = useMemo(() => {
    if (step.goal.kind === "wallet-remainder" && step.tienda) {
      const total = step.tienda.items
        .filter((item) => persist.selectedIds.includes(item.id))
        .reduce((s, item) => s + item.price, 0);
      const left = step.tienda.wallet - total;
      return left >= 0 && left < step.goal.maxRemainder;
    }
    if (step.goal.kind === "expression-result") {
      return isValidParenthesisPlacement(step.goal.tokens, persist.openAfter, persist.closeBefore);
    }
    if (step.goal.kind === "hierarchy-sequence") {
      const target = step.goal.sequence;
      return (
        persist.tapSequence.length === target.length &&
        persist.tapSequence.every((id, i) => id === target[i])
      );
    }
    if (step.goal.kind === "boxes-equal") {
      const goal = step.goal;
      const sum = persist.boxCounts.reduce((s, n) => s + n, 0);
      return sum === goal.total && persist.boxCounts.every((n) => n === goal.perBox);
    }
    return false;
  }, [persist, step]);

  const evaluatedValue = useMemo(() => {
    if (step.goal.kind !== "expression-result") {
      return null;
    }
    return evalWithParenthesisPlacement(step.goal.tokens, persist.openAfter, persist.closeBefore);
  }, [persist.closeBefore, persist.openAfter, step.goal]);

  const runCheck = useCallback(() => {
    if (checked || !placementReady) {
      return;
    }
    let correct = true;
    if (step.goal.kind === "expression-result") {
      correct = evaluatedValue === step.goal.target;
    }
    if (step.goal.kind === "hierarchy-sequence" || step.goal.kind === "boxes-equal") {
      correct = placementReady;
    }
    setIsCorrect(correct);
    setChecked(true);
    onCheck({
      correct,
      snapshot: {
        kind: "explore",
        goalMet: true,
        isCorrect: correct,
      },
    });
  }, [checked, evaluatedValue, onCheck, placementReady, step.goal]);

  const control = useMemo(() => {
    if (checked) {
      return null;
    }
    return {
      label: "Comprobar",
      onClick: runCheck,
      disabled: !placementReady || disabled,
      testId: "lesson-check-button",
    };
  }, [checked, disabled, placementReady, runCheck]);

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
      jerarquia={
        step.module === "jerarquia-operaciones" && step.goal.kind === "hierarchy-sequence"
          ? {
              targetSequence: step.goal.sequence,
              tapSequence: persist.tapSequence,
              onTapSequenceChange: (tapSequence) => setPersist((prev) => ({ ...prev, tapSequence })),
            }
          : undefined
      }
      selectedIds={persist.selectedIds}
      onSelectedIdsChange={(ids) => setPersist((prev) => ({ ...prev, selectedIds: ids }))}
      mulDiv={step.mulDiv}
      boxCounts={persist.boxCounts}
      onBoxCountsChange={(boxCounts) => setPersist((prev) => ({ ...prev, boxCounts }))}
    />
  );

  return (
    <div data-testid="lesson-explore-step">
      <StageShell theme={theme} definitionBox={step.definitionBox} title={step.title} stage={stage}>
        <p className="text-center text-sm font-medium text-ink">
          <MathRenderer text={step.question} />
        </p>
        {checked ? (
          <div
            className={cn(
              "mt-4 rounded-xl border px-4 py-3 text-center text-sm",
              isCorrect
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-amber-200 bg-amber-50 text-amber-950",
            )}
            role="status"
          >
            {isCorrect ? (
              <p>
                {step.goal.kind === "boxes-equal"
                  ? "¡Correcto! Repartiste el total en cajas iguales."
                  : `¡Correcto! El resultado es ${step.goal.kind === "expression-result" ? step.goal.target : ""}.`}
              </p>
            ) : (
              <>
                <p className="font-semibold">
                  Tu expresión vale {evaluatedValue ?? "?"}, no {step.goal.kind === "expression-result" ? step.goal.target : "?"}.
                </p>
                {step.explanation ? (
                  <p className="mt-2 text-ink-muted">
                    <MathRenderer text={step.explanation} />
                  </p>
                ) : null}
              </>
            )}
          </div>
        ) : null}
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

  const blocks = step.blocks ?? [8, 6, 3];
  const equation =
    step.module === "bloques-numericos" && step.scene === "conmutativa"
      ? `$${blocks[0]} + ${blocks[1]} = ${blocks[1]} + ${blocks[0]}$`
      : step.module === "bloques-numericos"
        ? `$(${blocks[0]} + ${blocks[1]}) + ${blocks[2]} = ${blocks[0]} + (${blocks[1]} + ${blocks[2]})$`
        : step.module === "mul-div-naturales" && step.scene === "conmutativa-producto"
          ? `$${step.mulDiv?.a ?? 8} \\cdot ${step.mulDiv?.b ?? 5} = ${step.mulDiv?.b ?? 5} \\cdot ${step.mulDiv?.a ?? 8}$`
          : step.module === "mul-div-naturales"
            ? `$(${step.mulDiv?.a ?? 8} \\cdot ${step.mulDiv?.b ?? 5}) \\cdot ${step.mulDiv?.c ?? 2} = ${step.mulDiv?.a ?? 8} \\cdot (${step.mulDiv?.b ?? 5} \\cdot ${step.mulDiv?.c ?? 2})$`
            : "";

  const stage = (
    <StageModuleRenderer
      module={step.module}
      stepId={step.id}
      scene={step.scene}
      bloques={step.blocks ? { blocks: step.blocks } : undefined}
      mulDiv={step.mulDiv}
      onReadyChange={setReady}
    />
  );

  return (
    <div data-testid="lesson-reveal-step">
      <StageShell theme={theme} definitionBox={step.definitionBox} title={step.title} stage={stage}>
        {equation ? (
          <p className="text-center text-base text-ink-muted">
            <MathRenderer text={equation} />
          </p>
        ) : null}
      </StageShell>
    </div>
  );
}
