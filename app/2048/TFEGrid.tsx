"use client";

import React, { useEffect, useRef } from "react";
import {
  Cell,
  GlobalStyle,
  GridContainer,
  RestartButton
} from "./TFEGrid.styles";
import TFEGameState from "./logic/Game";
import { observer } from "mobx-react-lite";
import DirectionPad from "../common-components/DirectionPad";

const TFEGrid = observer(() => {
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the game state on the client side
    if (!TFEGameState.isInitialized && gridContainerRef.current)
      TFEGameState.initializeGame(gridContainerRef.current);
  }, []);

  return (
    <>
      <GlobalStyle />
      {!TFEGameState ? null : (
        <>
          <RestartButton onClick={() => TFEGameState.restartGame()}>
            Restart
          </RestartButton>
          <GridContainer ref={gridContainerRef}>
            {TFEGameState.cells.map((cell, i) => (
              <Cell key={i} />
            ))}
            <div id="TFE-game-over">
              <span>Game Over</span>
              <button
                onClick={() => {
                  TFEGameState.restartGame();
                }}
              >
                Restart
              </button>
            </div>
          </GridContainer>
        </>
      )}
      <DirectionPad
        displayDirectionPad={true}
        disabled={false}
        upFunction={() => TFEGameState.moveUp()}
        leftFunction={() => TFEGameState.moveLeft()}
        rightFunction={() => TFEGameState.moveRight()}
        downFunction={() => TFEGameState.moveDown()}
      />
    </>
  );
});

export default TFEGrid;
