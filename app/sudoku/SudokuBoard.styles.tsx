import { styled } from "styled-components";

export const SudokuGridStyle = styled.div`
  border: 1px solid var(--navy);
  position: relative;
  width: min(600px, calc(100% - 24px));
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  margin: 0 auto;
  gap: 0;

  .cell {
    background-color: var(--violet);
    display: grid;
    place-items: center;
    font-size: calc(1rem + 2vw);
    border: 1px solid var(--navy);

    &:nth-child(9n + 4),
    &:nth-child(9n + 7) {
      border-right: 3px solid var(--navy);
    }

    &:nth-child(n + 20):nth-child(-n + 28),
    &:nth-child(n + 47):nth-child(-n + 55) {
      border-bottom: 3px solid var(--navy);
    }

    /* Media query for smaller screens */
    @media (max-width: 600px) {
      font-size: calc(1rem + 0.8vw);
    }

    &.empty {
      background-color: var(--periwinkle);

      input {
        /* border: 2px solid red; */
        border: none;
        width: 100%;
        height: 100%;
        background-color: transparent;
        color: white;
        font-size: calc(1rem + 2vw);
        text-align: center;

        /* For Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* For Firefox */
        -moz-appearance: textfield;

        @media (max-width: 600px) {
          font-size: calc(1rem + 0.8vw);
        }
      }
    }

    &.active {
      background-color: var(--pharaoh);
    }

    &.incorrect {
      background-color: red;
    }

    &.locked {
      background-color: var(--violet);
    }
  }

  #number-select {
    display: none;
    background-color: var(--periwinkle);
    position: absolute;
    border-radius: 4px;
    padding: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 1);
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    grid-template-rows: repeat(5, auto);
    justify-content: end;

    button {
      color: var(--navy);

      &#close {
        background-color: transparent;
        color: white;
        padding: 0 4px;
        width: fit-content;
        margin-left: auto;

        &:hover {
          background-color: rgba(0, 0, 0, 0.25);
        }
      }

      &#clear {
        grid-column: 1 / span 3;
      }
    }
  }
`;

export const ControlButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  #check-board {
    background-color: var(--periwinkle);
    width: fit-content;
  }

  .new-game-buttons {
    display: flex;
    gap: 1rem;

    button:nth-child(1) {
      background-color: var(--periwinkle);
    }

    button:nth-child(2) {
      background-color: var(--pharaoh);
    }

    button:nth-child(3) {
      background-color: var(--violet);
    }

    button.selected {
      border: 2px solid white;
    }
  }
`;