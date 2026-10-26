"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const PERIFERICOS = [
  { n: "Teclado", tipo: "Entrada", conexion: "USB o Bluetooth", dato: "Pulsaciones de teclas" },
  { n: "Ratón", tipo: "Entrada", conexion: "USB o Bluetooth", dato: "Movimiento y clics" },
  { n: "Pantalla", tipo: "Salida", conexion: "HDMI o DisplayPort", dato: "Imagen" },
  { n: "Impresora", tipo: "Salida", conexion: "USB o Wi-Fi", dato: "Documentos en papel" },
  { n: "Pantalla táctil", tipo: "Entrada y salida", conexion: "Integrada (USB interno)", dato: "Toques e imagen" },
  { n: "Disco externo", tipo: "Almacenamiento (entrada y salida)", conexion: "USB", dato: "Archivos" },
  { n: "Auriculares inalámbricos", tipo: "Salida", conexion: "Bluetooth", dato: "Sonido" },
] as const;

export type Topologia = "estrella" | "bus" | "anillo" | "malla";
/** Tramos de cable necesarios para conectar `n` equipos. */
export function cablesTopologia(t: Topologia, n: number) {
  if (t === "estrella") return n;
  if (t === "bus") return n + 1;
  if (t === "anillo") return n;
  return (n * (n - 1)) / 2;
}
export const FALLOS_TOPOLOGIA: Record<Topologia, { nodo: string; central: string }> = {
  estrella: { nodo: "Solo se queda sin red ese equipo.", central: "Si falla el conmutador central, se cae toda la red." },
  bus: { nodo: "Normalmente solo ese equipo (si el cable troncal está bien).", central: "Si se corta el cable troncal, se cae toda la red." },
  anillo: { nodo: "Se interrumpe el anillo: la red puede caerse (salvo doble anillo).", central: "No hay elemento central." },
  malla: { nodo: "La red sigue: hay rutas alternativas.", central: "No hay elemento central: muy robusta pero cara." },
};

/** Datos de una red IPv4: dirección de red, difusión y número de equipos útiles. */
export function redIp(ip: readonly number[], prefijo: number) {
  const n = ((ip[0]! << 24) | (ip[1]! << 16) | (ip[2]! << 8) | ip[3]!) >>> 0;
  const mask = prefijo === 0 ? 0 : (0xffffffff << (32 - prefijo)) >>> 0;
  const red = (n & mask) >>> 0;
  const dif = (red | (~mask >>> 0)) >>> 0;
  const txt = (x: number) => [(x >>> 24) & 255, (x >>> 16) & 255, (x >>> 8) & 255, x & 255].join(".");
  return { mascara: txt(mask), red: txt(red), difusion: txt(dif), equipos: prefijo >= 31 ? 0 : 2 ** (32 - prefijo) - 2 };
}

/** Intensidad de señal Wi-Fi (dBm) según distancia, paredes y banda (modelo muy simplificado). */
export function senalWifi(distM: number, paredes: number, banda: 2.4 | 5) {
  const n = banda === 2.4 ? 2.7 : 3.2;
  const rssi = -30 - 10 * n * Math.log10(Math.max(1, distM)) - (banda === 2.4 ? 4 : 7) * paredes;
  const calidad = rssi >= -55 ? "Excelente" : rssi >= -67 ? "Buena" : rssi >= -75 ? "Justa" : "Mala";
  return { rssi, calidad };
}

/** Número de paquetes de `payload` bytes necesarios para enviar `bytes` bytes, con retransmisiones esperadas por pérdida. */
export const paquetes = (bytes: number, payload = 1460) => (bytes > 0 ? Math.ceil(bytes / payload) : 0);
export const envios = (n: number, perdidaPct: number) => (perdidaPct >= 100 ? Infinity : n / (1 - perdidaPct / 100));

/** Autonomía (días) de un sensor IoT que transmite cada `intMin` minutos y duerme el resto del tiempo. */
export function vidaBateria(mAh: number, intMin: number, actSeg: number, actMa: number, sleepUa: number) {
  const ciclo = intMin * 60;
  const act = Math.min(actSeg, ciclo);
  const media = (actMa * act + (sleepUa / 1000) * (ciclo - act)) / ciclo;
  return { mediaMa: media, dias: media > 0 ? mAh / media / 24 : Infinity };
}

