/* eslint-disable react/prop-types */
import { Paper, Stack, Typography, Radio, Button, Box } from "@mui/material";
import { useTheme } from "@emotion/react";

const TeamChangeContent = ({
  teamsInADepartment,
  selectedTeam,
  setSelectedTeam,
  onSubmit,
  onCancel,
}) => {
  const theme = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

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
          Change Team
        </Typography>
        <Stack width={"100%"} gap={theme.spacing(2)}>
          {teamsInADepartment?.map((team) => (
            <Box
              key={team.id}
              display={"flex"}
              justifyContent="flex-start"
              alignItems="center"
              sx={{ border: `1px solid ${theme.palette.primary.main}` }}
            >
              <Radio
                checked={
                  selectedTeam?.currentTeamName?.toLowerCase() ===
                  team?.name?.toLowerCase()
                }
                onChange={() => setSelectedTeam(team)}
                value={selectedTeam?.currentTeamName}
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <Typography variant="h5">Team {team?.name}</Typography>
            </Box>
          ))}
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

export default TeamChangeContent;
