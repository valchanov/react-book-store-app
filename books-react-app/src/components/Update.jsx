import { Button, FormGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../node_modules/axios/index";
import ModalDialog from "./ModalDialog";

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
  const isCreate = false;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const handleOpen = () => setIsModalOpen(true);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleOpen();
    try {
      await axios.put(`${REACT_APP_API_URL}/${id}`, book);
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

export default Update;
