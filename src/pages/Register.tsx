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
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/slices/authSlice";
import { registerUser } from "../services/auth";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Toast state
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
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      setToast({ open: true, msg: v, sev: "error" });
      return;
    }

    try {
      setLoading(true);
      const user = await registerUser({ username, email, password, gender });
      dispatch(login(user));

      setToast({
        open: true,
        msg: `Welcome, ${user.username}! Account created successfully.`,
        sev: "success",
      });

      setTimeout(() => navigate("/"), 900);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setError(msg);
      setToast({ open: true, msg, sev: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Create an Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={onSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              autoComplete="username"
            />

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              autoComplete="email"
            />

            <RadioGroup row value={gender} onChange={onGenderChange}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>

            <TextField
              label="Password"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPw((s) => !s)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPw ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              type={showPw2 ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPw2((s) => !s)}
                      edge="end"
                      aria-label="toggle confirm password visibility"
                    >
                      {showPw2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* ✅ THEMED TOAST */}
      <Snackbar
        open={toast.open}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        autoHideDuration={1800}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          severity={toast.sev}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {toast.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
}
