import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Link as MUILink,
  Stack,
  IconButton,
  Divider,
  Button,
  Tooltip,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Download as DownloadIcon,
  ArrowUpward as ArrowUpwardIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Facebook as FacebookIcon,
  WhatsApp as WhatsAppIcon,
  ContentCopy as ContentCopyIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import cvFile from "../assets/Hamed_AbdelMohsen.pdf";

const year = new Date().getFullYear();

export default function Footer() {
  const email = "hamedabdulmohsenalsayed@gmail.com";
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // optional fallback
    }
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        pt: 6,
        pb: 3,
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container
        maxWidth="xl"
        disableGutters
        sx={{ px: { xs: 2, sm: 3, md: 6 } }}
      >
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            alignItems: "start",
          }}
        >
          {/* Brand + Social */}
          <Box>
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight={800} letterSpacing={1}>
                Hamed
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1, flexWrap: "wrap" }}
              >
                <Tooltip title="GitHub">
                  <IconButton
                    component="a"
                    href="https://github.com/hhaamed74"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <GitHubIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="LinkedIn">
                  <IconButton
                    component="a"
                    href="https://www.linkedin.com/in/hamedabdulmohsen"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Facebook">
                  <IconButton
                    component="a"
                    href="https://www.facebook.com/hamed.al.shahawy/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="WhatsApp">
                  <IconButton
                    component="a"
                    href="https://wa.me/201067156485"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Gmail">
                  <IconButton
                    component="a"
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=hamedabdulmohsenalsayed@gmail.com&su=Hello%20Hamed"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Gmail"
                  >
                    <EmailIcon />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Button
                component="a"
                href={cvFile}
                download
                variant="contained"
                size="small"
                startIcon={<DownloadIcon />}
                sx={{ mt: 2, width: "fit-content" }}
              >
                Download CV
              </Button>
            </Stack>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={0.5}>
              <MUILink
                component={RouterLink}
                to="/"
                underline="hover"
                color="inherit"
              >
                Home
              </MUILink>
              <MUILink
                component={RouterLink}
                to="/projects"
                underline="hover"
                color="inherit"
              >
                Projects
              </MUILink>
              <MUILink
                component={RouterLink}
                to="/features"
                underline="hover"
                color="inherit"
              >
                Features
              </MUILink>
              <MUILink
                component={RouterLink}
                to="/login"
                underline="hover"
                color="inherit"
              >
                Login
              </MUILink>
              <MUILink
                component={RouterLink}
                to="/register"
                underline="hover"
                color="inherit"
              >
                Register
              </MUILink>
            </Stack>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Contact
            </Typography>
            <Stack spacing={0.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">Alexandria, Egypt</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon fontSize="small" />
                <MUILink
                  href="tel:+201067156485"
                  underline="hover"
                  color="inherit"
                >
                  +20 1067156485
                </MUILink>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title={copied ? "Copied!" : "Copy email"}>
                  <MUILink
                    component="button"
                    onClick={copyEmail}
                    underline="hover"
                    color="inherit"
                    sx={{ cursor: "copy", wordBreak: "break-all" }}
                  >
                    {email}
                  </MUILink>
                </Tooltip>
                <Tooltip title={copied ? "Copied!" : "Copy"}>
                  <IconButton
                    onClick={copyEmail}
                    size="small"
                    aria-label="Copy email"
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Bottom bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {year} Hamed Abdel Mohsen El Sayed. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <MUILink
              component={RouterLink}
              to="/about"
              underline="hover"
              color="inherit"
            >
              About
            </MUILink>
            <MUILink
              component={RouterLink}
              to="/privacy"
              underline="hover"
              color="inherit"
            >
              Privacy
            </MUILink>
            <MUILink
              component={RouterLink}
              to="/terms"
              underline="hover"
              color="inherit"
            >
              Terms
            </MUILink>

            <IconButton
              onClick={scrollTop}
              aria-label="Back to top"
              size="small"
            >
              <ArrowUpwardIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
