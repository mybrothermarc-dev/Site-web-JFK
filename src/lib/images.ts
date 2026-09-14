import type { ImageMetadata } from 'astro';

/**
 * Toutes les photos ajoutées via l'admin vivent dans src/assets/images/.
 * Vite les indexe ici pour qu'Astro puisse les redimensionner et les convertir
 * au moment de la publication (une photo de téléphone de 4 Mo devient ~150 Ko).
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true }
);

const MARKER = 'assets/images/';

const byPath = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  byPath.set(path.slice(path.indexOf(MARKER)), mod.default);
}

/**
 * Transforme le chemin enregistré par l'admin en image optimisable.
 * Renvoie undefined s'il n'y a pas de photo : l'appelant affiche alors l'image provisoire.
 */
export function resolveImage(stored?: string | null): ImageMetadata | undefined {
  if (!stored) return undefined;
  const clean = decodeURI(stored);
  const index = clean.indexOf(MARKER);
  return index === -1 ? undefined : byPath.get(clean.slice(index));
}
