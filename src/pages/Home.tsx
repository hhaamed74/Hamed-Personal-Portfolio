import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  Paper,
  Chip,
  Divider,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { memo } from "react";

// Move static data outside the component to prevent re-creation on every render (Performance)
const SKILL_GROUPS = [
  {
    title: "Frontend Mastery",
    items: [
      "React.js (18)",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5 & CSS3",
      "Sass",
      "Tailwind CSS",
      "shadcn/ui",
      "Material UI",
      "Bootstrap",
    ],
  },
  {
    title: "Backend Excellence",
    items: [
      "Node.js",
      "Express.js",
      "PHP",
      "Laravel",
      "RESTful APIs",
      "JWT Authentication",
      "RBAC",
    ],
  },
  {
    title: "Databases & Storage",
    items: ["MongoDB", "Mongoose", "MongoDB Atlas", "MySQL", "PostgreSQL"],
  },
  {
    title: "DevOps & Tools",
    items: ["Git & GitHub", "Postman", "Vite", "npm"],
  },
  {
    title: "Architecture",
    items: ["Clean Architecture", "Full-Stack Solutions"],
  },
];

const Home = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Container sx={{ py: 8, position: "relative" }}>
      {/* Abstract Background: Using radial gradients for a modern "Glassmorphism" feel.
          pointerEvents: "none" ensures the background doesn't intercept clicks.
      */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background: isDarkMode
            ? "radial-gradient(1200px 400px at 20% -10%, rgba(25,118,210,.15), transparent 60%), radial-gradient(900px 320px at 120% 10%, rgba(156,39,176,.12), transparent 60%)"
            : "radial-gradient(1200px 400px at 20% -10%, rgba(25,118,210,.05), transparent 60%)",
          filter: "blur(0.2px)",
        }}
      />

      {/* Main Heading with Gradient Animation */}
      <Typography
        variant="h3"
        fontWeight={900}
        gutterBottom
        sx={{
          lineHeight: 1.1,
          letterSpacing: "2px",
          textTransform: "uppercase",
          backgroundImage:
            "linear-gradient(90deg, #42a5f5 0%, #90caf9 30%, #ce93d8 70%, #ab47bc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          "@keyframes glow": {
            "0%,100%": { filter: "drop-shadow(0 0 0px rgba(66,165,245,0.0))" },
            "50%": { filter: "drop-shadow(0 6px 14px rgba(66,165,245,0.25))" },
          },
          animation: "glow 4s ease-in-out infinite",
          fontSize: { xs: "2.5rem", md: "3.5rem" },
        }}
      >
        Elevating Web Experiences
      </Typography>

      {/* Subheading: Defined your identity as Full-Stack */}
      <Typography
        variant="h6"
        sx={{
          opacity: 0.9,
          mb: 3,
          color: "text.primary",
          fontSize: { xs: "1rem", sm: "1.25rem" },
          maxWidth: 800,
        }}
      >
        I am <strong>Hamed Abdel Mohsen</strong>, a results-driven{" "}
        <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
          Full-Stack Developer
        </Box>{" "}
        dedicated to building complete, production-ready websites—from
        eye-catching interfaces to powerful servers and databases."
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          component={RouterLink}
          to="/projects"
          variant="contained"
          size="large"
          sx={{ px: 4 }}
        >
          Explore Projects
        </Button>
        <Button
          component={RouterLink}
          to="/about"
          variant="outlined"
          size="large"
        >
          Technical Bio
        </Button>
      </Stack>

      {/* Skills Grid Section */}
      <Box sx={{ mt: 10 }}>
        <Typography variant="h5" fontWeight={800} gutterBottom>
          Technical Arsenal
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.7, mb: 4 }}>
          A curated list of technologies I leverage to solve complex problems.
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {SKILL_GROUPS.map((group) => (
            <Paper
              key={group.title}
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: isDarkMode
                  ? "rgba(255,255,255,0.03)"
                  : "rgba(0,0,0,0.01)",
                backdropFilter: "blur(12px)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: "primary.main",
                  boxShadow: `0 10px 40px -10px ${theme.palette.primary.main}33`,
                },
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={800}
                color="primary.light"
                sx={{ mb: 2 }}
              >
                {group.title}
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {group.items.map((skill, index) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      transition: "0.2s",
                      /* Custom staggered floating animation for visual dynamism */
                      animation: `float ${
                        4 + (index % 3)
                      }s ease-in-out infinite`,
                      "@keyframes float": {
                        "0%, 100%": { transform: "translateY(0)" },
                        "50%": { transform: "translateY(-4px)" },
                      },
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "white",
                        transform: "scale(1.1) !important",
                      },
                    }}
                  />
                ))}
              </Stack>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

// Use memo to prevent unnecessary re-renders if parent state changes
export default memo(Home);
