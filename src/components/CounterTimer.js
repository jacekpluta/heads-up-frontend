import React from "react";

import "../counterTimer.css";

function CounterTimer(props) {
  return (
    <>
      <div
        id="countdown"
        style={{ display: props.showDivCounterTimer ? "block" : "none" }}
      >
        <div id="countdown-number">{props.countTimer}</div>
        <svg>
          <circle r="18" cx="20" cy="20"></circle>
        </svg>
      </div>
    </>
  );
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
