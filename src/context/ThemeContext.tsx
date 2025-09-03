// src/context/ThemeContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  alpha,
} from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";

type Mode = "light" | "dark";
type Preset = "default" | "rose" | "grape";

type ThemeCtx = {
  mode: Mode;
  toggleColorMode: () => void;
  preset: Preset;
  setPreset: (p: Preset) => void;
};

const ThemeContext = createContext<ThemeCtx>({
  mode: "light",
  toggleColorMode: () => {},
  preset: "default",
  setPreset: () => {},
});

function getPalette(mode: Mode, preset: Preset) {
  const presets = {
    default: { primary: "#1e88e5", secondary: "#9c27b0" },
    rose: { primary: "#e91e63", secondary: "#ff80ab" },
    grape: { primary: "#7c4dff", secondary: "#b388ff" },
  } as const;

  const { primary, secondary } = presets[preset];

  return {
    mode,
    primary: { main: primary },
    secondary: { main: secondary },
    background: {
      default: mode === "light" ? "#fafafa" : "#0d0f13",
      paper: mode === "light" ? "#ffffff" : "#12151b",
    },
  };
}

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;

  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("color-mode") as Mode | null;
    return saved ?? (prefersDark ? "dark" : "light");
  });

  const [preset, setPresetState] = useState<Preset>(() => {
    const saved = localStorage.getItem("theme-preset") as Preset | null;
    return saved ?? "default";
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
        typography: {
          fontFamily: "Orbitron, Inter, Roboto, system-ui, Arial, sans-serif",
        },
        components: {
          MuiButton: { defaultProps: { disableElevation: true } },
          MuiAppBar: { defaultProps: { color: "default" } },
          MuiPaper: {
            styleOverrides: {
              root: { transition: "background-color .2s ease" },
            },
          },
        },
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
          styles={(t) => {
            const thumb = alpha(t.palette.primary.main, 0.7);
            const thumbHover = t.palette.primary.main;
            const track = t.palette.mode === "dark" ? "#0a0c10" : "#f1f1f1";

            return {
              /* Firefox */
              "*": {
                scrollbarWidth: "thin",
                scrollbarColor: `${thumb} transparent`,
              },

              "html, body": {
                scrollBehavior: "smooth",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              },

              /* WebKit (Chrome/Edge/Safari/Opera) */
              "::-webkit-scrollbar": {
                width: 10,
                height: 10,
              },
              "::-webkit-scrollbar-track": {
                backgroundColor: track,
                borderRadius: 8,
              },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: thumb,
                borderRadius: 8,
                border: "2px solid transparent",
                backgroundClip: "content-box",
              },
              "::-webkit-scrollbar-thumb:hover": {
                backgroundColor: thumbHover,
              },

              ".scrollable": {
                overflow: "auto",
              },
            };
          }}
        />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => useContext(ThemeContext);
