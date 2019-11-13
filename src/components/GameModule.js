import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CounterStart from "./CounterStart";
import CounterTimer from "./CounterTimer";
import useInterval from "./UseInterval";

function GameModule(props) {
  const [counterBool, SetCounterBool] = useState(false);

  const [countStart, setCountStart] = useState(5);
  const [countTimer, setCountTimer] = useState(30);

  const [delayStart] = useState(750);
  const [delayTimer] = useState(1000);

  const [isRunningStart, setIsRunningStart] = useState(true);
  const [isRunningTimer, setIsRunningTimer] = useState(true);

  const [showDivCounterStart, setShowDivCounterStart] = useState(true);
  const [showDivCounterTimer, setShowDivCounterTimer] = useState(true);

  useInterval(
    () => {
      setCountStart(countStart - 1);
    },
    isRunningStart ? delayStart : null
  );

  useInterval(
    () => {
      setCountTimer(countTimer - 1);
    },
    isRunningTimer ? delayTimer : null
  );

  useEffect(() => {
    if (countStart < 0) {
      setIsRunningStart(false);
      setShowDivCounterStart(false);
    }
    if (countTimer === 0) {
      setIsRunningTimer(false);
      setCountTimer("");
      setShowDivCounterTimer(false);
    }
  }, [countStart, countTimer]);

  return (
    <div className="GameModule">
      <CounterStart
        counterBool={counterBool}
        countStart={countStart}
        showDivCounterStart={showDivCounterStart}
      ></CounterStart>
      <CounterTimer
        countTimer={countTimer}
        showDivCounterTimer={showDivCounterTimer}
      ></CounterTimer>
      <h1>Game</h1>

      <Link to="/">Back:</Link>
    </div>
  );
}

export default GameModule;
