import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CounterStart from "./CounterStart";
import CounterTimer from "./CounterTimer";
function GameModule() {
  return (
    <div className="GameModule">
      <CounterStart></CounterStart>
      <CounterTimer></CounterTimer>
      <h1>Game</h1>

      <Link to="/">
        Back:
        <div id="countdown-number"></div>
        <svg>
          <circle r="18" cx="20" cy="20"></circle>
        </svg>
      </Link>
    </div>
  );
}

export default GameModule;
