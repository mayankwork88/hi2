import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTeamMember, removeTeamMember } from "../store";
import useUtils from "./useUtils";

const useTeamChange = () => {
  const state = useSelector((state) => state.company);
  const dispatch = useDispatch();
  const [teamsInADepartment, setTeamsInADepartment] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({
    currentTeamName: "",
    memberId: null,
    newTeamId: null,
  });

  //FROM CUSTOM HOOK UTILS
  const {
    getTeamById,
    findDepartmentByMemberId,
    getTeamStatsByEmployeeId,
    getSelectedEmployee,
  } = useUtils();

  //USER CLICK ON TEAM CHANGE BUTTON
  const handleMemberTeamChange = (
    memberId,
    handleEventType,
    handleModalOpen
  ) => {
    //SET THE EVENT TYPE TO "changeTeam"
    handleEventType("changeTeam");

    //OPEN THE MODAL
    handleModalOpen();

    //FIND THE MEMBER CURRENT TEAM
    const memberCurrentTeam = getTeamById(state, memberId);

    //SET MEMBER CURRENT TEAM TO HIGHLIGHT WHEN SHOW TO ALL TEAMS
    setSelectedTeam({
      ...selectedTeam,
      currentTeamName: memberCurrentTeam?.name,
      memberId: memberId,
      newTeamId: null,
    });

    //FIND ALL THE TEAMS IN THE SELECTED MEMBER DEPARTMENT/HEAD
    const tree = findDepartmentByMemberId(state, memberId);

    //SET THE DEPARTMENT IN A STATE
    setTeamsInADepartment(tree?.teams);
  };

  // HANDLE MEMBER TEAM CHANGE AND UPDATE THE STATE WITH NEW TEAM
  const handleTeamValueChange = (team) => {
    setSelectedTeam({
      ...selectedTeam,
      currentTeamName: team?.name,
      newTeamId: team.id,
    });
  };

  // HANDLE THE FORM SUBMIT FOR CHANGE TEAM
  const handleTeamChangeSubmit = (handleShowAlert, handleModalClose) => {
    //CHECK OF THE NO. OF MEMBERS IN THE TEAM
    const isLastMember = getTeamStatsByEmployeeId(state, selectedTeam.memberId);

    //IF NO. OF MEMBERS === 1 -> SHOW THE BELOW POP UP
    if (isLastMember.member === 1)
      handleShowAlert("A team must have at least one member", "error");
    //IF NO. OF MEMBERS > 1 ->  CHANGE THE TEAM AS INTENDED
    else {
      const member = getSelectedEmployee(state, selectedTeam.memberId);
      const data = { teamId: selectedTeam.newTeamId, newMember: member };
      console.log(data, selectedTeam, "handleTeamChangeSubmit");
      dispatch(removeTeamMember(member.id));
      dispatch(addTeamMember(data));

      //SHOW THE SUCCESS MESSAGE
      handleShowAlert("Successfully change team :)", "success");
    }

    //CLOSE THE MODAL
    handleModalClose();

    //SET THE STATE TO NULL
    setSelectedTeam("");
  };

  return {
    selectedTeam,
    teamsInADepartment,
    handleMemberTeamChange,
    handleTeamChangeSubmit,
    handleTeamValueChange,
  };
};

export default useTeamChange;
