"use client";

import React, { useEffect, useRef } from "react";
import { Cell, GlobalStyle, GridContainer } from "./TFEGrid.styles";
import TFEGameState from "./logic/Game";
import { observer } from "mobx-react-lite";

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
        <GridContainer ref={gridContainerRef}>
          {TFEGameState.cells.map((cell, i) => (
            <Cell key={i}>
              x: {cell.x}, y: {cell.y}
            </Cell>
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
      )}
    </>
  );
});

export default TFEGrid;
