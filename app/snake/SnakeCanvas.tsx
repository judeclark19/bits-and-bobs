"use client";

import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import SnakeGameLogic from "./logic/Game";
import {
  ControlButton,
  DirectionPad,
  FlexDiv,
  SettingsDiv,
  SwitchDiv,
  ToggleDiv
} from "./SnakeCanvas.styles";

const SnakeCanvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const gameRef = useRef<SnakeGameLogic>();
  const [displayDirectionPadOption, setDisplayDirectionPadOption] =
    useState(true);
  const [displayDirectionPad, setDisplayDirectionPad] = useState(false);

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
    console.log("handle Resize");
    if (window.innerWidth < 645) {
      console.log("small");
      setDisplayDirectionPadOption(false);
      setDisplayDirectionPad(true);
      localStorage.setItem("displayDirectionPad", "true");
    } else {
      console.log("large");
      setDisplayDirectionPadOption(true);
    }
  };

  useEffect(() => {
    if (canvasRef.current && !gameRef.current) {
      gameRef.current = new SnakeGameLogic(canvasRef.current);
    }

    if (localStorage.getItem("gridVisible") === "false") {
      gameRef.current?.setIsGridVisible(false);
    }

    if (localStorage.getItem("displayDirectionPad") === "true") {
      setDisplayDirectionPad(true);
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
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("resize", handleResize);
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
                        "displayDirectionPad",
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

          <DirectionPad $display={displayDirectionPad}>
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
