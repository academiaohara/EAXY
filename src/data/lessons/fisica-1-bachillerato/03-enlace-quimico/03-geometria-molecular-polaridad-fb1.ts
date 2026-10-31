import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const geometriaMolecularPolaridadFb1Lesson: InteractiveLesson = {
  slug: "geometria-molecular-polaridad-fb1",
  title: "3. Geometría molecular y polaridad",
  subtitle: FB1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("rpecv", "Teoría RPECV", [
      { kind: "steps", items: [
        "La **repulsión de pares de electrones de la capa de valencia** explica la forma de las moléculas: los **dominios de electrones** alrededor del átomo central se colocan lo más **lejos posible**.",
        "Cada **enlace** (sencillo, doble o triple) y cada **par solitario** cuenta como **un dominio**.",
        "**Dominios**: 2 → lineal (180°); 3 → trigonal plana (120°); 4 → tetraédrica (109,5°); 5 → bipirámide trigonal; 6 → octaédrica (90°).",
        "Los **pares solitarios ocupan más espacio** que los enlazantes y **cierran los ángulos**: CH₄ 109,5°, NH₃ ≈ 107°, H₂O ≈ 104,5°.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Construye moléculas", [
      { kind: "text", text: "Elige los pares enlazantes y solitarios del átomo central. Observa la geometría, el ángulo y la polaridad." },
    ], tool("fb1-geometria-explorador"), "visual-top"),
    slide("tipos", "Geometrías habituales", [
      { kind: "steps", items: [
        "**AX₂** lineal (CO₂, BeCl₂); **AX₃** trigonal plana (BF₃); **AX₂E** angular (SO₂); **AX₄** tetraédrica (CH₄); **AX₃E** piramidal (NH₃); **AX₂E₂** angular (H₂O).",
        "Con octeto expandido: **AX₅** bipirámide trigonal (PCl₅); **AX₆** octaédrica (SF₆); **AX₄E** balancín (SF₄); **AX₄E₂** plana cuadrada (XeF₄).",
        "La **hibridación** del átomo central (mezcla de orbitales atómicos): 2 dominios **sp**; 3 **sp²**; 4 **sp³**; 5 **sp³d**; 6 **sp³d²**.",
        "Los **enlaces múltiples** se componen de un enlace **σ** (frontal) y uno o dos **π** (lateral); un dominio de enlace doble o triple cuenta como uno.",
      ] },
    ], undefined, "stack"),
    slide("pol", "Polaridad de las moléculas", [
      { kind: "steps", items: [
        "Un **enlace es polar** si une átomos de distinta electronegatividad: su **momento dipolar** μ (vector) apunta hacia el átomo más electronegativo.",
        "Una **molécula** es **polar** si la **suma vectorial** de los momentos dipolares de enlace es **distinta de cero**. Depende de la **geometría**.",
        "Es **apolar** si tiene enlaces apolares (H₂, O₂, N₂) o si los dipolos se **anulan** por simetría (CO₂, BF₃, CH₄, CCl₄, SF₆).",
        "Es **polar** si es asimétrica: H₂O, NH₃, HCl, SO₂, CHCl₃, CH₃Cl. La polaridad determina la **solubilidad** (lo semejante disuelve a lo semejante) y las fuerzas intermoleculares.",
      ] },
    ], undefined, "stack"),
    calc("calc-dom", "Dominios", "El átomo central del NH₃ tiene 3 pares enlazantes y 1 solitario. ¿Cuántos dominios de electrones hay?", nums(4), "3 + 1 = 4: distribución tetraédrica.", "Cuenta enlaces y pares solitarios."),
    calc("calc-ang", "Ángulo", "¿Cuántos grados mide, aproximadamente, el ángulo de enlace en el CH₄?", nums(109.5, 109, 110), "Tetraedro regular: 109,5°.", "4 dominios iguales."),
    calc("calc-hib", "Hibridación", "El carbono del CO₂ forma 2 dominios de electrones. ¿Qué tipo de hibridación tiene? Escribe el número de orbitales p que se hibridan: sp → 1, sp² → 2, sp³ → 3.", nums(1), "2 dominios → sp (se mezcla 1 orbital s con 1 p).", "sp: lineal."),
    sort("clasifica", "Polar o apolar", "Clasifica cada molécula.",
      [["pol", "Polar", "rose"], ["apo", "Apolar", "cobalt"]],
      [["H₂O", "pol"], ["NH₃", "pol"], ["CO₂", "apo"], ["CH₄", "apo"], ["BF₃", "apo"], ["HCl", "pol"]],
      "Mira la geometría: si los dipolos se anulan, es apolar.",
    ),
    pick("check", "CO₂", "El CO₂ tiene enlaces C=O polares. ¿Por qué la molécula es apolar?",
      "Porque es lineal y los dos dipolos se anulan",
      [["Porque los enlaces C=O no son polares", "Sí son polares."], ["Porque tiene pares solitarios en el C", "No tiene pares solitarios en el C."], ["Porque es angular", "Es lineal."]],
      "La suma vectorial de dos dipolos iguales y opuestos es cero.",
    ),
  ],
};
