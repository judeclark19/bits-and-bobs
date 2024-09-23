import snakeDesktop from "../../public/snake-desktop.jpg";
import snakeMobile from "../../public/snake-mobile.jpg";
import tfeDesktop from "../../public/2048-desktop.jpg";
import tfeMobile from "../../public/2048-mobile.jpg";
import wordleDesktop from "../../public/wordle-desktop.png";
import wordleMobile from "../../public/wordle-mobile.png";
import minesweeper from "../../public/minesweeper.png";
import sudoku from "../../public/sudoku.png";
import loremPicsum from "../../public/lorem-picsum.jpg";

export const bitsAndBobs = [
  {
    name: "Snake",
    href: "/snake",
    desktopImage: snakeDesktop,
    mobileImage: snakeMobile,
    alt: "Snake game"
  },
  {
    name: "2048",
    href: "/2048",
    desktopImage: tfeDesktop,
    mobileImage: tfeMobile,
    alt: "2048 game"
  },
  {
    name: "Wordle",
    href: "/wordle",
    desktopImage: wordleDesktop,
    mobileImage: wordleMobile,
    alt: "Wordle clone"
  },
  {
    name: "Minesweeper",
    href: "/minesweeper",
    desktopImage: minesweeper,
    mobileImage: minesweeper,
    alt: "Minesweeper game"
  },
  {
    name: "Sudoku",
    href: "/sudoku",
    desktopImage: sudoku,
    mobileImage: sudoku,
    alt: "Sudoku game"
  }
];
