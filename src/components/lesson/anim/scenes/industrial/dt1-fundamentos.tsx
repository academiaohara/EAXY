import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { ArcStroke, Dot, Seg, angleOf, polar, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const captions = (...items: string[]) => items;

type SquareGeometry = { points: [Pt, Pt, Pt, Pt]; side: number };

export function pythagorasGeometry(): { triangle: [Pt, Pt, Pt]; squares: [SquareGeometry, SquareGeometry, SquareGeometry] } {
  const a: Pt = [300, 250];
  const b: Pt = [300, 160];
  const c: Pt = [420, 250];
  return {
    triangle: [a, b, c],
    squares: [
      { points: [a, b, [210, 160], [210, 250]], side: 90 },
      { points: [a, c, [420, 370], [300, 370]], side: 120 },
      { points: [b, c, [510, 130], [390, 40]], side: 150 },
    ],
  };
}

export function intersectionExamplesGeometry() {
  const examples = [
    { centers: [[85, 180], [245, 180]] as [Pt, Pt], radius: 72 },
    { centers: [[328, 180], [472, 180]] as [Pt, Pt], radius: 72 },
    { centers: [[610, 180], [700, 180]] as [Pt, Pt], radius: 72 },
  ];
  return examples.map((example) => {
    const centerDistance = Math.hypot(
      example.centers[1][0] - example.centers[0][0],
      example.centers[1][1] - example.centers[0][1],
    );
    return {
      ...example,
      solutions: centerDistance > example.radius * 2 ? 0 : centerDistance === example.radius * 2 ? 1 : 2,
    };
  });
}

export function arcInvarianceGeometry() {
  const center: Pt = [400, 300];
  const radius = 220;
  return {
    center,
    radius,
    a: polar(center, radius, 200),
    b: polar(center, radius, 340),
    points: [polar(center, radius, 150), polar(center, radius, 90), polar(center, radius, 30)],
    arcAngles: [-20, 200] as const,
  };
}

export function arcConstructionGeometry() {
  const a: Pt = [220, 305];
  const b: Pt = [580, 305];
  const alpha = 60;
  const radius = (b[0] - a[0]) / (2 * Math.sin((alpha * Math.PI) / 180));
  const center: Pt = [400, 305 - radius * Math.cos((alpha * Math.PI) / 180)];
  const aAngle = angleOf(center, a);
  const bAngle = angleOf(center, b);
  const radial = [a[0] - center[0], a[1] - center[1]] as const;
  const tangent = [-radial[1], radial[0]] as const;
  return {
    a,
    b,
    center,
    radius,
    alpha,
    tangent,
    aAngle,
    bAngle,
    arcAngles: [bAngle - 360, aAngle] as const,
    arcStart: polar(center, radius, aAngle),
    arcEnd: polar(center, radius, bAngle),
  };
}

function distancePointToLine(point: Pt, direction: Pt): number {
  return Math.abs(point[0] * direction[1] - point[1] * direction[0]) / Math.hypot(...direction);
}

export function bisectorGeometry() {
  const first: Pt = [1, 0];
  const rawSecond: Pt = [215, -230];
  const secondLength = Math.hypot(...rawSecond);
  const second: Pt = [rawSecond[0] / secondLength, rawSecond[1] / secondLength];
  const sum: Pt = [first[0] + second[0], first[1] + second[1]];
  const sumLength = Math.hypot(...sum);
  const direction: Pt = [sum[0] / sumLength, sum[1] / sumLength];
  const point: Pt = [direction[0] * 165, direction[1] * 165];
  return {
    first,
    second,
    direction,
    point,
    distanceToFirstSide: distancePointToLine(point, first),
    distanceToSecondSide: distancePointToLine(point, second),
  };
}

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

export function buildDocumentosProfesionales(): AnimBuild {
  return {
    label: "Galería de documentos técnicos profesionales",
    captions: captions("Planta arquitectónica", "Plano mecánico", "Esquema eléctrico", "Mapa topográfico"),
    render: (beat) => <Canvas>
      <Fade show={beat === 0}>
        <rect x="130" y="55" width="540" height="290" fill="none" stroke={MANIM.blue} strokeWidth="4" />
        <path d="M310 55v180h360M130 210h180M480 55v155" fill="none" stroke={MANIM.blue} strokeWidth="4" />
        <path d="M310 150h35M480 145h35" stroke={MANIM.orange} strokeWidth="6" />
        <Txt x={400} y={35} size={25} color={MANIM.blue} weight={800}>PLANTA · ESCALA 1:50</Txt>
      </Fade>
      <Fade show={beat === 1}>
        <path d="M150 150h150v-45h210v45h140v100H510v45H300v-45H150Z" fill={MANIM.orange} fillOpacity=".12" stroke={MANIM.orange} strokeWidth="4" />
        <line x1="150" y1="330" x2="650" y2="330" stroke={MANIM.ink} strokeWidth="2" />
        <Txt x={400} y={360} size={23} color={MANIM.orange} weight={800}>TOLERANCIA ±0,02 mm</Txt>
      </Fade>
      <Fade show={beat === 2}>
        <path d="M120 200h110l35-55 70 110 70-110 70 110 35-55h120" fill="none" stroke={MANIM.green} strokeWidth="4" />
        <circle cx="120" cy="200" r="16" fill="none" stroke={MANIM.green} strokeWidth="4" />
        <path d="M630 170v60m-20-15 20 15 20-15" fill="none" stroke={MANIM.green} strokeWidth="4" />
        <Txt x={400} y={320} size={25} color={MANIM.green} weight={800}>CIRCUITO · CONEXIONES</Txt>
      </Fade>
      <Fade show={beat >= 3}>
        {[55, 85, 120, 160].map((offset, index) => <path key={offset} d={`M 105 ${200 + offset / 2} C 235 ${90 + offset}, 560 ${320 - offset}, 700 ${150 + offset / 2}`} fill="none" stroke={index === 2 ? MANIM.orange : MANIM.purple} strokeWidth={index === 2 ? 5 : 3} />)}
        <Txt x={400} y={350} size={25} color={MANIM.purple} weight={800}>CURVAS DE NIVEL</Txt>
      </Fade>
    </Canvas>,
  };
}

export function buildPlanoRevision(): AnimBuild {
  return {
    label: "Revisión de forma, tamaño y símbolos de un plano",
    captions: captions("Comprobar forma", "Comprobar tamaño", "Comprobar símbolos"),
    render: (beat) => <Canvas>
      <rect x="190" y="55" width="420" height="300" rx="12" fill="none" stroke={MANIM.muted} strokeWidth="3" />
      <path d="M250 120h130v90H250Zm210 0h90v90h-90Z" fill="none" stroke={MANIM.blue} strokeWidth="4" />
      <Txt x={400} y={35} size={24} color={MANIM.blue} weight={800}>FORMA</Txt>
      <Fade show={beat >= 1}>
        <line x1="250" y1="260" x2="550" y2="260" stroke={MANIM.orange} strokeWidth="3" />
        <Txt x={400} y={290} size={22} color={MANIM.orange} weight={800}>TAMAÑO · 120 mm · 1:2</Txt>
      </Fade>
      <Fade show={beat >= 2}>
        <circle cx="400" cy="325" r="16" fill="none" stroke={MANIM.green} strokeWidth="3" />
        <line x1="389" y1="336" x2="411" y2="314" stroke={MANIM.green} strokeWidth="3" />
        <Txt x={490} y={333} size={22} color={MANIM.green} weight={800}>SÍMBOLOS</Txt>
      </Fade>
    </Canvas>,
  };
}

export function buildLocalizacionDosArcos(): AnimBuild {
  const observer: Pt = [400, 100];
  const a: Pt = [207, 330];
  const b: Pt = [400, 320];
  const c: Pt = [646, 272];
  const circleThrough = (p1: Pt, p2: Pt, p3: Pt) => {
    const d = 2 * (p1[0] * (p2[1] - p3[1]) + p2[0] * (p3[1] - p1[1]) + p3[0] * (p1[1] - p2[1]));
    const ux = ((p1[0] ** 2 + p1[1] ** 2) * (p2[1] - p3[1]) + (p2[0] ** 2 + p2[1] ** 2) * (p3[1] - p1[1]) + (p3[0] ** 2 + p3[1] ** 2) * (p1[1] - p2[1])) / d;
    const uy = ((p1[0] ** 2 + p1[1] ** 2) * (p3[0] - p2[0]) + (p2[0] ** 2 + p2[1] ** 2) * (p1[0] - p3[0]) + (p3[0] ** 2 + p3[1] ** 2) * (p2[0] - p1[0])) / d;
    const center: Pt = [ux, uy];
    return { center, radius: Math.hypot(p1[0] - ux, p1[1] - uy) };
  };
  const left = circleThrough(a, b, observer);
  const right = circleThrough(b, c, observer);
  return {
    label: "Localización de un observador mediante dos arcos capaces",
    captions: captions("Arco capaz de 40 grados", "Arco capaz de 55 grados", "Intersección de ambos arcos"),
    render: (beat) => <Canvas>
      <Dot p={a} r={8} color={MANIM.blue} /><Dot p={b} r={8} color={MANIM.blue} /><Dot p={c} r={8} color={MANIM.blue} />
      <Txt x={a[0]} y={365} size={22}>A</Txt><Txt x={b[0]} y={355} size={22}>B</Txt><Txt x={c[0]} y={307} size={22}>C</Txt>
      <circle cx={left.center[0]} cy={left.center[1]} r={left.radius} fill="none" stroke={MANIM.blue} strokeWidth="4" />
      <Txt x={240} y={65} size={23} color={MANIM.blue} weight={800}>40°</Txt>
      <Fade show={beat >= 1}>
        <circle cx={right.center[0]} cy={right.center[1]} r={right.radius} fill="none" stroke={MANIM.purple} strokeWidth="4" />
        <Txt x={570} y={65} size={23} color={MANIM.purple} weight={800}>55°</Txt>
      </Fade>
      <Fade show={beat >= 2}>
        <Dot p={observer} r={10} color={MANIM.green} />
        <Txt x={400} y={82} size={22} color={MANIM.green} weight={800}>OBSERVADOR</Txt>
        <Seg a={observer} b={a} color={MANIM.green} width={2} /><Seg a={observer} b={b} color={MANIM.green} width={2} /><Seg a={observer} b={c} color={MANIM.green} width={2} />
      </Fade>
    </Canvas>,
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
  const geometry = pythagorasGeometry();
  const [a, b, c] = geometry.triangle;
  const polygon = (points: readonly Pt[]) => points.map((point) => point.join(",")).join(" ");
  return {
    label: "El teorema de Pitágoras entendido como suma de áreas",
    captions: captions(
      "Cada lado del triángulo rectángulo genera un cuadrado.",
      "Las áreas de los cuadrados de los catetos son a² y b².",
      "Juntas ocupan exactamente lo mismo que el cuadrado de la hipotenusa: c².",
    ),
    render: (beat) => (
      <Canvas>
        <polygon points={polygon([a, b, c])} fill={MANIM.blue} fillOpacity=".12" stroke={MANIM.ink} strokeWidth="4" />
        <path d={`M ${a[0]} ${a[1] - 18} h 18 v 18`} fill="none" stroke={MANIM.orange} strokeWidth="3" />
        <Fade show={beat >= 1}>
          <polygon points={polygon(geometry.squares[0].points)} fill={MANIM.purple} fillOpacity=".16" stroke={MANIM.purple} strokeWidth="3" />
          <polygon points={polygon(geometry.squares[1].points)} fill={MANIM.orange} fillOpacity=".16" stroke={MANIM.orange} strokeWidth="3" />
          <Txt x={255} y={215} size={30} color={MANIM.purple} weight={800}>a²</Txt>
          <Txt x={360} y={325} size={30} color={MANIM.orange} weight={800}>b²</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <polygon points={polygon(geometry.squares[2].points)} fill={MANIM.green} fillOpacity=".16" stroke={MANIM.green} strokeWidth="3" />
          <Txt x={420} y={105} size={32} color={MANIM.green} weight={800}>c²</Txt>
          <Txt x={650} y={310} size={27} color={MANIM.green} weight={800}>a² + b² = c²</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

export function buildLugaresCondiciones(): AnimBuild {
  const bisector = bisectorGeometry();
  const origin: Pt = [500, 330];
  const toCanvas = (point: Pt): Pt => [origin[0] + point[0], origin[1] + point[1]];
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
          <Seg a={origin} b={toCanvas([bisector.first[0] * 270, bisector.first[1] * 270])} color={MANIM.blue} width={4} />
          <Seg a={origin} b={toCanvas([bisector.second[0] * 270, bisector.second[1] * 270])} color={MANIM.blue} width={4} />
          <Seg a={origin} b={toCanvas([bisector.direction[0] * 255, bisector.direction[1] * 255])} color={MANIM.orange} width={4} dashed />
          <Dot p={toCanvas(bisector.point)} r={8} color={MANIM.green} />
          <Txt x={toCanvas(bisector.point)[0]} y={toCanvas(bisector.point)[1] - 24} size={18} color={MANIM.green} weight={800}>EQUIDISTA</Txt>
          <Txt x={650} y={365} size={21} color={MANIM.orange} weight={800}>BISECTRIZ</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

export function buildInterseccionLugares(): AnimBuild {
  const examples = intersectionExamplesGeometry();
  return {
    label: "Intersecciones de lugares geométricos con cero, una o dos soluciones",
    captions: captions(
      "Dos condiciones incompatibles producen 0 soluciones.",
      "Si los lugares se tocan una vez, hay 1 solución.",
      "Si se cortan dos veces, aparecen 2 soluciones válidas.",
    ),
    render: (beat) => (
      <Canvas>
        {examples.map((example, index) => {
          const midpoint = (example.centers[0][0] + example.centers[1][0]) / 2;
          const halfDistance = Math.abs(example.centers[1][0] - example.centers[0][0]) / 2;
          const intersectionHeight = Math.sqrt(Math.max(0, example.radius ** 2 - halfDistance ** 2));
          return <g key={midpoint} opacity={index <= beat ? 1 : 0.2} className="anim-t">
            <circle cx={example.centers[0][0]} cy={example.centers[0][1]} r={example.radius} fill="none" stroke={MANIM.blue} strokeWidth="4" />
            <circle cx={example.centers[1][0]} cy={example.centers[1][1]} r={example.radius} fill="none" stroke={MANIM.purple} strokeWidth="4" />
            {example.solutions >= 1 ? <Dot p={[midpoint, 180 - intersectionHeight]} r={8} color={MANIM.green} /> : null}
            {example.solutions === 2 ? <Dot p={[midpoint, 180 + intersectionHeight]} r={8} color={MANIM.green} /> : null}
            <Txt x={midpoint} y={310} size={22} color={index <= beat ? MANIM.ink : MANIM.muted} weight={800}>{example.solutions} {example.solutions === 1 ? "solución" : "soluciones"}</Txt>
          </g>
        })}
      </Canvas>
    ),
  };
}

export function buildArcoCapazInvariancia(): AnimBuild {
  const geometry = arcInvarianceGeometry();
  return {
    label: "Puntos de un arco que ven el mismo segmento bajo el mismo ángulo",
    captions: captions(
      "Elegimos un punto P y observamos el segmento AB bajo el ángulo α.",
      "Movemos P por el arco: cambian las longitudes, pero no el ángulo.",
      "Todos esos puntos forman el arco capaz de α sobre AB.",
    ),
    render: (beat) => {
      const p = geometry.points[Math.min(beat, geometry.points.length - 1)]!;
      return <Canvas>
        <Seg a={geometry.a} b={geometry.b} width={5} />
        <ArcStroke c={geometry.center} r={geometry.radius} a0={geometry.arcAngles[0]} a1={geometry.arcAngles[1]} show color={MANIM.purple} width={4} />
        <Seg a={p} b={geometry.a} color={MANIM.green} width={3} /><Seg a={p} b={geometry.b} color={MANIM.green} width={3} />
        <Dot p={p} r={9} color={MANIM.green} /><Txt x={p[0]} y={p[1] - 25} size={23} color={MANIM.green} weight={800}>P</Txt>
        <Txt x={p[0]} y={p[1] + 45} size={28} color={MANIM.orange} weight={800}>α</Txt>
        <Fade show={beat >= 1}><Txt x={400} y={370} size={25} color={MANIM.green} weight={800}>MISMO ÁNGULO</Txt></Fade>
      </Canvas>;
    },
  };
}

export function buildArcoCapazConstruccion(): AnimBuild {
  const geometry = arcConstructionGeometry();
  const tangentLength = Math.hypot(...geometry.tangent);
  const tangentUnit: Pt = [geometry.tangent[0] / tangentLength, geometry.tangent[1] / tangentLength];
  return {
    label: "Construcción razonada de un arco capaz",
    captions: captions(
      "La mediatriz de AB contiene el centro porque OA y OB son radios.",
      "La perpendicular a la tangente por A localiza el centro O.",
      "Con centro O y radio OA trazamos el arco capaz.",
    ),
    render: (beat) => <Canvas>
      <Seg a={geometry.a} b={geometry.b} width={5} /><Dot p={geometry.a} r={7} /><Dot p={geometry.b} r={7} />
      <Txt x={geometry.a[0] - 18} y={geometry.a[1] + 28} size={22}>A</Txt><Txt x={geometry.b[0] + 18} y={geometry.b[1] + 28} size={22}>B</Txt>
      <Fade show={beat >= 0}>
        <Seg a={[400, 35]} b={[400, 365]} color={MANIM.purple} width={3} dashed />
        <Txt x={470} y={55} size={21} color={MANIM.purple} weight={800}>MEDIATRIZ</Txt>
      </Fade>
      <Fade show={beat >= 1}>
        <Seg a={[geometry.a[0] - tangentUnit[0] * 105, geometry.a[1] - tangentUnit[1] * 105]} b={[geometry.a[0] + tangentUnit[0] * 105, geometry.a[1] + tangentUnit[1] * 105]} color={MANIM.orange} width={3} />
        <Txt x={150} y={355} size={19} color={MANIM.orange} weight={800}>TANGENTE · 60°</Txt>
        <Seg a={geometry.a} b={geometry.center} color={MANIM.blue} width={4} />
        <Dot p={geometry.center} r={8} color={MANIM.blue} />
        <Txt x={455} y={geometry.center[1] - 12} size={23} color={MANIM.blue} weight={800}>CENTRO O</Txt>
      </Fade>
      <ArcStroke c={geometry.center} r={geometry.radius} a0={geometry.arcAngles[0]} a1={geometry.arcAngles[1]} show={beat >= 2} color={MANIM.green} width={5} />
      <Fade show={beat >= 2}><Txt x={400} y={35} size={25} color={MANIM.green} weight={800}>ARCO CAPAZ</Txt></Fade>
    </Canvas>,
  };
}
