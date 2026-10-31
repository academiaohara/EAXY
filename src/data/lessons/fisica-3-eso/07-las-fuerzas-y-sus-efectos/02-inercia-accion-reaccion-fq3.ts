import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const inerciaAccionReaccionFq3Lesson: InteractiveLesson = {
  slug: "inercia-accion-reaccion-fq3",
  title: "2. Primera y tercera ley de Newton",
  subtitle: FQ3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("ley1", "Primera ley: inercia", [
      { kind: "steps", items: [
        "**Primera ley de Newton**: si la **fuerza neta** sobre un cuerpo es **cero**, este **sigue en reposo** o con **velocidad constante** (MRU).",
        "Los cuerpos se **resisten a cambiar** su estado de movimiento: es la **inercia**. A mayor **masa**, mayor inercia.",
        "Por eso los pasajeros se **van hacia delante** cuando el autobús frena: su cuerpo tiende a seguir con la velocidad que llevaba. El **cinturón** les aporta la fuerza que los detiene.",
        "Antes se creía que hacía falta una fuerza para mantener un movimiento: es el **rozamiento** el que lo detiene si no empujas.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Un empujón entre dos cuerpos", [
      { kind: "text", text: "Dos cuerpos se empujan con una fuerza. Cambia las masas y compara sus aceleraciones." },
    ], tool("fq3-accion-reaccion-explorador"), "visual-top"),
    slide("ley3", "Tercera ley: acción y reacción", [
      { kind: "steps", items: [
        "Si un cuerpo A ejerce una fuerza sobre B (**acción**), B ejerce sobre A una fuerza **igual en módulo, de la misma dirección y sentido contrario** (**reacción**).",
        "Las dos fuerzas **actúan sobre cuerpos distintos**, por eso **no se anulan entre sí**.",
        "Ejemplos: al **nadar** empujas el agua hacia atrás y esta te empuja hacia delante; un **cohete** expulsa gases y estos lo impulsan; al **caminar** empujas el suelo hacia atrás y él te empuja hacia delante.",
      ] },
    ]),
    calc("calc-masa", "Más masa, más inercia", "Para poner en movimiento con la misma fuerza (cuya aceleración es F/m) un carro que tiene el doble de masa, ¿por cuánto se divide la aceleración?", nums(2), "a = F/m: si m se duplica, a se divide entre 2.", "A mayor masa, menor aceleración."),
    calc("calc-a1", "Aceleración del primero", "Dos patinadores se empujan con 150 N. El de 50 kg adquiere una aceleración de, en m/s²:", nums(3), "a = F/m = 150 / 50 = 3 m/s².", "Aplica a = F/m."),
    calc("calc-a2", "Aceleración del segundo", "El otro patinador tiene 75 kg. ¿Qué aceleración adquiere, en m/s²? (la misma fuerza, sentido contrario)", nums(2), "a = 150 / 75 = 2 m/s².", "La fuerza de reacción vale también 150 N."),
    calc("calc-rea", "Reacción", "Una persona empuja una pared con 80 N. ¿Con qué fuerza la pared la empuja a ella, en N?", nums(80), "Acción y reacción son iguales: 80 N.", "Mismo módulo."),
    sort("clasifica", "Ley de Newton", "Asocia cada fenómeno con la ley que lo explica.",
      [["in", "Primera ley (inercia)", "cobalt"], ["ar", "Tercera ley (acción-reacción)", "amber"]],
      [["Los pasajeros se inclinan hacia delante al frenar el autobús", "in"], ["Un objeto que se desliza en el espacio sigue moviéndose", "in"], ["Un mantel sacado de golpe deja la vajilla en su sitio", "in"], ["Un cohete se impulsa expulsando gases", "ar"], ["Al nadar, el agua te impulsa hacia delante", "ar"], ["Al disparar, un arma retrocede", "ar"]],
      "Sin fuerza neta: inercia; fuerzas entre dos cuerpos: acción-reacción.",
    ),
    pick("check", "Acción y reacción", "Si acción y reacción son iguales y opuestas, ¿por qué no se anulan?",
      "Porque actúan sobre cuerpos distintos",
      [["Porque son de distinto valor", "Son iguales en valor."], ["Porque ocurren en momentos distintos", "Son simultáneas."], ["Sí se anulan siempre", "Solo se anularían si actuaran sobre el mismo cuerpo."]],
      "Cada fuerza se aplica a un cuerpo diferente.",
    ),
  ],
};
