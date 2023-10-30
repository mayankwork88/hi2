import useAddEditTeam from "./useAddEditTeam";
import useHandleAddEditMember from "./useHandleAddEditMember";
import useTeamChange from "./useTeamChange";

const useFormSubmit = () => {
  const { handleAddNewMemberSubmit, handleEmployeeEditSubmit } =
    useHandleAddEditMember();
  const { handleAddNewTeamSubmit, handleTeamEditSubmit } = useAddEditTeam();
  const { handleTeamChangeSubmit } = useTeamChange();

  const chooseSubmit = (type, id, handleModalClose) => {
    switch (type) {
      case "addMember":
        return () => handleAddNewMemberSubmit(id, handleModalClose);
      case "editMember":
        return () => handleEmployeeEditSubmit(id, handleModalClose);
      case "addTeam":
        return () => handleAddNewTeamSubmit(id, handleModalClose, handleError);
      case "editTeam":
        return () => handleTeamEditSubmit(id, handleModalClose, handleError);
      case "changeTeam":
        return () => handleTeamChangeSubmit(handleShowAlert, handleModalClose);
      default:
        return handleAddNewTeamSubmit;
    }
  };
  return { chooseSubmit };
};

export default useFormSubmit;
