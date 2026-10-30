import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { ArcStroke, Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const captions = (...items: string[]) => items;

export function buildPlanoInformacion(): AnimBuild {
  return {
    label: "La información que convierte un dibujo en un plano construible",
    captions: captions(
      "Una sola imagen enseña la forma, pero todavía obliga a imaginar lo que no se ve.",
      "Las vistas eliminan la ambigüedad de la forma.",
      "Las medidas y la escala fijan el tamaño real.",
      "Los símbolos y las normas hacen que cualquier profesional lo interprete igual.",
    ),
    render: (beat) => (
      <Canvas>
        <g transform="translate(70 72)">
          <path d="M25 95 125 35l95 55-100 62Z" fill={MANIM.blue} fillOpacity=".2" stroke={MANIM.blue} strokeWidth="4" />
          <path d="m120 152 100-62v112l-100 61Z" fill={MANIM.purple} fillOpacity=".18" stroke={MANIM.purple} strokeWidth="4" />
          <path d="M25 95 120 152v111l-95-56Z" fill={MANIM.green} fillOpacity=".16" stroke={MANIM.green} strokeWidth="4" />
          <Txt x={120} y={300} size={20} color={MANIM.muted}>objeto</Txt>
        </g>
        <Fade show={beat >= 1}>
          <g transform="translate(390 55)">
            <rect x="0" y="0" width="300" height="280" rx="14" fill="none" stroke={MANIM.muted} strokeWidth="2" />
            <rect x="35" y="42" width="92" height="70" fill="none" stroke={MANIM.blue} strokeWidth="4" />
            <path d="M178 112V42h92v70l-46 26Z" fill="none" stroke={MANIM.blue} strokeWidth="4" />
            <rect x="35" y="175" width="92" height="55" fill="none" stroke={MANIM.blue} strokeWidth="4" />
            <Txt x={150} y={25} size={18} color={MANIM.blue} weight={800}>VISTAS</Txt>
            <Fade show={beat >= 2}>
              <line x1="35" y1="250" x2="127" y2="250" stroke={MANIM.orange} strokeWidth="2" />
              <path d="m35 250 10-5v10Zm92 0-10-5v10Z" fill={MANIM.orange} />
              <Txt x={81} y={272} size={18} color={MANIM.orange} weight={800}>MEDIDAS</Txt>
              <Txt x={222} y={178} size={18} color={MANIM.orange} weight={800}>ESCALA 1:2</Txt>
            </Fade>
            <Fade show={beat >= 3}>
              <circle cx="225" cy="222" r="18" fill="none" stroke={MANIM.green} strokeWidth="3" />
              <line x1="212" y1="235" x2="238" y2="209" stroke={MANIM.green} strokeWidth="3" />
              <Txt x={225} y={262} size={18} color={MANIM.green} weight={800}>SÍMBOLOS</Txt>
            </Fade>
          </g>
        </Fade>
      </Canvas>
    ),
  };
}

export function buildGeometriaMedidaDemostracion(): AnimBuild {
  return {
    label: "Del resultado medido a una propiedad demostrada",
    captions: captions(
      "Medir resuelve un caso concreto, con la precisión de nuestras herramientas.",
      "Comparar varios casos permite descubrir una regularidad.",
      "Demostrar explica por qué funciona en todos los casos posibles.",
    ),
    render: (beat) => (
      <Canvas>
        <g transform="translate(65 75)">
          <rect width="285" height="250" rx="24" fill={MANIM.orange} fillOpacity=".08" stroke={MANIM.orange} strokeWidth="3" />
          <Txt x={142} y={38} size={24} color={MANIM.orange} weight={800}>MEDIR</Txt>
          <path d="M45 175h190" stroke={MANIM.ink} strokeWidth="4" />
          {Array.from({ length: 10 }, (_, index) => <line key={index} x1={50 + index * 20} y1="160" x2={50 + index * 20} y2={index % 5 === 0 ? 188 : 177} stroke={MANIM.orange} strokeWidth="2" />)}
          <Txt x={142} y={220} size={20} color={MANIM.muted}>este segmento ≈ 18 cm</Txt>
        </g>
        <Fade show={beat >= 1}>
          <path d="m365 200 55-35v25h55v20h-55v25Z" fill={MANIM.muted} fillOpacity=".7" />
        </Fade>
        <Fade show={beat >= 2}>
          <g transform="translate(470 75)">
            <rect width="265" height="250" rx="24" fill={MANIM.green} fillOpacity=".08" stroke={MANIM.green} strokeWidth="3" />
            <Txt x={132} y={38} size={24} color={MANIM.green} weight={800}>DEMOSTRAR</Txt>
            <path d="M55 190 130 70l80 120Z" fill="none" stroke={MANIM.blue} strokeWidth="4" />
            <path d="m68 170 20 13" stroke={MANIM.purple} strokeWidth="3" />
            <path d="m190 183 20-13" stroke={MANIM.purple} strokeWidth="3" />
            <Txt x={132} y={222} size={19} color={MANIM.muted}>vale para todos los casos</Txt>
          </g>
        </Fade>
      </Canvas>
    ),
  };
}

export function buildPitagorasAreas(): AnimBuild {
  return {
    label: "El teorema de Pitágoras entendido como suma de áreas",
    captions: captions(
      "Cada lado del triángulo rectángulo genera un cuadrado.",
      "Las áreas de los cuadrados de los catetos son a² y b².",
      "Juntas ocupan exactamente lo mismo que el cuadrado de la hipotenusa: c².",
    ),
    render: (beat) => (
      <Canvas>
        <path d="M255 300V120h240Z" fill={MANIM.blue} fillOpacity=".12" stroke={MANIM.ink} strokeWidth="4" />
        <path d="M255 280h20v20" fill="none" stroke={MANIM.orange} strokeWidth="3" />
        <Fade show={beat >= 1}>
          <rect x="75" y="120" width="180" height="180" fill={MANIM.purple} fillOpacity=".16" stroke={MANIM.purple} strokeWidth="3" />
          <rect x="255" y="300" width="240" height="72" fill={MANIM.orange} fillOpacity=".16" stroke={MANIM.orange} strokeWidth="3" />
          <Txt x={165} y={220} size={34} color={MANIM.purple} weight={800}>a²</Txt>
          <Txt x={375} y={344} size={34} color={MANIM.orange} weight={800}>b²</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <path d="m255 120 240 180 108-144-240-180Z" fill={MANIM.green} fillOpacity=".16" stroke={MANIM.green} strokeWidth="3" />
          <Txt x={455} y={105} size={36} color={MANIM.green} weight={800}>c²</Txt>
          <Txt x={650} y={330} size={27} color={MANIM.green} weight={800}>a² + b² = c²</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

export function buildLugaresCondiciones(): AnimBuild {
  return {
    label: "Cómo una condición genera un lugar geométrico",
    captions: captions(
      "Un lugar geométrico reúne todos los puntos que cumplen una condición.",
      "Si un punto equidista de A y B, pertenece a su mediatriz.",
      "Si equidista de los lados de un ángulo, pertenece a su bisectriz.",
    ),
    render: (beat) => (
      <Canvas>
        <Dot p={[145, 230]} r={8} color={MANIM.blue} /><Dot p={[355, 230]} r={8} color={MANIM.blue} />
        <Txt x={125} y={265} size={24}>A</Txt><Txt x={375} y={265} size={24}>B</Txt>
        <Fade show={beat >= 1}>
          <Seg a={[250, 45]} b={[250, 365]} color={MANIM.purple} width={4} dashed />
          <Dot p={[250, 130]} r={8} color={MANIM.green} />
          <Seg a={[250, 130]} b={[145, 230]} color={MANIM.green} width={2} />
          <Seg a={[250, 130]} b={[355, 230]} color={MANIM.green} width={2} />
          <Txt x={250} y={30} size={21} color={MANIM.purple} weight={800}>MEDIATRIZ</Txt>
          <Txt x={250} y={108} size={18} color={MANIM.green} weight={800}>EQUIDISTA</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <g transform="translate(470 30)">
            <Seg a={[45, 300]} b={[260, 70]} color={MANIM.blue} width={4} />
            <Seg a={[45, 300]} b={[300, 300]} color={MANIM.blue} width={4} />
            <Seg a={[45, 300]} b={[280, 180]} color={MANIM.orange} width={4} dashed />
            <Dot p={[185, 228]} r={8} color={MANIM.green} />
            <Txt x={190} y={205} size={18} color={MANIM.green} weight={800}>EQUIDISTA</Txt>
            <Txt x={215} y={338} size={21} color={MANIM.orange} weight={800}>BISECTRIZ</Txt>
          </g>
        </Fade>
      </Canvas>
    ),
  };
}

export function buildInterseccionLugares(): AnimBuild {
  const columns = [145, 400, 655];
  return {
    label: "Intersecciones de lugares geométricos con cero, una o dos soluciones",
    captions: captions(
      "Dos condiciones incompatibles producen 0 soluciones.",
      "Si los lugares se tocan una vez, hay 1 solución.",
      "Si se cortan dos veces, aparecen 2 soluciones válidas.",
    ),
    render: (beat) => (
      <Canvas>
        {columns.map((x, index) => (
          <g key={x} opacity={index <= beat ? 1 : 0.2} className="anim-t">
            <circle cx={x - (index === 0 ? 50 : index === 1 ? 40 : 45)} cy="180" r="72" fill="none" stroke={MANIM.blue} strokeWidth="4" />
            <circle cx={x + (index === 0 ? 50 : index === 1 ? 104 : 45)} cy="180" r="72" fill="none" stroke={MANIM.purple} strokeWidth="4" />
            {index >= 1 ? <Dot p={index === 1 ? [x + 32, 180] : [x, 124]} r={8} color={MANIM.green} /> : null}
            {index === 2 ? <Dot p={[x, 236]} r={8} color={MANIM.green} /> : null}
            <Txt x={x} y={310} size={22} color={index <= beat ? MANIM.ink : MANIM.muted} weight={800}>{index} {index === 1 ? "solución" : "soluciones"}</Txt>
          </g>
        ))}
      </Canvas>
    ),
  };
}

const ARC_A: Pt = [210, 300];
const ARC_B: Pt = [590, 300];

export function buildArcoCapazInvariancia(): AnimBuild {
  const points: Pt[] = [[270, 125], [400, 80], [530, 125]];
  return {
    label: "Puntos de un arco que ven el mismo segmento bajo el mismo ángulo",
    captions: captions(
      "Elegimos un punto P y observamos el segmento AB bajo el ángulo α.",
      "Movemos P por el arco: cambian las longitudes, pero no el ángulo.",
      "Todos esos puntos forman el arco capaz de α sobre AB.",
    ),
    render: (beat) => {
      const p = points[Math.min(beat, points.length - 1)]!;
      return <Canvas>
        <Seg a={ARC_A} b={ARC_B} width={5} />
        <ArcStroke c={[400, 300]} r={220} a0={205} a1={335} show color={MANIM.purple} width={4} />
        <Seg a={p} b={ARC_A} color={MANIM.green} width={3} /><Seg a={p} b={ARC_B} color={MANIM.green} width={3} />
        <Dot p={p} r={9} color={MANIM.green} /><Txt x={p[0]} y={p[1] - 25} size={23} color={MANIM.green} weight={800}>P</Txt>
        <Txt x={p[0]} y={p[1] + 45} size={28} color={MANIM.orange} weight={800}>α</Txt>
        <Fade show={beat >= 1}><Txt x={400} y={370} size={25} color={MANIM.green} weight={800}>MISMO ÁNGULO</Txt></Fade>
      </Canvas>;
    },
  };
}

export function buildArcoCapazConstruccion(): AnimBuild {
  const a: Pt = [220, 305];
  const b: Pt = [580, 305];
  const o: Pt = [400, 200];
  return {
    label: "Construcción razonada de un arco capaz",
    captions: captions(
      "La mediatriz de AB contiene el centro porque OA y OB son radios.",
      "La perpendicular a la tangente por A localiza el centro O.",
      "Con centro O y radio OA trazamos el arco capaz.",
    ),
    render: (beat) => <Canvas>
      <Seg a={a} b={b} width={5} /><Dot p={a} r={7} /><Dot p={b} r={7} />
      <Fade show={beat >= 0}>
        <Seg a={[400, 35]} b={[400, 365]} color={MANIM.purple} width={3} dashed />
        <Txt x={470} y={55} size={21} color={MANIM.purple} weight={800}>MEDIATRIZ</Txt>
      </Fade>
      <Fade show={beat >= 1}>
        <Seg a={a} b={o} color={MANIM.blue} width={4} />
        <Dot p={o} r={8} color={MANIM.blue} />
        <Txt x={448} y={190} size={23} color={MANIM.blue} weight={800}>CENTRO O</Txt>
      </Fade>
      <ArcStroke c={o} r={Math.hypot(a[0] - o[0], a[1] - o[1])} a0={30} a1={150} show={beat >= 2} color={MANIM.green} width={5} />
      <Fade show={beat >= 2}><Txt x={400} y={100} size={25} color={MANIM.green} weight={800}>ARCO CAPAZ</Txt></Fade>
    </Canvas>,
  };
}
