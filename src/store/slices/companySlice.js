import { createSlice, nanoid } from "@reduxjs/toolkit";
import { data } from "../../data";

const companyState = localStorage.getItem("state");
const initialState = companyState ? JSON.parse(companyState) : data;

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    // ADD A NEW MEMBER
    addTeamMember(state, action) {
      const { teamId, newMember } = action.payload;
      const addMember = (tree, id, newMem) => {
        if (tree.id === id) {
          tree.teams.unshift({
            id: newMem?.id ? newMem.id : nanoid(),
            name: newMem.name,
            email: newMem.email,
            phone: newMem.phone,
            role: newMem.role,
          });
          return tree;
        }
        tree?.teams?.map((ele) => addMember(ele, id, newMember));
      };
      addMember(state, teamId, newMember);
    },
    // REMOVE A MEMBER
    removeTeamMember(state, action) {
      const removeMember = (tree, id) => {
        if (tree?.teams?.some((el) => el.id === id)) {
          const index = tree.teams.findIndex((el) => el.id === id);
          tree.teams.splice(index, 1);
          return tree;
        }
        tree?.teams?.map((ele) => removeMember(ele, id));
      };
      removeMember(state, action.payload);
    },
    // UPDATE EMPLOYEE INFO
    updateEmployeeInfo(state, action) {
      const { employeeId, updatedEmployee,type } = action.payload;
      const updateEmployee = (tree, emplId, updatedEmp) => {
        if (tree.id === emplId) {
          if(type === "update"){
            tree.name = updatedEmp.name;
            tree.email = updatedEmp.email;
            tree.phone = updatedEmp.phone;
          }else if(type === "promote"){
            tree.role = updatedEmp.role
          }
          
          return;
        }
        if (tree.teams && Array.isArray(tree.teams)) {
          tree.teams.map((ele) => updateEmployee(ele, emplId, updatedEmp));
        }
      };
      updateEmployee(state, employeeId, updatedEmployee);
    },
    // CREATE A NEW TEAM
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
    // UPDATE A TEAM
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
  },
});

export const {
  addTeamMember,
  removeTeamMember,
  updateEmployeeInfo,
  filterEmployee,
  createNewTeam,
  updateTeam,
} = companySlice.actions;
export const companyReducer = companySlice.reducer;
