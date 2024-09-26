"use client";
import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import spinDeciderState from "./SpinDecider.logic";
import { styled } from "styled-components";

const SpinDeciderControls = styled.div`
  .inputs {
    margin-bottom: 1rem;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    input {
      font-size: 16px;
    }
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;

    button {
      border: 2px outset black;
      background-color: #333;
      width: fit-content;
    }
  }
`;

const SpinDeciderStyle = styled.div`
  max-height: 500px;
  margin-top: 2rem;
  position: relative;

  #marker {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 30px solid white;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const SpinDecider = observer(() => {
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const inputsRef = useRef<HTMLInputElement>(null);
  const [itemCount, setItemCount] = useState(
    spinDeciderState.props.items.length
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

  const handleItemCountChange = () => {
    spinDeciderState.updateItemCount(itemCount);
  };

  const handleSpin = () => {
    spinDeciderState.spinWheel();
  };

  return (
    <div
      style={{
        paddingLeft: "20px",
        paddingRight: "20px"
      }}
    >
      {" "}
      <SpinDeciderControls>
        <p>
          Required: Enter number of things:{" "}
          <input
            style={{ fontSize: "16px" }}
            type="number"
            value={itemCount}
            onChange={(e) => setItemCount(parseInt(e.target.value))}
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
                spinDeciderState.props.items[i].label = e.target.value;
              }}
            />
          ))}
        </div>
        <div className="buttons">
          <button onClick={handleItemCountChange}>Update Wheel</button>
          <button onClick={handleSpin}>Spin the Wheel</button>
        </div>
      </SpinDeciderControls>
      <SpinDeciderStyle>
        <div id="marker"></div>
        <div ref={wheelContainerRef}></div>
      </SpinDeciderStyle>
    </div>
  );
});

export default SpinDecider;
