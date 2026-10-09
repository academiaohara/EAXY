import { describe, expect, it } from "vitest";
import {
  isSafeExternalMediaUrl,
  toYouTubeEmbedUrl,
} from "@/lib/curriculum/topic-exercise-media";

describe("topic exercise media URLs", () => {
  it("accepts only http and https resources", () => {
    expect(
      isSafeExternalMediaUrl("https://images.example.test/solution.png"),
    ).toBe(true);
    expect(
      isSafeExternalMediaUrl("http://images.example.test/solution.png"),
    ).toBe(true);
    expect(isSafeExternalMediaUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeExternalMediaUrl("data:text/html,unsafe")).toBe(false);
    expect(isSafeExternalMediaUrl("not-a-url")).toBe(false);
  });

  it("converts common YouTube URLs to embed URLs", () => {
    expect(toYouTubeEmbedUrl("https://www.youtube.com/watch?v=abc123")).toBe(
      "https://www.youtube.com/embed/abc123",
    );
    expect(toYouTubeEmbedUrl("https://youtu.be/abc123")).toBe(
      "https://www.youtube.com/embed/abc123",
    );
    expect(toYouTubeEmbedUrl("https://www.youtube.com/embed/abc123")).toBe(
      "https://www.youtube.com/embed/abc123",
    );
  });

  it("rejects unsupported video URLs", () => {
    expect(toYouTubeEmbedUrl("https://example.com/video")).toBeNull();
    expect(toYouTubeEmbedUrl("javascript:alert(1)")).toBeNull();
  });
});
