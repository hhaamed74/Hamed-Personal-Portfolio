import {
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { useThemeContext } from "../context/useThemeContext";

// ✅ أضفنا emerald هنا في الـ Type
type Preset = "default" | "rose" | "grape" | "emerald";

const SWATCH: Record<
  Preset,
  { primary: string; secondary: string; label: string }
> = {
  default: { primary: "#1e88e5", secondary: "#9c27b0", label: "Default" },
  rose: { primary: "#e91e63", secondary: "#f06292", label: "Rose" },
  grape: { primary: "#7e57c2", secondary: "#8e24aa", label: "Grape" },
  // ✅ أضفنا Emerald هنا عشان الزراير تظهر
  emerald: { primary: "#10b981", secondary: "#059669", label: "Emerald" },
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
      sx={{ bgcolor: "background.paper" }}
    >
      {(Object.keys(SWATCH) as Preset[]).map((key) => (
        <ToggleButton key={key} value={key} aria-label={SWATCH[key].label}>
          <Tooltip title={SWATCH[key].label}>
            {/* Box لضمان عمل الـ Tooltip حتى لو الـ Button Disabled */}
            <Box component="span">
              <ColorSwatch p={SWATCH[key].primary} s={SWATCH[key].secondary} />
            </Box>
          </Tooltip>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
