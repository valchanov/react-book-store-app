import React, { useEffect } from "react";
import { Button, FormGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../node_modules/axios/index";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

const { REACT_APP_API_URL } = process.env;

const Update = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/${id}`).then((res) => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
      setDescription(res.data.description);
    });
  }, []);

  const navigate = useNavigate();

  const book = {
    title,
    author,
    description,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${REACT_APP_API_URL}/${id}`, book).then(() => {
      handleOpen();
    });
  };

  const handleCancel = () => {
    navigate("/");
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
          // "& > :not(style)": { m: 1 },
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
              Update a Book
            </h2>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Title"
              value={title}
              variant="outlined"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              style={{ marginTop: "20px" }}
              fullWidth
              id="outlined-basic"
              label="Author"
              value={author}
              variant="outlined"
              required
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <TextField
              style={{ marginTop: "20px" }}
              fullWidth
              id="outlined-basic"
              label="Description"
              value={description}
              variant="outlined"
              required
              onChange={(e) => setDescription(e.target.value)}
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
                Update
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </div>
        </FormGroup>
      </form>

      <Modal
        open={open}
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
            Successfully updated a book!
          </Typography>
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
              color="success"
              onClick={() => navigate("/")}
            >
              OK
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Update;
