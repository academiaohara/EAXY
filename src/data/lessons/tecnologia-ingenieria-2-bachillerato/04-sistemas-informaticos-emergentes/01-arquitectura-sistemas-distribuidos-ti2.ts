import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECTI2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const arquitecturaSistemasDistribuidosTi2Lesson: InteractiveLesson = {
  slug: "arquitectura-sistemas-distribuidos-ti2",
  title: "1. Arquitectura de sistemas y sistemas distribuidos",
  subtitle: TECTI2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "De un ordenador a muchos", [
      { kind: "steps", items: [
        "**Arquitectura cliente-servidor**: los clientes piden servicios y un servidor los atiende (la web, el correo, una aplicación móvil).",
        "Un **sistema distribuido** reparte el trabajo y los datos entre **varios ordenadores** conectados por red, que se comportan ante el usuario como un único sistema.",
        "**Computación en la nube**: recursos (cálculo, almacenamiento, aplicaciones) que se alquilan por uso: **IaaS**, **PaaS** y **SaaS**.",
        "**Computación en el borde (edge)**: parte del procesamiento se hace cerca del dispositivo para reducir la latencia.",
        "Ventajas: **escalabilidad**, **tolerancia a fallos** y proximidad al usuario. Retos: **latencia**, **consistencia** de los datos y **seguridad**.",
      ] },
    ], undefined, "stack"),
    slide("disp", "Réplicas y disponibilidad", [
      { kind: "text", text: "Replicar un servicio en varios servidores reduce el tiempo que está caído. La red, además, impone sus límites de latencia y ancho de banda." },
    ], tool("ti2-disponibilidad-explorador"), "visual-top"),
    slide("capas", "Capas de una aplicación", [
      { kind: "steps", items: [
        "**Presentación**: la interfaz que ve el usuario (web, app).",
        "**Lógica**: las reglas del negocio (servicios o API).",
        "**Datos**: la base de datos y el almacenamiento.",
        "Separar las capas permite **escalar** cada una por separado y cambiarlas sin rehacer todo.",
        "Los **contenedores** y los **microservicios** dividen la aplicación en piezas pequeñas y desplegables de forma independiente.",
      ] },
    ]),
    calc("calc-disp", "Disponibilidad", "Dos servidores independientes con una disponibilidad del 99 % cada uno. ¿Cuál es la disponibilidad del conjunto, en %? (1 − 0,01²)", nums(99.99), "1 − 0,0001 = 0,9999 = 99,99 %.", "El sistema falla solo si fallan los dos."),
    calc("calc-caida", "Tiempo caído", "Con una disponibilidad del 99,99 %, ¿cuántas horas al año está caído el servicio? (0,0001 · 8 760, un decimal)", nums(0.9, 0.876), "0,0001 · 8 760 = 0,876 h ≈ 53 min.", "Fracción caída por horas del año."),
    calc("calc-transf", "Transferencia", "Se envían 100 MB por una red de 80 Mbps sin contar la latencia. ¿Cuántos segundos tarda? (100·8/80)", nums(10), "800 Mb / 80 Mbps = 10 s.", "Pasa MB a megabits."),
    sort("clasifica-nube", "¿IaaS, PaaS o SaaS?", "Relaciona cada servicio con su modelo.",
      [["iaas", "IaaS (infraestructura)", "cobalt"], ["paas", "PaaS (plataforma)", "amber"], ["saas", "SaaS (software)", "emerald"]],
      [["Alquilar una máquina virtual", "iaas"], ["Almacenamiento en bruto en la nube", "iaas"], ["Plataforma para desplegar una aplicación sin gestionar servidores", "paas"], ["Base de datos gestionada", "paas"], ["Correo web", "saas"], ["Una hoja de cálculo en línea", "saas"]],
      "Cuanto más alto el nivel, menos tiene que gestionar el cliente.",
    ),
    pick("check-rep", "Réplicas", "¿Qué ventaja principal tiene replicar un servicio en varios servidores?",
      "Que si uno falla, los demás pueden seguir atendiendo: mejora la disponibilidad",
      [["Que los datos nunca se desincronizan", "Mantenerlos sincronizados es un reto."], ["Que no hace falta red", "Sin red no hay sistema distribuido."], ["Que es siempre más barato", "Cuesta más infraestructura."]],
      "La redundancia da tolerancia a fallos, a cambio de complejidad.",
    ),
  ],
};
