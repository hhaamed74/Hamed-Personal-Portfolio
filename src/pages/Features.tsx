import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

// Standard Material UI Icons
import {
  Code as CodeIcon,
  Storage as StorageIcon,
  Description as DescriptionIcon,
  TableChart as TableChartIcon,
  Slideshow as SlideshowIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Terminal as TerminalIcon,
} from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";

// Components & Assets
import FeatureCard from "../components/FeatureCard";
import cvFile from "../assets/Hamed_AbdelMohsen.pdf";

/**
 * Features Component - Clean Full-Stack Edition
 * تم ضبط الأيقونات لتظهر بوضوح وبحجم مناسب بدون تكرار الخلفيات.
 */
export default function Features() {
  const theme = useTheme();

  // حجم موحد للأيقونات لضمان الظهور
  const iconSize = 48;

  return (
    <Container sx={{ py: 6 }}>
      {/* --- Header Section --- */}
      <Stack spacing={1} sx={{ mb: 6 }}>
        <Typography variant="h3" fontWeight={900} gutterBottom color="primary">
          Features & Services
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.8, maxWidth: "800px" }}>
          Providing end-to-end digital solutions, from scalable{" "}
          <b>Full-Stack applications </b>
          to professional technical training and Office productivity.
        </Typography>
      </Stack>

      {/* --- Section 1: Software Development --- */}
      <Typography
        variant="h5"
        fontWeight={800}
        sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}
      >
        <TerminalIcon color="primary" /> Software Development
      </Typography>

      <Box
        sx={{
          mb: 6,
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {/* Front-End */}
        <FeatureCard
          icon={<CodeIcon sx={{ fontSize: iconSize }} color="primary" />}
          title="Front-End Development"
          subtitle="React • TypeScript • MUI"
          description="Crafting high-performance, responsive SPAs with focus on UX, reusable components, and modern state management."
          skills={[
            "React.js",
            "TypeScript",
            "Redux Toolkit",
            "Material UI",
            "Vite",
          ]}
        />

        {/* Back-End & Database */}
        <FeatureCard
          icon={<StorageIcon sx={{ fontSize: iconSize }} color="primary" />}
          title="Back-End & Database"
          subtitle="Node.js • Express • PostgreSQL"
          description="Building secure RESTful APIs, managing relational databases, and server-side logic optimization."
          skills={[
            "Node.js",
            "Express",
            "PostgreSQL",
            "JWT",
            "Prisma/Sequelize",
          ]}
        />
      </Box>

      {/* --- Section 2: Office Productivity --- */}
      <Typography
        variant="h5"
        fontWeight={800}
        sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}
      >
        <DescriptionIcon color="primary" /> Office Productivity
      </Typography>

      <Box
        sx={{
          mb: 6,
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {/* Microsoft Word */}
        <FeatureCard
          icon={
            <DescriptionIcon sx={{ fontSize: iconSize, color: "#2b579a" }} />
          }
          title="Microsoft Word"
          subtitle="Advanced Documentation"
          description="Professional document workflows, custom templates, and advanced corporate formatting."
          skills={["Styles", "Templates", "Mail Merge", "Automation"]}
        />

        {/* Microsoft Excel */}
        <FeatureCard
          icon={
            <TableChartIcon sx={{ fontSize: iconSize, color: "#217346" }} />
          }
          title="Microsoft Excel"
          subtitle="Data Analysis"
          description="Transforming data into insights with complex formulas, pivot tables, and interactive dashboards."
          skills={["Pivot Tables", "Dashboards", "XLOOKUP", "Data Cleaning"]}
        />

        {/* PowerPoint */}
        <FeatureCard
          icon={<SlideshowIcon sx={{ fontSize: iconSize, color: "#d24726" }} />}
          title="PowerPoint"
          subtitle="Visual Storytelling"
          description="High-impact presentations with custom graphics, smooth animations, and consistent branding."
          skills={["Master Slides", "Animations", "Visual Design", "Layouts"]}
        />
      </Box>

      {/* --- Call To Action --- */}
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          bgcolor: theme.palette.action.hover,
          border: "1px solid",
          borderColor: "divider",
          textAlign: "center",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Box>
            <Typography variant="h5" fontWeight={900} gutterBottom>
              Ready to start your next project?
            </Typography>
            <Typography color="text.secondary">
              Whether you need a Full-Stack application or professional
              corporate training, I'm ready to deliver.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component={RouterLink}
              to="/projects"
              variant="outlined"
              size="large"
              startIcon={<VisibilityIcon />}
              sx={{ px: 4, borderRadius: 2 }}
            >
              View Projects
            </Button>
            <Button
              component="a"
              href={cvFile}
              download
              variant="contained"
              size="large"
              startIcon={<DownloadIcon />}
              sx={{ px: 4, borderRadius: 2 }}
            >
              Download CV
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