export const JUEGOS_CARACTERES = [
  { n: "Solo minúsculas", t: 26 },
  { n: "Mayúsculas y minúsculas", t: 52 },
  { n: "Letras y números", t: 62 },
  { n: "Letras, números y símbolos", t: 94 },
] as const;
export const combinacionesClave = (tam: number, largo: number) => tam ** largo;
/** Tiempo medio (s) para adivinar una clave probando `rate` claves por segundo. */
export const segundosFuerzaBruta = (combos: number, rate = 1e9) => combos / 2 / rate;
export function formatoLargo(seg: number) {
  if (seg < 1) return "menos de 1 segundo";
  if (seg < 60) return `${fmtEs(seg, 0)} segundos`;
  if (seg < 3600) return `${fmtEs(seg / 60, 0)} minutos`;
  if (seg < 86400) return `${fmtEs(seg / 3600, 0)} horas`;
  if (seg < 86400 * 365) return `${fmtEs(seg / 86400, 0)} días`;
  const anios = seg / (86400 * 365);
  return anios > 1e9 ? "más que la edad del universo" : `${fmtEs(anios, 0)} años`;
}

/* ───────────── 1. Periféricos ───────────── */

export function PerifericoExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.n, 0, 0, PERIFERICOS.length - 1)) };
  const [s, setS] = useState(init);
  const P = PERIFERICOS[s.p]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un periférico y consulta si es de entrada o de salida y cómo se conecta."}
      onReset={() => setS(init)}
      controls={<Choice label="Periférico" items={PERIFERICOS.map((x, value) => ({ value, label: x.n }))} value={s.p} onChange={(p) => setS({ p })} />}
    >
      <Readout>
        <Stat color={MANIM.blue} label="Tipo">{P.tipo}</Stat>
        <Stat color={MANIM.green} label="Conexión habitual">{P.conexion}</Stat>
        <Stat color={MANIM.yellow} label="Datos que intercambia">{P.dato}</Stat>
      </Readout>
      <Note>Los periféricos de entrada envían información al ordenador, los de salida la reciben y los de almacenamiento hacen ambas cosas. Se conectan por cable (USB, HDMI) o sin cable (Bluetooth, Wi-Fi). Los inalámbricos necesitan batería y emparejarse.</Note>
    </Frame>
  );
}

/* ───────────── 2. Topologías de red ───────────── */

