import React from "react";
import BackToHome from "../common-components/BackToHome";
import { Metadata } from "next";
import SudokuBoard from "./SudokuBoard";
export const metadata: Metadata = {
  title: "Bits and Bobs | Sudoku",
  description: "Sudoku clone"
};

export default function SudokuPage() {
  return (
    <>
      <BackToHome />
      <div
        style={{
          padding: "20px"
        }}
      >
        <h1>Sudoku</h1>
      </div>
      <SudokuBoard />
    </>
  );
}
