import { describe, expect, it } from "vitest";
import { sistemasHistoriaChallengeStatus } from "@/components/lesson/tools/naturales-numeracion/scenes/sistemas-historia-shared";

describe("sistemasHistoriaChallengeStatus", () => {
  it("distingue acierto, pasarse del objetivo y progreso", () => {
    expect(sistemasHistoriaChallengeStatus(9, 9)).toBe("success");
    expect(sistemasHistoriaChallengeStatus(10, 9)).toBe("over");
    expect(sistemasHistoriaChallengeStatus(4, 9)).toBe("idle");
  });
});
