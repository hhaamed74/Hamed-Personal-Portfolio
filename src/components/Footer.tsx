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
  Email as EmailIcon,
  Download as DownloadIcon,
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
      // fallback
    }
  };

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
                HAMED
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, maxWidth: 250 }}>
                Full-Stack Developer & Technical Instructor providing
                high-quality digital solutions.
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
                    href={`mailto:${email}`}
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
                sx={{ mt: 2, width: "fit-content", borderRadius: 2 }}
              >
                Download CV
              </Button>
            </Stack>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Navigation
            </Typography>
            <Stack spacing={0.5}>
              {["Home", "Projects", "Features", "Login", "Register"].map(
                (item) => (
                  <MUILink
                    key={item}
                    component={RouterLink}
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    underline="hover"
                    color="inherit"
                    sx={{ opacity: 0.8, fontSize: "0.9rem" }}
                  >
                    {item}
                  </MUILink>
                )
              )}
            </Stack>
          </Box>

          {/* Contact Details */}
          <Box>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              Contact Info
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnIcon fontSize="small" color="primary" />
                <Typography variant="body2">Riyadh, Saudi Arabia</Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon fontSize="small" color="primary" />
                <MUILink
                  href="tel:+201067156485"
                  underline="hover"
                  color="inherit"
                  variant="body2"
                >
                  +966 53 137 4945
                </MUILink>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="start">
                <Tooltip title={copied ? "Copied!" : "Copy email"}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EmailIcon fontSize="small" color="primary" />
                    <MUILink
                      component="button"
                      onClick={copyEmail}
                      underline="hover"
                      color="inherit"
                      variant="body2"
                      sx={{
                        cursor: "copy",
                        textAlign: "left",
                        fontWeight: 500,
                      }}
                    >
                      {email}
                    </MUILink>
                    <ContentCopyIcon sx={{ fontSize: 14, opacity: 0.5 }} />
                  </Stack>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Bottom bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.6, textAlign: { xs: "center", sm: "left" } }}
          >
            © {year} Hamed Abdel Mohsen El Sayed. Built with React & MUI.
          </Typography>

          <Stack direction="row" spacing={3} alignItems="center">
            <MUILink
              component={RouterLink}
              to="/privacy"
              underline="hover"
              color="inherit"
              variant="caption"
            >
              Privacy
            </MUILink>
            <MUILink
              component={RouterLink}
              to="/terms"
              underline="hover"
              color="inherit"
              variant="caption"
            >
              Terms
            </MUILink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
