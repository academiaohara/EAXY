import { z } from "zod";

export const topicSchema = z.object({
  id: z.string(),
  number: z.number().int().positive(),
  title: z.string(),
  description: z.string(),
  sourcePdf: z.string(),
  lessonSlugs: z.array(z.string()),
});

export const courseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  subject: z.literal("math"),
  topics: z.array(topicSchema).min(1),
});

export const curriculumSchema = z.object({
  courses: z.array(courseSchema).min(1),
});

export type Topic = z.infer<typeof topicSchema>;
export type Course = z.infer<typeof courseSchema>;
export type Curriculum = z.infer<typeof curriculumSchema>;

export type TopicWithLessons = Topic & {
  lessons: Array<{
    slug: string;
    title: string;
    description: string;
    estimatedMinutes: number;
  }>;
};

export type CourseWithTopics = Omit<Course, "topics"> & {
  topics: TopicWithLessons[];
  availableLessonCount: number;
  totalTopics: number;
};
