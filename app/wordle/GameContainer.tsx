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

const GameContainer = observer(() => {
  const gameWrapper = useRef<HTMLDivElement>(null);
  const newGameButtonRef = useRef<HTMLButtonElement>(null);
  const guessingGrid = useRef<HTMLDivElement>(null);
  const keyboard = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const keyboardListeners = (e: KeyboardEvent) => {
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
    const documentReady =
      gameWrapper.current && guessingGrid.current && keyboard.current;

    // Initialize the game state on the client side
    if (!wordleGameState.isInitialized && documentReady) {
      wordleGameState.setDocumentRefs(
        gameWrapper.current,
        guessingGrid.current,
        keyboard.current
      );
      wordleGameState.initializeGame();
      window.addEventListener("keydown", keyboardListeners);
      wordleGameState.setInitialized(true);
    } else if (documentReady) {
      wordleGameState.setDocumentRefs(
        gameWrapper.current,
        guessingGrid.current,
        keyboard.current
      );
      wordleGameState.buildGrid();
      console.log(wordleGameState.targetWord);
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

    // when modal opens, focus on the new game button
    if (wordleGameState.modalOpen) {
      setTimeout(() => {
        newGameButtonRef.current?.focus();
      }, 0);
    }
  }, [wordleGameState.modalOpen]);

  return (
    <Wrapper ref={gameWrapper}>
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
              ref={newGameButtonRef}
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
