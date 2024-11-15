import { styled } from "styled-components";

export const wordleGreen = "#58A351";
export const wordleYellow = "#F7DA22";
export const wordleRed = "#D32F2F";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
  position: relative;
  width: 445px;
  min-height: 494px;
  margin: auto;
  padding: 20px;

  @media screen and (max-width: 768px) {
    width: 325px;
    max-width: 100vw;
    padding: 10px;
  }
`;

export const Shade = styled.div`
  position: absolute;
  left: 0px;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    text-align: center;
    font-size: 24px;
  }

  .modal-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button {
      background-color: var(--periwinkle);
    }
  }
`;

export const GuessingGrid = styled.div`
  display: grid;
  margin: auto;
  width: fit-content;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(5, auto);
  gap: 5px;

  .cell {
    border: 2px solid var(--periwinkle);
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    transition: background-color 0.3s ease;
  }
`;

export const Keyboard = styled.div<{
  $disabled: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: max-content;
  background-color: transparent;

  .row {
    display: flex;
    gap: 5px;
    justify-content: center;

    .key {
      background-color: var(--periwinkle);
      height: 48px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      font-size: 18px;
      padding: 8px;
      box-sizing: border-box;
      border-radius: 4px;
      cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};

      @media screen and (max-width: 768px) {
        width: 28px;
        height: 38px;
        font-size: 12px;
      }

      &#enter,
      &#delete {
        background-color: var(--gray);
        font-size: 12px;
        width: 62px;

        @media screen and (max-width: 768px) {
          width: 44px;
          font-size: 10px;
        }
      }

      ${(props) =>
        props.$disabled &&
        `
           filter: brightness(0.5);

          &:hover {
            filter: brightness(0.5);
          }
    `}
    }
  }
`;
