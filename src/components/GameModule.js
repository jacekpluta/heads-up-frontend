import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import CounterStart from "./CounterStart";
import CounterTimer from "./CounterTimer";
import useInterval from "./UseInterval";
import { motion } from "framer-motion";
import BackButton from "./BackButton";
import ParticlesCanvas from "./ParticlesCanvas";

function GameModule(props) {
  const highNumber = 99999999999999999999;

  const [numberOfGames] = useState(4);
  const [numberOfGamesCompleted, setNumberOfGamesCompleted] = useState(0);

  const [countStart, setCountStart] = useState(5);
  const [countTimer, setCountTimer] = useState(7);

  const [delayStart] = useState(750);
  const [delayTimer, setDelayTimer] = useState(highNumber);

  const [isRunningStart] = useState(true);
  const [isRunningTimer, setIsRunningTimer] = useState(true);

  const [showDivCounterStart, setShowDivCounterStart] = useState(true);
  const [showDivCounterTimer, setShowDivCounterTimer] = useState(true);

  const [stopDivCounterTimer, setStopDivCounterTimer] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState("");

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
    setCountTimer(1);
    setStopDivCounterTimer(false);
  }

  function GetRandomQuestion(rand) {
    const Questions = ["kot", "pies", "mysz", "kon", "buldog"];
    return (rand = Questions[Math.floor(Math.random() * Questions.length)]);
  }

  useEffect(() => {
    if (countStart === -1) {
      setShowDivCounterStart(false);
      setShowDivCounterTimer(false);
      setDelayTimer(1000);
      setCurrentQuestion(GetRandomQuestion([numberOfGamesCompleted]));
    }
  }, [countStart, numberOfGamesCompleted]);

  useEffect(() => {
    if (countTimer === 0 && numberOfGamesCompleted <= numberOfGames) {
      setStopDivCounterTimer(true);
      setCountTimer(7);
      setNumberOfGamesCompleted(numberOfGamesCompleted + 1);
      setCurrentQuestion(GetRandomQuestion([numberOfGamesCompleted]));
    }
  }, [countTimer, numberOfGamesCompleted, numberOfGames]);

  useEffect(() => {
    if (numberOfGamesCompleted > numberOfGames) {
      setIsRunningTimer(false);
      setCountTimer("");
      setCurrentQuestion("");
      setShowDivCounterTimer(true);
    }
  }, [numberOfGamesCompleted, numberOfGames]);

  const [sleep, setSleep] = useState(false);
  let history = useHistory();

  useEffect(() => {
    if (sleep) {
      const timer = setTimeout(() => {
        history.push("/");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [history, sleep]);

  const back = value => {
    setActive(false);
    setSleep(true);
    someFn();
  };

  function someFn() {
    props.myCallback(false);
  }

  //console.log(history.location);

  const pageTransition = {
    inBox: {
      opacity: 1
    },
    outBox: {
      opacity: 0
    },
    inBackBtn: {
      opacity: 0,
      x: "-100vh"
    },
    animBackBtn: {
      opacity: 1,
      x: 0
    }
  };

  const [active, setActive] = useState(true);
  const [onTapScale, setOnTapScale] = useState(true);
  //console.log(active);
  return (
    <Router>
      <motion.div
        variants={pageTransition}
        initial={active ? "outBox" : "inBox"}
        animate={active ? "inBox" : "outBox"}
        exit={active ? "outBox" : "inBox"}
        className="GameModule"
        onClick={ClickOnSkipFunc}
      >
        <CounterStart
          countStart={countStart}
          showDivCounterStart={showDivCounterStart}
        ></CounterStart>
        <CounterTimer
          countTimer={countTimer}
          showDivCounterTimer={showDivCounterTimer}
          stopDivCounterTimer={stopDivCounterTimer}
        ></CounterTimer>

        <h1>{currentQuestion}</h1>

        <BackButton back={back}></BackButton>

        <ParticlesCanvas></ParticlesCanvas>
      </motion.div>
    </Router>
  );
}

export default GameModule;
