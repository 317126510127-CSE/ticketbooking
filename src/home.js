import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Movie from "./Movie";
import { MyContext } from "./constants";
const HomeComponent = ({ isMovieClicked, setIsMovieClicked }) => {
  const [selectedMovieObject, setSelectedMovieObject] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [context, setContext] = useContext(MyContext);

  const handleMovieClick = (movieDataObject, index) => {
    try {
      setSelectedIndex(index);
      setSelectedMovieObject(movieDataObject);
      setIsMovieClicked(true);
    } catch (e) {
      console.log("Home", "handleMovieClick");
    }
  };

  return (
    <>
      {isMovieClicked ? (
        <Movie index={selectedIndex} setIsMovieClicked={setIsMovieClicked} />
      ) : (
        <div className="homeMoviesContainer">
          <h1 className="home-title">Recommended Movies</h1>

          <div className="row cardsContainer">
            {context &&
              context.map((movieDetailsObject, index) => (
                <div className="col-4" key={index}>
                  <div
                    className="movieCard"
                    onClick={() => handleMovieClick(movieDetailsObject, index)}
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        {movieDetailsObject.movieName}(
                        {movieDetailsObject.theatreName})
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {movieDetailsObject.language}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default HomeComponent;
