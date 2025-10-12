import { DigitContainer } from "./MetaClock.styles";

function Digit({ value }: { value: string }) {
  return <DigitContainer>{value}</DigitContainer>;
}

export default Digit;
