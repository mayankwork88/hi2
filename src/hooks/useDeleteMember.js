import { useDispatch } from "react-redux";
import { removeTeamMember } from "../store";
import useUtils from "./useUtils";

const useDeleteMember = () => {
    const dispatch = useDispatch();
    const {getTeamStatsByEmployeeId} = useUtils()

    const handleDeleteMemberCheck = (id, handleShowAlert) => {
        const members = getTeamStatsByEmployeeId(state, id);
        if (members === 1) handleShowAlert("A team must have at least one member")
        else dispatch(removeTeamMember(id))
      };

  return {handleDeleteMemberCheck}
}

export default useDeleteMember;
