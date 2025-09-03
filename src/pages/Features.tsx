import { Box, Button, Container, Stack, Typography } from "@mui/material";
import {
  Code as CodeIcon,
  School as SchoolIcon,
  Description as DescriptionIcon,
  TableChart as TableChartIcon,
  Slideshow as SlideshowIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

import FeatureCard from "../components/FeatureCard";
import cvFile from "../assets/Hamed_AbdelMohsen.pdf";

export default function Features() {
  return (
    <Container sx={{ py: 6 }}>
      {/* Hero */}
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Features & Services
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.8 }}>
          What I can help you with — Front-End development, UI/UX design, Office
          suite, and computer teaching.
        </Typography>
      </Stack>

      {/* Core Services */}
      <Typography
        variant="subtitle1"
        fontWeight={800}
        sx={{ mb: 2, opacity: 0.8 }}
      >
        Core Services
      </Typography>

      <Box
        sx={{
          mb: 4,
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        <Box>
          <FeatureCard
            icon={<CodeIcon />}
            title="Front-End Development"
            subtitle="React • TypeScript • Redux • MUI • Vite"
            description="Build modern, responsive SPAs with clean architecture, reusable components, state management, and API integration."
            skills={[
              "React",
              "TypeScript",
              "Redux Toolkit",
              "Material UI",
              "Vite",
              "React Router",
              "Authentication",
              "Performance",
              "Responsive",
            ]}
          />
        </Box>

        <Box>
          <FeatureCard
            icon={<SchoolIcon />}
            title="Computer Instructor"
            subtitle="Training • Curriculum • Workshops"
            description="Teach computer basics, Office apps, internet safety, and intro to programming with practical projects."
            skills={[
              "Office Basics",
              "Internet",
              "Intro to Programming",
              "Workshops",
              "Assessments",
            ]}
          />
        </Box>
      </Box>

      {/* Office Suite */}
      <Typography
        variant="subtitle1"
        fontWeight={800}
        sx={{ mb: 2, opacity: 0.8 }}
      >
        Office Suite
      </Typography>

      <Box
        sx={{
          mb: 4,
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        <Box>
          <FeatureCard
            icon={<DescriptionIcon />}
            title="Microsoft Word"
            subtitle="Docs • Templates • Formatting"
            description="Professional documents with styles, tables, TOCs, and templates tailored to your needs."
            skills={[
              "Styles",
              "Layouts",
              "Track Changes",
              "Templates",
              "Mail Merge",
            ]}
          />
        </Box>

        <Box>
          <FeatureCard
            icon={<TableChartIcon />}
            title="Microsoft Excel"
            subtitle="Sheets • Formulas • Dashboards"
            description="Spreadsheets, formulas, and dashboards for clean analysis and reporting."
            skills={[
              "Functions",
              "Pivot Tables",
              "Charts",
              "Data Cleaning",
              "Shortcuts",
            ]}
          />
        </Box>

        <Box>
          <FeatureCard
            icon={<SlideshowIcon />}
            title="PowerPoint"
            subtitle="Slides • Storytelling • Animations"
            description="Impactful slide decks with consistent visuals, icons, and smooth transitions."
            skills={[
              "Themes",
              "Layouts",
              "Animations",
              "Presenter View",
              "Export",
            ]}
          />
        </Box>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          mt: 2,
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
              Want to see more?
            </Typography>
            <Typography sx={{ opacity: 0.8 }}>
              Check out my recent projects or grab my CV.
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
    </Container>
  );
}
