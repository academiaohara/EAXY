import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const componentesElectronicosBasicosLesson: InteractiveLesson = {
  slug: "componentes-electronicos-basicos",
  title: "8. Componentes electrónicos básicos",
  subtitle: TEC1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("biblioteca", "Biblioteca de componentes", [
      { kind: "steps", items: [
        "**Resistencia**: limita la corriente. **Potenciómetro**: resistencia variable con tres terminales (divisor de tensión).",
        "**LDR / NTC**: resistencias que cambian con la luz o la temperatura (sensores).",
        "**Diodo**: deja pasar la corriente en un sentido (rectificar). **LED**: diodo que emite luz.",
        "**Transistor**: conmutador o amplificador controlado por una pequeña corriente.",
        "**Condensador**: almacena carga y energía en un campo eléctrico (filtrar, temporizar).",
        "**Bobina**: almacena energía en un campo magnético (filtros, motores, relés).",
      ] },
    ], undefined, "stack"),
    slide("diodo", "Diodo y LED", [
      { kind: "text", text: "Un diodo no conduce hasta superar su **tensión umbral** y luego la corriente crece muy deprisa: necesita una resistencia en serie. Prueba colores de LED, la resistencia y la conexión invertida." },
    ], tool("diodo-led-explorador", { a: 5, b: 220, n: 0 }), "visual-top"),
    slide("led-calc", "Dimensionar la resistencia de un LED", [
      { kind: "rule", title: "Resistencia serie", formula: "R = \\dfrac{V_{\\text{fuente}} - V_f}{I_{\\text{LED}}}" },
      { kind: "example", title: "LED rojo (Vf = 2 V) a 15 mA con 9 V", lines: [
        { math: "R = \\dfrac{9 - 2}{0{,}015} = 467\\ \\Omega" },
        { math: "R_{\\text{comercial}} = 470\\ \\Omega", note: "valor normalizado de la serie E-12 inmediato superior" },
      ] },
    ]),
    slide("transistor", "Transistor como conmutador", [
      { kind: "text", text: "Una pequeña corriente de **base** controla una corriente mucho mayor de **colector** ($I_C = \\beta\\,I_B$) hasta que se **satura** y se comporta como un interruptor cerrado. Con $I_B = 0$ está en **corte** (abierto)." },
    ], tool("transistor-conmutador-explorador", { a: 3, b: 10 }), "visual-top"),
    slide("condensador", "Condensador: carga y descarga", [
      { kind: "rule", title: "Constante de tiempo", text: "Un condensador se carga a través de una resistencia siguiendo una curva exponencial.", formula: "\\tau = R\\cdot C\\qquad V_C(t) = V\\left(1 - e^{-t/\\tau}\\right)" },
      { kind: "text", text: "A los $5\\tau$ está cargado al $99\\,\\%$. Se usa para temporizar y filtrar." },
    ], tool("condensador-carga-explorador", { a: 9, b: 10, c: 100 }), "visual-top"),
    calc("calc-led", "Resistencia para un LED", "Un LED rojo ($V_f = 2$ V) debe funcionar a $20$ mA con una fuente de $5$ V. ¿Qué resistencia, en Ω, hace falta?",
      nums(150), "$R = (5-2)/0{,}020 = 150\\ \\Omega$.", "R = (V − Vf)/I."),
    calc("calc-beta", "Transistor", "Un transistor con $\\beta = 100$ recibe una corriente de base de $0{,}2$ mA. ¿Qué corriente de colector tendría en zona activa, en mA?",
      nums(20), "$I_C = \\beta I_B = 100\\cdot 0{,}2 = 20$ mA.", "Ic = β · Ib."),
    calc("calc-tau", "Constante de tiempo", "Un condensador de $100\\ \\mu\\text{F}$ se carga a través de $10\\ \\text{k}\\Omega$. ¿Cuál es $\\tau$ en segundos?",
      nums(1), "$\\tau = RC = 10^4\\cdot 10^{-4} = 1$ s.", "100 µF = 10⁻⁴ F; 10 kΩ = 10⁴ Ω."),
    sort("clasifica-comp", "¿Qué función cumple?", "Asocia cada componente con su función principal.",
      [["rec", "Rectificar / emitir luz", "amber"], ["con", "Conmutar o amplificar", "cobalt"], ["alm", "Almacenar energía o carga", "emerald"], ["lim", "Limitar la corriente", "violet"]],
      [["Diodo", "rec"], ["LED", "rec"], ["Transistor", "con"], ["Relé", "con"], ["Condensador", "alm"], ["Bobina", "alm"], ["Resistencia", "lim"]],
      "El diodo rectifica y el LED emite luz; el transistor conmuta o amplifica; condensador y bobina almacenan energía; la resistencia limita corriente.",
    ),
    pick("check-led", "Un LED sin resistencia", "¿Qué le pasa a un LED conectado directamente a 5 V sin resistencia en serie?",
      "Circula una corriente enorme y se quema, porque el LED por sí solo apenas limita la corriente",
      [["Luce con más intensidad pero sin riesgo", "Sin limitación, la corriente se dispara y destruye la unión."], ["No pasa nada: el LED regula su corriente", "El LED no limita su propia corriente."], ["Se apaga, porque 5 V es poca tensión", "5 V es más que su umbral (~2 V)."]],
      "Una vez superado el umbral, un pequeño aumento de tensión provoca un gran aumento de corriente; hay que limitarla con una resistencia.",
    ),
  ],
};
