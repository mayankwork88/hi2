const useUtils = () => {
  // CHECK FOR ENTERED TEAM NAME -> EXIST OR NOT
  const isTeamNameExist = (tree, name) => {
    //IF ENTERED NAME MATCHES WITH ANY NAME IN THE STATE RETURN TRUE
    if (tree.name.toLowerCase() === name.toLowerCase() && !tree.email) {
      return true;
    }

    //CHECK THE ENTIRE STATE RECURSIVELY
    if (tree.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const ifExist = isTeamNameExist(team, name);
        if (ifExist) return true;
      }
    }

    return false; // TEAM NAME IS NOT EXIST
  };

  // CHECK FOR TEAM LEAD IN A TEAM -> EXIST OR NOT
  const isTeamLeadExist = (tree, id) => {
    //FIND THE TEAM IN WHICH USER WANT TO ADD A TEAM LEAD AND RETURN TRUE IF EXIST
    if (tree.id === id) {
      return tree.teams.some((emp) => emp.role.toLowerCase() === "lead");
    }

    //CHECK THE ENTIRE STATE RECURSIVELY
    if (tree.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const ifExist = isTeamLeadExist(team, id);
        if (ifExist) return true;
      }
    }

    return false; // RETURN FALSE IF TEAM LEAD IS NOT EXIST
  };

  // FIND THE NUMBER OF MEMBER IN A TEAM
  const getTeamStatsByEmployeeId = (tree, id) => {
    //FIND THE TEAM IN WHICH USER WANT TO KNOW THE NUMBER OF MEMBER
    if (tree?.teams?.some((emp) => emp.id === id)) {
      //IF EXIST - RETURN THE NO. OF MEMBER
      return {member:tree?.teams?.filter((el) => el.role.toLowerCase() === "member")
      ?.length,
    lead:tree?.teams?.filter((el) => el.role.toLowerCase() === "lead")
    ?.length}
    }

    //CHECK THE ENTIRE STATE RECURSIVELY
    if (tree?.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const stats = getTeamStatsByEmployeeId(team, id);
        if (stats) return stats;
      }
    }

    return null; // RETURN FALSE IF TEAM IS NOT EXIST
  };

  //FIND THE TEAM OF AN EMPLOYEE
  const getTeamById = (tree, id) => {
    //CHECK FOR EMPLOYEE ID IN TEAM IF MATCHES RETURN TEAM
    if (tree?.teams?.some((emp) => emp.id === id)) {
      return tree;
    }

    //CHECK THE ENTIRE STATE RECURSIVELY
    if (tree?.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const stats = getTeamById(team, id);
        if (stats) return stats;
      }
    }
    return null; // RETURN FALSE IF TEAM IS NOT EXIST
  };

  // FIND THE HEAD/DEPARTMENT BY EMPLOYEE ID
  const findDepartmentByMemberId = (tree, employeeId) => {
    //CHECK FOR EMPLOYEE ID IN HEAD IF MATCHES RETURN HEAD/DEPARTMENT
    if (
      tree?.teams?.some((ele) => ele?.teams?.some((el) => el.id === employeeId))
    ) {
      return tree;
    }

    //CHECK THE ENTIRE STATE RECURSIVELY
    if (tree?.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const stats = findDepartmentByMemberId(team, employeeId);
        if (stats) {
          return stats;
        }
      }
    }

    return null; // RETURN FALSE IF HEAD IS NOT EXIST
  };

  // GET THE SELECTED EMPLOYEE DETAIL BY HIS/HER ID
  const getSelectedEmployee = (tree, id) => {
    //CHECK FOR EMPLOYEE ID IN STATE IF MATCHES RETURN THE EMPLOYEE
    if (tree.id === id) {
      return tree;
    }

    //CHECK THE ENTIRE STATE RECURSIVELY
    if (tree.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const member = getSelectedEmployee(team, id);
        if (member) {
          return member;
        }
      }
    }

    return null; // RETURN FALSE IF EMPLOYEE IS NOT EXIST
  };

  return {
    isTeamNameExist,
    getTeamStatsByEmployeeId,
    getTeamById,
    findDepartmentByMemberId,
    getSelectedEmployee,
    isTeamLeadExist,
  };
};

export default useUtils;
