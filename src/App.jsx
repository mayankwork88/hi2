import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  EmployeeCard,
  SearchEmp,
  ShowEmployeeDetails,
  TabPane,
  Navbar,
  NotFound,
} from "./components";

import { Container, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import useSearch from "./hooks/useSearch";

const App = () => {
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
        {filteredEmp ? (
          <>
            <TabPane
              text="searched results"
              btnText="go back"
              onClick={handleGoBack}
            />
            {filteredEmp === "notFound" ? (
              <NotFound />
            ) : (
              <>
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  p={2}
                  gap={2}
                  flexWrap="wrap"
                >
                  {filteredEmp.map((ele) => (
                    <ShowEmployeeDetails
                      key={ele.id}
                      viewSelectedEmployee={ele}
                    />
                  ))}
                </Stack>
              </>
            )}
          </>
        ) : (
          <EmployeeCard key={companyInfo.id} data={companyInfo} />
        )}
      </Container>
    </Stack>
  );
};

export default App;
