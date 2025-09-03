import { useEffect, useState } from "react";
import { Container, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { logoutUser } from "../services/auth";

export default function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    // نفّذ تسجيل الخروج
    logoutUser();
    dispatch(logout());

    // اعرض Toast وبعدين روح للهوم
    setToastOpen(true);
    const t = setTimeout(() => navigate("/", { replace: true }), 900);

    return () => clearTimeout(t);
  }, [dispatch, navigate]);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h6" sx={{ opacity: 0.8 }}>
        Logging out…
      </Typography>

      <Snackbar
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        autoHideDuration={1600}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
        >
          You have been logged out successfully.
        </Alert>
      </Snackbar>
    </Container>
  );
}
