/* eslint-disable react/prop-types */
import { Modal, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: { lg: "30%", md: "50%", sm: "90%", xs: "90%" },
  p: 0,
  borderRadius: "5px",
};

const AppModal = ({ openModal, handleClose, content }) => {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{content}</Box>
      </Modal>
    </div>
  );
};

export default AppModal;
