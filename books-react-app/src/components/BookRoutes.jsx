import React from "react";
import { Route, Routes } from "react-router-dom";
import BookList from "./BookList";
import Create from "./Create";
import NotFound from "./NotFound";
import Update from "./Update";

const BookRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BookList />}></Route>
      <Route path="/books/add" element={<Create />}></Route>
      <Route path="/books/update/:id" element={<Update />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default BookRoutes;
