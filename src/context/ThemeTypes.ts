// src/context/ThemeTypes.ts
export type Mode = "light" | "dark";
export type Preset = "default" | "rose" | "grape" | "emerald";

export const PRESETS_DATA = [
  { name: "default", color: "#1e88e5", label: "Sky", secondary: "#9c27b0" },
  { name: "rose", color: "#e91e63", label: "Rose", secondary: "#ff80ab" },
  { name: "grape", color: "#7c4dff", label: "Grape", secondary: "#b388ff" },
  { name: "emerald", color: "#10b981", label: "Emerald", secondary: "#059669" },
] as const;
