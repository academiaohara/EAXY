import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const clasificacionMaterialesTecnicosLesson: InteractiveLesson = {
  slug: "clasificacion-materiales-tecnicos",
  title: "1. Clasificación de los materiales técnicos",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Cinco familias de materiales", [
      { kind: "definition", text: "Los materiales técnicos se agrupan en familias según su **estructura y enlace**, que son los que determinan su comportamiento." },
      { kind: "steps", items: [
        "**Metálicos**: átomos en red con electrones libres; buenos conductores, dúctiles y resistentes (acero, aluminio, cobre).",
        "**Poliméricos**: cadenas largas de carbono; ligeros, aislantes y fáciles de moldear (PE, PVC, epoxi).",
        "**Cerámicos**: enlaces fuertes iónicos o covalentes; duros, refractarios y frágiles (vidrio, porcelana, ladrillo).",
        "**Compuestos**: combinación de dos materiales que se complementan (hormigón armado, fibra de carbono).",
        "**Naturales**: de origen biológico o mineral, poco transformados (madera, corcho, algodón, piedra).",
      ] },
    ], undefined, "stack"),
    slide("mesa", "Mesa de muestras", [
      { kind: "text", text: "Elige cada muestra y anota su familia, su subclase y su uso. Intenta predecir primero a qué familia pertenece." },
    ], tool("mesa-muestras-explorador"), "visual-top"),
    slide("otras", "Otras formas de clasificar", [
      { kind: "compare",
        left: { title: "Ferrosos / no ferrosos", text: "**Ferrosos** tienen hierro como base (acero, fundición). **No ferrosos** no: aluminio, cobre, zinc, titanio.", tone: "info" },
        right: { title: "Renovables / no renovables", text: "**Renovables** se regeneran en escalas humanas (madera, corcho). **No renovables**: minerales y combustibles fósiles de origen del plástico.", tone: "key" } },
      { kind: "warning", title: "Renovable no es sinónimo de sostenible", text: "Una madera talada sin gestión agota el bosque. La sostenibilidad depende también de cuánto se consume y de cómo se obtiene." },
    ]),
    sort("clasifica-familias", "Familia del material", "Reparte cada material en su familia.",
      [["met", "Metálicos", "cobalt"], ["pol", "Poliméricos", "emerald"], ["cer", "Cerámicos", "amber"], ["comp", "Compuestos", "violet"]],
      [["Acero", "met"], ["Cobre", "met"], ["PVC", "pol"], ["Baquelita", "pol"], ["Vidrio", "cer"], ["Porcelana", "cer"], ["Fibra de carbono", "comp"], ["Hormigón armado", "comp"]],
      "Los metales se identifican por su red metálica; los polímeros, por sus cadenas; los cerámicos, por sus enlaces rígidos y fragilidad; los compuestos, por mezclar dos materiales.",
    ),
    sort("clasifica-ferrosos", "Ferroso o no ferroso", "¿Tiene el hierro como base?",
      [["fe", "Ferroso", "cobalt"], ["nofe", "No ferroso", "emerald"]],
      [["Acero inoxidable", "fe"], ["Fundición", "fe"], ["Aluminio", "nofe"], ["Latón", "nofe"], ["Titanio", "nofe"], ["Acero al carbono", "fe"]],
      "Acero inoxidable, fundición y acero al carbono son aleaciones de hierro. Aluminio, latón (Cu + Zn) y titanio no lo son.",
    ),
    pick("check-compuesto", "¿Por qué un compuesto?", "El hormigón armado es un material compuesto. ¿Qué aporta cada componente?",
      "El hormigón resiste la compresión y el acero de las barras resiste la tracción",
      [["El acero resiste la compresión y el hormigón la tracción", "Es al revés: el hormigón es muy débil a tracción."], ["Ambos aportan lo mismo: así es más barato", "Se combinan precisamente por ser complementarios."], ["El hormigón protege de la humedad y el acero decora", "El acero cumple una función mecánica esencial."]],
      "Un compuesto combina materiales para obtener propiedades que ninguno tiene por separado.",
    ),
    pick("check-renovable", "Renovable o no", "¿Cuál de estos materiales procede de una fuente renovable?",
      "Corcho",
      [["Polietileno", "Se obtiene del petróleo, que no es renovable."], ["Aluminio", "Sale de la bauxita, un mineral que se agota."], ["Acero", "Se obtiene de mineral de hierro y carbón, recursos no renovables."]],
      "El corcho se obtiene de la corteza del alcornoque, que se regenera. El resto parte de recursos finitos (aunque el aluminio y el acero se pueden reciclar muchas veces).",
    ),
  ],
};
