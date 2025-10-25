import { styled } from "styled-components";

export const MetaClockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const DigitPair = styled.div`
  display: flex;
  gap: 1rem;
`;

export const DigitContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 0.125rem;
`;

export const FaceStyle = styled.div`
  width: 40px;
  height: 40px;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(3.9px);
  -webkit-backdrop-filter: blur(3.9px);
  border: 1px solid rgba(255, 255, 255, 0.28);

  position: relative;

  // after pseudo element for dot in center
  &::after {
    content: "";
    width: 4px;
    height: 4px;
    background: white;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const Hand = styled.div<{
  angle: number;
}>`
  width: 45%;
  height: 3px;
  background-color: white;
  position: absolute;
  transform-origin: center left;
  top: 50%;
  left: 50%;
  translate: 0% -50%;
  rotate: ${({ angle }) => angle}deg;
  transition: rotate 800ms;
`;
