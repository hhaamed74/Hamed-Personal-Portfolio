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

import cvFile from "../assets/Hamed_AbdelMohsen.pdf";
import mcitCert from "../assets/mcit_certificate.png";
import gradCert from "../assets/graduation_certificate.jpg";

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
  const fullName = "Hamed Abdel Mohsen El Sayed";
  const dobISO = "2002-09-15"; // 15 Sep 2002
  const age = useMemo(() => getAge(dobISO), [dobISO]);

  // Dialog 
  const [cert, setCert] = useState<{ title: string; src: string } | null>(null);
  const openCert = (title: string, src: string) => setCert({ title, src });
  const closeCert = () => setCert(null);

  // Timeline 
  const educationSteps = [
    {
      title: "Hassan Abu Zaid Primary School",
      titleAr: "مدرسة حسن أبو زيد الابتدائية",
      location: "Gharbia Governorate (محافظة الغربية)",
    },
    {
      title: "Zaki Hesham Preparatory School",
      titleAr: "مدرسة زكي هشام الإعدادية",
      location: "Gharbia Governorate (محافظة الغربية)",
    },
    {
      title: "Bashbish Secondary School",
      titleAr: "مدرسة بشبيش الثانوية",
      location: "Gharbia Governorate (محافظة الغربية)",
    },
    {
      title: "Misr Higher Institute for Commerce & Computers — M.E.T",
      titleAr: "معهد مصر العالي للتجارة والحاسبات",
      location: "Mansoura (المنصورة)، Egypt",
    },
  ];

  // العنوان الحالي
  const currentAddress =
    "Alexandria — El Agamy • Al Bitash • Bianki • El-Bashawat St. (الإسكندرية – العجمي – البيطاش – بيانكي – شارع البشوات)";

  // Google Maps
  const mapsEmbedSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3415.442169809122!2d29.782820924946712!3d31.12523281655884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5952f0ded8715%3A0x56e136cfcbeda4d9!2z2KfZhNio2KfYtNmI2KfYqtiMINin2YTYqNmK2LfYp9i0INi02LHZgtiMINmC2LPZhSDYp9mE2K_YrtmK2YTYqdiMINmF2K3Yp9mB2LjYqSDYp9mE2KXYs9mD2YbYr9ix2YrYqQ!5e0!3m2!1sar!2seg!4v1756858947489!5m2!1sar!2seg";
  const lat = 31.1252328;
  const lng = 29.7828209;
  const mapsPlaceUrl = `https://maps.google.com/?q=${lat},${lng}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <Container sx={{ py: 6 }}>
      {/* Header */}
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          About Me
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.8 }}>
          My name is {fullName}. I’m a Front-End Developer, UI/UX designer, and
          computer instructor. I also work comfortably with Microsoft Word,
          Excel, and PowerPoint.
        </Typography>
      </Stack>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        gap={3}
      >
        {/* Bio / Basics */}
        <Box>
          <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800} gutterBottom>
                Bio
              </Typography>

              <Stack spacing={1.2}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <PersonIcon fontSize="small" />
                  <Typography>{fullName}</Typography>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <CakeIcon fontSize="small" />
                  <Typography>Born: 15 September 2002</Typography>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <NumbersIcon fontSize="small" />
                  <Typography>Age: {age}</Typography>
                </Stack>

                <Stack direction="row" spacing={1.5} alignItems="center">
                  <LocationOnIcon fontSize="small" />
                  <Typography>{currentAddress}</Typography>
                </Stack>

                <Divider sx={{ my: 1.5 }} />

                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                  Roles & Skills
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip label="Front-End Developer" size="small" />
                  <Chip label="UI/UX Designer" size="small" />
                  <Chip label="Computer Instructor" size="small" />
                  <Chip label="Microsoft Word" size="small" />
                  <Chip label="Microsoft Excel" size="small" />
                  <Chip label="PowerPoint" size="small" />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* Education & Certificates */}
        <Box>
          <Card elevation={2} sx={{ height: "100%", borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800} gutterBottom>
                Education & Credentials
              </Typography>

              {/* Education Timeline */}
              <Stack spacing={1.5} sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <SchoolIcon fontSize="small" />
                  <Typography fontWeight={700}>Education Timeline</Typography>
                </Stack>

                <Stepper
                  orientation="vertical"
                  nonLinear
                  activeStep={-1}
                  sx={{ mt: 1 }}
                >
                  {educationSteps.map((step, idx) => (
                    <Step key={idx} expanded>
                      <StepLabel>
                        <Stack spacing={0.2}>
                          <Typography fontWeight={700}>{step.title}</Typography>
                          <Typography variant="body2" sx={{ opacity: 0.8 }}>
                            {step.titleAr}
                          </Typography>
                        </Stack>
                      </StepLabel>
                      <StepContent>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {step.location}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Certificates */}
              <Stack spacing={1.5}>
                {/* شهادة التخرج */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <WorkspacePremiumIcon fontSize="small" />
                  <Stack spacing={0.5}>
                    <Typography>B.Sc. Graduation Certificate</Typography>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() =>
                          openCert("B.Sc. Graduation Certificate", gradCert)
                        }
                      >
                        View Certificate
                      </Button>
                      <Button
                        component="a"
                        href={gradCert}
                        download
                        size="small"
                        variant="contained"
                      >
                        Download
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>

                {/* شهادة MCIT */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <WorkspacePremiumIcon fontSize="small" />
                  <Stack spacing={0.5}>
                    <Typography>
                      Certificate from the Ministry of Communications and
                      Information Technology (MCIT)
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => openCert("MCIT Certificate", mcitCert)}
                      >
                        View Certificate
                      </Button>
                      <Button
                        component="a"
                        href={mcitCert}
                        download
                        size="small"
                        variant="contained"
                      >
                        Download
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>

                {/* الموقف من التجنيد */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <MilitaryTechIcon fontSize="small" />
                  <Typography>Military Status: Exempt</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Box>

        {/* خريطة الموقع — صف كامل */}
        <Box sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1.5 }}
              >
                <MapIcon fontSize="small" />
                <Typography variant="h6" fontWeight={800}>
                  Location Map
                </Typography>
              </Stack>

              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                {currentAddress}
              </Typography>

              <Box
                component="iframe"
                src={mapsEmbedSrc}
                title="My Location - Alexandria"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                sx={{
                  width: "100%",
                  height: { xs: 280, md: 420 },
                  border: 0,
                  borderRadius: 2,
                }}
              />

              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button
                  component="a"
                  href={mapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<MapIcon />}
                >
                  Open in Google Maps
                </Button>
                <Button
                  component="a"
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  startIcon={<DirectionsIcon />}
                >
                  Get Directions
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          mt: 4,
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={800}>
              Want to explore my work?
            </Typography>
            <Typography sx={{ opacity: 0.8 }}>
              Browse my projects or download my CV.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Button
              component={RouterLink}
              to="/projects"
              variant="outlined"
              startIcon={<VisibilityIcon />}
            >
              View Projects
            </Button>
            <Button
              component="a"
              href={cvFile}
              download
              variant="contained"
              startIcon={<DownloadIcon />}
            >
              Download CV
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Certificate Dialog */}
      <Dialog open={!!cert} onClose={closeCert} maxWidth="md" fullWidth>
        <DialogTitle>{cert?.title}</DialogTitle>
        <DialogContent dividers>
          {cert?.src && (
            <Box
              component="img"
              src={cert.src}
              alt={cert.title}
              sx={{ width: "100%", borderRadius: 2 }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}
