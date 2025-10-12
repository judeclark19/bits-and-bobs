"use client";

import { observer } from "mobx-react-lite";
import metaClockLogic from "./logic";
import Digit from "./Digit";

const MetaClock = observer(() => {
  console.log(
    "rendering metaclock",
    metaClockLogic.hours,
    metaClockLogic.minutes,
    metaClockLogic.seconds
  );
  return (
    <div>
      {metaClockLogic.hours.split("").map((digit, index) => (
        <Digit key={`hour-${index}`} value={digit} />
      ))}
      {metaClockLogic.minutes.split("").map((digit, index) => (
        <Digit key={`minute-${index}`} value={digit} />
      ))}
      {metaClockLogic.seconds.split("").map((digit, index) => (
        <Digit key={`second-${index}`} value={digit} />
      ))}
    </div>
  );
});

export default MetaClock;
