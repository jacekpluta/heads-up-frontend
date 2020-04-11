import React, { useContext } from "react";
import { GameVariantContext } from "./contex/GameVariantContext";

import CounterTimer from "./CounterTimer";
function Questions(props) {
  const { gameVariant } = useContext(GameVariantContext);
  const { currentQuestion, skipTimer, showCounterTimer } = props;

  const pStyleTask = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f8f8ff",
    fontSize: "7vh",
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
    fontSize: "14vh",
    fontWeight: 700,
    textAlign: "center",
  };

  return (
    <div id="countdown">
      <CounterTimer skipTimer={skipTimer} showCounterTimer={showCounterTimer} />
      <p style={pStyleQuestion}>{currentQuestion}</p>
      <p style={pStyleTask}>{gameVariant ? gameVariant.toUpperCase() : ""}</p>
    </div>
  );
}

Questions.propTypes = {};

export default Questions;
