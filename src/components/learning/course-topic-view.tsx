import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CourseTopicCarousel } from "@/components/learning/course-topic-carousel";
import { CourseTopicQuickAccess } from "@/components/learning/course-topic-quick-access";
import { LearningPathWithLocalProgress } from "@/components/learning/learning-path-with-local-progress";
import { TopicExercisesSection } from "@/components/learning/topic-exercises-section";
import { buildLearningTrail } from "@/lib/navigation/learning-trail";
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
      <Breadcrumbs
        items={buildLearningTrail({
          course: outline.course,
          topic: { id: courseModule.id, title: courseModule.title, number: moduleNumber },
        })}
      />

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

          {hasLessons ? (
            <section id="course-lessons" className="scroll-mt-6 space-y-4">
              <header className="space-y-0.5">
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  Lecciones del tema
                </h2>
                <p className="text-sm text-muted-foreground">
                  Recorre la ruta completa o entra en cualquier lección.
                </p>
              </header>
              <LearningPathWithLocalProgress
                modules={[courseModule]}
                moduleNumberOffset={moduleNumber - 1}
                hideModuleHeaders
              />
            </section>
          ) : null}

          {hasExercises ? (
            <TopicExercisesSection
              moduleTitle={courseModule.title}
              exercises={courseModule.topicExercises ?? []}
              layout="full"
            />
          ) : null}
        </>
      )}
    </div>
  );
}
