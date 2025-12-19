"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { digits, MetaClockLogic } from "./logic";
import Digit from "./Digit";
import { DigitPair, MetaClockContainer } from "./MetaClock.styles";

const MetaClock = observer(() => {
  const [store] = useState(() => new MetaClockLogic());
  const [hasMounted, setHasMounted] = useState(false);

  // Ensure we never show a server-rendered “snapshot” on hard refresh.
  // After mount, we start ticking using the real client clock.
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    store.start();
    return () => {
      store.stop();
    };
  }, [hasMounted, store]);

  if (!hasMounted) return null;

  return (
    <MetaClockContainer>
      <DigitPair>
        {store.hours.split("").map((digit, index) => (
          <Digit key={`hour-${index}`} value={digit as keyof typeof digits} />
        ))}
      </DigitPair>

      <DigitPair>
        {store.minutes.split("").map((digit, index) => (
          <Digit key={`minute-${index}`} value={digit as keyof typeof digits} />
        ))}
      </DigitPair>
      <DigitPair>
        {store.seconds.split("").map((digit, index) => (
          <Digit key={`second-${index}`} value={digit as keyof typeof digits} />
        ))}
      </DigitPair>
    </MetaClockContainer>
  );
});

export default MetaClock;
