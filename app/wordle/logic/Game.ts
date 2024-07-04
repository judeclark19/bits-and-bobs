import { makeAutoObservable } from "mobx";
import { wordBank } from "./WordBank";
import Cell from "./Cell";
import { wordleGreen, wordleRed, wordleYellow } from "../GameContainer.styles";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"]
];

class WordleGameLogic {
  isInitialized: boolean = false;
  guessingGrid: HTMLDivElement | null = null;
  keyboard: HTMLDivElement | null = null;
  keyboardDisabled: boolean = false;
  turns: number = 0;
  targetWord: string = "";
  currentGuess: string[] = [];
  cells: Cell[][] = [];
  modalOpen: boolean = false;
  modalText: string = "";
  disabledLetters: string[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  initializeGame() {
    this.disabledLetters = [];
    this.buildGrid();
    this.buildKeyboard();
    this.setRandomTargetWord();
  }

  setInitialized(initialized: boolean) {
    this.isInitialized = initialized;
  }

  setGuessingGrid(guessingGrid: HTMLDivElement) {
    this.guessingGrid = guessingGrid;
  }

  setKeyboard(keyboard: HTMLDivElement) {
    this.keyboard = keyboard;
  }

  buildKeyboard() {
    this.keyboard!.innerHTML = "";
    // build keyboard
    for (const row of keys) {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row");

      for (const key of row) {
        const keyElement = document.createElement("button");
        keyElement.classList.add("key");

        if (key === "Delete") {
          // Create an SVG element for the backspace icon
          const backspaceIconSvg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          backspaceIconSvg.setAttribute("width", "24"); // Set width and height as needed
          backspaceIconSvg.setAttribute("height", "24");
          backspaceIconSvg.setAttribute("viewBox", "0 0 44.18 44.18");
          backspaceIconSvg.setAttribute("fill", "white");
          backspaceIconSvg.innerHTML =
            '<path d="M10.625,5.09L0,22.09l10.625,17H44.18v-34H10.625z M42.18,37.09H11.734l-9.375-15l9.375-15H42.18V37.09z"/> <polygon points="18.887,30.797 26.18,23.504 33.473,30.797 34.887,29.383 27.594,22.09 34.887,14.797 33.473,13.383 26.18,20.676 18.887,13.383 17.473,14.797 24.766,22.09 17.473,29.383 "/>';

          keyElement.appendChild(backspaceIconSvg);
        } else {
          keyElement.textContent = key;
        }

        keyElement.addEventListener("click", () => {
          this.handleSelection(key);
        });
        if (key === "Enter") {
          keyElement.id = "enter";
        }

        if (key === "Delete") {
          keyElement.id = "delete";
        }

        rowElement.appendChild(keyElement);
      }

      this.keyboard!.appendChild(rowElement);
    }
  }

  buildGrid() {
    this.guessingGrid!.innerHTML = "";
    this.cells = [];
    // build grid
    for (let i = 0; i < 5; i++) {
      const cellRow = [];

      for (let j = 0; j < 5; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        this.guessingGrid!.appendChild(cell);
        cellRow.push(new Cell([i, j], cell));
      }

      this.cells.push(cellRow);
    }
  }

  setRandomTargetWord() {
    // select random word
    this.targetWord = wordBank[Math.floor(Math.random() * wordBank.length)];
  }

  handleSelection(selection: string) {
    if (selection === "Enter") {
      if (this.modalOpen) {
        this.setModalOpen(false);
        this.restartGame();
        return;
      }

      if (this.currentGuess.length === 5) {
        this.checkGuess();
      } else {
        this.cells[this.turns].forEach((cell) => {
          if (!cell.letter) {
            cell.cellElement.style.backgroundColor = wordleRed;

            setTimeout(() => {
              cell.cellElement.style.backgroundColor = "transparent";
            }, 800);
          }
        });
      }
    } else if (selection === "Delete") {
      // Create a copy and reverse it to find last occupied cell
      const lastCell = [...this.cells[this.turns]]
        .reverse()
        .find((cell) => cell.letter !== "");
      if (lastCell) {
        lastCell.setLetter("");
        this.currentGuess.pop();
      }
    } else {
      if (
        this.currentGuess.length >= 5 ||
        this.disabledLetters.includes(selection)
      ) {
        return;
      }
      // Find first empty cell
      const emptyCell = this.cells[this.turns].find((cell) => !cell.letter);

      if (emptyCell) {
        emptyCell.setLetter(selection);
        this.currentGuess.push(selection);
      }
    }
  }

  checkGuess() {
    const wordToGuess = this.currentGuess.join("").toLowerCase();
    if (!wordBank.includes(wordToGuess)) {
      // not a valid word, turn cells red
      this.cells[this.turns].forEach((cell) => {
        cell.cellElement.style.backgroundColor = wordleRed;

        setTimeout(() => {
          cell.cellElement.style.backgroundColor = "transparent";
        }, 800);
      });
    } else {
      for (let i = 0; i < this.currentGuess.length; i++) {
        const key = Array.from(this.keyboard!.querySelectorAll("button")).find(
          (button) => button.textContent === this.currentGuess[i]
        );

        if (this.currentGuess[i].toLowerCase() === this.targetWord[i]) {
          this.cells[this.turns][i].setBackgroundColor(wordleGreen);

          key?.style.setProperty("background-color", wordleGreen);
        } else if (
          this.targetWord.split("").includes(this.currentGuess[i].toLowerCase())
        ) {
          this.cells[this.turns][i].setBackgroundColor(wordleYellow);

          key?.style.setProperty("background-color", wordleYellow);
        } else {
          this.cells[this.turns][i].setBackgroundColor("var(--violet)");

          key?.style.setProperty("background-color", "var(--violet)");
          key?.setAttribute("disabled", "true");
          this.disabledLetters.push(this.currentGuess[i]);
        }
      }
      this.currentGuess = [];

      if (wordToGuess === this.targetWord) {
        this.setKeyboardDisabled(true);
        setTimeout(() => {
          this.setModalText("You win!");
          this.setModalOpen(true);
        }, 300);
      } else {
        this.turns++;

        if (this.turns === 5) {
          this.setKeyboardDisabled(true);
          setTimeout(() => {
            this.setModalText(
              `You lose! The target word was ${this.targetWord.toUpperCase()}`
            );
            this.setModalOpen;
          }, 300);
        }
      }
    }
  }

  setModalOpen(open: boolean) {
    this.modalOpen = open;
  }

  setKeyboardDisabled(disabled: boolean) {
    this.keyboardDisabled = disabled;
  }

  setTargetWord(word: string) {
    this.targetWord = word;
  }

  setModalText(text: string) {
    this.modalText = text;
  }

  restartGame() {
    this.disabledLetters = [];

    this.cells.forEach((cellRow) => {
      cellRow.forEach((cell) => {
        cell.setLetter("");
        cell.setBackgroundColor("transparent");
      });
    });

    this.keyboard!.querySelectorAll("button").forEach((button) => {
      if (button.textContent !== "Enter" && button.textContent !== "Delete") {
        button.style.setProperty("background-color", "var(--periwinkle)");
        button.removeAttribute("disabled");
      }
    });

    this.currentGuess = [];
    this.turns = 0;
    this.setRandomTargetWord();
    this.setKeyboardDisabled(false);
  }
}

const wordleGameState = new WordleGameLogic();
export default wordleGameState;
