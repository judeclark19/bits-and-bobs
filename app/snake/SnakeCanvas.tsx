"use client";

import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import SnakeGameLogic from "./logic/Game";

const SnakeCanvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<SnakeGameLogic>();

  useEffect(() => {
    if (canvasRef.current && !gameRef.current) {
      gameRef.current = new SnakeGameLogic(canvasRef.current);
    }
  }, []);

  return (
    <>
      <h3>Score: {gameRef.current?.score || 0}</h3>
      <div
        style={{
          border: "1px solid red",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <canvas ref={canvasRef} width={600} height={600} />
      </div>
    </>
  );
});

export default SnakeCanvas;
