import { Container, Typography, Divider, Stack } from "@mui/material";

export default function Terms() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Terms of Use
      </Typography>
      <Typography sx={{ opacity: 0.7, mb: 2 }}>
        Last updated: {new Date().toLocaleDateString()}
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        <section>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Purpose
          </Typography>
          <Typography>
            This website is a personal portfolio demonstrating front-end work
            and projects. It is provided for informational purposes only.
          </Typography>
        </section>

        <section>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Content & ownership
          </Typography>
          <Typography>
            All project descriptions, visuals, and code samples are owned by
            their respective authors. External brands and logos belong to their
            owners.
          </Typography>
        </section>

        <section>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Acceptable use
          </Typography>
          <Typography>
            You agree not to misuse the website, attempt unauthorized access, or
            interfere with its normal operation.
          </Typography>
        </section>

        <section>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Warranty & liability
          </Typography>
          <Typography>
            The site is provided “as is” without warranties of any kind. We are
            not liable for any damages arising from your use of the site or
            external links.
          </Typography>
        </section>

        <section>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Changes
          </Typography>
          <Typography>
            We may update these Terms at any time. Continued use means you
            accept the latest version.
          </Typography>
        </section>
      </Stack>
    </Container>
  );
}
