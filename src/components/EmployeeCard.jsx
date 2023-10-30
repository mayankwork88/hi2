/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
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
import useHandleAddMember from "../hooks/useHandleAddMember";
import { useTheme } from "@emotion/react";
import useAddEditTeam from "../hooks/useAddEditTeam";
import useDeleteMember from "../hooks/useDeleteMember";
import useTeamChange from "../hooks/useTeamChange";
import useViewEmployeeDetails from "../hooks/useViewEmployeeDetails";

const EmployeeCard = ({ data, handleTeamChange, handleEmployeePromote }) => {
  const theme = useTheme();

  const [showAlert, setShowAlert] = useState({ alert: false, message: "" });
  const [openModal, setOpenModal] = useState(false);
  const [eventType, setEventType] = useState(null);
  const [error, setError] = useState({ error: false, message: "" });
  const [expand, setExpand] = useState(false);

  const [disableInput, setDisableInput] = useState({
    disable: false,
    message: "",
  });

  const {
    newMember,
    setNewMember,
    handleAddNewMemberChange,
    handleAddNewMemberSubmit,
    handleEmployeeEditSubmit,
    handleEmployeeEdit,
    handleAddMemberClick,
  } = useHandleAddMember();

  const {
    newTeam,
    setNewTeam,
    handleAddNewTeamChange,
    handleAddNewTeamSubmit,
    handleTeamEditSubmit,
    handleAddTeamClick,
  } = useAddEditTeam();

  const { handleDeleteMemberCheck } = useDeleteMember();
  const { handleMemberTeamChange, handleTeamChangeSubmit } = useTeamChange();
  const {handleViewEmployeeDetails} = useViewEmployeeDetails()

  const handleModalCancel = () => {
    setOpenModal(false);
    setNewTeam({ name: "" });
    setNewMember({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleError = (message) => {
    setError({ error: true, message });
  };

  const handleShowAlert = (message) => {
    setShowAlert({
      alert: true,
      message,
    });
  };

  const handleEventType = (eventType) => {
    setEventType(eventType);
  };

  const handleInputDisable = (message) => {
    setDisableInput({
      disable: true,
      message,
    });
  };

  //event type :- addMember, editMember, view, addTeam
  const chooseSubmit = (type) => {
    switch (type) {
      case "addMember":
        return () => handleAddNewMemberSubmit(data.id, handleModalClose);
      case "editMember":
        return () => handleEmployeeEditSubmit(data.id, handleModalClose);
      case "addTeam":
        return () =>
          handleAddNewTeamSubmit(data.id, handleModalClose, handleError);
      case "editTeam":
        return () =>
          handleTeamEditSubmit(data.id, handleModalClose, handleError);
      case "changeTeam":
        return () => handleTeamChangeSubmit(handleShowAlert);
      default:
        return handleAddNewTeamSubmit;
    }
  };

  const modalContent = (type) => {
    switch (type) {
      case "addMember":
        return (
          <ShowForm
            onChange={handleAddNewMemberChange}
            value={newMember}
            onSubmit={chooseSubmit(eventType)}
            onCancel={handleModalCancel}
            disableInput={disableInput}
          />
        );
      case "editMember":
        return (
          <ShowForm
            onChange={handleAddNewMemberChange}
            value={newMember}
            onSubmit={chooseSubmit(eventType)}
            onCancel={handleModalCancel}
            disableInput={disableInput}
          />
        );
      case "view":
        return (
          <ShowEmployeeDetails viewSelectedEmployee={viewSelectedEmployee} />
        );
      case "addTeam":
        return (
          <ShowTeamForm
            onChange={handleAddNewTeamChange}
            value={newTeam}
            onSubmit={chooseSubmit(eventType)}
            onCancel={handleModalCancel}
            error={error}
          />
        );
      case "editTeam":
        return (
          <ShowTeamForm
            onChange={handleAddNewTeamChange}
            value={newTeam}
            onSubmit={chooseSubmit(eventType)}
            onCancel={handleModalCancel}
            error={error}
          />
        );
      case "changeTeam":
        return (
          <TeamChangeContent
            teamsInADepartment={teamsInADepartment}
            selectedTeam={selectedTeam}
            onSubmit={chooseSubmit(eventType)}
            setSelectedTeam={setSelectedTeam}
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
          severity="error"
          sx={{ width: "100%" }}
        >
          {showAlert?.message}
        </Alert>
      </Snackbar>
      <Paper sx={{ p: theme.spacing(2), border: "0.1px solid #0000003b" }}>
        <Box display={"flex"} justifyContent="space-between">
          <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
            {data?.name} - {data?.role}
          </Typography>
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
                handleEmployeeEdit(id, handleModalClose, handleEventType)
              }
              handleTeamEdit={(id) =>
                handleTeamEdit(id, handleModalClose, handleEventType)
              }
              handleViewEmployeeDetails={(id) => handleViewEmployeeDetails(id,handleEventType,handleModalClose)}
              handleDeleteMember={(id) =>
                handleDeleteMemberCheck(id, handleShowAlert)
              }
              handleAddMemberClick={() =>
                handleAddMemberClick(
                  id,
                  handleEventType,
                  handleModalClose,
                  handleInputDisable
                )
              }
              handleAddTeamClick={() =>
                handleAddTeamClick(handleEventType, handleModalClose)
              }
              handleMemberTeamChange={(id) =>
                handleMemberTeamChange(id, handleEventType, handleModalClose)
              }
              handleEmployeePromote={handleEmployeePromote}
            />
          </Box>
        </Box>
        <Stack
          p={theme.spacing(1, 2)}
          sx={{ display: `${expand ? "black" : "none"}` }}
        >
          {data?.teams?.map((ele) => (
            <EmployeeCard
              key={ele.id}
              data={ele}
              handleTeamChange={handleTeamChange}
              handleEmployeePromote={handleEmployeePromote}
            />
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
};

export default EmployeeCard;
