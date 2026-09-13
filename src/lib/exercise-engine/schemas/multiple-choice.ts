import { z } from "zod";

export const multipleChoiceContentSchema = z.object({
  question: z.string().min(1),
  options: z
    .array(
      z.object({
        id: z.string().min(1),
        text: z.string().min(1),
      }),
    )
    .min(2),
  correctOptionId: z.string().min(1),
  explanation: z.string().min(1).optional(),
});

export const multipleChoiceAnswerSchema = z.object({
  selectedOptionId: z.string().min(1),
});
