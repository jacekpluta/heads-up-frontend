import React, { useContext } from "react";
import { GameVariantContext } from "./contex/GameVariantContext";

import { motion } from "framer-motion";
function Questions(props) {
  const { gameVariant } = useContext(GameVariantContext);
  const { currentQuestion, showDivCounterTimer } = props;
  const pageTransition = {
    inBox: {
      opacity: 1,
    },
    outBox: {
      opacity: 0,
    },
  };

  const pStyleTask = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f8f8ff",
    fontSize: "4vh",
    fontWeight: 700,
  };

  const pStyleQuestion = {
    position: "absolute",
    top: " 45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f8f8ff",
    fontSize: "7vh",
    textShadow:
      "0 3px 0 #b2a98f,0 14px 10px rgba(0,0,0,0.15), 0 24px 2px rgba(0,0,0,0.1), 0 34px 30px rgba(0,0,0,0.1)",
    fontWeight: 700,
    textAlign: "center",
    //color: "#fff",
    //textShadow:
    //  "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #00deff, 0 0 70px #00deff, 0 0 80px #00deff, 0 0 100px #00deff, 0 0 150px #00deff",
  };

  return (
    <motion.div
      id="countdown"
      style={{ display: showDivCounterTimer ? "none" : "block" }}
      variants={pageTransition}
      initial={showDivCounterTimer ? "inBox" : "outBox"}
      animate={showDivCounterTimer ? "outBox" : "inBox"}
      exit={showDivCounterTimer ? "inBox" : "outBox"}
    >
      <motion.div>
        <p style={pStyleQuestion}>{currentQuestion}</p>
        <p style={pStyleTask}>{gameVariant ? gameVariant.toUpperCase() : ""}</p>
      </motion.div>
    </motion.div>
  );
}

Questions.propTypes = {};

export default Questions;
