import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
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

const EMBED_OVERRIDES = `
<style>
  #promoLink,
  .promo-link {
    display: none !important;
    visibility: hidden !important;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
`;

function countSlides(dataDir: string): number {
  return readdirSync(dataDir).filter((file) => /^slide\d+\.js$/.test(file)).length;
}

function buildEmbedHtml(sourceHtml: string): string {
  if (sourceHtml.includes("</head>")) {
    return sourceHtml.replace("</head>", `${EMBED_OVERRIDES}</head>`);
  }

  return `${EMBED_OVERRIDES}${sourceHtml}`;
}

function importPresentation(): void {
  const dataDir = join(SOURCE_DIR, "data");
  const indexPath = join(SOURCE_DIR, "index.html");

  if (!existsSync(dataDir)) {
    console.error(`No existe el directorio de datos: ${dataDir}`);
    process.exit(1);
  }

  if (!existsSync(indexPath)) {
    console.error(`No existe index.html en: ${SOURCE_DIR}`);
    process.exit(1);
  }

  const slideCount = countSlides(dataDir);
  if (slideCount === 0) {
    console.error("No se encontraron archivos slide*.js");
    process.exit(1);
  }

  mkdirSync(PUBLIC_DIR, { recursive: true });
  cpSync(dataDir, join(PUBLIC_DIR, "data"), { recursive: true });

  const sourceHtml = readFileSync(indexPath, "utf-8");
  writeFileSync(
    join(PUBLIC_DIR, "embed.html"),
    buildEmbedHtml(sourceHtml),
    "utf-8",
  );

  const embedUrl = `/presentaciones/${SLUG}/embed.html`;
  const presentation = presentationSchema.parse({
    slug: SLUG,
    title: "Introducción a los números naturales",
    description:
      "Presentación del tema: origen de los naturales, sistema decimal, valor posicional y redondeo.",
    lessonSlug: SLUG,
    embedUrl,
    width: 1280,
    height: 720,
    slideCount,
  });

  mkdirSync(CONTENT_DIR, { recursive: true });
  writeFileSync(
    join(CONTENT_DIR, `${SLUG}.json`),
    `${JSON.stringify(presentation, null, 2)}\n`,
  );

  writeFileSync(
    join(CONTENT_DIR, "index.json"),
    `${JSON.stringify(
      {
        presentations: [
          {
            slug: SLUG,
            title: presentation.title,
            description: presentation.description,
            lessonSlug: SLUG,
            slideCount,
            estimatedMinutes: 8,
          },
        ],
      },
      null,
      2,
    )}\n`,
  );

  console.log(
    `✓ Presentación importada: ${SLUG} (${slideCount} diapositivas, reproductor iSpring)`,
  );
  console.log(`  Manifiesto: content/presentations/${SLUG}.json`);
  console.log(`  Embed: public/presentaciones/${SLUG}/embed.html`);
}

importPresentation();
