import React from "react";
import { motion } from "framer-motion";

const pageTransition = {
  inBox: {
    opacity: 1
  },
  outBox: {
    opacity: 0
  }
};

const CounterTimer = props => {
  if (props.stopDivCounterTimer === false) {
    return <div></div>;
  }

  if (props.stopDivCounterTimer) {
    const countdownNumberStyle = {
      position: "absolute",
      top: 0,
      right: 0,
      width: "40px",
      height: "40px",
      color: "white",
      lineHeight: "40px",
      display: props.showDivCounterTimer ? "none" : "inline-block"
    };

    const counterStyle = {
      strokeDasharray: "113px",
      strokeDashoffset: "0px",
      strokeLinecap: "round",
      strokeWidth: "2px",
      stroke: "white",
      fill: "none",
      animation: "countdown " + props.skipTimer + "s linear forwards infinite"
    };

    return (
      <motion.div
        id="countdown"
        style={countdownNumberStyle}
        variants={pageTransition}
        initial={props.showDivCounterTimer ? "inBox" : "outBox"}
        animate={props.showDivCounterTimer ? "outBox" : "inBox"}
        exit={props.showDivCounterTimer ? "inBox" : "outBox"}
      >
        <div id="countdown-number">{props.countTimer}</div>
        <svg>
          <circle r="18" cx="20" cy="20" style={counterStyle}></circle>
        </svg>
      </motion.div>
    );
  }
};

export default CounterTimer;

/*
  const [delay, setDelay] = useState(1000);


   isRunning ? delay : null

   
  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  function handleIsRunningChange(e) {
    setIsRunning(false);
  }
      <input
        type="checkbox"
        checked={isRunning}
        onChange={handleIsRunningChange}
      />
      <input value={delay} onChange={handleDelayChange} />
      */
