import { styled } from "styled-components";

const DirectionPadStyle = styled.div<{
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

function DirectionPad({
  displayDirectionPad,
  disabled,
  upFunction,
  leftFunction,
  rightFunction,
  downFunction
}: {
  displayDirectionPad: boolean;
  disabled: boolean;
  upFunction: () => void;
  leftFunction: () => void;
  rightFunction: () => void;
  downFunction: () => void;
}) {
  return (
    <DirectionPadStyle $display={displayDirectionPad}>
      <div></div>
      <div>
        <button disabled={disabled} onClick={upFunction}>
          ↑
        </button>
      </div>
      <div></div>
      <div>
        <button disabled={disabled} onClick={leftFunction}>
          ←
        </button>
      </div>
      <div></div>
      <div>
        <button disabled={disabled} onClick={rightFunction}>
          →
        </button>
      </div>
      <div></div>
      <div>
        <button disabled={disabled} onClick={downFunction}>
          ↓
        </button>
      </div>
      <div></div>
    </DirectionPadStyle>
  );
}

export default DirectionPad;
