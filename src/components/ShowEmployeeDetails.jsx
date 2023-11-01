import { Paper, Typography, Box, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const ShowEmployeeDetails = ({ viewSelectedEmployee }) => {
  const theme = useTheme();

  const getTextLayout = (label, value) => {
    return (
      <Box display="flex" gap={2} width={320}>
        <Typography variant="subtitle1"> {label} : </Typography>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", textTransform: "capitalize" }}
        >
          {value}
        </Typography>
      </Box>
    );
  };
  return (
    <Paper
      elevation={4}
      sx={{
        p: theme.spacing(4, 5),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: theme.spacing(3),
      }}
    >
      <Stack>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textTransform: "capitalize" }}
        >
          {viewSelectedEmployee.email ? "Employee Info" : "Team Info"}
        </Typography>
        {getTextLayout("Role", viewSelectedEmployee.role)}
        {getTextLayout("Name", viewSelectedEmployee.name)}
        {viewSelectedEmployee?.email &&
          getTextLayout("Email", viewSelectedEmployee.email)}
        {viewSelectedEmployee?.phone &&
          getTextLayout("Phone", viewSelectedEmployee.phone)}
      </Stack>
    </Paper>
  );
};

export default ShowEmployeeDetails;
