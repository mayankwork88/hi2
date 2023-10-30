const useEventTypes = () => {
  const EVENT_TYPES = {
    ADD_MEMBER: "addMember",
    EDIT_MEMBER: "editMember",
    ADD_TEAM: "addTeam",
    EDIT_TEAM: "editTeam",
    CHANGE_TEAM: "changeTeam",
    VIEW_DETAILS: "view",
  };
  return { EVENT_TYPES };
};

export default useEventTypes;
