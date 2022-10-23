import React, { useState, useContext } from "react";
import BookTicket from "./BookTicket";
import { MyContext } from "./constants";
import CustomizeRow from "./CustomizeRow";
import "./TicketBookingApp.css";
const Movie = ({ index, setIsMovieClicked }) => {
  const [isBookTicketClicked, setIsBookTicketClicked] = useState(false);
  const [isCustomizeRowClicked, setIsCustomizeRowClicked] = useState(false);

  const [context, setContext] = useContext(MyContext);
  const selectedMovieObject = context[index];

  const handleBookTicket = () => {
    try {
      setIsBookTicketClicked(true);
    } catch (e) {
      console.log("Movie", "handleBookTicket");
    }
  };

  const handleCustomizeRow = () => {
    try {
      setIsCustomizeRowClicked(true);
    } catch (e) {
      console.log("Movie", "handleCustomizeRow");
    }
  };

  return (
    <>
      {isBookTicketClicked ? (
        <BookTicket index={index} setIsMovieClicked={setIsMovieClicked} />
      ) : isCustomizeRowClicked ? (
        <CustomizeRow index={index} setIsMovieClicked={setIsMovieClicked} />
      ) : (
        <div className="selectedMovieContainer">
          <div className="selectedMovieContainerName">
            <h1>
              {selectedMovieObject.movieName}({selectedMovieObject.theatreName})
              - {selectedMovieObject.language}
            </h1>
            <h4>Ticket Cost: 200</h4>
            <div className="movieButtonContainer">
              <div className="buttonHolder">
                <div className="buttonDiv">
                  <a
                    className="movieButtons movieButtonsColor"
                    onClick={() => handleBookTicket()}
                  >
                    BOOK TICKET
                  </a>
                </div>
                <div className="buttonDiv">
                  <a
                    className="movieButtons movieButtonsColor"
                    onClick={() => handleCustomizeRow()}
                  >
                    CUSTOMIZE ROW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movie;
