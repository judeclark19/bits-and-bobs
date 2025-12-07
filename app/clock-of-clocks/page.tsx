// import dynamic from "next/dynamic";
import { Metadata } from "next";
import BackToHome from "../common-components/BackToHome";
import MetaClock from "./MetaClock";
// const MetaClock = dynamic(() => import("./MetaClock"), { ssr: false });

export const metadata: Metadata = {
  title: "Bits and Bobs | Clock of Clocks",
  description: "Clock of Clocks"
};

export default function ClockOfClocksPage() {
  return (
    <>
      <BackToHome />
      <div
        style={{
          padding: "20px"
        }}
      >
        <h1>Clock of Clocks</h1>
        <MetaClock />
      </div>
    </>
  );
}
