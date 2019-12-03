import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import CounterStart from "./CounterStart";
import CounterTimer from "./CounterTimer";
import useInterval from "./UseInterval";
import BackButton from "./BackButton";
import Questions from "./Questions";
import ParticlesCanvas from "./ParticlesCanvas";
import SkipOrCorrect from "./SkipOrCorrect";
import Result from "./Result";
import GameMenu from "./menu/GameMenu";
function GameModule(props) {
  const highNumber = 99999999999999999999;

  const [numberOfGames] = useState(2);
  const [numberOfGamesCompleted, setNumberOfGamesCompleted] = useState(0);

  const [countStart, setCountStart] = useState(5);
  const [countTimer, setCountTimer] = useState(7);

  const [delayStart] = useState(750);
  const [delayTimer, setDelayTimer] = useState(highNumber);

  const [isRunningStart, setIsRunningStart] = useState(false);
  const [isRunningTimer, setIsRunningTimer] = useState(false);

  const [showDivCounterStart, setShowDivCounterStart] = useState(true);
  const [showDivCounterTimer, setShowDivCounterTimer] = useState(true);

  const [stopDivCounterTimer, setStopDivCounterTimer] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState("");

  const [active, setActive] = useState(true);
  const [clickOnSkip, setClickOnSkip] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [sleep, setSleep] = useState(false);

  const [points, setPoints] = useState(0);
  const [questionsResult, setQuestionsResult] = useState([]);

  const [showgameMenu, setShowgameMenu] = useState(true);

  let history = useHistory();

  const [gameVariantChosen, setGameVariantChosen] = useState(false);

  const handleVariantChosen = () => {
    setGameVariantChosen(true);
  };

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
    if (sleep) {
      const timer = setTimeout(() => {
        history.push("/");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [history, sleep]);

  const back = () => {
    setSleep(true);
    someFn();
    setActive(false);
  };

  const refresh = () => {
    history.push("/");
  };

  function someFn() {
    props.myCallback(false);
  }

  //console.log(history.location);

  //Skip questin and reset timer on div click
  function ClickOnSkip() {
    if (clickOnSkip) {
      setCountTimer(1);
      setStopDivCounterTimer(false);
    }
  }

  //Returns random question
  function GetRandomQuestion(rand) {
    const Questions = ["kot", "pies", "mysz", "kon", "buldog"];
    return (rand = Questions[Math.floor(Math.random() * Questions.length)]);
  }

  //Game menu
  useEffect(() => {
    if (gameVariantChosen) {
      setShowgameMenu(false);
      setIsRunningStart(true);
      setIsRunningTimer(true);
    }
  }, [gameVariantChosen]);

  //Beginning, setting all counters and question
  useEffect(() => {
    if (countStart === -1) {
      setClickOnSkip(true);
      setShowDivCounterStart(false);
      setShowDivCounterTimer(false);
      setDelayTimer(1000);
      setCurrentQuestion(GetRandomQuestion([numberOfGamesCompleted]));
    }
  }, [countStart, numberOfGamesCompleted]);

  //End of each round
  useEffect(() => {
    if (countTimer === 0) {
      setStopDivCounterTimer(false);
    }
    if (countTimer === -1 && numberOfGamesCompleted <= numberOfGames) {
      setStopDivCounterTimer(true);
      setCountTimer(7);
      setNumberOfGamesCompleted(numberOfGamesCompleted + 1);
      setCurrentQuestion(GetRandomQuestion([numberOfGamesCompleted]));
      setPoints(points - 1);

      setQuestionsResult(questionsResult => [
        ...questionsResult,
        currentQuestion + " -1"
      ]);
    }
  }, [
    countTimer,
    numberOfGamesCompleted,
    numberOfGames,
    points,
    currentQuestion
  ]);

  //End of the game
  useEffect(() => {
    if (numberOfGamesCompleted > numberOfGames) {
      setIsRunningTimer(false);
      setCountTimer("");
      setCurrentQuestion("");
      setShowDivCounterTimer(true);
      setShowResult(true);
      setClickOnSkip(false);
    }
  }, [numberOfGamesCompleted, numberOfGames]);

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

  //console.log(active);
  return (
    <Router>
      <motion.div
        variants={pageTransition}
        initial={active ? "outBox" : "inBox"}
        animate={active ? "inBox" : "outBox"}
        exit={active ? "outBox" : "inBox"}
        className="GameModule"
        onClick={ClickOnSkip}
      >
        <CounterStart
          countStart={countStart}
          showDivCounterStart={showDivCounterStart}
        />
        <CounterTimer
          countTimer={countTimer}
          showDivCounterTimer={showDivCounterTimer}
          stopDivCounterTimer={stopDivCounterTimer}
        />

        <BackButton back={back} />
        <Questions
          currentQuestion={currentQuestion}
          showDivCounterTimer={showDivCounterTimer}
          stopDivCounterTimer={stopDivCounterTimer}
        />
        <SkipOrCorrect
          showDivCounterTimer={showDivCounterTimer}
          stopDivCounterTimer={stopDivCounterTimer}
        />
        <GameMenu
          showgameMenu={showgameMenu}
          onClick={handleVariantChosen}
          gameVariantChosen={gameVariantChosen}
        />
        <Result
          showResult={showResult}
          points={points}
          questionsResult={questionsResult}
          refresh={refresh}
        />

        <ParticlesCanvas />
      </motion.div>
    </Router>
  );
}

export default GameModule;
