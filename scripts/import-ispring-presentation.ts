import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import { join } from "path";
import { presentationSchema } from "../src/lib/presentation-schema";

const SOURCE_DIR = join(
  process.cwd(),
  "1 ESO/Tema 1 - Numeros naturales/1. Introduccion a los números naturales (Published)",
);
const SLUG = "numeros-naturales-intro";
const PUBLIC_DIR = join(process.cwd(), "public/presentaciones", SLUG);
const CONTENT_DIR = join(process.cwd(), "content/presentations");

function extractSlideHtml(js: string): string {
  const marker = "loadHandler&&loadHandler(";
  const markerIdx = js.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error("No se encontró el marcador loadHandler en el archivo JS");
  }

  const afterMarker = js.slice(markerIdx + marker.length);
  const firstQuote = afterMarker.indexOf("'");
  if (firstQuote === -1) {
    throw new Error("No se encontró el HTML de la diapositiva");
  }

  let html = "";
  for (let i = firstQuote + 1; i < afterMarker.length; i++) {
    const ch = afterMarker[i];
    if (ch === "\\") {
      html += afterMarker[i + 1] ?? "";
      i++;
    } else if (ch === "'") {
      break;
    } else {
      html += ch;
    }
  }

  return html;
}

function processSlideCss(css: string): string {
  return css.replace(/display\s*:\s*none/gi, "display:block");
}

function rewriteAssetPaths(html: string, assetBase: string): string {
  return html.replace(/src="data\//g, `src="${assetBase}/`);
}

function importPresentation(): void {
  const dataDir = join(SOURCE_DIR, "data");
  if (!existsSync(dataDir)) {
    console.error(`No existe el directorio de datos: ${dataDir}`);
    process.exit(1);
  }

  const assetBase = `/presentaciones/${SLUG}/data`;
  mkdirSync(PUBLIC_DIR, { recursive: true });
  cpSync(dataDir, join(PUBLIC_DIR, "data"), { recursive: true });

  for (const file of ["player.js", "browsersupport.js", "html5-unsupported.html"]) {
    const filePath = join(PUBLIC_DIR, "data", file);
    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }
  }

  const slideFiles = readdirSync(dataDir)
    .filter((file) => /^slide\d+\.js$/.test(file))
    .sort((a, b) => {
      const numA = Number(a.match(/\d+/)?.[0] ?? 0);
      const numB = Number(b.match(/\d+/)?.[0] ?? 0);
      return numA - numB;
    });

  const slides = slideFiles.map((file, index) => {
    const js = readFileSync(join(dataDir, file), "utf-8");
    const cssFile = file.replace(".js", ".css");
    const cssPath = join(dataDir, cssFile);
    const css = existsSync(cssPath)
      ? processSlideCss(readFileSync(cssPath, "utf-8"))
      : "";

    const html = rewriteAssetPaths(extractSlideHtml(js), assetBase);

    return {
      id: `slide-${index + 1}`,
      title: `Diapositiva ${index + 1}`,
      html,
      css,
    };
  });

  const presentation = presentationSchema.parse({
    slug: SLUG,
    title: "Introducción a los números naturales",
    description:
      "Presentación del tema: origen de los naturales, sistema decimal, valor posicional y redondeo.",
    lessonSlug: SLUG,
    assetBase,
    width: 1280,
    height: 720,
    slides,
  });

  mkdirSync(CONTENT_DIR, { recursive: true });
  writeFileSync(
    join(CONTENT_DIR, `${SLUG}.json`),
    `${JSON.stringify(presentation, null, 2)}\n`,
  );

  const indexPath = join(CONTENT_DIR, "index.json");
  const index = {
    presentations: [
      {
        slug: SLUG,
        title: presentation.title,
        description: presentation.description,
        lessonSlug: SLUG,
        slideCount: slides.length,
        estimatedMinutes: 8,
      },
    ],
  };
  writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);

  console.log(
    `✓ Presentación importada: ${SLUG} (${slides.length} diapositivas)`,
  );
  console.log(`  Manifiesto: content/presentations/${SLUG}.json`);
  console.log(`  Assets: public/presentaciones/${SLUG}/data/`);
}

importPresentation();
