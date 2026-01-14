import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { logoutUser } from "../services/auth";

export default function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    // 1. تنفيذ تسجيل الخروج
    logoutUser();
    dispatch(logout());

    // 2. إظهار الـ Toast
    setToastOpen(true);

    // 3. التوجيه بعد وقت قصير (أطول قليلاً لضمان قراءة المستخدم للرسالة)
    const t = setTimeout(() => {
      navigate("/", { replace: true });
    }, 1200);

    return () => clearTimeout(t);
  }, [dispatch, navigate]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Fade in={true} timeout={800}>
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={50} sx={{ mb: 3, opacity: 0.7 }} />

          <Typography variant="h5" fontWeight={800} gutterBottom>
            Signing Out...
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Thank you for visiting. We’re securing your session.
          </Typography>
        </Box>
      </Fade>

      <Snackbar
        open={toastOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="info" // خليناها info لأن الخروج مش بالضرورة "نجاح" لعملية، بل هو إجراء عادي
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: 3,
            fontWeight: 600,
          }}
        >
          You have been logged out safely.
        </Alert>
      </Snackbar>
    </Container>
  );
}
