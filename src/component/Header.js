import React from "react";
import "../styles/Header.css";
function Header() {
  return (
    <div className="head">
      <div className="topnav">
        <a className="active" href="#home">
          Home
        </a>
        <a href="#news">Wallet</a>
        <a href="#contact">Activity</a>
        <a href="#about">Rates</a>
        <a>Log in </a>
      </div>

      <div></div>
    </div>

    // <div className="cw_navbar__mainnav">
    //   <nav class="cw_navbar__nav" role="navigation">
    //     <ul class="cw_navbar__primary">
    //       <li>
    //         <a href="">Wallet </a>{" "}
    //       </li>
    //       <li>
    //         <a href=""> Activity</a>
    //       </li>
    //       <li>
    //         <a href="">Rates</a>{" "}
    //       </li>
    //     </ul>
    //     <ul class="cw_navbar__secondary">
    //       <li>Log In </li>
    //     </ul>
    //   </nav>

    //   <div>Log in</div>
    // </div>
  );
}

export default Header;
