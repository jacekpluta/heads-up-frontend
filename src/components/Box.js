import React, { useState } from "react";
import GameModule from "./GameModule";
import onClickOutside from "react-onclickoutside";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";

function Box(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  Box.handleClickOutside = () => setIsOpen(false);

  console.log(isOpen);
  let history = useHistory();

  function back() {
    history.push("/");
  }
  return (
    <div className="Box" onClick={toggle}>
      <Router>
        <Switch>
          <Route exact path="/GameModule">
            <GameModule clickedTrue={toggle}></GameModule>
          </Route>
          {isOpen ? <Redirect to="/GameModule" /> : <Redirect to="/" />}
        </Switch>
      </Router>
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Box.handleClickOutside
};

//{this.state.showComponent ? <GameModule /> : null}
export default onClickOutside(Box, clickOutsideConfig);
