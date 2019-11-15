import React from "react";
import GameModule from "./GameModule";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Box(props) {
  return (
    <Router>
      <div className="Box">
        <Link to="/GameModule">
          {" "}
          <span>dsaas</span>
        </Link>

        <Switch>
          <Route exact path="/GameModule">
            <GameModule></GameModule>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

//{this.state.showComponent ? <GameModule /> : null}
export default Box;
