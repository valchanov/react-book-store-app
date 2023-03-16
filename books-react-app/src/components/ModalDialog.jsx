import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalDialog = ({
  isModalOpen,
  isLoading,
  isError,
  handleClose,
  isCreate,
}) => {
  const successMessage = isCreate
    ? "Successfully added a new book!"
    : "Book successfully updated!";
  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <Box>
              {isError ? "Oops, something went wrong!" : successMessage}
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    marginTop: "20px",
                  }}
                  variant="contained"
                  onClick={handleClose}
                >
                  OK
                </Button>
              </Box>
            </Box>
          )}
        </Typography>

        {isLoading && (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ModalDialog;
