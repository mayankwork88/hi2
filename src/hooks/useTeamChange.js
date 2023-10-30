import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeamMember, removeTeamMember } from "../store";
import useUtils from "./useUtils";

const useTeamChange = () => {
  const state = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const { getTeamById, findDepartmentByMemberId, getTeamStatsByEmployeeId,getSelectedEmployee} = useUtils();
  const [teamsInADepartment, setTeamsInADepartment] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({
    currentTeamName: "",
    memberId: null,
    newTeamId: null,
  });

  const handleMemberTeamChange = (memberId, handleEventType) => {
    handleEventType("changeTeam");
    handleModalClose();
    const memberCurrentTeam = getTeamById(state, memberId);
    setSelectedTeam({
      ...selectedTeam,
      currentTeamName: memberCurrentTeam?.name,
      memberId: memberId,
      newTeamId: null,
    });
    const tree = findDepartmentByMemberId(state, memberId);
    setTeamsInADepartment(tree?.teams);
  };

  const handleTeamChangeSubmit = (handleShowAlert) => {
    const isLastMember = getTeamStatsByEmployeeId(state, selectedTeam.memberId);
    if (isLastMember === 1) handleShowAlert("A team must have at least one member")
    else {
      const member = getSelectedEmployee(state, selectedTeam.memberId);
      handleTeamChange(selectedTeam, member);
    }
    setOpenModal(false);
    setSelectedTeam("");
  };

  const handleTeamChange = (teamInfo, newMember) => {
    const data = { teamId: teamInfo.newTeamId, newMember };
    dispatch(removeTeamMember(newMember.id));
    dispatch(addTeamMember(data));
  };
  return { handleMemberTeamChange, handleTeamChangeSubmit };
};

export default useTeamChange;
