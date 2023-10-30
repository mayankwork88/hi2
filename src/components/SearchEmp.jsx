import { Button, Stack, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";

const SearchEmp = ({ handleSearch, searchQuery, handleSearchSubmit }) => {
  const theme = useTheme();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const getInput = (
    placeholder,
    name,
    value,
    onInputChange,
    onInputKeyDown
  ) => (
    <TextField
      sx={{ background: "#fff", textTransform: "capitalize" }}
      required
      fullWidth
      id={name}
      variant="outlined"
      size="large"
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onInputChange}
      onKeyDown={onInputKeyDown}
    />
  );
  return (
    <Stack direction="row" gap={theme.spacing(2)}>
      {getInput(
        "Search...",
        "search",
        searchQuery,
        handleSearch,
        handleKeyDown
      )}
      <Button
        variant="contained"
        sx={{ minWidth: 100 }}
        onClick={handleSearchSubmit}
      >
        Search
      </Button>
    </Stack>
  );
};

export default SearchEmp;
