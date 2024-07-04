import React from "react";
import BackToHome from "../common-components/BackToHome";
import GameContainer from "./GameContainer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bits and Bobs | Wordle Clone",
  description: "Wordle clone"
};

export default function WordlePage() {
  return (
    <>
      <BackToHome />

      <GameContainer />
    </>
  );
}
