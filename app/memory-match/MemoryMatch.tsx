"use client";

import React from "react";
import MemoryMatchLogic from "./logic";
import { observer } from "mobx-react-lite";
import {
  CardFace,
  CardStyle,
  MemoryMatchContainer
} from "./MemoryMatch.styles";

const gameState = new MemoryMatchLogic();

const MemoryMatch: React.FC = () => {
  return (
    <MemoryMatchContainer>
      <CardStyle
        $flipped={gameState.flipped}
        $size={gameState.cardSizePx}
        onClick={() => gameState.setFlipped(!gameState.flipped)}
      >
        <CardFace $side="front">front</CardFace>
        <CardFace $side="back">back</CardFace>
      </CardStyle>
    </MemoryMatchContainer>
  );
};

export default observer(MemoryMatch);
