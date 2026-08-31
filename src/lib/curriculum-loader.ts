import { readFileSync } from "fs";
import { join } from "path";
import {
  curriculumSchema,
  type Course,
  type CourseWithTopics,
  type Curriculum,
  type TopicWithLessons,
} from "./curriculum-schema";
import { loadLessonIndex } from "./lesson-loader";

const CURRICULUM_PATH = join(process.cwd(), "content", "math", "curriculum.json");

export function loadCurriculum(): Curriculum {
  const raw = readFileSync(CURRICULUM_PATH, "utf-8");
  return curriculumSchema.parse(JSON.parse(raw));
}

export function loadCourse(courseId: string): Course | null {
  const curriculum = loadCurriculum();
  return curriculum.courses.find((c) => c.id === courseId) ?? null;
}

export function getAllCourseIds(): string[] {
  return loadCurriculum().courses.map((c) => c.id);
}

export function enrichCourse(course: Course): CourseWithTopics {
  const index = loadLessonIndex();
  const lessonMap = new Map(index.lessons.map((l) => [l.slug, l]));

  const topics: TopicWithLessons[] = course.topics.map((topic) => ({
    ...topic,
    lessons: topic.lessonSlugs
      .map((slug) => lessonMap.get(slug))
      .filter((lesson): lesson is NonNullable<typeof lesson> => lesson != null),
  }));

  const availableLessonCount = topics.reduce(
    (sum, topic) => sum + topic.lessons.length,
    0,
  );

  return {
    ...course,
    topics,
    availableLessonCount,
    totalTopics: course.topics.length,
  };
}
