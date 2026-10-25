import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Un algoritmo: pasos ordenados, precisos y finitos ───────────── */

const PASOS_TOSTADA = ["Sacar una rebanada de pan", "Meterla en la tostadora", "Bajar la palanca", "Esperar a que salte", "Untar mantequilla"];

export function buildAlgoritmoReceta(): AnimBuild {
  const props = [
    { t: "Ordenado", c: MANIM.blue },
    { t: "Preciso", c: MANIM.green },
    { t: "Finito", c: MANIM.orange },
  ];
  return {
    label: "Un algoritmo: pasos ordenados, precisos y que terminan, ejemplo de hacer una tostada",
    beatMs: 5600,
    captions: [
      "Un **algoritmo** es una lista de **pasos ordenados** que resuelve un problema. Una receta de cocina es un algoritmo.",
      "Es **ordenado**: cada paso va en su sitio. No se puede untar la mantequilla antes de que salga la tostada.",
      "Es **preciso**: cada paso se entiende sin dudas. «Esperar a que salte» sí; «ponerlo un poco» no.",
      "Es **finito**: tiene un final. Si no terminara nunca, no resolvería el problema.",
      "Si se **cambia el orden** de los pasos, el algoritmo falla: aquí se unta antes de tostar y sale pan frío con mantequilla fundida.",
    ],
    render: (beat) => {
      const malOrden = beat === 4;
      const orden = malOrden ? [0, 4, 1, 2, 3] : [0, 1, 2, 3, 4];
      return (
        <Canvas>
          {orden.map((p, i) => {
            const mal = malOrden && (i === 1 || i === 4);
            return (
              <g key={p}>
                <rect x={60} y={38 + i * 70} width={400} height={52} rx={10} fill={mal ? MANIM.red : MANIM.blue} fillOpacity={0.18} stroke={mal ? MANIM.red : MANIM.blue} strokeWidth={3} className="anim-t" />
                <Txt x={90} y={72 + i * 70} size={24} color={mal ? MANIM.red : MANIM.yellow}>
                  {i + 1}
                </Txt>
                <Txt x={125} y={72 + i * 70} size={20} color={MANIM.ink} anchor="start">
                  {PASOS_TOSTADA[p]}
                </Txt>
                {i < 4 ? <Arrow x1={260} y1={92 + i * 70} x2={260} y2={106 + i * 70} color={MANIM.muted} width={3} head={8} /> : null}
              </g>
            );
          })}
          {props.map((q, i) => (
            <Fade key={q.t} show={beat === i + 1}>
              <rect x={520} y={150} width={220} height={110} rx={14} fill={q.c} fillOpacity={0.15} stroke={q.c} strokeWidth={4} />
              <Txt x={630} y={215} size={30} color={q.c}>
                {q.t}
              </Txt>
            </Fade>
          ))}
          <Fade show={malOrden}>
            <rect x={520} y={150} width={220} height={110} rx={14} fill={MANIM.red} fillOpacity={0.15} stroke={MANIM.red} strokeWidth={4} />
            <Txt x={630} y={200} size={26} color={MANIM.red}>
              Orden
            </Txt>
            <Txt x={630} y={236} size={26} color={MANIM.red}>
              incorrecto
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Símbolos de un diagrama de flujo ───────────── */

export function buildDiagramaFlujoSimbolos(): AnimBuild {
  const sims = [
    { t: "Inicio / fin", c: MANIM.orange, x: 125, d: "Marca dónde empieza y dónde acaba." },
    { t: "Proceso", c: MANIM.blue, x: 305, d: "Una acción: calcular, asignar, hacer algo." },
    { t: "Decisión", c: MANIM.purple, x: 485, d: "Una pregunta con respuesta Sí o No." },
    { t: "Entrada / salida", c: MANIM.green, x: 665, d: "Leer un dato o mostrar un resultado." },
  ];
  const cuerpo = (i: number, c: string) => {
    const x = sims[i]!.x;
    if (i === 0) return <rect x={x - 62} y={95} width={124} height={50} rx={25} fill={c} fillOpacity={0.2} stroke={c} strokeWidth={4} />;
    if (i === 1) return <rect x={x - 62} y={90} width={124} height={60} rx={4} fill={c} fillOpacity={0.2} stroke={c} strokeWidth={4} />;
    if (i === 2) return <polygon points={`${x},75 ${x + 72},120 ${x},165 ${x - 72},120`} fill={c} fillOpacity={0.2} stroke={c} strokeWidth={4} />;
    return <polygon points={`${x - 50},150 ${x - 70},90 ${x + 70},90 ${x + 50},150`} fill={c} fillOpacity={0.2} stroke={c} strokeWidth={4} />;
  };
  return {
    label: "Símbolos de un diagrama de flujo: óvalo, rectángulo, rombo y paralelogramo",
    beatMs: 5400,
    captions: [
      "Un **diagrama de flujo** representa un algoritmo con **formas** unidas por **flechas** que indican el orden.",
      "El **óvalo** marca el **inicio** y el **fin** del algoritmo.",
      "El **rectángulo** es un **proceso**: una acción que se realiza.",
      "El **rombo** es una **decisión**: una pregunta con dos salidas, **Sí** y **No**.",
      "El **paralelogramo** es una **entrada o salida**: se lee un dato o se muestra un resultado.",
    ],
    render: (beat) => (
      <Canvas>
        {sims.map((q, i) => (
          <g key={q.t} className="anim-t" opacity={beat === 0 || beat === i + 1 ? 1 : 0.3}>
            {cuerpo(i, q.c)}
            <Txt x={q.x} y={205} size={20} color={q.c}>
              {q.t}
            </Txt>
          </g>
        ))}
        {sims.map((q, i) => (
          <Fade key={q.t} show={beat === i + 1}>
            <Txt x={400} y={290} size={22} color={q.c}>
              {q.d}
            </Txt>
          </Fade>
        ))}
        <Fade show={beat === 0}>
          <Arrow x1={190} y1={120} x2={242} y2={120} color={MANIM.muted} width={3} head={9} />
          <Arrow x1={368} y1={120} x2={410} y2={120} color={MANIM.muted} width={3} head={9} />
          <Arrow x1={560} y1={120} x2={590} y2={120} color={MANIM.muted} width={3} head={9} />
          <Txt x={400} y={290} size={20} color={MANIM.muted}>
            las flechas muestran el orden de los pasos
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Bucle: repetir en lugar de copiar ───────────── */

export function buildBucleRepeticionSimple(): AnimBuild {
  return {
    label: "Repetición: un bucle evita escribir la misma instrucción muchas veces",
    beatMs: 5600,
    captions: [
      "Un robot tiene que avanzar **cuatro casillas**. Hay dos formas de decírselo.",
      "**Sin bucle**: se escribe «avanzar» cuatro veces. Con 100 casillas serían 100 líneas.",
      "**Con bucle**: «repetir 4 veces: avanzar». Una sola instrucción hace lo mismo y es fácil de cambiar.",
      "Al ejecutar el bucle, el robot repite el cuerpo (**avanzar**) tantas veces como se indique y después sigue con el resto del programa.",
    ],
    render: (beat) => {
      const pos = beat === 3 ? 4 : 0;
      return (
        <Canvas>
          <rect x={60} y={50} width={300} height={190} rx={12} fill={MANIM.panel} stroke={beat === 1 ? MANIM.orange : MANIM.grid} strokeWidth={beat === 1 ? 4 : 2} className="anim-t" opacity={beat === 2 || beat === 3 ? 0.4 : 1} />
          <Txt x={210} y={80} size={20} color={MANIM.orange}>
            Sin bucle
          </Txt>
          {[0, 1, 2, 3].map((i) => (
            <Fade key={i} show={beat >= 1} delay={i * 150}>
              <rect x={100} y={96 + i * 34} width={220} height={28} rx={5} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={2} />
              <Txt x={210} y={116 + i * 34} size={17} color={MANIM.ink}>
                avanzar
              </Txt>
            </Fade>
          ))}
          <rect x={440} y={50} width={300} height={190} rx={12} fill={MANIM.panel} stroke={beat === 2 ? MANIM.green : MANIM.grid} strokeWidth={beat === 2 ? 4 : 2} className="anim-t" opacity={beat === 1 ? 0.4 : 1} />
          <Txt x={590} y={80} size={20} color={MANIM.green}>
            Con bucle
          </Txt>
          <Fade show={beat >= 2}>
            <rect x={470} y={100} width={240} height={110} rx={10} fill={MANIM.green} fillOpacity={0.12} stroke={MANIM.green} strokeWidth={3} />
            <Txt x={590} y={130} size={19} color={MANIM.green}>
              repetir 4 veces
            </Txt>
            <rect x={500} y={146} width={180} height={34} rx={5} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={2} />
            <Txt x={590} y={169} size={17} color={MANIM.ink}>
              avanzar
            </Txt>
          </Fade>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={100 + i * 120} y={300} width={110} height={70} rx={8} fill={MANIM.panel} stroke={i === 4 ? MANIM.green : MANIM.grid} strokeWidth={2} />
          ))}
          <g className="anim-t" style={{ transform: `translate(${pos * 120}px, 0px)` }}>
            <polygon points="155,335 125,318 125,352" fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} />
          </g>
          <Txt x={640} y={392} size={16} color={MANIM.green}>
            meta
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Variable como caja con nombre ───────────── */

export function buildVariableCaja(): AnimBuild {
  const caja = (x: number, nombre: string, valor: string, c: string, tipo: string, on = true) => (
    <g opacity={on ? 1 : 0}>
      <rect x={x - 90} y={150} width={180} height={110} rx={12} fill={c} fillOpacity={0.15} stroke={c} strokeWidth={4} className="anim-t" />
      <Txt x={x} y={140} size={22} color={c}>
        {nombre}
      </Txt>
      <Txt x={x} y={220} size={40} color={MANIM.yellow}>
        {valor}
      </Txt>
      <Txt x={x} y={290} size={16} color={MANIM.muted}>
        {tipo}
      </Txt>
    </g>
  );
  return {
    label: "Una variable es una caja con nombre que guarda un dato y cuyo valor puede cambiar",
    beatMs: 5600,
    captions: [
      "Una **variable** es un espacio de la memoria con un **nombre** donde se guarda un **dato**. Imagina una caja con una etiqueta.",
      "**Asignar** un valor: «edad = 12». La caja «edad» contiene ahora el número 12.",
      "El valor **puede cambiar**: «edad = edad + 1». Se lee la caja (12), se suma 1 y se guarda el resultado (13). El valor anterior **se pierde**.",
      "Una variable puede guardar **texto**: «nombre = Ana». Cada variable tiene su propia caja.",
      "Los datos tienen **tipo**: números, texto y valores lógicos (**verdadero** o **falso**).",
    ],
    render: (beat) => (
      <Canvas>
        {caja(beat >= 3 ? 230 : 400, "edad", beat === 0 ? "?" : beat === 1 ? "12" : "13", MANIM.blue, "número")}
        <Fade show={beat === 1}>
          <Txt x={400} y={80} size={26} color={MANIM.yellow} mono>
            edad = 12
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={400} y={80} size={26} color={MANIM.yellow} mono>
            edad = edad + 1
          </Txt>
          <Txt x={500} y={215} size={20} color={MANIM.red} anchor="start">
            antes: 12
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <g>
            <rect x={430} y={150} width={180} height={110} rx={12} fill={MANIM.green} fillOpacity={0.15} stroke={MANIM.green} strokeWidth={4} />
            <Txt x={520} y={140} size={22} color={MANIM.green}>
              nombre
            </Txt>
            <Txt x={520} y={220} size={36} color={MANIM.yellow}>
              «Ana»
            </Txt>
            <Txt x={520} y={290} size={16} color={MANIM.muted}>
              texto
            </Txt>
          </g>
        </Fade>
        <Fade show={beat === 4}>
          <rect x={635} y={150} width={150} height={110} rx={12} fill={MANIM.purple} fillOpacity={0.15} stroke={MANIM.purple} strokeWidth={4} />
          <Txt x={710} y={140} size={20} color={MANIM.purple}>
            es_alumna
          </Txt>
          <Txt x={710} y={215} size={22} color={MANIM.yellow}>
            verdadero
          </Txt>
          <Txt x={710} y={290} size={16} color={MANIM.muted}>
            lógico
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={400} y={80} size={26} color={MANIM.yellow} mono>
            nombre = «Ana»
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
