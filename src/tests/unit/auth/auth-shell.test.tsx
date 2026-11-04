import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AuthShell } from "@/components/auth/auth-shell";

describe("AuthShell", () => {
  it("presenta una sola cabecera y una región accesible para el formulario", () => {
    render(
      <AuthShell title="Iniciar sesión" description="Guarda tu progreso.">
        <button type="button">Entrar</button>
      </AuthShell>,
    );

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText("Guarda tu progreso.")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Eaxy, ir al inicio" }),
    ).toHaveAttribute("href", "/");
    expect(
      screen.getByRole("region", { name: "Iniciar sesión" }),
    ).toContainElement(screen.getByRole("button", { name: "Entrar" }));
  });
});
