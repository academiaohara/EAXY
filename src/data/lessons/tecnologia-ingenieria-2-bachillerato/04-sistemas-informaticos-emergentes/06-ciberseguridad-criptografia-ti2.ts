import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ciberseguridadCriptografiaTi2Lesson: InteractiveLesson = {
  slug: "ciberseguridad-criptografia-ti2",
  title: "6. Ciberseguridad y criptografía",
  subtitle: TECTI2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Proteger sistemas y datos", [
      { kind: "steps", items: [
        "La seguridad de la información busca tres propiedades (**tríada CIA**): **confidencialidad**, **integridad** y **disponibilidad**.",
        "**Amenazas**: malware (virus, ransomware), **phishing** y otras formas de ingeniería social, ataques de **denegación de servicio (DDoS)**, intrusiones, fallos humanos.",
        "**Defensas**: actualizaciones, cortafuegos, antivirus, copias de seguridad, **autenticación** fuerte y **formación** de las personas.",
        "Los sistemas **conectados** (IoT, industriales, coches) amplían la superficie de ataque.",
        "La seguridad es un **proceso continuo**: prevenir, detectar, responder y recuperarse.",
      ] },
    ], undefined, "stack"),
    slide("cripto", "Cifrar un mensaje", [
      { kind: "text", text: "El cifrado César desplaza las letras. Cambia la clave y mira por qué es fácil de romper. Abajo, cuánto tarda en romperse una contraseña." },
    ], tool("ti2-cifrado-explorador"), "visual-top"),
    slide("tipos", "Criptografía moderna", [
      { kind: "steps", items: [
        "**Simétrica** (AES): una misma clave cifra y descifra. Es rápida, pero hay que compartir la clave de forma segura.",
        "**Asimétrica** (RSA, curvas elípticas): un par de claves, **pública** para cifrar o verificar y **privada** para descifrar o firmar.",
        "**Hash** (SHA-256): resumen de longitud fija de unos datos; no se puede invertir. Sirve para comprobar la **integridad** y guardar contraseñas.",
        "**Firma digital** y **certificados**: demuestran quién es el autor y que el mensaje no se ha alterado (HTTPS).",
      ] },
    ]),
    slide("clave", "Contraseñas seguras", [
      { kind: "text", text: "Una contraseña larga y única es la defensa más sencilla. Comprueba cuánto tardaría en romperse una de tu red wifi." },
    ], tool("eso3-clave-wifi-explorador"), "visual-top"),
    calc("calc-k", "Claves del César", "El alfabeto español tiene 27 letras. ¿Cuántas claves útiles tiene el cifrado César (sin contar la identidad)?", nums(26), "27 − 1 = 26 desplazamientos distintos.", "Todos los desplazamientos salvo el cero."),
    calc("calc-esp", "Combinaciones", "Una contraseña de 4 cifras decimales, ¿cuántas combinaciones tiene? (10⁴)", nums(10000), "10 · 10 · 10 · 10 = 10 000.", "Símbolos elevados a la longitud."),
    calc("calc-t", "Tiempo", "Un atacante prueba 1 000 contraseñas por segundo. ¿Cuántos segundos como máximo necesita para las 10 000 combinaciones de 4 cifras?", nums(10), "10 000 / 1 000 = 10 s.", "Combinaciones entre velocidad."),
    sort("clasifica-cia", "¿Qué propiedad se protege?", "Relaciona cada medida con la propiedad de la seguridad.",
      [["con", "Confidencialidad", "cobalt"], ["int", "Integridad", "amber"], ["dis", "Disponibilidad", "emerald"]],
      [["Cifrar los datos", "con"], ["Controlar quién accede", "con"], ["Comprobar que un archivo no se ha modificado (hash)", "int"], ["Firma digital", "int"], ["Copias de seguridad", "dis"], ["Servidores replicados", "dis"]],
      "Cada medida protege una propiedad distinta.",
    ),
    pick("check-phish", "Phishing", "Recibes un correo que imita a tu banco y te pide la contraseña en un enlace. ¿Qué haces?",
      "No pulsar el enlace y acceder al banco escribiendo la dirección o con su aplicación oficial",
      [["Responder con la contraseña", "Es exactamente lo que busca el atacante."], ["Reenviarlo a todos", "Propaga el engaño."], ["Pulsar para comprobar", "El enlace puede instalar malware."]],
      "Ninguna entidad pide la contraseña por correo.",
    ),
  ],
};
