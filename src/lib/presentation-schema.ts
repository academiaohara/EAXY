import { z } from "zod";

export const presentationSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  lessonSlug: z.string().min(1).optional(),
  embedUrl: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  slideCount: z.number().int().positive(),
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

export type Presentation = z.infer<typeof presentationSchema>;
export type PresentationIndex = z.infer<typeof presentationIndexSchema>;
