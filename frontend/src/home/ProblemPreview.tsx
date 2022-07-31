import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import Stack from "@mui/material/Stack";

export interface ProblemPreviewProps {
  author: string;
  hasCompleted: boolean;
  showDarkBackground: boolean;
  title: string;
}

export const ProblemPreview = ({
  author,
  hasCompleted,
  showDarkBackground,
  title,
}: ProblemPreviewProps) => (
  <Box sx={{ backgroundColor: showDarkBackground ? "grey" : "lightgrey" }}>
    <Stack direction="row" alignItems="center" spacing={3}>
      <Box minWidth="1rem">{hasCompleted ? <CheckIcon /> : null}</Box>
      <Typography>{title}</Typography>
      <Typography>•</Typography>
      <Typography>{author}</Typography>
    </Stack>
  </Box>
);
