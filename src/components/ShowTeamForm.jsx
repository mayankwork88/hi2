/* eslint-disable react/prop-types */
import {
  Paper,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import {ButtonGroup} from "../components";

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
        <ButtonGroup onCancel={onCancel}/>
      </Paper>
    </form>
  );
};

export default ShowTeamForm;
