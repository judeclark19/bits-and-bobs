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
    if (!TFEGameState.isInitialized && gridContainerRef.current) {
      TFEGameState.initializeGame(gridContainerRef.current);
      const winsFromStorage = localStorage.getItem("TFE-wins")
        ? parseInt(localStorage.getItem("TFE-wins")!)
        : 0;
      TFEGameState.setWins(winsFromStorage);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      {!TFEGameState ? null : (
        <>
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              textAlign: "center"
            }}
          >
            <p
              style={{
                lineHeight: "40px"
              }}
            >
              <strong>
                Number of times reached 2048:
                <span
                  style={{
                    padding: "5px 10px",
                    marginLeft: "10px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    color: "#050034",
                    fontSize: "1.2em",
                    border: "2px solid #a5a0a4"
                  }}
                >
                  {TFEGameState.wins}
                </span>
              </strong>
            </p>
            <RestartButton>
              <button onClick={() => TFEGameState.restartGame()}>
                Restart
              </button>
            </RestartButton>
          </div>

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
