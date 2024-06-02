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
      <Link href="/">Back to home</Link>
      <h1>Snake page</h1>
      <SnakeCanvas />
    </div>
  );
}
