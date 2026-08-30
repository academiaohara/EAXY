import { z } from "zod";

export const tapSelectOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  image: z.string().optional(),
});

export const tapSelectWidgetSchema = z.object({
  type: z.literal("tap_select"),
  options: z.array(tapSelectOptionSchema).min(2),
  correctOptionId: z.string(),
  hints: z.array(z.string()).default([]),
});

export const sliderVisualSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("rect_division"),
    totalParts: z.number().int().positive(),
  }),
  z.object({
    type: z.literal("number_line"),
    range: z.tuple([z.number(), z.number()]),
  }),
]);

export const sliderExploreWidgetSchema = z.object({
  type: z.literal("slider_explore"),
  min: z.number(),
  max: z.number(),
  step: z.number().positive(),
  initial: z.number(),
  label: z.string(),
  unit: z.string().optional(),
  visual: sliderVisualSchema,
  checkValue: z.number().optional(),
  tolerance: z.number().nonnegative().default(0),
  hints: z.array(z.string()).default([]),
});

export const fractionBarWidgetSchema = z.object({
  type: z.literal("fraction_bar"),
  totalParts: z.number().int().positive(),
  targetNumerator: z.number().int().nonnegative(),
  targetDenominator: z.number().int().positive(),
  hints: z.array(z.string()).default([]),
});

export const widgetSchema = z.discriminatedUnion("type", [
  tapSelectWidgetSchema,
  sliderExploreWidgetSchema,
  fractionBarWidgetSchema,
]);

export const stepSchema = z.object({
  id: z.string(),
  type: z.enum(["intro", "interaction", "explanation"]),
  title: z.string().optional(),
  content: z.string(),
  widget: widgetSchema.optional(),
  requiresCheck: z.boolean().default(false),
});

export const lessonSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  subject: z.literal("math"),
  topic: z.string(),
  estimatedMinutes: z.number().positive(),
  steps: z.array(stepSchema).min(1),
});

export const lessonIndexSchema = z.object({
  lessons: z.array(
    z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      topic: z.string(),
      estimatedMinutes: z.number().positive(),
    }),
  ),
});

export type TapSelectOption = z.infer<typeof tapSelectOptionSchema>;
export type TapSelectWidget = z.infer<typeof tapSelectWidgetSchema>;
export type SliderExploreWidget = z.infer<typeof sliderExploreWidgetSchema>;
export type FractionBarWidget = z.infer<typeof fractionBarWidgetSchema>;
export type Widget = z.infer<typeof widgetSchema>;
export type Step = z.infer<typeof stepSchema>;
export type Lesson = z.infer<typeof lessonSchema>;
export type LessonIndex = z.infer<typeof lessonIndexSchema>;

export interface CheckResult {
  correct: boolean;
  explanation: string;
  hints: string[];
  userAnswer: unknown;
  correctAnswer: unknown;
}

export type WidgetAnswer =
  | { type: "tap_select"; selectedId: string | null }
  | { type: "slider_explore"; value: number }
  | { type: "fraction_bar"; shadedParts: number };
