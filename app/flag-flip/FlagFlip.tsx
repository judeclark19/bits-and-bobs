"use client";

import React, { useEffect, useState } from "react";
import FlagFlipLogic, {
  countryNames,
  DIFFICULTIES,
  DifficultyLevel
} from "./logic";
import { observer } from "mobx-react-lite";
import {
  CardFace,
  CardStyle,
  DifficultyChoicesWrapper,
  DifficultyCollapsible,
  DifficultySummary,
  DifficultyContent,
  FlagFlipContainer,
  FlagStyle,
  Overlay,
  ResetButton,
  FlagFlipGrid
} from "./FlagFlip.styles";

import getUnicodeFlagIcon from "country-flag-icons/unicode";

const FlagFlip: React.FC = () => {
  const [gameState, setGameState] = useState<FlagFlipLogic | null>(null);
  const [overlayState, setOverlayState] = useState<"guessing" | "incorrect">(
    "guessing"
  );
  useEffect(() => {
    // Instantiate on client to avoid SSR/client randomization mismatch (hydration error)
    setGameState(new FlagFlipLogic());
  }, []);

  if (!gameState) return null;
  const { cards } = gameState;

  return (
    <div>
      <FlagFlipContainer>
        {gameState.overlayIsOpen && (
          <Overlay>
            {overlayState === "guessing" && (
              <>
                <div>Which country is this?</div>
                <div style={{ fontSize: "5rem" }}>
                  {getUnicodeFlagIcon(gameState.comparingCards[0].countryCode)}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const selectedCountry = formData.get("country") as string;

                    const correctCountry =
                      gameState.comparingCards[0].countryCode;
                    if (selectedCountry === correctCountry) {
                      gameState.overlayIsOpen = false;
                      gameState.successfulMatch();
                    } else if (gameState.difficulty === 3) {
                      setOverlayState("incorrect");
                    } else {
                      gameState.overlayIsOpen = false;
                      gameState.failedMatch();
                    }
                  }}
                >
                  <select name="country" required>
                    <option value="">Select a country...</option>
                    {Object.entries(countryNames).map(([code, name]) => (
                      <option key={code} value={code}>
                        {code}: {name}
                      </option>
                    ))}
                  </select>
                  <button type="submit" style={{ backgroundColor: "#333" }}>
                    Submit
                  </button>
                </form>
              </>
            )}
            {overlayState === "incorrect" && (
              <>
                <div style={{ textAlign: "center" }}>
                  Sorry, the correct answer was
                  <br />
                  <strong>
                    {countryNames[gameState.comparingCards[0].countryCode]}
                  </strong>
                  .<br />
                  You may now restart the game.
                </div>
              </>
            )}
          </Overlay>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1rem"
          }}
        >
          <span>Wins: {gameState.winCounters[gameState.difficulty]}</span>
          <span
            style={{
              color: DIFFICULTIES[gameState.difficulty].color
            }}
          >
            {DIFFICULTIES[gameState.difficulty].name}
          </span>
        </div>
        <FlagFlipGrid>
          {cards.map((card) => {
            const unicodeFlagIcon = getUnicodeFlagIcon(card.countryCode);
            return (
              <CardStyle
                key={`g${gameState.version}-c${card.id}`}
                $flipped={card.isFlipped}
                onClick={() => {
                  if (
                    card.isMatched ||
                    gameState.comparingCards.includes(card)
                  ) {
                    return;
                  }

                  if (!card.isFlipped && !card.isMatched) {
                    card.setFlipped(true);
                    gameState.compare(card);
                  }
                }}
              >
                <CardFace $side="front">{/* front is blank */}</CardFace>
                <CardFace
                  $side="back"
                  $matched={card.isMatched}
                  $error={card.isError}
                >
                  <FlagStyle>{unicodeFlagIcon}</FlagStyle>
                  {(gameState.difficulty === 0 ||
                    (gameState.difficulty >= 1 && card.isMatched) ||
                    gameState.allMatched) && (
                    <span>{countryNames[card.countryCode]}</span>
                  )}
                </CardFace>
              </CardStyle>
            );
          })}
        </FlagFlipGrid>
      </FlagFlipContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem",
          marginBottom: "1.5rem"
        }}
      >
        <ResetButton id="reset-flagflip" onClick={() => gameState.resetGame()}>
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
      <DifficultyCollapsible open>
        <DifficultySummary id="difficulty-summary">
          Difficulty -{" "}
          <span
            style={{
              color: DIFFICULTIES[gameState.difficulty].color
            }}
          >
            {DIFFICULTIES[gameState.difficulty].name}
          </span>
        </DifficultySummary>
        <DifficultyContent role="group" aria-labelledby="difficulty-summary">
          <DifficultyChoicesWrapper>
            {Object.entries(DIFFICULTIES).map(
              ([level, { id, name, description }]) => (
                <div key={id}>
                  <input
                    type="radio"
                    id={id}
                    name="flag-flip-difficulty"
                    value={level}
                    checked={gameState.difficulty === Number(level)}
                    onChange={() => {
                      gameState.setDifficulty(Number(level) as DifficultyLevel);
                      gameState.resetGame();
                    }}
                    aria-describedby={`${id}-desc`}
                  />
                  <label
                    htmlFor={id}
                    style={{
                      color:
                        DIFFICULTIES[Number(level) as DifficultyLevel].color
                    }}
                  >
                    {name}
                  </label>
                  <br />
                  <span id={`${id}-desc`}>{description}</span>
                </div>
              )
            )}
          </DifficultyChoicesWrapper>
        </DifficultyContent>
      </DifficultyCollapsible>
    </div>
  );
};

export default observer(FlagFlip);
