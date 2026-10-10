import { describe, expect, it } from "vitest";
import {
  TUTOR_HOVER_REACTION_MOODS,
  pickTutorHoverMood,
} from "@/lib/tutor/hover-reaction";

describe("pickTutorHoverMood", () => {
  it("elige siempre un estado de la lista de reacciones al hover", () => {
    for (let index = 0; index < TUTOR_HOVER_REACTION_MOODS.length; index += 1) {
      const fraction = (index + 0.1) / TUTOR_HOVER_REACTION_MOODS.length;
      expect(pickTutorHoverMood(() => fraction)).toBe(
        TUTOR_HOVER_REACTION_MOODS[index],
      );
    }
  });
});
