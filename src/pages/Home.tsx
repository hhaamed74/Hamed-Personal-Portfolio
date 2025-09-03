import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  const skillGroups: { title: string; items: string[] }[] = [
    {
      title: "Frontend",
      items: [
        "HTML",
        "CSS",
        "Sass (SCSS)",
        "Tailwind CSS",
        "Bootstrap",
        "Material UI",
      ],
    },
    {
      title: "JavaScript / React",
      items: [
        "JavaScript (ES6+)",
        "TypeScript",
        "React",
        "React Router",
        "Redux Toolkit",
        "Axios",
      ],
    },
    { title: "Storage", items: ["Dexie (IndexedDB)", "Local Storage"] },
    { title: "Internationalization", items: ["i18next (Multi-language)"] },
    {
      title: "Animations & UX",
      items: ["Framer Motion", "Notifications System", "Dark/Light Mode"],
    },
    {
      title: "Programming & Dev",
      items: ["C# Fundamentals", "Git", "GitHub", "npm"],
    },
    { title: "Tools", items: ["Visual Studio", "VS Code", "Postman"] },
    { title: "Office", items: ["Microsoft Word", "Excel", "PowerPoint"] },
  ];

  return (
    <Container sx={{ py: 8, position: "relative" }}>
      {/* خلفية هادئة متوهجة */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background:
            "radial-gradient(1200px 400px at 20% -10%, rgba(25,118,210,.15), transparent 60%), radial-gradient(900px 320px at 120% 10%, rgba(156,39,176,.12), transparent 60%)",
          filter: "blur(0.2px)",
        }}
      />

      {/* العنوان الرئيسي بنص متدرّج */}
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
          textShadow: "0 0 0 rgba(0,0,0,0)", // يخلّي الجليتش أنعم
          "@keyframes glow": {
            "0%,100%": { filter: "drop-shadow(0 0 0px rgba(66,165,245,0.0))" },
            "50%": { filter: "drop-shadow(0 6px 14px rgba(66,165,245,0.25))" },
          },
          animation: "glow 4s ease-in-out infinite",
        }}
      >
        Welcome to my Portfolio
      </Typography>

      {/* السطر التعريفي */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          opacity: 0.9,
          fontStyle: "italic",
          letterSpacing: "0.6px",
          color: "text.primary",
          fontSize: { xs: "1.05rem", sm: "1.2rem" },
          "&:hover": { color: "primary.main", textDecoration: "underline" },
          maxWidth: 900,
        }}
      >
        My name is <strong>Hamed Abdel Mohsen El Sayed</strong>, and I am a
        Front-End Developer.
      </Typography>

      {/* CTAs */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button component={RouterLink} to="/projects" variant="contained">
          View Projects
        </Button>
        <Button component={RouterLink} to="/about" variant="outlined">
          About Me
        </Button>
      </Stack>

      {/* Skills Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={800} gutterBottom>
          Skills
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.75, mb: 2 }}>
          Technologies & tools I use day-to-day
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* ✅ CSS Grid بدل MUI Grid لتفادي أي أخطاء */}
        <Box
          sx={{
            display: "grid",
            gap: 16 / 8 + "rem", // 2
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {skillGroups.map((group) => (
            <Paper
              key={group.title}
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: (t) =>
                  t.palette.mode === "dark"
                    ? "rgba(18,21,27,0.6)"
                    : "rgba(255,255,255,0.7)",
                backdropFilter: "blur(6px)",
                transition:
                  "transform .2s ease, box-shadow .2s ease, border-color .2s ease",
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(120deg, rgba(66,165,245,.08), transparent 30%, rgba(171,71,188,.08))",
                  pointerEvents: "none",
                },
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: (t) =>
                    t.shadows[3] +
                    ", 0 10px 30px rgba(66,165,245, .10), inset 0 0 0 1px rgba(255,255,255,.02)",
                  borderColor: "primary.main",
                },
              }}
            >
              <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1 }}>
                {group.title}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                sx={{
                  "@keyframes float": {
                    "0%,100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-3px)" },
                  },
                  "& .skill-chip": {
                    borderRadius: 2,
                    transition: "all .18s ease",
                    borderColor: "divider",
                  },
                  "& .skill-chip:hover": {
                    borderColor: "primary.main",
                    backgroundColor: (t) =>
                      t.palette.mode === "dark"
                        ? "rgba(66,165,245,.12)"
                        : "rgba(66,165,245,.10)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {group.items.map((it, i) => (
                  <Chip
                    key={it}
                    label={it}
                    size="small"
                    variant="outlined"
                    className="skill-chip"
                    sx={{
                      animation: `${
                        i % 3 === 0
                          ? "float 4.2s"
                          : i % 3 === 1
                          ? "float 4.6s"
                          : "float 4.0s"
                      } ease-in-out infinite`,
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
}
