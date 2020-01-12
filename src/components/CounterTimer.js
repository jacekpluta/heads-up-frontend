import React from "react";
import { motion } from "framer-motion";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const pageTransition = {
  inBox: {
    opacity: 1
  },
  outBox: {
    opacity: 0
  }
};

const CounterTimer = props => {
  const renderTime = value => {
    return (
      <div className="timer">
        <div className="value">{value}</div>
      </div>
    );
  };

  if (props.stopDivCounterTimer && props.skipTimer !== 0) {
    return (
      <motion.div
        variants={pageTransition}
        initial={props.showDivCounterTimer ? "inBox" : "outBox"}
        animate={props.showDivCounterTimer ? "outBox" : "inBox"}
        exit={props.showDivCounterTimer ? "inBox" : "outBox"}
        className="counterStyle"
      >
        <CountdownCircleTimer
          isPlaying={!props.showDivCounterTimer}
          durationSeconds={props.skipTimer}
          colors={[["#ffffff", 0.33], ["#ff8585", 0.33], ["#ff3636"]]}
          renderTime={renderTime}
          onComplete={() => [false, 1000]}
          size={60}
        />
      </motion.div>
    );
  } else return null;
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
