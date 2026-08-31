import { cpSync, existsSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";

const SOURCE_DIR = join(
  process.cwd(),
  "1 ESO/Tema 1 - Numeros naturales/1. Introduccion a los números naturales (Published)",
);
const SLUG = "numeros-naturales-intro";
const PUBLIC_DIR = join(process.cwd(), "public/presentaciones", SLUG, "data");

const IMAGE_PATTERN = /\.(png|jpe?g|gif|webp|svg)$/i;

function copyPresentationAssets() {
  const sourceDataDir = join(SOURCE_DIR, "data");

  if (!existsSync(sourceDataDir)) {
    console.error(`No se encontró la carpeta de origen: ${sourceDataDir}`);
    process.exit(1);
  }

  mkdirSync(PUBLIC_DIR, { recursive: true });

  const files = readdirSync(sourceDataDir).filter((file) =>
    IMAGE_PATTERN.test(file),
  );

  if (files.length === 0) {
    console.error("No se encontraron imágenes para copiar.");
    process.exit(1);
  }

  for (const file of files) {
    cpSync(join(sourceDataDir, file), join(PUBLIC_DIR, file), {
      force: true,
    });
  }

  console.log(
    `✓ Imágenes sincronizadas para ${SLUG}: ${files.length} archivos en public/presentaciones/${SLUG}/data/`,
  );
  console.log(
    "  El contenido de las diapositivas vive en content/presentations/numeros-naturales-intro.json",
  );
}

copyPresentationAssets();
