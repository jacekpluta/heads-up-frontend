import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import CounterStart from "./CounterStart";
import CounterTimer from "./CounterTimer";
import useInterval from "./UseInterval";
import BackButton from "./BackButton";
import Questions from "./Questions";
//import ParticlesCanvas from "./ParticlesCanvas";
import SkipOrCorrect from "./SkipOrCorrect";
import Result from "./Result";
import GameMenu from "./menu/GameMenu";
import UIfx from "uifx";

import ChangeOrientationBox from "./menu/ChangeOrientationBox";

import FailureRing from "../sounds/failure.mp3";
import SuccessRing from "../sounds/success.mp3";
import CountdownRing from "../sounds/countdown.mp3";

import DeviceOrientation, { Orientation } from "react-screen-orientation";

const successSound = new UIfx(SuccessRing, {
  volume: 0.8,
  throttleMs: 100
});

const countdownSound = new UIfx(CountdownRing, {
  volume: 0.4,
  throttleMs: 100
});

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

  const [activeGameMenu, setActiveGameMenu] = useState(true);

  const [clickOnSkip, setClickOnSkip] = useState(false);
  const [tiltOnCorrect, setTiltOnCorrect] = useState(false);

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

  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [skippedAnswer, setSkippedAnswer] = useState(false);

  const [tiltDone, setTiltDone] = useState(true);

  const [currentTask, setCurrentTask] = useState("");

  const [pointsObject, setPointsObject] = useState("");

  let history = useHistory();

  const handleGameVariantDescribe = () => {
    setDescribeTileClicked(true);
    props.clickSound.play();
    const backgroundColorDescribe = {
      background: "linear-gradient((180deg, #05f, #09f))"
    };
    setCurrentTask("Describe");
    setBackgroundColor(backgroundColorDescribe);
    setCountTimer(30);
    setSkipTimer(30);
  };

  const handleGameVariantShow = () => {
    setShowTileClicked(true);
    props.clickSound.play();
    setCurrentTask("Show");
    const backgroundColorShow = {
      background: "linear-gradient(180deg, rgb(0, 255, 34), rgb(40, 236, 220))"
    };
    setBackgroundColor(backgroundColorShow);
    setCountTimer(90);
    setSkipTimer(90);
  };

  const handleGameChallange = () => {
    setChallangeTileClicked(true);
    props.clickSound.play();
    setCurrentTask("Challange");
    const backgroundColorChallange = {
      background:
        "linear-gradient(180deg, rgb(216, 15, 243), rgb(205, 241, 74))"
    };
    setBackgroundColor(backgroundColorChallange);
    setCountTimer(80);
    setSkipTimer(80);
  };

  const handleGameDraw = () => {
    setDrawTileClicked(true);
    props.clickSound.play();
    setCurrentTask("Draw");
    const backgroundColorDraw = {
      background: "linear-gradient(180deg, rgb(81, 255, 0), rgb(255, 0, 234))"
    };
    setBackgroundColor(backgroundColorDraw);
    setCountTimer(120);
    setSkipTimer(120);
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

  const handleGoBack = () => {
    setSleep(true);
    handleCloseGameModule();
    setActive(false);
  };

  const handleClickOnSkipOff = () => {
    setClickOnSkip(false);
  };

  const handleGameRefresh = () => {
    props.clickSound.play();
    history.push("/");
    setActiveGameMenu(false);
  };

  const handleCloseGameModule = () => {
    props.handleCloseGameModule(false);
  };

  //console.log(history.location);

  //Returns random question
  const GetRandomQuestion = rand => {
    return (rand =
      props.gameVariant.questions[
        Math.floor(Math.random() * props.gameVariant.questions.length)
      ]);
  };

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

  //Scren tilt Y axis, +1 point, correct answer
  const update = function(value) {
    if (value) {
      value = Math.floor(value);
      if (value === 45 && countStart < 0 && tiltDone === true) {
        handleTiltOnCorrect();
        setTiltDone(false);
      }
    }
  };

  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", function(e) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      setPointsObject(pointsObject => [...pointsObject, "+1"]);
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
      setPointsObject(pointsObject => [...pointsObject, "-1"]);
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
      setQuestionsResult(questionsResult => [
        ...questionsResult,
        currentQuestion
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setTiltOnCorrect(false);
    }
  }, [numberOfGamesCompleted, numberOfGames]);

  const pageTransition = {
    inBox: {
      opacity: 1
    },
    outBox: {
      opacity: 0
    }
  };

  //console.log(active);

  return (
    <Router>
      <DeviceOrientation lockOrientation={"landscape"}>
        <Orientation orientation="landscape" angle="90" alwaysRender={false}>
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
              countdownSound={countdownSound}
              countStart={countStart}
              showDivCounterStart={showDivCounterStart}
            />

            <BackButton
              handleGoBack={handleGoBack}
              handleClickOnSkipOff={handleClickOnSkipOff}
            />
            <Questions
              currentQuestion={currentQuestion}
              showDivCounterTimer={showDivCounterTimer}
              stopDivCounterTimer={stopDivCounterTimer}
              currentTask={currentTask}
            />
            <SkipOrCorrect
              correctAnswer={correctAnswer}
              skippedAnswer={skippedAnswer}
            />
            <CounterTimer
              countTimer={countTimer}
              skipTimer={skipTimer}
              showDivCounterTimer={showDivCounterTimer}
              stopDivCounterTimer={stopDivCounterTimer}
              showDivCounterStart={showDivCounterStart}
            />
            <GameMenu
              activeGameMenu={activeGameMenu}
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
              pointsObject={pointsObject}
            />
          </motion.div>
        </Orientation>
        <Orientation orientation="portrait" alwaysRender={false}>
          <ChangeOrientationBox></ChangeOrientationBox>
        </Orientation>
      </DeviceOrientation>
    </Router>
  );
}
// <ParticlesCanvas />
export default GameModule;
