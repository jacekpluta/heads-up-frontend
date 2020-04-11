import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const CounterTimer = (props) => {
  const { skipTimer, showCounterTimer } = props;

  const renderTime = (value) => {
    return (
      <div className="timer">
        <div className="value">{value}</div>
      </div>
    );
  };

  if (showCounterTimer) {
    return (
      <div className="counterStyle">
        <CountdownCircleTimer
          isPlaying={true}
          durationSeconds={skipTimer}
          colors={[["#ffffff", 0.33], ["#ff8585", 0.33], ["#ff3636"]]}
          renderTime={renderTime}
          onComplete={() => [false, 1000]}
          size={60}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CounterTimer;
