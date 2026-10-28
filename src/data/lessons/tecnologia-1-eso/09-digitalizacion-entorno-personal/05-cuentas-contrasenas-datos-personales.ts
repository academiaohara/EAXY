import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cuentasContrasenasDatosPersonalesLesson: InteractiveLesson = {
  slug: "cuentas-contrasenas-datos-personales",
  title: "5. Cuentas, contraseñas y datos personales",
  subtitle: TECESO1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("cuentas", "Tu entorno digital de aprendizaje", [
      { kind: "definition", text: "El **entorno digital de aprendizaje** es el conjunto de herramientas, plataformas y cuentas que usas para estudiar: correo y aula virtual del centro, documentos en la nube, aplicaciones de comunicación." },
      { kind: "steps", items: [
        "Las **cuentas institucionales** del centro están gestionadas por el centro educativo y se usan para trabajos y comunicaciones del curso.",
        "Cada cuenta es **personal**: no se comparte con nadie, ni siquiera con amistades.",
        "Los **datos personales** (nombre, imagen, ubicación, contactos) valen mucho: conviene dar solo los necesarios.",
      ] },
    ], undefined, "stack"),
    slide("terminos", "Términos y condiciones", [
      { kind: "steps", items: [
        "Antes de crear una cuenta, mira **qué datos pide** y **para qué los usará**.",
        "Revisa la **política de privacidad**: quién puede ver tus datos y si los comparte con terceros.",
        "Configura la **privacidad** de perfiles y publicaciones.",
        "Un servicio «gratis» suele pagarse con **tus datos**.",
      ] },
    ]),
    slide("contrasena", "Contraseñas fuertes", [
      { kind: "text", text: "Cada carácter extra multiplica las combinaciones que un atacante tendría que probar. Cambia la longitud y los tipos de caracteres." },
    ], tool("contrasena-fortaleza-explorador", { a: 6 }), "visual-top"),
    slide("buenas", "Buenas prácticas", [
      { kind: "steps", items: [
        "**Larga**: mejor una frase de 4 palabras que una palabra rara de 8 letras.",
        "**Única** para cada servicio: si se filtra una, no caen todas.",
        "**Sin datos personales** (nombre, fecha de nacimiento, mascota).",
        "Activa la **verificación en dos pasos** cuando exista.",
        "Usa un **gestor de contraseñas** y **no las compartas**.",
        "Cierra la sesión en equipos que no sean tuyos.",
      ] },
    ]),
    sort("clasifica-pass", "Contraseña buena o mala", "Clasifica cada práctica.",
      [["buena", "Buena práctica", "emerald"], ["mala", "Mala práctica", "rose"]],
      [["Una frase larga con números y símbolos", "buena"], ["Una contraseña distinta para cada servicio", "buena"], ["Activar la verificación en dos pasos", "buena"], ["«123456»", "mala"], ["Tu fecha de nacimiento", "mala"], ["Usar la misma en todos los sitios", "mala"], ["Compartirla con tu mejor amigo", "mala"]],
      "La seguridad depende de la longitud, de la variedad y de no repetirla ni compartirla.",
    ),
    pick("check-compartir", "Compartir la cuenta", "Un compañero te pide la contraseña de tu cuenta del centro «solo para entregar un trabajo». ¿Qué haces?",
      "No se la doy: la cuenta es personal y él puede usar la suya o pedir ayuda al profesor",
      [["Se la doy, es de confianza", "Aun así, lo que haga con tu cuenta será responsabilidad tuya."], ["Se la doy y luego la cambio", "Es mejor no darla nunca."], ["Se la doy si promete no mirar nada", "No se puede garantizar."]],
      "Una cuenta es personal: compartirla te hace responsable de lo que se haga con ella.",
    ),
  ],
};
