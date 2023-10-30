import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTeamMember, updateEmployeeInfo } from "../store";
import useUtils from "./useUtils";

const useHandleAddMember = () => {
  const dispatch = useDispatch();
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const {getSelectedEmployee, isTeamLeadExist} = useUtils();

  // HANDLE THE NAME, EMAIL, PHONE AND ROLE WHEN USER TYPES IN THE FORM
  const handleAddNewMemberChange = (event) => {
    const { name, value } = event.target;
    setNewMember({ ...newMember, [name]: value });
  };

  // HANDLE FORM SUBMIT WHEN USER ADD MEMBER
  const handleAddNewMemberSubmit = (id, handleModalClose) => {
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
  };

  const handleAddMemberClick = (id, handleEventType, handleModalClose,handleInputDisable) => {
    handleEventType("addMember");
    handleModalClose();
    // if team lead exist -> set role option to member by default
    //else allow user to create one

    // check for team stats return -> {lead:Number, member:Number}
    // const teamStats = getTeamStats(state, 9);
    // alert(data.id);
    const isLeadExist = isTeamLeadExist(state, id);
    if (isLeadExist) {
      setNewMember({
        ...newMember,
        role: "member",
      });
      handleInputDisable("A team can have only 1 Team Lead")
    }
  };

  //edit employee

  const handleEmployeeEditSubmit = (id, handleModalClose) => {
    const data = { employeeId: id, updatedEmployee: newMember };
    dispatch(updateEmployeeInfo(data));
    handleModalClose();
    setNewMember({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleEmployeeEdit = (employeeId, handleModalClose,handleEventType) => {
    handleModalClose();
    handleEventType("editMember");
    const selectedEmployee = getSelectedEmployee(state, employeeId);
    setNewMember({
      name: selectedEmployee.name,
      email: selectedEmployee.email,
      phone: selectedEmployee.phone,
      role: selectedEmployee.role,
    });
  };

  return {
    newMember,
    setNewMember,
    handleAddNewMemberChange,
    handleAddNewMemberSubmit,
    handleEmployeeEditSubmit,
    handleEmployeeEdit,
    handleAddMemberClick
  };
};

export default useHandleAddMember;
