import { Routes, Route, Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import { AppThemeProvider } from "./context/ThemeContext";
import usePageMeta from "./hooks/usePageMeta";
import RequireAuth from "./meta/RequireAuth";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Features from "./pages/Features";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Footer from "./components/Footer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AuthRehydrate from "./services/AuthRehydrate";
import SettingsDrawer from "./components/SettingsDrawer";

// ⬇️ جديد
import RouteProgress from "./components/RouteProgress";

function Layout() {
  usePageMeta("Hamed");
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Outlet />
      </Container>
      <SettingsDrawer />

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AppThemeProvider>
      <AuthRehydrate />

      {/* ✅ شريط التقدّم الخاص بالتنقّل */}
      <RouteProgress />

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />

          <Route
            path="features"
            element={
              <RequireAuth>
                <Features />
              </RequireAuth>
            }
          />

          <Route
            path="privacy"
            element={
              <RequireAuth>
                <Privacy />
              </RequireAuth>
            }
          />
          <Route
            path="terms"
            element={
              <RequireAuth>
                <Terms />
              </RequireAuth>
            }
          />

          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />

          {/* وايلدكارد واحد للـ 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppThemeProvider>
  );
}
