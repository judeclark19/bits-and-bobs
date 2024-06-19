import React from "react";
import { DirectionPadStyle } from "./CommonComponents.styles";

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
