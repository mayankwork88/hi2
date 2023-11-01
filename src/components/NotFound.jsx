import { Box, Stack, Typography, useTheme } from "@mui/material";

const NotFound = () => {
  const theme = useTheme();
  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Box
        component="img"
        width={200}
        height={200}
        src="https://media.giphy.com/media/u5gsnYc4fqDVIAnlCf/giphy.gif"
      />
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: theme.palette.error.light }}
      >
        Sorry! The person you are looking for does not exist :/
      </Typography>
    </Stack>
  );
};

export default NotFound;
