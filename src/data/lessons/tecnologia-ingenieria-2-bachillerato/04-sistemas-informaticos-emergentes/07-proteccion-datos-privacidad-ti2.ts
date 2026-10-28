import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const proteccionDatosPrivacidadTi2Lesson: InteractiveLesson = {
  slug: "proteccion-datos-privacidad-ti2",
  title: "7. Protección de datos y privacidad",
  subtitle: TECTI2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Los datos personales", [
      { kind: "steps", items: [
        "Un **dato personal** es cualquier información que permite identificar a una persona, directa o indirectamente: nombre, DNI, imagen, voz, ubicación, hábitos.",
        "El **RGPD** (Reglamento General de Protección de Datos, UE) y la ley española regulan su tratamiento.",
        "Principios: **licitud**, **finalidad** concreta, **minimización**, **exactitud**, **limitación del plazo**, **seguridad** y **responsabilidad**.",
        "Derechos: **acceso, rectificación, supresión («derecho al olvido»), oposición, limitación y portabilidad**.",
        "Tratar datos exige una **base legítima**, como el **consentimiento** libre e informado.",
      ] },
    ], undefined, "stack"),
    slide("ano", "¿Es anónimo un conjunto de datos?", [
      { kind: "text", text: "Quitar el nombre no basta. Combina datos corrientes y mira cuántas personas comparten esa combinación." },
    ], tool("ti2-privacidad-explorador"), "visual-top"),
    slide("tec", "Técnicas de protección", [
      { kind: "steps", items: [
        "**Seudonimización**: sustituir los identificadores por códigos; los datos siguen siendo personales.",
        "**Anonimización**: imposibilitar la identificación, de forma irreversible (k-anonimidad, agregación, ruido).",
        "**Cifrado** de los datos almacenados y en tránsito.",
        "**Control de acceso** y registro de quién consulta qué.",
        "**Privacidad desde el diseño**: se piensa en la protección desde el inicio del proyecto.",
      ] },
    ]),
    slide("huella", "Tu huella digital", [
      { kind: "text", text: "Todo lo que haces en línea deja rastro. Estima el efecto de tus hábitos." },
    ], tool("eso2-huella-digital-explorador"), "visual-top"),
    calc("calc-comb", "Combinaciones", "Un código postal (500 zonas) y un año de nacimiento (90 valores) dan 500·90 combinaciones. ¿Cuántas son?", nums(45000), "500 · 90 = 45 000.", "Producto de las categorías."),
    calc("calc-pers", "Personas por combinación", "En una población de un millón, ¿cuántas personas comparten de media cada una de esas 45 000 combinaciones? (redondea a un entero)", nums(22, 22.2), "1 000 000 / 45 000 ≈ 22.", "Población entre combinaciones."),
    calc("calc-sexo", "Añadir el sexo", "Si se añade el sexo (2 valores), ¿cuántas personas comparten de media cada combinación? (redondea a un entero)", nums(11, 11.1), "1 000 000 / 90 000 ≈ 11.", "Ahora hay 90 000 combinaciones."),
    sort("clasifica-rgpd", "¿Principio o derecho?", "Clasifica cada elemento del RGPD.",
      [["pri", "Principio del tratamiento", "cobalt"], ["der", "Derecho de la persona", "emerald"]],
      [["Minimización de datos", "pri"], ["Limitación de la finalidad", "pri"], ["Seguridad de los datos", "pri"], ["Derecho de acceso", "der"], ["Derecho al olvido", "der"], ["Portabilidad", "der"]],
      "Los principios obligan a quien trata los datos; los derechos protegen a las personas.",
    ),
    pick("check-mini", "Minimizar", "Una app de linternas pide acceso a tu ubicación y tus contactos. ¿Qué principio incumple?",
      "La minimización: pide más datos de los necesarios para su función",
      [["La disponibilidad", "No tiene relación."], ["La integridad", "No tiene relación."], ["Ninguno, es normal", "No lo es: pide datos innecesarios."]],
      "Solo se deben recoger los datos imprescindibles.",
    ),
  ],
};
