import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { CourseTopicCarousel } from "@/components/learning/course-topic-carousel";
import { CourseTopicQuickAccess } from "@/components/learning/course-topic-quick-access";
import { LearningPath } from "@/components/learning/learning-path";
import type { CourseOutline, ModuleSummary } from "@/lib/curriculum/types";

type CourseTopicViewProps = {
  outline: CourseOutline;
  courseModule: ModuleSummary;
  moduleNumber: number;
};

export function CourseTopicView({ outline, courseModule, moduleNumber }: CourseTopicViewProps) {
  const hasLessons = courseModule.lessons.length > 0;
  const hasExercises = (courseModule.topicExercises?.length ?? 0) > 0;

  return (
    <div className="flex w-full flex-col gap-8" data-testid="course-topic-view">
      <Link
        href="/aprender"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cobalt"
        data-testid="course-topic-back"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
        Volver a niveles
      </Link>

      <CourseTopicCarousel
        courseId={outline.course.id}
        modules={outline.modules}
        activeModuleId={courseModule.id}
        activeModuleNumber={moduleNumber}
        activeTitle={courseModule.title}
        courseTitle={outline.course.title}
      />

      {!hasLessons && !hasExercises ? (
        <p className="text-sm text-muted-foreground">
          Sin lecciones todavía en este tema. Vuelve pronto.
        </p>
      ) : (
        <>
          <CourseTopicQuickAccess courseModule={courseModule} moduleNumber={moduleNumber} />

          <section id="course-lessons" className="scroll-mt-6 space-y-4">
            <header className="space-y-0.5">
              <h2 className="font-heading text-lg font-semibold text-ink">Lecciones del tema</h2>
              <p className="text-sm text-muted-foreground">
                Recorre la ruta completa o entra en cualquier lección.
              </p>
            </header>
            <LearningPath
              modules={[courseModule]}
              moduleNumberOffset={moduleNumber - 1}
              hideModuleHeaders
            />
          </section>
        </>
      )}
    </div>
  );
}
