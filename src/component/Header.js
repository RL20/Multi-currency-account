import React from "react";
import "../styles/Header.css";
function Header() {
  return (
    <div className="cw_navbar__mainnav">
      <nav class="cw_navbar__nav" role="navigation">
        <ul class="cw_navbar__primary">
          <li>
            <a href="">Wallet </a>{" "}
          </li>
          <li>
            <a href=""> Activity</a>
          </li>
          <li>
            <a href="">Rates</a>{" "}
          </li>
        </ul>
        <ul class="cw_navbar__secondary">
          <li>Log In </li>
        </ul>
      </nav>

      <div>Log in</div>
    </div>
  );
}

export default Header;
{
  /* <a class="cw_navbar__logo" href="/myaccount/summary" id="header-ppLogo" name="header-logo" data-name="header-logo" data-pagename="main:header" data-pa-click="header-ppicon" data-testid="cw-header-logo" pa-marked="1"><span class="ppvx_icon--svg ppvx_icon--size_md"><img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-mark-monotone-transparent.svg" alt="Dashboard"></span></a> */
}
