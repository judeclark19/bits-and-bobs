import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bits and Bobs"
};

export default function Home() {
  return (
    <main>
      <h1>Bits and Bobs</h1>
      <ul>
        <li>
          <Link href="/snake">Snake →</Link>
        </li>
      </ul>
    </main>
  );
}
