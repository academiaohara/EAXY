import { describe, expect, it } from "vitest";
import { seededShuffle } from "@/lib/lesson/seeded-shuffle";

describe("seededShuffle", () => {
  it("devuelve el mismo orden para la misma semilla", () => {
    const items = ["a", "b", "c", "d"];
    expect(seededShuffle(items, "distributiva-equivalencia")).toEqual(
      seededShuffle(items, "distributiva-equivalencia"),
    );
  });

  it("no pierde elementos", () => {
    const items = [1, 2, 3];
    const shuffled = seededShuffle(items, "test");
    expect(shuffled.sort()).toEqual([1, 2, 3]);
  });
});
