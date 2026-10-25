import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool, calc, nums } from "@/data/lessons/tec1-helpers";

export const impactoSocialEticaTecnologicaLesson: InteractiveLesson = {
  slug: "impacto-social-etica-tecnologica",
  title: "9. Impacto social, ética y responsabilidad tecnológica",
  subtitle: TEC1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("brecha", "Acceso a la tecnología", [
      { kind: "definition", text: "La **brecha digital** es la desigualdad entre quienes tienen acceso y habilidades para usar la tecnología y quienes no, por razones económicas, geográficas, de edad o de formación." },
      { kind: "steps", items: [
        "**Acceso**: conexión, dispositivos, electricidad.",
        "**Uso**: formación y habilidades.",
        "**Beneficio**: que la tecnología mejore realmente la vida de quien la usa.",
      ] },
    ], undefined, "stack"),
    slide("seguridad", "Seguridad, privacidad y uso responsable", [
      { kind: "steps", items: [
        "**Privacidad**: los sistemas con cámaras, sensores y datos personales deben recoger lo mínimo, informar y proteger.",
        "**Seguridad**: un producto conectado vulnerable puede ser atacado (ciberseguridad).",
        "**Sesgos**: un algoritmo entrenado con datos parciales puede discriminar.",
        "**Transparencia y responsabilidad**: quién responde cuando un sistema automático falla.",
      ] },
      { kind: "warning", title: "Que se pueda hacer no significa que se deba hacer", text: "Un ingeniero responde de las consecuencias previsibles de lo que diseña, incluidos usos indebidos razonablemente previsibles." },
    ]),
    slide("grupos", "Escenario con grupos afectados", [
      { kind: "text", text: "Un almacén se automatiza. Elige combinaciones de medidas y observa quién gana y quién pierde. ¿Qué medidas compensarías para que ningún grupo salga demasiado perjudicado? Justifica tus prioridades." },
    ], tool("grupos-afectados-explorador"), "visual-top"),
    slide("empleo", "Empleo y comunidad", [
      { kind: "compare",
        left: { title: "Efectos positivos", text: "Nuevos empleos cualificados, menos tareas peligrosas o repetitivas, servicios nuevos, mayor productividad.", tone: "ok" },
        right: { title: "Efectos negativos", text: "Desaparición de puestos, desajuste de cualificaciones, concentración de poder en pocas empresas, desigualdad territorial.", tone: "warn" } },
      { kind: "text", text: "La **transición justa** busca que quienes pierden con un cambio tecnológico reciban formación, reubicación o apoyo, y no carguen solos con el coste." },
    ]),
    calc("calc-grupos", "Sumar efectos", "Al automatizar y reubicar a la plantilla, los efectos sobre los trabajadores son $-2$ y $+3$. ¿Cuál es el efecto neto sobre ese grupo?",
      nums(1), "$-2 + 3 = +1$: la reubicación compensa el efecto negativo de la automatización.", "Suma los efectos."),
    sort("clasifica-etica", "¿Qué principio se vulnera?", "Asocia cada situación con el principio ético afectado.",
      [["pri", "Privacidad", "cobalt"], ["seg", "Seguridad", "amber"], ["equ", "Equidad / sesgo", "emerald"], ["res", "Responsabilidad", "violet"]],
      [["Una cámara graba a empleados sin avisarles", "pri"], ["Una app vende los datos de ubicación sin permiso", "pri"], ["Una cámara conectada con contraseña de fábrica", "seg"], ["Un robot sin parada de emergencia", "seg"], ["Un algoritmo que puntúa peor a un colectivo", "equ"], ["Nadie responde cuando un sistema automático falla", "res"]],
      "Cada caso toca un principio: privacidad, seguridad, equidad o responsabilidad.",
    ),
    pick("check-compensar", "Una decisión con perdedores", "Una medida beneficia a la empresa y al medio ambiente pero perjudica a los empleados. ¿Qué es lo más razonable?",
      "Buscar medidas de compensación (formación, reubicación) y comunicarlo con transparencia",
      [["Aplicarla igualmente: lo importante es el beneficio total", "Ignorar a los perjudicados es injusto y suele generar conflictos."], ["Cancelar siempre cualquier cambio tecnológico", "Rechazar toda mejora tampoco es una solución razonable."], ["Ocultar el efecto a los empleados", "La falta de transparencia daña la confianza y es poco ética."]],
      "Una decisión responsable reconoce los efectos negativos y los compensa en lo posible.",
    ),
  ],
};
