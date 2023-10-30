import { useState } from "react";
import { useSelector } from "react-redux";

const useSearch = () => {
  const state = useSelector((state) => state.company);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmp, setFilteredEmp] = useState([]);

  //SEARCH THROUGH THE ENTIRE STATE AND SET THE RESULT IN BELOW ARRAY AS PER THE QUERY
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

  // GET THE VALUE OF SEARCH AND STORE IT IN A STATE
  const handleSearchChange = (event) => {
    setSearchQuery(event?.target?.value || "");
  };

  // SHOW THE SEARCH RESULTS ACCORDING TO THE ENTERED QUERY
  const handleSearchSubmit = () => {
    if (searchQuery?.length) {
      //GET ALL THE EMPLOYEE MATCHES WITH THE QUERY
      getSelectedEmployee(state, searchQuery);

      //STORE THE RESULT IN A STATE
      setFilteredEmp(searchedResults);
    }
  };

  //HANDLE BACK
  const handleGoBack = () => {
    setFilteredEmp([]);
    setSearchQuery("");
  };
  return {
    searchQuery,
    filteredEmp,
    handleSearchChange,
    handleSearchSubmit,
    handleGoBack,
  };
};

export default useSearch;
