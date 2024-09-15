"use client";
import React, { useEffect, useRef } from "react";
import MinesweeperGameState from "./logic/Game";
import { observer } from "mobx-react-lite";
import Loader from "../common-components/Loader";
import { styled } from "styled-components";
import { SwitchDiv } from "../common-components/ToggleSwtichStyle";

const GridStyle = styled.div`
  @keyframes vibrate {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(2px, 2px);
    }
    50% {
      transform: translate(0, 0);
    }
    75% {
      transform: translate(-2px, -2px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  position: relative;
  display: grid;
  grid-template-columns: repeat(10, 32px);
  grid-template-rows: repeat(15, 32px);
  gap: 4px;
  justify-content: center;
  border: 2px solid #ccc;
  width: fit-content;
  margin: auto;
  border-radius: 6px;
  padding: 4px;
  .cell {
    border-radius: 2px;
    display: grid;
    place-items: center;
    font-weight: bold;
    font-size: 18px;
    background-color: rgba(0, 0, 0, 0.3);

    &.covered {
      background-color: #ccc;
      cursor: pointer;

      &:hover {
        background-color: #aaa;
      }
    }

    &.vibrate {
      animation: vibrate 0.1s;
      animation-iteration-count: 5;
    }
  }
`;

const ResetButton = styled.button`
  background-color: transparent;
  border: 2px outset black;
  background-color: #333;
  width: fit-content;
  margin: auto;

  &:active {
    border-style: inset;
  }
`;

const MinesweeperGrid = observer(() => {
  const gridContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the game state on the client side
    if (!MinesweeperGameState.isInitialized && gridContainerRef.current) {
      MinesweeperGameState.initializeGame(gridContainerRef.current);
    }
  }, []);

  return (
    <>
      {!MinesweeperGameState ? (
        <Loader />
      ) : (
        <>
          <GridStyle ref={gridContainerRef}>
            {/* populated by mobx */}
            {!MinesweeperGameState.isInitialized && <Loader />}
          </GridStyle>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <SwitchDiv>
              <p>
                <svg
                  fill="#FFFFFF"
                  height="26px"
                  width="26px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M506.741,84.812L427.188,5.259c-7.009-7.011-18.377-7.01-25.389-0.001l-30.468,30.468 c-23.011,23.011-27.7,57.49-14.109,85.199L152.766,325.38l-38.396-38.396c-4.402-4.401-11.538-4.401-15.941,0l-63.685,63.685 C6.335,379.078-5.762,419.938,2.6,459.235l6.877,32.315c1.171,5.502,5.469,9.8,10.972,10.971l32.315,6.877 c39.298,8.364,80.158-3.735,108.568-32.145l63.685-63.685c4.402-4.401,4.401-11.538,0-15.941l-38.396-38.396l204.429-204.428 c27.281,13.445,61.82,9.27,85.226-14.136l30.468-30.468C513.752,103.189,513.752,91.823,506.741,84.812z M450.884,115.28 c-14.958,14.958-39.177,14.975-54.152,0.012c-0.004-0.004-0.007-0.008-0.011-0.012c-0.004-0.004-0.008-0.007-0.012-0.011 c-14.922-14.934-14.918-39.224,0.011-54.152l17.773-17.773l54.164,54.164L450.884,115.28z"></path>
                  </g>
                </svg>
              </p>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={MinesweeperGameState.mode === "flagging"}
                  onChange={() => {
                    if (MinesweeperGameState.mode === "flagging") {
                      MinesweeperGameState.switchToDiggingMode();
                    } else {
                      MinesweeperGameState.switchToFlaggingMode();
                    }
                  }}
                />
                <span className="slider round"></span>
              </label>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  fill="#FFFFFF"
                  version="1.1"
                  id="Capa_1"
                  width="26px"
                  height="26px"
                  viewBox="0 0 528.362 528.361"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path d="M41.056,81.182v447.179h45.9V81.182c-6.91,3.5-14.691,5.517-22.95,5.517C55.747,86.702,47.965,84.683,41.056,81.182z" />
                      <circle cx="64.006" cy="35.701" r="35.701" />
                      <rect
                        x="114.496"
                        y="84.591"
                        width="385.56"
                        height="275.981"
                      />
                    </g>
                  </g>
                </svg>
              </p>
            </SwitchDiv>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <ResetButton id="reset-minesweeper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="26"
                height="26"
                viewBox="0 0 72 72"
                style={{ fill: "#FFFFFF" }}
              >
                <path d="M 34.099609 7.0019531 C 33.029594 6.94575 32 7.7786875 32 8.9921875 L 32 12.339844 C 20.664873 14.250415 12 24.129249 12 36 C 12 49.234 22.767 60 36 60 C 49.233 60 60 49.234 60 36 C 60 30.33 57.985125 24.827859 54.328125 20.505859 C 52.898125 18.818859 50.374406 18.606156 48.691406 20.035156 C 47.004406 21.462156 46.793703 23.986828 48.220703 25.673828 C 50.657703 28.552828 52 32.22 52 36 C 52 44.822 44.822 52 36 52 C 27.178 52 20 44.822 20 36 C 20 28.561394 25.110881 22.310779 32 20.527344 L 32 23.005859 C 32 24.624859 33.829484 25.566 35.146484 24.625 L 44.951172 17.617188 C 46.061172 16.824188 46.061172 15.173859 44.951172 14.380859 L 35.146484 7.3730469 C 34.817234 7.1377969 34.456281 7.0206875 34.099609 7.0019531 z"></path>
              </svg>
            </ResetButton>
          </div>
        </>
      )}
    </>
  );
});

export default MinesweeperGrid;
