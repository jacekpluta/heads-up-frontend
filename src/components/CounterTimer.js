import React, { useState, useEffect, useRef } from "react";
import useInterval from "./UseInterval";

function CounterTimer() {
  const [countTimer, setCount] = useState(30);
  const [delay] = useState(1000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      // Your custom logic here
      setCount(countTimer - 1);
    },

    isRunning ? delay : null
  );

  useEffect(() => {
    if (countTimer === 0) {
      setIsRunning(false);
    }
  }, [countTimer]);

  return (
    <>
      <h1>{countTimer}</h1>
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
