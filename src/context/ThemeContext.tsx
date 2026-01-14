// src/context/ThemeContext.tsx
import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  alpha,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import type { Mode, Preset } from "./ThemeTypes";
import { PRESETS_DATA } from "./ThemeTypes";

type ThemeCtx = {
  mode: Mode;
  toggleColorMode: () => void;
  preset: Preset;
  setPreset: (p: Preset) => void;
};

// ✅ نقوم بتصدير الـ Context لاستخدامه في ملف الـ Hook فقط
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeCtx | undefined>(undefined);

// ... (دالة getPalette تبقى كما هي)
function getPalette(mode: Mode, preset: Preset) {
  const selected =
    PRESETS_DATA.find((p) => p.name === preset) || PRESETS_DATA[0];
  return {
    mode,
    primary: { main: selected.color },
    secondary: { main: selected.secondary },
    background: {
      default: mode === "light" ? "#fafafa" : "#0d0f13",
      paper: mode === "light" ? "#ffffff" : "#12151b",
    },
  };
}

// ✅ الملف الآن يصدر Component فقط، وهذا ما يريده Fast Refresh
export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("color-mode") as Mode | null;
    return saved ?? "light";
  });

  const [preset, setPresetState] = useState<Preset>(() => {
    const saved = localStorage.getItem("theme-preset") as Preset | null;
    return saved && PRESETS_DATA.some((p) => p.name === saved)
      ? saved
      : "default";
  });

  useEffect(() => localStorage.setItem("color-mode", mode), [mode]);
  useEffect(() => localStorage.setItem("theme-preset", preset), [preset]);

  const toggleColorMode = () =>
    setMode((m) => (m === "light" ? "dark" : "light"));
  const setPreset = (p: Preset) => setPresetState(p);

  const theme = useMemo(
    () =>
      createTheme({
        palette: getPalette(mode, preset),
        shape: { borderRadius: 12 },
        typography: { fontFamily: "Orbitron, Inter, sans-serif" },
      }),
    [mode, preset]
  );

  const value = useMemo(
    () => ({ mode, toggleColorMode, preset, setPreset }),
    [mode, preset]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={(t) => ({
            "::-webkit-scrollbar": { width: 8 },
            "::-webkit-scrollbar-track": {
              backgroundColor:
                t.palette.mode === "dark" ? "#0a0c10" : "#f1f1f1",
            },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: alpha(t.palette.primary.main, 0.6),
              borderRadius: 8,
            },
          })}
        />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
