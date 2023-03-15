import React, { useEffect } from "react";
import { Button, FormGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../node_modules/axios/index";
import Stack from "@mui/material/Stack";

const { REACT_APP_API_URL } = process.env;

const Update = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();

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
      navigate("/");
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
    </div>
  );
};

export default Update;
