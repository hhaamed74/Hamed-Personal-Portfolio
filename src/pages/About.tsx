import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  useTheme,
  IconButton,
} from "@mui/material";

import {
  Person as PersonIcon,
  Cake as CakeIcon,
  Numbers as NumbersIcon,
  LocationOn as LocationOnIcon,
  School as SchoolIcon,
  WorkspacePremium as WorkspacePremiumIcon,
  MilitaryTech as MilitaryTechIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Map as MapIcon,
  Directions as DirectionsIcon,
} from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";

// Assets
import cvFile from "../assets/Hamed_AbdelMohsen.pdf";
import mcitCert from "../assets/mcit_certificate.png";
import gradCert from "../assets/graduation_certificate.jpg";

// Helper function
function getAge(dobISO: string) {
  const today = new Date();
  const dob = new Date(dobISO);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

export default function About() {
  const theme = useTheme();
  const fullName = "Hamed Abdel Mohsen El Sayed";
  const dobISO = "2002-09-15";
  const age = useMemo(() => getAge(dobISO), [dobISO]);

  const [cert, setCert] = useState<{ title: string; src: string } | null>(null);
  const openCert = (title: string, src: string) => setCert({ title, src });
  const closeCert = () => setCert(null);

  const educationSteps = [
    {
      title: "Hassan Abu Zaid Primary School",
      titleAr: "مدرسة حسن أبو زيد الابتدائية",
      location: "Gharbia",
    },
    {
      title: "Zaki Hesham Preparatory School",
      titleAr: "مدرسة زكي هشام الإعدادية",
      location: "Gharbia",
    },
    {
      title: "Bashbish Secondary School",
      titleAr: "مدرسة بشبيش الثانوية",
      location: "Gharbia",
    },
    {
      title: "Misr Higher Institute (M.E.T)",
      titleAr: "معهد مصر العالي للتجارة والحاسبات",
      location: "Mansoura, Egypt",
    },
  ];

  // رابط الخريطة الصحيح (Riyadh, Saudi Arabia)
  // تم استخدام واجهة بحث جوجل المفتوحة لتجنب مشاكل الـ API Keys في الـ Embed
  // const encodedLocation = encodeURIComponent("Riyadh, Saudi Arabia");
  // const mapsEmbedSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY_HERE&q=${encodedLocation}`;
  const fallbackMapsSrc = `https://maps.google.com/maps?q=Riyadh%20Saudi%20Arabia&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  const mapsPlaceUrl = `https://www.google.com/maps/place/Riyadh+Saudi+Arabia`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=Riyadh+Saudi+Arabia`;

  return (
    <Container sx={{ py: 6 }}>
      {/* Header Section */}
      <Stack spacing={2} sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          fontWeight={900}
          color="primary"
          sx={{ fontSize: { xs: "2.4rem", md: "3rem" } }}
        >
          About Me
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: "800px", lineHeight: 1.6, fontSize: "1.1rem" }}
        >
          My name is <b>{fullName}</b>. I’m a high-performing{" "}
          <b>Full-Stack Developer</b> & <b>UI/UX Designer</b> currently based in{" "}
          <b>Riyadh, Saudi Arabia</b>. Beyond building end-to-end scalable
          applications, I share my expertise as a Computer Instructor, combining
          technical depth with a user-centric design approach.
        </Typography>
      </Stack>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1.2fr" }}
        gap={4}
      >
        {/* Left Column: Bio & Skills */}
        <Stack spacing={4}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 4, bgcolor: "background.paper" }}
          >
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={800}
                gutterBottom
                display="flex"
                alignItems="center"
                gap={1}
              >
                <PersonIcon color="primary" /> Personal Info
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2.5}>
                <InfoRow
                  icon={<CakeIcon />} // شيلنا color="primary"
                  label="Born"
                  value="15 Sep 2002"
                />
                <InfoRow
                  icon={<NumbersIcon />} // شيلنا color="primary"
                  label="Age"
                  value={`${age} Years Old`}
                />
                <InfoRow
                  icon={<LocationOnIcon />} // شيلنا color="primary"
                  label="Current Location"
                  value="Saudi Arabia — Riyadh"
                />
                <InfoRow
                  icon={<MilitaryTechIcon />} // شيلنا color="primary"
                  label="Military"
                  value="Exempt (إعفاء)"
                />
              </Stack>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800} gutterBottom>
                Core Expertise
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {[
                  "Full-Stack Developer",
                  "React.js",
                  "Node.js",
                  "Express",
                  "TypeScript",
                  "Material UI",
                  "UI/UX Design",
                  "SQL",
                ].map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{
                      borderRadius: "8px",
                      bgcolor: theme.palette.primary.main + "15",
                      color: "primary.main",
                      fontWeight: 600,
                      border: "1px solid",
                      borderColor: theme.palette.primary.main + "30",
                    }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        {/* Right Column: Education Timeline */}
        <Card variant="outlined" sx={{ borderRadius: 4 }}>
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={800}
              gutterBottom
              display="flex"
              alignItems="center"
              gap={1}
            >
              <SchoolIcon color="primary" /> Education Journey
            </Typography>
            <Stepper orientation="vertical" sx={{ mt: 3, ml: 1 }}>
              {educationSteps.map((step, idx) => (
                <Step key={idx} active={true}>
                  <StepLabel
                    StepIconComponent={() => (
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          boxShadow: `0 0 0 4px ${theme.palette.primary.main}20`,
                        }}
                      />
                    )}
                  >
                    <Typography fontWeight={700}>{step.title}</Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      {step.titleAr}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.8,
                        borderLeft: "2px solid",
                        borderColor: "divider",
                        pl: 2,
                        py: 1,
                      }}
                    >
                      {step.location}
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>

            <Divider sx={{ my: 3 }} />

            <Typography
              variant="h6"
              fontWeight={800}
              gutterBottom
              display="flex"
              alignItems="center"
              gap={1}
            >
              <WorkspacePremiumIcon color="primary" /> Certificates
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <CertificateItem
                title="B.Sc. Graduation Certificate"
                onView={() => openCert("Graduation Certificate", gradCert)}
                src={gradCert}
              />
              <CertificateItem
                title="MCIT Ministry Certificate"
                onView={() => openCert("MCIT Certificate", mcitCert)}
                src={mcitCert}
              />
            </Stack>
          </CardContent>
        </Card>

        {/* Full Width: Map */}
        <Box sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}>
          <Card variant="outlined" sx={{ borderRadius: 4, overflow: "hidden" }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              sx={{ p: 2.5, gap: 2 }}
            >
              <Typography
                variant="h6"
                fontWeight={800}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <MapIcon color="primary" /> Location: Riyadh, KSA
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                width={{ xs: "100%", sm: "auto" }}
              >
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  href={mapsPlaceUrl}
                  target="_blank"
                >
                  View Large
                </Button>
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  startIcon={<DirectionsIcon />}
                  href={mapsDirectionsUrl}
                  target="_blank"
                >
                  Directions
                </Button>
              </Stack>
            </Stack>
            <Box
              component="iframe"
              src={fallbackMapsSrc}
              sx={{
                width: "100%",
                height: { xs: 300, md: 450 },
                border: 0,
                filter:
                  theme.palette.mode === "dark"
                    ? "invert(90%) hue-rotate(180deg)"
                    : "none",
              }}
              allowFullScreen
              loading="lazy"
            />
          </Card>
        </Box>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          mt: 8,
          p: { xs: 4, md: 6 },
          textAlign: "center",
          borderRadius: 6,
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.03)"
              : theme.palette.action.hover,
          border: "1px dashed",
          borderColor: "divider",
        }}
      >
        <Typography variant="h4" fontWeight={900} gutterBottom>
          Ready to build something great together?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          I'm currently available for freelance projects and full-time
          opportunities.
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Button
            component={RouterLink}
            to="/projects"
            variant="outlined"
            size="large"
            startIcon={<VisibilityIcon />}
            sx={{ borderRadius: 3, px: 4 }}
          >
            See Projects
          </Button>
          <Button
            href={cvFile}
            download
            variant="contained"
            size="large"
            startIcon={<DownloadIcon />}
            sx={{ borderRadius: 3, px: 4 }}
          >
            Get CV (PDF)
          </Button>
        </Stack>
      </Box>

      {/* Modal */}
      <Dialog open={!!cert} onClose={closeCert} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            fontWeight: 800,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {cert?.title}
          <Button onClick={closeCert} color="inherit">
            Close
          </Button>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ textAlign: "center", bgcolor: "#f5f5f5" }}
        >
          <img
            src={cert?.src}
            alt="Certificate"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}

// Sub-components
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Box
        sx={{
          bgcolor: "primary.main",
          p: 1,
          borderRadius: 2,
          display: "flex",
          color: "white",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}
        >
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={700}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}

function CertificateItem({
  title,
  onView,
  src,
}: {
  title: string;
  onView: () => void;
  src: string;
}) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        transition: "0.2s",
        "&:hover": {
          borderColor: "primary.main",
          bgcolor: "action.hover",
        },
      }}
    >
      <Typography variant="body2" fontWeight={700}>
        {title}
      </Typography>
      <Stack direction="row" spacing={1}>
        <IconButton
          size="small"
          onClick={onView}
          color="primary"
          sx={{ border: "1px solid" }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          component="a"
          href={src}
          download
          color="secondary"
          sx={{ border: "1px solid" }}
        >
          <DownloadIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
