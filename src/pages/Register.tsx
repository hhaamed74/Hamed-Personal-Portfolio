import { useState, type FormEvent, type ChangeEvent } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
  Alert,
  Snackbar,
  Box,
  Avatar,
  Link as MUILink,
  FormLabel,
  FormControl,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  PersonAddOutlined as RegisterIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
} from "@mui/icons-material";

// ✅ التعديل هنا: استيراد useAppSelector والـ Thunks الصحيحة
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { registerAsync, clearError } from "../redux/slices/authSlice";
import { useNavigate, Link as RouterLink } from "react-router-dom";

type Gender = "male" | "female" | "other";
type ToastSeverity = "success" | "error" | "info" | "warning";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  // ✅ جلب الحالة من Redux بدلاً من useState المحلي
  const { loading, error: reduxError } = useAppSelector((state) => state.auth);
  const [localError, setLocalError] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    open: boolean;
    msg: string;
    sev: ToastSeverity;
  }>({
    open: false,
    msg: "",
    sev: "success",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validate = () => {
    if (!username.trim()) return "Username is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      return "Invalid email address";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  };

  const onGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value as Gender);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    dispatch(clearError()); // تنظيف أخطاء الريدكس السابقة

    const v = validate();
    if (v) {
      setLocalError(v);
      setToast({ open: true, msg: v, sev: "error" });
      return;
    }

    // ✅ تنفيذ عملية التسجيل عبر الريدكس (Thunk)
    const resultAction = await dispatch(
      registerAsync({ username, email, password, gender })
    );

    if (registerAsync.fulfilled.match(resultAction)) {
      setToast({
        open: true,
        msg: `Welcome, ${resultAction.payload.username}! Your account is ready.`,
        sev: "success",
      });
      setTimeout(() => navigate("/"), 1000);
    } else {
      // إذا فشل الـ Thunk، الخطأ سيظهر في reduxError تلقائياً
      setToast({
        open: true,
        msg: (resultAction.payload as string) || "Registration failed",
        sev: "error",
      });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Avatar
            sx={{
              m: "0 auto 12px",
              bgcolor: "primary.main",
              width: 56,
              height: 56,
            }}
          >
            <RegisterIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" fontWeight={900}>
            Join Us
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your account to explore all features
          </Typography>
        </Box>

        {/* عرض الخطأ المحلي أو خطأ الريدكس */}
        {(localError || reduxError) && (
          <Alert
            severity="error"
            variant="outlined"
            sx={{ mb: 3, borderRadius: 2 }}
          >
            {localError || reduxError}
          </Alert>
        )}

        <form onSubmit={onSubmit} noValidate>
          <Stack spacing={2.5}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <FormControl sx={{ px: 1 }}>
              <FormLabel sx={{ fontSize: "0.85rem", fontWeight: 700, mb: 0.5 }}>
                Gender
              </FormLabel>
              <RadioGroup row value={gender} onChange={onGenderChange}>
                <FormControlLabel
                  value="male"
                  control={<Radio size="small" />}
                  label={
                    <Stack direction="row" alignItems="center" gap={0.5}>
                      <MaleIcon fontSize="small" /> Male
                    </Stack>
                  }
                />
                <FormControlLabel
                  value="female"
                  control={<Radio size="small" />}
                  label={
                    <Stack direction="row" alignItems="center" gap={0.5}>
                      <FemaleIcon fontSize="small" /> Female
                    </Stack>
                  }
                />
              </RadioGroup>
            </FormControl>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Password"
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPw((s) => !s)}
                        edge="end"
                      >
                        {showPw ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Confirm"
                type={showPw2 ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPw2((s) => !s)}
                        edge="end"
                      >
                        {showPw2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={loading} // استخدام loading من الريدكس
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                mt: 1,
              }}
            >
              {loading ? "Creating Account..." : "Get Started"}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              Already have an account?{" "}
              <MUILink
                component={RouterLink}
                to="/login"
                sx={{ fontWeight: 700, textDecoration: "none" }}
              >
                Sign In
              </MUILink>
            </Typography>
          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={toast.open}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        autoHideDuration={1800}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={toast.sev}
          variant="filled"
          sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
