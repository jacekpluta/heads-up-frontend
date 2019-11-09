import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function GameModule() {
  let [count, setCount] = React.useState(5);
  let i_id;

  React.useEffect(() => {
    i_id = setInterval(() => {
      setCount(currCount => currCount - 1);
    }, 1000);

    return () => {
      clearInterval(i_id);
    };
  }, []);

  return (
    <div className="GameModule">
      <h1>Game</h1>
      {count}
      <Link to="/">
        Back Count:
        <div id="countdown-number"></div>
        <svg>
          <circle r="18" cx="20" cy="20"></circle>
        </svg>
      </Link>
    </div>
  );
}

export default GameModule;
