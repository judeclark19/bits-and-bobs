"use client";

import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import SnakeGameLogic from "./logic/Game";
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
  const gameRef = useRef<SnakeGameLogic>();
  const [displayDirectionPadOption, setDisplayDirectionPadOption] =
    useState(true);
  const [displayDirectionPad, setDisplayDirectionPad] = useState(false);
  const [highScore, setHighScore] = useState(0);

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
    // init game using canvas
    if (canvasRef.current && !gameRef.current) {
      gameRef.current = new SnakeGameLogic(canvasRef.current);
    }

    // grid pref from local storage
    if (localStorage.getItem("snakeGridVisible") === "false") {
      gameRef.current?.setIsGridVisible(false);
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
        gameRef.current?.isRunning
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (gameRef.current!.score > highScore) {
      localStorage.setItem("snakeHighScore", gameRef.current!.score.toString());
      setHighScore(gameRef.current!.score);
    }
  }, [gameRef.current?.score]);

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
          <h2>
            Score: {gameRef.current?.score || 0}{" "}
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
                  checked={!!gameRef.current?.gridVisible}
                  onChange={() => {
                    if (gameRef.current?.gridVisible) {
                      localStorage.setItem("snakeGridVisible", "false");
                    } else {
                      localStorage.setItem("snakeGridVisible", "true");
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
            {gameRef.current?.buttonText || "Start"}
          </ControlButton>

          <DirectionPad
            displayDirectionPad={displayDirectionPad}
            disabled={!gameRef.current?.isRunning || gameRef.current.isPaused}
            upFunction={() => {
              gameRef.current?.snake.changeDirection("up");
            }}
            leftFunction={() => {
              gameRef.current?.snake.changeDirection("left");
            }}
            rightFunction={() => {
              gameRef.current?.snake.changeDirection("right");
            }}
            downFunction={() => {
              gameRef.current?.snake.changeDirection("down");
            }}
          />
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
