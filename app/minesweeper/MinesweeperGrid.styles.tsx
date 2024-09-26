import { styled } from "styled-components";

export const FlagCount = styled.div`
  width: 368px;
  margin: 0 auto 1rem auto;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;

  span {
    margin-top: 4px;
    font-weight: bold;
    font-size: 20px;
  }
`;

export const GridStyle = styled.div`
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
    position: relative;
    transition: background-color 0.1s;

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

    .cross {
      position: absolute;
    }
  }
`;

export const ResetButton = styled.button`
  border: 2px outset black;
  background-color: #333;
  width: fit-content;
  margin: auto;

  &:active {
    border-style: inset;
  }
`;
