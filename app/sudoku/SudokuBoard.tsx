"use client";
import React, { useEffect, useRef } from "react";
import sudokuGameState from "./logic/Game";
import { observer } from "mobx-react-lite";
import Loader from "../common-components/Loader";
import { ControlButtons, SudokuGridStyle } from "./SudokuBoard.styles";

const SudokuBoard = observer(() => {
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch user's difficulty preference from local storage
    const difficulty = localStorage.getItem("sudokuDifficulty");
    if (!difficulty) {
      localStorage.setItem("sudokuDifficulty", "Easy");
    }

    // Initialize the game state on the client side
    if (!sudokuGameState.isInitialized && gameContainerRef.current) {
      sudokuGameState.initializeGame(
        gameContainerRef.current,
        localStorage.getItem("sudokuDifficulty") as "Easy" | "Medium" | "Hard"
      );
    }
  }, []);

  return (
    <>
      {!sudokuGameState ? (
        <Loader />
      ) : (
        <>
          <p
            style={{
              padding: "20px",
              lineHeight: "1.5"
            }}
          >
            This game gratefully makes use of the free API{" "}
            <strong>
              <a href="https://sudoku-api.vercel.app/">dosuku</a>
            </strong>{" "}
            by{" "}
            <strong>
              <a href="https://github.com/Marcus0086">Raghav Gupta</a>
            </strong>
            . Please exuse the long wait time in exchange for this being totally
            free. Thanks, Raghav!
          </p>
          <p
            style={{
              padding: "20px",
              lineHeight: "1.5"
            }}
          >
            If you do not see a loading spinner or a game below, please refresh
            the page!
          </p>
          <div ref={gameContainerRef}>
            <SudokuGridStyle id="sudoku-grid">
              {sudokuGameState.isLoading && (
                <Loader altText="Fetching new game..." />
              )}
              {/* populated by logic */}
              <div id="number-select">
                <div></div>
                <div></div>
                <button id="close">x</button>
                {/* <button data-value="1">1</button>
                <button data-value="2">2</button>
                <button data-value="3">3</button>
                <button data-value="4">4</button>
                <button data-value="5">5</button>
                <button data-value="6">6</button>
                <button data-value="7">7</button>
                <button data-value="8">8</button>
                <button data-value="9">9</button> */}
                {Array.from({ length: 9 }, (_, i) => (
                  <button key={i} data-value={i + 1}>
                    {i + 1}
                  </button>
                ))}
                <button data-value="0" id="clear">
                  CLEAR
                </button>
              </div>
            </SudokuGridStyle>
            <ControlButtons>
              <button id="check-board">Check Board</button>
              <p>
                <strong>Start a new game</strong>:
              </p>
              <div className="new-game-buttons">
                <button
                  onClick={() => {
                    localStorage.setItem("sudokuDifficulty", "Easy");
                  }}
                  className={`new-game ${
                    sudokuGameState.difficulty === "Easy" ? "selected" : ""
                  }`}
                  data-difficulty="Easy"
                >
                  Easy
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem("sudokuDifficulty", "Medium");
                  }}
                  className={`new-game ${
                    sudokuGameState.difficulty === "Medium" ? "selected" : ""
                  }`}
                  data-difficulty="Medium"
                >
                  Medium
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem("sudokuDifficulty", "Hard");
                  }}
                  className={`new-game ${
                    sudokuGameState.difficulty === "Hard" ? "selected" : ""
                  }`}
                  data-difficulty="Hard"
                >
                  Hard
                </button>
              </div>
            </ControlButtons>
          </div>
        </>
      )}
    </>
  );
});

export default SudokuBoard;
