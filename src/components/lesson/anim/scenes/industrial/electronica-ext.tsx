import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Óptica: barrera, reflexión, directo ───────────── */

export function buildOpticaSensor(): AnimBuild {
  return {
    label: "Tres modos del detector óptico",
    beatMs: 5200,
    captions: [
      "**Barrera**: emisor y receptor enfrentados; la pieza **corta** el haz.",
      "**Reflexión**: emisor/receptor y **reflector**; falta objeto si no hay retorno.",
      "**Directo**: la luz **rebota** en la pieza hacia el mismo cabezal.",
      "Luz **modulada** en IR para distinguir la señal del fondo.",
    ],
    render: (beat) => {
      const mode = beat;
      return (
        <Canvas>
          <Txt x={360} y={50} size={22} color={MANIM.ink}>
            {mode === 0 ? "Barrera" : mode === 1 ? "Reflexión" : mode === 2 ? "Directo" : "IR modulado"}
          </Txt>
          <Box x={80} y={180} w={70} h={44} color={MANIM.blue} label="Emisor" size={14} />
          {mode === 0 && (
            <>
              <Box x={520} y={180} w={70} h={44} color={MANIM.green} label="Receptor" size={14} />
              <Fade show={beat >= 0}>
                <line x1={150} y1={202} x2={520} y2={202} stroke={MANIM.yellow} strokeWidth={4} strokeDasharray={beat >= 1 ? "0" : "8 6"} />
              </Fade>
              <Fade show={beat >= 1}>
                <rect x={300} y={170} width={24} height={64} fill={MANIM.orange} fillOpacity={0.85} />
              </Fade>
            </>
          )}
          {mode === 1 && (
            <>
              <Box x={480} y={180} w={90} h={44} color={MANIM.purple} label="Reflector" size={14} />
              <Arrow x1={150} y1={202} x2={480} y2={202} color={MANIM.yellow} width={3} />
              <Arrow x1={480} y1={202} x2={150} y2={202} color={MANIM.yellow} width={3} />
            </>
          )}
          {mode === 2 && (
            <>
              <Box x={150} y={180} w={100} h={44} color={MANIM.green} label="Emisor/Receptor" size={13} />
              <rect x={380} y={175} width={40} height={54} fill={MANIM.orange} fillOpacity={0.9} />
              <Arrow x1={250} y1={202} x2={380} y2={202} color={MANIM.yellow} width={3} />
              <Arrow x1={380} y1={202} x2={250} y2={202} color={MANIM.yellow} width={3} />
            </>
          )}
          {mode >= 3 && (
            <Txt x={360} y={200} size={20} color={MANIM.green}>
              Haz IR pulsado → filtro en el receptor
            </Txt>
          )}
        </Canvas>
      );
    },
  };
}

