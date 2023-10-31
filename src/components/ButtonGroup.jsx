import { useTheme } from "@emotion/react";
import {Box,Button} from '@mui/material';

const ButtonGroup = ({onCancel}) => {
    const theme = useTheme();
  return (
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
  );
}

export default ButtonGroup;
