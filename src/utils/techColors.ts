// src/utils/techColors.ts
export type TechStyle = { bg: string; fg: string };

const TECH_COLORS: Record<string, TechStyle> = {
  react: { bg: "#E8F5FE", fg: "#1976d2" },
  "react router": { bg: "#FFEBEE", fg: "#c62828" },
  "react router dom": { bg: "#FFEBEE", fg: "#c62828" },
  typescript: { bg: "#E3F2FD", fg: "#1565c0" },
  javascript: { bg: "#FFF8E1", fg: "#f57f17" },
  html: { bg: "#FFF3E0", fg: "#e65100" },
  css: { bg: "#E3F2FD", fg: "#0d47a1" },
  "sass (scss)": { bg: "#FCE4EC", fg: "#ad1457" },
  tailwind: { bg: "#E0F7FA", fg: "#006064" },
  "tailwind css": { bg: "#E0F7FA", fg: "#006064" },
  bootstrap: { bg: "#EDE7F6", fg: "#4527a0" },
  mui: { bg: "#E3F2FD", fg: "#1976d2" },
  "material ui": { bg: "#E3F2FD", fg: "#1976d2" },
  redux: { bg: "#F3E5F5", fg: "#7b1fa2" },
  "redux toolkit": { bg: "#EDE7F6", fg: "#6a1b9a" },
  axios: { bg: "#E8EAF6", fg: "#283593" },
  dexie: { bg: "#E0F2F1", fg: "#004d40" },
  indexeddb: { bg: "#E0F2F1", fg: "#00695c" },
  "local storage": { bg: "#FFFDE7", fg: "#f9a825" },
  i18next: { bg: "#E1F5FE", fg: "#0277bd" },
  "framer motion": { bg: "#F3E5F5", fg: "#6a1b9a" },
  "dark/light mode": { bg: "#ECEFF1", fg: "#455a64" },
  "c# fundamentals": { bg: "#EDE7F6", fg: "#512da8" },
  git: { bg: "#FFEBEE", fg: "#c62828" },
  github: { bg: "#ECEFF1", fg: "#263238" },
  npm: { bg: "#FFEBEE", fg: "#b71c1c" },
  "visual studio": { bg: "#F3E5F5", fg: "#6a1b9a" },
  "vs code": { bg: "#E3F2FD", fg: "#1e88e5" },
  postman: { bg: "#FFF3E0", fg: "#ef6c00" },
  vite: { bg: "#F3E5F5", fg: "#7b1fa2" },
  authentication: { bg: "#E8F5E9", fg: "#2e7d32" },
  performance: { bg: "#E8EAF6", fg: "#3949ab" },
  responsive: { bg: "#E0F7FA", fg: "#006064" },
  calculator: { bg: "#E8F5E9", fg: "#2e7d32" },
};

const FALLBACKS: TechStyle[] = [
  { bg: "#E3F2FD", fg: "#1565c0" },
  { bg: "#FCE4EC", fg: "#ad1457" },
  { bg: "#E8F5E9", fg: "#2e7d32" },
  { bg: "#FFF8E1", fg: "#f57f17" },
  { bg: "#E0F2F1", fg: "#00796b" },
  { bg: "#EDE7F6", fg: "#5e35b1" },
  { bg: "#E1F5FE", fg: "#0277bd" },
  { bg: "#FFF3E0", fg: "#ef6c00" },
  { bg: "#ECEFF1", fg: "#37474f" },
];

function hashToIndex(str: string, mod: number) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h) % mod;
}

/** ارجع ستايل ثابت لكل تقنية */
export function getTechChipSx(name: string) {
  const key = name.toLowerCase().trim();
  const style =
    TECH_COLORS[key] ?? FALLBACKS[hashToIndex(key, FALLBACKS.length)];
  return {
    bgcolor: style.bg,
    color: style.fg,
    borderColor: style.fg,
    "& .MuiChip-icon": { color: style.fg },
  } as const;
}
