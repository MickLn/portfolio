/// <reference types="vite/client" />

/**
 * Résout proprement le chemin d'un asset public pour supporter
 * à la fois le développement local et GitHub Pages (sous-dossier /portfolio/).
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:')
  ) {
    return path;
  }
  const baseUrl = (import.meta as any).env?.BASE_URL || './';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};
