import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  left: 0;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100%;
  width: 100%;
  max-width: 100vw;
  flex-direction: column;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Tailspin = styled.div`
  --uib-size: 40px;
  --uib-color: var(--gray);
  --uib-speed: 0.9s;
  --uib-stroke: 5px;
  --mask-size: calc(var(--uib-size) / 2 - var(--uib-stroke));
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: var(--uib-size);
  width: var(--uib-size);
  -webkit-mask: radial-gradient(
    circle var(--mask-size),
    transparent 99%,
    #095d6a 100%
  );
  mask: radial-gradient(circle var(--mask-size), transparent 99%, #000 100%);
  background-image: conic-gradient(transparent 25%, var(--uib-color));
  animation: ${spin} calc(var(--uib-speed)) linear infinite;
  border-radius: 50%;
`;

export default function Loader() {
  return (
    <Wrapper>
      Loading...
      <Tailspin />
    </Wrapper>
  );
}
