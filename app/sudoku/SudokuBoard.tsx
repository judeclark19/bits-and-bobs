"use client";
import React, { useEffect, useRef } from "react";
import sudokuGameState, { Difficulty } from "./logic/Game";
import { observer } from "mobx-react-lite";
import Loader from "../common-components/Loader";
import { ControlButtons, SudokuGridStyle } from "./SudokuBoard.styles";
import puzzleGenerator from "./logic/PuzzleGenerator";

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
        localStorage.getItem("sudokuDifficulty") as Difficulty
      );
    }

    puzzleGenerator;
  }, []);

  return (
    <>
      {!sudokuGameState ? (
        <Loader />
      ) : (
        <>
          {/* <p
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
          </p> */}
          <div ref={gameContainerRef}>
            <SudokuGridStyle id="sudoku-grid">
              {sudokuGameState.isLoading && (
                <Loader altText={sudokuGameState.loadingMessage} />
              )}
              {/* grid cells populated by logic */}
              <div id="number-select">
                <div>{/* intentionally left blank */}</div>
                <div>{/* intentionally left blank */}</div>
                <button id="close">x</button>
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
              <button id="check-board">Check solution</button>
              <p>
                <strong>Start a new game</strong>:
              </p>
              <div className="new-game-buttons">
                {["Easy", "Medium", "Hard"].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => {
                      localStorage.setItem("sudokuDifficulty", difficulty);
                    }}
                    className={`new-game ${
                      sudokuGameState.difficulty === difficulty
                        ? "selected"
                        : ""
                    }`}
                    data-difficulty={difficulty}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </ControlButtons>
          </div>
        </>
      )}
    </>
  );
});

export default SudokuBoard;
