import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  body {
    background-color: #050034;
    color: white;
    font-family: sans-serif;
    padding: 0;
    margin: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
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
        color: white;
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        transition: background-color 0.2s;
        width: 100%;

        &:hover {
            filter: brightness(1.1);
        }
   }

   footer{
    padding: 30px 20px;
    background-color: #333;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 20px;
      @media (max-width: 720px) {
        font-size: 14px;
    
        padding: 20px;
    
        > div {
          text-align: center;
        }
      }

      a {
        color: inherit;
      }

      .top {
        display: flex;
        gap: 40px;
        justify-content: center;

        hr {
          display: none;
        }

        @media (max-width: 720px) {
          flex-direction: column;
          align-items: center;
          gap: 14px;

          hr {
            display: block;
            width: 100px;
          }

          .vertical-line {
            display: none;
          }
        }
      }

      .bottom {
        font-size: 12px;
        text-align: center;
      } 
   }
`;

export default GlobalStyles;
