import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewTeam, updateTeam } from "../store";
import useUtils from "./useUtils";

const useAddEditTeam = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.company);
  const [newTeam, setNewTeam] = useState({ name: "" });
  const { isTeamNameExist,getSelectedEmployee } = useUtils();

  const handleAddNewTeamChange = (event) => {
    const { name, value } = event.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleAddNewTeamSubmit = (id, handleModalClose, handleError) => {
    const isExist = isTeamNameExist(state, newTeam.name);
    if (isExist) {
      handleError("Team Name already exists!");
      return;
    }
    const data = { departmentId: id, newTeam };
    dispatch(createNewTeam(data));
    handleModalClose();
    setNewTeam({
      name: "",
    });
  };

  const handleTeamEdit = (teamId,handleModalClose,handleEventType) => {
    handleModalClose();
    handleEventType("editTeam");
    const selectedTeam = getSelectedEmployee(state, teamId);
    setNewTeam({
      name: selectedTeam.name,
    });
  };

  const handleTeamEditSubmit = (id, handleModalClose, handleError) => {
    const isExist = isTeamNameExist(state, newTeam.name);
    if (isExist) {
      handleError("Team Name already exists!");
      return;
    }
    const data = { teamId: id, updatedTeam: newTeam };
    dispatch(updateTeam(data));
    handleModalClose();
    setNewTeam({ name: "" });
  };

  const handleAddTeamClick = (handleEventType, handleModalClose) => {
    handleEventType("addTeam");
    handleModalClose();
  };

  return {
    newTeam,
    setNewTeam,
    handleAddNewTeamChange,
    handleAddNewTeamSubmit,
    handleTeamEditSubmit,
    handleAddTeamClick,
    handleTeamEdit,
  };
};

export default useAddEditTeam;
