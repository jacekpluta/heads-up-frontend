import React from "react";
import "../counterTimer.css";
import { motion } from "framer-motion";
const pageTransition = {
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

function CounterTimer(props) {
  if (props.stopDivCounterTimer === false) {
    return <div></div>;
  }
  if (props.stopDivCounterTimer) {
    return (
      <motion.div
        id="countdown"
        style={{ display: props.showDivCounterTimer ? "none" : "block" }}
        variants={pageTransition}
        initial={"inBackBtn"}
        animate={"animBackBtn"}
      >
        <div
          id="countdown"
          style={{ display: props.showDivCounterTimer ? "none" : "block" }}
        >
          <div id="countdown-number">{props.countTimer}</div>
          <svg>
            <circle r="18" cx="20" cy="20"></circle>
          </svg>
        </div>
      </motion.div>
    );
  }
}

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