export function TopologiaExplorador({ block }: { block: ToolBlock }) {
  const TOPS: Topologia[] = ["estrella", "bus", "anillo", "malla"];
  const init = { t: Math.round(num(block.params?.n, 0, 0, 3)), n: Math.round(num(block.params?.a, 6, 3, 12)) };
  const [s, setS] = useState(init);
  const t = TOPS[s.t]!;
  const cx = 260;
  const cy = 95;
  const pos = (i: number) => {
    const a = (i / s.n) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * 110, cy + Math.sin(a) * 75] as const;
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la forma de conectar los equipos y cuántos hay. Fíjate en los cables necesarios y en qué pasa si algo falla."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Topología" items={[{ value: 0, label: "Estrella" }, { value: 1, label: "Bus" }, { value: 2, label: "Anillo" }, { value: 3, label: "Malla" }]} value={s.t} onChange={(tt) => setS((x) => ({ ...x, t: tt }))} />
          <Slider label="Número de equipos" value={s.n} min={3} max={12} step={1} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="topologia" maxH={200}>
        {t === "estrella" ? Array.from({ length: s.n }, (_, i) => <line key={i} x1={cx} y1={cy} x2={pos(i)[0]} y2={pos(i)[1]} stroke={MANIM.muted} strokeWidth={2} />) : null}
        {t === "anillo" ? Array.from({ length: s.n }, (_, i) => <line key={i} x1={pos(i)[0]} y1={pos(i)[1]} x2={pos((i + 1) % s.n)[0]} y2={pos((i + 1) % s.n)[1]} stroke={MANIM.muted} strokeWidth={2} />) : null}
        {t === "malla" ? Array.from({ length: s.n }, (_, i) => Array.from({ length: s.n }, (_, j) => (j > i ? <line key={`${i}-${j}`} x1={pos(i)[0]} y1={pos(i)[1]} x2={pos(j)[0]} y2={pos(j)[1]} stroke={MANIM.muted} strokeWidth={1} opacity={0.6} /> : null))) : null}
        {t === "bus" ? (
          <>
            <line x1={30} y1={95} x2={490} y2={95} stroke={MANIM.orange} strokeWidth={4} />
            {Array.from({ length: s.n }, (_, i) => {
              const x = 50 + (i / Math.max(1, s.n - 1)) * 420;
              const arriba = i % 2 === 0;
              return (
                <g key={i}>
                  <line x1={x} y1={95} x2={x} y2={arriba ? 50 : 140} stroke={MANIM.muted} strokeWidth={2} />
                  <rect x={x - 12} y={arriba ? 32 : 140} width={24} height={18} rx={3} fill={MANIM.blue} fillOpacity={0.6} />
                </g>
              );
            })}
          </>
        ) : (
          Array.from({ length: s.n }, (_, i) => <rect key={i} x={pos(i)[0] - 12} y={pos(i)[1] - 9} width={24} height={18} rx={3} fill={MANIM.blue} fillOpacity={0.7} />)
        )}
        {t === "estrella" ? <circle cx={cx} cy={cy} r={14} fill={MANIM.yellow} fillOpacity={0.7} /> : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Tramos de cable">{cablesTopologia(t, s.n)}</Stat>
        <Stat color={MANIM.yellow} label="Si falla un equipo">{FALLOS_TOPOLOGIA[t].nodo}</Stat>
        <Stat color={MANIM.red} label="Si falla el elemento central">{FALLOS_TOPOLOGIA[t].central}</Stat>
      </Readout>
      <Note>La topología es la forma en que se conectan los equipos. La estrella (con un conmutador o router en el centro) es la más usada en casas y centros; la malla es muy fiable, pero necesita muchos enlaces: n · (n − 1) / 2.</Note>
    </Frame>
  );
}

/* ───────────── 3. Direcciones IP ───────────── */

