import { z } from "zod";

export const numericContentSchema = z.object({
  question: z.string().min(1),
  correctAnswer: z.number(),
  tolerance: z.number().nonnegative().optional(),
});

export const numericAnswerSchema = z.object({
  value: z.number(),
});
