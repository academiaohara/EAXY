import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const instrumentosMedidaElectricaLesson: InteractiveLesson = {
  slug: "instrumentos-medida-electrica",
  title: "7. Instrumentos de medida y comprobación",
  subtitle: TEC1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("tipos", "Voltímetro, amperímetro y óhmetro", [
      { kind: "steps", items: [
        "**Voltímetro**: mide la tensión entre dos puntos. Se conecta **en paralelo** con el elemento. Tiene resistencia interna muy alta.",
        "**Amperímetro**: mide la intensidad que atraviesa una rama. Se conecta **en serie**, abriendo el circuito. Tiene resistencia interna muy baja.",
        "**Óhmetro**: mide una resistencia. El elemento debe estar **sin tensión** y, a ser posible, aislado del resto del circuito.",
        "El **multímetro** reúne las tres funciones con un selector y varios bornes.",
      ] },
      { kind: "warning", title: "El error más peligroso", text: "Un amperímetro conectado en paralelo con una fuente es un cortocircuito: se funde su fusible y, con fuentes potentes, puede calentarse o dañarse." },
    ], undefined, "stack"),
    slide("virtual", "Multímetro virtual", [
      { kind: "text", text: "Circuito: pila de 9 V con R₁ = 30 Ω y R₂ = 60 Ω en serie. Elige función y conexión. Prueba las incorrectas para ver cuál es el efecto y cuál es la lectura (o el error)." },
    ], tool("multimetro-explorador"), "visual-top"),
    slide("rangos", "Rango, resolución y error", [
      { kind: "steps", items: [
        "**Rango**: valor máximo medible. Si la lectura lo supera aparece «OL» (fuera de rango).",
        "**Resolución**: la mínima variación que muestra la pantalla; un multímetro de 3½ dígitos llega hasta 1999.",
        "**Regla práctica**: empieza por el **rango más alto** y baja hasta obtener más cifras sin pasar el máximo.",
        "**Error**: toda medida tiene incertidumbre (instrumento + conexión + lectura). Se da el valor con las cifras que garantiza el instrumento.",
      ] },
      { kind: "text", text: "Con un rango de 2 V se leen milésimas de voltio; con uno de 200 V solo décimas. Más rango, menos resolución." },
    ]),
    slide("diagnostico", "Diagnosticar una avería", [
      { kind: "text", text: "La lámpara no luce. Toma medidas de tensión e intensidad y deduce el fallo comparando con lo esperado. Cada medida descarta posibilidades." },
    ], tool("diagnostico-circuito-explorador", { n: 1 }), "visual-top"),
    calc("calc-corriente", "Lo que debe marcar el amperímetro", "En el circuito de 9 V con $R_1 = 30\\ \\Omega$ y $R_2 = 60\\ \\Omega$ en serie, ¿qué intensidad marca un amperímetro en serie, en mA?",
      nums(100), "$R_{eq} = 90\\ \\Omega$; $I = 9/90 = 0{,}1$ A $= 100$ mA.", "Suma las resistencias."),
    calc("calc-voltimetro", "Lo que debe marcar el voltímetro", "En ese mismo circuito, ¿qué marca un voltímetro conectado en paralelo con $R_2$, en V?",
      nums(6), "$V_2 = I R_2 = 0{,}1\\cdot 60 = 6$ V.", "V = I·R."),
    sort("clasifica-conex", "¿Cómo se conecta?", "Asocia cada instrumento con su conexión correcta.",
      [["par", "En paralelo con el elemento", "cobalt"], ["ser", "En serie, abriendo el circuito", "amber"], ["sin", "Sin tensión, componente aislado", "emerald"]],
      [["Voltímetro", "par"], ["Medir la caída en R₂", "par"], ["Amperímetro", "ser"], ["Medir la corriente de la rama", "ser"], ["Óhmetro", "sin"], ["Medir el valor de una resistencia suelta", "sin"]],
      "El voltímetro va en paralelo; el amperímetro, en serie; el óhmetro mide con el componente desconectado de toda fuente.",
    ),
    pick("check-ohm", "Medir una resistencia", "Mides con el óhmetro una resistencia soldada en un circuito con la fuente quitada y marca menos de lo esperado. ¿Por qué?",
      "Porque el resto del circuito conectado en paralelo con ella también influye en la medida",
      [["Porque el óhmetro mide mal siempre", "No es un defecto del aparato, sino del método."], ["Porque la resistencia pierde valor con el tiempo", "No justifica una diferencia tan grande."], ["Porque la pila quitada la descarga", "Una pila retirada no afecta a la medida."]],
      "Para medir una resistencia hay que aislarla (por lo menos levantar una patilla): las demás ramas en paralelo reducen la lectura.",
    ),
  ],
};
