import React, { useState, useEffect, useRef } from "react";
import useInterval from "./UseInterval";

function CounterStart() {
  const [countStart, setCount] = useState(5);
  const [delay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      // Your custom logic here
      setCount(countStart - 1);
    },

    isRunning ? delay : null
  );

  useEffect(() => {
    if (countStart === 0) {
      setIsRunning(false);
    }
  }, [countStart]);

  return (
    <>
      <h1>{countStart}</h1>
    </>
  );
}

export default CounterStart;

/*

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
