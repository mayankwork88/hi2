const useUtils = () => {
  const isTeamNameExist = (tree, name) => {
    if (tree.name.toLowerCase() === name.toLowerCase()) {
      return true;
    }
    if (tree.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const ifExist = isTeamNameExist(team, name);
        if (ifExist) return true;
      }
    }
    return false; // team name is not exist
  };

  const getTeamStatsByEmployeeId = (tree, id) => {
    if (tree?.teams?.some((emp) => emp.id === id)) {
      return tree?.teams?.filter((el) => el.role.toLowerCase() === "member")
        ?.length;
    }

    if (tree?.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const stats = getTeamStatsByEmployeeId(team, id);
        if (stats) return stats;
      }
    }
    return null;
  };

  const getTeamById = (tree, id) => {
    if (tree?.teams?.some((emp) => emp.id === id)) {
      return tree;
    }

    if (tree?.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const stats = getTeamById(team, id);
        if (stats) return stats;
      }
    }
    return null;
  };

  const findDepartmentByMemberId = (tree, employeeId) => {
    if (
      tree?.teams?.some((ele) => ele?.teams?.some((el) => el.id === employeeId))
    ) {
      return tree;
    }
    if (tree?.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const stats = findDepartmentByMemberId(team, employeeId);
        if (stats) {
          return stats;
        }
      }
    }
    return null;
  };

  const getSelectedEmployee = (tree, id) => {
    if (tree.id === id) {
      return tree;
    }
    if (tree.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const member = getSelectedEmployee(team, id);
        if (member) {
          return member;
        }
      }
    }
    return null; // Member with the specified ID not found
  };

  const isTeamLeadExist = (tree, id) => {
    if (tree.id === id) {
      return tree.teams.some((emp) => emp.role.toLowerCase() === "lead");
    }
    if (tree.teams && Array.isArray(tree.teams)) {
      for (const team of tree.teams) {
        const ifExist = isTeamLeadExist(team, id);
        if (ifExist) return true;
      }
    }
    return false; // team name is not exist
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
