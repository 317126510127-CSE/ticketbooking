import "./App.css";
import { moviesList, MyContext } from "./constants";
import React, { useState } from "react";
import MainPage from "./MainPage";
function App() {
  const [context, setContext] = useState(moviesList);

  return (
    <div className="App">
      <MyContext.Provider value={[context, setContext]}>
        <MainPage />
      </MyContext.Provider>
    </div>
  );
}

export default App;
