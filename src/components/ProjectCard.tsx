// src/components/ProjectCard.tsx
import { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Chip,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Box,
  useTheme,
  alpha,
} from "@mui/material";
import {
  OpenInNew as OpenInNewIcon,
  GitHub as GitHubIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import type { Project } from "../types/project";
import { getTechChipSx } from "../utils/techColors";

type Props = {
  project: Project;
  onOpen?: (p: Project) => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
  const theme = useTheme();
  const [snack, setSnack] = useState<{ open: boolean; msg: string }>({
    open: false,
    msg: "",
  });

  const url =
    project.liveUrl || project.repoUrl || window.location.origin + "/projects";

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnack({ open: true, msg: "Link copied to clipboard" });
    } catch {
      setSnack({ open: true, msg: "Failed to copy link" });
    }
  };

  const shareProject = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if ("share" in navigator) {
      try {
        await (navigator as Navigator).share({
          title: project.title,
          text: project.summary,
          url,
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        /* user cancelled */
      }
    } else {
      await copyToClipboard(url);
    }
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: `0 12px 30px ${alpha(theme.palette.common.black, 0.12)}`,
            borderColor: "primary.main",
            "& .project-card-media": {
              transform: "scale(1.08)",
            },
          },
        }}
      >
        <CardActionArea onClick={() => onOpen?.(project)} sx={{ flexGrow: 1 }}>
          <Box sx={{ position: "relative", overflow: "hidden" }}>
            {project.cover && (
              <CardMedia
                component="img"
                height="180"
                image={project.cover}
                alt={project.title}
                className="project-card-media"
                sx={{
                  objectFit: "cover",
                  transition: "transform 0.5s ease",
                }}
              />
            )}
            {/* Gradient Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4))",
              }}
            />
          </Box>

          <CardContent sx={{ pt: 3, pb: 1 }}>
            <Typography
              variant="h6"
              fontWeight={800}
              gutterBottom
              noWrap
              sx={{ letterSpacing: "-0.02em" }}
            >
              {project.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                mb: 2,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "4.8em",
              }}
            >
              {project.summary}
            </Typography>

            <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap">
              {project.tech.slice(0, 4).map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    borderRadius: 1.5,
                    ...getTechChipSx(t),
                    "& *": { pointerEvents: "none" },
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              ))}
              {project.tech.length > 4 && (
                <Typography
                  variant="caption"
                  sx={{
                    alignSelf: "center",
                    opacity: 0.6,
                    fontWeight: 700,
                    ml: 0.5,
                  }}
                >
                  +{project.tech.length - 4} more
                </Typography>
              )}
            </Stack>
          </CardContent>
        </CardActionArea>

        <CardActions
          sx={{ justifyContent: "space-between", px: 2, pb: 2, pt: 0 }}
        >
          <Box>
            {project.repoUrl && (
              <Tooltip title="GitHub Repo">
                <IconButton
                  size="small"
                  component="a"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {project.liveUrl && (
              <Tooltip title="Live Demo">
                <IconButton
                  size="small"
                  component="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  sx={{
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Tooltip title="Share Project">
            <IconButton
              size="small"
              onClick={shareProject}
              sx={{
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => setSnack({ open: false, msg: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
