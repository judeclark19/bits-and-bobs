import { styled } from "styled-components";

export const SpinDeciderControls = styled.div`
  .inputs {
    margin-bottom: 1rem;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    input {
      font-size: 16px;
    }
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;

    button {
      border: 2px outset black;
      background-color: #333;
      width: fit-content;

      &:disabled {
        background-color: #666;
        color: #ccc;
        cursor: not-allowed;
      }
    }
  }
`;

export const SpinDeciderStyle = styled.div`
  margin-top: 2rem;
  position: relative;

  #marker {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 30px solid white;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
  }

  .wheel-container {
    max-height: 600px;
    aspect-ratio: 1/1;
    margin: auto;
  }
`;
