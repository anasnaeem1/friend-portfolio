export const THEME_STORAGE_KEY = "theme";
export const THEME_DARK = "dark";
export const THEME_LIGHT = "light";
export const CLASS_DARK = "theme-dark";
export const CLASS_LIGHT = "theme-light";

/** @returns {typeof CLASS_DARK | typeof CLASS_LIGHT} */
export function getPreferredThemeClass() {
  if (typeof window === "undefined") return CLASS_LIGHT;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === THEME_LIGHT) return CLASS_LIGHT;
  if (stored === THEME_DARK) return CLASS_DARK;
  return CLASS_LIGHT;
}

/** @param {typeof CLASS_DARK | typeof CLASS_LIGHT} className */
export function applyThemeClass(className) {
  const root = document.documentElement;
  root.classList.remove(CLASS_DARK, CLASS_LIGHT);
  root.classList.add(className);
  localStorage.setItem(THEME_STORAGE_KEY, className === CLASS_LIGHT ? THEME_LIGHT : THEME_DARK);
}

/** @returns {typeof CLASS_DARK | typeof CLASS_LIGHT} */
export function toggleThemeClass() {
  const root = document.documentElement;
  const next = root.classList.contains(CLASS_LIGHT) ? CLASS_DARK : CLASS_LIGHT;
  applyThemeClass(next);
  return next;
}
