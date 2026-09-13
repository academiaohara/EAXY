import { z } from "zod";

export const numericContentSchema = z.object({
  question: z.string().min(1),
  correctAnswer: z.number(),
  tolerance: z.number().nonnegative().optional(),
  unit: z.string().min(1).optional(),
  explanation: z.string().min(1).optional(),
});

export const numericAnswerSchema = z.object({
  value: z.number(),
});
