import React from "react";
import BackToHome from "../common-components/BackToHome";
import GameContainer from "./GameContainer";
import { Metadata } from "next";
import { FaInfoCircle } from "react-icons/fa";
export const metadata: Metadata = {
  title: "Bits and Bobs | Wordle Clone",
  description: "Wordle clone"
};

export default function WordlePage() {
  return (
    <>
      <BackToHome />
      <div
        style={{
          padding: "20px"
        }}
      >
        <h1>Wordle</h1>
        <p>
          <FaInfoCircle /> &nbsp; Words consiting of a four letter root +
          &lsquo;s&rsquo; or &lsquo;d&rsquo; (ex: &ldquo;suits&rdquo;,
          &ldquo;wears&rdquo;, &ldquo;baked&rdquo;, &ldquo;bakes&rdquo;) are not
          included in the word bank for this game.
        </p>
      </div>
      <GameContainer />
    </>
  );
}
