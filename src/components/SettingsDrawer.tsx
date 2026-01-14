// src/components/SettingsDrawer.tsx
import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Switch,
  Typography,
  Divider,
  Tooltip,
  Paper,
  useTheme,
  alpha,
  Zoom,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Close as CloseIcon,
  Palette as PaletteIcon,
} from "@mui/icons-material";
import { useThemeContext } from "../context/useThemeContext"; // ✅ استيراد صحيح
import { PRESETS_DATA } from "../context/ThemeTypes"; // ✅ استيراد صحيح

export default function SettingsDrawer() {
  const { mode, toggleColorMode, preset, setPreset } = useThemeContext();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Tooltip title="Customize Theme" TransitionComponent={Zoom} arrow>
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            left: 20,
            bottom: 30,
            zIndex: (t) => t.zIndex.drawer + 1,
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(8px)",
            border: "1px solid",
            borderColor: "divider",
            color: "primary.main",
            "&:hover": {
              transform: "rotate(90deg) scale(1.1)",
              bgcolor: "primary.main",
              color: "#fff",
            },
            transition: "all 0.3s",
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            bgcolor: alpha(theme.palette.background.default, 0.9),
            backdropFilter: "blur(12px)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <PaletteIcon color="primary" />
              <Typography variant="h6" fontWeight={900}>
                Configuration
              </Typography>
            </Stack>
            <IconButton onClick={() => setOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="subtitle2"
            sx={{ mb: 2, fontWeight: 800, opacity: 0.6 }}
          >
            APPEARANCE
          </Typography>
          <Paper
            variant="outlined"
            sx={{ p: 2, mb: 4, borderRadius: 3, bgcolor: "transparent" }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontWeight={700}>
                {mode === "dark" ? "Dark Mode" : "Light Mode"}
              </Typography>
              <Switch checked={mode === "dark"} onChange={toggleColorMode} />
            </Stack>
          </Paper>

          <Typography
            variant="subtitle2"
            sx={{ mb: 2, fontWeight: 800, opacity: 0.6 }}
          >
            COLOR PALETTES
          </Typography>
          <Stack spacing={1.5}>
            {PRESETS_DATA.map((p) => (
              <Box
                key={p.name}
                onClick={() => setPreset(p.name)}
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "2px solid",
                  transition: "0.2s",
                  borderColor: preset === p.name ? p.color : "transparent",
                  bgcolor:
                    preset === p.name
                      ? alpha(p.color, 0.1)
                      : alpha(theme.palette.divider, 0.05),
                  "&:hover": { bgcolor: alpha(p.color, 0.15) },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: p.color,
                      borderRadius: "50%",
                      boxShadow: `0 0 10px ${alpha(p.color, 0.5)}`,
                    }}
                  />
                  <Typography fontWeight={preset === p.name ? 800 : 600}>
                    {p.label}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
