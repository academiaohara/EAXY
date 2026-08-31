import { z } from "zod";

const slideBaseSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
});

const coverSlideSchema = slideBaseSchema.extend({
  type: z.literal("cover"),
  topic: z.string().min(1),
  heading: z.string().min(1),
  items: z.array(
    z.object({
      label: z.string().min(1),
      highlight: z.boolean().optional(),
    }),
  ),
});

const historySlideSchema = slideBaseSchema.extend({
  type: z.literal("history"),
  header: z.string().min(1),
  quote: z.string().min(1),
  columns: z
    .array(
      z.object({
        title: z.string().min(1),
        image: z.string().min(1).optional(),
        imageAlt: z.string().optional(),
        illustration: z.enum(["roman-numerals"]).optional(),
      }),
    )
    .min(1),
});

const countingSlideSchema = slideBaseSchema.extend({
  type: z.literal("counting"),
  header: z.string().min(1),
  quote: z.string().min(1),
  sectionTitle: z.string().min(1),
  digits: z.string().min(1),
  visualLabel: z.string().min(1),
  ballCount: z.number().int().positive(),
});

const placeValueChartSlideSchema = slideBaseSchema.extend({
  type: z.literal("place-value-chart"),
  header: z.string().min(1),
  quote: z.string().min(1),
  sectionTitle: z.string().min(1),
  digits: z.string().min(1),
  places: z.array(
    z.object({
      label: z.string().min(1),
      short: z.string().min(1),
      value: z.number().int().positive(),
    }),
  ),
});

const positionalExampleSchema = z.object({
  label: z.string().min(1),
  digit: z.number().int(),
  multiplier: z.number().int().positive(),
  result: z.number().int().positive(),
});

const positionalSlideSchema = slideBaseSchema.extend({
  type: z.literal("positional"),
  header: z.string().min(1),
  definition: z.string().min(1),
  sectionTitle: z.string().min(1),
  examples: z.array(positionalExampleSchema).min(1),
});

const decompositionSlideSchema = slideBaseSchema.extend({
  type: z.literal("decomposition"),
  header: z.string().min(1),
  bullets: z.array(z.string().min(1)).min(1),
  sectionTitle: z.string().min(1),
  examples: z.array(positionalExampleSchema).min(1),
});

export const slideSchema = z.discriminatedUnion("type", [
  coverSlideSchema,
  historySlideSchema,
  countingSlideSchema,
  placeValueChartSlideSchema,
  positionalSlideSchema,
  decompositionSlideSchema,
]);

export const presentationSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  lessonSlug: z.string().min(1).optional(),
  width: z.number().int().positive().default(1280),
  height: z.number().int().positive().default(720),
  slides: z.array(slideSchema).min(1),
});

export const presentationIndexEntrySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  lessonSlug: z.string().min(1).optional(),
  slideCount: z.number().int().positive(),
  estimatedMinutes: z.number().int().positive(),
});

export const presentationIndexSchema = z.object({
  presentations: z.array(presentationIndexEntrySchema),
});

export type Slide = z.infer<typeof slideSchema>;
export type Presentation = z.infer<typeof presentationSchema>;
export type PresentationIndex = z.infer<typeof presentationIndexSchema>;