export function buildGalgaPotenciometro(): AnimBuild {
  return {
    label: "Desplazamiento: reóstato y galga",
    beatMs: 5000,
    captions: [
      "El **cursor** del potenciómetro desliza sobre la pista resistiva: tensión ∝ desplazamiento.",
      "El **desgaste** del contacto limita la vida útil en entornos industriales duros.",
      "La **regla óptica** cuenta ranuras sin rozamiento mecánico.",
      "La **galga** estira su resistencia: $\\Delta R = R\\,k\\,\\varepsilon$.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={100} y={220} width={520} height={12} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={2} />
        <circle cx={160 + beat * 35} cy={226} r={14} fill={MANIM.orange} stroke={MANIM.ink} strokeWidth={2} />
        <Txt x={360} y={180} size={20} color={MANIM.blue}>
          x → tensión
        </Txt>
        <Fade show={beat >= 2}>
          <rect x={120} y={280} width={200} height={40} fill={MANIM.panel} stroke={MANIM.green} strokeWidth={2} />
          <Txt x={220} y={306} size={17} color={MANIM.green}>
            Galga ε
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={360} y={320} size={19} color={MANIM.yellow}>
            ΔR = R · k · ε
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

export function buildEncoderTacometro(): AnimBuild {
  const slots = 12;
  return {
    label: "Pulsos del encoder y tacómetro",
    beatMs: 4800,
    captions: [
      "Ranuras del disco **interrumpen** el haz: cada pulso es un incremento de ángulo.",
      "Con un **reloj** de muestreo conviertes pulsos en **velocidad**.",
      "El **tacómetro** DC entrega $e \\propto \\omega$ con imanes permanentes.",
      "Impulsos por vuelta × rpm fijan la **frecuencia** del tren de pulsos.",
    ],
    render: (beat) => {
      const rot = beat * 30;
      return (
        <Canvas>
          <g transform={`rotate(${rot} 280 200)`}>
            <circle cx={280} cy={200} r={70} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={3} />
            {Array.from({ length: slots }, (_, i) => {
              const a = (i / slots) * Math.PI * 2;
              return (
                <rect
                  key={i}
                  x={278}
                  y={130}
                  width={4}
                  height={24}
                  fill={i % 2 === 0 ? MANIM.surface : MANIM.yellow}
                  transform={`rotate(${(i / slots) * 360} 280 200)`}
                />
              );
            })}
          </g>
          <Box x={420} y={170} w={100} h={50} color={MANIM.green} label="Contador" size={15} />
          <Fade show={beat >= 2}>
            <Txt x={420} y={260} size={18} color={MANIM.orange}>
              e = K·B·ω
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

export function buildPresionTemperaturaCapt(): AnimBuild {
  return {
    label: "Bourdon, termopar y Pt100",
    beatMs: 5000,
    captions: [
      "El **Bourdon** es un tubo curvo que tiende a **enderezarse** con la presión interna.",
      "En un **termopar**, la fem depende de la **diferencia de temperatura** entre uniones.",
      "**Pt100**: 100 Ω a 0 °C; la resistencia crece casi linealmente con T.",
      "El **pirómetro** mide radiación infrarroja sin tocar la pieza caliente.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0 || beat >= 3}>
          <path d="M 120 240 Q 180 160 240 240" fill="none" stroke={MANIM.orange} strokeWidth={6} />
          <Txt x={180} y={150} size={16} color={MANIM.orange}>
            Bourdon
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <line x1={400} y1={280} x2={400} y2={140} stroke={MANIM.red} strokeWidth={4} />
          <Txt x={420} y={200} size={16} color={MANIM.red}>
            Termopar
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <rect x={480} y={180} width={80} height={80} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={3} />
          <Txt x={520} y={225} size={15} color={MANIM.blue}>
            Pt100
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <circle cx={520} cy={120} r={28} fill={MANIM.red} fillOpacity={0.5} />
          <Txt x={520} y={125} size={14} color={MANIM.ink}>
            IR
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

export function buildLdrOperacional(): AnimBuild {
  return {
    label: "LDR y operacional inversor",
    beatMs: 5000,
    captions: [
      "Más **luz** → menor resistencia de la **LDR** en divisor de tensión.",
      "El **fotodiodo** con polarización inversa entrega **corriente** proporcional al flujo.",
      "En el **inversor**, $V_+ = V_-$ (masa virtual) y $I_1 = I_2$.",
      "Ganancia $|V_s/V_e| = R_2/R_1$; como **comparador** satura a ±$V_{cc}$.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={160} cy={200} r={36} fill={beat >= 1 ? MANIM.yellow : MANIM.panel} stroke={MANIM.ink} strokeWidth={3} />
        <Txt x={160} y={206} size={16} color={MANIM.ink}>
          LDR
        </Txt>
        <Fade show={beat >= 2}>
          <polygon points="320,170 320,230 380,200" fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={3} />
          <Txt x={350} y={260} size={15} color={MANIM.blue}>
            OpAmp
          </Txt>
          <line x1={200} y1={200} x2={320} y2={190} stroke={MANIM.green} strokeWidth={3} />
          <line x1={380} y1={200} x2={480} y2={200} stroke={MANIM.orange} strokeWidth={4} />
        </Fade>
      </Canvas>
    ),
  };
}

export function buildBinarioSistemas(): AnimBuild {
  return {
    label: "Sistema binario",
    beatMs: 4800,
    captions: [
      "Dos niveles eléctricos **estables** frente al ruido.",
      "Cada **bit** duplica el número de combinaciones: $2^n$.",
      "Un **byte** agrupa 8 bits → 256 estados.",
      "La ALU del procesador solo **suma y desplaza** bits a gran velocidad.",
    ],
    render: (beat) => {
      const bits = Math.min(8, beat + 1);
      return (
        <Canvas>
          {Array.from({ length: bits }, (_, i) => (
            <rect key={i} x={180 + i * 44} y={180} width={36} height={48} fill={i % 2 ? MANIM.green : MANIM.panel} stroke={MANIM.ink} strokeWidth={2} />
          ))}
          <Txt x={360} y={280} size={20} color={MANIM.yellow}>
            {bits} bit{bits > 1 ? "s" : ""} → {2 ** bits} estados
          </Txt>
        </Canvas>
      );
    },
  };
}

export function buildConversionBases(): AnimBuild {
  return {
    label: "Conversiones decimal ↔ binario",
    beatMs: 5000,
    captions: [
      "Entero: **dividir** por 2 y leer restos de abajo arriba.",
      "Fracción: **multiplicar** por 2 la parte decimal sucesivamente.",
      "Ejemplo entero: 45 → 101101.",
      "Combinas entero + fracción para números mixtos del libro.",
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={360} y={120} size={22} color={MANIM.ink}>
          45 ÷ 2 → restos
        </Txt>
        <Fade show={beat >= 1}>
          {["45→1", "22→0", "11→1", "5→1", "2→0", "1→1"].slice(0, beat + 2).map((t, i) => (
            <Txt key={t} x={280} y={160 + i * 28} size={18} color={MANIM.green}>
              {t}
            </Txt>
          ))}
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={360} y={320} size={24} color={MANIM.yellow}>
            101101₂
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

export function buildLogicaNiveles(): AnimBuild {
  return {
    label: "Lógica positiva y negativa",
    beatMs: 4800,
    captions: [
      "**Positiva**: alto = 1, bajo = 0.",
      "**Negativa**: alto = 0, bajo = 1.",
      "El mismo voltaje cambia de significado según la convención.",
      "Los datasheets de 74xx asumen **positiva** con TTL.",
    ],
    render: (beat) => {
      const pos = beat % 2 === 0;
      return (
        <Canvas>
          <Txt x={360} y={80} size={22} color={MANIM.ink}>
            {pos ? "Lógica positiva" : "Lógica negativa"}
          </Txt>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={160 + i * 90} y={180} width={70} height={100} fill={MANIM.panel} stroke={MANIM.ink} />
              <rect x={160 + i * 90} y={pos ? (i > 1 ? 180 : 230) : i > 1 ? 230 : 180} width={70} height={50} fill={MANIM.green} fillOpacity={0.7} />
            </g>
          ))}
        </Canvas>
      );
    },
  };
}

export function buildPuertasUniversales(): AnimBuild {
  return {
    label: "NAND, NOR y XOR",
    beatMs: 5000,
    captions: [
      "**NAND** = NOT(AND): puerta **universal** (7400).",
      "**NOR** también es universal (7402).",
      "**XOR**: 1 si las entradas son **diferentes** (7486).",
      "Con una sola familia puedes implementar cualquier función.",
    ],
    render: (beat) => (
      <Canvas>
        <Box x={120 + beat * 15} y={190} w={110} h={56} color={MANIM.purple} label={beat === 2 ? "XOR" : beat === 1 ? "NOR" : "NAND"} size={18} />
        <Txt x={360} y={300} size={18} color={MANIM.muted}>
          CI 74xx
        </Txt>
      </Canvas>
    ),
  };
}

export function buildNandImplementacion(): AnimBuild {
  return {
    label: "Solo puertas NAND",
    beatMs: 5000,
    captions: [
      "NAND con entradas juntas = **NOT**.",
      "Dos NAND = **AND**; tres NAND = **OR** (De Morgan).",
      "Conviertes $S = \\sum m_i$ en cadena de NAND.",
      "Es el estilo de muchos diagramas de síntesis.",
    ],
    render: (beat) => (
      <Canvas>
        {Array.from({ length: beat + 1 }, (_, i) => (
          <Box key={i} x={140 + i * 100} y={190} w={80} h={50} color={MANIM.blue} label="NAND" size={15} />
        ))}
        <Fade show={beat >= 2}>
          <Arrow x1={240} y1={240} x2={340} y2={240} color={MANIM.green} width={4} />
        </Fade>
      </Canvas>
    ),
  };
}

export function buildMuxDecoder(): AnimBuild {
  return {
    label: "MUX y decodificador",
    beatMs: 5000,
    captions: [
      "Decodificador: $n$ entradas → **una** de $2^n$ salidas activa.",
      "Multiplexor: **una** de $2^n$ entradas llega a la salida común.",
      "Las líneas **S1 S0** seleccionan el canal.",
      "Base de buses de **memoria** y **E/S**.",
    ],
    render: (beat) => {
      const sel = beat % 4;
      return (
        <Canvas>
          <Box x={100} y={190} w={100} h={60} color={MANIM.blue} label="MUX" size={17} />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1={200} y1={160 + i * 28} x2={280} y2={200} stroke={i === sel ? MANIM.yellow : MANIM.muted} strokeWidth={i === sel ? 4 : 2} />
          ))}
          <Box x={320} y={190} w={90} h={56} color={MANIM.green} label="Salida" size={16} />
        </Canvas>
      );
    },
  };
}

export function buildSumadorBinario(): AnimBuild {
  return {
    label: "Medio sumador y acarreo",
    beatMs: 4800,
    captions: [
      "Suma de bits: $0+0=0$, $1+1=0$ con **carry** 1.",
      "El **medio sumador** tiene dos entradas y suma + acarreo.",
      "El **sumador completo** añade $C_{in}$ de la columna anterior.",
      "Encadenando se forma la **ALU**.",
    ],
    render: (beat) => {
      const a = beat >= 2;
      const b = beat >= 1;
      const s = (a ? 1 : 0) + (b ? 1 : 0);
      return (
        <Canvas>
          <Txt x={360} y={120} size={22} color={MANIM.ink}>
            {a ? 1 : 0} + {b ? 1 : 0}
          </Txt>
          <Txt x={360} y={200} size={28} color={MANIM.green}>
            S = {s % 2} , C = {s >> 1}
          </Txt>
        </Canvas>
      );
    },
  };
}

export function buildSecuencialIntro(): AnimBuild {
  return {
    label: "Memoria en secuencial",
    beatMs: 5000,
    captions: [
      "Sin **memoria** no hay secuencia: solo lógica combinatoria.",
      "Relés **enclavados** ya guardan un bit de estado.",
      "Los **biestables** integrados hacen lo mismo en chip.",
      "El **PLC** reemplaza contactos por memoria software.",
    ],
    render: (beat) => (
      <Canvas>
        <Box x={120} y={190} w={100} h={56} color={MANIM.orange} label="Entrada" size={16} />
        <Fade show={beat >= 1}>
          <Box x={280} y={190} w={120} h={56} color={MANIM.purple} label="Memoria" size={16} />
        </Fade>
        <Fade show={beat >= 2}>
          <Box x={460} y={190} w={100} h={56} color={MANIM.green} label="Salida" size={16} />
        </Fade>
      </Canvas>
    ),
  };
}

export function buildBiestableJkDT(): AnimBuild {
  return {
    label: "Biestables J-K, D y T",
    beatMs: 5000,
    captions: [
      "**D**: en el flanco, $Q$ copia **D** (registro).",
      "**J-K**: evita R-S prohibido; con J=K=1 **conmuta**.",
      "**T**: si T=1, **invierte** Q en cada flanco (contador).",
      "El **reloj** sincroniza para evitar carreras.",
    ],
    render: (beat) => (
      <Canvas>
        <Box x={260} y={180} w={200} h={80} color={MANIM.blue} label={beat === 0 ? "D" : beat === 1 ? "J-K" : beat === 2 ? "T" : "CLK"} size={20} />
        <Fade show={beat >= 3}>
          <Arrow x1={180} y1={220} x2={260} y2={220} color={MANIM.yellow} width={4} />
          <Txt x={200} y={210} size={14} color={MANIM.yellow}>
            clk
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

export function buildCableadoLadder(): AnimBuild {
  return {
    label: "Diagrama ladder",
    beatMs: 5000,
    captions: [
      "Dos **raíles** verticales simulan alimentación L y N.",
      "Cada **rung** es una fila de contactos en serie/paralelo.",
      "Las **bobinas** al final energizan relés o lámparas.",
      "Misma idea en pantalla de un **PLC**.",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={120} y1={80} x2={120} y2={320} stroke={MANIM.ink} strokeWidth={4} />
        <line x1={600} y1={80} x2={600} y2={320} stroke={MANIM.ink} strokeWidth={4} />
        {[0, 1, 2].map((r) => (
          <Fade key={r} show={beat >= r}>
            <line x1={120} y1={140 + r * 60} x2={600} y2={140 + r * 60} stroke={MANIM.green} strokeWidth={3} />
            <rect x={220 + r * 40} y={128 + r * 60} width={40} height={24} fill={MANIM.panel} stroke={MANIM.orange} strokeWidth={2} />
          </Fade>
        ))}
      </Canvas>
    ),
  };
}

export function buildGrafoBimodal(): AnimBuild {
  return {
    label: "Grafos y ecuaciones",
    beatMs: 5000,
    captions: [
      "Nodo **KA1**: relé 1 energizado o no.",
      "Arco desde **SM**: condición de **arranque**.",
      "**Enclavamiento**: contacto de KA1 en paralelo con SM.",
      "Del grafo sale $KA_1 = \\overline{KT_2}\\cdot(SM + KA_1)$.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={220} cy={200} r={40} fill={beat >= 1 ? MANIM.green : MANIM.panel} stroke={MANIM.ink} strokeWidth={3} />
        <Txt x={220} y={206} size={16} color={MANIM.ink}>
          KA1
        </Txt>
        <Fade show={beat >= 1}>
          <circle cx={420} cy={200} r={40} fill={beat >= 2 ? MANIM.orange : MANIM.panel} stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={420} y={206} size={16} color={MANIM.ink}>
            KT1
          </Txt>
          <Arrow x1={260} y1={200} x2={380} y2={200} color={MANIM.blue} width={3} />
        </Fade>
      </Canvas>
    ),
  };
}

export function buildSecuenciaRelesPlc(): AnimBuild {
  return {
    label: "Secuencia temporizada",
    beatMs: 5200,
    captions: [
      "**SM** arranca KA1 y el temporizador **KT1**.",
      "Tras 30 s, **KT1** permite KA2 y **KT2**.",
      "El **cronograma** alinea SM, KA1, T1, KA2…",
      "En un **PLC** los temporizadores son bloques software.",
    ],
    render: (beat) => {
      const t = beat * 25;
      return (
        <Canvas>
          {["SM", "KA1", "KT1", "KA2"].map((lab, i) => (
            <g key={lab}>
              <Txt x={100} y={130 + i * 40} size={16} color={MANIM.muted}>
                {lab}
              </Txt>
              <rect x={160} y={115 + i * 40} width={Math.min(400, 80 + t - i * 20)} height={18} fill={MANIM.green} fillOpacity={0.7} />
            </g>
          ))}
        </Canvas>
      );
    },
  };
}
