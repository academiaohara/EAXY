#!/usr/bin/env python3
"""Genera animaciones Manim adicionales para unidades 11-13."""
from pathlib import Path

HEADER = '''import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";
import { Box, Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

function beatCaption(beat: number, n: number, captions: string[]): string[] {
  return captions.slice(0, Math.min(beat + 1, captions.length));
}

'''

SCENES = [
    ("optica-sensor", "buildOpticaSensor", "Modos del sensor óptico", [
        "Modo **barrera**: emisor y receptor separados; la pieza **interrumpe** el haz.",
        "Modo **reflexión**: un solo cabezal y un **reflector**; detecta cuando falta el objeto.",
        "Modo **directo**: la luz vuelve **desde el objeto** hacia el receptor integrado.",
        "La luz suele ir **modulada** en infrarrojo para evitar falsas detecciones con la iluminación ambiente.",
    ]),
    ("galga-potenciometro", "buildGalgaPotenciometro", "Potenciómetro y galga extensiométrica", [
        "Un **potenciómetro lineal** convierte desplazamiento en tensión, pero el contacto **se desgasta**.",
        "La **regla óptica** usa ranuras o fibra: sin rozamiento y mejor resolución.",
        "La **galga extensiométrica** varía su resistencia con la deformación $\\varepsilon = \\sigma/E$.",
        "Con $\\Delta R = R\\,k\\,\\varepsilon$ se mide fuerza o esfuerzo en puentes de Wheatstone.",
    ]),
    ("encoder-tacometro", "buildEncoderTacometro", "Encoder y tacómetro", [
        "El **encoder** genera **pulsos** al pasar ranuras del disco entre emisor y receptor.",
        "Contando pulsos conoces **posición**; dividiendo por el tiempo, **velocidad angular**.",
        "El **tacómetro** entrega una **tensión proporcional** a $\\omega$: $e = K B \\omega$.",
        "Los impulsos ópticos o inductivos sobre muescas del eje también dan velocidad **sin contacto**.",
    ]),
    ("presion-temperatura-capt", "buildPresionTemperaturaCapt", "Captadores de presión y temperatura", [
        "El **tubo Bourdon** se endereza con la presión y mueve un mecanismo o transmisor eléctrico.",
        "Los **termopares** generan fem por **Seebeck** según el par de metales y la temperatura.",
        "Un **Pt100** cambia su resistencia casi linealmente con la temperatura en un puente.",
        "Los **pirómetros** miden temperatura **sin contacto** a partir de la radiación emitida.",
    ]),
    ("ldr-operacional", "buildLdrOperacional", "LDR y amplificador operacional", [
        "Una **LDR** reduce su resistencia cuando aumenta la **luz** incidente.",
        "El **fotodiodo** entrega corriente en la unión polarizada; el **fototransistor** amplifica.",
        "El **operacional inversor**: $V_s/V_e = -R_2/R_1$ con masa virtual en la entrada −.",
        "Como **comparador**, satura a ±$V_{cc}$ según qué entrada sea mayor.",
    ]),
    ("binario-sistemas", "buildBinarioSistemas", "Por qué el binario", [
        "Con **dos niveles** eléctricos (0 V y 5 V) el ruido no confunde un 0 con un 1.",
        "Las puertas se fabrican con **millones de transistores** que solo conmutan esos estados.",
        "Un **byte** (8 bits) permite $256$ combinaciones: suficiente para códigos ASCII básicos.",
        "La aritmética binaria es **mecánica** para el hardware: ideal para operar a GHz.",
    ]),
    ("conversion-bases", "buildConversionBases", "Decimal a binario", [
        "Parte **entera**: divisiones sucesivas por 2; los **restos** son los bits (MSB al final).",
        "Parte **decimal**: multiplicaciones por 2; la parte entera de cada producto es el bit.",
        "Ejemplo: $45_{10} = 101101_2$ leyendo restos de abajo arriba.",
        "Combinando ambas partes se convierte cualquier número mixto del libro.",
    ]),
    ("logica-niveles", "buildLogicaNiveles", "Lógica positiva y negativa", [
        "En **lógica positiva** el nivel **alto** representa el 1 lógico.",
        "En **lógica negativa** el nivel **alto** representa el 0 lógico.",
        "Lo importante es ser **coherente** en todo el sistema: datasheet y esquema.",
        "Un mismo voltaje puede ser 0 o 1 según la convención elegida.",
    ]),
    ("puertas-universales", "buildPuertasUniversales", "NOR y NAND universales", [
        "La puerta **NAND** es NOT + AND: con 7400 tienes cuatro NAND de 2 entradas.",
        "La puerta **NOR** es NOT + OR: también permite construir cualquier función.",
        "La **XOR** ($\\oplus$) vale 1 cuando las entradas son **distintas**.",
        "Puertas universales simplifican el **inventario** en diseño con circuitos integrados.",
    ]),
    ("nand-implementacion", "buildNandImplementacion", "Implementar con NAND", [
        "Una NAND con entradas unidas actúa como **inversor**.",
        "Dos NAND forman un **AND**; tres permiten un **OR** (De Morgan).",
        "Tras simplificar en Karnaugh, conviertes sumas de productos a **solo NAND**.",
        "Es la base de muchos **PLD** y de la tecnología CMOS actual.",
    ]),
    ("mux-decoder", "buildMuxDecoder", "Multiplexor y decodificador", [
        "Un **decodificador** de $n$ entradas activa **una** de $2^n$ salidas (74154).",
        "Un **multiplexor** elige **una** de varias entradas según las líneas de **selección**.",
        "El demultiplexor enruta una entrada común hacia la salida seleccionada.",
        "Se usan en **memorias**, **buses** y generación de **señales de control**.",
    ]),
    ("sumador-binario", "buildSumadorBinario", "Sumador binario", [
        "El **medio sumador** suma dos bits y produce **suma** y **acarreo**.",
        "El **sumador completo** añade el **carry** de la columna anterior.",
        "Encadenando sumadores completos se suman palabras de 8, 16 o 32 bits.",
        "El **overflow** indica que el resultado no cabe en el número de bits.",
    ]),
    ("secuencial-intro", "buildSecuencialIntro", "Memoria en circuitos secuenciales", [
        "La salida **actual** depende de las entradas **y del historial** de estados.",
        "Desde **relés** hasta **chips** de memoria, siempre hay un elemento que **recuerda**.",
        "Los esquemas **ladder** siguen usándose para enseñar automatización cableada.",
        "El **autómata programable** ejecuta la misma lógica sin re-cablear.",
    ]),
    ("biestable-jk-d-t", "buildBiestableJkDT", "Biestables J-K, D y T", [
        "El **D** copia la entrada en el **flanco** de reloj: celda de un **registro**.",
        "El **J-K** generaliza R-S y permite **conmutar** con $J=K=1$.",
        "El **T** con $T=1$ invierte $Q$ en cada flanco: base de **contadores**.",
        "El **sincronismo** evita carreras; el **asíncrono** (R-S) es más simple pero crítico.",
    ]),
    ("cableado-ladder", "buildCableadoLadder", "Esquema ladder", [
        "En un **diagrama ladder** la corriente baja por **raíles** y **rungs** (filas).",
        "**Pulsadores**, **interruptores** y **contactos auxiliares** abren o cierran caminos.",
        "Las **bobinas** de relés y **temporizadores** son actuadores lógicos.",
        "Es el mismo lenguaje que muchos **PLC** muestran en pantalla.",
    ]),
    ("grafo-bimodal", "buildGrafoBimodal", "Grafos bimodales", [
        "Cada **estado** del sistema (relé energizado) es un **nodo** del grafo.",
        "Las **aristas** llevan la condición de paso: pulsador, fin de temporizador…",
        "De cada grafo se obtiene una **ecuación** con enclavamiento ($KA = \\ldots$).",
        "El **cronograma** muestra tiempos de $KT_1$, $KT_2$ en paralelo.",
    ]),
    ("secuencia-reles-plc", "buildSecuenciaRelesPlc", "De relés a PLC", [
        "El **diagrama de secuencia** fija el orden: marcha, temporizador, segunda bobina…",
        "Las **ecuaciones** se cablean con contactos NA y NC en serie y paralelo.",
        "Un **PLC** sustituye contactos físicos por **memoria** interna.",
        "Cambiar la secuencia en software es más rápido que re-cablear un panel.",
    ]),
]

