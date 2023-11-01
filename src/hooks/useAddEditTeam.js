import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewTeam, updateTeam } from "../store";
import useUtils from "./useUtils";

const useAddEditTeam = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.company);
  const [newTeam, setNewTeam] = useState({ name: "" });

  //COMMON FOR ADD & EDIT TEAM - HANDLE CHANGE OF TEAM NAME
  const handleAddEditTeamChange = (event) => {
    const { name, value } = event.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  //FROM UTILS CUSTOM HOOK
  const { isTeamNameExist, getSelectedEmployee } = useUtils();

  //USER CLICK ON ADD TEAM BUTTON
  const handleAddTeamClick = (handleEventType, handleModalOpen) => {
    //SET THE EVENT TYPE TO "addTeam"
    handleEventType("addTeam");

    //OPEN THE MODAL
    handleModalOpen();
  };

  // HANDLE FORM SUBMIT WHEN USER ADD TEAM
  const handleAddNewTeamSubmit = (
    id,
    handleModalClose,
    handleError,
    handleShowAlert,
    hideError
  ) => {
    //CHECK THE ENTERED TEAM NAME
    const isExist = isTeamNameExist(state, newTeam.name);
    //IF EXIST - SHOW THE BELOW ERROR
    if (isExist) {
      handleError("Team Name already exists!");
      return;
    }
    //ELSE - DISPATCH A ACTION TO CREATE A TEAM
    const data = { departmentId: id, newTeam };
    dispatch(createNewTeam(data));

    //CLOSE THE MODAL
    handleModalClose();

    //SET THE STATE TO NULL
    setNewTeam({
      name: "",
    });

    //SHOW THE SUCCESS MESSAGE
    handleShowAlert("Team successfully added :)", "success");
    hideError();
  };

  //EDIT TEAM

  //USER CLICK ON EDIT TEAM BUTTON
  const handleTeamEdit = (teamId, handleModalOpen, handleEventType) => {
    // FIND THE SELECTED TEAM  BY ID
    const selectedTeam = getSelectedEmployee(state, teamId); //:- ---

    //SET THE EVENT TYPE TO "editTeam"
    handleEventType("editTeam");

    //OPEN THE MODAL
    handleModalOpen();

    //FILLED THE SELECTED TEAM DETAILS TO THE REQUIRED INPUTS
    setNewTeam({
      name: selectedTeam.name,
    });
  };

  // HANDLE THE FORM SUBMIT FOR EDIT TEAM
  const handleTeamEditSubmit = (
    id,
    handleModalClose,
    handleError,
    handleShowAlert,
    hideError
  ) => {
    //CHECK THE ENTERED TEAM NAME
    const isExist = isTeamNameExist(state, newTeam.name);

    //IF EXIST - SHOW THE BELOW ERROR
    if (isExist) {
      handleError("Team Name already exists!");
      return;
    }

    const data = { teamId: id, updatedTeam: newTeam };

    //ELSE - DISPATCH A ACTION TO UPDATE THE TEAM
    dispatch(updateTeam(data));

    //CLOSE THE MODAL
    handleModalClose();

    //SET THE STATE TO NULL
    setNewTeam({ name: "" });

    //SHOW THE SUCCESS MESSAGE
    handleShowAlert("Team successfully edited :)", "success");
    hideError();
  };

  return {
    newTeam,
    setNewTeam,
    handleAddEditTeamChange,
    handleAddNewTeamSubmit,
    handleTeamEditSubmit,
    handleAddTeamClick,
    handleTeamEdit,
  };
};

export default useAddEditTeam;
