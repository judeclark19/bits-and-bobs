import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bits and Bobs",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"]
  }
};

export default function Home() {
  return (
    <main>
      <div
        style={{
          padding: "20px"
        }}
      >
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
      </div>
    </main>
  );
}
