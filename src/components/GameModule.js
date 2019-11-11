import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CounterStart from "./CounterStart";
import CounterTimer from "./CounterTimer";

function GameModule(props) {
  useEffect(() => {
    if (props.startSecondCounterValue === true) {
      console.log("tak");
    } else {
      console.log("nie");
    }
  }, []);

  return (
    <div className="GameModule">
      <CounterStart></CounterStart>
      <CounterTimer></CounterTimer>
      <h1>Game</h1>

      <Link to="/">Back:</Link>
    </div>
  );
}

export default GameModule;
