import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const paquetesProtocolosInternet3esoLesson: InteractiveLesson = {
  slug: "paquetes-protocolos-internet-3eso",
  title: "5. Cómo funciona Internet: paquetes y protocolos",
  subtitle: TECESO3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("anim", "El viaje de un mensaje", [
      { kind: "text", text: "Observa cómo se trocea un mensaje y cómo llega a su destino." },
    ], anim("eso3-ruta-paquetes"), "text-top"),
    slide("proto", "Protocolos", [
      { kind: "definition", text: "Un **protocolo** es un conjunto de reglas que permiten que dos equipos se entiendan. Internet funciona con muchos protocolos que trabajan juntos." },
      { kind: "steps", items: [
        "**IP**: direcciona los paquetes (origen y destino).",
        "**TCP**: garantiza que lleguen todos y en orden (pide de nuevo los perdidos).",
        "**HTTP / HTTPS**: transmiten las páginas web (HTTPS va **cifrado**).",
        "**DNS**: traduce un **nombre** (www.ejemplo.es) en una **dirección IP**.",
        "**SMTP / IMAP**: correo electrónico.",
      ] },
    ], undefined, "stack"),
    slide("paquetes", "Trocear y reenviar", [
      { kind: "text", text: "Cambia el tamaño del archivo y las pérdidas, y observa cuántos paquetes hay que enviar." },
    ], tool("eso3-paquetes-explorador"), "visual-top"),
    slide("dns", "Del nombre a la dirección", [
      { kind: "steps", items: [
        "Escribes **www.ejemplo.es** en el navegador.",
        "El ordenador pregunta a un servidor **DNS** qué dirección IP corresponde.",
        "Con la IP, el navegador pide la página al **servidor web** usando **HTTPS**.",
        "El servidor responde con los datos, troceados en **paquetes**.",
      ] },
    ]),
    calc("calc-paq", "Número de paquetes", "Un mensaje de 14 600 bytes se envía en paquetes de 1 460 bytes de datos. ¿Cuántos paquetes hacen falta?", nums(10), "14 600 / 1 460 = 10 paquetes.", "Tamaño entre tamaño del paquete."),
    calc("calc-perdida", "Reenvíos", "De 200 paquetes enviados se pierde el 10 %. ¿Cuántos hay que reenviar?", nums(20), "10 % de 200 = 20 paquetes.", "Calcula el porcentaje."),
    sort("clasifica-proto", "¿Qué protocolo?", "Relaciona cada tarea con el protocolo.",
      [["dns", "DNS", "amber"], ["tcp", "TCP", "cobalt"], ["htt", "HTTPS", "emerald"]],
      [["Traducir www.ejemplo.es a una IP", "dns"], ["Resolver nombres de dominio", "dns"], ["Asegurar que todos los paquetes llegan y en orden", "tcp"], ["Pedir de nuevo un paquete perdido", "tcp"], ["Cargar una página web de forma cifrada", "htt"], ["Proteger los datos del formulario de un banco", "htt"]],
      "Cada protocolo se ocupa de una parte de la comunicación.",
    ),
    pick("check-https", "El candado", "¿Qué indica el candado y «https» en la barra de direcciones?",
      "Que la comunicación con el servidor va cifrada, aunque eso no garantiza que el sitio sea honesto",
      [["Que el sitio es seguro al 100 %", "Cifrar no es lo mismo que ser fiable."], ["Que no hay publicidad", "No tiene relación."], ["Que es una página oficial", "No lo garantiza."]],
      "HTTPS protege los datos en tránsito; hay que seguir desconfiando de mensajes y enlaces sospechosos.",
    ),
  ],
};
