import React, { useContext } from "react";
import { GameVariantContext } from "../../contex/GameVariantContext";
import ReactCountdownClock from "react-countdown-clock";
import { motion } from "framer-motion";

function Questions(props) {
  const { gameVariant } = useContext(GameVariantContext);
  const { currentQuestion, timerSeconds } = props;

  const styleCounter = {
    position: "absolute",
    top: "80%",
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
    top: "30%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f8f8ff",
    fontSize: "5vh",
    fontWeight: 700,
    textShadow: "5px 5px 10px #474747",
  };

  const pStyleQuestion = {
    color: "#f8f8ff",
    fontSize: "9vh",
    fontWeight: 700,
    textAlign: "center",
    width: "100%",
    textShadow: "5px 5px 10px #474747",
  };

  const rednerCounter = () => {
    return (
      <div style={styleCounter}>
        <ReactCountdownClock
          style={styleCounter}
          seconds={timerSeconds}
          color="white"
          alpha={0.9}
          size={70}
        />
      </div>
    );
  };

  return (
    <div>
      {currentQuestion ? rednerCounter() : ""}{" "}
      <motion.div
        className="random-question"
        animate={{
          y: 0,
          opacity: 1,
        }}
        initial={{
          y: -50,
          opacity: 0,
        }}
        exit={{
          y: 100,
          opacity: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        {" "}
        <p style={pStyleQuestion}>
          {currentQuestion ? currentQuestion.toUpperCase() : ""}
        </p>
      </motion.div>
      <p style={pStyleTask}>{gameVariant ? gameVariant.toUpperCase() : ""}</p>
    </div>
  );
}

Questions.propTypes = {};

export default Questions;
