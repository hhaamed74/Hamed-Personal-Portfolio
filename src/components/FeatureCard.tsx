import {
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  skills?: string[];
};

export default function FeatureCard({
  icon,
  title,
  subtitle,
  description,
  skills = [],
}: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        transition: "transform .2s ease, box-shadow .2s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
      }}
      elevation={2}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              width: 48,
              height: 48,
              boxShadow: 3,
            }}
          >
            {icon}
          </Avatar>

          <Stack spacing={0.3} flex={1}>
            <Typography variant="h6" fontWeight={800}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" sx={{ opacity: 0.75 }}>
                {subtitle}
              </Typography>
            )}
          </Stack>
        </Stack>

        <Typography sx={{ mt: 2, mb: 1.5 }}>{description}</Typography>

        {skills.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {skills.map((s) => (
              <Chip key={s} label={s} size="small" sx={{ mb: 1 }} />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
