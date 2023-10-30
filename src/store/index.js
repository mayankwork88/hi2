import { configureStore } from "@reduxjs/toolkit";
import {
  addTeamMember,
  removeTeamMember,
  updateEmployeeInfo,
  filterEmployee,
  createNewTeam,
  updateTeam,
  promoteEmployee,
  companyReducer,
} from "./slices/companySlice";

const store = configureStore({
  reducer: {
    company: companyReducer,
  },
});

export {
  store,
  addTeamMember,
  removeTeamMember,
  updateEmployeeInfo,
  filterEmployee,
  createNewTeam,
  promoteEmployee,
  updateTeam,
};
