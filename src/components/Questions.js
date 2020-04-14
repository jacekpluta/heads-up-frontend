import React, { useContext } from "react";
import { GameVariantContext } from "./contex/GameVariantContext";
import ReactCountdownClock from "react-countdown-clock";
import { motion } from "framer-motion";

function Questions(props) {
  const { gameVariant } = useContext(GameVariantContext);
  const { currentQuestion, timerSeconds, showCounterTimer } = props;

  const styleCounter = {
    position: "absolute",
    top: " 65%",
    left: "calc(50% - 37.7px)",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f8f8ff",
    fontSize: "14vh",
    fontWeight: 700,
    textAlign: "center",
  };

  const pStyleTask = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f8f8ff",
    fontSize: "8vh",
    fontWeight: 700,
    textShadow: "5px 5px 10px #474747",
  };

  const pStyleQuestion = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f8f8ff",
    fontSize: "12vh",
    fontWeight: 700,
    textAlign: "center",
    width: "100%",
    textShadow: "5px 5px 10px #474747",
  };

  const pageTransition = {
    inModule: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    outModule: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const rednerCounter = () => {
    return (
      <p style={styleCounter}>
        <ReactCountdownClock
          seconds={timerSeconds}
          color="white"
          alpha={0.9}
          size={70}
          //  onComplete={}
        />
      </p>
    );
  };

  return (
    <motion.div
      id="countdown"
      variants={pageTransition}
      initial={showCounterTimer ? "outModule" : "inModule"}
      animate={showCounterTimer ? "inModule" : "outModule"}
      exit={showCounterTimer ? "outModule" : "inModule"}
    >
      {currentQuestion ? rednerCounter() : ""}
      <p style={pStyleQuestion}>
        {currentQuestion ? currentQuestion.toUpperCase() : ""}
      </p>
      <p style={pStyleTask}>{gameVariant ? gameVariant.toUpperCase() : ""}</p>
    </motion.div>
  );
}

Questions.propTypes = {};

export default Questions;
