import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmployeeCard,
  SearchEmp,
  ShowEmployeeDetails,
  TabPane,
  Navbar,
} from "./components";
import { promoteEmployee } from "./store";
import { Container, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import useSearch from "./hooks/useSearch";

const App = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const state = useSelector((state) => state.company);

  const [companyInfo, setCompanyInfo] = useState(state);

  const {
    searchQuery,
    filteredEmp,
    handleSearchChange,
    handleSearchSubmit,
    handleGoBack,
  } = useSearch();

  useEffect(() => {
    setCompanyInfo(state);
  }, [state]);

  const handleEmployeePromote = (empId) => {
    dispatch(promoteEmployee(empId));
  };

  return (
    <Stack>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(2),
          py: theme.spacing(2),
        }}
      >
        <SearchEmp
          handleSearch={handleSearchChange}
          searchQuery={searchQuery}
          handleSearchSubmit={handleSearchSubmit}
        />
        {filteredEmp?.length ? (
          <>
            <TabPane
              text="searched results"
              btnText="go back"
              onClick={handleGoBack}
            />
            <Stack direction="row" p={2} gap={2} flexWrap="wrap">
              {filteredEmp.map((ele) => (
                <ShowEmployeeDetails key={ele.id} viewSelectedEmployee={ele} />
              ))}
            </Stack>
          </>
        ) : (
          <EmployeeCard
            key={companyInfo.id}
            data={companyInfo}
            handleEmployeePromote={handleEmployeePromote}
          />
        )}
      </Container>
    </Stack>
  );
};

export default App;
