import { configureStore } from "@reduxjs/toolkit";
import {
  addTeamMember,
  removeTeamMember,
  updateEmployeeInfo,
  filterEmployee,
  createNewTeam,
  updateTeam,
  companyReducer,
} from "./slices/companySlice";

const companyInfoMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("company/")) {
    const companyState = store.getState().company;
    localStorage.setItem("state", JSON.stringify(companyState));
  }
  return result;
};

const store = configureStore({
  reducer: {
    company: companyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(companyInfoMiddleware),
});

export {
  store,
  addTeamMember,
  removeTeamMember,
  updateEmployeeInfo,
  filterEmployee,
  createNewTeam,
  updateTeam,
};
