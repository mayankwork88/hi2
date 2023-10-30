import { createSlice, nanoid } from "@reduxjs/toolkit";
import { data } from "../../data";

const companySlice = createSlice({
  name: "company",
  initialState: { ...data },
  reducers: {
    addTeamMember(state, action) {
      const { teamId, newMember } = action.payload;
      const addMember = (tree, id, newMem) => {
        if (tree.id === id) {
          tree.teams.unshift({
            id: newMem?.id ? id : nanoid(),
            name: newMem.name,
            email: newMem.email,
            phone: newMem.phone,
            role: newMem.role,
          });
          return tree;
        }
        const updatedMembers = tree?.teams?.map((ele) =>
          addMember(ele, id, newMember)
        );
        return { ...tree, teams: updatedMembers };
      };
      addMember(state, teamId, newMember);
      // state = newState;
    },
    removeTeamMember(state, action) {
      const removeMember = (tree, id) => {
        if (tree?.teams?.some((el) => el.id === id)) {
          const index = tree.teams.findIndex((el) => el.id === id);
          tree.teams.splice(index, 1);
          return tree;
        }
        const updatedMembers = tree?.teams?.map((ele) => removeMember(ele, id));
        return { ...tree, teams: updatedMembers };
      };
      const newState = removeMember(state, action.payload);
      // state = newState;
    },
    updateEmployeeInfo(state, action) {
      const { employeeId, updatedEmployee } = action.payload;
      const updateEmployee = (tree, emplId, updatedEmp) => {
        if (tree.id === emplId) {
          tree.name = updatedEmp.name;
          tree.email = updatedEmp.email;
          tree.phone = updatedEmp.phone;
          return;
        }
        if (tree.teams && Array.isArray(tree.teams)) {
          tree.teams.map((ele) => updateEmployee(ele, emplId, updatedEmp));
        }
      };
      updateEmployee(state, employeeId, updatedEmployee);
    },
    createNewTeam(state, action) {
      const { departmentId, newTeam } = action.payload;
      const addTeam = (tree, id, team) => {
        if (tree.id === id) {
          tree.teams.unshift({
            id: nanoid(),
            name: team.name,
            role: "team",
            teams: [],
          });
          return tree;
        }
        tree?.teams?.map((ele) => addTeam(ele, id, team));
      };
      addTeam(state, departmentId, newTeam);
    },
    updateTeam(state, action) {
      const { teamId, updatedTeam } = action.payload;
      const updateTeam = (tree, teamId, updTeam) => {
        if (tree.id === teamId) {
          tree.name = updTeam.name;
          return;
        }
        if (tree.teams && Array.isArray(tree.teams)) {
          tree.teams.map((ele) => updateTeam(ele, teamId, updTeam));
        }
      };
      updateTeam(state, teamId, updatedTeam);
    },
    promoteEmployee(state, action) {},
  },
});

export const {
  addTeamMember,
  removeTeamMember,
  updateEmployeeInfo,
  filterEmployee,
  createNewTeam,
  updateTeam,
  promoteEmployee,
} = companySlice.actions;
export const companyReducer = companySlice.reducer;
