export type AppDestinationKey = "inicio" | "aprender" | "practicar" | "progreso";

export type AppDestination = {
  key: AppDestinationKey;
  label: string;
  href: string;
};

export const APP_DESTINATIONS: readonly AppDestination[] = [
  { key: "inicio", label: "Inicio", href: "/" },
  { key: "aprender", label: "Aprender", href: "/aprender" },
  { key: "practicar", label: "Practicar", href: "/practicar" },
  { key: "progreso", label: "Mi progreso", href: "/perfil" },
];

export function getActiveAppDestination(
  pathname: string | null | undefined,
): AppDestinationKey | null {
  if (!pathname) {
    return null;
  }
  if (pathname === "/") {
    return "inicio";
  }
  if (pathname === "/aprender" || pathname.startsWith("/aprender/")) {
    return "aprender";
  }
  if (pathname === "/practicar" || pathname.startsWith("/practicar/")) {
    return "practicar";
  }
  if (pathname === "/perfil" || pathname === "/progreso") {
    return "progreso";
  }
  return null;
}
