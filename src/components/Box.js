import React, { useState } from "react";
import GameModule from "./GameModule";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function Box(props) {
  const [clickedTrue, setClickedTrue] = useState(false);

  const handleClickBox = () => {
    setClickedTrue(true);
  };

  return (
    <div className="Box" onClick={handleClickBox}>
      <Router>
        <Switch>
          <Route exact path="/GameModule">
            <GameModule></GameModule>
          </Route>
          {clickedTrue ? <Redirect to="/GameModule" /> : <Redirect to="/" />}
        </Switch>
      </Router>
    </div>
  );
}

//{this.state.showComponent ? <GameModule /> : null}
export default Box;
