import React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  handleOk,
}) => {
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
            <h3>Loading</h3>
          ) : (
            <Box>
              {isError
                ? "Oops, something went wrong!"
                : "Successfully added a new book!"}
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
                  onClick={handleOk}
                >
                  OK
                </Button>
              </Box>
            </Box>
          )}
        </Typography>

        {isLoading && <CircularProgress color="secondary" />}
      </Box>
    </Modal>
  );
};

export default ModalDialog;
