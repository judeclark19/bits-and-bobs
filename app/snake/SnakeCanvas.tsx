"use client";

import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import SnakeGameLogic from "./logic/Game";
import { styled } from "styled-components";

const FlexDiv = styled.div`
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
`;

const SettingsDiv = styled.div`
  padding: 2rem;
  flex: 1;
`;

const SnakeCanvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const gameRef = useRef<SnakeGameLogic>();

  const handleButtonClick = () => {
    if (!gameRef.current?.isRunning) {
      gameRef.current?.startGame();
    } else if (gameRef.current?.isPaused) {
      gameRef.current?.resumeGame();
    } else {
      gameRef.current?.pauseGame();
    }
  };

  useEffect(() => {
    if (canvasRef.current && !gameRef.current) {
      gameRef.current = new SnakeGameLogic(canvasRef.current);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && buttonRef.current !== document.activeElement) {
        handleButtonClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <FlexDiv>
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          style={{
            border: "2px solid gray",
            borderRadius: "0.25rem",
            boxShadow: "0 0 1rem 0.5rem rgba(0, 0, 0, 0.5)"
          }}
        />

        <SettingsDiv>
          <h2>Score: {gameRef.current?.score || 0}</h2>
          <button
            onClick={handleButtonClick}
            ref={buttonRef}
            style={{
              width: 200
            }}
          >
            {gameRef.current?.buttonText || "Start"}
          </button>
        </SettingsDiv>
      </FlexDiv>
    </>
  );
});

export default SnakeCanvas;
