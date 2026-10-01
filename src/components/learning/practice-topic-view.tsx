import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TopicExercisesSection } from "@/components/learning/topic-exercises-section";
import type { TopicExerciseSummary } from "@/lib/curriculum/types";

type PracticeTopicViewProps = {
  courseTitle: string;
  moduleTitle: string;
  exercises: TopicExerciseSummary[];
};

export function PracticeTopicView({
  courseTitle,
  moduleTitle,
  exercises,
}: PracticeTopicViewProps) {
  return (
    <div
      className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-6 sm:py-10"
      data-testid="practice-topic-view"
    >
      <header className="space-y-3">
        <Breadcrumbs
          items={[
            { label: "Aprender", href: "/aprender" },
            { label: "Practicar", href: "/practicar" },
            { label: moduleTitle },
          ]}
        />
        <div className="space-y-1">
          <p className="text-sm font-medium text-ink-muted">{courseTitle}</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Práctica: {moduleTitle}
          </h1>
          <p className="max-w-2xl text-ink-muted">
            Ejercicios de refuerzo del tema. Ábrelos, intenta resolverlos y consulta la solución
            cuando lo necesites.
          </p>
        </div>
      </header>

      <TopicExercisesSection moduleTitle={moduleTitle} exercises={exercises} layout="full" />
    </div>
  );
}
