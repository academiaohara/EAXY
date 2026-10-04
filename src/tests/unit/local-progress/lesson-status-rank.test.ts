import { describe, expect, it } from "vitest";
import {
  pickStrongerLessonStatus,
  shouldReplaceLocalLessonStatus,
} from "@/lib/local-progress/lesson-status-rank";

describe("lesson-status-rank", () => {
  it("prioriza incomplete sobre started", () => {
    expect(pickStrongerLessonStatus("started", "incomplete")).toBe("incomplete");
  });

  it("no degrada completed", () => {
    expect(shouldReplaceLocalLessonStatus("completed", "started")).toBe(false);
    expect(shouldReplaceLocalLessonStatus("completed", "incomplete")).toBe(false);
  });

  it("permite subir a completed", () => {
    expect(shouldReplaceLocalLessonStatus("incomplete", "completed")).toBe(true);
  });
});
