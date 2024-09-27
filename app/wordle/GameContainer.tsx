"use client";

import { useEffect, useRef, useState } from "react";
import wordleGameState from "./logic/Game";
import { observer } from "mobx-react-lite";
import {
  GuessingGrid,
  Keyboard,
  Shade,
  wordleGreen,
  wordleRed,
  Wrapper
} from "./GameContainer.styles";
import Loader from "../common-components/Loader";
import { FaInfoCircle } from "react-icons/fa";

const GameContainer = observer(() => {
  const guessingGrid = useRef<HTMLDivElement>(null);
  const keyboard = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const keyboardListeners = (e: KeyboardEvent) => {
    if (wordleGameState.keyboardDisabled && e.key === "Enter") {
      wordleGameState.handleSelection("Enter");
      return;
    }
    if (wordleGameState.keyboardDisabled) return;
    if (e.key === "Enter") {
      wordleGameState.handleSelection("Enter");
    } else if (e.key === "Backspace") {
      wordleGameState.handleSelection("Delete");
    } else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      wordleGameState.handleSelection(e.key.toUpperCase());
    }
  };

  useEffect(() => {
    // Initialize the game state on the client side
    if (
      !wordleGameState.isInitialized &&
      guessingGrid.current &&
      keyboard.current
    ) {
      wordleGameState.setGuessingGrid(guessingGrid.current);
      wordleGameState.setKeyboard(keyboard.current);
      wordleGameState.initializeGame();
      window.addEventListener("keydown", keyboardListeners);
      wordleGameState.setInitialized(true);
    } else if (guessingGrid.current && keyboard.current) {
      wordleGameState.setGuessingGrid(guessingGrid.current);
      wordleGameState.setKeyboard(keyboard.current);
      wordleGameState.buildGrid();
    }

    return () => {
      wordleGameState.setInitialized(false);
      wordleGameState.disabledLetters = [];
      wordleGameState.turns = 0;
      wordleGameState.targetWord = "";
      wordleGameState.currentGuess = [];
      window.removeEventListener("keydown", keyboardListeners);
    };
  }, []);

  useEffect(() => {
    setModalOpen(wordleGameState.modalOpen);
  }, [wordleGameState.modalOpen]);

  return (
    <Wrapper>
      <div
        style={{
          display: wordleGameState.isInitialized ? "none" : "block"
        }}
      >
        <Loader />
      </div>
      {modalOpen && (
        <Shade>
          <p>{wordleGameState.modalText}</p>
          <div className="modal-buttons">
            <button
              onClick={() => {
                wordleGameState.setModalOpen(false);
              }}
            >
              Close
            </button>
            <button
              onClick={async () => {
                wordleGameState.restartGame();
                wordleGameState.setModalOpen(false);
              }}
            >
              New Game
            </button>
          </div>
        </Shade>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem"
        }}
      >
        <button
          onClick={() => {
            wordleGameState.restartGame();
          }}
          style={{
            backgroundColor: wordleGreen,
            width: "fit-content"
          }}
        >
          New Game
        </button>
        <button
          onClick={() => {
            wordleGameState.giveUp();
          }}
          style={{
            backgroundColor: wordleRed,
            width: "fit-content"
          }}
        >
          Give Up
        </button>
        {process.env.NODE_ENV === "development" && (
          <button
            style={{
              backgroundColor: "#555",
              width: "fit-content"
            }}
            onClick={() => {
              console.log(wordleGameState.targetWord);
            }}
          >
            Log target word
          </button>
        )}
      </div>
      <GuessingGrid id="guessing-grid" ref={guessingGrid} />
      <Keyboard
        id="keyboard"
        ref={keyboard}
        $disabled={wordleGameState.keyboardDisabled}
      />
    </Wrapper>
  );
});

export default GameContainer;
