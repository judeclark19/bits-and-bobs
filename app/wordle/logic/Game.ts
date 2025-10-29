import { makeAutoObservable, toJS } from "mobx";
import { wordBank } from "./WordBank";
import Cell from "./Cell";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Delete"]
];

class WordleGameLogic {
  isInitialized: boolean = false;
  gameWrapper: HTMLDivElement | null = null;
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

  setDocumentRefs(
    gameWrapper: HTMLDivElement,
    guessingGrid: HTMLDivElement,
    keyboard: HTMLDivElement
  ) {
    this.gameWrapper = gameWrapper;
    this.guessingGrid = guessingGrid;
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
    if (this.keyboardDisabled) {
      return;
    }

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
            cell.cellElement.style.backgroundColor = "var(--game-red)";

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
      if (this.currentGuess.length >= 5) {
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
        cell.cellElement.style.backgroundColor = "var(--game-red)";

        setTimeout(() => {
          cell.cellElement.style.backgroundColor = "transparent";
        }, 800);
      });
    } else {
      this.applyColors();
      this.currentGuess = [];

      if (wordToGuess === this.targetWord) {
        this.setKeyboardDisabled(true);
        setTimeout(() => {
          this.setModalText("You win!");
          this.setModalOpen(true);
        }, 300);
      } else {
        this.turns++;

        if (this.turns >= 5) {
          this.setKeyboardDisabled(true);
          setTimeout(() => {
            this.setModalText(
              `You lose! The target word was ${this.targetWord.toUpperCase()}`
            );
            this.setModalOpen(true);
          }, 300);
        }
      }
    }
  }

  applyColors() {
    const targetCompare = this.targetWord.split("");

    // green loop
    for (let i = 0; i < this.currentGuess.length; i++) {
      if (this.currentGuess[i].toLowerCase() === targetCompare[i]) {
        const key = Array.from(this.keyboard!.querySelectorAll("button")).find(
          (button) => button.textContent === this.currentGuess[i]
        );

        this.cells[this.turns][i].setBackgroundColor("var(--game-green)");
        targetCompare[i] = "";
        key?.style.setProperty("background-color", "var(--game-green)");
      }
    }

    // yellow loop
    for (let i = 0; i < this.currentGuess.length; i++) {
      const key = Array.from(this.keyboard!.querySelectorAll("button")).find(
        (button) => button.textContent === this.currentGuess[i]
      );

      if (targetCompare.includes(this.currentGuess[i].toLowerCase())) {
        // remove the matching letter in the targetArray with empty string
        targetCompare[
          targetCompare.indexOf(this.currentGuess[i].toLowerCase())
        ] = "";
        if (
          this.cells[this.turns][i].getBackgroundColor() !== "var(--game-green)"
        ) {
          this.cells[this.turns][i].setBackgroundColor("var(--game-yellow)");
          key?.style.setProperty("background-color", "var(--game-yellow)");
        }
      }
    }

    // all other cells violet
    for (let i = 0; i < this.currentGuess.length; i++) {
      const key = Array.from(this.keyboard!.querySelectorAll("button")).find(
        (button) => button.textContent === this.currentGuess[i]
      );

      if (
        this.targetWord.split("").includes(this.currentGuess[i].toLowerCase())
      ) {
        if (this.cells[this.turns][i].getBackgroundColor() === "transparent") {
          this.cells[this.turns][i].setBackgroundColor("var(--violet)");
        }

        continue;
      } else {
        key?.style.setProperty("background-color", "var(--violet)");
        this.disabledLetters.push(this.currentGuess[i]);
        this.cells[this.turns][i].setBackgroundColor("var(--violet)");
      }
    }
  }

  setModalOpen(open: boolean) {
    this.modalOpen = open;

    const focusableElements = this.gameWrapper!.querySelectorAll("button");
    if (open) {
      // disable focusability of all elements behind the modal
      focusableElements.forEach((element) => {
        element.setAttribute("tabindex", "-1");
      });
    } else if (this.keyboardDisabled) {
      const filteredElements = Array.from(focusableElements).filter(
        (element) => {
          return !this.keyboard!.contains(element);
        }
      );

      // restore focusability of elements not in the keyboard
      filteredElements.forEach((element) => {
        element.setAttribute("tabindex", "0");
      });
    } else {
      // restore focusability of all elements
      focusableElements.forEach((element) => {
        element.setAttribute("tabindex", "0");
      });
    }
  }

  setKeyboardDisabled(disabled: boolean) {
    this.keyboardDisabled = disabled;
  }

  setModalText(text: string) {
    this.modalText = text;
  }

  giveUp() {
    this.setKeyboardDisabled(true);
    setTimeout(() => {
      this.setModalText(
        `You gave up! The target word was ${this.targetWord.toUpperCase()}`
      );
      this.setModalOpen(true);
    }, 300);
  }

  restartGame() {
    (document.activeElement as HTMLElement)?.blur();
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
      }
    });

    this.currentGuess = [];
    this.turns = 0;
    this.setRandomTargetWord();
    this.setKeyboardDisabled(false);

    /// turn focus on
    const focusableElements = this.gameWrapper!.querySelectorAll("button");
    focusableElements.forEach((element) => {
      element.setAttribute("tabindex", "0");
    });
  }
}

const wordleGameState = new WordleGameLogic();
export default wordleGameState;
