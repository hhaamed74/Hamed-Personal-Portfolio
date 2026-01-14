import {
  Card,
  CardContent,
  Stack,
  Typography,
  Chip,
  Avatar,
  Box,
  useTheme,
  alpha,
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
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 5, // حواف أنعم شوية
        border: "1px solid",
        borderColor:
          theme.palette.mode === "dark"
            ? alpha(theme.palette.divider, 0.1)
            : "divider",
        bgcolor:
          theme.palette.mode === "dark"
            ? alpha(theme.palette.background.paper, 0.5)
            : "background.paper",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", // حركة ارتدادية خفيفة (Pop)
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: `0 20px 40px ${alpha(theme.palette.common.black, 0.15)}`, // ظل أقوى وأنعم عند الـ hover
          borderColor: "primary.main",
        },
      }}
    >
      <CardContent sx={{ p: 4, flexGrow: 1 }}>
        <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 3 }}>
          <Avatar
            variant="rounded"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              width: 56,
              height: 56,
              borderRadius: 3,
              boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}`, // توهج تحت الأيقونة
              // لضمان أن أي أيقونة داخلية يكون لونها أبيض
              "& svg": {
                color: "#ffffff",
                fontSize: "1.75rem",
              },
            }}
          >
            {icon}
          </Avatar>

          <Box>
            <Typography
              variant="h6"
              fontWeight={900}
              sx={{ lineHeight: 1.1, mb: 0.5 }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="caption"
                sx={{
                  color: "primary.main",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  fontSize: "0.65rem",
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.8,
            mb: 4,
            fontSize: "0.95rem",
            minHeight: "50px",
          }}
        >
          {description}
        </Typography>

        {skills.length > 0 && (
          <Box sx={{ mt: "auto" }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {skills.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  size="small"
                  variant="filled" // الفيلد بيدي تباين أحلى مع خلفية الكارت
                  sx={{
                    borderRadius: 1.5,
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    color: "primary.main",
                    border: "1px solid transparent",
                    transition: "0.3s",
                    "&:hover": {
                      bgcolor: "primary.main",
                      color: "#ffffff",
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
