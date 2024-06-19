import { styled } from "styled-components";

export const DirectionPadStyle = styled.div<{
  $display: boolean;
}>`
  display: ${(props) => (props.$display ? "grid" : "none")};
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.5rem;

  width: fit-content;
  margin: auto;
  margin-top: 2rem;

  > div {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;

    button {
      padding: 0;
      width: 40px;
      height: 40px;
      color: black;
    }
  }
`;
