import React, { useState } from "react";
import GameModule from "./GameModule";
import { motion } from "framer-motion";
import UIfx from "uifx";
import buttonClick from "./sounds/buttonClick.mp3";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function Box(props) {
  const [openGameModule, setOpenGameModule] = useState(false);

  const clickSound = new UIfx(buttonClick, {
    volume: 0.8,
    throttleMs: 100
  });

  function back() {
    setOpenGameModule(true);
  }

  function myCallback() {
    setOpenGameModule(false);
    clickSound.play();
  }

  const boxTransition = {
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
        style={props.backgroundBox}
        variants={boxTransition}
        className="Box"
        initial={"inModule"}
        animate={"animModule"}
        whileHover={{ scale: 1.1 }}
        onClick={() => clickSound.play()}
      >
        <a className="divLink" onClick={back} />
      </motion.div>

      <Switch>
        <Route
          exact
          path="/GameModule"
          render={() => (
            <GameModule
              myCallback={myCallback}
              gameVariant={props.gameVariant}
              id={props.id + 1}
              handleBoxId={props.handleBoxId}
              clickSound={clickSound}
            />
          )}
        />
        {openGameModule ? <Redirect to="/GameModule" /> : <Redirect to="/" />}{" "}
      </Switch>
    </Router>
  );
}

//{this.state.showComponent ? <GameModule /> : null}
export default Box;
