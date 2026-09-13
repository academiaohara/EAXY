import { describe, expect, it } from "vitest";
import { getYouTubeEmbedUrl } from "@/lib/curriculum/video";

describe("getYouTubeEmbedUrl", () => {
  it("convierte URLs watch y youtu.be", () => {
    expect(getYouTubeEmbedUrl("https://www.youtube.com/watch?v=abc123XYZ")).toBe(
      "https://www.youtube.com/embed/abc123XYZ",
    );
    expect(getYouTubeEmbedUrl("https://youtu.be/abc123XYZ")).toBe(
      "https://www.youtube.com/embed/abc123XYZ",
    );
  });

  it("devuelve null para URLs no soportadas", () => {
    expect(getYouTubeEmbedUrl("https://example.com/video")).toBeNull();
  });
});
