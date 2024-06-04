import { styled } from "styled-components";

export const FlexDiv = styled.div<{
  $isVisible: boolean;
}>`
  display: ${(props) => (props.$isVisible ? "flex" : "none")};
  gap: 3rem;
  flex-wrap: wrap;

  @media (max-width: 645px) {
    justify-content: center;
  }
`;

export const SettingsDiv = styled.div`
  width: 300px;

  @media (max-width: 645px) {
    text-align: center;
  }
`;

export const ToggleGridDiv = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 645px) {
    justify-content: center;
  }
`;

export const SwitchDiv = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

export const ControlButton = styled.button<{
  $color: string;
}>`
  background-color: ${(props) => props.$color};
`;

export const DirectionPad = styled.div`
  display: none;
  @media (max-width: 645px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 0.5rem;

    width: fit-content;
    margin: auto;
    margin-top: 2rem;

    > div {
      /* border: 1px solid red; */
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;

      button {
        padding: 0;
        width: 40px;
        height: 40px;
        color: black;
      }
    }
  }
`;