def scene_fn(name, fn, label, captions):
    cap = "\n      ".join(f'"{c.replace(chr(34), chr(92)+chr(34))}",' for c in captions)
    return f'''
export function {fn}(): AnimBuild {{
  const captions = [
      {cap}
  ];
  return {{
    label: {repr(label)},
    beatMs: 5200,
    captions,
    render: (beat) => (
      <Canvas>
        <Box x={{120 + beat * 40}} y={{200}} w={{140}} h={{64}} color={{MANIM.blue}} label={{captions[Math.min(beat, captions.length - 1)].slice(0, 28) + "…"}} size={{15}} />
        <Fade show={{beat >= 1}}>
          <Arrow x1={{280}} y1={{200}} x2={{420}} y2={{200}} color={{MANIM.green}} width={{4}} />
        </Fade>
        <Fade show={{beat >= 2}}>
          <Box x={{460}} y={{200}} w={{120}} h={{58}} color={{MANIM.orange}} label="Salida" size={{17}} />
        </Fade>
        <Txt x={{360}} y={{320}} size={{18}} color={{MANIM.muted}}>
          Paso {{beat + 1}} / {{captions.length}}
        </Txt>
      </Canvas>
    ),
  }};
}}
'''

body = HEADER + "\n".join(scene_fn(*s) for s in SCENES)
Path("/workspace/src/components/lesson/anim/scenes/industrial/electronica-ext.tsx").write_text(body, encoding="utf-8")
print("wrote", len(SCENES), "scenes")
