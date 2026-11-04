import { describe, expect, it } from "vitest";
import { getActiveAppDestination } from "@/lib/navigation/app-destinations";

describe("getActiveAppDestination", () => {
  it.each([
    ["/", "inicio"],
    ["/aprender", "aprender"],
    ["/aprender/materia/matematicas", "aprender"],
    ["/aprender/curso/matematicas-1-eso/tema/naturales", "aprender"],
    ["/practicar", "practicar"],
    ["/practicar/numeros-naturales", "practicar"],
    ["/perfil", "progreso"],
    ["/progreso", "progreso"],
  ])("resuelve %s como %s", (pathname, destination) => {
    expect(getActiveAppDestination(pathname)).toBe(destination);
  });

  it.each([null, "", "/login", "/registro", "/ruta-desconocida"])(
    "no marca una sección para %s",
    (pathname) => {
      expect(getActiveAppDestination(pathname)).toBeNull();
    },
  );
});
