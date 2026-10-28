export type SubjectKey = "matematicas" | "fisica" | "tecnologia" | "dibujo";

export type Subject = {
  key: SubjectKey;
  label: string;
  /** Prefijo del título del curso («Matemáticas 1º ESO»). */
  titlePrefix: string;
  href: string;
  tagline: string;
  description: string;
  /** Glifo decorativo para tarjetas y cabeceras. */
  glyph: string;
};

export const SUBJECTS: readonly Subject[] = [
  {
    key: "matematicas",
    label: "Matemáticas",
    titlePrefix: "Matemáticas",
    href: "/aprender/materia/matematicas",
    tagline: "Números, álgebra y funciones",
    description: "De los números naturales a los sistemas de ecuaciones, paso a paso.",
    glyph: "∑",
  },
  {
    key: "fisica",
    label: "Física y Química",
    titlePrefix: "Física y Química",
    href: "/aprender/materia/fisica",
    tagline: "Materia, movimiento y energía",
    description: "Entiende cómo funciona el mundo, de los átomos a las fuerzas, con simulaciones y problemas guiados.",
    glyph: "⚛",
  },
  {
    key: "tecnologia",
    label: "Tecnología",
    titlePrefix: "Tecnología",
    href: "/aprender/materia/tecnologia",
    tagline: "Diseño, circuitos y programación",
    description: "Proyectos, electrónica y pensamiento computacional desde cero.",
    glyph: "</>",
  },
  {
    key: "dibujo",
    label: "Dibujo Técnico",
    titlePrefix: "Dibujo Técnico",
    href: "/aprender/materia/dibujo",
    tagline: "Geometría, vistas y planos",
    description: "Trazados, sistemas de representación y normalización con construcciones paso a paso.",
    glyph: "∠",
  },
];

export function getSubject(key: string | null | undefined): Subject | undefined {
  return SUBJECTS.find((subject) => subject.key === key);
}

/** La materia se deduce del slug o del título del curso; por defecto, matemáticas. */
export function subjectOfCourse(course: { slug?: string; title?: string }): SubjectKey {
  const slug = course.slug?.toLowerCase() ?? "";
  const title = course.title?.toLowerCase() ?? "";
  if (slug.startsWith("fisica") || slug.startsWith("quimica") || title.startsWith("física") || title.startsWith("química")) {
    return "fisica";
  }
  if (slug.startsWith("tecnologia") || title.startsWith("tecnología")) {
    return "tecnologia";
  }
  if (slug.startsWith("dibujo") || title.startsWith("dibujo")) {
    return "dibujo";
  }
  return "matematicas";
}

export function getActiveSubject(pathname: string | null | undefined): SubjectKey | null {
  if (!pathname) {
    return null;
  }
  const materia = /^\/aprender\/materia\/([^/]+)/.exec(pathname);
  if (materia) {
    return getSubject(materia[1])?.key ?? null;
  }
  const curso = /^\/aprender\/curso\/([^/]+)/.exec(pathname);
  if (curso) {
    return subjectOfCourse({ slug: curso[1] });
  }
  return null;
}

export type CourseStage = "ESO" | "Bachillerato";

export function stageOfCourse(title: string): CourseStage {
  return /bachillerato/i.test(title) ? "Bachillerato" : "ESO";
}

/** Clases de Tailwind por materia (literales completos para que el compilador los detecte). */
export const SUBJECT_THEME: Record<
  SubjectKey,
  {
    gradient: string;
    badge: string;
    text: string;
    ring: string;
    glow: string;
    hoverBorder: string;
  }
> = {
  matematicas: {
    gradient: "from-cobalt via-indigo-600 to-violet-600",
    badge: "bg-cobalt-tint text-cobalt",
    text: "text-cobalt",
    ring: "ring-cobalt/20",
    glow: "bg-[radial-gradient(40rem_18rem_at_0%_0%,rgb(67_83_255/0.10),transparent_70%)]",
    hoverBorder: "hover:border-cobalt/40",
  },
  fisica: {
    gradient: "from-teal-500 via-emerald-600 to-cyan-700",
    badge: "bg-emerald-50 text-emerald-700",
    text: "text-emerald-700",
    ring: "ring-emerald-500/20",
    glow: "bg-[radial-gradient(40rem_18rem_at_0%_0%,rgb(16_185_129/0.10),transparent_70%)]",
    hoverBorder: "hover:border-emerald-500/40",
  },
  tecnologia: {
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    badge: "bg-amber-50 text-amber-700",
    text: "text-amber-700",
    ring: "ring-amber-500/20",
    glow: "bg-[radial-gradient(40rem_18rem_at_0%_0%,rgb(245_158_11/0.12),transparent_70%)]",
    hoverBorder: "hover:border-amber-500/40",
  },
  dibujo: {
    gradient: "from-sky-500 via-blue-600 to-indigo-700",
    badge: "bg-sky-50 text-sky-700",
    text: "text-sky-700",
    ring: "ring-sky-500/20",
    glow: "bg-[radial-gradient(40rem_18rem_at_0%_0%,rgb(14_165_233/0.10),transparent_70%)]",
    hoverBorder: "hover:border-sky-500/40",
  },
};
