"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { styled } from "styled-components";
import { bitsAndBobs } from "./ListOfBits";

const ContainerStyle = styled.div`
  background-color: #333;
  padding: 1rem;
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const SelectStyle = styled.select`
  background-color: #555;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    filter: brightness(1.1);
  }
`;

export default function BackToHome() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <ContainerStyle>
      <Link href="/">← Back to home</Link>

      <SelectStyle
        defaultValue={pathname}
        onChange={(e) => {
          router.push(e.target.value);
        }}
      >
        {bitsAndBobs.map((b, i) => (
          <option key={i} value={b.href}>
            {b.name}
          </option>
        ))}
      </SelectStyle>
    </ContainerStyle>
  );
}
