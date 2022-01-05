import React from "react";
import { Link } from "react-router-dom";

import "../styles/Header.css";
function Header() {
  return (
    <div className="head">
      <div className="topnav">
        <Link to="/" className="home-link">
          Home{" "}
        </Link>
        <Link to="/rates">Rates </Link>
        <Link to="/info">User Info </Link>
        <Link to="/wallet">Wallet </Link>
        <Link to="/login">Log in </Link>
      </div>

      <div></div>
    </div>
  );
}

export default Header;
