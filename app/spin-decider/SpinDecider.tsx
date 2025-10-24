"use client";
import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import spinDeciderState from "./SpinDecider.logic";
import Loader from "../common-components/Loader";
import {
  IncrementAndDecrementButtons,
  SpinDeciderControls,
  SpinDeciderStyle
} from "./SpinDecider.styles";

const SpinDecider = observer(() => {
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const inputsRef = useRef<HTMLInputElement>(null);
  const [itemCount, setItemCount] = useState(
    spinDeciderState.props.items.length
  );
  const [canUpdate, setCanUpdate] = useState(false);

  // keep values for all 100 potential inputs so they persist when hidden/re-added
  const [values, setValues] = useState<string[]>(() =>
    Array(spinDeciderState.MAX_INPUTS).fill("")
  );

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
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center"
          }}
        >
          <p
            style={{
              margin: 0
            }}
          >
            Required: Enter number of things:
          </p>
          <input
            style={{ fontSize: "16px" }}
            id="itemCount"
            type="number"
            value={itemCount}
            onChange={(e) => {
              setCanUpdate(true);
              const next = Math.max(
                2,
                Math.min(
                  spinDeciderState.MAX_INPUTS,
                  Number(e.target.value) || 0
                )
              );
              setItemCount(next);
            }}
            min="2"
            max={spinDeciderState.MAX_INPUTS}
          />
          <IncrementAndDecrementButtons>
            <button
              onClick={() => {
                if (itemCount > 2) {
                  setCanUpdate(true);
                  setItemCount(itemCount - 1);
                }
              }}
              disabled={itemCount <= 2}
            >
              -
            </button>
            <button
              onClick={() => {
                if (itemCount < spinDeciderState.MAX_INPUTS) {
                  setCanUpdate(true);
                  setItemCount(itemCount + 1);
                }
              }}
              disabled={itemCount >= spinDeciderState.MAX_INPUTS}
            >
              +
            </button>
          </IncrementAndDecrementButtons>
        </div>

        <p>Optional: Enter thing names</p>

        <div className="inputs" ref={inputsRef}>
          {Array.from({ length: itemCount }).map((_, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Thing ${i + 1}`}
              value={values[i] ?? ""}
              onChange={(e) => {
                setCanUpdate(true);
                const v = e.target.value;
                setValues((prev) => {
                  const next = prev.slice();
                  next[i] = v;
                  return next;
                });
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
              const inputEls = inputsRef.current?.querySelectorAll("input");
              if (inputEls) {
                inputEls.forEach((el, idx) => {
                  if (idx < itemCount) {
                    (el as HTMLInputElement).value = values[idx] ?? "";
                  }
                });
              }
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
