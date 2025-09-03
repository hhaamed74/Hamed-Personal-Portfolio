import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link as RouterLink, NavLink, useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Download as DownloadIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  PersonAddAlt as PersonAddAltIcon,
} from "@mui/icons-material";

import { useAppSelector } from "../redux/hooks";
import { useThemeContext } from "../context/ThemeContext";
import cvFile from "../assets/Hamed_AbdelMohsen.pdf"; // حط CV هنا

export default function Navbar() {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const { mode, toggleColorMode } = useThemeContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const linkSx = {
    "&.active": { textDecoration: "underline", textUnderlineOffset: "6px" },
  };

  const closeDrawerGo = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ gap: 1 }}>
          {/* موبايل: زر المنيو */}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "inline-flex", md: "none" }, mr: 1 }}
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
            sx={{ fontWeight: 800, letterSpacing: 1 }}
          >
            Hamed
          </Typography>

          {/* Links - Desktop */}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              ml: 3,
              flexWrap: "wrap",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button component={NavLink} to="/" sx={linkSx} color="inherit">
              Home
            </Button>
            <Button
              component={NavLink}
              to="/projects"
              sx={linkSx}
              color="inherit"
            >
              Projects
            </Button>
            <Button
              component={NavLink}
              to="/features"
              sx={linkSx}
              color="inherit"
            >
              Features
            </Button>
            <Button component={NavLink} to="/about" sx={linkSx} color="inherit">
              About
            </Button>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          {/* Download CV (Desktop) */}
          <Button
            component="a"
            href={cvFile}
            download
            variant="contained"
            startIcon={<DownloadIcon />}
            sx={{ display: { xs: "none", md: "inline-flex" }, mr: 1 }}
          >
            Download CV
          </Button>

          {/* Auth */}
          {!isAuthenticated ? (
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <Button
                component={NavLink}
                to="/login"
                sx={linkSx}
                color="inherit"
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
              <Button
                component={NavLink}
                to="/register"
                sx={linkSx}
                color="inherit"
                startIcon={<PersonAddAltIcon />}
              >
                Register
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                variant="body2"
                fontWeight={900}
                sx={{
                  opacity: 0.9,
                  display: { xs: "none", md: "inline" },
                  fontSize: { md: "1rem", lg: "1.5rem" },
                }}
              >
                {user?.username || "User"}
              </Typography>

              <Button
                component={NavLink}
                to="/logout"
                sx={{ display: { xs: "none", md: "inline-flex" } }}
                color="inherit"
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer - Mobile Menu */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 270, p: 1 }}>
          <Typography variant="h6" sx={{ px: 2, py: 1, fontWeight: 800 }}>
            Menu
          </Typography>
          <List>
            <ListItemButton onClick={() => closeDrawerGo("/")}>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton onClick={() => closeDrawerGo("/projects")}>
              <ListItemText primary="Projects" />
            </ListItemButton>
            <ListItemButton onClick={() => closeDrawerGo("/features")}>
              <ListItemText primary="Features" />
            </ListItemButton>
            <ListItemButton onClick={() => closeDrawerGo("/about")}>
              <ListItemText primary="About" />
            </ListItemButton>
          </List>

          <Divider sx={{ my: 1 }} />

          <List>
            <ListItemButton component="a" href={cvFile} download>
              <DownloadIcon fontSize="small" />
              <ListItemText sx={{ ml: 1 }} primary="Download CV" />
            </ListItemButton>

            <ListItemButton onClick={toggleColorMode}>
              {mode === "dark" ? (
                <LightModeIcon fontSize="small" />
              ) : (
                <DarkModeIcon fontSize="small" />
              )}
              <ListItemText
                sx={{ ml: 1 }}
                primary={mode === "dark" ? "Light Mode" : "Dark Mode"}
              />
            </ListItemButton>
          </List>

          <Divider sx={{ my: 1 }} />

          {!isAuthenticated ? (
            <List>
              <ListItemButton onClick={() => closeDrawerGo("/login")}>
                <LoginIcon fontSize="small" />
                <ListItemText sx={{ ml: 1 }} primary="Login" />
              </ListItemButton>
              <ListItemButton onClick={() => closeDrawerGo("/register")}>
                <PersonAddAltIcon fontSize="small" />
                <ListItemText sx={{ ml: 1 }} primary="Register" />
              </ListItemButton>
            </List>
          ) : (
            <List>
              <ListItemButton onClick={() => closeDrawerGo("/logout")}>
                <LogoutIcon fontSize="small" />
                <ListItemText
                  sx={{ ml: 1 }}
                  primary={`Logout (${user?.username ?? "User"})`}
                />
              </ListItemButton>
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
}
