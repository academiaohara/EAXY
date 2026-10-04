import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PracticeSavedNoticeProps = {
  isCorrect: boolean;
  className?: string;
};

/** Indica que la respuesta del paso ya quedó guardada al volver atrás en la lección. */
export function PracticeSavedNotice({ isCorrect, className }: PracticeSavedNoticeProps) {
  return (
    <p
      className={cn(
        "flex items-center justify-center gap-2 text-center text-xs font-medium sm:text-sm",
        isCorrect ? "text-emerald-700" : "text-amber-800",
        className,
      )}
      data-testid="lesson-practice-saved-notice"
    >
      <CheckIcon className="size-3.5 shrink-0" aria-hidden />
      {isCorrect ? "Respuesta guardada · acertaste en este paso" : "Respuesta guardada · puedes reintentar si quieres"}
    </p>
  );
}
