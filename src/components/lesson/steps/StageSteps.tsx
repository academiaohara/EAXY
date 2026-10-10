"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DefinitionBox } from "@/components/lesson/stage/DefinitionBox";
import { StageModuleRenderer } from "@/components/lesson/stage/StageModuleRenderer";
import { StageViewport } from "@/components/lesson/stage/StageViewport";
import {
  LessonFooterCenterSlot,
  useRegisterLessonPresenterNavigation,
  useRegisterLessonStepControl,
  type LessonContinueMeta,
} from "@/components/lesson/LessonStepControlContext";
import { StageStepControls } from "@/components/lesson/stage/modules/mul-div-naturales/StageStepControls";
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
  MulDivConfig,
  NarrateStep,
  PredictStep,
  RevealStep,
  TiendaCiclistaItem,
} from "@/lib/lesson/types";
import { seededShuffle } from "@/lib/lesson/seeded-shuffle";
import { cn } from "@/lib/utils";

function usesPlainLessonTypography(text: string): boolean {
  return !/\$|\\/.test(text);
}

function LessonRichText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  if (usesPlainLessonTypography(text)) {
    return <span className={className}>{text}</span>;
  }
  return (
    <span className={className}>
      <MathRenderer text={text} />
    </span>
  );
}

function buildPredictMulDivReveal(
  step: PredictStep,
  checked: boolean,
  choiceId: string,
  isCorrect: boolean,
): MulDivConfig | undefined {
  if (!step.mulDiv) {
    return undefined;
  }
  if (!checked || step.mulDiv.scene !== "cociente-resto-feedback") {
    return step.mulDiv;
  }
  const base = step.mulDiv;
  if (base.practiceVariant === "inverse") {
    const attempt = Number(choiceId);
    const q = base.boxes ?? 5;
    const p = base.perBox ?? 8;
    const r = Math.max(0, attempt - q * p);
    return {
      ...base,
      dividend: base.total ?? 43,
      divisor: p,
      quotient: q,
      remainder: r,
      feedbackCorrect: isCorrect,
    };
  }
  const [q, r] = choiceId.split("-").map((n) => Number(n));
  return {
    ...base,
    dividend: base.dividend ?? 47,
    divisor: base.divisor ?? 6,
    quotient: q,
    remainder: r,
    feedbackCorrect: isCorrect,
  };
}

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
  stageClassName?: string;
  children?: React.ReactNode;
};

function StageShell({ theme, definitionBox, title, stage, stageClassName, children }: StageShellProps) {
  return (
    <StageViewport
      theme={theme}
      stageClassName={stageClassName}
      header={definitionBox ? <DefinitionBox text={definitionBox} /> : null}
      stage={stage}
    >
      {children}
      <h3 className="sr-only">{title}</h3>
    </StageViewport>
  );
}

type MultiplicacionManoPersist = { sub: number; maxSub: number };

