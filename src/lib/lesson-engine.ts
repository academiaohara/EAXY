import type {
  CheckResult,
  FractionBarWidget,
  Lesson,
  SliderExploreWidget,
  Step,
  TapSelectWidget,
  Widget,
  WidgetAnswer,
} from "./lesson-schema";

export function checkWidgetAnswer(
  widget: Widget,
  answer: WidgetAnswer,
): CheckResult {
  switch (widget.type) {
    case "tap_select":
      return checkTapSelect(widget, answer);
    case "slider_explore":
      return checkSliderExplore(widget, answer);
    case "fraction_bar":
      return checkFractionBar(widget, answer);
    default:
      return {
        correct: false,
        explanation: "Widget no reconocido.",
        hints: [],
        userAnswer: answer,
        correctAnswer: null,
      };
  }
}

function checkTapSelect(
  widget: TapSelectWidget,
  answer: WidgetAnswer,
): CheckResult {
  const selectedId =
    answer.type === "tap_select" ? answer.selectedId : null;
  const correct = selectedId === widget.correctOptionId;
  const correctLabel =
    widget.options.find((o) => o.id === widget.correctOptionId)?.label ??
    widget.correctOptionId;

  return {
    correct,
    explanation: correct
      ? "¡Correcto! Has elegido la opción adecuada."
      : `No es la opción correcta. La respuesta es: ${correctLabel}.`,
    hints: widget.hints,
    userAnswer: selectedId,
    correctAnswer: widget.correctOptionId,
  };
}

function checkSliderExplore(
  widget: SliderExploreWidget,
  answer: WidgetAnswer,
): CheckResult {
  const value = answer.type === "slider_explore" ? answer.value : widget.initial;
  const target = widget.checkValue ?? widget.initial;
  const tolerance = widget.tolerance;
  const correct = Math.abs(value - target) <= tolerance;

  return {
    correct,
    explanation: correct
      ? `¡Exacto! El valor correcto es ${target}${widget.unit ?? ""}.`
      : `El valor correcto es ${target}${widget.unit ?? ""}. Observa cómo cambia la visualización.`,
    hints: widget.hints,
    userAnswer: value,
    correctAnswer: target,
  };
}

function checkFractionBar(
  widget: FractionBarWidget,
  answer: WidgetAnswer,
): CheckResult {
  const shaded =
    answer.type === "fraction_bar" ? answer.shadedParts : 0;
  const targetShaded = Math.round(
    (widget.targetNumerator / widget.targetDenominator) * widget.totalParts,
  );
  const correct = shaded === targetShaded;

  return {
    correct,
    explanation: correct
      ? `¡Bien! Has sombreado ${widget.targetNumerator}/${widget.targetDenominator} de la barra.`
      : `Debes sombrear ${widget.targetNumerator} de ${widget.targetDenominator} partes iguales (${targetShaded} de ${widget.totalParts} casillas).`,
    hints: widget.hints,
    userAnswer: shaded,
    correctAnswer: targetShaded,
  };
}

export function stepRequiresCheck(step: Step): boolean {
  if (step.requiresCheck) return true;
  if (!step.widget) return false;

  if (step.widget.type === "tap_select") return true;
  if (step.widget.type === "fraction_bar") return true;
  if (
    step.widget.type === "slider_explore" &&
    step.widget.checkValue !== undefined
  ) {
    return true;
  }

  return false;
}

export function canAdvanceStep(
  step: Step,
  lastCheck: CheckResult | null,
): boolean {
  if (step.type === "intro" || step.type === "explanation") return true;
  if (!stepRequiresCheck(step)) return true;
  return lastCheck?.correct === true;
}

export function getLessonProgress(lesson: Lesson, completedStepIds: string[]) {
  const total = lesson.steps.length;
  const completed = lesson.steps.filter((s) =>
    completedStepIds.includes(s.id),
  ).length;
  return { completed, total, percentage: Math.round((completed / total) * 100) };
}
