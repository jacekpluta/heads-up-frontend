import React, { useState, useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CountDown from "./CountDown";

import useInterval from "./UseInterval";
import BackButton from "./BackButton";
import Questions from "./Questions";
import SkipOrCorrect from "./SkipOrCorrect";

import { GameCategoryContext } from "./contex/GameCategoryContext";
import { GameVariantContext } from "./contex/GameVariantContext";

import UIfx from "uifx";
import buttonClick from "../sounds/buttonClick.mp3";

import FailureRing from "../sounds/failure.mp3";
import SuccessRing from "../sounds/success.mp3";
import CountdownRing from "../sounds/countdown.mp3";

import ChangeOrientationBox from "./menu/ChangeOrientationBox";
import DeviceOrientation, { Orientation } from "react-screen-orientation";

import { connect } from "react-redux";
import { setPoints, setQuestionsResult } from "../actions";

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

const pageTransition = {
  inModule: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  outModule: {
    opacity: 0,
    x: -200,
    transition: {
      duration: 0.5,
    },
  },
};

function GameModule(props) {
  const highNumber = 99999999999999999999;
  const { gameCategory } = useContext(GameCategoryContext);
  const { gameVariant } = useContext(GameVariantContext);

  const [numberOfGames] = useState(2);
  const [numberOfGamesCompleted, setNumberOfGamesCompleted] = useState(0);
  const [countdownStart, setCountdownStart] = useState(5);
  const [countTimer, setCountTimer] = useState(30);
  const [delayStart] = useState(750);
  const [delayTimer, setDelayTimer] = useState(highNumber);
  const [backgroundColor, setBackgroundColor] = useState("");
  const [transitionOff, setTransitionOff] = useState(false);
  const [orientationChanged, setOrientationChanged] = useState(false);
  const [currentOrientation, setCurrentOrientation] = useState(null);

  const [isRunningStart, setIsRunningStart] = useState(false);
  const [isRunningTimer, setIsRunningTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const [showCountdown, setShowCountdown] = useState(false);
  const [showCounterTimer, setShowCounterTimer] = useState(false);

  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [skippedAnswer, setSkippedAnswer] = useState(false);
  const [tiltDone, setTiltDone] = useState(true);
  const [clickOnSkip, setClickOnSkip] = useState(false);
  const [tiltOnCorrect, setTiltOnCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [points, setPoints] = useState(0);
  const [questionsResult, setQuestionsResult] = useState([]);
  const [pointsObject, setPointsObject] = useState("");

  const { muteSounds } = props;

  const location = useLocation();
  const history = useHistory();

  //routes back to gamemenu
  const handleGoBack = () => {
    clickSound.play();
    setTimeout(() => {
      history.push("/gamemenu");
    }, 200);
    setTransitionOff(true);
  };

  //routes to result
  useEffect(() => {
    if (showResult) {
      setTimeout(() => {
        history.push("/result");
      }, 200);
    }
  }, [showResult]);

  //returns to main if there is no gameVariant or gameCategory
  useEffect(() => {
    if (!gameVariant || !gameCategory) {
      history.push("/");
    }
  }, [gameVariant, gameCategory]);

  //mutes sounds
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

  //changing game variant based on gameVariantContext
  const handleGameVariantDescribe = () => {
    const backgroundColorDescribe = {
      background: "linear-gradient((180deg, #05f, #09f))",
    };
    setBackgroundColor(backgroundColorDescribe);
    setCountTimer(30);
    setTimerSeconds(30);
  };

  const handleGameVariantShow = () => {
    const backgroundColorShow = {
      background: "linear-gradient(180deg, rgb(0, 255, 34), rgb(40, 236, 220))",
    };
    setBackgroundColor(backgroundColorShow);
    setCountTimer(90);
    setTimerSeconds(90);
  };

  const handleGameVariantChallange = () => {
    const backgroundColorChallange = {
      background:
        "linear-gradient(180deg, rgb(216, 15, 243), rgb(205, 241, 74))",
    };
    setBackgroundColor(backgroundColorChallange);
    setCountTimer(80);
    setTimerSeconds(80);
  };

  const handleGameVariantDraw = () => {
    const backgroundColorDraw = {
      background: "linear-gradient(180deg, rgb(81, 255, 0), rgb(255, 0, 234))",
    };
    setBackgroundColor(backgroundColorDraw);
    setCountTimer(120);
    setTimerSeconds(120);
  };

  useEffect(() => {
    if (gameCategory && gameVariant === "opowiadaj") {
      handleGameVariantDescribe();
    } else if (gameCategory && gameVariant === "show") {
      handleGameVariantShow();
    } else if (gameCategory && gameVariant === "challange") {
      handleGameVariantChallange();
    } else if (gameCategory && gameVariant === "draw") {
      handleGameVariantDraw();
    }
  }, [gameCategory, gameVariant]);

  //set points and questions actions
  useEffect(() => {
    props.setQuestionsResult(questionsResult);
    props.setPoints(pointsObject);
  }, [questionsResult, pointsObject]);

  //counter for coundown
  useInterval(
    () => {
      setCountdownStart(countdownStart - 1);
    },
    isRunningStart ? delayStart : null
  );

  //counter for timer
  useInterval(
    () => {
      setCountTimer(countTimer - 1);
    },
    isRunningTimer ? delayTimer : null
  );

  //Returns random question
  const getRandomQuestion = (rand) => {
    return (rand =
      gameCategory.questions[
        Math.floor(Math.random() * gameCategory.questions.length)
      ]);
  };

  //Game start
  useEffect(() => {
    if (gameCategory && gameVariant && currentOrientation == "landscape") {
      setIsRunningStart(true);
      setIsRunningTimer(true);
      setShowCountdown(true);

      window.screen.orientation.lock("landscape");
    }
  }, [gameCategory, gameVariant, currentOrientation]);

  //Scren tilt Y axis, +1 point, correct answer
  const update = function (value) {
    if (value) {
      value = Math.floor(value);
      if (value === 45 && countdownStart < 0 && tiltDone === true) {
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

  //Shows question if countdown = 0
  useEffect(() => {
    if (countdownStart === 0) {
      setTimeout(() => {
        setShowQuestions(true);
      }, 725);
    }
  }, [countdownStart]);

  //Beginning of the game after countdown, setting all counters and question
  useEffect(() => {
    if (showQuestions) {
      setIsRunningStart(false);
      setClickOnSkip(true);
      setTiltOnCorrect(true);
      setShowCountdown(false);
      setShowCounterTimer(true);
      setDelayTimer(1000);
      setCurrentQuestion(getRandomQuestion([numberOfGamesCompleted]));
    }
  }, [countdownStart, numberOfGamesCompleted]);

  //Skip questin and reset timer on click
  const handleClickOnSkip = () => {
    if (clickOnSkip) {
      setCountTimer(0);
      setShowCounterTimer(false);
      setSkippedAnswer(true);
      failureSound.play();
    }
  };

  //Skip questin and reset timer on phone forward tilt
  const handleTiltOnCorrect = () => {
    if (tiltOnCorrect) {
      setCountTimer(0);
      setShowCounterTimer(false);
      setCorrectAnswer(true);
      successSound.play();

      setPoints((pointsObject) => [...pointsObject, "+1"]);
    }
  };

  //End of each round
  useEffect(() => {
    if (countTimer === 0 && skippedAnswer === true) {
      setShowCounterTimer(false);
      setPoints(points - 1);
      failureSound.play();
    }
    if (countTimer === 0 && correctAnswer === true) {
      setShowCounterTimer(false);
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

      setShowCounterTimer(false);
      setCountTimer(timerSeconds);
      setNumberOfGamesCompleted(numberOfGamesCompleted + 1);

      setCurrentQuestion(getRandomQuestion([numberOfGamesCompleted]));
      setQuestionsResult((questionsResult) => [
        ...questionsResult,
        currentQuestion,
      ]);
    }
  }, [
    timerSeconds,
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
      setShowCounterTimer(false);
      setClickOnSkip(false);
      setTiltOnCorrect(false);
      setShowResult(true);
    }
  }, [numberOfGamesCompleted, numberOfGames]);

  return (
    <DeviceOrientation
      lockOrientation={"landscape"}
      onOrientationChange={(orientation) => {
        setCurrentOrientation(orientation);

        console.log(orientation);
        if (orientation === "landscape") {
          setOrientationChanged(true);
        }
      }}
    >
      <Orientation orientation="landscape" angle="90" alwaysRender={false}>
        <AnimatePresence>
          <motion.div
            variants={orientationChanged ? "" : pageTransition}
            initial={transitionOff ? "inModule" : "outModule"}
            animate={transitionOff ? "outModule" : "inModule"}
            exit={transitionOff ? "inModule" : "outModule"}
            style={backgroundColor}
            className="GameModule"
            onClick={handleClickOnSkip}
          >
            <BackButton handleGoBack={handleGoBack} />

            <CountDown
              countdownSound={countdownSound}
              showCountdown={showCountdown}
            />

            {showCounterTimer ? (
              <Questions
                showCounterTimer={showCounterTimer}
                currentQuestion={currentQuestion}
                timerSeconds={timerSeconds}
              />
            ) : (
              ""
            )}

            <SkipOrCorrect
              correctAnswer={correctAnswer}
              skippedAnswer={skippedAnswer}
            />
          </motion.div>
        </AnimatePresence>
      </Orientation>
      <Orientation orientation="portrait" alwaysRender={false}>
        <ChangeOrientationBox></ChangeOrientationBox>
      </Orientation>
    </DeviceOrientation>
  );
}
// <ParticlesCanvas />

export default connect(null, { setQuestionsResult, setPoints })(GameModule);
