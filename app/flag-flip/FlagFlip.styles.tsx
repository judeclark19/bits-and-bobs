import { styled } from "styled-components";

export const DifficultyFieldset = styled.fieldset`
  border: 2px solid var(--pharaoh);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  legend {
    font-size: 18px;
    padding: 0 8px;
  }
`;

export const DifficultyChoicesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  label {
    font-size: 16px;
    font-weight: bold;
  }

  span {
    display: block;
    margin-left: 20px;
    color: var(--gray);
  }
`;

export const FlagFlipContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 20px;

  max-width: 540px;
  margin: 0 auto;
  margin-top: 2rem;

  @media screen and (max-width: 600px) {
    gap: 12px;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  z-index: 10;

  form {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    select {
      background-color: #555;
      color: white;
      padding: 0.5rem;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.2s;

      &:hover {
        filter: brightness(1.1);
      }
    }
  }
`;

export const CardStyle = styled.div<{
  $flipped: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 1 / 1;
  transform-style: preserve-3d;
  transition: transform 450ms ease;
  cursor: pointer;
  border-radius: 14px;

  transform: ${(props) =>
    props.$flipped ? "rotateY(180deg)" : "rotateY(0deg)"};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const CardFace = styled.div<{
  $side: "front" | "back";
  $matched?: boolean;
  $error?: boolean;
}>`
  user-select: none;
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: inherit;
  color: #fff;
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  box-shadow: ${(props) =>
    props.$matched
      ? "0 0 5px 2px limegreen"
      : "0 10px 25px rgba(0, 0, 0, 0.15)"};
  background-color: ${(props) =>
    props.$side === "front" ? "var(--violet)" : "var(--space-cadet)"};
  transform: ${(props) =>
    props.$side === "front" ? "rotateY(0deg)" : "rotateY(180deg)"};
  border: ${(props) =>
    props.$matched
      ? "2px solid lime"
      : props.$error
      ? "2px solid red"
      : "none"};

  animation: ${(props) => (props.$error ? "flashRed 0.6s ease" : "none")};

  @keyframes flashRed {
    0% {
      box-shadow: 0 0 10px 2px red;
    }
    100% {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
  }

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }
`;

export const FlagStyle = styled.span`
  font-size: 60px;

  @media screen and (max-width: 600px) {
    font-size: 30px;
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
