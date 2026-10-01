export type AppSectionKey = "aprender" | "practicar" | "progreso";

export type AppSection = {
  key: AppSectionKey;
  href: string;
  label: string;
  description: string;
};

export const APP_SECTIONS: readonly AppSection[] = [
  {
    key: "aprender",
    href: "/aprender",
    label: "Aprender",
    description: "Cursos, temas y lecciones",
  },
  {
    key: "practicar",
    href: "/practicar",
    label: "Practicar",
    description: "Ejercicios adaptados a tu nivel",
  },
  {
    key: "progreso",
    href: "/progreso",
    label: "Progreso",
    description: "Tu dominio por concepto",
  },
];

function matchesPath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveSection(pathname: string | null | undefined): AppSectionKey | null {
  if (!pathname) {
    return null;
  }
  const section = APP_SECTIONS.find((entry) => matchesPath(pathname, entry.href));
  return section?.key ?? null;
}
