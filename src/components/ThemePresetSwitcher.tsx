import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";

type Preset = "default" | "rose" | "grape";

// ألوان المعاينة (light mode) — بس للعرض داخل الزر
const SWATCH: Record<
  Preset,
  { primary: string; secondary: string; label: string }
> = {
  default: { primary: "#1e88e5", secondary: "#9c27b0", label: "Default" },
  rose: { primary: "#e91e63", secondary: "#f06292", label: "Rose" },
  grape: { primary: "#7e57c2", secondary: "#8e24aa", label: "Grape" },
};

function ColorSwatch({ p, s }: { p: string; s: string }) {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor: p,
          boxShadow: 1,
        }}
      />
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          bgcolor: s,
          boxShadow: 1,
        }}
      />
    </Stack>
  );
}

export default function ThemePresetSwitcher() {
  const { preset, setPreset } = useThemeContext();

  return (
    <ToggleButtonGroup
      size="small"
      value={preset}
      exclusive
      onChange={(_, v) => v && setPreset(v)}
      aria-label="Theme preset"
    >
      {(Object.keys(SWATCH) as Preset[]).map((key) => (
        <ToggleButton key={key} value={key} aria-label={SWATCH[key].label}>
          <Tooltip title={SWATCH[key].label}>
            <span>
              <ColorSwatch p={SWATCH[key].primary} s={SWATCH[key].secondary} />
            </span>
          </Tooltip>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
