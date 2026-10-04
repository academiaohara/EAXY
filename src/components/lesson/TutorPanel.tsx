"use client";

import { Fragment, useEffect, useRef } from "react";
import { ChevronLeftIcon, MessageCircleQuestionIcon, XIcon } from "lucide-react";
import { MathBlockList, MathRenderer } from "@/components/lesson/MathRenderer";
import { LessonVisualView } from "@/components/lesson/visuals/LessonVisualView";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import { Button } from "@/components/ui/button";
import { TUTOR_NICKNAME } from "@/lib/tutor/identity";
import { cn } from "@/lib/utils";
import type { HelpNode, HelpOption } from "@/lib/lesson/help-route";
import type { TutorLogEntry } from "@/lib/lesson/tutor-log";
import { tutorMoodForReaction, type TutorReaction } from "@/lib/lesson/tutor-message";

type TutorPanelProps = {
  open: boolean;
  log: TutorLogEntry[];
  /** Título de cada paso, para separar el historial por pasos. */
  stepTitles?: Record<string, string>;
  /** Nodo de ayuda abierto; sin él el panel es sólo el historial. */
  helpNode: HelpNode | null;
  /** El paso tiene algo que explicar, así que se puede pedir ayuda. */
  canAskForHelp: boolean;
  reaction: TutorReaction;
  /** Mensaje del historial sobre el que el alumno está preguntando. */
  activeEntryKey?: string | null;
  onClose: () => void;
  onStartHelp: () => void;
  onChooseOption: (option: HelpOption) => void;
  /** El alumno pulsa un mensaje del tutor para que se lo explique. */
  onAskAbout?: (entry: TutorLogEntry) => void;
};

const toneBubble = {
  none: "border-slate-200 bg-white",
  correct: "border-emerald-200 bg-emerald-50",
  incorrect: "border-amber-200 bg-amber-50",
};

function TutorBubbleContent({ entry }: { entry: TutorLogEntry }) {
  return (
    <>
      <span className="block font-medium">
        <MathRenderer text={entry.text} />
      </span>
      {entry.detail?.map((paragraph) => (
        <span key={paragraph} className="block text-[0.8125rem] leading-relaxed text-ink-muted">
          <MathRenderer text={paragraph} />
        </span>
      ))}
    </>
  );
}

function TutorBubble({
  entry,
  active,
  onAsk,
}: {
  entry: TutorLogEntry;
  active: boolean;
  onAsk?: (entry: TutorLogEntry) => void;
}) {
  const tone = toneBubble[entry.tone ?? "none"];
  const base =
    "lesson-chat-enter flex max-w-[92%] flex-col gap-2 self-start rounded-2xl rounded-tl-sm border px-4 py-3 text-left text-sm text-ink shadow-sm";

  if (onAsk && entry.stepId) {
    return (
      <button
        type="button"
        onClick={() => onAsk(entry)}
        className={cn(
          base,
          tone,
          "group relative transition-all hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt",
          active && "border-cobalt ring-2 ring-cobalt/20",
        )}
        aria-label={`Pregúntale a ${TUTOR_NICKNAME} por este mensaje`}
        aria-pressed={active}
        data-testid="tutor-log-message"
      >
        <TutorBubbleContent entry={entry} />
        <span
          className={cn(
            "pointer-events-none absolute -bottom-2.5 right-3 flex items-center gap-1 rounded-full border border-cobalt/30 bg-white px-2 py-0.5 text-[11px] font-semibold text-cobalt shadow-sm transition-opacity",
            active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
          )}
          aria-hidden
        >
          <MessageCircleQuestionIcon className="size-3.5" />
          {active ? "Te lo explico abajo" : "Explícame esto"}
        </span>
      </button>
    );
  }

  return (
    <div className={cn(base, tone)} data-testid="tutor-log-explanation">
      <TutorBubbleContent entry={entry} />
      {entry.math?.length ? <MathBlockList blocks={entry.math} className="px-3 py-2" /> : null}
      {entry.visual ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <LessonVisualView visual={entry.visual} />
        </div>
      ) : null}
    </div>
  );
}

function StudentBubble({ entry }: { entry: TutorLogEntry }) {
  return (
    <div className="lesson-chat-enter max-w-[85%] self-end rounded-2xl rounded-br-sm bg-cobalt px-4 py-2 text-sm font-medium text-white">
      <MathRenderer text={entry.text} />
    </div>
  );
}

