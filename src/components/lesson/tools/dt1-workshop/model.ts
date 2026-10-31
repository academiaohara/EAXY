import type { Dt1WorkshopScene } from "@/lib/lesson/types";

export type WorkshopState = { x: number; y: number; scale: number };
export type WorkshopResult = {
  complete: boolean;
  message: string;
  readings: string[];
};
const fmt = (value: number) =>
  Number.isFinite(value)
    ? value.toLocaleString("es-ES", { maximumFractionDigits: 2 })
    : "sin definir";
export const close = (actual: number, expected: number, tolerance = 0.05) =>
  Math.abs(actual - expected) <= tolerance;

export function initialWorkshopState(scene: Dt1WorkshopScene): WorkshopState {
  return scene === "plan-repair"
    ? { x: 60, y: 30, scale: 1 }
    : { x: 2, y: 2, scale: 1 };
}

export function workshopSpec(scene: Dt1WorkshopScene, transfer: boolean) {
  const base = transfer ? 8 : 4;
  const height = transfer ? 6 : 3;
  const half = transfer ? 4 : 3;
  const alpha = transfer ? 60 : 90;
  const width = transfer ? 150 : 120;
  const planHeight = transfer ? 50 : 60;
  const denominator = transfer ? 5 : 2;
  const briefs: Record<Dt1WorkshopScene, string> = {
    "plan-repair": `El encargo pide una placa de ${width} × ${planHeight} mm. En el papel mide ${width / denominator} × ${planHeight / denominator} mm. Corrige las dos cotas y la escala del documento. Las cotas expresan dimensiones reales.`,
    "right-angle": `A y B fijan una base de ${base} unidades. Sitúa C para que AC mida ${height} y BC mida ${transfer ? 10 : 5}. Comprueba qué ocurre con el ángulo A y las áreas de los cuadrados. Trabaja por encima de AB.`,
    locus: `Sitúa una instalación P a 5 km de A y a la misma distancia de A y B. Los puntos están separados ${half * 2} km. Encuentra una solución y después prueba la del otro lado de AB.`,
    "view-angle": `Sitúa la cámara P por encima de AB para que los extremos del segmento se vean bajo ${alpha}°. Prueba distintas posiciones: las distancias pueden cambiar mientras el ángulo se conserva.`,
  };
  return {
    base,
    height,
    half,
    alpha,
    width,
    planHeight,
    denominator,
    brief: briefs[scene],
  };
}

export function evaluateWorkshop(
  scene: Dt1WorkshopScene,
  transfer: boolean,
  state: WorkshopState,
): WorkshopResult {
  if (!state || ![state.x, state.y, state.scale].every(Number.isFinite))
    return {
      complete: false,
      message:
        "Introduce valores numéricos finitos para poder comprobar la geometría.",
      readings: [],
    };
  const { x, y, scale } = state;
  const spec = workshopSpec(scene, transfer);
  if (scene === "plan-repair") {
    const complete =
      close(x, spec.width, 0.01) &&
      close(y, spec.planHeight, 0.01) &&
      close(scale, spec.denominator, 0.001);
    return {
      complete,
      message: complete
        ? "Listo para fabricar: cotas reales y escala coinciden con el encargo."
        : !close(x, spec.width, 0.01) || !close(y, spec.planHeight, 0.01)
          ? "Las cotas deben expresar el tamaño real de la placa, aunque el papel sea más pequeño."
          : "Las cotas son correctas. Divide una longitud real entre la misma longitud en el papel para hallar la escala 1:n.",
      readings: [
        `Papel: ${spec.width / spec.denominator} × ${spec.planHeight / spec.denominator} mm`,
        `Con la escala indicada: ${fmt((spec.width / spec.denominator) * scale)} × ${fmt((spec.planHeight / spec.denominator) * scale)} mm`,
      ],
    };
  }
  if (scene === "right-angle") {
    const ac = Math.hypot(x, y),
      bc = Math.hypot(x - spec.base, y);
    const angle =
      ac > 0
        ? (Math.acos(Math.max(-1, Math.min(1, x / ac))) * 180) / Math.PI
        : NaN;
    const complete =
      y > 0 &&
      close(ac, spec.height) &&
      close(bc, Math.hypot(spec.base, spec.height)) &&
      close(angle, 90, 0.5);
    return {
      complete,
      message: complete
        ? "Escuadra comprobada: lados compatibles y ángulo de 90°. La medición comprueba este caso; la demostración explica la propiedad general."
        : "Ajusta C hasta cumplir ambas longitudes. Compara AB² + AC² con BC²: el ángulo debe ser recto en A.",
      readings: [
        `AC = ${fmt(ac)} · BC = ${fmt(bc)} · A = ${fmt(angle)}°`,
        `${fmt(spec.base ** 2)} + ${fmt(ac ** 2)} frente a ${fmt(bc ** 2)}`,
        "Precisión del taller: 0,05 unidades en longitudes y 0,5° en ángulo.",
      ],
    };
  }
  const half = scene === "locus" ? spec.half : 3;
  const pa = Math.hypot(x + half, y),
    pb = Math.hypot(x - half, y);
  if (scene === "locus") {
    const complete = close(pa, 5) && close(pa, pb);
    return {
      complete,
      message: complete
        ? "Las dos condiciones se cumplen. Refleja P al otro lado de AB: existe otra posición válida."
        : close(pa, pb)
          ? "P equidista de A y B, pero todavía no está a 5 km de A. Muévelo a lo largo de la mediatriz."
          : "Las distancias PA y PB son distintas. Acerca P a la mediatriz antes de ajustar la distancia a A.",
      readings: [
        `PA = ${fmt(pa)} km · PB = ${fmt(pb)} km`,
        `Diferencia de distancias: ${fmt(Math.abs(pa - pb))} km`,
        "Precisión del modelo: 0,05 km en cada condición de distancia.",
      ],
    };
  }
  if (y <= 0 || pa < 0.001 || pb < 0.001)
    return {
      complete: false,
      message:
        "La cámara debe estar por encima de AB y fuera de sus extremos; en un extremo el ángulo no está definido.",
      readings: [],
    };
  const cosine = ((x + half) * (x - half) + y * y) / (pa * pb);
  const angle = (Math.acos(Math.max(-1, Math.min(1, cosine))) * 180) / Math.PI;
  const complete = close(angle, spec.alpha, 0.5);
  return {
    complete,
    message: complete
      ? "Encuadre conseguido. Busca otra posición con el mismo ángulo: estás recorriendo un arco capaz."
      : Math.abs(x) >= half
        ? `El ángulo actual es ${fmt(angle)}°. Cambia también la coordenada x: desde esta vertical no siempre se alcanza el ángulo objetivo.`
        : `El ángulo actual es ${fmt(angle)}°. ${angle > spec.alpha ? "Aleja" : "Acerca"} P respecto a AB y vuelve a observar.`,
    readings: [
      `Ángulo APB = ${fmt(angle)}° · objetivo ${spec.alpha}°`,
      `PA = ${fmt(pa)} · PB = ${fmt(pb)} · tolerancia 0,5°`,
    ],
  };
}
