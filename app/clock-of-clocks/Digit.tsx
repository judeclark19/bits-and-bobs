import Face from "./Face";
import { digits, rotation } from "./logic";
import { DigitContainer } from "./MetaClock.styles";

function Digit({ value }: { value: keyof typeof digits }) {
  return (
    <DigitContainer>
      {digits[value].map((char, index) => (
        <Face
          key={`char-${index}`}
          angles={rotation[char as keyof typeof rotation]}
        />
      ))}
    </DigitContainer>
  );
}

export default Digit;
