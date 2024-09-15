import { Metadata } from "next";
import BackToHome from "../common-components/BackToHome";
import MinesweeperGrid from "./MinesweeperGrid";

export const metadata: Metadata = {
  title: "Bits and Bobs | Minesweeper",
  description: "Minesweeper"
};

export default function MinesweeperPage() {
  return (
    <>
      <BackToHome />
      <div
        style={{
          padding: "20px"
        }}
      >
        <h1>Minesweeper</h1>
      </div>
      <MinesweeperGrid />
    </>
  );
}
