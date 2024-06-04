"use client";

import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import SnakeGameLogic from "./logic/Game";
import {
  ControlButton,
  DirectionPad,
  FlexDiv,
  SettingsDiv,
  SwitchDiv,
  ToggleGridDiv
} from "./SnakeCanvas.styles";

const SnakeCanvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const gameRef = useRef<SnakeGameLogic>();

  const getButtonColor = () => {
    if (!gameRef.current?.isRunning || gameRef.current?.isPaused) {
      return "green";
    } else {
      return "blue";
    }
  };

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

    if (localStorage.getItem("gridVisible") === "false") {
      gameRef.current?.setIsGridVisible(false);
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && buttonRef.current !== document.activeElement) {
        handleButtonClick();
      }

      if (
        (e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight") &&
        gameRef.current?.isRunning
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: gameRef.current ? "none" : "block"
        }}
      >
        Loading...
      </div>
      <FlexDiv $isVisible={!!gameRef.current} id="canvas-container">
        <SettingsDiv>
          <h2>Score: {gameRef.current?.score || 0}</h2>
          <ToggleGridDiv>
            <p>
              <strong>Toggle Grid:</strong>
            </p>
            <SwitchDiv>
              <p>OFF</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!!gameRef.current?.gridVisible}
                  onChange={() => {
                    if (gameRef.current?.gridVisible) {
                      localStorage.setItem("gridVisible", "false");
                    } else {
                      localStorage.setItem("gridVisible", "true");
                    }

                    gameRef.current?.setIsGridVisible(
                      !gameRef.current?.gridVisible
                    );
                  }}
                />
                <span className="slider round"></span>
              </label>
              <p>ON</p>
            </SwitchDiv>
          </ToggleGridDiv>
          <ControlButton
            onClick={handleButtonClick}
            ref={buttonRef}
            style={{
              width: 200
            }}
            $color={getButtonColor()}
          >
            {gameRef.current?.buttonText || "Start"}
          </ControlButton>

          <DirectionPad>
            <div></div>
            <div>
              <button
                disabled={
                  !gameRef.current?.isRunning || gameRef.current.isPaused
                }
                onClick={() => {
                  gameRef.current?.snake.changeDirection("up");
                }}
              >
                ↑
              </button>
            </div>
            <div></div>
            <div>
              <button
                disabled={
                  !gameRef.current?.isRunning || gameRef.current.isPaused
                }
                onClick={() => {
                  gameRef.current?.snake.changeDirection("left");
                }}
              >
                ←
              </button>
            </div>
            <div></div>
            <div>
              <button
                disabled={
                  !gameRef.current?.isRunning || gameRef.current.isPaused
                }
                onClick={() => {
                  gameRef.current?.snake.changeDirection("right");
                }}
              >
                →
              </button>
            </div>
            <div></div>
            <div>
              <button
                disabled={
                  !gameRef.current?.isRunning || gameRef.current.isPaused
                }
                onClick={() => {
                  gameRef.current?.snake.changeDirection("down");
                }}
              >
                ↓
              </button>
            </div>
            <div></div>
          </DirectionPad>
        </SettingsDiv>
        <canvas
          ref={canvasRef}
          width={gameRef.current?.canvasWidth}
          height={gameRef.current?.canvasHeight}
          style={{
            border: "2px solid gray",
            borderRadius: "0.25rem",
            boxShadow: "0 0 1rem 0.5rem rgba(0, 0, 0, 0.5)"
          }}
        />
      </FlexDiv>
    </>
  );
});

export default SnakeCanvas;
