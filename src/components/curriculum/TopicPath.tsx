"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { getTopicVisual } from "@/lib/topic-icons";
import {
  getLessonStatus,
  isLessonUnlocked,
  type LessonStatus,
} from "@/lib/course-progress";
import { useHasMounted } from "@/lib/use-has-mounted";
import type { TopicWithLessons } from "@/lib/curriculum-schema";
import { Button } from "@/components/ui/Button";

interface TopicPathProps {
  topic: TopicWithLessons;
  topicIndex: number;
  topics: Array<{ id: string; lessonSlugs: string[] }>;
  presentationByLesson?: Record<string, string>;
}

interface PathNodeProps {
  lesson: TopicWithLessons["lessons"][number];
  status: LessonStatus;
  isActive: boolean;
  isLast: boolean;
  visual: ReturnType<typeof getTopicVisual>;
  onSelect: () => void;
}

function PathNode({
  lesson,
  status,
  isActive,
  isLast,
  visual,
  onSelect,
}: PathNodeProps) {
  const isLocked = status === "locked";

  return (
    <div className="relative flex items-center gap-4">
      {!isLast && (
        <div
          className="absolute left-6 top-14 h-[calc(100%-1rem)] w-0.5 -translate-x-1/2 bg-slate-200"
          aria-hidden
        />
      )}

      <button
        type="button"
        onClick={onSelect}
        disabled={isLocked}
        className={cn(
          "relative z-10 flex shrink-0 flex-col items-center",
          isLocked ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        )}
        aria-label={lesson.title}
      >
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full border-4 transition sm:h-14 sm:w-14",
            status === "completed" &&
              "border-emerald-400 bg-emerald-50 text-emerald-600",
            status === "in_progress" &&
              "border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-200",
            status === "available" &&
              "border-indigo-300 bg-white hover:border-indigo-400",
            status === "locked" && "border-slate-200 bg-slate-100",
            isActive && status !== "locked" && "ring-4 ring-indigo-200",
          )}
        >
          {status === "completed" ? (
            <span className="text-lg font-bold">✓</span>
          ) : status === "locked" ? (
            <span className="text-sm text-slate-400">🔒</span>
          ) : (
            <span className="text-xl" style={{ color: visual.color }}>
              {visual.icon}
            </span>
          )}
        </div>
      </button>

      <div className="min-w-0 flex-1 pb-8">
        <p
          className={cn(
            "font-medium",
            isLocked ? "text-slate-400" : "text-slate-800",
            isActive && !isLocked && "font-semibold text-indigo-900",
          )}
        >
          {lesson.title}
        </p>
        {!isLocked && (
          <p className="text-xs text-slate-500">
            ~{lesson.estimatedMinutes} min
          </p>
        )}
      </div>
    </div>
  );
}

export function TopicPath({
  topic,
  topicIndex,
  topics,
  presentationByLesson = {},
}: TopicPathProps) {
  const mounted = useHasMounted();
  const [selectedSlug, setSelectedSlug] = useState(
    () => topic.lessons[0]?.slug ?? null,
  );

  const visual = getTopicVisual(topic.id);

  if (topic.lessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-50 py-16 text-center">
        <span className="text-4xl" aria-hidden>
          🚧
        </span>
        <p className="mt-4 text-lg font-medium text-slate-700">Próximamente</p>
        <p className="mt-1 text-sm text-slate-500">
          Estamos preparando las lecciones de este tema.
        </p>
      </div>
    );
  }

  const lessonsWithStatus = topic.lessons.map((lesson) => {
    const unlocked = mounted
      ? isLessonUnlocked(lesson.slug, topicIndex, topics)
      : lesson === topic.lessons[0];

    return {
      lesson,
      status: getLessonStatus(lesson.slug, true, unlocked),
    };
  });

  const activeLesson =
    lessonsWithStatus.find((l) => l.lesson.slug === selectedSlug) ??
    lessonsWithStatus.find((l) => l.status !== "locked") ??
    lessonsWithStatus[0];

  const selectedStatus = activeLesson?.status ?? "locked";
  const canStart = selectedStatus !== "locked";
  const activePresentationSlug = activeLesson
    ? presentationByLesson[activeLesson.lesson.slug]
    : null;

  return (
    <div className="flex flex-col">
      <div className="mb-6 inline-flex self-start rounded-full border-2 border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-700">
        Nivel {topic.number}: {topic.title}
      </div>

      <div className="relative">
        {lessonsWithStatus.map(({ lesson, status }, index) => (
          <PathNode
            key={lesson.slug}
            lesson={lesson}
            status={status}
            isActive={lesson.slug === selectedSlug}
            isLast={index === lessonsWithStatus.length - 1}
            visual={visual}
            onSelect={() => {
              if (status !== "locked") setSelectedSlug(lesson.slug);
            }}
          />
        ))}
      </div>

      {activeLesson && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg sm:p-6"
        >
          <h3 className="text-lg font-bold text-slate-900">
            {activeLesson.lesson.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            {activeLesson.lesson.description}
          </p>

          {canStart ? (
            <div className="mt-4 space-y-3">
              <Link href={`/leccion/${activeLesson.lesson.slug}`} className="block">
                <Button fullWidth className="!rounded-2xl !bg-indigo-600">
                  {selectedStatus === "in_progress"
                    ? "Continuar"
                    : selectedStatus === "completed"
                      ? "Repasar"
                      : "Empezar"}
                </Button>
              </Link>
              {activePresentationSlug && (
                <Link
                  href={`/presentacion/${activePresentationSlug}`}
                  className="block text-center text-sm font-medium text-indigo-700 hover:text-indigo-900"
                >
                  Ver presentación
                </Link>
              )}
            </div>
          ) : (
            <p className="mt-4 text-center text-sm text-slate-500">
              Completa la lección anterior para desbloquear
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
