"use client";

import Link from "next/link";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TutorMascot } from "@/components/tutor/tutor-mascot";
import { cn } from "@/lib/utils";

type LessonCompleteProps = {
  lessonTitle: string;
  stars: number;
  totalStars: number;
  courseHref: string;
  onRestart: () => void;
};

export function LessonComplete({
  lessonTitle,
  stars,
  totalStars,
  courseHref,
  onRestart,
}: LessonCompleteProps) {
  const starSlots = Math.max(totalStars, stars, 1);

  return (
    <div
      className="flex h-full min-h-0 w-full items-center justify-center p-4 sm:p-8"
      data-testid="lesson-complete"
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border-2 border-emerald-200 bg-paper-raised shadow-lg shadow-emerald-100/50">
        <div className="relative bg-gradient-to-b from-emerald-50 to-white px-8 pt-10 text-center">
          <div className="relative mx-auto size-24">
            <TutorMascot
              mood="celebrate"
              size={96}
              label="El tutor celebra que has completado la lección"
            />
          </div>
        </div>

        <div className="space-y-6 px-8 pb-10 pt-6 text-center">
          <div className="space-y-2">
            <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
              ¡Lección completada!
            </h1>
            <p className="text-sm text-muted-foreground">
              Has terminado &ldquo;{lessonTitle}&rdquo;.
            </p>
          </div>

          {totalStars > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1.5" aria-hidden>
                {Array.from({ length: starSlots }, (_, index) => (
                  <StarIcon
                    key={index}
                    className={cn(
                      "size-7",
                      index < stars
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-100 text-slate-300",
                    )}
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-emerald-700">
                {stars} de {totalStars} aciertos en esta sesión
              </p>
            </div>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button
              type="button"
              variant="outline"
              className="rounded-full py-6 sm:py-3"
              onClick={onRestart}
            >
              Repetir lección
            </Button>
            <Button
              nativeButton={false}
              className="rounded-full py-6 sm:py-3 sm:min-w-[12rem]"
              render={<Link href={courseHref} />}
            >
              Volver al tema
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
