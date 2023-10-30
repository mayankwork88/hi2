import { Stack, Typography, Button } from "@mui/material";

const TabPane = ({ text, btnText, onClick }) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", textTransform: "capitalize" }}
      >
        {text}
      </Typography>
      <Button variant="outlined" onClick={onClick}>
        {btnText}
      </Button>
    </Stack>
  );
};

export default TabPane;
