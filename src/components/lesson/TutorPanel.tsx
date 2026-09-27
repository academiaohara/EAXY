"use client";

import { useEffect, useRef } from "react";
import { ChevronRightIcon, XIcon } from "lucide-react";
import { MathBlockList, MathRenderer } from "@/components/lesson/MathRenderer";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import { cn } from "@/lib/utils";
import type { HelpNode, HelpOption } from "@/lib/lesson/help-route";
import type { TutorLogEntry } from "@/lib/lesson/tutor-log";
import { tutorMoodForReaction, type TutorReaction } from "@/lib/lesson/tutor-message";

type TutorPanelProps = {
  open: boolean;
  log: TutorLogEntry[];
  /** Nodo de ayuda abierto; sin él el panel es sólo el historial. */
  helpNode: HelpNode | null;
  /** El paso tiene algo que explicar, así que se puede pedir ayuda. */
  canAskForHelp: boolean;
  reaction: TutorReaction;
  onClose: () => void;
  onStartHelp: () => void;
  onChooseOption: (option: HelpOption) => void;
};

function TutorBubble({ entry }: { entry: TutorLogEntry }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3 text-sm text-ink shadow-sm">
      <p className="font-medium">
        <MathRenderer text={entry.text} />
      </p>
      {entry.detail?.map((paragraph) => (
        <p key={paragraph} className="text-[0.8125rem] leading-relaxed text-ink-muted">
          <MathRenderer text={paragraph} />
        </p>
      ))}
      {entry.math?.length ? <MathBlockList blocks={entry.math} className="px-3 py-2" /> : null}
    </div>
  );
}

function StudentBubble({ entry }: { entry: TutorLogEntry }) {
  return (
    <div className="self-end rounded-2xl rounded-br-sm bg-cobalt px-4 py-2 text-sm font-medium text-white">
      <MathRenderer text={entry.text} />
    </div>
  );
}

export function TutorPanel({
  open,
  log,
  helpNode,
  canAskForHelp,
  reaction,
  onClose,
  onStartHelp,
  onChooseOption,
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
      node.scrollTop = node.scrollHeight;
    }
  }, [open, log.length, helpNode?.id]);

  if (!open) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 cursor-default bg-slate-900/20 lg:hidden"
        onClick={onClose}
        aria-label="Cerrar el panel del tutor"
        data-testid="tutor-panel-backdrop"
      />

      <aside
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[26rem] flex-col border-l border-slate-200 bg-white shadow-xl lg:w-[24rem]"
        role="dialog"
        aria-modal="false"
        aria-label="Mensajes del tutor"
        data-testid="tutor-panel"
      >
        {/* Tirador a media altura: cerrar sin subir la vista hasta la cabecera. */}
        <button
          type="button"
          onClick={onClose}
          className="absolute left-0 top-1/2 flex h-14 w-7 -translate-x-full -translate-y-1/2 items-center justify-center rounded-l-full border border-r-0 border-slate-200 bg-white text-slate-400 shadow-[-4px_0_12px_rgba(15,23,42,0.08)] transition-colors hover:text-cobalt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
          aria-label="Cerrar el panel del tutor"
          data-testid="tutor-panel-edge-close"
        >
          <ChevronRightIcon className="size-5" aria-hidden />
        </button>

        <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 px-4 py-3">
          <TutorMascot mood={tutorMoodForReaction(reaction)} size={40} label={null} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-ink">Tutor</p>
            <p className="truncate text-xs text-ink-muted">Todo lo que te ha dicho en la lección</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
            aria-label="Cerrar el panel del tutor"
            data-testid="tutor-panel-close"
          >
            <XIcon className="size-5" />
          </button>
        </header>

        <div
          ref={listRef}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-4"
          data-testid="tutor-panel-log"
        >
          {log.length === 0 ? (
            <p className="text-sm text-ink-muted">
              Aquí se van guardando los mensajes del tutor mientras avanzas.
            </p>
          ) : (
            log.map((entry, index) =>
              entry.author === "tutor" ? (
                <TutorBubble key={`${entry.key}-${index}`} entry={entry} />
              ) : (
                <StudentBubble key={`${entry.key}-${index}`} entry={entry} />
              ),
            )
          )}
        </div>

        <footer className="shrink-0 border-t border-slate-200 bg-slate-50/80 px-4 py-3">
          {helpNode ? (
            <div className="flex flex-col gap-2" data-testid="tutor-help-options">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Elige una
              </p>
              {helpNode.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onChooseOption(option)}
                  className={cn(
                    "rounded-xl border-2 px-4 py-2.5 text-left text-sm font-medium transition-all",
                    option.next === null
                      ? "border-emerald-200 bg-emerald-50 text-emerald-900 hover:border-emerald-300"
                      : "border-slate-200 bg-white text-ink hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-sm",
                  )}
                  data-testid={`tutor-help-option-${option.id}`}
                >
                  {option.label}
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
