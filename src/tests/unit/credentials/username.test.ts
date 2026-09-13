import { describe, expect, it } from "vitest";
import {
  generateUsername,
  normalizeDisplayNameToUsernameBase,
  resolveUsernameWithSuffix,
} from "@/lib/credentials/username";

describe("normalizeDisplayNameToUsernameBase", () => {
  it("normaliza acentos, mayúsculas y espacios", () => {
    expect(normalizeDisplayNameToUsernameBase("Laura García")).toBe("laura.garcia");
    expect(normalizeDisplayNameToUsernameBase("  José  María  ")).toBe("jose.maria");
  });
});

describe("resolveUsernameWithSuffix", () => {
  it("devuelve el username base si no hay colisión", async () => {
    const username = await resolveUsernameWithSuffix("laura.garcia", async () => false);

    expect(username).toBe("laura.garcia");
  });

  it("añade sufijos incrementales cuando hay colisiones", async () => {
    const taken = new Set(["laura.garcia", "laura.garcia2", "laura.garcia3"]);
    const username = await resolveUsernameWithSuffix("laura.garcia", async (candidate) =>
      taken.has(candidate),
    );

    expect(username).toBe("laura.garcia4");
  });
});

describe("generateUsername", () => {
  it("resuelve colisiones usando la consulta a BD mockeada", async () => {
    const taken = new Set(["ana.martinez", "ana.martinez2"]);
    const username = await generateUsername("Ana Martínez", "classroom-1", async (_classroomId, candidate) =>
      Promise.resolve(taken.has(candidate)),
    );

    expect(username).toBe("ana.martinez3");
  });

  it("lanza error si el nombre no produce un username válido", async () => {
    await expect(
      generateUsername("***", "classroom-1", async () => false),
    ).rejects.toThrow("El nombre no es válido para generar un username");
  });
});
