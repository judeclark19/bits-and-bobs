import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #050034;
    color: white;
    font-family: sans-serif;
  }

  a {
    color: #eee;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      font-weight: 600;
    }
  }

   button {
        background-color: #ff00ff;
        color: white;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 0.2s;
        width: 100%;

        &:hover {
            background-color: #ff68ff;
        }
   }
`;

export default GlobalStyles;
