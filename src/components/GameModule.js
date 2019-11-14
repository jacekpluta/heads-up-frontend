import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CounterStart from "./CounterStart";
import CounterTimer from "./CounterTimer";
import useInterval from "./UseInterval";

function GameModule(props) {
  const highNumber = 99999999999999999999;

  const [countStart, setCountStart] = useState(5);
  const [countTimer, setCountTimer] = useState(7);

  const [delayStart] = useState(750);
  const [delayTimer, setDelayTimer] = useState(highNumber);

  const [isRunningStart, setIsRunningStart] = useState(true);
  const [isRunningTimer, setIsRunningTimer] = useState(true);

  const [showDivCounterStart, setShowDivCounterStart] = useState(true);
  const [showDivCounterTimer, setShowDivCounterTimer] = useState(true);

  const [nextGame, setNextGame] = useState(false);

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

  function ClickOnSkipFunc() {
    setNextGame(true);
    console.log(nextGame);
  }

  useEffect(() => {
    if (countStart === 1) {
      setShowDivCounterStart(false);
      setShowDivCounterTimer(false);
      setDelayTimer(1000);
      console.log("1 game");
    }
  }, [countStart]);

  if (countTimer === 0) {
    setCountTimer("0");
    setCountTimer(7);
    console.log("2 game");
  }

  if (nextGame === true) {
    console.log("3 game");
  }
  return (
    <div className="GameModule" onClick={ClickOnSkipFunc}>
      <CounterStart
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
