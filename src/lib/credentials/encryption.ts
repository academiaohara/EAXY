import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;
const ENCRYPTION_VERSION = "1";

const LOWERCASE = "abcdefghjkmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHJKMNPQRSTUVWXYZ";
const DIGITS = "23456789";
const PASSWORD_ALPHABET = `${LOWERCASE}${UPPERCASE}${DIGITS}`;
const AMBIGUOUS_CHARS = new Set(["0", "O", "1", "l", "I"]);

function getEncryptionKey(): Buffer {
  const encodedKey = process.env.CREDENTIALS_ENCRYPTION_KEY;

  if (!encodedKey) {
    throw new Error("CREDENTIALS_ENCRYPTION_KEY no está configurada");
  }

  const key = Buffer.from(encodedKey, "base64");

  if (key.length !== 32) {
    throw new Error(
      "CREDENTIALS_ENCRYPTION_KEY debe decodificar a exactamente 32 bytes",
    );
  }

  return key;
}

function pickRandomChar(alphabet: string): string {
  const randomValue = randomBytes(1)[0];
  return alphabet[randomValue % alphabet.length];
}

function shuffleChars(chars: string[]): string[] {
  const result = [...chars];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomBytes(1)[0] % (index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

export function encryptPassword(plaintext: string): string {
  const key = getEncryptionKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });

  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    ENCRYPTION_VERSION,
    iv.toString("base64"),
    ciphertext.toString("base64"),
    authTag.toString("base64"),
  ].join(":");
}

export function decryptPassword(encrypted: string): string {
  const parts = encrypted.split(":");

  if (parts.length !== 4) {
    throw new Error("Formato de contraseña cifrada inválido");
  }

  const [version, ivBase64, ciphertextBase64, authTagBase64] = parts;

  if (version !== ENCRYPTION_VERSION) {
    throw new Error(`Versión de cifrado no soportada: ${version}`);
  }

  const key = getEncryptionKey();
  const iv = Buffer.from(ivBase64, "base64");
  const ciphertext = Buffer.from(ciphertextBase64, "base64");
  const authTag = Buffer.from(authTagBase64, "base64");

  const decipher = createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH,
  });
  decipher.setAuthTag(authTag);

  try {
    return Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]).toString("utf8");
  } catch {
    throw new Error("Integridad comprometida: authTag no válido");
  }
}

export function generateStudentPassword(): string {
  const length = 10 + (randomBytes(1)[0] % 3);
  const chars = [
    pickRandomChar(LOWERCASE),
    pickRandomChar(UPPERCASE),
    pickRandomChar(DIGITS),
  ];

  while (chars.length < length) {
    chars.push(pickRandomChar(PASSWORD_ALPHABET));
  }

  return shuffleChars(chars).join("");
}

export function containsAmbiguousPasswordChars(password: string): boolean {
  return [...password].some((char) => AMBIGUOUS_CHARS.has(char));
}
