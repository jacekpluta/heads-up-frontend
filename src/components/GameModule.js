import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import CounterStart from "./CounterStart";
import CounterTimer from "./CounterTimer";
import useInterval from "./UseInterval";
import BackButton from "./BackButton";
import Questions from "./Questions";
import SkipOrCorrect from "./SkipOrCorrect";
import Result from "./Result";

import { GameCategoryContext } from "./contex/GameCategoryContext";
import { GameVariantContext } from "./contex/GameVariantContext";

import UIfx from "uifx";
import buttonClick from "../sounds/buttonClick.mp3";

import FailureRing from "../sounds/failure.mp3";
import SuccessRing from "../sounds/success.mp3";
import CountdownRing from "../sounds/countdown.mp3";

import ChangeOrientationBox from "./menu/ChangeOrientationBox";
import DeviceOrientation, { Orientation } from "react-screen-orientation";

const clickSound = new UIfx(buttonClick, {
  volume: 1,
  throttleMs: 100,
});

const successSound = new UIfx(SuccessRing, {
  volume: 1,
  throttleMs: 100,
});

const countdownSound = new UIfx(CountdownRing, {
  volume: 0.5,
  throttleMs: 100,
});

const failureSound = new UIfx(FailureRing, {
  volume: 1,
  throttleMs: 100,
});

