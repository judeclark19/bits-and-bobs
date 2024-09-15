"use client";

import Link from "next/link";
import TOCCard from "./TOCCard";
import { styled } from "styled-components";
import { bitsAndBobs } from "./ListOfBits";

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