export function NarrateStepView({
  step,
  theme,
  onContinue,
  onPreviousStep,
}: {
  step: NarrateStep;
  theme: LessonStageTheme;
  onContinue: (meta?: LessonContinueMeta) => void;
  onPreviousStep?: () => void;
}) {
  const isMultiplicacionMano =
    step.module === "mul-div-naturales" && step.scene === "multiplicacion-mano";

  const [persist, setPersist] = usePersistedLessonToolState<MultiplicacionManoPersist>(
    step.id,
    () => ({ sub: 1, maxSub: 1 }),
  );

  const sub = isMultiplicacionMano ? persist.sub : 1;
  const [subPlaying, setSubPlaying] = useState(false);

  const didResumeFullTourRef = useRef(false);
  useEffect(() => {
    if (!isMultiplicacionMano || didResumeFullTourRef.current || persist.maxSub < 4) {
      return;
    }
    didResumeFullTourRef.current = true;
    if (persist.sub < 4) {
      setPersist((current) => ({ ...current, sub: 4 }));
    }
  }, [isMultiplicacionMano, persist.maxSub, persist.sub, setPersist]);

  const advanceSub = useCallback(() => {
    if (!isMultiplicacionMano) {
      onContinue({ completed: true });
      return;
    }
    if (sub < 4) {
      const next = sub + 1;
      setPersist({ sub: next, maxSub: Math.max(persist.maxSub, next) });
      onContinue({ completed: false });
      if (next >= 4) {
        setSubPlaying(false);
      }
      return;
    }
    setSubPlaying(false);
    setPersist({ sub: 4, maxSub: 4 });
    onContinue({ completed: true });
  }, [isMultiplicacionMano, onContinue, persist.maxSub, setPersist, sub]);

  const retreatSub = useCallback(() => {
    if (!isMultiplicacionMano) {
      onPreviousStep?.();
      return;
    }
    if (sub > 1) {
      setPersist((current) => ({ ...current, sub: current.sub - 1 }));
      return;
    }
    onPreviousStep?.();
  }, [isMultiplicacionMano, onPreviousStep, setPersist, sub]);

  const [ready, setReady] = useState(isMultiplicacionMano);

  useEffect(() => {
    if (!isMultiplicacionMano || !subPlaying || sub >= 4) {
      return;
    }
    const timer = window.setTimeout(() => {
      advanceSub();
    }, 1400);
    return () => window.clearTimeout(timer);
  }, [advanceSub, isMultiplicacionMano, sub, subPlaying]);

  const restartMultiplicacionMano = useCallback(() => {
    setSubPlaying(false);
    setPersist((current) => ({ ...current, sub: 1 }));
  }, [setPersist]);

  const footerControls = useMemo(() => {
    if (!isMultiplicacionMano) {
      return null;
    }
    return (
      <StageStepControls
        variant="presenter"
        phase={sub - 1}
        stepCount={4}
        playing={subPlaying}
        onPhaseChange={(next) => {
          setSubPlaying(false);
          const target = next + 1;
          if (target < sub) {
            retreatSub();
          } else if (target > sub) {
            advanceSub();
          }
        }}
        onPlayingChange={setSubPlaying}
        onRestart={restartMultiplicacionMano}
      />
    );
  }, [
    advanceSub,
    isMultiplicacionMano,
    restartMultiplicacionMano,
    retreatSub,
    sub,
    subPlaying,
  ]);
  const control = useMemo(() => {
    if (isMultiplicacionMano) {
      return {
        label: "Continuar",
        onClick: advanceSub,
        testId: "lesson-continue-button",
      };
    }
    if (!ready) {
      return null;
    }
    return {
      label: "Continuar",
      onClick: () => onContinue({ completed: true }),
      testId: "lesson-continue-button",
    };
  }, [advanceSub, isMultiplicacionMano, onContinue, ready]);

  useRegisterLessonStepControl(control);

  const presenterNav = useMemo(() => {
    if (!isMultiplicacionMano) {
      return null;
    }
    return {
      onAdvance: advanceSub,
      onRetreat: retreatSub,
      canAdvance: sub < 4,
      canRetreat: sub > 1,
    };
  }, [advanceSub, isMultiplicacionMano, retreatSub, sub]);
  useRegisterLessonPresenterNavigation(presenterNav);

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
      mulDivSubStep={isMultiplicacionMano ? sub : undefined}
      autoPlay={
        step.module === "mul-div-naturales" &&
        step.scene !== "multiplicacion-mano" &&
        step.scene !== "division-mano" &&
        step.scene !== "reparto-igual" &&
        step.scene !== "exacta-entera" &&
        step.scene !== "mul-div-cierre"
      }
      onReadyChange={setReady}
    />
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col" data-testid="lesson-narrate-step">
      {isMultiplicacionMano ? <LessonFooterCenterSlot>{footerControls}</LessonFooterCenterSlot> : null}
      <StageShell
        theme={theme}
        definitionBox={step.definitionBox}
        title={step.title}
        stage={stage}
        stageClassName="min-h-[12rem]"
      />
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
  const [hintVisible, setHintVisible] = useState(false);
  const isMultiplicarSextaEntrada =
    step.module === "mul-div-naturales" && step.mulDiv?.scene === "multiplicar-sexta-entrada";
  const isDistributivaConEscena =
    step.module === "mul-div-naturales" &&
    (step.mulDiv?.scene === "distributiva-bloques" || step.scene === "distributiva-bloques");
  const predictStageAlwaysVisible = isMultiplicarSextaEntrada || isDistributivaConEscena;

  const isAnaLeoExploracion =
    step.module === "jerarquia-operaciones" && step.scene === "exploracion-ana-leo";

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

  const submitAnaLeoChoice = useCallback(
    (id: string) => {
      if (checked || !isAnaLeoExploracion) {
        return;
      }
      const correct = id === step.correctChoiceId;
      setChoiceId(id);
      setIsCorrect(correct);
      setChecked(true);
      setReveal(true);
      onCheck({
        correct,
        snapshot: {
          kind: "predict",
          choiceId: id,
          isCorrect: correct,
          revealPlayed: true,
        },
      });
    },
    [checked, isAnaLeoExploracion, onCheck, step.correctChoiceId],
  );

  const control = useMemo(() => {
    if (checked || isAnaLeoExploracion) {
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
  }, [checked, choiceId, disabled, isAnaLeoExploracion, numericValue, runCheck, step.mode]);

  useRegisterLessonStepControl(control);

  const choiceOptions = useMemo(() => {
    const base = step.choices ?? [];
    if (!step.shuffleChoices) {
      return base;
    }
    return seededShuffle(base, step.id);
  }, [step.choices, step.id, step.shuffleChoices]);

  const selectedChoice = choiceOptions.find((choice) => choice.id === choiceId);
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
        jerarquia={{
          revealPlayed: reveal,
          selectedChoiceId: choiceId,
          isCorrect: checked ? isCorrect : undefined,
        }}
      />
    ) : null;

  if (isDistributivaConEscena && step.mulDiv) {
    const distributivaStage = (
      <StageModuleRenderer
        module="mul-div-naturales"
        stepId={step.id}
        scene={step.scene ?? "distributiva-bloques"}
        mulDiv={{ ...step.mulDiv, scene: "distributiva-bloques" }}
        autoPlay
      />
    );

    return (
      <div data-testid="lesson-predict-step">
        <StageShell theme={theme} definitionBox={step.definitionBox} title={step.title} stage={distributivaStage}>
          <h3 className="mb-4 text-center text-base font-semibold leading-relaxed text-ink">
            <MathRenderer text={step.question} />
          </h3>
          {step.hint && step.hintHiddenUntilRequested && !checked ? (
            <div className="mb-4 flex min-h-[2.75rem] flex-col items-center justify-center gap-2">
              {hintVisible ? (
                <p className="max-w-lg text-center text-sm leading-relaxed text-ink-muted">
                  <MathRenderer text={step.hint} />
                </p>
              ) : (
                <button
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-cobalt/35 bg-cobalt-tint/80 text-sm font-bold text-cobalt transition hover:border-cobalt hover:bg-cobalt-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
                  aria-label="Ver pista"
                  aria-expanded={hintVisible}
                  onClick={() => setHintVisible(true)}
                >
                  ?
                </button>
              )}
            </div>
          ) : null}
          <div className="mx-auto flex max-w-md flex-col gap-2">
            {choiceOptions.map((choice) => (
              <button
                key={choice.id}
                type="button"
                data-testid={`predict-choice-${choice.id}`}
                disabled={disabled || checked}
                onClick={() => setChoiceId(choice.id)}
                className={cn(
                  "rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition",
                  choiceId === choice.id
                    ? "border-cobalt bg-cobalt-tint"
                    : "border-slate-200 hover:border-cobalt/30",
                  checked && choiceId !== choice.id && "opacity-55",
                )}
                aria-pressed={choiceId === choice.id}
              >
                <LessonRichText text={choice.label} className="text-sm font-medium" />
              </button>
            ))}
          </div>
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
        </StageShell>
      </div>
    );
  }

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
    const anaLeo = step.scene === "exploracion-ana-leo";
    return (
      <div data-testid="lesson-predict-step">
        <StageShell
          theme={theme}
          definitionBox={step.definitionBox}
          title={step.title}
          stage={anaLeo ? undefined : jerarquiaStage}
        >
          <h3 className="mb-4 text-center text-lg font-semibold leading-relaxed text-ink">
            <MathRenderer text={step.question} />
          </h3>
          {step.mode === "choice" ? (
            <div
              className={cn(
                "mx-auto flex gap-2",
                anaLeo ? "max-w-xl flex-wrap justify-center" : "max-w-md flex-col",
              )}
            >
              {(step.choices ?? []).map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  disabled={disabled || checked}
                  onClick={() =>
                    anaLeo ? submitAnaLeoChoice(choice.id) : setChoiceId(choice.id)
                  }
                  className={cn(
                    "min-h-11 rounded-xl border-2 px-4 py-3 text-sm font-bold transition",
                    anaLeo ? "min-w-[7rem] flex-1 text-center" : "text-left font-medium",
                    checked && choice.id === step.correctChoiceId
                      ? "border-emerald-500 bg-emerald-500/15"
                      : checked && choiceId === choice.id
                        ? "border-red-400 opacity-60"
                        : choiceId === choice.id
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
          {anaLeo ? <div className="mt-4">{jerarquiaStage}</div> : null}
          {checked && !anaLeo ? (
            <p className="mt-4 text-center text-sm text-ink-muted" role="status">
              {isCorrect ? "¡Bien visto!" : "Mira la animación: el orden importa."}
            </p>
          ) : null}
        </StageShell>
      </div>
    );
  }

  const mulDivReveal = buildPredictMulDivReveal(step, checked, choiceId, isCorrect);

  const stageReveal =
    reveal && !predictStageAlwaysVisible && step.module && step.scene
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
        : step.module === "mul-div-naturales" && mulDivReveal
          ? (
              <StageModuleRenderer
                module="mul-div-naturales"
                stepId={`${step.id}-reveal`}
                scene={step.scene}
                mulDiv={{ ...mulDivReveal, scene: mulDivReveal.scene }}
                autoPlay
              />
            )
          : null
      : null;

  return (
    <StageViewport theme={theme} header={step.definitionBox ? <DefinitionBox text={step.definitionBox} /> : null}>
      <section
        className="lesson-idea-enter border border-[color:var(--stage-border,#334155)] bg-black/15 p-6 sm:p-8"
        data-testid="lesson-predict-step"
      >
        <h3 className="mb-4 text-center text-lg font-semibold text-[color:var(--stage-ink,#e8edf5)]">
          <LessonRichText text={step.question} />
        </h3>
        {step.hint && step.hintHiddenUntilRequested && !checked ? (
          <div className="mb-4 flex min-h-[2.75rem] flex-col items-center justify-center gap-2">
            {hintVisible ? (
              <p className="max-w-lg text-center text-sm leading-relaxed text-ink-muted">
                <MathRenderer text={step.hint} />
              </p>
            ) : (
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-cobalt/35 bg-cobalt-tint/80 text-sm font-bold text-cobalt transition hover:border-cobalt hover:bg-cobalt-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt"
                aria-label="Ver pista"
                aria-expanded={hintVisible}
                onClick={() => setHintVisible(true)}
              >
                ?
              </button>
            )}
          </div>
        ) : null}
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
            {choiceOptions.map((choice) => (
              <button
                key={choice.id}
                type="button"
                data-testid={`predict-choice-${choice.id}`}
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
                <LessonRichText text={choice.label} className="text-sm font-medium" />
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
  reduceTokens: string[];
  reduceHistory: string[][];
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
  const defaultReduceTokens =
    step.goal.kind === "hierarchy-reduce" ? [...step.goal.tokens] : [];

  const [persist, setPersist] = usePersistedLessonToolState<ExplorePersist>(step.id, () => ({
    selectedIds: defaultIds,
    openAfter: null,
    closeBefore: null,
    tapSequence: [],
    boxCounts: defaultBoxCounts,
    reduceTokens: defaultReduceTokens,
    reduceHistory: [],
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
    if (step.goal.kind === "hierarchy-reduce") {
      return persist.reduceTokens.length === 1;
    }
    if (step.goal.kind === "boxes-equal") {
      const goal = step.goal;
      const sum = persist.boxCounts.reduce((s, n) => s + n, 0);
      return sum === goal.total;
    }
    return false;
  }, [persist, step]);

  const boxesDistributionCorrect = useMemo(() => {
    if (step.goal.kind !== "boxes-equal") {
      return false;
    }
    const goal = step.goal;
    return (
      persist.boxCounts.reduce((s, n) => s + n, 0) === goal.total &&
      persist.boxCounts.every((n) => n === goal.perBox)
    );
  }, [persist.boxCounts, step.goal]);

  const boxesUnequalMessage = useMemo(() => {
    if (step.goal.kind !== "boxes-equal" || boxesDistributionCorrect) {
      return null;
    }
    const counts = persist.boxCounts;
    if (counts.length === 0) {
      return null;
    }
    const max = Math.max(...counts);
    const min = Math.min(...counts);
    if (max === min) {
      return null;
    }
    const maxIndex = counts.indexOf(max) + 1;
    const minIndex = counts.indexOf(min) + 1;
    return `La caja ${maxIndex} tiene más (${max}) y la caja ${minIndex} tiene menos (${min}).`;
  }, [boxesDistributionCorrect, persist.boxCounts, step.goal]);

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
    if (step.goal.kind === "hierarchy-sequence") {
      correct = placementReady;
    }
    if (step.goal.kind === "hierarchy-reduce") {
      correct = placementReady;
    }
    if (step.goal.kind === "boxes-equal") {
      correct = boxesDistributionCorrect;
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
  }, [boxesDistributionCorrect, checked, evaluatedValue, onCheck, placementReady, step.goal]);

  const control = useMemo(() => {
    if (checked || step.goal.kind === "hierarchy-reduce") {
      return null;
    }
    return {
      label: "Comprobar",
      onClick: runCheck,
      disabled: !placementReady || disabled,
      testId: "lesson-check-button",
    };
  }, [checked, disabled, placementReady, runCheck, step.goal.kind]);

  useRegisterLessonStepControl(control);

  const handleReduceStageReady = useCallback(
    (ready: boolean) => {
      if (step.goal.kind !== "hierarchy-reduce" || !ready || checked || disabled) {
        return;
      }
      runCheck();
    },
    [checked, disabled, runCheck, step.goal.kind],
  );

  const stage = (
    <StageModuleRenderer
      module={step.module}
      stepId={step.id}
      scene={step.scene}
      onReadyChange={step.goal.kind === "hierarchy-reduce" ? handleReduceStageReady : undefined}
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
          : step.module === "jerarquia-operaciones" && step.goal.kind === "hierarchy-reduce"
            ? {
                initialTokens: step.goal.tokens,
                reduceTokens: persist.reduceTokens,
                reduceHistory: persist.reduceHistory,
                onReduceTokensChange: (reduceTokens, historyRow) =>
                  setPersist((prev) => ({
                    ...prev,
                    reduceTokens,
                    reduceHistory: [...prev.reduceHistory, [...historyRow]],
                  })),
                reduceDisabled: checked,
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

  const reducePractice = step.goal.kind === "hierarchy-reduce";

  return (
    <div data-testid="lesson-explore-step">
      <StageShell
        theme={theme}
        definitionBox={step.definitionBox}
        title={step.title}
        stage={reducePractice ? undefined : stage}
      >
        <p className="text-center text-base font-semibold leading-relaxed text-ink">
          <MathRenderer text={step.question} />
        </p>
        {reducePractice ? <div className="mt-4">{stage}</div> : null}
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
                {step.goal.kind === "boxes-equal" && step.explanation ? (
                  <MathRenderer text={step.explanation} />
                ) : step.goal.kind === "boxes-equal" ? (
                  "¡Correcto! Repartiste el total en cajas iguales."
                ) : step.goal.kind === "hierarchy-reduce" ? (
                  <>
                    ¡Correcto! El resultado es {persist.reduceTokens[0]}.
                    {step.explanation ? (
                      <>
                        {" "}
                        <MathRenderer text={step.explanation} />
                      </>
                    ) : null}
                  </>
                ) : (
                  `¡Correcto! El resultado es ${step.goal.kind === "expression-result" ? step.goal.target : ""}.`
                )}
              </p>
            ) : (
              <>
                <p className="font-semibold">
                  {step.goal.kind === "boxes-equal" && boxesUnequalMessage
                    ? boxesUnequalMessage
                    : `Tu expresión vale ${evaluatedValue ?? "?"}, no ${step.goal.kind === "expression-result" ? step.goal.target : "?"}.`}
                </p>
                {step.explanation && step.goal.kind !== "boxes-equal" ? (
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
        {equation && step.scene !== "conmutativa-producto" && step.scene !== "asociativa-huevos" ? (
          <p className="text-center text-base text-ink-muted">
            <MathRenderer text={equation} />
          </p>
        ) : null}
      </StageShell>
    </div>
  );
}
