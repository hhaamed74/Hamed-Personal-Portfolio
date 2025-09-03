import { Container, Box, Typography, Button } from "@mui/material";
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

  return (
    <Container sx={{ py: 10, position: "relative" }}>
      {/* خلفية لطيفة */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
          background:
            "radial-gradient(800px 300px at 20% 0%, rgba(25,118,210,.12), transparent 60%), radial-gradient(700px 280px at 110% 20%, rgba(156,39,176,.10), transparent 60%)",
        }}
      />

      {/* Box Grid لتمركز المحتوى */}
      <Box
        sx={{
          display: "grid",
          justifyItems: "center",
          rowGap: 2.5,
          textAlign: "center",
          minHeight: "50vh",
          alignContent: "center",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontWeight: 900,
            fontSize: { xs: "96px", sm: "140px" },
            lineHeight: 1,
            letterSpacing: "4px",
            backgroundImage:
              "linear-gradient(90deg, #42a5f5 0%, #90caf9 35%, #ce93d8 70%, #ab47bc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          404
        </Typography>

        <Typography variant="h5" fontWeight={800}>
          Page not found
        </Typography>
        <Typography sx={{ opacity: 0.8, mb: 2 }}>
          The page you’re looking for doesn’t exist or was moved.
        </Typography>

        {/* أزرار الحركة - Grid */}
        <Box
          sx={{
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(4, max-content)",
            },
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Button
            onClick={() => navigate(-1)}
            variant="text"
            startIcon={<ArrowBackIcon />}
            sx={{ justifySelf: { xs: "stretch", sm: "center" } }}
          >
            Back
          </Button>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<HomeIcon />}
            sx={{ justifySelf: { xs: "stretch", sm: "center" } }}
          >
            Go Home
          </Button>

          <Button
            component={RouterLink}
            to="/projects"
            variant="outlined"
            startIcon={<WorkIcon />}
            sx={{ justifySelf: { xs: "stretch", sm: "center" } }}
          >
            View Projects
          </Button>

          <Button
            component={RouterLink}
            to="/features"
            variant="text"
            startIcon={<SearchIcon />}
            sx={{ justifySelf: { xs: "stretch", sm: "center" } }}
          >
            Explore Features
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
