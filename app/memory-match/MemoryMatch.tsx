"use client";

import React, { useEffect, useState } from "react";
import MemoryMatchLogic, { countryNames } from "./logic";
import { observer } from "mobx-react-lite";
import {
  CardFace,
  CardStyle,
  MemoryMatchContainer
} from "./MemoryMatch.styles";

import getUnicodeFlagIcon from "country-flag-icons/unicode";

const MemoryMatch: React.FC = () => {
  const [gameState, setGameState] = useState<MemoryMatchLogic | null>(null);

  useEffect(() => {
    // Instantiate on client to avoid SSR/client randomization mismatch (hydration error)
    setGameState(new MemoryMatchLogic());
  }, []);

  if (!gameState) return null;
  const { cards } = gameState;

  console.log("Cards in component:", cards);
  return (
    <MemoryMatchContainer>
      {cards.map((card, i) => {
        const unicodeFlagIcon = getUnicodeFlagIcon(card.countryCode);
        return (
          <CardStyle
            key={`card-${i}`}
            $flipped={card.isFlipped}
            $size={gameState.cardSizePx}
            onClick={() => card.setFlipped(!card.isFlipped)}
          >
            <CardFace $side="front">
              {/* <span style={{ fontSize: "60px" }}>{unicodeFlagIcon}</span> */}
            </CardFace>
            <CardFace $side="back">
              <span
                style={{
                  fontSize: "60px",
                  marginBottom: "-40px",
                  position: "absolute",
                  top: "0px"
                }}
              >
                {unicodeFlagIcon}
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: "12px"
                }}
              >
                {countryNames[card.countryCode]}
              </span>
            </CardFace>
          </CardStyle>
        );
      })}
    </MemoryMatchContainer>
  );
};

export default observer(MemoryMatch);
