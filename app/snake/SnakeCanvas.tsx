"use client";

import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import SnakeGameLogic from "./logic/Game";
import { styled } from "styled-components";

const FlexDiv = styled.div`
  display: flex;
  column-gap: 3rem;
  row-gap: 0;
  flex-wrap: wrap;
`;

const SwitchDiv = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
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

    if (localStorage.getItem("gridVisible") === "false") {
      gameRef.current?.setIsGridVisible(false);
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
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              color: `${
                !gameRef.current?.isRunning || gameRef.current?.isPaused
                  ? "gray"
                  : "white"
              }`
            }}
          >
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

                    // gameRef.current?.toggleGrid();
                    gameRef.current?.setIsGridVisible(
                      !gameRef.current?.gridVisible
                    );
                  }}
                />
                <span className="slider round"></span>
              </label>
              <p>ON</p>
            </SwitchDiv>
          </div>
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
