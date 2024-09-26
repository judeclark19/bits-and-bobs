import React from "react";
import BackToHome from "../common-components/BackToHome";
import { Metadata } from "next";
import SpinDecider from "./SpinDecider";
export const metadata: Metadata = {
  title: "Bits and Bobs | Spin Decider",
  description: "Spin Decider"
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
        <h1>Spin Decider</h1>

        <h2>Need help deciding between 2+ things? Give the wheel a spin!</h2>
      </div>
      <SpinDecider />
    </>
  );
}
