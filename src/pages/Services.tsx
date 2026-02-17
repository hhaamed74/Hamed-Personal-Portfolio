import {
  Container,
  Typography,
  Box,
  Stack,
  Paper,
  Button,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CheckCircleOutline as CheckIcon,
  Devices as DevicesIcon,
  Code as CodeIcon,
  Storage as StorageIcon,
  ContactSupport as ContactIcon,
  Web as WebIcon,
  Terminal as TerminalIcon,
  SettingsSuggest as SettingsIcon,
} from "@mui/icons-material";
import { memo } from "react";

const WHATSAPP_URL = "https://wa.me/966531374945";

const SERVICES_DATA = [
  {
    title: "Premium Landing Pages",
    price: "Starts from $150",
    icon: <DevicesIcon sx={{ fontSize: 40 }} color="primary" />,
    description:
      "High-speed, SEO-optimized single page websites designed to convert visitors into customers.",
    features: [
      "Responsive (Mobile-First) Design",
      "Vite + React for Ultra-Fast Loading",
      "SEO & Meta Tags Setup",
      "Modern Animations (Framer Motion)",
    ],
    tech: "React • Tailwind • shadcn/ui",
  },
  {
    title: "Laravel Web Applications",
    price: "Starts from $400",
    icon: <SettingsIcon sx={{ fontSize: 40 }} color="primary" />,
    description:
      "Professional enterprise-grade applications built with the power of Laravel framework.",
    features: [
      "Blade or React/Inertia Frontend",
      "Complex Business Logic",
      "Secure Admin Control Panel",
      "E-commerce & Payments Integration",
    ],
    tech: "PHP • Laravel • MySQL",
  },
  {
    title: "Full-Stack Web Systems",
    price: "Custom Quote",
    icon: <CodeIcon sx={{ fontSize: 40 }} color="primary" />,
    description:
      "End-to-end dynamic web solutions with real-time data and advanced user interactions.",
    features: [
      "Secure Authentication (JWT)",
      "Role-Based Access Control (RBAC)",
      "Interactive Dashboards",
      "API First Architecture",
    ],
    tech: "Node.js • React • MongoDB/PostgreSQL",
  },
  {
    title: "Custom Backend Services",
    price: "Starts from $250",
    icon: <StorageIcon sx={{ fontSize: 40 }} color="primary" />,
    description:
      "Building the engine that powers your apps with focus on security and scalability.",
    features: [
      "RESTful API Development",
      "Database Modeling & Migration",
      "Third-party Service Integration",
      "Cloud Deployment Ready",
    ],
    tech: "Node.js • Express • Laravel API",
  },
  {
    title: "Frontend Refactoring",
    price: "Starts from $200",
    icon: <WebIcon sx={{ fontSize: 40 }} color="primary" />,
    description:
      "Upgrading your existing website to a modern look with the latest web technologies.",
    features: [
      "Migration to React/TypeScript",
      "UI/UX Enhancement with MUI",
      "Performance Optimization",
      "Component-Based Architecture",
    ],
    tech: "React • TypeScript • Material UI",
  },
  {
    title: "Technical Consultation",
    price: "$50 / Session",
    icon: <TerminalIcon sx={{ fontSize: 40 }} color="primary" />,
    description:
      "Expert advice on architecture, code review, and solving complex technical bugs.",
    features: [
      "Code Quality Audit",
      "Database Optimization Tips",
      "Architecture Planning",
      "Deployment Strategies",
    ],
    tech: "All Stack Knowledge",
  },
];

const Services = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Container sx={{ py: 8 }}>
      {/* Header Section */}
      <Stack spacing={2} textAlign="center" sx={{ mb: 8 }}>
        <Typography variant="h3" fontWeight={900} color="primary">
          Professional Services
        </Typography>
        <Typography
          variant="h6"
          sx={{ opacity: 0.8, maxWidth: 800, mx: "auto" }}
        >
          I offer specialized web development services using industry-leading
          technologies. Ready to transform your ideas into high-quality digital
          products.
        </Typography>
      </Stack>

      {/* Services Grid */}
      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        {SERVICES_DATA.map((service, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: isDarkMode
                ? "rgba(255,255,255,0.02)"
                : "rgba(0,0,0,0.01)",
              backdropFilter: "blur(10px)",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-10px)",
                borderColor: "primary.main",
                boxShadow: `0 15px 35px -10px ${theme.palette.primary.main}30`,
              },
            }}
          >
            <Box sx={{ mb: 2 }}>{service.icon}</Box>
            <Typography variant="h5" fontWeight={800} gutterBottom>
              {service.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary.main"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              {service.price}
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.7, mb: 3, height: 60, overflow: "hidden" }}
            >
              {service.description}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <List sx={{ mb: "auto" }}>
              {service.features.map((feat, idx) => (
                <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={feat}
                    primaryTypographyProps={{
                      variant: "body2",
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
              ))}
            </List>

            <Typography
              variant="caption"
              sx={{ mt: 3, mb: 2, display: "block", color: "text.secondary" }}
            >
              Main Tech: <strong>{service.tech}</strong>
            </Typography>

            <Button
              variant="contained"
              fullWidth
              sx={{ borderRadius: 2, py: 1.5, fontWeight: 700 }}
              href={WHATSAPP_URL}
              target="_blank"
            >
              Order Now
            </Button>
          </Paper>
        ))}
      </Box>

      {/* Footer Call To Action */}
      <Box
        sx={{
          mt: 10,
          textAlign: "center",
          p: { xs: 4, md: 8 },
          borderRadius: 6,
          bgcolor: isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          border: "1px dashed",
          borderColor: "primary.main",
        }}
      >
        <Typography variant="h4" fontWeight={900} gutterBottom>
          Need a Custom Solution?
        </Typography>
        <Typography sx={{ mb: 4, opacity: 0.8, maxWidth: 600, mx: "auto" }}>
          If your project doesn't fit into these categories, don't worry. I can
          build tailor-made systems specifically for your business logic.
        </Typography>
        <Button
          variant="outlined"
          size="large"
          startIcon={<ContactIcon />}
          sx={{ px: 6, py: 1.5, borderRadius: 2, fontWeight: 700 }}
          href={WHATSAPP_URL}
          target="_blank"
        >
          Contact Me via WhatsApp
        </Button>
      </Box>
    </Container>
  );
};

export default memo(Services);
