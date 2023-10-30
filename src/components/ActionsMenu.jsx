/* eslint-disable react/prop-types */
import * as React from "react";
import { Button, Menu, MenuItem, Stack, ListItemIcon } from "@mui/material";
import {
  AddCircleOutlineIcon,
  DeleteOutlineIcon,
  MenuOutlinedIcon,
  EditOutlinedIcon,
  RemoveRedEyeOutlinedIcon,
  PublishOutlinedIcon,
  PublishedWithChangesOutlinedIcon,
} from "../icons";


const ActionsMenu = ({
  data,
  handleEmployeeEdit,
  handleTeamEdit,
  handleViewEmployeeDetails,
  handleDeleteMember,
  handleAddMemberClick,
  handleAddTeamClick,
  handleMemberTeamChange,
  handleEmployeePromote,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // HANDLE EDIT
  const handleEdit = (type) => {
    if (type) handleEmployeeEdit(data?.id);
    else handleTeamEdit(data?.id);
    handleClose();
  };

  const handleView = () => {
    handleViewEmployeeDetails(data?.id);
    handleClose();
  };

  const handleDelete = () => {
    handleDeleteMember(data?.id);
    handleClose();
  };

  const handleAdd = (type) => {
    if (type) handleAddTeamClick();
    else handleAddMemberClick(data?.id);
    handleClose();
  };

  const handleTeamChange = () => {
    handleMemberTeamChange(data?.id);
    handleClose();
  };

  const handlePromote = () => {
    handleEmployeePromote(data?.id);
    handleClose();
  };

  return (
    <Stack>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuOutlinedIcon size="md" />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {(data?.role?.toLowerCase()?.includes("head") || !data?.email) && (
          <MenuItem onClick={() => handleAdd(data?.email)}>
            <ListItemIcon>
              <AddCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            Add
          </MenuItem>
        )}
        <MenuItem onClick={() => handleEdit(data?.email)}>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <RemoveRedEyeOutlinedIcon fontSize="small" />
          </ListItemIcon>
          view
        </MenuItem>
        {data?.role?.toLowerCase()?.includes("member") && (
          <>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteOutlineIcon fontSize="small" />
              </ListItemIcon>
              Delete
            </MenuItem>
            <MenuItem onClick={handleTeamChange}>
              <ListItemIcon>
                <PublishedWithChangesOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Change Team
            </MenuItem>
          </>
        )}
        {(data?.role?.toLowerCase()?.includes("member") ||
          data?.role?.toLowerCase()?.includes("lead")) && (
          <MenuItem onClick={handlePromote}>
            <ListItemIcon>
              <PublishOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Promote
          </MenuItem>
        )}
      </Menu>
    </Stack>
  );
};

export default ActionsMenu;
