import { styled } from "styled-components";

export const FlagFlipContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 20px;

  max-width: 540px;
  margin: 0 auto;

  @media screen and (max-width: 600px) {
    gap: 12px;
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
