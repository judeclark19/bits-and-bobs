"use client";

import { observer } from "mobx-react-lite";
import metaClockLogic, { digits } from "./logic";
import Digit from "./Digit";
import { DigitPair, MetaClockContainer } from "./MetaClock.styles";
import { useEffect } from "react";

const MetaClock = observer(() => {
  useEffect(() => {
    metaClockLogic.start();
  }, []);
  return (
    <MetaClockContainer>
      <DigitPair>
        {metaClockLogic.hours.split("").map((digit, index) => (
          <Digit key={`hour-${index}`} value={digit as keyof typeof digits} />
        ))}
      </DigitPair>

      <DigitPair>
        {metaClockLogic.minutes.split("").map((digit, index) => (
          <Digit key={`minute-${index}`} value={digit as keyof typeof digits} />
        ))}
      </DigitPair>
      <DigitPair>
        {metaClockLogic.seconds.split("").map((digit, index) => (
          <Digit key={`second-${index}`} value={digit as keyof typeof digits} />
        ))}
      </DigitPair>
    </MetaClockContainer>
  );
});

export default MetaClock;
