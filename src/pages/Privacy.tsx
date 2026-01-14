import { useState } from "react";
import {
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  Alert,
  Link as MUILink,
  Box,
  Paper,
} from "@mui/material";

// بدلاً من الاستيرادات الفردية، استخدم هذه الطريقة:
import {
  ShieldOutlined as ShieldOutlinedIcon,
  Storage as StorageIcon,
  Cookie as CookieIcon,
  Link as LinkIcon,
  DeleteSweep as DeleteSweepIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
export default function Privacy() {
  const [cleared, setCleared] = useState(false);

  const clearLocalData = () => {
    try {
      localStorage.removeItem("users");
      localStorage.removeItem("currentUser");
      setCleared(true);
      setTimeout(() => setCleared(false), 2500);
    } catch {
      /* ignore */
    }
  };

  return (
    <Container sx={{ py: 8, maxWidth: "md" }}>
      {/* Header Section */}
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <ShieldOutlinedIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
        <Typography variant="h3" fontWeight={900} gutterBottom>
          Privacy Policy
        </Typography>
        <Typography sx={{ opacity: 0.6 }}>
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </Typography>
      </Box>

      <Divider sx={{ mb: 5 }} />

      <Stack spacing={4}>
        {/* Section 1: Data Storage */}
        <Box>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 1.5 }}
          >
            <StorageIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              What we store
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.7 }}
          >
            This portfolio stores basic account data{" "}
            <strong>locally on your browser</strong> (Local Storage). This
            includes your username, email, gender, and a hashed password.
            <br />
            <Typography component="span" fontWeight={600} color="primary">
              Note: No data is sent to a remote server; everything stays on your
              machine.
            </Typography>
          </Typography>
        </Box>

        {/* Section 2: Cookies */}
        <Box>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 1.5 }}
          >
            <CookieIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Cookies & Local Storage
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.7 }}
          >
            We do not use tracking cookies for advertising. We only use Local
            Storage to maintain your authentication state and UI preferences
            (such as Light or Dark mode).
          </Typography>
        </Box>

        {/* Section 3: Links */}
        <Box>
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 1.5 }}
          >
            <LinkIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Third-party links
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.7 }}
          >
            Our portfolio may contain links to external sites (e.g., GitHub,
            LinkedIn). We are not responsible for the privacy practices of these
            third-party services.
          </Typography>
        </Box>

        {/* Section 4: User Action */}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: "action.hover",
            borderColor: "divider",
          }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 1.5 }}
          >
            <DeleteSweepIcon color="error" />
            <Typography variant="h6" fontWeight={700}>
              Your choices
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            You have full control over your data. You can wipe all locally
            stored data from this browser by clicking the button below:
          </Typography>

          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={clearLocalData}
            sx={{ borderRadius: 2 }}
          >
            Clear local data
          </Button>

          {cleared && (
            <Alert
              sx={{ mt: 2, borderRadius: 2 }}
              severity="success"
              variant="filled"
            >
              All local data has been successfully cleared.
            </Alert>
          )}
        </Paper>

        {/* Section 5: Contact */}
        <Box sx={{ textAlign: "center", pt: 4 }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <EmailIcon color="primary" fontSize="small" />
            <Typography variant="h6" fontWeight={700}>
              Contact
            </Typography>
          </Stack>
          <Typography variant="body1">
            For any privacy-related questions, reach out via email: <br />
            <MUILink
              href="mailto:hamedabdulmohsenalsayed@gmail.com"
              fontWeight={700}
              sx={{ textDecoration: "none" }}
            >
              hamedabdulmohsenalsayed@gmail.com
            </MUILink>
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
