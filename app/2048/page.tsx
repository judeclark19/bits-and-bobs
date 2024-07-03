import { Metadata } from "next";
import TFEGrid from "./TFEGrid";
import BackToHome from "../common-components/BackToHome";

export const metadata: Metadata = {
  title: "Bits and Bobs | 2048",
  description: "2048 number merging game"
};

export default function TwentyFortyEightPage() {
  return (
    <>
      <BackToHome />
      <div
        style={{
          padding: "20px"
        }}
      >
        <h1>2048</h1>
        <p>
          Use arrow keys to shift all the tiles on the board, or if you are on a
          touch device you can use the direction pad below the grid.
        </p>
      </div>
      <TFEGrid />
    </>
  );
}
