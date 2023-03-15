import React from "react";
import logo from "../logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={`/`}>
      <div>
        <img src={logo} alt="logo" />
      </div>
    </Link>
  );
};

export default Logo;
