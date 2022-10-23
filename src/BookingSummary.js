import React, { useEffect, useState, useContext } from "react";
import { theatreRowNames, MyContext } from "./constants";
import { AiOutlineArrowLeft } from "react-icons/ai";
const BookingSummary = ({
  setIsMovieClicked,
  index,
  showModal,
  selectedSeatsToBook,
  handleConfirmBookingClick,
  handleBack,
}) => {
  // const[seconds,setSeconds]=useState(5);
  const [context, setContext] = useContext(MyContext);
  const selectedMovieObject = context[index];
  const [currentCount, setCount] = useState(5);
  const timer = () => setCount(currentCount - 1);

  // useEffect(()=>
  //{
  //   setSeconds(5);
  //   startTimer();
  // },[]);

  useEffect(() => {
    if (currentCount <= 0) {
      return;
    }
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, [currentCount]);

  const handleConfirmBooking = () => {
    try {
      handleConfirmBookingClick(selectedSeatsToBook);
      setIsMovieClicked(false);
    } catch (e) {
      console.log("BookingSummary", e, "handleConfirmBooking");
    }
  };

  return (
    <div className={`bookingModal ${showModal === true ? "show" : "hide"}`}>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">
            <AiOutlineArrowLeft
              className="leftArrowIcon"
              onClick={(e) => handleBack(currentCount)}
            />
            <span className="bookingSummary">BOOKING SUMMARY</span>
            <p className="selectedMovieName">
              {selectedMovieObject.movieName} ({selectedMovieObject.theatreName}
              )
            </p>
          </div>
        </div>
        <div className="modal-body bookingSeatsContainer">
          <div className="row">
            <div className="col-7 textAlignCss">
              {selectedSeatsToBook.length > 0 &&
                selectedSeatsToBook.map((seatObject, seatIndex) => (
                  <span key={seatIndex}>
                    {theatreRowNames[seatObject.rowIndex]}
                    {seatObject.columnIndex} ,
                  </span>
                ))}
              <span>({selectedSeatsToBook.length} Tickets)</span>
            </div>
            <div className="col-2">Rs.{selectedSeatsToBook.length * 200}</div>
          </div>
          <div className="row bookingSummaryRow">
            <div className="col-7 textAlignCss">Booking Charge</div>
            <div className="col-2">Rs.{selectedSeatsToBook.length * 20}</div>
          </div>
          <hr className="hrCss" />

          <div className="row bookingSummaryRow">
            <div className="col-7 textAlignCss">Total</div>
            <div className="col-2">
              Rs.
              {selectedSeatsToBook.length * 200 +
                selectedSeatsToBook.length * 20}
            </div>
          </div>
        </div>
        <span
          className={`button confirmBookingButton ${
            currentCount <= 0 ? "disabledButton" : ""
          }`}
          onClick={() => currentCount > 0 && handleConfirmBooking()}
        >
          Confirm Booking {currentCount > 0 && <span>({currentCount})</span>}{" "}
        </span>
      </div>
    </div>
  );
};

export default BookingSummary;
