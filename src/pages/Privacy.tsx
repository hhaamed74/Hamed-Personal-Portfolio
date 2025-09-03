import { useState } from "react";
import {
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  Alert,
  Link as MUILink,
} from "@mui/material";

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
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Privacy Policy
      </Typography>
      <Typography sx={{ opacity: 0.7, mb: 2 }}>
        Last updated: {new Date().toLocaleDateString()}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        <section>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            What we store
          </Typography>
          <Typography>
            This portfolio stores basic account data{" "}
            <strong>locally on your browser</strong> (Local Storage) such as
            username, email, gender, and a hashed password (no server involved).
          </Typography>
        </section>

        <section>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Cookies & Local Storage
          </Typography>
          <Typography>
            We don’t use tracking cookies. We only use Local Storage for auth
            state and preferences (e.g., light/dark theme).
          </Typography>
        </section>

        <section>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Third-party links
          </Typography>
          <Typography>
            External links (e.g., GitHub, LinkedIn) follow their own privacy
            policies. Please review those services for details.
          </Typography>
        </section>

        <section>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Your choices
          </Typography>
          <Typography sx={{ mb: 1 }}>
            You can clear saved data anytime (browser storage). Use the button
            below:
          </Typography>
          <Button variant="outlined" onClick={clearLocalData}>
            Clear local data
          </Button>
          {cleared && (
            <Alert sx={{ mt: 1 }} severity="success">
              Local data cleared.
            </Alert>
          )}
        </section>

        <section>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Contact
          </Typography>
          <Typography>
            For questions, email{" "}
            <MUILink href="mailto:hamedabdulmohsenalsayed@gmail.com">
              hamedabdulmohsenalsayed@gmail.com
            </MUILink>
            .
          </Typography>
        </section>
      </Stack>
    </Container>
  );
}
