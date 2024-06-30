"use client";

import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  button {
    color: var(--navy);
    width: fit-content;
  }
`;

export default function SuggestionForm() {
  const [suggestionText, setSuggestionText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(suggestionText);
    setSuggestionText("");
  };

  return (
    <div
      style={{
        marginTop: "5rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        border: "1px solid #ccc",
        width: "fit-content",
        padding: "2rem",
        borderRadius: "1rem"
      }}
    >
      <div>
        <h2>Which bit next?</h2>
        <p>Submitting this form will send me (Jude) an email</p>
      </div>
      <StyledForm onSubmit={handleSubmit}>
        <textarea
          name="message"
          id="message-textarea"
          placeholder="Enter a suggestion"
          rows={5}
          cols={30}
          required
          value={suggestionText}
          onChange={(e) => setSuggestionText(e.target.value)}
        ></textarea>
        <br />
        <br />
        <button type="submit">Send message</button>
      </StyledForm>
    </div>
  );
}
