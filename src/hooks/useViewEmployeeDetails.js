import { useState } from "react";
import { useSelector } from "react-redux";
import useUtils from "./useUtils";

const useViewEmployeeDetails = () => {
  const state = useSelector((state) => state.company);
  const [viewSelectedEmployee, setViewSelectedEmployee] = useState({});

  //CUSTOM HOOK FROM UTILS
  const { getSelectedEmployee } = useUtils();

  //SHOW EMPLOYEE DETAILS
  const handleViewEmployeeDetails = (
    employeeId,
    handleEventType,
    handleModalOpen
  ) => {
    //SET THE EVENT TYPE TO "view"
    handleEventType("view");

    //FIND THE SELECTED EMPLOYEE
    const selectedEmployee = getSelectedEmployee(state, employeeId);

    //UPDATE THE STATE
    setViewSelectedEmployee(selectedEmployee);

    //OPEN THE MODAL
    handleModalOpen();
  };
  return { viewSelectedEmployee, handleViewEmployeeDetails };
};

export default useViewEmployeeDetails;
