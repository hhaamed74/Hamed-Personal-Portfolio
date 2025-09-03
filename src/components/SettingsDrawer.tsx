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
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  Close as CloseIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  ColorLens as ColorLensIcon,
} from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext";

export default function SettingsDrawer() {
  const { mode, toggleColorMode, preset, setPreset } = useThemeContext();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* زرار عائم على الجنب */}
      <Tooltip title="Settings">
        <IconButton
          onClick={() => setOpen(true)}
          size="large"
          sx={{
            position: "fixed",
            left: 18,
            bottom: 50,
            zIndex: (t) => t.zIndex.drawer + 1,
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
            boxShadow: 2,
            "&:hover": { bgcolor: "background.paper" },
          }}
          aria-label="Open settings"
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: { xs: 300, sm: 340 }, p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography variant="h6" fontWeight={800}>
              Settings
            </Typography>
            <IconButton
              onClick={() => setOpen(false)}
              aria-label="Close settings"
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 2 }} />

          {/* Theme Mode */}
          <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 1 }}
            >
              {mode === "dark" ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <LightModeIcon fontSize="small" />
              )}
              <Typography fontWeight={700}>Theme Mode</Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography sx={{ opacity: 0.8 }}>
                {mode === "dark" ? "Dark" : "Light"}
              </Typography>
              <Switch
                checked={mode === "dark"}
                onChange={toggleColorMode}
                inputProps={{ "aria-label": "Toggle dark mode" }}
              />
            </Stack>
          </Paper>

          {/* Presets */}
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 1 }}
            >
              <ColorLensIcon fontSize="small" />
              <Typography fontWeight={700}>Theme Preset</Typography>
            </Stack>

            <ToggleButtonGroup
              value={preset}
              exclusive
              onChange={(_, v) => v && setPreset(v)}
              fullWidth
              color="primary"
            >
              <ToggleButton value="default">
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: "#1e88e5",
                    borderRadius: "50%",
                    mr: 1,
                  }}
                />
                Default
              </ToggleButton>
              <ToggleButton value="rose">
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: "#e91e63",
                    borderRadius: "50%",
                    mr: 1,
                  }}
                />
                Rose
              </ToggleButton>
              <ToggleButton value="grape">
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: "#7c4dff",
                    borderRadius: "50%",
                    mr: 1,
                  }}
                />
                Grape
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        </Box>
      </Drawer>
    </>
  );
}
