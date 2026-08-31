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
  .promo-link,
  .free-logo,
  .final-slide,
  .top-panel,
  .bottom-panel,
  .landscape-bottom-panel,
  .universal-side-panel,
  .universal-control-panel,
  .show-side-panel-button,
  .launch-screen,
  .menu_layer,
  .trial_banner {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  html,
  body,
  #content,
  #playerView {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: #dcdee0 !important;
  }

  .universal,
  .universal.universal_webkit,
  .universal.side-panel-hidden {
    background: transparent !important;
  }

  .universal .universal__main-container,
  .universal.side-panel-hidden .universal__main-container {
    width: 100% !important;
    left: 0 !important;
    margin: 0 !important;
  }
</style>
`;

const EMBED_PLAYER_INIT = `
				function onPlayerInit(playerWrapper)
				{
					var player = playerWrapper.wt ? playerWrapper.wt() : playerWrapper;

					var preloader = document.getElementById("preloader");
					if (preloader && preloader.parentNode) {
						preloader.parentNode.removeChild(preloader);
					}

					document.querySelectorAll(".universal").forEach(function (el) {
						el.classList.add("side-panel-hidden");
					});

					function isFinalSlide() {
						try {
							var slide = player.currentSlide && player.currentSlide();
							return !!(slide && slide.li && slide.li());
						} catch (e) {
							return false;
						}
					}

					function leaveFinalSlide() {
						if (!isFinalSlide()) return;
						var idx = player.currentSlideIndex && player.currentSlideIndex();
						if (typeof idx === "number" && idx > 0 && player.gotoSlide) {
							player.gotoSlide(idx - 1);
						}
					}

					if (player.slideChangeEvent) {
						player.slideChangeEvent().addHandler(leaveFinalSlide);
					}

					if (player.gotoNextSlide) {
						var originalNext = player.gotoNextSlide.bind(player);
						player.gotoNextSlide = function () {
							originalNext();
							leaveFinalSlide();
						};
					}

					if (typeof MutationObserver !== "undefined") {
						var observer = new MutationObserver(function () {
							document.querySelectorAll(".final-slide, .free-logo").forEach(function (el) {
								el.style.display = "none";
							});
							leaveFinalSlide();
						});
						observer.observe(document.body, { childList: true, subtree: true });
					}
				}`;

function countSlides(dataDir: string): number {
  return readdirSync(dataDir).filter((file) => /^slide\d+\.js$/.test(file)).length;
}

function buildEmbedHtml(sourceHtml: string): string {
  let html = sourceHtml.replace(
    /function onPlayerInit\(player\)\s*\{[\s\S]*?\n\t\t\t\t\}/,
    EMBED_PLAYER_INIT.trim(),
  );

  if (html.includes("</head>")) {
    html = html.replace("</head>", `${EMBED_OVERRIDES}</head>`);
  } else {
    html = `${EMBED_OVERRIDES}${html}`;
  }

  return html;
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
