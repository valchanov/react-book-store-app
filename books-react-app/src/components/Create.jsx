import { Button, FormGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Create = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${REACT_APP_API_URL}`, book).then(() => {
      handleOpen();
      //  navigate("/");
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
            Successfully added a new book!
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

export default Create;
