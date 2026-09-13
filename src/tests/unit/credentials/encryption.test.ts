import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  containsAmbiguousPasswordChars,
  decryptPassword,
  encryptPassword,
  generateStudentPassword,
} from "@/lib/credentials/encryption";

const VALID_KEY = Buffer.alloc(32, 7).toString("base64");

describe("encryptPassword / decryptPassword", () => {
  beforeEach(() => {
    process.env.CREDENTIALS_ENCRYPTION_KEY = VALID_KEY;
  });

  afterEach(() => {
    delete process.env.CREDENTIALS_ENCRYPTION_KEY;
  });

  it("cifra y descifra de forma reversible", () => {
    const plaintext = "Kj8#mN2pQr";

    const encrypted = encryptPassword(plaintext);
    const decrypted = decryptPassword(encrypted);

    expect(decrypted).toBe(plaintext);
    expect(encrypted).toMatch(/^1:[A-Za-z0-9+/=]+:[A-Za-z0-9+/=]+:[A-Za-z0-9+/=]+$/);
  });

  it("falla si el authTag fue manipulado", () => {
    const encrypted = encryptPassword("secreto");
    const parts = encrypted.split(":");
    const tampered = `${parts[0]}:${parts[1]}:${parts[2]}:AAAAAAAAAAAAAAAAAAAAAA==`;

    expect(() => decryptPassword(tampered)).toThrow(
      "Integridad comprometida: authTag no válido",
    );
  });

  it("falla si el formato no es el esperado", () => {
    expect(() => decryptPassword("formato-invalido")).toThrow(
      "Formato de contraseña cifrada inválido",
    );
  });

  it("valida que la clave tenga 32 bytes", () => {
    process.env.CREDENTIALS_ENCRYPTION_KEY = Buffer.alloc(16, 1).toString("base64");

    expect(() => encryptPassword("test")).toThrow(
      "CREDENTIALS_ENCRYPTION_KEY debe decodificar a exactamente 32 bytes",
    );
  });
});

describe("generateStudentPassword", () => {
  it("genera contraseñas de 10 a 12 caracteres sin caracteres ambiguos", () => {
    for (let index = 0; index < 50; index += 1) {
      const password = generateStudentPassword();

      expect(password.length).toBeGreaterThanOrEqual(10);
      expect(password.length).toBeLessThanOrEqual(12);
      expect(containsAmbiguousPasswordChars(password)).toBe(false);
      expect(/[a-z]/.test(password)).toBe(true);
      expect(/[A-Z]/.test(password)).toBe(true);
      expect(/[2-9]/.test(password)).toBe(true);
    }
  });
});
