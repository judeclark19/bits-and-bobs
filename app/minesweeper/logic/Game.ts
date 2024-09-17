import { makeAutoObservable } from "mobx";
import CellClass from "./CellClass";

class MinesweeperGameLogic {
  gridContainer: HTMLDivElement | null = null;
  resetButton: HTMLButtonElement | null = null;
  cells: CellClass[][] = [];
  isInitialized = false;
  cellsAssigned = false;
  gameOver = false;
  numberOfBombs = 25;
  flagsRemaining = this.numberOfBombs;
  mode: "digging" | "flagging" = "digging";
  boundRestartGame: (() => void) | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  initializeGame(gridContainer: HTMLDivElement) {
    this.gridContainer = gridContainer;

    // Store the bound function reference
    if (!this.boundRestartGame) {
      this.boundRestartGame = this.restartGame.bind(this);
    }
    this.resetButton = document.getElementById(
      "reset-minesweeper"
    ) as HTMLButtonElement;
    // Use the stored reference when adding the event listener
    this.resetButton!.addEventListener("click", this.boundRestartGame);

    if (!this.isInitialized) {
      this.isInitialized = true;
      const rows = 15;
      const cols = 10;

      this.gridContainer.addEventListener("click", (e) => {
        if (!this.cellsAssigned && (e.target as HTMLElement).closest(".cell")) {
          this.assignCells(e.target);
          this.cellsAssigned = true;
        }
      });

      for (let i = 0; i < rows; i++) {
        this.cells.push([]);
        for (let j = 0; j < cols; j++) {
          this.cells[i].push(new CellClass(this, i, j));
        }
      }
    }
  }

  assignCells(target: EventTarget | null) {
    const clickedRow = parseInt((target as HTMLElement).dataset.row as string);
    const clickedCol = parseInt((target as HTMLElement).dataset.col as string);

    // randomly assign 25 bombs
    let bombsAssigned = 0;
    while (bombsAssigned < this.numberOfBombs) {
      const row = Math.floor(Math.random() * 15);
      const col = Math.floor(Math.random() * 10);
      if (!this.cells[row][col].bomb) {
        this.cells[row][col].placeBomb();
        bombsAssigned++;
      }
    }

    // check that no bomb is placed in the cell that was clicked
    if (this.cells[clickedRow][clickedCol].bomb) {
      this.cells[clickedRow][clickedCol].removeBomb();

      // place a bomb in another random cell
      let bombPlaced = false;
      while (!bombPlaced) {
        const row = Math.floor(Math.random() * 15);
        const col = Math.floor(Math.random() * 10);
        if (!this.cells[row][col].bomb) {
          this.cells[row][col].placeBomb();
          bombPlaced = true;
        }
      }
    }

    // the rest of the cells get numbers
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 10; j++) {
        if (!this.cells[i][j].bomb) {
          this.cells[i][j].getBombCount();
        }
      }
    }

    // uncover the clicked cell
    this.cells[clickedRow][clickedCol].uncover();
  }

  switchToFlaggingMode() {
    this.mode = "flagging";
  }

  switchToDiggingMode() {
    this.mode = "digging";
  }

  loseGame(cellElement: HTMLDivElement) {
    console.log("lost game by clicking on cell", cellElement);
    this.gameOver = true;
    // turn all bombs red
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.cellElement!.classList.remove("covered");
        if (cell.cellElement === cellElement) {
          cell.cellElement.style.backgroundColor = "red";
          cell.cellElement!.classList.add("vibrate");
        } else if (cell.bomb && !cell.flagged) {
          cell.cellElement!.style.border = "1px solid red";
          cell.cellElement!.textContent = "💣";
        } else if (cell.bomb && cell.flagged) {
          cell.cellElement!.style.backgroundColor = "lime";
          cell.cellElement!.textContent = "💣";
        } else {
          cell.getBombCount();
          if (cell.covered) {
            cell.showBombCount();
          }
          if (cell.flagged) {
            console.log("incorrect flag", cell);
            const cross = document.createElement("div");
            cross.classList.add("cross");
            cross.textContent = "❌";
            cell.cellElement!.appendChild(cross);
          }
        }
      });
    });
  }

  winGame() {
    this.gameOver = true;
    // turn all bombs green
    this.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.cellElement!.classList.remove("covered");
        if (cell.bomb) {
          cell.cellElement!.style.backgroundColor = "lime";
          cell.cellElement!.textContent = "💣";
        }
      });
    });
  }

  restartGame() {
    this.cells = [];
    this.isInitialized = false;
    this.cellsAssigned = false;
    this.gameOver = false;
    this.gridContainer!.innerHTML = "";
    this.flagsRemaining = this.numberOfBombs;
    this.resetButton?.removeEventListener("click", this.boundRestartGame!);
    this.initializeGame(this.gridContainer!);
  }
}

const MinesweeperGameState = new MinesweeperGameLogic();
export default MinesweeperGameState;
