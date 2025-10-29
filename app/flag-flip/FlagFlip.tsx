"use client";

import React, { useEffect, useState } from "react";
import FlagFlipLogic, { countryNames } from "./logic";
import { observer } from "mobx-react-lite";
import {
  CardFace,
  CardStyle,
  DifficultyChoicesWrapper,
  DifficultyFieldset,
  FlagFlipContainer,
  FlagStyle,
  Overlay,
  ResetButton
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

  const onDifficultyChange = (newDifficulty: 0 | 1 | 2 | 3) => {
    if (!gameState) return;
    gameState.setDifficulty(newDifficulty);
  };

  if (!gameState) return null;
  const { cards } = gameState;

  return (
    <div>
      <div>
        <DifficultyFieldset>
          <legend>Difficulty:</legend>
          <DifficultyChoicesWrapper>
            <div>
              <input
                type="radio"
                id="easy"
                name="flag-flip-difficulty"
                value={0}
                checked={gameState.difficulty === 0}
                onChange={() => {
                  onDifficultyChange(0);
                }}
                aria-describedby="easy-desc"
              />
              <label htmlFor="easy">Easy</label>
              <br />
              <span id="easy-desc">Country names always shown</span>
            </div>
            <div>
              <input
                type="radio"
                id="medium"
                name="flag-flip-difficulty"
                value={1}
                checked={gameState.difficulty === 1}
                onChange={() => {
                  onDifficultyChange(1);
                }}
                aria-describedby="medium-desc"
              />
              <label htmlFor="medium">Medium</label>
              <br />
              <span id="medium-desc">Country names shown upon each match</span>
            </div>
            <div>
              <input
                type="radio"
                id="hard"
                name="flag-flip-difficulty"
                value={2}
                checked={gameState.difficulty === 2}
                onChange={() => {
                  onDifficultyChange(2);
                }}
                aria-describedby="hard-desc"
              />
              <label htmlFor="hard">Hard</label>
              <br />
              <span id="hard-desc">
                Country names shown when all matches are made
              </span>
            </div>
            <div>
              <input
                type="radio"
                id="very-hard"
                name="flag-flip-difficulty"
                value={3}
                checked={gameState.difficulty === 3}
                onChange={() => {
                  onDifficultyChange(3);
                }}
                aria-describedby="very-hard-desc"
              />
              <label htmlFor="very-hard">Very Hard</label>
              <br />
              <span id="very-hard-desc">
                After each match, you have to correctly identify the country
                name.
                <br />
                If you get it wrong, the game resets with new flags!
              </span>
            </div>
          </DifficultyChoicesWrapper>
        </DifficultyFieldset>
      </div>
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
                    } else {
                      setOverlayState("incorrect");
                    }
                  }}
                >
                  <select name="country" required>
                    <option value="">Select a country...</option>
                    {Object.entries(countryNames).map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
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
        {cards.map((card) => {
          const unicodeFlagIcon = getUnicodeFlagIcon(card.countryCode);
          return (
            <CardStyle
              key={`g${gameState.version}-c${card.id}`}
              $flipped={card.isFlipped}
              onClick={() => {
                if (card.isMatched || gameState.comparingCards.includes(card)) {
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
                  (gameState.difficulty === 1 && card.isMatched) ||
                  (gameState.difficulty >= 2 && gameState.allMatched)) && (
                  <span>{countryNames[card.countryCode]}</span>
                )}
              </CardFace>
            </CardStyle>
          );
        })}
      </FlagFlipContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1.5rem"
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
    </div>
  );
};

export default observer(FlagFlip);
