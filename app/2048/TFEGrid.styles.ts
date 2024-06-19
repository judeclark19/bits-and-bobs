import { styled } from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after{
        box-sizing: border-box;
    }
`;

export const GridContainer = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  background-color: #ccc;
  width: 500px;
  height: 500px;
  margin: 2rem auto 0 auto;
  gap: 14px;
  padding: 15px;
  border-radius: 6px;
  @media screen and (max-width: 520px) {
    width: 280px;
    height: 280px;
    gap: 10px;
    padding: 11px;
  }

  .tile {
    --tile-x: 0;
    --tile-y: 0;
    --tile-z: 1;
    --background-color-brightness: 50%;
    --text-brightness: 90%;
    width: 107px;
    height: 107px;
    background-color: hsl(200, 59%, var(--background-color-brightness));
    color: hsl(200, 25%, var(--text-brightness));
    position: absolute;
    display: grid;
    place-items: center;
    font-weight: bold;
    font-size: 2.5rem;
    border-radius: 3px;
    z-index: var(--tile-z);
    top: calc(
      (var(--tile-y) + 1) * 15px + var(--tile-y) * 107px - var(--tile-y) * 1px
    );
    left: calc(
      (var(--tile-x) + 1) * 15px + var(--tile-x) * 107px - var(--tile-x) * 1px
    );

    animation: appear 0.2s ease-in-out;
    transition: 100ms ease-in-out;

    @media screen and (max-width: 520px) {
      width: 57px;
      height: 57px;
      font-size: 1.5rem;
      top: calc(
        (var(--tile-y) + 1) * 11px + var(--tile-y) * 57px - var(--tile-y) * 1px
      );
      left: calc(
        (var(--tile-x) + 1) * 11px + var(--tile-x) * 57px - var(--tile-x) * 1px
      );
    }
  }

  #TFE-game-over {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
    /* display: flex; JS applies when game is over */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: appear 0.2s ease-in-out;

    span {
      color: white;
      font-size: 2.5rem;

      @media screen and (max-width: 520px) {
        font-size: 1.5rem;
      }
    }

    button {
      margin-top: 2rem;
      width: fit-content;
      color: black;
      font-size: 1.5rem;

      @media screen and (max-width: 520px) {
        font-size: 1rem;
      }
    }
  }

  @keyframes appear {
    0% {
      opacity: 0.5;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export const RestartButton = styled.div`
  text-align: center;

  button {
    width: fit-content;
    color: black;
    font-size: 1.5rem;

    @media screen and (max-width: 520px) {
      font-size: 1rem;
    }
  }
`;

export const Cell = styled.div`
  background-color: #aaa;
  width: 100%;
  height: 100%;
  border-radius: 3px;
`;
