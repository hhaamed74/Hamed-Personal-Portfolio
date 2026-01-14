import {
  Container,
  Box,
  Typography,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import usePageMeta from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("404 – Page Not Found");
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container
      sx={{ py: { xs: 8, md: 15 }, position: "relative", overflow: "hidden" }}
    >
      {/* Dynamic Background Gradients */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background: `
            radial-gradient(800px 300px at 20% 0%, ${alpha(
              theme.palette.primary.main,
              0.15
            )}, transparent 60%),
            radial-gradient(700px 280px at 110% 20%, ${alpha(
              theme.palette.secondary.main,
              0.1
            )}, transparent 60%)
          `,
        }}
      />

      <Box
        sx={{
          display: "grid",
          justifyItems: "center",
          textAlign: "center",
          minHeight: "40vh",
          alignContent: "center",
        }}
      >
        {/* Animated 404 Text */}
        <Typography
          component="div"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "120px", sm: "180px" },
            lineHeight: 1,
            letterSpacing: "-0.05em",
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
            filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.1))",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          fontWeight={900}
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Oops! Lost in Space?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: "500px",
            mx: "auto",
            color: "text.secondary",
            mb: 5,
            lineHeight: 1.6,
          }}
        >
          The page you’re looking for doesn’t exist or has been moved to another
          galaxy. Let's get you back on track!
        </Typography>

        {/* Action Buttons Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            size="large"
            startIcon={<ArrowBackIcon />}
            sx={{
              borderRadius: 3,
              px: 3,
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            Go Back
          </Button>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            sx={{
              borderRadius: 3,
              px: 4,
              fontWeight: 700,
              textTransform: "none",
              boxShadow: theme.shadows[4],
            }}
          >
            Home Base
          </Button>

          <Button
            component={RouterLink}
            to="/projects"
            variant="text"
            size="large"
            startIcon={<WorkIcon />}
            sx={{
              fontWeight: 700,
              textTransform: "none",
              color: "text.primary",
            }}
          >
            Our Work
          </Button>

          <Button
            component={RouterLink}
            to="/features"
            variant="text"
            size="large"
            startIcon={<SearchIcon />}
            sx={{
              fontWeight: 700,
              textTransform: "none",
              color: "text.primary",
            }}
          >
            Explore
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
