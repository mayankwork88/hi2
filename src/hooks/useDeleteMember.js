import { useDispatch, useSelector } from "react-redux";
import { removeTeamMember } from "../store";
import useUtils from "./useUtils";

const useDeleteMember = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.company);

  //FROM UTILS CUSTOM HOOK
  const { getTeamStatsByEmployeeId } = useUtils();

  const handleDeleteMemberCheck = (id, handleShowAlert) => {
    //ASSUMTION :- A TEAM MUST HAVE AT LEAST ONE MEMBER

    //CHECK FOR THE NUMBER OF MEMBERS PRESENT IN THAT TEAM
    const members = getTeamStatsByEmployeeId(state, id);

    //MEMBER COUNT === 1 -> CAN'T DELETE SHOW THE ALERT MESSAGE
    if (members.member === 1)
      handleShowAlert("A team must have at least one member", "error");
    //MEMBER COUNT > 1 -> DISPATCH THE DELETE THE MEMBER ACTION
    else {
      dispatch(removeTeamMember(id));
    }
  };

  return { handleDeleteMemberCheck };
};

export default useDeleteMember;
