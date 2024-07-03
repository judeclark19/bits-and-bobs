import { Metadata } from "next";
import SnakeCanvas from "./SnakeCanvas";
import BackToHome from "../common-components/BackToHome";

export const metadata: Metadata = {
  title: "Bits and Bobs | Snake",
  description: "Classic snake game"
};

export default function SnakePage() {
  return (
    <div>
      <BackToHome />
      <div
        style={{
          padding: "20px"
        }}
      >
        <h1>Snake</h1>
        <p>
          Use arrow keys to control snake, or if you are on a touch device you
          can use the direction pad below.
        </p>
      </div>
      <SnakeCanvas />
    </div>
  );
}
