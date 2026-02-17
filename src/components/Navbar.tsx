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
  ListItemIcon,
  useTheme,
} from "@mui/material";
import { Link as RouterLink, NavLink, useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Download as DownloadIcon,
  Logout as LogoutIcon,
  Login as LoginIcon, // تم استخدامها بالأسفل
  PersonAddAlt as PersonAddAltIcon, // تم استخدامها بالأسفل
  Home as HomeIcon,
  Code as ProjectsIcon,
  Star as FeaturesIcon,
  Info as AboutIcon,
  AccountCircle as UserIcon,
} from "@mui/icons-material";

import { useAppSelector } from "../redux/hooks";
import { useThemeContext } from "../context/useThemeContext";
import cvFile from "../assets/Hamed_AbdelMohsen_FullStack.pdf";

export default function Navbar() {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  const { mode, toggleColorMode } = useThemeContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  // --- Styles ---
  const navLinkStyle = {
    fontWeight: 600,
    textTransform: "none",
    fontSize: "0.95rem",
    px: 2,
    position: "relative",
    "&.active": {
      color: theme.palette.primary.main,
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 8,
        left: "20%",
        right: "20%",
        height: "2px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "2px",
      },
    },
  };

  const closeDrawerGo = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          color: "text.primary",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 5 } }}>
          {/* Left Side: Logo & Menu (Mobile) */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                color: "inherit",
              }}
              edge="start"
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h5"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.5,
                textDecoration: "none",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
              }}
            >
              HAMED
            </Typography>

            {/* Desktop Navigation Links */}
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ display: { xs: "none", md: "flex" }, ml: 4 }}
            >
              {[
                { name: "Home", path: "/" },
                { name: "Projects", path: "/projects" },
                { name: "Features", path: "/features" },
                { name: "Services", path: "/services" },
                { name: "About", path: "/about" },
              ].map((link) => (
                <Button
                  key={link.path}
                  component={NavLink}
                  to={link.path}
                  sx={navLinkStyle}
                  color="inherit"
                >
                  {link.name}
                </Button>
              ))}
            </Stack>
          </Stack>

          {/* Right Side: Actions */}
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              onClick={toggleColorMode}
              color="inherit"
              sx={{ display: { xs: "none", md: "inline-flex" } }}
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <Button
              component="a"
              href={cvFile}
              download
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              sx={{
                display: { xs: "none", lg: "inline-flex" },
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              CV
            </Button>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 1, display: { xs: "none", md: "block" } }}
            />

            {!isAuthenticated ? (
              <Stack direction="row" spacing={1}>
                <Button
                  component={NavLink}
                  to="/login"
                  color="inherit"
                  sx={{
                    display: { xs: "none", md: "inline-flex" },
                    fontWeight: 600,
                  }}
                >
                  Login
                </Button>
                <Button
                  component={NavLink}
                  to="/register"
                  variant="contained"
                  sx={{
                    display: { xs: "none", md: "inline-flex" },
                    borderRadius: 2,
                  }}
                >
                  Join
                </Button>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <UserIcon color="primary" fontSize="small" />
                  <Typography variant="subtitle2" fontWeight={800}>
                    {user?.username}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => navigate("/logout")}
                  color="error"
                  size="small"
                  sx={{ display: { xs: "none", md: "inline-flex" } }}
                >
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer - Mobile Menu */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 280, p: 2 } }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: 900, color: "primary.main" }}
        >
          NAVIGATION
        </Typography>

        <List sx={{ mb: "auto" }}>
          {[
            { text: "Home", icon: <HomeIcon />, path: "/" },
            { text: "Projects", icon: <ProjectsIcon />, path: "/projects" },
            { text: "Features", icon: <FeaturesIcon />, path: "/features" },
            { text: "Services", icon: <FeaturesIcon />, path: "/services" },
            { text: "About", icon: <AboutIcon />, path: "/about" },
          ].map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => closeDrawerGo(item.path)}
              sx={{ borderRadius: 2 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />

        <List>
          <ListItemButton
            component="a"
            href={cvFile}
            download
            sx={{ borderRadius: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <DownloadIcon />
            </ListItemIcon>
            <ListItemText primary="Download CV" />
          </ListItemButton>

          <ListItemButton onClick={toggleColorMode} sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </ListItemIcon>
            <ListItemText
              primary={mode === "dark" ? "Light Mode" : "Dark Mode"}
            />
          </ListItemButton>
        </List>

        <Box sx={{ mt: "auto", pt: 2 }}>
          {!isAuthenticated ? (
            <Stack spacing={1}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LoginIcon />} // تم الاستخدام هنا
                onClick={() => closeDrawerGo("/login")}
                sx={{ borderRadius: 2 }}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="contained"
                startIcon={<PersonAddAltIcon />} // تم الاستخدام هنا
                onClick={() => closeDrawerGo("/register")}
                sx={{ borderRadius: 2 }}
              >
                Register
              </Button>
            </Stack>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={() => closeDrawerGo("/logout")}
              sx={{ borderRadius: 2 }}
            >
              Logout ({user?.username})
            </Button>
          )}
        </Box>
      </Drawer>
    </>
  );
}
