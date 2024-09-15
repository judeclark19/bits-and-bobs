import { styled } from "styled-components";

export const FlexDiv = styled.div<{
  $isVisible: boolean;
}>`
  display: ${(props) => (props.$isVisible ? "flex" : "none")};
  gap: 3rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 645px) {
    gap: 0;
    flex-direction: column;
    align-items: center;
  }
`;

export const SettingsDiv = styled.div`
  width: 300px;
  height: fit-content;
  background-color: #170f5a;
  padding: 1rem;
  padding-bottom: 3rem;

  @media (max-width: 645px) {
    text-align: center;
    margin-bottom: 2rem;
  }

  h2 span {
    font-size: 16px;
    color: #ffc000;
  }
`;

export const ToggleDiv = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 645px) {
    justify-content: center;
  }
`;

export const ControlButton = styled.button<{
  $color: string;
}>`
  margin-top: 1rem;
  background-color: ${(props) => props.$color};
`;
