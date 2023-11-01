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

  const ROLES = {
    HEAD: data?.role?.toLowerCase()?.includes("head"),
    LEAD: data?.role?.toLowerCase()?.includes("lead"),
    MEMBER: data?.role?.toLowerCase()?.includes("member"),
    TEAM: !data?.email,
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
        {(ROLES.HEAD || ROLES.TEAM) && (
          <MenuItem onClick={() => handleAdd(data?.email)}>
            <ListItemIcon>
              <AddCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            Add {ROLES.HEAD ? "Team" : "Employee"}
          </MenuItem>
        )}
        <MenuItem onClick={() => handleEdit(data?.email)}>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Edit Profile
        </MenuItem>
        <MenuItem onClick={handleView}>
          <ListItemIcon>
            <RemoveRedEyeOutlinedIcon fontSize="small" />
          </ListItemIcon>
          View Profile
        </MenuItem>
        {(ROLES.MEMBER || ROLES.TEAM) && (
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutlineIcon fontSize="small" />
            </ListItemIcon>
            Delete Profile
          </MenuItem>
        )}
        {ROLES.MEMBER && (
          <MenuItem onClick={handleTeamChange}>
            <ListItemIcon>
              <PublishedWithChangesOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Change Team
          </MenuItem>
        )}
        {ROLES.MEMBER && (
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
