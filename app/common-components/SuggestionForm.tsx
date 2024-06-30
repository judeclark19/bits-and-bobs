"use client";

import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  textarea::placeholder {
    font-family: "Arial", sans-serif;
    color: #999;
    font-style: italic;
  }
  button {
    color: var(--navy);
    width: fit-content;
  }
`;

const SuccessAnimation = styled.div<{
  $animateOut: boolean;
}>`
  width: 34px;
  height: 34px;
  margin-left: 20px;

  svg {
    fill: #51c551;
    animation: ${(props) =>
      props.$animateOut
        ? "successAnimationOut 0.5s ease-in-out forwards"
        : "successAnimationIn 0.5s ease-in-out forwards"};
  }

  @keyframes successAnimationIn {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes successAnimationOut {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
`;

export default function SuggestionForm() {
  const [suggestionText, setSuggestionText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setAnimateOut(false);

    try {
      await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ suggestion: suggestionText })
      });

      setSuggestionText("");
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting suggestion:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAnimateOut(true);
        setTimeout(() => setSuccess(false), 500); // Match the duration of the animation out
      }, 3000);
    }
  };

  return (
    <div
      style={{
        marginTop: "5rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem"
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
        <div
          style={{
            display: "flex"
          }}
        >
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send message"}
          </button>
          {success && (
            <SuccessAnimation $animateOut={animateOut}>
              <svg viewBox="0 0 52 52">
                <path d="M26 0C11.7 0 0 11.7 0 26s11.7 26 26 26 26-11.7 26-26S40.3 0 26 0zM23.6 37.8L11.5 25.7l3.3-3.3 8.8 8.8 16.8-16.8 3.3 3.3L23.6 37.8z" />
              </svg>
            </SuccessAnimation>
          )}
        </div>
      </StyledForm>
    </div>
  );
}
