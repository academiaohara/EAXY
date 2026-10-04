import { beforeEach, describe, expect, it } from "vitest";
import { LOCAL_PROGRESS_STORAGE_KEY } from "@/lib/local-progress/types";
import { readLocalProgress, setLocalLessonStatus } from "@/lib/local-progress/storage";

describe("setLocalLessonStatus", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("no degrada completed a started", () => {
    setLocalLessonStatus("lesson-a", "completed");
    setLocalLessonStatus("lesson-a", "started");
    expect(readLocalProgress().lessons["lesson-a"]).toBe("completed");
  });

  it("persiste en localStorage", () => {
    setLocalLessonStatus("lesson-b", "started");
    const raw = window.localStorage.getItem(LOCAL_PROGRESS_STORAGE_KEY);
    expect(raw).toContain("lesson-b");
  });
});
