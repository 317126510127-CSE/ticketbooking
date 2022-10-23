import React, { useState, useEffect, useContext } from "react";
import { theatreRowNames } from "./constants";
import "./TicketBookingApp.css";
import { MyContext } from "./constants";
import BookingSummary from "./BookingSummary";

const BookTicket = ({ index, setIsMovieClicked }) => {
  const [context, setContext] = useContext(MyContext);
  const selectedMovieObject = context[index];

  const [blockedSeats, setBlockedSeats] = useState(
    selectedMovieObject.blockedSeats
  );

  const [selectedSeatsToBook, setSelectedSeatsToBook] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookedSeats, setBookedSeats] = useState(
    selectedMovieObject.bookedSeats
  );

  const [moveToHome, setMoveToHome] = useState(false);

  console.log("selectedseatstobook", selectedSeatsToBook);

  const getRowName = (index) => {
    try {
      return theatreRowNames[index];
    } catch (e) {
      console.log("BookTicket", "getRowName");
    }
  };

  const checkWhetherBlockedOrNot = (rowIndex, columnIndex) => {
    try {
      let tempArray = [...blockedSeats];
      for (let i = 0; i < tempArray.length; i++) {
        let obj1 = tempArray[i];
        if (obj1.rowIndex === rowIndex && obj1.columnIndex === columnIndex) {
          return "blockAndHideSeat";
        }
      }
      return "";
    } catch (e) {
      console.log("BookTicket", "checkWhetherBlockedOrNot");
    }
  };

  const checkWhetherSeatSelectedOrNot = (rowIndex, columnIndex) => {
    try {
      let tempArray = [...selectedSeatsToBook];
      for (let i = 0; i < tempArray.length; i++) {
        let obj1 = tempArray[i];
        if (obj1.rowIndex === rowIndex && obj1.columnIndex === columnIndex) {
          return "selectedSeatToBook";
        }
      }
      return "";
    } catch (e) {
      console.log("BookTicket", "checkWhetherSeatSelectedOrNot");
    }
  };

  const handleBookSeat = (rowIndex, columnIndex) => {
    try {
      console.log("entered");
      let alreadyPresent = 0;
      let tempArray = [...selectedSeatsToBook];
      for (let i = 0; i < tempArray.length; i++) {
        let obj1 = tempArray[i];
        if (obj1.rowIndex === rowIndex && obj1.columnIndex === columnIndex) {
          alreadyPresent = 1;
          break;
        }
      }

      let temp = [...selectedSeatsToBook];
      if (alreadyPresent === 0) {
        let obj = {};
        obj.rowIndex = rowIndex;
        obj.columnIndex = columnIndex;
        temp = temp.concat(obj);
        setSelectedSeatsToBook(temp);
      } else {
        temp = temp.filter(
          (object) =>
            !(
              object.rowIndex === rowIndex && object.columnIndex === columnIndex
            )
        );
        setSelectedSeatsToBook(temp);
      }
    } catch (e) {
      console.log("BookTicket", "handleBookSeat");
    }
  };

  const handlePayButtonClick = () => {
    try {
      setShowBookingModal(true);
    } catch (e) {
      console.log("BookTicket", "handlePayButtonClick");
    }
  };

  const handleConfirmBookingClick = (selectedSeats) => {
    try {
      console.log("selectedSeats", selectedSeats);
      let contentCloneArray = context;

      console.log("selectedIndex", index);
      for (let i = 0; i < contentCloneArray.length; i++) {
        console.log("i", i, "index", index);
        if (i === index) {
          contentCloneArray[i].bookedSeats =
            contentCloneArray[i].bookedSeats.concat(selectedSeats);
        }
      }
      setContext(contentCloneArray);
      console.log("contentCloneArray", contentCloneArray);
      console.log("context", context);
      setShowBookingModal(false);
    } catch (e) {
      console.log("check error", setIsMovieClicked);
      console.log("BookTicket", e, "handleConfirmBookingClick");
    }
  };

  const handleBack = (currentCount) => {
    try {
      console.log("currentCount", currentCount);
      setShowBookingModal(false);
      if (currentCount == 0) {
        setSelectedSeatsToBook([]);
      }
    } catch (e) {
      console.log("BookTicket", "handleBack");
    }
  };

  const checkWhetherSeatIsAlreadyBookedOrNot = (rowIndex, columnIndex) => {
    try {
      let tempArray = [...bookedSeats];
      for (let i = 0; i < tempArray.length; i++) {
        let obj1 = tempArray[i];
        if (obj1.rowIndex == rowIndex && obj1.columnIndex == columnIndex) {
          return "bookedSeat";
        }
      }
      return "";
    } catch (e) {
      console.log("BookTicket", "checkWhetherSeatIsAlreadyBookedOrNot");
    }
  };

  return (
    <>
      <div>
        {showBookingModal ? (
          <BookingSummary
            setIsMovieClicked={setIsMovieClicked}
            index={index}
            showModal={showBookingModal}
            selectedSeatsToBook={selectedSeatsToBook}
            handleConfirmBookingClick={handleConfirmBookingClick}
            handleBack={handleBack}
          />
        ) : (
          <div className="selectedMovieContainer">
            <div>
              <h1>
                {selectedMovieObject.movieName}(
                {selectedMovieObject.theatreName})
              </h1>
            </div>

            <div className="seatsContainer">
              {[...Array(selectedMovieObject.rowCount)].map(
                (value, rowIndex) => (
                  <div className={`seatRow ${rowIndex + 1}`}>
                    <span className="seatName">{getRowName(rowIndex)}</span>
                    {[...Array(selectedMovieObject.columnCount)].map(
                      (value, columnIndex) => (
                        <span
                          className={`seatNumber ${checkWhetherSeatIsAlreadyBookedOrNot(
                            rowIndex + 1,
                            columnIndex + 1
                          )} ${checkWhetherBlockedOrNot(
                            rowIndex + 1,
                            columnIndex + 1
                          )} ${checkWhetherSeatSelectedOrNot(
                            rowIndex + 1,
                            columnIndex + 1
                          )}  }`}
                          id={`rowIndex-${rowIndex + 1}-columnIndex-${
                            columnIndex + 1
                          }`}
                          key={`rowIndex-${rowIndex + 1}-columnIndex-${
                            columnIndex + 1
                          }`}
                          onClick={() => {
                            handleBookSeat(rowIndex + 1, columnIndex + 1);
                          }}
                        >
                          {columnIndex + 1}
                        </span>
                      )
                    )}
                  </div>
                )
              )}
            </div>

            <div className="AmountContainer">
              {selectedSeatsToBook.length > 0 && (
                <button
                  className="button"
                  onClick={() => {
                    handlePayButtonClick();
                  }}
                >
                  Pay Rs.{selectedSeatsToBook.length * 200}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookTicket;
