"use client";

import snakeDesktop from "../../public/snake-desktop.jpg";
import snakeMobile from "../../public/snake-mobile.jpg";
import tfeDesktop from "../../public/2048-desktop.jpg";
import tfeMobile from "../../public/2048-mobile.jpg";
import wordleDesktop from "../../public/wordle-desktop.png";
import wordleMobile from "../../public/wordle-mobile.png";
import loremPicsum from "../../public/lorem-picsum.jpg";
import Link from "next/link";
import TOCCard from "./TOCCard";
import { styled } from "styled-components";

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
    desktopImage: wordleDesktop,
    mobileImage: wordleMobile,
    alt: "Wordle clone"
  }
];

const FlexGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media screen and (max-width: 420px) {
    flex-direction: column;
  }
`;

function TableOfContents() {
  return (
    <FlexGrid>
      {bitsAndBobs.map((b, i) => (
        <Link key={i} href={b.href}>
          <TOCCard
            name={b.name}
            desktopImage={b.desktopImage.src}
            mobileImage={b.mobileImage.src}
          />
        </Link>
      ))}
    </FlexGrid>
  );
}

export default TableOfContents;
