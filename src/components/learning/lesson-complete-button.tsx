"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { markLessonCompleted } from "@/lib/learning-paths/actions";

type LessonCompleteButtonProps = {
  lessonId: string;
  disabled?: boolean;
};

export function LessonCompleteButton({ lessonId, disabled }: LessonCompleteButtonProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleComplete() {
    setErrorMessage(null);

    startTransition(async () => {
      const result = await markLessonCompleted(lessonId);

      if (result.error) {
        setErrorMessage(result.error);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={handleComplete}
        disabled={disabled || isPending}
        data-testid="lesson-complete-button"
      >
        {isPending ? (
          <>
            <Loader2Icon className="animate-spin" data-icon="inline-start" />
            Guardando...
          </>
        ) : (
          "Marcar como completada"
        )}
      </Button>

      {errorMessage && (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
