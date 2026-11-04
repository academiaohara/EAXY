import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TopicExercisesSection } from "@/components/learning/topic-exercises-section";
import type { TopicExerciseSummary } from "@/lib/curriculum/types";
import { formatCourseContext } from "@/lib/navigation/course-levels";
import { getSubject, subjectOfCourse } from "@/lib/navigation/subjects";

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
  const subject = getSubject(subjectOfCourse({ title: courseTitle }));
  const courseContext = formatCourseContext(
    courseTitle,
    subject?.label ?? "Curso",
  );

  return (
    <div
      className="mx-auto w-full max-w-7xl space-y-8 px-6 py-10 lg:px-10 lg:py-14"
      data-testid="practice-topic-view"
    >
      <header className="space-y-5">
        <Breadcrumbs
          items={[
            { label: "Aprender", href: "/aprender" },
            { label: "Practicar", href: "/practicar" },
            { label: moduleTitle },
          ]}
        />
        <div className="relative space-y-2 overflow-hidden rounded-[2rem] bg-ink p-8 text-white shadow-[0_24px_64px_-44px_rgb(25_58_50/0.75)]">
          <span
            className="absolute -right-12 -top-20 size-56 rounded-full bg-coral"
            aria-hidden
          />
          <p className="relative text-sm font-semibold text-sun">
            {courseContext}
          </p>
          <h1 className="relative font-display text-4xl font-extrabold tracking-tight text-white">
            Práctica: {moduleTitle}
          </h1>
          <p className="relative max-w-2xl text-white/70">
            Ejercicios de refuerzo del tema. Ábrelos, intenta resolverlos y
            consulta la solución cuando lo necesites.
          </p>
        </div>
      </header>

      <TopicExercisesSection
        moduleTitle={moduleTitle}
        exercises={exercises}
        layout="full"
      />
    </div>
  );
}