function GameModule(props) {
  const highNumber = 99999999999999999999;
  const { gameCategory } = useContext(GameCategoryContext);
  const { gameVariant } = useContext(GameVariantContext);

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

  const [clickOnSkip, setClickOnSkip] = useState(false);
  const [tiltOnCorrect, setTiltOnCorrect] = useState(false);

  const [points, setPoints] = useState(0);
  const [questionsResult, setQuestionsResult] = useState([]);

  const [backgroundColor, setBackgroundColor] = useState("");
  const [skipTimer, setSkipTimer] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [skippedAnswer, setSkippedAnswer] = useState(false);
  const [tiltDone, setTiltDone] = useState(true);

  const [pointsObject, setPointsObject] = useState("");
  const [transitionOff, setTransitionOff] = useState(false);

  const { muteSounds } = props;

  let history = useHistory();

  const handleGoBack = () => {
    clickSound.play();
    setTimeout(() => {
      history.push("/gamemenu");
    }, 700);
    setTransitionOff(true);
  };

  useEffect(() => {
    if (!gameVariant || !gameCategory) {
      history.push("/");
    }
  }, [gameVariant, gameCategory]);

  useEffect(() => {
    if (muteSounds) {
      successSound.setVolume(0);
      countdownSound.setVolume(0);
      failureSound.setVolume(0);
    } else {
      successSound.setVolume(1);
      countdownSound.setVolume(1);
      failureSound.setVolume(1);
    }
  }, [muteSounds]);

  const handleGameVariantDescribe = () => {
    const backgroundColorDescribe = {
      background: "linear-gradient((180deg, #05f, #09f))",
    };

    setBackgroundColor(backgroundColorDescribe);
    setCountTimer(30);
    setSkipTimer(30);
  };

  const handleGameVariantShow = () => {
    const backgroundColorShow = {
      background: "linear-gradient(180deg, rgb(0, 255, 34), rgb(40, 236, 220))",
    };
    setBackgroundColor(backgroundColorShow);
    setCountTimer(90);
    setSkipTimer(90);
  };

  const handleGameVariantChallange = () => {
    const backgroundColorChallange = {
      background:
        "linear-gradient(180deg, rgb(216, 15, 243), rgb(205, 241, 74))",
    };
    setBackgroundColor(backgroundColorChallange);
    setCountTimer(80);
    setSkipTimer(80);
  };

  const handleGameVariantDraw = () => {
    const backgroundColorDraw = {
      background: "linear-gradient(180deg, rgb(81, 255, 0), rgb(255, 0, 234))",
    };
    setBackgroundColor(backgroundColorDraw);
    setCountTimer(120);
    setSkipTimer(120);
  };

  useEffect(() => {
    if (gameCategory && gameVariant === "describe") {
      handleGameVariantDescribe();
    } else if (gameCategory && gameVariant === "show") {
      handleGameVariantShow();
    } else if (gameCategory && gameVariant === "challange") {
      handleGameVariantChallange();
    } else if (gameCategory && gameVariant === "draw") {
      handleGameVariantDraw();
    }
  }, [gameCategory, gameVariant]);

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

  const handleClickOnSkipOff = () => {
    setClickOnSkip(false);
  };

  const handleGameRefresh = () => {
    clickSound.play();
    history.push("/gamemodule");
  };

  //Returns random question
  const GetRandomQuestion = (rand) => {
    return (rand =
      gameCategory.questions[
        Math.floor(Math.random() * gameCategory.questions.length)
      ]);
  };

  //Game menu
  useEffect(() => {
    if (gameCategory && gameVariant) {
      setIsRunningStart(true);
      setIsRunningTimer(true);
      setShowDivCounterStart(true);
    }
  }, [gameCategory, gameVariant]);

  //Scren tilt Y axis, +1 point, correct answer
  const update = function (value) {
    if (value) {
      value = Math.floor(value);
      if (value === 45 && countStart < 0 && tiltDone === true) {
        handleTiltOnCorrect();
        setTiltDone(false);
      }
    }
  };

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function (e) {
      update(e.gamma);
    });
  }

  //Beginning of the game after countdown, setting all counters and question
  useEffect(() => {
    if (countStart === -1) {
      setIsRunningStart(false);
      setClickOnSkip(true);
      setTiltOnCorrect(true);
      setShowDivCounterStart(false);
      setShowDivCounterTimer(false);
      setDelayTimer(1000);
      setCurrentQuestion(GetRandomQuestion([numberOfGamesCompleted]));
    }
  }, [countStart, numberOfGamesCompleted]);

  //Skip questin and reset timer on div click
  const handleClickOnSkip = () => {
    if (clickOnSkip) {
      setCountTimer(0);
      setStopDivCounterTimer(false);
      setSkippedAnswer(true);
      failureSound.play();
    }
  };

  //Skip questin and reset timer on phone forward tilt
  const handleTiltOnCorrect = () => {
    if (tiltOnCorrect) {
      setCountTimer(0);
      setStopDivCounterTimer(false);
      setCorrectAnswer(true);
      successSound.play();

      setPointsObject((pointsObject) => [...pointsObject, "+1"]);
    }
  };

  //End of each round
  useEffect(() => {
    if (countTimer === 0 && skippedAnswer === true) {
      setStopDivCounterTimer(false);
      setPoints(points - 1);
      failureSound.play();
    }
    if (countTimer === 0 && correctAnswer === true) {
      setStopDivCounterTimer(false);
      setPoints(points + 1);
      successSound.play();
    }
  }, [countTimer, correctAnswer, skippedAnswer]);

  //Set points if skipped or time runs out
  useEffect(() => {
    if (countTimer === 0 && correctAnswer === false) {
      setPointsObject((pointsObject) => [...pointsObject, "-1"]);
      setSkippedAnswer(true);
    }
  }, [countTimer]);

  useEffect(() => {
    if (countTimer === -2 && numberOfGamesCompleted <= numberOfGames) {
      setTiltDone(true);
      setTiltOnCorrect(true);
      setClickOnSkip(true);

      setCorrectAnswer(false);
      setSkippedAnswer(false);

      setStopDivCounterTimer(true);
      setCountTimer(skipTimer);
      setNumberOfGamesCompleted(numberOfGamesCompleted + 1);

      setCurrentQuestion(GetRandomQuestion([numberOfGamesCompleted]));
      setQuestionsResult((questionsResult) => [
        ...questionsResult,
        currentQuestion,
      ]);
    }
  }, [
    skipTimer,
    countTimer,
    numberOfGamesCompleted,
    numberOfGames,
    points,
    currentQuestion,
  ]);

  //End of the game
  useEffect(() => {
    if (numberOfGamesCompleted > numberOfGames) {
      setIsRunningTimer(false);
      setCountTimer("");
      setCurrentQuestion("");
      setShowDivCounterTimer(true);

      setClickOnSkip(false);
      setTiltOnCorrect(false);
    }
  }, [numberOfGamesCompleted, numberOfGames]);

  const pageTransition = {
    inBox: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    outBox: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    // <DeviceOrientation lockOrientation={"landscape"}>
    //   <Orientation orientation="landscape" angle="90" alwaysRender={false}>
    //   </Orientation>
    //   <Orientation orientation="portrait" alwaysRender={false}>
    //     <ChangeOrientationBox></ChangeOrientationBox>
    //   </Orientation>
    // </DeviceOrientation>
    <motion.div
      variants={pageTransition}
      initial={transitionOff ? "inBox" : "outBox"}
      animate={transitionOff ? "outBox" : "inBox"}
      exit={transitionOff ? "inBox" : "outBox"}
      style={backgroundColor}
      className="GameModule"
      onClick={handleClickOnSkip}
    >
      <BackButton handleGoBack={handleGoBack} />

      <CounterStart
        countdownSound={countdownSound}
        countStart={countStart}
        showDivCounterStart={showDivCounterStart}
      />

      <Questions
        currentQuestion={currentQuestion}
        showDivCounterTimer={showDivCounterTimer}
        stopDivCounterTimer={stopDivCounterTimer}
      />

      <SkipOrCorrect
        correctAnswer={correctAnswer}
        skippedAnswer={skippedAnswer}
      />

      {/* <Result
        showResult={showResult}
        points={points}
        questionsResult={questionsResult}
        handleGameRefresh={handleGameRefresh}
        pointsObject={pointsObject}
      /> */}
    </motion.div>
  );
}
// <ParticlesCanvas />
export default GameModule;
