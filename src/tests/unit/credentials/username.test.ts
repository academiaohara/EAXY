import { describe, expect, it } from "vitest";
import {
  formatSequentialUsername,
  generateUsername,
  parseSequentialUsername,
} from "@/lib/credentials/username";

describe("formatSequentialUsername", () => {
  it("formatea secuencias con prefijo XY y 6 dígitos", () => {
    expect(formatSequentialUsername(1)).toBe("XY000001");
    expect(formatSequentialUsername(42)).toBe("XY000042");
    expect(formatSequentialUsername(999999)).toBe("XY999999");
  });
});

describe("parseSequentialUsername", () => {
  it("parsea usernames secuenciales válidos", () => {
    expect(parseSequentialUsername("XY000001")).toBe(1);
    expect(parseSequentialUsername("XY000042")).toBe(42);
  });

  it("devuelve null para formatos no secuenciales", () => {
    expect(parseSequentialUsername("laura.garcia")).toBeNull();
    expect(parseSequentialUsername("XY12345")).toBeNull();
  });
});

describe("generateUsername", () => {
  it("genera el primer username secuencial si no hay ninguno", async () => {
    const username = await generateUsername(
      async () => 1,
      async () => false,
    );

    expect(username).toBe("XY000001");
  });

  it("continúa la secuencia global desde el último username existente", async () => {
    const username = await generateUsername(
      async () => 43,
      async () => false,
    );

    expect(username).toBe("XY000043");
  });

  it("avanza la secuencia si el candidato ya está ocupado", async () => {
    const taken = new Set(["XY000001"]);
    const username = await generateUsername(
      async () => 1,
      async (candidate) => Promise.resolve(taken.has(candidate)),
    );

    expect(username).toBe("XY000002");
  });

  it("asigna usernames distintos entre aulas cuando la secuencia global avanza", async () => {
    let sequence = 1;
    const taken = new Set<string>();

    const first = await generateUsername(
      async () => sequence,
      async (candidate) => Promise.resolve(taken.has(candidate)),
    );
    taken.add(first);
    sequence += 1;

    const second = await generateUsername(
      async () => sequence,
      async (candidate) => Promise.resolve(taken.has(candidate)),
    );

    expect(first).toBe("XY000001");
    expect(second).toBe("XY000002");
  });
});
