/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Stack,
  Typography,
  Box,
  Snackbar,
  Alert,
  Paper,
  IconButton,
} from "@mui/material";
import {
  AppModal,
  ShowForm,
  ShowEmployeeDetails,
  ShowTeamForm,
  ActionsMenu,
  TeamChangeContent,
} from "./";
import { RemoveRedEyeOutlinedIcon, VisibilityOffIcon } from "../icons";
import {
  useHandleAddEditMember,
  useAddEditTeam,
  useDeleteMember,
  useTeamChange,
  useViewEmployeeDetails,
  useEventTypes,
} from "../hooks";
import { RoleBadge } from "../CustomDesignedComponents";

const EmployeeCard = ({ data }) => {
  const theme = useTheme();

  const [showAlert, setShowAlert] = useState({
    alert: false,
    message: "",
    type: "success",
  });
  const [openModal, setOpenModal] = useState(false);
  const [eventType, setEventType] = useState(null);
  const [error, setError] = useState({ error: false, message: "" });
  const [expand, setExpand] = useState(true);
  const [disableInput, setDisableInput] = useState({
    disable: false,
    message: "",
  });

  // ADD AND EDIT MEMBER TO THE TEAM
  const {
    newMember,
    setNewMember,
    handleAddEditMemberChange,
    handleAddNewMemberSubmit,
    handleEmployeeEditSubmit,
    handleEmployeeEdit,
    handleAddMemberClick,
  } = useHandleAddEditMember();

  //DELETE MEMBER FROM THE TEAM
  const { handleDeleteMemberCheck } = useDeleteMember();

  //ADD OR EDIT TEAM UNDER HEAD DEPARTMENT
  const {
    newTeam,
    setNewTeam,
    handleAddEditTeamChange,
    handleAddNewTeamSubmit,
    handleTeamEdit,
    handleTeamEditSubmit,
    handleAddTeamClick,
  } = useAddEditTeam();

  // CHANGE THE TEAM OF A MEMBER IN THE SAME DEPARTMENT
  const {
    selectedTeam,
    teamsInADepartment,
    handleMemberTeamChange,
    handleTeamChangeSubmit,
    handleTeamValueChange,
  } = useTeamChange();

  // VIEW THE DETAILS OF AN EMPLOYEE
  const { viewSelectedEmployee, handleViewEmployeeDetails } =
    useViewEmployeeDetails();

  // EVENT TYPES
  const { EVENT_TYPES } = useEventTypes();

  // const { chooseSubmit } = useFormSubmit();

  // HANDLE WHEN SOMEONE CANCEL THE MODAL FORM
  const handleModalCancel = () => {
    setOpenModal(false);
    setNewTeam({ name: "" });
    setNewMember({
      name: "",
      email: "",
      phone: "",
    });
  };

  //HANLDE CLOSE MODAL ON FORM SUBMIT
  const handleModalClose = () => {
    setOpenModal(false);
  };

  //HANDLE OPEN MODAL
  const handleModalOpen = () => {
    setOpenModal(true);
  };

  //HANDLE ERROR OR SHOW ERROR IF EXIST
  const handleError = (message) => {
    setError({ error: true, message });
  };

  //HANDLE ERROR OR HIDE ERROR IF NOT EXIST
  const hideError = () => {
    setError({ error: false, message: "" });
  };

  //ALERT USER WITH A SPECIFIC MESSAGE
  const handleShowAlert = (message, type) => {
    setShowAlert({
      alert: true,
      message,
      type,
    });
  };

  //SET THE EVENT TYPE TO RUN THE SPECIFIC FUNCTION
  const handleEventType = (eventType) => {
    setEventType(eventType);
  };

  // HANDLE INPUT DISABLE WHEN CERTAIN CONDITION MEETS
  const handleInputDisable = (message) => {
    setDisableInput({
      disable: true,
      message,
    });
  };

  const chooseSubmit = (type) => {
    switch (type) {
      case EVENT_TYPES.ADD_MEMBER:
        return () =>
          handleAddNewMemberSubmit(data?.id, handleModalClose, handleShowAlert);
      case EVENT_TYPES.EDIT_MEMBER:
        return () =>
          handleEmployeeEditSubmit(
            data?.id,
            handleModalClose,
            handleShowAlert,
            "update"
          );
      case EVENT_TYPES.ADD_TEAM:
        return () =>
          handleAddNewTeamSubmit(
            data?.id,
            handleModalClose,
            handleError,
            handleShowAlert,
            hideError
          );
      case EVENT_TYPES.EDIT_TEAM:
        return () =>
          handleTeamEditSubmit(
            data?.id,
            handleModalClose,
            handleError,
            handleShowAlert,
            hideError
          );
      case EVENT_TYPES.CHANGE_TEAM:
        return () => handleTeamChangeSubmit(handleShowAlert, handleModalClose);
      default:
        return handleAddNewTeamSubmit;
    }
  };

  const modalContent = (type) => {
    switch (type) {
      case EVENT_TYPES.ADD_MEMBER:
        return (
          <ShowForm
            onChange={handleAddEditMemberChange}
            value={newMember}
            onSubmit={chooseSubmit(eventType)}
            onCancel={handleModalCancel}
            disableInput={disableInput}
            showRole={true}
          />
        );
      case EVENT_TYPES.EDIT_MEMBER:
        return (
          <ShowForm
            onChange={handleAddEditMemberChange}
            value={newMember}
            onSubmit={chooseSubmit(eventType)}
            onCancel={handleModalCancel}
            disableInput={disableInput}
          />
        );
      case EVENT_TYPES.VIEW_DETAILS:
        return (
          <ShowEmployeeDetails viewSelectedEmployee={viewSelectedEmployee} />
        );
      case EVENT_TYPES.ADD_TEAM:
        return (
          <ShowTeamForm
            onChange={handleAddEditTeamChange}
            value={newTeam}
            onSubmit={chooseSubmit(eventType)}
            onCancel={handleModalCancel}
            error={error}
          />
        );
      case EVENT_TYPES.EDIT_TEAM:
        return (
          <ShowTeamForm
            onChange={handleAddEditTeamChange}
            value={newTeam}
            onSubmit={chooseSubmit(eventType)}
            onCancel={handleModalCancel}
            error={error}
          />
        );
      case EVENT_TYPES.CHANGE_TEAM:
        return (
          <TeamChangeContent
            teamsInADepartment={teamsInADepartment}
            selectedTeam={selectedTeam}
            onSubmit={chooseSubmit(eventType)}
            setSelectedTeam={handleTeamValueChange}
            onCancel={handleModalCancel}
          />
        );
      default:
        return <Typography variant="h2">This is not expected :/</Typography>;
    }
  };

  return (
    <Stack>
      <AppModal
        openModal={openModal}
        handleClose={() => setOpenModal(false)}
        content={modalContent(eventType)}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showAlert.alert}
        autoHideDuration={6000}
        onClose={() => setShowAlert({ alert: false, message: "" })}
      >
        <Alert
          onClose={() => setShowAlert({ alert: false, message: "" })}
          severity={showAlert.type}
          sx={{ width: "100%" }}
        >
          {showAlert?.message}
        </Alert>
      </Snackbar>
      <Paper sx={{ p: theme.spacing(2), border: "0.1px solid #0000003b" }}>
        <Box display={"flex"} justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
              {data?.name}
            </Typography>
            <RoleBadge>{data?.role}</RoleBadge>
          </Box>
          <Box display="flex">
            {data?.teams?.length ? (
              <>
                <IconButton onClick={() => setExpand(!expand)}>
                  {expand ? (
                    <VisibilityOffIcon />
                  ) : (
                    <RemoveRedEyeOutlinedIcon />
                  )}
                </IconButton>
              </>
            ) : null}

            <ActionsMenu
              data={data}
              handleEmployeeEdit={(id) =>
                handleEmployeeEdit(
                  id,
                  handleModalOpen,
                  handleEventType,
                  "update"
                )
              }
              handleTeamEdit={(id) =>
                handleTeamEdit(id, handleModalOpen, handleEventType)
              }
              handleViewEmployeeDetails={(id) =>
                handleViewEmployeeDetails(id, handleEventType, handleModalOpen)
              }
              handleDeleteMember={(id) =>
                handleDeleteMemberCheck(id, handleShowAlert)
              }
              handleAddMemberClick={(id) =>
                handleAddMemberClick(
                  id,
                  handleEventType,
                  handleModalOpen,
                  handleInputDisable
                )
              }
              handleAddTeamClick={() =>
                handleAddTeamClick(handleEventType, handleModalOpen)
              }
              handleMemberTeamChange={(id) =>
                handleMemberTeamChange(id, handleEventType, handleModalOpen)
              }
              handleEmployeePromote={(id) =>
                handleEmployeeEditSubmit(
                  id,
                  handleModalOpen,
                  handleShowAlert,
                  "promote"
                )
              }
            />
          </Box>
        </Box>
        <Stack
          p={theme.spacing(1, 2)}
          sx={{ display: `${expand ? "black" : "none"}` }}
        >
          {data?.teams?.map((ele) => (
            <EmployeeCard key={ele.id} data={ele} />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default EmployeeCard;
