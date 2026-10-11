"use client";

import Image from "next/image";

const GALLERY_ITEMS = [
  {
    src: "/lesson/numeracion/historia/primitivo.png",
    alt: "Ilustración del hombre primitivo contando con marcas",
    label: "Hombre primitivo",
  },
  {
    src: "/lesson/numeracion/historia/egipcios.png",
    alt: "Símbolos del sistema de numeración egipcio",
    label: "Egipcios",
  },
  {
    src: "/lesson/numeracion/historia/romanos.png",
    alt: "Letras del sistema de numeración romano",
    label: "Romanos",
  },
] as const;

export function HistoriaNumeracionIllustrations() {
  return (
    <div
      className="grid grid-cols-3 gap-4 sm:gap-6"
      role="group"
      aria-label="Tres sistemas históricos de numeración"
    >
      {GALLERY_ITEMS.map((item) => (
        <figure key={item.label} className="m-0 flex flex-col gap-2">
          <figcaption className="text-center text-sm font-semibold text-[color:var(--stage-ink,#e8edf5)] sm:text-base">
            {item.label}
          </figcaption>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-contain object-center"
              sizes="(min-width: 768px) 280px, 30vw"
            />
          </div>
        </figure>
      ))}
    </div>
  );
}
