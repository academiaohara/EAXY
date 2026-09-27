import { describe, expect, it } from "vitest";
import {
  appendSpokenEntry,
  appendTutorEntry,
  countTutorEntries,
  feedbackMessageKey,
  speechMessageKey,
  stepMessageKey,
  type TutorLogEntry,
} from "@/lib/lesson/tutor-log";

function tutorEntry(key: string, text = "Hola"): TutorLogEntry {
  return { key, author: "tutor", text };
}

describe("appendTutorEntry", () => {
  it("añade el mensaje al final del historial", () => {
    const log = appendTutorEntry([tutorEntry("a")], tutorEntry("b"));
    expect(log.map((entry) => entry.key)).toEqual(["a", "b"]);
  });

  it("ignora el mensaje que repite la clave del anterior", () => {
    const first = [tutorEntry("a")];
    expect(appendTutorEntry(first, tutorEntry("a"))).toBe(first);
  });

  it("permite repetir una clave anterior si no es la última", () => {
    const log = appendTutorEntry([tutorEntry("a"), tutorEntry("b")], tutorEntry("a"));
    expect(log.map((entry) => entry.key)).toEqual(["a", "b", "a"]);
  });
});

describe("claves de mensaje", () => {
  it("distingue el mensaje del paso del de su feedback", () => {
    expect(stepMessageKey("s1")).not.toBe(feedbackMessageKey("s1", "correct"));
  });

  it("distingue acierto de fallo en el mismo paso", () => {
    expect(feedbackMessageKey("s1", "correct")).not.toBe(feedbackMessageKey("s1", "incorrect"));
  });
});

describe("countTutorEntries", () => {
  it("cuenta sólo los mensajes del tutor", () => {
    const entries: TutorLogEntry[] = [
      tutorEntry("a"),
      { key: "b", author: "student", text: "No lo entiendo" },
      tutorEntry("c"),
    ];
    expect(countTutorEntries(entries)).toBe(2);
  });

  it("no cuenta nada cuando el alumno es el único que habla", () => {
    expect(countTutorEntries([{ key: "a", author: "student", text: "Ya lo tengo" }])).toBe(0);
  });
});

describe("appendSpokenEntry", () => {
  it("guarda cada frase que dice el tutor", () => {
    const log = appendSpokenEntry([tutorEntry("a")], tutorEntry("b"));
    expect(log.map((entry) => entry.key)).toEqual(["a", "b"]);
  });

  it("no repite una frase ya dicha aunque no sea la última", () => {
    const log = [tutorEntry("a"), tutorEntry("b")];
    expect(appendSpokenEntry(log, tutorEntry("a"))).toBe(log);
  });
});

describe("speechMessageKey", () => {
  it("distingue cada frase, el paso y el feedback", () => {
    const keys = new Set([
      speechMessageKey("s1", null, 0),
      speechMessageKey("s1", null, 1),
      speechMessageKey("s2", null, 0),
      speechMessageKey("s1", "correct", 0),
      speechMessageKey("s1", "incorrect", 0),
    ]);
    expect(keys.size).toBe(5);
  });
});
