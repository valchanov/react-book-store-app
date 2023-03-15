import { BrowserRouter } from "react-router-dom";
import "./App.css";
import BookRoutes from "./components/BookRoutes";
import Logo from "./components/Logo";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Logo />
        <div className="App"></div>
        <BookRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
