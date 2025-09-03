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
} from "@mui/material";
import {
  OpenInNew as OpenInNewIcon,
  GitHub as GitHubIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import type { Project } from "../types/project";
import { getTechChipSx } from "../utils/techColors"; //  ألوان ثابتة

type Props = {
  project: Project;
  onOpen?: (p: Project) => void;
};

export default function ProjectCard({ project, onOpen }: Props) {
  const [snack, setSnack] = useState<{ open: boolean; msg: string }>({
    open: false,
    msg: "",
  });

  const url =
    project.liveUrl || project.repoUrl || window.location.origin + "/projects";

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setSnack({ open: true, msg: "Link copied to clipboard" });
    } catch {
      setSnack({ open: true, msg: "Failed to copy link" });
    }
  };

  const shareProject = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      if ("share" in navigator) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (navigator as any).share({
          title: project.title,
          text: project.summary,
          url,
        });
      } else {
        await copyToClipboard(url);
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
        <CardActionArea onClick={() => onOpen?.(project)}>
          {project.cover && (
            <CardMedia
              component="img"
              height="160"
              image={project.cover}
              alt={project.title}
              sx={{ objectFit: "cover" }}
            />
          )}

          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom noWrap>
              {project.title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }} paragraph>
              {project.summary}
            </Typography>

            {/* ✅ شارات ملوّنة داخل الكارت */}
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {project.tech.slice(0, 6).map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  sx={{
                    ...getTechChipSx(t),
                    // منع فتح المودال عند الضغط على الشارة
                    "& *": { pointerEvents: "none" },
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              ))}
              {project.tech.length > 6 && (
                <Chip
                  size="small"
                  label={`+${project.tech.length - 6}`}
                  variant="outlined"
                  onMouseDown={(e) => e.stopPropagation()}
                />
              )}
            </Stack>
          </CardContent>
        </CardActionArea>

        <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
          <Stack direction="row" spacing={1}>
            {project.repoUrl && (
              <Tooltip title="Repository">
                <IconButton
                  component="a"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Repository"
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            )}
            {project.liveUrl && (
              <Tooltip title="Live demo">
                <IconButton
                  component="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Live demo"
                >
                  <OpenInNewIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>

          <Tooltip title="Share">
            <IconButton aria-label="Share project" onClick={shareProject}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      <Snackbar
        open={snack.open}
        autoHideDuration={1400}
        onClose={() => setSnack({ open: false, msg: "" })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack({ open: false, msg: "" })}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
