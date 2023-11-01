import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeamMember, updateEmployeeInfo, removeTeamMember } from "../store";
import useUtils from "./useUtils";

const useHandleAddEditMember = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.company);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  //FROM UTILS CUSTOM HOOK
  const { getSelectedEmployee, isTeamLeadExist, getTeamById } = useUtils();

  //COMMON FOR ADD & EDIT MEMBER/EMPLOYEE - HANDLE CHANGE OF NAME, EMAIL, PHONE AND ROLE
  const handleAddEditMemberChange = (event) => {
    const { name, value } = event.target;
    setNewMember({ ...newMember, [name]: value });
  };

  //User click on Add Member button
  const handleAddMemberClick = (
    id,
    handleEventType,
    handleModalOpen,
    handleInputDisable
  ) => {
    //set the event type to "addMember"
    handleEventType("addMember");

    // set modal open
    handleModalOpen();

    // Assumtion :- one team can have only 1 team lead
    // if team lead exist - only member can be added to team
    // if team lead doesn't exist - member and lead can be added to the team
    const isLeadExist = isTeamLeadExist(state, id);
    if (isLeadExist) {
      // diable the role input and set role, member by default
      setNewMember({
        ...newMember,
        role: "member",
      });
      handleInputDisable("A team can have only 1 Team Lead");
    }
  };

  // HANDLE FORM SUBMIT WHEN USER ADD MEMBER
  const handleAddNewMemberSubmit = (id, handleModalClose, handleShowAlert) => {
    const data = { teamId: id, newMember };

    //DISPATCH ADD MEMBER  ACTION
    dispatch(addTeamMember(data));

    //CLOSE THE MODAL
    handleModalClose();

    //SET THE STATE TO NULL
    setNewMember({
      name: "",
      email: "",
      phone: "",
    });

    //SHOW THE SUCCESS MESSAGE
    handleShowAlert("Employee successfully added :)", "success");
  };

  //EDIT EMPLOYEE DETAILS

  //USER CLICK ON EDIT EMPLOYEE BUTTON
  const handleEmployeeEdit = (employeeId, handleModalOpen, handleEventType) => {
    // FIND THE SELECTED EMPLOYEE BY ID
    const selectedEmployee = getSelectedEmployee(state, employeeId);

    //SET THE EVENT TYPE TO "editMember"
    handleEventType("editMember");

    //OPEN THE MODAL
    handleModalOpen();

    //FILLED THE SELECTED EMPLOYEE DETAILS TO THE REQUIRED INPUTS
    setNewMember({
      name: selectedEmployee.name,
      email: selectedEmployee.email,
      phone: selectedEmployee.phone,
      role: selectedEmployee.role,
    });
  };

  // HANDLE THE FORM SUBMIT FOR EDIT EMPLOYEE
  const handleEmployeeEditSubmit = (
    id,
    handleModalClose,
    handleShowAlert,
    type
  ) => {
    if (type === "update") {
      const data = { employeeId: id, updatedEmployee: newMember, type };

      //DISPATCH UPDATE EMPLOYEE ACTION WITH THE REQUIRED DATA
      dispatch(updateEmployeeInfo(data));

      //CLOSE THE MODAL
      handleModalClose();

      //SET THE STATE TO NULL
      setNewMember({
        name: "",
        email: "",
        phone: "",
      });

      //SHOW THE SUCCESS MESSAGE
      handleShowAlert("Employee successfully edited :)", "success");
    } else if (type === "promote") {
      const data = { employeeId: id, updatedEmployee: { role: "lead" }, type };

      const team = getTeamById(state, id);
      const islastMember = team?.teams?.filter(
        (ele) => ele.role.toLowerCase() === "member"
      )?.length;
      const currentTeamLeadId = team?.teams?.find(
        (ele) => ele.role.toLowerCase() === "lead"
      )?.id;
      if (islastMember == 1) {
        //SHOW THE ERROR MESSAGE
        handleShowAlert("A team must have at least one member", "error");
      } else {
        //DISPATCH REMOLE EMPLOYEE ACTION TO REMOVE THE EXISTING TEAM LEAD
        dispatch(removeTeamMember(currentTeamLeadId));

        //DISPATCH UPDATE EMPLOYEE ACTION WITH THE REQUIRED DATA
        dispatch(updateEmployeeInfo(data));

        //SHOW THE SUCCESS MESSAGE
        handleShowAlert("Employee successfully promoted :)", "success");
      }
    }
  };

  return {
    newMember,
    setNewMember,
    handleAddEditMemberChange,
    handleAddNewMemberSubmit,
    handleEmployeeEditSubmit,
    handleEmployeeEdit,
    handleAddMemberClick,
  };
};

export default useHandleAddEditMember;