export function DireccionIpExplorador({ block }: { block: ToolBlock }) {
  const init = { o: [192, 168, 1, Math.round(num(block.params?.a, 25, 1, 254))], pre: Math.round(num(block.params?.n, 24, 16, 30)) };
  const [s, setS] = useState(init);
  const r = redIp(s.o, s.pre);
  const set = (i: number, v: number) => setS((x) => ({ ...x, o: x.o.map((q, k) => (k === i ? v : q)) }));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la dirección IP y la longitud de la máscara. La máscara decide qué parte identifica la red y qué parte, el equipo."}
      onReset={() => setS(init)}
      controls={
        <>
          {s.o.map((v, i) => (
            <Slider key={i} label={`Número ${i + 1} de la IP`} value={v} min={0} max={255} step={1} color={MANIM.blue} onChange={(q) => set(i, q)} />
          ))}
          <Slider label="Prefijo de la máscara (/n)" value={s.pre} min={16} max={30} step={1} color={MANIM.orange} onChange={(pre) => setS((x) => ({ ...x, pre }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Dirección IP">{s.o.join(".")}/{s.pre}</Stat>
        <Stat color={MANIM.orange} label="Máscara">{r.mascara}</Stat>
        <Stat color={MANIM.green} label="Dirección de red">{r.red}</Stat>
        <Stat color={MANIM.yellow} label="Difusión (broadcast)">{r.difusion}</Stat>
        <Stat color={MANIM.purple} label="Equipos que caben">{r.equipos}</Stat>
      </Readout>
      <Note>Una dirección IPv4 son 4 números de 0 a 255 (32 bits). La máscara /24 indica que los 24 primeros bits identifican la red; el resto, el equipo. El primer valor es la red, el último es la difusión y los de en medio se asignan a los equipos (el router suele ser el .1).</Note>
    </Frame>
  );
}

/* ───────────── 4. Wi-Fi ───────────── */

export function WifiExplorador({ block }: { block: ToolBlock }) {
  const init = { d: Math.round(num(block.params?.a, 8, 1, 50)), p: Math.round(num(block.params?.b, 1, 0, 5)), b: 0, disp: 4, mb: 300 };
  const [s, setS] = useState(init);
  const w = senalWifi(s.d, s.p, s.b === 0 ? 2.4 : 5);
  const col = w.calidad === "Excelente" || w.calidad === "Buena" ? MANIM.green : w.calidad === "Justa" ? MANIM.yellow : MANIM.red;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Aléjate del router o añade paredes y mira cómo cae la señal. Prueba las dos bandas y varios dispositivos conectados."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Distancia al router" value={s.d} min={1} max={50} step={1} unit=" m" color={MANIM.blue} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Paredes en medio" value={s.p} min={0} max={5} step={1} color={MANIM.orange} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Choice label="Banda" items={[{ value: 0, label: "2,4 GHz (más alcance)" }, { value: 1, label: "5 GHz (más velocidad)" }]} value={s.b} onChange={(b) => setS((x) => ({ ...x, b }))} />
          <Slider label="Dispositivos conectados" value={s.disp} min={1} max={20} step={1} color={MANIM.purple} onChange={(disp) => setS((x) => ({ ...x, disp }))} />
          <Slider label="Velocidad contratada" value={s.mb} min={50} max={1000} step={50} unit=" Mbps" color={MANIM.green} onChange={(mb) => setS((x) => ({ ...x, mb }))} />
        </>
      }
    >
      <Svg w={520} h={40} testId="wifi" maxH={50}>
        <rect x={20} y={10} width={480} height={20} rx={6} fill="none" stroke={MANIM.muted} strokeWidth={2} />
        <rect x={20} y={10} width={Math.max(4, ((w.rssi + 100) / 70) * 480)} height={20} rx={6} fill={col} fillOpacity={0.6} />
      </Svg>
      <Readout>
        <Stat color={col} label="Intensidad de señal (orient.)">{fmtEs(w.rssi, 0)} dBm</Stat>
        <Stat color={col} label="Calidad">{w.calidad}</Stat>
        <Stat color={MANIM.purple} label="Velocidad media por dispositivo (si todos descargan)">{f1(s.mb / s.disp)} Mbps</Stat>
      </Readout>
      <Note>La señal Wi-Fi se debilita con la distancia y con los obstáculos; los muros de hormigón la reducen mucho. La banda de 2,4 GHz llega más lejos y atraviesa mejor las paredes, y la de 5 GHz es más rápida pero de menor alcance. Además, la velocidad se reparte entre todos los equipos activos. Es un modelo simplificado.</Note>
    </Frame>
  );
}

/* ───────────── 5. Paquetes ───────────── */

export function PaquetesExplorador({ block }: { block: ToolBlock }) {
  const init = { mb: Math.round(num(block.params?.a, 5, 1, 100)), per: Math.round(num(block.params?.b, 2, 0, 20)) };
  const [s, setS] = useState(init);
  const bytes = s.mb * 1e6;
  const n = paquetes(bytes);
  const e = envios(n, s.per);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un archivo no viaja entero: se trocea en paquetes. Si se pierden, hay que reenviarlos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tamaño del archivo" value={s.mb} min={1} max={100} step={1} unit=" MB" color={MANIM.blue} onChange={(mb) => setS((x) => ({ ...x, mb }))} />
          <Slider label="Paquetes perdidos en la red" value={s.per} min={0} max={20} step={1} unit=" %" color={MANIM.red} onChange={(per) => setS((x) => ({ ...x, per }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Paquetes de 1 460 bytes">{fmtEs(n, 0)}</Stat>
        <Stat color={MANIM.orange} label="Envíos totales (con reenvíos)">{fmtEs(e, 0)}</Stat>
        <Stat color={MANIM.red} label="Paquetes extra por pérdidas">{fmtEs(e - n, 0)}</Stat>
      </Readout>
      <Note>Internet divide la información en paquetes con una cabecera (origen, destino, orden). Cada paquete puede seguir una ruta distinta y el receptor los reordena. Si alguno se pierde, el protocolo TCP lo pide de nuevo: con muchas pérdidas, la conexión va más lenta.</Note>
    </Frame>
  );
}

/* ───────────── 6. Internet de las cosas: batería de un sensor ───────────── */

export function BateriaIotExplorador({ block }: { block: ToolBlock }) {
  const init = { mAh: Math.round(num(block.params?.a, 2000, 200, 5000) / 100) * 100, int: Math.round(num(block.params?.b, 10, 1, 60)), act: 3, ma: 80, sl: 10 };
  const [s, setS] = useState(init);
  const r = vidaBateria(s.mAh, s.int, s.act, s.ma, s.sl);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un sensor IoT duerme casi todo el tiempo y se despierta para enviar un dato. Cambia el intervalo y mira la autonomía."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Capacidad de la batería" value={s.mAh} min={200} max={5000} step={100} unit=" mAh" color={MANIM.green} onChange={(mAh) => setS((x) => ({ ...x, mAh }))} />
          <Slider label="Envía un dato cada" value={s.int} min={1} max={60} step={1} unit=" min" color={MANIM.blue} onChange={(int) => setS((x) => ({ ...x, int }))} />
          <Slider label="Tiempo despierto en cada envío" value={s.act} min={1} max={30} step={1} unit=" s" color={MANIM.orange} onChange={(act) => setS((x) => ({ ...x, act }))} />
          <Slider label="Consumo despierto" value={s.ma} min={20} max={200} step={10} unit=" mA" color={MANIM.red} onChange={(ma) => setS((x) => ({ ...x, ma }))} />
          <Slider label="Consumo durmiendo" value={s.sl} min={1} max={500} step={1} unit=" µA" color={MANIM.purple} onChange={(sl) => setS((x) => ({ ...x, sl }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Consumo medio">{fmtEs(r.mediaMa, 3)} mA</Stat>
        <Stat color={MANIM.green} label="Autonomía de la batería (aprox.)">{r.dias >= 365 ? `${f1(r.dias / 365)} años` : `${fmtEs(r.dias, 0)} días`}</Stat>
        <Stat color={MANIM.blue} label="Datos enviados al día">{fmtEs((24 * 60) / s.int, 0)}</Stat>
      </Readout>
      <Note>Autonomía = capacidad ÷ consumo medio. Para que un sensor dure meses o años, debe estar en reposo casi siempre (modo de bajo consumo) y transmitir lo justo. Un intervalo mayor entre mediciones multiplica la duración. Valores orientativos.</Note>
    </Frame>
  );
}

/* ───────────── 7. Seguridad: contraseña de la red ───────────── */

export function ClaveWifiExplorador({ block }: { block: ToolBlock }) {
  const init = { j: Math.round(num(block.params?.n, 0, 0, 3)), l: Math.round(num(block.params?.a, 6, 4, 20)) };
  const [s, setS] = useState(init);
  const J = JUEGOS_CARACTERES[s.j]!;
  const c = combinacionesClave(J.t, s.l);
  const seg = segundosFuerzaBruta(c);
  const col = seg < 3600 ? MANIM.red : seg < 86400 * 365 * 100 ? MANIM.yellow : MANIM.green;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cuanto más larga es una contraseña y más tipos de caracteres usa, más tarda un atacante en probarlas todas. Hipótesis: mil millones de intentos por segundo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Caracteres que usa" items={JUEGOS_CARACTERES.map((x, value) => ({ value, label: x.n }))} value={s.j} onChange={(j) => setS((x) => ({ ...x, j }))} />
          <Slider label="Longitud de la contraseña" value={s.l} min={4} max={20} step={1} unit=" caracteres" color={MANIM.blue} onChange={(l) => setS((x) => ({ ...x, l }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Combinaciones posibles">{c >= 1e15 ? c.toExponential(2).replace(".", ",") : fmtEs(c, 0)}</Stat>
        <Stat color={col} label="Tiempo medio para adivinarla (a 10⁹ intentos/s)">{formatoLargo(seg)}</Stat>
      </Readout>
      <Note>El número de combinaciones es (caracteres posibles) elevado a la longitud: cada carácter extra multiplica el esfuerzo. Una frase larga fácil de recordar es mejor que una palabra corta con símbolos. Usa además WPA2 o WPA3 en el Wi-Fi y cambia la clave que trae el router por defecto.</Note>
    </Frame>
  );
}
