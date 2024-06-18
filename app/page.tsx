import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bits and Bobs"
};

export default function Home() {
  return (
    <main>
      <h1>Bits and Bobs</h1>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}
      >
        <li>
          <Link href="/snake">Snake →</Link>
        </li>
        <li>
          <Link href="/2048">2048 →</Link>
        </li>
      </ul>
    </main>
  );
}
