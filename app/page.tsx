import { Metadata } from "next";
import Link from "next/link";
import TOCCard from "./common-components/TOCCard";
import SuggestionForm from "./common-components/SuggestionForm";

import snakeDesktop from "../public/snake-desktop.jpg";
import snakeMobile from "../public/snake-mobile.jpg";
import tfeDesktop from "../public/2048-desktop.jpg";
import tfeMobile from "../public/2048-mobile.jpg";
import loremPicsum from "../public/lorem-picsum.jpg";

export const metadata: Metadata = {
  title: "Bits and Bobs",
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/apple-touch-icon.png"]
  }
};

const bitsAndBobs = [
  {
    name: "Snake",
    href: "/snake",
    desktopImage: snakeDesktop,
    mobileImage: snakeMobile,
    alt: "Snake game"
  },
  {
    name: "2048",
    href: "/2048",
    desktopImage: tfeDesktop,
    mobileImage: tfeMobile,
    alt: "2048 game"
  },
  {
    name: "Wordle",
    href: "/wordle",
    desktopImage: loremPicsum,
    mobileImage: loremPicsum,
    alt: "Wordle clone"
  }
];

export default function Home() {
  return (
    <main>
      <div
        style={{
          padding: "20px"
        }}
      >
        <h1>Bits and Bobs</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem"
          }}
        >
          {bitsAndBobs.map((b, i) => (
            <Link key={i} href={b.href} passHref>
              <TOCCard
                name={b.name}
                desktopImage={b.desktopImage.src}
                mobileImage={b.mobileImage.src}
              />
            </Link>
          ))}
        </div>

        <SuggestionForm />
      </div>
    </main>
  );
}
