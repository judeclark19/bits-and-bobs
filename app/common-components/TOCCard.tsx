"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

const TOCCardStyle = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  border: 1px solid white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 8px 8px 10px rgba(255, 255, 255, 0.1);
  background-color: var(--violet);

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 720px) {
    padding: 0.5rem;
    font-size: 1rem;
    gap: 0.5rem;
  }
`;

function TOCCard({
  name,
  desktopImage,
  mobileImage
}: {
  name: string;
  desktopImage: string;
  mobileImage: string;
}) {
  const [responsiveImage, setResponsiveImage] = useState(desktopImage);
  const [imgDimensions, setImgDimensions] = useState({
    width: 200,
    height: 200
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setResponsiveImage(mobileImage);
        setImgDimensions({ width: 150, height: 150 });
      } else {
        setResponsiveImage(desktopImage);
        setImgDimensions({ width: 200, height: 200 });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [desktopImage, mobileImage]);

  return (
    <TOCCardStyle>
      {name} →
      <Image
        priority
        src={responsiveImage}
        alt={name}
        width={imgDimensions.width}
        height={imgDimensions.height}
      />
    </TOCCardStyle>
  );
}

export default TOCCard;
