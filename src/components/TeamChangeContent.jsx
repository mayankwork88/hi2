/* eslint-disable react/prop-types */
import { Paper, Stack, Typography, Radio, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ButtonGroup } from "../components";

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
        <ButtonGroup onCancel={onCancel} />
      </Paper>
    </form>
  );
};

export default TeamChangeContent;
