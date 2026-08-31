"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface LessonCompleteProps {
  lessonTitle: string;
  stars: number;
  courseId?: string;
  topicId?: string;
  nextLessonSlug?: string | null;
}

export function LessonComplete({
  lessonTitle,
  stars,
  courseId,
  topicId,
  nextLessonSlug,
}: LessonCompleteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6 px-2 py-10 text-center sm:py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="text-5xl sm:text-6xl"
      >
        🎉
      </motion.div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          ¡Lección completada!
        </h2>
        <p className="mt-2 max-w-md text-sm text-slate-600 sm:text-base">
          Has terminado &ldquo;{lessonTitle}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-5 py-3">
        <span className="text-2xl" aria-hidden>
          ⭐
        </span>
        <div className="text-left">
          <p className="text-sm font-semibold text-amber-800">
            +{stars} estrella{stars === 1 ? "" : "s"}
          </p>
          <p className="text-xs text-amber-600">¡Buen trabajo!</p>
        </div>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-3">
        {nextLessonSlug && (
          <Link href={`/leccion/${nextLessonSlug}`}>
            <Button fullWidth className="!rounded-2xl">
              Siguiente lección →
            </Button>
          </Link>
        )}

        {courseId && topicId && (
          <Link href={`/curso/${courseId}/tema/${topicId}`}>
            <Button variant="secondary" fullWidth className="!rounded-2xl">
              Volver al tema
            </Button>
          </Link>
        )}

        <Link href="/rutas">
          <Button variant="ghost" fullWidth>
            Ver rutas de aprendizaje
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
