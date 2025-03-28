import { Box, Typography } from "@mui/material";

export default function EmptyPosts() {
  return (
    <Box sx={{ maxWidth: 500, mx: "auto", my: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Príspevky
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Žiadne príspevky na zobrazenie.
      </Typography>
    </Box>
  );
}
