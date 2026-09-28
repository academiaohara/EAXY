import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { CourseNextStep } from "@/components/learning/course-next-step";
import { LearningPath } from "@/components/learning/learning-path";
import { findNextLesson } from "@/lib/curriculum/course-progress";
import type { CourseOutline, ModuleSummary } from "@/lib/curriculum/types";

type CourseTopicViewProps = {
  outline: CourseOutline;
  courseModule: ModuleSummary;
  moduleNumber: number;
};

export function CourseTopicView({ outline, courseModule, moduleNumber }: CourseTopicViewProps) {
  const nextRaw = findNextLesson([courseModule]);
  const next = nextRaw ? { ...nextRaw, moduleNumber } : null;
  const hasLessons = courseModule.lessons.length > 0;
  const hasExercises = (courseModule.topicExercises?.length ?? 0) > 0;

  return (
    <div className="flex w-full flex-col gap-6" data-testid="course-topic-view">
      <Link
        href={`/aprender/curso/${outline.course.id}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-cobalt"
        data-testid="course-topic-back"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
        Elegir otro tema
      </Link>

      <header className="space-y-1 border-b border-slate-200 pb-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-cobalt">
          Tema {moduleNumber}
        </p>
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {courseModule.title}
        </h1>
        <p className="text-sm text-muted-foreground">{outline.course.title}</p>
      </header>

      {!hasLessons && !hasExercises ? (
        <p className="text-sm text-muted-foreground">
          Sin lecciones todavía en este tema. Vuelve pronto.
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
          {next ? (
            <aside className="min-w-0 lg:sticky lg:top-6 lg:col-start-2 lg:row-start-1 lg:self-start">
              <CourseNextStep next={next} />
            </aside>
          ) : null}

          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <LearningPath
              modules={[courseModule]}
              moduleNumberOffset={moduleNumber - 1}
              hideModuleHeaders
            />
          </div>
        </div>
      )}
    </div>
  );
}
