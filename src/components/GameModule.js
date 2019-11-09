import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Counter from "./Counter";

function GameModule() {
  return (
    <div className="GameModule">
      <Counter></Counter>
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
