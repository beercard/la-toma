export const PUBLIC_BASE_URL = import.meta.env.BASE_URL;

export const withPublicBaseUrl = (path: string) => {
  const base = PUBLIC_BASE_URL.endsWith("/") ? PUBLIC_BASE_URL : `${PUBLIC_BASE_URL}/`;
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${normalized}`;
};
