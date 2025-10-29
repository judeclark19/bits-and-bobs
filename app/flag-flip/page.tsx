import { Metadata } from "next";
import BackToHome from "../common-components/BackToHome";
import FlagFlip from "./FlagFlip";

export const metadata: Metadata = {
  title: "Bits and Bobs | Flag Flip",
  description: "Flag Flip Game"
};

export default function MemoryMatchPage() {
  return (
    <>
      <BackToHome />
      <div
        style={{
          padding: "20px",
          maxWidth: "590px"
        }}
      >
        <h1>Flag Flip</h1>
        <p>
          Flip cards two at a time to reveal random flags of the world. Match
          all pairs to win!
        </p>
        <FlagFlip />
      </div>
    </>
  );
}
