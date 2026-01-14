import { useState, type FormEvent } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Box,
  Link as MUILink,
  Avatar,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  LockOutlined as LockIcon,
} from "@mui/icons-material";

// ✅ استيراد الـ Hooks والـ Thunks الصحيحة
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginAsync, clearError } from "../redux/slices/authSlice";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

export default function Login() {
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname || "/";

  const [identifier, setIdentifier] = useState(""); // استخدام identifier ليشمل اليوزر أو الإيميل
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  // ✅ جلب الحالات من Redux مباشرة
  const { loading, error: reduxError } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearError()); // مسح أي أخطاء سابقة عند المحاولة الجديدة

    // ✅ تنفيذ عملية الدخول عبر الـ Thunk
    const resultAction = await dispatch(
      loginAsync({ id: identifier, pwd: password })
    );

    if (loginAsync.fulfilled.match(resultAction)) {
      setToastOpen(true);
      // توجيه المستخدم بعد نجاح الدخول
      setTimeout(() => navigate(from, { replace: true }), 1000);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: { xs: 8, md: 12 } }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
        }}
      >
        <Avatar sx={{ m: "0 auto 16px", bgcolor: "primary.main" }}>
          <LockIcon />
        </Avatar>

        <Typography variant="h4" fontWeight={900} gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Please enter your details to sign in
        </Typography>

        {/* ✅ عرض خطأ الريدكس إذا وجد */}
        {reduxError && (
          <Alert
            severity="error"
            variant="outlined"
            sx={{ mb: 3, textAlign: "left", borderRadius: 2 }}
          >
            {reduxError}
          </Alert>
        )}

        <form onSubmit={onSubmit} noValidate>
          <Stack spacing={2.5}>
            <TextField
              label="Username or Email"
              variant="outlined"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              fullWidth
              autoComplete="username"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Password"
              variant="outlined"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete="current-password"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPw((s) => !s)} edge="end">
                      {showPw ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              // ✅ زر التعطيل يعتمد على حالة التحميل من ريدكس
              disabled={!identifier.trim() || !password || loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: "none",
                "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
              }}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <MUILink
                  component={RouterLink}
                  to="/register"
                  sx={{
                    fontWeight: 700,
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Create one now
                </MUILink>
              </Typography>
            </Box>
          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={toastOpen}
        autoHideDuration={1600}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          Welcome back!
        </Alert>
      </Snackbar>
    </Container>
  );
}
