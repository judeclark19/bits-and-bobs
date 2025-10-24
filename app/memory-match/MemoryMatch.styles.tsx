import { styled } from "styled-components";

export const MemoryMatchContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 20px;
  justify-content: center;
`;

export const CardStyle = styled.div<{
  $flipped: boolean;
  $size: number;
}>`
  position: relative;
  box-sizing: border-box;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
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
}>`
  user-select: none;
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  backface-visibility: hidden;
  border-radius: inherit;
  color: #fff;
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;

  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  background-color: ${(props) =>
    props.$side === "front" ? "var(--violet)" : "var(--space-cadet)"};
  transform: ${(props) =>
    props.$side === "front" ? "rotateY(0deg)" : "rotateY(180deg)"};
`;
