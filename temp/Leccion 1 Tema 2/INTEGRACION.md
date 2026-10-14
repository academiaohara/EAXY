# Integración del módulo `potencias`

Archivos nuevos (copiar tal cual):
- `src/components/lesson/stage/modules/potencias/potencias-shared.tsx`
- `src/components/lesson/stage/modules/potencias/PotenciasModule.tsx`
- `src/data/lessons/potencias-raices-escenas.ts` (spread en `steps` de tu lección)
- `e2e/potencias-escenas.spec.ts` (ajusta la URL)

## 1. `src/lib/lesson/types.ts`
```ts
export type StageModuleId =
  | "tienda-ciclista" | "bloques-numericos" | "piramide-reduccion"
  | "mul-div-naturales" | "jerarquia-operaciones"
  | "potencias"; // NUEVO

export type PotenciasScene = "base-exponente" | "cuadrado-cubo" | "calcular-potencia" | "calculadora";
export type PotenciasConfig = { scene: PotenciasScene; base?: number; exponent?: number };

// en NarrateStep:
    mulDiv?: MulDivConfig;
    potencias?: PotenciasConfig; // NUEVO
```

## 2. `StageModuleRenderer.tsx`
```tsx
import { PotenciasModule } from "@/components/lesson/stage/modules/potencias/PotenciasModule";
import type { MulDivConfig, PotenciasConfig, StageModuleId } from "@/lib/lesson/types";

// en StageModuleRenderProps:
  potencias?: PotenciasConfig;

// antes del bloque piramide-reduccion:
  if (module === "potencias" && props.potencias) {
    return <PotenciasModule stepId={stepId} {...props.potencias} onReadyChange={onReadyChange} />;
  }

// STAGE_MODULE_REGISTRY: añadir "potencias"
```

## 3. `StageSteps.tsx` → `NarrateStepView`
```tsx
      mulDiv={step.mulDiv}
      potencias={step.potencias}   // NUEVO
```
(`autoPlay` ya es solo para mul-div; el módulo se reproduce solo por su cuenta.)

## Causas de los fallos que se veían
- **`cdot6`**: en una plantilla JS `"\cdot"` pierde la barra (`\c` no es escape). Hay que escribir `\\cdot`. Ahora todo pasa por `<Tex>` con doble barra.
- **`$6$`, `$8^5$`, `Arista $6$ → …` literales**: texto con `$` metido en `<text>` SVG o en un `<span>` sin `MathRenderer`. Ahora el SVG solo lleva números y las fórmulas van en HTML con `MathRenderer`.
- **6⁴ duplicado**: había un KaTeX y otro texto grande. Ahora hay una sola potencia.
- **Flechas BASE/EXPONENTE sueltas**: estaban en coordenadas distintas a las cifras. Ahora comparten el mismo `viewBox`.
- **Cubo como pila de rejillas**: ahora es un cubo oblicuo real (frontal, superior, lateral) que se construye cara a cara.
- **Colores incoherentes**: en el cuadro de definición la base era turquesa y en la animación ámbar. Ahora base = ámbar, exponente = turquesa en todo.
