import { Typography, styled } from "@mui/material";

export const RoleBadge = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(0.3, 1),
  borderRadius: theme.spacing(0.5),
  marginLeft: theme.spacing(1),
}));
