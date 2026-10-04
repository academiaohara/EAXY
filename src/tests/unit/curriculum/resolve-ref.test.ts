import { describe, expect, it } from "vitest";
import { resolveCourseRef, resolveModuleRef } from "@/lib/curriculum/resolve-ref";

describe("resolveCourseRef", () => {
  it("resuelve slug y UUID de curso", () => {
    expect(resolveCourseRef("matematicas-1-eso")).toEqual({
      id: "a1000000-0000-4000-8000-000000000001",
      slug: "matematicas-1-eso",
    });
    expect(resolveCourseRef("a1000000-0000-4000-8000-000000000001")).toEqual({
      id: "a1000000-0000-4000-8000-000000000001",
      slug: "matematicas-1-eso",
    });
  });
});

describe("resolveModuleRef", () => {
  it("resuelve tema por slug dentro del curso", () => {
    expect(
      resolveModuleRef("matematicas-1-eso", "numeros-naturales"),
    ).toMatchObject({
      id: "a2000000-0000-4000-8000-000000000001",
      slug: "numeros-naturales",
      courseSlug: "matematicas-1-eso",
    });
  });

  it("redirige UUID de tema al slug canónico", () => {
    expect(
      resolveModuleRef(
        "a1000000-0000-4000-8000-000000000001",
        "a2000000-0000-4000-8000-000000000001",
      )?.slug,
    ).toBe("numeros-naturales");
  });
});
