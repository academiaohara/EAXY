import type { TopicWithLessons } from "@/lib/curriculum-schema";
import { getTopicVisual } from "@/lib/topic-icons";

interface CourseInfoCardProps {
  topic: TopicWithLessons;
  courseTitle: string;
}

export function CourseInfoCard({ topic, courseTitle }: CourseInfoCardProps) {
  const visual = getTopicVisual(topic.id);
  const lessonCount = topic.lessons.length;
  const totalMinutes = topic.lessons.reduce(
    (sum, l) => sum + l.estimatedMinutes,
    0,
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div
        className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl text-4xl"
        style={{ backgroundColor: visual.bgColor, color: visual.color }}
        aria-hidden
      >
        {visual.icon}
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {courseTitle}
      </p>
      <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
        {topic.title}
      </h1>
      <p className="mt-3 text-slate-600">{topic.description}</p>

      {lessonCount > 0 && (
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <span aria-hidden>🎓</span>
            <span>
              {lessonCount} lección{lessonCount === 1 ? "" : "es"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span aria-hidden>⏱️</span>
            <span>~{totalMinutes} min</span>
          </div>
        </div>
      )}
    </div>
  );
}
