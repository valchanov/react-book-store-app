import React from "react";
import { Button, FormGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../node_modules/axios/index";
import Stack from "@mui/material/Stack";
import ModalDialog from "./ModalDialog";

const { REACT_APP_API_URL } = process.env;

const Create = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isCreate = true;
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
  });

  const handleOpen = () => setIsModalOpen(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleOpen();
    try {
      await axios.post(`${REACT_APP_API_URL}`, book);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleClose = () => {
    if (isError) {
      setIsModalOpen(false);
      setIsError(false);
    } else {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        style={{
          width: 400,
          maxWidth: "500%",
          height: "0",
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <div>
            <h2
              style={{
                textAlign: "center",
              }}
            >
              Add a Book
            </h2>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Title"
              variant="outlined"
              required
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
          </div>
          <div>
            <TextField
              style={{ marginTop: "20px" }}
              fullWidth
              id="outlined-basic"
              label="Author"
              variant="outlined"
              required
              onChange={(e) => setBook({ ...book, author: e.target.value })}
            />
          </div>
          <div>
            <TextField
              style={{ marginTop: "20px" }}
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
              required
              onChange={(e) =>
                setBook({ ...book, description: e.target.value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2} direction="row" marginTop={2}>
              <Button variant="contained" type="submit" color="success">
                Create
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </div>
        </FormGroup>
      </form>
      <ModalDialog
        isModalOpen={isModalOpen}
        isLoading={isLoading}
        isError={isError}
        handleClose={handleClose}
        isCreate={isCreate}
      />
    </div>
  );
};

export default Create;
