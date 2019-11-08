import React from "react";
import "./styles.css";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <Header>
        <h1>Header</h1>
      </Header>

      <Main></Main>
    </div>
  );
}

export default App;
