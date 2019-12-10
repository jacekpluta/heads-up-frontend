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
import UIfx from "uifx";
import FailureRing from "./sounds/failure.mp3";

import SuccessRing from "./sounds/success.mp3";
import DeviceOrientation, { Orientation } from "react-screen-orientation";
import ChangeOrientationBox from "./menu/ChangeOrientationBox";

const failureSound = new UIfx(FailureRing, {
  volume: 0.8,
  throttleMs: 100
});

function GameModule(props) {
  const highNumber = 99999999999999999999;

  const [numberOfGames] = useState(2);
  const [numberOfGamesCompleted, setNumberOfGamesCompleted] = useState(0);

  const [countStart, setCountStart] = useState(5);
  const [countTimer, setCountTimer] = useState(30);

  const [delayStart] = useState(750);
  const [delayTimer, setDelayTimer] = useState(highNumber);

  const [isRunningStart, setIsRunningStart] = useState(false);
  const [isRunningTimer, setIsRunningTimer] = useState(false);

  const [showDivCounterStart, setShowDivCounterStart] = useState(false);
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

  const [gameVariantChosen, setGameVariantChosen] = useState(false);

  const [describeTileClicked, setDescribeTileClicked] = useState(false);
  const [showTileClicked, setShowTileClicked] = useState(false);
  const [challangeTileClicked, setChallangeTileClicked] = useState(false);
  const [drawTileClicked, setDrawTileClicked] = useState(false);

  const [backgroundColor, setBackgroundColor] = useState("");

  const [skipTimer, setSkipTimer] = useState(0);

  let history = useHistory();

  function handleGameVariantDescribe() {
    setDescribeTileClicked(true);
    props.clickSound.play();
    const backgroundColorDescribe = {
      background: "linear-gradient((180deg, #05f, #09f))"
    };
    setBackgroundColor(backgroundColorDescribe);
    setCountTimer(30);
    setSkipTimer(30);
  }

  function handleGameVariantShow() {
    setShowTileClicked(true);
    props.clickSound.play();
    const backgroundColorShow = {
      background: "linear-gradient(180deg, rgb(0, 255, 34), rgb(40, 236, 220))"
    };
    setBackgroundColor(backgroundColorShow);
    setCountTimer(90);
    setSkipTimer(90);
  }

  function handleGameChallange() {
    setChallangeTileClicked(true);
    props.clickSound.play();
    const backgroundColorChallange = {
      background:
        "linear-gradient(180deg, rgb(216, 15, 243), rgb(205, 241, 74))"
    };
    setBackgroundColor(backgroundColorChallange);
    setCountTimer(80);
    setSkipTimer(80);
  }

  function handleGameDraw() {
    setDrawTileClicked(true);
    props.clickSound.play();
    const backgroundColorDraw = {
      background: "linear-gradient(180deg, rgb(81, 255, 0), rgb(255, 0, 234))"
    };
    setBackgroundColor(backgroundColorDraw);
    setCountTimer(120);
    setSkipTimer(120);
  }

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

  const handleGoBack = () => {
    setSleep(true);
    handleCloseGameModule();
    setActive(false);
  };

  const handleGameRefresh = () => {
    history.push("/");
  };

  function handleCloseGameModule() {
    props.handleCloseGameModule(false);
  }

  //console.log(history.location);

  //Skip questin and reset timer on div click
  function handleClickOnSkip() {
    if (clickOnSkip) {
      setCountTimer(1);
      setStopDivCounterTimer(false);
    }
  }

  //Returns random question
  function GetRandomQuestion(rand) {
    return (rand =
      props.gameVariant.questions[
        Math.floor(Math.random() * props.gameVariant.questions.length)
      ]);
  }

  //Game menu
  useEffect(() => {
    if (
      describeTileClicked ||
      showTileClicked ||
      challangeTileClicked ||
      drawTileClicked
    ) {
      setGameVariantChosen(true);
    }

    if (gameVariantChosen) {
      setShowgameMenu(false);
      setIsRunningStart(true);
      setIsRunningTimer(true);
      setShowDivCounterStart(true);
    }
  }, [
    gameVariantChosen,
    describeTileClicked,
    showTileClicked,
    challangeTileClicked,
    drawTileClicked
  ]);

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
      failureSound.play();
    }
  }, [countTimer]);

  useEffect(() => {
    if (countTimer === -1 && numberOfGamesCompleted <= numberOfGames) {
      setStopDivCounterTimer(true);
      setCountTimer(skipTimer);
      setNumberOfGamesCompleted(numberOfGamesCompleted + 1);
      setCurrentQuestion(GetRandomQuestion([numberOfGamesCompleted]));
      setPoints(points - 1);

      setQuestionsResult(questionsResult => [
        ...questionsResult,
        currentQuestion + " -1"
      ]);
    }
  }, [
    skipTimer,
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
        style={backgroundColor}
        className="GameModule"
        onClick={handleClickOnSkip}
        whileTap={props.handleBoxId(props.id)}
      >
        <CounterStart
          countStart={countStart}
          showDivCounterStart={showDivCounterStart}
        />
        <CounterTimer
          countTimer={countTimer}
          skipTimer={skipTimer}
          showDivCounterTimer={showDivCounterTimer}
          stopDivCounterTimer={stopDivCounterTimer}
        />

        <BackButton handleGoBack={handleGoBack} />
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
          handleGameVariantDescribe={handleGameVariantDescribe}
          handleGameVariantShow={handleGameVariantShow}
          handleGameChallange={handleGameChallange}
          handleGameDraw={handleGameDraw}
          gameVariant={props.gameVariant}
        />
        <Result
          showResult={showResult}
          points={points}
          questionsResult={questionsResult}
          handleGameRefresh={handleGameRefresh}
        />

        <ParticlesCanvas />
      </motion.div>
    </Router>
  );
}

export default GameModule;
