"use client";
import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import spinDeciderState from "./SpinDecider.logic";
import Loader from "../common-components/Loader";
import { SpinDeciderControls, SpinDeciderStyle } from "./SpinDecider.styles";

const SpinDecider = observer(() => {
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const inputsRef = useRef<HTMLInputElement>(null);
  const [itemCount, setItemCount] = useState(
    spinDeciderState.props.items.length
  );
  const [canUpdate, setCanUpdate] = useState(false);

  useEffect(() => {
    if (
      !spinDeciderState.isInitialized &&
      wheelContainerRef.current &&
      inputsRef.current
    ) {
      spinDeciderState.initWheel(wheelContainerRef.current, inputsRef.current);
    }
  }, []);

  return (
    <div
      style={{
        paddingLeft: "20px",
        paddingRight: "20px"
      }}
    >
      <SpinDeciderControls>
        <p>
          Required: Enter number of things:{" "}
          <input
            style={{ fontSize: "16px" }}
            type="number"
            value={itemCount}
            onChange={(e) => {
              setCanUpdate(true);
              setItemCount(parseInt(e.target.value));
            }}
            min="2"
            max="100"
          />
        </p>

        <p>Optional: Enter thing names</p>

        <div className="inputs" ref={inputsRef}>
          {Array.from({ length: itemCount }).map((_, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Thing ${i + 1}`}
              onChange={(e) => {
                setCanUpdate(true);
              }}
            />
          ))}
        </div>
        <div className="buttons">
          <button
            disabled={!canUpdate}
            onClick={() => {
              setCanUpdate(false);
              spinDeciderState.updateItemCount(itemCount);
            }}
          >
            Update Wheel
          </button>
          <button onClick={() => spinDeciderState.spinWheel()}>
            Spin Wheel
          </button>
        </div>
      </SpinDeciderControls>
      <SpinDeciderStyle>
        {!spinDeciderState || (!spinDeciderState.isInitialized && <Loader />)}
        <div id="marker"></div>
        <div className="wheel-container" ref={wheelContainerRef}></div>
      </SpinDeciderStyle>
    </div>
  );
});

export default SpinDecider;
