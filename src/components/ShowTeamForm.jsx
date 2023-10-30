/* eslint-disable react/prop-types */
import {
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const ShowTeamForm = ({ onChange, value, onSubmit, onCancel, error }) => {
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  const getInput = (
    placeholder,
    disabled,
    name,
    select,
    label,
    value,
    onInputChange
  ) => (
    <TextField
      sx={{ background: "#fff", textTransform: "capitalize" }}
      disabled={disabled}
      required
      fullWidth
      id={name}
      select={select}
      label={label}
      variant="outlined"
      size="large"
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onInputChange}
      error={error.error}
      helperText={error.message}
    />
  );
  return (
    <form onSubmit={handleSubmit}>
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
        <Typography variant="h4" component="h1">
          Add Team
        </Typography>
        <Stack width={"100%"} gap={theme.spacing(2)}>
          {getInput(
            "Team Name",
            false,
            "name",
            false,
            "Team Name",
            value?.name,
            onChange
          )}
        </Stack>
        <Box display={"flex"} width="100%" gap={theme.spacing(2)}>
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              fontSize: "1.2rem",
              letterSpacing: "3px",
              p: theme.spacing(1, 0),
            }}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              fontSize: "1.2rem",
              letterSpacing: "3px",
              p: theme.spacing(1, 0),
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </form>
  );
};

export default ShowTeamForm;
