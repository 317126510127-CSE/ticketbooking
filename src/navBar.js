import React from "react";
import "./TicketBookingApp.css";
const NavBarComponent = ({ setIsMovieClicked }) => {
  const handleHomeClick = () => {
    try {
      setIsMovieClicked(false);
    } catch (e) {
      console.log("NavBar", "handleHomeClick");
    }
  };

  return (
    <>
      <nav className="navbar navbar-light navBarCss">
        <span className="navbar-brand" onClick={() => handleHomeClick()}>
          <img
            className="imageCss"
            src={process.env.PUBLIC_URL + "logo.webp"}
          />
          <span className="bookMyTicketCss">Book My Ticket</span>
        </span>
        <a className="navbar-brand homeCss" onClick={() => handleHomeClick()}>
          Home
        </a>
        <hr className="navBarHrCss" />
      </nav>
    </>
  );
};

export default NavBarComponent;
