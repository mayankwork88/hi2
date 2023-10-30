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

const App = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const state = useSelector((state) => state.company);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyInfo, setCompanyInfo] = useState(state);
  const [filteredEmp, setFilteredEmp] = useState([]);

  useEffect(() => {
    setCompanyInfo(state);
  }, [state]);

  const handleEmployeePromote = (empId) => {
    dispatch(promoteEmployee(empId));
  };
  const searchedResults = [];
  const getSelectedEmployee = (tree, query) => {
    const isName = tree?.name?.toLowerCase()?.includes(query?.toLowerCase());
    const isEmail = tree?.email?.toLowerCase()?.includes(query?.toLowerCase());
    const isPhone = tree?.phone?.toLowerCase()?.includes(query?.toLowerCase());
    if (isName || isEmail || isPhone) {
      searchedResults.push(tree);
    }
    if (tree.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        getSelectedEmployee(team, query);
      }
    }
    return null; // Member with the specified ID not found
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.length) {
      getSelectedEmployee(state, searchQuery);
      setFilteredEmp(searchedResults);
    }
  };

  const handleGoBack = () => {
    setFilteredEmp([]);
    setSearchQuery("");
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
          <TabPane
            text="searched results"
            btnText="go back"
            onClick={handleGoBack}
          />
        ) : null}
        {filteredEmp?.length ? (
          <Stack direction="row" p={2} gap={2} flexWrap="wrap">
            {filteredEmp.map((ele) => (
              <ShowEmployeeDetails key={ele.id} viewSelectedEmployee={ele} />
            ))}
          </Stack>
        ) : (
          <EmployeeCard
            key={companyInfo.id}
            data={companyInfo}
            handleTeamChange={handleTeamChange}
            handleEmployeePromote={handleEmployeePromote}
          />
        )}
      </Container>
    </Stack>
  );
};

export default App;
