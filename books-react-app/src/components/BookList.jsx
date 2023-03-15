import axios from "axios";
import { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const { REACT_APP_API_URL } = process.env;

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    axios.get(`${REACT_APP_API_URL}`).then((res) => {
      setBooks(res.data);
    });
  };

  const deleteBook = async (id) => {
    axios.delete(`${REACT_APP_API_URL}/${id}`).then(() => {
      getBooks();
    });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <Link
        to="/books/add"
        style={{
          textDecoration: "none",
        }}
      >
        <Button variant="contained" color="success">
          Add a book
        </Button>
      </Link>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">ID</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell align="right"> Description </StyledTableCell>
              <StyledTableCell align="left"> Action </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <StyledTableRow key={book.id}>
                <StyledTableCell align="right">{book.id}</StyledTableCell>
                <StyledTableCell align="right">{book.title}</StyledTableCell>
                <StyledTableCell align="right">{book.author}</StyledTableCell>
                <StyledTableCell align="right">
                  {book.description}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="row">
                    <Link to={`/books/update/${book.id}`}>
                      <IconButton aria-label="update">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteBook(book.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookList;
