import { Paper, Typography, Box, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";

const ShowEmployeeDetails = ({ viewSelectedEmployee }) => {
  const theme = useTheme();
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
        <Box display="flex" gap={2}>
          <Typography variant="subtitle1"> Role : </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
          >
            {viewSelectedEmployee.role}
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Typography variant="subtitle1"> Name : </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", textTransform: "capitalize" }}
          >
            {viewSelectedEmployee.name}
          </Typography>
        </Box>
        {viewSelectedEmployee?.email && (
          <Box display="flex" gap={2}>
            <Typography variant="subtitle1"> Email : </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", textTransform: "capitalize" }}
            >
              {viewSelectedEmployee.email}
            </Typography>
          </Box>
        )}
        {viewSelectedEmployee?.phone && (
          <Box display="flex" gap={2}>
            <Typography variant="subtitle1"> Phone : </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", textTransform: "capitalize" }}
            >
              {viewSelectedEmployee.phone}
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default ShowEmployeeDetails;
