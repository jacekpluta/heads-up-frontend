import React, { useState } from "react";
import GameModule from "./GameModule";
import { motion } from "framer-motion";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function Box(props) {
  const [isOpen, setIsOpen] = useState(false);

  function back() {
    setIsOpen(true);
  }

  function myCallback() {
    setIsOpen(false);
  }

  const pageTransition = {
    inModule: {
      opacity: 0,
      x: "-100vh"
    },
    animModule: {
      opacity: 1,
      x: 0
    }
  };
  return (
    <Router>
      <motion.div
        variants={pageTransition}
        className="Box"
        initial={"inModule"}
        animate={"animModule"}
      >
        <a className="divLink" onClick={back}></a>

        <Switch>
          <Route
            exact
            path="/GameModule"
            render={props => <GameModule {...props} myCallback={myCallback} />}
          />
          {isOpen ? <Redirect to="/GameModule" /> : <Redirect to="/" />}{" "}
        </Switch>
      </motion.div>
    </Router>
  );
}

//{this.state.showComponent ? <GameModule /> : null}
export default Box;
