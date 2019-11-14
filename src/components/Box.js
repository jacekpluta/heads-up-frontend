import React, { useState } from "react";
import GameModule from "./GameModule";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function eventDivOnClick(e) {
  console.log("Clicked");
}

function Box(props) {
  const [startGame, setStartGame] = useState(false);
  const [startNextGame, setStartNextGame] = useState(false);
  function handleChange(newValue) {
    setStartGame(newValue);
    if (newValue === true) {
      console.log("Gra 1");
    }
  }

  function handleChange2(newValue2) {
    setStartNextGame(newValue2);

    if (newValue2 === true) {
      console.log("Gra 2");
    }
  }

  return (
    <Router>
      <div className="Box" onClick={eventDivOnClick}>
        <Link to="/GameModule">Start</Link>

        <Switch>
          <Route exact path="/GameModule">
            <GameModule
              startNextGame={startNextGame}
              startGame={startGame}
              onChange={handleChange}
              onChange2={handleChange2}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

//{this.state.showComponent ? <GameModule /> : null}
export default Box;
