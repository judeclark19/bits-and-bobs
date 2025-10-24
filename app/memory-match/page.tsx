import { Metadata } from "next";
import BackToHome from "../common-components/BackToHome";
import MemoryMatch from "./MemoryMatch";
// const MetaClock = dynamic(() => import("./MetaClock"), { ssr: false });

export const metadata: Metadata = {
  title: "Bits and Bobs | Memory Match",
  description: "Memory Match Game"
};

export default function MemoryMatchPage() {
  return (
    <>
      <BackToHome />
      <div
        style={{
          padding: "20px"
        }}
      >
        <h1>Memory Match</h1>
        <MemoryMatch />
      </div>
      {/* <MetaClock /> */}
    </>
  );
}
