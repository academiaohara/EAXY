export interface TopicVisual {
  icon: string;
  color: string;
  bgColor: string;
}

const TOPIC_VISUALS: Record<string, TopicVisual> = {
  "numeros-naturales": { icon: "🔢", color: "#3b82f6", bgColor: "#eff6ff" },
  "potencias-raices": { icon: "⚡", color: "#8b5cf6", bgColor: "#f5f3ff" },
  divisibilidad: { icon: "🔍", color: "#06b6d4", bgColor: "#ecfeff" },
  "numeros-enteros": { icon: "➖", color: "#6366f1", bgColor: "#eef2ff" },
  "numeros-decimales": { icon: "·", color: "#0ea5e9", bgColor: "#f0f9ff" },
  "sistema-metrico": { icon: "📏", color: "#14b8a6", bgColor: "#f0fdfa" },
  fracciones: { icon: "🎨", color: "#2563eb", bgColor: "#eff6ff" },
  "operaciones-fracciones": { icon: "➗", color: "#7c3aed", bgColor: "#f5f3ff" },
  proporcionalidad: { icon: "📊", color: "#f59e0b", bgColor: "#fffbeb" },
  algebra: { icon: "𝑥", color: "#ec4899", bgColor: "#fdf2f8" },
  geometria: { icon: "📐", color: "#10b981", bgColor: "#ecfdf5" },
  estadistica: { icon: "📈", color: "#f97316", bgColor: "#fff7ed" },
  funciones: { icon: "📉", color: "#6366f1", bgColor: "#eef2ff" },
  probabilidad: { icon: "🎲", color: "#a855f7", bgColor: "#faf5ff" },
};

const DEFAULT_VISUAL: TopicVisual = {
  icon: "📚",
  color: "#6366f1",
  bgColor: "#eef2ff",
};

export function getTopicVisual(topicId: string): TopicVisual {
  return TOPIC_VISUALS[topicId] ?? DEFAULT_VISUAL;
}

export function getCourseVisual(courseId: string): TopicVisual {
  const visuals: Record<string, TopicVisual> = {
    "eso-1": { icon: "∑", color: "#2563eb", bgColor: "#eff6ff" },
  };
  return visuals[courseId] ?? DEFAULT_VISUAL;
}
