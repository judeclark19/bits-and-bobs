"use client";

import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import snakeGameState from "./logic/Game";
import {
  ControlButton,
  FlexDiv,
  SettingsDiv,
  SwitchDiv,
  ToggleDiv
} from "./SnakeCanvas.styles";
import DirectionPad from "../common-components/DirectionPad";

const SnakeCanvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [displayDirectionPadOption, setDisplayDirectionPadOption] =
    useState(true);
  const [displayDirectionPad, setDisplayDirectionPad] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const getButtonColor = () => {
    if (snakeGameState.isRunning || snakeGameState.isPaused) {
      return "green";
    } else {
      return "blue";
    }
  };

  const handleButtonClick = () => {
    if (!snakeGameState.isRunning) {
      snakeGameState.startGame();
    } else if (snakeGameState.isPaused) {
      snakeGameState.resumeGame();
    } else {
      snakeGameState.pauseGame();
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 645) {
      setDisplayDirectionPadOption(false);
      setDisplayDirectionPad(true);
      localStorage.setItem("snakeDisplayDirectionPad", "true");
    } else {
      setDisplayDirectionPadOption(true);
    }
  };

  useEffect(() => {
    // Initialize the game state on the client side
    if (!snakeGameState.isInitialized && canvasRef.current)
      snakeGameState.initializeGame(canvasRef.current);

    // grid pref from local storage
    if (localStorage.getItem("snakeGridVisible") === "false") {
      snakeGameState.setIsGridVisible(false);
    }

    // direction pad pref from local storage
    if (localStorage.getItem("snakeDisplayDirectionPad") === "true") {
      setDisplayDirectionPad(true);
    }

    // high score from local storage
    const highScore = localStorage.getItem("snakeHighScore") || "0";
    setHighScore(parseInt(highScore));

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && buttonRef.current !== document.activeElement) {
        handleButtonClick();
      }

      if (
        (e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight") &&
        snakeGameState.isRunning
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", handleResize);
      snakeGameState.isInitialized = false;
    };
  }, []);

  useEffect(() => {
    if (snakeGameState.score > highScore) {
      localStorage.setItem("snakeHighScore", snakeGameState.score.toString());
      setHighScore(snakeGameState.score);
    }
  }, [snakeGameState.score]);

  return (
    <>
      <div
        style={{
          display: snakeGameState.isInitialized ? "none" : "block"
        }}
      >
        Loading...
      </div>
      <FlexDiv $isVisible={!!snakeGameState}>
        <SettingsDiv>
          <h2>
            Score: {snakeGameState.score || 0}{" "}
            <span>All time high: {highScore}</span>
          </h2>
          <ToggleDiv>
            <p>
              <strong>Toggle Grid:</strong>
            </p>
            <SwitchDiv>
              <p>OFF</p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={!!snakeGameState.gridVisible}
                  onChange={() => {
                    if (snakeGameState.gridVisible) {
                      localStorage.setItem("snakeGridVisible", "false");
                    } else {
                      localStorage.setItem("snakeGridVisible", "true");
                    }

                    snakeGameState.setIsGridVisible(
                      !snakeGameState.gridVisible
                    );
                  }}
                />
                <span className="slider round"></span>
              </label>
              <p>ON</p>
            </SwitchDiv>
          </ToggleDiv>
          {displayDirectionPadOption && (
            <ToggleDiv>
              <p>
                <strong>
                  Display direction pad (for touch device control):
                </strong>
              </p>
              <SwitchDiv>
                <p>OFF</p>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={displayDirectionPad}
                    onChange={() => {
                      setDisplayDirectionPad(!displayDirectionPad);
                      localStorage.setItem(
                        "snakeDisplayDirectionPad",
                        displayDirectionPad ? "false" : "true"
                      );
                    }}
                  />
                  <span className="slider round"></span>
                </label>
                <p>ON</p>
              </SwitchDiv>
            </ToggleDiv>
          )}

          <ControlButton
            onClick={handleButtonClick}
            ref={buttonRef}
            style={{
              width: 200
            }}
            $color={getButtonColor()}
          >
            {snakeGameState.buttonText || "Start"}
          </ControlButton>
        </SettingsDiv>
        <div id="canvas-container">
          <canvas
            ref={canvasRef}
            width={snakeGameState.canvasWidth}
            height={snakeGameState.canvasHeight}
            style={{
              border: "2px solid gray",
              borderRadius: "0.25rem",
              boxShadow: "0 0 1rem 0.5rem rgba(0, 0, 0, 0.5)"
            }}
          />

          <DirectionPad
            displayDirectionPad={displayDirectionPad}
            disabled={!snakeGameState.isRunning || snakeGameState.isPaused}
            upFunction={() => {
              snakeGameState.snake.changeDirection("up");
            }}
            leftFunction={() => {
              snakeGameState.snake.changeDirection("left");
            }}
            rightFunction={() => {
              snakeGameState.snake.changeDirection("right");
            }}
            downFunction={() => {
              snakeGameState.snake.changeDirection("down");
            }}
          />
        </div>
      </FlexDiv>
    </>
  );
});

export default SnakeCanvas;
