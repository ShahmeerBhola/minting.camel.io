import { useState, useEffect } from "react";
import "./index.css";
import { getRemainingTimeUntilMsTimestamp } from "./Utils/CountdownTimerUtils";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "0",
};

const CountdownTimer = ({ countdownTimestampMs }) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }
  return (
    <div className="countdown-timer">
      <span>
        {remainingTime.days > 10
          ? remainingTime.days
          : `0${remainingTime.days}`}
      </span>
      <p>D</p>
      <span style={{ margin: "0 10px" }}>:</span>
      <span className="two-numbers">{remainingTime.hours}</span>
      <p>H</p>
      <span style={{ margin: "0 10px" }}>:</span>
      <span className="two-numbers">{remainingTime.minutes}</span>
      <p>M</p>
      <span style={{ margin: "0 10px" }}>:</span>
      <span className="two-numbers">{remainingTime.seconds}</span>
      <p>S</p>
    </div>
  );
};
export default CountdownTimer;
