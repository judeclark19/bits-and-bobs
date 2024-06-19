import { Metadata } from "next";
import Link from "next/link";
import SnakeCanvas from "./SnakeCanvas";

export const metadata: Metadata = {
  title: "Bits and Bobs | Snake",
  description: "Classic snake game"
};

export default function SnakePage() {
  return (
    <div>
      <div style={{ backgroundColor: "#333", padding: "1rem" }}>
        <Link href="/">← Back to home</Link>
      </div>
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
