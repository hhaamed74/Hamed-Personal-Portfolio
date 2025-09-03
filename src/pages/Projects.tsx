import { useMemo, useState, type ChangeEvent } from "react";
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
  Tooltip,
  Typography,
} from "@mui/material";

import {
  OpenInNew as OpenInNewIcon,
  GitHub as GitHubIcon,
  FilterAltOff as FilterAltOffIcon,
} from "@mui/icons-material";

import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../hooks/useProjects";
import type { Project } from "../types/project";
import { getTechChipSx } from "../utils/techColors";
type ViewsMap = Record<string, number>;
const VIEWS_KEY = "project-views";

const loadViews = (): ViewsMap => {
  try {
    const raw = localStorage.getItem(VIEWS_KEY);
    return raw ? (JSON.parse(raw) as ViewsMap) : {};
  } catch {
    return {};
  }
};

const saveViews = (v: ViewsMap) => {
  try {
    localStorage.setItem(VIEWS_KEY, JSON.stringify(v));
  } catch {
    // ignore
  }
};

type SortKey = "newest" | "oldest" | "popular" | "least";

export default function Projects() {
  // API
  const { data, loading, error, refetch } = useProjects(); // /projects.json

  // search & filters
  const [query, setQuery] = useState("");
  const [activeTech, setActiveTech] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortKey>("newest");

  // modal
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);

  // views (local)
  const [views, setViews] = useState<ViewsMap>(() => loadViews());
  const bumpView = (id: string) => {
    setViews((prev) => {
      const next = { ...prev, [id]: (prev[id] ?? 0) + 1 };
      saveViews(next);
      return next;
    });
  };

  // اجمع كل التقنيات من البيانات
  const allTech: string[] = useMemo(() => {
    const set = new Set<string>();
    data.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const toggleTech = (t: string) =>
    setActiveTech((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const clearFilters = () => {
    setActiveTech([]);
    setQuery("");
  };

  // فلترة النتائج
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((p) => {
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));

      const matchesTech =
        activeTech.length === 0 || activeTech.every((t) => p.tech.includes(t));

      return matchesQuery && matchesTech;
    });
  }, [data, query, activeTech]);

  const sorted = useMemo(() => {
    const enriched = filtered.map((p) => {
      const v = views[p.id] ?? (typeof p.views === "number" ? p.views : 0); // seed من JSON لو موجود

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const d = Date.parse((p as any).createdAt ?? "") || 0;

      return { p, v, d };
    });

    enriched.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.v - a.v; // الأكثر مشاهدة
        case "least":
          return a.v - b.v; // الأقل مشاهدة
        case "oldest":
          return a.d - b.d; // الأقدم
        case "newest":
        default:
          return b.d - a.d; // الأحدث
      }
    });

    return enriched.map((x) => x.p);
  }, [filtered, views, sortBy]);

  const openModal = (p: Project) => {
    setSelected(p);
    setOpen(true);
    bumpView(p.id); //  زد المشاهدات عند فتح المعاينة
  };
  const closeModal = () => {
    setOpen(false);
    setSelected(null);
  };

  const selectedViews = selected
    ? views[selected.id] ?? selected.views ?? 0
    : 0;

  return (
    <Container sx={{ py: 6 }}>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Projects
        </Typography>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            action={
              <Button color="inherit" size="small" onClick={refetch}>
                Retry
              </Button>
            }
          >
            {error}
          </Alert>
        )}

        {/* Search */}
        <TextField
          placeholder="Search by title, tech stack…"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          fullWidth
        />

        {/* Sort + Filters */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
        >
          {/* Tech Filters */}
          <Box sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {allTech.map((t) => {
                const active = activeTech.includes(t);
                return (
                  <Chip
                    key={t}
                    label={t}
                    variant={active ? "filled" : "outlined"}
                    color={active ? "primary" : "default"}
                    onClick={() => toggleTech(t)}
                    sx={getTechChipSx(t)}
                  />
                );
              })}
              {allTech.length > 0 && (
                <Tooltip title="Clear filters">
                  <IconButton onClick={clearFilters} sx={{ ml: 1 }}>
                    <FilterAltOffIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Box>

          {/* Sort by */}
          <FormControl size="small" sx={{ minWidth: 190 }}>
            <InputLabel id="sort-by-label">Sort by</InputLabel>
            <Select
              labelId="sort-by-label"
              label="Sort by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="popular">Most Viewed</MenuItem>
              <MenuItem value="least">Least Viewed</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {/* Loading Skeletons */}
      {loading ? (
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {[...Array(6)].map((_, i) => (
            <Box key={i}>
              <Skeleton
                variant="rectangular"
                height={180}
                sx={{ borderRadius: 2, mb: 1 }}
              />
              <Skeleton variant="text" height={28} />
              <Skeleton variant="text" height={22} width="80%" />
              <Skeleton variant="text" height={22} width="60%" />
            </Box>
          ))}
        </Box>
      ) : (
        <>
          {/* Grid (Box + CSS Grid) */}
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
            }}
          >
            {sorted.map((p) => (
              <Box key={p.id}>
                <ProjectCard project={p} onOpen={openModal} />
              </Box>
            ))}

            {!error && sorted.length === 0 && (
              <Box sx={{ gridColumn: "1 / -1" }}>
                <Typography sx={{ opacity: 0.7 }}>
                  No projects match your search/filters.
                </Typography>
              </Box>
            )}
          </Box>

          {/* Modal Preview */}
          <Dialog open={open} onClose={closeModal} maxWidth="md" fullWidth>
            {selected && (
              <>
                <DialogTitle>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                  >
                    <Typography variant="h6" fontWeight={700}>
                      {selected.title}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {selected.repoUrl && (
                        <Tooltip title="View Repository">
                          <IconButton
                            component="a"
                            href={selected.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <GitHubIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {selected.liveUrl && (
                        <Tooltip title="Open Live">
                          <IconButton
                            component="a"
                            href={selected.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <OpenInNewIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                  </Stack>
                </DialogTitle>

                <DialogContent dividers>
                  {/* Meta صغيرة: تاريخ + مشاهدات */}
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {selected.createdAt
                      ? `Published: ${new Date(
                          selected.createdAt
                        ).toLocaleDateString()} • `
                      : ""}
                    Views: {selectedViews}
                  </Typography>

                  <Box
                    component="img"
                    src={selected.cover}
                    alt={selected.title}
                    sx={{
                      width: "100%",
                      maxHeight: 360,
                      objectFit: "cover",
                      borderRadius: 2,
                      mt: 1,
                      mb: 2,
                    }}
                  />

                  <Typography sx={{ mb: 2 }}>{selected.summary}</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {selected.tech.map((t) => (
                      <Chip key={t} label={t} />
                    ))}
                  </Stack>
                </DialogContent>

                <DialogActions>
                  {selected.repoUrl && (
                    <Button
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      component="a"
                      href={selected.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repository
                    </Button>
                  )}
                  {selected.liveUrl && (
                    <Button
                      variant="contained"
                      startIcon={<OpenInNewIcon />}
                      component="a"
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                    </Button>
                  )}
                  <Button onClick={closeModal}>Close</Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </>
      )}
    </Container>
  );
}
