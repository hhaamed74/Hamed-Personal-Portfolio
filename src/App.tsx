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

// Services & Components
import AuthRehydrate from "./services/AuthRehydrate";
import SettingsDrawer from "./components/SettingsDrawer";
import RouteProgress from "./components/RouteProgress";
import ScrollToTop from "./components/ScrollToTop"; // المكون الجديد

/**
 * الـ Layout الأساسي للموقع
 * يضمن توزيع العناصر بشكل رأسي متناسق (Navbar -> Content -> Footer)
 */
function Layout() {
  // تعيين العنوان الافتراضي للموقع
  usePageMeta("Hamed | Portfolio");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflowX: "hidden", // منع حدوث سكرول عرضي بسبب الأنيميشن أو الصور
      }}
    >
      {/* شريط التنقل العلوي */}
      <Navbar />

      {/* منطقة عرض المحتوى (الصفحات) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Box>

      {/* زر العودة للأعلى - سيتغير لونه تلقائياً مع الثيم */}
      <ScrollToTop />

      {/* درج الإعدادات (تغيير الألوان والمود) */}
      <SettingsDrawer />

      {/* التذييل السفلي */}
      <Footer />
    </Box>
  );
}

export default function App() {
  return (
    <AppThemeProvider>
      {/* استعادة جلسة المستخدم عند فتح الموقع */}
      <AuthRehydrate />

      {/* شريط التقدّم النحيف أعلى الصفحة عند الانتقال */}
      <RouteProgress />

      <Routes>
        <Route element={<Layout />}>
          {/* --- المسارات العامة --- */}
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />

          {/* --- المسارات المحمية (تطلب تسجيل دخول) --- */}
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

          {/* --- مسارات الحساب --- */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />

          {/* --- صفحة الخطأ --- */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppThemeProvider>
  );
}
