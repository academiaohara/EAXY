import { z } from "zod";

export const presentationSlideSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  html: z.string(),
  css: z.string(),
});

export const presentationSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  lessonSlug: z.string().min(1).optional(),
  assetBase: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  slides: z.array(presentationSlideSchema).min(1),
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

export type PresentationSlide = z.infer<typeof presentationSlideSchema>;
export type Presentation = z.infer<typeof presentationSchema>;
export type PresentationIndex = z.infer<typeof presentationIndexSchema>;
