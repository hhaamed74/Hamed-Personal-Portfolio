import {
  Container,
  Typography,
  Divider,
  Stack,
  Box,
  Paper,
  useTheme,
} from "@mui/material";

// استيراد الأيقونات بطريقة تمنع مشاكل TypeScript
import {
  Gavel as GavelIcon,
  InfoOutlined as InfoIcon,
  Copyright as CopyrightIcon,
  CheckCircleOutline as AcceptIcon,
  WarningAmberOutlined as WarningIcon,
  Update as UpdateIcon,
} from "@mui/icons-material";

export default function Terms() {
  const theme = useTheme();

  /**
   * دالة مساعدة لرسم العناوين مع الأيقونات بشكل متسق
   */
  const SectionHeader = ({
    icon: Icon,
    title,
  }: {
    icon: React.ElementType;
    title: string;
  }) => (
    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
      <Icon color="primary" sx={{ fontSize: 24 }} />
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>
    </Stack>
  );

  return (
    <Container sx={{ py: 8, maxWidth: "md" }}>
      {/* Header Section */}
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <GavelIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
        <Typography variant="h3" fontWeight={900} gutterBottom>
          Terms of Use
        </Typography>
        <Typography sx={{ opacity: 0.6 }}>
          Last updated: {new Date().toLocaleDateString("en-GB")}
        </Typography>
      </Box>

      <Divider sx={{ mb: 5 }} />

      <Stack spacing={5}>
        {/* Purpose */}
        <Box>
          <SectionHeader icon={InfoIcon} title="Purpose" />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.7 }}
          >
            This website serves as a professional portfolio to showcase
            <b> Full-Stack development</b> expertise, technical projects, and
            skills. The content is provided for informational and demonstration
            purposes only.
          </Typography>
        </Box>

        {/* Content & Ownership */}
        <Box>
          <SectionHeader icon={CopyrightIcon} title="Content & Ownership" />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.7 }}
          >
            All project descriptions, custom visuals, and source code samples
            are the intellectual property of the author unless stated otherwise.
            External brands, logos, and trademarks belong to their respective
            owners.
          </Typography>
        </Box>

        {/* Acceptable Use */}
        <Box>
          <SectionHeader icon={AcceptIcon} title="Acceptable Use" />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.7 }}
          >
            By accessing this site, you agree not to:
            <ul>
              <li>Attempt to disrupt the website’s security or performance.</li>
              <li>
                Use any automated systems (bots) to scrape data without
                permission.
              </li>
              <li>
                Misrepresent the authorship of the projects displayed here.
              </li>
            </ul>
          </Typography>
        </Box>

        {/* Warranty & Liability */}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor:
              theme.palette.mode === "dark"
                ? "rgba(255,183,77,0.05)"
                : "#fff9f0",
            borderColor: "#ffb74d",
          }}
        >
          <SectionHeader icon={WarningIcon} title="Warranty & Liability" />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.7 }}
          >
            The site is provided <b>“as is”</b>. While I strive for accuracy, I
            provide no warranties regarding the completeness or reliability of
            the information. I am not liable for any damages arising from the
            use of this site or reliance on its content.
          </Typography>
        </Paper>

        {/* Changes */}
        <Box sx={{ textAlign: "center", pt: 2 }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 1 }}
          >
            <UpdateIcon color="primary" fontSize="small" />
            <Typography variant="h6" fontWeight={700}>
              Changes to Terms
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            I reserve the right to update these terms at any time. Your
            continued use of the website signifies your acceptance of any
            changes.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}
