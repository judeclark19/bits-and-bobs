"use client";

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
        <TOCCard
          key={i}
          name={b.name}
          href={b.href}
          desktopImage={b.desktopImage.src}
          mobileImage={b.mobileImage.src}
        />
      ))}
    </FlexGrid>
  );
}

export default TableOfContents;
