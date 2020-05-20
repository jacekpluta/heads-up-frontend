import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import CountDown from "./CountDown";

import useInterval from "../../customHooks/UseInterval";
import BackButton from "../BackButton";
import Questions from "../gameModule/Questions";
import SkipOrCorrect from "./SkipOrCorrect";

import { GameCategoryContext } from "../../contex/GameCategoryContext";
import { GameVariantContext } from "../../contex/GameVariantContext";

import UIfx from "uifx";

import FailureRing from "../../sounds/failure.mp3";
import SuccessRing from "../../sounds/success.mp3";
import CountdownRing from "../../sounds/countdown.mp3";

import ChangeOrientationBox from "./ChangeOrientationBox";
import DeviceOrientation, { Orientation } from "react-screen-orientation";

import { connect } from "react-redux";
import { setPoints, setQuestionsResult } from "../../actions";

import { pageVariants } from "../PageVariants";
import { pageTransition } from "../PageTransition";

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

  const [numberOfGames] = useState(8 - 1);
  const [numberOfGamesCompleted, setNumberOfGamesCompleted] = useState(0);
  const [countdownStart, setCountdownStart] = useState(5);
  const [counterTimer, setCounterTimer] = useState(30);
  const [delayStart] = useState(750);
  const [delayTimer, setDelayTimer] = useState(highNumber);
  const [backgroundColor, setBackgroundColor] = useState("");

  const [isRunningStart, setIsRunningStart] = useState(false);
  const [isRunningTimer, setIsRunningTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const [showCountdown, setShowCountdown] = useState(false);
  const [showCounterTimer, setShowCounterTimer] = useState(false);

  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [skippedAnswer, setSkippedAnswer] = useState(false);

  const [clickOnSkip, setClickOnSkip] = useState(false);

  const [showResult, setShowResult] = useState(false);

  const [questionsResult, setQuestionsResult] = useState([]);
  const [pointsObject, setPointsObject] = useState("");

  const [deviceTilted, setDeviceTilted] = useState(false);

  const [currentOrientation, setCurrentOrientation] = useState(null);

  let history = useHistory();

  const handleGoBack = () => {
    setTimeout(() => {
      history.push("/gamemenu");
    }, 200);
  };

  //turns on and off ability to skip questions on hover backutton
  const turnOffClickOnSkip = () => {
    setClickOnSkip(false);
  };

  const turnOnClickOnSkip = () => {
    setClickOnSkip(true);
  };

  // routes to result
  useEffect(() => {
    if (showResult) {
      setTimeout(() => {
        history.push("/result");
      }, 200);
    }
  }, [showResult, history]);

  // returns to main if there is no gameVariant or gameCategory
  useEffect(() => {
    if (!gameCategory) {
      history.push("/");
    }
  }, [gameCategory, history]);

  //changing game variant based on gameVariantContext
  const handleGameVariantDescribe = () => {
    const backgroundColorDescribe = {
      background: "linear-gradient((180deg, #05f, #09f))",
    };
    setBackgroundColor(backgroundColorDescribe);
    setCounterTimer(30);
    setTimerSeconds(30);
  };

  const handleGameVariantShow = () => {
    const backgroundColorShow = {
      background: "linear-gradient(180deg, rgb(0, 255, 34), rgb(40, 236, 220))",
    };
    setBackgroundColor(backgroundColorShow);
    setCounterTimer(90);
    setTimerSeconds(90);
  };

  const handleGameVariantChallange = () => {
    const backgroundColorChallange = {
      background:
        "linear-gradient(180deg, rgb(216, 15, 243), rgb(205, 241, 74))",
    };
    setBackgroundColor(backgroundColorChallange);
    setCounterTimer(80);
    setTimerSeconds(80);
  };

  const handleGameVariantDraw = () => {
    const backgroundColorDraw = {
      background: "linear-gradient(180deg, rgb(81, 255, 0), rgb(255, 0, 234))",
    };
    setBackgroundColor(backgroundColorDraw);
    setCounterTimer(120);
    setTimerSeconds(120);
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

  //set points and questions actions using redux
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
      setCounterTimer(counterTimer - 1);
    },
    isRunningTimer ? delayTimer : null
  );

  //Returns random question
  const getRandomQuestion = (rand) => {
    if (gameCategory && gameCategory.questions[0].name) {
      return (rand =
        gameCategory.questions[
          Math.floor(Math.random() * gameCategory.questions.length)
        ].name);
    } else {
      return (rand =
        gameCategory.questions[
          Math.floor(Math.random() * gameCategory.questions.length)
        ]);
    }
  };

  //lock in landscape orientation
  useEffect(() => {
    if (currentOrientation === "landscape") {
      window.screen.orientation.lock("landscape");
    }
  }, [currentOrientation]);

  //Game start
  useEffect(() => {
    if (gameCategory && gameVariant && currentOrientation === "landscape") {
      setIsRunningStart(true);
      setIsRunningTimer(true);
      setShowCountdown(true);

      const page = document.documentElement;
      if (page.requestFullscreen) {
        page.requestFullscreen();
      } else if (page.mozRequestFullScreen) {
        page.mozRequestFullScreen();
      } else if (page.webkitRequestFullscreen) {
        page.webkitRequestFullscreen();
      } else if (page.msRequestFullscreen) {
        page.msRequestFullscreen();
      }
    }
  }, [gameCategory, gameVariant, currentOrientation]);

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
      setShowCountdown(false);
      setShowCounterTimer(true);
      setDelayTimer(1000);
      setCurrentQuestion(getRandomQuestion([numberOfGamesCompleted]));
      setDeviceTilted(false);
    }
  }, [showQuestions, numberOfGamesCompleted]);

  //Skip questin and reset timer on click
  const handleClickOnSkip = () => {
    if (clickOnSkip) {
      setCounterTimer(0);
      setSkippedAnswer(true);
      setTimeout(() => {
        setSkippedAnswer(false);
      }, 2000);
      failureSound.play();
      setClickOnSkip(false);
    }
  };

  //on device tilted set deviceTilted true
  useEffect(() => {
    window.addEventListener("deviceorientation", (e) => {
      if (e && e.gamma) {
        if (
          !deviceTilted &&
          e.gamma < 50 &&
          e.gamma > 0 &&
          !showCountdown &&
          showCounterTimer
        ) {
          setDeviceTilted(true);
        }
      }
    });
  }, [deviceTilted, showCountdown, showCounterTimer]);

  //on device tilted
  useEffect(() => {
    if (deviceTilted) {
      successSound.play();
      setCounterTimer(0);

      setCorrectAnswer(true);
      setTimeout(() => {
        setCorrectAnswer(false);
      }, 1000);

      setShowCounterTimer(false);
      setPointsObject((pointsObject) => [...pointsObject, "1"]);

      setTimeout(() => {
        setDeviceTilted(false);
      }, 2000);
    }
  }, [deviceTilted]);

  //End of each round
  useEffect(() => {
    if (counterTimer === 0 && skippedAnswer === true) {
      setShowCounterTimer(false);
      failureSound.play();
    }
  }, [counterTimer, correctAnswer, skippedAnswer]);

  //Set points if time runs out
  useEffect(() => {
    if (counterTimer === 0 && correctAnswer === false) {
      setPointsObject((pointsObject) => [...pointsObject, "0"]);
      setSkippedAnswer(true);
      setTimeout(() => {
        setSkippedAnswer(false);
      }, 2000);
    }
  }, [counterTimer, correctAnswer]);

  //end of the round
  useEffect(() => {
    if (counterTimer < -1 && numberOfGamesCompleted <= numberOfGames) {
      setClickOnSkip(true);
      setShowCounterTimer(false);
      setCounterTimer(timerSeconds);
      setNumberOfGamesCompleted(numberOfGamesCompleted + 1);
      setCurrentQuestion(getRandomQuestion([numberOfGamesCompleted]));
      setQuestionsResult((questionsResult) => [
        ...questionsResult,
        currentQuestion,
      ]);
    }
  }, [
    timerSeconds,
    counterTimer,
    numberOfGamesCompleted,
    numberOfGames,
    currentQuestion,
  ]);

  //End of the game
  useEffect(() => {
    if (numberOfGamesCompleted > numberOfGames) {
      setIsRunningTimer(false);
      setCounterTimer("");
      setCurrentQuestion("");
      setShowCounterTimer(false);
      setClickOnSkip(false);
      setShowResult(true);
    }
  }, [numberOfGamesCompleted, numberOfGames]);

  const renderGameModule = () => {
    return (
      <motion.div
        variants={pageVariants}
        transition={pageTransition}
        initial="initial"
        animate="in"
        exit="out"
        style={backgroundColor}
        className="gamemodule"
        onClick={handleClickOnSkip}
      >
        <BackButton
          turnOffClickOnSkip={turnOffClickOnSkip}
          turnOnClickOnSkip={turnOnClickOnSkip}
          showCounterTimer={showCounterTimer}
          handleGoBack={handleGoBack}
        />

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
    );
  };

  if (currentOrientation !== "landscape") {
    return (
      <DeviceOrientation
        lockOrientation={"landscape"}
        onOrientationChange={(orientation) => {
          setCurrentOrientation(orientation);
        }}
      >
        <Orientation orientation="landscape" angle="90" alwaysRender={false}>
          {renderGameModule()}
        </Orientation>
        <Orientation orientation="portrait" alwaysRender={false}>
          <ChangeOrientationBox></ChangeOrientationBox>
        </Orientation>
      </DeviceOrientation>
    );
  } else {
    return <React.Fragment> {renderGameModule()}</React.Fragment>;
  }
}

export default connect(null, { setQuestionsResult, setPoints })(GameModule);