export function TutorPanel({
  open,
  log,
  stepTitles = {},
  helpNode,
  canAskForHelp,
  reaction,
  activeEntryKey = null,
  onClose,
  onStartHelp,
  onChooseOption,
  onAskAbout,
}: TutorPanelProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    }
  }, [open]);

  // El último mensaje es el que importa: el panel se abre por abajo.
  useEffect(() => {
    if (!open) {
      return;
    }
    const node = listRef.current;
    if (node) {
      node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
    }
  }, [open, log.length, helpNode?.id]);

  if (!open) {
    return null;
  }

  let previousStepId: string | undefined;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default bg-slate-900/20 lg:hidden"
        onClick={onClose}
        aria-label={`Cerrar el panel de ${TUTOR_NICKNAME}`}
        data-testid="tutor-panel-backdrop"
      />

      <aside
        className={cn(
          "tutor-panel-slide-in fixed inset-y-0 left-0 z-50 flex w-full max-w-[26rem] flex-col border-r border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-xl lg:w-[24rem]",
        )}
        role="dialog"
        aria-modal="false"
        aria-label={`Mensajes de ${TUTOR_NICKNAME}`}
        data-testid="tutor-panel"
      >
        {/* Tirador a media altura en el borde derecho del panel. */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 top-1/2 flex h-14 w-7 translate-x-full -translate-y-1/2 items-center justify-center rounded-r-full border border-l-0 border-slate-200 bg-white text-slate-400 shadow-[4px_0_12px_rgba(15,23,42,0.08)] transition-colors hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
          aria-label={`Cerrar el panel de ${TUTOR_NICKNAME}`}
          data-testid="tutor-panel-edge-close"
        >
          <ChevronLeftIcon className="size-5" aria-hidden />
        </button>

        <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
          <TutorMascot mood={tutorMoodForReaction(reaction)} size={40} label={null} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink">{TUTOR_NICKNAME}</p>
            <p className="truncate text-xs text-ink-muted">
              Pulsa un mensaje y te explico lo que quieras
            </p>
          </div>
          <Button
            ref={closeRef}
            type="button"
            variant="ghost"
            size="icon-lg"
            onClick={onClose}
            className="rounded-full text-ink-muted hover:bg-cobalt-tint hover:text-cobalt active:bg-[color-mix(in_srgb,var(--cobalt-tint),var(--cobalt)_18%)] active:text-cobalt"
            aria-label={`Cerrar el panel de ${TUTOR_NICKNAME}`}
            data-testid="tutor-panel-close"
          >
            <XIcon className="size-5" />
          </Button>
        </header>

        <div
          ref={listRef}
          className="scrollbar-subtle flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto overscroll-contain px-4 py-4"
          data-testid="tutor-panel-log"
        >
          {log.length === 0 ? (
            <p className="text-sm text-ink-muted">
              Aquí se van guardando los mensajes de {TUTOR_NICKNAME} mientras avanzas.
            </p>
          ) : (
            log.map((entry, index) => {
              const showDivider =
                entry.stepId !== undefined && entry.stepId !== previousStepId && stepTitles[entry.stepId];
              if (entry.stepId !== undefined) {
                previousStepId = entry.stepId;
              }
              return (
                <Fragment key={`${entry.key}-${index}`}>
                  {showDivider ? (
                    <div
                      className="mt-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-ink-muted first:mt-0"
                      data-testid="tutor-log-step-divider"
                    >
                      <span className="h-px flex-1 bg-slate-200" aria-hidden />
                      <span className="max-w-[75%] truncate">
                        <MathRenderer text={stepTitles[entry.stepId!]} />
                      </span>
                      <span className="h-px flex-1 bg-slate-200" aria-hidden />
                    </div>
                  ) : null}
                  {entry.author === "tutor" ? (
                    <TutorBubble entry={entry} active={entry.key === activeEntryKey} onAsk={onAskAbout} />
                  ) : (
                    <StudentBubble entry={entry} />
                  )}
                </Fragment>
              );
            })
          )}
        </div>

        <footer className="shrink-0 border-t border-slate-200 bg-slate-50/80 px-4 py-3">
          {helpNode ? (
            <div className="flex flex-col gap-2" data-testid="tutor-help-options">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Elige una
              </p>
              {helpNode.options.map((option, index) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onChooseOption(option)}
                  className={cn(
                    "lesson-chat-enter rounded-xl border-2 px-4 py-2.5 text-left text-sm font-medium transition-all",
                    option.next === null
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900 hover:border-emerald-300"
                      : "border-slate-200 bg-white text-ink hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-sm",
                  )}
                  style={{ animationDelay: `${index * 60}ms` }}
                  data-testid={`tutor-help-option-${option.id}`}
                >
                  <MathRenderer text={option.label} />
                </button>
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={onStartHelp}
              disabled={!canAskForHelp}
              className="w-full rounded-xl bg-cobalt px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cobalt/90 disabled:bg-slate-200 disabled:text-slate-500"
              data-testid="tutor-panel-help-button"
            >
              {canAskForHelp ? "No entiendo algo" : "Nada que repasar en este paso"}
            </button>
          )}
        </footer>
      </aside>
    </>
  );
}
