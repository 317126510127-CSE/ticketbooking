import React, { useState } from "react";
import HomeComponent from "./Home";
import NavBarComponent from "./NavBar";
const MainPage = () => {
  document.body.style = "background: #f2f2f2";
  const [isMovieClicked, setIsMovieClicked] = useState(false);
  return (
    <>
      <div className="main">
        <NavBarComponent setIsMovieClicked={setIsMovieClicked} />
        <HomeComponent
          setIsMovieClicked={setIsMovieClicked}
          isMovieClicked={isMovieClicked}
        />
      </div>
    </>
  );
};

export default MainPage;
