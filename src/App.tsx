import { Routes, Route, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import { AppThemeProvider } from "./context/ThemeContext";
import usePageMeta from "./hooks/usePageMeta";
import RequireAuth from "./meta/RequireAuth";

// Pages
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

// Components
import RouteProgress from "./components/RouteProgress";

/**
 * الـ Layout الأساسي للموقع
 * تم استبدال Container بـ Box لمنع تداخل الحاويات (Double Containers)
 * ولضمان أن كل صفحة تتحكم في الـ Padding الخاص بها بشكل كامل
 */
function Layout() {
  usePageMeta("Hamed | Portfolio");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden", // لضمان عدم حدوث Scroll عرضي نهائياً
      }}
    >
      <Navbar />

      {/* منطقة محتوى الصفحات */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <SettingsDrawer />
      <Footer />
    </Box>
  );
}

export default function App() {
  return (
    <AppThemeProvider>
      {/* إعادة تهيئة حالة تسجيل الدخول */}
      <AuthRehydrate />

      {/* شريط التقدّم الخاص بالتنقّل بين الصفحات */}
      <RouteProgress />

      <Routes>
        <Route element={<Layout />}>
          {/* صفحات عامة */}
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />

          {/* صفحات تتطلب تسجيل دخول */}
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

          {/* صفحات الحساب */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />

          {/* صفحة الخطأ 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppThemeProvider>
  );
}
