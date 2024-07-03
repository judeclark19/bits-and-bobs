"use client";

import { useEffect, useRef, useState } from "react";
import wordleGameState from "./logic/Game";
import { observer } from "mobx-react-lite";
import { GuessingGrid, Keyboard, Shade, Wrapper } from "./GameContainer.styles";
import Loader from "../common-components/Loader";
import { FaInfoCircle } from "react-icons/fa";

const GameContainer = observer(() => {
  const guessingGrid = useRef<HTMLDivElement>(null);
  const keyboard = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Initialize the game state on the client side
    if (
      !wordleGameState.isInitialized &&
      guessingGrid.current &&
      keyboard.current
    ) {
      wordleGameState.initializeGame(guessingGrid.current, keyboard.current);
    }
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
          display: "flex"
        }}
      >
        <button
          onClick={() => {
            wordleGameState.restartGame();
          }}
          style={{
            backgroundColor: "#555",
            width: "fit-content"
          }}
        >
          New Game
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
      <p
        style={{
          display: wordleGameState.isInitialized ? "block" : "none",
          fontSize: "12px",
          color: "var(--gray)",
          marginTop: "4rem"
        }}
      >
        <FaInfoCircle /> &nbsp; Plural forms of nouns consisting of the singular
        form + 's' and verbs consiting of a four letter root + 's' (ex: "parks",
        "suits", "wears") are not included in the word bank for this game.
      </p>
    </Wrapper>
  );
});

export default GameContainer;
