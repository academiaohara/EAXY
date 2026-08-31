"use client";

import type { CourseWithTopics } from "@/lib/curriculum-schema";
import { getCourseVisual } from "@/lib/topic-icons";
import {
  isTopicUnlocked,
  getLessonStatus,
  countCompletedLessons,
  getTopicLessonSlugs,
} from "@/lib/course-progress";
import { useHasMounted } from "@/lib/use-has-mounted";
import { ModuleCard } from "./ModuleCard";

interface PathSectionProps {
  course: CourseWithTopics;
}

export function PathSection({ course }: PathSectionProps) {
  const mounted = useHasMounted();
  const courseVisual = getCourseVisual(course.id);

  const allSlugs = getTopicLessonSlugs(course.topics);
  const completedCount = mounted ? countCompletedLessons(allSlugs) : 0;
  const totalLessons = allSlugs.length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <section className="mb-10 sm:mb-14">
      <div className="mb-5 flex items-start gap-4 sm:mb-6">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold sm:h-16 sm:w-16 sm:text-3xl"
          style={{
            backgroundColor: courseVisual.bgColor,
            color: courseVisual.color,
          }}
          aria-hidden
        >
          {courseVisual.icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Matemáticas · ESO
          </p>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            {course.title}
          </h2>
          <p className="mt-1 text-sm text-slate-600 sm:text-base">
            {course.description}
          </p>
          {totalLessons > 0 && mounted && (
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 max-w-xs overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-slate-500">
                {completedCount}/{totalLessons} lecciones
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="relative rounded-3xl bg-slate-100/80 p-4 sm:p-6">
        <div
          className="pointer-events-none absolute left-8 right-8 top-[calc(50%-0.5rem)] hidden h-0.5 bg-slate-300 sm:block"
          aria-hidden
        />

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin sm:gap-6">
          {course.topics.map((topic, index) => {
            const hasLessons = topic.lessons.length > 0;
            const unlocked = mounted
              ? isTopicUnlocked(index, course.topics)
              : index === 0;

            let status = getLessonStatus(
              topic.lessonSlugs[0] ?? "",
              hasLessons,
              unlocked,
            );

            if (!hasLessons) status = "locked";

            const isNew =
              hasLessons &&
              topic.lessonSlugs[0] === "fracciones-intro" &&
              status === "available";

            return (
              <ModuleCard
                key={topic.id}
                topicId={topic.id}
                title={topic.title.replace(/^Las? /, "")}
                courseId={course.id}
                status={status}
                isNew={isNew}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
