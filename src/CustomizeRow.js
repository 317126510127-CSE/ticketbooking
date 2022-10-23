import React, { useState, useContext } from "react";
import { theatreRowNames } from "./constants";
import Movie from "./Movie";
import { MyContext } from "./constants";
import "./TicketBookingApp.css";
const CustomizeRow = ({ index, setIsMovieClicked }) => {
  const [context, setContext] = useContext(MyContext);
  const selectedMovieObject = context[index];

  const [rowCount, setRowCount] = useState(selectedMovieObject.rowCount);
  const [columnCount, setColumnCount] = useState(
    selectedMovieObject.columnCount
  );
  const [isSaveSetupClicked, setIsSaveSetupClicked] = useState(false);

  const [blockedSeats, setBlockedSeats] = useState(
    selectedMovieObject.blockedSeats
  );
  const [bookedSeats, setBookedSeats] = useState(
    selectedMovieObject.bookedSeats
  );

  const handleRowChange = (e) => {
    try {
      setRowCount(parseInt(e.target.value));
    } catch (e) {
      console.log("CustomizeRow", "handleRowChange");
    }
  };

  const handleColumnChange = (e) => {
    try {
      setColumnCount(parseInt(e.target.value));
    } catch (e) {
      console.log("CustomizeRow", "handleColumnChange");
    }
  };

  const getRowName = (index) => {
    try {
      return theatreRowNames[index];
    } catch (e) {
      console.log("CustomizeRow", "getRowName");
    }
  };

  const handleSaveSetup = () => {
    try {
      setIsSaveSetupClicked(true);
      let contentCloneArray = context;
      for (let i = 0; i < contentCloneArray.length; i++) {
        if (i === index) {
          contentCloneArray[i].rowCount = rowCount;
          contentCloneArray[i].columnCount = columnCount;
          contentCloneArray[i].blockedSeats = blockedSeats;
        }
      }
      setContext(contentCloneArray);
    } catch (e) {
      console.log("CustomizeRow", "handleSaveSetup");
    }
  };

  const handleSeat = (rowIndex, columnIndex) => {
    try {
      let alreadyPresent = 0;
      let tempArray = [...blockedSeats];
      for (let i = 0; i < tempArray.length; i++) {
        let obj1 = tempArray[i];
        if (obj1.rowIndex === rowIndex && obj1.columnIndex === columnIndex) {
          alreadyPresent = 1;
          break;
        }
      }

      let temp = [...blockedSeats];
      if (alreadyPresent === 0) {
        let obj = {};
        obj.rowIndex = rowIndex;
        obj.columnIndex = columnIndex;
        temp = temp.concat(obj);
        setBlockedSeats(temp);
      } else {
        temp = temp.filter(
          (object) =>
            !(
              object.rowIndex === rowIndex && object.columnIndex === columnIndex
            )
        );
        setBlockedSeats(temp);
      }
    } catch (e) {
      console.log("CustomizeRow", "handleSeat");
    }
  };

  const checkWhetherSelectedOrNot = (rowIndex, columnIndex) => {
    try {
      let tempArray = [...blockedSeats];
      for (let i = 0; i < tempArray.length; i++) {
        let obj1 = tempArray[i];
        if (obj1.rowIndex == rowIndex && obj1.columnIndex == columnIndex) {
          return "blockedSeat";
        }
      }
      return "";
    } catch (e) {
      console.log("CustomizeRow", "checkWhetherSelectedOrNot");
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
      console.log("CustomizeRow", "checkWhetherSeatIsAlreadyBookedOrNot");
    }
  };

  return (
    <div>
      {isSaveSetupClicked ? (
        <Movie index={index} setIsMovieClicked={setIsMovieClicked} />
      ) : (
        <div className="selectedMovieContainer">
          <div>
            <h1>
              {selectedMovieObject.movieName}({selectedMovieObject.theatreName})
            </h1>

            <div className="inputContainer">
              <form className="formContainer">
                <div className="rowColButton inputCss">
                  <label className="rowColLabel">Row</label>
                  <input
                    value={rowCount}
                    onChange={(e) => handleRowChange(e)}
                    type="number"
                    min={0}
                    max={26}
                  />
                </div>
                <div className="rowColButton inputCss">
                  <label className="rowColLabel">Column</label>
                  <input
                    value={columnCount}
                    onChange={(e) => handleColumnChange(e)}
                    type="number"
                    min="0"
                    max="20"
                  />
                </div>

                <div className="rowColButton">
                  <button
                    className="saveSetupButton saveSetupColor"
                    onClick={() => {
                      handleSaveSetup();
                    }}
                  >
                    SAVE SETUP
                  </button>
                </div>
              </form>
            </div>

            <div className="blockText">
              <h3>
                Select Seats to be <span className="tomatoColor">Blocked</span>
              </h3>
            </div>
          </div>

          <div className="seatsContainer">
            {[...Array(rowCount)].map((value, rowIndex) => (
              <div className={`seatRow ${rowIndex + 1}`}>
                <span className="seatName">{getRowName(rowIndex)}</span>
                {[...Array(columnCount)].map((value, columnIndex) => (
                  <span
                    className={`seatNumber ${checkWhetherSeatIsAlreadyBookedOrNot(
                      rowIndex + 1,
                      columnIndex + 1
                    )} ${checkWhetherSelectedOrNot(
                      rowIndex + 1,
                      columnIndex + 1
                    )}`}
                    id={`rowIndex-${rowIndex + 1}-columnIndex-${
                      columnIndex + 1
                    }`}
                    key={`rowIndex-${rowIndex + 1}-columnIndex-${
                      columnIndex + 1
                    }`}
                    onClick={() => {
                      handleSeat(rowIndex + 1, columnIndex + 1);
                    }}
                  >
                    {columnIndex + 1}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizeRow;
