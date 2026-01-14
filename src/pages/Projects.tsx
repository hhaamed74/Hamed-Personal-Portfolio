import { useMemo, useState, useCallback, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

// Assets & Icons
import promanager from "../assets/promanager.png";
import hamedstore from "../assets/hamedstore.png";
import {
  OpenInNew as OpenInNewIcon,
  GitHub as GitHubIcon,
  FilterAltOff as FilterAltOffIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

// Components & Hooks
import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../hooks/useProjects";
import type { Project } from "../types/project";

type SortKey = "newest" | "oldest" | "popular";
const VIEWS_KEY = "portfolio_local_views";

export default function Projects() {
  const { data: apiData, loading, error, refetch } = useProjects();

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("newest");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [localViews, setLocalViews] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem(VIEWS_KEY);
    if (saved) setLocalViews(JSON.parse(saved));
  }, []);

  const data = useMemo(() => {
    const manualProjects: Project[] = [
      {
        id: "promanager-01",
        title: "ProManager – MERN System",
        summary: "Advanced project management with JWT security.",
        description:
          "A comprehensive solution for teams to manage tasks and track deadlines.",
        tech: ["MongoDB", "Express", "React", "Node", "JWT"],
        cover: promanager,
        repoUrl: "https://github.com/hhaamed74/promanager-api.git",
        liveUrl: "https://github.com/hhaamed74/promanager-frontend",
        views: 120,
        category: "fullstack",
        createdAt: "2024-01-10T10:00:00Z",
      },
      {
        id: "hamedstore-02",
        title: "Hamed Store – E-Commerce",
        summary: "Full-featured store with admin dashboard.",
        description:
          "Includes an admin panel, integrated search, and checkout flow.",
        tech: ["React", "Node", "Redux", "MUI", "MongoDB"],
        cover: hamedstore,
        repoUrl: "https://github.com/hhaamed74/hamed-store",
        liveUrl: "https://hamed-store-jt1l.vercel.app/",
        views: 245,
        category: "fullstack",
        createdAt: "2024-01-05T08:30:00Z",
      },
    ];
    return [...manualProjects, ...apiData];
  }, [apiData]);

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = data.filter(
      (p) =>
        !q ||
        [p.title, p.summary, ...p.tech].some((t) => t.toLowerCase().includes(q))
    );

    return result.sort((a, b) => {
      if (sortBy === "popular") {
        const vA = (a.views || 0) + (localViews[a.id] || 0);
        const vB = (b.views || 0) + (localViews[b.id] || 0);
        return vB - vA;
      }
      const dA = new Date(a.createdAt).getTime();
      const dB = new Date(b.createdAt).getTime();
      return sortBy === "oldest" ? dA - dB : dB - dA;
    });
  }, [data, query, sortBy, localViews]);

  const preconnectToLink = useCallback((url?: string) => {
    if (!url) return;
    try {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = new URL(url).origin;
      document.head.appendChild(link);
    } catch {
      /* ignore */
    }
  }, []);

  const openModal = (p: Project) => {
    setSelected(p);
    setOpen(true);
    const updated = { ...localViews, [p.id]: (localViews[p.id] || 0) + 1 };
    setLocalViews(updated);
    localStorage.setItem(VIEWS_KEY, JSON.stringify(updated));
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 8, // زيادة الـ Padding الرأسي
        pb: 12, // ضمان مسافة تحت الكروت
        minHeight: "100vh",
      }}
    >
      <Stack spacing={2} sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          fontWeight={900}
          sx={{ fontSize: { xs: "2rem", md: "3rem" } }}
        >
          Portfolio Projects
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore my latest full-stack applications.
        </Typography>
      </Stack>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 4 }}
          action={
            <Button color="inherit" onClick={refetch}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Filter Bar */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 6 }}>
        <TextField
          placeholder="Search tech..."
          fullWidth
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: query && (
              <IconButton
                size="small"
                onClick={() => setQuery("")}
                color="error"
              >
                <FilterAltOffIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 180 } }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value as SortKey)}
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="popular">Popular</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Grid - تم حل مشكلة الـ Scrollbar هنا */}
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          width: "100%",
        }}
      >
        {loading
          ? [...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={280}
                sx={{ borderRadius: 2 }}
              />
            ))
          : filteredAndSorted.map((p) => (
              <Box
                key={p.id}
                onMouseEnter={() => preconnectToLink(p.liveUrl)}
                sx={{
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-8px)" },
                }}
              >
                <ProjectCard project={p} onOpen={openModal} />
              </Box>
            ))}
      </Box>

      {/* Detail Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selected && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight={800}>
                {selected.title}
              </Typography>
              <Box>
                {selected.repoUrl && (
                  <IconButton
                    size="small"
                    href={selected.repoUrl}
                    target="_blank"
                  >
                    <GitHubIcon />
                  </IconButton>
                )}
                {selected.liveUrl && (
                  <IconButton
                    size="small"
                    href={selected.liveUrl}
                    target="_blank"
                    color="primary"
                  >
                    <OpenInNewIcon />
                  </IconButton>
                )}
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box
                component="img"
                src={selected.cover}
                sx={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                }}
              />
              <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <TrendingUpIcon color="primary" fontSize="small" />
                  <Typography variant="caption">
                    Views:{" "}
                    {(selected.views || 0) + (localViews[selected.id] || 0)}
                  </Typography>
                  <Chip
                    label={selected.category?.toUpperCase() || "WEB"}
                    size="small"
                    color="secondary"
                    variant="outlined"
                    sx={{ height: 20, fontSize: "0.6rem" }}
                  />
                </Stack>
                <Typography variant="body2">
                  {selected.description || selected.summary}
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                  {selected.tech.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      size="small"
                      sx={{ fontSize: "0.7rem" }}
                    />
                  ))}
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}
